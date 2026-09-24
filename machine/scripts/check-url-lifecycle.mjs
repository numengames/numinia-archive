#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
/**
 * check-url-lifecycle.mjs — the URL ratchet (D-028, ADR-033, P-010 §5).
 *
 * THE PROBLEM THIS SOLVES
 * -----------------------
 * `numinia.org` derives most of its addresses from a filename or a
 * frontmatter `id`. Deleting a document therefore deletes a public URL,
 * silently, and nothing noticed. D-028 has been open since 2026-08-25 with
 * the evidence: `/corpus/canon/c-006-manual-juego-de-rol/` (890 KB) died in
 * April and was found months later.
 *
 * P-010 §5 answered this with a prohibition — "supersede, never delete" —
 * which stops the deletion but never pays the debt: it made deleting a
 * governance question when it is a routing question. ADR-033 replaces the
 * prohibition with this instrument: a document may be deleted when its
 * consumers are zero or redirected, and THIS is what verifies "redirected".
 *
 * HOW IT WORKS — the same ratchet pattern the naming lint used
 * ---------------------------------------------------------
 * `machine/scripts/published-urls.json` is the manifest of every URL the site
 * published at the last accepted build. After a build:
 *
 *   - a URL in the baseline that is no longer built, and has no redirect
 *     rule in `web/astro.config.mjs` pointing away from it  →  FAILURE.
 *     That is a dead address, which is exactly D-028's finding.
 *   - a URL that disappeared but IS redirected  →  accepted, and the
 *     baseline is updated on the next --write-baseline.
 *   - new URLs  →  always fine. The ratchet only guards disappearance.
 *
 *   node machine/scripts/check-url-lifecycle.mjs                  # verify vs baseline
 *   node machine/scripts/check-url-lifecycle.mjs --report         # full detail, exit 0
 *   node machine/scripts/check-url-lifecycle.mjs --write-baseline # freeze current state
 *   node machine/scripts/check-url-lifecycle.mjs --propose        # emit the redirect
 *                                                         # lines a deletion needs
 *
 * MEASURED, NOT ASSUMED — how a redirect actually satisfies this guard
 * -------------------------------------------------------------------
 * Verified 2026-08-31 by deleting `reports/audits/AUD-2026-08-26-complexity.md`
 * against a real build: `npm run build` stayed GREEN while losing two pages
 * (660 → 658), which is precisely the blindness D-028 records. This guard
 * failed on it, correctly.
 *
 * On adding the redirect rule and rebuilding, the guard passed — but NOT via
 * the `covered` branch below. Astro MATERIALISES each redirect as a real
 * `index.html` at the old address (`<meta http-equiv="refresh" url=/audits>`),
 * so the URL never leaves `dist/` at all: it stops being a document and starts
 * being a signpost. The address keeps resolving, which is the promise being
 * guarded, so the outcome is right — but the mechanism is Astro's, not this
 * script's. The `covered` branch therefore only fires for redirects declared
 * outside the Astro config (a CDN or host-level rule), and is kept for that
 * case rather than as the main path. Stated here because a reader who assumes
 * the main path is the config-parsing one would misjudge what this guard
 * proves.
 *
 * WHY IT READS web/dist AND NOT THE .astro SOURCES
 * ------------------------------------------------
 * Every route derives its slug differently: `missions/[id].astro` uses the
 * frontmatter `id` lowercased, `audits/[id].astro` uses the Astro loader's
 * entry id, `corpus/[...slug].astro` uses a filename-derived id from
 * getPublicCorpus(). Re-implementing that derivation in this script would be
 * a second source of truth that drifts — the exact failure P-010 §3.2.2 was
 * corrected for, where an inference about [...slug].astro was replaced by a
 * measurement against real built output. So: this guard measures the build.
 * If it did not run, it says so and fails rather than passing vacuously.
 *
 * WHAT THIS GUARD DOES NOT CHECK (D-025 — declare your blindness):
 * see machine/scripts/blind-spots.json, entry "check-url-lifecycle". Printed on
 * every exit path.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { declareBlindSpots } from './lib/blindness.mjs';
declareBlindSpots('check-url-lifecycle');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = path.join(ROOT, 'web', 'dist');
const BASELINE = path.join(ROOT, 'machine', 'scripts', 'published-urls.json');
const CONFIG = path.join(ROOT, 'web', 'astro.config.mjs');

const args = new Set(process.argv.slice(2));
const REPORT = args.has('--report');
const WRITE = args.has('--write-baseline');
const PROPOSE = args.has('--propose');

// --- 1. what the build actually published -----------------------------------

/** Every directory under dist/ containing an index.html, as a site path. */
function builtUrls(dir = DIST, prefix = '') {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  if (entries.some((e) => e.isFile() && e.name === 'index.html')) {
    out.push(prefix === '' ? '/' : prefix);
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    // Build intermediates and generated assets are not addresses we promise.
    if (prefix === '' && (e.name === '_astro' || e.name === 'pagefind')) continue;
    out.push(...builtUrls(path.join(dir, e.name), `${prefix}/${e.name}`));
  }
  return out;
}

if (!existsSync(DIST)) {
  console.error('check-url-lifecycle: web/dist not found.');
  console.error('  This guard measures the real build, not the sources (see header).');
  console.error('  Run `npm run build` in web/ first.');
  process.exit(1);
}

const built = new Set(builtUrls());
if (built.size === 0) {
  console.error('check-url-lifecycle: web/dist exists but published zero URLs.');
  console.error('  Refusing to pass vacuously — a guard that sees nothing must not report green (D-039).');
  process.exit(1);
}

// `/print/*` are PDF intermediates, deleted before deploy (astro.config.mjs
// §integrations comment). They are never public addresses, so their
// disappearance is not a broken promise.
const PUBLIC = [...built].filter((u) => !u.startsWith('/print/')).sort();

// --- 2. what is redirected ---------------------------------------------------

/** Redirect SOURCES declared in astro.config.mjs — the left-hand keys. */
function declaredRedirects() {
  const src = readFileSync(CONFIG, 'utf8');
  const block = src.match(/redirects:\s*\{([\s\S]*?)\n\t\},/);
  if (!block) return new Set();
  const keys = new Set();
  for (const m of block[1].matchAll(/^\s*"([^"]+)":\s*"([^"]+)"/gm)) keys.add(m[1]);
  return keys;
}
const redirected = declaredRedirects();

// --- 3. the ratchet ----------------------------------------------------------

if (WRITE) {
  writeFileSync(
    BASELINE,
    JSON.stringify(
      {
        $comment:
          'URL manifest — D-028/ADR-033. Every public address the site published at the last accepted build. ' +
          'check-url-lifecycle.mjs fails when one of these stops being built without a redirect in web/astro.config.mjs. ' +
          'Regenerate deliberately with --write-baseline, in the same PR as the deletion that changed it, never to silence a failure.',
        generated: new Date().toISOString().slice(0, 10),
        count: PUBLIC.length,
        urls: PUBLIC,
      },
      null,
      2
    ) + '\n'
  );
  console.log(`check-url-lifecycle: baseline written — ${PUBLIC.length} public URLs.`);
  process.exit(0);
}

if (!existsSync(BASELINE)) {
  console.error('check-url-lifecycle: no baseline. Create it with --write-baseline.');
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE, 'utf8'));
const known = new Set(baseline.urls);
const nowSet = new Set(PUBLIC);

const vanished = [...known].filter((u) => !nowSet.has(u)).sort();
const dead = vanished.filter((u) => !redirected.has(u));
const covered = vanished.filter((u) => redirected.has(u));
const added = PUBLIC.filter((u) => !known.has(u)).sort();

if (PROPOSE) {
  if (dead.length === 0) {
    console.log('// check-url-lifecycle --propose: no unredirected URL loss. Nothing to add.');
    process.exit(0);
  }
  console.log('// Generated by machine/scripts/check-url-lifecycle.mjs --propose (D-028).');
  console.log('// Paste into the `redirects` block of web/astro.config.mjs and');
  console.log('// REPLACE each target with the address that now answers the question.');
  console.log('// A redirect to a page that does not answer it is a 200 that lies.');
  for (const u of dead) {
    const section = '/' + (u.split('/')[1] ?? '');
    console.log(`\t\t"${u}": "${section}",`);
  }
  process.exit(0);
}

if (REPORT) {
  console.log(`built (public): ${PUBLIC.length}   baseline: ${known.size}`);
  console.log(`vanished: ${vanished.length}  (redirected: ${covered.length}, dead: ${dead.length})`);
  console.log(`added: ${added.length}`);
  for (const u of dead) console.log(`  DEAD  ${u}`);
  for (const u of covered) console.log(`  301   ${u} -> ${'(declared)'}`);
  process.exit(0);
}

if (dead.length > 0) {
  // REPORTS, DOES NOT BITE — ADR-047.
  //
  // This ratchet was written under ADR-030, where no published address could
  // die. That rule held while the archive only grew. It does not hold during
  // the refactor: the Oracle's instruction of 2026-09-20 is that what no
  // longer serves is deleted, and under ADR-030 an honest deletion ADDED an
  // address (a redirect) instead of removing one — which is how the site came
  // to publish 599 redirects against 175 pages, 344 of them leading to a page
  // that answered nothing.
  //
  // So the count is printed and the run stays green. What replaces the
  // blocking half is check-url-shape.mjs, which bites: a redirect that leads
  // to an index, to another redirect or to a page the build does not publish
  // is rejected. Losing an address is now a decision a PR states; keeping a
  // lying one is still a defect.
  //
  // Restore the exit code when the Oracle says the refactor is over.
  console.log(`check-url-lifecycle: ${dead.length} published URL(s) are gone with no redirect.\n`);
  for (const u of dead) console.log(`  GONE  https://numinia.org${u}`);
  console.log(`\nReporting, not failing (ADR-047): during the refactor a retired address may be`);
  console.log(`removed rather than redirected. Two things are still required of the PR that`);
  console.log(`does it — say the figure in its body, and re-run --write-baseline in the same`);
  console.log(`commit, so the next cut measures against what this one left.`);
  console.log(`A redirect that survives must lead to the document answering the question`);
  console.log(`(STD-028 URL-005); check-url-shape.mjs enforces that half.`);
  process.exit(0);
}

console.log(
  `check-url-lifecycle: no URL died — the ratchet holds. ` +
    `${PUBLIC.length} public URLs (+${added.length} new, ${covered.length} redirected away).`
);

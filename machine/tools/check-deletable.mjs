#!/usr/bin/env node
/**
 * check-deletable.mjs — may this document be deleted? (ADR-033, P-010 §5)
 *
 * THE RULE THIS IMPLEMENTS
 * ------------------------
 * P-010 §5 used to answer "may I delete this?" with the document's GENRE:
 * debt and blueprints could die, everything else could not, and adding a
 * third series took its own ADR. That is a permission system indexed on
 * folders, and it cost an ADR per folder while never checking the thing
 * that actually breaks — the consumers.
 *
 * ADR-033 replaces it with a consumer test. A document may be deleted when:
 *
 *   1. INBOUND CITATIONS — zero, or every citing document is itself a
 *      closed record (a terminal status, STD-016). A live
 *      document pointing at it is a real reader; a closed one is history
 *      describing history.
 *   2. PUBLIC URLS — every address it publishes is redirected in the same
 *      change. Verified by check-url-lifecycle.mjs against a real build,
 *      not by this script: this one only reports which URLs are at stake.
 *   3. WRITTEN RESOLUTION — some living document records what this one
 *      said and why it no longer holds. Inherited verbatim from ADR-030 §3:
 *      no evidence, no extinction.
 *   4. NOT SEALED — `threshold: sealed` needs the Oracle's signature and an
 *      ADR, whatever the other three say. This guard refuses, it does not
 *      weigh.
 *
 *   node machine/tools/check-deletable.mjs <path>...     # judge specific files
 *   node machine/tools/check-deletable.mjs --candidates  # list everything that passes 1+4
 *
 * WHAT IT DECIDES AND WHAT IT DOES NOT
 * ------------------------------------
 * It decides 1 and 4 mechanically. It REPORTS 2 and cannot verify 3 —
 * whether a resolution was written is a judgment about meaning, and P-010
 * §3.4 already ruled that the citation/mention distinction "lives in the
 * sentence" and is not decidable by pattern. This guard prints the evidence
 * a human needs for 3; it never claims to have made that call.
 *
 * WHAT THIS GUARD DOES NOT CHECK (D-025 — declare your blindness):
 * see machine/scripts/blind-spots.json, entry "check-deletable".
 */
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { declareBlindSpots } from '../scripts/lib/blindness.mjs';
import { loadRules, parseFM } from '../scripts/lib/frontmatter.mjs';
import { isTerminalStatus } from '../scripts/lib/rings.mjs';
declareBlindSpots('check-deletable');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const RULES = loadRules();
const CLOSED = { has: (s) => isTerminalStatus(s, RULES) };   // STD-016 `_terminal`, one set for every guard

const argv = process.argv.slice(2);
const LIST_CANDIDATES = argv.includes('--candidates');
const targets = argv.filter((a) => !a.startsWith('--'));

// D-049: read the index, not the working tree, and say so when they differ.
const files = execFileSync('git', ['-C', ROOT, 'ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .filter((f) => !f.startsWith('web/') && !f.startsWith('.github/'));

const untracked = execFileSync(
  'git', ['-C', ROOT, 'ls-files', '--others', '--exclude-standard', '*.md'], { encoding: 'utf8' }
).split('\n').filter(Boolean);
if (untracked.length) {
  console.warn(`\n⚠ ${untracked.length} untracked .md file(s) — NOT scanned (D-049). A citation from one of them is invisible here.`);
}

/* ---------- index: text, frontmatter, identifiers ---------- */

const doc = new Map();
for (const rel of files) {
  const text = readFileSync(path.join(ROOT, rel), 'utf8');
  const fm = parseFM(text) ?? {};
  const field = (name) => (typeof fm[name] === 'string' ? fm[name] : '');
  const base = path.basename(rel, '.md');
  const ids = new Set([base]);
  const declared = field('id');
  if (declared) ids.add(declared);
  // `absorbs:` — the identifiers this document is the written resolution
  // for (ADR-030 §absorption; the GIT-048 guard resolves them here).
  const absorbs = new Set(Array.isArray(fm.absorbs) ? fm.absorbs.filter(Boolean) : []);
  doc.set(rel, {
    absorbs,
    text,
    status: field('status').toLowerCase(),
    threshold: field('threshold').toLowerCase(),
    title: field('title'),
    ids: [...ids].filter((i) => i.length >= 4),
  });
}

/** Who cites `rel`? Returns [{file, live}] — `live` means the citer is not itself closed. */
function citersOf(rel) {
  const d = doc.get(rel);
  const out = [];
  for (const [other, o] of doc) {
    if (other === rel) continue;
    const hit = d.ids.some((id) => o.text.includes(id)) || o.text.includes(path.basename(rel));
    if (!hit) continue;
    // A document that ABSORBS `rel` is its written resolution (test 3), not
    // a citer that blocks test 1 — otherwise every deletion batch that
    // records what it deletes would block itself on its own record.
    if (d.ids.some((id) => o.absorbs.has(id))) continue;
    out.push({ file: other, live: !CLOSED.has(o.status) });
  }
  return out;
}

/** URLs this document publishes, measured from the real build (never inferred). */
function urlsOf(rel) {
  const distDir = path.join(ROOT, 'web', 'dist');
  if (!existsSync(distDir)) return null;   // null = unknown, NOT zero
  const d = doc.get(rel);
  const segs = new Set(d.ids.map((i) => i.toLowerCase()));
  segs.add(path.basename(rel, '.md').toLowerCase().replace(/\./g, ''));
  let built;
  try {
    built = execFileSync('find', [distDir, '-name', 'index.html'], { encoding: 'utf8' })
      .split('\n').filter(Boolean)
      .map((p) => p.slice(distDir.length).replace(/\/index\.html$/, '') || '/');
  } catch { return null; }
  return built.filter((u) => segs.has(u.split('/').pop()) && !u.startsWith('/print/'));
}

function judge(rel) {
  const d = doc.get(rel);
  if (!d) return { rel, error: 'not tracked by git' };
  const cites = citersOf(rel);
  const live = cites.filter((c) => c.live);
  const urls = urlsOf(rel);
  return {
    rel,
    status: d.status,
    title: d.title,
    sealed: d.threshold === 'sealed',
    citers: cites,
    liveCiters: live,
    urls,
    passes1: live.length === 0,
    passes4: d.threshold !== 'sealed',
  };
}

/* ---------- output ---------- */

if (LIST_CANDIDATES) {
  const rows = [];
  for (const rel of files) {
    const j = judge(rel);
    if (!CLOSED.has(j.status)) continue;     // only closed records are candidates at all
    if (!j.passes1 || !j.passes4) continue;
    rows.push(j);
  }
  console.log(`check-deletable --candidates: ${rows.length} closed document(s) with no LIVING citer.\n`);
  console.log('Each still needs (2) its URLs redirected and (3) a written resolution — neither is decided here.\n');
  for (const j of rows.sort((a, b) => a.rel.localeCompare(b.rel))) {
    const u = j.urls === null ? '?' : j.urls.length;
    console.log(`  ${j.status.padEnd(11)} urls=${String(u).padStart(2)}  citers=${String(j.citers.length).padStart(2)} (all closed)  ${j.rel}`);
  }
  process.exit(0);
}

if (targets.length === 0) {
  console.error('usage: check-deletable.mjs <path.md>...   |   --candidates');
  process.exit(2);
}

let refused = 0;
for (const t of targets) {
  const rel = path.relative(ROOT, path.resolve(t));
  const j = judge(rel);
  console.log(`\n── ${rel}`);
  if (j.error) { console.log(`   ERROR: ${j.error}`); refused++; continue; }
  console.log(`   status: ${j.status || '(none)'}${j.sealed ? '   threshold: SEALED' : ''}`);

  if (!j.passes4) {
    console.log(`   ✗ REFUSED (4) — threshold: sealed. Oracle signature + ADR required (STD-001 §2.1).`);
    refused++; continue;
  }
  if (j.passes1) {
    console.log(`   ✓ (1) inbound citations: ${j.citers.length}, none from a living document.`);
  } else {
    console.log(`   ✗ (1) ${j.liveCiters.length} LIVING document(s) cite this:`);
    for (const c of j.liveCiters.slice(0, 12)) console.log(`        ${c.file}`);
    if (j.liveCiters.length > 12) console.log(`        … +${j.liveCiters.length - 12} more`);
    refused++;
  }
  if (j.urls === null) {
    console.log(`   ? (2) public URLs: UNKNOWN — web/dist absent. Run \`npm run build\` in web/ first.`);
  } else if (j.urls.length === 0) {
    console.log(`   ✓ (2) publishes no public URL.`);
  } else {
    console.log(`   ! (2) publishes ${j.urls.length} public URL(s) — each needs a 301 in the same PR:`);
    for (const u of j.urls) console.log(`        https://numinia.org${u}`);
  }
  console.log(`   ? (3) written resolution: NOT MACHINE-CHECKABLE — name the document that records this one's outcome.`);
}

console.log('');
process.exit(refused > 0 ? 1 : 0);

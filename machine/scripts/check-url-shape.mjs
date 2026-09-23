#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// check-url-shape.mjs — STD-028: one document, one address.
//
// THE PROBLEM THIS SOLVES
// -----------------------
// The site's address space had no rule and the absence was maintained by
// hand. Measured on 4fe4fc6: 774 published addresses, of which 175 were real
// pages and 599 redirects; 344 of those redirects led to an index, a register
// or a report of deletions, which answers nothing; and the `/corpus/` prefix
// stood in front of four series and not the other four, so no address could
// be derived from its series.
//
// ADR-047 removed the prefix and deleted the dead redirects. This guard is
// what keeps them gone. It is the complement of check-url-lifecycle: that one
// asks whether an address that used to answer still answers, this one asks
// whether the addresses being published have the shape the standard requires.
//
// WHAT IT CHECKS — one function per plate of STD-028
// ---------------------------------------------------
//   URL-001  every document address is /<series>/<id>, the series being a
//            folder STD-001 registers. A first segment that is neither a
//            registered series nor a declared standalone page is a finding.
//   URL-002  no address names a function or an activity of STD-027. The
//            /archive/<function> pages are the exception and declare it:
//            they are ABOUT the classification, they do not file a document
//            under it.
//   URL-003  no two addresses serve one document — measured by the canonical
//            each built page declares: two pages claiming one canonical are
//            two addresses for one document.
//   URL-004  path segments are English: a segment in the retired Spanish
//            vocabulary is a finding.
//   URL-005  a redirect leads to a document, never to an index. A redirect
//            whose target is itself a redirect (a chain) is also a finding.
//
// WHY IT READS web/dist
// ---------------------
// Same reason as check-url-lifecycle: every route derives its slug
// differently, and re-deriving them here would be a second source of truth
// that drifts. This measures what was actually published. It is a BUILD
// GUARD — it verifies the artefact, not a rule in prose, so ENG-067's regime
// does not apply and it exits non-zero on a finding whatever STD-028's state.
//
// WHAT IT IS BLIND TO (D-025): machine/scripts/blind-spots.json, printed on
// every exit path.
//
//   node machine/scripts/check-url-shape.mjs            verify
//   node machine/scripts/check-url-shape.mjs --report   full detail, exit 0
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { declareBlindSpots } from './lib/blindness.mjs';

declareBlindSpots('check-url-shape');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = path.join(ROOT, 'web', 'dist');
const SERIES_REGISTER = path.join(ROOT, 'standards', 'STD-001-the-series.md');
const SCHEME = path.join(ROOT, 'standards', 'STD-027-the-classification-scheme.md');

const REPORT = process.argv.includes('--report');

// ---------------------------------------------------------------------------
// WHAT IS NOT A DOCUMENT ADDRESS
// ---------------------------------------------------------------------------
//
// The site serves pages that are not corpus documents: the home, the
// classification pages, the dashboards, the legal texts, the build artefacts.
// URL-001 governs where a DOCUMENT lives; these are declared here so the
// guard does not report the site's own furniture as a malformed document
// address. Adding a page to this list is a deliberate act — it is the one
// place a new top-level address is admitted.
const STANDALONE = new Set([
  '/',            // the home — the threshold: what this place is and the six doors in
  '/scheme',      // the classification in full: vocabulary, every series, the second fond
  '/archive',     // the function pages (/archive/<function>, see URL-002); the bare address redirects to /
  '/updates',     // the site's own version timeline
  '/telemetry',   // the measured figures
  '/agent',       // the roster's detail view
  '/binding',     // what is in force while the rules are draft — the regime, from AGENTS.md
  // 2026-09-21: /wardley /gaps /cao /continuity /language /sales /simulations
  // /solutions moved under /system/ — a series segment, so URL-001 admits
  // them without a line here. Their old roots are redirects now.
  '/legal',       // the legal texts, published from operations/
  '/diseno',      // the design kit's served files
  '/404',
]);

/** Spanish segments the corpus retired. URL-004 reports any survivor. */
const SPANISH = new Set([
  'misiones', 'decisiones', 'planos', 'reportes', 'auditoria', 'agente',
  'simulaciones', 'soluciones', 'ventas', 'continuidad', 'idioma', 'brechas',
  'actualizaciones', 'es', 'corpus',
]);

// ---------------------------------------------------------------------------
// READING THE STANDARDS
// ---------------------------------------------------------------------------

/** The series folders STD-001 registers, as URL segments. */
export function seriesSegments(text) {
  const out = new Set();
  for (const line of text.split('\n')) {
    if (!line.startsWith('| ')) continue;
    const first = line.split('|')[1]?.trim().replace(/`/g, '') ?? '';
    if (!first.endsWith('/')) continue;
    // machine/guards/ and the like are instruments: never published, so never
    // a published address. Only the first segment of a top-level series is an
    // address segment.
    if (first.includes('/', first.indexOf('/') + 1)) continue;
    out.add(first.slice(0, -1));
  }
  return out;
}

/** The function and activity names STD-027 uses, lowercased. URL-002. */
export function schemeWords(text) {
  const fns = new Set();
  const acts = new Set();
  let inTable = false;
  for (const line of text.split('\n')) {
    // The scheme is the first three-column table of the standard; the blank
    // line after it ends the read, so the Check and References tables below
    // (also three columns) are not mistaken for more of the scheme. Without
    // this, `ADR-046` in the References table is read as an activity and every
    // address naming that decision is reported as a functional URL.
    if (inTable && line.trim() === '') break;
    if (!line.startsWith('| ')) continue;
    const c = line.split('|').slice(1, -1).map((x) => x.trim().replace(/\*\*/g, '').replace(/`/g, ''));
    if (c.length < 3) continue;
    if (c[0] === 'Function' && c[1] === 'Activity') { inTable = true; continue; }
    if (/^-+$/.test(c[0])) continue;
    if (!inTable) continue;
    if (c[0]) fns.add(c[0].toLowerCase());
    if (c[1]) acts.add(c[1].toLowerCase());
  }
  return { fns, acts };
}

// ---------------------------------------------------------------------------
// READING THE BUILD
// ---------------------------------------------------------------------------

/** Every directory under dist/ with an index.html, as a site path. */
function builtPages(dir = DIST, prefix = '') {
  const out = [];
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  if (entries.some((e) => e.isFile() && e.name === 'index.html')) {
    out.push(prefix === '' ? '/' : prefix);
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (prefix === '' && (e.name === '_astro' || e.name === 'pagefind')) continue;
    out.push(...builtPages(path.join(dir, e.name), `${prefix}/${e.name}`));
  }
  return out;
}

/**
 * Every address the build serves: a directory with an index.html, and every
 * plain file. Both are redirect targets — `/legal/terms.md` and
 * `/diseno/kit/sistema.css` are addresses a reader can be sent to, and a
 * check that counted only directories reported four live redirects as dead.
 */
function servedAddresses() {
  const out = new Set();
  const walk = (dir, prefix) => {
    let entries;
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.isDirectory()) {
        if (prefix === '' && (e.name === '_astro' || e.name === 'pagefind')) continue;
        walk(path.join(dir, e.name), `${prefix}/${e.name}`);
      } else if (e.name === 'index.html') {
        out.add(prefix === '' ? '/' : prefix);
      } else {
        out.add(`${prefix}/${e.name}`);
      }
    }
  };
  walk(DIST, '');
  return out;
}

/** A page's redirect target, or null when it is a real page. */
function redirectTarget(url) {
  const file = path.join(DIST, url === '/' ? '' : url.slice(1), 'index.html');
  let head;
  try { head = readFileSync(file, 'utf8').slice(0, 1200); } catch { return null; }
  if (!/http-equiv=["']?refresh/i.test(head)) return null;
  return head.match(/url=([^"'>\s]+)/i)?.[1] ?? null;
}

/** A real page's declared canonical path, or null. URL-003 compares these. */
function canonicalOf(url) {
  const file = path.join(DIST, url === '/' ? '' : url.slice(1), 'index.html');
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { return null; }
  const href = text.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!href) return null;
  return href.replace(/^https?:\/\/[^/]+/, '') || '/';
}

// ---------------------------------------------------------------------------
// THE CHECK
// ---------------------------------------------------------------------------

export function run() {
  const findings = [];
  const series = seriesSegments(readFileSync(SERIES_REGISTER, 'utf8'));
  const { fns, acts } = schemeWords(readFileSync(SCHEME, 'utf8'));

  const pages = builtPages().filter((u) => !u.startsWith('/print/'));
  const served = servedAddresses();
  const real = [];
  const redirects = new Map();
  for (const u of pages) {
    const t = redirectTarget(u);
    if (t) redirects.set(u, t); else real.push(u);
  }

  // URL-001 / URL-004 — the shape of every real address.
  for (const url of real) {
    const segs = url.split('/').filter(Boolean);
    const first = segs[0] ?? '';
    for (const s of segs) {
      if (SPANISH.has(s)) {
        findings.push({ plate: 'URL-004', what: `address carries the retired segment "${s}"`, where: url });
        break;
      }
    }
    if (url === '/' || STANDALONE.has(`/${first}`)) continue;
    if (!series.has(first)) {
      findings.push({
        plate: 'URL-001',
        what: `first segment "${first}" is neither a series of STD-001 nor a declared standalone page ` +
          `(machine/scripts/check-url-shape.mjs, STANDALONE)`,
        where: url,
      });
    }
  }

  // URL-002 — the function never files a document. /archive/<function> is
  // the declared exception: those pages are ABOUT the classification.
  for (const url of real) {
    if (url === '/archive' || url.startsWith('/archive/')) continue;
    for (const seg of url.split('/').filter(Boolean)) {
      if (fns.has(seg) || acts.has(seg)) {
        findings.push({ plate: 'URL-002', what: `address names the function or activity "${seg}"`, where: url });
        break;
      }
    }
  }

  // URL-003 — two addresses, one document.
  const byCanonical = new Map();
  for (const url of real) {
    const c = canonicalOf(url);
    if (!c) continue;
    if (!byCanonical.has(c)) byCanonical.set(c, []);
    byCanonical.get(c).push(url);
  }
  for (const [canonical, urls] of byCanonical) {
    if (urls.length < 2) continue;
    findings.push({
      plate: 'URL-003',
      what: `${urls.length} addresses serve one document (canonical ${canonical}): ${urls.join(', ')}`,
      where: urls[0],
    });
  }

  // URL-005 — a redirect leads to a document, never to an index, and never
  // to another redirect.
  //
  // ONE EXCEPTION, and it is not a loophole: when the retired address named a
  // FOLDER rather than a document (`/archive/canon` asked "what is in canon?"),
  // that folder's index IS the document answering it. The test is on the
  // SOURCE — a source with no document identifier in it may land on an index;
  // a source that named a document may not, because no index mentions it.
  const indexPaths = new Set([...series].map((s) => `/${s}`));
  const namesADocument = (u) => /\b[a-z]{2,4}-\d{3,4}\b/.test(u);
  for (const [url, target] of redirects) {
    const clean = target.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
    if (redirects.has(clean)) {
      findings.push({ plate: 'URL-005', what: `redirect chain: leads to ${clean}, itself a redirect`, where: url });
      continue;
    }
    if (clean === '/' || indexPaths.has(clean) || STANDALONE.has(clean)) {
      if (!namesADocument(url)) continue;
      findings.push({
        plate: 'URL-005',
        what: `redirect leads to the index ${clean}, which does not name the document this address served`,
        where: url,
      });
      continue;
    }
    if (!served.has(clean)) {
      findings.push({ plate: 'URL-005', what: `redirect leads to ${clean}, which the build does not publish`, where: url });
    }
  }

  return { findings, counts: { pages: pages.length, real: real.length, redirects: redirects.size } };
}

function main() {
  if (!existsSync(DIST)) {
    console.error('check-url-shape: web/dist not found.');
    console.error('  This guard measures the real build (see header). Run `npm run build` in web/ first.');
    process.exit(1);
  }
  const { findings, counts } = run();
  if (counts.pages === 0) {
    console.error('check-url-shape: web/dist published zero URLs — refusing to pass vacuously (D-039).');
    process.exit(1);
  }

  if (REPORT) {
    console.log(`published: ${counts.pages}  (pages: ${counts.real}, redirects: ${counts.redirects})`);
    for (const f of findings) console.log(`  ${f.plate}  ${f.what}\n      ${f.where}`);
    console.log(`${findings.length} finding(s).`);
    process.exit(0);
  }

  if (findings.length) {
    console.error(`check-url-shape: ${findings.length} address(es) do not hold STD-028.\n`);
    for (const f of findings) console.error(`  ✗ ${f.plate}  ${f.what}\n      ${f.where}`);
    console.error('\nA document is served at /<series>/<id>, once, in English; a redirect leads to');
    console.error('the document that answers the question, or the address is removed (STD-028).');
    process.exit(1);
  }

  console.log(
    `check-url-shape: ${counts.real} document address(es) hold their shape, ` +
      `${counts.redirects} redirect(s) lead to a document (STD-028).`,
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();

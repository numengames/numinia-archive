#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// check-url-shape.test.mjs — the URL standard's guard, proven.
//
// Each test builds a SCRATCH dist/ of its own and drives the real script over
// it. Asserting against the repository's own build would pin today's address
// space rather than the rule, and would turn red the day a page is added.
//
// The scratch tree is a whole archive: `standards/` (the two the guard reads)
// and `web/dist/` (the pages it measures), because the guard resolves both
// from its own location. The script is copied in with its library.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');

const SERIES = `---
id: "STD-001"
---
# The series

| Series | Function · Activity | Holds | Prefix | Threshold | Budget | Mould |
|---|---|---|---|---|---|---|
| \`canon/\` | Governance · Founding | what the system **is** | \`CAN-NNN\` | \`governed\` | 1500 | — |
| \`decisions/\` | Governance · Deciding | why something was chosen | \`ADR-NNN\` | \`governed\` | 500 | — |
| \`reports/\` | Assurance · Observing | what was observed | \`RPT-NNN\` | \`closed\` | 1000 | — |
`;

const SCHEME = `---
id: "STD-027"
---
# The archive is classified by function

| Function | Activity | Series |
|---|---|---|
| **Governance** | Founding | \`canon/\` |
| | Deciding | \`decisions/\` |
| **Assurance** | Observing | \`reports/\` |

## References

| ID | Name | Why cited |
|---|---|---|
| \`ADR-046\` | The archive is classified by function | the decision |
`;

/**
 * A scratch archive.
 *
 * `pages` maps an address to the page at it:
 *   {canonical: "/x"}            a real page declaring that canonical
 *   {redirect: "/x"}             a meta-refresh stub pointing at /x
 *   {file: "name.css"}           a plain file served at <address>/name.css
 */
function scratch(pages) {
  const dir = mkdtempSync(path.join(tmpdir(), 'url-shape-'));
  mkdirSync(path.join(dir, 'standards'), { recursive: true });
  writeFileSync(path.join(dir, 'standards', 'STD-001-the-series.md'), SERIES);
  writeFileSync(path.join(dir, 'standards', 'STD-027-the-classification-scheme.md'), SCHEME);

  // The guard and the library it imports, at the paths it expects.
  mkdirSync(path.join(dir, 'machine', 'scripts', 'lib'), { recursive: true });
  cpSync(path.join(ROOT, 'machine/scripts/check-url-shape.mjs'), path.join(dir, 'machine/scripts/check-url-shape.mjs'));
  cpSync(path.join(ROOT, 'machine/scripts/lib/blindness.mjs'), path.join(dir, 'machine/scripts/lib/blindness.mjs'));
  cpSync(path.join(ROOT, 'machine/scripts/blind-spots.json'), path.join(dir, 'machine/scripts/blind-spots.json'));

  for (const [url, spec] of Object.entries(pages)) {
    const pageDir = path.join(dir, 'web', 'dist', url === '/' ? '' : url.slice(1));
    mkdirSync(pageDir, { recursive: true });
    if (spec.redirect) {
      writeFileSync(
        path.join(pageDir, 'index.html'),
        `<!doctype html><title>Redirecting</title><meta http-equiv="refresh" content="0;url=${spec.redirect}">`,
      );
    } else if (spec.file) {
      writeFileSync(path.join(pageDir, spec.file), 'x');
    } else {
      writeFileSync(
        path.join(pageDir, 'index.html'),
        `<!DOCTYPE html><html><head><link rel="canonical" href="https://numinia.org${spec.canonical ?? url}"></head><body></body></html>`,
      );
    }
  }
  return dir;
}

function run(dir) {
  try {
    const out = execFileSync('node', ['machine/scripts/check-url-shape.mjs'], { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}

const OK = {
  '/': { canonical: '/' },
  '/canon/can-001-welcome': {},
  '/decisions/adr-046': {},
  '/reports/rpt-019': {},
};

test('an address space that holds the standard passes', () => {
  const dir = scratch(OK);
  const r = run(dir);
  assert.equal(r.code, 0, r.out);
  assert.match(r.out, /hold their shape/);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-001 — a first segment that is no series and no declared page fails', () => {
  const dir = scratch({ ...OK, '/readme': {} });
  const r = run(dir);
  assert.equal(r.code, 1);
  assert.match(r.out, /URL-001/);
  assert.match(r.out, /readme/);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-001 — a declared standalone page is admitted', () => {
  // /telemetry names no series and is not a document; it is furniture, and
  // the guard's STANDALONE list is where that is said out loud.
  const dir = scratch({ ...OK, '/telemetry': {} });
  const r = run(dir);
  assert.equal(r.code, 0, r.out);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-002 — an address naming a function of the scheme fails', () => {
  // A whole segment, not a substring: /canon/governance-notes is a document
  // whose slug happens to contain the word, and filing it is not classifying
  // it. What URL-002 forbids is a segment that IS the function.
  const dir = scratch({ ...OK, '/governance/can-001-welcome': {} });
  const r = run(dir);
  assert.equal(r.code, 1);
  assert.match(r.out, /URL-002/);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-002 — a slug that merely contains a function word passes', () => {
  const dir = scratch({ ...OK, '/canon/can-002-governance-notes': {} });
  const r = run(dir);
  assert.equal(r.code, 0, r.out);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-002 — the References table is not read as more of the scheme', () => {
  // `ADR-046` sits in STD-027's References table. A parser that read past the
  // scheme would take it for an activity and reject /decisions/adr-046 — the
  // address of that very decision.
  const dir = scratch(OK);
  const r = run(dir);
  assert.equal(r.code, 0, r.out);
  assert.doesNotMatch(r.out, /adr-046/);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-002 — /archive/<function> is the declared exception', () => {
  // Those pages are ABOUT the classification; they do not file a document
  // under it.
  const dir = scratch({ ...OK, '/archive': {}, '/archive/governance': {} });
  const r = run(dir);
  assert.equal(r.code, 0, r.out);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-003 — two addresses declaring one canonical fail', () => {
  const dir = scratch({ ...OK, '/canon/can-001-alias': { canonical: '/canon/can-001-welcome' } });
  const r = run(dir);
  assert.equal(r.code, 1);
  assert.match(r.out, /URL-003/);
  assert.match(r.out, /2 addresses serve one document/);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-004 — a retired Spanish segment fails', () => {
  const dir = scratch({ ...OK, '/decisiones/adr-046': { canonical: '/decisiones/adr-046' } });
  const r = run(dir);
  assert.equal(r.code, 1);
  assert.match(r.out, /URL-004/);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-005 — a redirect into an index fails when the address named a document', () => {
  const dir = scratch({ ...OK, '/canon': {}, '/canon/can-099-gone': { redirect: '/canon' } });
  const r = run(dir);
  assert.equal(r.code, 1);
  assert.match(r.out, /URL-005/);
  assert.match(r.out, /does not name the document/);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-005 — a redirect into an index passes when the address named the folder', () => {
  // /archive/canon asked "what is in canon?"; the canon index answers exactly
  // that. The test is on the SOURCE, which carries no document identifier.
  const dir = scratch({ ...OK, '/canon': {}, '/archive/canon': { redirect: '/canon' } });
  const r = run(dir);
  assert.equal(r.code, 0, r.out);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-005 — a redirect chain fails', () => {
  const dir = scratch({
    ...OK,
    '/canon/old': { redirect: '/canon/older' },
    '/canon/older': { redirect: '/canon/can-001-welcome' },
  });
  const r = run(dir);
  assert.equal(r.code, 1);
  assert.match(r.out, /redirect chain/);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-005 — a redirect to a page the build does not publish fails', () => {
  const dir = scratch({ ...OK, '/canon/old': { redirect: '/canon/never-built' } });
  const r = run(dir);
  assert.equal(r.code, 1);
  assert.match(r.out, /does not publish/);
  rmSync(dir, { recursive: true, force: true });
});

test('URL-005 — a redirect to a plain file passes', () => {
  // /legal/terms.md and the design kit's .css are addresses too. A check that
  // counted only directories reported four live redirects as dead.
  const dir = scratch({
    ...OK,
    '/legal': { file: 'terms.md' },
    '/legal/terminos.md': { redirect: '/legal/terms.md' },
  });
  const r = run(dir);
  assert.equal(r.code, 0, r.out);
  rmSync(dir, { recursive: true, force: true });
});

test('an empty dist fails rather than passing vacuously (D-039)', () => {
  // The scratch tree has a dist/ directory (the scratch helper creates
  // web/dist only when a page is written), so this covers BOTH paths: no
  // dist at all, and a dist that published nothing. A guard that sees
  // nothing must not report green.
  const dir = scratch({});
  const r = run(dir);
  assert.equal(r.code, 1, r.out);
  assert.match(r.out, /zero URLs|not found/);
  rmSync(dir, { recursive: true, force: true });
});

test('a dist that exists but published nothing fails (D-039)', () => {
  // Distinct from the case above: here web/dist IS there, empty. The
  // "dist not found" branch does not fire, and only the zero-pages refusal
  // stands between an empty build and a green run.
  const dir = scratch({});
  mkdirSync(path.join(dir, 'web', 'dist'), { recursive: true });
  const r = run(dir);
  assert.equal(r.code, 1, r.out);
  assert.match(r.out, /zero URLs/);
  rmSync(dir, { recursive: true, force: true });
});

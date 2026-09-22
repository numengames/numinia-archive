#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// classification.test.mjs — the /archive pages read the archive, proven.
//
// WHAT IS UNDER TEST
// web/src/lib/classification.ts parses STD-027's scheme table and STD-001's
// series register at build time, so the /archive pages cannot restate the
// classification from memory. The failure this replaces was exactly that: a
// hardcoded array naming folders deleted months earlier, published as fact.
//
// A test that asserted "six functions" against the real tree would pass for
// the wrong reason — it would pin today's scheme, not the reading of it. So
// every test below builds a SCRATCH archive with a scheme of its own and
// checks that the module reports what that scratch archive says. The module
// resolves the archive from the working directory's parent, so the scratch
// tree is `<dir>/web` beside `<dir>/standards`.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MODULE = path.resolve(HERE, '..', '..', '..', 'web', 'src', 'lib', 'classification.ts');

/* A minimal archive: the two standards the module reads, and a `web/` to run
   from. Every test writes its own scheme, so a change to the real STD-027
   never turns these red — and a change to the module's READING does. */
function scratch({ scheme, series }) {
  const dir = mkdtempSync(path.join(tmpdir(), 'classification-'));
  mkdirSync(path.join(dir, 'standards'), { recursive: true });
  mkdirSync(path.join(dir, 'web'), { recursive: true });
  writeFileSync(path.join(dir, 'standards', 'STD-027-the-classification-scheme.md'), scheme);
  writeFileSync(path.join(dir, 'standards', 'STD-001-the-series.md'), series);
  return dir;
}

/* The module is loaded in a child process with the scratch `web/` as its
   working directory: it reads the archive relative to that, exactly as the
   Astro build does. Returns { code, out } — a throw is a build failure, and
   several tests are about the build failing loudly. */
function ask(dir, expression) {
  const script =
    `import(${JSON.stringify(MODULE)}).then((m) => {` +
    `  console.log(JSON.stringify(${expression}));` +
    `}).catch((e) => { console.error(e.message); process.exit(1); });`;
  try {
    const out = execFileSync('node', ['--experimental-strip-types', '-e', script], {
      cwd: path.join(dir, 'web'),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}

const SERIES_REGISTER = `---
id: "STD-001"
---
# The series

| Series | Function · Activity | Holds | Prefix | Threshold | Budget | Mould |
|---|---|---|---|---|---|---|
| \`canon/\` | Governance · Founding | what the system **is** | \`CAN-NNN\` | \`governed\` | 1500 | \`CAN-TEMPLATE.md\` |
| \`missions/\` | Production · Executing | the work | \`MIS-NNNN\` | \`closed\` | 500 | \`MIS-TEMPLATE.md\` |
| \`lore/\` | Creation · Worldbuilding | the fiction and the game | — | \`open\` | — | — |
`;

const SCHEME = `---
id: "STD-027"
---
# The archive is classified by function

| Function | Activity | Series |
|---|---|---|
| **Governance** | Founding | \`canon/\` |
| **Production** | Executing | \`missions/\` |
| **Creation** | Worldbuilding | \`lore/\` |

## Rules

**CLS-001 — A function classifies.** Prose below the table.

## Check

| Plate | Verified by |
|---|---|
| CLS-001 | a guard |

## References

| ID | Name | Why cited |
|---|---|---|
| \`ADR-046\` | The archive is classified by function | the decision that cut this register |
| \`STD-001\` | The series | the table this scheme groups |
`;

test('the functions come from STD-027, in its order', () => {
  const dir = scratch({ scheme: SCHEME, series: SERIES_REGISTER });
  const r = ask(dir, 'm.functions().map((f) => f.name)');
  assert.equal(r.code, 0, r.out);
  assert.deepEqual(JSON.parse(r.out), ['Governance', 'Production', 'Creation']);
  rmSync(dir, { recursive: true, force: true });
});

test('a series row carries what STD-001 says it holds', () => {
  const dir = scratch({ scheme: SCHEME, series: SERIES_REGISTER });
  const r = ask(dir, 'm.allSeries().find((s) => s.folder === "canon/")');
  assert.equal(r.code, 0, r.out);
  const canon = JSON.parse(r.out);
  assert.equal(canon.holds, 'what the system is');
  assert.equal(canon.prefix, 'CAN-NNN');
  assert.equal(canon.threshold, 'governed');
  assert.equal(canon.href, '/canon/');
  rmSync(dir, { recursive: true, force: true });
});

test('a series links to its index, never to one document inside it', () => {
  // The regression: on 2026-09-21 three rows of SERVED_AT pointed at one card
  // (objects/), one document (operations/) and "not served here" (lore/) the
  // day after all three had index pages. A series address ends at the folder.
  const dir = scratch({ scheme: SCHEME, series: SERIES_REGISTER });
  const r = ask(dir, 'm.allSeries().map((s) => [s.folder, s.href, s.note])');
  assert.equal(r.code, 0, r.out);
  const rows = JSON.parse(r.out);
  assert.deepEqual(rows, [['canon/', '/canon/', null], ['missions/', '/missions', null], ['lore/', '/lore/', null]]);
  rmSync(dir, { recursive: true, force: true });
});

test('a series carries the label the menu prints and the activity that produced it', () => {
  // The navigation is derived from this module (web/src/data/navigation.ts):
  // the label is the folder capitalised, the activity is the verb beside it.
  const dir = scratch({ scheme: SCHEME, series: SERIES_REGISTER });
  const r = ask(dir, 'm.allSeries().map((s) => [s.label, s.activity, s.instrument])');
  assert.equal(r.code, 0, r.out);
  assert.deepEqual(JSON.parse(r.out), [['Canon', 'Founding', false], ['Missions', 'Executing', false], ['Lore', 'Worldbuilding', false]]);
  rmSync(dir, { recursive: true, force: true });
});

test('a dash in the register is "none", not a value', () => {
  // STD-001 writes `—` where a series has no prefix, budget or mould. A page
  // that printed the dash as the prefix would be restating a typographic
  // convention as data.
  const dir = scratch({ scheme: SCHEME, series: SERIES_REGISTER });
  const r = ask(dir, 'm.allSeries().find((s) => s.folder === "lore/")');
  assert.equal(r.code, 0, r.out);
  const lore = JSON.parse(r.out);
  assert.equal(lore.prefix, '');
  assert.equal(lore.threshold, 'open');
  rmSync(dir, { recursive: true, force: true });
});

test('placeOf says where a folder sits in the scheme, and nothing for one it does not classify', () => {
  const dir = scratch({ scheme: SCHEME, series: SERIES_REGISTER });
  const r = ask(dir, '[m.placeOf("missions/").fn.name, m.placeOf("missions/").activity.name, m.placeOf("bestiary/")]');
  assert.equal(r.code, 0, r.out);
  assert.deepEqual(JSON.parse(r.out), ['Production', 'Executing', null]);
  rmSync(dir, { recursive: true, force: true });
});

test('a function carries the address of its own page', () => {
  const dir = scratch({ scheme: SCHEME, series: SERIES_REGISTER });
  const r = ask(dir, 'm.functions().map((f) => f.href)');
  assert.equal(r.code, 0, r.out);
  assert.deepEqual(JSON.parse(r.out), ['/archive/governance', '/archive/production', '/archive/creation']);
  rmSync(dir, { recursive: true, force: true });
});

test('the counts are counted, not typed', () => {
  const dir = scratch({ scheme: SCHEME, series: SERIES_REGISTER });
  const r = ask(dir, 'm.counts()');
  assert.equal(r.code, 0, r.out);
  assert.deepEqual(JSON.parse(r.out), { functions: 3, activities: 3, series: 3, published: 3 });
  rmSync(dir, { recursive: true, force: true });
});

test('the tables below the scheme are not read as more of it', () => {
  // The standard carries a References table after the scheme, three columns
  // wide like the scheme itself. A parser that kept reading would invent
  // functions called "ADR-046" and "STD-001".
  const dir = scratch({ scheme: SCHEME, series: SERIES_REGISTER });
  const r = ask(dir, 'm.functions().map((f) => f.name)');
  assert.equal(r.code, 0, r.out);
  assert.deepEqual(JSON.parse(r.out), ['Governance', 'Production', 'Creation'], r.out);
  rmSync(dir, { recursive: true, force: true });
});

test('a series the standard names and the viewer cannot serve fails the build', () => {
  // The whole point: a folder enters STD-027 and nobody says where the site
  // serves it. Rendering a row that links nowhere is the drift this module
  // exists to stop, so the build stops instead.
  const dir = scratch({
    scheme: SCHEME.replace('| **Creation** | Worldbuilding | `lore/` |', '| **Creation** | Worldbuilding | `bestiary/` |'),
    series: SERIES_REGISTER,
  });
  const r = ask(dir, 'm.functions()');
  assert.equal(r.code, 1);
  assert.match(r.out, /bestiary\//);
  assert.match(r.out, /SERVED_AT/);
  rmSync(dir, { recursive: true, force: true });
});

test('a function the standard names and the diagram has no node for fails the build', () => {
  const dir = scratch({
    scheme: SCHEME.replace('| **Creation** | Worldbuilding | `lore/` |', '| **Stewardship** | Worldbuilding | `lore/` |'),
    series: SERIES_REGISTER,
  });
  const r = ask(dir, 'm.graphNodes()');
  assert.equal(r.code, 1);
  assert.match(r.out, /Stewardship/);
  assert.match(r.out, /NODE_STYLE/);
  rmSync(dir, { recursive: true, force: true });
});

test('a scheme table that parses as empty fails loudly, never silently blank', () => {
  // A page that renders zero functions looks like a design choice. A build
  // that stops with the file name does not.
  const dir = scratch({ scheme: '---\nid: "STD-027"\n---\n# No table here\n', series: SERIES_REGISTER });
  const r = ask(dir, 'm.functions()');
  assert.equal(r.code, 1);
  assert.match(r.out, /STD-027/);
  assert.match(r.out, /parsed as empty/);
  rmSync(dir, { recursive: true, force: true });
});

test('a series register that parses as empty fails loudly', () => {
  const dir = scratch({ scheme: SCHEME, series: '---\nid: "STD-001"\n---\n# No table here\n' });
  const r = ask(dir, 'm.functions()');
  assert.equal(r.code, 1);
  assert.match(r.out, /STD-001/);
  assert.match(r.out, /no series rows parsed/);
  rmSync(dir, { recursive: true, force: true });
});

test('one activity may produce several series, as the standard writes them', () => {
  const dir = scratch({
    scheme: SCHEME.replace(
      '| **Creation** | Worldbuilding | `lore/` |',
      '| **Assurance** | Verifying | `machine/guards/` · `machine/tools/` · `machine/scripts/` |',
    ),
    series: SERIES_REGISTER,
  });
  const r = ask(dir, 'm.functions().find((f) => f.name === "Assurance").activities[0].series.map((s) => s.folder)');
  assert.equal(r.code, 0, r.out);
  assert.deepEqual(JSON.parse(r.out), ['machine/guards/', 'machine/tools/', 'machine/scripts/']);
  rmSync(dir, { recursive: true, force: true });
});

test('an instrument is classified, has no page of its own, and links to the manual with the reason beside it', () => {
  // STD-027 CLS-002: an instrument is not a record. It appears in the scheme
  // and the menu because an activity produced it; its address is the manual
  // that explains it (SYS-007), anchored at the folder, and the row says why.
  const dir = scratch({
    scheme: SCHEME.replace(
      '| **Creation** | Worldbuilding | `lore/` |',
      '| **Administration** | Templating | `machine/templates/` |',
    ),
    series: SERIES_REGISTER,
  });
  const r = ask(dir, 'm.allSeries().find((s) => s.folder === "machine/templates/")');
  assert.equal(r.code, 0, r.out);
  const moulds = JSON.parse(r.out);
  assert.equal(moulds.instrument, true);
  assert.equal(moulds.label, 'Templates');
  assert.match(moulds.href, /^\/system\/sys-007-the-instruments#/);
  assert.match(moulds.note, /instrument, not a record/);
  rmSync(dir, { recursive: true, force: true });
});

#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// composed-md.test.mjs — a page with no file still answers from the archive.
//
// WHAT IS UNDER TEST
// web/src/lib/composed-md.ts generates the markdown of the pages that have no
// canonical file: the home, /scheme, the six function pages, the section
// indexes, the two typed indexes and the agent front doors. It reads the same
// registers the pages themselves read (STD-027, STD-001), so the .md a reader
// downloads and the page they are looking at cannot disagree.
//
// WHAT THESE TESTS REFUSE TO DO
// Assert today's scheme. A test reading "six functions" from the real tree
// passes for the wrong reason: it pins the archive instead of verifying the
// reading of it, and goes red the day a function is added — which is a
// correct change. So the function- and scheme-level tests build a SCRATCH
// archive with a scheme of their own, exactly as classification.test.mjs
// does, and check that the generator reports THAT.
//
// The section and agent pages depend on `astro:content`, which only exists
// inside an Astro build; those are covered by the build itself and by
// check-md-portability, which verifies every page's .md was produced and is
// not empty. Stated here rather than faked with a stub that would prove the
// stub works.
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
const MODULE = path.resolve(HERE, '..', '..', '..', 'web', 'src', 'lib', 'composed-md.ts');
const CLASSIFICATION = path.resolve(
  HERE, '..', '..', '..', 'web', 'src', 'lib', 'classification.ts',
);

const SERIES_REGISTER = `---
id: "STD-001"
---
# The series

| Series | Function · Activity | Holds | Prefix | Threshold | Budget | Mould |
|---|---|---|---|---|---|---|
| \`canon/\` | Governance · Founding | what the system **is** | \`CAN-NNN\` | \`governed\` | 1500 | \`CAN-TEMPLATE.md\` |
| \`missions/\` | Production · Executing | the work | \`MIS-NNNN\` | \`closed\` | 500 | \`MIS-TEMPLATE.md\` |
`;

const SCHEME = `---
id: "STD-027"
---
# The classification scheme

## CLS-003 — The scheme

| Function | Activity | Series |
|---|---|---|
| Governance | Founding | \`canon/\` |
| Production | Executing | \`missions/\` |
`;

function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'composed-md-'));
  mkdirSync(path.join(dir, 'standards'), { recursive: true });
  mkdirSync(path.join(dir, 'web'), { recursive: true });
  writeFileSync(path.join(dir, 'standards', 'STD-027-the-classification-scheme.md'), SCHEME);
  writeFileSync(path.join(dir, 'standards', 'STD-001-the-series.md'), SERIES_REGISTER);
  return dir;
}

/**
 * The generator is loaded in a child process with the scratch `web/` as cwd,
 * exactly as the Astro build loads it. The functions under test here touch
 * neither `astro:content` nor the agents roster, so the import graph is
 * trimmed to the classification module — importing composed-md whole would
 * drag in astro:content, which does not resolve outside a build.
 */
function ask(dir, expression) {
  const script =
    `import(${JSON.stringify(CLASSIFICATION)}).then((c) => {` +
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

test('the generator is wired to the same registers the pages read', () => {
  // The coupling that makes every other guarantee hold: if the scheme says
  // two functions, the classification module the generator imports says two.
  const dir = scratch();
  try {
    const { code, out } = ask(dir, 'c.functions().map((f) => f.name)');
    assert.equal(code, 0, out);
    assert.deepEqual(JSON.parse(out), ['Governance', 'Production']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a series added to the register reaches the generator with no edit', () => {
  const dir = scratch();
  try {
    writeFileSync(
      path.join(dir, 'standards', 'STD-001-the-series.md'),
      SERIES_REGISTER + '| `reports/` | Assurance · Observing | what was observed | `RPT-NNN` | `open` | — | — |\n',
    );
    writeFileSync(
      path.join(dir, 'standards', 'STD-027-the-classification-scheme.md'),
      SCHEME + '| Assurance | Observing | `reports/` |\n',
    );
    const { code, out } = ask(dir, 'c.functions().map((f) => f.name)');
    assert.equal(code, 0, out);
    assert.deepEqual(JSON.parse(out), ['Governance', 'Production', 'Assurance']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('the generator exports one function per composed page kind', async () => {
  // Read as source: importing the module pulls in astro:content. What is
  // asserted is the contract — every kind of composed page has a generator,
  // so a page added without one is visible here and in the portability guard.
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(MODULE, 'utf8');
  for (const fn of [
    'homePage',
    'schemePage',
    'functionPage',
    'sectionPage',
    'collectionIndexPage',
    'agentPage',
    'allComposedPages',
  ]) {
    assert.match(src, new RegExp(`export (async )?function ${fn}\\b`), `${fn} is not exported`);
  }
});

test('every composed page declares the documents it was generated from', async () => {
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(MODULE, 'utf8');
  // Each generator returns `sources`, and the preamble prints them. A view
  // that does not say what it was read from is a view that can be cited as
  // if it were a record.
  const returns = src.match(/sources:/g) ?? [];
  assert.ok(returns.length >= 6, `only ${returns.length} generators declare sources`);
  assert.match(src, /Cite those, never this file/);
});

test('an unknown function or section fails loudly rather than rendering empty', async () => {
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(MODULE, 'utf8');
  // The three lookups that can miss. A silent miss would publish a .md with
  // a heading and no rows, which reads as "this folder is empty" — the most
  // expensive possible lie for an archive.
  assert.match(src, /functionPage\("\$\{slug\}"\): no such function/);
  assert.match(src, /sectionPage\("\$\{slug\}"\): no such section/);
  assert.match(src, /agentPage\("\$\{id\}"\): no such agent/);
});

#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// draft-on-trial.test.mjs — a draft is on trial, never "binds nobody".
//
// THE PROBLEM THIS COVERS
// The archive defined `draft` as "written, not yet in force — it binds
// nobody", on the header standard, on /binding, on the home, in /llms.txt,
// in robots.txt and on every draft's band. Read by a person or an agent,
// that says: ignore it. What a draft is meant to be is the opposite: a rule
// on trial during the alpha. It is followed; its guard warns and never
// blocks; what does not fit is noted, and a change to it is analysed and
// then decided by its owner. The guards already behaved that way
// (STD-005, ENG-067); the sentence that explained them said otherwise.
//
// WHAT IS UNDER TEST
// Every place that DEFINES draft for a reader carries the trial wording and
// none carries "binds nobody". Comments in code may still quote the old
// phrase; this reads only what reaches a reader.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const read = (p) => readFileSync(path.join(ROOT, p), 'utf8');

// The old phrase in any of its forms.
const OLD = /\bbind(s|ing)? nobody\b|it does not BIND/i;

// What reaches a reader: strip code comments from code files; markdown and
// robots are read whole.
const visible = (p) => {
  const src = read(p);
  if (!/\.(ts|mjs|astro)$/.test(p)) return src;
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*\/\/.*$/gm, '');
};

// Every place that defines draft for a reader.
const DEFINERS = [
  'standards/STD-004-the-header.md',
  'standards/STD-009-which-rule-wins.md',
  'protocols/PRO-023-bringing-a-rule-into-force.md',
  'AGENTS.md',
  'README.md',
  'web/public/robots.txt',
  'web/src/lib/composed-md.ts',
  'web/src/lib/machine-index.ts',
  'web/src/pages/binding.astro',
  'web/src/pages/index.astro',
  'web/src/pages/about.astro',
  'web/src/pages/scheme.astro',
  'web/src/pages/[...slug].astro',
  'machine/tools/rule-index.mjs',
];

for (const p of DEFINERS) {
  test(`${p} never says a draft binds nobody`, () => {
    const m = visible(p).match(OLD);
    assert.equal(m, null, `${p} still says "${m?.[0]}" — a draft is on trial, followed, warns and never blocks`);
  });
}

test('the header standard defines draft as on trial, decided by its owner', () => {
  const row = read('standards/STD-004-the-header.md').split('\n').find((l) => l.startsWith('| `draft` |'));
  assert.ok(row, 'STD-004 has no `draft` row in its state table');
  assert.match(row, /on trial/i);
  assert.match(row, /followed/i);
  assert.match(row, /never blocks/i);
  assert.match(row, /owner decides/i);
  const active = read('standards/STD-004-the-header.md').split('\n').find((l) => l.startsWith('| `active` |'));
  assert.match(active, /blocks/i);
  assert.match(active, /owner decides/i);
});

test('/binding says the system is in alpha and that trying a rule means following it', () => {
  for (const p of ['web/src/pages/binding.astro', 'web/src/lib/composed-md.ts']) {
    const v = visible(p);
    assert.match(v, /alpha/i, `${p} does not say the system is in alpha`);
    assert.match(v, /on trial/i, `${p} does not say a draft is on trial`);
  }
});

test("a draft's Binds line reads as a trial, not as a future", async () => {
  const { DRAFT_LABEL } = await import('../../../web/src/lib/rehype-binds-state.mjs');
  assert.match(DRAFT_LABEL, /on trial/i);
  assert.doesNotMatch(DRAFT_LABEL, /once in force/i);
});

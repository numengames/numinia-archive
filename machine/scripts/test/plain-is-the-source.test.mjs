// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// plain-is-the-source.test.mjs — the business's words are the original.
//
// The Oracle, 2026-09-29: the archive is written in the words an operations
// lead, a CTO or a CFO already uses — the new moon of the narrative dial.
// The half moon (the bridge) and the full moon (Numinia) enrich that text;
// they are not its source. NWOS hands the same documents to organisations
// that are not Numinia, so the in-world word cannot be the one a document is
// written in.
//
// What is checked here is the rule's footprint, not the rewriting itself
// (that is done series by series, each with its own test):
//   1. the site opens at the new moon;
//   2. the world's vocabulary names the operational equivalent as the
//      preferred label and the in-world name as its alternative;
//   3. the agents' entry file carries the writing rule.
//
// Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { STOPS, DEFAULT_STOP } from '../../../web/src/lib/narrative-words.mjs';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const read = (f) => readFileSync(path.join(ROOT, f), 'utf8');

test('the site opens at the new moon, the plain words', () => {
  assert.equal(DEFAULT_STOP, 'plain');
  assert.deepEqual(STOPS.map((s) => s.id), ['plain', 'bridge', 'numinia'], 'the dial still runs plain → bridge → Numinia');
  const boot = read('web/src/layouts/Layout.astro');
  assert.match(boot, /nw === "bridge" \|\| nw === "numinia"/, 'the boot script sets the stop only when the reader chose another');
});

test('the world\'s vocabulary prefers the operational word', () => {
  const std = read('standards/STD-030-the-worlds-vocabulary.md');
  assert.match(std, /operational equivalent is the preferred label/i);
  assert.match(std, /in-world name is its alternative label/i);
  assert.doesNotMatch(std, /in-world name is the preferred label/i);
});

test('the agents\' entry file says which words a document is written in', () => {
  const agents = read('AGENTS.md');
  assert.match(agents, /written in the business's words/i);
  assert.match(agents, /STD-030/);
});

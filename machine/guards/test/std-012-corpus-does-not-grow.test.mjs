#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-012-corpus-does-not-grow.test.mjs — DEF-009 reads what the tree HAD.
//
// Before 2026-09-27 the resolver knew only deleted files whose name began
// with two to five capitals and three digits. So it flagged, as broken:
//   - the one-letter series the archive used before (P-010, S-009, D-033),
//     whose files were renamed, not deleted;
//   - files deleted without an identifier (MEMORY.md, web/DESIGN.md);
//   - paths qualified by a sibling repository (numinia-web/docs/…);
//   - every entry of CHANGELOG.md, each closed the day it was written.
// 83 of its 84 findings were that noise. These tests pin the four readings.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { ROOT } from '../../scripts/lib/frontmatter.mjs';
import { retiredIds, retiredBasenames, run } from '../rules/std-012-corpus-does-not-grow.mjs';

const scratch = (files) => ({
  root: ROOT,
  files: Object.keys(files),
  text: (rel) => files[rel],
  fm: () => ({ status: 'active' }),
});
const def9 = (files) => run(scratch(files)).filter((f) => f.plate === 'DEF-009').map((f) => `${f.where}: ${f.what}`);

test('a renamed one-letter identifier still resolves (P-010 became PRO-010)', () => {
  assert.ok(retiredIds(ROOT).has('P-010'), 'P-010 is not known as retired');
});

test('a deleted file with no identifier still resolves by name (MEMORY.md)', () => {
  assert.ok(retiredBasenames(ROOT).has('MEMORY.md'), 'MEMORY.md is not known as retired');
});

test('a path in a sibling repository is elsewhere, not gone', () => {
  assert.deepEqual(def9({ 'system/SYS-900-x.md': 'See numinia-web/docs/nowhere-at-all.md for the rest.' }), []);
});

test('CHANGELOG.md is a photograph: its entries are not walked', () => {
  assert.deepEqual(def9({ 'CHANGELOG.md': 'Removed nowhere-at-all.md and ZZZ-999.' }), []);
});

test('a living document citing a file that never existed is still a finding', () => {
  assert.equal(def9({ 'system/SYS-900-x.md': 'See nowhere-at-all.md.' }).length, 1);
});

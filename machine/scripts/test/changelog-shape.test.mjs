#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// changelog-shape.test.mjs — the CHANGELOG is an index, not a narrative.
// By 2026-09-28 it held 143 entries of several paragraphs each, ~48,600
// tokens, the second-largest file of the corpus, every word of it already in
// the pull request it summarised and in git. The Oracle asked for the fat to
// go (2026-09-28). This test keeps it gone: under each day heading of
// "## [Unreleased]" every entry is ONE list line — its kind, what changed
// in words, and the pull request that holds the detail.
//
// Run: npm test
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const MAX_LINE = 320;
const KINDS = ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security', 'Debt'];

const text = readFileSync(new URL('../../../CHANGELOG.md', import.meta.url), 'utf8');
const start = text.indexOf('## [Unreleased]');
const end = text.indexOf('\n## [', start + 1);
const unreleased = text.slice(start, end === -1 ? undefined : end);
const lines = unreleased.split('\n').slice(1).filter((l) => l.trim() !== '');

test('the Unreleased section exists', () => {
  assert.ok(start >= 0, 'CHANGELOG.md has no "## [Unreleased]" section');
});

test('Unreleased holds only day headings and one-line entries', () => {
  const bad = lines.filter((l) => !/^### \d{4}-\d{2}-\d{2}$/.test(l) && !l.startsWith('- '));
  assert.deepEqual(bad.map((l) => l.slice(0, 80)), [], 'a paragraph or sub-list under Unreleased: write one line and link the pull request');
});

test('each entry opens with its kind and fits one line', () => {
  const entries = lines.filter((l) => l.startsWith('- '));
  assert.ok(entries.length > 0);
  for (const l of entries) {
    const kind = l.match(/^- \*\*(\w+)\*\*/)?.[1];
    assert.ok(KINDS.includes(kind), `entry without a kind of ${KINDS.join('/')}: ${l.slice(0, 80)}`);
    assert.ok(l.length <= MAX_LINE, `entry of ${l.length} chars (max ${MAX_LINE}): ${l.slice(0, 80)}`);
  }
});

test('days run newest first', () => {
  const days = lines.filter((l) => l.startsWith('### ')).map((l) => l.slice(4));
  assert.deepEqual(days, [...days].sort().reverse());
  assert.equal(new Set(days).size, days.length, 'a day heading appears twice');
});

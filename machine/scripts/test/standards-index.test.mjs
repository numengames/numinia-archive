#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// standards-index.test.mjs — the standards index shows each standard's
// question under its title.
//
// The Oracle's word: a newcomer opening /standards wants the title and the
// question it answers, not the code, the date and the word "draft" first.
// STD-007 already asks that each standard's Epistemic line state its one
// question; this holds every standard to it, holds the map in BLU-016 to the
// same words, and holds the index to render it.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const files = execFileSync('git', ['-C', ROOT, 'ls-files', 'standards/STD-*.md'], { encoding: 'utf8' })
  .split('\n').filter(Boolean);

/** The Epistemic line of the card, joined across its wrapped lines. */
export function epistemicOf(text) {
  const out = [];
  let on = false;
  for (const line of text.split('\n')) {
    if (!line.startsWith('>')) { if (on) break; continue; }
    const body = line.replace(/^>\s?/, '');
    const start = body.match(/^\*\*(Summary|Epistemic|Pragmatic|Audience):\*\*\s*(.*)$/);
    if (start) { on = start[1] === 'Epistemic'; if (on) out.push(start[2]); continue; }
    if (on) out.push(body.trim());
  }
  return out.join(' ').replace(/\s+/g, ' ').trim();
}

const blu = read(execFileSync('git', ['-C', ROOT, 'ls-files', 'blueprints/BLU-016-*.md'], { encoding: 'utf8' }).trim());
const mapQuestion = new Map(
  [...blu.matchAll(/^\| `(STD-\d{3})` \| ([^|]+) \|/gm)].map((m) => [m[1], m[2].trim()]),
);

test('every standard states its one question as its Epistemic line', () => {
  assert.ok(files.length >= 30, `only ${files.length} standards found`);
  const bad = files.map((f) => [f.match(/STD-\d{3}/)[0], epistemicOf(read(f))])
    .filter(([, q]) => !/^[A-Z][^?]*\?$/.test(q))
    .map(([id, q]) => `${id}: "${q}"`);
  assert.deepEqual(bad, [], `these do not state one question (one sentence ending in "?"):\n  ${bad.join('\n  ')}`);
});

test('the map of questions and the standards say the same words', () => {
  const drift = files.map((f) => [f.match(/STD-\d{3}/)[0], epistemicOf(read(f))])
    .filter(([id, q]) => mapQuestion.get(id) !== q)
    .map(([id, q]) => `${id}: standard "${q}" · map "${mapQuestion.get(id)}"`);
  assert.deepEqual(drift, [], `drift between each standard and the map:\n  ${drift.join('\n  ')}`);
});

test('the index lists each standard with its question', () => {
  const corpus = read('web/src/lib/corpus.ts');
  assert.match(corpus, /question\?: string;/, 'SectionDoc carries no question');
  assert.match(corpus, /question: questionOf\(/, 'getSectionDocs does not read the question');
  const page = read('web/src/pages/[section].astro');
  assert.match(page, /\{item\.question\}/, 'the index does not render the question');
});

test('the note above the shelves describes the shelves as they stand', () => {
  const corpus = read('web/src/lib/corpus.ts');
  const note = corpus.match(/^\s*standards: "([^"]+)",$/m)?.[1] ?? '';
  assert.doesNotMatch(note, /Language first/, 'the note still promises an order the shelves no longer follow');
  const labels = [...corpus.slice(corpus.indexOf('READING_GROUPS_STANDARDS'))
    .matchAll(/label: "([^"]+)"/g)].slice(0, 5).map((m) => m[1].toLowerCase());
  assert.equal(labels.length, 5);
  let at = -1;
  for (const l of labels) {
    const i = note.toLowerCase().indexOf(l);
    assert.ok(i > at, `the note does not name the shelf "${l}" in order`);
    at = i;
  }
});

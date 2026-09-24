#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// speech-position.test.mjs — where the reading player is, and where it may jump to.
//
// THE PROBLEM THIS COVERS
// The Listen player (web/src/components/SpeechPlayer.astro) had no way to
// move through a document: Play, Pause and Stop only. The Oracle asked for a
// time bar, and a time bar is a promise with three parts that are easy to
// get wrong and invisible when they are wrong:
//
//   1. Dropping the bar anywhere must start the voice at the beginning of a
//      sentence — never mid-word, never mid-sentence. A voice that starts on
//      "…ment, and then" is a voice nobody can follow.
//   2. A position in the text must resolve to the queue the engine actually
//      speaks: which ~280-character chunk, and how far into it.
//   3. The clock and the section name shown beside the bar must agree with
//      the position — a bar at 80 % beside "0:12" is a bar that lies.
//
// WHAT IS UNDER TEST
// web/src/lib/speech-position.ts, the pure half of the player. The DOM half
// (the dock, the marker, the scroll) is checked by the responsive gate and by
// eye; everything here is arithmetic on strings, so it is tested as that.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const LIB = path.resolve(ROOT, 'web', 'src', 'lib', 'speech-position.ts');

/** Evaluate an expression against the module in a child (strip-types), as binding.test does. */
function ask(expression) {
  const script =
    `import(${JSON.stringify(LIB)}).then((m) => {` +
    `  console.log(JSON.stringify(${expression}));` +
    `}).catch((e) => { console.error(e.message); process.exit(1); });`;
  const out = execFileSync('node', ['--experimental-strip-types', '--no-warnings', '-e', script], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return JSON.parse(out);
}

const TEXT =
  'Nobody joins Numinia. You arrive, and at some point you notice. ' +
  'The first thing you meet is a word! Someone is an Alchemist… ' +
  'What that means is that they build things.';

test('a drop lands on the start of the sentence it fell in', () => {
  const inSecond = TEXT.indexOf('at some point');
  assert.equal(ask(`m.sentenceStart(${JSON.stringify(TEXT)}, ${inSecond})`), TEXT.indexOf('You arrive'));
});

test('a drop inside the first sentence goes to the top', () => {
  assert.equal(ask(`m.sentenceStart(${JSON.stringify(TEXT)}, 9)`), 0);
});

test('every terminal mark ends a sentence: . ! and …', () => {
  const afterBang = TEXT.indexOf('an Alchemist');
  const afterEllipsis = TEXT.indexOf('they build');
  assert.equal(ask(`m.sentenceStart(${JSON.stringify(TEXT)}, ${afterBang})`), TEXT.indexOf('Someone'));
  assert.equal(ask(`m.sentenceStart(${JSON.stringify(TEXT)}, ${afterEllipsis})`), TEXT.indexOf('What that'));
});

test('a drop past the end is clamped to the last sentence, not thrown', () => {
  assert.equal(ask(`m.sentenceStart(${JSON.stringify(TEXT)}, 99999)`), TEXT.indexOf('What that'));
  assert.equal(ask(`m.sentenceStart(${JSON.stringify(TEXT)}, -5)`), 0);
});

test('a position resolves to the chunk that holds it and the offset inside it', () => {
  // chunk starts as the player computes them: 0, 40, 90
  assert.deepEqual(ask('m.locate([0, 40, 90], 0)'), { index: 0, offset: 0 });
  assert.deepEqual(ask('m.locate([0, 40, 90], 57)'), { index: 1, offset: 17 });
  assert.deepEqual(ask('m.locate([0, 40, 90], 90)'), { index: 2, offset: 0 });
  assert.deepEqual(ask('m.locate([0, 40, 90], 500)'), { index: 2, offset: 410 });
});

test('the clock reads minutes and zero-padded seconds', () => {
  assert.equal(ask('m.clock(0)'), '0:00');
  assert.equal(ask('m.clock(7.4)'), '0:07');
  assert.equal(ask('m.clock(59.6)'), '1:00');
  assert.equal(ask('m.clock(238)'), '3:58');
  assert.equal(ask('m.clock(-3)'), '0:00');
});

test('the duration follows the words and the rate', () => {
  // 360 words at 180 wpm = 2 min = 120 s; at 2× it is half
  assert.equal(ask('m.duration(360, 1)'), 120);
  assert.equal(ask('m.duration(360, 2)'), 60);
});

test('the section shown is the last heading at or before the position', () => {
  const secs = '[{"at":0,"title":"Intro"},{"at":50,"title":"1. The city"},{"at":120,"title":"2. Why"}]';
  assert.equal(ask(`m.sectionAt(${secs}, 0).title`), 'Intro');
  assert.equal(ask(`m.sectionAt(${secs}, 49).title`), 'Intro');
  assert.equal(ask(`m.sectionAt(${secs}, 50).title`), '1. The city');
  assert.equal(ask(`m.sectionAt(${secs}, 9999).title`), '2. Why');
  assert.equal(ask(`m.sectionAt(${secs}, 130).index`), 2);
});

test('with no headings there is still one section, never an empty label', () => {
  assert.deepEqual(ask('m.sectionAt([], 42)'), { index: 0, at: 0, title: '' });
});

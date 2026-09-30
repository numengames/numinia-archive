// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The narrative dial invents no word (the Oracle, 2026-09-29): every word at
// the plain or the Numinia stop must appear in the archive file it cites.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { STOPS, DEFAULT_STOP, WORDS, TEXTS, wordAttrs, textAttrs } from '../../../web/src/lib/narrative-words.mjs';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();

test('three stops, arriving at the new moon (the plain words are the source)', () => {
  assert.deepEqual(STOPS.map((s) => s.id), ['plain', 'bridge', 'numinia']);
  assert.equal(DEFAULT_STOP, 'plain');
});

test('every word is copied from the archive file it cites', () => {
  for (const w of WORDS) {
    for (const stop of ['plain', 'numinia']) {
      const x = w[stop];
      if (!x) continue;
      const file = path.join(ROOT, x.source);
      assert.ok(existsSync(file), `"${x.text}" cites ${x.source}, which is not in the tree`);
      const text = readFileSync(file, 'utf8').toLowerCase();
      assert.ok(text.includes(x.text.toLowerCase()),
        `"${x.text}" (${stop}, for "${w.bridge}") is not in ${x.source}: the dial may not invent words`);
    }
  }
});

test('no label appears twice in the register', () => {
  const seen = WORDS.map((w) => w.bridge);
  assert.equal(new Set(seen).size, seen.length);
});

test('hand-written texts use only words the register holds', () => {
  const allowed = new Set(WORDS.flatMap((w) => [w.plain?.text, w.numinia?.text]).filter(Boolean).map((t) => t.toLowerCase()));
  assert.ok(allowed.has('knowledge base') && allowed.has('summa archive'));
  for (const [key, t] of Object.entries(TEXTS)) {
    if (!t.uses?.includes('The archive')) continue;
    if (t.plain) assert.match(t.plain.toLowerCase(), /knowledge base/, `${key}: the plain text names the archive by its register word`);
    if (t.numinia) assert.match(t.numinia.toLowerCase(), /summa archive/, `${key}: the Numinia text names the archive by its register word`);
  }
});

test('attributes: a known label is marked, an unknown one is left alone', () => {
  assert.deepEqual(wordAttrs('Missions'), { 'data-nw': '', 'data-nw-bridge': 'Missions', 'data-nw-plain': 'Project' });
  assert.deepEqual(wordAttrs('Nothing like this'), {});
  assert.throws(() => textAttrs('no.such.key'));
});

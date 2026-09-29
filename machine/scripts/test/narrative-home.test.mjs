// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// narrative-home.test.mjs — the moon reaches the map.
//
// The home page (the map of the Summa) must speak at the stop the reader
// chose, like /about already does. Three things are checked on the BUILT
// page, because what matters is what the browser receives:
//
//   1. Every label the register can swap is marked where the map prints it
//      on its own (panel, astrolabe, district boxes, rows, crumbs), or it is
//      held on purpose with data-nw-hold.
//   2. Every tooltip that names such a label carries its variants, so the
//      tip does not keep today's word while the page shows another.
//   3. No word appears at the plain or the Numinia stop that the archive does
//      not already hold: each value is a register word, a hand-written text
//      of the register, or a name the codex glossary gives (the factions
//      under a district's name).
//
// Run: npm test  (needs web/dist: `cd web && npm run build`)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { WORDS, TEXTS, wordAt, attrsAt } from '../../../web/src/lib/narrative-words.mjs';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const HOME = path.join(ROOT, 'web', 'dist', 'index.html');
const built = existsSync(HOME);
const GLOSSARY = readFileSync(path.join(ROOT, 'lore', 'codex', 'en', 'glossary.md'), 'utf8').toLowerCase();

const unesc = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const swappable = new Set(WORDS.filter((w) => w.plain || w.numinia).map((w) => w.bridge));

test('wordAt gives the stop\'s word, or today\'s word when the register has none', () => {
  assert.equal(wordAt('The world', 'numinia'), 'The City');
  assert.equal(wordAt('The world', 'bridge'), 'The world');
  assert.equal(wordAt('The rules', 'numinia'), 'The rules');
  assert.equal(wordAt('Nothing like this', 'plain'), 'Nothing like this');
});

test('attrsAt marks an attribute only when some stop says it differently', () => {
  assert.deepEqual(attrsAt({ title: (s) => wordAt('Production', s) }), {});
  const a = attrsAt({ 'aria-label': (s) => wordAt('The world', s), 'data-tip': (s) => `${wordAt('The work', s)}|x` });
  assert.equal(a['data-nw-attrs'], 'aria-label data-tip');
  assert.equal(a['data-nw-bridge-aria-label'], 'The world');
  assert.equal(a['data-nw-numinia-aria-label'], 'The City');
  assert.equal(a['data-nw-plain-data-tip'], 'Operations|x');
});

test('a hand-written text uses, at each stop, the register\'s word for every label it names', () => {
  for (const [key, t] of Object.entries(TEXTS)) {
    assert.ok(Array.isArray(t.uses) && t.uses.length, `${key}: declare the labels it names in "uses"`);
    for (const stop of ['plain', 'numinia']) {
      if (!t[stop]) continue;
      for (const label of t.uses) {
        assert.ok(t[stop].toLowerCase().includes(wordAt(label, stop).toLowerCase()),
          `${key} (${stop}) should name "${label}" as "${wordAt(label, stop)}"`);
      }
    }
  }
});

test('the map marks every swappable label it prints on its own', { skip: !built && 'web/dist not built' }, () => {
  const html = readFileSync(HOME, 'utf8');
  // any text that opens an element: a leaf, or a label followed by a child
  // (a row's count, a chip), which a leaf-only reading would miss
  const leaves = [...html.matchAll(/<([a-zA-Z][\w:-]*)(\s[^>]*)?>([^<]+)</g)];
  const unmarked = [];
  for (const [, tag, attrs = '', text] of leaves) {
    const t = unesc(text).trim();
    if (!swappable.has(t)) continue;
    if (/\sdata-nw(-hold)?[\s=>]/.test(attrs + ' ') || /\sdata-nw-bridge=/.test(attrs)) continue;
    if (tag === 'title' || tag === 'script' || tag === 'style') continue;
    unmarked.push(`<${tag}> ${t}`);
  }
  assert.deepEqual(unmarked, [], 'labels the moon cannot reach on the map');
});

test('every tooltip that names a swappable label carries its variants', { skip: !built && 'web/dist not built' }, () => {
  const html = readFileSync(HOME, 'utf8');
  const bare = [];
  for (const m of html.matchAll(/<[^>]*\sdata-tip="([^"]*)"[^>]*>/g)) {
    const parts = unesc(m[1]).split(/\||·|—/).map((s) => s.trim());
    if (!parts.some((p) => swappable.has(p))) continue;
    if (!/data-nw-attrs="[^"]*data-tip/.test(m[0])) bare.push(unesc(m[1]).slice(0, 60));
  }
  assert.deepEqual(bare, []);
});

test('the map shows no word the archive does not hold', { skip: !built && 'web/dist not built' }, () => {
  const html = readFileSync(HOME, 'utf8');
  const words = new Set(WORDS.flatMap((w) => [w.plain?.text, w.numinia?.text]).filter(Boolean).map((s) => s.toLowerCase()));
  const texts = new Set(Object.values(TEXTS).flatMap((t) => [t.plain, t.numinia]).filter(Boolean).map((s) => s.toLowerCase()));
  const strange = [];
  for (const m of html.matchAll(/\sdata-nw-(plain|numinia)="([^"]*)"/g)) {
    const v = unesc(m[2]).toLowerCase();
    if (words.has(v) || texts.has(v) || GLOSSARY.includes(v)) continue;
    strange.push(`${m[1]}: ${m[2]}`);
  }
  assert.deepEqual(strange, []);
  assert.ok(html.includes('data-nw-numinia="The City"'), 'the world ring says The City at the full moon');
});

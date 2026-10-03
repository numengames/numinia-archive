#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// lexicon.test.mjs — the Lexicon states nothing of its own.
//
// The Oracle (2026-10-03): the business glossary is a book, A to Z, one page
// per letter, and every definition lives once, in STD-026. The page reads the
// register; a word on a page that is not in the register is a copy that will
// drift. Books get a back-to-top button after two screens.
//
// Run: npm test  (the built-page checks need web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const REGISTER = path.join(ROOT, 'standards', 'STD-026-operative-vocabulary.md');
const LIB = path.join(ROOT, 'web', 'src', 'lib', 'lexicon.ts');
const DIST = path.join(ROOT, 'web', 'dist');
const notBuilt = !existsSync(path.join(DIST, 'index.html')) && 'web/dist not built';

const reg = readFileSync(REGISTER, 'utf8');
const letters = [...reg.matchAll(/^## ([A-Z])\s*$/gm)].map((m) => m[1]);
const terms = [...reg.matchAll(/^\| \*\*(.+?)\*\*/gm)].map((m) => m[1]);
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

test('the register is a lexicon: letters in order, terms in order under each, none twice', () => {
  assert.ok(letters.length > 10, 'STD-026 has its letters');
  assert.deepEqual([...letters].sort(), letters, 'letters A to Z');
  const slugs = terms.map(slug);
  assert.equal(new Set(slugs).size, slugs.length, 'no word is defined twice');
  for (const [i, L] of letters.entries()) {
    const start = reg.indexOf(`\n## ${L}\n`), end = i + 1 < letters.length ? reg.indexOf(`\n## ${letters[i + 1]}\n`) : reg.length;
    const under = [...reg.slice(start, end).matchAll(/^\| \*\*(.+?)\*\*/gm)].map((m) => m[1]);
    for (const t of under) assert.equal(t[0].toUpperCase(), L, `${t} is filed under ${L}`);
    assert.deepEqual(under, [...under].sort((a, b) => a.localeCompare(b, 'en')), `the words under ${L} are in order`);
  }
});

test('the Lexicon reads STD-026 and types no word', () => {
  const lib = readFileSync(LIB, 'utf8');
  assert.match(lib, /STD-026-operative-vocabulary\.md/, 'the library reads the register');
  for (const p of ['lexicon.astro', 'lexicon/[letter].astro']) {
    const src = readFileSync(path.join(ROOT, 'web', 'src', 'pages', p), 'utf8');
    for (const t of terms.filter((t) => t.length > 6)) {
      assert.ok(!src.includes(`>${t}<`), `${p} types the word "${t}" instead of reading it`);
    }
  }
});

test('one page per letter, every word on its page, the bar and the way back up', { skip: notBuilt }, () => {
  const cover = readFileSync(path.join(DIST, 'lexicon', 'index.html'), 'utf8');
  assert.match(cover, /data-back-to-top/, 'the cover has the back-to-top button');
  for (const L of letters) {
    const f = path.join(DIST, 'lexicon', L.toLowerCase(), 'index.html');
    assert.ok(existsSync(f), `/lexicon/${L.toLowerCase()} is built`);
    const html = readFileSync(f, 'utf8');
    assert.match(html, /aria-label="Letters"/, `${L} carries the letter bar`);
    assert.match(html, /data-back-to-top/, `${L} carries the back-to-top button`);
  }
  for (const t of terms) {
    const L = t[0].toUpperCase();
    const html = readFileSync(path.join(DIST, 'lexicon', L.toLowerCase(), 'index.html'), 'utf8');
    assert.match(html, new RegExp(`id="${slug(t)}"`), `${t} has its entry on /lexicon/${L.toLowerCase()}`);
    assert.match(cover, new RegExp(`/lexicon/${L.toLowerCase()}#${slug(t)}"`), `the cover lists ${t}`);
  }
});

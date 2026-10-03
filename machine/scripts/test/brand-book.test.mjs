#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// brand-book.test.mjs — the brand and culture book states nothing of its own.
//
// The Oracle (2026-10-03): the old brand deck was merged into principles and
// records, and /brand is the book that reads them. Every chapter must come
// from a document; the old lore file is gone and its address leads here.
//
// Run: npm test  (the built-page checks need web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const LIB = readFileSync(path.join(ROOT, 'web', 'src', 'lib', 'brand-book.ts'), 'utf8');
const DIST = path.join(ROOT, 'web', 'dist');
const notBuilt = !existsSync(path.join(DIST, 'index.html')) && 'web/dist not built';

const sources = [...LIB.matchAll(/path: "([^"]+\.md)"/g)].map((m) => m[1]);
const sectionsOf = [...LIB.matchAll(/path: "([^"]+\.md)", sections: \[([^\]]+)\]/g)]
  .map((m) => ({ file: m[1], sections: [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1]) }));

test('every document the book reads exists, and every section it names is a heading there', () => {
  assert.ok(sources.length >= 7, 'the book reads its chapters from documents');
  for (const f of sources) assert.ok(existsSync(path.join(ROOT, f)), `${f} is not in the tree`);
  for (const { file, sections } of sectionsOf) {
    const text = readFileSync(path.join(ROOT, file), 'utf8');
    for (const s of sections) assert.ok(text.includes(`\n## ${s}\n`), `${file} has no "## ${s}"`);
  }
});

test('the old deck is gone from the lore, and its address leads to the book', () => {
  assert.ok(!existsSync(path.join(ROOT, 'lore', 'world', 'brand-and-culture.md')), 'the lore file was replaced by the book');
  const config = readFileSync(path.join(ROOT, 'web', 'astro.config.mjs'), 'utf8');
  assert.match(config, /"\/lore\/world\/brand-and-culture": "\/brand"/, 'the old address redirects to /brand');
});

test('the built book carries every chapter, the epitaph, its .md view and the back-to-top button', { skip: notBuilt }, () => {
  const html = readFileSync(path.join(DIST, 'brand', 'index.html'), 'utf8');
  for (const id of ['where-we-come-from', 'why-we-exist', 'what-we-will-not-trade', 'the-brand', 'voice-and-look', 'how-we-live', 'where-we-are-going']) {
    assert.match(html, new RegExp(`data-chapter="${id}"`), `chapter ${id} is on the page`);
  }
  assert.match(html, /did not let us alone/, 'the manifesto closes on the epitaph');
  assert.match(html, /data-back-to-top|back-to-top/i, 'books carry the back-to-top button');
  assert.ok(existsSync(path.join(DIST, 'brand.md')), 'the book has its .md view');
});

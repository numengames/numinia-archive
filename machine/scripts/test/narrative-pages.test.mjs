// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// narrative-pages.test.mjs — the moon reaches the map, the shelves and the
// head of every document.
//
// The home page (the map of the Summa), each section's index, the typed
// indexes (decisions, blueprints, reports), the function pages and the head
// of a document must speak at the stop the reader chose, like /about
// already does. Three things are checked on the BUILT pages, because what
// matters is what the browser receives:
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
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { WORDS, TEXTS, wordAt, attrsAt } from '../../../web/src/lib/narrative-words.mjs';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const DIST = path.join(ROOT, 'web', 'dist');
const HOME = path.join(DIST, 'index.html');
const built = existsSync(HOME);
const isRedirect = (f) => /http-equiv="refresh"/.test(readFileSync(path.join(DIST, f), 'utf8'));
// The pages the moon must reach: the map, every section index, the typed
// indexes, every function page, and one document of each kind.
const PAGES = [
  'index.html',
  ...['canon', 'standards', 'protocols', 'system', 'debt', 'operations', 'opportunities', 'legal', 'objects', 'lore',
    'decisions', 'blueprints', 'reports'].map((s) => `${s}/index.html`),
  ...(existsSync(path.join(DIST, 'archive'))
    ? readdirSync(path.join(DIST, 'archive')).map((d) => `archive/${d}/index.html`)
    : []),
  'canon/can-001-welcome-to-numinia/index.html',
  'standards/std-001-the-series/index.html',
  'protocols/pro-001-agent-session/index.html',
  'decisions/adr-030/index.html',
  'blueprints/book-and-veil/index.html',
  'reports/rpt-003-wardley-map/index.html',
].filter((f) => existsSync(path.join(DIST, f)) && !isRedirect(f));
const read = (f) => readFileSync(path.join(DIST, f), 'utf8');
// A page's own content. The bar and the footer are the site's chrome, read
// once on the home; a document's BODY is its author's text and never changes
// (the dial swaps the site's words, not a document's), so on a document page
// only what precedes the body is read.
const own = (f) => {
  const html = read(f);
  if (f === 'index.html') return html;
  const m = html.match(/<main[\s\S]*<\/main>/)?.[0] ?? html;
  const body = m.search(/<article\b/);
  return body > 0 ? m.slice(0, body) : m;
};
const GLOSSARY = readFileSync(path.join(ROOT, 'lore', 'codex', 'en', 'glossary.md'), 'utf8').toLowerCase();

// &amp; last, so "&amp;lt;" reads as the text "&lt;" and is not unescaped twice
const unesc = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
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

test('the pages mark every swappable label they print on their own', { skip: !built && 'web/dist not built' }, () => {
  assert.ok(PAGES.length >= 20, `only ${PAGES.length} of the pages the moon must reach were built`);
  const all = [];
  for (const f of PAGES) {
  const html = own(f);
  // any text that opens an element: a leaf, or a label followed by a child
  // (a row's count, a chip), which a leaf-only reading would miss
  const leaves = [...html.matchAll(/<([a-zA-Z][\w:-]*)(\s[^>]*)?>([^<]+)</g)];
  // a label right after an icon: <a …><svg …>…</svg> Decisions </a>
  for (const m of html.matchAll(/<(a|button)(\s[^>]*)?>\s*<svg[\s\S]*?<\/svg>([^<]+)<\/\1>/g)) leaves.push([m[0], m[1], '', m[3]]);
  const unmarked = [];
  for (const [, tag, attrs = '', text] of leaves) {
    const t = unesc(text).trim();
    if (!swappable.has(t)) continue;
    if (/\sdata-nw(-hold)?[\s=>]/.test(attrs + ' ') || /\sdata-nw-bridge=/.test(attrs)) continue;
    if (tag === 'title' || tag === 'script' || tag === 'style') continue;
    unmarked.push(`<${tag}> ${t}`);
  }
  all.push(...unmarked.map((u) => `${f}: ${u}`));
  }
  assert.deepEqual(all, [], 'labels the moon cannot reach');
});

test('every tooltip that names a swappable label carries its variants', { skip: !built && 'web/dist not built' }, () => {
  for (const f of PAGES) {
  const html = own(f);
  const bare = [];
  for (const m of html.matchAll(/<[^>]*\sdata-tip="([^"]*)"[^>]*>/g)) {
    const parts = unesc(m[1]).split(/\||·|—/).map((s) => s.trim());
    if (!parts.some((p) => swappable.has(p))) continue;
    if (!/data-nw-attrs="[^"]*data-tip/.test(m[0])) bare.push(unesc(m[1]).slice(0, 60));
  }
  assert.deepEqual(bare, [], f);
  }
});

test('the pages show no word the archive does not hold', { skip: !built && 'web/dist not built' }, () => {
  for (const f of PAGES) {
  const html = read(f);
  const words = new Set(WORDS.flatMap((w) => [w.plain?.text, w.numinia?.text]).filter(Boolean).map((s) => s.toLowerCase()));
  const texts = new Set(Object.values(TEXTS).flatMap((t) => [t.plain, t.numinia]).filter(Boolean).map((s) => s.toLowerCase()));
  const strange = [];
  for (const m of html.matchAll(/\sdata-nw-(plain|numinia)="([^"]*)"/g)) {
    const v = unesc(m[2]).toLowerCase();
    if (words.has(v) || texts.has(v) || GLOSSARY.includes(v)) continue;
    strange.push(`${m[1]}: ${m[2]}`);
  }
  assert.deepEqual(strange, [], f);
  }
  assert.ok(read('index.html').includes('data-nw-numinia="The City"'), 'the world ring says The City at the full moon');
  assert.match(read('canon/index.html'), /data-nw-plain="Purpose"/, 'the canon index says Purpose at the new moon');
  assert.match(read('decisions/index.html'), /data-nw-numinia="Decision Stone"/, 'the decisions index says Decision Stone at the full moon');
});

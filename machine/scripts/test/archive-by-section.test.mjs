// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// archive-by-section.test.mjs — the front door is the archive, by section.
//
// The Oracle (2026-09-29 → 2026-10-03): numinia.org opens on the archive
// arranged by the ten business sections of STD-030, and the map moves to
// /map. Checked on the BUILT page, because what matters is what the reader
// receives:
//
//   1. The ten sections of the standard, in the standard's order, each an
//      anchored block with its title and its one line.
//   2. Every document the site publishes (index.json, kind "document") is
//      linked from exactly one block — a section's, or the "Without a
//      section" block that shows the gap instead of hiding it.
//   3. At the full moon each section names the houses that serve it, read
//      from the same standard (translator.servedBy).
//   4. /about redirects to /, /map is a real page, and the two doors of the
//      bar are Archive (/) and Map (/map).
//
// Run: npm test  (needs web/dist: `cd web && npm run build`)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';
import { sections, servedBy } from '../../../web/src/lib/translator.mjs';

const DIST = path.join(ROOT, 'web', 'dist');
const HOME = path.join(DIST, 'index.html');
const built = existsSync(HOME) && existsSync(path.join(DIST, 'index.json'));
const skip = !built && 'web/dist not built';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Astro adds its scoping attribute (data-astro-cid-…) after the class, so the
// count and the served-by span are matched by class, not by exact tag.
const COUNT = /<span class="text-foreground"[^>]*>(\d+)<\/span> records/;
const unesc = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/** The blocks of the front door: id → the HTML between its <section id> and the next one. */
function blocks(html) {
  const out = new Map();
  const re = /<section id="([^"]+)"/g;
  const hits = [...html.matchAll(re)];
  hits.forEach((m, i) => out.set(m[1], html.slice(m.index, hits[i + 1]?.index ?? html.indexOf('</main>'))));
  return out;
}

test('the ten sections of STD-030, in order, each with its line', { skip }, () => {
  const html = readFileSync(HOME, 'utf8');
  const rows = sections();
  assert.equal(rows.length, 10, 'STD-030 names ten sections');
  // The books shelf opens the page above the sections (the Oracle, 2026-10-05): not a section.
  const ids = [...blocks(html).keys()].filter((id) => id !== 'without-a-section' && id !== 'books');
  assert.deepEqual(ids, rows.map((r) => slug(r.Section)), 'the blocks are the sections, in the standard\'s order');
  for (const r of rows) {
    const b = blocks(html).get(slug(r.Section));
    assert.match(unesc(b), new RegExp(`<h2[^>]*>.*${r.Section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*</h2>`), `${r.Section}: no title`);
    assert.ok(unesc(b).includes(r.Line), `${r.Section}: its line from STD-030 is missing`);
    assert.match(b, COUNT, `${r.Section}: no count`);
  }
});

test('every published document is linked from exactly one block', { skip }, () => {
  const html = readFileSync(HOME, 'utf8');
  const index = JSON.parse(readFileSync(path.join(DIST, 'index.json'), 'utf8'));
  const docs = index.documents.map((d) => d.url.replace(/\/$/, ''));
  assert.ok(docs.length > 100, 'index.json lists the documents');
  const where = new Map();
  for (const [id, b] of blocks(html)) {
    for (const m of b.matchAll(/<li[^>]*>\s*<a href="([^"#]+)"/g)) {
      const k = m[1].replace(/\/$/, '');
      where.set(k, [...(where.get(k) ?? []), id]);
    }
  }
  const missing = docs.filter((u) => !where.has(u));
  assert.deepEqual(missing, [], 'documents the front door does not list');
  const twice = [...where].filter(([, ids]) => ids.length > 1).map(([u, ids]) => `${u} in ${ids.join(', ')}`);
  assert.deepEqual(twice, [], 'documents listed in two blocks');
  const counted = [...blocks(html)].reduce((n, [, b]) => n + Number(COUNT.exec(b)?.[1] ?? 0), 0);
  assert.equal(counted, docs.length, 'the counts add up to the documents published');
});

test('at the full moon each section names the houses that serve it', { skip }, () => {
  const html = readFileSync(HOME, 'utf8');
  for (const r of sections()) {
    const b = unesc(blocks(html).get(slug(r.Section)));
    const { houses, gaps } = servedBy(r.Section);
    assert.match(b, /class="fd-served/, `${r.Section}: no served-by line`);
    if (houses.length) assert.match(b, new RegExp(`served by: <span class="text-foreground"[^>]*>${houses.join(' · ')}</span>`), `${r.Section}: served by ${houses.join(' · ')}`);
    else assert.ok(b.includes('no house yet'), `${r.Section}: says no house serves it yet`);
    for (const g of gaps) assert.ok(b.includes(`no house carries: ${g}`), `${r.Section}: the gap "${g}" is shown`);
  }
  // The line belongs to the full moon: hidden unless html[data-narrative="numinia"].
  const css = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n') +
    [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => readFileSync(path.join(DIST, m[1]), 'utf8')).join('\n');
  assert.match(css, /\.fd-served[^{]*\{[^}]*display:\s*none/, 'served-by is hidden by default');
  assert.match(css, /html\[data-narrative=numinia\][^{]*\.fd-served[^{]*\{[^}]*display:\s*block/, 'served-by shows at the full moon');
});

test('/about leads home, /map is the map, and the bar reads Archive · Map', { skip }, () => {
  const about = readFileSync(path.join(DIST, 'about', 'index.html'), 'utf8');
  assert.match(about, /http-equiv="refresh" content="0;url=\/"/, '/about does not redirect to /');
  const aboutMd = readFileSync(path.join(DIST, 'about.md', 'index.html'), 'utf8');
  assert.match(aboutMd, /url=\/home\.md/, '/about.md does not redirect to /home.md');
  const map = readFileSync(path.join(DIST, 'map', 'index.html'), 'utf8');
  assert.match(map, /aria-label="Map of the Summa"/, '/map does not draw the astrolabe');
  assert.ok(existsSync(path.join(DIST, 'map.md')), '/map offers no .md');
  const home = readFileSync(HOME, 'utf8');
  for (const page of [home, map]) {
    assert.match(page, /<a href="\/" data-nav="archive"[^>]*>[\s\S]*?Archive<\/a>/, 'the bar does not read Archive at /');
    assert.match(page, /<a href="\/map" data-nav="map"[^>]*>[\s\S]*?Map<\/a>/, 'the bar does not read Map at /map');
  }
  assert.match(home, /data-nav="archive" class="[^"]*border-teal/, 'Archive is not the active word on /');
  assert.match(map, /data-nav="map" class="[^"]*border-teal/, 'Map is not the active word on /map');
});

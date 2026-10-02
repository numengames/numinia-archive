#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// sales-wand.test.mjs — the wand on a sale's page, and the sales playbook,
// state nothing of their own.
//
// The Oracle (2026-10-02): on an opportunity's page, a wand shows the stages
// of the sale, lets the seller pick the piece of collateral the stage hands
// over (STD-047), shows it rendered and lets it be downloaded, and says what
// is missing. Every word of a piece comes from the record's Pitch and the
// offer through the sales kit's own renderer (collateral.mjs); the page types
// none. The sales playbook is a book: the stages, the protocols that move
// them and the collateral, read from their files.
//
// Run: npm test  (the built-page checks need web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from '../lib/frontmatter.mjs';

const LIB = path.join(ROOT, 'web', 'src', 'lib', 'collateral.ts');
const WAND = path.join(ROOT, 'web', 'src', 'components', 'SalesWand.astro');
const PLAYBOOK = path.join(ROOT, 'web', 'src', 'pages', 'playbook.astro');
const KIT = path.join(ROOT, 'machine', 'packages', 'sales-kit', 'collateral.mjs');
const DIST = path.join(ROOT, 'web', 'dist');
const notBuilt = !existsSync(path.join(DIST, 'index.html')) && 'web/dist not built';
const kit = await import(pathToFileURL(KIT).href);
const pipe = await import(pathToFileURL(path.join(ROOT, 'machine', 'packages', 'sales-kit', 'pipeline.mjs')).href);

const page = (p) => readFileSync(path.join(DIST, p), 'utf8');
const ENTITY = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'" };
const decode = (t) => t.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, (e) => ENTITY[e]);

test('the wand and the playbook type no collateral: they read it through the kit', () => {
  const lib = readFileSync(LIB, 'utf8');
  assert.match(lib, /sales-kit\", \"collateral\.mjs\"/, 'the library imports the renderer itself');
  assert.match(lib, /tool\.render\(/, 'every piece is the renderer\'s');
  assert.match(lib, /tool\.catalogue\(/, 'the pieces are the register\'s');
  assert.match(lib, /throw new Error\(/, 'a piece holding an unlisted name fails the build');
  for (const f of [WAND, PLAYBOOK]) {
    const src = readFileSync(f, 'utf8');
    assert.doesNotMatch(src, /La escena antes|8\.?500|14\.?500|First-contact deck|Research note/, `${path.basename(f)} types collateral or prices`);
    assert.doesNotMatch(src, /href="\/[^"]*\$\{/, `${path.basename(f)} composes an address in the browser`);
  }
});

test('the playbook is a book, reachable from the map', () => {
  const summa = path.join(ROOT, 'web', 'src', 'lib', 'summa.ts');
  const script = `import(${JSON.stringify(summa)}).then((s) => console.log(JSON.stringify([s.BOOKS, s.SEGMENTS])))`;
  const [books, segs] = JSON.parse(execFileSync('node', ['--experimental-strip-types', '-e', script], { cwd: path.join(ROOT, 'web'), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
  assert.ok(books.some((b) => b.href === '/playbook'), 'the sales playbook is in BOOKS');
  assert.ok(segs.some((s) => s.entries.some((e) => e.href === '/playbook')), 'and in a ring of the map');
});

test('a sale\'s page carries the wand: its stage, every piece, each rendered from its own record', { skip: notBuilt }, () => {
  const html = page('opportunities/opp-2026-025/index.html');
  assert.match(html, /data-sales-wand/);
  const reg = pipe.loadRegister();
  const rec = pipe.figures(pipe.readFolder(path.join(ROOT, 'opportunities')), reg, pipe.loadCard()).records.find((r) => r.id === 'OPP-2026-025');
  const current = html.match(/data-stage="([a-z]+)"[^>]*data-current/)?.[1] ?? html.match(/data-current[^>]*data-stage="([a-z]+)"/)?.[1];
  assert.equal(current, rec.stage, 'the stage marked current is the tool\'s');
  for (const piece of kit.catalogue()) assert.ok(decode(html).includes(piece.piece), `the wand lists "${piece.piece}"`);
  const pitch = kit.pitchOf(readFileSync(path.join(ROOT, 'opportunities', 'OPP-2026-025.md'), 'utf8'), 'es');
  const text = decode(html);
  assert.ok(text.includes(pitch.headline), 'the deck preview is the record\'s own headline');
  assert.ok(text.includes(pitch.subject), 'the e-mail preview is the record\'s own subject');
  assert.doesNotMatch(text, /\{\{[a-z_]+\}\}/, 'no template field left unfilled');
  assert.deepEqual(pipe.personNames(text.replace(/<[^>]+>/g, ' '), pipe.loadCard().named), [], 'no person\'s name on the page');
});

test('a record that is not a sale has no wand', { skip: notBuilt }, () => {
  assert.doesNotMatch(page('opportunities/opp-2026-037/index.html'), /data-sales-wand/);
});

test('the playbook page walks every sale stage and lists every piece of the register', { skip: notBuilt }, () => {
  const html = decode(page('playbook/index.html'));
  const sale = pipe.loadRegister().kinds.find((k) => k.kind === 'sale');
  for (const s of sale.stages) assert.ok(html.includes(`data-stage="${s}"`), `stage ${s} is on the playbook`);
  for (const p of kit.catalogue()) assert.ok(html.includes(p.piece), `piece "${p.piece}" is on the playbook`);
  assert.ok(existsSync(path.join(DIST, 'playbook.md')), 'the playbook has its markdown twin');
});

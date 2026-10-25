#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// mission-book.test.mjs — the mission book IS the mission board (the Oracle,
// 2026-10-25): the shelf's card opens /missions, /mission-book leads there,
// and the board opens with each area and its child missions.
//
// Run: npm test  (the built-page checks need web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const DIST = path.join(ROOT, 'web', 'dist');
const notBuilt = !existsSync(path.join(DIST, 'missions', 'index.html')) && 'web/dist not built';

test('every parent a mission names exists, and every parent lists it back', () => {
  const dir = path.join(ROOT, 'missions');
  const files = readdirSync(dir).filter((f) => /^MIS-\d+.*\.md$/.test(f));
  const head = (f) => readFileSync(path.join(dir, f), 'utf8').split('\n---')[0];
  const ids = new Map(files.map((f) => [head(f).match(/^id:\s*"?(MIS-\d+)/m)?.[1], f]));
  for (const f of files) {
    const p = head(f).match(/^parent_mission:\s*"(MIS-2\d\d)"/m)?.[1];
    if (!p) continue;
    assert.ok(ids.has(p), `${f} names ${p}, which is not in missions/`);
    const subs = head(ids.get(p)).match(/^sub_missions:\s*\[(.*)\]/m)?.[1] ?? '';
    const me = head(f).match(/^id:\s*"?(MIS-\d+)/m)[1];
    assert.ok(subs.includes(`"${me}"`), `${p} does not list ${me} in sub_missions`);
  }
});

test('the shelf\'s mission book opens the mission board, and the old address leads there', () => {
  const summa = readFileSync(path.join(ROOT, 'web', 'src', 'lib', 'summa.ts'), 'utf8');
  const m = /\{ label: "The mission book"[^}]+\}/.exec(summa);
  assert.ok(m, 'summa.ts BOOKS lists the mission book');
  assert.match(m[0], /href: "\/missions"/);
  const config = readFileSync(path.join(ROOT, 'web', 'astro.config.mjs'), 'utf8');
  assert.match(config, /"\/mission-book": "\/missions"/);
});

test('the built board opens with the areas: MIS-200 and its child MIS-218', { skip: notBuilt }, () => {
  const html = readFileSync(path.join(DIST, 'missions', 'index.html'), 'utf8');
  const areas = html.slice(html.indexOf('id="areas"'), html.indexOf('Every mission'));
  assert.match(areas, /MIS-200/);
  assert.match(areas, /href="\/missions\/mis-218"/);
});

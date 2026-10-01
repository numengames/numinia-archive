#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// sales-bell.test.mjs — the bell in the bar states no step of its own.
//
// Every item is an open opportunity's `next` line, as the pipeline tool
// computes it (its `due` list), linking the record's page. The bar carries
// the bell on every page; the built bell holds exactly the tool's due steps,
// each with its day and address.
//
// Run: npm test  (the built check needs web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';
import * as tool from '../../packages/sales-kit/pipeline.mjs';

const LIB = path.join(ROOT, 'web', 'src', 'lib', 'sales-bell.ts');
const BELL = path.join(ROOT, 'web', 'src', 'components', 'SalesBell.astro');
const NAV = path.join(ROOT, 'web', 'src', 'components', 'Navigation.astro');
const BUILT = path.join(ROOT, 'web', 'dist', 'index.html');
const notBuilt = !existsSync(BUILT) && 'web/dist not built';

test('the bell reads the tool, and types no step', () => {
  const lib = readFileSync(LIB, 'utf8');
  assert.match(lib, /from "@\/lib\/pipeline"/, 'the bell reads the pipeline library, which reads the tool');
  assert.match(lib, /F\.due/, 'the steps are the tool\'s due list');
  const bell = readFileSync(BELL, 'utf8');
  assert.doesNotMatch(bell, /href=\{`/, 'no address composed in the component: each is made in the library');
  assert.doesNotMatch(bell, /href="\/opportunities\//, 'no record address typed');
});

test('the bar carries the bell', () => {
  const nav = readFileSync(NAV, 'utf8');
  assert.match(nav, /import SalesBell from "@\/components\/SalesBell\.astro"/);
  assert.match(nav, /<SalesBell \/>/);
});

test('the built bell holds exactly the tool\'s due steps', { skip: notBuilt }, () => {
  const html = readFileSync(BUILT, 'utf8');
  const reg = tool.loadRegister();
  const card = tool.loadCard();
  const recs = tool.readFolder(path.join(ROOT, 'opportunities'));
  const F = tool.figures(recs, reg, card, '2000-01-01');
  const items = [...html.matchAll(/<li[^>]*data-bell-item[^>]*data-date="([0-9-]+)"[^>]*>\s*<a href="([^"]+)"/g)].map((m) => ({ date: m[1], url: m[2] }));
  assert.equal(items.length, F.due.length, 'one item per open next step');
  F.due.forEach((d, i) => {
    assert.equal(items[i].date, d.date, `${d.id}: the day is the record's next line`);
    assert.equal(items[i].url, `/opportunities/${d.id.toLowerCase()}`, `${d.id}: links its record`);
  });
});

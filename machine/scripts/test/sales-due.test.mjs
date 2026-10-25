#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// sales-due.test.mjs — the steps due live in the sales playbook, not in the
// bar, and state no step of their own.
//
// Until 25 October 2026 they were a bell in the top bar of every page. A
// reader who clicked it from the front door met a list of sales steps with no
// context (the Oracle: it distracts, it says little there, its place is the
// playbook; the icon is a banknote with wings, not a bell). Every item is an
// open opportunity's `next` line, as the pipeline tool computes it (its `due`
// list), linking the record's page.
//
// Run: npm test  (the built check needs web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';
import * as tool from '../../packages/sales-kit/pipeline.mjs';

const LIB = path.join(ROOT, 'web', 'src', 'lib', 'sales-due.ts');
const PANEL = path.join(ROOT, 'web', 'src', 'components', 'SalesDue.astro');
const NAV = path.join(ROOT, 'web', 'src', 'components', 'Navigation.astro');
const PLAYBOOK = path.join(ROOT, 'web', 'src', 'pages', 'playbook.astro');
const ICON = path.join(ROOT, 'web', 'src', 'icons', 'money-wings.svg');
const BUILT_PLAYBOOK = path.join(ROOT, 'web', 'dist', 'playbook', 'index.html');
const BUILT_HOME = path.join(ROOT, 'web', 'dist', 'index.html');
const notBuilt = !existsSync(BUILT_PLAYBOOK) && 'web/dist not built';

test('the steps come from the tool, and no step is typed', () => {
  const lib = readFileSync(LIB, 'utf8');
  assert.match(lib, /from "@\/lib\/pipeline"/, 'the list reads the pipeline library, which reads the tool');
  assert.match(lib, /F\.due/, 'the steps are the tool\'s due list');
  const panel = readFileSync(PANEL, 'utf8');
  assert.doesNotMatch(panel, /href=\{`/, 'no address composed in the component: each is made in the library');
  assert.doesNotMatch(panel, /href="\/opportunities\//, 'no record address typed');
});

test('the bar no longer carries it', () => {
  const nav = readFileSync(NAV, 'utf8');
  assert.doesNotMatch(nav, /SalesDue|SalesBell/, 'the bar names neither the panel nor the old bell');
});

test('the sales playbook carries it', () => {
  const page = readFileSync(PLAYBOOK, 'utf8');
  assert.match(page, /import SalesDue from "@\/components\/SalesDue\.astro"/);
  assert.match(page, /<SalesDue \/>/);
});

test('it is a banknote with wings, not a bell', () => {
  assert.ok(existsSync(ICON), 'web/src/icons/money-wings.svg is in the house subset');
  const panel = readFileSync(PANEL, 'utf8');
  assert.match(panel, /<Icon name="money-wings"/);
  assert.doesNotMatch(panel, /name="bell"/);
});

test('the built playbook holds exactly the tool\'s due steps', { skip: notBuilt }, () => {
  const html = readFileSync(BUILT_PLAYBOOK, 'utf8');
  const reg = tool.loadRegister();
  const card = tool.loadCard();
  const recs = tool.readFolder(path.join(ROOT, 'opportunities'));
  const F = tool.figures(recs, reg, card, '2000-01-01');
  const items = [...html.matchAll(/<li[^>]*data-due-item[^>]*data-date="([0-9-]+)"[^>]*>\s*<a href="([^"]+)"/g)].map((m) => ({ date: m[1], url: m[2] }));
  assert.equal(items.length, F.due.length, 'one item per open next step');
  F.due.forEach((d, i) => {
    assert.equal(items[i].date, d.date, `${d.id}: the day is the record's next line`);
    assert.equal(items[i].url, `/opportunities/${d.id.toLowerCase()}`, `${d.id}: links its record`);
  });
});

test('the front door shows no steps', { skip: notBuilt }, () => {
  const html = readFileSync(BUILT_HOME, 'utf8');
  assert.doesNotMatch(html, /data-due-item|data-bell-item|data-sales-bell/);
});

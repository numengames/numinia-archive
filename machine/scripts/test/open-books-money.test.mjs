#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// open-books-money.test.mjs — the money that came in, the payroll, the time
// to tomb and the business plan, each figure saying what kind of figure it is.
//
//   FOUR KINDS  web/src/data/money.ts labels every figure real, declared,
//               plan or simulated. Rounds and client income the company has
//               said but not yet documented are "declared", never "real".
//   ROUNDS      two rounds after incorporation: ~100,000 EUR in 2024 and
//               ~120,000 EUR in 2026, each tied to the BORME notice that
//               registered its nominal, so the page can show nominal and
//               money paid side by side.
//   CLIENTS     income by sector, never by name, until the client agrees.
//   PAYROLL     web/src/data/payroll.csv: one line a month for all staff
//               together (STD-036 LED-006), headcount, gross and employer
//               social security; every line says it is simulated until the
//               payslips are loaded. 2025 two people, 2026 one.
//   PAGE        seven rooms, the seventh the business plan; a live time-to-
//               tomb counter; the four labels in the legend.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const W = (...p) => path.join(ROOT, 'web', ...p);
const MONEY = W('src', 'data', 'money.ts');
const PAYROLL = W('src', 'data', 'payroll.csv');
const PAGE = W('src', 'pages', 'system', 'open-books.astro');
const read = (p) => readFileSync(p, 'utf8');

test('money: every figure says its kind; rounds and clients are declared, not real', () => {
  assert.ok(existsSync(MONEY), 'web/src/data/money.ts is missing');
  const t = read(MONEY);
  assert.match(t, /"real" \| "declared" \| "plan" \| "simulated"/);
  const rounds = [...t.matchAll(/\{\s*date:\s*"(\d{4}-\d\d-\d\d)",\s*amount:\s*(\d+),\s*kind:\s*"(\w+)",\s*borme:\s*"(BORME-A-\d{4}-\d+-\d+)"/g)];
  assert.equal(rounds.length, 2, 'two rounds after incorporation');
  assert.deepEqual(rounds.map((m) => [m[1].slice(0, 4), Number(m[2]), m[3]]), [['2024', 100000, 'declared'], ['2026', 120000, 'declared']]);
  assert.match(t, /sector:\s*"Public sector · United States"/);
  assert.doesNotMatch(t, /Mesa/i, 'a client named before it agreed');
});

test('payroll: one line a month for all staff, simulated until the payslips come', () => {
  assert.ok(existsSync(PAYROLL), 'web/src/data/payroll.csv is missing');
  const [head, ...body] = read(PAYROLL).trim().split('\n');
  assert.equal(head, 'month;headcount;gross;employer_ss;kind');
  const rows = body.map((l) => l.split(';'));
  const months = rows.map((r) => r[0]);
  assert.equal(new Set(months).size, months.length, 'more than one line in a month');
  for (const r of rows) {
    assert.match(r[0], /^202[56]-\d\d$/);
    assert.equal(r[4], 'simulated', `${r[0]}: a payroll figure not marked simulated`);
  }
  assert.ok(rows.filter((r) => r[0].startsWith('2025')).every((r) => r[1] === '2'), '2025: two on payroll');
  assert.ok(rows.filter((r) => r[0].startsWith('2026')).every((r) => r[1] === '1'), '2026: one on payroll');
});

test('page: seven rooms with the business plan, a time-to-tomb counter, four labels', () => {
  const p = read(PAGE);
  for (const r of ['spend', 'company', 'funding', 'clients', 'cash', 'plan', 'lines']) assert.match(p, new RegExp(`data-room="${r}"`), `room ${r}`);
  assert.match(p, /id="ob-countdown"/);
  for (const k of ['ob-real', 'ob-decl', 'ob-plan', 'ob-sim']) assert.match(p, new RegExp(`ob-badge ${k}`), `label ${k}`);
});

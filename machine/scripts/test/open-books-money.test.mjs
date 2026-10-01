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
//   PAYROLL     web/src/data/payroll.csv: one line a QUARTER for all staff
//               together (a month with one person would be that person's
//               pay): employer cost, social security, income tax withheld.
//               Net pay never; no role that points at a person.
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

test('payroll: one line a quarter for all staff, never a person, never net pay', () => {
  assert.ok(existsSync(PAYROLL), 'web/src/data/payroll.csv is missing');
  const [head, ...body] = read(PAYROLL).trim().split('\n');
  assert.equal(head, 'quarter;headcount;employer_cost;social_security;income_tax;kind');
  const rows = body.map((l) => l.split(';'));
  const qs = rows.map((r) => r[0]);
  assert.equal(new Set(qs).size, qs.length, 'more than one line in a quarter');
  for (const r of rows) {
    assert.match(r[0], /^202[4-6]-Q[1-4]$/);
    assert.ok(Number(r[1]) >= 1, `${r[0]}: no headcount`);
    assert.match(r[5], /^(real|partly estimated)$/);
  }
  assert.doesNotMatch(read(PAYROLL), /net|liquid|CTO|OPS/i, 'net pay or a role that names a person');
});

test('page: the rooms with the business plan, a time-to-tomb counter, four labels', () => {
  const p = read(PAGE);
  for (const r of ['spend', 'company', 'funding', 'clients', 'cash', 'tax', 'plan', 'lines']) assert.match(p, new RegExp(`data-room="${r}"`), `room ${r}`);
  assert.match(p, /id="ob-countdown"/);
  for (const k of ['ob-real', 'ob-decl', 'ob-plan', 'ob-sim']) assert.match(p, new RegExp(`ob-badge ${k}`), `label ${k}`);
});

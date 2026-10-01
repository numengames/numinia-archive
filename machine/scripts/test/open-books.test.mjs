#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// open-books.test.mjs — the open books are the books of Numen Games S.L.,
// from the day it was incorporated, and the real ledger names no person.
//
//   LEDGER     web/src/data/ledger-2025.csv holds FY2025 from the received-
//              invoices book: every line dated in 2025, and the lines add up
//              to the book's net total (121,040.70 EUR). Nothing dropped.
//   NO PERSON  people and counsel enter as one line a month each, with a
//              headcount, never one line per person (STD-036 LED-006,
//              DBT-022 §1.7); no tax ID, no invoice number of a person.
//   COMPANY    web/src/data/company.ts: born 2024-02-16; the capital steps
//              add up to the registered 5,512.40 EUR, each with its BORME
//              notice; the ENISA loan is 100,000 EUR, as ENISA publishes it.
//   PAGE       /system/open-books opens with the company card and six rooms,
//              and its bars carry the breakdown the tooltip draws.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const W = (...p) => path.join(ROOT, 'web', ...p);
const LEDGER = W('src', 'data', 'ledger-2025.csv');
const COMPANY = W('src', 'data', 'company.ts');
const PAGE = W('src', 'pages', 'system', 'open-books.astro');
const read = (p) => readFileSync(p, 'utf8');

const rows = () => {
  const [head, ...body] = read(LEDGER).trim().split('\n');
  const cols = head.split(';');
  return body.map((l) => Object.fromEntries(l.split(';').map((v, i) => [cols[i], v])));
};

test('ledger: FY2025, whole — the lines add up to the book', () => {
  assert.ok(existsSync(LEDGER), 'web/src/data/ledger-2025.csv is missing');
  const r = rows();
  assert.ok(r.length > 50);
  for (const l of r) assert.match(l.date, /^2025-\d\d-\d\d$/, `a line outside FY2025: ${l.date}`);
  const total = Math.round(r.reduce((s, l) => s + Number(l.base), 0) * 100) / 100;
  assert.equal(total, 121040.7);
});

test('no person: people and counsel are one line a month, with a headcount', () => {
  const r = rows();
  for (const cat of ['people', 'counsel']) {
    const ls = r.filter((l) => l.category === cat);
    assert.ok(ls.length > 0, `no ${cat} lines`);
    const months = ls.map((l) => l.date.slice(0, 7));
    assert.equal(new Set(months).size, months.length, `${cat}: more than one line in a month`);
    for (const l of ls) assert.ok(Number(l.headcount) >= 1, `${cat} ${l.date}: no headcount`);
  }
  const text = read(LEDGER);
  assert.doesNotMatch(text, /\b[0-9XYZ]\d{7}[A-Z]\b|\b[A-HJ-NP-SUVW]\d{8}\b/, 'a tax ID in the ledger');
  assert.doesNotMatch(text, /CHRISTIAN|IMAGINEONEARTH|\b(AN|AS|AE)\b/, 'a person named in the ledger');
});

test('company: born 2024-02-16; capital steps add up to the registry; ENISA 100,000 EUR', async () => {
  assert.ok(existsSync(COMPANY), 'web/src/data/company.ts is missing');
  const t = read(COMPANY);
  assert.match(t, /incorporated:\s*"2024-02-16"/);
  const steps = [...t.matchAll(/\{\s*date:\s*"(\d{4}-\d\d-\d\d)",\s*increase:\s*([\d.]+),\s*borme:\s*"(BORME-A-\d{4}-\d+-\d+)"/g)];
  assert.ok(steps.length >= 3, 'capital steps missing');
  const sum = Math.round(steps.reduce((s, m) => s + Number(m[2]), 0) * 100) / 100;
  assert.equal(sum, 5512.4);
  assert.match(t, /capital:\s*5512\.4\b/);
  assert.match(read(W('src', 'data', 'enisa.ts')), /principal:\s*100000\b/);
});

test('page: company card, six rooms, a tooltip that breaks each bar down', () => {
  const p = read(PAGE);
  assert.match(p, /id="ob-card"/);
  for (const r of ['spend', 'company', 'funding', 'clients', 'cash', 'lines']) assert.match(p, new RegExp(`data-room="${r}"`), `room ${r}`);
  assert.match(p, /id="ob-tip"/);
  assert.match(p, /id="cq-sec-enisa"/);
});

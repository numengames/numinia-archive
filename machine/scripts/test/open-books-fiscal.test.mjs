#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// open-books-fiscal.test.mjs — the books past 2025 and the taxes, readable by
// someone who has never filed a return.
//
//   LEDGER 2026  web/src/data/ledger-2026.csv: every line dated in 2026; its
//                lines add up to the Q3 book (9,464.10 EUR net, one month
//                projected); people one line a QUARTER, with a headcount and
//                the income tax withheld; no person named.
//   SALES        web/src/data/sales.csv: the issued invoices, numbers unique,
//                by sector, the client never named until it agrees; foreign
//                invoices carry the original currency and the rate used.
//   TAXES        web/src/data/tax.ts: each tax explained in plain words, the
//                filing calendar in date order; VAT per quarter ends in one
//                of the three results Hacienda uses: to pay, to offset, to
//                refund.
//   PAGE         a Taxes room with a live counter to the next filing.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const D = (f) => path.join(ROOT, 'web', 'src', 'data', f);
const read = (p) => readFileSync(p, 'utf8');
const csv = (f) => { const [h, ...b] = read(D(f)).trim().split('\n'); const c = h.split(';'); return b.map((l) => Object.fromEntries(l.split(';').map((v, i) => [c[i], v]))); };

test('ledger 2026: dated in 2026, adds up to the Q3 book, people a quarter, nobody named', () => {
  assert.ok(existsSync(D('ledger-2026.csv')), 'ledger-2026.csv is missing');
  const r = csv('ledger-2026.csv');
  for (const l of r) assert.match(l.date, /^2026-\d\d-\d\d$/);
  assert.equal(Math.round(r.reduce((s, l) => s + Number(l.base), 0) * 100) / 100, 9464.1);
  const ppl = r.filter((l) => l.category === 'people');
  assert.ok(ppl.length >= 1);
  for (const l of ppl) { assert.match(l.document, /^PEOPLE-2026-Q[1-4]$/); assert.ok(Number(l.headcount) >= 1); }
  for (const l of r) assert.match(l.kind, /^(real|projected|partly projected)$/);
  assert.doesNotMatch(read(D('ledger-2026.csv')), /CHRISTIAN|M[äa]rtens|022\/2026|023\/2026|F26-4\b/i, 'a person in the ledger');
});

test('sales: unique numbers, by sector, the client not named, currency kept', () => {
  assert.ok(existsSync(D('sales.csv')), 'sales.csv is missing');
  const r = csv('sales.csv');
  const n = r.map((l) => l.invoice);
  assert.equal(new Set(n).size, n.length, 'an invoice number used twice');
  assert.doesNotMatch(read(D('sales.csv')), /Mesa|Arizona/i);
  for (const l of r) if (l.vat === 'OUT') { assert.match(l.original, /USD$/); assert.ok(Number(l.fx) > 0); }
});

test('taxes: plain words, a calendar in order, three VAT results', () => {
  assert.ok(existsSync(D('tax.ts')), 'tax.ts is missing');
  const t = read(D('tax.ts'));
  for (const k of ['to pay', 'to offset', 'to refund']) assert.match(t, new RegExp(`"${k}"`));
  const dates = [...t.matchAll(/due:\s*"(\d{4}-\d\d-\d\d)"/g)].map((m) => m[1]);
  assert.ok(dates.length >= 6);
  assert.deepEqual(dates, [...dates].sort(), 'calendar out of order');
  for (const tax of ['VAT', 'Withholding', 'Social security', 'Corporate tax']) assert.match(t, new RegExp(`name:\\s*"${tax}`));
});

test('page: a Taxes room with a live counter', () => {
  const p = read(path.join(ROOT, 'web', 'src', 'pages', 'system', 'open-books.astro'));
  assert.match(p, /data-room="tax"/);
  assert.match(p, /id="ob-taxcount"/);
});

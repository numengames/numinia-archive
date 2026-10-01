#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// open-books-packs.test.mjs — the downloads in the shapes the people who ask
// for them already use: the gestoría, a CFO, an auditor.
//
//   GESTORÍA  aeatBooks(): the VAT record books in the AEAT's normalised
//             design (Formato electrónico común de los Libros Registro de
//             IVA e IRPF): one workbook, sheets EXPEDIDAS and RECIBIDAS,
//             columns in the AEAT's order, dates dd/mm/yyyy, the year from
//             1 January (the AEAT asks for the books not split by quarter),
//             file named year + tax ID + "C" + name. Reverse charge: total =
//             base, the VAT self-charged and deducted. Withholding apart, for
//             forms 111/190. A 347 draft: companies over 3,005.06 € a year.
//   CFO       pnlByMonth(): the profit and loss month by month in columns;
//             bySupplier(): the spend by supplier with its run-rate.
//   AUDITOR   journal(): every published line as a balanced double entry in
//             the accounting plan's accounts, each with its source file and
//             row; trialBalance(): sums and balances from that journal.
//             Payroll stays one aggregated line: no entry splits net pay.
//   PAGE      three packs, one button each.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const W = (...p) => path.join(ROOT, 'web', ...p);
const LIB = W('src', 'lib', 'exports.ts');
const PAGE = W('src', 'pages', 'system', 'open-books.astro');
const read = (p) => readFileSync(p, 'utf8');
function run(expr) {
  const csv = (f) => JSON.stringify(read(W('src', 'data', f)));
  const script = `
    import * as X from ${JSON.stringify(LIB)};
    import { readBooks } from ${JSON.stringify(W('src', 'lib', 'cash.ts'))};
    const books = readBooks(${csv('ledger-2025.csv')}, ${csv('ledger-2026.csv')}, ${csv('payroll.csv')}, ${csv('sales.csv')});
    const company = { taxId: 'B70735949', name: 'Numen Games S.L.' };
    process.stdout.write(JSON.stringify(${expr}));`;
  return JSON.parse(execFileSync('node', ['--experimental-strip-types', '--no-warnings', '--input-type=module', '-e', script], { encoding: 'utf8', maxBuffer: 1 << 26 }));
}
const near = (a, b, msg) => assert.ok(Math.abs(a - b) < 0.05, `${msg}: ${a} vs ${b}`);

test('gestoría: the AEAT design, the year from 1 January, its file name', () => {
  const a = run("X.aeatBooks(books, company, '2025-04-01', '2025-06-30')");
  assert.equal(a.file, '2025B70735949CNUMEN GAMES SL.xlsx');
  assert.deepEqual(a.sheets.map((s) => s.name), ['EXPEDIDAS', 'RECIBIDAS']);
  const [E, R] = a.sheets;
  assert.equal(E.head.length, 36, 'EXPEDIDAS: columns A to AJ');
  assert.equal(R.head.length, 42, 'RECIBIDAS: columns A to AP');
  assert.match(R.head[0], /^Autoliquidación · Ejercicio$/);
  assert.match(R.head[26], /^Base Imponible$/);
  const q2 = run("books.l25.filter((l) => l.date <= '2025-06-30').length");
  assert.equal(R.rows.length, q2, 'from 1 January to the end of the period');
  for (const r of R.rows) {
    assert.match(r[8], /^\d\d\/\d\d\/2025$/, 'Fecha Expedición dd/mm/yyyy');
    assert.match(r[1], /^[1-4]T$/);
    if (r[21] === 'S') near(r[25], r[26], `${r[10]}: reverse charge, total = base`);
    else near(r[25], r[26] + r[28], `${r[10]}: total = base + VAT`);
    near(r[28], (r[26] * r[27]) / 100, `${r[10]}: cuota = base × tipo`);
  }
  assert.equal(E.rows.length, 6);
  for (const r of E.rows) { assert.equal(r[18], 'N2', 'services to the United States: not subject, place-of-supply rules'); assert.equal(r[14], 'US'); }
});

test('gestoría: withholding apart for 111/190; a 347 draft of companies over 3,005.06 €', () => {
  const w = run("X.withholdingSheet(books, '2026-07-01', '2026-09-30')");
  assert.ok(w.rows.length >= 1);
  for (const r of w.rows) assert.ok(r.at(-1) > 0);
  const m = run("X.form347(books, '2025')");
  for (const r of m.rows) {
    assert.ok(r[2] > 3005.06, `${r[0]} is over the threshold`);
    assert.doesNotMatch(r[0], /together/i, 'aggregated groups of people are not a counterparty');
    near(r[2], r[3] + r[4] + r[5] + r[6], `${r[0]}: the four quarters add up`);
  }
});

test('CFO: the profit and loss month by month; spend by supplier', () => {
  const p = run("X.pnlByMonth(books, '2025-01-01', '2025-12-31')");
  assert.equal(p.head.length, 1 + 12 + 1, 'heading, twelve months, total');
  const total = run("X.accounts(books, '2025-01-01', '2025-12-31').beforeTax");
  const last = p.rows.find((r) => /Result before tax/.test(r[0]));
  near(last.at(-1), total, 'the total column is the year');
  near(last.slice(1, -1).reduce((s, v) => s + v, 0), total, 'the months add up to the year');
  const s = run("X.bySupplier(books, '2025-01-01', '2025-12-31')");
  assert.deepEqual(s.head, ['Supplier', 'Category', 'Invoices', 'Net (EUR)', 'Share', 'First', 'Last', 'A month, last 3 months billed (EUR)']);
  near(s.rows.reduce((t, r) => t + r[3], 0), run("books.l25.reduce((t, l) => t + Number(l.base), 0)"), 'the suppliers add up to the book');
});

test('auditor: a balanced journal from every line, with its source; a trial balance', () => {
  const j = run("X.journal(books, '2025-01-01', '2025-12-31')");
  assert.deepEqual(j.head, ['Entry', 'Date', 'Account', 'Account name', 'Debit', 'Credit', 'Document', 'Description', 'Source', 'Kind']);
  const by = {};
  for (const r of j.rows) (by[r[0]] ??= []).push(r);
  for (const [e, rs] of Object.entries(by)) near(rs.reduce((s, r) => s + r[4] - r[5], 0), 0, `entry ${e} balances`);
  for (const r of j.rows) assert.match(r[8], /^web\/src\/data\/(ledger-2025|ledger-2026|payroll|sales)\.csv:\d+$/, 'each entry names its file and row');
  assert.ok(!j.rows.some((r) => r[2] === '465'), 'no entry splits out net pay');
  const t = run("X.trialBalance(X.journal(books, '2025-01-01', '2025-12-31'))");
  near(t.rows.reduce((s, r) => s + r[2], 0), t.rows.reduce((s, r) => s + r[3], 0), 'debits = credits');
  const result = -t.rows.filter((r) => /^[67]/.test(r[0])).reduce((s, r) => s + r[4], 0);
  const book = run("books.sales.filter((x) => x.date.startsWith('2025')).reduce((s, x) => s + Number(x.base), 0) - books.l25.filter((l) => !l.account.startsWith('2')).reduce((s, l) => s + Number(l.base), 0) - books.payroll.filter((p) => p.quarter.startsWith('2025')).reduce((s, p) => s + Number(p.employer_cost), 0)");
  near(result, book, "the journal's result is the book's");
});

test('page: three packs, one each for the gestoría, a CFO and an auditor', () => {
  const p = read(PAGE);
  for (const f of ['gestoria', 'cfo', 'audit']) assert.match(p, new RegExp(`data-dl="${f}"`), `pack ${f}`);
  assert.match(p, /sha256/, 'the audit pack carries each source file\'s hash');
});

#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// open-books-exports.test.mjs — anything on Open books can be downloaded, for
// any period, from the same lines the page draws (STD-036 LED-002).
//
//   PERIOD    web/src/lib/exports.ts period(): a month, a quarter, a year or
//             two dates, clipped to the books' span (16 Feb 2024 onward).
//   ACCOUNTS  accounts(): the profit and loss in the accounting plan's
//             abbreviated headings, each cost spread over the days it covers
//             (LED-003), so twelve months add up to their year and the whole
//             span adds up to every line; equipment (account 217) is an
//             asset, shown apart, not a cost.
//   BOOKS     receivedBook() / issuedBook(): the gestoría's layout, by
//             invoice date; payroll is not an invoice and stays out; reverse
//             charge says so; total = base + VAT − withholding.
//   FILES     toCsv(): semicolons, a byte-order mark so a spreadsheet reads
//             the accents. toXlsx(): a real workbook, one sheet per view.
//   PAGE      a period picker, the download buttons, a print sheet for the
//             PDF, and the business plan exported from the page's own sums.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
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
    const out = ${expr};
    process.stdout.write(JSON.stringify(out instanceof Uint8Array ? Buffer.from(out).toString('latin1') : out));`;
  return JSON.parse(execFileSync('node', ['--experimental-strip-types', '--no-warnings', '--input-type=module', '-e', script], { encoding: 'utf8', maxBuffer: 1 << 26 }));
}
const near = (a, b, msg) => assert.ok(Math.abs(a - b) < 0.05, `${msg}: ${a} vs ${b}`);

test('period: a month, a quarter, a year or two dates, clipped to the books', () => {
  assert.ok(existsSync(LIB), 'web/src/lib/exports.ts is missing');
  assert.deepEqual(run("X.period('month', '2025-02')"), { from: '2025-02-01', to: '2025-02-28', label: 'February 2025' });
  assert.deepEqual(run("X.period('quarter', '2025-Q2')"), { from: '2025-04-01', to: '2025-06-30', label: 'Q2 2025' });
  assert.deepEqual(run("X.period('year', '2024')"), { from: '2024-02-16', to: '2024-12-31', label: '2024' });
  assert.deepEqual(run("X.period('custom', '2025-03-10', '2025-05-20')"), { from: '2025-03-10', to: '2025-05-20', label: '10 Mar 2025 – 20 May 2025' });
});

test('accounts: spread over the days, months add up to the year, the span to every line', () => {
  const year = run("X.accounts(books, '2025-01-01', '2025-12-31')");
  for (const k of ['revenue', 'supplies', 'staff', 'other', 'operating', 'financial', 'beforeTax', 'capitalised', 'byCategory']) assert.ok(k in year, `accounts().${k}`);
  near(year.operating, year.revenue - year.supplies - year.staff - year.other, 'operating result');
  near(year.beforeTax, year.operating - year.financial, 'result before tax');
  const months = run("Array.from({ length: 12 }, (_, i) => { const m = String(i + 1).padStart(2, '0'); const p = X.period('month', '2025-' + m); return X.accounts(books, p.from, p.to).beforeTax; })");
  near(months.reduce((s, v) => s + v, 0), year.beforeTax, 'twelve months = the year');
  const all = run("X.accounts(books, '2024-01-01', '2028-12-31')");
  const every = run("[...books.l25, ...books.l26].reduce((s, l) => s + Number(l.base), 0) + books.payroll.reduce((s, p) => s + Number(p.employer_cost), 0)");
  near(all.supplies + all.staff + all.other + all.financial + all.capitalised, every, 'the whole span = every line');
  near(year.revenue, 19079.8, '2025 revenue: the six US invoices');
  assert.ok(year.byCategory.every((c) => typeof c.label === 'string' && typeof c.amount === 'number'));
});

test('gestoría books: by invoice date, payroll out, reverse charge said, totals add up', () => {
  const r = run("X.receivedBook(books, '2025-01-01', '2025-03-31')");
  assert.deepEqual(r.head, ['Fecha expedición', 'Fecha operación', 'Número factura', 'Nombre expedidor', 'Concepto', 'Cuenta PGC', 'Clave operación', 'Inversión sujeto pasivo', 'Base imponible', 'Tipo IVA %', 'Cuota IVA soportado', 'Retención IRPF', 'Total factura', 'Cuota autorepercutida ISP']);
  const q1 = run("books.l25.filter((l) => l.date <= '2025-03-31').length");
  assert.equal(r.rows.length, q1, 'every Q1 2025 invoice, and nothing else');
  for (const x of r.rows) {
    assert.ok(x[0] >= '2025-01-01' && x[0] <= '2025-03-31');
    assert.doesNotMatch(String(x[3]), /^Payroll/);
    near(x[12], x[8] + x[10] - x[11], `${x[2]}: total`);
    if (x[7] === 'S') { assert.equal(x[10], 0, `${x[2]}: reverse charge pays no VAT to the supplier`); near(x[13], x[8] * 0.21, `${x[2]}: the VAT the company declares itself`); }
  }
  const i = run("X.issuedBook(books, '2025-01-01', '2025-12-31')");
  assert.equal(i.rows.length, 6);
  assert.ok(i.head.includes('Divisa original') && i.head.includes('Tipo de cambio'));
  assert.doesNotMatch(JSON.stringify(i), /Mesa/i, 'the client is not named');
});

test('files: CSV a spreadsheet reads; XLSX a real workbook, one sheet per view', () => {
  const c = run("X.toCsv({ head: ['a', 'b'], rows: [['x;y', 1.5], ['Gestoría', 2]] })");
  assert.equal(c, '\uFEFFa;b\r\n"x;y";1.5\r\nGestoría;2\r\n');
  const z = run("X.toXlsx([{ name: 'Profit and loss', head: ['a'], rows: [[1]] }, { name: 'Received invoices', head: ['b'], rows: [['ñ']] }])");
  assert.equal(z.slice(0, 2), 'PK');
  for (const f of ['[Content_Types].xml', '_rels/.rels', 'xl/workbook.xml', 'xl/_rels/workbook.xml.rels', 'xl/worksheets/sheet1.xml', 'xl/worksheets/sheet2.xml']) assert.ok(z.includes(f), `the workbook holds ${f}`);
  assert.ok(z.includes('name="Profit and loss"') && z.includes('name="Received invoices"'));
});

test('page: a period picker, the downloads, a print sheet, the plan from its own sums', () => {
  const p = read(PAGE);
  assert.match(p, /from "@\/lib\/exports"/, 'the downloads are built by @/lib/exports');
  for (const id of ['ob-dl', 'ob-dl-kind', 'ob-dl-pick', 'ob-dl-from', 'ob-dl-to']) assert.match(p, new RegExp(`id="${id}"`), `#${id}`);
  for (const f of ['accounts-csv', 'accounts-xlsx', 'received', 'issued', 'taxes', 'plan-xlsx', 'plan-pdf', 'page-pdf']) assert.match(p, new RegExp(`data-dl="${f}"`), `download ${f}`);
  assert.match(p, /@media print/);
  assert.match(p, /window\.obPlan\s*=/, 'the plan export reads the sums the page drew');
});

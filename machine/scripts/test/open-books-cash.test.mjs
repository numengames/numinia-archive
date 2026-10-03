#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// open-books-cash.test.mjs — the cash in the bank, where it comes from, and
// the next quarter in three futures.
//
//   BANK        web/src/data/money.ts: the bank balance the company gave,
//               19,500 EUR on 2026-10-01, "declared" until the statement is
//               loaded; no slider guesses it any more.
//   RECONCILE   web/src/lib/cash.ts reconcile(): money in − outflows loaded −
//               books not loaded (estimated) = cash expected; against the
//               bank, the difference. Every row says its kind; the books not
//               loaded are "simulated"; a difference over the threshold
//               raises the alert (STD-036 LED-011).
//   FUTURES     web/src/lib/cash.ts futures(): three futures, one quarter
//               ahead and no further — nothing changes, cuts in phases,
//               income arrives — each with its date of running out. The cuts
//               name a cost, never a person (STD-036 LED-006, LED-012).
//   PAGE        the reconciliation table, its alert, the three futures and
//               the open questions for the gestoría counted in Taxes.
//   CORPUS      STD-036 carries LED-011 and LED-012; PRO-021 reconciles the
//               month with the bank statement.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const W = (...p) => path.join(ROOT, 'web', ...p);
const LIB = W('src', 'lib', 'cash.ts');
const MONEY = W('src', 'data', 'money.ts');
const TAX = W('src', 'data', 'tax.ts');
const PAGE = W('src', 'pages', 'system', 'open-books.astro');
const read = (p) => readFileSync(p, 'utf8');
const KINDS = ['real', 'declared', 'plan', 'simulated'];

/** Run cash.ts with the four CSV files, the way the page does. */
function run(expr) {
  const csv = (f) => JSON.stringify(read(W('src', 'data', f)));
  const script = `
    import * as C from ${JSON.stringify(LIB)};
    const books = C.readBooks(${csv('ledger-2025.csv')}, ${csv('ledger-2026.csv')}, ${csv('payroll.csv')}, ${csv('sales.csv')});
    const funds = { capital: 3000, rounds: [{ what: 'First round', amount: 100000, kind: 'declared' }, { what: 'Second round', amount: 120000, kind: 'declared' }], loan: 100000 };
    const bank = { amount: 19500, kind: 'declared', asOf: '2026-10-01' };
    process.stdout.write(JSON.stringify(${expr}));`;
  return JSON.parse(execFileSync('node', ['--experimental-strip-types', '--no-warnings', '--input-type=module', '-e', script], { encoding: 'utf8' }));
}

test('bank: 19,500 EUR on 1 October 2026, declared until the statement is loaded', () => {
  const t = read(MONEY);
  assert.match(t, /export const CASH = \{[^}]*kind: "declared"/s, 'the bank balance is the company\'s word: declared');
  assert.match(t, /amount: 19500/);
  assert.match(t, /asOf: "2026-10-01"/);
  assert.doesNotMatch(t, /guess:/, 'the simulated guess must go');
  assert.doesNotMatch(read(PAGE), /id="ob-cash"/, 'no slider guesses the bank balance any more');
});

test('reconcile: in − out − not loaded = expected; against the bank, the gap in amber', () => {
  assert.ok(existsSync(LIB), 'web/src/lib/cash.ts is missing');
  const r = run('C.reconcile(books, funds, bank)');
  for (const row of r.rows) assert.ok(KINDS.includes(row.kind), `${row.label}: kind ${row.kind}`);
  const sum = (g) => r.rows.filter((x) => x.group === g).reduce((s, x) => s + x.amount, 0);
  assert.equal(Math.round(sum('in')), Math.round(r.moneyIn));
  assert.equal(Math.round(sum('out')), Math.round(r.out));
  assert.equal(Math.round(sum('missing')), Math.round(r.missing));
  assert.equal(Math.round(r.expected), Math.round(r.moneyIn - r.out - r.missing));
  assert.equal(Math.round(r.gap), Math.round(r.expected - 19500));
  // The figures of 1 October 2026: 344,258 in; the books not loaded ≈ 50,500.
  assert.equal(Math.round(r.moneyIn), 344258);
  assert.ok(r.out > 270000 && r.out < 275000, `outflows loaded ${r.out}`);
  for (const row of r.rows.filter((x) => x.group === 'missing')) assert.equal(row.kind, 'simulated', `${row.label} is an estimate`);
  assert.ok(r.missing > 45000 && r.missing < 52000, `books not loaded ${r.missing}`);
  assert.equal(r.bank.kind, 'declared');
  assert.ok(Math.abs(r.gap) > r.threshold, 'the unexplained gap of 1 October 2026 (≈ 700 EUR) raises the alert');
  assert.equal(r.alert, true);
});

test('futures: three, one quarter ahead and no further, each with its date of running out', () => {
  const f = run("C.futures(books, { cash: 19500, asOf: '2026-10-01', payrollEnds: '2026-10', oneOff: [2700, 4400], income: 3000, incomeFrom: '2026-11' })");
  assert.deepEqual(f.map((x) => x.id), ['same', 'cuts', 'income']);
  for (const x of f) {
    assert.deepEqual(x.months.map((m) => m.month), ['2026-10', '2026-11', '2026-12'], `${x.id}: one quarter ahead`);
    assert.match(x.tomb, /^\d{4}-\d\d-\d\d$|^never$/);
    assert.ok(KINDS.includes(x.kind));
  }
  const [same, cuts, income] = f;
  const q3 = run('C.runRate(books)');
  assert.equal(Math.round(same.months[0].out), Math.round(q3.total), 'nothing changes: the July–September month');
  assert.ok(cuts.months[2].out < cuts.months[0].out, 'cuts fall in phases');
  assert.ok(cuts.months[0].out > same.months[0].out, 'the month the cost ends carries its one-off cost');
  assert.ok(cuts.tomb > same.tomb, 'cutting lasts longer');
  assert.ok(cuts.tombEarly <= cuts.tomb, 'the one-off cost as a range: its high end runs out first');
  assert.equal(income.months[0].in, 0);
  assert.equal(income.months[1].in, 3000);
  assert.ok(income.tomb === 'never' || income.tomb > same.tomb, 'income lasts longer');
  const nov = run("C.futures(books, { cash: 19500, asOf: '2026-10-01', payrollEnds: '2026-11', oneOff: [2700, 4400], income: 0, incomeFrom: '2026-11' })")[1];
  assert.ok(nov.months[1].out > cuts.months[1].out, 'payroll ending in November costs more in November');
});

test('futures name a cost, never a person, and never announce what has not happened', () => {
  const ban = /\b(dismiss\w*|despid\w*|fired?|redundan\w*|laid off|lay-?off|operations (person|employee|manager)|employee leaves)\b/i;
  for (const f of [LIB, PAGE, MONEY]) assert.doesNotMatch(read(f), ban, `${path.basename(f)} names a person's exit`);
});

test('page: the reconciliation, its alert, three futures, and the gestoría questions counted', () => {
  const p = read(PAGE);
  for (const id of ['ob-recon', 'ob-recon-alert', 'ob-futures', 'ob-pend']) assert.match(p, new RegExp(`id="${id}"`), `#${id}`);
  assert.match(read(MONEY), /payrollEnds: \["2026-10", "2026-11"\]/, 'payroll ends at the end of October or November');
  assert.match(p, /FUTURES\.payrollEnds\.map/, 'the page reads the choices from money.ts');
  assert.match(p, /id="ob-gq"/, 'the count of open questions in Taxes');
  const t = read(TAX);
  const qs = t.match(/export const GESTORIA_QUESTIONS[\s\S]*?\n\];/);
  assert.ok(qs, 'tax.ts: GESTORIA_QUESTIONS');
  assert.equal((qs[0].match(/\{ topic: "/g) || []).length, 6, 'six open questions');
  assert.doesNotMatch(qs[0], /Christian|Märtens|F26-4|A Punto/, 'the public count gives topics, not the private detail');
});

test('corpus: the bank reconciliation and the futures are rules before they are a page', () => {
  const std = read(path.join(ROOT, 'standards', 'STD-036-one-account.md'));
  assert.match(std, /\| LED-011 \|/); assert.match(std, /\| LED-012 \|/);
  assert.doesNotMatch(std, /^version: "0\.2\.\d+"$/m, 'STD-036 bumps its minor version');
  const pro = read(path.join(ROOT, 'procedures', 'PRO-021-closing-the-month.md'));
  assert.match(pro, /bank statement/i);
  assert.doesNotMatch(pro, /^version: "0\.5\.\d+"$/m, 'PRO-021 bumps its minor version');
});

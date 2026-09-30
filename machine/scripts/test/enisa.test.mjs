#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// enisa.test.mjs — the ENISA participative loan is public, in one record
// (OPS-017) and one section of the open books, with ENISA's seal.
//
//   RECORD       OPS-017 exists, says the signing date, and holds the 2025
//                interest table the page reads.
//   ONE FIGURE   the page's data file (web/src/data/enisa.ts) carries the same
//                quarters and amounts as the record — two copies that agree,
//                checked, because the site cannot read the record's table.
//   SEAL         the seal is the one ENISA issues for loans signed before
//                2025, it is in the tree, and REUSE.toml names its holder:
//                a third party's mark is never ours to license.
//   PAGE         /system/open-books carries the section, the seal and a link
//                to the record; the markdown view says the same.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT, parseFM } from '../lib/frontmatter.mjs';

const RECORD = path.join(ROOT, 'operations', 'OPS-017-the-enisa-loan.md');
const DATA = path.join(ROOT, 'web', 'src', 'data', 'enisa.ts');
const SEAL = 'web/public/partners/enisa-financiada-por.png';
const PAGE = path.join(ROOT, 'web', 'src', 'pages', 'system', 'open-books.astro');
const MD = path.join(ROOT, 'web', 'src', 'lib', 'composed-md.ts');
const read = (p) => readFileSync(p, 'utf8');

/** [quarter, amount] pairs from a markdown table row like `| 2025-Q1 | 1,249.49 € |`. */
const recordRows = (text) => [...text.matchAll(/^\| (\d{4}-Q[1-4]) \| ([\d,]+\.\d{2}) € \|/gm)]
  .map((m) => [m[1], Number(m[2].replace(/,/g, ''))]);
/** [quarter, amount] pairs from the data file: `{ quarter: "2025-Q1", amount: 1249.49 }`. */
const dataRows = (text) => [...text.matchAll(/quarter:\s*"(\d{4}-Q[1-4])",\s*amount:\s*([\d.]+)/g)]
  .map((m) => [m[1], Number(m[2])]);

test('record: OPS-017 exists and says when the loan was signed', () => {
  assert.ok(existsSync(RECORD), 'operations/OPS-017-the-enisa-loan.md is missing');
  const text = read(RECORD);
  assert.equal(parseFM(text)?.id, 'OPS-017');
  assert.match(text, /2024-10-22/, 'the signing date is not in the record');
});

test('one figure: the page data and the record carry the same interest, quarter by quarter', () => {
  const rec = recordRows(read(RECORD));
  assert.ok(rec.length >= 4, 'the record has no interest table');
  assert.ok(existsSync(DATA), 'web/src/data/enisa.ts is missing');
  assert.deepEqual(dataRows(read(DATA)), rec);
});

test('seal: the pre-2025 seal is in the tree and REUSE.toml names ENISA as its holder', () => {
  assert.ok(existsSync(path.join(ROOT, SEAL)), `${SEAL} is missing`);
  const toml = read(path.join(ROOT, 'REUSE.toml'));
  const i = toml.indexOf(`"${SEAL}"`);
  assert.ok(i > 0, 'REUSE.toml does not name the seal');
  const block = toml.slice(i, toml.indexOf('[[annotations]]', i) === -1 ? undefined : toml.indexOf('[[annotations]]', i));
  assert.match(block, /Empresa Nacional de Innovación/);
  assert.match(block, /LicenseRef-Third-Party-Mark/);
  assert.ok(existsSync(path.join(ROOT, 'LICENSES', 'LicenseRef-Third-Party-Mark.txt')));
});

test('page: open books carries the loan section, the seal and the record', () => {
  const page = read(PAGE);
  assert.match(page, /id="cq-sec-enisa"/);
  assert.match(page, /partners\/enisa-financiada-por\.png/);
  assert.match(page, /OPS-017/);
  assert.match(read(MD), /## The ENISA loan/);
});

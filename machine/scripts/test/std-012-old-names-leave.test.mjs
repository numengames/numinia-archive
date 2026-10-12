#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-012-old-names-leave.test.mjs — DEF-004, DEF-010 and DEF-011 are checked.
//
// THE PROBLEM THIS COVERS
// STD-012 named its guard as the check of DEF-010 (a document changes series
// under a new name) and DEF-011 (absorption carries the reasoning), and a
// hand-run tool as the check of DEF-004 (a record carried up is deleted). The
// guard declared only DEF-008 and DEF-009, so it never reported the other
// three: the Check table promised automation nobody ran.
//
// WHAT IS UNDER TEST
// The guard declares the three plates, and each fires on a fixture: an
// identifier named in `absorbs:` or `former_id:` still held by a document in
// the tree. A withdrawn document naming its heir is no finding, and an
// identifier that left the tree and was later reused is not a stay.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';
import { meta, oldNamesStill } from '../../checks/rules/std-012-corpus-does-not-grow.mjs';

// A corpus of headers only: { rel: frontmatter }.
const corpus = (fms) => ({ root: '/nowhere', files: Object.keys(fms), text: () => '', fm: (rel) => fms[rel] });
const plates = (fms, retired = new Map()) => oldNamesStill(corpus(fms), retired).map((f) => `${f.plate} ${f.where}`);

test('the guard declares DEF-004, DEF-010 and DEF-011', () => {
  for (const p of ['DEF-004', 'DEF-010', 'DEF-011']) assert.ok(meta.plates.includes(p), `${p} is not in meta.plates`);
});

test('DEF-004: a report that absorbs a record still in the tree', () => {
  assert.deepEqual(plates({
    'reports/RPT-900-w1.md': { id: 'RPT-900', status: 'active', absorbs: ['MIS-0900'] },
    'missions/MIS-0900-x.md': { id: 'MIS-0900', status: 'done' },
  }), ['DEF-004 reports/RPT-900-w1.md']);
});

test('DEF-011: an absorber whose old document stays in force', () => {
  assert.deepEqual(plates({
    'standards/STD-900-a.md': { id: 'STD-900', status: 'draft', absorbs: ['STD-901'] },
    'standards/STD-901-b.md': { id: 'STD-901', status: 'draft' },
  }), ['DEF-011 standards/STD-900-a.md']);
});

test('DEF-011: the old document withdrawn and naming its heir is no finding', () => {
  assert.deepEqual(plates({
    'standards/STD-900-a.md': { id: 'STD-900', status: 'draft', absorbs: ['STD-901'] },
    'standards/STD-901-b.md': { id: 'STD-901', status: 'withdrawn', superseded_by: 'STD-900' },
  }), []);
});

test('DEF-010: a former_id still held by a document in force', () => {
  assert.deepEqual(plates({
    'system/SYS-900-a.md': { id: 'SYS-900', status: 'active', former_id: 'STD-902' },
    'standards/STD-902-b.md': { id: 'STD-902', status: 'active' },
  }), ['DEF-010 system/SYS-900-a.md']);
});

test('an absorbed identifier that left and was reused is not a stay', () => {
  assert.deepEqual(plates({
    'reports/RPT-900-w1.md': { id: 'RPT-900', status: 'active', absorbs: ['DBT-900'] },
    'debt/DBT-900-new.md': { id: 'DBT-900', status: 'active' },
  }, new Map([['DBT-900', 'debt/DBT-900-old.md']])), []);
});

test("STD-012's Check table names the guard for each of the three, and the guard is what checks them", () => {
  const std = readFileSync(path.join(ROOT, 'standards/STD-012-corpus-does-not-grow.md'), 'utf8');
  for (const p of ['DEF-004', 'DEF-010', 'DEF-011']) {
    const row = std.split('\n').find((l) => l.startsWith(`| ${p} |`));
    assert.ok(row, `STD-012 has no ${p} row`);
    assert.match(row.split('|').at(-2), /std-012-corpus-does-not-grow\.mjs/, `${p}'s Verified-by cell does not name the guard`);
  }
});

// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-004-the-header.test.mjs — one case per plate, on run() over a
// synthetic corpus.
//
// The tree is clean for HDR today (lint-frontmatter: 0 findings), so an
// oracle diff against main proves nothing about this guard. Each plate is
// exercised here on the smallest header that trips it, with a clean control
// that trips none. No process, no git.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFM } from '../../scripts/lib/frontmatter.mjs';
import { run, meta } from '../rules/std-004-the-header.mjs';

const GOOD = {
  id: 'DBT-900', title: 'T', type: 'documentation', status: 'active', version: '0.1.0',
  created: '2026-09-11T10:00:00+02:00', updated: '2026-09-11T11:00:00+02:00', license: 'CC-BY-4.0',
};
const yaml = (o) => Object.entries(o).map(([k, v]) => `${k}: ${v === '' ? '""' : JSON.stringify(v)}`).join('\n');
const doc = (fields, body = 'body') => `---\n${yaml(fields)}\n---\n\n# T\n\n${body}\n`;
const corpus = (files) => ({ root: '/nowhere', files: Object.keys(files), text: (r) => files[r], fm: (r) => parseFM(files[r]) });
const plates = (files) => [...new Set(run(corpus(files)).map((f) => f.plate))].sort();
const one = (fields, rel = 'debt/DBT-900-a.md') => plates({ [rel]: doc(fields) });

test('a complete ring-1 header in a governed dir trips nothing', () => {
  assert.deepEqual(one(GOOD), []);
});

test('HDR-000 / HDR-040: no header at all', () => {
  assert.deepEqual(plates({ 'debt/DBT-900-a.md': '# T\n\nbody\n' }), ['HDR-000', 'HDR-040', 'HDR-043']);
});

test('HDR-001..008: each missing ring-1 field under its own plate', () => {
  const map = { id: 'HDR-001', title: 'HDR-002', type: 'HDR-003', status: 'HDR-004',
    version: 'HDR-005', created: 'HDR-006', updated: 'HDR-007', license: 'HDR-008' };
  for (const [k, plate] of Object.entries(map)) {
    const f = { ...GOOD }; delete f[k];
    const got = one(f);
    assert.ok(got.includes(plate), `missing ${k}: expected ${plate}, got ${got}`);
  }
  // a missing licence is also HDR-043 (bound scope)
  const f = { ...GOOD }; delete f.license;
  assert.ok(one(f).includes('HDR-043'));
});

test('HDR-001: id shape and series prefix', () => {
  assert.deepEqual(one({ ...GOOD, id: 'nope' }), ['HDR-001']);
  assert.deepEqual(one({ ...GOOD, id: 'MIS-900' }), ['HDR-001']);
  const exempt = { ...GOOD, registration: 'exempt' }; delete exempt.id;
  assert.deepEqual(one(exempt), []);   // STD-001 §5.0: no id, registered as exempt
});

test('HDR-003 / HDR-004 / HDR-019: type vocabulary, lifecycle, status case', () => {
  assert.deepEqual(one({ ...GOOD, type: 'poem' }), ['HDR-003']);
  assert.deepEqual(one({ ...GOOD, status: 'flying' }), ['HDR-004']);
  assert.deepEqual(one({ ...GOOD, status: 'Active' }), ['HDR-019']);
});

test('HDR-005: bare SemVer', () => {
  assert.deepEqual(one({ ...GOOD, version: 'v0.1.0' }), ['HDR-005']);
});

test('HDR-006 / HDR-007: real times, no midnight, updated after created', () => {
  assert.deepEqual(one({ ...GOOD, created: '2026-09-11' }), ['HDR-006']);
  assert.deepEqual(one({ ...GOOD, created: '2026-09-11T00:00:00Z' }), ['HDR-006']);
  assert.deepEqual(one({ ...GOOD, updated: '2026-09-11' }), ['HDR-007']);
  assert.deepEqual(one({ ...GOOD, updated: '2026-09-11T09:00:00+02:00' }), ['HDR-007']);
});

test('HDR-009: an empty value is written; uid is the exception', () => {
  assert.deepEqual(one({ ...GOOD, guild: '' }), ['HDR-009']);
  assert.deepEqual(one({ ...GOOD, uid: '' }), []);
});

test('HDR-012..014: ring-2 vocabularies', () => {
  assert.deepEqual(one({ ...GOOD, provenance: 'oracle' }), ['HDR-012']);
  assert.deepEqual(one({ ...GOOD, created_source: 'svn:1' }), ['HDR-013']);
  assert.deepEqual(one({ ...GOOD, created_confidence: 'sure' }), ['HDR-014']);
});

test('HDR-017: type belongs to another series', () => {
  assert.deepEqual(one({ ...GOOD, id: 'DBT-900', type: 'mission', status: 'todo' }), ['HDR-017']);
});

test('HDR-018: unregistered subtype', () => {
  assert.deepEqual(one({ ...GOOD, id: 'RPT-900', type: 'report', subtype: 'weekly' }, 'reports/RPT-900-a.md'), ['HDR-018']);
});

test('HDR-020: uid carries a value', () => {
  assert.deepEqual(one({ ...GOOD, uid: 'abc' }), ['HDR-020']);
});

test('HDR-030 / HDR-031: a field in no ring; a retired field', () => {
  assert.deepEqual(one({ ...GOOD, colour: 'red' }), ['HDR-030']);
  assert.deepEqual(one({ ...GOOD, area: 'x' }), ['HDR-031']);
});

test('HDR-032: TBA with no owning mission', () => {
  assert.deepEqual(one({ ...GOOD, territory: 'TBA' }), ['HDR-032']);
});

test('HDR-033..038: closed vocabularies, template comment stripped', () => {
  assert.deepEqual(one({ ...GOOD, guild: 'Procuradores' }), ['HDR-033']);
  assert.deepEqual(one({ ...GOOD, id: 'MIS-0900', type: 'mission', status: 'todo', type_execution: 'híbrido' }, 'missions/MIS-0900-a.md'), ['HDR-034']);
  assert.deepEqual(one({ ...GOOD, visibility: 'secret' }), ['HDR-035']);
  assert.deepEqual(one({ ...GOOD, territory: 'Mars' }), ['HDR-036']);
  assert.deepEqual(one({ ...GOOD, id: 'MIS-0900', type: 'mission', status: 'todo', priority: 'urgent' }, 'missions/MIS-0900-a.md'), ['HDR-037']);
  assert.deepEqual(one({ ...GOOD, id: 'MIS-0900', type: 'mission', status: 'todo', effort: 'XXL' }, 'missions/MIS-0900-a.md'), ['HDR-038']);
  assert.deepEqual(one({ ...GOOD, guild: 'Sentinels  # Sentinels|Alchemists' }), []);
});

test('HDR-044: a placeholder value; status is exempt', () => {
  assert.deepEqual(one({ ...GOOD, title: 'TBD' }), ['HDR-044']);
  assert.deepEqual(one({ ...GOOD, id: 'MIS-0900', type: 'mission', status: 'todo' }, 'missions/MIS-0900-a.md'), []);
});

test('scope: outward-facing and apparatus files are not held; a non-governed dir is bound but not ringed', () => {
  assert.deepEqual(plates({ 'README.md': '# no header\n' }), []);
  assert.deepEqual(plates({ 'machine/templates/X-TEMPLATE.md': '# no header\n' }), []);
  // check-core-rules held every tracked .md outside web/ that was not apparatus:
  // a stray file under machine/scripts/ gets HDR-040/043, never the ring contract.
  assert.deepEqual(plates({ 'machine/scripts/notes.md': '# no header\n' }), ['HDR-040', 'HDR-043']);
});

test('meta.plates is exactly what run() can emit', () => {
  const emitted = new Set();
  for (const src of [
    { 'debt/DBT-900-a.md': '# T\n' },
    { 'debt/DBT-900-a.md': doc({ ...GOOD, id: 'x', type: 'poem', status: 'Flying', version: 'v1', created: '2026', updated: '2025', guild: '', uid: 'a', area: 'x', colour: 'r', territory: 'TBA', provenance: 'p', created_source: 's', created_confidence: 'c', title: 'TBD' }) },
  ]) for (const f of run(corpus(src))) emitted.add(f.plate);
  for (const p of emitted) assert.ok(meta.plates.includes(p), `${p} emitted but not declared`);
});

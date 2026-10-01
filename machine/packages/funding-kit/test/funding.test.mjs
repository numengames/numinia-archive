#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// funding.test.mjs — the funding tool, proven against invented records.
// The registers it reads are the real STD-045 and STD-038 of this tree.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegister, parseFM, REQUIRED, WHEN_DUE, COMMON } from '../funding.mjs';

const KIT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.resolve(KIT, '..', '..', '..');
const TOOL = path.join(KIT, 'funding.mjs');
const TODAY = '2026-10-15';

function scratch() { const d = mkdtempSync(path.join(tmpdir(), 'funding-')); cpSync(path.join(KIT, 'fixtures'), d, { recursive: true }); return d; }
const run = (dir, ...x) => { const r = spawnSync('node', [TOOL, dir, '--today', TODAY, ...x], { encoding: 'utf8' }); return { code: r.status, out: r.stdout, err: r.stderr }; };
const edit = (dir, f, fn) => { const p = path.join(dir, f); writeFileSync(p, fn(readFileSync(p, 'utf8'))); };
function check(name, fn) { test(name, () => { const d = scratch(); try { fn(d); } finally { rmSync(d, { recursive: true, force: true }); } }); }

test('the registers are read: eight stages, three closed, four instruments, three payments, six reasons, four chances', () => {
  const reg = loadRegister();
  assert.deepEqual(reg.order, ['foreseen', 'open', 'applied', 'granted', 'justified', 'paid', 'denied', 'declined']);
  assert.deepEqual(reg.closed, ['paid', 'denied', 'declined']);
  assert.deepEqual(reg.instruments, ['grant', 'loan', 'prize', 'programme']);
  assert.deepEqual(reg.payments, ['advance', 'on-justification', 'in-kind']);
  assert.equal(reg.reasons.length, 6);
  assert.deepEqual(reg.chances, ['high', 'medium', 'low', 'none']);
});

test('STD-046 names every field of the record, and the mould carries them', () => {
  const std = readFileSync(path.join(ROOT, 'standards/STD-046-a-grant-has-a-record.md'), 'utf8').replace(/\s+/g, ' ');
  const word = { id: 'identifier', amount: 'the most the house could receive', payment: 'how it pays', advance: 'paid in advance', call: "call's address", opens: 'opening', closes: 'closing days', estimated: 'estimated', state: 'stage', next_action: 'next action', next_date: 'next date', opened: 'date opened', license: 'licence', closed: 'date closed', granted: 'amount granted' };
  for (const k of [...REQUIRED, ...WHEN_DUE]) assert.ok(std.includes(word[k] ?? k), `STD-046 does not name \`${k}\``);
  const mould = parseFM(readFileSync(path.join(ROOT, 'machine/templates/GRA-TEMPLATE.md'), 'utf8'));
  for (const k of REQUIRED) assert.ok(k in mould, `the mould lacks \`${k}\``);
  for (const k of Object.keys(mould)) assert.ok([...REQUIRED, ...COMMON, 'next_action', 'next_date'].includes(k), `the mould carries \`${k}\`, which the tool refuses`);
});

check('the fixtures conform, and the report carries every section', (d) => {
  const r = run(d);
  assert.equal(r.code, 0, r.err);
  for (const h of ['## By stage', '## By chance', '## Needs a move', '## Calendar', '## Every call']) assert.ok(r.out.includes(h), h);
  assert.match(r.out, /GRA-2026-002\*\* overdue since 2026-10-01/);
  assert.match(r.out, /2026-12-15 \(est\.\) \| GRA-2026-002 .* \| 100 % in advance/);
  assert.match(r.out, /25,000 EUR paid/);
});

check('--json: the calendar holds open calls only, ranked by chance in the list', (d) => {
  const f = JSON.parse(run(d, '--json').out);
  assert.deepEqual(f.calendar.map((c) => c.id), ['GRA-2026-002']);
  assert.deepEqual(f.list.map((x) => x.id), ['GRA-2026-001', 'GRA-2026-002', 'GRA-2026-003']);
  assert.equal(f.inReach, 40000);
  assert.deepEqual(f.list[2].failed, ['Track record']);
});

check('GRA-003: a stage, an instrument or a chance outside the register fails', (d) => {
  edit(d, 'GRA-2026-002.md', (t) => t.replace('state: "foreseen"', 'state: "hoped"').replace('instrument: "grant"', 'instrument: "gift"'));
  const e = run(d).err;
  assert.match(e, /GRA-003.*state "hoped"/); assert.match(e, /GRA-003.*instrument "gift"/);
});

check('GRA-003: a declined record needs a reason from the list', (d) => {
  edit(d, 'GRA-2026-003.md', (t) => t.replace('reason: "not-eligible"', 'reason: "bored"'));
  assert.match(run(d).err, /GRA-003.*declined with reason "bored"/);
});

check('GRA-002: paid in advance must say which share', (d) => {
  edit(d, 'GRA-2026-002.md', (t) => t.replace('advance: 100', 'advance: 0'));
  assert.match(run(d).err, /GRA-002.*payment in advance with no share/);
});

check('GRA-002: a granted record says how much', (d) => {
  edit(d, 'GRA-2026-001.md', (t) => t.replace(/^granted: .*\n/m, ''));
  assert.match(run(d).err, /GRA-002.*paid with no amount granted/);
});

check('GRA-002: an unknown header field is refused', (d) => {
  edit(d, 'GRA-2026-002.md', (t) => t.replace('funder:', 'contact_name: "someone"\nfunder:'));
  assert.match(run(d).err, /GRA-002.*`contact_name`/);
});

check('GRA-004: an open record with no next date fails', (d) => {
  edit(d, 'GRA-2026-002.md', (t) => t.replace(/^next_date: .*\n/m, ''));
  assert.match(run(d).err, /GRA-004.*no next date/);
});

check('GRA-005: the header and the last transition agree', (d) => {
  edit(d, 'GRA-2026-002.md', (t) => t.replace('state: "foreseen"', 'state: "open"').replace('estimated: "yes"', 'estimated: "no"'));
  assert.match(run(d).err, /GRA-005.*last transition goes to "foreseen"/);
});

check('GRA-006: no criteria table, no record', (d) => {
  edit(d, 'GRA-2026-002.md', (t) => t.replace('## Criteria', '## Conditions'));
  assert.match(run(d).err, /GRA-006.*no criteria table/);
});

check('GRA-006: each condition says yes, no or check', (d) => {
  edit(d, 'GRA-2026-002.md', (t) => t.replace('| not set aside | check |', '| not set aside | maybe |'));
  assert.match(run(d).err, /GRA-006.*"Own contribution" says "maybe"/);
});

check('GRA-007: a check keeps the chance below high; a no below medium; none names a no', (d) => {
  edit(d, 'GRA-2026-002.md', (t) => t.replace('chance: "medium"', 'chance: "high"'));
  assert.match(run(d).err, /GRA-007.*still to check but the chance says "high"/);
  edit(d, 'GRA-2026-002.md', (t) => t.replace('chance: "high"', 'chance: "none"'));
  assert.match(run(d).err, /GRA-007.*chance "none" but no criterion says no/);
  edit(d, 'GRA-2026-003.md', (t) => t.replace('chance: "none"', 'chance: "medium"'));
  assert.match(run(d).err, /GRA-007.*a criterion fails but the chance says "medium"/);
});

check('GRA-008: an e-mail in a record is refused; a gazette id is not a phone', (d) => {
  edit(d, 'GRA-2026-002.md', (t) => t + '\nThe extract is BOE-B-2026-10741.\n');
  assert.equal(run(d).code, 0, run(d).err);
  edit(d, 'GRA-2026-002.md', (t) => t + '\nWrite to grants@example.org.\n');
  assert.match(run(d).err, /GRA-008.*e-mail/);
});

check('GRA-002: an open call\'s days are read, not estimated', (d) => {
  edit(d, 'GRA-2026-002.md', (t) => t.replace('state: "foreseen"', 'state: "open"').replace('| 2026-09-30 | — | foreseen | ursa | the funder\'s plan of subsidies |', '| 2026-09-30 | — | foreseen | ursa | the plan |\n| 2026-11-15 | foreseen | open | ursa | the extract |'));
  assert.match(run(d).err, /GRA-002.*days are still estimated/);
});

test('no folder: usage and exit 2', () => {
  const r = spawnSync('node', [TOOL], { encoding: 'utf8' });
  assert.equal(r.status, 2); assert.match(r.stderr, /usage:/);
});

#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// pipeline.test.mjs — the pipeline tool, proven.
//
// Each test drives the real script against a scratch copy of the fixtures and
// reads its verdict: the exit code and what it names. The register it reads
// is the real STD-038 in this tree, so a stage renamed there without the
// fixtures following is caught here, not in a consumer's CI.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync, renameSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegister, parseFM, figures, readFolder } from '../pipeline.mjs';

const KIT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.resolve(KIT, '..', '..', '..');
const TOOL = path.join(KIT, 'pipeline.mjs');
const TODAY = '2026-10-15';

function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'pipeline-'));
  cpSync(path.join(KIT, 'fixtures'), dir, { recursive: true });
  return dir;
}
function run(dir, ...extra) {
  const r = spawnSync('node', [TOOL, dir, '--today', TODAY, ...extra], { encoding: 'utf8' });
  return { code: r.status, out: r.stdout, err: r.stderr };
}
function edit(dir, file, fn) {
  const p = path.join(dir, file);
  writeFileSync(p, fn(readFileSync(p, 'utf8')));
}
/* A test that owns its scratch dir and removes it whatever happens. */
function check(name, fn) {
  test(name, () => { const dir = scratch(); try { fn(dir); } finally { rmSync(dir, { recursive: true, force: true }); } });
}

/* ---- the register is the one source ---- */

test('the register is read from STD-038: seven stages, two closed, eight reasons', () => {
  const reg = loadRegister();
  assert.deepEqual(reg.order, ['lead', 'qualified', 'analysed', 'proposed', 'agreed', 'won', 'lost']);
  assert.deepEqual(reg.closed, ['won', 'lost']);
  assert.equal(reg.reasons.length, 8);
  assert.ok(reg.reasons.includes('not-a-fit') && reg.reasons.includes('we-declined'));
  assert.equal(reg.staleDays.qualified, 30);
});

test('STD-039 and the tool agree on the fields of the record', () => {
  // The standard's second rule lists the header fields in prose; the tool's
  // REQUIRED list must not drift from it. Read the mould, which is the
  // standard made concrete, and compare.
  const mould = parseFM(readFileSync(path.join(KIT, 'OPPORTUNITY.md'), 'utf8'));
  const std = readFileSync(path.join(ROOT, 'standards/STD-039-an-opportunity-has-a-record.md'), 'utf8').replace(/\s+/g, ' ');
  for (const k of Object.keys(mould)) {
    const word = { contact_role: "contact's role", contact_channel: 'contact channel', decider_role: "decider's role", next_action: 'next action', next_date: 'next date', id: 'identifier', value: 'value without tax', proposal: "proposal's path", agreement: "agreement's path", opened: 'opened', closed: 'closed', state: 'stage', reason: 'reason', license: 'licence' }[k] ?? k;
    assert.ok(std.includes(word), `STD-039 does not name the field \`${k}\` (looked for "${word}")`);
  }
});

/* ---- a clean folder passes and reports ---- */

check('the fixtures conform, and the report carries every section', (dir) => {
  const r = run(dir, '--proposals');
  assert.equal(r.code, 0, r.err);
  for (const h of ['## By stage', '## Needs a move', '## Time per stage', '## Funnel', '## Won and lost', '## By organisation'])
    assert.ok(r.out.includes(h), `report lacks ${h}`);
  assert.doesNotMatch(r.out, /Personal data/, 'nothing personal is in a public record, so nothing is due for erasure');
  assert.match(r.out, /Won 1 · lost 1 · win rate 50 %/);
  assert.match(r.out, /OPP-2026-002\*\* overdue since 2026-10-01/);
  assert.match(r.out, /OPP-2026-003\*\* stale: 48 days in `qualified` \(limit 30\)/);
});

check('--json prints the same figures as data', (dir) => {
  const r = run(dir, '--json');
  assert.equal(r.code, 0, r.err);
  const fig = JSON.parse(r.out);
  assert.equal(fig.records, 4);
  assert.equal(fig.byStage.won.value, 18000);
  assert.equal(fig.winRate, 50);
  assert.equal(fig.funnel[0].reached, 4);
});

test('time per stage comes from the transitions, not from the header dates', () => {
  const reg = loadRegister();
  const fig = figures(readFolder(path.join(KIT, 'fixtures')), reg, TODAY);
  // OPP-001: lead 06-02 → qualified 06-10 = 8; OPP-002: 07-15 → 07-29 = 14;
  // OPP-003: 08-25 → 08-28 = 3; OPP-004: 08-01 → lost 09-15 = 45. Average 18.
  assert.equal(fig.timePerStage.lead, 18);
  assert.equal(fig.cycleDays, 100); // OPP-001: 2026-06-02 → 2026-09-10
});

/* ---- each rule bites ---- */

check('OPP-003: a stage the register does not know fails', (dir) => {
  edit(dir, 'OPP-2026-003.md', (t) => t.replace('state: "qualified"', 'state: "negotiating"'));
  const r = run(dir);
  assert.equal(r.code, 1);
  assert.match(r.err, /OPP-003.*state "negotiating" is not a stage of the register/);
});

check('OPP-003: a lost record needs a reason from the list', (dir) => {
  edit(dir, 'OPP-2026-004.md', (t) => t.replace('reason: "not-a-fit"', 'reason: "bad luck"'));
  assert.match(run(dir).err, /OPP-003.*reason "bad luck"/);
});

check('OPP-004: an open record with no next date fails', (dir) => {
  edit(dir, 'OPP-2026-002.md', (t) => t.replace('next_date: "2026-10-01"', 'next_date: ""'));
  assert.match(run(dir).err, /OPP-004.*no next date/);
});

check('OPP-005: the header and the last transition must agree', (dir) => {
  edit(dir, 'OPP-2026-002.md', (t) => t.replace('state: "proposed"', 'state: "agreed"'));
  assert.match(run(dir).err, /OPP-005.*last transition goes to "proposed", the header says "agreed"/);
});

check('OPP-005: a record with no transitions fails', (dir) => {
  edit(dir, 'OPP-2026-003.md', (t) => t.replace(/## Transitions[\s\S]*?## Notes/, '## Notes'));
  assert.match(run(dir).err, /OPP-005.*no transitions table/);
});

check('OPP-006: a name in the header is refused', (dir) => {
  edit(dir, 'OPP-2026-002.md', (t) => t.replace('contact_role:', 'contact_name: "Someone Real"\ncontact_role:'));
  assert.match(run(dir).err, /OPP-006.*header carries `contact_name`/);
});

check('OPP-006: an e-mail address anywhere in a record is refused — the record is public', (dir) => {
  edit(dir, 'OPP-2026-002.md', (t) => t.replace('First follow-up 2026-09-16, no answer.', 'First follow-up to head.training@example.org, no answer.'));
  assert.match(run(dir).err, /OPP-006.*e-mail address/);
});

check('OPP-006: a phone number in the body is refused', (dir) => {
  edit(dir, 'OPP-2026-003.md', (t) => t.replace('Stale on purpose', 'Call +34 612 345 678. Stale on purpose'));
  assert.match(run(dir).err, /OPP-006.*phone number/);
});

check('OPP-011: an organisation named before agreed is reported; the won one may be named', (dir) => {
  edit(dir, 'OPP-2026-002.md', (t) => t.replace('organisation: "a provincial police force"', 'organisation: "Provincial Forensic Unit"'));
  assert.match(run(dir).err, /OPP-011.*"Provincial Forensic Unit" reads as a name/);
});

check('OPP-011: the won record keeps its name without a finding', (dir) => {
  const r = run(dir);
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Meridian Outfitters/);
});

check('OPP-002: a missing field is named', (dir) => {
  edit(dir, 'OPP-2026-001.md', (t) => t.replace(/^sector: .*\n/m, ''));
  assert.match(run(dir).err, /OPP-002.*header lacks `sector`/);
});

check('OPP-001: the file is named by its id', (dir) => {
  renameSync(path.join(dir, 'OPP-2026-003.md'), path.join(dir, 'OPP-2026-099.md'));
  assert.match(run(dir).err, /OPP-001.*file is named "OPP-2026-099.md", its id is "OPP-2026-003"/);
});

check('OPP-010: won without an agreement path fails', (dir) => {
  edit(dir, 'OPP-2026-001.md', (t) => t.replace('agreement: "agreements/meridian-2026.pdf"', 'agreement: ""'));
  assert.match(run(dir).err, /OPP-010.*won with no agreement path/);
});

/* ---- proposals ---- */

check('PRP-009: a proposed record whose proposal is missing fails under --proposals', (dir) => {
  rmSync(path.join(dir, 'PRP-2026-002.md'));
  assert.equal(run(dir).code, 0, 'without --proposals the record alone is fine');
  assert.match(run(dir, '--proposals').err, /PRP-009.*proposal "PRP-2026-002.md" not found/);
});

check('PRP-003: a proposal must name one of the four levels', (dir) => {
  edit(dir, 'PRP-2026-002.md', (t) => t.replace('level: "learning"', 'level: "vibes"'));
  assert.match(run(dir, '--proposals').err, /PRP-003.*level "vibes"/);
});

check('PRP-006: the three questions still holding the mould\'s ellipsis fail', (dir) => {
  edit(dir, 'PRP-2026-002.md', (t) => t.replace('Section 4.', '…'));
  assert.match(run(dir, '--proposals').err, /PRP-006.*ellipsis/);
});

check('PRP-007: a record at proposed whose transition names nobody in By fails', (dir) => {
  edit(dir, 'OPP-2026-002.md', (t) => t.replace('| 2026-09-02 | analysed | proposed | Oracle | PRP-2026-002 sent |', '| 2026-09-02 | analysed | proposed |  | PRP-2026-002 sent |'));
  assert.match(run(dir).err, /PRP-007.*names nobody in By/);
});

check('OPP-003: the decider\'s role is required from agreed, not before', (dir) => {
  edit(dir, 'OPP-2026-003.md', (t) => t.replace('decider_role: "people director"', 'decider_role: ""'));
  assert.equal(run(dir).code, 0, 'a qualified record may not yet know who signs');
  edit(dir, 'OPP-2026-001.md', (t) => t.replace('decider_role: "people director"', 'decider_role: ""'));
  assert.match(run(dir).err, /OPP-003.*won with no decider role/);
});

check('PRP-004: a proposal without a tax rate fails', (dir) => {
  edit(dir, 'PRP-2026-001.md', (t) => t.replace(/^tax_rate: .*\n/m, ''));
  assert.match(run(dir, '--proposals').err, /PRP-004.*no tax rate/);
});

/* ---- usage ---- */

test('no folder: usage and exit 2', () => {
  const r = spawnSync('node', [TOOL], { encoding: 'utf8' });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /usage:/);
});

#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// pipeline.test.mjs — the pipeline tool, proven.
//
// Each test drives the real script against a scratch copy of the fixtures and
// reads its verdict: the exit code and what it names, plate first. The
// register and the card it reads are the kit's own fixtures (fixtures/
// register.md, fixtures/card.md), so the kit is proven on its own; one test
// at the end also runs it on the archive's real records when the real
// register is present.
//
// Run: node --test machine/packages/sales-kit/test/   (or npm test)

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync, renameSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  loadRegister, loadCard, parseFM, timelineOf, criteriaOf, figures, readFolder, validate, outOfDomain,
  COMMON, REQUIRED, WHEN_DUE, DEFAULT_REGISTER,
} from '../pipeline.mjs';

const KIT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.resolve(KIT, '..', '..', '..');
const TOOL = path.join(KIT, 'pipeline.mjs');
const FIX = path.join(KIT, 'fixtures');
const REGISTER = path.join(FIX, 'register.md');
const CARD = path.join(FIX, 'card.md');
const TODAY = '2099-10-15';

/* The scratch dir holds the records only; register and card are read in place. */
function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'pipeline-'));
  cpSync(FIX, dir, { recursive: true, filter: (src) => !/broken|register\.md$|card\.md$/.test(path.relative(FIX, src)) });
  return dir;
}
function run(dir, ...extra) {
  const r = spawnSync('node', [TOOL, dir, '--today', TODAY, '--register', REGISTER, '--card', CARD, ...extra], { encoding: 'utf8' });
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
const json = (dir) => { const r = run(dir, '--json'); assert.equal(r.code, 0, r.err); return JSON.parse(r.out); };

/* ---- the register and the card are the one source ---- */

test('the register is read by heading: five kinds with their stages, seven events, five steps, every closed list', () => {
  const reg = loadRegister(REGISTER);
  assert.deepEqual(reg.kinds.map((k) => k.kind), ['sale', 'tender', 'grant', 'collaboration', 'partner']);
  assert.deepEqual(reg.stages.sale, ['lead', 'qualified', 'analysed', 'proposed', 'agreed', 'won', 'lost']);
  assert.deepEqual(reg.stages.tender, ['found', 'read', 'bidding', 'filed', 'awarded', 'won', 'lost']);
  assert.deepEqual(reg.stages.grant, ['foreseen', 'open', 'applied', 'granted', 'justified', 'won', 'lost']);
  assert.deepEqual(reg.stages.collaboration, ['lead', 'agreed', 'won', 'lost']);
  assert.deepEqual(reg.stages.partner, ['lead', 'talking', 'agreed', 'filed', 'won', 'lost']);
  assert.deepEqual(reg.kinds.map((k) => k.stale), [21, null, null, 30, 21]);
  assert.deepEqual(reg.events.map((e) => e.event), ['found', 'out', 'pos', 'neg', 'won', 'lost', 'next']);
  assert.deepEqual(reg.events.map((e) => e.step), ['detected', 'contacted', 'positive', null, 'won', null, null]);
  assert.deepEqual(reg.steps.map((s) => s.step), ['detected', 'contacted', 'positive', 'won', 'again']);
  assert.equal(reg.reasons.length, 12);
  assert.ok(['outbid', 'not-eligible', 'no-cash'].every((r) => reg.reasons.includes(r)));
  assert.deepEqual(reg.pays, ['advance', 'milestones', 'on-delivery', 'on-justification', 'in-kind', 'to-ask']);
  assert.deepEqual(reg.instruments, ['grant', 'loan', 'prize', 'programme']);
  assert.deepEqual(reg.sources, ['referral', 'inbound', 'outbound', 'event', 'platform']);
  assert.deepEqual(reg.procedures, ['minor', 'simplified-abridged', 'simplified', 'open']);
  assert.deepEqual(reg.readFrom, ['terms', 'notice']);
  assert.deepEqual(reg.objects, ['build', 'deliver']);
  assert.deepEqual(reg.chances, ['high', 'medium']);
});

test('a register that lacks a table the tool needs stops it: exit 2, the table named', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'pipeline-reg-'));
  try {
    const bad = path.join(dir, 'register.md');
    writeFileSync(bad, readFileSync(REGISTER, 'utf8').replace('## The events', '## Events, renamed'));
    const r = spawnSync('node', [TOOL, FIX, '--register', bad, '--card', CARD], { encoding: 'utf8' });
    assert.equal(r.status, 2);
    assert.match(r.stderr, /lacks: .*event `found`/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('the card is read by heading, numbered or not: requirements, the turnover ceiling, what the house does not make', () => {
  const card = loadCard(CARD);
  assert.equal(card.turnoverCeiling, 50000);
  assert.deepEqual(card.requirements.map((q) => q.requirement).slice(0, 4), ['Turnover', 'Team', 'Payment', "Bidders' register"]);
  assert.deepEqual(card.requirements.map((q) => q.state).slice(0, 3), ['check', 'no', 'no']);
  assert.equal(outOfDomain('Contrato de hinchables para fiestas', card).why, 'inflatables and attractions');
  assert.equal(outOfDomain('Un mundo virtual', card), null);
  assert.deepEqual(loadCard(path.join(FIX, 'no-such-card.md')), { requirements: [], turnoverCeiling: null, outOfDomain: [] }, 'a missing default card reads as empty');
});

test('the card marks what decides most calls: each row carries its place in that list, or null', () => {
  const card = loadCard(CARD);
  assert.deepEqual(card.requirements.map((q) => [q.requirement, q.decides]), [
    ['Turnover', 2], ['Team', 1], ['Payment', null], ["Bidders' register", null], ['Size', null], ['Seat', null], ['Tax and Social Security', 3],
  ], 'the order is the list\'s, the rows stay in the card\'s');
});

test('a deciding requirement the card does not hold stops the tool: exit 2, the name given', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'pipeline-card-'));
  try {
    const bad = path.join(dir, 'card.md');
    writeFileSync(bad, readFileSync(CARD, 'utf8').replace('| Turnover |\n| Tax', '| Luck |\n| Tax'));
    assert.throws(() => loadCard(bad), /What decides most calls.*"Luck"/);
    const r = spawnSync('node', [TOOL, FIX, '--register', REGISTER, '--card', bad], { encoding: 'utf8' });
    assert.equal(r.status, 2);
    assert.match(r.stderr, /"Luck", which is not a requirement of the card/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('a card named on the command line must exist: exit 2', () => {
  const r = spawnSync('node', [TOOL, FIX, '--register', REGISTER, '--card', path.join(FIX, 'nope.md')], { encoding: 'utf8' });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /card not found/);
});

test('the header every document carries is the one the archive registers', () => {
  // The kit keeps its own copy so it runs outside this repository; the copy
  // must not drift from STD-004's rings (machine/scripts/lib/rings.mjs).
  const rings = readFileSync(path.join(ROOT, 'machine/scripts/lib/rings.mjs'), 'utf8');
  const list = (name) => [...rings.slice(rings.indexOf(`export const ${name}`)).split(';')[0].matchAll(/'([a-z_]+)'/g)].map((m) => m[1]);
  const archive = [...list('RING1'), ...list('RING2'), ...list('RING3_ALL')].filter((k) => !['id', 'license'].includes(k));
  assert.deepEqual([...COMMON].sort(), [...new Set(archive)].sort());
});

test('the record\'s own fields are exactly the ones the opportunities ring registers', () => {
  // A field the tool accepts but the header guard refuses (or the reverse)
  // fails one of the two gates on the first real record that uses it.
  const rings = readFileSync(path.join(ROOT, 'machine/scripts/lib/rings.mjs'), 'utf8');
  const at = rings.indexOf("'opportunities': [");
  const ring = [...rings.slice(at, rings.indexOf('],', at)).matchAll(/'([a-z_]+)'/g)].map((m) => m[1]).filter((k) => k !== 'opportunities');
  const own = [...REQUIRED, ...WHEN_DUE].filter((k) => !['id', 'license'].includes(k));
  const proposal = ['opportunity', 'date', 'valid_until', 'level', 'price', 'tax_rate'];
  assert.deepEqual([...new Set(ring)].sort(), [...new Set([...own, ...proposal])].sort());
});

test('the mould names every field of the record, each with a comment', () => {
  const mould = readFileSync(path.join(ROOT, 'machine/templates/OPP-TEMPLATE.md'), 'utf8');
  const fm = mould.match(/^---\n([\s\S]*?)\n---/)[1];
  for (const k of [...REQUIRED, ...WHEN_DUE]) assert.match(fm, new RegExp(`^#? ?${k}:`, 'm'), `the mould does not show \`${k}\``);
  assert.match(mould, /^## Timeline$/m);
  assert.doesNotMatch(fm, /^(state|next_action|next_date|closed|reason|chance):/m, 'the mould types nothing the tool computes');
});

/* ---- the timeline grammar ---- */

test('timelineOf reads date · event · text, a backticked stage, a lost line\'s reason', () => {
  const t = timelineOf('---\nid: x\n---\n## Timeline\n\n- 2099-01-01 · found · seen\n- 2099-01-02 · out · `qualified` it fits · and more\n- 2099-01-03 · lost · price · too dear\nnot a line\n\n## Notes\n- 2099-02-01 · out · ignored: not under Timeline\n');
  assert.deepEqual(t, [
    { date: '2099-01-01', event: 'found', stage: null, reason: null, text: 'seen' },
    { date: '2099-01-02', event: 'out', stage: 'qualified', reason: null, text: 'it fits · and more' },
    { date: '2099-01-03', event: 'lost', stage: 'lost', reason: 'price', text: 'too dear' },
  ]);
  assert.equal(timelineOf('---\nid: x\n---\n# no timeline\n'), null);
});

test('criteriaOf reads the requirement and the verdict; parseFM drops empty values', () => {
  const c = criteriaOf(readFileSync(path.join(FIX, 'OPP-2099-004.md'), 'utf8'));
  assert.deepEqual(c.map((x) => [x.requirement, x.meets]), [['Size', 'yes'], ['Seat', 'yes'], ['Tax and Social Security', 'check']]);
  assert.deepEqual(parseFM('---\na: "x"\nb: ""\nc: 3 # note\n---\n'), { a: 'x', c: '3' });
});

/* ---- a clean folder passes and reports ---- */

check('the fixtures conform — one record of every kind — and the report carries every section', (dir) => {
  const r = run(dir, '--proposals');
  assert.equal(r.code, 0, r.err);
  for (const h of ['## By kind', "## What's due", '## Needs a move', '## Every record', '## Funnel', '## Reasons lost', '## Days per stage', '## Asked, and what the house holds'])
    assert.ok(r.out.includes(h), `report lacks ${h}`);
  assert.match(r.out, /OPP-2099-002\*\* overdue since 2099-10-01/);
  assert.match(r.out, /OPP-2099-006\*\* stale: 51 days since the last line, at `talking` \(limit 21\)/);
  assert.doesNotMatch(r.out, /OPP-2099-00[34]\*\* stale/, 'a tender and a grant run on the other side\'s clock: never stale');
});

check('--json is the figures\' contract: its keys, records sorted by id, stages and steps computed', (dir) => {
  const f = json(dir);
  assert.deepEqual(Object.keys(f), ['today', 'kinds', 'steps', 'records', 'due', 'funnel', 'byKind', 'reasons', 'daysPerStage', 'card', 'ceiling', 'overdue', 'stale']);
  assert.deepEqual(Object.keys(f.records[0]), ['id', 'kind', 'title', 'organisation', 'sector', 'source', 'offer', 'value', 'currency', 'pays', 'advance',
    'stage', 'open', 'opened', 'closed', 'reason', 'next', 'overdue', 'stale', 'events', 'steps', 'chance', 'criteria',
    'call', 'closes', 'opens', 'estimated', 'procedure', 'instrument', 'file_ref', 'gives_back', 'follows']);
  assert.deepEqual(f.records.map((x) => [x.id, x.kind, x.stage, x.open]), [
    ['OPP-2099-001', 'sale', 'won', false], ['OPP-2099-002', 'sale', 'proposed', true], ['OPP-2099-003', 'tender', 'filed', true],
    ['OPP-2099-004', 'grant', 'applied', true], ['OPP-2099-005', 'collaboration', 'won', false], ['OPP-2099-006', 'partner', 'talking', true],
    ['OPP-2099-007', 'sale', 'lost', false]]);
  const by = Object.fromEntries(f.records.map((x) => [x.id, x]));
  assert.deepEqual(by['OPP-2099-002'].next, { date: '2099-10-01', action: 'ask whether the proposal was read' });
  assert.equal(by['OPP-2099-001'].closed, '2099-09-10');
  assert.equal(by['OPP-2099-001'].next, null);
  assert.equal(by['OPP-2099-007'].reason, 'price');
  assert.equal(by['OPP-2099-001'].advance, 30);
  assert.equal(by['OPP-2099-003'].chance, 'high', 'every requirement yes');
  assert.equal(by['OPP-2099-004'].chance, 'medium', 'one requirement still to check');
  assert.equal(by['OPP-2099-002'].chance, null, 'a sale has no chance');
  assert.deepEqual(f.overdue, ['OPP-2099-002']);
  assert.deepEqual(f.stale, [{ id: 'OPP-2099-002', days: 43, limit: 21 }, { id: 'OPP-2099-006', days: 51, limit: 21 }]);
  assert.deepEqual(f.due.map((d) => d.id), ['OPP-2099-002', 'OPP-2099-006', 'OPP-2099-003', 'OPP-2099-004'], 'open records\' next, by date');
});

check('the funnel: five steps, a later step implies the earlier, `again` comes from another record\'s follows', (dir) => {
  const f = json(dir);
  const by = Object.fromEntries(f.records.map((x) => [x.id, x.steps]));
  assert.deepEqual(by['OPP-2099-001'], { detected: true, contacted: true, positive: true, won: true, again: true }, 'OPP-2099-005 follows it');
  assert.deepEqual(by['OPP-2099-007'], { detected: true, contacted: true, positive: false, won: false, again: false }, 'a `neg` marks no step');
  assert.deepEqual(by['OPP-2099-003'], { detected: true, contacted: true, positive: false, won: false, again: false });
  assert.deepEqual(f.funnel.all.counts, [7, 7, 3, 2, 1]);
  assert.deepEqual(f.funnel.sale.counts, [3, 3, 1, 1, 1]);
  assert.deepEqual(f.funnel.tender.counts, [1, 1, 0, 0, 0]);
});

check('the funnel carries, per kind, each step\'s share of the step before — null when that step is empty', (dir) => {
  const f = json(dir);
  assert.deepEqual(Object.keys(f.funnel), ['all', 'sale', 'tender', 'grant', 'collaboration', 'partner']);
  for (const v of Object.values(f.funnel)) assert.deepEqual(Object.keys(v), ['counts', 'conversion']);
  // all: 7 → 7 → 3 → 2 → 1 : 100 %, 43 %, 67 %, 50 %
  assert.deepEqual(f.funnel.all.conversion, [null, 100, 43, 67, 50], 'the first step has no step before it');
  assert.deepEqual(f.funnel.tender.conversion, [null, 100, 0, null, null], 'after an empty step there is nothing to carry');
});

check('by kind, reasons, days per stage, the card with how many open records hinge on each row', (dir) => {
  const f = json(dir);
  assert.deepEqual(f.byKind.sale, { records: 3, open: 1, won: 1, lost: 1, openValue: 24000 });
  assert.deepEqual(f.byKind.grant, { records: 1, open: 1, won: 0, lost: 0, openValue: 40000 });
  assert.deepEqual(f.reasons, { price: 1 });
  // sale lead: OPP-001 06-02→06-10 = 8; OPP-002 07-15→07-29 = 14; OPP-007 08-01→lost 09-15 = 45 → 22
  assert.equal(f.daysPerStage.sale.lead, 22);
  assert.equal(f.daysPerStage.sale.agreed, 21, 'OPP-001: agreed 08-20 → won 09-10');
  assert.equal(f.daysPerStage.tender.filed, null, 'a stage still running is not counted');
  assert.equal(f.ceiling, 50000);
  const tax = f.card.find((c) => c.requirement === 'Tax and Social Security');
  assert.deepEqual([tax.state, tax.yes, tax.check], ['check', 1, 1], 'the open tender at yes, the open grant at check');
  assert.deepEqual(Object.keys(f.card[0]), ['requirement', 'asks', 'house', 'state', 'unlocks', 'decides', 'yes', 'check']);
  assert.equal(f.card.length, 7, 'figures.card keeps every row of the card');
  assert.deepEqual(f.card.filter((c) => c.decides).sort((a, b) => a.decides - b.decides).map((c) => c.requirement), ['Team', 'Turnover', 'Tax and Social Security']);
});

check('the report shows the funnel\'s conversion and marks the deciding rows', (dir) => {
  const r = run(dir);
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /\| \*\*all\*\* \| 7 \| 7 \(100 %\) \| 3 \(43 %\) \| 2 \(67 %\) \| 1 \(50 %\) \|/);
  assert.match(r.out, /\| Team \| .* \| 1 \|$/m);
});

test('figures() read in-process match the CLI\'s', () => {
  const reg = loadRegister(REGISTER), card = loadCard(CARD);
  const f = figures(readFolder(FIX), reg, card, TODAY);
  assert.equal(f.records.length, 7, 'proposals, the register, the card and broken/ are not records');
  assert.equal(f.records.every((x) => !('_entered' in x)), true);
});

/* ---- each rule bites ---- */

test('the broken fixtures each break what they say', () => {
  const r = spawnSync('node', [TOOL, path.join(FIX, 'broken'), '--today', TODAY, '--register', REGISTER, '--card', CARD], { encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /OPP-013 .*OPP-2099-101.*"Turnover" is not met — a call that fails a requirement is not recorded — take what it taught to the card \(OPS-018\) and delete the record/);
  assert.match(r.stderr, /OPP-014 .*OPP-2099-101.*turnover asked 450,000 € is above the card's 50,000 €/);
  assert.match(r.stderr, /OPP-009 .*OPP-2099-102.*header carries `state`/);
  assert.match(r.stderr, /OPP-009 .*OPP-2099-102.*header carries `next_date`/);
  assert.match(r.stderr, /OPP-003 .*OPP-2099-102.*stages only move forward/);
  assert.match(r.stderr, /OPP-004 .*OPP-2099-102.*2 `next` lines/);
  assert.match(r.stderr, /OPP-011 .*OPP-2099-103.*"Northwind Traders" reads as a name in a lost record/);
  assert.match(r.stderr, /OPP-003 .*OPP-2099-103.*reason "bad-luck"/);
  assert.match(r.stderr, /OPP-006 .*OPP-2099-103.*phone number/);
});

check('OPP-001: the file is named by its id', (dir) => {
  renameSync(path.join(dir, 'OPP-2099-007.md'), path.join(dir, 'OPP-2099-099.md'));
  assert.match(run(dir).err, /OPP-001.*file is named "OPP-2099-099.md", its id is "OPP-2099-007"/);
});

check('OPP-002: a missing field is named; a sale or a tender names its offer', (dir) => {
  edit(dir, 'OPP-2099-007.md', (t) => t.replace(/^sector: .*\n/m, '').replace(/^offer: .*\n/m, ''));
  const e = run(dir).err;
  assert.match(e, /OPP-002.*header lacks `sector`/);
  assert.match(e, /OPP-002.*a sale with no `offer`/);
});

check('OPP-002: pays from the register; advance or milestones carry the share paid first', (dir) => {
  edit(dir, 'OPP-2099-007.md', (t) => t.replace('pays: "to-ask"', 'pays: "whenever"'));
  assert.match(run(dir).err, /OPP-002.*pays "whenever" is not one of advance · milestones/);
  edit(dir, 'OPP-2099-007.md', (t) => t.replace('pays: "whenever"', 'pays: "milestones"'));
  assert.match(run(dir).err, /OPP-002.*paid by milestones with no `advance`/);
  edit(dir, 'OPP-2099-007.md', (t) => t.replace('pays: "milestones"', 'pays: "milestones"\nadvance: 140'));
  assert.match(run(dir).err, /OPP-002.*advance "140" is a share of the value: 0 to 100/);
});

check('OPP-002: a source outside the register, a renamed field', (dir) => {
  edit(dir, 'OPP-2099-007.md', (t) => t.replace('source: "outbound"', 'source: "tender"'));
  assert.match(run(dir).err, /OPP-002.*source "tender" is not one of referral · inbound · outbound · event · platform/);
  edit(dir, 'OPP-2099-004.md', (t) => t.replace('pays: "advance"', 'pays: "advance"\nfunder: "the ministry"'));
  assert.match(run(dir).err, /OPP-002.*header carries `funder` — the funder is the `organisation`/);
});

check('OPP-002: a sale that reached proposed has its proposal path, and `follows` names a record that exists', (dir) => {
  edit(dir, 'OPP-2099-002.md', (t) => t.replace(/^proposal: .*\n/m, ''));
  assert.match(run(dir).err, /OPP-002.*reached `proposed` with no `proposal` path/);
  edit(dir, 'OPP-2099-005.md', (t) => t.replace('follows: "OPP-2099-001"', 'follows: "OPP-2099-900"'));
  assert.match(run(dir).err, /OPP-002.*follows "OPP-2099-900", a record that is not in the folder/);
});

check('OPP-002: gives_back belongs to a collaboration', (dir) => {
  edit(dir, 'OPP-2099-007.md', (t) => t.replace('pays: "to-ask"', 'pays: "to-ask"\ngives_back: "a case"'));
  assert.match(run(dir).err, /OPP-002.*`gives_back` on a sale — it belongs to a collaboration/);
});

check('OPP-003: a kind the register does not know fails', (dir) => {
  edit(dir, 'OPP-2099-007.md', (t) => t.replace('kind: "sale"', 'kind: "donation"'));
  assert.match(run(dir).err, /OPP-003.*kind "donation" is not one of sale · tender · grant · collaboration · partner/);
});

check('OPP-003: a stage that is not of the record\'s kind fails', (dir) => {
  edit(dir, 'OPP-2099-006.md', (t) => t.replace('`talking`', '`proposed`'));
  assert.match(run(dir).err, /OPP-003.*stage `proposed` is not a stage of a partner/);
});

check('OPP-003: a record closes only by a won or lost line, never by a token', (dir) => {
  edit(dir, 'OPP-2099-006.md', (t) => t.replace('`talking`', '`won`'));
  assert.match(run(dir).err, /OPP-003.*stage `won` written as a token/);
});

check('OPP-003: the decider\'s role is due at agreed and won, not before', (dir) => {
  assert.equal(run(dir).code, 0, 'a proposed sale may not yet know who signs');
  edit(dir, 'OPP-2099-001.md', (t) => t.replace(/^decider_role: .*\n/m, ''));
  assert.match(run(dir).err, /OPP-003.*a sale at `won` with no decider role/);
});

check('OPP-004: an open record has exactly one next line, and it is the last', (dir) => {
  edit(dir, 'OPP-2099-006.md', (t) => t.replace(/^- 2099-10-20 · next .*\n/m, ''));
  assert.match(run(dir).err, /OPP-004.*open record with 0 `next` lines/);
});

check('OPP-004: the next line comes after everything that happened', (dir) => {
  edit(dir, 'OPP-2099-006.md', (t) => t.replace('- 2099-10-20 · next · send the one-page offer for the joint bid', '- 2099-10-20 · next · send the one-page offer for the joint bid\n- 2099-10-21 · out · sent early'));
  assert.match(run(dir).err, /OPP-004.*the `next` line is not the last/);
});

check('OPP-004: a closed record plans nothing', (dir) => {
  edit(dir, 'OPP-2099-007.md', (t) => t.replace(/(- 2099-09-15 · lost .*)$/m, '$1\n- 2099-10-01 · next · try again'));
  assert.match(run(dir).err, /OPP-004.*a closed record with a `next` line/);
});

check('OPP-005: no timeline, or not opening with found, fails', (dir) => {
  edit(dir, 'OPP-2099-007.md', (t) => t.replace('## Timeline', '## History'));
  assert.match(run(dir).err, /OPP-005.*no `## Timeline`/);
  edit(dir, 'OPP-2099-006.md', (t) => t.replace('2099-08-20 · found ·', '2099-08-20 · out ·'));
  assert.match(run(dir).err, /OPP-005.*opens with `out`, not `found`/);
});

check('OPP-005: lines in date order, events from the register, the grammar kept', (dir) => {
  edit(dir, 'OPP-2099-007.md', (t) => t.replace('2099-09-01 · neg', '2099-07-01 · neg'));
  assert.match(run(dir).err, /OPP-005.*comes after one of 2099-08-05/);
  edit(dir, 'OPP-2099-006.md', (t) => t.replace('2099-08-25 · pos', '2099-08-25 · maybe'));
  assert.match(run(dir).err, /OPP-005.*timeline event "maybe" is not one of found · out/);
  edit(dir, 'OPP-2099-002.md', (t) => t.replace('- 2099-07-29 · out ·', '- 29 July - out -'));
  assert.match(run(dir).err, /OPP-005.*timeline line "- 29 July - out - .*" is not "- YYYY-MM-DD · event · text"/);
});

check('OPP-005: nothing happens after a record closed', (dir) => {
  edit(dir, 'OPP-2099-007.md', (t) => t.replace(/(- 2099-09-15 · lost .*)$/m, '$1\n- 2099-10-01 · pos · they called back'));
  assert.match(run(dir).err, /OPP-005.*a `pos` line after the record closed on 2099-09-15/);
});

check('OPP-006: a name in the header is refused', (dir) => {
  edit(dir, 'OPP-2099-002.md', (t) => t.replace('contact_role:', 'contact_name: "Someone Real"\ncontact_role:'));
  assert.match(run(dir).err, /OPP-006.*header carries `contact_name`/);
});

check('OPP-006: an e-mail address anywhere in a record is refused — the record is public', (dir) => {
  edit(dir, 'OPP-2099-002.md', (t) => t.replace('First follow-up 2099-09-16, no answer.', 'First follow-up to head.training@example.org, no answer.'));
  assert.match(run(dir).err, /OPP-006.*e-mail address/);
});

check('OPP-006: CPV codes, gazette ids, dates and addresses are not phones; a phone is', (dir) => {
  assert.equal(run(dir).code, 0, 'OPP-2099-003 carries CPV codes, OPP-2099-004 a BOE id');
  edit(dir, 'OPP-2099-003.md', (t) => t.replace('(CPV 72212911-3, 80500000-9)', '(call 912 345 678)'));
  assert.match(run(dir).err, /OPP-006.*phone number/);
});

check('OPP-009: what is computed is never typed — state, next, closed, reason, chance', (dir) => {
  edit(dir, 'OPP-2099-003.md', (t) => t.replace('object: "build"', 'object: "build"\nchance: "high"\nnext_action: "wait"'));
  const e = run(dir).err;
  assert.match(e, /OPP-009.*header carries `chance` — the chance is computed from the criteria table/);
  assert.match(e, /OPP-009.*header carries `next_action`/);
});

check('OPP-010: a sale won with no agreement path fails', (dir) => {
  edit(dir, 'OPP-2099-001.md', (t) => t.replace(/^agreement: .*\n/m, ''));
  assert.match(run(dir).err, /OPP-010.*a sale won with no agreement path/);
});

check('OPP-011: an organisation named before it agreed is refused; with disclosure open it may be named', (dir) => {
  edit(dir, 'OPP-2099-002.md', (t) => t.replace('organisation: "a provincial police force"', 'organisation: "Provincial Forensic Unit"'));
  assert.match(run(dir).err, /OPP-011.*"Provincial Forensic Unit" reads as a name/);
  edit(dir, 'OPP-2099-002.md', (t) => t.replace('organisation: "Provincial Forensic Unit"', 'organisation: "Provincial Forensic Unit"\ndisclosure: "open"'));
  assert.doesNotMatch(run(dir).err, /OPP-011/);
});

check('OPP-011: a public funder or buyer that published its call may be named', (dir) => {
  edit(dir, 'OPP-2099-004.md', (t) => t.replace('organisation: "the Ministry of Culture"', 'organisation: "Ministerio de Cultura"'));
  assert.equal(run(dir).code, 0, run(dir).err);
});

check('OPP-011: a disclosure outside the list is refused', (dir) => {
  edit(dir, 'OPP-2099-007.md', (t) => t.replace(/^(organisation: .*)$/m, '$1\ndisclosure: "maybe"'));
  assert.match(run(dir).err, /OPP-011.*disclosure "maybe"/);
});

check('OPP-012: a tender names its procedure from the register, and links its call except a minor contract', (dir) => {
  edit(dir, 'OPP-2099-003.md', (t) => t.replace('procedure: "simplified-abridged"', 'procedure: "negotiated"'));
  assert.match(run(dir).err, /OPP-012.*procedure "negotiated" is not one of minor · simplified-abridged · simplified · open/);
  edit(dir, 'OPP-2099-003.md', (t) => t.replace('procedure: "negotiated"', 'procedure: "minor"').replace(/^call: .*\n/m, ''));
  assert.equal(run(dir).code, 0, 'a minor contract has no notice to link');
  edit(dir, 'OPP-2099-003.md', (t) => t.replace('procedure: "minor"', 'procedure: "open"'));
  assert.match(run(dir).err, /OPP-012.*a tender with no `call`/);
});

check('OPP-012: a call is an address; it closes on a date', (dir) => {
  edit(dir, 'OPP-2099-004.md', (t) => t.replace(/^call: .*$/m, 'call: "see the gazette"').replace(/^closes: .*\n/m, ''));
  const e = run(dir).err;
  assert.match(e, /OPP-012.*call "see the gazette" is not an address/);
  assert.match(e, /OPP-012.*a grant with no `closes`/);
});

check('OPP-012: a grant names its instrument; its days stop being estimated once the call is out', (dir) => {
  edit(dir, 'OPP-2099-004.md', (t) => t.replace('instrument: "grant"', 'instrument: "gift"').replace('estimated: "no"', 'estimated: "yes"'));
  const e = run(dir).err;
  assert.match(e, /OPP-012.*instrument "gift" is not one of grant · loan · prize · programme/);
  assert.match(e, /OPP-012.*stage `applied` but the days are still estimated/);
});

check('OPP-012: call fields belong to calls — a procedure on a sale fails', (dir) => {
  edit(dir, 'OPP-2099-007.md', (t) => t.replace('pays: "to-ask"', 'pays: "to-ask"\nprocedure: "minor"'));
  assert.match(run(dir).err, /OPP-012.*`procedure` on a sale — it belongs to a tender/);
});

check('OPP-013: a call reads its requirements into a table; no table fails', (dir) => {
  edit(dir, 'OPP-2099-004.md', (t) => t.replace('## Criteria', '## Criteria read later'));
  assert.match(run(dir).err, /OPP-013.*no criteria table/);
});

check('OPP-013: a requirement not met means the call is not recorded', (dir) => {
  edit(dir, 'OPP-2099-004.md', (t) => t.replace('| not yet certified | check |', '| not yet certified | no |'));
  assert.match(run(dir).err, /OPP-013.*"Tax and Social Security" is not met — a call that fails a requirement is not recorded — take what it taught to the card \(OPS-018\) and delete the record/);
});

check('OPP-013: a verdict other than yes or check is refused', (dir) => {
  edit(dir, 'OPP-2099-004.md', (t) => t.replace('| not yet certified | check |', '| not yet certified | probably |'));
  assert.match(run(dir).err, /OPP-013.*says "probably" — meets is one of yes · check/);
});

check('OPP-014: a call says where it was read — an aggregator is never enough', (dir) => {
  edit(dir, 'OPP-2099-003.md', (t) => t.replace('read_from: "terms"', 'read_from: "aggregator"'));
  assert.match(run(dir).err, /OPP-014.*read_from "aggregator" is not one of terms · notice/);
  edit(dir, 'OPP-2099-004.md', (t) => t.replace(/^read_from: .*\n/m, ''));
  assert.match(run(dir).err, /OPP-014.*a grant that does not say where it was read/);
});

check('OPP-014: what the buyer really buys — resale is not recorded', (dir) => {
  edit(dir, 'OPP-2099-003.md', (t) => t.replace('object: "build"', 'object: "resale"'));
  assert.match(run(dir).err, /OPP-014.*object "resale" is not one of build · deliver/);
});

check('OPP-014: a turnover asked above the card\'s ceiling is not recorded', (dir) => {
  edit(dir, 'OPP-2099-003.md', (t) => t.replace('turnover_asked: 30000', 'turnover_asked: 90000'));
  assert.match(run(dir).err, /OPP-014.*turnover asked 90,000 € is above the card's 50,000 €/);
});

check('OPP-015: a tender names its file reference, and one file is one record', (dir) => {
  const t = readFileSync(path.join(dir, 'OPP-2099-003.md'), 'utf8').replace(/OPP-2099-003/g, 'OPP-2099-008');
  writeFileSync(path.join(dir, 'OPP-2099-008.md'), t);
  assert.match(run(dir).err, /OPP-015.*OPP-2099-008 has the same file "PE-2099-17" and value as OPP-2099-003/);
  edit(dir, 'OPP-2099-008.md', (x) => x.replace(/^file_ref: .*\n/m, ''));
  assert.match(run(dir).err, /OPP-015.*a tender with no file reference/);
});

/* ---- proposals (STD-040) ---- */

check('PRP-009: a record whose proposal is missing fails under --proposals', (dir) => {
  rmSync(path.join(dir, 'PRP-2099-002.md'));
  assert.equal(run(dir).code, 0, 'without --proposals the record alone is fine');
  assert.match(run(dir, '--proposals').err, /PRP-009.*proposal "PRP-2099-002.md" not found/);
});

check('PRP-003, PRP-004, PRP-006, PRP-010: the proposal\'s mechanical rows', (dir) => {
  edit(dir, 'PRP-2099-002.md', (t) => t.replace('level: "learning"', 'level: "vibes"').replace(/^tax_rate: .*\n/m, '').replace('Section 4.', '…').replace('## In the open', '## Elsewhere'));
  const e = run(dir, '--proposals').err;
  assert.match(e, /PRP-003.*level "vibes"/);
  assert.match(e, /PRP-004.*no tax rate/);
  assert.match(e, /PRP-006.*ellipsis/);
  assert.match(e, /PRP-010.*In the open/);
});

/* ---- in-process validation names the file ---- */

test('validate() returns plates, never throws, on a record with no frontmatter', () => {
  const reg = loadRegister(REGISTER);
  assert.deepEqual(validate({ file: 'OPP-2099-009.md', text: '# nothing', fm: null }, reg), [{ plate: 'OPP-001', what: 'no frontmatter', file: 'OPP-2099-009.md' }]);
});

/* ---- the archive's own records ---- */

test('the archive\'s records conform, read against the kit\'s register and card', () => {
  const folder = path.join(ROOT, 'opportunities');
  if (!existsSync(folder)) return;
  const r = spawnSync('node', [TOOL, folder, '--register', REGISTER, '--card', CARD, '--today', '2026-10-02', '--proposals', '--json'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  const f = JSON.parse(r.stdout);
  const ids = f.records.map((x) => x.id);
  assert.deepEqual(ids, [...ids].sort(), 'records sorted by id');
  assert.ok(ids.every((id) => !/^OPP-2099-/.test(id)), 'fixture ids never collide with real ones');
});

test('with the real register in this tree, the archive\'s records conform to it too', () => {
  if (!existsSync(DEFAULT_REGISTER)) return; // the register is being renamed; skip until it lands
  const r = spawnSync('node', [TOOL, path.join(ROOT, 'opportunities'), '--today', '2026-10-02', '--proposals'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
});

/* ---- usage ---- */

test('no folder: usage and exit 2', () => {
  const r = spawnSync('node', [TOOL], { encoding: 'utf8' });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /usage:/);
});

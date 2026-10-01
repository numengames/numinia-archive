#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
/**
 * funding.mjs — the grants the house might take, computed from their records.
 *
 * STD-046 makes every call for public money one Markdown file with a header
 * and a table of the call's conditions read against the house's card
 * (OPS-019). This script is the only place figures about those files come
 * from (GRA-009). It reads the stages, instruments, payments and reasons from
 * STD-045's tables and the house's chance from STD-038's — one source each.
 *
 *   node funding.mjs <folder>                   validate + Markdown report
 *   node funding.mjs <folder> --json            the same figures as JSON
 *   node funding.mjs <folder> --today DATE      fix "today" (tests, replays)
 *   node funding.mjs <folder> --register PATH --chances PATH
 *
 * Exit 0 every record conforms · 1 a record breaks a rule (each named) ·
 *      2 the folder or a register cannot be read.
 *
 * Zero dependencies, copied alone into any repository: the frontmatter and
 * table readers are deliberate copies of the sales kit's.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const DEFAULT_REGISTER = path.join(ROOT, 'standards', 'STD-045-the-stages-of-a-grant.md');
const DEFAULT_CHANCES = path.join(ROOT, 'standards', 'STD-038-the-stages-of-a-sale.md');

export const REQUIRED = ['id', 'funder', 'instrument', 'amount', 'currency', 'payment', 'advance',
  'call', 'opens', 'closes', 'estimated', 'state', 'chance', 'opened', 'license'];
export const WHEN_OPEN = ['next_action', 'next_date'];
export const WHEN_DUE = ['closed', 'reason', 'granted'];
/* Every document's header (STD-004 rings 1–3), accepted and not read. */
export const COMMON = ['title', 'type', 'status', 'version', 'created', 'updated',
  'author', 'owner', 'provenance', 'created_source', 'created_confidence', 'requested_by',
  'supersedes', 'superseded_by', 'derived_from',
  'tags', 'visibility', 'guild', 'territory', 'registration', 'registration_reason',
  'registration_exemption', 'evidence_script', 'evidence_head', 'related', 'uid'];
export const ALLOWED = new Set([...REQUIRED, ...WHEN_OPEN, ...WHEN_DUE, ...COMMON]);
export const MEETS = ['yes', 'no', 'check'];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const ID_RE = /^GRA-\d{4}-\d{3,}$/;
const URL_RE = /^https?:\/\/\S+$/;
const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const PHONE_RE = /(?:\+\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)\d{3}[\s-]?\d{3,4}\b/;
const OFFICIAL_ID = /\b(?:BOE|BOCM|BORME)-[A-Z]-\d{4}-\d+(?:-\d+)?\b|\b\d{8}-\d\b/g;

export function parseFM(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---(\n|$)/);
  if (!m) return null;
  const out = {};
  for (const raw of m[1].split('\n')) {
    if (!raw.trim() || raw.trimStart().startsWith('#')) continue;
    const kv = /^([A-Za-z_][A-Za-z0-9_.-]*):(?:\s+(.*))?$/.exec(raw);
    if (!kv) continue;
    let v = (kv[2] ?? '').trim();
    const q = /^"(.*)"\s*(#.*)?$/.exec(v) ?? /^'(.*)'\s*(#.*)?$/.exec(v);
    out[kv[1]] = q ? q[1] : v.replace(/\s+#.*$/, '').trim();
  }
  return out;
}

function tableUnder(text, title) {
  const re = new RegExp(`^## ${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm');
  const m = re.exec(text);
  if (!m) return [];
  const rows = [];
  for (const line of text.slice(m.index).split('\n').slice(1)) {
    if (line.startsWith('## ')) break;
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.every((c) => /^-+$/.test(c))) continue;
    rows.push(cells);
  }
  return rows.slice(1);
}
const tick = (s) => s.replace(/`/g, '');

/** STD-045's tables and STD-038's chance — never typed here. */
export function loadRegister(file = DEFAULT_REGISTER, chancesFile = DEFAULT_CHANCES) {
  const text = readFileSync(file, 'utf8');
  const stages = tableUnder(text, 'The stages').map((c) => ({ name: tick(c[0]), open: /^yes$/i.test(c[c.length - 1]) }));
  const reg = {
    order: stages.map((s) => s.name),
    closed: stages.filter((s) => !s.open).map((s) => s.name),
    instruments: tableUnder(text, 'What the funder gives').map(([i]) => tick(i)),
    payments: tableUnder(text, 'How it pays').map(([p]) => tick(p)),
    reasons: tableUnder(text, 'Reasons a grant does not happen').map(([r]) => tick(r)),
    chances: tableUnder(readFileSync(chancesFile, 'utf8'), "The house's chance").map(([c]) => tick(c)),
  };
  if (!reg.order.length || !reg.reasons.length || !reg.chances.length) throw new Error(`register incomplete: ${file}`);
  return reg;
}

export function transitionsOf(text) {
  return tableUnder(text.replace(/^---\s*\n[\s\S]*?\n---/, ''), 'Transitions')
    .map(([date, from, to, by, evidence]) => ({ date, from: tick(from), to: tick(to), by, evidence }))
    .filter((t) => ISO_DATE.test(t.date));
}
export function criteriaOf(text) {
  const body = text.replace(/^---\s*\n[\s\S]*?\n---/, '');
  if (!/^## Criteria\s*$/m.test(body)) return null;
  return tableUnder(body, 'Criteria').map((c) => ({ criterion: c[0] ?? '', asks: c[1] ?? '', house: c[2] ?? '', meets: tick(c[c.length - 1] ?? '').toLowerCase() }));
}
export function tally(c = []) {
  return { rows: c.length, yes: c.filter((r) => r.meets === 'yes').length, no: c.filter((r) => r.meets === 'no').length, check: c.filter((r) => r.meets === 'check').length };
}

export function readFolder(folder) {
  return readdirSync(folder).filter((f) => /^GRA-.*\.md$/.test(f)).sort().map((f) => {
    const file = path.join(folder, f), text = readFileSync(file, 'utf8');
    return { file, text, fm: parseFM(text), transitions: transitionsOf(text), criteria: criteriaOf(text) };
  });
}

export function validate(rec, reg) {
  const { fm, transitions, criteria, file, text } = rec;
  const bad = [];
  const F = (plate, what) => bad.push({ plate, what, file });
  if (!fm) { F('GRA-001', 'no frontmatter'); return bad; }
  for (const k of REQUIRED) if (!(k in fm)) F('GRA-002', `header lacks \`${k}\``);
  for (const k of Object.keys(fm)) if (!ALLOWED.has(k)) F('GRA-002', `header carries \`${k}\`, not a field of the record`);
  if (!ID_RE.test(fm.id ?? '')) F('GRA-001', `id "${fm.id}" is not GRA-YYYY-NNN`);
  if (fm.id && path.basename(file, '.md') !== fm.id) F('GRA-001', `file is named "${path.basename(file)}", its id is "${fm.id}"`);
  const among = (k, list) => { if (fm[k] !== undefined && !list.includes(fm[k])) F('GRA-003', `${k} "${fm[k]}" is not one of ${list.join(' · ')}`); };
  among('state', reg.order); among('instrument', reg.instruments); among('payment', reg.payments); among('chance', reg.chances);
  for (const k of ['amount', 'advance']) if (fm[k] !== undefined && !/^\d+(\.\d+)?$/.test(fm[k])) F('GRA-002', `${k} "${fm[k]}" is not a number`);
  if (Number(fm.advance) > 100) F('GRA-002', `advance ${fm.advance} is a share: 0 to 100`);
  if (fm.payment === 'advance' && !(Number(fm.advance) > 0)) F('GRA-002', 'payment in advance with no share paid in advance');
  if (fm.payment === 'on-justification' && Number(fm.advance) > 0) F('GRA-002', 'paid on justification, yet a share in advance');
  if (fm.call && !URL_RE.test(fm.call)) F('GRA-002', `call "${fm.call}" is not an address`);
  if (fm.estimated && !['yes', 'no'].includes(fm.estimated)) F('GRA-002', `estimated "${fm.estimated}" is yes or no`);
  for (const k of ['opens', 'closes', 'opened']) if (fm[k] && !ISO_DATE.test(fm[k])) F('GRA-002', `${k} "${fm[k]}" is not a date`);
  if (fm.state && fm.state !== 'foreseen' && fm.estimated === 'yes' && ['open', 'applied'].includes(fm.state)) F('GRA-002', `stage "${fm.state}" but the days are still estimated — the call is published, read its days`);
  const open = !reg.closed.includes(fm.state);
  if (open) {
    if (!fm.next_action) F('GRA-004', 'open record with no next action');
    if (!ISO_DATE.test(fm.next_date ?? '')) F('GRA-004', 'open record with no next date');
    if (fm.closed) F('GRA-003', `open stage "${fm.state}" but a closed date`);
  } else if (!ISO_DATE.test(fm.closed ?? '')) F('GRA-003', `closed stage "${fm.state}" with no closed date`);
  if (['denied', 'declined'].includes(fm.state) && !reg.reasons.includes(fm.reason)) F('GRA-003', `${fm.state} with reason "${fm.reason}", not one of the register's`);
  if (!['denied', 'declined'].includes(fm.state) && fm.reason) F('GRA-003', `reason on a record that is not denied or declined`);
  if (['granted', 'justified', 'paid'].includes(fm.state) && !/^\d+(\.\d+)?$/.test(fm.granted ?? '')) F('GRA-002', `${fm.state} with no amount granted`);
  if (!criteria || !criteria.length) F('GRA-006', 'no criteria table — a "## Criteria" table: criterion · the call asks · the house · meets');
  else {
    for (const c of criteria) if (!MEETS.includes(c.meets)) F('GRA-006', `criterion "${c.criterion}" says "${c.meets}" — meets is one of ${MEETS.join(' · ')}`);
    const n = tally(criteria);
    if (n.no && ['high', 'medium'].includes(fm.chance)) F('GRA-007', `a criterion fails but the chance says "${fm.chance}"`);
    if (n.check && fm.chance === 'high') F('GRA-007', 'a criterion is still to check but the chance says "high"');
    if (fm.chance === 'none' && !n.no) F('GRA-007', 'chance "none" but no criterion says no — name the condition that fails');
  }
  const scan = text.replace(OFFICIAL_ID, 'ID');
  if (EMAIL_RE.test(scan)) F('GRA-008', 'an e-mail address is in the record');
  if (PHONE_RE.test(scan.replace(/^---\s*\n[\s\S]*?\n---/, '').replace(/https?:\/\/\S+/g, ''))) F('GRA-008', 'a phone number is in the record');
  if (!transitions.length) F('GRA-005', 'no transitions table, or no dated row in it');
  else {
    const last = transitions[transitions.length - 1];
    if (last.to !== fm.state) F('GRA-005', `last transition goes to "${last.to}", the header says "${fm.state}"`);
    for (const t of transitions) if (!reg.order.includes(t.to)) F('GRA-005', `transition to "${t.to}", not a stage`);
    const d = transitions.map((t) => t.date);
    if (d.some((x, i) => i && x < d[i - 1])) F('GRA-005', 'transitions are not in date order');
  }
  return bad;
}

export function figures(records, reg, today) {
  const ok = records.filter((r) => r.fm && reg.order.includes(r.fm.state));
  const byStage = Object.fromEntries(reg.order.map((s) => [s, { count: 0, amount: 0 }]));
  const byChance = Object.fromEntries(reg.chances.map((c) => [c, { count: 0, amount: 0 }]));
  const overdue = [], calendar = [], list = [];
  for (const r of ok) {
    const fm = r.fm, amount = Number(fm.amount) || 0, open = !reg.closed.includes(fm.state);
    byStage[fm.state].count++; byStage[fm.state].amount += amount;
    if (byChance[fm.chance]) { byChance[fm.chance].count++; if (open) byChance[fm.chance].amount += amount; }
    if (open && ISO_DATE.test(fm.next_date) && fm.next_date < today) overdue.push({ id: fm.id, next_date: fm.next_date, next_action: fm.next_action });
    if (open && ISO_DATE.test(fm.closes)) calendar.push({ date: fm.closes, id: fm.id, funder: fm.funder, title: fm.title ?? '', estimated: fm.estimated === 'yes', chance: fm.chance, amount, payment: fm.payment, advance: Number(fm.advance) || 0, call: fm.call });
    const t = tally(r.criteria ?? []);
    list.push({
      id: fm.id, title: fm.title ?? '', funder: fm.funder, instrument: fm.instrument, state: fm.state, chance: fm.chance,
      amount, payment: fm.payment, advance: Number(fm.advance) || 0, opens: fm.opens, closes: fm.closes, estimated: fm.estimated === 'yes',
      call: fm.call, next_action: fm.next_action ?? '', next_date: fm.next_date ?? '', reason: fm.reason ?? '', granted: Number(fm.granted) || 0,
      criteria: t, failed: (r.criteria ?? []).filter((c) => c.meets === 'no').map((c) => c.criterion),
      toCheck: (r.criteria ?? []).filter((c) => c.meets === 'check').map((c) => c.criterion), transitions: r.transitions,
    });
  }
  calendar.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  list.sort((a, b) => reg.chances.indexOf(a.chance) - reg.chances.indexOf(b.chance) || (a.closes || '9').localeCompare(b.closes || '9'));
  const openList = list.filter((x) => !reg.closed.includes(x.state));
  return {
    today, records: ok.length, open: openList.length, byStage, byChance, overdue, calendar, list,
    inReach: openList.filter((x) => ['high', 'medium'].includes(x.chance)).reduce((a, x) => a + x.amount, 0),
    paid: list.filter((x) => x.state === 'paid').reduce((a, x) => a + x.granted, 0),
  };
}

const eur = (n) => `${Math.round(n).toLocaleString('en-GB')} EUR`;
export function report(fig, reg) {
  const L = [`# Funding — ${fig.today}`, '', `${fig.records} record(s), ${fig.open} open; ${eur(fig.inReach)} at chance high or medium; ${eur(fig.paid)} paid.`, ''];
  L.push('## By stage', '', '| Stage | Records | Most the house could receive |', '|---|---|---|');
  for (const s of reg.order) L.push(`| \`${s}\` | ${fig.byStage[s].count} | ${eur(fig.byStage[s].amount)} |`);
  L.push('', '## By chance', '', '| Chance | Records | Open, most receivable |', '|---|---|---|');
  for (const c of reg.chances) L.push(`| \`${c}\` | ${fig.byChance[c].count} | ${eur(fig.byChance[c].amount)} |`);
  L.push('', '## Needs a move', '');
  if (!fig.overdue.length) L.push('Nothing overdue.');
  for (const o of fig.overdue) L.push(`- **${o.id}** overdue since ${o.next_date}: ${o.next_action}`);
  L.push('', '## Calendar', '', 'Every open call by its closing day; an estimated day is last year\'s, until the call is out.', '');
  if (!fig.calendar.length) L.push('Nothing is open.');
  else {
    L.push('| Closes | Record | Funder | Chance | Most | Pays |', '|---|---|---|---|---|---|');
    for (const c of fig.calendar) L.push(`| ${c.date}${c.estimated ? ' (est.)' : ''} | ${c.id} | ${c.funder} | \`${c.chance}\` | ${eur(c.amount)} | ${c.payment === 'advance' ? `${c.advance} % in advance` : c.payment} |`);
  }
  L.push('', '## Every call', '', '| Record | Chance | Criteria met | Fails | To check |', '|---|---|---|---|---|');
  for (const x of fig.list) L.push(`| ${x.id} | \`${x.chance}\` | ${x.criteria.yes}/${x.criteria.rows} | ${x.failed.join(', ') || '—'} | ${x.toCheck.join(', ') || '—'} |`);
  return L.join('\n') + '\n';
}

function main(argv) {
  const args = argv.slice(2);
  const flag = (n) => { const i = args.indexOf(n); return i < 0 ? null : (args.splice(i, 2)[1] ?? null); };
  const has = (n) => { const i = args.indexOf(n); if (i < 0) return false; args.splice(i, 1); return true; };
  const today = flag('--today') ?? new Date().toISOString().slice(0, 10);
  const regPath = flag('--register') ?? DEFAULT_REGISTER, chPath = flag('--chances') ?? DEFAULT_CHANCES;
  const json = has('--json');
  const folder = args[0];
  if (!folder || !existsSync(folder) || !statSync(folder).isDirectory()) {
    console.error('usage: node funding.mjs <folder> [--json] [--today YYYY-MM-DD] [--register PATH] [--chances PATH]');
    return 2;
  }
  let reg;
  try { reg = loadRegister(regPath, chPath); } catch (e) { console.error(String(e.message)); return 2; }
  const records = readFolder(folder);
  const bad = records.flatMap((r) => validate(r, reg));
  if (bad.length) {
    console.error(`${bad.length} breach(es):`);
    for (const b of bad) console.error(`  ${b.plate}  ${path.relative(process.cwd(), b.file)}: ${b.what}`);
    return 1;
  }
  const fig = figures(records, reg, today);
  process.stdout.write(json ? JSON.stringify(fig, null, 2) + '\n' : report(fig, reg));
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv));

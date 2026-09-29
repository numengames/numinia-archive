#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
/**
 * pipeline.mjs — the sales pipeline, computed from opportunity records.
 *
 * THE PROBLEM THIS SOLVES
 *
 * A pipeline typed into a sheet is wrong by the second week, and a sale kept
 * in one head is lost with a holiday. STD-039 makes every opportunity one
 * Markdown file with a header; this script is the only place the figures
 * about those files come from (OPP-009). It reads the stages and the reasons
 * from STD-038's tables — one source — so a stage renamed in the register is
 * renamed here without touching code. The records are public (OPP-008), so
 * it also refuses what identifies a person (OPP-006) and an organisation
 * named without the openness notice, or named in a lost record (OPP-011).
 *
 * WHAT IT DOES
 *
 *   node pipeline.mjs <folder>                 validate + Markdown report
 *   node pipeline.mjs <folder> --json          the same figures as JSON
 *   node pipeline.mjs <folder> --proposals     also check each proposal a
 *                                              record points to (STD-040)
 *   node pipeline.mjs <folder> --today DATE    fix "today" (tests, replays)
 *   node pipeline.mjs <folder> --register PATH read the stages from another
 *                                              copy of STD-038 (a consumer
 *                                              repo without this tree)
 *
 * Exit 0 every record conforms · 1 a record breaks a rule (each named) ·
 *      2 the folder or the register cannot be read.
 *
 * Zero dependencies. The frontmatter reader is a deliberate copy of the
 * flat cases of machine/scripts/lib/frontmatter.mjs, because this file is
 * meant to be copied alone into a repository that has nothing else of ours.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const DEFAULT_REGISTER = path.join(ROOT, 'standards', 'STD-038-the-stages-of-a-sale.md');

/* ---------- the record, as STD-039 defines it ---------- */

export const REQUIRED = ['id', 'organisation', 'sector', 'offer', 'source', 'state', 'value',
  'currency', 'contact_role', 'contact_channel', 'opened', 'license'];
/* An open record also carries its next step (OPP-004); a closed one has none,
   and an empty value is absent (STD-004 HDR-009), so it is not written. */
export const WHEN_OPEN = ['next_action', 'next_date'];
/* Written when the stage asks for them, absent before (empty is absent,
   STD-004): who signs from agreed, the closed date at won or lost, the
   reason when lost, the proposal's path once sent, the agreement's once won. */
export const WHEN_DUE = ['decider_role', 'closed', 'reason', 'proposal', 'agreement', 'disclosure'];
/* OPP-011: `open` — the client was told the house works in the open and did
   not ask to stay unnamed, so the record may name it; absent or `unnamed` —
   sector and size only. A lost record is never named, whatever it says. */
export const DISCLOSURES = ['open', 'unnamed'];
/* The header every document of the archive opens with (STD-004, rings 1 and
   2 and the fields of every series). A record carries it like any document;
   the tool accepts it and reads none of it. Kept here, not imported, so the
   kit runs outside this repository; a test holds it equal to rings.mjs. */
export const COMMON = ['title', 'type', 'status', 'version', 'created', 'updated',
  'author', 'owner', 'provenance', 'created_source', 'created_confidence', 'requested_by',
  'supersedes', 'superseded_by', 'derived_from',
  'tags', 'visibility', 'guild', 'territory', 'registration', 'registration_reason',
  'registration_exemption', 'evidence_script', 'evidence_head', 'related', 'uid'];
/* Roles and channels, never names (OPP-006): the header may carry only these. */
export const ALLOWED = new Set([...REQUIRED, ...WHEN_OPEN, ...WHEN_DUE, ...COMMON]);
export const SOURCES = ['referral', 'inbound', 'outbound', 'event', 'partner'];
/* OPP-011: without `disclosure: open`, and always once lost, the organisation
   is a sector and a size, never a name. */
export const SECTOR_WORDS = /\b(retailer|retail|public body|public-sector|police|forces?|academy|school|university|hospital|health|bank|insurer|utility|logistics|manufacturer|industry|technology|software|agency|non-profit|foundation|association|municipality|ministry|company|firm|organisation|organization|studio|startup|sme|enterprise|chain|group)\b/i;
/* OPP-006: what identifies a person — an e-mail, a phone — never enters a record. */
export const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
export const PHONE_RE = /(?:\+\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)\d{3}[\s-]?\d{3,4}\b/;
export const CHANNELS = ['email', 'phone', 'meeting', 'form'];
export const LEVELS = ['reaction', 'learning', 'behaviour', 'results'];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const ID_RE = /^OPP-\d{4}-\d{3,}$/;

/* ---------- frontmatter (flat scalars only, on purpose) ---------- */

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
    v = q ? q[1] : v.replace(/\s+#.*$/, '').trim();
    out[kv[1]] = v;
  }
  return out;
}

/* ---------- the register: STD-038's tables ---------- */

/** Parse a Markdown table under the heading `title` into rows of cells. */
function tableUnder(text, title) {
  const at = text.indexOf(`## ${title}`);
  if (at < 0) return [];
  const block = text.slice(at).split('\n').slice(1);
  const rows = [];
  for (const line of block) {
    if (line.startsWith('## ')) break;
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.every((c) => /^-+$/.test(c))) continue;
    rows.push(cells);
  }
  return rows.slice(1); // drop the header row
}

const tick = (s) => s.replace(/`/g, '');

/**
 * The stages in order, the closed ones, each stage's stale days, the
 * reasons and the retention — read from the register, never typed here.
 */
export function loadRegister(file = DEFAULT_REGISTER) {
  const text = readFileSync(file, 'utf8');
  const stages = tableUnder(text, 'The stages').map(([stage, , , , stale]) => ({
    name: tick(stage),
    stale: /^\d+/.test(stale) ? Number(stale.match(/^\d+/)[0]) : null,
  }));
  const reasons = tableUnder(text, 'Reasons a sale is lost').map(([r]) => tick(r));
  if (!stages.length || !reasons.length) throw new Error(`register has no stages or no reasons: ${file}`);
  return {
    order: stages.map((s) => s.name),
    closed: stages.filter((s) => s.stale === null).map((s) => s.name),
    staleDays: Object.fromEntries(stages.map((s) => [s.name, s.stale])),
    reasons,
  };
}

/* ---------- reading a folder of records ---------- */

/** The transitions table of a record body: [{date, from, to, by, evidence}]. */
export function transitionsOf(text) {
  return tableUnder(text.replace(/^---\s*\n[\s\S]*?\n---/, ''), 'Transitions')
    .map(([date, from, to, by, evidence]) => ({ date, from: tick(from), to: tick(to), by, evidence }))
    .filter((t) => ISO_DATE.test(t.date));
}

const days = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

/** Validate one record against STD-039. Returns the list of breaches (plate + what). */
export function validate(rec, reg) {
  const { fm, transitions, file } = rec;
  const bad = [];
  const F = (plate, what) => bad.push({ plate, what, file });
  if (!fm) { F('OPP-001', 'no frontmatter'); return bad; }
  for (const k of REQUIRED) if (!(k in fm)) F('OPP-002', `header lacks \`${k}\``);
  for (const k of Object.keys(fm)) if (!ALLOWED.has(k)) F('OPP-006', `header carries \`${k}\`, not a field of the record — a name or an address belongs in the body`);
  if (!ID_RE.test(fm.id ?? '')) F('OPP-001', `id "${fm.id}" is not OPP-YYYY-NNN`);
  if (fm.id && path.basename(file, '.md') !== fm.id) F('OPP-001', `file is named "${path.basename(file)}", its id is "${fm.id}"`);
  if (!reg.order.includes(fm.state)) F('OPP-003', `state "${fm.state}" is not a stage of the register`);
  if (fm.source && !SOURCES.includes(fm.source)) F('OPP-002', `source "${fm.source}" is not one of ${SOURCES.join(' · ')}`);
  if (fm.contact_channel && !CHANNELS.includes(fm.contact_channel)) F('OPP-002', `contact_channel "${fm.contact_channel}" is not one of ${CHANNELS.join(' · ')}`);
  if (fm.value !== undefined && !/^\d+(\.\d+)?$/.test(fm.value)) F('OPP-002', `value "${fm.value}" is not a number`);
  if (fm.opened && !ISO_DATE.test(fm.opened)) F('OPP-002', `opened "${fm.opened}" is not a date`);
  const open = !reg.closed.includes(fm.state);
  if (open) {
    if (!fm.next_action) F('OPP-004', 'open record with no next action');
    if (!ISO_DATE.test(fm.next_date ?? '')) F('OPP-004', 'open record with no next date');
    if (fm.closed) F('OPP-003', `open stage "${fm.state}" but a closed date "${fm.closed}"`);
  } else {
    if (!ISO_DATE.test(fm.closed ?? '')) F('OPP-003', `closed stage "${fm.state}" with no closed date`);
  }
  if (fm.state === 'lost' && !reg.reasons.includes(fm.reason)) F('OPP-003', `lost with reason "${fm.reason}", not one of the register's`);
  if (fm.state !== 'lost' && fm.reason) F('OPP-003', `reason "${fm.reason}" on a record that is not lost`);
  if (fm.state === 'proposed' && !fm.proposal) F('OPP-002', 'proposed with no proposal path');
  if (fm.state === 'won' && !fm.agreement) F('OPP-010', 'won with no agreement path');
  if (['agreed', 'won'].includes(fm.state) && !fm.decider_role) F('OPP-003', `${fm.state} with no decider role — who signs for the client is known by the time they agree`);
  if (fm.state === 'proposed') {
    const sent = transitions.find((t) => t.to === 'proposed');
    if (sent && !(sent.by ?? '').trim()) F('PRP-007', 'the transition to proposed names nobody in By — whoever sent it read it, and the row is the evidence');
  }
  const body = rec.text.replace(/^---\s*\n[\s\S]*?\n---/, '');
  if (EMAIL_RE.test(body) || EMAIL_RE.test(Object.values(fm).join(' '))) F('OPP-006', 'an e-mail address is in the record — a person is identified; keep it where the conversation happened');
  if (PHONE_RE.test(body)) F('OPP-006', 'a phone number is in the record — a person is identified; keep it where the conversation happened');
  if (fm.disclosure && !DISCLOSURES.includes(fm.disclosure)) F('OPP-011', `disclosure "${fm.disclosure}" is not one of ${DISCLOSURES.join(' · ')}`);
  const named = fm.organisation && !SECTOR_WORDS.test(fm.organisation);
  if (named && fm.state === 'lost') F('OPP-011', `organisation "${fm.organisation}" reads as a name in a lost record; a lost sale is kept by sector and size ("a large retailer") — the reason is public, the name is not`);
  else if (named && fm.disclosure !== 'open') F('OPP-011', `organisation "${fm.organisation}" reads as a name; without \`disclosure: open\` it is a sector and a size ("a large retailer")`);
  if (!transitions.length) F('OPP-005', 'no transitions table, or no dated row in it');
  else {
    const last = transitions[transitions.length - 1];
    if (last.to !== fm.state) F('OPP-005', `last transition goes to "${last.to}", the header says "${fm.state}"`);
    for (const t of transitions) if (t.to !== 'lead' && !reg.order.includes(t.to)) F('OPP-005', `transition to "${t.to}", not a stage`);
    const dates = transitions.map((t) => t.date);
    if (dates.some((d, i) => i && d < dates[i - 1])) F('OPP-005', 'transitions are not in date order');
  }
  return bad;
}

/** Read every *.md in `folder` (moulds and README skipped) into records. */
export function readFolder(folder) {
  const files = readdirSync(folder).filter((f) => f.endsWith('.md') && /^OPP-/.test(f)).sort();
  return files.map((f) => {
    const file = path.join(folder, f);
    const text = readFileSync(file, 'utf8');
    return { file, fm: parseFM(text), transitions: transitionsOf(text), text };
  });
}

/* ---------- proposals (STD-040, the mechanical rows) ---------- */

const PRP_SECTIONS = ['Objectives', 'Why us', 'How it teaches, and how it measures', 'Price, terms and conditions', 'Before you agree', 'The three questions', 'In the open'];

export function validateProposal(file, text) {
  const bad = [];
  const F = (plate, what) => bad.push({ plate, what, file });
  const fm = parseFM(text);
  if (!fm) { F('PRP-001', 'no frontmatter'); return bad; }
  const body = text.replace(/^---\s*\n[\s\S]*?\n---/, '');
  const heads = [...body.matchAll(/^## (?:\d+\.\s+)?(.+)$/gm)].map((m) => m[1].trim());
  const plates = ['PRP-001', 'PRP-002', 'PRP-003', 'PRP-004', 'PRP-005', 'PRP-006', 'PRP-010'];
  PRP_SECTIONS.forEach((s, i) => { if (!heads.includes(s)) F(plates[i], `no section "${s}"`); });
  if (!LEVELS.includes(fm.level)) F('PRP-003', `level "${fm.level}" is not one of ${LEVELS.join(' · ')}`);
  if (!/^\d+(\.\d+)?$/.test(fm.tax_rate ?? '')) F('PRP-004', 'no tax rate in the header');
  if (!/^\d+(\.\d+)?$/.test(fm.price ?? '')) F('PRP-004', 'no price in the header');
  if (/…/.test(body.slice(body.indexOf('## The three questions')))) F('PRP-006', 'the three questions still hold the mould\'s ellipsis');
  return bad;
}

/* ---------- the figures ---------- */

export function figures(records, reg, today) {
  const byStage = Object.fromEntries(reg.order.map((s) => [s, { count: 0, value: 0 }]));
  const overdue = [], stale = [];
  const reasons = {};
  const perStage = Object.fromEntries(reg.order.map((s) => [s, []]));
  const byOrg = {};
  for (const r of records) {
    const fm = r.fm; if (!fm || !byStage[fm.state]) continue;
    const value = Number(fm.value) || 0;
    byStage[fm.state].count++; byStage[fm.state].value += value;
    (byOrg[fm.organisation] ??= []).push({ id: fm.id, state: fm.state, value });
    const open = !reg.closed.includes(fm.state);
    if (open && ISO_DATE.test(fm.next_date) && fm.next_date < today) overdue.push({ id: fm.id, next_date: fm.next_date, next_action: fm.next_action });
    if (open && r.transitions.length) {
      const last = r.transitions[r.transitions.length - 1];
      const since = days(last.date, today);
      const limit = reg.staleDays[fm.state];
      if (limit !== null && since > limit) stale.push({ id: fm.id, state: fm.state, days: since, limit });
    }
    if (fm.state === 'lost') reasons[fm.reason] = (reasons[fm.reason] ?? 0) + 1;
    // time per stage, from the transitions: each row closes the previous stage
    for (let i = 1; i < r.transitions.length; i++) {
      const from = r.transitions[i - 1];
      if (perStage[from.to]) perStage[from.to].push(days(from.date, r.transitions[i].date));
    }
  }
  const openStages = reg.order.filter((s) => !reg.closed.includes(s));
  const reached = (s) => records.filter((r) => r.fm && (r.transitions.some((t) => t.to === s) || r.fm.state === s)).length;
  const funnel = openStages.map((s) => ({ stage: s, reached: reached(s) }));
  const won = byStage.won?.count ?? 0, lost = byStage.lost?.count ?? 0;
  const cycle = records.filter((r) => r.fm?.state === 'won' && r.transitions.length)
    .map((r) => days(r.transitions[0].date, r.fm.closed));
  const avg = (a) => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : null);
  return {
    today, records: records.length, byStage, overdue, stale, reasons,
    timePerStage: Object.fromEntries(Object.entries(perStage).map(([s, a]) => [s, avg(a)])),
    funnel, won, lost, winRate: won + lost ? Math.round((100 * won) / (won + lost)) : null,
    cycleDays: avg(cycle), byOrg,
  };
}

/* ---------- the report ---------- */

const money = (n, cur = 'EUR') => `${n.toLocaleString('en-GB')} ${cur}`;

export function report(fig, reg) {
  const L = [];
  L.push(`# Pipeline — ${fig.today}`, '', `${fig.records} records.`, '');
  L.push('## By stage', '', '| Stage | Records | Value (ex-tax) |', '|---|---|---|');
  for (const s of reg.order) L.push(`| \`${s}\` | ${fig.byStage[s].count} | ${money(fig.byStage[s].value)} |`);
  L.push('', '## Needs a move', '');
  if (!fig.overdue.length && !fig.stale.length) L.push('Nothing overdue, nothing stale.');
  for (const o of fig.overdue) L.push(`- **${o.id}** overdue since ${o.next_date}: ${o.next_action}`);
  for (const s of fig.stale) L.push(`- **${s.id}** stale: ${s.days} days in \`${s.state}\` (limit ${s.limit})`);
  L.push('', '## Time per stage (average days)', '', '| Stage | Days |', '|---|---|');
  for (const s of reg.order) if (!reg.closed.includes(s)) L.push(`| \`${s}\` | ${fig.timePerStage[s] ?? '—'} |`);
  L.push('', '## Funnel', '', '| Stage | Reached |', '|---|---|');
  for (const f of fig.funnel) L.push(`| \`${f.stage}\` | ${f.reached} |`);
  L.push('', '## Won and lost', '');
  L.push(`Won ${fig.won} · lost ${fig.lost}` + (fig.winRate === null ? '' : ` · win rate ${fig.winRate} %`) + (fig.cycleDays === null ? '' : ` · cycle ${fig.cycleDays} days`));
  if (Object.keys(fig.reasons).length) {
    L.push('', '| Reason lost | Records |', '|---|---|');
    for (const [r, n] of Object.entries(fig.reasons).sort((a, b) => b[1] - a[1])) L.push(`| \`${r}\` | ${n} |`);
  }
  L.push('', '## By organisation', '', '| Organisation | Records | Stages |', '|---|---|---|');
  for (const [org, rs] of Object.entries(fig.byOrg).sort()) L.push(`| ${org} | ${rs.length} | ${rs.map((r) => `\`${r.state}\``).join(' ')} |`);
  return L.join('\n') + '\n';
}

/* ---------- main ---------- */

function main(argv) {
  const args = argv.slice(2);
  const flag = (n) => { const i = args.indexOf(n); return i < 0 ? null : (args.splice(i, 2)[1] ?? null); };
  const has = (n) => { const i = args.indexOf(n); if (i < 0) return false; args.splice(i, 1); return true; };
  const today = flag('--today') ?? new Date().toISOString().slice(0, 10);
  const registerPath = flag('--register') ?? DEFAULT_REGISTER;
  const json = has('--json'), proposals = has('--proposals');
  const folder = args[0];
  if (!folder || !existsSync(folder) || !statSync(folder).isDirectory()) {
    console.error('usage: node pipeline.mjs <folder> [--json] [--proposals] [--today YYYY-MM-DD] [--register PATH]');
    return 2;
  }
  let reg;
  try { reg = loadRegister(registerPath); } catch (e) { console.error(String(e.message)); return 2; }
  const records = readFolder(folder);
  const bad = records.flatMap((r) => validate(r, reg));
  if (proposals) for (const r of records) {
    if (!r.fm?.proposal) continue;
    const p = path.resolve(path.dirname(r.file), r.fm.proposal);
    if (!existsSync(p)) { bad.push({ plate: 'PRP-009', what: `proposal "${r.fm.proposal}" not found`, file: r.file }); continue; }
    bad.push(...validateProposal(p, readFileSync(p, 'utf8')));
  }
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

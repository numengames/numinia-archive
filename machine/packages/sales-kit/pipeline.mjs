#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
/**
 * pipeline.mjs — every opportunity of the house, computed from its records.
 *
 * THE PROBLEM THIS SOLVES
 *
 * A pipeline typed into a sheet is wrong by the second week, and a sale kept
 * in one head is lost with a holiday. STD-039 makes every opportunity — a
 * sale, a public tender, a grant, a collaboration, a partner — one Markdown
 * file with a header and a `## Timeline`: one line per thing that happened.
 * This script is the only place the figures about those files come from
 * (OPP-009). The stage, the next step, overdue and stale, the funnel and the
 * chance of a call are COMPUTED from the timeline and the criteria table,
 * never typed: a typed stage is a second copy of what the lines already say,
 * and the second copy is the one that drifts.
 *
 * It reads every closed list — kinds, stages, events, steps, reasons, how it
 * pays, instruments, sources, procedures, where a call was read, what the
 * buyer buys, the chances — from STD-038's tables (one source), and what the
 * house holds from its card, OPS-018. A list renamed there is renamed here
 * without touching code. The records are public (OPP-008), so it also
 * refuses what identifies a person (OPP-006), an organisation named before
 * it agreed (OPP-011), and a call that fails a requirement (OPP-013): such a
 * call is not recorded at all; what it taught goes to the card.
 *
 * WHAT IT DOES
 *
 *   node pipeline.mjs <folder>                 validate + Markdown report
 *   node pipeline.mjs <folder> --json          the same figures as JSON
 *   node pipeline.mjs <folder> --proposals     also check each proposal a
 *                                              record points to (STD-040)
 *   node pipeline.mjs <folder> --today DATE    fix "today" (tests, replays)
 *   node pipeline.mjs <folder> --register PATH another copy of STD-038
 *   node pipeline.mjs <folder> --card PATH     another copy of OPS-018
 *
 * Exit 0 every record conforms · 1 a record breaks a rule (each named by its
 *      plate) · 2 the folder, the register or a named card cannot be read.
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
export const DEFAULT_REGISTER = path.join(ROOT, 'standards', 'STD-038-the-stages-of-an-opportunity.md');
export const DEFAULT_CARD = path.join(ROOT, 'operations', 'OPS-018-the-house-card.md');

/* ---------- the record, as STD-039 defines it ---------- */

/* On every record, whatever its kind (OPP-002). */
export const REQUIRED = ['id', 'kind', 'organisation', 'sector', 'source', 'value', 'currency', 'pays',
  'contact_role', 'contact_channel', 'opened', 'license'];
/* Written when due — absent before, and an empty value is absent (STD-004
   HDR-009). Which kind and which stage asks for each is in validate(). */
export const WHEN_DUE = ['offer', 'advance', 'proposal', 'agreement', 'decider_role', 'disclosure',
  'follows', 'gives_back',
  // a call — a tender or a grant: where it is published, when it closes,
  // what it was read from (OPP-012, OPP-014)
  'call', 'closes', 'read_from',
  // a tender: how the buyer purchases, its file, what it really buys, the
  // solvency the terms ask, the day the service starts (OPP-012/014/015)
  'procedure', 'file_ref', 'object', 'turnover_asked', 'works_asked', 'starts',
  // a grant: what the funder gives and when the call opens; `estimated`
  // marks days copied from last year's call until this year's is out
  'instrument', 'opens', 'estimated'];
/* Fields the record no longer carries, each with where its fact lives now.
   Named apart so the breach says why, instead of "unknown field". The first
   six are computed (OPP-009): typing them is a second copy that drifts. */
export const COMPUTED = {
  state: 'the stage is computed from the timeline',
  next_action: 'the next step is the timeline\'s `next` line',
  next_date: 'the next step is the timeline\'s `next` line',
  closed: 'the closing day is the timeline\'s `won` or `lost` line',
  reason: 'the reason is written on the timeline\'s `lost` line',
  chance: 'the chance is computed from the criteria table',
};
/* The rest were renamed when grants joined the one record (OPP-002). */
export const RENAMED = {
  notice: 'a call\'s address is `call`',
  funder: 'the funder is the `organisation`',
  amount: 'the most the house could receive is the `value`',
  payment: 'how it pays is `pays`',
  granted: 'what was paid is the `won` line, handed to the ledger',
};
/* Fields only some kinds carry: present on another kind, they are a breach. */
const ONLY = {
  gives_back: ['collaboration'],
  call: ['tender', 'grant'], closes: ['tender', 'grant'], read_from: ['tender', 'grant'],
  procedure: ['tender'], file_ref: ['tender'], object: ['tender'],
  turnover_asked: ['tender'], works_asked: ['tender'], starts: ['tender'],
  instrument: ['grant'], opens: ['grant'], estimated: ['grant'],
};
/* The rule each kind-bound field answers to: where a call is and when it
   runs (OPP-012); what it was read from and what it asks (OPP-014). */
const ONLY_PLATE = { gives_back: 'OPP-002', call: 'OPP-012', closes: 'OPP-012', procedure: 'OPP-012', instrument: 'OPP-012', opens: 'OPP-012', estimated: 'OPP-012', file_ref: 'OPP-015' };
/* The header every document of the archive opens with (STD-004, rings 1 and
   2 and the fields of every series). A record carries it like any document;
   the tool accepts it and reads none of it but the title. Kept here, not
   imported, so the kit runs outside this repository; a test holds it equal
   to machine/scripts/lib/rings.mjs. */
export const COMMON = ['title', 'type', 'status', 'version', 'created', 'updated',
  'author', 'owner', 'provenance', 'created_source', 'created_confidence', 'requested_by',
  'supersedes', 'superseded_by', 'derived_from',
  'tags', 'visibility', 'guild', 'territory', 'registration', 'registration_reason',
  'registration_exemption', 'evidence_script', 'evidence_head', 'related', 'uid'];
/* Roles and channels, never names (OPP-006): the header may carry only these. */
export const ALLOWED = new Set([...REQUIRED, ...WHEN_DUE, ...COMMON]);
/* The proposal's own fields (STD-040), kept beside the record in the folder. */
export const PROPOSAL_FIELDS = ['opportunity', 'date', 'valid_until', 'level', 'price', 'tax_rate'];

/* OPP-013: each requirement of a call is met, or still to check. A `no` is
   not a value of the table: a call that fails a requirement is not kept. */
export const MEETS = ['yes', 'check'];
/* OPP-011: `open` — told the house works in the open and did not ask to stay
   unnamed; absent or `unnamed` — sector and size only. Lost: never named. */
export const DISCLOSURES = ['open', 'unnamed'];
export const CHANNELS = ['email', 'phone', 'meeting', 'form'];
export const LEVELS = ['reaction', 'learning', 'behaviour', 'results'];
/* The events the timeline grammar gives a meaning to. The register lists and
   explains them; the tool needs each one to exist there, or it cannot read. */
export const EVENTS = ['found', 'out', 'pos', 'neg', 'won', 'lost', 'next'];
/* Closing stages: reached only by a `won` or `lost` line, never by a token. */
export const CLOSED = ['won', 'lost'];
/* Kinds that are calls a public body publishes: read against the card, with
   a criteria table and a computed chance; their funder or authority may be
   named, since it published the call itself (OPP-011). */
export const CALLS = ['tender', 'grant'];
/* A sale's stage from which the proposal, the decider and the agreement are
   due (OPP-002, OPP-010): the stage they become knowable, not earlier. */
const SALE_PROPOSED = 'proposed', SALE_AGREED = 'agreed';

export const URL_RE = /^https?:\/\/\S+$/;
/* OPP-011: without `disclosure: open`, and always once lost, the organisation
   is a sector and a size, never a name. */
export const SECTOR_WORDS = /\b(retailer|retail|public body|public-sector|police|forces?|academy|school|university|hospital|health|bank|insurer|utility|logistics|manufacturer|industry|technology|software|agency|non-profit|foundation|association|accelerator|municipality|ministry|company|firm|organisation|organization|studio|startup|sme|enterprise|chain|group|community|conference|forum|event|festival|museum|council)\b/i;
/* OPP-006: what identifies a person — an e-mail, a phone — never enters a record. */
export const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
export const PHONE_RE = /(?:\+\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)\d{3}[\s-]?\d{3,4}\b/;
/* What looks like a phone and is not: a CPV code (80500000-9), an official
   gazette's identifier (BOE-B-2026-10741), a date, an address. Read out
   before the phone scan. */
export const NOT_A_PHONE = /\b\d{8}-\d\b|\b(?:BOE|BOCM|BORME|DOUE|BOP)-[A-Z]-\d{4}-\d+(?:-\d+)?\b|\b\d{4}-\d{2}-\d{2}\b|https?:\/\/\S+/g;
/* OPP-006: what reads as a person's name — a common first name followed by a
   capitalised word, or a courtesy title before one. Deliberately eager: a
   false alarm costs a look, a name let through cannot be taken back. Only
   the card's "Who may be named" (the house's own, and clients whose signed
   agreement allows it) passes. A first name after a word that makes it a
   place or a body (San José, Calle Isabel) is not a person. */
export const FIRST_NAMES = new Set(('Adrián Agustín Alba Alberto Alejandra Alejandro Alfonso Alicia Álvaro Ana Andrea Andrés Ángel Ángela Antonia Antonio Beatriz Begoña Blanca Borja Carla Carlos Carmen Carolina Cristina Cristian Daniel Daniela David Diego Eduardo Elena Emilio Enrique Esther Eva Federico Felipe Fernando Francisco Gabriel Gonzalo Guillermo Héctor Hugo Ignacio Inés Inmaculada Inma Irene Isabel Iván Jaime Javier Jesús Joaquín Jorge José Josefa Juan Juana Julia Julián Julio Laura Leticia Lorena Lorenzo Lucía Luis Luisa Manuel Manuela Marcos Margarita María Mariano Marina Marta Martín Mateo Miguel Mónica Nerea Nicolás Noelia Nuria Óscar Pablo Paula Pedro Pilar Rafael Ramón Raquel Raúl Ricardo Roberto Rocío Rodrigo Rubén Salvador Samuel Santiago Sara Sergio Silvia Sofía Sonia Susana Teresa Tomás Valentina Vanesa Verónica Vicente Víctor Virginia Yolanda ' +
  'Adam Alan Albert Alexander Alice Amanda Amy Andrew Anna Anne Anthony Barbara Benjamin Brian Catherine Charles Charlotte Christopher Claire Daniel Deborah Edward Elizabeth Emily Emma Eric Frank Gary George Hannah Harry Helen Henry Jack Jacob James Jane Jason Jennifer Jessica John Joseph Joshua Julie Karen Kate Kevin Laura Linda Lisa Margaret Mary Matthew Michael Michelle Nancy Nicholas Oliver Patricia Paul Peter Rachel Rebecca Richard Robert Ryan Sarah Simon Sophie Stephen Steven Susan Thomas Timothy William').split(/\s+/));
const NAME_WORD = "[A-ZÁÉÍÓÚÑÜ][a-záéíóúñüçàèòï'’-]+";
const TITLE_RE = new RegExp(`\\b(?:Sr|Sra|Srta|Dña|Dª|Dr|Dra|Mr|Mrs|Ms|Mx|Prof)\\.?\\s+${NAME_WORD}(?:\\s+${NAME_WORD})*`, 'g');
/* A run of capitalised words, the Spanish particles allowed between them. */
const RUN_RE = new RegExp(`${NAME_WORD}(?:\\s+(?:(?:de|del|la|los|y)\\s+)*${NAME_WORD})*`, 'gu');
const PLACE_WORDS = new Set(['San', 'Santa', 'Santo', 'Calle', 'Plaza', 'Avenida', 'Paseo', 'Hospital', 'Colegio', 'Instituto', 'Fundación', 'Universidad', 'Parque', 'Puerta', 'Isla', 'Saint', 'St', 'Street', 'Avenue', 'Square', 'Teatro', 'Museo', 'Centro', 'Escuela', 'Premio', 'Cátedra']);

/** Every stretch of `text` that reads as a person's name, minus those the card names. */
export function personNames(text, allowed = []) {
  const ok = allowed.map((n) => String(n).trim().toLowerCase()).filter(Boolean);
  const plain = String(text)
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/`[^`\n]*`/g, ' ');
  const found = new Set();
  const keep = (m) => {
    const name = m.trim().replace(/[.,;:]+$/, '');
    const low = name.toLowerCase();
    if (ok.some((a) => low === a || low.startsWith(a + ' ') || a.startsWith(low))) return;
    found.add(name);
  };
  for (const m of plain.matchAll(TITLE_RE)) keep(m[0]);
  for (const m of plain.matchAll(RUN_RE)) {
    const words = m[0].split(/\s+/);
    const caps = words.map((w, i) => ({ w, i })).filter(({ w }) => /^[A-ZÁÉÍÓÚÑÜ]/.test(w));
    const at = caps.findIndex(({ w }, k) => FIRST_NAMES.has(w) && k + 1 < caps.length && !(k > 0 && PLACE_WORDS.has(caps[k - 1].w)));
    if (at >= 0) keep(words.slice(caps[at].i).join(' '));
  }
  return [...found];
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const ID_RE = /^OPP-\d{4}-\d{3,}$/;
const NUMBER = /^\d+(\.\d+)?$/;
/* The separator of a timeline line: space, U+00B7 middle dot, space. */
export const SEP = ' · ';

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
    // empty is absent (STD-004 HDR-009): a field written empty was not written
    if (v !== '') out[kv[1]] = v;
  }
  return out;
}

/* ---------- Markdown: sections and tables, found by heading ---------- */

/** The body without its frontmatter, with numbered headings read plain:
    `## 2. The card` is `## The card`, so a document may number its sections. */
const bodyOf = (text) => text.replace(/^---\s*\n[\s\S]*?\n---/, '').replace(/^## \d+\.\s+/gm, '## ');

/** The lines under the heading `## title`, up to the next `## `. Null when absent. */
function section(text, title) {
  const re = new RegExp(`^## ${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm');
  const m = re.exec(text);
  if (!m) return null;
  const lines = [];
  for (const line of text.slice(m.index).split('\n').slice(1)) {
    if (line.startsWith('## ')) break;
    lines.push(line);
  }
  return lines;
}

/** A Markdown table under the heading `title`, header row dropped. */
function tableUnder(text, title) {
  const rows = [];
  for (const line of section(bodyOf(text), title) ?? []) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
    rows.push(cells);
  }
  return rows.slice(1);
}

const tick = (s) => String(s ?? '').replace(/`/g, '').trim();
const firsts = (rows) => rows.map(([c]) => tick(c));

/* ---------- the register: STD-038's tables ---------- */

/**
 * Every closed list the records use, read from the register, never typed
 * here. Throws (exit 2) when a table the tool cannot work without is
 * missing — better to stop than to judge records against an empty list.
 */
export function loadRegister(file = DEFAULT_REGISTER) {
  const text = readFileSync(file, 'utf8');
  const stageRows = tableUnder(text, 'The stages');
  const kinds = tableUnder(text, 'The kinds').map(([k, is, stale]) => {
    const kind = tick(k);
    const n = /^\d+/.exec(stale ?? '');
    return { kind, is: is ?? '', stale: n ? Number(n[0]) : null, stages: stageRows.filter((r) => tick(r[0]) === kind).map((r) => tick(r[1])) };
  });
  const events = tableUnder(text, 'The events').map(([e, means, step]) => ({ event: tick(e), means: means ?? '', step: /^[a-z]/.test(tick(step)) ? tick(step) : null }));
  const steps = tableUnder(text, 'The steps').map(([s, means]) => ({ step: tick(s), means: means ?? '' }));
  const reg = {
    kinds,
    stages: Object.fromEntries(kinds.map((k) => [k.kind, k.stages])),
    events,
    steps,
    reasons: firsts(tableUnder(text, 'Reasons an opportunity is lost')),
    pays: firsts(tableUnder(text, 'How it pays')),
    instruments: firsts(tableUnder(text, 'What the funder gives')),
    sources: firsts(tableUnder(text, 'The sources')),
    procedures: firsts(tableUnder(text, 'When the buyer publishes a notice')),
    readFrom: firsts(tableUnder(text, 'Where a call was read')),
    objects: firsts(tableUnder(text, 'What the buyer really buys')),
    chances: firsts(tableUnder(text, "The house's chance")),
  };
  const lacks = [];
  if (!kinds.length) lacks.push('The kinds');
  for (const k of kinds) {
    if (!k.stages.length) lacks.push(`stages of \`${k.kind}\``);
    for (const c of CLOSED) if (k.stages.length && !k.stages.includes(c)) lacks.push(`stage \`${c}\` of \`${k.kind}\``);
  }
  for (const e of EVENTS) if (!events.some((x) => x.event === e)) lacks.push(`event \`${e}\``);
  for (const t of ['reasons', 'pays', 'sources']) if (!reg[t].length) lacks.push(t);
  if (steps.length !== 5) lacks.push('the five steps');
  if (lacks.length) throw new Error(`register ${file} lacks: ${lacks.join(', ')}`);
  return reg;
}

/* ---------- the card: OPS-018's tables ---------- */

/**
 * What the house holds (OPS-018): one row per requirement a call usually
 * asks, each marked `decides` with its place in the card's list of what
 * decides most calls (null when it is not on it), the turnover ceiling a
 * tender's asked turnover is held against, and the patterns a sweep skips.
 * Read from the card's own tables, so the card is the one source. A missing
 * file reads as an empty card; a deciding name with no row throws (exit 2).
 */
export function loadCard(file = DEFAULT_CARD) {
  if (!existsSync(file)) return { requirements: [], turnoverCeiling: null, outOfDomain: [], named: [] };
  const text = readFileSync(file, 'utf8');
  const fig = Object.fromEntries(tableUnder(text, 'The figures the tool reads').map(([k, v]) => [String(k).toLowerCase(), Number(String(v).replace(/[^\d.]/g, ''))]));
  const key = (s) => String(s ?? '').trim().toLowerCase();
  const requirements = tableUnder(text, 'The card').map(([requirement, asks, house, state, unlocks]) => ({
    requirement: requirement ?? '', asks: asks ?? '', house: house ?? '', state: tick(state).toLowerCase(), unlocks: unlocks ?? '', decides: null,
  }));
  /* The requirements that decide most calls, as the card lists them: each
     row gets its place in that list (1, 2, …), the rest stay null. A name
     the card does not hold is an error, not a silent skip — the short list
     must never drift from the rows it points at. */
  firsts(tableUnder(text, 'What decides most calls')).forEach((name, i) => {
    const row = requirements.find((q) => key(q.requirement) === key(name));
    if (!row) throw new Error(`card ${file}: What decides most calls names "${name}", which is not a requirement of the card`);
    row.decides = i + 1;
  });
  return {
    requirements,
    turnoverCeiling: Number.isFinite(fig['turnover ceiling']) && fig['turnover ceiling'] > 0 ? fig['turnover ceiling'] : null,
    outOfDomain: tableUnder(text, 'What the house makes, and what it does not').map(([pattern, why]) => ({ pattern, why })),
    /* OPP-006: the only people a public record may name — the house's own and
       clients whose signed agreement allows it */
    named: firsts(tableUnder(text, 'Who may be named')).filter(Boolean),
  };
}

/** A title the card puts out of the house's domain, or null. */
export function outOfDomain(title, card) {
  const t = String(title ?? '').toLowerCase();
  return (card.outOfDomain ?? []).find((p) => t.includes(String(p.pattern).toLowerCase())) ?? null;
}

/* ---------- reading a record's body ---------- */

/**
 * The timeline (OPP-005): every line under `## Timeline` that starts with
 * `- `, read as `- YYYY-MM-DD · EVENT · text`. A `lost` line's first field
 * after the event is its reason. A text that opens with a backticked word
 * moves the record to that stage; a `won` or `lost` line moves it to `won`
 * or `lost`. A line that does not parse is returned with `bad` set, so the
 * validator can name it instead of skipping it silently.
 */
export function timelineOf(text) {
  const lines = section(bodyOf(text), 'Timeline');
  if (!lines) return null;
  return lines.filter((l) => l.startsWith('- ')).map((raw) => {
    const parts = raw.slice(2).split(SEP);
    const [date, event] = [parts[0]?.trim() ?? '', parts[1]?.trim() ?? ''];
    let rest = parts.slice(2);
    let reason = null;
    if (event === 'lost' && rest.length) { reason = rest[0].trim(); rest = rest.slice(1); }
    let body = rest.join(SEP).trim();
    let stage = null;
    const tok = /^`([^`]+)`\s*/.exec(body);
    if (tok) { stage = tok[1].trim(); body = body.slice(tok[0].length); }
    if (CLOSED.includes(event)) stage = event;
    const bad = !ISO_DATE.test(date) || parts.length < 3 ? raw : null;
    return { date, event, stage, reason, text: body, ...(bad ? { bad } : {}) };
  });
}

/**
 * The criteria table of a call (OPP-013): [{requirement, asks, house, meets}].
 * The last cell is the verdict and the first names the requirement, which
 * the card's rows name too.
 */
export function criteriaOf(text) {
  if (!section(bodyOf(text), 'Criteria')) return null;
  return tableUnder(text, 'Criteria').map((c) => ({
    requirement: c[0] ?? '', asks: c[1] ?? '', house: c[2] ?? '', meets: tick(c[c.length - 1]).toLowerCase(),
  }));
}

const days = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

/**
 * Walk the timeline against the kind's stages: where the record stands,
 * the furthest open stage it reached, the day it entered each stage, and
 * every breach of the grammar met on the way (OPP-003, OPP-004, OPP-005).
 */
export function walk(events, stages, reg) {
  const bad = [];
  const F = (plate, what) => bad.push({ plate, what });
  const known = new Set(reg.events.map((e) => e.event));
  let stage = stages[0] ?? null, reached = stage;
  const entered = stage && events[0] ? [{ stage, date: events[0].date }] : [];
  let closedAt = null, reason = null;
  const real = events.filter((e) => e.event !== 'next');
  let prev = null; // the last line that parsed: a bad line is named once, not again as out of order
  events.forEach((e, i) => {
    if (e.bad) { F('OPP-005', `timeline line "${e.bad}" is not "- YYYY-MM-DD · event · text"`); return; }
    if (!known.has(e.event)) { F('OPP-005', `timeline event "${e.event}" is not one of ${reg.events.map((x) => x.event).join(' · ')}`); return; }
    if (prev && e.date < prev) F('OPP-005', `timeline line of ${e.date} comes after one of ${prev} — the lines go in date order`);
    prev = e.date;
    if (closedAt && e.event !== 'next') F('OPP-005', `a \`${e.event}\` line after the record closed on ${closedAt} — a closed record that reopens is a new record that follows it`);
    if (e.event === 'next') {
      if (e.stage) F('OPP-003', `a \`next\` line carries the stage \`${e.stage}\` — a planned step moves nothing until it happens`);
      return;
    }
    if (e.event === 'lost') {
      if (!reg.reasons.includes(e.reason)) F('OPP-003', `lost with reason "${e.reason ?? ''}", not one of ${reg.reasons.join(' · ')}`);
      reason = e.reason;
    }
    if (!e.stage) return;
    const at = stages.indexOf(e.stage);
    if (at < 0) { F('OPP-003', `stage \`${e.stage}\` is not a stage of a ${stages.kind ?? 'record of this kind'}: ${stages.join(' · ')}`); return; }
    if (CLOSED.includes(e.stage) && !CLOSED.includes(e.event)) { F('OPP-003', `stage \`${e.stage}\` written as a token — a record closes only by a \`${e.stage}\` line`); return; }
    if (!CLOSED.includes(e.stage) && at < stages.indexOf(stage)) { F('OPP-003', `stage \`${e.stage}\` on ${e.date} comes after \`${stage}\` — stages only move forward`); return; }
    if (e.stage !== stage) entered.push({ stage: e.stage, date: e.date });
    stage = e.stage;
    if (!CLOSED.includes(stage)) reached = stage;
    if (CLOSED.includes(e.event)) closedAt = e.date;
  });
  // OPP-005: the house detected it first, once
  const found = events.filter((e) => e.event === 'found');
  if (!events.length) F('OPP-005', 'the timeline has no line — the first is the `found` line');
  else if (events[0].event !== 'found') F('OPP-005', `the timeline opens with \`${events[0].event}\`, not \`found\` — the first line is the day the house detected it`);
  if (found.length > 1) F('OPP-005', `${found.length} \`found\` lines — a record is found once`);
  // OPP-004: an open record knows its one next step, written last; a closed one has none
  const nexts = events.filter((e) => e.event === 'next');
  if (!closedAt) {
    if (nexts.length !== 1) F('OPP-004', `an open record with ${nexts.length} \`next\` lines — it has exactly one`);
    else if (events[events.length - 1].event !== 'next') F('OPP-004', 'the `next` line is not the last — the planned step comes after everything that happened');
  } else if (nexts.length) F('OPP-004', 'a closed record with a `next` line — nothing is planned after it closed');
  const next = !closedAt && nexts.length ? { date: nexts[nexts.length - 1].date, action: nexts[nexts.length - 1].text } : null;
  const last = real.length ? real[real.length - 1].date : null;
  return { stage, reached, entered, closed: closedAt, reason, next, last, bad };
}

/* ---------- validation ---------- */

/** Validate one record against STD-039. Returns the list of breaches (plate + what). */
export function validate(rec, reg, card = { requirements: [], turnoverCeiling: null, outOfDomain: [], named: [] }) {
  const { fm, file, text } = rec;
  const bad = [];
  const F = (plate, what) => bad.push({ plate, what, file });
  if (!fm) { F('OPP-001', 'no frontmatter'); return bad; }

  /* OPP-001: one file per opportunity, named by its id */
  if (!ID_RE.test(fm.id ?? '')) F('OPP-001', `id "${fm.id ?? ''}" is not OPP-YYYY-NNN`);
  if (fm.id && path.basename(file, '.md') !== fm.id) F('OPP-001', `file is named "${path.basename(file)}", its id is "${fm.id}"`);

  /* OPP-002: the header carries the fields the pipeline needs, and only those */
  for (const k of REQUIRED) if (!(k in fm)) F('OPP-002', `header lacks \`${k}\``);
  for (const k of Object.keys(fm)) {
    if (COMPUTED[k]) F('OPP-009', `header carries \`${k}\` — ${COMPUTED[k]}; it is computed, never typed`);
    else if (RENAMED[k]) F('OPP-002', `header carries \`${k}\` — ${RENAMED[k]}`);
    else if (!ALLOWED.has(k)) F('OPP-006', `header carries \`${k}\`, not a field of the record — a name or an address belongs nowhere in it`);
  }

  /* OPP-003: the kind comes from the register */
  const kind = fm.kind;
  const stages = reg.stages[kind];
  if (kind !== undefined && !stages) F('OPP-003', `kind "${kind}" is not one of ${reg.kinds.map((k) => k.kind).join(' · ')}`);
  for (const [k, kinds] of Object.entries(ONLY))
    if (fm[k] !== undefined && stages && !kinds.includes(kind)) F(ONLY_PLATE[k] ?? 'OPP-014', `\`${k}\` on a ${kind} — it belongs to a ${kinds.join(' or a ')}`);

  const among = (k, list, plate = 'OPP-002') => { if (fm[k] !== undefined && !list.includes(fm[k])) F(plate, `${k} "${fm[k]}" is not one of ${list.join(' · ')}`); };
  among('source', reg.sources);
  among('pays', reg.pays);
  among('contact_channel', CHANNELS);
  among('disclosure', DISCLOSURES, 'OPP-011');
  if (fm.currency !== undefined && fm.currency !== 'EUR') F('OPP-002', `currency "${fm.currency}" — values are kept in EUR, so they add up`);
  if (fm.value !== undefined && !NUMBER.test(fm.value)) F('OPP-002', `value "${fm.value}" is not a number (before tax)`);
  if (fm.opened !== undefined && !ISO_DATE.test(fm.opened)) F('OPP-002', `opened "${fm.opened}" is not a date`);
  if (fm.offer !== undefined && !/^OPS-\d{3}$/.test(fm.offer)) F('OPP-002', `offer "${fm.offer}" is not an offer record (OPS-NNN)`);
  if (['sale', 'tender'].includes(kind) && !fm.offer) F('OPP-002', `a ${kind} with no \`offer\` — name the offer record it sells`);
  if (fm.follows !== undefined && !ID_RE.test(fm.follows)) F('OPP-002', `follows "${fm.follows}" is not a record's id`);

  /* how it pays: the share before the work, when the work is paid in parts */
  if (fm.advance !== undefined && (!NUMBER.test(fm.advance) || Number(fm.advance) > 100)) F('OPP-002', `advance "${fm.advance}" is a share of the value: 0 to 100`);
  if (['advance', 'milestones'].includes(fm.pays) && fm.advance === undefined) F('OPP-002', `paid by ${fm.pays} with no \`advance\` — the share paid before the work`);
  if (fm.pays === 'advance' && fm.advance !== undefined && !(Number(fm.advance) > 0)) F('OPP-002', 'paid in advance, yet nothing paid before the work');
  if (fm.pays === 'on-justification' && Number(fm.advance) > 0) F('OPP-002', 'paid on justification, yet a share in advance');

  /* OPP-005, OPP-004, OPP-003: the timeline drives the stage */
  const events = timelineOf(text);
  let w = null;
  if (!events) F('OPP-005', 'no `## Timeline` — one line per thing that happened, `- YYYY-MM-DD · event · text`');
  else if (stages) {
    w = walk(events, Object.assign([...stages], { kind }), reg);
    for (const b of w.bad) F(b.plate, b.what);
  }
  const stage = w?.stage;

  /* a sale: the proposal once proposed, the decider from agreed, the agreement at won */
  if (kind === 'sale' && w) {
    const at = (s) => stages.indexOf(w.reached) >= stages.indexOf(s) || w.stage === 'won';
    if (at(SALE_PROPOSED) && !fm.proposal) F('OPP-002', `a sale that reached \`${SALE_PROPOSED}\` with no \`proposal\` path`);
    if ([SALE_AGREED, 'won'].includes(stage) && !fm.decider_role) F('OPP-003', `a sale at \`${stage}\` with no decider role — who signs for the client is known by the time they agree`);
    if (stage === 'won' && !fm.agreement) F('OPP-010', 'a sale won with no agreement path');
  }

  /* OPP-012: a call links where it is published */
  if (CALLS.includes(kind)) {
    if (!fm.call && !(kind === 'tender' && fm.procedure === 'minor')) F('OPP-012', `a ${kind} with no \`call\` — the address of the notice or the call's page`);
    if (fm.call && !URL_RE.test(fm.call)) F('OPP-012', `call "${fm.call}" is not an address`);
    if (!fm.closes) F('OPP-012', `a ${kind} with no \`closes\` — the day offers or applications close`);
    for (const k of ['closes', 'opens', 'starts']) if (fm[k] && !ISO_DATE.test(fm[k])) F('OPP-012', `${k} "${fm[k]}" is not a date`);
    /* OPP-014: the verdict rests on the call's own words */
    if (!fm.read_from) F('OPP-014', `a ${kind} that does not say where it was read — ${reg.readFrom.join(' · ')}`);
    else if (!reg.readFrom.includes(fm.read_from)) F('OPP-014', `read_from "${fm.read_from}" is not one of ${reg.readFrom.join(' · ')} — a summary is never enough to record`);
  }
  if (kind === 'tender') {
    if (!fm.procedure) F('OPP-012', 'a tender with no procedure — the register names how a public buyer purchases');
    else among('procedure', reg.procedures, 'OPP-012');
    if (!fm.object) F('OPP-014', `a tender that does not say what the buyer really buys — ${reg.objects.join(' · ')}`);
    else if (!reg.objects.includes(fm.object)) F('OPP-014', `object "${fm.object}" is not one of ${reg.objects.join(' · ')} — the house does not record what it does not make`);
    for (const k of ['turnover_asked', 'works_asked']) if (fm[k] !== undefined && !NUMBER.test(fm[k])) F('OPP-014', `${k} "${fm[k]}" is not a number`);
    if (card.turnoverCeiling !== null && Number(fm.turnover_asked) > card.turnoverCeiling)
      F('OPP-014', `turnover asked ${Number(fm.turnover_asked).toLocaleString('en-GB')} € is above the card's ${card.turnoverCeiling.toLocaleString('en-GB')} € — not recorded; bid as a partner instead (kind partner)`);
    /* OPP-015: the file reference is what makes two listings one tender */
    if (!fm.file_ref) F('OPP-015', 'a tender with no file reference — the buyer\'s file number');
  }
  if (kind === 'grant') {
    if (!fm.instrument) F('OPP-012', `a grant with no instrument — ${reg.instruments.join(' · ')}`);
    else among('instrument', reg.instruments, 'OPP-012');
    if (fm.estimated !== undefined && !['yes', 'no'].includes(fm.estimated)) F('OPP-012', `estimated "${fm.estimated}" is yes or no`);
    if (fm.estimated === 'yes' && stage && stage !== stages[0] && !CLOSED.includes(stage)) F('OPP-012', `stage \`${stage}\` but the days are still estimated — the call is out: read its days and write estimated: "no"`);
  }

  /* OPP-013: a call is read against the card; only what passes is recorded */
  const crit = criteriaOf(text);
  if (CALLS.includes(kind) && (!crit || !crit.length)) F('OPP-013', 'no criteria table — a "## Criteria" table: Requirement · The call asks · We have · Meets');
  for (const c of crit ?? []) {
    if (c.meets === 'no') F('OPP-013', `requirement "${c.requirement}" is not met — a call that fails a requirement is not recorded — take what it taught to the card (OPS-018) and delete the record`);
    else if (!MEETS.includes(c.meets)) F('OPP-013', `requirement "${c.requirement}" says "${c.meets}" — meets is one of ${MEETS.join(' · ')}`);
  }

  /* OPP-006: nobody's e-mail or phone, anywhere in a public record */
  const body = text.replace(/^---\s*\n[\s\S]*?\n---/, '');
  if (EMAIL_RE.test(text)) F('OPP-006', 'an e-mail address is in the record — a person is identified; keep it where the conversation happened');
  if (PHONE_RE.test(body.replace(NOT_A_PHONE, ' '))) F('OPP-006', 'a phone number is in the record — a person is identified; keep it where the conversation happened');
  for (const n of personNames(text, card.named)) F('OPP-006', `"${n}" reads as a person's name — write the role; only the card's "Who may be named" passes`);

  /* OPP-011: the organisation, named when it knows — a public funder or a
     buyer that published its own call may always be named */
  const named = fm.organisation && !CALLS.includes(kind) && !SECTOR_WORDS.test(fm.organisation);
  if (named && stage === 'lost') F('OPP-011', `organisation "${fm.organisation}" reads as a name in a lost record — a lost one is kept by sector and size ("a large retailer"); the reason is public, the name is not`);
  else if (named && fm.disclosure !== 'open') F('OPP-011', `organisation "${fm.organisation}" reads as a name; without \`disclosure: open\` it is a sector and a size ("a large retailer")`);
  return bad;
}

/** Read every OPP-*.md in `folder` into records (proposals, README and moulds skipped). */
export function readFolder(folder) {
  return readdirSync(folder).filter((f) => /^OPP-.*\.md$/.test(f)).sort().map((f) => {
    const file = path.join(folder, f);
    const text = readFileSync(file, 'utf8');
    return { file, text, fm: parseFM(text) };
  });
}

/**
 * Checks that need the whole folder: OPP-015, two tender records with the
 * same file reference and value are one call listed twice; OPP-002, a
 * `follows` names a record that exists.
 */
export function duplicates(records) {
  const seen = new Map(), bad = [];
  const ids = new Set(records.map((r) => r.fm?.id).filter(Boolean));
  for (const r of records) {
    const fm = r.fm; if (!fm) continue;
    if (fm.follows && !ids.has(fm.follows)) bad.push({ plate: 'OPP-002', what: `follows "${fm.follows}", a record that is not in the folder`, file: r.file });
    if (fm.kind !== 'tender' || !fm.file_ref) continue;
    const key = `${fm.file_ref.replace(/[\s⁄/]+/g, '/').toLowerCase()}|${Number(fm.value) || 0}`;
    if (seen.has(key)) bad.push({ plate: 'OPP-015', what: `${fm.id} has the same file "${fm.file_ref}" and value as ${seen.get(key)} — one call, two listings: keep one record`, file: r.file });
    else seen.set(key, fm.id);
  }
  return bad;
}

/* ---------- proposals (STD-040, the mechanical rows) ---------- */

const PRP_SECTIONS = ['Objectives', 'Why us', 'How it teaches, and how it measures', 'Price, terms and conditions', 'Before you agree', 'The three questions', 'In the open'];

export function validateProposal(file, text, named = []) {
  const bad = [];
  const F = (plate, what) => bad.push({ plate, what, file });
  const fm = parseFM(text);
  if (!fm) { F('PRP-001', 'no frontmatter'); return bad; }
  const body = text.replace(/^---\s*\n[\s\S]*?\n---/, '');
  const heads = [...body.matchAll(/^## (?:\d+\.\s+)?(.+)$/gm)].map((m) => m[1].trim());
  const plates = ['PRP-001', 'PRP-002', 'PRP-003', 'PRP-004', 'PRP-005', 'PRP-006', 'PRP-010'];
  PRP_SECTIONS.forEach((s, i) => { if (!heads.includes(s)) F(plates[i], `no section "${s}"`); });
  if (!LEVELS.includes(fm.level)) F('PRP-003', `level "${fm.level}" is not one of ${LEVELS.join(' · ')}`);
  if (!NUMBER.test(fm.tax_rate ?? '')) F('PRP-004', 'no tax rate in the header');
  if (!NUMBER.test(fm.price ?? '')) F('PRP-004', 'no price in the header');
  if (/…/.test(body.slice(body.indexOf('## The three questions')))) F('PRP-006', 'the three questions still hold the mould\'s ellipsis');
  /* OPP-006 holds for a proposal too: it is public like its record */
  if (EMAIL_RE.test(text)) F('OPP-006', 'an e-mail address is in the proposal — a person is identified');
  for (const n of personNames(text, named)) F('OPP-006', `"${n}" reads as a person's name — write the role; only the card's "Who may be named" passes`);
  return bad;
}

/* ---------- the figures ---------- */

const avg = (a) => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : null);
const num = (v) => (v === undefined || v === null || v === '' ? null : Number(v));
const or = (v) => (v === undefined ? null : v);

/**
 * Everything a page, a sheet or a report shows, computed from the records.
 * The shape is the contract STD-039 OPP-009 names; the site reads it as is
 * and never recomputes a verdict (overdue, stale, chance) from dates.
 */
export function figures(records, reg, card, today) {
  card ??= { requirements: [], turnoverCeiling: null, outOfDomain: [] };
  const kindOf = Object.fromEntries(reg.kinds.map((k) => [k.kind, k]));
  const followed = new Set(records.map((r) => r.fm?.follows).filter(Boolean));
  const stepNames = reg.steps.map((s) => s.step);
  const stepOf = Object.fromEntries(reg.events.map((e) => [e.event, e.step]));
  const out = [];
  for (const r of records) {
    const fm = r.fm; if (!fm || !kindOf[fm.kind]) continue;
    const k = kindOf[fm.kind];
    const events = (timelineOf(r.text) ?? []).filter((e) => !e.bad);
    const w = walk(events, k.stages, reg);
    const open = !CLOSED.includes(w.stage);
    const since = w.last ? days(w.last, today) : null;
    const stale = open && k.stale !== null && since !== null && since > k.stale ? { days: since, limit: k.stale } : null;
    /* the five steps: each event marks its step (the register's events
       table); a later step implies the earlier ones, among the first four.
       `again` is another record's `follows`, and implies nothing — a lost
       client may still send a referral. */
    const steps = Object.fromEntries(stepNames.map((s) => [s, false]));
    for (const e of events) if (stepOf[e.event] && e.event !== 'next') steps[stepOf[e.event]] = true;
    const chain = stepNames.filter((s) => s !== 'again');
    for (let i = chain.length - 1; i > 0; i--) if (steps[chain[i]]) steps[chain[i - 1]] = true;
    if ('again' in steps) steps.again = followed.has(fm.id);
    const crit = criteriaOf(r.text) ?? [];
    const chance = CALLS.includes(fm.kind) && crit.length ? (crit.every((c) => c.meets === 'yes') ? 'high' : 'medium') : null;
    out.push({
      id: fm.id, kind: fm.kind, title: or(fm.title), organisation: or(fm.organisation), sector: or(fm.sector), source: or(fm.source),
      offer: or(fm.offer), value: Number(fm.value) || 0, currency: or(fm.currency), pays: or(fm.pays), advance: num(fm.advance),
      stage: w.stage, open, opened: or(fm.opened), closed: w.closed, reason: w.reason,
      next: w.next, overdue: !!(open && w.next && w.next.date < today), stale,
      events: events.map(({ date, event, stage, reason, text }) => ({ date, event, stage, reason, text })),
      steps, chance, criteria: crit,
      call: or(fm.call), closes: or(fm.closes), opens: or(fm.opens), estimated: or(fm.estimated), procedure: or(fm.procedure),
      instrument: or(fm.instrument), file_ref: or(fm.file_ref), gives_back: or(fm.gives_back), follows: or(fm.follows),
      _entered: w.entered,
    });
  }
  out.sort((a, b) => a.id.localeCompare(b.id));

  const due = out.filter((x) => x.open && x.next).map((x) => ({ id: x.id, kind: x.kind, date: x.next.date, action: x.next.action, overdue: x.overdue }))
    .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  /* the funnel per kind: how many records reached each step, and the share
     of the step before that reached this one, rounded to a whole per cent;
     null for the first step and wherever the step before is empty */
  const count = (xs) => {
    const counts = stepNames.map((s) => xs.filter((x) => x.steps[s]).length);
    return { counts, conversion: counts.map((n, i) => (i && counts[i - 1] ? Math.round((100 * n) / counts[i - 1]) : null)) };
  };
  const funnel = { all: count(out), ...Object.fromEntries(reg.kinds.map((k) => [k.kind, count(out.filter((x) => x.kind === k.kind))])) };
  const byKind = Object.fromEntries(reg.kinds.map((k) => {
    const xs = out.filter((x) => x.kind === k.kind);
    return [k.kind, { records: xs.length, open: xs.filter((x) => x.open).length, won: xs.filter((x) => x.stage === 'won').length,
      lost: xs.filter((x) => x.stage === 'lost').length, openValue: xs.filter((x) => x.open).reduce((a, x) => a + x.value, 0) }];
  }));
  const reasons = {};
  for (const x of out) if (x.stage === 'lost' && x.reason) reasons[x.reason] = (reasons[x.reason] ?? 0) + 1;
  /* days in each stage: from the day a record entered it to the day it
     entered the next; a stage still running is not counted yet */
  const daysPerStage = Object.fromEntries(reg.kinds.map((k) => {
    const spans = Object.fromEntries(k.stages.filter((s) => !CLOSED.includes(s)).map((s) => [s, []]));
    for (const x of out.filter((y) => y.kind === k.kind))
      for (let i = 1; i < x._entered.length; i++) spans[x._entered[i - 1].stage]?.push(days(x._entered[i - 1].date, x._entered[i].date));
    return [k.kind, Object.fromEntries(Object.entries(spans).map(([s, a]) => [s, avg(a)]))];
  }));
  /* the card, with how many open records still hinge on each requirement */
  const openCrit = out.filter((x) => x.open).flatMap((x) => x.criteria);
  const cardRows = (card.requirements ?? []).map((q) => {
    const named = openCrit.filter((c) => c.requirement.trim().toLowerCase() === q.requirement.trim().toLowerCase());
    return { ...q, yes: named.filter((c) => c.meets === 'yes').length, check: named.filter((c) => c.meets === 'check').length };
  });
  for (const x of out) delete x._entered;
  return {
    today,
    kinds: reg.kinds.map(({ kind, is, stale, stages }) => ({ kind, is, stale, stages })),
    steps: reg.steps,
    records: out,
    due,
    funnel,
    byKind,
    reasons: Object.fromEntries(Object.entries(reasons).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))),
    daysPerStage,
    card: cardRows,
    ceiling: card.turnoverCeiling ?? null,
    overdue: out.filter((x) => x.overdue).map((x) => x.id),
    stale: out.filter((x) => x.stale).map((x) => ({ id: x.id, ...x.stale })),
  };
}

/* ---------- the report ---------- */

const money = (n) => `${Math.round(n).toLocaleString('en-GB')} EUR`;
const pays = (x) => (x.pays === 'advance' || x.pays === 'milestones' ? `${x.pays}, ${x.advance ?? 0} % before the work` : x.pays ?? '—');

export function report(fig, reg) {
  const L = [];
  const open = fig.records.filter((x) => x.open);
  L.push(`# Pipeline — ${fig.today}`, '', `${fig.records.length} records, ${open.length} open, ${money(open.reduce((a, x) => a + x.value, 0))} open value.`, '');
  L.push('## By kind', '', '| Kind | Records | Open | Won | Lost | Open value |', '|---|---|---|---|---|---|');
  for (const k of fig.kinds) { const b = fig.byKind[k.kind]; L.push(`| \`${k.kind}\` | ${b.records} | ${b.open} | ${b.won} | ${b.lost} | ${money(b.openValue)} |`); }
  L.push('', '## What\'s due', '');
  if (!fig.due.length) L.push('Nothing is open.');
  else {
    L.push('| Date | Record | Kind | Next step |', '|---|---|---|---|');
    for (const d of fig.due) L.push(`| ${d.date}${d.overdue ? ' (overdue)' : ''} | ${d.id} | \`${d.kind}\` | ${d.action} |`);
  }
  L.push('', '## Needs a move', '');
  if (!fig.overdue.length && !fig.stale.length) L.push('Nothing overdue, nothing stale.');
  for (const id of fig.overdue) { const x = fig.records.find((r) => r.id === id); L.push(`- **${id}** overdue since ${x.next.date}: ${x.next.action}`); }
  for (const s of fig.stale) { const x = fig.records.find((r) => r.id === s.id); L.push(`- **${s.id}** stale: ${s.days} days since the last line, at \`${x.stage}\` (limit ${s.limit})`); }
  L.push('', '## Every record', '', '| Record | Kind | Organisation | Stage | Value | Pays | Chance |', '|---|---|---|---|---|---|---|');
  for (const x of fig.records) L.push(`| ${x.id} | \`${x.kind}\` | ${x.organisation ?? '—'} | \`${x.stage}\`${x.reason ? ` (${x.reason})` : ''} | ${money(x.value)} | ${pays(x)} | ${x.chance ? `\`${x.chance}\`` : '—'} |`);
  L.push('', '## Funnel', '', `| Kind | ${fig.steps.map((s) => s.step).join(' | ')} |`, `|---|${fig.steps.map(() => '---').join('|')}|`);
  for (const [k, f] of Object.entries(fig.funnel))
    L.push(`| ${k === 'all' ? '**all**' : `\`${k}\``} | ${f.counts.map((n, i) => (f.conversion[i] === null ? String(n) : `${n} (${f.conversion[i]} %)`)).join(' | ')} |`);
  L.push('', 'In brackets, the share of the step before that reached this step.');
  L.push('', '## Reasons lost', '');
  if (!Object.keys(fig.reasons).length) L.push('Nothing lost yet.');
  else { L.push('| Reason | Records |', '|---|---|'); for (const [r, n] of Object.entries(fig.reasons)) L.push(`| \`${r}\` | ${n} |`); }
  L.push('', '## Days per stage', '', '| Kind | Stage | Average days |', '|---|---|---|');
  for (const [k, st] of Object.entries(fig.daysPerStage)) for (const [s, d] of Object.entries(st)) L.push(`| \`${k}\` | \`${s}\` | ${d ?? '—'} |`);
  if (fig.card.length) {
    L.push('', '## Asked, and what the house holds', '', 'Decides: the row\'s place among the requirements that decide most calls.', '',
      '| Requirement | Usually asked | The house holds | State | Open records at yes | At check | What unlocks it | Decides |', '|---|---|---|---|---|---|---|---|');
    for (const c of fig.card) L.push(`| ${c.requirement} | ${c.asks} | ${c.house} | \`${c.state}\` | ${c.yes} | ${c.check} | ${c.unlocks} | ${c.decides ?? ''} |`);
  }
  return L.join('\n') + '\n';
}

/* ---------- main ---------- */

function main(argv) {
  const args = argv.slice(2);
  const flag = (n) => { const i = args.indexOf(n); return i < 0 ? null : (args.splice(i, 2)[1] ?? null); };
  const has = (n) => { const i = args.indexOf(n); if (i < 0) return false; args.splice(i, 1); return true; };
  const today = flag('--today') ?? new Date().toISOString().slice(0, 10);
  const registerPath = flag('--register') ?? DEFAULT_REGISTER;
  const cardFlag = flag('--card');
  const json = has('--json'), proposals = has('--proposals');
  const folder = args[0];
  if (!folder || !existsSync(folder) || !statSync(folder).isDirectory()) {
    console.error('usage: node pipeline.mjs <folder> [--json] [--proposals] [--today YYYY-MM-DD] [--register PATH] [--card PATH]');
    return 2;
  }
  // a card named on the command line must exist; the default may be absent
  // in a consumer repository, and then reads as an empty card
  if (cardFlag && !existsSync(cardFlag)) { console.error(`card not found: ${cardFlag}`); return 2; }
  let reg;
  try { reg = loadRegister(registerPath); } catch (e) { console.error(String(e.message)); return 2; }
  let card;
  try { card = loadCard(cardFlag ?? DEFAULT_CARD); } catch (e) { console.error(String(e.message)); return 2; }
  const records = readFolder(folder);
  const bad = [...records.flatMap((r) => validate(r, reg, card)), ...duplicates(records)];
  if (proposals) for (const r of records) {
    if (!r.fm?.proposal) continue;
    const p = path.resolve(path.dirname(r.file), r.fm.proposal);
    if (!existsSync(p)) { bad.push({ plate: 'PRP-009', what: `proposal "${r.fm.proposal}" not found`, file: r.file }); continue; }
    bad.push(...validateProposal(p, readFileSync(p, 'utf8'), card.named));
  }
  if (bad.length) {
    console.error(`${bad.length} breach(es):`);
    for (const b of bad) console.error(`  ${b.plate}  ${path.relative(process.cwd(), b.file)}: ${b.what}`);
    return 1;
  }
  const fig = figures(records, reg, card, today);
  process.stdout.write(json ? JSON.stringify(fig, null, 2) + '\n' : report(fig, reg));
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv));

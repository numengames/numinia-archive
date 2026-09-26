#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-007-one-page — the guard of STD-007.
//
// One page per document: a rule-shaped title, a three-part card, a scope
// line, plated rules before reasons, a body that fits its series' budget,
// and prose that names things instead of coding them. Form is MUST and
// answers to the regime; every size limit is a SHOULD, measured and
// counted but never handed to it — a guard that blocks on a SHOULD teaches
// people to ignore it.
//
// DOC-001  title ≤ 5 words                              SHOULD
// DOC-002  card: Summary / Epistemic / Pragmatic         present (MUST), ≤ 40 words each (SHOULD)
// DOC-003  scope: Binds / Does not bind                 present (MUST), ≤ 15 words each (SHOULD)
// DOC-004  ≥ 1 plated rule in standards & protocols     MUST — a plate in a rule
//          title, or in the first column of the `## Check` table (platesIn)
// DOC-005  Why ≤ 80 words                               SHOULD
// DOC-006  body ≤ the series' budget                    SHOULD
// DOC-007  References ≤ 5 rows                          SHOULD
// DOC-008  standards/ prose: no bare series id outside the References table
//          and the `## Check` table rows,
//          no §N section pointer anywhere, no id used but never listed
//
// Body = from the scope line (or the end of the card) to `## References`.
// DOC-009/010 (registers, no history) belong to check-templates. Whether a
// rule is one obligation, or a document is readable start to finish, is
// editorial and not measured.
//
// Run from anywhere: node machine/guards/rules/std-007-one-page.mjs

import { execute, isMain } from '../lib/guard.mjs';
import { stripFM, rawFM, isApparatus, isTemplate } from '../../scripts/lib/frontmatter.mjs';
import { platesIn } from '../../scripts/lib/regime.mjs';

export const meta = {
  family: 'DOC',
  plates: ['DOC-001', 'DOC-002', 'DOC-003', 'DOC-004', 'DOC-005', 'DOC-006', 'DOC-007', 'DOC-008'],
};

// The word budget per series. Moves to the Series register when that exists.
const BUDGET = {
  standards: 500, protocols: 500, decisions: 500, missions: 500,
  debt: 300, guilds: 300,
  reports: 1000, blueprints: 1000,
  canon: 1500,
};
const CAP = { title: 5, card: 40, scope: 15, why: 80, refs: 5 };
const NEEDS_PLATES = new Set(['standards', 'protocols']);

const words = (s) => (s.trim() ? s.trim().split(/\s+/).length : 0);

// Card parts are consecutive `> ` lines; a part runs from its `**Name:**`
// line to the next `**Other:**` line or the end of the blockquote. Parsed
// line by line — no backtracking regex over the whole body (CodeQL ReDoS).
function cardParts(body) {
  const parts = {};
  let current = null;
  for (const raw of body.split('\n')) {
    if (!raw.startsWith('>')) { if (current) break; continue; }
    const line = raw.replace(/^>\s?/, '');
    const head = /^\*\*(\w+):\*\*\s*(.*)$/.exec(line);
    if (head) { current = head[1]; parts[current] = head[2]; continue; }
    if (current) parts[current] += ' ' + line;
  }
  return parts;
}

/* DOC-001..007: the shape of one governed document. Returns findings;
   `should: true` marks a size limit, which the regime never sees. */
function shape(rel, text, fm) {
  const out = [];
  const must = (plate, what) => out.push({ plate, what, where: rel });
  const should = (plate, what) => out.push({ plate, what, where: rel, should: true });
  const dir = rel.split('/')[0];
  const body = stripFM(text);
  const register = fm.subtype === 'register';

  // DOC-001 title
  const h1 = /^#\s+(.+)$/m.exec(body);
  const title = (h1 ? h1[1] : String(fm.title ?? '')).replace(/^[A-Z]{2,4}-\d{3,4}\s*[—–-]\s*/, '');
  const tw = words(title);
  if (tw > CAP.title) should('DOC-001', `S-01 title is ${tw} words (≤ ${CAP.title})`);

  // DOC-002 card
  const cp = cardParts(body);
  for (const part of ['Summary', 'Epistemic', 'Pragmatic']) {
    const p = cp[part] ?? null;
    if (p === null) {
      if (!(register && part !== 'Summary')) must('DOC-002', `S-02 card has no **${part}:**`);
      continue;
    }
    const n = words(p);
    if (n > CAP.card) should('DOC-002', `S-02 ${part} is ${n} words (≤ ${CAP.card})`);
  }

  // DOC-003 scope
  const binds = /^\*\*Binds:\*\*\s*(.+)$/m.exec(body);
  const notb = /^\*\*Does not bind:\*\*\s*(.+)$/m.exec(body);
  if (!register && NEEDS_PLATES.has(dir)) {
    if (!binds) must('DOC-003', 'S-03 no **Binds:** line');
    if (!notb) must('DOC-003', 'S-03 no **Does not bind:** line');
  }
  if (binds && words(binds[1]) > CAP.scope) should('DOC-003', `S-03 Binds is ${words(binds[1])} words (≤ ${CAP.scope})`);
  if (notb && words(notb[1]) > CAP.scope) should('DOC-003', `S-03 Does not bind is ${words(notb[1])} words (≤ ${CAP.scope})`);

  // Body: after scope (or card) up to ## References
  let start = 0;
  const cardEnd = body.search(/^(?!>)(?!\s*$)(?!#\s)/m);
  if (cardEnd > 0) start = cardEnd;
  const scopeEnd = notb ? notb.index + notb[0].length : (binds ? binds.index + binds[0].length : -1);
  if (scopeEnd > start) start = scopeEnd;
  let main = body.slice(start);
  main = main.replace(/^#\s+.+$/m, '');
  const refsIdx = main.search(/^##\s+(\d+\.\s+)?References\b/m);
  const core = refsIdx >= 0 ? main.slice(0, refsIdx) : main;
  const refs = refsIdx >= 0 ? main.slice(refsIdx) : '';

  // DOC-004 plates — in a rule title, or in the Check table's first column,
  // where a standard written for the narrator keeps them out of the reading.
  const plates = platesIn(core).length;
  if (!register && NEEDS_PLATES.has(dir) && plates === 0) must('DOC-004', 'S-04 no plate in a rule title (**AAA-NNN — …**) or in the ## Check table');

  // DOC-005 why — from `## Why` to the next `## `, scanned by line.
  {
    const lines = core.split('\n');
    const at = lines.findIndex((l) => /^##\s+(\d+\.\s+)?Why\b/.test(l));
    if (at >= 0) {
      const end = lines.findIndex((l, i) => i > at && /^##\s/.test(l));
      const n = words(lines.slice(at + 1, end < 0 ? undefined : end).join('\n'));
      if (n > CAP.why) should('DOC-005', `S-05 Why is ${n} words (≤ ${CAP.why})`);
    }
  }

  // DOC-006 body. Words inside <!-- --> comments are not prose.
  const budget = BUDGET[dir] ?? null;
  if (!register && budget) {
    let n = 0, inComment = false;
    for (const line of core.split('\n')) {
      if (inComment) { if (line.includes('-->')) inComment = false; continue; }
      if (line.includes('<!--')) { if (!line.includes('-->')) inComment = true; continue; }
      n += words(line);
    }
    if (n > budget) should('DOC-006', `S-06 body is ${n} words, budget ${budget} (+${Math.round((n / budget - 1) * 100)}%)`);
  }

  // DOC-007 references
  if (refsIdx >= 0) {
    const rows = refs.split('\n').filter((l) => /^\|\s*`?[A-Z]{2,4}-/.test(l)).length;
    if (rows > CAP.refs) should('DOC-007', `S-07 ${rows} references (≤ ${CAP.refs})`);
  }
  return out;
}

/* Every series prefix that can appear as a citation. Kept literal rather than
   derived from rules.json: this asks "does this look like an ID to a reader",
   which is a question about the text, not about what resolves. */
const ID = /\b(STD|PRO|ADR|CAN|DBT|MIS|RPT|BLU|OPS|SYS|HIS|D|S|P)-\d{3,4}\b/g;
const SECTION = /§\s*\d+(\.\d+)?/g;

/* A fenced code block is not prose — an example of a bad citation is how you
   teach the rule. Same for inline code spans, which is how STD-007 quotes the
   very tokens it bans. The header is masked, not cut, so line numbers stay true. */
function maskNonProse(text) {
  const raw = rawFM(text);
  let t = text;
  if (raw) {
    const head = text.slice(0, text.indexOf(raw) + raw.length + '\n---'.length);
    t = head.replace(/[^\n]/g, ' ') + text.slice(head.length);
  }
  return t
    .replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/`[^`\n]*`/g, (m) => ' '.repeat(m.length));
}

/* The rows of the `## Check` table are apparatus, like References: the plate,
   the outside source and the check that verifies it wait there so the reading
   stays free of codes. The line above the table is prose and stays scanned. */
function maskCheckTable(t) {
  const lines = t.split('\n');
  let inCheck = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) { inCheck = /^##\s+Check\s*$/.test(lines[i]); continue; }
    if (inCheck && lines[i].startsWith('|')) lines[i] = ' '.repeat(lines[i].length);
  }
  return lines.join('\n');
}

/* DOC-008: cite plates, not places. PW-01 a bare id in prose outside the
   References and Check tables; PW-02 a §N pointer anywhere, table included; PW-03 an id
   the body leans on that the table never lists. standards/ only: STD-007
   binds no other series. */
function plainWriting(rel, text) {
  const out = [];
  const prose = maskNonProse(text);
  const masked = maskCheckTable(prose);
  const m = masked.match(/^##\s+References\s*$/mi);
  const body = m ? masked.slice(0, m.index) : masked;
  const references = m ? masked.slice(m.index) : '';
  const lineOf = (idx) => masked.slice(0, idx).split('\n').length;
  const selfId = (rel.match(/\b([A-Z]{3}-\d{3,4})\b/) || [])[1];

  for (const s of prose.matchAll(SECTION)) out.push({ plate: 'DOC-008', what: `PW-02 ${s[0].trim()}`, where: `${rel}:${lineOf(s.index)}` });
  const used = new Set();
  for (const s of body.matchAll(ID)) {
    if (s[0] === selfId) continue;
    used.add(s[0]);
    out.push({ plate: 'DOC-008', what: `PW-01 ${s[0]}`, where: `${rel}:${lineOf(s.index)}` });
  }
  if (references) {
    const listed = new Set(Array.from(references.matchAll(ID), (s) => s[0]));
    for (const id of used) if (!listed.has(id)) out.push({ plate: 'DOC-008', what: `PW-03 ${id}`, where: `${rel}:-` });
  }
  return out;
}

export function run(corpus) {
  const findings = [];
  for (const rel of corpus.files) {
    const dir = rel.split('/')[0];
    if (!(dir in BUDGET)) continue;
    if (isApparatus(rel) || isTemplate(rel)) continue;
    if (/\/(INDEX|README)\.md$/.test(rel)) continue;
    const fm = corpus.fm(rel);
    if (!fm) continue;
    if (fm.status === 'withdrawn') continue;   // a withdrawn standard is a stub (STD-004)
    findings.push(...shape(rel, corpus.text(rel), fm));
  }
  for (const rel of corpus.files) {
    if (!rel.startsWith('standards/')) continue;
    findings.push(...plainWriting(rel, corpus.text(rel)));
  }
  return findings;
}

if (isMain(import.meta)) await execute(import.meta, meta, run);

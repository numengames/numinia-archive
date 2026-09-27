#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// regime.test.mjs — ENG-067: a guard bites by the state of its rule.
//
//   AGAINST THE TREE   every plate a guard emits resolves to a holder; every
//                      prefix has exactly one holder (a plate with two would
//                      have two states); every plate a regime guard emits
//                      resolves to a holder.
//   AGAINST A FIXTURE  an active holder enforces, a draft holder reports, an
//                      unheld plate never fails; finish() exits 1 only when an
//                      enforced finding exists, and 0 with findings under a
//                      draft. Exit is injected so the test observes the code.
//
// Run: npm test
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';
import * as regime from '../lib/regime.mjs';
const { loadHolders, holderOf, bindsFor, Findings, platesIn } = regime;

import test from 'node:test';
/* A case returns true, false, or a string: a string starting `skipped:` is a
   named skip; any other string is the reason it failed. */
const check = (name, fn) => test(name, (t) => {
  const r = fn();
  if (typeof r === 'string' && r.startsWith('skipped:')) return t.skip(r.slice(8).trim());
  if (r === false || typeof r === 'string') throw new Error(typeof r === 'string' ? r : 'returned false');
});

const index = loadHolders();

/* ---- against the tree ---- */

check('axis: every prefix has exactly one holder', () => {
  const bad = [...index.byPrefix].filter(([, s]) => s.size !== 1).map(([p, s]) => `${p}: ${[...s].join(', ')}`);
  return bad.length === 0 || bad.join('; ');
});

check('guards: every plate emitted by a regime guard has a holder', () => {
  /* Only guards that import regime.mjs are held to this; the others migrate
     in their own change and are listed here as they do. Build guards never do. */
  const dir = path.join(ROOT, 'machine', 'scripts');
  const unheld = [];
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.mjs'))) {
    const src = readFileSync(path.join(dir, f), 'utf8');
    if (!src.includes("lib/regime.mjs")) continue;
    /* A plate is what reaches out.add() — as a literal, or through a
       PLATE/RULES table. Any other quoted identifier is data, not a rule. */
    const literal = [...src.matchAll(/out\.add\(\s*'([A-Z]{2,4}-\d{3})'/g)].map((m) => m[1]);
    const tables = [...src.matchAll(/const (?:PLATE|RULES) = (\{[^}]*\}|\[[^\]]*\])/g)].flatMap((m) => [...m[1].matchAll(/:\s*'([A-Z]{2,4}-\d{3})'|'([A-Z]{2,4}-\d{3})'(?=\s*[,\]])/g)].map((x) => x[1] ?? x[2]));
    for (const p of new Set([...literal, ...tables]))
      if (!holderOf(p)) unheld.push(`${f}: ${p}`);
  }
  return unheld.length === 0 || unheld.join('; ');
});

check('tree: STD-004 and STD-012 are active — HDR-000, DEF-008 and DEF-009 bind (STD-012 in force 2026-09-27)', () => {
  for (const [plate, holder] of [['HDR-000', 'STD-004'], ['DEF-008', 'STD-012'], ['DEF-009', 'STD-012']]) {
    const b = bindsFor(plate);
    if (b.holder !== holder) return `${plate} holder ${b.holder}, want ${holder}`;
    if (!b.binds) return `${plate} does not bind: ${holder} is ${b.status}`;
  }
  return true;
});

/* ---- against a fixture ---- */

const fixture = {
  byPlate: new Map([['ACT-001', 'STD-900'], ['DRF-001', 'STD-901']]),
  byPrefix: new Map([['ACT', new Set(['STD-900'])], ['DRF', new Set(['STD-901'])]]),
  status: new Map([['STD-900', 'active'], ['STD-901', 'draft']]),
  title: new Map(),
};
const quiet = { log: () => {}, error: () => {} };
const run = (adds) => {
  const out = new Findings('fixture', { index: fixture, log: quiet });
  for (const a of adds) out.add(...a);
  let code = null;
  out.finish({ exit: (c) => { code = c; } });
  return { code, enforced: out.enforced.length, reported: out.reported.length };
};

check('fixture: prefix fallback resolves an undefined plate to its prefix holder', () => holderOf('ACT-099', fixture) === 'STD-900');
check('fixture: an unheld plate never binds', () => { const b = bindsFor('ZZZ-001', fixture); return b.binds === false && b.status === 'unheld'; });
check('fixture: a malformed plate is unheld', () => bindsFor('not-a-plate', fixture).status === 'unheld');
check('fixture: no findings → exit 0', () => run([]).code === 0);
check('fixture: a finding under a draft holder → reported, exit 0', () => { const r = run([['DRF-001', 'x', 'a.md']]); return r.code === 0 && r.reported === 1 && r.enforced === 0; });
check('fixture: a finding under an active holder → enforced, exit 1', () => { const r = run([['ACT-001', 'x', 'a.md']]); return r.code === 1 && r.enforced === 1; });
check('fixture: mixed → exit 1, counts split', () => { const r = run([['ACT-001', 'x', 'a.md'], ['DRF-001', 'y', 'b.md'], ['ZZZ-001', 'z', 'c.md']]); return r.code === 1 && r.enforced === 1 && r.reported === 2; });
check('fixture: finish() prints ENFORCING for an active holder and reporting-only for a draft', () => {
  const lines = [];
  const out = new Findings('fixture', { index: fixture, log: { log: (s) => lines.push(s), error: (s) => lines.push(s) } });
  out.add('ACT-001', 'x', 'a.md').add('DRF-001', 'y', 'b.md');
  out.finish({ exit: () => {} });
  const text = lines.join('\n');
  return text.includes('STD-900 (`active`) — ENFORCING') && text.includes('STD-901 (`draft`) — reporting only') && text.includes('2 finding(s), 1 enforced');
});


/* ---- where a plate is written ---- */

check('platesIn: a plate in a rule title and a plate in the Check table both hold', () => {
  if (typeof regime.platesIn !== 'function') return 'platesIn is not exported';
  const { platesIn } = regime;
  const body = [
    '## Rules', '', '**ABC-001 — Old shape.** A plate in the title.', '',
    '**Plate at the foot.** No code in the reading.', '',
    '## Check', '', '| Plate | Rule | Source | Verified by |', '|---|---|---|---|',
    '| ABC-002 | Plate at the foot | — | by hand |',
    '| ABC-003, ABC-004 | two plates, one row | — | by hand |', '',
    '## References', '', '| ID | Name | Why cited |', '|---|---|---|', '| `STD-007` | One page | shape |',
  ].join('\n');
  const got = platesIn(body).join(' ');
  return got === 'ABC-001 ABC-002 ABC-003 ABC-004' || `got ${got}`;
});

check('tree: one question per guard — retirement is STD-012, commit subjects are STD-020', () => {
  const a = index.byPlate.get('DEF-009'), b = index.byPlate.get('GIT-026');
  if (a !== 'STD-012') return `DEF-009 holder ${a}`;
  if (b !== 'STD-020') return `GIT-026 holder ${b}`;
  return true;
});

check('tree: one question per standard — charging, the account and what every site carries each have one holder', () => {
  const want = { 'PAY-001': 'STD-033', 'LED-001': 'STD-036', 'LED-008': 'STD-036', 'SIT-001': 'STD-037', 'SIT-003': 'STD-037', 'DSN-001': 'STD-008' };
  for (const [plate, doc] of Object.entries(want)) {
    const got = index.byPlate.get(plate);
    if (got !== doc) return `${plate} holder ${got}, want ${doc}`;
  }
  return true;
});

check('tree: one question per standard — the last rows: guards apart from safety; the design map is a manual', () => {
  const want = { 'ENG-067': 'STD-005', 'ENG-032': 'STD-005', 'KEY-057': 'STD-022', 'GIT-050': 'STD-020' };
  for (const [plate, doc] of Object.entries(want)) {
    const got = index.byPlate.get(plate);
    if (got !== doc) return `${plate} holder ${got}, want ${doc}`;
  }
  const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf-8');
  const std005 = readdirSync(path.join(ROOT, 'standards')).find((f) => f.startsWith('STD-005-'));
  const eng = read(`standards/${std005}`), reg = read('standards/STD-015-engineering-checks.md');
  if (!/^#+ The family pipeline/m.test(eng)) return 'the family pipeline is not in STD-005';
  if (/^#+ The family pipeline/m.test(reg)) return 'the family pipeline is still in STD-015';
  for (const p of ['SEC-013', 'SEC-014', 'SRE-007', 'AGT-007']) if (!new RegExp(`\\| ${p} \\|`).test(reg)) return `${p} is not a row of STD-015`;
  const ledger = JSON.parse(read('machine/scripts/retired-plates.json')).plates;
  for (const p of ['ENG-004', 'ENG-005', 'ENG-006', 'ENG-007', 'ENG-035', 'ENG-068', 'ENG-069']) {
    if (!ledger[p]) return `${p} is not in the retired-plates ledger`;
  }
  if (readdirSync(path.join(ROOT, 'standards')).some((f) => f.startsWith('STD-032-'))) return 'STD-032 is still a standard';
  if (!readdirSync(path.join(ROOT, 'system')).some((f) => f.startsWith('SYS-009-'))) return 'no SYS-009 in system/';
  return true;
});

check('tree: a series threshold is stated once, in STD-001 — no document header repeats it', () => {
  for (const d of ['standards', 'canon', 'protocols', 'machine/templates']) {
    for (const f of readdirSync(path.join(ROOT, d)).filter((n) => n.endsWith('.md'))) {
      const text = readFileSync(path.join(ROOT, d, f), 'utf-8');
      const head = text.startsWith('---') ? text.slice(0, text.indexOf('\n---', 3)) : '';
      if (/^threshold:/m.test(head)) return `${d}/${f} carries threshold: in its header; the series register holds it`;
    }
  }
  return true;
});

check('tree: a series\' function is stated once, in STD-027 — STD-001\'s series table does not copy it', () => {
  const std = readFileSync(path.join(ROOT, 'standards/STD-001-the-series.md'), 'utf-8');
  const header = std.split('\n').find((l) => l.startsWith('| Series |'));
  if (!header) return 'STD-001 has no series table';
  if (/Function/.test(header)) return `STD-001's series table still carries a Function column: ${header}`;
  return true;
});

check('tree: legal texts have one home — legal/, registered in STD-001, STD-027 and rules.json', () => {
  // Three answers disagreed before 2026-09-27: STD-001 said operations/legal/
  // (which did not exist), rules.json said canon/, and the files sat loose in
  // operations/. A legal text is the company's promise to third parties; it
  // changes when the law does, not when the archive does.
  const rules = JSON.parse(readFileSync(path.join(ROOT, 'machine/scripts/lib/rules.json'), 'utf-8'));
  if (rules.types.series.legal !== 'legal') return `rules.json maps type legal to ${rules.types.series.legal}, want legal`;
  if (!rules.series.legal) return 'rules.json registers no legal series';
  const s001 = readFileSync(path.join(ROOT, 'standards/STD-001-the-series.md'), 'utf-8');
  if (!/^\| `legal\/` \|/m.test(s001)) return 'STD-001 has no row for legal/';
  const s027 = readFileSync(path.join(ROOT, 'standards/STD-027-the-classification-scheme.md'), 'utf-8');
  if (!/`legal\/`/.test(s027)) return 'STD-027 does not place legal/ in the scheme';
  const tracked = execFileSync('git', ['-C', ROOT, 'ls-files', '*.md'], { encoding: 'utf-8' }).split('\n').filter(Boolean);
  for (const f of tracked) {
    if (f.startsWith('machine/templates/')) continue;
    const text = readFileSync(path.join(ROOT, f), 'utf-8');
    if (/^type: legal\s*$/m.test(text.slice(0, 600)) && !f.startsWith('legal/')) return `${f} is type legal outside legal/`;
  }
  return true;
});

check('tree: no living text types a range of identifiers — a count is read from the tree, never written', () => {
  // "STD-001…STD-028" was true once and false eleven standards later. The
  // rule index in AGENTS.md is generated; a hand-typed range beside it is a
  // second copy that nobody regenerates.
  const RANGE = /\b([A-Z]{3})-\d{3,4} ?(?:…|\.\.\.?|–) ?\1-\d{3,4}\b/;
  const files = execFileSync('git', ['-C', ROOT, 'ls-files', 'AGENTS.md', 'CLAUDE.md', 'README.md', 'CONTRIBUTING.md',
    'agents', 'canon', 'standards', 'protocols', 'system'], { encoding: 'utf-8' }).split('\n').filter((f) => f.endsWith('.md'));
  const hits = [];
  for (const f of files) {
    readFileSync(path.join(ROOT, f), 'utf-8').split('\n').forEach((l, i) => { if (RANGE.test(l)) hits.push(`${f}:${i + 1}`); });
  }
  return hits.length === 0 || `typed ranges: ${hits.join(', ')}`;
});

check('tree: the apparatus is thin — no series_change, no retired row; retired plates live in one ledger', () => {
  const dir = path.join(ROOT, 'standards');
  const ledger = JSON.parse(readFileSync(path.join(ROOT, 'machine/scripts/retired-plates.json'), 'utf-8')).plates;
  if (Object.keys(ledger).length < 35) return `ledger holds ${Object.keys(ledger).length} plates, want at least 35`;
  for (const f of readdirSync(dir).filter((n) => /^STD-\d{3}-/.test(n))) {
    const text = readFileSync(path.join(dir, f), 'utf-8');
    if (/^series_change:/m.test(text)) return `${f} still carries series_change`;
    if (/^\| [A-Z]{3}-\d{3} \| retired\b/m.test(text)) return `${f} still carries a retired row`;
  }
  for (const plate of Object.keys(ledger)) {
    if (index.byPlate.has(plate)) return `${plate} is retired in the ledger and held by ${index.byPlate.get(plate)}`;
  }
  return true;
});

check('tree: a protocol is steps — no Rules section, no plate, and its Epistemic line is its question', () => {
  // A protocol is carried out, a standard is complied with (STD-024). The
  // rules a protocol used to carry either moved to the standard that holds
  // the thing, or became steps; their plates went to the ledger.
  // Running a mission (PRO-003) is left as it is, in draft, by the Oracle's
  // word (2026-09-27): missions are suspended by the transition regime.
  const dir = path.join(ROOT, 'protocols');
  const bad = [];
  for (const f of readdirSync(dir).filter((n) => /^PRO-\d{3}-.*\.md$/.test(n) && !n.startsWith('PRO-003-'))) {
    const text = readFileSync(path.join(dir, f), 'utf-8');
    const body = text.slice(text.indexOf('\n---', 3) + 4);
    if (/^##\s+(?:\d+\.\s*)?Rules\b/m.test(body)) bad.push(`${f}: a Rules section`);
    const plates = platesIn(body);
    if (plates.length) bad.push(`${f}: holds ${plates.join(', ')}`);
    const card = body.split('\n').filter((l) => l.startsWith('>')).map((l) => l.replace(/^>\s?/, '')).join(' ');
    const epi = /\*\*Epistemic:\*\*\s*(.*?)(?=\*\*[A-Z][a-z]+:\*\*|$)/.exec(card)?.[1]?.trim() ?? '';
    if (!epi.endsWith('?')) bad.push(`${f}: Epistemic line is not a question`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('tree: every protocol has the five parts of the mould, in order', () => {
  // machine/templates/PRO-TEMPLATE.md: purpose and trigger, preconditions,
  // procedure, verification, escalation. The Oracle asked that every
  // protocol read alike (2026-09-27). Running a mission (PRO-003) is left
  // out by his word: it stays as it is while missions are suspended.
  const PARTS = ['Purpose and trigger', 'Preconditions', 'Procedure', 'Verification', 'Escalation'];
  const dir = path.join(ROOT, 'protocols');
  const bad = [];
  for (const f of readdirSync(dir).filter((n) => /^PRO-\d{3}-.*\.md$/.test(n) && !n.startsWith('PRO-003-'))) {
    const text = readFileSync(path.join(dir, f), 'utf-8');
    const heads = [...text.matchAll(/^## (\d+)\. (.+)$/gm)].map((m) => `${m[1]}. ${m[2].trim()}`);
    const want = PARTS.map((p, i) => `${i + 1}. ${p}`);
    if (heads.slice(0, 5).join('|') !== want.join('|')) bad.push(`${f}: ${heads.join(' / ')}`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('tree: a protocol numbers its steps — the procedure is a numbered list, not a table', () => {
  const dir = path.join(ROOT, 'protocols');
  const bad = [];
  for (const f of readdirSync(dir).filter((n) => /^PRO-\d{3}-.*\.md$/.test(n) && !n.startsWith('PRO-003-'))) {
    const text = readFileSync(path.join(dir, f), 'utf-8');
    const proc = /^## 3\. Procedure\n([\s\S]*?)(?=^## 4\.)/m.exec(text)?.[1] ?? '';
    if (!/^1\. /m.test(proc)) bad.push(f);
  }
  return bad.length === 0 || `no numbered steps in: ${bad.join(', ')}`;
});

check('tree: a protocol fits in 900 words — a longer one is two protocols, or carries values a register holds', () => {
  // The mould: more than a dozen steps is probably two protocols with a
  // handover between them. Joining and leaving was one protocol of 1,548
  // words; the living pieces restated the design values register.
  const dir = path.join(ROOT, 'protocols');
  const bad = [];
  for (const f of readdirSync(dir).filter((n) => /^PRO-\d{3}-.*\.md$/.test(n))) {
    const text = readFileSync(path.join(dir, f), 'utf-8');
    const body = text.slice(text.indexOf('\n---', 3) + 4).replace(/<!--[\s\S]*?-->/g, '');
    const words = body.split(/\s+/).filter(Boolean).length;
    if (words > 900) bad.push(`${f}: ${words} words`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('tree: the protocol plates are retired in the ledger, and no living text cites one', () => {
  const RETIRED = ['SES', 'ESC', 'APV', 'GRD', 'DSP', 'TSK', 'RUP', 'RLS', 'RIT', 'SAL', 'MON'];
  const ledger = JSON.parse(readFileSync(path.join(ROOT, 'machine/scripts/retired-plates.json'), 'utf-8')).plates;
  for (const p of RETIRED) {
    if (!Object.keys(ledger).some((k) => k.startsWith(`${p}-`))) return `no ${p}- plate in the ledger`;
    if (index.byPrefix.has(p)) return `${p} is still held by ${[...index.byPrefix.get(p)].join(', ')}`;
  }
  const RE = new RegExp(`\\b(?:${RETIRED.join('|')})-\\d{3}\\b`);
  const files = execFileSync('git', ['-C', ROOT, 'ls-files', 'AGENTS.md', 'CLAUDE.md', 'CONTRIBUTING.md',
    'agents', 'canon', 'standards', 'protocols', 'system', 'web/src', 'machine/templates'], { encoding: 'utf-8' })
    .split('\n').filter((f) => /\.(md|ts|astro|mjs)$/.test(f));
  const hits = [];
  for (const f of files) readFileSync(path.join(ROOT, f), 'utf-8').split('\n').forEach((l, i) => { if (RE.test(l)) hits.push(`${f}:${i + 1}`); });
  return hits.length === 0 || `retired protocol plates cited: ${hits.join(', ')}`;
});

check('tree: the security audit keeps no rules of its own — the secrets standard and the checks register hold them', () => {
  const pro = readdirSync(path.join(ROOT, 'protocols')).find((f) => f.startsWith('PRO-011-'));
  const text = readFileSync(path.join(ROOT, 'protocols', pro), 'utf-8');
  if (/^\*\*SEC-\d{3}/m.test(text)) return `${pro} still titles a rule with an SEC plate, the code of an Engineering checks row`;
  return true;
});

check('tree: protocols keep the designed system — the transition regime lives only in AGENTS.md', () => {
  // A form pass changes shape, not substance (the Oracle, 2026-09-27). The
  // regime suspends ceremony while protocols are draft; promotion restores
  // it as written, so a protocol never describes the suspension.
  const dir = path.join(ROOT, 'protocols');
  const read = (p) => readFileSync(path.join(dir, readdirSync(dir).find((f) => f.startsWith(`${p}-`))), 'utf-8');
  for (const f of readdirSync(dir).filter((n) => /^PRO-\d{3}-/.test(n) && !n.startsWith('PRO-023-'))) {
    if (/transition regime|chat instruction is the briefing/i.test(readFileSync(path.join(dir, f), 'utf-8'))) return `${f} describes the transition regime`;
  }
  const keeps = {
    'PRO-001': ['divergence_log', 'OPS-008', 'OPS-009', 'decisions/', 'PRO-003', 'in-review', '9–10'],
    'PRO-005': ['Mission:'],
    'PRO-016': ['decision record'],
  };
  for (const [p, words] of Object.entries(keeps)) {
    const text = read(p);
    for (const w of words) if (!text.includes(w)) return `${p} lost ${w}`;
  }
  return true;
});

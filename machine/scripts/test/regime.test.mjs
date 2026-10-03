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
import { readFileSync, readdirSync, existsSync } from 'node:fs';
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

check('tree: the archive\'s structure is in force — SER (STD-024) and CLS (STD-027) bind, STD-001 is active (2026-10-01)', () => {
  for (const [plate, holder] of [['SER-004', 'STD-024'], ['SER-007', 'STD-024'], ['CLS-001', 'STD-027'], ['CLS-004', 'STD-027']]) {
    const b = bindsFor(plate);
    if (b.holder !== holder) return `${plate} holder ${b.holder}, want ${holder}`;
    if (!b.binds) return `${plate} does not bind: ${holder} is ${b.status}`;
  }
  const s = loadHolders().status.get('STD-001');
  return s === 'active' || `STD-001 is ${s}`;
});

check('tree: the design values and both vocabularies are in force — STD-023, STD-026, STD-030 active (2026-10-02)', () => {
  const status = loadHolders().status;
  const off = ['STD-023', 'STD-026', 'STD-030'].filter((id) => status.get(id) !== 'active');
  return off.length === 0 || `not active: ${off.map((id) => `${id} (${status.get(id)})`).join(', ')}`;
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
  for (const d of ['standards', 'canon', 'procedures', 'machine/templates']) {
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

check('tree: opportunities have one home — opportunities/, registered in STD-001 and STD-027, read by the pipeline tool', () => {
  // The Oracle's ruling (2026-09-28): the records of a sale live in the
  // public archive — transparency — with roles in the header and no personal
  // data in the body, the organisation named only once it has agreed.
  // Reversed the same day at the Oracle's QA ("no seamos capaces de inferir
  // cómo funciona el sistema"): the folder IS header-governed like every
  // other — every document's header and card, then the sale's own fields,
  // registered in STD-004's ring 3 — and pipeline.mjs still judges the
  // sale's values in CI. Its templates sit with the others in machine/templates/.
  // 2026-09-29, the Oracle: the house works in the open and says so in every
  // proposal; the organisation is named once told, never once lost.
  const rules = JSON.parse(readFileSync(path.join(ROOT, 'machine/scripts/lib/rules.json'), 'utf-8'));
  if (!rules.series.opportunities) return 'rules.json registers no opportunities series';
  if (!rules.governed.dirs.includes('opportunities')) return 'opportunities/ is not header-governed: its documents would open with a header nobody checks';
  for (const m of ['OPP-TEMPLATE.md', 'PRP-TEMPLATE.md'])
    if (!existsSync(path.join(ROOT, 'machine/templates', m))) return `machine/templates/${m} is missing`;
  const s001 = readFileSync(path.join(ROOT, 'standards/STD-001-the-series.md'), 'utf-8');
  if (!/^\| `opportunities\/` \|/m.test(s001)) return 'STD-001 has no row for opportunities/';
  const s027 = readFileSync(path.join(ROOT, 'standards/STD-027-the-classification-scheme.md'), 'utf-8');
  if (!/`opportunities\/`/.test(s027)) return 'STD-027 does not place opportunities/ in the scheme';
  const s039 = readFileSync(path.join(ROOT, 'standards/STD-039-an-opportunity-has-a-record.md'), 'utf-8');
  if (/Outside the public archive/.test(s039)) return 'STD-039 still says records live outside the public archive';
  if (!/named when it knows/i.test(s039)) return 'STD-039 does not say when the organisation is named';
  const ci = readFileSync(path.join(ROOT, '.github/workflows/ci.yml'), 'utf-8');
  if (!/pipeline\.mjs opportunities/.test(ci)) return 'CI does not run pipeline.mjs on opportunities/';
  return true;
});

check('tree: grants are records in opportunities/ — funding/ is gone, one series, one template, one tool', () => {
  // The Oracle (2026-10-02): one record format for sales, tenders, grants,
  // collaborations and partners, in one folder, judged by one tool. The
  // grant series (funding/, GRA-), its standards, its card and its tool were
  // retired into STD-038, STD-039, OPS-018 and pipeline.mjs.
  if (existsSync(path.join(ROOT, 'funding'))) return 'funding/ still exists — grants are records of kind grant in opportunities/';
  const rules = JSON.parse(readFileSync(path.join(ROOT, 'machine/scripts/lib/rules.json'), 'utf-8'));
  if (rules.series.funding) return 'rules.json still registers a funding series';
  if (rules.types?.series?.grant) return 'rules.json still files type grant in its own series';
  if ((rules.governed?.dirs ?? []).includes('funding')) return 'funding/ is still header-governed';
  if (existsSync(path.join(ROOT, 'machine/templates/GRA-TEMPLATE.md'))) return 'machine/templates/GRA-TEMPLATE.md still exists — one template, OPP-TEMPLATE.md';
  if (existsSync(path.join(ROOT, 'machine/packages/funding-kit'))) return 'machine/packages/funding-kit still exists — one tool, pipeline.mjs';
  const s001 = readFileSync(path.join(ROOT, 'standards/STD-001-the-series.md'), 'utf-8');
  if (/`funding\/`/.test(s001)) return 'STD-001 still has a row for funding/';
  const s027 = readFileSync(path.join(ROOT, 'standards/STD-027-the-classification-scheme.md'), 'utf-8');
  if (/`funding\/`/.test(s027)) return 'STD-027 still places funding/ in the scheme';
  const s038 = readFileSync(path.join(ROOT, 'standards/STD-038-the-stages-of-an-opportunity.md'), 'utf-8');
  const kinds = s038.slice(s038.indexOf('## The kinds'), s038.indexOf('## The stages'));
  if (!/^\| `grant` \|/m.test(kinds)) return 'STD-038 has no kind grant';
  const ci = readFileSync(path.join(ROOT, '.github/workflows/ci.yml'), 'utf-8');
  if (/funding\.mjs/.test(ci)) return 'CI still runs funding.mjs';
  if (!/pipeline\.mjs opportunities/.test(ci)) return 'CI does not run pipeline.mjs on opportunities/';
  return true;
});

check('tree: the house has one card for every call, and a procedure walks each door to public money', () => {
  // A tender and a grant are each read against what the house holds; the
  // one card is where that lives, and the record standard cites it.
  for (const f of ['operations/OPS-018-the-house-card.md',
    'procedures/PRO-031-bidding-for-a-tender.md', 'procedures/PRO-032-applying-for-a-grant.md'])
    if (!existsSync(path.join(ROOT, f))) return `${f} is missing`;
  if (existsSync(path.join(ROOT, 'operations/OPS-019-the-house-card-for-grants.md'))) return 'a second card for grants still exists — one card, OPS-018';
  const s039 = readFileSync(path.join(ROOT, 'standards/STD-039-an-opportunity-has-a-record.md'), 'utf-8');
  if (!/`OPS-018`/.test(s039)) return 'STD-039 does not cite the house\'s card';
  return true;
});

check('tree: screening a tender is a procedure, and the skill only points to it — one procedure, one home', () => {
  // The Oracle (2026-10-01): "no solo la skill". The screening procedure is
  // a procedure, a normative document; the portable skill is an adapter that sends any
  // agent to it, so the steps are never kept twice.
  const pro = path.join(ROOT, 'procedures/PRO-033-screening-a-tender.md');
  if (!existsSync(pro)) return 'procedures/PRO-033-screening-a-tender.md is missing';
  const skill = readFileSync(path.join(ROOT, 'agents/skills/tender-screening/SKILL.md'), 'utf-8');
  if (!/PRO-033/.test(skill)) return 'the tender-screening skill does not send the agent to PRO-033';
  if (/^## Step \d/m.test(skill) || /^## The five questions/m.test(skill)) return 'the skill keeps its own copy of the steps — they live in PRO-033';
  const s038 = readFileSync(path.join(ROOT, 'standards/STD-038-the-stages-of-an-opportunity.md'), 'utf-8');
  if (!/^## Weighing a tender$/m.test(s038)) return 'STD-038 holds no Weighing a tender table: the procedure would carry values a register holds';
  const p031 = readFileSync(path.join(ROOT, 'procedures/PRO-031-bidding-for-a-tender.md'), 'utf-8');
  if (!/PRO-033/.test(p031)) return 'PRO-031 does not start from the screening procedure';
  return true;
});

check('tree: every stage of a grant is moved by a procedure, and the month takes in public money', () => {
  const reg = readFileSync(path.join(ROOT, 'standards/STD-038-the-stages-of-an-opportunity.md'), 'utf-8');
  const table = reg.slice(reg.indexOf('## The stages'), reg.indexOf('## The events'));
  const stages = [...table.matchAll(/^\| `grant` \| `([a-z]+)` \|/gm)].map((m) => m[1]);
  if (stages.length < 3) return `the register names only ${stages.length} stage(s) of a grant`;
  const p032 = readFileSync(path.join(ROOT, 'procedures/PRO-032-applying-for-a-grant.md'), 'utf-8');
  const unmoved = stages.filter((s) => !new RegExp('`' + s + '`').test(p032));
  if (unmoved.length) return `no step of PRO-032 moves a grant to: ${unmoved.join(', ')}`;
  const p021 = readFileSync(path.join(ROOT, 'procedures/PRO-021-closing-the-month.md'), 'utf-8');
  if (!/grant/i.test(p021) || !/tender|contract/i.test(p021)) return 'the month close takes in no grant and no public contract — PRO-032 and PRO-031 hand their money to it';
  return true;
});

check('tree: no living text types a range of identifiers — a count is read from the tree, never written', () => {
  // "STD-001…STD-028" was true once and false eleven standards later. The
  // rule index in AGENTS.md is generated; a hand-typed range beside it is a
  // second copy that nobody regenerates.
  const RANGE = /\b([A-Z]{3})-\d{3,4} ?(?:…|\.\.\.?|–) ?\1-\d{3,4}\b/;
  const files = execFileSync('git', ['-C', ROOT, 'ls-files', 'AGENTS.md', 'CLAUDE.md', 'README.md', 'CONTRIBUTING.md',
    'agents', 'canon', 'standards', 'procedures', 'system'], { encoding: 'utf-8' }).split('\n').filter((f) => f.endsWith('.md'));
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

check('tree: a procedure is steps — no Rules section, no plate, and its Epistemic line is its question', () => {
  // A procedure is carried out, a standard is complied with (STD-024). The
  // rules a procedure used to carry either moved to the standard that holds
  // the thing, or became steps; their plates went to the ledger.
  // Running a mission (PRO-003) is left as it is, in draft, by the Oracle's
  // word (2026-09-27): missions are suspended by the transition regime.
  const dir = path.join(ROOT, 'procedures');
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

check('tree: every procedure has the five parts of the template, in order', () => {
  // machine/templates/PRO-TEMPLATE.md: purpose and trigger, preconditions,
  // procedure, verification, escalation. The Oracle asked that every
  // procedure read alike (2026-09-27). Running a mission (PRO-003) is left
  // out by his word: it stays as it is while missions are suspended.
  const PARTS = ['Purpose and trigger', 'Preconditions', 'Procedure', 'Verification', 'Escalation'];
  const dir = path.join(ROOT, 'procedures');
  const bad = [];
  for (const f of readdirSync(dir).filter((n) => /^PRO-\d{3}-.*\.md$/.test(n) && !n.startsWith('PRO-003-'))) {
    const text = readFileSync(path.join(dir, f), 'utf-8');
    const heads = [...text.matchAll(/^## (\d+)\. (.+)$/gm)].map((m) => `${m[1]}. ${m[2].trim()}`);
    const want = PARTS.map((p, i) => `${i + 1}. ${p}`);
    if (heads.slice(0, 5).join('|') !== want.join('|')) bad.push(`${f}: ${heads.join(' / ')}`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('tree: a procedure numbers its steps — the procedure is a numbered list, not a table', () => {
  const dir = path.join(ROOT, 'procedures');
  const bad = [];
  for (const f of readdirSync(dir).filter((n) => /^PRO-\d{3}-.*\.md$/.test(n) && !n.startsWith('PRO-003-'))) {
    const text = readFileSync(path.join(dir, f), 'utf-8');
    const proc = /^## 3\. Procedure\n([\s\S]*?)(?=^## 4\.)/m.exec(text)?.[1] ?? '';
    if (!/^1\. /m.test(proc)) bad.push(f);
  }
  return bad.length === 0 || `no numbered steps in: ${bad.join(', ')}`;
});

check('tree: a procedure fits in 900 words — a longer one is two procedures, or carries values a register holds', () => {
  // The template: more than a dozen steps is probably two procedures with a
  // handover between them. Joining and leaving was one procedure of 1,548
  // words; the living pieces restated the design values register.
  const dir = path.join(ROOT, 'procedures');
  const bad = [];
  for (const f of readdirSync(dir).filter((n) => /^PRO-\d{3}-.*\.md$/.test(n))) {
    const text = readFileSync(path.join(dir, f), 'utf-8');
    // The SPDX comment is counted with the body: a few words, the same for all.
    const body = text.slice(text.indexOf('\n---', 3) + 4);
    const words = body.split(/\s+/).filter(Boolean).length;
    if (words > 900) bad.push(`${f}: ${words} words`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('tree: every stage of every kind is moved by a procedure — the register names the stages, the procedures carry each move', () => {
  // STD-038 is the register of stages, by kind; a stage no procedure moves a
  // record into is a state the pipeline can show and nobody can reach.
  // The procedures that move opportunities are read under two sections: a sale,
  // a tender, a partner or a collaboration under Sales and partners; a grant
  // under Finance, where STD-030 keeps grants and loans.
  const dir = path.join(ROOT, 'procedures');
  const reg = readFileSync(path.join(ROOT, 'standards/STD-038-the-stages-of-an-opportunity.md'), 'utf-8');
  const table = reg.slice(reg.indexOf('## The stages'), reg.indexOf('## The events'));
  const rows = [...table.matchAll(/^\| `([a-z]+)` \| `([a-z]+)` \|/gm)].map((m) => `${m[1]}:${m[2]}`);
  if (rows.length < 5) return `the register names only ${rows.length} stages`;
  const sales = readdirSync(dir).filter((n) => /^PRO-\d{3}-.*\.md$/.test(n))
    .map((n) => readFileSync(path.join(dir, n), 'utf-8'))
    .filter((t) => /^section: "(Sales and partners|Finance)"/m.test(t));
  if (sales.length < 3) return `only ${sales.length} procedure(s) in the Sales and partners or Finance sections`;
  const text = sales.join('\n');
  const unmoved = rows.filter((r) => !new RegExp('`' + r.split(':')[1] + '`').test(text));
  return unmoved.length === 0 || `no sales procedure moves an opportunity to: ${unmoved.join(', ')}`;
});

check('tree: What is yours stays with you is carried out — a breach, a rights request and a new stored thing each have a procedure', () => {
  // The personal data standard (STD-035) asks for three acts nobody had
  // written: report a breach within 72 hours, answer a person within a
  // month, and ask consent again when what a site stores changes.
  const dir = path.join(ROOT, 'procedures');
  const want = { 'a breach': /breach/i, 'a rights request': /rights|request/i, 'a stored thing': /stor|cookie/i };
  const mine = readdirSync(dir).filter((n) => /^PRO-\d{3}-.*\.md$/.test(n))
    .map((n) => readFileSync(path.join(dir, n), 'utf-8'))
    .filter((t) => /^derived_from: "CAN-012"/m.test(t))
    .map((t) => /^title: "(.*)"/m.exec(t)?.[1] ?? '');
  const miss = Object.entries(want).filter(([, re]) => !mine.some((title) => re.test(title))).map(([k]) => k);
  if (miss.length) return `no procedure under CAN-012 for: ${miss.join(', ')}`;
  const std = readFileSync(path.join(ROOT, 'standards/STD-035-personal-data.md'), 'utf-8');
  if (/no breach procedure is written/.test(std)) return 'STD-035 still says no breach procedure is written';
  return true;
});

check('tree: the procedure plates are retired in the ledger, and no living text cites one', () => {
  const RETIRED = ['SES', 'ESC', 'APV', 'GRD', 'DSP', 'TSK', 'RUP', 'RLS', 'RIT', 'SAL', 'MON'];
  const ledger = JSON.parse(readFileSync(path.join(ROOT, 'machine/scripts/retired-plates.json'), 'utf-8')).plates;
  for (const p of RETIRED) {
    if (!Object.keys(ledger).some((k) => k.startsWith(`${p}-`))) return `no ${p}- plate in the ledger`;
    if (index.byPrefix.has(p)) return `${p} is still held by ${[...index.byPrefix.get(p)].join(', ')}`;
  }
  const RE = new RegExp(`\\b(?:${RETIRED.join('|')})-\\d{3}\\b`);
  const files = execFileSync('git', ['-C', ROOT, 'ls-files', 'AGENTS.md', 'CLAUDE.md', 'CONTRIBUTING.md',
    'agents', 'canon', 'standards', 'procedures', 'system', 'web/src', 'machine/templates'], { encoding: 'utf-8' })
    .split('\n').filter((f) => /\.(md|ts|astro|mjs)$/.test(f));
  const hits = [];
  for (const f of files) readFileSync(path.join(ROOT, f), 'utf-8').split('\n').forEach((l, i) => { if (RE.test(l)) hits.push(`${f}:${i + 1}`); });
  return hits.length === 0 || `retired procedure plates cited: ${hits.join(', ')}`;
});

check('tree: the security audit keeps no rules of its own — the secrets standard and the checks register hold them', () => {
  const pro = readdirSync(path.join(ROOT, 'procedures')).find((f) => f.startsWith('PRO-011-'));
  const text = readFileSync(path.join(ROOT, 'procedures', pro), 'utf-8');
  if (/^\*\*SEC-\d{3}/m.test(text)) return `${pro} still titles a rule with an SEC plate, the code of an Engineering checks row`;
  return true;
});

check('tree: procedures keep the designed system — the transition regime lives only in AGENTS.md', () => {
  // A form pass changes shape, not substance (the Oracle, 2026-09-27). The
  // regime suspends ceremony while procedures are draft; promotion restores
  // it as written, so a procedure never describes the suspension.
  const dir = path.join(ROOT, 'procedures');
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

check('tree: a site\'s code has its own audit, and a stored item is checked with a returning visitor\'s browser', () => {
  // The audit of numinia.com (2026-10-02) found an open media proxy, a test
  // login in production, write-scoped workflows and stuck dependency updates
  // that the identity audit (PRO-011) never reads; and a replaced cookie
  // banner that reused a cookie name with another format, which an empty
  // browser can never show.
  const dir = path.join(ROOT, 'procedures');
  const code = readdirSync(dir).find((f) => /^PRO-\d{3}-auditing-a-sites-code\.md$/.test(f));
  if (!code) return 'no procedure for auditing a site\'s code';
  const c = readFileSync(path.join(dir, code), 'utf-8');
  for (const w of ['server route', 'Probe every route live', 'content security policy', 'permissions', 'npm audit', 'Scorecard', 'PRO-008'])
    if (!c.includes(w)) return `${code} does not cover ${w}`;
  const p027 = readFileSync(path.join(dir, readdirSync(dir).find((f) => f.startsWith('PRO-027-'))), 'utf-8');
  if (!/returning visitor/.test(p027)) return 'PRO-027 checks the built site only with an empty browser';
  if (!/keep the old name and format/.test(p027)) return 'PRO-027 says nothing about an item the change replaces';
  return true;
});

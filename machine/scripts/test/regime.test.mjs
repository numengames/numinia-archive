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
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';
import * as regime from '../lib/regime.mjs';
const { loadHolders, holderOf, bindsFor, Findings } = regime;

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

check('tree: STD-004 is active and HDR-000 binds; STD-012 is draft and DEF-008 does not', () => {
  const a = bindsFor('HDR-000'), b = bindsFor('DEF-008');
  if (a.holder !== 'STD-004') return `HDR-000 holder ${a.holder}`;
  if (b.holder !== 'STD-012') return `DEF-008 holder ${b.holder}`;
  return (a.binds === (a.status === 'active')) && (b.binds === (b.status === 'active'));
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

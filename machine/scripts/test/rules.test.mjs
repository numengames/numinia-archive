#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// rules.test.mjs — MIS-138 D1.1: the shared classifiers are data the guards
// actually consume, and the data agrees with the rulings it transcribes.
//
//   STRUCTURAL  rules.json parses; every series has a prefix list and digits;
//               every `types.series` target is a registered series; every
//               governed dir is a real top-level directory or a registered
//               empty shelf; each guard that must read the file imports lib.
//
//   BEHAVIOURAL isApparatus/isTemplate agree with the three lists they
//               replaced on the cases that used to differ. The reader itself
//               is proven in frontmatter.test.mjs.
//
// Run: npm test
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { ROOT, loadRules, seriesDirs, prefixToDir, isApparatus, isTemplate } from '../lib/frontmatter.mjs';

import test from 'node:test';
/* A case returns true, false, or a string: a string starting `skipped:` is a
   named skip; any other string is the reason it failed. */
const check = (name, fn) => test(name, (t) => {
  const r = fn();
  if (typeof r === 'string' && r.startsWith('skipped:')) return t.skip(r.slice(8).trim());
  if (r === false || typeof r === 'string') throw new Error(typeof r === 'string' ? r : 'returned false');
});
const rules = loadRules();

check('rules.json: every series carries prefix[] and digits', () =>
  seriesDirs(rules).every((d) => Array.isArray(rules.series[d].prefix) && Number.isInteger(rules.series[d].digits)));
check('rules.json: prefixes are unique across series and retired', () => {
  const all = seriesDirs(rules).flatMap((d) => rules.series[d].prefix).concat(Object.keys(rules.retiredPrefixes).filter((k) => !k.startsWith('_')));
  return new Set(all).size === all.length;
});
check('rules.json: types.series targets are registered series', () =>
  Object.values(rules.types.series).every((d) => rules.series[d]));
check('rules.json: lax types are in types.all', () => rules.types.lax.every((t) => rules.types.all.includes(t)));
check('rules.json: status keys are types or _default', () =>
  Object.keys(rules.status).filter((k) => !k.startsWith('_')).every((t) => rules.types.all.includes(t)));
check('rules.json: status mirrors the STD-016 lifecycle table', () => {
  /* STD-016 is the declaration; rules.json is its mirror. Read the table's
     `Lifecycle` column: `a → b → c`, plus `x` — and compare to the lists here.
     Row "mission" ↔ status.mission; row "everything else" ↔ status._default. */
  const std = readFileSync(path.join(ROOT, 'standards/STD-016-header-fields.md'), 'utf8');
  const sect = std.slice(std.indexOf('## Status lifecycles'));
  const rows = [...sect.matchAll(/^\| (mission|everything else) \| (.+?) \| HDR-\d+ \|$/gm)];
  if (rows.length !== 2) return `expected 2 lifecycle rows in STD-016, found ${rows.length}`;
  const parse = (cell) => [...cell.matchAll(/`([^`]+)`/g)].flatMap((m) => m[1].split('→').map((s) => s.trim()));
  const want = { mission: parse(rows.find((r) => r[1] === 'mission')[2]), _default: parse(rows.find((r) => r[1] === 'everything else')[2]) };
  const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
  if (!same(want.mission, rules.status.mission)) return `mission: STD-016 [${want.mission}] vs rules.json [${rules.status.mission}]`;
  if (!same(want._default, rules.status._default)) return `default: STD-016 [${want._default}] vs rules.json [${rules.status._default}]`;
  const terminal = rules.status._terminal;
  const last = [want.mission.at(-1), want._default.at(-1)];
  if (!last.every((s) => terminal.includes(s))) return `_terminal must contain the last state of each lifecycle: [${last}]`;
  if (!terminal.every((s) => want.mission.includes(s) || want._default.includes(s))) return `_terminal names a state no lifecycle declares: [${terminal}]`;
  return true;
});
check('rules.json: series thresholds mirror the STD-001 Series table', () => {
  const std = readFileSync(path.join(ROOT, 'standards/STD-001-the-series.md'), 'utf8');
  const sect = std.slice(std.indexOf('## Series'), std.indexOf('## Genre'));
  const want = {};
  // Columns: Series | Function · Activity | Holds | Prefix | Threshold | …
  // The Function · Activity column was added by ADR-046; skip three, not two.
  for (const m of sect.matchAll(/^\| `([a-z]+)\/` \|(?:[^|]*\|){3}\s*`?([a-z]+)`?[^|]*\|/gm)) want[m[1]] = m[2];
  const diff = seriesDirs(rules).filter((d) => want[d] !== rules.series[d].threshold).map((d) => `${d}: STD-001 ${want[d]} vs rules.json ${rules.series[d].threshold}`);
  return diff.length === 0 || diff.join('; ');
});
check('rules.json: no lifecycle list carries a retired state', () =>
  !['closed', 'superseded'].some((s) => Object.entries(rules.status).some(([k, v]) => Array.isArray(v) && v.includes(s))));
check('rules.json: governed dirs exist in the tracked tree', () => {
  const tracked = new Set(execFileSync('git', ['-C', ROOT, 'ls-files'], { encoding: 'utf8' }).split('\n').map((f) => f.split('/')[0]));
  const missing = rules.governed.dirs.filter((d) => !tracked.has(d));
  return missing.length === 0 || `missing: ${missing.join(', ')}`;
});
check('rules.json: every series dir with a naming scheme exists in the tree', () => {
  const tracked = new Set(execFileSync('git', ['-C', ROOT, 'ls-files'], { encoding: 'utf8' }).split('\n').map((f) => f.split('/')[0]));
  const missing = seriesDirs(rules).filter((d) => !tracked.has(d));
  return missing.length === 0 || `missing: ${missing.join(', ')}`;
});
const SHARED = ['machine/guards/rules/std-004-the-header.mjs', 'machine/guards/rules/std-020-git-is-the-archive.mjs'];
for (const g of SHARED)
  check(`${g} imports machine/scripts/lib/frontmatter.mjs`, () => /from '(\.\.\/\.\.\/scripts|\.)\/lib\/frontmatter\.mjs'/.test(readFileSync(path.join(ROOT, g), 'utf8')));
check('no guard keeps a private SERIES/PREFIX map', () =>
  SHARED.every((g) => !/^const (SERIES|PREFIX) = \{\n\s+\w+:/m.test(readFileSync(path.join(ROOT, g), 'utf8'))));

check('prefixToDir: retired D resolves to debt', () => prefixToDir(rules).D === 'debt');
check('isApparatus: type meta, canonical basenames, template family', () =>
  isApparatus('standards/STANDARDS.md') && isApparatus('missions/TEMPLATE-EXAMPLE.md') && isApparatus('x/INDEX.md')
  && isApparatus('missions/ANNEX-x.md', { type: 'meta' }) && !isApparatus('missions/MIS-0138-x.md', { type: 'mission' }));
check('isTemplate: the two families the header guard exempts from HDR-006', () =>
  isTemplate('agents/_template/README.md') && isTemplate('missions/TEMPLATE.md') && isTemplate('missions/TEMPLATE-CHANGES.md') && !isTemplate('missions/MIS-0001-x.md'));


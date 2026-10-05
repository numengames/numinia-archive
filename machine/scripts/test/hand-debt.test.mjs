#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// hand-debt.test.mjs — rows of rules in force that a person used to check,
// each now held by a machine (machine/scripts/hand-checked-rows.json lists
// the ones still owed; PRO-023 step 7).
//
//   GIT-027 / GIT-029  generated means generated again: the design kit is
//                      checked against its source on every build, as the
//                      telemetry is, so a hand-resolved conflict in either
//                      fails the build
//   CLS-004            a folder whose documents carry an identifier is a
//                      series with its row in the classification scheme
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT, parseFM, isApparatus } from '../lib/frontmatter.mjs';

const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const registry = JSON.parse(read('machine/scripts/blind-spots.json')).checks;

test('GIT-027 / GIT-029: the design kit is a build check, run with --check', () => {
  const entry = registry['generate-design-kit'];
  assert.ok(entry, 'blind-spots.json has no entry for the design kit');
  assert.equal(entry.script, 'machine/tools/generate-design-kit.mjs');
  assert.ok(entry.build_check && !entry.manual, 'the design kit is not run by the build checks');
  assert.deepEqual(entry.run, ['--check']);
  assert.match(read('.github/workflows/ci.yml'), /npm run checks -- --build/);
});

/* The series the scheme names, as folders: `principles/`, `machine/checks/`. */
export function schemeFolders(std027) {
  const at = std027.indexOf('| Function | Activity | Series |');
  const rows = std027.slice(at).split('\n').filter((l) => l.startsWith('|')).slice(2);
  return new Set(rows.flatMap((r) => [...(r.split('|')[3] ?? '').matchAll(/`([\w/-]+)\/`/g)].map((m) => m[1])));
}

test('CLS-004: the scheme reader finds the series folders', () => {
  const t = '| Function | Activity | Series |\n|---|---|---|\n| **G** | Founding | `principles/` |\n| | Verifying | `machine/checks/` · `machine/tools/` |\n\nprose';
  assert.deepEqual([...schemeFolders(t)].sort(), ['machine/checks', 'machine/tools', 'principles']);
});

test('CLS-004: every folder whose documents carry an identifier has its row in the scheme', () => {
  const std = readdirSync(path.join(ROOT, 'standards')).find((f) => f.startsWith('STD-027-'));
  const scheme = schemeFolders(read(`standards/${std}`));
  const files = execFileSync('git', ['ls-files', '*.md'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
  const missing = new Set();
  for (const rel of files) {
    const parts = rel.split('/');
    if (parts.length < 2 || parts[0] === 'web') continue;
    const fm = parseFM(read(rel));
    if (!fm?.id || isApparatus(rel, fm)) continue;   // fixtures and moulds are scaffolding, not records
    const folder = parts[0] === 'machine' ? parts.slice(0, 2).join('/') : parts[0];
    if (!scheme.has(folder)) missing.add(folder);
  }
  assert.deepEqual([...missing].sort(), [], 'folders holding identified documents with no row in the scheme');
});

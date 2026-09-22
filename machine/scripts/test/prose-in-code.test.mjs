#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// prose-in-code.test.mjs — TXT-003's behaviour, proven (machine/guards/rules/std-006-plain-text.mjs).
//
// Each test runs the real guard against a real scratch file and reads its
// verdict. No mocking — the thing under test is the guard's exit code and
// what it says. The expected exit on a new finding is read from the regime
// (TXT-003's holder), not hard-coded: the test proves the prose is SEEN
// whether the holder is a draft or active.
//
// Run: npm test

import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync, execSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { bindsFor } from '../lib/regime.mjs';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const GUARD = path.join(ROOT, 'machine', 'guards', 'rules', 'std-006-plain-text.mjs');
const SCRATCH = path.join(ROOT, 'web', 'src', 'components', '_ProseFixture.astro');
// The fixture page moved under pages/system/ on 2026-09-21 with the seven
// other views the site draws about the System drawer; same prose, new path.
const PAGE = path.join(ROOT, 'web', 'src', 'pages', 'system', 'cao.astro');

const runGuard = (args = []) => {
  const r = spawnSync('node', [GUARD, ...args], { encoding: 'utf8' });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
};
const findings = (out) => (out.match(/[·✗] TXT-003 /g) || []).length;
const measured = (out) => [...out.matchAll(/TXT-003\s+(\d+) characters/g)].reduce((n, m) => n + Number(m[1]), 0);

after(() => rmSync(SCRATCH, { force: true }));

const base = runGuard();
const binding = bindsFor('TXT-003');
const exitOnFinding = binding.binds ? 1 : 0;

test('the guard measures the tree and exits by the regime', () => {
  assert.ok(Number.isFinite(measured(base.out)), `no measured number in:\n${base.out}`);
  assert.ok(Number.isFinite(findings(base.out)), `no findings line in:\n${base.out}`);
  const expected = findings(base.out) > 0 ? exitOnFinding : 0;
  assert.equal(base.code, expected, `holder ${binding.holder} is ${binding.status}\n${base.out}`);
});

test('the guard declares its blind spots (D-025)', () => {
  assert.ok(base.out.includes('BLIND TO (D-025)'), 'the declaration must print on every run');
});

test('prose added to a component is one more finding, sized', () => {
  writeFileSync(
    SCRATCH,
    '---\n// scratch fixture, deleted by the test\n---\n' +
      '<p>This is a paragraph of prose written straight into a component ' +
      'instead of into a markdown file, which is precisely the failure mode ' +
      'this guard exists to catch a second time.</p>\n'
  );
  try {
    const { code, out } = runGuard();
    assert.equal(findings(out), findings(base.out) + 1, out);
    assert.ok(measured(out) > measured(base.out), 'the measured number must grow');
    assert.ok(out.includes('_ProseFixture.astro'), 'the finding must name the file');
    assert.equal(code, exitOnFinding, `holder ${binding.holder} is ${binding.status}\n${out}`);
  } finally {
    rmSync(SCRATCH, { force: true });
  }
});

test('removing the fixture restores the previous count', () => {
  const { code, out } = runGuard();
  assert.equal(findings(out), findings(base.out));
  assert.equal(code, base.code);
});

test('prose removed from a page is one finding fewer, not silence', () => {
  const backup = readFileSync(PAGE, 'utf8');
  try {
    const stripped = backup.replace(/>[^<>{}]{200,}</g, '><');
    assert.notEqual(stripped, backup, 'fixture precondition: cao.astro must carry prose');
    writeFileSync(PAGE, stripped);
    const { out } = runGuard();
    assert.ok(measured(out) < measured(base.out), 'the measured number must shrink');
  } finally {
    writeFileSync(PAGE, backup);
  }
});

test('every finding names the file that carries the prose', () => {
  // The old guard had a --report mode for this; on the contract every
  // finding is printed with its `where`, so the list IS the report.
  const { out } = runGuard();
  const named = [...out.matchAll(/[·✗] TXT-003 .*\n\s+(web\/src\/\S+)/g)].length;
  assert.equal(named, findings(base.out), out);
});

test('the guard reads and never writes', () => {
  const snapshot = () => execSync('git status --porcelain web/src', { cwd: ROOT }).toString();
  const before = snapshot();
  runGuard([]);
  assert.equal(snapshot(), before, 'the guard changed the working tree');
});

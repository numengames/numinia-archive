#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// check-register.test.mjs — the register's own checker, proven.
//
// Each test drives the real script against a real scratch copy of the tree and
// reads its verdict. The script is the thing under test: its exit code and
// what it says. No mocking — a mocked filesystem would prove the parser works
// and say nothing about whether the check catches a lie in this repository.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync, mkdirSync } from 'node:fs';
import { execFileSync, execSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const REGISTER = 'standards/STD-015-engineering-checks.md';

/* A scratch clone of everything the checker reads. Mutating the real tree to
   prove a check bites would leave the repository wrong if a test threw. */
function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'register-'));
  for (const p of ['standards', 'machine/scripts', 'machine/guards', 'machine/tools', '.github', 'CLAUDE.md', 'package.json'])
    cpSync(path.join(ROOT, p), path.join(dir, p), { recursive: true });
  execSync('git init -q && git add -A && git -c user.email=t@t -c user.name=t commit -qm scratch', { cwd: dir });
  return dir;
}

/* --check is the standalone verdict: the same findings, without the regime
   deciding whether they fail the build. The tests are about what the checker
   SEES; ENG-067 owns what a finding costs. */
function run(dir) {
  try {
    const stdout = execFileSync('node', ['machine/tools/check-register.mjs', '--check'], { cwd: dir, encoding: 'utf8' });
    return { code: 0, out: stdout };
  } catch (e) {
    return { code: e.status, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}

function edit(dir, file, fn) {
  const p = path.join(dir, file);
  writeFileSync(p, fn(readFileSync(p, 'utf8')));
  execSync('git add -A', { cwd: dir });
}

test('the register as committed holds every claim it makes', () => {
  const dir = scratch();
  try {
    const { code, out } = run(dir);
    assert.equal(code, 0, `the register does not hold:\n${out}`);
    assert.match(out, /practices hold their claims/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('MANUAL is not a label a row may carry', () => {
  // The point of the whole exercise: an organisation that runs itself does not
  // get to write "a person will remember". Every row states a machine, a gate
  // with a named human act, or a dated debt.
  const text = readFileSync(path.join(ROOT, REGISTER), 'utf8');
  const manual = text.split('\n').filter((l) => l.startsWith('| ') && /\[MANUAL/.test(l));
  assert.equal(manual.length, 0, `rows still labelled MANUAL:\n${manual.join('\n')}`);
});

test('a row that claims a script must name one that exists', () => {
  const dir = scratch();
  try {
    edit(dir, REGISTER, (t) => t.replace('`[AUTO: machine/scripts/test/blindness.test.mjs]`', '`[AUTO: machine/scripts/test/gitleaks.mjs]`'));
    const { code, out } = run(dir);
    assert.equal(code, 1);
    assert.match(out, /scripts\/test\/gitleaks\.mjs, which is not tracked/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('a debt must name who owes it and when it was booked', () => {
  const dir = scratch();
  try {
    edit(dir, REGISTER, (t) => t.replace(/`\[DEBT: no commitlint[^\]]*\]`/, '`[DEBT: no commitlint]`'));
    const { code, out } = run(dir);
    assert.equal(code, 1);
    assert.match(out, /a DEBT must end/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('a gate states the human act and still proves its machine half', () => {
  const dir = scratch();
  try {
    edit(dir, REGISTER, (t) => t.replace(/`\[GATE: machine\/guards\/rules\/std-010-licensing\.mjs → [^\]]*\]`/, '`[GATE: machine/guards/rules/std-010-licensing.mjs]`'));
    assert.match(run(dir).out, /a GATE must read/);
  } finally { rmSync(dir, { recursive: true, force: true }); }

  const dir2 = scratch();
  try {
    // A gate whose evidence does not exist is a manual step with better manners.
    edit(dir2, REGISTER, (t) => t.replace(/`\[GATE: \.github\/PULL_REQUEST_TEMPLATE\.md → [^\]]*\]`/, '`[GATE: .github/NOPE.md → a reviewer approves]`'));
    assert.match(run(dir2).out, /\.github\/NOPE\.md, which is not tracked/);
  } finally { rmSync(dir2, { recursive: true, force: true }); }
});

test('a guard no registry entry names is reported, committed or not', () => {
  // TRC-006, the failure that hides every other: discovery runs through
  // machine/scripts/blind-spots.json, so an unregistered guard never executes and the
  // run is green for not looking. Silence and success look identical.
  const dir = scratch();
  try {
    cpSync(path.join(dir, 'machine/guards/rules/std-019-versions.mjs'), path.join(dir, 'machine/guards/rules/std-099-probe.mjs'));
    const uncommitted = run(dir);
    assert.equal(uncommitted.code, 1);
    assert.match(uncommitted.out, /std-099-probe\.mjs .*\(not committed yet\)/);

    execSync('git add -A', { cwd: dir });
    const committed = run(dir);
    assert.equal(committed.code, 1);
    assert.match(committed.out, /std-099-probe\.mjs is a rule guard that no registry entry names/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('a registry entry pointing at nothing is reported', () => {
  const dir = scratch();
  try {
    edit(dir, 'machine/scripts/blind-spots.json', (t) => {
      const j = JSON.parse(t);
      j.guards['probe-ghost'] = { script: 'machine/guards/rules/does-not-exist.mjs', blind_spots: [] };
      return JSON.stringify(j, null, 2) + '\n';
    });
    assert.match(run(dir).out, /does-not-exist\.mjs, which does not exist/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('a pipeline that stops running the guards is reported', () => {
  // Every AUTO row rests on CI actually invoking the runner. If that step goes,
  // 23 rows become decorative at once and nothing else notices.
  const dir = scratch();
  try {
    edit(dir, '.github/workflows/ci.yml', (t) => t.replace('run: npm run guards -- --rules', 'run: echo skipped'));
    assert.match(run(dir).out, /never invokes the rule guards/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('the summary counts the rows it actually has', () => {
  const dir = scratch();
  try {
    edit(dir, REGISTER, (t) => t.replace(/^(\| Legal \| LEG-001 .*)$/m, '$1\n| Legal | LEG-002 | Probe row | MUST | `[DEBT: probe — oracle, 2026-09-11]` |'));
    assert.match(run(dir).out, /says 55 practices, table has 56/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

/* DEV-008: the test that describes a change is written, and seen to fail,
   before the code. A diff cannot tell the order; the pull request's history
   can, so the check is a gate: the template asks, the reviewer looks. Both
   halves must exist — a row that names a template line that is not there is
   the MANUAL the register retired. */
test('DEV-008 test-first is a gate on the pull request template, and the template asks', () => {
  const register = readFileSync(path.join(ROOT, REGISTER), 'utf8');
  const row = register.split('\n').find((l) => l.startsWith('| Ergonomics | DEV-008 |'));
  assert.ok(row, 'STD-015 has no DEV-008 row');
  assert.match(row, /test.*before.*code/i, 'DEV-008 must say the test comes before the code');
  assert.match(row, /`\[GATE: \.github\/PULL_REQUEST_TEMPLATE\.md → /, 'DEV-008 is a gate whose machine half is the PR template');
  const template = readFileSync(path.join(ROOT, '.github/PULL_REQUEST_TEMPLATE.md'), 'utf8');
  assert.match(template, /^- \[ \] .*test.*(before|precedes).*(code|fix|feature)/im, 'the PR template has no Definition-of-Done line asking for the test commit first');
});

test('a scorecard row must name a real Scorecard check', () => {
  const dir = scratch();
  try {
    edit(dir, REGISTER, (t) => t.replace('`[AUTO: scorecard Token-Permissions]`', '`[AUTO: scorecard Invented-Check]`'));
    assert.match(run(dir).out, /"Invented-Check" is not an OpenSSF Scorecard check name/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

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
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { execFileSync, execSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { callerProblems, SHARED_JOBS } from '../check-register.mjs';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const REGISTER = 'standards/STD-015-engineering-checks.md';

/* A scratch clone of everything the checker reads. Mutating the real tree to
   prove a check bites would leave the repository wrong if a test threw. */
function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'register-'));
  for (const p of ['standards', 'designs', 'machine/scripts', 'machine/checks', 'machine/tools', '.github', 'AGENTS.md', 'CLAUDE.md', 'package.json', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', '.editorconfig'])
    if (existsSync(path.join(ROOT, p))) cpSync(path.join(ROOT, p), path.join(dir, p), { recursive: true });
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
    edit(dir, REGISTER, (t) => t.replace(/`\[GATE: machine\/checks\/rules\/std-010-licensing\.mjs → [^\]]*\]`/, '`[GATE: machine/checks/rules/std-010-licensing.mjs]`'));
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
    cpSync(path.join(dir, 'machine/checks/rules/std-019-versions.mjs'), path.join(dir, 'machine/checks/rules/std-099-probe.mjs'));
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
      j.checks['probe-ghost'] = { script: 'machine/checks/rules/does-not-exist.mjs', blind_spots: [] };
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
    edit(dir, '.github/workflows/ci.yml', (t) => t.replace('run: npm run checks -- --rules', 'run: echo skipped'));
    assert.match(run(dir).out, /never invokes the rule checks/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('the summary counts the rows it actually has', () => {
  const dir = scratch();
  try {
    // The expected figures are READ from the register, not written here: a
    // literal pins today's row count and turns red on the next practice
    // added, which is the drift this guard exists to catch, one level up.
    const before = Number(
      /\*\*Summary:\*\*\s*The (\d+) practices/.exec(
        readFileSync(path.join(dir, REGISTER), 'utf8').replace(/\n>\s*/g, ' '),
      )[1],
    );
    edit(dir, REGISTER, (t) => t.replace(/^(\| Legal \| LEG-001 .*)$/m, '$1\n| Legal | LEG-002 | Probe row | MUST | `[DEBT: probe — oracle, 2026-09-11]` |'));
    assert.match(run(dir).out, new RegExp(`says ${before} practices, table has ${before + 1}`));
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

/* AGT-001 names the file every runtime reads, and that file is `AGENTS.md`.
   The row said `CLAUDE.md`, which is one vendor's adapter: the practice was
   written when Claude Code was the only runtime here, and the presence check
   below enforced the adapter while nothing at all guarded the file the other
   runtimes load. The open format (agents.md, donated to the Agentic AI
   Foundation in December 2025) is what the operator already runs against. */
test('AGT-001 holds AGENTS.md, the file every runtime reads', () => {
  const register = readFileSync(path.join(ROOT, REGISTER), 'utf8');
  const row = register.split('\n').find((l) => l.startsWith('| Agents | AGT-001 |'));
  assert.ok(row, 'STD-015 has no AGT-001 row');
  assert.match(row, /`AGENTS\.md`/, 'AGT-001 must name AGENTS.md as the file it requires');
  assert.match(row, /audit/i, 'AGT-001 must still require the audit-before-assuming instruction');
  assert.match(row, /`\[AUTO: machine\/tools\/check-register\.mjs\]`/, 'AGT-001 stays machine-checked');
});

test('the presence check reads AGENTS.md, and its first instruction', () => {
  // A row naming AGENTS.md while the script still opens CLAUDE.md is the
  // drift this register exists to catch, one level up.
  const dir = scratch();
  try {
    edit(dir, 'AGENTS.md', (t) => t.replace(/^\*\*First instruction.*$/m, '**First instruction: ship it.**'));
    const { code, out } = run(dir);
    assert.equal(code, 1);
    assert.match(out, /AGT-001: AGENTS\.md's first instruction does not tell the agent to audit/);
  } finally { rmSync(dir, { recursive: true, force: true }); }

  const dir2 = scratch();
  try {
    edit(dir2, 'AGENTS.md', (t) => t.replace(/^\*\*First instruction.*$/m, 'nothing directive here'));
    assert.match(run(dir2).out, /AGT-001: AGENTS\.md does not open with a \*\*First instruction\*\* line/);
  } finally { rmSync(dir2, { recursive: true, force: true }); }
});

/* AGT-006 is the other row that named the adapter. The stance — what an agent
   may do alone and what needs the Oracle — is platform-neutral by nature, so
   it belongs in the platform-neutral file. */
test('AGT-006 puts the AI stance in AGENTS.md', () => {
  const register = readFileSync(path.join(ROOT, REGISTER), 'utf8');
  const row = register.split('\n').find((l) => l.startsWith('| Agents | AGT-006 |'));
  assert.ok(row, 'STD-015 has no AGT-006 row');
  assert.match(row, /`AGENTS\.md`/, 'AGT-006 must name AGENTS.md');
  assert.doesNotMatch(row, /`CLAUDE\.md`/, 'AGT-006 must not name a single vendor adapter');
});

/* The adapter still has to exist and still has to point at the canonical file
   rather than repeat it: a second copy of the operating rules is the drift
   DBT-020 already records between CLAUDE.md and STD-010. */
test('CLAUDE.md remains an adapter that points at AGENTS.md', () => {
  const claude = readFileSync(path.join(ROOT, 'CLAUDE.md'), 'utf8');
  assert.match(claude, /AGENTS\.md/, 'CLAUDE.md must point at AGENTS.md');
});

/* Debt paid on 2026-10-02. Each row below said "nothing checks this"; each
   now names the machine that does, and the machine is proved to bite. A row
   that goes back to DEBT while its machine still exists is a register that
   under-reports, which is the same lie as over-reporting, one way round. */
const rowOf = (plate) => readFileSync(path.join(ROOT, REGISTER), 'utf8')
  .split('\n').find((l) => new RegExp(`^\\| [A-Za-z]+ \\| ${plate} \\|`).test(l));

test('SEC-004: the full-history secret scan runs in CI and the row says so', () => {
  const row = rowOf('SEC-004');
  assert.ok(row, 'STD-015 has no SEC-004 row');
  assert.match(row, /`\[AUTO: \.github\/workflows\/secrets\.yml\]`/, 'SEC-004 names the secret-scan workflow as its machine');
  assert.match(row, /`numengames\/\.github`, pinned by commit/, 'SEC-004 says the scan is called from the shared repository');
  /* The scan's own steps (gitleaks over the whole history, its binary
     verified against the published checksum) moved to numengames/.github;
     what stays here is a caller pinned to a full commit, and the
     allowances only this repository can judge. */
  const wf = readFileSync(path.join(ROOT, '.github/workflows/secrets.yml'), 'utf8');
  assert.deepEqual(callerProblems('secrets', wf), [], 'secrets.yml is not a pinned caller of the shared scan');
  assert.doesNotMatch(wf, /uses: [^@\s]+@v\d/, 'actions and shared workflows are pinned by commit, never by tag (SEC-007)');
  assert.ok(existsSync(path.join(ROOT, '.gitleaks.toml')), 'the shared scan reads this repository\'s .gitleaks.toml');
});

/* ARC-011: the common jobs are called from the organisation's .github
   repository, never copied. Each of the three ways back to a copy — a
   moving ref, steps beside the call, a caller that is gone — is reported. */
test('ARC-011: the row names the register check, and every common job is a pinned caller', () => {
  const row = rowOf('ARC-011');
  assert.ok(row, 'STD-015 has no ARC-011 row');
  assert.match(row, /`numengames\/\.github`/, 'ARC-011 names the shared repository');
  assert.match(row, /`\[AUTO: machine\/tools\/check-register\.mjs\]`/, 'ARC-011 is checked by this script');
  for (const job of SHARED_JOBS) {
    const wf = readFileSync(path.join(ROOT, `.github/workflows/${job}.yml`), 'utf8');
    assert.deepEqual(callerProblems(job, wf), [], `${job}.yml is not a pinned caller of the shared job`);
  }
});

test('ARC-011: a caller on a tag, a caller with steps of its own and a missing caller are reported', () => {
  const caller = (ref) => `on: pull_request\njobs:\n  audit:\n    uses: numengames/.github/.github/workflows/audit.yml@${ref}\n`;
  assert.deepEqual(callerProblems('audit', caller('a'.repeat(40))), []);
  assert.match(callerProblems('audit', caller('v1'))[0], /not a full commit/);
  assert.match(callerProblems('audit', caller('main'))[0], /not a full commit/);
  assert.match(callerProblems('audit', caller('a'.repeat(40)) + '  copy:\n    runs-on: ubuntu-latest\n')[0], /steps of its own/);
  assert.match(callerProblems('audit', 'jobs:\n  audit:\n    runs-on: ubuntu-latest\n')[0], /does not call the shared audit job/);
  assert.match(callerProblems('audit', caller('a'.repeat(40)).replace('audit.yml@', 'monitor.yml@'))[0], /does not call the shared audit job/);

  const dir = scratch();
  try {
    execSync('git rm -q .github/workflows/monitor.yml', { cwd: dir });
    assert.match(run(dir).out, /ARC-011: \.github\/workflows\/monitor\.yml is missing/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('SEC-004: the scan config allows only what is not a secret, each with its reason', () => {
  const cfg = readFileSync(path.join(ROOT, '.gitleaks.toml'), 'utf8');
  assert.match(cfg, /useDefault = true/, 'the default rule set stays on');
  // Every allowance carries a description: an unexplained exemption is how a
  // real leak gets waved through.
  const blocks = cfg.split(/\n(?=\[\[allowlists\]\])/).filter((b) => b.startsWith('[[allowlists]]'));
  assert.ok(blocks.length > 0, 'no allowlist blocks');
  for (const b of blocks) assert.match(b, /description = "[^"]{20,}"/, `an allowlist without a reason:\n${b}`);
});

for (const [plate, file, why] of [
  ['OSS-001', 'CONTRIBUTING.md', 'a stranger has no way in'],
  ['OSS-002', 'CODE_OF_CONDUCT.md', 'nobody can read the conduct rules beforehand'],
  ['DEV-003', '.editorconfig', 'every editor writes its own whitespace'],
]) {
  test(`${plate}: ${file} is held by the presence check`, () => {
    const row = rowOf(plate);
    assert.ok(row, `STD-015 has no ${plate} row`);
    assert.match(row, /`\[(AUTO|GATE): machine\/tools\/check-register\.mjs/, `${plate} names check-register as its machine`);
    const dir = scratch();
    try {
      assert.doesNotMatch(run(dir).out, new RegExp(`${plate}: `), `${plate} reported while ${file} is present`);
      execSync(`git rm -q ${file}`, { cwd: dir });
      assert.match(run(dir).out, new RegExp(`${plate}: ${file.replace('.', '\\.')} is missing — ${why}`));
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });
}

test('TRC-004: the changelog shape is checked, and the row owes only the two sites without one', () => {
  const row = rowOf('TRC-004');
  assert.ok(row, 'STD-015 has no TRC-004 row');
  assert.match(row, /machine\/scripts\/test\/changelog-shape\.test\.mjs/, 'TRC-004 names the test that already checks the shape');
  assert.doesNotMatch(row, /no changelog-shape check/, 'TRC-004 no longer claims nothing checks the shape');
});

test('TRC-005: the roadmap is the designs folder, and it is not empty', () => {
  const row = rowOf('TRC-005');
  assert.ok(row, 'STD-015 has no TRC-005 row');
  assert.match(row, /`designs\/`/, 'TRC-005 points at the designs as the roadmap');
  const dir = scratch();
  try {
    assert.doesNotMatch(run(dir).out, /TRC-005: /, 'TRC-005 reported while designs exist');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

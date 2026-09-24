#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// check-templates.test.mjs — the template guard, proven.
//
// check-templates.mjs reads the moulds in machine/templates/ against five standards
// (T-01…T-11). Until today no test loaded it: it was one of the twelve files
// the coverage summary lists as "never loaded". A guard nobody tests can be
// wrong in either direction — miss the defect it was written for, or fire on
// a mould that is right — and a green run looks the same both ways.
//
// Each test copies the tree the guard reads into a scratch git repository,
// breaks ONE thing, runs the real script, and reads what it REPORTS. Not its
// exit code: every plate the guard cites is held by a draft standard, so the
// guard sees and does not bite (ENG-067) — exit is 0 with findings. The test
// therefore asserts on the finding line, which is what a reviewer reads.
//
// Characterisation: the guard exists, so these pass on the first run. Each
// was shown to bite by disabling the T-code it pins in the script and
// watching the test fail (see the pull request).
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync, renameSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const rmTree = (p) => rmSync(p, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });

/* Everything the guard reads: the moulds, the standards (T-11), the rules and
   readers under machine/scripts/lib, LICENSES/ (T-04). A git repo, because the guard
   discovers files with `git ls-files`. */
function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'templates-'));
  for (const p of ['machine/templates', 'machine/scripts', 'machine/guards', 'standards', 'canon', 'protocols', 'LICENSES', 'REUSE.toml'])
    cpSync(path.join(ROOT, p), path.join(dir, p), { recursive: true });
  execFileSync('git', ['-C', dir, 'init', '-q'], { stdio: 'ignore' });
  execFileSync('git', ['-C', dir, 'add', '-A'], { stdio: 'ignore' });
  execFileSync('git', ['-C', dir, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'scratch'], { stdio: 'ignore' });
  return dir;
}

/* Run the real guard on a scratch tree. `log` is both streams together, the
   way a reviewer reads the CI log: while a plate's holder is draft the finding
   is printed on stdout with a `·` (reporting only); once it is active it moves
   to stderr with a `✗`. The test must not care which. */
function run(dir) {
  const r = spawnSync('node', [path.join(dir, 'machine/scripts/check-templates.mjs')], { cwd: dir, encoding: 'utf8' });
  return { code: r.status, out: r.stdout, log: r.stdout + r.stderr };
}

const edit = (dir, rel, fn) => {
  const p = path.join(dir, rel);
  writeFileSync(p, fn(readFileSync(p, 'utf8')));
  execFileSync('git', ['-C', dir, 'add', '-A'], { stdio: 'ignore' });
};

/* Replace one frontmatter scalar in a template. */
const setFM = (dir, rel, key, value) =>
  edit(dir, rel, (t) => t.replace(new RegExp(`^${key}:.*$`, 'm'), `${key}: ${value}`));

/* Wrap a case in a scratch clone and clean up whatever happens. */
const check = (name, fn) => test(name, () => {
  const dir = scratch();
  try { fn(dir); } finally { rmTree(dir); }
});

// ── the tree as committed ────────────────────────────────────────────────────

check('the committed moulds hold every destination contract (12 templates, no finding)', (dir) => {
  const r = run(dir);
  assert.equal(r.code, 0, r.log);
  assert.match(r.out, /12 template\(s\) · every registered series covered · destination contracts hold/);
  assert.doesNotMatch(r.log, /T-\d\d /, `findings on the committed tree:\n${r.log}`);
});

// ── one mould, one defect, one T-code ────────────────────────────────────────

check('T-02: a file in machine/templates/ without .md is reported — every markdown tool is blind to it', (dir) => {
  renameSync(path.join(dir, 'machine/templates/DBT-TEMPLATE.md'), path.join(dir, 'machine/templates/DBT-TEMPLATE'));
  execFileSync('git', ['-C', dir, 'add', '-A'], { stdio: 'ignore' });
  assert.match(run(dir).log, /T-02 is not a \.md file/);
});

check('T-02: a template that names no registered series is reported', (dir) => {
  writeFileSync(path.join(dir, 'machine/templates/ZZZ-TEMPLATE.md'), '---\nid: ""\n---\n# x\n');
  execFileSync('git', ['-C', dir, 'add', '-A'], { stdio: 'ignore' });
  assert.match(run(dir).log, /T-02 does not name a registered series.*\n\s+machine\/templates\/ZZZ-TEMPLATE\.md/);
});

check('T-01: a mould with no frontmatter is reported', (dir) => {
  edit(dir, 'machine/templates/DBT-TEMPLATE.md', (t) => t.replace(/^---\n[\s\S]*?\n---\n/, ''));
  assert.match(run(dir).log, /T-01 no frontmatter.*\n\s+machine\/templates\/DBT-TEMPLATE\.md/);
});

check('T-01: a mould missing a ring-1 field teaches its absence', (dir) => {
  edit(dir, 'machine/templates/DBT-TEMPLATE.md', (t) => t.replace(/^title:.*\n/m, ''));
  assert.match(run(dir).log, /T-01 missing mandatory field "title"/);
});

check('T-03: an inline `# comment` after a value is the D-009 shape', (dir) => {
  setFM(dir, 'machine/templates/STD-TEMPLATE.md', 'status', 'draft  # draft|active|superseded');
  assert.match(run(dir).log, /T-03 inline comment after "status"/);
});

check('T-04: a licence the repository ships no text for is reported', (dir) => {
  // A folder has no licence (Oracle, 2026-09-24): the mould cannot be held to
  // its destination's. What it can still get wrong is naming a licence the
  // repository cannot grant — LICENSES/ has no text for it.
  setFM(dir, 'machine/templates/DBT-TEMPLATE.md', 'license', '"GPL-3.0-only"');
  assert.match(run(dir).log, /T-04 license "GPL-3\.0-only" has no text in LICENSES\//);
});

check('T-05: a type that does not belong to the destination series is reported', (dir) => {
  setFM(dir, 'machine/templates/MIS-TEMPLATE.md', 'type', 'documentation');
  assert.match(run(dir).log, /T-05 type "documentation" does not belong to missions\//);
});

check('T-06: a status outside the destination lifecycle is reported', (dir) => {
  setFM(dir, 'machine/templates/MIS-TEMPLATE.md', 'status', 'closed');
  assert.match(run(dir).log, /T-06 status "closed" is not in missions\/'s lifecycle/);
});

check('T-07: a field registered for no ring of the destination is reported', (dir) => {
  edit(dir, 'machine/templates/DBT-TEMPLATE.md', (t) => t.replace(/^---\n/, '---\ninvented_field: yes\n'));
  assert.match(run(dir).log, /T-07 field "invented_field" is registered for no ring of debt\//);
});

check('T-08: a version that is not bare SemVer is reported', (dir) => {
  setFM(dir, 'machine/templates/DBT-TEMPLATE.md', 'version', '"v0.1.0"');
  assert.match(run(dir).log, /T-08 version "v0\.1\.0" is not bare SemVer/);
});

check('T-08: a mould that opens above 0.1.0 is reported — a new artifact starts there (VER-021)', (dir) => {
  setFM(dir, 'machine/templates/DBT-TEMPLATE.md', 'version', '"1.0.0"');
  assert.match(run(dir).log, /T-08 version "1\.0\.0" — a new artifact opens at 0\.1\.0/);
});

check('T-09: a context card without its Pragmatic line is reported', (dir) => {
  edit(dir, 'machine/templates/DBT-TEMPLATE.md', (t) => t.replace(/^> \*\*Pragmatic:\*\*.*\n/m, ''));
  assert.match(run(dir).log, /T-09 context card has no \*\*Pragmatic:\*\* line/);
});

check('the companions (MIS-TEMPLATE-EXAMPLE, -CHANGES) are records, not moulds: destination checks do not apply', (dir) => {
  // a filled example legitimately carries a real status and a real version
  setFM(dir, 'machine/templates/MIS-TEMPLATE-EXAMPLE.md', 'version', '"3.2.1"');
  const r = run(dir);
  assert.doesNotMatch(r.log, /T-0[4-9] .*\n\s+machine\/templates\/MIS-TEMPLATE-EXAMPLE\.md/, r.log);
});

// ── coverage of the series (T-10) and the standards' shape (T-11) ────────────

check('T-10: a registered series with no mould is reported by the file it lacks', (dir) => {
  execFileSync('git', ['-C', dir, 'rm', '-q', 'machine/templates/DBT-TEMPLATE.md'], { stdio: 'ignore' });
  assert.match(run(dir).log, /T-10 absent — debt\/ is a registered series with no mould.*\n\s+machine\/templates\/DBT-TEMPLATE\.md/);
});

check('T-11: a standard that carries a log of itself is reported — git is the archive (ADR-041)', (dir) => {
  edit(dir, 'standards/STD-019-versions.md', (t) => t + '\n## Version history\n\n- 1.0.0 first\n');
  assert.match(run(dir).log, /T-11 carries a log of itself: "Version history".*\n\s+standards\/STD-019-versions\.md/);
});

check('T-11: a standard in the new shape missing one of its four sections is reported', (dir) => {
  edit(dir, 'standards/STD-019-versions.md', (t) => t.replace(/^## Why$/m, '## Rationale'));
  const r = run(dir).log;
  assert.match(r, /T-11 new shape is missing ## Why.*\n\s+standards\/STD-019-versions\.md/);
  assert.match(r, /T-11 unexpected section\(s\) at ## level: Rationale/);
});

check('T-11: the four sections out of order are reported', (dir) => {
  edit(dir, 'standards/STD-019-versions.md', (t) => {
    const why = t.indexOf('\n## Why'), refs = t.indexOf('\n## References');
    // move ## Why after ## References
    return t.slice(0, why) + t.slice(refs) + t.slice(why, refs);
  });
  assert.match(run(dir).log, /T-11 sections are .* — the shape is Rules · Check · Why · References, in that order/);
});

check('T-11: a register is a Summary and a table, and needs none of the four sections', (dir) => {
  edit(dir, 'standards/STD-015-engineering-checks.md', (t) => t.replace(/^\|.*\n/gm, ''));
  const r = run(dir).log;
  assert.match(r, /T-11 register has no table.*\n\s+standards\/STD-015-engineering-checks\.md/);
  assert.doesNotMatch(r, /new shape is missing.*\n\s+standards\/STD-015-engineering-checks\.md/);
});

check('T-11: a withdrawn standard is a stub and exempt from the shape', (dir) => {
  edit(dir, 'standards/STD-019-versions.md', (t) => t.replace(/^status: .*$/m, 'status: withdrawn').replace(/^## Why$/m, '## Whatever'));
  assert.doesNotMatch(run(dir).log, /STD-019-versions\.md/);
});

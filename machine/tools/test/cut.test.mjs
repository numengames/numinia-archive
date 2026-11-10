#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// cut.test.mjs — the counting half of a cut is right, and it never touches what it should not.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, cpSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { ROOT } from '../../scripts/lib/frontmatter.mjs';
import { bumpPatch, isoLocal, headerOf, needsBump, applyBump, addChangelogLine, fragmentName, changelogLine, appendFragmentLine, fragmentLines, FRAGMENT_HEADER, insertChangelogLine, foldFragments, nextMinor, addSiteEntry, dayUtc } from '../cut.mjs';

const DOC = (version, body = 'Body.') => `---\nid: STD-900\ntitle: "A standard"\nversion: "${version}"\nupdated: "2026-01-01T10:00:00+01:00"\n---\n# A standard\n\n${body}\n`;

test('the patch number moves, and only a plain MAJOR.MINOR.PATCH is moved', () => {
  assert.equal(bumpPatch('2.4.6'), '2.4.7');
  assert.equal(bumpPatch('0.9.9'), '0.9.10');
  assert.equal(bumpPatch('v2.4'), null);
  assert.equal(bumpPatch(undefined), null);
});

test('isoLocal prints an offset, never a bare Z (a midnight Z fails HDR-006)', () => {
  assert.match(isoLocal(new Date(2026, 9, 21, 14, 5, 9)), /^2026-10-21T14:05:09[+-]\d\d:\d\d$/);
});

test('a document needs a bump when its text changed and its version did not', () => {
  assert.equal(needsBump(DOC('1.0.0'), DOC('1.0.0', 'Changed.')), true);
  assert.equal(needsBump(DOC('1.0.0'), DOC('1.0.1', 'Changed.')), false, 'already moved');
  assert.equal(needsBump(DOC('1.0.0'), DOC('1.0.0')), false, 'untouched');
  assert.equal(needsBump(null, DOC('0.1.0')), false, 'a new file starts at its own version');
  assert.equal(needsBump('# no header\n', '# no header, edited\n'), false);
});

test('applyBump moves version and updated and leaves every other byte alone', () => {
  const before = DOC('2.4.6', 'Keep this «exactly».');
  const after = applyBump(before, new Date(2026, 9, 21, 9, 0, 0));
  assert.equal(headerOf(after).version, '2.4.7');
  assert.match(headerOf(after).updated, /^2026-10-21T09:00:00/);
  assert.equal(after.replace(/^---[\s\S]*?\n---/, ''), before.replace(/^---[\s\S]*?\n---/, ''));
  assert.equal(after.match(/^id: STD-900$/m)?.[0], 'id: STD-900');
  assert.equal(applyBump(DOC('v2'), new Date()), null);
});

const LOG = '# Changelog\n\n## [Unreleased]\n\n### 2026-10-20\n- **Fixed** old.\n';

test('log puts the line on top of today, or opens today above the last day', () => {
  const same = addChangelogLine(LOG, 'Added', 'new thing.', '2026-10-20');
  assert.match(same, /### 2026-10-20\n- \*\*Added\*\* new thing\.\n- \*\*Fixed\*\* old\.\n/);
  const next = addChangelogLine(LOG, 'Changed', 'moved.', '2026-10-21');
  assert.match(next, /## \[Unreleased\]\n\n### 2026-10-21\n- \*\*Changed\*\* moved\.\n\n### 2026-10-20\n- \*\*Fixed\*\* old\.\n/);
});

test('log refuses what changelog-shape would fail', () => {
  assert.throws(() => addChangelogLine(LOG, 'Tweaked', 'x', '2026-10-21'), /kind must be/);
  assert.throws(() => addChangelogLine(LOG, 'Fixed', 'a'.repeat(320), '2026-10-21'), /cap is 320/);
  assert.throws(() => addChangelogLine(LOG, 'Fixed', 'two\nlines', '2026-10-21'), /one non-empty line/);
  assert.throws(() => addChangelogLine('# no section\n', 'Fixed', 'x', '2026-10-21'), /Unreleased/);
});

const UPD = 'export const UPDATES: readonly UpdateVersion[] = [\n  {\n    version: "v0.169.0",\n    date: "2026-10-21",\n    entries: [\n      { type: "CHG", text: "Old." },\n    ],\n  },\n];\n';

test('site opens the next minor once, then adds to it', () => {
  assert.equal(nextMinor('v0.169.0'), 'v0.170.0');
  assert.equal(nextMinor('0.169'), null);
  const opened = addSiteEntry(UPD, 'FIX', 'The "bar" stays.', '2026-10-22', false);
  assert.match(opened, /version: "v0\.170\.0",\n {4}date: "2026-10-22",\n {4}entries: \[\n {6}\{ type: "FIX", text: "The \\"bar\\" stays\." \},\n {4}\],\n {2}\},\n {2}\{\n {4}version: "v0\.169\.0"/);
  const added = addSiteEntry(opened, 'ADD', 'More.', '2026-10-22', true);
  assert.equal(added.match(/version: /g).length, 2, 'no third version');
  assert.match(added, /entries: \[\n {6}\{ type: "ADD", text: "More\." \},\n {6}\{ type: "FIX"/);
  assert.throws(() => addSiteEntry(UPD, 'NEW', 'x', '2026-10-22', false), /type must be/);
});

test('dayUtc is the UTC date', () => {
  assert.equal(dayUtc(new Date('2026-10-21T23:30:00-02:00')), '2026-10-22');
});

/* The command line, in a scratch repository whose origin/main is its first commit. */
function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'cut-'));
  mkdirSync(path.join(dir, 'standards'));
  mkdirSync(path.join(dir, 'machine/tools'), { recursive: true });
  mkdirSync(path.join(dir, 'machine/scripts'), { recursive: true });
  cpSync(path.join(ROOT, 'machine/tools/cut.mjs'), path.join(dir, 'machine/tools/cut.mjs'));
  writeFileSync(path.join(dir, 'standards/STD-900-a.md'), DOC('1.0.0'));
  writeFileSync(path.join(dir, 'CHANGELOG.md'), '# Changelog\n');
  const g = (...a) => execFileSync('git', ['-c', 'user.email=t@t', '-c', 'user.name=t', ...a], { cwd: dir });
  g('init', '-q'); g('add', '-A'); g('commit', '-qm', 'base'); g('update-ref', 'refs/remotes/origin/main', 'HEAD');
  return dir;
}
const cut = (dir, ...a) => spawnSync('node', [path.join(dir, 'machine/tools/cut.mjs'), ...a], { cwd: dir, encoding: 'utf8' });

test('status names what an edited document still needs, and bump fixes the header', () => {
  const dir = scratch();
  try {
    const f = path.join(dir, 'standards/STD-900-a.md');
    writeFileSync(f, DOC('1.0.0', 'A new sentence.'));
    const s = cut(dir, 'status');
    assert.equal(s.status, 1);
    assert.match(s.stdout, /bump: standards\/STD-900-a\.md/);
    assert.match(s.stdout, /changelog: /);
    const b = cut(dir, 'bump');
    assert.equal(b.status, 0, b.stderr);
    assert.equal(headerOf(readFileSync(f, 'utf8')).version, '1.0.1');
    assert.doesNotMatch(cut(dir, 'status').stdout, /bump: /);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('a clean tree has nothing missing, and a new file is not bumped', () => {
  const dir = scratch();
  try {
    assert.match(cut(dir, 'status').stdout, /nothing missing/);
    writeFileSync(path.join(dir, 'standards/STD-901-b.md'), DOC('0.1.0'));
    writeFileSync(path.join(dir, 'CHANGELOG.md'), '# Changelog\n- **Added** `STD-901`.\n');
    const s = cut(dir, 'status');
    assert.doesNotMatch(s.stdout, /bump: /);
    assert.equal(s.status, 0, s.stdout);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('log and site write the files; site opens one version per branch, not one per call', () => {
  const dir = scratch();
  try {
    mkdirSync(path.join(dir, 'web/src/data'), { recursive: true });
    writeFileSync(path.join(dir, 'web/src/data/updates.ts'), UPD);
    writeFileSync(path.join(dir, 'CHANGELOG.md'), LOG);
    const g = (...a) => execFileSync('git', ['-c', 'user.email=t@t', '-c', 'user.name=t', ...a], { cwd: dir });
    g('add', '-A'); g('commit', '-qm', 'site'); g('update-ref', 'refs/remotes/origin/main', 'HEAD');
    assert.equal(cut(dir, 'site', 'FIX', 'One.').status, 0);
    assert.match(cut(dir, 'site', 'ADD', 'Two.').stdout, /added to v0\.170\.0/);
    const upd = readFileSync(path.join(dir, 'web/src/data/updates.ts'), 'utf8');
    assert.equal(upd.match(/version: /g).length, 2);
    g('checkout', '-qb', 'feat/the-bar');
    assert.equal(cut(dir, 'log', 'Fixed', 'the bar.').status, 0);
    assert.equal(readFileSync(path.join(dir, 'CHANGELOG.md'), 'utf8'), LOG, 'log leaves CHANGELOG.md alone');
    assert.equal(readFileSync(path.join(dir, 'changelog.d/feat-the-bar.md'), 'utf8'), FRAGMENT_HEADER + '- **Fixed** the bar.\n');
    assert.equal(cut(dir, 'log', 'Added', 'a baz.').status, 0);
    assert.equal(readFileSync(path.join(dir, 'changelog.d/feat-the-bar.md'), 'utf8'), FRAGMENT_HEADER + '- **Fixed** the bar.\n- **Added** a baz.\n');
    assert.doesNotMatch(cut(dir, 'status').stdout, /changelog: /);
    const bad = cut(dir, 'log', 'Fixed', 'x'.repeat(400));
    assert.equal(bad.status, 1);
    assert.match(bad.stdout, /not written: .*cap is 320/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('gate is red for any failing check, telemetry included: nothing waits for a seal any more', () => {
  const dir = scratch();
  try {
    writeFileSync(path.join(dir, 'package.json'), '{"scripts":{"test":"node -e 0"}}');
    writeFileSync(path.join(dir, 'machine/scripts/run-checks.mjs'), "console.log('FAIL telemetry'); process.exit(1);\n");
    const red = cut(dir, 'gate');
    assert.equal(red.status, 1, red.stdout);
    assert.match(red.stdout, /FAIL checks/);
    assert.doesNotMatch(red.stdout, /seal/);
    writeFileSync(path.join(dir, 'machine/scripts/run-checks.mjs'), "console.log('ok'); process.exit(0);\n");
    const green = cut(dir, 'gate');
    assert.equal(green.status, 0, green.stdout);
    assert.match(green.stdout, /gate green\n?$/);
    assert.doesNotMatch(green.stdout, /seal/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('status does not run the telemetry instrument and does not ask for a snapshot', () => {
  const dir = scratch();
  try {
    // no machine/scripts/telemetry.mjs in the scratch repository at all: status must not need it
    writeFileSync(path.join(dir, 'standards/STD-900-a.md'), DOC('1.0.0', 'A new sentence.'));
    const s = cut(dir, 'status');
    assert.doesNotMatch(s.stdout, /telemetry|seal|snapshot/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('seal is retired: it says why, changes nothing and exits 0', () => {
  const dir = scratch();
  try {
    const before = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: dir, encoding: 'utf8' });
    const r = cut(dir, 'seal');
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.stdout, /seal is retired/);
    assert.match(r.stdout, /data\/telemetry/);
    assert.equal(execFileSync('git', ['rev-parse', 'HEAD'], { cwd: dir, encoding: 'utf8' }), before, 'no commit was made');
    assert.equal(execFileSync('git', ['status', '--porcelain'], { cwd: dir, encoding: 'utf8' }), '', 'no file was touched');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('a fragment name is the branch with / as -, and a detached HEAD has none', () => {
  assert.equal(fragmentName('feat/changelog-fragments'), 'feat-changelog-fragments.md');
  assert.equal(fragmentName('fix/a/b c'), 'fix-a-b-c.md');
  assert.throws(() => fragmentName('HEAD'), /no branch name/);
  assert.throws(() => fragmentName(''), /no branch name/);
});

test('a fragment line is validated like a log line', () => {
  assert.equal(changelogLine('Fixed', ' x. '), '- **Fixed** x.');
  assert.throws(() => changelogLine('Tweaked', 'x'), /kind must be/);
  assert.throws(() => changelogLine('Fixed', 'a'.repeat(320)), /cap is 320/);
  assert.equal(appendFragmentLine('', '- **Fixed** a.'), '- **Fixed** a.\n');
  assert.equal(appendFragmentLine('- **Fixed** a.\n', '- **Added** b.'), '- **Fixed** a.\n- **Added** b.\n');
  assert.deepEqual(fragmentLines(FRAGMENT_HEADER + '- **Fixed** a.\n'), ['- **Fixed** a.']);
  assert.deepEqual(fragmentLines('note\n- **Fixed** a.\n\n- **Added** b.\n'), ['- **Fixed** a.', '- **Added** b.']);
});

test('fold: newest first, a new day heading in date order, lines on top of an existing day', () => {
  const base = '# C\n\n## [Unreleased]\n\n### 2026-10-22\n- **Fixed** c.\n\n### 2026-10-20\n- **Fixed** old.\n\n## [0.5.0]\n- x\n';
  const out = foldFragments(base, [
    { name: 'b.md', day: '2026-10-22', text: '- **Added** b1.\n- **Added** b2.\n' },
    { name: 'a.md', day: '2026-10-21', text: '- **Changed** a.\n' },
    { name: 'z.md', day: '2026-10-23', text: '- **Debt** z.\n' },
    { name: 'o.md', day: '2026-10-19', text: '- **Removed** o.\n' },
  ]);
  assert.equal(out, '# C\n\n## [Unreleased]\n\n### 2026-10-23\n- **Debt** z.\n\n### 2026-10-22\n- **Added** b2.\n- **Added** b1.\n- **Fixed** c.\n\n### 2026-10-21\n- **Changed** a.\n\n### 2026-10-20\n- **Fixed** old.\n\n### 2026-10-19\n- **Removed** o.\n\n## [0.5.0]\n- x\n');
  assert.throws(() => foldFragments(base, [{ name: 'k.md', day: '2026-10-22', text: '- **Fixed** ' + 'a'.repeat(330) + '\n' }]), /cap is 320/);
  assert.equal(foldFragments(base, []), base);
});

test('fold into an Unreleased with no day yet, and at the end of the file', () => {
  assert.equal(insertChangelogLine('# C\n\n## [Unreleased]\n\n## [0.5.0]\n', '- **Fixed** a.', '2026-10-20'), '# C\n\n## [Unreleased]\n\n### 2026-10-20\n- **Fixed** a.\n\n## [0.5.0]\n');
  assert.equal(insertChangelogLine('# C\n\n## [Unreleased]\n', '- **Fixed** a.', '2026-10-20'), '# C\n\n## [Unreleased]\n\n### 2026-10-20\n- **Fixed** a.\n');
  assert.throws(() => insertChangelogLine('# none\n', '- **Fixed** a.', '2026-10-20'), /Unreleased/);
});

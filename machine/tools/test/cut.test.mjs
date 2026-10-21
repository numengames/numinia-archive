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
import { bumpPatch, isoLocal, headerOf, needsBump, applyBump } from '../cut.mjs';

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

/* The command line, in a scratch repository whose origin/main is its first commit. */
function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'cut-'));
  mkdirSync(path.join(dir, 'standards'));
  mkdirSync(path.join(dir, 'machine/tools'), { recursive: true });
  mkdirSync(path.join(dir, 'machine/scripts'), { recursive: true });
  cpSync(path.join(ROOT, 'machine/tools/cut.mjs'), path.join(dir, 'machine/tools/cut.mjs'));
  writeFileSync(path.join(dir, 'standards/STD-900-a.md'), DOC('1.0.0'));
  writeFileSync(path.join(dir, 'CHANGELOG.md'), '# Changelog\n');
  // a stand-in telemetry instrument that reports "current", so `status` isolates the other findings
  writeFileSync(path.join(dir, 'machine/scripts/telemetry.mjs'), 'process.exit(0);\n');
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

test('gate does not call red a check that only seal can satisfy', () => {
  const dir = scratch();
  try {
    writeFileSync(path.join(dir, 'machine/scripts/run-checks.mjs'), "console.log('FAIL telemetry'); process.exit(1);\n");
    writeFileSync(path.join(dir, 'package.json'), '{"scripts":{"test":"node -e 0"}}');
    const g = cut(dir, 'gate');
    assert.match(g.stdout, /wait checks .*telemetry waits for seal/);
    assert.equal(g.status, 0, g.stdout);
    writeFileSync(path.join(dir, 'machine/scripts/run-checks.mjs'), "console.log('FAIL std-004'); process.exit(1);\n");
    assert.equal(cut(dir, 'gate').status, 1, 'any other failing check is still red');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

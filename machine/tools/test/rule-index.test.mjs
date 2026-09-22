#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// rule-index.test.mjs — the index AGENTS.md carries is the corpus's own words.
//
// The tool is the thing under test: what it generates, and whether --check
// notices when AGENTS.md and the corpus disagree. A hand-written index of 46
// rules is D-031 again — it goes stale the first time a `Binds:` line is
// edited, and nothing notices because nothing reads it back.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { execFileSync, execSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { ROOT } from '../../scripts/lib/frontmatter.mjs';
import { buildIndex, BEGIN, END } from '../rule-index.mjs';

/* A scratch clone of what the tool reads, so proving --check bites never
   leaves the real tree edited. */
function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'rule-index-'));
  for (const p of ['standards', 'protocols', 'canon', 'machine', 'AGENTS.md', 'package.json'])
    cpSync(path.join(ROOT, p), path.join(dir, p), { recursive: true });
  execSync('git init -q && git add -A && git -c user.email=t@t -c user.name=t commit -qm scratch', { cwd: dir });
  return dir;
}

function run(dir, ...args) {
  try {
    return { code: 0, out: execFileSync('node', ['machine/tools/rule-index.mjs', ...args], { cwd: dir, encoding: 'utf8' }) };
  } catch (e) {
    return { code: e.status, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}

test('every rule document appears exactly once', () => {
  const rows = buildIndex(ROOT).rows;
  const ids = rows.map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length, 'an identifier is listed twice');
  const tracked = execFileSync('git', ['-C', ROOT, 'ls-files', 'standards/*.md', 'protocols/*.md', 'canon/*.md'], { encoding: 'utf8' })
    .split('\n').filter(Boolean);
  assert.equal(rows.length, tracked.length, `${rows.length} rows for ${tracked.length} rule documents`);
});

test("a rule's scope is quoted from its own Binds line, never invented", () => {
  const rows = buildIndex(ROOT).rows;
  for (const row of rows) {
    if (row.binds === null) continue;
    const text = readFileSync(path.join(ROOT, row.file), 'utf8');
    const first = row.binds.split(/[;—]/)[0].trim().slice(0, 40);
    assert.ok(
      text.replace(/\s+/g, ' ').includes(first),
      `${row.id}: the index says "${first}…", which is not in its Binds line`,
    );
  }
});

test('a document with no Binds line is declared, not guessed', () => {
  // 15 of 46 never say whom they bind — the eight canon by design, plus seven
  // standards and one protocol. The index must show the hole, because an
  // invented scope is worse than a stated gap.
  const rows = buildIndex(ROOT).rows;
  const none = rows.filter((r) => r.binds === null);
  assert.ok(none.length > 0, 'the fixture has changed: no document lacks a Binds line');
  for (const r of none)
    assert.match(r.cell, /no scope line/, `${r.id} has no Binds line and the index does not say so`);
});

test('--check passes on the committed tree', () => {
  const dir = scratch();
  try {
    const { code, out } = run(dir, '--check');
    assert.equal(code, 0, out);
    assert.match(out, /matches the corpus/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('--check fails when a Binds line changes and AGENTS.md does not', () => {
  const dir = scratch();
  try {
    const f = path.join(dir, 'standards/STD-022-secrets.md');
    writeFileSync(f, readFileSync(f, 'utf8').replace(
      '**Binds:** every file in this repository',
      '**Binds:** every file in this repository and every consumer of it',
    ));
    const { code, out } = run(dir, '--check');
    assert.equal(code, 1);
    assert.match(out, /STD-022/);
    assert.match(out, /DRIFTED|stale/i);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('--check fails when a rule document is added and the index is not regenerated', () => {
  const dir = scratch();
  try {
    cpSync(path.join(dir, 'standards/STD-022-secrets.md'), path.join(dir, 'standards/STD-099-probe.md'));
    writeFileSync(
      path.join(dir, 'standards/STD-099-probe.md'),
      readFileSync(path.join(dir, 'standards/STD-099-probe.md'), 'utf8').replace('"STD-022"', '"STD-099"'),
    );
    execSync('git add -A', { cwd: dir });
    const { code, out } = run(dir, '--check');
    assert.equal(code, 1);
    assert.match(out, /STD-099/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('writing the index is idempotent and only touches its own block', () => {
  const dir = scratch();
  try {
    const before = readFileSync(path.join(dir, 'AGENTS.md'), 'utf8');
    run(dir);
    const once = readFileSync(path.join(dir, 'AGENTS.md'), 'utf8');
    run(dir);
    assert.equal(readFileSync(path.join(dir, 'AGENTS.md'), 'utf8'), once, 'a second write changed the file');
    // Everything outside the markers survives untouched.
    const outside = (t) => t.slice(0, t.indexOf(BEGIN)) + t.slice(t.indexOf(END) + END.length);
    assert.equal(outside(once), outside(before), 'the tool edited AGENTS.md outside its own block');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('the tool declares its blindness', () => {
  const registry = JSON.parse(readFileSync(path.join(ROOT, 'machine/scripts/blind-spots.json'), 'utf8'));
  const entry = registry.guards['rule-index'];
  assert.ok(entry, 'machine/scripts/blind-spots.json has no rule-index entry');
  assert.equal(entry.script, 'machine/tools/rule-index.mjs');
  assert.ok(entry.manual, 'rule-index takes arguments and is run by hand: it must be marked manual');
  const spots = entry.blind_to.map((b) => b.spot).join(' ').toLowerCase();
  assert.match(spots, /binds/, 'it must declare that it reads the Binds line and not the rule itself');
});

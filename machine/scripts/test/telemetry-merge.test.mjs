#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// telemetry-merge.test.mjs — two branches that each change the corpus
// differently do not clash on telemetry when merged in sequence.
//
// Until this change, every PR committed its own machine/telemetry/
// {latest.json,docs.json,latest.md}, a byte-exact snapshot of its own tree.
// Two such snapshots, each correct for its own branch, textually conflict on
// the same lines (totals, corpus_hash) the moment the branches merge in
// sequence — the failure mode behind "FAIL telemetry" on PR #713, though
// neither branch had done anything wrong.
//
//   TRACKING   latest.json/docs.json/latest.md are no longer committed; only
//              history.jsonl (ledger) and claims.json (hand-edited) are.
//   NO CLASH   history.jsonl stays the one tracked file both branches still
//              append to, and `merge=union` resolves that without a conflict
//              — here proven with real sequential git merges, not a stub.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const rmTree = (p) => rmSync(p, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const tracked = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);

test('.gitattributes gives machine/telemetry/history.jsonl a union merge', () => {
  assert.match(read('.gitattributes'), /^machine\/telemetry\/history\.jsonl merge=union$/m);
});

test('latest.json, docs.json and latest.md are no longer tracked; history.jsonl and claims.json still are', () => {
  for (const f of ['machine/telemetry/latest.json', 'machine/telemetry/docs.json', 'machine/telemetry/latest.md'])
    assert.ok(!tracked.includes(f), `${f} is still committed — it should be regenerated, not merged`);
  for (const f of ['machine/telemetry/history.jsonl', 'machine/telemetry/claims.json'])
    assert.ok(tracked.includes(f), `${f} must stay tracked`);
});

test('telemetry is regenerated before anything reads it in CI: npm test (pretest) runs before the build checks, and web\'s build runs before them too', () => {
  const ci = read('.github/workflows/ci.yml');
  const order = ['tests', 'build', 'build checks'].map((name) => ci.indexOf(`name: ${name}`));
  assert.ok(order.every((i) => i >= 0) && order[0] < order[1] && order[1] < order[2], 'CI step order changed: tests → build → build checks must hold, since the first two regenerate telemetry and "build checks" (telemetry --check) reads it');
  const gi = read('.gitignore');
  for (const f of ['machine/telemetry/latest.json', 'machine/telemetry/docs.json', 'machine/telemetry/latest.md']) assert.match(gi, new RegExp(`^${f.replace(/\//g, '\\/')}$`, 'm'));
});

test('npm test regenerates telemetry first (pretest), and web\'s build does too', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.scripts.pretest, 'node machine/scripts/telemetry.mjs');
  const webPkg = JSON.parse(read('web/package.json'));
  assert.match(webPkg.scripts.build, /^node \.\.\/machine\/scripts\/telemetry\.mjs &&/);
});

// The real proof: two branches each append a different line to history.jsonl
// (what telemetry.mjs does on every run) and change a different corpus file.
// Merged one after the other, through real git, with .gitattributes honoured.
test('two branches that each regenerate telemetry merge in sequence without conflict', () => {
  const base = mkdtempSync(path.join(tmpdir(), 'telemetry-merge-'));
  try {
    const git = (cwd, ...a) => execFileSync('git', ['-C', cwd, '-c', 'user.name=t', '-c', 'user.email=t@t', ...a], { encoding: 'utf8' });
    mkdirSync(path.join(base, 'machine/telemetry'), { recursive: true });
    writeFileSync(path.join(base, '.gitattributes'), 'machine/telemetry/history.jsonl merge=union\n');
    writeFileSync(path.join(base, 'machine/telemetry/history.jsonl'), '{"corpus_hash":"base0000"}\n');
    writeFileSync(path.join(base, 'file-a.md'), 'base\n');
    writeFileSync(path.join(base, 'file-b.md'), 'base\n');
    git(base, 'init', '--quiet'); git(base, 'config', 'gc.auto', '0');
    git(base, 'add', '-A'); git(base, 'commit', '-q', '-m', 'base');

    // branch A: changes file-a.md, appends its own telemetry line
    const a = path.join(base, '..', 'telemetry-merge-a-' + path.basename(base));
    execFileSync('git', ['clone', '--quiet', base, a]);
    writeFileSync(path.join(a, 'file-a.md'), 'changed by A\n');
    writeFileSync(path.join(a, 'machine/telemetry/history.jsonl'), '{"corpus_hash":"base0000"}\n{"corpus_hash":"aaaaaaaa"}\n');
    git(a, 'add', '-A'); git(a, 'commit', '-q', '-m', 'A: change file-a, regenerate telemetry');

    // branch B, forked from the same base: changes file-b.md, appends a different telemetry line
    const b = path.join(base, '..', 'telemetry-merge-b-' + path.basename(base));
    execFileSync('git', ['clone', '--quiet', base, b]);
    writeFileSync(path.join(b, 'file-b.md'), 'changed by B\n');
    writeFileSync(path.join(b, 'machine/telemetry/history.jsonl'), '{"corpus_hash":"base0000"}\n{"corpus_hash":"bbbbbbbb"}\n');
    git(b, 'add', '-A'); git(b, 'commit', '-q', '-m', 'B: change file-b, regenerate telemetry');

    // A merges into base (main) first — trivial, nothing else there yet
    execFileSync('git', ['-C', base, 'fetch', '--quiet', a, 'HEAD']);
    git(base, 'merge', '--quiet', '--no-ff', 'FETCH_HEAD', '-m', 'merge A');

    // B merges into base (main) second — the case that used to turn main red:
    // both A and B touched history.jsonl, and B was never rebased on A.
    let threw = null;
    try {
      execFileSync('git', ['-C', base, 'fetch', '--quiet', b, 'HEAD']);
      git(base, 'merge', '--quiet', '--no-ff', 'FETCH_HEAD', '-m', 'merge B');
    } catch (e) { threw = e; }
    assert.equal(threw, null, threw ? `merge B into base conflicted: ${threw.stderr || threw.message}` : undefined);

    const merged = readFileSync(path.join(base, 'machine/telemetry/history.jsonl'), 'utf8');
    for (const h of ['base0000', 'aaaaaaaa', 'bbbbbbbb']) assert.match(merged, new RegExp(h), `history.jsonl lost ${h} across the sequential merges`);
    assert.equal(readFileSync(path.join(base, 'file-a.md'), 'utf8').trim(), 'changed by A');
    assert.equal(readFileSync(path.join(base, 'file-b.md'), 'utf8').trim(), 'changed by B');
    rmTree(a); rmTree(b);
  } finally { rmTree(base); }
});

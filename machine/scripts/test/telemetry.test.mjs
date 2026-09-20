#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// telemetry.test.mjs — MIS-138 acceptance, the parts that hold at step 2.
//
//   SHAPE     every figure carries value/unit/definition; dataset carries head + corpus_hash.
//   DETERMIN. two runs on the same tree agree on every value.
//   TRUTH     three fixtures counted by hand in a scratch clone come back as counted.
//
// Run: npm test
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, writeFileSync, readFileSync, readdirSync, rmSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

/* Removing a scratch clone races anything git left running in it: a detached
   `gc --auto` from the fixture commits can still be writing under .git/objects
   when the tree is unlinked, and rmdir then fails ENOTEMPTY. `force` does not
   cover that — it suppresses missing paths, not busy ones. These are the
   retry options node documents for exactly this class (EBUSY, ENOTEMPTY,
   EPERM). scratchClone also turns gc off, which removes the usual writer. */
const rmTree = (p) => rmSync(p, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });

import test from 'node:test';
/* A case returns true, false, or a string: a string starting `skipped:` is a
   named skip; any other string is the reason it failed. */
const check = (name, fn) => test(name, (t) => {
  const r = fn();
  if (typeof r === 'string' && r.startsWith('skipped:')) return t.skip(r.slice(8).trim());
  if (r === false || typeof r === 'string') throw new Error(typeof r === 'string' ? r : 'returned false');
});
const run = (cwd) => JSON.parse(execFileSync('node', [path.join(cwd, 'machine/scripts/telemetry.mjs'), '--print'], { cwd, encoding: 'utf8' }));

const t1 = run(ROOT); const t2 = run(ROOT);
check('every figure carries value, unit, definition', () => Object.values(t1.figures).every((f) => 'value' in f && typeof f.unit === 'string' && f.definition.length > 10));
check('dataset carries head, corpus_hash (sha256), measured_at, families', () => /^[0-9a-f]{7}(\+index)?$/.test(t1.head) && /^[0-9a-f]{64}$/.test(t1.corpus_hash) && Array.isArray(t1.families));
check('deterministic: two runs agree on every value', () => {
  const diff = Object.keys(t1.figures).filter((k) => JSON.stringify(t1.figures[k].value) !== JSON.stringify(t2.figures[k].value));
  return diff.length === 0 || `differ: ${diff.join(', ')}`;
});
check('keys are namespaced family.key and unique per family', () => Object.keys(t1.figures).every((k) => /^[a-z]+\.[A-Za-z0-9_]+$/.test(k)));

// Criterion 6: my encoder == tiktoken.encode_ordinary over EVERY document, not one. Needs a python
// with tiktoken (TIKTOKEN_PY, default /tmp/tiktoken-venv/bin/python3) and the rank file; named skip otherwise.
check('tokens: cl100k.mjs equals tiktoken over every tracked .md (criterion 6)', () => {
  const py = process.env.TIKTOKEN_PY ?? '/tmp/tiktoken-venv/bin/python3';
  if (!existsSync(py)) return `skipped: no ${py}`;
  if (t1.figures['tokens.total'].value === null) return `skipped: ${t1.figures['tokens.total'].definition}`;
  const rows = JSON.parse(readFileSync(path.join(ROOT, 'machine/telemetry/docs.json'), 'utf8'));
  const script = "import json,sys,tiktoken\ne=tiktoken.get_encoding('cl100k_base')\nrows=json.load(sys.stdin)\nbad=[r['path'] for r in rows if len(e.encode_ordinary(open(r['path'],encoding='utf-8').read()))!=r['tokens']]\nprint(json.dumps(bad))";
  const bad = JSON.parse(execFileSync(py, ['-c', script], { cwd: ROOT, input: JSON.stringify(rows), encoding: 'utf8', env: { ...process.env, TIKTOKEN_CACHE_DIR: '/tmp/tk' } }));
  return bad.length === 0 || `differ on ${bad.length}: ${bad.slice(0, 3).join(', ')}`;
});

// D4 layer 2: the register is verified against the tree every run — open → resolved when the quote
// leaves its file, moved when it turns up in another tracked .md. The instrument never edits.
check('contradictions: claims.json states follow the tree (open → resolved / moved)', () => {
  const c = scratchClone();
  try {
    const reg = JSON.parse(readFileSync(path.join(c, 'machine/telemetry/claims.json'), 'utf8'));
    // a claim whose quote occurs in exactly one tracked .md — the only kind whose state can move
    const first = reg.claims.find((x) => x.path.endsWith('.md') && execFileSync('git', ['-C', c, 'grep', '-l', '-F', x.quote, '--', '*.md'], { encoding: 'utf8' }).trim().split('\n').length === 1);
    if (!first) return 'skipped: no .md claim in register';
    const f = path.join(c, first.path); const t = readFileSync(f, 'utf8');
    writeFileSync(f, t.split(first.quote).join('QUOTE-GONE'));
    writeFileSync(path.join(c, 'debt/moved-fixture.md'), `---\nid: DBT-999\ntitle: fixture\nstatus: active\n---\n${first.quote}\n`);
    execFileSync('git', ['-C', c, 'add', '-A'], { stdio: 'ignore' });
    const moved = run(c).figures['contradictions.claims'].value.find((r) => r.id === first.id);
    rmSync(path.join(c, 'debt/moved-fixture.md')); execFileSync('git', ['-C', c, 'add', '-A'], { stdio: 'ignore' });
    const resolved = run(c).figures['contradictions.claims'].value.find((r) => r.id === first.id);
    return (moved.state === 'moved' && moved.where === 'debt/moved-fixture.md' && resolved.state === 'resolved') || `got ${moved.state}/${moved.where} then ${resolved.state}`;
  } finally { rmTree(c); }
});

// The ledger passed 1 MiB on 2026-09-08 and execFileSync's default maxBuffer is exactly that, so
// git show started throwing ENOBUFS instead of asserting. Same 64 MiB ceiling as provenance.mjs.
// Criterion 9: the ledger only grows. Every line ever committed in history.jsonl is still in it,
// in order — a ship step that deletes machine/telemetry/ before measuring would truncate it (it did, #211–#213).
check('history.jsonl: no line ever committed has been removed', () => {
  const past = execFileSync('git', ['-C', ROOT, 'log', '--reverse', '--format=%h', '--', 'machine/telemetry/history.jsonl'], { encoding: 'utf8', maxBuffer: 1 << 26 }).trim().split('\n').filter(Boolean);
  if (!past.length) return 'skipped: no committed history';
  const now = readFileSync(path.join(ROOT, 'machine/telemetry/history.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l).corpus_hash);
  const missing = new Set();
  for (const c of past) for (const l of execFileSync('git', ['-C', ROOT, 'show', `${c}:machine/telemetry/history.jsonl`], { encoding: 'utf8', maxBuffer: 1 << 26 }).split('\n').filter(Boolean)) { const h = JSON.parse(l).corpus_hash; if (!now.includes(h)) missing.add(h.slice(0, 12)); }
  return missing.size === 0 || `removed: ${[...missing].join(', ')}`;
});

check('fixture: an added done mission without Closure moves missions.total and done_without_closure by exactly 1', () => {
  const clone = scratchClone();
  try {
    writeFileSync(path.join(clone, 'missions/MIS-9999-fixture.md'), '---\nid: "MIS-999"\ntype: mission\nstatus: done\nguild: Alchemists\n---\n# fixture\n\n## Scope\nnone\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const t = run(clone);
    const d = (k) => t.figures[k].value - t1.figures[k].value;
    return (d('missions.total') === 1 && d('missions.done_without_closure') === 1 && d('corpus.docs_total') === 1) || `deltas total=${d('missions.total')} dwc=${d('missions.done_without_closure')} docs=${d('corpus.docs_total')}`;
  } finally { rmTree(clone); }
});
check('fixture: a mis-named file in debt/ lowers series.registration.debt.pct, not the count of registered', () => {
  const clone = scratchClone();
  try {
    writeFileSync(path.join(clone, 'debt/no-prefix-fixture.md'), '---\nid: "X"\ntype: documentation\nstatus: active\n---\n# f\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const a = t1.figures['series.registration'].value.debt, b = run(clone).figures['series.registration'].value.debt;
    return (b.registered === a.registered && b.total === a.total + 1 && b.pct < a.pct) || `before ${JSON.stringify(a)} after ${JSON.stringify(b)}`;
  } finally { rmTree(clone); }
});
check('fixture: corpus_hash changes when a tracked file changes, and --check then reports STALE', () => {
  const clone = scratchClone();
  try {
    execFileSync('node', [path.join(clone, 'machine/scripts/telemetry.mjs')], { cwd: clone, stdio: 'ignore' });
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    execFileSync('git', ['-C', clone, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'telemetry'], { stdio: 'ignore' });
    let r = spawnSync('node', [path.join(clone, 'machine/scripts/telemetry.mjs'), '--check'], { cwd: clone, encoding: 'utf8' });
    if (r.status !== 0) return `expected OK on a fresh dataset: ${r.stderr.trim()}`;
    const before = JSON.parse(readFileSync(path.join(clone, 'machine/telemetry/latest.json'), 'utf8')).corpus_hash;
    writeFileSync(path.join(clone, 'debt/DBT-999-fixture.md'), '---\nid: "DBT-999"\ntype: documentation\nstatus: active\n---\n# f\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    execFileSync('git', ['-C', clone, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'change'], { stdio: 'ignore' });
    r = spawnSync('node', [path.join(clone, 'machine/scripts/telemetry.mjs'), '--check'], { cwd: clone, encoding: 'utf8' });
    if (!(r.status === 1 && /STALE/.test(r.stderr))) return `expected STALE exit 1, got ${r.status}: ${r.stderr.trim()}`;
    const after = run(clone).corpus_hash;
    return before !== after || 'corpus_hash did not change';
  } finally { rmTree(clone); }
});
check('fixture: a dependency bump (web/package-lock.json) leaves corpus_hash unchanged, and --check still reports OK', () => {
  const clone = scratchClone();
  try {
    execFileSync('node', [path.join(clone, 'machine/scripts/telemetry.mjs')], { cwd: clone, stdio: 'ignore' });
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    execFileSync('git', ['-C', clone, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'telemetry'], { stdio: 'ignore' });
    const before = JSON.parse(readFileSync(path.join(clone, 'machine/telemetry/latest.json'), 'utf8')).corpus_hash;
    const lock = path.join(clone, 'web/package-lock.json');
    writeFileSync(lock, readFileSync(lock, 'utf8') + '\n');
    writeFileSync(path.join(clone, '.github/workflows/ci.yml'), readFileSync(path.join(clone, '.github/workflows/ci.yml'), 'utf8') + '\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    execFileSync('git', ['-C', clone, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'bump'], { stdio: 'ignore' });
    const r = spawnSync('node', [path.join(clone, 'machine/scripts/telemetry.mjs'), '--check'], { cwd: clone, encoding: 'utf8' });
    if (r.status !== 0) return `expected OK after a manifest-only change, got ${r.status}: ${r.stderr.trim()}`;
    return run(clone).corpus_hash === before || 'corpus_hash changed on a manifest-only commit';
  } finally { rmTree(clone); }
});

function scratchClone() {
  // Fresh repo, never the worktree's .git pointer: a fixture `git add` must touch only the clone.
  // Only tracked files go in: an untracked draft in the developer's tree would
  // otherwise be committed in the clone and shift every delta by one.
  const dir = mkdtempSync(path.join(tmpdir(), 'telemetry-'));
  const tracked = execFileSync('git', ['-C', ROOT, 'ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean)
    .filter((f) => !/^(machine\/telemetry\/|web\/(node_modules|dist|\.astro)\/)/.test(f));
  for (const f of tracked) {
    mkdirSync(path.dirname(path.join(dir, f)), { recursive: true });
    cpSync(path.join(ROOT, f), path.join(dir, f));
  }
  // machine/telemetry/ is output and stays out — except claims.json, which is input (the register)
  if (existsSync(path.join(ROOT, 'machine/telemetry/claims.json'))) { mkdirSync(path.join(dir, 'machine/telemetry'), { recursive: true }); cpSync(path.join(ROOT, 'machine/telemetry/claims.json'), path.join(dir, 'machine/telemetry/claims.json')); }
  execFileSync('git', ['-C', dir, 'init', '--quiet'], { stdio: 'ignore' });
  execFileSync('git', ['-C', dir, 'config', 'gc.auto', '0'], { stdio: 'ignore' });
  execFileSync('git', ['-C', dir, 'add', '-A'], { stdio: 'ignore' });
  execFileSync('git', ['-C', dir, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'base'], { stdio: 'ignore' });
  return dir;
}


// #401: a document created on the 18th, merged on the 19th. Squash-merge (and rebase-merge) replace
// the branch commits with one dated at the merge, so the first-add date every provenance figure
// compares `created:` against moves between the branch — where latest.json was regenerated — and
// main — where --check runs. Same corpus_hash, one figure off by one, main red with nobody at fault.
// A figure that depends on a commit date is published but not compared.
check('--check stays OK when the commits are squashed to a later date (first-add dates move, corpus does not)', () => {
  const clone = scratchClone();
  const git = (...a) => execFileSync('git', ['-C', clone, '-c', 'user.name=t', '-c', 'user.email=t@t', ...a], { stdio: 'ignore', env: { ...process.env, GIT_AUTHOR_DATE: '2026-03-01T12:00:00+00:00', GIT_COMMITTER_DATE: '2026-03-01T12:00:00+00:00' } });
  try {
    // the branch: a doc whose created day equals its first-add day — neither ahead nor behind
    writeFileSync(path.join(clone, 'debt/DBT-998-fixture.md'), '---\nid: "DBT-998"\ntype: documentation\nstatus: active\ncreated: "2026-03-01T10:00:00+02:00"\n---\n# f\n');
    git('add', '-A'); git('commit', '-q', '-m', 'doc');
    execFileSync('node', [path.join(clone, 'machine/scripts/telemetry.mjs')], { cwd: clone, stdio: 'ignore' });
    git('add', '-A'); git('commit', '-q', '-m', 'telemetry');
    let r = spawnSync('node', [path.join(clone, 'machine/scripts/telemetry.mjs'), '--check'], { cwd: clone, encoding: 'utf8' });
    if (r.status !== 0) return `expected OK on the branch: ${r.stderr.trim()}`;
    // the squash-merge, one day later: same tree, one commit, dated at the merge
    git('reset', '--soft', 'HEAD~2');
    execFileSync('git', ['-C', clone, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'squash'], { stdio: 'ignore', env: { ...process.env, GIT_AUTHOR_DATE: '2026-03-02T09:00:00+00:00', GIT_COMMITTER_DATE: '2026-03-02T09:00:00+00:00' } });
    r = spawnSync('node', [path.join(clone, 'machine/scripts/telemetry.mjs'), '--check'], { cwd: clone, encoding: 'utf8' });
    return r.status === 0 || `ALTERED after squash: ${r.stderr.trim()}`;
  } finally { rmTree(clone); }
});

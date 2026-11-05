#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// sys-013-repositories-as-data.test.mjs — the map of the repositories is DATA
// (system/repos.yaml); the table SYS-013 prints is generated from it.
//
// A hand-written table of eighteen repositories goes stale the day one is
// renamed (two were, on 2026-11-05) and nothing reads it back. So:
//
//   THE DATA     one entry per repository, a closed vocabulary for the state,
//                unique ids and names, neighbours that name repositories that
//                exist, a repository that is not yet created has no id.
//   THE TABLE    the block between the markers in SYS-013 is exactly what
//                machine/tools/repos-table.mjs generates from the data; edit
//                one and not the other and this fails.
//   THE TOOL     --check bites on a scratch clone when the data moves, and
//                the small YAML reader agrees with js-yaml where it is installed.
//   THE PROSE    SYS-013 keeps no second hand-written table of repositories,
//                and carries the section on joining and leaving.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, cpSync, existsSync } from 'node:fs';
import { execFileSync, execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { ROOT } from '../../scripts/lib/frontmatter.mjs';

const TOOL = 'machine/tools/repos-table.mjs';
const DATA = 'system/repos.yaml';
const DOC = 'system/SYS-013-the-repositories-as-wired.md';
const STATES = ['active', 'deprecated', 'to-archive', 'archived', 'to-create'];

function run(dir, ...args) {
  try {
    return { code: 0, out: execFileSync('node', [TOOL, ...args], { cwd: dir, encoding: 'utf8' }) };
  } catch (e) {
    return { code: e.status, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}

/** The parsed entries, through the tool's own reader. */
function repos(dir = ROOT) {
  const r = run(dir, '--json');
  assert.equal(r.code, 0, `${TOOL} --json failed:\n${r.out}`);
  return JSON.parse(r.out);
}

/** A scratch clone of what the tool reads, so proving --check bites never
 *  leaves the real tree edited. */
function scratch() {
  const dir = mkdtempSync(path.join(tmpdir(), 'repos-table-'));
  for (const p of ['system', 'machine', 'package.json']) {
    cpSync(path.join(ROOT, p), path.join(dir, p), {
      recursive: true,
      filter: (src) => !src.includes(`${path.sep}machine${path.sep}scripts${path.sep}lib${path.sep}tokenizer`),
    });
  }
  execSync('git init -q && git add -A && git -c user.email=t@t -c user.name=t commit -qm scratch', { cwd: dir });
  return dir;
}

/* ---------- THE DATA ---------- */

test('the data exists, in the folder that says how the system works today', () => {
  assert.ok(existsSync(path.join(ROOT, DATA)), `${DATA} does not exist`);
});

test('every entry says what it is and what it is not, who owns it and what state it is in', () => {
  for (const r of repos()) {
    for (const k of ['name', 'state', 'owner', 'is', 'is_not', 'licence'])
      assert.ok(typeof r[k] === 'string' && r[k].trim(), `${r.name ?? '(unnamed)'}: "${k}" is missing`);
    assert.ok(STATES.includes(r.state), `${r.name}: state "${r.state}" is not one of ${STATES.join(', ')}`);
    assert.ok(Array.isArray(r.former_names), `${r.name}: former_names must be a list (empty is fine)`);
    assert.ok(Array.isArray(r.reads), `${r.name}: reads must be a list (empty is fine)`);
  }
});

test('ids and names are unique, and a name once used is never used for another repository', () => {
  const rs = repos();
  const ids = rs.map((r) => r.id).filter((i) => i !== null);
  assert.equal(new Set(ids).size, ids.length, 'a GitHub id is listed twice');
  const names = rs.flatMap((r) => [r.name, ...r.former_names]);
  assert.equal(new Set(names).size, names.length, 'a name (current or former) belongs to two entries');
});

test('only a repository that does not exist yet has no GitHub id', () => {
  for (const r of repos()) {
    if (r.state === 'to-create') assert.equal(r.id, null, `${r.name}: to-create, so it has no id yet`);
    else assert.ok(Number.isInteger(r.id) && r.id > 0, `${r.name}: ${r.state}, so it has a GitHub numeric id`);
  }
});

test('a neighbour is named as "<repository>: <what>", and the repository is in the data', () => {
  const rs = repos();
  const known = new Set(rs.map((r) => r.name));
  for (const r of rs) {
    for (const edge of r.reads) {
      const m = /^([.a-z0-9-]+): \S/.exec(edge);
      assert.ok(m, `${r.name}: "${edge}" is not written "<repository>: <what it reads>"`);
      assert.ok(known.has(m[1]), `${r.name} reads "${m[1]}", which is not an entry (a former name? use the current one)`);
      assert.notEqual(m[1], r.name, `${r.name} reads itself`);
    }
  }
});

test('a repository that has been archived or is to be created is not read by a live one', () => {
  const rs = repos();
  const dead = new Set(rs.filter((r) => r.state === 'archived').map((r) => r.name));
  for (const r of rs.filter((x) => x.state === 'active')) {
    for (const edge of r.reads)
      assert.ok(!dead.has(edge.split(':')[0]), `${r.name} (active) reads ${edge.split(':')[0]}, which is archived`);
  }
});

/* ---------- THE TABLE ---------- */

test('SYS-013 carries the generated block between its markers', () => {
  const doc = readFileSync(path.join(ROOT, DOC), 'utf8');
  assert.match(doc, /<!-- repos-table:begin — generated by machine\/tools\/repos-table\.mjs from system\/repos\.yaml; do not edit by hand -->/);
  assert.match(doc, /<!-- repos-table:end -->/);
});

test('the table in SYS-013 is exactly what the data generates', () => {
  const r = run(ROOT, '--check');
  assert.equal(r.code, 0, `the table in ${DOC} has drifted from ${DATA}:\n${r.out}`);
});

test('every repository in the data appears in the table, once as a row of each table', () => {
  const doc = readFileSync(path.join(ROOT, DOC), 'utf8');
  for (const r of repos()) {
    const rows = doc.split('\n').filter((l) => l.startsWith(`| **${r.name}**`));
    assert.equal(rows.length, 2, `${r.name}: expected a row in each of the two generated tables, found ${rows.length}`);
  }
});

test('--check bites: when the data moves and the document does not, it exits 1 and names the repository', () => {
  const dir = scratch();
  const file = path.join(dir, DATA);
  writeFileSync(file, readFileSync(file, 'utf8').replace('state: to-create', 'state: active'));
  const r = run(dir, '--check');
  assert.equal(r.code, 1, 'the check stayed green after the data changed');
  assert.match(r.out, /DRIFTED/);
  assert.match(r.out, /numinia-fleet|numinia-hermes-plugin/);
});

test('the tool rewrites the block, and --check is green again', () => {
  const dir = scratch();
  const file = path.join(dir, DATA);
  writeFileSync(file, readFileSync(file, 'utf8').replace('state: to-create', 'state: active'));
  assert.equal(run(dir).code, 0);
  assert.equal(run(dir, '--check').code, 0);
});

test('--check bites on a hand edit of the document too', () => {
  const dir = scratch();
  const file = path.join(dir, DOC);
  writeFileSync(file, readFileSync(file, 'utf8').replace('| **numinia-archive** |', '| **numinia-archive** (edited by hand) |'));
  assert.equal(run(dir, '--check').code, 1);
});

/* ---------- THE READER ---------- */

test('the small YAML reader agrees with js-yaml where js-yaml is installed', (t) => {
  let yaml;
  try { yaml = createRequire(path.join(ROOT, 'web', 'package.json'))('js-yaml'); } catch { /* not installed */ }
  if (!yaml) return t.skip('web/node_modules/js-yaml is not installed');
  const theirs = yaml.load(readFileSync(path.join(ROOT, DATA), 'utf8')).repositories;
  assert.deepEqual(repos(), theirs.map((r) => ({ former_names: [], reads: [], ...r })));
});

/* ---------- THE PROSE ---------- */

test('SYS-013 keeps no hand-written table of the repositories beside the generated ones', () => {
  const doc = readFileSync(path.join(ROOT, DOC), 'utf8');
  const b = doc.indexOf('<!-- repos-table:begin');
  const e = doc.indexOf('<!-- repos-table:end -->');
  const outside = doc.slice(0, b) + doc.slice(e);
  for (const r of repos())
    assert.ok(!outside.includes(`| **${r.name}**`), `${r.name}: a hand-written row of the repositories table is still outside the markers`);
});

test('SYS-013 says how a repository joins and how it leaves', () => {
  const doc = readFileSync(path.join(ROOT, DOC), 'utf8');
  assert.match(doc, /^### Joining and leaving$/m);
  assert.match(doc, /numengames\/numengames-repo-template/);
  assert.match(doc, /system\/repos\.yaml/);
  assert.match(doc, /90 days/);
});

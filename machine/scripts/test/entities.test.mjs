#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// entities.test.mjs — machine/scripts/entities.mjs, proven against the tree.
//
// The script walks objects/ (the entity cards), writes objects/catalogue.json
// and, with --check, fetches every copy of every form, hashes it and writes
// objects/CHECK.md. These tests cover the walk and the report SHAPE without
// the network: the fetch is exercised against a local file:// copy so the
// hash comparison is real and no test depends on a third-party host.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync, execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const SCRIPT = path.join(ROOT, 'machine', 'scripts', 'entities.mjs');

const run = (cwd, args = []) => {
  const r = spawnSync('node', [SCRIPT, ...args], { cwd, encoding: 'utf8' });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
};

/** A scratch tree with one card whose only copy is a local file. */
function scratchTree({ tamper = false } = {}) {
  const dir = mkdtempSync(path.join(tmpdir(), 'entities-'));
  execSync('git init -q', { cwd: dir });
  execSync('git -c user.name=t -c user.email=t@t commit -q --allow-empty -m init', { cwd: dir });
  mkdirSync(path.join(dir, 'objects'));
  mkdirSync(path.join(dir, 'bytes'));
  const payload = Buffer.from('not a real model, but bytes all the same\n');
  const sha256 = createHash('sha256').update(payload).digest('hex');
  writeFileSync(path.join(dir, 'bytes', 'probe.bin'), payload);
  const declared = tamper ? sha256.replace(/^./, (c) => (c === '0' ? '1' : '0')) : sha256;
  writeFileSync(path.join(dir, 'objects', 'probe.md'), `---
id: "ndg-probe"
title: "Probe"
type: entity
status: active
version: "0.1.0"
created: "2026-09-20T08:00:00Z"
updated: "2026-09-20T08:00:00Z"
license: "CC0-1.0"
entity: object
forms:
  - role: model
    format: bin
    license: "CC0-1.0"
    rights_holder: "Nobody"
    embedded_license: none
    copies:
      - url: "${pathToFileURL(path.join(dir, 'bytes', 'probe.bin')).href}"
        sha256: "${declared}"
        bytes: ${payload.length}
---

A probe. The body is prose the catalogue does not copy.
`);
  return dir;
}

test('the script exists and declares its blind spots on a plain walk', () => {
  assert.ok(existsSync(SCRIPT), 'machine/scripts/entities.mjs is missing');
  const dir = scratchTree();
  try {
    const r = run(dir);
    assert.equal(r.code, 0, r.out);
    assert.ok(r.out.includes('BLIND TO (D-025)'), 'the declaration must print on every run');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('a walk writes catalogue.json with the card, its forms and copies — never the body', () => {
  const dir = scratchTree();
  try {
    const r = run(dir);
    assert.equal(r.code, 0, r.out);
    const cat = JSON.parse(readFileSync(path.join(dir, 'objects', 'catalogue.json'), 'utf8'));
    assert.equal(cat.entities.length, 1);
    const e = cat.entities[0];
    assert.equal(e.id, 'ndg-probe');
    assert.equal(e.slug, 'probe');
    assert.equal(e.entity, 'object');
    assert.equal(e.status, 'active');
    assert.equal(e.forms.length, 1);
    assert.equal(e.forms[0].role, 'model');
    assert.equal(e.forms[0].copies.length, 1);
    assert.equal(e.forms[0].copies[0].bytes, 41);
    assert.ok(!JSON.stringify(cat).includes('A probe. The body'), 'the catalogue is an index, not a copy');
    assert.ok(!existsSync(path.join(dir, 'objects', 'CHECK.md')), 'a plain walk writes no CHECK.md');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('--check fetches each copy, compares the hash and writes CHECK.md with date and commit', () => {
  const dir = scratchTree();
  try {
    const r = run(dir, ['--check']);
    assert.equal(r.code, 0, r.out);
    const md = readFileSync(path.join(dir, 'objects', 'CHECK.md'), 'utf8');
    const head = execSync('git rev-parse --short HEAD', { cwd: dir }).toString().trim();
    assert.match(md, /^# Copy check — \d{4}-\d{2}-\d{2}/m, 'the report is dated');
    assert.ok(md.includes(head), 'the report names the commit it was run on');
    assert.match(md, /\| probe \| model \| .* \| ok \|/, 'one row per copy, verdict ok');
    assert.match(md, /1 ok · 0 mismatch · 0 unreachable/, 'the count is the resilience figure');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('--check reports a hash mismatch as such and exits 1', () => {
  const dir = scratchTree({ tamper: true });
  try {
    const r = run(dir, ['--check']);
    assert.equal(r.code, 1, `a mismatch must fail the check:\n${r.out}`);
    const md = readFileSync(path.join(dir, 'objects', 'CHECK.md'), 'utf8');
    assert.match(md, /\| mismatch \|/, 'the row says mismatch');
    assert.match(md, /0 ok · 1 mismatch · 0 unreachable/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('the real tree walks clean and every card is consistent with the catalogue on disk', () => {
  const r = run(ROOT);
  assert.equal(r.code, 0, r.out);
  const cat = JSON.parse(readFileSync(path.join(ROOT, 'objects', 'catalogue.json'), 'utf8'));
  assert.ok(cat.entities.length >= 1, 'objects/ holds at least one card');
  for (const e of cat.entities) {
    assert.ok(e.forms.length >= 1, `${e.slug}: an entity with no form is a name, not a thing`);
    for (const f of e.forms) {
      assert.ok(f.license, `${e.slug}/${f.role}: every form carries its own licence`);
      assert.ok(f.rights_holder, `${e.slug}/${f.role}: every form names its rights holder`);
      assert.ok(f.copies.length >= 1, `${e.slug}/${f.role}: a form with no copy has no bytes`);
      for (const c of f.copies) {
        assert.ok(c.url || (c.path && c.commit) || (c.path && c.repo === undefined),
          `${e.slug}/${f.role}: a copy is a url, a repo path pinned to a commit, or a path in this repository`);
        if (c.sha256 !== undefined) assert.match(c.sha256, /^[0-9a-f]{64}$/, `${e.slug}/${f.role}: sha256 is a hex digest`);
        if (c.bytes !== undefined) assert.ok(Number.isInteger(c.bytes) && c.bytes > 0, `${e.slug}/${f.role}: bytes is a size`);
        if (!c.url && !c.commit) assert.ok(existsSync(path.join(ROOT, c.path)),
          `${e.slug}/${f.role}: path copy ${c.path} does not exist in this tree`);
      }
    }
  }
  // The index, not HEAD: the archive's guards read what is `git add`ed, and
  // so does this — a regenerated catalogue that is staged counts.
  const committed = JSON.parse(execSync('git show :objects/catalogue.json', { cwd: ROOT, encoding: 'utf8' }));
  assert.deepEqual(cat, committed, 'objects/catalogue.json on disk differs from the index — run node machine/scripts/entities.mjs and git add it');
});

test('an agent card (agents/<name>/AGENT.md) is walked too, and a path copy in this repository is read from the tree', () => {
  // The agents are entities as much as the objects: the card lives inside
  // the agent's folder, beside the forms it indexes (SOUL, OPERATOR…). A
  // copy that is a path with no commit is this repository's own file — git
  // pins it, the card does not repeat the commit — and --check hashes what
  // is on disk.
  const dir = scratchTree();
  try {
    mkdirSync(path.join(dir, 'agents', 'probe'), { recursive: true });
    writeFileSync(path.join(dir, 'agents', 'probe', 'SOUL.md'), '# Probe\n');
    writeFileSync(path.join(dir, 'agents', 'probe', 'AGENT.md'), `---
id: "probe"
title: "Probe"
type: entity
status: draft
version: "0.1.0"
created: "2026-09-20T08:00:00Z"
updated: "2026-09-20T08:00:00Z"
license: "CC0-1.0"
entity: agent
type_execution: digital
forms:
  - role: soul
    format: markdown
    license: "CC0-1.0"
    rights_holder: "Numen Games S.L."
    copies:
      - path: agents/probe/SOUL.md
---

A probe agent.
`);
    execSync('git add -A', { cwd: dir });
    const r = run(dir, ['--check']);
    assert.equal(r.code, 0, r.out);
    const cat = JSON.parse(readFileSync(path.join(dir, 'objects', 'catalogue.json'), 'utf8'));
    const agent = cat.entities.find((e) => e.id === 'probe');
    assert.ok(agent, 'the agent card is in the catalogue');
    assert.equal(agent.entity, 'agent');
    assert.equal(agent.path, 'agents/probe/AGENT.md');
    assert.equal(agent.slug, 'probe', 'the slug of an agent card is the folder name, not AGENT');
    const md = readFileSync(path.join(dir, 'objects', 'CHECK.md'), 'utf8');
    assert.match(md, /\| probe \| soul \| agents\/probe\/SOUL\.md \| ok \|/, 'a path copy with no commit is hashed from the tree and reported ok');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

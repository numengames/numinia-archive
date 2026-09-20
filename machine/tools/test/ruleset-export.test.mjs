#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// ruleset-export.test.mjs — the snapshot is shaped like the panel's answer.
//
// What this can test without a credential: the SHAPE of the file that is
// committed. Whether it currently matches the live ruleset needs admin scope
// and is what `node machine/tools/ruleset-export.mjs --check` answers; CI's token
// cannot read rulesets, so that comparison is a person's command, not a gate.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const SNAPSHOT = path.join(ROOT, '.github/rulesets/protect-main.json');
const snapshot = JSON.parse(readFileSync(SNAPSHOT, 'utf8'));

test('the snapshot states who may bypass', () => {
  // The API omits `bypass_actors` when the list is empty, so a plain
  // `gh api > file` refresh deletes it. An absent key reads as "unknown"
  // where the file said "nobody", and "nobody bypasses main" is the most
  // consequential sentence in the file.
  assert.ok('bypass_actors' in snapshot,
    'bypass_actors is missing: the snapshot was refreshed with a command that drops it. Use node machine/tools/ruleset-export.mjs');
  assert.ok(Array.isArray(snapshot.bypass_actors), 'bypass_actors must be a list');
});

test('the snapshot carries no transport noise', () => {
  // Five fields the API adds describe the HTTP answer, not the configuration.
  // They change on their own and turn every refresh into a diff nobody reads.
  const noise = ['_links', 'node_id', 'created_at', 'updated_at', 'current_user_can_bypass']
    .filter((k) => k in snapshot);
  assert.equal(noise.length, 0, `transport fields in the snapshot: ${noise.join(', ')}`);
});

test('the snapshot still describes the ruleset it claims to', () => {
  assert.equal(snapshot.id, 21281544, 'the snapshot must stay pinned to the ruleset it documents');
  assert.equal(snapshot.target, 'branch');
  assert.equal(snapshot.enforcement, 'active',
    'a snapshot of a disabled ruleset is a record of nothing enforcing anything');
  assert.deepEqual(snapshot.conditions?.ref_name?.include, ['~DEFAULT_BRANCH'],
    'the ruleset must apply to the default branch');
});

test('every required status check names a real job', () => {
  // A required check whose name matches no job in any workflow can never
  // report, so `main` waits on a result that will not arrive — protection
  // that looks strict and is inert. Checks from an external integration
  // (Cloudflare, a bot) have no job here, so only GitHub Actions ones are
  // resolvable; those carry integration_id 15368.
  const rule = snapshot.rules.find((r) => r.type === 'required_status_checks');
  assert.ok(rule, 'the ruleset must require status checks');
  const required = rule.parameters.required_status_checks ?? [];
  assert.ok(required.length > 0, 'a ruleset requiring zero checks gates nothing');

  const workflows = execSync('git ls-files .github/workflows', { cwd: ROOT }).toString().trim().split('\n').filter(Boolean);
  const jobs = new Set();
  for (const wf of workflows) {
    const text = readFileSync(path.join(ROOT, wf), 'utf8');
    // job ids are the keys nested one level under `jobs:` — two spaces, then
    // a name, then a colon. Parsed by shape because the repo has no YAML
    // dependency and adding one to read seven lines is a poor trade.
    const body = text.split(/^jobs:\s*$/m)[1] ?? '';
    for (const m of body.matchAll(/^ {2}([A-Za-z0-9_-]+):/gm)) jobs.add(m[1]);
  }
  const actions = required.filter((c) => c.integration_id === 15368);
  for (const c of actions) {
    assert.ok(jobs.has(c.context),
      `required check "${c.context}" matches no job in .github/workflows (found: ${[...jobs].join(', ')}). main would wait forever for it.`);
  }
});

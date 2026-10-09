#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// secrets.test.mjs — the machine behind STD-022 (Secrets), row by row.
//
//   KEY-054  nothing secret in the tree: the full-history scan runs in CI
//   KEY-057  settings live in the environment: no tracked environment or key file
//   KEY-056  the security policy sends a finder to a private channel, never
//            to an open issue
//   and      what happens once a weakness is known (change the key before
//            writing, answer in time) is a procedure's steps, not a rule a
//            machine could check: KEY-055 is retired into it.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const tracked = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
const std = readdirSync(path.join(ROOT, 'standards')).find((f) => f.startsWith('STD-022-'));
const text = read(`standards/${std}`);
const checkRows = text.slice(text.indexOf('## Check')).split('\n').filter((l) => /^\| KEY-\d{3} /.test(l));

/* A file that holds settings or keys by its very name. `.env.example` and
   its kin hold names, not values, and are allowed. */
export function isSecretFile(rel) {
  const base = path.posix.basename(rel);
  if (/^\.env(\..+)?$/.test(base)) return !/\.(example|sample|template)$/.test(base);
  return /^\.dev\.vars$/.test(base) || /\.(pem|key|p12|pfx)$/.test(base) || /^id_(rsa|ed25519|ecdsa)$/.test(base);
}

test('KEY-057: the secret-file reader knows a settings file from its example', () => {
  for (const f of ['.env', 'web/.env.production', '.dev.vars', 'certs/site.pem', 'deploy/id_ed25519']) assert.ok(isSecretFile(f), f);
  for (const f of ['.env.example', 'web/.env.sample', 'README.md', 'monkey.keys.md']) assert.ok(!isSecretFile(f), f);
});

test('KEY-057: no environment or key file is tracked', () => {
  const found = tracked.filter(isSecretFile);
  assert.deepEqual(found, [], `tracked: ${found.join(', ')}`);
});

/* The scan itself (gitleaks, the whole history, the checksum-verified
   binary) lives once, in the organisation's .github repository; this
   repository keeps the caller that says when it runs, and the allowances
   only it can judge. */
test('KEY-054: the full-history secret scan runs on every pull request and on main', () => {
  const wf = read('.github/workflows/secrets.yml');
  assert.match(wf, /^\s*uses:\s*numengames\/\.github\/\.github\/workflows\/secrets\.yml@[0-9a-f]{40}\s*$/m, 'the caller does not call the shared secret scan pinned to a full commit');
  assert.doesNotMatch(wf, /^\s*(runs-on|steps):/m, 'the caller runs steps of its own: a hand copy of the shared scan');
  assert.match(wf, /pull_request/);
  assert.match(wf, /push:\s*\n\s*branches: \[main\]/, 'the scan does not run on pushes to main');
  assert.match(wf, /schedule:/, 'the scan does not run weekly');
  assert.ok(tracked.includes('.gitleaks.toml'), 'no .gitleaks.toml: the shared scan has no allowances of this repository to read');
});

test('KEY-056: the security policy sends a finder to the private channel, never to an open issue', () => {
  const policy = read('SECURITY.md');
  assert.match(policy, /github\.com\/numengames\/numinia-archive\/security\/advisories\/new/, 'SECURITY.md does not link the private reporting form');
  assert.match(policy, /do \*\*not\*\* open a public issue/i, 'SECURITY.md does not forbid the public issue');
});

test('STD-022: every row of its Check table is verified by a machine', () => {
  assert.ok(checkRows.length > 0, 'no Check rows read');
  const hand = checkRows.filter((r) => /by hand|by reading|at review|nothing yet|not checked|not wired/i.test(r.split('|')[4] ?? ''));
  assert.deepEqual(hand.map((r) => r.split('|')[1].trim()), []);
});

test('KEY-055 is retired into the procedure for a security weakness, which changes the key before anything is written', () => {
  const ledger = JSON.parse(read('machine/scripts/retired-plates.json')).plates;
  assert.ok(ledger['KEY-055'], 'KEY-055 is not in the retired-plates ledger');
  assert.match(ledger['KEY-055'].now, /PRO-036/);
  assert.ok(!checkRows.some((r) => r.startsWith('| KEY-055 ')), 'KEY-055 still has a Check row');
  const pro = readdirSync(path.join(ROOT, 'procedures')).find((f) => f.startsWith('PRO-036-'));
  assert.ok(pro, 'no PRO-036');
  const body = read(`procedures/${pro}`);
  assert.match(body, /before[^.]*writ/i, 'the procedure does not change the key before writing');
  assert.match(body, /seven days/i, 'the procedure does not set the first answer');
});

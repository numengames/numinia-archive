#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// hermes-approvals.test.mjs — a config.yaml does not say less than its own
// OPERATOR.md promised.
//
// THE PROBLEM THIS COVERS
// automation_level lives in agents/<id>/OPERATOR.md; the rule it is supposed
// to drive — approvals.mode and the push/PR deny patterns — lives in
// agents/<id>/adapters/hermes/config.yaml. Nothing checked the two agreed.
// Twelve adapters all said `smart` no matter what level their operator file
// declared, and the second-scope story this ticket excludes (deciding what
// to DO about a divergence beyond detecting it) still needs a divergence to
// find first.
//
// WHAT IS UNDER TEST
// machine/scripts/generate-hermes-approvals.mjs is the generator; this file
// asserts its output already matches what is on disk (so CI fails the
// moment somebody hand-edits a config.yaml out of step with its own
// OPERATOR.md, without needing to re-run the generator to find out), and
// unit-tests the rule table itself against STD-042 row 7.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LEVEL_RULES, LEVEL_ORDER, ruleFor, ruleForAgent, ORCHESTRATOR, SPECIALIST_DENY } from '../lib/hermes-approval-levels.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const GENERATOR = path.resolve(ROOT, 'machine', 'scripts', 'generate-hermes-approvals.mjs');

function field(text, name) {
  const m = text.match(new RegExp(`^${name}:\\s*"?([^"\\n]*)"?\\s*$`, 'm'));
  return m ? m[1].trim() : undefined;
}

const OPERATORS = execFileSync('git', ['-C', ROOT, 'ls-files', 'agents/*/OPERATOR.md'], { encoding: 'utf8' })
  .split('\n').filter((f) => f && !f.includes('/_template/'));

test('the five automation levels each name a Hermes approvals.mode Hermes actually ships', () => {
  assert.deepEqual(Object.keys(LEVEL_RULES).sort(), [...LEVEL_ORDER].sort());
  for (const level of LEVEL_ORDER) {
    const rule = ruleFor(level);
    assert.ok(['manual', 'smart', 'off'].includes(rule.mode), `${level}: "${rule.mode}" is not a Hermes approvals.mode`);
    assert.ok(Array.isArray(rule.requiredDeny));
  }
});

test('assisted is the one level the rule table denies push/PR for outright (STD-042 row 7: "never")', () => {
  const assisted = ruleFor('assisted');
  assert.equal(assisted.mode, 'manual', 'manual alone cannot express "never" — a human can still say yes when asked');
  assert.ok(assisted.requiredDeny.some((p) => /push/.test(p)), 'assisted has no deny pattern for push');
  assert.ok(assisted.requiredDeny.some((p) => /pr create|pull-request/.test(p)), 'assisted has no deny pattern for opening a pull request');
});

test('partial is graded "asks", not "never", for push/PR — no deny pattern, manual mode is enough', () => {
  const partial = ruleFor('partial');
  assert.equal(partial.mode, 'manual');
  assert.deepEqual(partial.requiredDeny, []);
});

test('an unknown or missing level is rejected, not silently treated as the loosest one', () => {
  assert.throws(() => ruleFor('autonomous'));
  assert.throws(() => ruleFor(undefined));
});

test('every agent declares one of the five levels in its OPERATOR.md (prerequisite for the divergence check below)', () => {
  assert.ok(OPERATORS.length >= 10, `only ${OPERATORS.length} operator files`);
  const bad = OPERATORS
    .map((f) => [f, field(readFileSync(path.join(ROOT, f), 'utf8'), 'automation_level')])
    .filter(([, v]) => !v || !LEVEL_ORDER.includes(v.toLowerCase()))
    .map(([f, v]) => `${f}: "${v}"`);
  assert.deepEqual(bad, [], `operator file(s) with no level the rule table knows:\n  ${bad.join('\n  ')}`);
});

function runCheck() {
  // --check never writes a file; it exits 1 and still prints its report when
  // it finds a divergence, so the report is read from whichever stream the
  // non-zero exit put it on.
  try {
    const out = execFileSync('node', [GENERATOR, '--check'], { cwd: ROOT, encoding: 'utf8' });
    return { ok: true, out };
  } catch (e) {
    return { ok: false, out: `${e.stdout || ''}${e.stderr || ''}` };
  }
}

test('every adapter\'s approvals.mode and push/PR deny match what its own OPERATOR.md automation_level requires', () => {
  const { ok, out } = runCheck();
  const m = out.match(/(\d+) adapters checked, (\d+) changed/);
  assert.ok(m, `generator did not print its summary line:\n${out}`);
  const [, checked, changed] = m;
  assert.equal(Number(changed), 0,
    `${changed} of ${checked} adapters diverge from their OPERATOR.md automation_level:\n${out}\n` +
    `Run "node machine/scripts/generate-hermes-approvals.mjs" to fix it.`);
  assert.equal(ok, true, 'generator --check exited non-zero even though it reports 0 changed');
});

test('the generator exists on the path this test and the npm script both call', () => {
  assert.ok(existsSync(GENERATOR), 'machine/scripts/generate-hermes-approvals.mjs is missing');
});

test('every specialist carries the house deny list; the orchestrator keeps its own (the Oracle, 2026-10-31)', () => {
  const spec = ruleForAgent('galatea', 'high');
  for (const p of ['*git push* main', '*systemctl*', '*hermes config set*', '*.env', '*gh pr merge*']) {
    assert.ok(spec.requiredDeny.includes(p), `specialist deny lacks ${p}`);
  }
  assert.ok(!spec.requiredDeny.some((p) => p === 'git push*' || p === 'gh pr create*'), 'a specialist may push its own branch and open a pull request');
  assert.deepEqual(ruleForAgent(ORCHESTRATOR, 'high').requiredDeny, ruleFor('high').requiredDeny);
  assert.ok(SPECIALIST_DENY.length > 0);
});

test('each specialist adapter states the house rules once, not repeated (the Oracle, 2026-10-31)', () => {
  const adapters = execFileSync('git', ['-C', ROOT, 'ls-files', 'agents/*/adapters/hermes/config.yaml'], { encoding: 'utf8' })
    .split('\n').filter((f) => f && !f.startsWith(`agents/${ORCHESTRATOR}/`));
  assert.ok(adapters.length > 0);
  for (const f of adapters) {
    const text = readFileSync(path.resolve(ROOT, f), 'utf8');
    const n = text.split('HOUSE RULES FOR SPECIALISTS').length - 1;
    assert.equal(n, 1, `${f} states the house rules ${n} times`);
  }
});

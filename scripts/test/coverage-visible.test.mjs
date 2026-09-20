#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// coverage-visible.test.mjs — coverage is measured and published; it does
// not bite.
//
// Measured on 2026-09-19 before this test: 94.7 % of the lines the tests
// load, and 12 of 37 source files never loaded by any test — check-templates,
// check-orphan-content, check-url-lifecycle, check-deletable, run-guards among
// them — invisible to the figure, because node's coverage only reports files
// that ran. This test pins that `npm test` measures coverage over scripts/,
// guards/ and tools/, and that CI publishes BOTH numbers: node's table and
// the count of source files no test loads. No threshold: while STD-015 is
// draft the guard sees and does not bite (ENG-067).
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const ci = readFileSync(path.join(ROOT, '.github/workflows/ci.yml'), 'utf8');

test('npm test measures coverage over scripts/, guards/ and tools/', () => {
  const s = pkg.scripts.test;
  assert.match(s, /--experimental-test-coverage/, 'npm test does not measure coverage');
  for (const dir of ['scripts', 'guards', 'tools'])
    assert.match(s, new RegExp(`--test-coverage-include=['"]?${dir}/`), `coverage does not include ${dir}/`);
  assert.match(s, /--test-coverage-exclude=['"]?\*\*\/test\//, 'the tests themselves must be excluded from the figure');
});

test('npm test has no coverage threshold: sees, does not bite (STD-015 draft, ENG-067)', () => {
  assert.doesNotMatch(pkg.scripts.test, /--test-coverage-(lines|branches|functions)/, 'a threshold would bite while the register is draft');
});

test('CI publishes the figure AND the files no test loads', () => {
  // the tests step and the summary step that reads its output, together
  const start = ci.indexOf('- name: tests');
  const after = ci.indexOf('- name:', ci.indexOf('- name:', start + 1) + 1);
  const step = ci.slice(start, after);
  assert.match(step, /run: npm test/, 'the tests step must still say `run: npm test` — the register checker looks for that line');
  assert.match(step, /GITHUB_STEP_SUMMARY/, 'the tests step writes nothing to the job summary');
  assert.match(step, /all files/, 'the summary does not carry node\'s coverage line');
  assert.match(step, /never loaded|not loaded|no test loads/, 'the summary does not say how many source files no test loads — the figure alone overstates');
});

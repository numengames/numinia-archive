#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-019-versions.test.mjs — the two plates, each path pinned.
//
// The tree today carries four real VER findings (three drifted logs, one
// backwards log), so the failure side is exercised by the oracle. What the
// tree never exercises: a non-semantic version, a heading that MENTIONS a
// change log without being one, a log kept as the last section, and the
// clean case. Each of those here, on run() over a scratch corpus — no
// process, no git.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFM } from '../../scripts/lib/frontmatter.mjs';
import { run, logEntries } from '../rules/std-019-versions.mjs';

const doc = (version, body) => `---\nid: "DBT-900"\nversion: "${version}"\n---\n\n# Title\n\n${body}\n`;
const corpus = (files) => ({
  root: '/nowhere',
  files: Object.keys(files),
  text: (rel) => files[rel],
  fm: (rel) => parseFM(files[rel]),
});
const plates = (files) => run(corpus(files)).map((f) => `${f.plate} ${f.where} ${f.what}`).sort();

test('a bare SemVer header with a matching log is clean', () => {
  assert.deepEqual(plates({ 'debt/DBT-900-a.md': doc('1.2.0', '## Version history\n\n- 1.0.0 — born\n- 1.2.0 — grew\n') }), []);
});

test('VER-021: a version that is not MAJOR.MINOR.PATCH', () => {
  for (const v of ['1.2', 'v1.2.0', '1.2.0-rc1', '2026-09-11']) {
    const out = plates({ 'debt/DBT-900-a.md': doc(v, 'body') });
    assert.deepEqual(out, [`VER-021 debt/DBT-900-a.md version "${v}" is not semantic`], v);
  }
});

test('VER-024: the newest log entry is not the header', () => {
  assert.deepEqual(
    plates({ 'debt/DBT-900-a.md': doc('1.2.0', '## Changelog\n\n- 1.0.0 — born\n- 1.1.0 — grew\n') }),
    ['VER-024 debt/DBT-900-a.md header says 1.2.0, newest log entry is 1.1.0'],
  );
});

test('VER-021: a log that goes backwards, and the header drift it causes', () => {
  assert.deepEqual(
    plates({ 'debt/DBT-900-a.md': doc('1.2.0', '## Version history\n\n- 1.2.0 — newest first\n- 1.0.0 — born\n') }),
    ['VER-021 debt/DBT-900-a.md change log goes backwards: 1.2.0 then 1.0.0',
     'VER-024 debt/DBT-900-a.md header says 1.2.0, newest log entry is 1.0.0'],
  );
});

test('the heading must BE a change log, not mention one; the section ends at the next heading', () => {
  // "register in the design system changelog" is a heading about a process,
  // and a version-shaped bullet later in the file is not a log entry.
  assert.deepEqual(logEntries('## 7. Register in the design system changelog\n\n- 0.9.0 is what the old system was\n'), []);
  assert.deepEqual(logEntries('## Version history\n\n- 1.0.0 — a\n- 1.1.0 — b\n\n## Notes\n\n- 9.9.9 — not an entry\n'), ['1.0.0', '1.1.0']);
  assert.deepEqual(logEntries('## 3. Changelog\n\n* v1.0.0 — starred, prefixed\n'), ['1.0.0']);
});

test('scope: apparatus and outward-facing files are not held', () => {
  assert.deepEqual(plates({
    'README.md': doc('not-a-version', 'body'),
    'standards/STANDARDS.md': doc('nope', 'body'),
    'debt/DBT-900-a.md': doc('nope', 'body'),
  }), ['VER-021 debt/DBT-900-a.md version "nope" is not semantic']);
});

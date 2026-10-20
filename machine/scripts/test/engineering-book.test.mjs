#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// engineering-book.test.mjs — the engineering handbook composes STD-015,
// STD-022, PRO-011, PRO-016, PRO-018 and PRO-034 and states nothing of
// its own (the Oracle, 2026-10-20).
//
// Run: npm test  (the built-page checks need web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const LIB = readFileSync(path.join(ROOT, 'web', 'src', 'lib', 'engineering-book.ts'), 'utf8');
const DIST = path.join(ROOT, 'web', 'dist');
const notBuilt = !existsSync(path.join(DIST, 'index.html')) && 'web/dist not built';

test('the engineering handbook reads exactly STD-015, STD-022, PRO-011, PRO-016, PRO-018 and PRO-034, in this order', () => {
  const sources = [...LIB.matchAll(/path: "([^"]+\.md)"/g)].map((m) => m[1]);
  const expected = [
    'standards/STD-015-engineering-checks.md',
    'standards/STD-022-secrets.md',
    'procedures/PRO-011-security-audit.md',
    'procedures/PRO-016-applying-the-engineering-standard.md',
    'procedures/PRO-018-publishing-a-repository.md',
    'procedures/PRO-034-auditing-a-sites-code.md',
  ];
  assert.deepEqual(sources, expected, 'the engineering handbook reads these six documents, in this order');
  for (const f of sources) assert.ok(existsSync(path.join(ROOT, f)), `${f} is not in the tree`);
});

test('every section the engineering handbook names is a heading in its document', () => {
  const named = [...LIB.matchAll(/path: "([^"]+\.md)", sections: (\[[^\]]+\])/g)].map((m) => ({
    file: m[1],
    sections: [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
  }));
  assert.ok(named.length === 5, 'every part but the register names its sections');
  for (const { file, sections } of named) {
    const text = readFileSync(path.join(ROOT, file), 'utf8');
    for (const s of sections) assert.ok(text.includes(`\n## ${s}\n`), `${file} has no "## ${s}"`);
  }
});

test('the engineering handbook reads no document the site would not publish', () => {
  for (const f of [...LIB.matchAll(/path: "([^"]+\.md)"/g)].map((m) => m[1])) {
    const head = readFileSync(path.join(ROOT, f), 'utf8').split('\n---')[0];
    const v = head.match(/^visibility:\s*"?([^"\n]+)"?/m)?.[1];
    assert.ok(!v || v === 'public', `${f} is ${v}; a book is public`);
  }
});

test('summa.ts lists the engineering handbook at /engineering-handbook, no longer pending', () => {
  const summa = readFileSync(path.join(ROOT, 'web', 'src', 'lib', 'summa.ts'), 'utf8');
  const m = /\{ label: "The engineering handbook"[^}]+\}/.exec(summa);
  assert.ok(m, 'summa.ts BOOKS still lists the engineering handbook');
  assert.match(m[0], /href: "\/engineering-handbook"/, 'its href points at /engineering-handbook');
  assert.doesNotMatch(m[0], /pending:/, 'it no longer says it is pending');
});

test('the built engineering handbook carries its chapters, its .md view and the back-to-top button', { skip: notBuilt }, () => {
  const html = readFileSync(path.join(DIST, 'engineering-handbook', 'index.html'), 'utf8');
  for (const id of ['what-we-check', 'secrets', 'auditing-identity', 'applying-the-standard', 'publishing-a-repository', 'auditing-a-sites-code']) {
    assert.match(html, new RegExp(`data-chapter="${id}"`), `chapter ${id} is on the page`);
  }
  assert.match(html, /data-back-to-top/, 'books carry the back-to-top button');
  assert.ok(existsSync(path.join(DIST, 'engineering-handbook.md')), 'the engineering handbook has its .md view');
});

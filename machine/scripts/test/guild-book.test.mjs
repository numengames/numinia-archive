#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// guild-book.test.mjs — the guild handbook composes PRI-004, PRO-015,
// PRO-024, STD-017 and STD-042 and states nothing of its own (the Oracle,
// 2026-10-20).
//
// Run: npm test  (the built-page checks need web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const LIB = readFileSync(path.join(ROOT, 'web', 'src', 'lib', 'guild-book.ts'), 'utf8');
const DIST = path.join(ROOT, 'web', 'dist');
const notBuilt = !existsSync(path.join(DIST, 'index.html')) && 'web/dist not built';

test('the guild handbook reads exactly PRI-004, PRO-015, PRO-024, STD-017 and STD-042', () => {
  const sources = [...LIB.matchAll(/path: "([^"]+\.md)"/g)].map((m) => m[1]);
  const expected = [
    'procedures/PRO-015-joining.md',
    'principles/PRI-004-role-structure.md',
    'standards/STD-017-who-may-change-what.md',
    'standards/STD-042-what-an-agent-may-do-without-asking.md',
    'procedures/PRO-024-leaving.md',
  ];
  assert.deepEqual(sources, expected, 'the guild handbook reads these five documents, in this order');
  for (const f of sources) assert.ok(existsSync(path.join(ROOT, f)), `${f} is not in the tree`);
});

test('every section the guild handbook names is a heading in its document', () => {
  const named = [...LIB.matchAll(/path: "([^"]+\.md)", sections: (\[[^\]]+\])/g)].map((m) => ({
    file: m[1],
    sections: [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
  }));
  assert.ok(named.length === 5, 'every one of the five parts names its sections');
  for (const { file, sections } of named) {
    const text = readFileSync(path.join(ROOT, file), 'utf8');
    for (const s of sections) assert.ok(text.includes(`\n## ${s}\n`), `${file} has no "## ${s}"`);
  }
});

test('the guild handbook reads no document the site would not publish', () => {
  for (const f of [...LIB.matchAll(/path: "([^"]+\.md)"/g)].map((m) => m[1])) {
    const head = readFileSync(path.join(ROOT, f), 'utf8').split('\n---')[0];
    const v = head.match(/^visibility:\s*"?([^"\n]+)"?/m)?.[1];
    assert.ok(!v || v === 'public', `${f} is ${v}; a book is public`);
  }
});

test('summa.ts lists the guild handbook at /guild-handbook, no longer pending', () => {
  const summa = readFileSync(path.join(ROOT, 'web', 'src', 'lib', 'summa.ts'), 'utf8');
  const m = /\{ label: "The guild handbook"[^}]+\}/.exec(summa);
  assert.ok(m, 'summa.ts BOOKS still lists the guild handbook');
  assert.match(m[0], /href: "\/guild-handbook"/, 'its href points at /guild-handbook');
  assert.doesNotMatch(m[0], /pending:/, 'it no longer says it is pending');
});

test('the built guild handbook carries its chapters, its .md view and the back-to-top button', { skip: notBuilt }, () => {
  const html = readFileSync(path.join(DIST, 'guild-handbook', 'index.html'), 'utf8');
  for (const id of ['how-someone-joins', 'what-a-guild-is', 'who-may-change-what', 'what-an-agent-may-do', 'how-someone-leaves']) {
    assert.match(html, new RegExp(`data-chapter="${id}"`), `chapter ${id} is on the page`);
  }
  assert.match(html, /data-back-to-top/, 'books carry the back-to-top button');
  assert.ok(existsSync(path.join(DIST, 'guild-handbook.md')), 'the guild handbook has its .md view');
});

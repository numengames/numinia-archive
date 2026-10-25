#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// mission-book.test.mjs — the mission book reads PRO-003, ADR-083 and the
// mission files, and states nothing of its own (the Oracle, 2026-10-25).
//
// Run: npm test  (the built-page checks need web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const LIB = readFileSync(path.join(ROOT, 'web', 'src', 'lib', 'mission-book.ts'), 'utf8');
const DIST = path.join(ROOT, 'web', 'dist');
const notBuilt = !existsSync(path.join(DIST, 'mission-book', 'index.html')) && 'web/dist not built';

test('every section the mission book names is a heading in its document', () => {
  const named = [...LIB.matchAll(/path: "([^"]+\.md)", sections: (\[[^\]]+\])/g)].map((m) => ({
    file: m[1],
    sections: [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
  }));
  assert.equal(named.length, 2, 'PRO-003 and ADR-083 name their sections');
  for (const { file, sections } of named) {
    const text = readFileSync(path.join(ROOT, file), 'utf8');
    for (const s of sections) assert.ok(text.includes(`\n## ${s}\n`), `${file} has no "## ${s}"`);
  }
});

test('every parent a mission names exists, and every parent lists it back', () => {
  const dir = path.join(ROOT, 'missions');
  const files = readdirSync(dir).filter((f) => /^MIS-\d+.*\.md$/.test(f));
  const head = (f) => readFileSync(path.join(dir, f), 'utf8').split('\n---')[0];
  const ids = new Map(files.map((f) => [head(f).match(/^id:\s*"?(MIS-\d+)/m)?.[1], f]));
  for (const f of files) {
    const p = head(f).match(/^parent_mission:\s*"(MIS-2\d\d)"/m)?.[1];
    if (!p) continue;
    assert.ok(ids.has(p), `${f} names ${p}, which is not in missions/`);
    const subs = head(ids.get(p)).match(/^sub_missions:\s*\[(.*)\]/m)?.[1] ?? '';
    const me = head(f).match(/^id:\s*"?(MIS-\d+)/m)[1];
    assert.ok(subs.includes(`"${me}"`), `${p} does not list ${me} in sub_missions`);
  }
});

test('summa.ts lists the mission book at /mission-book', () => {
  const summa = readFileSync(path.join(ROOT, 'web', 'src', 'lib', 'summa.ts'), 'utf8');
  const m = /\{ label: "The mission book"[^}]+\}/.exec(summa);
  assert.ok(m, 'summa.ts BOOKS lists the mission book');
  assert.match(m[0], /href: "\/mission-book"/);
});

test('the built book shows MIS-200 with its children, and its .md view', { skip: notBuilt }, () => {
  const html = readFileSync(path.join(DIST, 'mission-book', 'index.html'), 'utf8');
  assert.match(html, /MIS-200/, 'MIS-200 is in the book');
  assert.match(html, /MIS-218/, 'its first child is in the book');
  assert.ok(existsSync(path.join(DIST, 'mission-book.md')), 'the .md view is built');
});

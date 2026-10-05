#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// legal-book.test.mjs — the legal playbook and the role-playing manual state
// nothing of their own (the Oracle, 2026-10-05).
//
// The legal playbook reads its chapters from principles, standards,
// procedures, the legal texts and the debt; the manual reads its chapter list
// from each edition's README. Every file named must exist, every section a
// heading, and no chapter of the manual may still embed an image the archive
// does not hold.
//
// Run: npm test  (the built-page checks need web/dist: `cd web && npm run build`)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const LIB = readFileSync(path.join(ROOT, 'web', 'src', 'lib', 'legal-book.ts'), 'utf8');
const DIST = path.join(ROOT, 'web', 'dist');
const notBuilt = !existsSync(path.join(DIST, 'index.html')) && 'web/dist not built';
const STANDARD = [...LIB.matchAll(/const STANDARD = \[([^\]]+)\]/g)].flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));

test('every document the legal playbook reads exists, and every section it names is a heading there', () => {
  const sources = [...LIB.matchAll(/path: "([^"]+\.md)"/g)].map((m) => m[1]);
  assert.ok(sources.length >= 10, 'the book reads its chapters from documents');
  for (const f of sources) assert.ok(existsSync(path.join(ROOT, f)), `${f} is not in the tree`);
  const named = [...LIB.matchAll(/path: "([^"]+\.md)", sections: (\[[^\]]+\]|STANDARD)/g)].map((m) => ({
    file: m[1],
    sections: m[2] === 'STANDARD' ? STANDARD : [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
  }));
  assert.ok(named.length > 0);
  for (const { file, sections } of named) {
    const text = readFileSync(path.join(ROOT, file), 'utf8');
    for (const s of sections) assert.ok(text.includes(`\n## ${s}\n`), `${file} has no "## ${s}"`);
  }
});

test('the legal playbook reads no document the site would not publish', () => {
  for (const f of [...LIB.matchAll(/path: "([^"]+\.md)"/g)].map((m) => m[1])) {
    const head = readFileSync(path.join(ROOT, f), 'utf8').split('\n---')[0];
    const v = head.match(/^visibility:\s*"?([^"\n]+)"?/m)?.[1];
    assert.ok(!v || v === 'public', `${f} is ${v}; a book is public`);
    if (f.startsWith('debt/')) assert.equal(v, 'public', `${f}: a debt is published only when it says so`);
  }
});

test('the manual embeds no image the archive does not hold', () => {
  for (const ed of ['es', 'en']) {
    const dir = path.join(ROOT, 'lore', 'game', 'manual', ed);
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.md'))) {
      const text = readFileSync(path.join(dir, f), 'utf8');
      for (const m of text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
        assert.ok(existsSync(path.join(dir, m[1])), `${ed}/${f} embeds ${m[1]}, which is not in the tree`);
      }
    }
  }
});

test('the built books carry their chapters, their .md views and the back-to-top button', { skip: notBuilt }, () => {
  const html = readFileSync(path.join(DIST, 'legal-playbook', 'index.html'), 'utf8');
  for (const id of ['what-we-hold-to', 'the-rules', 'when-something-happens', 'what-we-publish', 'still-open']) {
    assert.match(html, new RegExp(`data-chapter="${id}"`), `chapter ${id} is on the page`);
  }
  assert.match(html, /data-back-to-top/, 'books carry the back-to-top button');
  assert.ok(existsSync(path.join(DIST, 'legal-playbook.md')), 'the legal playbook has its .md view');
  const manual = readFileSync(path.join(DIST, 'manual', 'index.html'), 'utf8');
  assert.match(manual, /data-edition="es"/);
  assert.match(manual, /data-edition="en"/);
  assert.ok(existsSync(path.join(DIST, 'manual.md')), 'the manual has its .md view');
  for (const c of ['00-introduccion', '07-building-the-adventure']) {
    assert.ok(existsSync(path.join(DIST, 'manual', c, 'index.html')), `chapter ${c} is served`);
    assert.ok(existsSync(path.join(DIST, 'manual', `${c}.md`)), `chapter ${c} has its .md view`);
  }
  assert.doesNotMatch(html, /DBT-022|questions for counsel \(/, 'the restricted debt is never read into the book');
  const home = readFileSync(path.join(DIST, 'index.html'), 'utf8');
  assert.ok(home.indexOf('id="books"') > -1 && home.indexOf('id="books"') < home.indexOf('aria-label="Sections"'), 'the books come before the sections on the front door');
});

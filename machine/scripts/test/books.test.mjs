#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// books.test.mjs — the compilations are one list, shown on the archive page.
//
// The Oracle (2026-09-27): the design system, the core read as a flow, the
// role-playing manual and the legal playbook are not series and belong to no
// one function — each gathers documents from several. They are books: read or
// heard end to end. The bar gets a Books menu, read from one list in
// web/src/lib/suma.ts, and each book is also reachable from the ring its
// documents come from.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const SUMA = path.join(ROOT, 'web', 'src', 'lib', 'suma.ts');

function ask(expression) {
  const script = `import(${JSON.stringify(SUMA)}).then((s) => console.log(JSON.stringify(${expression})))` +
    `.catch((e) => { console.error(e.message); process.exit(1); });`;
  return JSON.parse(execFileSync('node', ['--experimental-strip-types', '-e', script],
    { cwd: path.join(ROOT, 'web'), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
}

test('the books are one list, and the served ones have a page', () => {
  const books = ask('s.BOOKS');
  const hrefs = books.map((b) => b.href);
  for (const h of ['/core', '/design']) assert.ok(hrefs.includes(h), `${h} is a book and is not in BOOKS`);
  for (const b of books) {
    assert.ok(b.label && b.line && b.from, `a book needs a label, a line and what it is compiled from: ${JSON.stringify(b)}`);
    if (b.href) assert.ok(existsSync(path.join(ROOT, 'web', 'src', 'pages', `${b.href.slice(1)}.astro`)), `${b.href} has no page`);
  }
});

test('each served book is also reachable from the map rings', () => {
  const books = ask('s.BOOKS');
  const inRings = new Set(ask('s.SEGMENTS').flatMap((sg) => sg.entries.map((e) => e.href)));
  const missing = books.filter((b) => b.href && !inRings.has(b.href)).map((b) => b.href);
  assert.deepEqual(missing, [], 'these books are in the Books menu but in no ring');
});

test('the archive page prints the books from BOOKS', () => {
  // 2026-09-28: the bar keeps Map and Archive only, with no drop-down; the
  // books are listed on /about, the page the Archive button opens.
  const page = readFileSync(path.join(ROOT, 'web', 'src', 'pages', 'about.astro'), 'utf8');
  assert.match(page, /import \{[^}]*\bBOOKS\b[^}]*\} from "@\/lib\/suma"/);
  assert.match(page, /BOOKS\.map/, 'BOOKS must render on the archive page');
});

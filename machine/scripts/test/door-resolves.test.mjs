#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// door-resolves.test.mjs — everything the door names, the tree has.
//
// README.md, AGENTS.md, CLAUDE.md and CONTRIBUTING.md are what a person or an
// agent reads before anything else, and the corpus behind them is too large to
// check them against by reading (about 800k tokens). So the door has to be
// exact. On 2026-09-28 it was not: AGENTS.md was titled with the repository's
// old name, opened on a rule code (AGT-001) with no word on where it lives,
// cited a mission (MIS-118) and a decision (ADR-001) that no longer exist,
// named rule plates (MCY-001, MSN-002) beside the wrong document, and CLAUDE.md
// sent readers to a design file (web/DESIGN.md) that was never in the tree.
// An agent that obeys its first instruction — audit before assuming — failed
// on the first thing it checked.
//
// And AGENTS.md said what binds only by subtraction: dozens of codes suspended,
// the few in force at the end. So it now names them, and this pins the list to
// the headers.
//
// This asks three mechanical questions and nothing editorial:
//   1. does every path the door prints exist (or is it a build output)?
//   2. does every identifier it prints resolve — a document of that name, or a
//      row whose home document is named on the same line?
//   3. is the "In force" list exactly the rule documents whose header says
//      `status: active`?
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const DOOR = ['README.md', 'AGENTS.md', 'CLAUDE.md', 'CONTRIBUTING.md'];
const read = (f) => readFileSync(path.join(ROOT, f), 'utf8');
const tracked = execFileSync('git', ['-C', ROOT, 'ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean);
const trackedSet = new Set(tracked);

/** Documents by identifier: the leading code of the file name. */
const DOC = new Map();
for (const f of tracked) {
  const m = /^([A-Z]{2,4}-\d{3,4})-/.exec(path.basename(f));
  if (m && f.endsWith('.md')) DOC.set(m[1], f);
}

/** Rows and rule plates: an identifier defined inside a document, as a table
 *  cell in any column (`| MSN-002 |`) or a bold lead (`**MCY-001 —`). Maps plate → the
 *  identifiers of the documents that define it. */
const ROW = new Map();
for (const f of tracked.filter((t) => t.endsWith('.md') && !DOOR.includes(t) && t !== 'CHANGELOG.md')) {
  const home = /^([A-Z]{2,4}-\d{3,4})-/.exec(path.basename(f))?.[1];
  if (!home) continue;
  for (const m of read(f).matchAll(/(?:\|\s*|\*\*)([A-Z]{2,4}-\d{3})(?=\s*\||\s+—|\*\*)/gm)) {
    if (m[1] === home) continue;
    if (!ROW.has(m[1])) ROW.set(m[1], new Set());
    ROW.get(m[1]).add(home);
  }
}

/** The prose of a file: HTML comments are for maintainers, and code fences
 *  quote commands rather than make claims — neither is read here. */
const blank = (s) => s.replace(/[^\n]/g, '');
const prose = (text) => text.replace(/<!--[\s\S]*?-->/g, blank).replace(/^```[\s\S]*?^```/gm, blank);

test('no door file is titled by the repository\'s old name', () => {
  for (const f of DOOR) {
    const h1 = /^# (.+)$/m.exec(prose(read(f)))?.[1] ?? '';
    assert.doesNotMatch(h1, /NWOS|numinia-nwos/i, `${f} is titled "${h1}"`);
  }
});

test('every path the door prints exists in the tree, or is a build output', () => {
  const missing = [];
  for (const f of DOOR) {
    for (const m of prose(read(f)).matchAll(/`([A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]*)+)`/g)) {
      const p = m[1];
      if (/^https?:|^[a-z]+\.[a-z]+\//.test(p)) continue;          // a host, not a path
      const hit = trackedSet.has(p) || tracked.some((t) => t.startsWith(p.endsWith('/') ? p : `${p}/`));
      if (hit) continue;
      let ignored = false;
      try { execFileSync('git', ['-C', ROOT, 'check-ignore', '-q', '--no-index', p]); ignored = true; } catch { /* not ignored */ }
      if (!ignored) missing.push(`${f}: \`${p}\``);
    }
  }
  assert.deepEqual(missing, [], `the door names paths the tree does not have:\n  ${missing.join('\n  ')}`);
});

test('every identifier the door prints resolves, and a plate names its home on the same line', () => {
  const bad = [];
  for (const f of DOOR) {
    const lines = prose(read(f)).split('\n');
    lines.forEach((line, i) => {
      for (const m of line.matchAll(/\b([A-Z]{2,4}-\d{3,4})\b/g)) {
        const id = m[1];
        if (DOC.has(id)) continue;
        const homes = ROW.get(id);
        if (!homes) { bad.push(`${f}:${i + 1} ${id} — no document or row by that name`); continue; }
        if (![...homes].some((h) => line.includes(h)))
          bad.push(`${f}:${i + 1} ${id} — a row of ${[...homes].join(' / ')}, which the line does not name`);
      }
    });
  }
  assert.deepEqual(bad, [], `identifiers a reader cannot follow:\n  ${bad.join('\n  ')}`);
});

test('AGENTS.md names, in force, exactly the rule documents whose header says active', () => {
  const agents = read('AGENTS.md');
  const block = /^In force:([^\n]*(?:\n(?!\n)[^\n]*)*)/m.exec(agents);
  assert.ok(block, 'AGENTS.md has no "In force:" list');
  const named = new Set([...block[1].matchAll(/`([A-Z]{3}-\d{3})`/g)].map((m) => m[1]));
  const active = new Set();
  for (const f of tracked.filter((t) => /^(principles|standards|procedures)\/[A-Z]{3}-\d{3}-.*\.md$/.test(t))) {
    const head = read(f).slice(0, 2000);
    if (/^status:\s*active/m.test(head)) active.add(/^([A-Z]{3}-\d{3})/.exec(path.basename(f))[1]);
  }
  assert.ok(active.size > 0, 'no rule document is active — the fixture has changed');
  assert.deepEqual([...named].sort(), [...active].sort(), 'the "In force" list and the headers disagree');
});

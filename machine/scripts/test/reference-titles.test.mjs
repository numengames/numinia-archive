#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// reference-titles.test.mjs — a References table names each cited document
// by the title it carries.
//
// THE PROBLEM THIS COVERS
// A document's title lives in one place: its own `title:` header (DOC-007).
// The References tables of the core typed each cited title again by hand,
// and as documents were renamed the copies went stale: a principle cited by
// a title it lost two renames ago, a procedure named "Escalation" when it
// reads "Escalating to the Oracle". A reader following the table looked for
// a document that, under that name, no longer exists.
//
// WHAT IS UNDER TEST
// For every .md in principles/, standards/ and procedures/, each row of its
// `## References` table whose first cell cites an identifier of a document
// the tree holds carries that document's current title in its second cell
// (case, whitespace and markdown emphasis ignored). An identifier that
// resolves to no file — an outside source, a retired document — is skipped.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT, parseFM } from '../lib/frontmatter.mjs';

const tracked = execFileSync('git', ['ls-files', '*.md'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n').filter(Boolean);
const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');

// id -> title, from every tracked document that declares both (templates
// and fixtures excluded: they carry placeholders, not documents).
const TITLE = new Map();
for (const rel of tracked) {
  if (/^machine\//.test(rel) || /(^|\/)(fixtures?|test)\//.test(rel)) continue;
  let fm;
  try { fm = parseFM(read(rel)); } catch { continue; }
  if (!fm || typeof fm.id !== 'string' || typeof fm.title !== 'string') continue;
  if (!TITLE.has(fm.id)) TITLE.set(fm.id, fm.title);
}

const norm = (s) => String(s)
  .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')   // a link keeps its text
  .replace(/[*_`"“”‘’]/g, '')
  .replace(/[—–]/g, '-')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase();

/** Rows of the `## References` table: [{line, id, title}]. */
export function referenceRows(text) {
  const lines = text.split('\n');
  const out = [];
  let inRefs = false;
  lines.forEach((l, i) => {
    if (/^##\s/.test(l)) inRefs = /^##\s+References\s*$/.test(l);
    if (!inRefs || !l.startsWith('|')) return;
    const cells = l.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 2 || /^-+$/.test(cells[0].replace(/:/g, ''))) return;
    const m = cells[0].match(/^`?([A-Z]{2,4}-\d{3,4})`?$/);
    if (!m) return;
    out.push({ line: i + 1, id: m[1], title: cells[1] });
  });
  return out;
}

const CORE = tracked.filter((rel) => /^(principles|standards|procedures)\/[^/]+\.md$/.test(rel));

test('the core has documents to read', () => {
  assert.ok(CORE.length > 40, `only ${CORE.length} core documents found`);
});

for (const rel of CORE) {
  test(`${rel}: every References row carries the cited document's own title`, () => {
    const text = read(rel);
    const bad = [];
    for (const { line, id, title } of referenceRows(text)) {
      const own = TITLE.get(id);
      if (own === undefined) continue;   // not a document the tree holds
      if (norm(title) !== norm(own)) bad.push(`${rel}:${line} ${id} is "${own}", not "${title}"`);
    }
    assert.deepEqual(bad, [], bad.join('\n'));
  });
}

test('the row reader finds the id and the title, and skips outside sources', () => {
  const rows = referenceRows([
    '## References', '', '| ID | Title | Relation |', '|---|---|---|',
    '| `STD-001` | The series | why |', '| ISO 15489 | Records | outside |', '', '## Other', '| `STD-002` | X | y |',
  ].join('\n'));
  assert.deepEqual(rows.map((r) => [r.id, r.title]), [['STD-001', 'The series']]);
});

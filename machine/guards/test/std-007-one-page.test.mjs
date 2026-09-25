#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-007-one-page.test.mjs — DOC-003: the documents that must declare scope.
//
// STD-007 asks every standard and protocol to open with a `**Binds:**` line
// and a `**Does not bind:**` line, and exempts two kinds:
//
//   subtype: register — a lookup table (the header fields, the licence
//     allowlist). It governs nobody by itself; the standard pointing at it
//     does. The guard skips it: `if (!register && NEEDS_PLATES.has(dir))`.
//   canon/ — not in NEEDS_PLATES at all. A canon says why things are as they
//     are, and a reason binds everyone who leans on it.
//
// What the guard does NOT do is fail: DOC-003 is a SHOULD, reported under
// "measured, not judged". So a plain protocol could lose its scope line and
// only a human reading the guard's output would notice.
//
// This test is the judgement the guard withholds. It asserts the exemptions
// are the ONLY reason a document lacks the line — not forgetfulness.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT, parseFM } from '../../scripts/lib/frontmatter.mjs';
import { run } from '../rules/std-007-one-page.mjs';

const docs = execFileSync('git', ['-C', ROOT, 'ls-files', 'standards/*.md', 'protocols/*.md'], { encoding: 'utf8' })
  .split('\n').filter(Boolean)
  .map((file) => {
    const text = readFileSync(path.join(ROOT, file), 'utf8');
    return { file, text, fm: parseFM(text) ?? {} };
  });

test('the fixture is what this test thinks it is', () => {
  assert.ok(docs.length >= 30, `only ${docs.length} standards and protocols found`);
  assert.ok(docs.some((d) => d.fm.subtype === 'register'), 'no register in the corpus: the exemption is untested');
});

test('every standard and protocol that is not a register declares whom it binds', () => {
  const missing = docs
    .filter((d) => d.fm.subtype !== 'register' && !d.text.includes('**Binds:**'))
    .map((d) => `${d.fm.id ?? d.file} (${d.file})`);
  assert.deepEqual(missing, [], `DOC-003: these declare no scope, and no exemption covers them:\n  ${missing.join('\n  ')}`);
});

test('a document that binds also says what it does not bind', () => {
  // The pair is the point: a scope with no edge reads as "everything", which
  // is how a reader ends up opening documents that never applied to them.
  const half = docs
    .filter((d) => d.text.includes('**Binds:**') && !d.text.includes('**Does not bind:**'))
    .map((d) => `${d.fm.id ?? d.file}`);
  assert.deepEqual(half, [], `DOC-003: these bind somebody but never say where they stop:\n  ${half.join('\n  ')}`);
});

/* ---- DOC-004 and DOC-008 on a scratch corpus: where a plate may live ----
   A standard written for the narrator keeps its plates out of the reading and
   in the first column of its `## Check` table. That is still a plated rule,
   and an identifier in that table is apparatus, like one in References. */

const scratch = (files) => ({
  root: '/nowhere',
  files: Object.keys(files),
  text: (rel) => files[rel],
  fm: (rel) => parseFM(files[rel]),
});
const std = (rules, check) => [
  '---', 'id: "STD-900"', 'subtype: standard', 'status: draft', '---', '',
  '# A rule in words', '',
  '> **Summary:** s.', '> **Epistemic:** e.', '> **Pragmatic:** p.', '',
  '**Binds:** every test.', '**Does not bind:** anything else.', '',
  '## Rules', '', rules, '',
  '## Check', '', check, '',
  '## Why', '', 'Because.', '',
  '## References', '', '| ID | Name | Why cited |', '|---|---|---|', '| `STD-007` | One page | shape |', '',
].join('\n');
const findings = (text, plate) => run(scratch({ 'standards/STD-900-a.md': text }))
  .filter((f) => f.plate === plate).map((f) => f.what);

test('DOC-004: plates in the Check table satisfy the rule, with none in the titles', () => {
  const text = std('**A rule in words.** Everyone MUST do it.',
    '| Plate | Rule | Source | Verified by |\n|---|---|---|---|\n| ABC-001 | A rule in words | — | by hand |');
  assert.deepEqual(findings(text, 'DOC-004'), []);
});

test('DOC-004: plates in the rule titles still satisfy the rule', () => {
  const text = std('**ABC-001 — A rule in words.** Everyone MUST do it.', '| Rule | Verified by |\n|---|---|\n| ABC-001 | by hand |');
  assert.deepEqual(findings(text, 'DOC-004'), []);
});

test('DOC-004: no plate in either place is still a finding', () => {
  const text = std('**A rule in words.** Everyone MUST do it.', '| Rule | Verified by |\n|---|---|\n| A rule in words | by hand |');
  assert.equal(findings(text, 'DOC-004').length, 1);
});

test('DOC-008: an identifier in the Check table is apparatus, not prose', () => {
  const text = std('**A rule in words.** Everyone MUST do it.',
    '| Plate | Rule | Source | Verified by |\n|---|---|---|---|\n| ABC-001 | A rule in words | [a norm](https://example.org/) | nothing yet (DBT-020) |');
  assert.deepEqual(findings(text, 'DOC-008'), []);
});

test('DOC-008: an identifier in the reading is still a finding', () => {
  const text = std('**A rule in words.** Everyone MUST do what DBT-020 says.', '| Plate | Rule | Source | Verified by |\n|---|---|---|---|\n| ABC-001 | A rule in words | — | by hand |');
  assert.ok(findings(text, 'DOC-008').some((w) => w.startsWith('PW-01 DBT-020')));
});

test('a scope line does not contradict the applies_to field above it', () => {
  // Two statements of scope, one in frontmatter and one in the body, are two
  // things to keep true. Where both exist they must at least share a subject.
  for (const d of docs) {
    if (typeof d.fm.applies_to !== 'string' || !d.fm.applies_to.trim()) continue;
    const m = /\*\*Binds:\*\*([^\n]*(?:\n(?!\*\*|\s*$)[^\n]*)*)/.exec(d.text);
    if (!m) continue;
    const binds = m[1].replace(/\s+/g, ' ').toLowerCase();
    const stop = new Set(['every', 'the', 'and', 'that', 'this', 'with', 'from', 'anyone', 'whoever', 'their', 'which', 'each', 'into']);
    const words = d.fm.applies_to.toLowerCase().match(/[a-z]{4,}/g) ?? [];
    const content = words.filter((w) => !stop.has(w));
    if (content.length === 0) continue;
    assert.ok(
      content.some((w) => binds.includes(w.replace(/s$/, ''))),
      `${d.fm.id}: applies_to says "${d.fm.applies_to}" and Binds shares no subject with it`,
    );
  }
});

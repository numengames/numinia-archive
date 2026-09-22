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

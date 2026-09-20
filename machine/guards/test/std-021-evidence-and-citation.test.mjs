// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-021-evidence-and-citation.test.mjs — both readings of CIT-050, pinned.
//
// The tree today has one norm finding and zero resolve findings, so the
// oracle diff proves the norm side and nothing else. Each path is exercised
// here on a synthetic corpus: the id window, the intervening-id rule, the
// prose-headed exemption, code stripped on the norm side only.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFM } from '../../scripts/lib/frontmatter.mjs';
import { run, sectionIndex } from '../rules/std-021-evidence-and-citation.mjs';

const hdr = (id, extra = '') => `---\nid: "${id}"\ntype: "documentation"\nstatus: "active"\nlicense: "CC-BY-4.0"\n${extra}---\n\n`;
const corpus = (files) => ({ root: '/nowhere', files: Object.keys(files), text: (r) => files[r], fm: (r) => parseFM(files[r]) });
const wheres = (files) => run(corpus(files)).map((f) => f.where).sort();

const NUMBERED = hdr('PRO-900') + '# P\n\n## 1. Scope\n\n## 2. Rules\n\n### 2.1 One\n\n## 3. References\n';
const PROSE = hdr('ADR-900') + '# A\n\n## Context\n\n## Decision\n';

test('resolve: a cited section that exists passes; one that does not is CIT-050 at its line', () => {
  const files = {
    'protocols/PRO-900-p.md': NUMBERED,
    'missions/MIS-0900-m.md': hdr('MIS-0900') + 'See PRO-900 §2.1 for the rule.\nAnd PRO-900 §4 for nothing.\n',
  };
  assert.deepEqual(wheres(files), ['missions/MIS-0900-m.md:9']);
});

test('resolve: a prose-headed document is not comparable — §2 there is ordinal', () => {
  const files = { 'decisions/ADR-900-a.md': PROSE, 'missions/MIS-0900-m.md': hdr('MIS-0900') + 'ADR-900 §2 says so.\n' };
  assert.deepEqual(wheres(files), []);
  assert.equal(sectionIndex(corpus(files)).get('ADR-900-a.md').size, 0);
});

test('resolve: the § binds to the nearest id — "`PRO-013`, `STD-001` §10.4" cites STD-001', () => {
  const files = {
    'protocols/PRO-900-p.md': NUMBERED,
    'standards/STD-900-s.md': hdr('STD-900') + '# S\n\n## 10. Ten\n\n### 10.4 Four\n',
    'missions/MIS-0900-m.md': hdr('MIS-0900') + '`PRO-900`, `STD-900` §10.4\n',
  };
  assert.deepEqual(wheres(files), []);
});

test('resolve: an unknown or cross-repo id is not ours', () => {
  assert.deepEqual(wheres({ 'missions/MIS-0900-m.md': hdr('MIS-0900') + 'ZZZ-1 §9 and NIST-800 §5.\n' }), []);
});

test('resolve: machine/templates/ and history/ are neither cited nor citers', () => {
  const files = {
    'protocols/PRO-900-p.md': NUMBERED,
    'machine/templates/X-TEMPLATE.md': 'PRO-900 §99\n',
    'history/old.md': 'PRO-900 §99\n',
  };
  assert.deepEqual(wheres(files), []);
});

test('norm: a standard citing any section by number is CIT-050, even if the section resolves', () => {
  const files = {
    'protocols/PRO-900-p.md': NUMBERED,
    'standards/STD-900-s.md': hdr('STD-900') + '# S\n\nAs PRO-900 §2 says.\n',
  };
  const got = run(corpus(files));
  assert.deepEqual(got.map((f) => f.where), ['standards/STD-900-s.md']);
  assert.match(got[0].what, /cites a section by number: PRO-900 §2/);
});

test('norm: code is stripped first; a plate in a fence is data', () => {
  const files = { 'standards/STD-900-s.md': hdr('STD-900') + '# S\n\n```\nPRO-900 §2\n```\n\nand `PRO-900 §3` inline.\n' };
  assert.deepEqual(wheres(files), []);
});

test('norm: apparatus in standards/ is not held (STANDARDS.md)', () => {
  assert.deepEqual(wheres({ 'standards/STANDARDS.md': '# Index\n\nPRO-900 §2\n' }), []);
});

test('norm stops at standards/: a mission may cite a section that exists', () => {
  const files = { 'protocols/PRO-900-p.md': NUMBERED, 'missions/MIS-0900-m.md': hdr('MIS-0900') + 'PRO-900 §2\n' };
  assert.deepEqual(wheres(files), []);
});

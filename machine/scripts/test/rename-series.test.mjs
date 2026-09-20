// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Regression tests for the citation rewrite in rename-series.mjs.
//
// Written 2026-08-31 after the tool corrupted 139 files in one pass during the
// standards/ run (MIS-127). The rewrite was three `.split(old).join(new)`
// calls — substring replacement with no notion of a word boundary. Renaming
// STD-001 -> STD-001 turned MIS-001 into MISTD-001, and renaming the word-shaped
// governance.md -> STD-002-governance.md dropped the slug everywhere, leaving
// STD-002.md. It reached LICENSE, CODEOWNERS and .github/workflows/.
//
// the reference guard caught it and nothing was committed, but a tool whose whole
// job is "rename safely" has to be tested against the cases that broke it.
//
// Run: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
const reEsc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ID_SHAPED = /^[A-Z]{1,6}-\d{1,4}$/i;
const rewriteId = (s, oldId, newId) => {
  if (!ID_SHAPED.test(oldId)) return s;
  return s.replace(new RegExp(`(^|[^A-Za-z0-9_-])${reEsc(oldId)}(?![A-Za-z0-9_-])(?!\\.md)`, 'g'),
    (_m, pre) => pre + newId);
};

const rewriteRel = (s, oldRel, newRel) =>
  s.replace(new RegExp(`(^|[^A-Za-z0-9_./-])${reEsc(oldRel)}(?![A-Za-z0-9_-])`, 'g'),
    (_m, pre) => pre + newRel);

const rewriteBase = (s, oldBase, newBase) =>
  s.replace(new RegExp(`([/\`(\\[<'"]|^|:\\s*)${reEsc(oldBase)}(?![A-Za-z0-9_-])`, 'gm'),
    (_m, pre) => pre + newBase);

const rewriteSlug = (s, oldBase, newBase) => {
  const oldSlug = oldBase.replace(/\.md$/, '').toLowerCase();
  const newSlug = newBase.replace(/\.md$/, '').toLowerCase();
  if (oldSlug === newSlug) return s;
  return s.replace(new RegExp(`([/\`(\\[<'"]|^|:\\s*)${reEsc(oldSlug)}(?![A-Za-z0-9_-])`, 'gm'),
    (_m, pre) => pre + newSlug);
};

const cases = [
  // --- numbering and slug rules added 2026-09-01 (reports/, ADR-005 v1.2.0) ---
  // Mirrors of extractExistingNumber's regex and the slug rule in
  // rename-series.mjs. A dated legacy id carries no reusable number.
  ['number: AUD-2026-08-17-stack has no reusable number (year is not a position)',
    () => { const m = 'AUD-2026-08-17-stack.md'.match(/^AUD-(\d+)(?!-\d{2}-\d{2})(?:-|\.md$)/); return m ? m[1] : null; },
    null],
  ['number: AUD-007-x still reuses 7',
    () => { const m = 'AUD-007-x.md'.match(/^AUD-(\d+)(?!-\d{2}-\d{2})(?:-|\.md$)/); return m ? m[1] : null; },
    '007'],
  ['slug: legacy prefix and date dropped from an unnumbered basename',
    () => { const m = 'AUD-2026-08-17-stack.md'.match(/^AUD-(?:\d{4}-\d{2}-\d{2}-)?(.+)\.md$/); return m ? m[1] : null; },
    'stack'],
  ['slug: legacy prefix without a date dropped too',
    () => { const m = 'PROP-C005-5.2-third-party.md'.match(/^PROP-(?:\d{4}-\d{2}-\d{2}-)?(.+)\.md$/); return m ? m[1] : null; },
    'C005-5.2-third-party'],
  ['refuse: a test file is never rewritten by the tool (it rewrote this one, 2026-09-01)',
    () => /\.test\.mjs$/.test('machine/scripts/test/rename-series.test.mjs'),
    true],
  // --- the ones that actually broke -------------------------------------
  // --- the slug form: the hand-written map in [slug].astro (MIS-127) ----
  ['slug: hand-written slug map value is rewritten',
    () => rewriteSlug('  privacidad: "ops-003-privacy-policy-numengames",',
      'OPS-003-privacy-policy-numengames.md', 'OPS-003-privacy-policy-numengames.md'),
    '  privacidad: "ops-003-privacy-policy-numengames",'],

  ['slug: url path form is rewritten',
    () => rewriteSlug('(/corpus/operations/ops-001-continuity)',
      'OPS-001-continuity.md', 'OPS-001-continuity.md'),
    '(/corpus/operations/ops-001-continuity)'],

  ['slug: a longer id sharing the prefix is not touched',
    () => rewriteSlug('see /corpus/operations/o-001-continuity-notes here',
      'OPS-001-continuity.md', 'OPS-001-continuity.md'),
    'see /corpus/operations/o-001-continuity-notes here'],

  ['id: MIS-001 is not STD-001',
    () => rewriteId('MIS-001 depends on STD-001', 'STD-001', 'STD-001'),
    'MIS-001 depends on STD-001'],

  ['id: no match inside a longer identifier',
    () => rewriteId('See MIS-0012 and S-0011', 'STD-001', 'STD-001'),
    'See MIS-0012 and S-0011'],

  ['base: word-shaped name keeps its slug in a path',
    () => rewriteBase('see standards/STD-002-governance.md today', 'STD-002-governance.md', 'STD-002-governance.md'),
    'see standards/STD-002-governance.md today'],

  ['base: does not fire inside another filename',
    () => rewriteBase('RPT-016-governance.md', 'STD-002-governance.md', 'STD-002-governance.md'),
    'RPT-016-governance.md'],

  // Second pass, same day: the first fix still produced STD-005.md, because
  // for a word-shaped id the string "STD-005-engineering-standards.md" matches the ID
  // rule (id + ".md"), not just the basename rule. An id followed by .md is a
  // filename and belongs to the basename rule, which knows the full new name.
  ['id: word-shaped id followed by .md is a filename, not an id',
    () => rewriteId('see `STD-005-engineering-standards.md` §7', 'engineering-standards', 'STD-005'),
    'see `STD-005-engineering-standards.md` §7'],

  ['id: same for governance.md',
    () => rewriteId('the approval gate in `STD-002-governance.md`', 'governance', 'STD-002'),
    'the approval gate in `STD-002-governance.md`'],

  // (This case asserted the opposite in the first fix — "a bare word-shaped id
  // IS rewritten". That was the bug: it is exactly what turned prose and JSX
  // property access into STD-002. Inverted deliberately.)
  ['id: not even a bare word-shaped id in prose',
    () => rewriteId('see governance §3 for the gate', 'governance', 'STD-002'),
    'see governance §3 for the gate'],


  // Second pass, same day. The first fix still broke things, in two ways that
  // only showed up on a shelf whose ids are English words:
  //
  //   {fondo.governance} -> {fondo.STD-002}   (archive/[fondo].astro, no build)
  //   "29,000 lines of governance" -> "of STD-002"
  //
  // A word-shaped id is not distinguishable from the word. It is not rewritten
  // at all now; its citations travel as filenames and the basename rule has
  // them. These four cases are that rule.
  ['id: word-shaped id is never rewritten (prose)',
    () => rewriteId('the corpus is 29,000 lines of governance', 'governance', 'STD-002'),
    'the corpus is 29,000 lines of governance'],

  ['id: word-shaped id is never rewritten (code)',
    () => rewriteId('<p>{fondo.governance}</p>', 'governance', 'STD-002'),
    '<p>{fondo.governance}</p>'],

  ['id: nor the hyphenated word-shaped one',
    () => rewriteId('see engineering-standards for the rules', 'engineering-standards', 'STD-005'),
    'see engineering-standards for the rules'],

  ['id: but a real series id still is',
    () => rewriteId('see STD-001 §9', 'STD-001', 'STD-001'),
    'see STD-001 §9'],

  // --- the ones that must still work ------------------------------------
  ['id: at start of line',
    () => rewriteId('STD-001 §9 says', 'STD-001', 'STD-001'),
    'STD-001 §9 says'],

  ['id: inside backticks',
    () => rewriteId('`STD-001` is the glossary', 'STD-001', 'STD-001'),
    '`STD-001` is the glossary'],

  ['rel: full path rewritten',
    () => rewriteRel('(standards/STD-001-glossary.md)', 'standards/STD-001-glossary.md', 'standards/STD-001-glossary.md'),
    '(standards/STD-001-glossary.md)'],

  ['base: frontmatter value',
    () => rewriteBase('supersedes: STD-002-governance.md', 'STD-002-governance.md', 'STD-002-governance.md'),
    'supersedes: STD-002-governance.md'],

  ['base: markdown link target',
    () => rewriteBase('[gov](STD-002-governance.md)', 'STD-002-governance.md', 'STD-002-governance.md'),
    '[gov](STD-002-governance.md)'],
];

for (const [name, fn, want] of cases) test(name, () => assert.equal(fn(), want));

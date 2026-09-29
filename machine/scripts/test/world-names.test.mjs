// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// world-names.test.mjs — two names of the world written one way only.
//
//   THE VEIL   In English it is the Veil. «Velo» is the Spanish word, right
//              only in Spanish text (the manual, the codex glossary, the
//              Spanish design prompt) and inside a «quotation» of one. Any
//              other occurrence is a mistake to correct (Christian and the
//              Oracle, 2026-09-29).
//   THE SUMMA  The Summa Archive is written with two m's in every language,
//              and in English in that order: never «Suma», never «Archive
//              Summa» (same ruling). Spanish «suma» (a sum) in the Spanish
//              manual is another word and is not read.
//
// History is left as it was: the changelog, the site's update log and the
// reports record what was written at the time.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const TEXT = /\.(md|astro|ts|tsx|mjs|js|css|json|txt|yaml|yml)$/;

/** Records of the past: they keep the spelling of their day. */
const HISTORY = [/^CHANGELOG\.md$/, /^web\/src\/data\/updates\.ts$/, /^reports\//, /^machine\/telemetry\//,
  /^machine\/scripts\/published-urls\.json$/, /^machine\/scripts\/test\/world-names\.test\.mjs$/];

/** Written in Spanish, where «Velo» is the right word. */
const SPANISH = [/^lore\/game\/manual\/es\//, /^lore\/codex\/glosario\.md$/, /^lore\/codex\/hoja-de-personaje\.md$/,
  /^lore\/adventures\/tabletop\/el-espejo-roto\.md$/, /^lore\/game\/manual\/glossary-es-en\.md$/,
  /^machine\/packages\/design-kit\/sistema\./, /^web\/public\/design\/kit\/sistema\./];

const files = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n').filter((f) => TEXT.test(f) && !HISTORY.some((r) => r.test(f)));

/** Text with every «quotation» removed: a quote keeps its source's words. */
const unquoted = (s) => s.replace(/«[^»\n]*»/g, '«»');

function offenders(pattern, skip = []) {
  const out = [];
  for (const f of files) {
    if (skip.some((r) => r.test(f))) continue;
    const lines = unquoted(readFileSync(path.join(ROOT, f), 'utf8')).split('\n');
    lines.forEach((l, i) => { if (pattern.test(l)) out.push(`${f}:${i + 1}: ${l.trim().slice(0, 100)}`); });
  }
  return out;
}

test('the Veil: «Velo» appears only in Spanish text or inside a quotation', () => {
  const bad = offenders(/\bVelo\b/, SPANISH);
  assert.deepEqual(bad, [], `write «Veil» in English:\n${bad.join('\n')}`);
});

test('the Summa: never «Suma» as the archive\'s name, in any file', () => {
  const bad = offenders(/\bsuma\b|Suma(?=Row|\b)|suma:/i, [/^lore\/game\/manual\/es\//]);
  assert.deepEqual(bad, [], `the Summa takes two m's:\n${bad.join('\n')}`);
});

test('the Summa: in English it is the Summa Archive, never the Archive Summa', () => {
  const bad = offenders(/Archive Summa/);
  assert.deepEqual(bad, [], `write «Summa Archive»:\n${bad.join('\n')}`);
});

test('a Spanish exemption names a file that exists', () => {
  const all = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' }).split('\n');
  for (const r of SPANISH) assert.ok(all.some((f) => r.test(f)), `${r} matches no tracked file`);
});

#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-018-one-identifier — the guard of STD-018.
//
// One identifier per document, carried by the name and the header alike,
// saying nothing else.
//
// IDN-011  a series document's name is <PREFIX>-<NNN|NNNN>-<slug>.md and the
//          identifier it carries is the series' shape; reports/ admit
//          RPT-YYYY-MM-DD.md for subtype: daily only — one report per day,
//          so the day IS the identifier.
//          Which files are held, and to which scheme, is machine/guards/lib/naming.mjs
//          — the reading STD-006 (TXT-001, the shape) shares.
// IDN-012  a filename encodes no state (-draft, -final, -frozen…). A negation
//          is not a state claim: `-not-frozen.md` describes a defect about
//          another document.
// IDN-013  a filename carries no version (-v1.2.md); history/ is exempt, its
//          names are the photographs they were taken as.
// IDN-014  an identifier is never reused. Two documents holding one id means
//          one of them is unreachable by citation — the resolver picks one.
// IDN-015  [MANUAL] — collision is resolved by commit order.
//
// Scope for IDN-012/013/014 is the bound corpus: every tracked .md outside
// web/ that is not apparatus and not outward-facing (README, CLAUDE, .github/
// …, which follow the platform they serve, STD-009). IDN-011 is narrower:
// the files classify() puts under a series scheme.
//
// Run from anywhere: node machine/guards/rules/std-018-one-identifier.mjs

import { execute, isMain } from '../lib/guard.mjs';
import { classify } from '../lib/naming.mjs';
import { isApparatus } from '../../scripts/lib/frontmatter.mjs';

export const meta = { family: 'IDN', plates: ['IDN-011', 'IDN-012', 'IDN-013', 'IDN-014'] };

/* STD-009 scope: files addressing a reader outside the corpus follow the
   conventions of the platform they serve, not the numbered series. */
const OUTWARD = /^(AGENTS|CLAUDE|CONTRIBUTING|CHANGELOG|SECURITY|TRADEMARKS|README)\.md$|^\.github\/|^web\//;

/* ---------- IDN-011: the name carries the series' identifier ---------- */

function identifier(rel, fm) {
  const c = classify(rel, fm);
  if (c.kind !== 'series' || !c.scheme) return [];   // root, apparatus, legacy names, history/, evidence: no id shape
  const { top, scheme } = c;
  const F = (what) => [{ plate: 'IDN-011', what: `N-04 ${what}`, where: rel }];
  if (c.dailyReport) {
    return fm.subtype === 'daily' ? []
      : F(`date-shaped identifier on a report whose subtype is "${fm.subtype || '(none)'}" — a date is the identifier of a daily report and of nothing else`);
  }
  if (c.slug === null) {
    const expected = scheme.dailyDate
      ? `${scheme.prefix}-${'N'.repeat(scheme.digits)}-<slug>.md (or RPT-YYYY-MM-DD.md for subtype: daily) for ${top}/`
      : `${scheme.prefix}-${'N'.repeat(scheme.digits)}-<slug>.md for ${top}/`;
    return F(`filename does not match ${expected}`);
  }
  if (scheme.dailyDate && fm.subtype === 'daily')
    return F('subtype: daily report carries a numbered identifier — a daily is identified by its day, not by a counter');
  return [];
}

/* ---------- IDN-012/013: the name says nothing else ---------- */

function nameSaysNothingElse(rel) {
  const out = [];
  if (/-(draft|final|frozen|old|new|deprecated)\.md$/.test(rel) && !/-not-[a-z]+\.md$/.test(rel))
    out.push({ plate: 'IDN-012', what: 'filename encodes state', where: rel });
  if (/-v\d+(\.\d+)*\.md$/.test(rel) && !rel.startsWith('history/'))
    out.push({ plate: 'IDN-013', what: 'filename carries a version', where: rel });
  return out;
}

export function run(corpus) {
  const findings = [];
  const seen = new Map();
  for (const rel of corpus.files) {
    if (rel.startsWith('web/')) continue;
    const fm = corpus.fm(rel) ?? {};
    findings.push(...identifier(rel, fm));
    if (OUTWARD.test(rel) || isApparatus(rel, fm)) continue;
    findings.push(...nameSaysNothingElse(rel));
    /* IDN-014 */
    const id = fm.id;
    if (!id) continue;
    if (seen.has(id)) findings.push({ plate: 'IDN-014', what: `id ${id} is held by two documents`, where: `${seen.get(id)} + ${rel}` });
    else seen.set(id, rel);
  }
  return findings;
}

if (isMain(import.meta)) await execute(import.meta, meta, run);

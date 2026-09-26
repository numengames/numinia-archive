#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-021-evidence-and-citation — the guard of STD-021.
//
// One plate, CIT-050: cite the document, not the place. A section number is
// the most fragile part of a citation — it changes whenever the cited
// document is reorganised, and the reader of the citing document never
// finds out. One edit once cut a protocol from 3652 to 1406 words and left
// nine citations pointing at sections that no longer existed; nothing failed.
//
// Two readings of the rule, each kept with the reach its source gave it:
//
//   norm     a standard cites no section by number at all (from
//            check-core-rules). Scope: standards/, not apparatus. Code is
//            stripped first — a plate in a fence is data, not a citation.
//   resolve  wherever a `DOC-NNN §X.Y` appears, if DOC-NNN exists and uses
//            numbered headings, §X.Y must be one of them (from
//            check-section-citations). Scope: every tracked .md outside
//            web/dist, salida/, machine/templates/, history/. Prose-headed documents
//            (ADR, RPT: "## Context") are not comparable — a §2 there is
//            ordinal, and a false failure teaches people to ignore the guard.
//
// CIT-053 and CIT-054 are read by std-012-corpus-does-not-grow, which is
// where they bite. CIT-051/052 and EVI-057 are manual.
//
// Not here: `--report` (list everything, exit 0) — the contract prints every
// finding under its plate and judges by the holder's state.
//
// Run from anywhere: node machine/guards/rules/std-021-evidence-and-citation.mjs

import path from 'node:path';
import { execute, isMain } from '../lib/guard.mjs';
import { isApparatus } from '../../scripts/lib/frontmatter.mjs';

export const meta = { family: 'CIT', plates: ['CIT-050'] };

const SKIP = ['web/dist/', 'salida/', 'machine/templates/', 'history/', 'node_modules/'];

/* "PRO-010 §3.2.2", "STD-008 v6.0.0 §13" — the id, then a § close behind it.
   The window is narrow and must not span another identifier: a row like
   "`PRO-013`, `STD-001` §10.4" cites the second, not the first. Verified
   against exactly that line in the corpus. */
const CITE = /\b([A-Z]{2,4}-\d{1,4}[a-z]?)\b((?:[^\n§]){0,18}?)§\s*(\d+(?:\.\d+)*)/g;
const INTERVENING_ID = /\b[A-Z]{2,4}-\d{1,4}[a-z]?\b/;
const NORM_CITE = /\b[A-Z]{2,4}-\d+\s+§\d[\d.]*/g;
const HEADING_NUM = /^#{1,6}\s+(\d+(?:\.\d+)*)[.\s]/gm;

const stripCode = (t) => t.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');

/** basename -> the numbered headings the document actually has. Exported
 *  so the test can pin "prose-headed means not comparable". */
export function sectionIndex(corpus) {
  const sections = new Map();
  for (const rel of corpus.files) {
    if (SKIP.some((s) => rel.startsWith(s))) continue;
    const nums = new Set();
    for (const m of corpus.text(rel).matchAll(HEADING_NUM)) nums.add(m[1]);
    sections.set(path.basename(rel), nums);
  }
  return sections;
}

export function run(corpus) {
  const out = [];
  const F = (where, what) => out.push({ plate: 'CIT-050', what, where });

  // norm: a standard names no section number, resolving or not.
  for (const rel of corpus.files) {
    if (!rel.startsWith('standards/')) continue;
    if (isApparatus(rel, corpus.fm(rel) ?? {})) continue;
    const m = stripCode(corpus.text(rel)).match(NORM_CITE);
    if (m) F(rel, `cites a section by number: ${m.join(', ')}`);
  }

  // resolve: a cited section exists in a document that numbers its sections.
  const sections = sectionIndex(corpus);
  const resolveDoc = (id) => { for (const name of sections.keys()) if (name.startsWith(id)) return name; return null; };
  for (const rel of corpus.files) {
    if (SKIP.some((s) => rel.startsWith(s))) continue;
    corpus.text(rel).split('\n').forEach((line, i) => {
      for (const m of line.matchAll(CITE)) {
        const [, id, gap, sec] = m;
        if (INTERVENING_ID.test(gap)) continue;   // the § belongs to a nearer id
        const name = resolveDoc(id);
        if (!name) continue;                      // cross-repo or unknown id: not ours
        const have = sections.get(name);
        if (!have || have.size === 0) continue;   // prose-headed: not comparable
        if (!have.has(sec)) F(`${rel}:${i + 1}`, `cites ${id} §${sec}, which ${name} does not have`);
      }
    });
  }
  return out;
}

if (isMain(import.meta)) await execute(import.meta, meta, run);

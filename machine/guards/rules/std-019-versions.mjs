#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-019-versions — the guard of STD-019.
//
// A version is a number that moves when an obligation moves, and one fact
// is written in one place.
//
// VER-021  `version:` is bare semantic: MAJOR.MINOR.PATCH, nothing else. A
//          change log that goes backwards is the same defect seen from the
//          other side — the number did not move as a version moves.
// VER-024  when a document keeps its own change log (`## Version history`,
//          `## Changelog`), its newest entry IS the header's version. Two
//          places, one fact, and they drift.
// VER-022, 023, 064 are judgements about meaning and stay manual.
//
// The heading must BE a change log, not mention one — `## Version history`,
// not `## 7. …register in the design system changelog`. The section ends at
// the next heading; scanning to end of file catches version-shaped numbers
// in unrelated prose. Logs here run oldest-first, so the newest entry is the
// last line.
//
// Scope is the bound corpus: every tracked .md outside web/ that is not
// apparatus and not outward-facing (README, CLAUDE, .github/…, which follow
// the platform they serve, STD-009). check-templates T-08 holds the OPENING
// value (0.1.0) on templates; that stays there.
//
// Run from anywhere: node machine/guards/rules/std-019-versions.mjs

import { execute, isMain } from '../lib/guard.mjs';
import { isApparatus } from '../../scripts/lib/frontmatter.mjs';

export const meta = { family: 'VER', plates: ['VER-021', 'VER-024'] };

/* STD-009 scope: files addressing a reader outside the corpus follow the
   conventions of the platform they serve, not the numbered series. */
const OUTWARD = /^(AGENTS|CLAUDE|CONTRIBUTING|CHANGELOG|SECURITY|TRADEMARKS|README)\.md$|^\.github\/|^web\//;

const SEMVER_RE = /^\d+\.\d+\.\d+$/;
const LOG_HEADING_RE = /^##\s+(?:\d+\.\s*)?(?:version history|changelog)\s*$/im;

function cmp(a, b) {
  const [x, y] = [a.split('.').map(Number), b.split('.').map(Number)];
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
}

/** The versions a document's own change log lists, oldest first; [] when it
 *  keeps none. Exported so a test can pin the heading rule. */
export function logEntries(text) {
  const ch = text.match(LOG_HEADING_RE);
  if (!ch) return [];
  const from = text.indexOf(ch[0]) + ch[0].length;
  const rest = text.slice(from);
  const end = rest.search(/^##\s/m);
  const section = end === -1 ? rest : rest.slice(0, end);
  return [...section.matchAll(/^[-*]\s+v?(\d+\.\d+\.\d+)/gm)].map((m) => m[1]);
}

export function run(corpus) {
  const findings = [];
  for (const rel of corpus.files) {
    if (OUTWARD.test(rel)) continue;
    const fm = corpus.fm(rel) ?? {};
    if (isApparatus(rel, fm)) continue;
    if (!fm.version) continue;
    const version = String(fm.version);
    if (!SEMVER_RE.test(version))
      findings.push({ plate: 'VER-021', what: `version "${version}" is not semantic`, where: rel });

    const entries = logEntries(corpus.text(rel));
    if (!entries.length) continue;
    const newest = entries[entries.length - 1];
    if (cmp(newest, version) !== 0)
      findings.push({ plate: 'VER-024', what: `header says ${version}, newest log entry is ${newest}`, where: rel });
    for (let i = 1; i < entries.length; i += 1)
      if (cmp(entries[i], entries[i - 1]) < 0)
        findings.push({ plate: 'VER-021', what: `change log goes backwards: ${entries[i - 1]} then ${entries[i]}`, where: rel });
  }
  return findings;
}

if (isMain(import.meta)) await execute(import.meta, meta, run);

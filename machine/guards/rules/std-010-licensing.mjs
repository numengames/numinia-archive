#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-010-licensing — the guard of STD-010.
//
// The human-readable `license:` frontmatter field is not an SPDX tag:
// REUSE.toml is the declaration of record. A document whose header names a
// licence other than the regime REUSE.toml assigns to its path is
// contradicting the record, and that drift is how a wrong default keeps
// reappearing across templates. Frontmatter only: licence strings inside
// fenced code examples are content, not declarations, and are ignored.
//
// machine/templates/ is skipped here and checked harder elsewhere: a mould's
// `license:` is a worked example of the series it scaffolds, so it must
// carry the DESTINATION's regime while the mould's own path is CC0.
// Comparing a mould against its own path would demand the answer that makes
// every document copied from it wrong. check-templates (T-04) resolves each
// mould's destination directory and checks the regime there.
//
// Run from anywhere: node machine/guards/rules/std-010-licensing.mjs

import { execute, isMain } from '../lib/guard.mjs';
import { regimeOf } from '../../scripts/lib/reuse.mjs';

export const meta = { family: 'LIC', plates: ['LIC-008'] };

/* LIC-008: one file, one regime — the header's SPDX must be the regime
   REUSE.toml assigns to the path. REUSE compliance itself is a build guard
   and is not this. */
export function run(corpus) {
  const findings = [];
  for (const rel of corpus.files) {
    if (rel.startsWith('machine/templates/')) continue;
    const v = corpus.fm(rel)?.license;
    const license = typeof v === 'string' && v.trim() ? v.trim() : null;
    if (!license) continue;
    const regime = regimeOf(rel);
    if (!regime) findings.push({ plate: 'LIC-008', what: `frontmatter says ${license}, REUSE.toml assigns no regime to this path`, where: rel });
    else if (license !== regime) findings.push({ plate: 'LIC-008', what: `frontmatter says ${license}, regime is ${regime}`, where: rel });
  }
  return findings;
}

if (isMain(import.meta)) await execute(import.meta, meta, run);

#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// std-010-licensing — the guard of STD-010.
//
// A licence belongs to the FILE, never to its folder: a folder-wide grant
// licenses files nobody looked at, including the next one added.
// A document says it twice, both in itself: the human-readable `license:`
// field of its header and the SPDX comment under it. This guard checks that
// the two say the same thing. Where the file carries no SPDX comment, the
// record is REUSE.toml's entry for that exact path. Frontmatter only:
// licence strings inside fenced code examples are content, not
// declarations, and are ignored.
//
// machine/templates/ is skipped here and checked harder elsewhere: a mould's
// `license:` is a worked example for the document that will be copied from
// it, not a statement about the mould. check-templates (T-04) holds it to a
// licence the repository ships a text for.
//
// Run from anywhere: node machine/guards/rules/std-010-licensing.mjs

import { execute, isMain } from '../lib/guard.mjs';
import { licenceOfFile } from '../../scripts/lib/reuse.mjs';

export const meta = { family: 'LIC', plates: ['LIC-008'] };

/* LIC-008: one file, one regime — the header's `license:` must be the
   licence the file declares (its SPDX comment, else REUSE.toml for its path). REUSE compliance itself is a build guard
   and is not this. */
export function run(corpus) {
  const findings = [];
  for (const rel of corpus.files) {
    if (rel.startsWith('machine/templates/')) continue;
    const v = corpus.fm(rel)?.license;
    const license = typeof v === 'string' && v.trim() ? v.trim() : null;
    if (!license) continue;
    const regime = licenceOfFile(rel, { root: corpus.root });
    if (!regime) findings.push({ plate: 'LIC-008', what: `frontmatter says ${license}, but the file carries no SPDX comment and REUSE.toml does not name it`, where: rel });
    else if (license !== regime) findings.push({ plate: 'LIC-008', what: `frontmatter says ${license}, the file's SPDX declaration says ${regime}`, where: rel });
  }
  return findings;
}

if (isMain(import.meta)) await execute(import.meta, meta, run);

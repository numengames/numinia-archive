// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// naming.mjs — what a corpus file's NAME is held to, read once.
//
// Two standards look at a file name: STD-006 (TXT-001, the shape — root
// documents UPPERCASE, no version or date in a living name, a kebab-case
// slug) and STD-018 (IDN-011, the identifier the name carries). They agree
// on which files are held and to which series scheme; this module is that
// agreement, so neither guard keeps a private copy of it.
//
// classify(rel, fm) returns one of:
//   { kind: 'root', base }                      a top-level document
//   { kind: 'skip' }                            agents/ and apparatus
//   { kind: 'legacy', base, declaredArchive,    a dated or version-suffixed name
//     legacyDated }                             (held to N-02 only)
//   { kind: 'series', base, top, scheme,        a series document; scheme is
//     dailyReport, slug }                       null under history/ and
//                                               reports/evidence/ (held to N-02
//                                               only); slug is null when the
//                                               name does not match the scheme
//
// The scheme map is read from machine/scripts/lib/rules.json, so the guards and the
// tools share one answer. history/ and agents/ carry no filename scheme: one
// holds photographs of what names used to be, the other is apparatus.

import { loadRules, isApparatus } from '../../scripts/lib/frontmatter.mjs';

const RULES = loadRules();
export const SERIES = Object.fromEntries(Object.entries(RULES.series)
  .filter(([k, v]) => !k.startsWith('_') && v.naming !== false)
  .map(([k, v]) => [k, {
    prefix: v.prefix.length > 1 ? `(?:${v.prefix.join('|')})` : v.prefix[0],
    digits: v.digits,
    dailyDate: !!v.dailyDate,
  }]));

export const ROOT_UPPERCASE_RE = /^[A-Z][A-Z_]*\.md$/;
export const KEBAB_SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const VERSION_SUFFIX_RE = /-v\d+(\.\d+){0,2}\.md$/i;
export const DATED_PREFIX_RE = /^\d{4}_\d{2}_\d{2}-/;
/* The daily-report shape. No slug — the date is the whole identity, so a
   second name for the same day would be a second report. */
export const DAILY_REPORT_RE = /^RPT-\d{4}-\d{2}-\d{2}\.md$/;

export function classify(rel, fm) {
  const parts = rel.split('/');
  const top = parts[0];
  const base = parts[parts.length - 1];
  if (parts.length === 1) return { kind: 'root', base };
  if (top === 'agents') return { kind: 'skip' };             // no filename scheme applies here
  if (isApparatus(rel, null)) return { kind: 'skip' };
  // `type: meta` IS the apparatus declaration — scaffolding around a series,
  // not a member of it, so no series filename shape applies.
  if (isApparatus(rel, fm ?? {})) return { kind: 'skip' };

  /* A name cannot license itself: the exemption is what the frontmatter
     declares, whatever word it uses (two history/ documents still say
     `frozen-artifact`; they are photographs). The legacy dated shape is
     tolerated only where it is still on disk. */
  const exemption = fm?.registration === 'exempt' ? fm.registration_exemption : null;
  const declaredArchive = typeof exemption === 'string' && exemption.length > 0;
  const legacyDated = DATED_PREFIX_RE.test(base);
  if (legacyDated || declaredArchive) return { kind: 'legacy', base, declaredArchive, legacyDated };

  const scheme = SERIES[top] ?? null;                         // history/: no scheme
  /* reports/evidence/<RPT-id>/…: an annex, moved as an opaque block, never
     authored (IDN-011). Captured artefacts, not documents of the series.
     Still a living name (N-02), never a scheme. */
  const evidence = top === 'reports' && parts[1] === 'evidence';
  if (!scheme || evidence) return { kind: 'series', base, top, scheme: null, dailyReport: false, slug: null };

  const dailyReport = scheme.dailyDate && DAILY_REPORT_RE.test(base);
  const m = dailyReport ? null : base.match(new RegExp(`^${scheme.prefix}-\\d{${scheme.digits}}-(.+)\\.md$`));
  return { kind: 'series', base, top, scheme, dailyReport, slug: m ? m[1] : null };
}

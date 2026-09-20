// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// What a citation to a document looks like, in one place.
//
// Two tests enforce the same rule on two artefacts — the guard sources
// (machine/guards/test/contract.test.mjs) and the blind-spot registry
// (machine/scripts/test/blindness.test.mjs). A pattern copied into both drifts: one
// gets a prefix the other never learns, and the gap is silent, because a
// pattern that matches nothing looks exactly like a clean tree.
//
// DOCUMENT matches a pointer at a record: a mission, a decision, a debt, a
// report, a pull request, a date.
//
//   `\b` around the single-letter prefixes keeps the pattern off the tail of
//   STD-016 — without it the scan counts the last three characters of a
//   standard's own identifier, and the fix would be to delete the holder the
//   rule says to keep.
//
//   `C` and `D` are both live: decisions carry C-NNN, debt carries D-NNN.
//
//   A date wedged between hyphens or slashes is part of a filename, which is
//   data a guard needs, so the date form only matches where prose puts one.
//
// SECTION matches a citation of a numbered heading. It is separate because a
// § number is the most perishable thing a document has: the holder survives a
// renumbering, the section does not. `P` is the retired protocol prefix,
// still present in older prose.
export const DOCUMENT = String.raw`MIS-[0-9]+|ADR-[0-9]+|DBT-[0-9]+|RPT-[0-9]+|\b[CD]-[0-9]{3}\b|PR #[0-9]+|(?<![-/\w])[0-9]{4}-[0-9]{2}-[0-9]{2}(?![-\w])`;
export const SECTION = String.raw`\b(?:STD|PRO|CAN|OPS|P)-[0-9]{3}[^\n]{0,14}?§\s?[0-9.]+`;

/** A fresh matcher. Shared /g regexes carry lastIndex between callers. */
export const citationRe = () => new RegExp(`${DOCUMENT}|${SECTION}`, 'g');

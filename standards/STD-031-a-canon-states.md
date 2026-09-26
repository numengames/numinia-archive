---
id: "STD-031"
uid: ""
title: "A canon states"
type: documentation
subtype: standard
status: draft
version: "0.1.2"
created: "2026-09-24T22:00:00+02:00"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [standards, canon, writing, form, mould]
license: "CC0-1.0"
ratified_by: "ADR-062"
threshold: governed
related: ["STD-007", "STD-001", "STD-024", "ADR-049", "ADR-053"]
series_change: "0.1.2 — 2026-09-25: the Why says plainly that no outside standard governs what a canon argues, the plain-language standard is cited where it covers readability and the thesaurus standard anchors the manual's names; no obligation added or dropped."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A canon states

> **Summary:** A canon says what is so, why it is so, and leaves the reader
> able to do something. It names no tool, keeps no clock, repeats no
> neighbour, and keeps its document names at the foot. Its title is a claim.
> **Epistemic:** What separates a canon from a manual, a decision or a
> brochure — and why every rule here has already cost a text.
> **Pragmatic:** Write a canon, or refuse one, against a list you can point
> at.
> **Audience:** Agents · Oracles

**Binds:** every document in the canon.
**Does not bind:** the header, the card, the length and the reference table
every series shares; what a series is.

## Rules

None of these rules is law: all are our choice.

### What a canon does

**It says what is so.** A canon MUST state its claim in the present tense,
with what makes it land — an image or a case. Stating is not listing: an
inventory of parts is not a canon.

**It says why.** A canon MUST give reasoning that survives being quoted
alone and applied to a case it never imagined. The history of the decision
belongs to a decision record.

**It leaves the reader able to do something.** A canon MUST give a test to
run, a distinction to draw or a thing to refuse, usable on the first day
without asking anyone. The international plain-language standard asks the
same of any text: the reader finds what they need, understands it, and can
use it.

**Obligations, not sections.** The three above MAY come in any order and
any shape — continuous prose, the author's own headings, or none. No
sectioning is prescribed.

**The title is a claim.** The title MUST state what the canon holds true,
not its subject: *Opening is an act*, not *Licensing*.

### What a canon leaves out

**No tool.** A canon MUST NOT name a vendor, product or application as the
way something is done. It states the capability; the instrument belongs in
the system notes or a protocol.

**No clock.** A canon MUST NOT carry a date, hour, cadence or calendar in
its body. The schedule belongs to a protocol; the hours, to the calendar.

**No restatement.** Where another canon or a standard develops a thing, a
canon MUST name it and stop. A summary of a neighbour is a second place to
go stale.

**A border only when real.** A canon MAY say what it does not cover only
where it names the document a reader would confuse it with. Otherwise it
MUST NOT.

**No date, no byline in the body.** A voice arguing on a given day is a
report or a decision.

**Document names at the foot.** A canon MUST name a thing in words and keep
its code in the header and the reference table, never mid-sentence.

### Whose names

**The manual names the world.** Where a canon and the game manual disagree
on the name of a guild, branch, house, faction, rank or force, the manual is
right and the canon is corrected. One preferred name per thing, as the
international thesaurus standard asks, is what lets a search find it under
one word.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| STA-001 | It says what is so | [ISO 24495-1:2023, plain language](https://www.iso.org/standard/78907.html) — readability only; our choice | by hand — whether a text states is read, not parsed |
| STA-002 | It says why | — | by hand |
| STA-003 | It leaves the reader able to do something | [ISO 24495-1:2023, plain language](https://www.iso.org/standard/78907.html) — the reader can use what they find; our choice | by hand |
| STA-004 | Obligations, not sections | — | by hand |
| STA-005 | The title is a claim | — | by hand; `machine/tools/rule-index.mjs` shows every title side by side, where a label stands out |
| STA-006 | No tool | — | by hand — a search for vendor names catches the crude cases |
| STA-007 | No clock | — | by hand — a search for years catches the crude cases |
| STA-008 | No restatement | — | by hand |
| STA-009 | A border only when real | — | by hand |
| STA-010 | No date, no byline in the body | — | by hand |
| STA-011 | Document names at the foot | — | `machine/guards/rules/std-021-evidence-and-citation.mjs` (`CIT-050`) reports a section cited by number; a bare name mid-prose is read |
| STA-012 | The manual names the world | [ISO 25964-1:2011, thesauri](https://www.iso.org/standard/53657.html) — one preferred term per concept; our choice | by hand, against `lore/game/manual/glossary-es-en.md` |
| — | the body length, 1,500 words, a SHOULD | — | `machine/guards/rules/std-007-one-page.mjs` (`DOC-006`) — counted and reported, never enforced |

| In the reading | Exact form |
|---|---|
| the canon | `canon/` |
| the system notes | `system/` |
| the header and the reference table | `related:` and the References table |

## Why

Every rule here is the epitaph of a text. A board named after a vendor died
with the vendor and took the founding canon with it. Three rituals with
hours disagreed with two other canons within a month. Four numbered
sections produced documents that complied and did not persuade. No outside
standard governs what a canon argues: the international plain-language
standard judges only whether a text can be read, so these rules are ours.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-007` | One page per document | the card, the length, the reference table |
| `STD-024` | A series is a function | why a rule in a decision binds nobody until it is here |
| `ADR-049` | Canon is written as prose, not filled into sections | where most of these rules were decided |
| `ADR-053` | The game manual is the authority on the world's vocabulary | where the last rule was decided |
| `STD-001` | The series | the canon's row: threshold, length, mould |

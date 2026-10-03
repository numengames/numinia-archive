---
id: "STD-031"
uid: ""
title: "A principle states"
type: standard
subtype: standard
status: draft
version: "0.1.13"
created: "2026-09-24T22:00:00+02:00"
updated: "2026-10-03T22:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
section: "Knowledge and quality"
tags: [standards, principles, writing, form, template]
license: "CC0-1.0"
approved_by: "ADR-062"
related: ["STD-007", "STD-001", "STD-024"]
derived_from: "PRI-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A principle states

> **Summary:** A principle says what is so and why, and leaves the reader able
> to act. It names no tool, keeps no clock, repeats no neighbour, and keeps
> document codes at the foot. Its title is a claim.
> **Epistemic:** What does a principle say?
> **Pragmatic:** Write a principle, or refuse one, against a list you can point
> at.
> **Audience:** Agents · Oracles

**Binds:** every document in the principles.

## Rules

### What a principle does

**It says what is so.** A principle MUST state its claim in the present tense,
with an image or a case that makes it land. Stating is not listing: an
inventory of parts is not a principle.

**It says why.** A principle MUST give reasoning that survives being quoted
alone and applied to a case it never imagined. The history of the decision
belongs in a decision record.

**It leaves the reader able to do something.** A principle MUST give a test to
run, a distinction to draw or a thing to refuse, usable on the first day
without asking anyone. The international plain-language standard asks the
same of any text: the reader finds what they need, understands it and can
use it.

**Obligations, not sections.** The three above MAY come in any order and
any shape: continuous prose, the author's own headings, or none. No
sectioning is prescribed.

**The title is a claim.** The title MUST state what the principle holds true,
not its subject: *Opening is an act*, not *Licensing*.

### What a principle leaves out

**No tool.** A principle MUST NOT name a vendor, product or application as the
way something is done. It states the capability. The tool belongs in
the system notes or a procedure.

**No clock.** A principle MUST NOT carry a date, hour, cadence or calendar in
its body. The schedule belongs in a procedure, the hours in the calendar.

**No restatement.** Where another principle or a standard develops a thing, a
principle MUST name it and stop. A summary of a neighbour is a second place to
go stale.

**A border only when real.** A principle MAY say what it does not cover only
where it names the document a reader would confuse it with. Otherwise it
MUST NOT.

**No date, no byline in the body.** A signed voice arguing on a given day
is a report or a decision, not a principle.

**Document names at the foot.** A principle MUST name a thing in words, and
keep its code in the header and the reference table, never mid-sentence.

### Whose names

**The manual names the world.** Where a principle and the game manual disagree
on the name of a guild, branch, house, faction, rank or force, the manual is
right and the principle is corrected. The international thesaurus standard asks
for one preferred name per thing, so a search finds it under one word.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| STA-001 | It says what is so | [ISO 24495-1:2023, plain language](https://www.iso.org/standard/78907.html) — readability only | by hand — whether a text states is read, not parsed |
| STA-002 | It says why | — | by hand |
| STA-003 | It leaves the reader able to do something | [ISO 24495-1:2023, plain language](https://www.iso.org/standard/78907.html) — the reader can use what they find | by hand |
| STA-004 | Obligations, not sections | — | by hand |
| STA-005 | The title is a claim | — | by hand; `machine/tools/rule-index.mjs` shows every title side by side, where a label stands out |
| STA-006 | No tool | — | by hand — a search for vendor names catches the crude cases |
| STA-007 | No clock | — | by hand — a search for years catches the crude cases |
| STA-008 | No restatement | — | by hand |
| STA-009 | A border only when real | — | by hand |
| STA-010 | No date, no byline in the body | — | by hand |
| STA-011 | Document names at the foot | — | `machine/checks/rules/std-021-evidence-and-citation.mjs` (`CIT-050`) reports a section cited by number; a bare name mid-prose is read |
| STA-012 | The manual names the world | [ISO 25964-1:2011, thesauri](https://www.iso.org/standard/53657.html) — one preferred term per concept | by hand, against `lore/game/manual/glossary-es-en.md` |
| — | the body length, 1,500 words, a SHOULD | — | `machine/checks/rules/std-007-one-page.mjs` (`DOC-006`) — counted and reported, never enforced |

| In the reading | Exact form |
|---|---|
| the principles | `principles/` |
| the system notes | `system/` |
| the header and the reference table | `related:` and the References table |

## Why

Every rule here is the epitaph of a text. A board named after a vendor died
with the vendor and took the founding principles with it. Three rituals with
hours disagreed with two other principles within a month. Four numbered
sections produced documents that complied and did not persuade. No outside
standard governs what a principle argues; the international plain-language
standard judges only whether a text can be read.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-007` | One page per document | the card, the length, the reference table |
| `STD-024` | A series is a function | why a rule in a decision binds nobody until it is here |
| `STD-001` | The series | the principles' row: threshold, length, template |

---
id: "STD-031"
uid: ""
title: "A canon states"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-24T22:00:00+02:00"
updated: "2026-09-24T22:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [standards, canon, writing, form, mould]
license: "CC0-1.0"
ratified_by: "ADR-062"
threshold: governed
related: ["STD-007", "STD-001", "STD-024", "ADR-049", "ADR-053"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A canon states

> **Summary:** A canon says what is so, why it is so, and leaves the reader
> able to do something. It names no tool, keeps no clock, repeats no
> neighbour, and carries its identifiers at the foot. Its title is a claim.
> **Epistemic:** What separates a canon from a manual, a decision or a
> brochure — and why every rule here has already cost a text.
> **Pragmatic:** Write a canon, or refuse one, against a list you can point
> at.

**Binds:** every document in `canon/`.
**Does not bind:** the header (`STD-016`), the card, the budget and the
References table (`STD-007`), which every series shares; what a series is
(`STD-024`).

---

## Rules

**STA-001 — It says what is so.** A canon must state its claim in the
present indicative, with what makes it land — an image or a case. Stating
is not listing: an inventory of parts is not a canon.

**STA-002 — It says why.** A canon must give reasoning that survives being
quoted alone and applied to a case it never imagined. The history of the
decision is an ADR's.

**STA-003 — It leaves the reader able to do something.** A canon must give
a test to run, a distinction to draw or a thing to refuse, usable on the
first day without asking anyone.

**STA-004 — Obligations, not sections.** The three above may come in any
order and any shape — continuous prose, headings of the author's, or none.
No sectioning is prescribed.

**STA-005 — The title is a claim.** The title must state what the canon
holds true, not its subject. *Opening is an act*, not *Licensing*.

**STA-006 — No tool.** A canon must not name a vendor, product or
application as the way something is done. It states the capability; the
instrument belongs in `system/` or a protocol.

**STA-007 — No clock.** A canon must not carry a date, hour, cadence or
calendar in its body. Schedule is a protocol's; hours are the calendar's.

**STA-008 — No restatement.** Where another canon or a standard develops a
thing, a canon must name it and stop. A summary of a neighbour is a second
place to go stale.

**STA-009 — A border only when real.** A canon may say what it does not
cover only where it names the document a reader would confuse it with.
Otherwise it must not.

**STA-010 — No date, no byline in the body.** A voice arguing on a given
day is a report or a decision.

**STA-011 — Identifiers at the foot.** A canon must name the thing in
prose and carry the code in `related:` and in the References table, never
mid-sentence.

**STA-012 — The manual names the world.** Where a canon and the game manual
disagree on the name of a guild, branch, house, faction, rank or force, the
manual is right and the canon is corrected.

## Check

| Plate | Verified by |
|---|---|
| STA-001..004, 008..010 | `[MANUAL]` — whether a text states, reasons and enables is read, not parsed |
| STA-005 | `[MANUAL]`; `machine/tools/rule-index.mjs` shows every title side by side, where a label stands out |
| STA-006, 007 | `[MANUAL]` — a grep for years and vendor names catches the crude cases; the subtle ones are read |
| STA-011 | `machine/guards/rules/std-021-evidence-and-citation.mjs` (`CIT-050`) reports a section cited by number; a bare identifier mid-prose is read |
| STA-012 | `[MANUAL]` against `lore/game/manual/glossary-es-en.md` |
| the body budget (1 500, SHOULD) | `machine/guards/rules/std-007-one-page.mjs` (`DOC-006`) — counted and reported, never enforced |

## Why

Every rule here is the epitaph of a text. A board named by vendor died with
the vendor and took the founding canon with it. Three rituals with hours
disagreed with two other canons within a month. Four numbered sections
produced documents that complied and did not persuade, and the one section
nobody could fill honestly got filled anyway. Until now these rules lived in
decision records — and an obligation outside the axis is a plan until a
standard sustains it (`SER-001`). This is the standard.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-007` | One page per document | the card, the budget, the References table, the plates |
| `STD-024` | A series is a function | why a rule in an ADR binds nobody until it is here |
| `ADR-049` | Canon is written as prose | where STA-001..005 and 009..010 were decided |
| `ADR-053` | The manual names the world | where STA-012 was decided |
| `STD-001` | The series | the canon row: threshold, budget, mould |

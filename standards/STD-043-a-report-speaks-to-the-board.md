---
id: "STD-043"
uid: ""
title: "A report speaks to the board"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-29T19:30:00+02:00"
updated: "2026-09-29T19:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, reports, rollup, weekly, quarterly, annual, board, management-commentary]
license: "CC0-1.0"
related: ["STD-012", "PRO-017", "STD-036", "STD-021", "STD-007", "CAN-009"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A report speaks to the board

> **Summary:** The weekly, quarterly and annual reports are written for a
> board and for the public, not for the people who did the work. Each one
> covers the whole organisation under the same nine headings, leads with
> what matters, and compares every figure with the period before.
> **Epistemic:** What does a period report say, and to whom?
> **Pragmatic:** Write or review a weekly, quarterly or annual report, and
> know what is missing from it before it is published.
> **Audience:** Agents · Oracles

**Binds:** every roll-up report of a week, a quarter or a year.

## Rules

### Who it is written for

**The reader is the board.** A report MUST be written for someone who sits
on the board or reads the published accounts: they know the company, not
the work. Nothing in it assumes they read the week's changes.

**The conclusion comes first.** The title MUST state what happened in the
period. Below it, three lines for a week, five for a quarter and one
paragraph for a year MUST be enough for a reader who reads nothing else.

### What it covers

**The whole organisation, nine headings.** Every report MUST carry these
headings in this order: the period in brief; business and customers;
money; products and services; the world and its creations; people and
agents; governance; risks and debts; the outlook. A heading with nothing
to say keeps its place and says so in one line.

**Money is never left out.** The money heading MUST give the period's
income, spend and cash from the ledger, or state plainly that the ledger
does not yet feed the report.

**The annual report tells the story.** An annual report MUST open with the
organisation's history from its founding to the end of that year, told by
an Oracle and extended each year, never rewritten.

### How the figures behave

**Every figure is measured.** A figure MUST come from an instrument or a
record, named with the commit it was read at. None is typed from memory.

**Every figure has its comparison.** A figure MUST stand beside the same
figure for the period before. The same measures MUST appear every period,
so a trend can be read across reports.

### How long it is

**A week is a page.** A weekly report SHOULD fit one page, a quarterly two
and an annual three, apart from the annual's history.

## Check

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| RPR-001 | The reader is the board | [IFRS Practice Statement 1, management commentary](https://www.ifrs.org/issued-standards/management-commentary-practice-statement/): written for the primary users of the financial reports | by hand, at the pull request |
| RPR-002 | The conclusion comes first | Minto, *The Pyramid Principle* (1987) — the answer before its support | by hand |
| RPR-003 | The whole organisation, nine headings | [Spanish Companies Act, art. 262](https://www.boe.es/buscar/act.php?id=BOE-A-2010-10544#a262), the management report: the business's development, position, risks and outlook; the nine headings are ours | by hand, against the report mould |
| RPR-004 | Money is never left out | the ledger of the one-account standard | by hand |
| RPR-005 | The annual report tells the story | — | by hand |
| RPR-006 | Every figure is measured | the evidence standard: `evidence_script`, `evidence_head` | `machine/guards/rules/std-021-evidence-and-citation.mjs` where the fields are declared |
| RPR-007 | Every figure has its comparison | IFRS Practice Statement 1, comparative information and consistent measures | by hand |
| RPR-008 | A week is a page | the one-page standard's word budget for reports | `machine/guards/rules/std-007-one-page.mjs` — a SHOULD |

## Why

A report written by the people who did the work lists the work. The board
needs the state of the company: whether it sells, what it costs, what it
owns, what threatens it and where it goes. Nine fixed headings make an
empty one visible, and a figure without its predecessor tells nobody
whether things got better.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-012` | The corpus does not grow | the three levels and what survives each |
| `PRO-017` | Rolling up the week | the procedure that writes these reports |
| `STD-036` | One account | where the money heading reads from |
| `STD-021` | Evidence and citation | how a figure names its source |
| `CAN-009` | The archive is the organisation | why a report covers all of it |

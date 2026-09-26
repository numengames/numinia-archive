---
id: "STD-024"
uid: ""
title: "A series is a function"
type: documentation
subtype: standard
status: draft
version: "2.0.0"
created: "2026-09-09T12:30:00+02:00"
updated: "2026-09-26T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
license: "CC0-1.0"
tags: [standards, series, thresholds, registration, records-management]
threshold: governed
related: ["STD-001", "STD-017", "STD-018", "STD-020", "CAN-004"]
series_change: "2.0.0 — 2026-09-26: the thresholds move to Who may change what, and moving series and absorption to The corpus does not grow, each the one standard answering that question; this standard now answers only which series a document belongs to and what that makes it. A removed obligation, so a major move, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A series is a function

> **Summary:** A folder is a series when losing it breaks a named function.
> Three series oblige; the rest record. The folder and the declared kind
> agree, and an exemption says why.
> **Epistemic:** Which series a document belongs to, and what that makes
> it: a rule that obliges or a record that does not.
> **Pragmatic:** Decide whether a folder is a series, whether a text binds,
> and where a document lives — without asking.
> **Audience:** Agents · Oracles

**Binds:** every folder of the archive and every document in one.
**Does not bind:** which series exist, who signs a change, or how a
document leaves.

## Rules

### What binds

**Only three series oblige.** The international quality standard tells the
documents you maintain, which say what must be done, from the records you
keep, which say what was done. Ours: the canon, the standards and the
protocols oblige; every other series MUST be read as a record, which cannot
put a reader in breach.

**Complied with, or carried out.** A standard is complied with by a thing
made; a protocol is carried out by someone acting. The line MUST be drawn by
how it works, not by the topic.

### Where a document lives

**Folder and kind agree.** The international standard for records
management files each record in one place of a classification scheme, so it
is found and handled by the rules of that place. The folder is that place;
when it and the declared kind disagree, the file MUST move, not the kind.

**Exemptions say why.** A document left out of registration MUST say so and
give the reason, both or neither. Counts leave it out rather than mark it
missing.

How a document moves to another series, or is absorbed, is said once, in
the standard that the corpus does not grow.

## Check

Each rule, its code, its source and its check. No law requires any of it; it
is our choice, so that an auditor who knows these standards can check us
without a glossary.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| SER-001 | Only three series oblige | [ISO 9001:2015, documented information, clause 7.5](https://www.iso.org/standard/62085.html) (clause unverified): maintain against retain | by hand — what binds is read, not parsed |
| SER-002 | Complied with, or carried out | — | by hand |
| SER-003 | retired → AUT-068 of Who may change what, which now holds the thresholds | — | — |
| SER-004 | Folder and kind agree | [ISO 15489-1:2016, classification](https://www.iso.org/standard/62542.html), clause 9.4 (clause unverified) | `machine/guards/rules/std-004-the-header.mjs` (`HDR-017`) |
| SER-007 | Exemptions say why | — | `machine/guards/rules/std-004-the-header.mjs` (`HDR-001`) |
| SER-005 | retired → DEF-010 of The corpus does not grow | — | — |
| SER-006 | retired → DEF-011 of The corpus does not grow | — | — |

| In the reading | Exact form |
|---|---|
| the canon, the standards, the protocols | `canon/`, `standards/`, `protocols/` |
| the declared kind | `type:` |
| left out of registration, and why | `registration: exempt` with `registration_reason:`; the reason is apparatus of a registered document, or a rename whose readers cannot all be updated |

## Why

The archive is read by agents that must know, without asking, whether a
sentence binds them: the first rule makes that a question of where it sits,
and the folder rule keeps where it sits honest.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-001` | The series | which series exist |
| `STD-017` | Who may change what | who signs a change, and the threshold of each series |
| `STD-012` | The corpus does not grow | how a document moves or leaves |
| `CAN-004` | You are what you are doing | the archive is the system's memory |

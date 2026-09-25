---
id: "STD-024"
uid: ""
title: "A series is a function"
type: documentation
subtype: standard
status: draft
version: "1.0.4"
created: "2026-09-09T12:30:00+02:00"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
license: "CC0-1.0"
tags: [standards, series, thresholds, registration, records-management]
threshold: governed
related: ["STD-001", "STD-017", "STD-018", "STD-020", "CAN-004"]
series_change: "1.0.4 — 2026-09-25: each rule says what it adopts from the quality standard, the records-management standard, Dublin Core or the web's permanent redirect, what that makes us do and why, and that the law requires none of it. No obligation added or dropped."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A series is a function

> **Summary:** A folder is a series when losing it breaks a named function.
> Three series oblige; the rest record. A threshold says what a change
> takes. A document leaves its series under a new name or by being absorbed,
> never by being renamed.
> **Epistemic:** What a series is, what it may oblige, and how a document
> moves between series, in the terms of recognised outside standards.
> **Pragmatic:** Decide whether a folder is a series, whether a text binds,
> and what a change to it requires — without asking.
> **Audience:** Agents · Oracles

**Binds:** every folder of the archive and every document in one.
**Does not bind:** which series exist, who signs a change, or the name
itself.

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

**The threshold says what a change takes.** The quality standard asks that
a controlled document be approved before it is used and its changes
controlled, so every change shows who let it through. We grade that control
in five thresholds, from the Oracle's signature down to an ordinary change,
and a change MUST meet its series' threshold.

### Where a document lives

**Folder and kind agree.** The international standard for records
management files each record in one place of a classification scheme, so it
is found and handled by the rules of that place. The folder is that place;
when it and the declared kind disagree, the file MUST move, not the kind.

**Exemptions say why.** A document left out of registration MUST say so and
give the reason, both or neither. Counts leave it out rather than mark it
missing.

### How a document moves

**A document changes series under a new name.** Dublin Core, the common
vocabulary for describing documents, lets the old one say which document
replaced it, so every reader can follow. Neither is renumbered, and if a
reader of the old cannot be updated in the same change, the move MUST NOT
happen.

**Absorption carries the reasoning.** A record MAY leave its folder by being
carried into another document that says, in Dublin Core's terms, what it
replaces; the reasoning survives there, every citation is rewritten, and
every public address redirects permanently in the same change.

## Check

Every rule above, with its plate, the outside standard it follows, and what
verifies it today. No law requires any of it; it is our choice, so that an
auditor who knows these standards can check us without a glossary.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| SER-001 | Only three series oblige | [ISO 9001:2015, documented information, clause 7.5](https://www.iso.org/standard/62085.html) (clause unverified): maintain against retain | by hand — what binds is read, not parsed |
| SER-002 | Complied with, or carried out | — | by hand |
| SER-003 | The threshold says what a change takes | [ISO 9001:2015, review and approval, clause 7.5.2 c; control of changes, clause 7.5.3.2 c](https://www.iso.org/standard/62085.html) (clauses unverified); the five thresholds are ours | by hand — what a signature is is read, not parsed |
| SER-004 | Folder and kind agree | [ISO 15489-1:2016, classification](https://www.iso.org/standard/62542.html), clause 9.4 (clause unverified) | `machine/guards/rules/std-004-the-header.mjs` (`HDR-017`) |
| SER-007 | Exemptions say why | — | `machine/guards/rules/std-004-the-header.mjs` (`HDR-001`) |
| SER-005 | A document changes series under a new name | [Dublin Core, Is Replaced By](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/isReplacedBy/); no move without updating its readers is ours | `machine/guards/rules/std-020-git-is-the-archive.mjs` |
| SER-006 | Absorption carries the reasoning | [Dublin Core, Replaces](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/replaces/) · [RFC 9110, 301 Moved Permanently, section 15.4.2](https://www.rfc-editor.org/rfc/rfc9110#section-15.4.2) | `machine/guards/rules/std-020-git-is-the-archive.mjs` (`absorbs:`) · `machine/scripts/check-url-lifecycle.mjs` |

The five thresholds, and what a change to each takes:

| Threshold | What a change takes |
|---|---|
| `sealed` | the Oracle's signature and a decision record giving the reason |
| `governed` | a decision record, or a pull request the Oracle approves |
| `closed` | substance is not reopened; form may be corrected and the commit says so |
| `live` | corrected when it contradicts the canon or a signed decision; the correction is recorded inside the document, naming who and against which decision |
| `open` | a pull request |

| In the reading | Exact form |
|---|---|
| the canon, the standards, the protocols | `canon/`, `standards/`, `protocols/` |
| the declared kind | `type:` |
| which document replaced it | `superseded_by:` on the old (Dublin Core `isReplacedBy`) |
| what it replaces | `absorbs:` on the heir (Dublin Core `replaces`) |
| left out of registration, and why | `registration: exempt` with `registration_reason:`; the reason is apparatus of a registered document, or a rename whose readers cannot all be updated |

## Why

The archive is read by agents that must know, without asking, whether a
sentence binds them: the first rule makes that a question of where it sits.
Thresholds exist because no file in a repository is immutable; what tells
the canon from a memory is what a change takes. A document moved by rename
leaves every citation pointing at nothing; moving under a new name, or
being absorbed, makes the move a recorded event.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-001` | The series | which series exist |
| `STD-017` | Who may change what | who signs a change |
| `STD-018` | One document, one identifier | the name itself |
| `CAN-004` | You are what you are doing | the archive is the system's memory |
| `ADR-041` | Git is the archive | deletion when nothing living cites |

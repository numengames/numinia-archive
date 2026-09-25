---
id: "STD-024"
uid: ""
title: "A series is a function"
type: documentation
subtype: standard
status: draft
version: "1.0.3"
created: "2026-09-09T12:30:00+02:00"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
license: "CC0-1.0"
tags: [standards, series, thresholds, registration]
threshold: governed
related: ["STD-001", "STD-017", "STD-018", "STD-020", "CAN-004"]
series_change: "1.0.3 — 2026-09-25: written in plain words a narrator can read aloud; field names, the five thresholds by name and the outside standards behind moving and absorbing a document wait in the Check tables; References becomes a table. No obligation added or dropped."
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
> moves between series.
> **Pragmatic:** Decide whether a folder is a series, whether a text binds,
> and what a change to it requires — without asking.
> **Audience:** Agents · Oracles

**Binds:** every folder of the archive and every document in one.
**Does not bind:** which series exist, who signs a change, or the name
itself.

## Rules

### What binds

**Only three series oblige.** The canon says why, the standards say what,
the protocols say how. Every other series records, and cannot put a reader
in breach: an obligation written elsewhere is a plan until a standard
carries it.

**Complied with, or carried out.** A standard is complied with by a thing
made; a protocol is carried out by someone acting. The line is drawn by how
it works, not by the topic.

**The threshold says what a change takes.** Each series has one of five
thresholds, from the Oracle's signature with a written reason, down to an
ordinary change; a change MUST meet its series' threshold.

### Where a document lives

**Folder and kind agree.** The folder is where a document is filed; its
header declares what kind it is. When they contradict, the file moves; the
declared kind is not rewritten to fit.

**Exemptions say why.** A document left out of registration MUST say so and
give the reason, both or neither. The reason names what makes registering
it wrong. Counts leave it out rather than mark it missing.

### How a document moves

**A document changes series under a new name.** The old name points to the
new, the new is registered where it lands, and neither is renumbered. If a
reader of the old cannot be updated in the same change, the move does not
happen.

**Absorption carries the reasoning.** A record MAY leave its folder by being
carried into another document: the reasoning survives there, every citation
is rewritten and every public address redirects in the same change, and the
heir lists what it absorbed.

## Check

Every rule above, with its plate, the outside standard it follows, and what
verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| SER-001 | Only three series oblige | — | by hand — what binds is read, not parsed |
| SER-002 | Complied with, or carried out | — | by hand |
| SER-003 | The threshold says what a change takes | — | by hand — what a signature is is read, not parsed |
| SER-004 | Folder and kind agree | [ISO 15489-1, classification](https://www.iso.org/standard/62542.html) | `machine/guards/rules/std-004-the-header.mjs` (`HDR-017`) |
| SER-007 | Exemptions say why | — | `machine/guards/rules/std-004-the-header.mjs` (`HDR-001`) |
| SER-005 | A document changes series under a new name | [Dublin Core, Is Replaced By](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/isReplacedBy/) | `machine/guards/rules/std-020-git-is-the-archive.mjs` |
| SER-006 | Absorption carries the reasoning | [W3C, Cool URIs don't change](https://www.w3.org/Provider/Style/URI) | `machine/guards/rules/std-020-git-is-the-archive.mjs` (`absorbs:`) · `machine/scripts/check-url-lifecycle.mjs` |

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
| the old name points to the new | `superseded_by:` on the old |
| the heir lists what it absorbed | `absorbs:` |
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

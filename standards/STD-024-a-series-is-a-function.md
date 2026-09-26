---
id: "STD-024"
uid: ""
title: "A series is a function"
type: documentation
subtype: standard
status: draft
version: "3.0.0"
created: "2026-09-09T12:30:00+02:00"
updated: "2026-09-26T21:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
license: "CC0-1.0"
tags: [standards, series, thresholds, registration, records-management]
threshold: governed
related: ["STD-001", "STD-017", "STD-018", "STD-020", "CAN-004"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A series is a function

> **Summary:** A folder is a series when losing it would break a named
> function. Three series oblige; the rest record. A standard is met or not
> met, and anyone can answer which with a yes or a no. A document's folder
> matches its declared kind, and an exemption gives its reason.
> **Epistemic:** Which series is a document in, and does it bind?
> **Pragmatic:** Decide, without asking, whether a folder is a series,
> whether a text binds, and where a document lives.
> **Audience:** Agents · Oracles

**Binds:** every folder of the archive and every document in one.

## Rules

### What binds

**Only three series oblige.** The international quality standard separates
documents you maintain, which say what must be done, from records you keep,
which say what was done. Here the canon, the standards and the protocols
oblige. Every other series MUST be read as a record, and a record cannot put
a reader in breach.

**Complied with, or carried out.** A thing made complies with a standard.
Someone acting carries out a protocol. The line MUST be drawn by how the
text works, not by its topic.

**A standard answers yes or no.** The international rules for drafting
standards ask that every requirement be one that can be verified. Here each
rule of a standard MUST let anyone, holding the thing made, answer with a
yes or a no whether it is met. A text that no one can meet or break — a
list of values, a vocabulary, a catalogue — is not a standard, and its
place is not `standards/`.

### Where a document lives

**Folder and kind agree.** The international standard for records
management files each record in one place of a classification scheme, and
the rules of that place govern it. Here the folder is that place. When the
folder and the declared kind disagree, the file MUST move, not the kind.

**Exemptions say why.** A document left out of registration MUST say so and
give the reason: both, or neither. Counts skip it rather than mark it
missing.

The standard that the corpus does not grow says how a document moves to
another series or is absorbed.

## Check

Each rule, its code, its source and its check. The sources let an auditor
who knows these standards check us without a glossary.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| SER-001 | Only three series oblige | [ISO 9001:2015, documented information, clause 7.5](https://www.iso.org/standard/62085.html) (clause unverified): maintain against retain | by hand — what binds is read, not parsed |
| SER-002 | Complied with, or carried out | — | by hand |
| SER-008 | A standard answers yes or no | [ISO/IEC Directives, Part 2, Annex A.4, the principle of verifiability](https://www.iso.org/sites/directives/current/part2/index.xhtml) (clause unverified) | by hand — whether a rule can be answered yes or no is read, not parsed; five texts in `standards/` fail it today (`STD-001`, `STD-015`, `STD-023`, `STD-026`, `STD-030`) and wait for their move |
| SER-004 | Folder and kind agree | [ISO 15489-1:2016, classification](https://www.iso.org/standard/62542.html), clause 9.4 (clause unverified) | `machine/guards/rules/std-004-the-header.mjs` (`HDR-017`) |
| SER-007 | Exemptions say why | — | `machine/guards/rules/std-004-the-header.mjs` (`HDR-001`) |

| In the reading | Exact form |
|---|---|
| the canon, the standards, the protocols | `canon/`, `standards/`, `protocols/` |
| the declared kind | `type:` |
| left out of registration, and why | `registration: exempt` with `registration_reason:`; the reason is apparatus of a registered document, or a rename whose readers cannot all be updated |

## Why

Agents read the archive and must know, without asking, whether a sentence
binds them. The first rule makes that a question of where the sentence
sits. The folder rule keeps that answer honest.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-001` | The series | which series exist |
| `STD-017` | Who may change what | who signs a change, and the threshold of each series |
| `STD-012` | The corpus does not grow | how a document moves or leaves |
| `CAN-004` | You are what you are doing | the archive is the system's memory |

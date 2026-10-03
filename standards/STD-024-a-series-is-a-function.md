---
id: "STD-024"
uid: ""
title: "A series is a function"
type: standard
subtype: standard
status: active
version: "3.2.0"
created: "2026-09-09T12:30:00+02:00"
updated: "2026-10-03T21:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Knowledge and quality"
license: "CC0-1.0"
tags: [standards, series, approval-levels, registration, records-management]
related: ["STD-001", "STD-017", "STD-018", "STD-020", "CAN-004"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A series is a function

> **Summary:** A folder is a series when losing it would break a named
> function. Three series oblige; the rest record. Every requirement of a
> standard is answered with a yes or a no. A document's folder matches its
> declared kind, and an exemption gives its reason.
> **Epistemic:** Which series is a document in, and does it bind?
> **Pragmatic:** Decide, without asking, whether a folder is a series,
> whether a text binds, and where a document lives.
> **Audience:** Agents · Oracles

**Binds:** every folder of the archive and every document in one.

## Rules

### What binds

**Only three series oblige.** The international quality standard separates
documents you maintain, which say what must be done, from records you keep,
which say what was done. Here the canon, the standards and the procedures
oblige. Every other series MUST be read as a record, and a record cannot put
a reader in breach.

**Complied with, or carried out.** A thing made complies with a standard.
Someone acting carries out a procedure. The line MUST be drawn by how the
text works, not by its topic.

**A requirement answers yes or no.** The international definition of a
standard is a document, approved by whoever holds the authority, that gives
rules, guidelines or characteristics for common and repeated use. The
international rules for drafting one call a requirement a criterion that can
be verified objectively. Here every MUST in a standard MUST let anyone,
holding the thing made, answer with a yes or a no whether it is met. A
standard that only fixes characteristics or terms — a list of values, a
vocabulary, a catalogue — is a register: it is still a standard and lives
in `standards/`, and the norm that cites it holds the requirement.

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

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| SER-001 | Only three series oblige | [ISO 9001:2015, documented information, clause 7.5](https://www.iso.org/standard/62085.html) (clause unverified): maintain against retain | by hand — what binds is read, not parsed |
| SER-002 | Complied with, or carried out | — | by hand |
| SER-008 | A requirement answers yes or no | [ISO/IEC Guide 2:2004, standard](https://www.iso.org/standard/39976.html) (clause unverified): rules, guidelines or characteristics for common and repeated use · [ISO/IEC Directives, Part 2](https://www.iso.org/sites/directives/current/part2/index.xhtml) (clause unverified): a requirement is objectively verifiable | by hand — whether a MUST can be answered yes or no is read, not parsed |
| SER-004 | Folder and kind agree | [ISO 15489-1:2016, classification](https://www.iso.org/standard/62542.html), clause 9.4 (clause unverified) | `machine/guards/rules/std-004-the-header.mjs` (`HDR-017`) |
| SER-007 | Exemptions say why | — | `machine/guards/rules/std-004-the-header.mjs` (`HDR-001`) |

| In the reading | Exact form |
|---|---|
| the canon, the standards, the procedures | `canon/`, `standards/`, `procedures/` |
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
| `STD-017` | Who may change what | who signs a change, and the approval level of each series |
| `STD-012` | The corpus does not grow | how a document moves or leaves |
| `CAN-004` | You are what you are doing | the archive is the system's memory |

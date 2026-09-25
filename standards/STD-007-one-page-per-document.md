---
id: "STD-007"
uid: ""
title: "One page per document"
type: documentation
subtype: standard
status: draft
version: "1.2.0"
created: "2026-09-03T10:30:00Z"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Content"
license: "CC0-1.0"
tags: [standards, writing, form, plates, budget]
ratified_by: "ADR-043"
supersedes_version: "0.3.0"
series_change: "1.2.0 — 2026-09-25: a rule's plate may wait in the first column of the Check table instead of its title, and identifiers may appear there as well as in References, so the reading can be heard aloud; the guard reads both places."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# One page per document

> **Summary:** A title that states the rule, a three-part card, a one-line
> scope. Rules first, each with its code; then the check, then the reason.
> The body fits its shelf's budget. Size limits are SHOULD; form is MUST.
> **Epistemic:** Why the older standards went unread — apparatus before
> content, reasons before rules, pointers instead of text — and the shape
> that reverses each of the three.
> **Pragmatic:** The mould to copy, the budgets to aim at, and what the
> shape check reports on every change.
> **Audience:** Agents · Oracles

**Binds:** every document on every shelf of the archive.
**Does not bind:** moulds, generated files, and the files that introduce or
list a folder.

## Rules

### The top of the page

**The title states the rule.** A title SHOULD be at most five words, naming
what is required rather than the topic: one document, one identifier, not
naming.

**The card is three short paragraphs.** A document MUST open with a summary
of what is required, what the reader will understand, and what the reader
can then do; each SHOULD be at most 40 words.

**Scope is one line each way.** A standard or protocol MUST say whom it binds
and what it does not bind, each in at most 15 words, naming shelves or kinds
of work, never the whole archive.

### The rules and their reasons

**Rules come first, and each has its code.** Every rule MUST carry a code of
three letters and three digits, unique and never reused, either in its title
or in the first column of the check table; one obligation word each.

**The reason is short.** The section giving the reason SHOULD hold at most
80 words. Longer reasoning belongs in a decision record.

**The body fits its budget.** From the scope line to the references, a
document SHOULD fit its shelf's budget: 500 words for standards, protocols,
decisions and missions; 300 for debt and guilds; 1,000 for reports and
blueprints; 1,500 for canon. Over it, one sentence in the document says why.

### Pointing at other documents

**Few, necessary references.** The references MUST list only documents this
one depends on to oblige, and SHOULD be at most five.

**Cite rules, not places.** Another document's rule is cited by its code and
its plain name, never by section number. Document identifiers MUST appear
only in the check table and the references; the reading names things in
words.

### What sits apart

**Registers are tables.** A register is exempt from the card and the budget;
it MUST hold a summary, a table, and at most one sentence of prose.

**No history inside.** A document MUST NOT carry a changelog, an amendment
section or a note of what changed. The history of the archive is the
history of the document.

**Written in English.** New and rewritten documents are written in English.
One that departs from the default declares its language; a Spanish document
is not invalid, it is mid-migration.

This standard is over its word budget because the check table at its foot
names a check for each of its eleven rules.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| DOC-001 | The title states the rule | — | `machine/guards/rules/std-007-one-page.mjs` — a SHOULD: counted, reported, never handed to the regime |
| DOC-002 | The card is three short paragraphs | — | `machine/guards/rules/std-007-one-page.mjs` — a missing part binds by this standard's state (`ENG-067`); length is a SHOULD |
| DOC-003 | Scope is one line each way | — | `machine/guards/rules/std-007-one-page.mjs`; `machine/guards/test/std-007-one-page.test.mjs` |
| DOC-004 | Rules come first, and each has its code | [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) | `machine/guards/rules/std-007-one-page.mjs` — a plate in a rule title or the Check table's first column (`platesIn`) |
| DOC-005 | The reason is short | — | `machine/guards/rules/std-007-one-page.mjs` — a SHOULD |
| DOC-006 | The body fits its budget | — | `machine/guards/rules/std-007-one-page.mjs` — a SHOULD |
| DOC-007 | Few, necessary references | — | `machine/guards/rules/std-007-one-page.mjs` — a SHOULD |
| DOC-008 | Cite rules, not places | — | `machine/guards/rules/std-007-one-page.mjs` — bare IDs outside References and Check rows, section pointers anywhere, in `standards/` only |
| DOC-009 | Registers are tables | — | `machine/scripts/check-templates.mjs` |
| DOC-010 | No history inside | — | `machine/scripts/check-templates.mjs` |
| DOC-011 | Written in English | — | by hand, at the pull request |

## Why

Size is SHOULD and form is MUST: a document over budget with a written
reason is still valid; one without codes, or with reasons first, is not.
An adult reads about 240 words a minute and skims most of a page; a
narrator reads 150. Five hundred words is three minutes aloud, one printed
page — small enough that an agent loads a whole shelf instead of searching
it. Codes wait at the foot, where no narrator stumbles on them.

## References

| ID | Name | Why cited |
|---|---|---|
| `ADR-043` | One page per document | the decision; the budget per series until a Series register exists |
| `STD-004` | The header standard | the card and the fields above the body |

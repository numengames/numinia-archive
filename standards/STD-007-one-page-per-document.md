---
id: "STD-007"
uid: ""
title: "One page per document"
type: documentation
subtype: standard
status: draft
version: "2.0.0"
created: "2026-09-03T10:30:00Z"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Content"
license: "CC0-1.0"
tags: [standards, writing, form, plates, budget, BCP-14, ISO-IEC-Directives, DITA]
ratified_by: "ADR-043"
supersedes_version: "0.3.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# One page per document

> **Summary:** One question per document, a title that states the rule, a
> three-part card, a one-line scope. Rules come first, each coded, then the
> check and the reason. The body fits its shelf's budget. Size limits are
> SHOULD; form is MUST.
> **Epistemic:** What shape a document takes, and why the older standards
> that put reasons first and pointed elsewhere went unread.
> **Pragmatic:** The mould to copy, the budgets to aim at, and what the
> shape check reports on every change.
> **Audience:** Agents · Oracles

**Binds:** every document on every shelf of the archive.

## Rules

### The top of the page

**The title states the rule.** A title SHOULD be at most five words and
name what is required, not the topic: one document, one identifier, not
naming.

**The card is three short paragraphs.** A document MUST open with what is
required, what the reader will understand, and what the reader can then do.
Each SHOULD be at most 40 words.

**One document, one question.** A document SHOULD answer one question, and
its epistemic line SHOULD state it. Two documents that answer the same
question are merged; one that answers two is split. The topic-based writing
standards ask the same of every topic. A reader, person or agent, opens one
file, finds the whole answer, and no other file contradicts it.

**Scope is one line.** A standard or protocol MUST say whom it binds, up
front, in at most 15 words, as the international drafting rules ask of a
scope clause. A reader then knows in one line whether to read on.

### The rules and their reasons

**Rules come first, and each has its code.** Every rule MUST be one
obligation, with one capitalised obligation word and a code of three
letters and three digits. The code is unique, never reused, and sits in the
rule's title or the check table. Requirements engineering asks exactly
this, so each rule can be cited, tested and traced alone. A retired code
moves from the check table to the ledger of retired codes, which says where
its obligation went.

**Obligation words mean one thing.** MUST, SHOULD and MAY, and their
negatives, MUST carry the meaning the internet's standards body gave them,
and only in capitals. A must is required. A should may be broken only with
a reason. A may is a free choice.

**The reason is short.** The section giving the reason SHOULD hold at most
80 words. Longer reasoning belongs in a decision record.

**The body fits its budget.** From the scope line to the references, a
document SHOULD fit its shelf's budget: 500 words for standards, protocols,
decisions and missions; 300 for debt and guilds; 1,000 for reports and
blueprints; 1,500 for canon. A document over budget says why in one
sentence.

### Pointing at other documents

**Few, necessary references.** The references MUST list only documents this
one depends on to oblige, and SHOULD be at most five.

**Cite rules, not places.** A document or rule MUST be cited by its name or
its code, never by a section number, which moves whenever the cited
document is rewritten. Identifiers appear only in the check table and the
references; the reading names things in words.

### What sits apart

**Registers are tables.** A register is exempt from the card and the budget.
It MUST hold a summary, a table, and at most one sentence of prose.

**No history inside.** A document MUST NOT carry a changelog, an amendment
section or a note of what changed. The archive's history is the document's
history.

**Written in English.** New and rewritten documents SHOULD be written in
English. A document in another language declares it with the internet's
standard language tag, so readers and programs both know. A Spanish
document is not invalid; it is mid-migration.

This standard is over its word budget because its check table names a check
for each of its thirteen rules.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| DOC-001 | The title states the rule | — | `machine/guards/rules/std-007-one-page.mjs` — a SHOULD: counted, reported, never handed to the regime |
| DOC-002 | The card is three short paragraphs | — | `machine/guards/rules/std-007-one-page.mjs` — a missing part binds by this standard's state (`ENG-067`); length is a SHOULD |
| DOC-012 | One document, one question | [DITA 1.3, the topic as the basic unit of information](https://docs.oasis-open.org/dita/dita/v1.3/os/part2-tech-content/archSpec/base/topicdefined.html): short enough to answer a single question — ours adds: the question is the epistemic line; merge or split | by hand, at the pull request; the map in `BLU-016` records each standard's question |
| DOC-003 | Scope is one line | [ISO/IEC Directives, Part 2 (2021), clause 14, Scope](https://www.iso.org/sites/directives/current/part2/index.xhtml) — ours adds: 15 words | `machine/guards/rules/std-007-one-page.mjs`; `machine/guards/test/std-007-one-page.test.mjs` |
| DOC-004 | Rules come first, and each has its code | [BCP 14](https://www.rfc-editor.org/info/bcp14) (RFC 2119 + RFC 8174); [ISO/IEC/IEEE 29148:2018](https://www.iso.org/standard/72089.html), clause 5.2.5, singular and unambiguous, uniquely identified — ours adds: the plate `AAA-NNN` | `machine/guards/rules/std-007-one-page.mjs` — a plate in a rule title or the Check table's first column (`platesIn`) |
| DOC-013 | Obligation words mean one thing | [BCP 14](https://www.rfc-editor.org/info/bcp14) = [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) + [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174) (capitals only); holds retired HDR-046 | by hand, at review |
| DOC-005 | The reason is short | — | `machine/guards/rules/std-007-one-page.mjs` — a SHOULD |
| DOC-006 | The body fits its budget | — | `machine/guards/rules/std-007-one-page.mjs` — a SHOULD |
| DOC-007 | Few, necessary references | — | `machine/guards/rules/std-007-one-page.mjs` — a SHOULD |
| DOC-008 | Cite rules, not places | — (stricter than [ISO 690:2021](https://www.iso.org/standard/72642.html), which allows location references); holds the rule `STD-021` CIT-050 enforced | `machine/guards/rules/std-007-one-page.mjs` — bare IDs outside References and Check rows, section pointers, in `standards/`; `machine/guards/rules/std-021-evidence-and-citation.mjs` under CIT-050 — cited sections must exist elsewhere |
| DOC-009 | Registers are tables | — | `machine/scripts/check-templates.mjs` |
| DOC-010 | No history inside | — | `machine/scripts/check-templates.mjs` |
| DOC-011 | Written in English | [BCP 47](https://www.rfc-editor.org/info/bcp47) language tags | by hand, at the pull request |

## Why

Size is SHOULD and form is MUST. A document over budget with a written
reason is still valid; one without codes, or with reasons first, is not.
An adult reads about 240 words a minute and skims most of a page; a
narrator reads 150. Five hundred words is three minutes aloud and one
printed page, small enough for an agent to load a whole shelf, not search
it. Codes wait at the foot, where no narrator stumbles on them.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-004` | The header | the card and the fields above the body |
| `STD-021` | Evidence and citation | its section-citation plate now reads this rule |

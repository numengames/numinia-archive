---
id: "STD-021"
uid: ""
title: "Evidence and citation"
type: documentation
subtype: standard
status: draft
version: "1.3.2"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, evidence, citation, audits, ISO-690, ISO-19011]
threshold: governed
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Evidence and citation

> **Summary:** A claim about the code names the file that proves it. An
> audit says how many things it examined, out of how many. References
> gather at the foot. A broken link in a closed document stays. A quotation
> carries its author's name.
> **Epistemic:** What makes a claim in this archive checkable.
> **Pragmatic:** Cite and audit so that a reader can verify without asking.
> **Audience:** Agents · Oracles

**Binds:** every document that cites, claims something about the code, or
quotes a person.

## Rules

The one-page standard already says that a citation names a rule, never a
section number.

### How a document cites another

**Structural references are gathered.** The documents a text depends on
MUST be listed together at its end, as the international standard for
references asks. A reader then sees at a glance everything the text leans
on.

**Bare is a citation; enclosed is data.** A document's name written in the
running text cites it, and MUST lead somewhere. Inside code, a table, a list
or a quoted block, the name is data and nothing checks it.

### What counts as evidence

**Name the file.** A claim about the code MUST name the file that proves
it, and that file exists.

**Say how many out of how many.** An audit MUST say how many things it
examined out of how many exist. The international guide to auditing asks
this of every sample, so anyone can recompute the finding or widen the
sample.

**A closed record is a photograph.** A broken link inside a closed document
MAY stand. It is not a defect.

### Whose words they are

**A quote carries its author.** Words a person said or wrote, quoted in a
document, a page or any piece, MUST carry that person's name as they sign
it: *Pablo FM*, not a role and not "the Oracle". The international standard
for citation asks for the author's name too.

**No borrowed voice.** An agent writing with someone MUST NOT pass their
phrase off as its own or as the house's. A translated quote says it is
translated.

## Check

Each rule, its code, its source and its check. The last row holds two
rules under one plate.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| CIT-050 | the section-citation check, part of `STD-007` DOC-008 (cite rules, not places) | — (stricter than [ISO 690:2021](https://www.iso.org/standard/72642.html), which allows location references) | `machine/guards/rules/std-021-evidence-and-citation.mjs` — a standard cites no section by number; elsewhere a cited section must exist |
| CIT-051 | Structural references are gathered | [ISO 690:2021](https://www.iso.org/standard/72642.html), the reference list — ours adds: only what the text depends on | by hand |
| CIT-054 | Bare is a citation; enclosed is data | — | `machine/guards/rules/std-012-corpus-does-not-grow.mjs` — what it resolves and what it skips |
| CIT-052 | Name the file | — | by hand — the proof is prose |
| EVI-057 | Say how many out of how many | [ISO 19011:2018](https://www.iso.org/standard/70017.html), annex A.6, audit sampling | by hand — the denominator is prose |
| CIT-053 | A closed record is a photograph | — | `machine/guards/rules/std-012-corpus-does-not-grow.mjs` exempts closed documents |
| CIT-055 | A quote carries its author · No borrowed voice | [ISO 690:2021](https://www.iso.org/standard/72642.html), quotations — ours adds: the name as the person signs it; naming the author of a quotation is also required by law ([Berne Convention, art. 10(3)](https://www.wipo.int/wipolex/en/text/283698)) | by hand — no tool can tell whose sentence a sentence was |

## Why

A file that exists can be opened. A count turns "we checked" into a number
someone else can recompute. A closed document is evidence of what was true
when it closed. A phrase worth quoting was someone's first, and their name
lets it be found, answered and collected.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-007` | One page per document | where citations sit, how many, and that they name rules, not sections |

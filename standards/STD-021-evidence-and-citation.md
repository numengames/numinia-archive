---
id: "STD-021"
uid: ""
title: "Evidence and citation"
type: documentation
subtype: standard
status: draft
version: "1.2.1"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, evidence, citation, audits]
threshold: governed
series_change: "1.2.1 — 2026-09-25: written in plain words a narrator can read aloud; plates, paths and the outside citation standard wait in the Check table. No obligation added or dropped."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Evidence and citation

> **Summary:** A citation names a document or a rule, never a section
> number. A claim about the code names the file that proves it. An audit
> says how many things it looked at out of how many. A broken link in a
> closed document is a photograph. A person's words carry their name.
> **Epistemic:** What makes a claim in this archive checkable.
> **Pragmatic:** Cite, and write audits, so that a reader can verify without
> asking.
> **Audience:** Agents · Oracles

**Binds:** every document that cites another or makes a claim about the
code; every piece that quotes a person.
**Does not bind:** how a reference table is laid out.

## Rules

### How a document cites another

**Cite the document, not the place.** A citation names the document or the
rule, never one of its section numbers.

**Structural references are gathered.** They live in one list at the end of
the document.

**Bare is a citation; enclosed is data.** A document's name written in the
running text cites it, and MUST lead somewhere. Inside code, a table, a list
or a quoted block it is data and is not checked.

### What counts as evidence

**Name the file.** A claim about the code names the file that proves it, and
that file exists.

**Say how many out of how many.** An audit says how many things it examined
out of how many exist.

**A closed record is a photograph.** A broken link inside a closed document
is not a defect.

### Whose words they are

**A quote carries its author.** Words a person said or wrote, quoted in a
document, a page or any piece, MUST carry that person's name as they sign
it — *Pablo FM*, not a role or "the Oracle".

**No borrowed voice.** An agent writing with someone MUST NOT pass their
phrase off as its own or as the house's; a translated quote says it is
translated.

## Check

Every rule above, with its plate, the outside standard it follows, and what
verifies it today. The last rule is the second half of one plate.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| CIT-050 | Cite the document, not the place | [ISO 690, references and citations](https://www.iso.org/standard/72642.html) | `machine/guards/rules/std-021-evidence-and-citation.mjs` — a standard cites no section by number; elsewhere a cited section must exist |
| CIT-051 | Structural references are gathered | [ISO 690](https://www.iso.org/standard/72642.html) | by hand |
| CIT-054 | Bare is a citation; enclosed is data | — | `machine/guards/rules/std-020-git-is-the-archive.mjs` — what it resolves and what it skips |
| CIT-052 | Name the file | — | by hand — the proof is prose |
| EVI-057 | Say how many out of how many | — | by hand — the denominator is prose |
| CIT-053 | A closed record is a photograph | — | `machine/guards/rules/std-020-git-is-the-archive.mjs` exempts closed documents |
| CIT-055 | A quote carries its author · No borrowed voice | [ISO 690, quotations](https://www.iso.org/standard/72642.html) | by hand — no tool can tell whose sentence a sentence was |

## Why

A section number names a place, and places move when a document is
rewritten; a rule's plate survives the rewrite. A file that exists can be
opened; a count turns "we checked" into a number someone else can
recompute. A closed document is evidence of what was true when it closed.
A phrase worth quoting was someone's first; the name lets it be found,
answered and collected.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-007` | One page per document | where citations sit, how many, and how the table is laid out |

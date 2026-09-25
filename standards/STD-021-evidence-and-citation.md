---
id: "STD-021"
uid: ""
title: "Evidence and citation"
type: documentation
subtype: standard
status: draft
version: "1.2.0"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-24T23:30:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
license: "CC0-1.0"
tags: [standards, evidence, citation, audits]
threshold: governed
series_change: "1.2.0 — 2026-09-24: CIT-055, a quote carries its author — a person's words keep their name, as the person signs, wherever an agent writes them down. Minor: a new obligation. At the Oracle's word in session. 1.1.2 — 2026-09-11: Check row repoints to machine/guards/rules/std-021-evidence-and-citation.mjs (R3 fold of check-core-rules and check-section-citations). Patch: prose only. 1.0.0 — new standard, split from STD-009 under ADR-043. Rules keep their plates and their verifiers; the prose around them is the Why. Old §9 Citation and EVI-057 are one standard."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Evidence and citation

> **Summary:** A citation names a document or a plate, never a section
> number. A claim about the codebase names the file that proves it. An audit
> states its denominator. A broken link in a closed document is a photograph.
> A person's words carry that person's name.
> **Epistemic:** What makes a claim in this corpus checkable.
> **Pragmatic:** Cite, and write audits, so that a reader can verify without
> asking.
> **Audience:** Agents · Oracles

**Binds:** every registered document that cites another or makes a claim
about the tree; every piece that quotes a person.
**Does not bind:** how a reference table is laid out — `STD-007`.

## Rules

**CIT-050 — Cite the document, not the place.** A citation names the
document or the plate, never one of its section numbers.

**CIT-051 — Structural references are gathered.** They live in one list at
the end of the document.

**CIT-052 — Name the file.** A claim about the codebase names the file that
proves it, and that file exists.

**EVI-057 — State the denominator.** An audit declares how many things it
examined out of how many exist.

**CIT-053 — A closed record is a photograph.** A broken link inside a closed
document is not a defect.

**CIT-054 — Bare is a citation; enclosed is data.** An identifier in prose
cites, and must resolve. Inside a code span, a table cell, a list item or a
fenced block it is data and is not checked — a report about broken citations
can name them without an ignore list.

**CIT-055 — A quote carries its author.** Words a person said or wrote,
quoted in a document, a page or any piece, must carry that person's name as
they sign it — *Pablo FM*, not a role or "the Oracle". An agent writing
with someone must not pass their phrase off as its own or as the house's; a
translated quote says it is translated.

## Check

| Plate | Verified by |
|---|---|
| CIT-050 | `machine/guards/rules/std-021-evidence-and-citation.mjs` — a standard cites no section by number; elsewhere a cited section must exist |
| CIT-053 | `machine/guards/rules/std-020-git-is-the-archive.mjs` exempts closed documents |
| CIT-054 | `machine/guards/rules/std-020-git-is-the-archive.mjs` (what it skips) |
| CIT-051, CIT-052, EVI-057 | `[MANUAL]` — the layout, the proof and the denominator are prose |
| CIT-055 | `[MANUAL]` — no tool can tell whose sentence a sentence was |

## Why

A section number names a place, and places move when a document is
rewritten; a plate names a rule and survives the rewrite. A file that
exists can be opened; a denominator turns "we checked" into a number someone
else can recompute. A closed document is evidence of what was true when it
closed, and repairing its links would falsify the photograph. A phrase that is worth quoting was
someone's first; the name is what lets it be found, answered and
collected, and an agent that drops it takes what it was lent.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-007` | One page per document | where citations sit and how many |

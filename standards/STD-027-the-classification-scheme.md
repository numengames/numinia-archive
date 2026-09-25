---
id: "STD-027"
uid: ""
title: "The archive is classified by function"
type: documentation
subtype: standard
status: draft
version: "0.1.1"
created: "2026-09-20T12:00:00+02:00"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, classification, archive, functions, series]
license: "CC0-1.0"
ratified_by: "ADR-046"
threshold: governed
related: ["STD-001", "STD-024", "STD-012", "ADR-030", "SYS-003"]
series_change: "0.1.1 — 2026-09-25: from register to the shape of a standard, since it carries four plated rules: written in plain words a narrator can read aloud, the scheme told in words, and its exact table with the archival standards it rests on moved to Check. No obligation added or dropped."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# The archive is classified by function

> **Summary:** One producer, six functions, the activities under each, and
> the series every activity produces. A function classifies; a series files.
> What checks or displays the archive is an instrument, never a record.
> **Epistemic:** Which activity produced a document, and why that is a
> different question from what a change to it costs.
> **Pragmatic:** Decide where a new folder belongs, and whether it is a series
> at all, without asking.
> **Audience:** Agents · Oracles

**Binds:** every folder of the repository.
**Does not bind:** which series exist, what a series obliges, or how long
records are kept.

## Rules

### The scheme

Everything in the archive was made by one producer, Numen Games, and is
arranged by what it does, not by who made it: there are no stable teams to
mirror, and no function is named after one. Functions are nouns; activities
are verbs.

Governance founds, standardises, prescribes and decides. Production plans
and carries out. Assurance observes, admits debt, verifies and measures.
Agency constitutes the agents. Creation builds the world and catalogues its
objects. Administration sustains the business, wires the systems and keeps
the templates. The website is a lens onto the archive, not part of it.

### How the scheme is used

**A function classifies; a series files.** A document MUST be filed in
exactly one series, and its name MUST name the series, never the function.
Functions can be regrouped without moving a file or breaking a citation.

**Instruments are not records.** What checks, displays, measures or moulds
the archive MUST carry no document name, MUST NOT be appraised, and MUST NOT
be cited as evidence, even when the scheme classifies it.

**Classification and threshold answer different questions.** A folder's
function says which activity produced its records; its threshold says what
a change to them costs. Neither follows from the other, and a clash is not a
defect.

**A new folder declares its function first.** A new folder gets its row in
the scheme before its first commit. A folder with no row is unclassified,
and an unclassified folder is not a series, whatever it holds.

## Check

Every rule above, with its plate, the outside standard it follows, and what
verifies it today. Then the scheme as the site reads it, and what it rests
on.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| CLS-001 | A function classifies; a series files | [ISO 15489-1, classification](https://www.iso.org/standard/62542.html) | `machine/guards/rules/std-004-the-header.mjs` (`HDR-017`, folder against `type:`) |
| CLS-002 | Instruments are not records | [ISO 15489-1, what a record is](https://www.iso.org/standard/62542.html) | by hand — an instrument carrying an identifier is caught in review |
| CLS-003 | Classification and threshold answer different questions | — | by hand |
| CLS-004 | A new folder declares its function first | — | partly: the site build fails when a section it serves is not in the scheme (`web/src/pages/[section].astro`); a new unserved folder, by hand |

The scheme, one producer: **Numen Games S.L.** The site and the URL checker
read this table; its shape is their contract.

| Function | Activity | Series |
|---|---|---|
| **Governance** | Founding | `canon/` |
| | Standardising | `standards/` |
| | Prescribing | `protocols/` |
| | Deciding | `decisions/` |
| **Production** | Planning | `blueprints/` |
| | Executing | `missions/` |
| **Assurance** | Observing | `reports/` |
| | Admitting | `debt/` |
| | Verifying | `machine/guards/` · `machine/tools/` · `machine/scripts/` |
| | Measuring | `machine/telemetry/` |
| **Agency** | Constituting | `agents/` |
| **Creation** | Worldbuilding | `lore/` |
| | Cataloguing | `objects/` |
| **Administration** | Sustaining | `operations/` |
| | Wiring | `system/` |
| | Templating | `machine/templates/` |

Outside the scheme: `web/`, a lens onto the archive, and `machine/packages/`,
a distributable. Instruments live under `machine/`.

| What the scheme rests on | What it gives |
|---|---|
| Records in Contexts 1.0 (International Council on Archives, 2023) | description as a graph of records, agents, activities and rules; replaces the older description standards |
| Business classification scheme (National Archives of Australia) | function, activity, transaction; functions are nouns, activities verbs, never named after a unit |
| [ISO 15489](https://www.iso.org/standard/62542.html) · ISO 30300–30301 | classification tied to retention and access, not filing taste |
| Records continuum (Upward) | a record is not staged through a life cycle: state is a field, never a path |
| Macroappraisal (Cook) | what is kept is decided by analysing functions, not counting documents |
| Series system (Scott, 1966) | a series may relate to several producers over time |

Not used: the general archival description standard as a standalone
hierarchy; classification by subject; classification by organisational unit.

## Why

A folder answers where to look; a function answers why the record exists.
Tying the name to the folder and not the function lets the scheme be
redrawn without a single broken citation. Keeping instruments out of the
records keeps evidence from being confused with the tools that check it.
The scheme is borrowed from archival practice, not invented here.

## References

| ID | Title | Relation |
|---|---|---|
| `ADR-046` | The archive is classified by function | the decision that cut this document |
| `STD-001` | The series | which series exist, and the table this scheme groups |
| `STD-024` | A series is a function | what a series obliges, and its thresholds |
| `STD-012` | The corpus does not grow | how long records are kept |

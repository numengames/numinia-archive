---
id: "STD-027"
uid: ""
title: "The archive is classified by function"
type: documentation
subtype: standard
status: draft
version: "0.2.1"
created: "2026-09-20T12:00:00+02:00"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, classification, archive, functions, series, records-management]
license: "CC0-1.0"
ratified_by: "ADR-046"
threshold: governed
related: ["STD-001", "STD-024", "STD-012", "ADR-030", "SYS-003"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# The archive is classified by function

> **Summary:** One producer, six functions, the activities under each, and
> the series every activity produces. A function classifies; a series files.
> What checks or measures the archive is a short-lived record that proves
> what it measured and binds nobody.
> **Epistemic:** Which activity produced a document, and why that is a
> different question from what a change to it costs.
> **Pragmatic:** Decide where a new folder belongs, and whether it is a series
> at all, without asking.
> **Audience:** Agents · Oracles

**Binds:** every folder of the repository.

## Rules

### The scheme

Everything in the archive was made by one producer, Numen Games, and is
arranged by what it does, not by who made it: there are no stable teams to
mirror, and no function is named after one.

Governance founds, standardises, prescribes and decides. Production plans
and carries out. Assurance observes, admits debt, verifies and measures.
Agency constitutes the agents. Creation builds the world and catalogues its
objects. Administration sustains the business, wires the systems and keeps
the templates. The website is a lens onto the archive, not part of it.

### How the scheme is used

**A function classifies; a series files.** The international standard for
records management, and the Australian national archives' guidance on it,
classify by business function: functions are nouns, activities verbs, so
the scheme survives a reorganisation. A document MUST be filed in exactly
one series, and its name names the series, never the function.

**Instruments are short-lived records that never bind.** The records
standard counts as a record whatever is kept as evidence, so a measurement
or a check's output is one. An instrument carries no document name and is
kept only while current, the history holding the rest; it MAY be cited as
evidence of what it measured, never as a rule.

**Classification and threshold answer different questions.** A folder's
function says which activity produced its records; its threshold says what
a change to them costs. Neither follows from the other, and a clash MUST
NOT be treated as a defect.

**A new folder declares its function first.** The Australian guidance puts
every record under a function and an activity, so nothing is kept that no
activity explains. A new folder MUST get its row in the scheme before its
first commit; a folder with no row is not a series, whatever it holds.

## Check

Each rule, its code, its source and its check. Then the scheme as the site
reads it, and what it rests on. No law requires this scheme; it is our choice.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| CLS-001 | A function classifies; a series files | [ISO 15489-1:2016, classification](https://www.iso.org/standard/62542.html) (clause unverified) · [National Archives of Australia, developing a business classification scheme](https://www.naa.gov.au/information-management/describing-information/classifying-information/develop-business-or-records-classification-scheme); a name on the series, not the function, is ours | `machine/guards/rules/std-004-the-header.mjs` (`HDR-017`, folder against `type:`) |
| CLS-002 | Instruments are short-lived records that never bind | [ISO 15489-1:2016, what a record is](https://www.iso.org/standard/62542.html), clause 3 (clause unverified); retention while current and no binding force are ours. Reversed in 0.2.0: it said instruments are not records and never evidence, which contradicted the standard and citing a file as evidence (`STD-021` CIT-052) | by hand — an instrument carrying an identifier, or cited as a rule, is caught in review |
| CLS-003 | Classification and threshold answer different questions | — | by hand |
| CLS-004 | A new folder declares its function first | [National Archives of Australia, all records belong to a function and activity](https://www.naa.gov.au/information-management/describing-information/classifying-information/develop-business-or-records-classification-scheme); before the first commit is ours | partly: the site build fails when a section it serves is not in the scheme (`web/src/pages/[section].astro`); a new unserved folder, by hand |

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
| Business classification scheme (National Archives of Australia) | function, activity, transaction; functions are nouns, activities verbs, never named after a unit; every record under a function and an activity |
| [ISO 15489](https://www.iso.org/standard/62542.html) · ISO 30300–30301 | classification tied to retention and access, not filing taste; a record is whatever is kept as evidence |
| Records continuum (Upward) | a record is not staged through a life cycle: state is a field, never a path |
| Macroappraisal (Cook) | what is kept is decided by analysing functions, not counting documents |
| Series system (Scott, 1966) | a series may relate to several producers over time |

Not used: the general archival description standard as a standalone
hierarchy; classification by subject; classification by organisational unit.

## Why

A folder answers where to look; a function answers why the record exists.
Tying the name to the folder and not the function lets the scheme be
redrawn without a single broken citation. Instruments are evidence of what
they measured, and only that: a rule binds, a reading reports. The scheme
is borrowed from archival practice, not invented here.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-001` | The series | which series exist, and the table this scheme groups |
| `STD-024` | A series is a function | what a series obliges, and its thresholds |
| `STD-012` | The corpus does not grow | how long records are kept |

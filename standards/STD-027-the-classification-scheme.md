---
id: "STD-027"
uid: ""
title: "The archive is classified by function"
type: documentation
subtype: register
status: draft
version: "0.1.0"
created: "2026-09-20T12:00:00+02:00"
updated: "2026-09-20T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, classification, archive, functions, series]
license: "CC0-1.0"
ratified_by: "ADR-046"
threshold: governed
related: ["STD-001", "STD-024", "STD-012", "ADR-030", "SYS-003"]
series_change: "0.1.0 — new register cut under ADR-046: the classification scheme the corpus had been applying without writing down. STD-001 keeps the series table and gains its Function and Activity columns; this file holds the scheme itself and the two rules that govern it."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# The archive is classified by function

> **Summary:** One fond, six functions, the activities under each, and the
> series every activity produces. A function classifies; a series files. What
> verifies or renders the archive is an instrument, never a record.
> **Epistemic:** Which activity produced a document, and why that is a
> different question from what a change to it costs.
> **Pragmatic:** Decide where a new folder belongs, and whether it is a series
> at all, without asking.
> **Audience:** Agents · Oracles

**Binds:** every folder of the repository.
**Does not bind:** which series exist and what each holds — `STD-001`; what a
series obliges and what a change takes — `STD-024`; retention — `STD-012`.

## The fond

**Numen Games S.L.** One producer, one fond. Arrangement is **functional**:
series are grouped by the activity that produces them, not by the unit that
produced them. There are no stable organisational units here to mirror, and a
function is not named after one.

## The scheme

Functions are nouns; activities are verbs.

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

Outside the scheme: `web/` — a lens onto the fond, not a record of it — and
`machine/packages/`, a distributable.

## Rules

**CLS-001 — A function classifies; a series files.** A document MUST be filed
in exactly one series, and its identifier MUST name the series, never the
function. Functions are regrouped without moving a file or breaking a
citation.

**CLS-002 — Instruments are not records.** What verifies, renders, measures or
moulds the archive MUST carry no identifier, MUST NOT be appraised, and MUST
NOT be cited as evidence — even when classified under *Verifying*,
*Measuring* or *Templating*. Instruments live under `machine/`.

**CLS-003 — Classification and threshold answer different questions.**
A folder's function says which activity produced its records; its threshold
(`STD-024` SER-003) says what a change to them costs. Neither is derived from
the other, and a conflict between them is not a defect.

**CLS-004 — A new folder declares its function before its first commit.** A
folder without a row in this table is unclassified, and an unclassified folder
is not a series (`STD-024` SER-001) whatever it contains.

## Check

| Plate | Verified by |
|---|---|
| CLS-001 | `machine/guards/rules/std-004-the-header.mjs` (`HDR-017`, folder vs `type:`) |
| CLS-002 | `[MANUAL]` — an instrument carrying an identifier is caught in review |
| CLS-003 | `[MANUAL]` |
| CLS-004 | `machine/tools/check-register.mjs` — a top-level folder absent from this table |

## Grounds

| Source | What it gives |
|---|---|
| RiC-CM / RiC-FAD / RiC-O 1.0 (ICA, 2023) | Archival description is a graph of Records, Record Sets, Agents, Activities and Rules; it replaces ISAD(G), ISAAR(CPF), ISDF and ISDIAH |
| NAA Business Classification Scheme | Function–Activity–Transaction; functions are nouns, activities verbs; a function is not named after an organisational unit |
| ISO 15489 · ISO 30300–30301 | Classification is tied to retention and access, not filing taste |
| Records continuum (Upward) | A record is not staged through a life cycle — state is a field, never a path |
| Macroappraisal (Cook) | What is kept is decided by analysing functions, not counting documents |
| Series system (Scott, 1966) | A series may relate to several producers over time; provenance is a relation |

Not used: ISAD(G) as a standalone hierarchy; classification by subject;
classification by organisational unit.

## References

| ID | Name | Why cited |
|---|---|---|
| `ADR-046` | The archive is classified by function | the decision that cut this register |
| `STD-001` | The series | the table this scheme groups |
| `STD-024` | A series is a function | thresholds, which CLS-003 separates from function |
| `STD-012` | The corpus does not grow | the retention this scheme restates by activity |

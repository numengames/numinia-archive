---
title: "The series"
id: "STD-001"
uid: ""
type: documentation
subtype: register
status: draft
version: "5.4.7"
created: "2026-08-24T16:00:00Z"
updated: "2026-09-27T11:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, series, register, archive]
license: "CC0-1.0"
ratified_by: "ADR-043"
related: ["STD-024", "STD-018", "STD-007", "STD-027"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The series

> **Summary:** One row per folder of the archive. Each row says what the
> folder holds, how its documents are numbered, what a change costs, how long
> a body may run, and which mould a new document copies.
> **Epistemic:** Which series exist, and what is each for?
> **Pragmatic:** Before you create a document, look up where it goes and
> what it is called. A folder with no row here is unregistered.
> **Audience:** Agents · Oracles

**Binds:** every tracked document of the archive.

## Series

| Series | Holds | Prefix | Threshold | Budget | Mould |
|---|---|---|---|---|---|
| `canon/` | what the system **is**: foundational, not operating policy | `CAN-NNN` | `governed` | 1500 | `CAN-TEMPLATE.md` |
| `standards/` | what an **artifact** must comply with, each requirement answered yes or no; a register fixes the values or terms a norm cites | `STD-NNN` | `governed` | 500 (norm) · none (register) | `STD-TEMPLATE.md` |
| `protocols/` | what an **actor** executes in a repeated situation | `PRO-NNN` | `governed` | 500 | `PRO-TEMPLATE.md` |
| `decisions/` | why something was chosen; withdrawn by the next | `ADR-NNN` · `DEC-NNN` | `governed` | 500 | `ADR-TEMPLATE.md` |
| `missions/` | the work; state lives in `status:`, never in the path | `MIS-NNNN` | `closed` when `done` | 500 | `MIS-TEMPLATE.md` |
| `reports/` | what was observed on a date; `reports/evidence/` is never edited | `RPT-NNN` · `RPT-YYYY-MM-DD` (`daily`, retired) | `closed` | 1000 | `RPT-TEMPLATE.md` |
| `blueprints/` | what could be; not a report of what happened | `BLU-NNN` | `open` | 1000 | `BLU-TEMPLATE.md` |
| `debt/` | what is known to be missing; deleted once nothing living cites it | `DBT-NNN` | `open` | 300 | `DBT-TEMPLATE.md` |
| `operations/` | what sustains the business: legal, strategy | `OPS-NNN` | `open` | — | `OPS-TEMPLATE.md` |
| `system/` | how the machine is wired | `SYS-NNN` | `governed` | — | `SYS-TEMPLATE.md` |
| `agents/` | who acts: `SOUL` · `OPERATOR` · `STATUS` · `MEMORY` per agent | — | `live` (memory) | — | `agents/_template/` |
| `lore/` | the fiction and the game; a second fond (`ADR-046`) | — | `open` | — | `lore/adventures/tabletop/TEMPLATE.md` |
| `objects/` | the objects the archive registers that are not documents | — | `open` | — | — |
| `machine/guards/` | the rules, one file per standard, that run on every change | — | — | — | — |
| `machine/tools/` | instruments run by hand or against the registers: checks, renames, exports | — | — | — | — |
| `machine/scripts/` | the build and CI scripts: addresses, links, versions, the telemetry writer | — | — | — | — |
| `machine/telemetry/` | the figures the repository states about itself, measured, never typed | — | — | — | — |
| `machine/templates/` | the moulds, one per series | — | — | — | — |

The canon, the standards and the protocols are the **axis**: the documents
that bind. The rest are **registers**. A budget is the number of words a
body may hold, counted as the one-page standard counts them. The threshold
is stated here and nowhere else: no document repeats it in its header.
Which function and activity produced each series is the classification
scheme's to say, and it says it once; this table only files.

The moulds live with the machine. Everything the machine holds is an
**instrument**: a short-lived record with a row, because an activity
produced it. It is never a document, so it has no prefix, no threshold, no
budget and no page. It may be cited as evidence of what it measured, and it
binds nobody. It is read in the repository, its manual lives with the
system, and it belongs to everyone.

## Genre and folder

| `type` | Series | Guard strict |
|---|---|---|
| `seminal` | `canon/` | yes |
| `documentation` (`subtype: standard` · `register`) | `standards/` | no |
| `documentation` (`subtype: guide`) | the series it explains | no |
| `protocol` | `protocols/` | yes |
| `mission` | `missions/` | yes |
| `adr` | `decisions/` | yes |
| `blueprint` | `blueprints/` | yes |
| `report` | `reports/` | yes |
| `legal` | `operations/legal/` | yes |
| `agent` | `agents/` | yes |
| `meta` | anywhere — apparatus accompanies its series | no |

Three kinds are withdrawn: an audit is now a report of the audit kind, a
decision is a decision record, and a roster is apparatus.

## Status

The states a document may hold, in every series, are declared once, in the
register of header fields. The dates a mission is stamped with as it starts,
goes to review, finishes or is frozen are fields of its own series, listed
there too.

## Earlier schemes

Older documents were numbered under the earlier prefixes listed below.
Nothing is renumbered. A citation of an old number stays as written, a
promise about the past, and the archive resolves it against its history.
Across repositories, an identifier carries the repository's short name in
front.

| Earlier prefix |
|---|
| `P-NNN` · `S-NNN` · `D-NNN` · `C-NNN` · `O-NNN` · `AUD-YYYY-MM-DD` · `AG-NNN` |

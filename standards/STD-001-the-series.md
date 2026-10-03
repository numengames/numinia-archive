---
title: "The series"
id: "STD-001"
uid: ""
type: standard
subtype: register
status: active
version: "5.12.0"
created: "2026-08-24T16:00:00Z"
updated: "2026-10-03T20:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Knowledge and quality"
tags: [standards, series, register, archive]
license: "CC0-1.0"
approved_by: "ADR-043"
related: ["STD-024", "STD-018", "STD-007", "STD-027"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The series

> **Summary:** One row per folder of the archive. Each row says what the
> folder holds, how its documents are numbered, what a change costs, how long
> a body may run, and which template a new document copies.
> **Epistemic:** Which series exist, and what is each for?
> **Pragmatic:** Before you create a document, look up where it goes and
> what it is called. A folder with no row here is unregistered.
> **Audience:** Agents · Oracles

**Binds:** every tracked document of the archive.

## Series

| Series | Holds | Prefix | Approval level | Budget | Template |
|---|---|---|---|---|---|
| `canon/` | what the system **is**: foundational, not operating policy | `CAN-NNN` | `governed` | 1500 | `CAN-TEMPLATE.md` |
| `standards/` | what an **artifact** must comply with, each requirement answered yes or no; a register fixes the values or terms a norm cites | `STD-NNN` | `governed` | 500 (norm) · none (register) | `STD-TEMPLATE.md` |
| `protocols/` | what an **actor** executes in a repeated situation | `PRO-NNN` | `governed` | 500 | `PRO-TEMPLATE.md` |
| `decisions/` | why something was chosen; withdrawn by the next | `ADR-NNN` · `DEC-NNN` | `governed` | 500 | `ADR-TEMPLATE.md` |
| `missions/` | the work; state lives in `status:`, never in the path | `MIS-NNNN` | `closed` when `done` | 500 | `MIS-TEMPLATE.md` |
| `reports/` | what was observed on a date; `reports/evidence/` is never edited | `RPT-NNN` · `RPT-YYYY-MM-DD` (`daily`, deprecated) | `closed` | 1000 | `RPT-TEMPLATE.md` |
| `blueprints/` | what could be; not a report of what happened | `BLU-NNN` | `open` | 1000 | `BLU-TEMPLATE.md` |
| `debt/` | what is known to be missing; deleted once nothing living cites it | `DBT-NNN` | `open` | 300 | `DBT-TEMPLATE.md` |
| `operations/` | what sustains the business: strategy, sales, continuity | `OPS-NNN` | `open` | — | `OPS-TEMPLATE.md` |
| `opportunities/` | each opportunity of any kind — a sale, a tender, a grant, a collaboration, a partner — one record each with its timeline, its proposals beside it; every document's header, then the fields the pipeline tool reads | `OPP-YYYY-NNN` · `PRP-YYYY-NNN` | `open` | — | `OPP-TEMPLATE.md` · `PRP-TEMPLATE.md` |
| `legal/` | what the company has promised the public in law: privacy, terms, cookies; changes when the law or the service does | `LEG-NNN` | `governed` | — | — |
| `system/` | how the machine is wired | `SYS-NNN` | `governed` | — | `SYS-TEMPLATE.md` |
| `agents/` | who acts: `SOUL` · `OPERATOR` · `STATUS` · `MEMORY` per agent | — | `live` (memory) | — | `agents/_template/` |
| `lore/` | the fiction and the game; a second fonds (`ADR-046`) | — | `open` | — | `lore/adventures/tabletop/TEMPLATE.md` |
| `objects/` | the objects the archive registers that are not documents | — | `open` | — | — |
| `machine/guards/` | the checks, one file per standard, that run on every change | — | — | — | — |
| `machine/tools/` | tooling run by hand or against the registers: checks, renames, exports | — | — | — | — |
| `machine/scripts/` | the build and CI scripts: addresses, links, versions, the telemetry writer | — | — | — | — |
| `machine/telemetry/` | the figures the repository states about itself, measured, never typed | — | — | — | — |
| `machine/templates/` | the templates, one per series | — | — | — | — |

The canon, the standards and the protocols are the **normative documents**
(the *axis* until 2026-10-03): the documents that bind. The rest are
**registers**. A budget is the number of words a body may hold, counted as
the one-page standard counts them. The approval level — what a change to a
document of the series takes, the five values `STD-017` defines — is stated
here and nowhere else: no document repeats it in its header.
Which function and activity produced each series is the classification
scheme's to say, and it says it once; this table only files.

The templates live with the machine. Everything the machine holds is
**tooling** — a check, a script, a template — or the **artifact** a run of it
leaves: a short-lived record with a row, because an activity produced it. It
is never a document, so it has no prefix, no approval level, no budget and
no page. An artifact may be cited as evidence of what it measured, and it
binds nobody. It is read in the repository, its manual lives with the
system, and it belongs to everyone.

## Genre and folder

| `type` | Series | Check strict |
|---|---|---|
| `seminal` | `canon/` | yes |
| `standard` (`subtype: standard` · `register`) | `standards/` | yes |
| `documentation` (`subtype: guide` · `reference` · `register`) | the series it explains | no |
| `protocol` | `protocols/` | yes |
| `mission` | `missions/` | yes |
| `adr` | `decisions/` | yes |
| `blueprint` | `blueprints/` | yes |
| `report` | `reports/` | yes |
| `legal` | `legal/` | yes |
| `agent` | `agents/` | yes |
| `opportunity` · `proposal` | `opportunities/` | yes |
| `meta` | anywhere — apparatus accompanies its series | no |
| `entity` | an entity card: `agents/<agent>/AGENT.md`, `objects/` | no |

Three kinds are withdrawn: an audit is now a report of the audit kind, a
decision is a decision record, and a roster is apparatus. A standard was
`type: documentation` until 2026-10-03; a norm is a normative document, and
`documentation` is what explains one.

## Status

The states a document may hold, in every series, are declared once, in the
register of header fields. The dates a mission is stamped with as it starts,
goes to review, finishes or is put on hold are fields of its own series,
listed there too.

## Earlier schemes

Older documents were numbered under the earlier prefixes listed below.
Nothing is renumbered. A citation of an old number stays as written, a
promise about the past, and the archive resolves it against its history.
Across repositories, an identifier carries the repository's short name in
front.

| Earlier prefix |
|---|
| `P-NNN` · `S-NNN` · `D-NNN` · `C-NNN` · `O-NNN` · `AUD-YYYY-MM-DD` · `AG-NNN` |

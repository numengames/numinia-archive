---
title: "The series"
id: "STD-001"
uid: ""
type: documentation
subtype: register
status: draft
version: "5.4.2"
created: "2026-08-24T16:00:00Z"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, series, register, archive]
license: "CC0-1.0"
ratified_by: "ADR-043"
threshold: governed
related: ["STD-024", "STD-016", "STD-018", "STD-007", "STD-027"]
series_change: "5.4.2 — 2026-09-25: the prose between the tables says the series table is the business classification scheme of the international standard for records management, built by the Australian national archives' guidance, that prefix, threshold and budget are ours, and that instruments are short-lived records; no row changes."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The series

> **Summary:** The folders of the archive, one row each: what the folder
> holds, how its documents are numbered, what it takes to change them, how
> long their body may run, and the mould a new one is copied from.
> **Epistemic:** Which series exist, and what each one is for.
> **Pragmatic:** Look up where a document goes and what it is called before
> creating it. A folder not listed here is unregistered until a row is added.
> **Audience:** Agents · Oracles

**Binds:** every tracked document of the archive.
**Does not bind:** what a series is and obliges, the fields of the header,
or the identifier itself.

## Series

| Series | Function · Activity | Holds | Prefix | Threshold | Budget | Mould |
|---|---|---|---|---|---|---|
| `canon/` | Governance · Founding | what the system **is**: foundational, not operating policy | `CAN-NNN` | `governed` | 1500 | `CAN-TEMPLATE.md` |
| `standards/` | Governance · Standardising | what an **artifact** must comply with | `STD-NNN` | `governed` | 500 (norm) · none (register) | `STD-TEMPLATE.md` |
| `protocols/` | Governance · Prescribing | what an **actor** executes in a repeated situation | `PRO-NNN` | `governed` | 500 | `PRO-TEMPLATE.md` |
| `decisions/` | Governance · Deciding | why something was chosen; withdrawn by the next | `ADR-NNN` · `DEC-NNN` | `governed` | 500 | `ADR-TEMPLATE.md` |
| `missions/` | Production · Executing | the work; state lives in `status:`, never in the path | `MIS-NNNN` | `closed` when `done` | 500 | `MIS-TEMPLATE.md` |
| `reports/` | Assurance · Observing | what was observed on a date; `reports/evidence/` is never edited | `RPT-NNN` · `RPT-YYYY-MM-DD` (`daily`, retired) | `closed` | 1000 | `RPT-TEMPLATE.md` |
| `blueprints/` | Production · Planning | what could be; not a report of what happened | `BLU-NNN` | `open` | 1000 | `BLU-TEMPLATE.md` |
| `debt/` | Assurance · Admitting | what is known to be missing; deleted once nothing living cites it | `DBT-NNN` | `open` | 300 | `DBT-TEMPLATE.md` |
| `operations/` | Administration · Sustaining | what sustains the business: legal, strategy | `OPS-NNN` | `open` | — | `OPS-TEMPLATE.md` |
| `system/` | Administration · Wiring | how the machine is wired | `SYS-NNN` | `governed` | — | `SYS-TEMPLATE.md` |
| `agents/` | Agency · Constituting | who acts: `SOUL` · `OPERATOR` · `STATUS` · `MEMORY` per agent | — | `live` (memory) | — | `agents/_template/` |
| `lore/` | Creation · Worldbuilding | the fiction and the game; a second fond (`ADR-046`) | — | `open` | — | `lore/adventures/tabletop/TEMPLATE.md` |
| `objects/` | Creation · Cataloguing | the objects the archive registers that are not documents | — | `open` | — | — |
| `machine/guards/` | Assurance · Verifying | the rules, one file per standard, that run on every change | — | — | — | — |
| `machine/tools/` | Assurance · Verifying | instruments run by hand or against the registers: checks, renames, exports | — | — | — | — |
| `machine/scripts/` | Assurance · Verifying | the build and CI scripts: addresses, links, versions, the telemetry writer | — | — | — | — |
| `machine/telemetry/` | Assurance · Measuring | the figures the repository states about itself, measured, never typed | — | — | — | — |
| `machine/templates/` | Administration · Templating | the moulds, one per series | — | — | — | — |

The canon, the standards and the protocols are the **axis**, the documents
that bind; the rest are **registers**. A budget is the number of words the
body may hold, as the one-page standard counts them. The function and
activity column is the classification scheme: it says which activity
produced a series, never what a change to it costs.

This table is what the international standard for records management calls
a business classification scheme, built the way the Australian national
archives teach: every folder under a function, named as a noun, and an
activity, named as a verb, so an auditor of records reads it without a
glossary. What is ours is the rest of each row — the prefix, the threshold
and the budget. No law requires the scheme; it is our choice.

The moulds live with the machine. Everything the machine holds is an
**instrument**: a short-lived record, classified by the activity that
produced it, so it has a row; never a document, so it has no prefix, no
threshold, no budget and no page. It may be cited as evidence of what it
measured and binds nobody. It is read in the repository, its manual lives
with the system, and it belongs to everyone.

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

Older documents were numbered under earlier prefixes, listed below. Nothing
is renumbered: a document that cites an old number keeps the citation as a
promise about the past, and the archive resolves it against its history.
Across repositories, an identifier carries the repository's short name in
front of it.

| Earlier prefix |
|---|
| `P-NNN` · `S-NNN` · `D-NNN` · `C-NNN` · `O-NNN` · `AUD-YYYY-MM-DD` · `AG-NNN` |

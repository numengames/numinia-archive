---
title: "The series"
id: "STD-001"
uid: ""
type: documentation
subtype: register
status: draft
version: "5.4.0"
created: "2026-08-24T16:00:00Z"
updated: "2026-09-21T18:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, series, register, archive]
license: "CC0-1.0"
ratified_by: "ADR-043"
threshold: governed
related: ["STD-024", "STD-016", "STD-018", "STD-007", "STD-027"]
series_change: "5.4.0 — 2026-09-21: the five instrument folders of `machine/` gain a row each, so the Holds column stops being blank where `STD-027` classifies them (Verifying · Measuring · Templating). Prefix, threshold, budget and mould are `—`: an instrument is not a document. Minor: rows added, none changed. 5.3.0 — 2026-09-20: the Function · Activity column, and `lore/` and `objects/` registered as series they always were (ADR-046). The scheme itself lives in STD-027; this file keeps the table. Minor move: rows gained a column, none lost a claim. 5.2.1 — 2026-09-10: status `active` → `draft` under the alpha reset the Oracle ordered on 2026-09-10: the state had been set by agents, not signed one by one. Text unchanged; the state returns to `draft` until the tree meets the standard and the Oracle ratifies it one by one. Patch move (VER-064). 5.0.0 — cut eleven under ADR-043. The glossary that was not a glossary becomes the register it always was: what series exist, what each holds, its prefix, its threshold, its budget, its mould. The rules moved to STD-024 (a series is a function), STD-021 (citing vs data), STD-015 (guard checks); the field vocabularies were already in STD-016. Section-numbered citations resolve in git."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The series

> **Summary:** The folders of the corpus, one row each: what the folder holds,
> its identifier prefix, its change threshold, its body budget and its mould.
> **Epistemic:** Which series exist, and what each one is for.
> **Pragmatic:** Look up where a document goes and what it is called before
> creating it. An unlisted folder is unregistered until a row is added here.
> **Audience:** Agents · Oracles

**Binds:** every tracked document of the corpus.
**Does not bind:** what a series is and what it obliges — `STD-024`; the
fields of the header — `STD-016`; the identifier — `STD-018`.

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
| `lore/` | Creation · Worldbuilding | the fiction and the game; a second fond (`ADR-046`) | — | `open` | — | `lore/adventures/TEMPLATE.md` |
| `objects/` | Creation · Cataloguing | the objects the archive registers that are not documents | — | `open` | — | — |
| `machine/guards/` | Assurance · Verifying | the rules, one file per standard, that run on every change | — | — | — | — |
| `machine/tools/` | Assurance · Verifying | instruments run by hand or against the registers: checks, renames, exports | — | — | — | — |
| `machine/scripts/` | Assurance · Verifying | the build and CI scripts: addresses, links, versions, the telemetry writer | — | — | — | — |
| `machine/telemetry/` | Assurance · Measuring | the figures the repository states about itself, measured, never typed | — | — | — | — |
| `machine/templates/` | Administration · Templating | the moulds, one per series | — | — | — | — |

`canon/`, `standards/` and `protocols/` are the **axis**; the rest are
**registers** (`STD-024`). Budgets are the body word counts `STD-007` measures.
The Function · Activity column is the classification scheme of `STD-027`: it
says which activity produced a series, never what a change to it costs.

Moulds live in `machine/templates/`. Everything under `machine/` is an
**instrument**, not a record (`STD-027` CLS-002): classified by the activity
that produced it, so it has a row; never a document, so it has no prefix, no
threshold, no budget and no page — it is read in the repository, and `SYS-007`
is its manual. CC0-1.0.

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

Withdrawn `type` values: `audit` → `report` + `subtype: audit` · `decision` →
`adr` · `roster` → `meta`.

## Status

The states a document may hold, for every series, are declared once in
`STD-016`. A mission's stamps (`started` · `in_review_at` · `completed` ·
`freeze_reason`) are its Ring 3 fields, also in `STD-016`.

## Earlier schemes

`P-NNN` · `S-NNN` · `D-NNN` · `C-NNN` · `O-NNN` · `AUD-YYYY-MM-DD` · `AG-NNN`.
Nothing is renumbered: a document that cites one keeps the citation as a
promise about the past, and the GIT-048 guard resolves it against git.
Across repositories the identifier is qualified: `nwos:ADR-006` · `web:ADR-006`.

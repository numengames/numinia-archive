---
id: "STD-055"
uid: ""
title: "Only a call that passes is recorded"
type: standard
subtype: standard
status: draft
version: "0.1.0"
created: "2026-10-15T10:28:18Z"
updated: "2026-10-15T10:28:18Z"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [standards, sales, tenders, grants, public-procurement, screening]
license: "CC0-1.0"
related: ["STD-039", "STD-038", "OPS-018", "PRO-033", "PRO-031", "PRO-032"]
derived_from: "PRI-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Only a call that passes is recorded

> **Summary:** A call from a public body — a tender or a grant — is read
> against the house's card before it is recorded, and only a call that
> passes is kept. It links its notice, says where it was read and what the
> buyer really buys, and appears once.
> **Epistemic:** Which tenders and grants does the house record?
> **Pragmatic:** Read the call itself, fill its criteria table against the
> card, and write the record only if every requirement is met or checkable.
> **Audience:** Agents · Oracles

**Binds:** every tender and every grant recorded in Numen Games' or
Numinia's name, and every tool that reads them.

## Rules

### Reading a call

**A call links its notice.** A tender MUST carry the procedure the authority
buys by and — for every procedure but the minor contract, which has no
notice — the address of its notice; a grant MUST carry the instrument and
the address of its call. Both carry the moment the call closes — their
deadline — with the notice's hour. A tender's value is the estimated value
the notice states, before tax; the house's own price enters the record only
once the authority has published the award.

**A call is read against the house's card, and only what passes is
recorded.** A tender and a grant MUST carry a `## Criteria` table — each
requirement of the call, what it asks, what the house holds, and whether it
meets it: yes or check. A call that fails a requirement MUST NOT be
recorded: what it taught goes to the house's card, and the file is not kept.
The table is a gate, not a grade: the chance is the same for a call as for
any record.

**A call's verdict rests on its own terms.** A tender and a grant MUST say
where the call was read, terms or notice; a call known only from a summary
is not recorded. A tender MUST say what the buyer really buys, build or
deliver; a resale, or what the house does not make, is not recorded. A
tender whose turnover asked is above the ceiling in the house's card is not
recorded.

**One call, one record.** A tender MUST carry the authority's file
reference; two records with the same file reference and value are one call
listed twice, and one of them goes.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| CAL-001 | A call links its notice | [LCSP](https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902) arts. 63 (the contracting profile), 133 (a bid is confidential until award), 159 (what each procedure asks); [Law 38/2003](https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977) art. 17 (the bases of a call); `STD-038` | `machine/packages/sales-kit/pipeline.mjs`: a tender requires `procedure` and `call` unless the procedure is `minor`; a grant requires `instrument` and `call`; both require `closes` |
| CAL-002 | A call is read against the house's card, and only what passes is recorded | [LCSP](https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902) arts. 87 (turnover at most 1.5 times the value), 90.4 (no past works asked of a company under five years, below the harmonised threshold), 145 (award criteria); [Law 38/2003](https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977) art. 13 (who may be a beneficiary); `STD-038` *The house's chance*; the house's card (`OPS-018`) | `machine/packages/sales-kit/pipeline.mjs`: a tender or a grant requires a `## Criteria` table whose last column is yes or check; a no is refused; the table does not enter the chance (OPP-016) |
| CAL-003 | A call's verdict rests on its own terms | the Oracle's ruling of 2026-10-01, from a summary that turned a forklift simulator into a 3D platform; LCSP art. 87 (turnover); `STD-038` *Where a call was read*, *What the buyer really buys*; `OPS-018` | `machine/packages/sales-kit/pipeline.mjs`: `read_from` terms or notice; a tender's `object` build or deliver; a `turnover_asked` above the card's ceiling refused |
| CAL-004 | One call, one record | the Oracle's ruling of 2026-10-01: aggregators list one file twice under different titles | `machine/packages/sales-kit/pipeline.mjs`: `file_ref` required on a tender; the same file reference and value in two records is reported |

## Why

A summary turned a forklift simulator into a 3D platform, and a call the
house cannot win teaches the card, not the pipeline. Reading the call itself
before recording it keeps the pipeline to what the house can really take.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-039` | An opportunity has a record | the record a passing call becomes |
| `STD-038` | The stages of an opportunity | the procedures, instruments and call values the fields take |
| `OPS-018` | The house's card | what the house holds, against which the criteria are read |

---
id: "STD-046"
uid: ""
title: "A grant has a record"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-10-01T15:00:00+02:00"
updated: "2026-10-01T15:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Funding"
tags: [standards, funding, grants, subsidies, record, criteria]
license: "CC0-1.0"
related: ["STD-045", "STD-038", "STD-039", "OPS-019", "PRO-032", "CAN-009"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A grant has a record

> **Summary:** Every call for public money the house might take is one
> public file with a header: the funder, what it gives and how it pays, the
> days, the stage, and the house's chance read from a table of the call's
> conditions. The funding view is computed from the files, never typed.
> **Epistemic:** What must the record of a grant contain?
> **Pragmatic:** Open a record the day a call is foreseen, and know what
> the tool will refuse.
> **Audience:** Agents · Oracles

**Binds:** every record of a grant, public loan or prize kept in Numen
Games' name, and every tool that reads them.

## Rules

### One record, one header

**One file per call.** Each call MUST be one Markdown file with a header,
named by its identifier. Next year's call is a new file.

**The header carries what the view needs.** The header MUST open with the
fields every document carries, then carry: identifier, funder, instrument,
the most the house could receive, currency, how it pays, the share paid in
advance, the call's address, the opening and closing days and whether they
are estimated, the stage, the chance, next action, next date, the date
opened, and the licence. The date closed and the reason are written when
due; the amount granted from granted on.

**The stage and the values come from the register.** The stage, the
instrument, the payment and the reason MUST be values of the register of
the stages of a grant; the chance MUST be one of the house's chance.

**Every open record knows its next step.** A record in an open stage MUST
carry a next action and its date. One whose next date has passed is
overdue.

**Every move leaves a line.** Each change of stage MUST add a row to the
record's transitions table: date, from, to, who, evidence.

### Read against the house's card

**The conditions are a table.** A record MUST carry a criteria table — each
condition of the call, what the house holds, and whether it meets it: yes,
no or still to check.

**The chance follows the table.** A failed condition MUST make the chance
low or none; a condition still to check MUST keep it below high; none MUST
name the condition that failed.

### What it says

**Nobody's name.** A record MUST carry no person's name, e-mail or phone.
The funder is a public body that publishes its call, and is named.

**In the public archive, computed.** Records MUST be kept in this
repository's funding series, and every figure about them MUST be read by a
tool from the files.

**A paid grant hands on.** When a record reaches paid, its amount MUST be
handed to the ledger at the month's close.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| GRA-001 | One file per call | [ISO 15489-1:2016](https://www.iso.org/standard/62542.html), a record is evidence of a transaction (clause unverified) | `machine/packages/funding-kit/funding.mjs`: one header per file, named by its id |
| GRA-002 | The header carries what the view needs | — | `funding.mjs`: required fields present, closed list of fields |
| GRA-003 | The stage and the values come from the register | `STD-045`; `STD-038` *The house's chance* | `funding.mjs`: stage, instrument, payment, reason and chance read from the registers' tables |
| GRA-004 | Every open record knows its next step | — | `funding.mjs`: overdue listed |
| GRA-005 | Every move leaves a line | [ISO 15489-1:2016](https://www.iso.org/standard/62542.html), metadata of the transaction (clause unverified) | `funding.mjs`: last transition's `to` matches the stage |
| GRA-006 | The conditions are a table | [Law 38/2003](https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977) art. 13, who may be a beneficiary; the house's card for grants (`OPS-019`) | `funding.mjs`: a `## Criteria` table whose last column is yes · no · check |
| GRA-007 | The chance follows the table | `STD-038` *The house's chance* | `funding.mjs`: a no forbids high and medium, a check forbids high, none needs a no |
| GRA-008 | Nobody's name | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 5(1)(c); `STD-035` | `funding.mjs`: the file scanned for an e-mail or a phone; by hand for a name |
| GRA-009 | In the public archive, computed | `CAN-009` | `funding.mjs funding` runs in CI; the pipeline page reads it |
| GRA-010 | A paid grant hands on | `STD-036` | by hand, at the month's close |

## Why

A call opens for fifteen working days once a year; a call kept in one head
is missed, and one weighed from memory is taken when the house cannot carry
it. One file per call, read against the house's card, is how the archive
already keeps every sale; a grant only needed its own stages.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-045` | The stages of a grant | the stages, instruments, payments and reasons this record takes its values from |
| `STD-038` | The stages of a sale | the house's chance, one scale for tenders and grants |
| `OPS-019` | The house's card for grants | what the house holds, against which a call's conditions are read |
| `STD-036` | One account | where a paid grant's amount goes |
| `CAN-009` | The archive is the organisation | why a grant is a record and its figures are computed |

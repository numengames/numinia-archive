---
id: "STD-039"
uid: ""
title: "An opportunity has a record"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-28T13:00:00+02:00"
updated: "2026-09-28T13:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Sales"
tags: [standards, sales, opportunity, record, pipeline, personal-data]
license: "CC0-1.0"
related: ["STD-038", "STD-040", "STD-035", "STD-036", "CAN-009", "CAN-012"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# An opportunity has a record

> **Summary:** Every chance to sell something is one file with a header:
> who, what, at which stage, worth how much, and what happens next. The
> stage comes from the register of stages; the pipeline is computed from
> the files, never typed; names stay in the body and out of the header;
> the records live outside this public archive.
> **Epistemic:** What must the record of an opportunity contain?
> **Pragmatic:** Open a record when someone shows a need, and know what a
> tool will refuse. Read the pipeline from the tool, never from memory.
> **Audience:** Agents · Oracles

**Binds:** every record of an opportunity kept in Numen Games' or Numinia's
name, and every tool that reads them.

## Rules

### One record, one header

**One file per opportunity.** Each opportunity MUST be one Markdown file
with a header, named by its identifier. An organisation with three
opportunities has three files; the view by organisation is computed.

**The header carries the fields the pipeline needs.** The header MUST carry:
identifier, organisation, sector, the offer it sells, source, stage, value
without tax, currency, the contact's role, the contact channel, the
decider's role, next action, next date, and the dates opened and closed.
A lost record adds its reason; a proposed one the proposal's path; a won
one the agreement's path.

**The stage is a value from the register.** The stage MUST be one of the
stages register's states, written in the header and never in the filename
or the folder. The reason of a lost record MUST be one of the register's
reasons.

**Every open record knows its next step.** A record in an open stage MUST
carry a next action and its date. A record whose next date has passed is
overdue; one unmoved longer than the register's stale days is stale.

**Every move leaves a line.** Each change of stage MUST add a row to the
record's transitions table: date, from, to, who, evidence. The time a sale
spends in each stage is read from these rows.

### What it says about people

**Roles in the header, names in the body.** The header MUST carry roles and
channels, never a person's name, address or number. Those MAY be written in
the body, so the header can be aggregated and published while the body
stays closed.

**Minimal, with its basis, then erased.** Personal data in a record MUST be
the least needed to pursue the sale, held under the house's legitimate
interest in offering its services to organisations, and erased after the
register's retention period for a lost record. The record itself stays.

### Where it lives and what it hands on

**Outside the public archive.** Records MUST be kept in a closed place the
Oracle names, never in this repository. The rules, the moulds and the tool
are here; the records are not.

**The pipeline is computed.** Counts, values, overdue and stale records,
time per stage and reasons lost MUST be read from the records by a tool.
No figure about the pipeline is typed by hand anywhere.

**A won record hands on.** When a record reaches won, its value and its
agreement MUST be handed to the ledger, and its need to whoever builds what
was sold.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| OPP-001 | One file per opportunity | [ISO 15489-1:2016](https://www.iso.org/standard/62542.html), a record is evidence of a transaction (clause unverified) | `machine/packages/sales-kit/pipeline.mjs`: one header per file |
| OPP-002 | The header carries the fields the pipeline needs | [ISO 9001:2015](https://www.iso.org/standard/62085.html) 8.2.2, requirements determined before commitment (clause unverified) | `pipeline.mjs`: required fields present |
| OPP-003 | The stage is a value from the register | `STD-038` | `pipeline.mjs`: stage and reason read from the register's table |
| OPP-004 | Every open record knows its next step | — | `pipeline.mjs`: overdue and stale listed |
| OPP-005 | Every move leaves a line | [ISO 15489-1:2016](https://www.iso.org/standard/62542.html), metadata of the transaction (clause unverified) | `pipeline.mjs`: last transition's `to` matches the stage |
| OPP-006 | Roles in the header, names in the body | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 5(1)(c), data minimisation | `pipeline.mjs`: header fields against a closed list; by hand for the values |
| OPP-007 | Minimal, with its basis, then erased | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 5(1)(e), 6(1)(f), recital 47 | by hand, at the register's retention; `pipeline.mjs` lists lost records past it |
| OPP-008 | Outside the public archive | `CAN-012`; `STD-035` | by hand at every pull request: no record in this tree |
| OPP-009 | The pipeline is computed | `CAN-009` | `pipeline.mjs` is the only source of pipeline figures |
| OPP-010 | A won record hands on | `STD-036` LED-001 | by hand, at the ledger's month close |

## Why

A sale kept in one person's head is lost with a holiday, and a pipeline
typed into a sheet is wrong by the second week. One file per opportunity,
with a header a tool can read, is what this archive already does with
every mission and every decision: the same discipline, applied to the one
function the house had never written down. The record outlives the seller;
the figures come from the files; a person's name never travels further
than it must.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-038` | The stages of a sale | the stages, reasons and retention this record's fields take their values from |
| `STD-040` | A proposal says four things | what the proposal a record points to must contain |
| `STD-035` | Personal data | what may be kept about the people named in a record |
| `STD-036` | One account | where a won record's value goes |
| `CAN-009` | The archive is the organisation | why a sale is a record and the pipeline is computed from records |

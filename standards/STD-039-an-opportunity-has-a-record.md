---
id: "STD-039"
uid: ""
title: "An opportunity has a record"
type: documentation
subtype: standard
status: draft
version: "0.2.1"
created: "2026-09-28T13:00:00+02:00"
updated: "2026-09-28T21:00:00+02:00"
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
> the files, never typed; the records are public, carry nobody's name, and
> name the organisation only once it has agreed.
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
decider's role, next action, next date, the dates opened and closed, and
the licence every document here carries. A lost record adds its reason; a
proposed one the proposal's path; a won one the agreement's path.

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

### What it says about people and organisations

**Nobody's name.** A record MUST carry roles and channels, never a person's
name, address, number or anything that identifies one — in the header or
in the body. Who said what is kept where the conversation happened, outside
the archive. The record is public; a person did not choose to be.

**The organisation, by sector until it agrees.** A record MUST name the
organisation by sector and size, not by name, until the client has agreed to
the proposal; from the stage agreed on, the name MAY be written, and the
earlier records of the same organisation MAY be updated. A client who asks
not to be named is not named, and the record says so.

**Minimal, with its basis.** What a record says about an organisation MUST
be the least needed to pursue the sale, held under the house's legitimate
interest in offering its services. A lost record is kept as it stands; it
holds nothing that outlives its use.

### Where it lives and what it hands on

**In the public archive.** Records MUST be kept in this repository, in the
opportunities series, one file each; the pipeline is read from there by
anyone. Transparency is the house's rule, and a sale is no exception once
nobody's name is in it.

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
| OPP-006 | Nobody's name | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 5(1)(c), 6; `STD-035` PRV-001 | `pipeline.mjs`: header fields against a closed list, and the body scanned for an e-mail address or a phone number; by hand for a name |
| OPP-011 | The organisation, by sector until it agrees | — (the client's interest, and public-procurement rules that forbid a bidder disclosing a live negotiation) | `pipeline.mjs`: a record before `agreed` whose organisation is not one of the sector words is reported; by hand for the client's wish |
| OPP-007 | Minimal, with its basis | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 5(1)(c), 6(1)(f), recital 47 | by hand, at the review of every record |
| OPP-008 | In the public archive | `CAN-009`; the Oracle's ruling | the tree: `opportunities/` is the series; `pipeline.mjs opportunities` runs in CI |
| OPP-009 | The pipeline is computed | `CAN-009` | `pipeline.mjs` is the only source of pipeline figures |
| OPP-010 | A won record hands on | `STD-036` LED-001 | by hand, at the ledger's month close |

## Why

A sale kept in one person's head is lost with a holiday, and a pipeline
typed into a sheet is wrong by the second week. One file per opportunity,
with a header a tool can read, is what this archive already does with
every mission and every decision: the same discipline, applied to the one
function the house had never written down. The record outlives the seller;
the figures come from the files; and because no person is in it, the whole
pipeline can be as public as everything else here.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-038` | The stages of a sale | the stages, reasons and retention this record's fields take their values from |
| `STD-040` | A proposal says four things | what the proposal a record points to must contain |
| `STD-035` | Personal data | what may be kept about the people named in a record |
| `STD-036` | One account | where a won record's value goes |
| `CAN-009` | The archive is the organisation | why a sale is a record and the pipeline is computed from records |

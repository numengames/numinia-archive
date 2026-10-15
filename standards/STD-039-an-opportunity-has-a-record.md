---
id: "STD-039"
uid: ""
title: "An opportunity has a record"
type: standard
subtype: standard
status: draft
version: "0.16.1"
created: "2026-09-28T13:00:00+02:00"
updated: "2026-10-15T11:12:38Z"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [standards, sales, opportunity, record, pipeline, timeline]
license: "CC0-1.0"
related: ["STD-038", "STD-040", "STD-054", "STD-055", "STD-036", "OPS-018", "PRI-009", "STD-048", "STD-049"]
derived_from: "PRI-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# An opportunity has a record

> **Summary:** Every chance to bring money or work into the house is one
> public file: a
> header saying what kind, worth how much and how it pays, and a timeline
> with one line per thing that happened. The stage, the next step, the
> funnel and the chance are computed from the timeline, never typed.
> **Epistemic:** What must the record of an opportunity contain?
> **Pragmatic:** Open a record the day an opportunity is found, write a
> line each time something happens, and read the pipeline from the tool,
> never from memory.
> **Audience:** Agents · Oracles

**Binds:** every record of an opportunity kept in Numen Games' or Numinia's
name — a sale, a tender, a grant, a collaboration, a partner — and every
tool that reads them.

## Rules

### One record, one header, one timeline

**One file per opportunity.** Each opportunity MUST be one Markdown file
with a header, named by its identifier. An organisation with three
opportunities has three files; a call repeated next year is a new file; the
view by organisation is computed.

**The header carries the fields the pipeline needs.** The header MUST open
with the fields every document carries, then carry the fields below. The
computed values MUST NOT be written in it.

| When | Fields |
|---|---|
| Always | identifier, kind, organisation, sector, source, the operation (what the deal is about, in one line), the line of the house it falls in, value before tax, currency, how it pays, the contact's role, the contact channel, the moment opened, the licence |
| When due, absent before | the offer it sells (a sale, a tender); the share paid in advance (when it pays in advance or by milestones); the proposal's path (a sale from `proposed`); the agreement's path (a sale at `won`); the decider's role (a sale from `agreed`); the disclosure, once the client has answered in writing; the record it follows from; what came back (a collaboration); the deadline, on any kind whose other side sets one; the call's fields the register names (a tender, a grant) |
| Never typed | the stage, the next step, the closing date, the reason, the chance |

**The kind and the stage come from the register.** The kind MUST be one of
the register's kinds. The stage is computed from the timeline: the kind's
first stage on the `found` line, then the stage a line marks, moving only
forward, to `won` or `lost`. A stage a line marks MUST belong to the
record's kind, and a lost line's reason MUST be one of the register's
reasons. Source, how it pays, the instrument, the procedure, where a call
was read and what the buyer buys MUST be values of the register.

**Every open record knows its next step.** An open record MUST end its
timeline with exactly one `next` line: the planned step and its date. A
closed record MUST carry none. A record whose next date has passed is
overdue; one of a kind with a stale limit, unmoved longer than that limit,
is stale.

**Every move leaves a line.** The record MUST carry a `## Timeline`, one
line per thing that happened, in the register's grammar: date, event, text.
The first line MUST be the one `found`; dates MUST NOT go backwards; a
record closes with one `won` or `lost` line. The time spent in each stage
and the steps of the funnel reached are read from these lines.

**A first contact names its door.** From its first `out` line, an open
record that is not a call MUST carry its `door`: how the house first
reached the other side, one of the register's doors. Its contact channel
MAY be an e-mail or a form only when the door lets one through —
`published`, `asked`, `inbound`, `former-client` — and is otherwise a
call, a letter or a meeting.

### The chance

**The chance is computed from the line and the house's wins.** A record's
line MUST be one of the lines the house's card lists, or `other`. The
chance of an open record is computed from two questions — is it in a line
the house sells, and has the house already won another record in that
line — high when both, medium when one, low when neither, as the register
says. A closed record has no chance. A past job the house delivered enters
as a record closed `won`, paid or not, so the chance learns from it.

### Where it lives

**In the public archive.** Records MUST be kept in this repository, in the
opportunities series, one file each, whatever their kind; the pipeline is
read from there by anyone.

**A lost record leaves after a quarter.** A record closed `lost` MUST be kept
for 90 days from its `lost` line. The first quarterly roll-up after that MUST
count it — how many, their value, their reason — and delete its file. A won
record stays, because the chance learns from it.

**The pipeline is computed.** Stages, counts, values, the funnel, overdue
and stale records, time per stage, reasons lost and the chance MUST be read
from the records by a tool. No figure about the pipeline is typed by hand
anywhere.

A won sale is handed to the ledger in the step that closes it, and a won
grant at the month's close; those are steps of their procedures, not rules
of the record.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| OPP-001 | One file per opportunity | [ISO 15489-1:2016](https://www.iso.org/standard/62542.html), a record is evidence of a transaction (clause unverified) | `machine/packages/sales-kit/pipeline.mjs`: one header per `OPP-*.md` file, named by its id |
| OPP-002 | The header carries the fields the pipeline needs | [ISO 9001:2015](https://www.iso.org/standard/62085.html) 8.2.2, requirements determined before commitment (clause unverified) | `machine/packages/sales-kit/pipeline.mjs`: required fields per kind; the computed fields refused |
| OPP-003 | The kind and the stage come from the register | `STD-038` | `machine/packages/sales-kit/pipeline.mjs`: every value read from the register's tables; stages forward only |
| OPP-004 | Every open record knows its next step | — | `machine/packages/sales-kit/pipeline.mjs`: one last `next` line on an open record, none on a closed one |
| OPP-005 | Every move leaves a line | [ISO 15489-1:2016](https://www.iso.org/standard/62542.html), metadata of the transaction (clause unverified) | `machine/packages/sales-kit/pipeline.mjs`: a `## Timeline` in the register's grammar; `found` first; dates ascending |
| OPP-008 | In the public archive | `PRI-009`; the Oracle's ruling | `machine/packages/sales-kit/pipeline.mjs opportunities` runs in CI over the one series |
| OPP-009 | The pipeline is computed | `PRI-009` | `machine/packages/sales-kit/pipeline.mjs` is the only source of pipeline figures; the page reads it |
| OPP-016 | The chance is computed from the line and the house's wins | the Oracle's ruling of 2026-10-07: how close it is to the business, and whether the house has done something like it | `machine/packages/sales-kit/pipeline.mjs`: `line` read against the card; the chance computed; `test/pipeline.test.mjs` |
| OPP-018 | A first contact names its door | `STD-048` CLD-001, CLD-002; law: [LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) art. 21 | `machine/packages/sales-kit/pipeline.mjs`: `door` among the register's doors; e-mail or form through a door that does not let one through is refused; `test/pipeline.test.mjs` |
| OPP-019 | A lost record leaves after a quarter | [ISO 15489-1:2016](https://www.iso.org/standard/62542.html), disposition (clause unverified); `STD-012`; the Oracle's ruling of 2026-10-15 | `machine/packages/sales-kit/pipeline.mjs`: every lost record past 90 days is listed under *Ready to leave*; `test/pipeline.test.mjs`; the roll-up that removes it is a step of `PRO-017` |

## Why

A sale kept in one person's head is lost with a holiday. A header a tool can
read and a timeline of what happened outlive the seller; the figures come
from the files.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-038` | The stages of an opportunity | the kinds, stages, events, steps, reasons and call values this record's fields take their values from |
| `STD-040` | A proposal says four things | what the proposal a record points to must contain |
| `STD-054` | A client is named by consent | who may be named in a record, and when |
| `STD-055` | Only a call that passes is recorded | which tenders and grants enter the pipeline |
| `OPS-018` | The house's card | the lines the house sells, against which the chance is read |

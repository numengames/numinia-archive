---
id: "STD-039"
uid: ""
title: "An opportunity has a record"
type: standard
subtype: standard
status: draft
version: "0.10.3"
created: "2026-09-28T13:00:00+02:00"
updated: "2026-10-03T21:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [standards, sales, opportunity, record, pipeline, timeline, personal-data, tenders, grants]
license: "CC0-1.0"
related: ["STD-038", "STD-040", "STD-035", "STD-036", "OPS-018", "PRI-009", "PRI-012"]
derived_from: "PRI-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# An opportunity has a record

> **Summary:** Every chance to bring money or work into the house — a sale,
> a tender, a grant, a collaboration, a partner — is one public file: a
> header saying who, what kind, worth how much and how it pays, and a
> timeline with one line per thing that happened. The stage, the next step,
> the funnel and the chance are computed from the timeline and the criteria,
> never typed. A call from a public body is read against the house's card,
> and only a call that passes is recorded. Nobody's name is in it; the
> organisation is named once it has agreed, or when it is a public body
> that publishes its own call.
> **Epistemic:** What must the record of an opportunity contain?
> **Pragmatic:** Open a record the day an opportunity is found, write a
> line each time something happens, and know what the tool will refuse.
> Read the pipeline from the tool, never from memory.
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
with the fields every document carries, then carry: identifier, kind,
organisation, sector, source, value before tax, currency, how it pays,
the contact's role, the contact channel, the date opened, and the licence.
The rest are written when due and absent before: the offer it sells,
required for a sale and a tender; the share paid in advance, required when
it pays in advance or by milestones; the proposal's path, for a sale from
`proposed`; the agreement's path, for a sale at `won`; the decider's role,
for a sale from `agreed`; the disclosure once the client has been told the
house works in the open — `open` if it did not object, `unnamed` if it
asked to stay out; the record it follows from; what came back, for a
collaboration; and for a tender or a grant, the call's fields the register
names. The stage, the next step, the closing date, the reason and the
chance are never written in the header.

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
record closes with one `won` or `lost` line. The time an opportunity spends
in each stage, and the steps of the funnel it reached, are read from these
lines.

### What it says about people and organisations

**Nobody's name.** A record and its proposal MUST carry roles and
channels, never a person's name, address, number or anything that
identifies one — in the header or in the body, and not even a public
officer's, whose office is the role. Who said what is kept where the
conversation happened, outside the archive. The record is public; a person
did not choose to be. The only names that MAY appear are those the house's
card lists as named: its own people, and a client's people whose signed
agreement allows it.

**The organisation, named when it knows.** A record MUST name the
organisation by sector and size until the client has been told, in the
proposal, that the house works in the open. From then on the record MAY
carry its name with the disclosure `open`. A client who asks not to be
named is not named, at any stage, and the record carries `unnamed`. A lost
record MUST go back to sector and size, whatever it said before: why a sale
was lost is public; who lost it to us is not. A tender's authority and a
grant's funder are public bodies that publish their call, and MAY be named
at any stage.

**Minimal, with its basis.** What a record says about an organisation MUST
be the least needed to pursue the opportunity, held under the house's
legitimate interest in offering its services. A lost record is kept as it
stands; it holds nothing that outlives its use.

### A call from a public body

**A call links its notice.** A tender MUST carry the procedure the
authority buys by and — for every procedure but the minor contract, which
has no notice — the address of its notice; a grant MUST carry the
instrument and the address of its call. Both carry the day the call
closes. A tender's value is the estimated value the notice states, before
tax; the house's own price enters the record only once the authority has
published the award.

**A call is read against the house's card, and only what passes is recorded.**
A tender and a grant MUST carry a `## Criteria` table — each requirement of
the call, what it asks, what the house holds, and whether it meets it: yes
or check. A call that fails a requirement MUST NOT be
recorded: what it taught goes to the house's card, and the file is not
kept. The house's chance is computed from the table — high when every row
says yes, medium when any says check.

**A call's verdict rests on its own terms.** A tender and a grant MUST say
where the call was read, terms or notice; a call known only from a summary
is not recorded. A tender MUST say what the buyer really buys, build or
deliver; a resale, or what the house does not make, is not recorded. A
tender whose turnover asked is above the ceiling in the house's card is
not recorded.

**One call, one record.** A tender MUST carry the authority's file
reference; two records with the same file reference and value are one
call listed twice, and one of them goes.

### Where it lives and what it hands on

**In the public archive.** Records MUST be kept in this repository, in the
opportunities series, one file each, whatever their kind; the pipeline is
read from there by anyone. Transparency is the house's rule, and an
opportunity is no exception once nobody's name is in it.

**The pipeline is computed.** Stages, counts, values, the funnel, overdue
and stale records, time per stage, reasons lost and the chance MUST be read
from the records by a tool. No figure about the pipeline is typed by hand
anywhere.

**A won record hands on.** When a sale is won, its value and its agreement
MUST be handed to the ledger, and its need to whoever builds what was sold;
when a grant is won — paid — its amount MUST be handed to the ledger at the
month's close.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| OPP-001 | One file per opportunity | [ISO 15489-1:2016](https://www.iso.org/standard/62542.html), a record is evidence of a transaction (clause unverified) | `machine/packages/sales-kit/pipeline.mjs`: one header per `OPP-*.md` file, named by its id |
| OPP-002 | The header carries the fields the pipeline needs | [ISO 9001:2015](https://www.iso.org/standard/62085.html) 8.2.2, requirements determined before commitment (clause unverified) | `machine/packages/sales-kit/pipeline.mjs`: required fields per kind present; `advance` when pays is advance or milestones; the computed fields refused in the header |
| OPP-003 | The kind and the stage come from the register | `STD-038` | `machine/packages/sales-kit/pipeline.mjs`: kind, stages, reasons, sources, pays, instrument, procedure, read from and object read from the register's tables; stages forward only; the decider's role from `agreed` |
| OPP-004 | Every open record knows its next step | — | `machine/packages/sales-kit/pipeline.mjs`: exactly one `next` line, the last, on an open record and none on a closed one; overdue and stale listed |
| OPP-005 | Every move leaves a line | [ISO 15489-1:2016](https://www.iso.org/standard/62542.html), metadata of the transaction (clause unverified) | `machine/packages/sales-kit/pipeline.mjs`: a `## Timeline` in the register's grammar; one `found`, first; dates ascending; events from the register |
| OPP-006 | Nobody's name | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 5(1)(c), 6; `STD-035` PRV-001; the Oracle's ruling of 2026-10-02: not even a public officer, so no mistake can enter | `machine/packages/sales-kit/pipeline.mjs`: header fields against a closed list; the record and its proposal scanned for an e-mail, a phone, and anything that reads as a person's name — a common first name before a capitalised word, or a courtesy title — unless the card's *Who may be named* lists it; deliberately eager, a false alarm costs a look |
| OPP-007 | Minimal, with its basis | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 5(1)(c), 6(1)(f), recital 47 | by hand, at the review of every record |
| OPP-008 | In the public archive | `PRI-009`; the Oracle's ruling | the tree: `opportunities/` is the one series for every kind; `machine/packages/sales-kit/pipeline.mjs opportunities` runs in CI |
| OPP-009 | The pipeline is computed | `PRI-009` | `machine/packages/sales-kit/pipeline.mjs` is the only source of pipeline figures; the page reads it |
| OPP-010 | A won record hands on | `STD-036` LED-001 | by hand, at the ledger's month close |
| OPP-011 | The organisation, named when it knows | the client's interest; customer-reference practice — a client's name used with its consent, withdrawable; `LCSP` art. 133 (a bidder's own offer is not the authority's to disclose) | `machine/packages/sales-kit/pipeline.mjs`: a name without `disclosure: open`, or any name in a lost record, is reported, a tender or a grant exempt; by hand for the client's wish |
| OPP-012 | A call links its notice | [LCSP](https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902) arts. 63 (the contracting profile), 133 (a bid is confidential until award), 159 (what each procedure asks); [Law 38/2003](https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977) art. 17 (the bases of a call); `STD-038` | `machine/packages/sales-kit/pipeline.mjs`: a tender requires `procedure` and `call` unless the procedure is `minor`; a grant requires `instrument` and `call`; both require `closes` |
| OPP-013 | A call is read against the house's card, and only what passes is recorded | [LCSP](https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902) arts. 87 (turnover at most 1.5 times the value), 90.4 (no past works asked of a company under five years, below the harmonised threshold), 145 (award criteria); [Law 38/2003](https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977) art. 13 (who may be a beneficiary); `STD-038` *The house's chance*; the house's card (`OPS-018`) | `machine/packages/sales-kit/pipeline.mjs`: a tender or a grant requires a `## Criteria` table whose last column is yes or check; a no is refused; the chance computed |
| OPP-014 | A call's verdict rests on its own terms | the Oracle's ruling of 2026-10-01, from a summary that turned a forklift simulator into a 3D platform; LCSP art. 87 (turnover); `STD-038` *Where a call was read*, *What the buyer really buys*; `OPS-018` | `machine/packages/sales-kit/pipeline.mjs`: `read_from` terms or notice; a tender's `object` build or deliver; a `turnover_asked` above the card's ceiling refused |
| OPP-015 | One call, one record | the Oracle's ruling of 2026-10-01: aggregators list one file twice under different titles | `machine/packages/sales-kit/pipeline.mjs`: `file_ref` required on a tender; the same file reference and value in two records is reported |

## Why

A sale kept in one person's head is lost with a holiday, and a pipeline
typed into a sheet is wrong by the second week. One file per opportunity,
with a header a tool can read and a timeline of what happened, is what this
archive already does with every decision: the same discipline, applied to
the one function the house had never written down. The process is the
evidence: nobody moves a card by hand, a line says what happened and the
stage follows. Tenders and grants keep the same file because they answer
the same question — what is coming in, from whom, and what happens next —
and a call the house cannot win teaches the card, not the pipeline. The
record outlives the seller; the figures come from the files; and because no
person is in it, the whole pipeline can be as public as everything else
here.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-038` | The stages of an opportunity | the kinds, stages, events, steps, reasons and call values this record's fields take their values from |
| `STD-040` | A proposal says four things | what the proposal a record points to must contain |
| `STD-035` | Personal data | what may be kept about the people named in a record |
| `STD-036` | One account | where a won record's value goes |
| `OPS-018` | The house's card | what the house holds, against which a call's criteria are read |
| `PRI-009` | The archive is the organisation | why an opportunity is a record and the pipeline is computed from records |

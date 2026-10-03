---
id: "SYS-010"
uid: ""
title: "Selling, as wired today"
type: documentation
subtype: reference
status: active
version: "0.7.2"
created: "2026-09-28T17:00:00+02:00"
updated: "2026-10-03T20:30:00+02:00"
author: "ursa"
owner: "oracle"
tags: [system, reference, sales, pipeline, records, tenders, grants]
section: "Sales and partners"
license: "CC0-1.0"
related: ["STD-038", "STD-039", "STD-040", "PRO-028", "PRO-029", "PRO-030", "PRO-031", "PRO-032", "PRO-033", "OPS-012", "OPS-018", "SYS-008"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SYS-010 — Selling, as wired today

> **Summary:** The pieces an opportunity passes through — the offer record,
> the opportunity records of every kind, the proposals, the house's card,
> the tool that reads them, the agreement and the ledger — with each piece
> marked as wired or not wired yet, and who holds it.
> **Epistemic:** Which parts of the sales system exist today, where each
> lives, and which are still only rules.
> **Pragmatic:** Before opening an opportunity or changing a rule about
> selling, know which component owns it and whether it runs.
> **Audience:** Agents · Oracles

> **A system document is a reference manual, not a plan.** Pieces that do not
> exist yet are listed as *not wired*, with the cut that wires them; nothing
> here says they run until they do.

---

## 1. Scope

How the house brings in work and money from organisations — a sale, a
public tender, a grant, a collaboration, a partner — from the day it is
found to a signed agreement, a formalised contract or money in the bank,
handed to whoever builds and to the ledger. Goods sold by payment link on a
site of the house are another path, wired in the account's reference.
Building what was sold is outside this document.

---

## 2. How it works

### Components

| Component | Holds | Where | State |
|---|---|---|---|
| **The rules** | the kinds and their stages, the record, the proposal | `standards/STD-038`, `STD-039`, `STD-040` | wired, in draft |
| **The steps** | qualifying, proposing, closing a sale; screening and bidding for a tender; applying for a grant | `protocols/PRO-028`, `PRO-029`, `PRO-030`, `PRO-033`, `PRO-031`, `PRO-032` | wired, in draft |
| **The offer record** | what Training is, delivers, costs | `operations/OPS-012` | wired, in draft; one record per offer as others are written |
| **The house's card** | what calls usually ask, what the house holds, what would unlock each gap; the turnover ceiling and what the house does not make, read by the tool | `operations/OPS-018` | wired, in draft |
| **The templates** | one record for every kind, a proposal — every document's header and card, then the opportunity's fields | `machine/templates/OPP-TEMPLATE.md`, `PRP-TEMPLATE.md` | wired; checked with every other template |
| **The tool** | validation; the stage, the next step and the chance computed from each record's timeline and criteria; the pipeline figures | `machine/packages/sales-kit/pipeline.mjs` | wired; runs by hand on any folder |
| **The records** | one file per opportunity of any kind, its timeline inside, its proposals beside it | `opportunities/`, public, nobody's name in them | wired |
| **The agreement** | the signed contract per project | with the company, outside every repository | wired, on paper |
| **The ledger handover** | a won record's value and dates as income lines; a grant once paid | the account's reference | **not wired** — first with the first won record |
| **The report where people see it** | the pipeline by kind — what is due, the timeline, the funnel, what calls ask against what the house holds | `/system/pipeline` reads the records through the tool at every build; `/system/pipeline.md` is the same figures as text | wired — the weekly, quarterly and annual report is a view, not a document |
| **Calls from public bodies** | a tender or a grant, as a record of its kind with its criteria read against the card | the same `opportunities/` records; the alerts on the public procurement platform and the gazettes, and the ROLECE application, outside the archive | wired: only the calls that pass the card are recorded, and what the others taught is in the card. Not yet: European calls |

Agents hold no key to the agreement or the ledger. The tool reads the
register and the card from this repository, so a consumer copying it alone
passes `--register` and `--card` with its own copies. The records are
public by the Oracle's ruling: what identifies a person never enters one,
and the organisation is named only once it has agreed, unless it is a
public body publishing its own call.

### How an opportunity flows

1. A sign of interest, a notice or a call reaches whoever sells. A tender
   or a grant is read against the card first; one that fails is not
   recorded, and its lesson goes to the card (screening; applying for a
   grant).
2. A record of its kind is opened from the template in `opportunities/`, its
   timeline starting with a `found` line and ending with a `next` line
   (qualifying).
3. Each thing that happens is a line in the timeline — what the house did,
   what the other side answered; a line may mark the stage it moves the
   record to, and the `next` line is replaced.
4. A sale: the need heard and written as four things, a proposal written,
   approved and sent, follow-ups, the client's answer (making a proposal,
   closing a sale). A tender: the offer filed, the award read (bidding). A
   grant: applied, granted, justified, paid.
5. Scope, calendar, the agreement under the house's terms; the Oracle
   signs; a `won` line.
6. The handover: the need, map, scope and calendar to whoever builds; the
   value, dates and agreement to the ledger; the lesson to the offer record
   or the card.
7. At any point, `pipeline.mjs <folder>` says whether every record conforms
   and prints the pipeline.

---

## 3. How to verify it

```
$ node machine/packages/sales-kit/pipeline.mjs opportunities
```

- **Rules and templates agree:** `npm test` runs the kit's tests, which read
  the register from the standard and the fields from the template.
- **Every stage is moved by a protocol:** a check in the regime tests
  reads the register and the protocols of the Sales territory.
- **Real records:** CI runs the tool on `opportunities/` on every change.

---

## 4. Accuracy

**Verified against:** the one-pipeline branch on 2026-10-02.

- The records are public in `opportunities/` by the Oracle's ruling of
  2026-09-28 (radical transparency; nobody's name; the organisation named
  once it agrees).
- Sales, tenders, grants, collaborations and partners are one record
  format in one folder by the Oracle's ruling of 2026-10-02; the grant
  series, its standards, its card and its tool were retired into these.
- The price floor of the Training offer is the Oracle's; the offer record
  says *on quote* until he sets it.
- ISO 29993:2017, which the proposal standard follows, was read in its
  public preview (clauses 3–5, the start of 6); the rest is cited by title.

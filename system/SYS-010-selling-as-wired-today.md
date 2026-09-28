---
id: "SYS-010"
uid: ""
title: "Selling, as wired today"
type: documentation
subtype: reference
status: active
version: "0.4.0"
created: "2026-09-28T17:00:00+02:00"
updated: "2026-09-28T23:30:00+02:00"
author: "ursa"
owner: "oracle"
tags: [system, reference, sales, pipeline, records]
territory: "Sales"
license: "CC0-1.0"
related: ["STD-038", "STD-039", "STD-040", "PRO-028", "PRO-029", "PRO-030", "OPS-012", "SYS-008"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SYS-010 — Selling, as wired today

> **Summary:** The pieces a sale passes through — the offer record, the
> opportunity records, the proposals, the tool that reads them, the
> agreement and the ledger — with each piece marked as wired or not wired
> yet, and who holds it.
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

How a service is sold to an organisation: from the first sign of interest
to a signed agreement handed to whoever builds and to the ledger. Goods sold
by payment link on a site of the house are another path, wired in the
account's reference. Building what was sold is outside this document.

---

## 2. How it works

### Components

| Component | Holds | Where | State |
|---|---|---|---|
| **The rules** | the stages, the record, the proposal | `standards/STD-038`, `STD-039`, `STD-040` | wired, in draft |
| **The steps** | qualifying, proposing, closing | `protocols/PRO-028`, `PRO-029`, `PRO-030` | wired, in draft |
| **The offer record** | what Training is, delivers, costs | `operations/OPS-012` | wired, in draft; one record per offer as others are written |
| **The moulds** | an opportunity, a proposal — every document's header and card, then the sale's fields | `machine/templates/OPP-TEMPLATE.md`, `PRP-TEMPLATE.md` | wired; checked with every other mould |
| **The tool** | validation and the pipeline report | `machine/packages/sales-kit/pipeline.mjs` | wired; runs by hand on any folder |
| **The records** | one file per opportunity, its proposals beside it | `opportunities/`, public, nobody's name in them | wired — the folder exists; the first record is the Oracle's |
| **The agreement** | the signed contract per project | with the company, outside every repository | wired, on paper |
| **The ledger handover** | a won record's value and dates as income lines | the account's reference | **not wired** — first with the first won record |
| **The report where people see it** | the pipeline, as three readers see it | `/system/pipeline` reads the records through the tool at every build — what needs a move, the funnel, days per stage, why lost, and what happened by week, month, quarter and year; `/system/pipeline.md` is the same figures as text | wired — the weekly, quarterly and annual report is a view, not a document |

Agents hold no key to the agreement or the ledger. The tool reads the
stages from the register in this repository, so a consumer copying it alone
passes `--register` with its own copy. The records are public by the
Oracle's ruling: what identifies a person never enters one, and the
organisation is named only once it has agreed.

### How an opportunity flows

1. A sign of interest reaches whoever sells; a record is opened from the
   mould in `opportunities/`, stage `lead` (qualifying).
2. It is qualified or declined; the decider's role is written; stage
   `qualified` or `lost`.
3. The need is heard and written as four things; the specialist draws it
   on one page; stage `analysed` (making a proposal).
4. A proposal is written from the mould, reviewed, approved and sent; the
   record points at it; stage `proposed`.
5. Follow-ups on the register's cadence; the client's answer; stage
   `agreed` or `lost` (closing a sale).
6. Scope, calendar, the agreement under the house's terms; the Oracle
   signs; stage `won`.
7. The handover: the need, map, scope and calendar to whoever builds; the
   value, dates and agreement to the ledger; the lesson to the offer record.
8. At any point, `pipeline.mjs <folder>` says whether every record conforms
   and prints the pipeline.

---

## 3. How to verify it

The rules, the tool and the records' folder are in the tree; until the
first record lands, the tool is verified on its fixtures:

```
$ node machine/packages/sales-kit/pipeline.mjs machine/packages/sales-kit/fixtures --today 2026-10-15 --proposals
# Pipeline — 2026-10-15
4 records.
…
```

- **Rules and moulds agree:** `npm test` runs the kit's tests, which read
  the register from the standard and the fields from the mould.
- **Every stage is moved by a protocol:** a check in the regime tests
  reads the register and the protocols of the Sales territory.
- **Real records:** `node machine/packages/sales-kit/pipeline.mjs
  opportunities` — CI runs it on every change; an empty folder is green.

---

## 4. Accuracy

**Verified against:** `main` on 2026-09-28, after the three sales pull
requests.

- The records are public in `opportunities/` by the Oracle's ruling of
  2026-09-28 (radical transparency; nobody's name; the organisation named
  once it agrees). No real record has landed yet.
- The price floor of the Training offer is the Oracle's; the offer record
  says *on quote* until he sets it.
- ISO 29993:2017, which the proposal standard follows, was read in its
  public preview (clauses 3–5, the start of 6); the rest is cited by title.

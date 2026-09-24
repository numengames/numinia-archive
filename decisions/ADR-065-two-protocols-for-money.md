---
id: "ADR-065"
uid: ""
title: "Two protocols for money: putting something on sale, closing the month"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-24T18:10:00+02:00"
updated: "2026-09-24T18:10:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, protocols, economy, payments, ledger]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "PRO-020 (putting something on sale, SAL-001..004) and PRO-021 (closing the month, MON-001..004) are created at 0.1.0, in draft. They are the two acts STD-033 needs someone to perform: a record before any link, record and processor agreeing, a tested path, withdrawal without erasure; and a month closed from documents into lines, people aggregated, provisional until merged, corrected only by new lines, handed to the gestoría by quarter."
related: ["PRO-020", "PRO-021", "STD-033", "SYS-008", "CAN-011", "ADR-064"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-065 — Two protocols for money

> **Summary:** The standard of charges and the account says what every
> charge and every figure must meet. Two acts carry it out: putting
> something on sale and closing the month. This writes both.
> **Epistemic:** Who does what, in what order, when money moves.
> **Pragmatic:** The steps the first charge and the first closed month
> follow.
> **Audience:** Agents · Oracles

---

## 1. Context

`STD-033` (`ADR-064`) rules the charge (`PAY-`) and the account (`LED-`).
`SYS-008` describes the pieces: the processor, whose keys only an Oracle
holds; the gestoría; the documents, kept outside the repository; the
ledger and its views, not wired yet. Nobody has yet written who does what
when something goes on sale or when a month ends. The Oracle asked for both
protocols in the order agreed in session: canon, standard, system, protocols,
then the cost register with simulated figures.

## 2. Decision

**`PRO-020`, *Putting something on sale*.** An agent writes the record and
puts the canon's three questions to it; the Oracle merges it, creates the
product, price, portal and payment link in the processor, and hands the link
back; the agent adds it to the record; both test the whole path in test mode;
the site publishes from the record. Withdrawal marks the record, deactivates
the link and tells subscribers. Rules: record before link (`SAL-001`), record
and processor agree (`SAL-002`), tested before published (`SAL-003`),
withdrawn not erased (`SAL-004`).

**`PRO-021`, *Closing the month*.** The Oracle or the gestoría brings the
invoices, payroll totals by person code and the processor's report; an agent
writes one line per document, one per person code, and the income lines;
updates the homage list as each payer chose; recomputes the views, which
must agree; opens one pull request for the month; the Oracle merges. Each
quarter the agent exports the received-invoices book for the gestoría to
reconcile. Rules: lines never documents (`MON-001`), people aggregated
(`MON-002`), provisional until merged (`MON-003`), a closed month reopens by
a new line (`MON-004`).

`MON-004` is what makes the ledger hold up in an audit: a figure once
published is never edited, only corrected by a dated line that says so.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| One protocol for all money | Two triggers, two actors in the lead, two cadences. `PRO-TEMPLATE`: past a dozen steps the real object is two protocols |
| Let the agent create prices in the processor | `STD-033` PAY-004 and `STD-022`: agents hold no payment key |
| Edit a closed month when an invoice was wrong | Destroys what was published and what an auditor compared against. A correcting line keeps both |
| Close weekly | Invoices and the processor's reports arrive monthly; a weekly close would be mostly provisional |

## 4. Consequences

- **Obliges:** nothing until the first sale and the first closed month.
- **Costs:** two protocols; the reading order gains them.
- **Follow-up:** the cost register on numinia.org with simulated lines,
  which gives `PRO-021` a ledger to write into.
- **Reversal:** withdraw either protocol; the standard still holds.

## 5. Status

Proposed. It takes effect — as a draft — when the Oracle approves the pull
request that carries it.

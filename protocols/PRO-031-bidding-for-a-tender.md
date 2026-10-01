---
id: "PRO-031"
uid: ""
title: "Bidding for a tender"
type: protocol
status: draft
version: "0.2.0"
created: "2026-10-01T15:00:00+02:00"
updated: "2026-10-01T17:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Sales"
tags: [protocol, sales, tenders, public-procurement, bid]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-038", "STD-039", "OPS-018", "PRO-033", "PRO-028", "PRO-029", "PRO-030"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-031 — Bidding for a tender

> **Summary:** What the house does with a public tender, from the notice
> found to the offer filed and the award read: read the criteria against
> the house's card, decide in a day, file the offer the procedure asks for,
> and learn from the award.
> **Epistemic:** What does the house do with a tender it has found, and when does it bid?
> **Pragmatic:** No tender is weighed from memory: the criteria table is
> written first, the chance follows from it, the Oracle decides.
> **Audience:** Agents · Oracles

**Binds:** whoever finds, reads, decides on or files a tender in Numen
Games' name.

---

## 1. Purpose and trigger

A tender is a sale whose client writes the rules in advance and closes the
door on a fixed day. Most are lost on a solvency figure or a missing
register before anyone reads the offer. This protocol reads each tender
against the house's card, so the decision to bid takes a day and the
dossier the rest of the time.

It starts when a notice is found: an alert, a contracting profile, a
technician's request for a minor contract. **Whoever
finds it** opens the record; **whoever sells** reads it; **the Oracle**
decides and signs.

---

## 2. Preconditions

- The house's card for tenders, current (`OPS-018`), and the tender
  screened (`PRO-033`).
- The stages register, with the procedures and the house's chance
  (`STD-038`), and the record standard (`STD-039`).
- Alerts on the procurement platform for the house's classification codes:
  games and software, training, events, cultural and museum services.
- The application to the bidders' register filed; the tax and Social
  Security certificates in force; the representative's electronic
  certificate at hand.

---

## 3. Procedure

1. **Screen it.** Run the screening protocol (`PRO-033`): the terms read,
   the record open with its criteria table, what the buyer really buys and
   the chance. A decline ends there; bid or possible goes on.
2. **Confirm the record for bidding.** Source `tender`, the procedure, the
   notice's address, the estimated value, the closing day as next date,
   stage `lead`, the authority by sector and size.
3. **Re-read the chance against the dossier.** A row still marked check
   that the bid depends on keeps the chance below high, whatever the
   screening hoped.
4. **Resolve the checks that decide it.** Each one is a question with a
   date: read the clause, ask the authority through the platform's
   questions, ask a partner. The record's next action is the first of them.
5. **Decide, a day after the reading.** The Oracle reads the table and
   says bid, bid with a partner, or decline. Bid: stage `qualified`, a
   transition row. Decline: `lost`, reason `we-declined`, the failed row in
   the body. Chance none is declined unless the Oracle says otherwise.
6. **Prepare the offer the procedure asks for.** The European single
   procurement document or the declaration the terms give; the technical
   memoria where judgement criteria score; the price by the formula. With
   a partner, the commitment in writing. Stage `analysed` once the terms
   are read into the four things.
7. **File it before the day.** On the platform, signed with the
   representative's certificate. Stage `proposed`; the receipt is the
   evidence; the next date is the day to look for the award.
8. **Read the award.** Proposed as awardee: stage `agreed`, lodge the
   definitive guarantee, bring the documents the authority asks within its
   days. Contract signed: `won`, and the closing protocol takes it. Another
   bid scored higher: `lost`, `outbid`, with the scores; excluded: `lost`,
   `excluded`, with the reason.
9. **Correct the card.** What the tender taught — a certificate missing, a
   solvency figure, a partner who answered — goes into the card the same
   week.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | The screening protocol's verdict is in the record |
| 2 | The record carries `source: tender`, its procedure and its notice |
| 3 | The chance agrees with the criteria table; the pipeline tool reports no breach |
| 5 | A transition to `qualified`, or `lost` with `we-declined` and the failed row |
| 7 | A transition to `proposed` whose evidence is the platform's receipt |
| 8 | `agreed`, `won`, or `lost` with `outbid` or `excluded` |
| 9 | The card's `updated` date after the award |

---

## 5. Escalation

A tender closing within five working days goes to the Oracle the day it
is found: bid as it stands, or let it go. A tender asking a solvency the
house can only add from a partner goes to the Oracle with the partner named
before step 6. A guarantee the house cannot lodge in cash is raised before
filing, never after the award. A requirement that looks disproportionate to
the object — a turnover above one and a half times the value, past works
asked of a company under five years — is asked about through the
platform's questions before the closing day, not after.

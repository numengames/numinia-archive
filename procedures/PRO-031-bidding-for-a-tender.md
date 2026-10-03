---
id: "PRO-031"
uid: ""
title: "Bidding for a tender"
type: procedure
status: draft
version: "0.3.2"
created: "2026-10-01T15:00:00+02:00"
updated: "2026-10-03T21:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [procedure, sales, tenders, public-procurement, bid, timeline]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-038", "STD-039", "OPS-018", "PRO-033", "PRO-028", "PRO-030"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-031 — Bidding for a tender

> **Summary:** What the house does with a public tender that passed the
> screening, from the record opened to the offer filed and the award read:
> resolve what is still to check, decide in a day, file the offer the
> procedure asks for, and learn from the award.
> **Epistemic:** What does the house do with a tender it has found, and when does it bid?
> **Pragmatic:** No tender is weighed from memory: the criteria table is
> written first, the chance follows from it, the Oracle decides.
> **Audience:** Agents · Oracles

**Binds:** whoever reads, decides on or files a tender in Numen Games'
name.

---

## 1. Purpose and trigger

A tender is a sale whose client writes the rules in advance and closes the
door on a fixed day. Most are lost on a solvency figure or a missing
register before anyone reads the offer. The screening reads each tender
against the house's card and records only the ones that pass; this
procedure takes those to the offer, so the decision to bid takes a day and
the dossier the rest of the time.

It starts when the screening (`PRO-033`) has opened a tender's record.
**Whoever sells** reads and prepares it; **the Oracle** decides and signs.

---

## 2. Preconditions

- The house's card, current (`OPS-018`), and the tender screened
  (`PRO-033`): its record of kind `tender` exists, its criteria every row
  yes or check.
- The register of the stages of an opportunity, with the procedures
  (`STD-038`), and the record standard (`STD-039`).
- The application to the bidders' register filed; the tax and Social
  Security certificates in force; the representative's electronic
  certificate at hand.

---

## 3. Procedure

1. **Confirm the record.** Kind `tender`, the procedure, the call's
   address, the file reference, the estimated value, how it pays, the day
   offers close; the timeline holds the `found` line and a line marked
   `read` for the terms read. The authority is a public body and is named.
2. **Resolve the checks that decide it.** Each row at check that the bid
   depends on is a question with a date: read the clause, ask the
   authority through the platform's questions, ask a partner. The `next`
   line is the first of them; each question asked is an `out` line. A row
   that turns out to fail ends the record: what it taught goes to the card,
   and the file is deleted — a tender the house cannot win is not kept.
3. **Decide, a day after the reading.** The Oracle reads the table and
   says bid, bid with a partner, or let it go. Bid: a line marked
   `bidding`. With a partner: the partner's own record (kind `partner`),
   named in the body. Let it go: a `lost` line, `we-declined`, with the
   reason.
4. **Prepare the offer the procedure asks for.** The European single
   procurement document or the declaration the terms give; the technical
   report where judgement criteria score; the price by the formula. With a
   partner, the commitment in writing.
5. **File it before the day.** On the platform, signed with the
   representative's certificate: an `out` line marked `filed`, the receipt
   named; the `next` line is the day to look for the award.
6. **Read the award.** Proposed as awardee: a `pos` line marked `awarded`;
   lodge the definitive guarantee and bring the documents the authority
   asks within its days. Contract formalised: a `won` line, the house's
   price as the value, and the closing procedure takes it from its step 3
   (`PRO-030`). Another bid scored higher: a `lost` line, `outbid`, with
   the scores; excluded or withdrawn: a `lost` line, `excluded`, with the
   reason.
7. **Correct the card.** What the tender taught — a certificate missing, a
   solvency figure, a partner who answered — goes into the card the same
   week.
8. **Run the pipeline tool.** The record conforms, and its chance agrees
   with its criteria.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | The record carries kind `tender`, its procedure, its call and its file reference; a line marked `read` |
| 2 | Every question asked is an `out` line; no criteria row says no |
| 3 | A line marked `bidding`, or a `lost` line with `we-declined` and its reason |
| 5 | An `out` line marked `filed` naming the platform's receipt |
| 6 | A line marked `awarded`, a `won` line, or a `lost` line with `outbid` or `excluded` |
| 7 | The card's `updated` date after the award |
| 8 | The pipeline tool reports no breach |

---

## 5. Escalation

A tender closing within five working days goes to the Oracle the day it
is found: bid as it stands, or let it go. A tender asking a solvency the
house can only add from a partner goes to the Oracle with the partner named
before step 4. A guarantee the house cannot lodge in cash is raised before
filing, never after the award. A disproportionate requirement — a turnover
above one and a half times the value, past works asked of a young company
below the harmonised threshold — is asked about through the platform's
questions before the closing day.

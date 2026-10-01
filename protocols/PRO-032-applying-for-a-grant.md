---
id: "PRO-032"
uid: ""
title: "Applying for a grant"
type: protocol
status: draft
version: "0.1.0"
created: "2026-10-01T15:00:00+02:00"
updated: "2026-10-01T15:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Funding"
tags: [protocol, funding, grants, subsidies, application]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-045", "STD-046", "STD-038", "OPS-019", "PRO-021"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-032 — Applying for a grant

> **Summary:** What the house does with a grant, a public loan or a prize,
> from the call foreseen to the money in the bank: read the bases against
> the house's card, decide, apply before the day, carry the work, justify
> it, and see it paid.
> **Epistemic:** What does the house do with a call for funding it has found, and when does it apply?
> **Pragmatic:** No call is weighed from memory: the criteria table is
> written first, the chance and the way it pays decide, the Oracle signs.
> **Audience:** Agents · Oracles

**Binds:** whoever finds, reads, decides on, applies for or justifies a
grant, a public loan or a prize in Numen Games' name.

---

## 1. Purpose and trigger

A call for funding opens for fifteen working days once a year, and the
money it gives can cost more than it brings if the house must spend it
before it is paid. This protocol writes each call down the day it is
foreseen, reads it against the house's card, and decides with the way it
pays in view — so no call is missed and none is taken that the house cannot
carry.

It starts when a call is foreseen (last year's call, a funder's plan of
subsidies) or published. **Whoever researches** opens the record;
**whoever applies** reads and prepares it; **the Oracle** decides and signs.

---

## 2. Preconditions

- The house's card for grants, current (`OPS-019`).
- The stages of a grant and the grant record standard (`STD-045`,
  `STD-046`); the house's chance (`STD-038`).
- The tax and Social Security certificates in force; the representative's
  electronic certificate; the company's file in the national subsidies
  database.

---

## 3. Procedure

1. **Open the record when the call is foreseen.** Copy the mould into the
   funding series: the funder, the instrument, the most the house could
   receive, how much is paid in advance, the call's address, the expected
   opening and closing days — marked estimated while the call is not out —
   and the stage `foreseen`.
2. **Read the bases into a table.** One row per condition — who may apply,
   size, age, seat, sector, what the project must be, own contribution,
   how it pays, the score needed — each with what the call asks, what the
   card says, yes, no or check.
3. **Write the chance.** From the rows, by the register: every row yes,
   the money fitting the house's cash and the competition bounded, high;
   competition or one check in the way, medium; a no a change could meet,
   low; a no nothing could meet, none — naming the row.
4. **Watch the gazette.** When the call is published, the stage moves to
   `open`, the days stop being estimated, and the table is read again
   against the published bases.
5. **Decide, within three days of the call opening.** The Oracle reads the
   table and the way it pays. Apply: the next action is the dossier.
   Decline: `declined`, with the reason.
6. **Prepare and file.** The project, its calendar and budget, the
   declarations the bases ask for, the certificates. File on the funder's
   e-office before the day; the receipt is the evidence; stage `applied`.
7. **Answer the funder.** A request to correct the application is
   answered within its days, usually ten.
8. **Read the resolution.** Granted: `granted`, the amount and the
   justification day in the record; a bridge loan against it if the money
   comes after the work. Refused: `denied`, with the funder's reason.
9. **Carry the work and justify it.** Spend as the budget said, keep each
   invoice and its payment, file the justification before its day: stage
   `justified`.
10. **See it paid.** The money in the bank: `paid`, the amount handed to
    the ledger at the month's close. A partial payment or a claim to pay
    back is written in the body.
11. **Correct the card.** What the call taught goes into the card the same
    week.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | A record exists in the funding series with its funder, amount and days |
| 2–3 | The record carries a criteria table and a chance; the funding tool reports no breach |
| 5 | A transition to `applied`'s preparation, or `declined` with its reason |
| 6 | A transition to `applied` whose evidence is the e-office's receipt |
| 8 | `granted` or `denied`, with the resolution's address |
| 9–10 | `justified`, then `paid`, the amount in the month's ledger |
| 11 | The card's `updated` date after the resolution |

---

## 5. Escalation

A call that pays only after justification goes to the Oracle with the
house's cash beside it before step 6: apply with a bridge, or decline. A
call asking an own contribution the house has not set aside goes to the
Oracle at step 5. A request to correct an application, or to pay a grant
back, goes to the Oracle the day it arrives. Two calls of the same funder
in the same year are weighed together: many forbid funding one project
twice.

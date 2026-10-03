---
id: "PRO-032"
uid: ""
title: "Applying for a grant"
type: protocol
status: draft
version: "0.2.3"
created: "2026-10-01T15:00:00+02:00"
updated: "2026-10-03T20:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Finance"
tags: [protocol, grants, public-money, subsidies, application, timeline]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-038", "STD-039", "OPS-018", "PRO-021"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-032 — Applying for a grant

> **Summary:** What the house does with a grant, a public loan, a prize or
> a programme, from the call foreseen to the money in the bank: read the
> bases against the house's card, record only what passes, apply, justify,
> see it paid.
> **Epistemic:** What does the house do with a call for funding it has found, and when does it apply?
> **Pragmatic:** No call is weighed from memory: the criteria table is
> written first, the chance and the way it pays decide, the Oracle signs.
> **Audience:** Agents · Oracles

**Binds:** whoever finds, reads, decides on, applies for or justifies a
grant, a public loan, a prize or a programme in Numen Games' name.

---

## 1. Purpose and trigger

A call for funding opens for fifteen working days once a year, and its
money can cost more than it brings if the house must spend it before it is
paid. This protocol writes each call down the day it is foreseen, reads it
against the house's card, and decides with the way it pays in view.

It starts when a call is foreseen (last year's call, a funder's plan of
subsidies) or published, and a watch (`PRO-035`) or a person brings it.
**Whoever researches** opens the record;
**whoever applies** reads and prepares it; **the Oracle** decides and signs.

---

## 2. Preconditions

- The house's card, current (`OPS-018`).
- The register of the stages of an opportunity — a grant's stages, what a
  funder gives, how it pays, the reasons — and the record standard
  (`STD-038`, `STD-039`).
- The tax and Social Security certificates in force; the representative's
  electronic certificate; the company's file in the national subsidies
  database.

---

## 3. Procedure

1. **Read the bases into a table first.** One row per requirement — who may
   apply, size, age, seat, the project, own contribution, de minimis, how
   it pays, the score needed — each with what the call asks, what the card
   says, and yes or check. A row that fails: no record; the lesson goes to
   the card.
2. **Open the record when the call is foreseen.** From the template, kind
   `grant`: the funder by name, the instrument, the most the house could
   receive as the value, how it pays and the share in advance, the call's
   address and where it was read, the expected days — `estimated: yes`
   while the call is not out — the criteria table, a `found` line and a
   `next` line. The record sits at `foreseen`; the tool computes its
   chance.
3. **Watch the gazette.** When the call is published: a line marked `open`,
   `estimated: no`, and the table read again. A row that now fails ends
   the record: the lesson to the card, the file deleted.
4. **Decide, within three days of the call opening.** The Oracle reads the
   table and the way it pays. Apply: the `next` line is the dossier.
   Decline: a `lost` line with its reason.
5. **Prepare and file.** The project, its calendar and budget, the
   declarations, the certificates. File on the funder's e-office before
   the day: an `out` line marked `applied`, the receipt named.
6. **Answer the funder.** A request to correct the application is answered
   within its days: an `out` line.
7. **Read the resolution.** Granted: a `pos` line marked `granted`, the
   amount and the justification day in the body; a bridge loan if the money
   comes after the work. Refused: a `lost` line with the funder's reason.
8. **Carry the work and justify it.** Spend as the budget said, keep each
   invoice and its payment, file the justification before its day: an
   `out` line marked `justified`.
9. **See it paid.** The money in the bank: a `won` line, the amount handed
   to the ledger at the month's close (`PRO-021`). A partial payment or a
   claim to pay back goes in the body.
10. **Correct the card.** What the call taught goes into the card that
    week. Next year's call is a new record whose `follows` names this one.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1–2 | A record of kind `grant` exists with its funder, value, call, days and a criteria table of yes and check; the pipeline tool reports no breach |
| 3 | A line marked `open`, `estimated: no` |
| 4 | The `next` line names the dossier, or a `lost` line with its reason |
| 5 | An `out` line marked `applied` naming the e-office's receipt |
| 7 | A line marked `granted`, or a `lost` line, with the resolution's address |
| 8–9 | A line marked `justified`, then a `won` line, the amount in the month's ledger |
| 10 | The card's `updated` date after the resolution |

---

## 5. Escalation

A call that pays only after justification goes to the Oracle with the
house's cash beside it before step 5: apply with a bridge, or decline. An
own contribution not set aside goes to the Oracle at step 4. A request to
correct an application, or to pay a grant back, goes to the Oracle the day
it arrives. Two calls of the same funder in one year are weighed together:
many forbid funding one project twice.

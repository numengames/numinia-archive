---
id: "PRO-033"
uid: ""
title: "Screening a tender"
type: protocol
status: draft
version: "0.1.0"
created: "2026-10-01T17:00:00+02:00"
updated: "2026-10-01T17:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Sales"
tags: [protocol, sales, tenders, public-procurement, screening]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-038", "STD-039", "OPS-018", "PRO-031", "PRO-028"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-033 — Screening a tender

> **Summary:** From a tender that reaches the house to a verdict — bid,
> possible or decline — each answer backed by a clause of the authority's
> own terms, before anyone spends an hour on the dossier.
> **Epistemic:** Is this tender one the house should bid for, and which clause says so?
> **Pragmatic:** Read the terms, never the summary; decline on the first
> hard failure; weigh only what survives.
> **Audience:** Agents · Oracles

**Binds:** whoever judges, in Numen Games' name, whether a tender is worth
bidding for — person or agent, on any model.

---

## 1. Purpose and trigger

A summary once turned a forklift and crane simulator, bought whole with its
joysticks, into "a multimedia platform with 3D models". Only the
authority's documents say what it buys; this protocol makes every verdict
rest on them, and stops at the first failure.

It starts when a tender reaches the house. **The screener** — any agent
given the portable skill, or whoever sells — runs it; **the Oracle**
receives the verdict.

---

## 2. Preconditions

- The house's card for tenders, current, with its turnover ceiling and the
  list of what the house does not make (`OPS-018`).
- The values of a tender's record: where it was read, what the buyer really
  buys, the house's chance, and the table for weighing a tender (`STD-038`).

---

## 3. Procedure

1. **Look for the file first.** Search the opportunities series by the
   authority's file number. Already there: read that record and stop, or
   update it; never open a second.
2. **Read the terms, never the summary.** On the authority's own platform —
   the state's, or the region's portal where it has one — download the
   justification memo, the administrative terms' table of characteristics
   and the technical terms, in that order; a portal with no text in its
   pages through its search service (the sales kit's README). No terms: say
   so and stop short of a verdict.
3. **Say what they really buy.** One plain sentence from the technical
   terms, and its value: build, deliver, resale or other. Resale or other
   with no maker as partner: decline.
4. **Run the hard filters, stopping at the first that fails.** The service
   starts on or before the offers close (a listing to verify); a
   certificate the house cannot have in time; a turnover above the card's
   ceiling, or past works it cannot document (none may be asked of a
   company under five years below the harmonised threshold); the offer
   period closed on the official date; points resting on one person's
   record rather than the proposal.
5. **Answer the five questions, each with its clause.** Do we make it or
   only resell it? Do we pass the filters — solvency, registers, the
   platform where offers are filed? Can we deliver in the time, place and
   cash asked — what is paid first, when it is paid, penalties, warranty?
   Can it be won with these criteria — if all is formula, the score at a
   price we can hold, against the abnormally-low threshold? Is it worth it?
6. **Weigh what survives** by the register's table for weighing a tender.
   A secondary physical part needs a partner named now, not after.
7. **Give the verdict.** Bid: five yeses. Possible: only the first or the
   third fails, and a named partner fixes it, by a named day. Decline: the
   second fails, the first with no partner, or the fourth is impossible —
   name the number or clause.
8. **Write it into the record.** `read_from`, `object`, `file_ref`, the
   criteria table, the chance, the figures read. Bid or possible: `lead`,
   next action the decision in `PRO-031`. Decline: `lost`, `we-declined`,
   the clause in the body, so no sweep reads it again. Run the tool.
9. **Tell the Oracle, in Spanish.** What they really buy; the five answers
   with their clauses; the score we could reach; the dates — offers close,
   questions to the authority close, platform and register; the verdict;
   one line: tender · fits · passes · action.
10. **Feed the card.** A title pattern that will always be out of the
    house's domain goes into the card's list, so sweeps skip it.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | No two records share a file reference and value (the tool's check) |
| 2 | The record says `read_from: terms`, or gives no chance above low |
| 3 | The record says `object`; resale or other carries no chance above low |
| 4–7 | The record's criteria table names the clause behind each yes or no |
| 8 | The pipeline tool reports no breach |
| 10 | The card's list changed, or the record says why the pattern stays |

---

## 5. Escalation

A tender closing within five working days goes to the Oracle the day it is
read, as far as the verdict got. A possible goes with the partner named. A
requirement that looks disproportionate — turnover above one and a half
times the value, past works from a company under five years — becomes a
question to the authority before its questions close. Terms not found after
two attempts go to the Oracle; the verdict waits.

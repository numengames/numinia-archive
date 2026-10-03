---
id: "PRO-033"
uid: ""
title: "Screening a tender"
type: protocol
status: draft
version: "0.2.3"
created: "2026-10-01T17:00:00+02:00"
updated: "2026-10-03T20:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [protocol, sales, tenders, public-procurement, screening, card]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-038", "STD-039", "OPS-018", "PRO-031", "PRO-028", "PRO-035"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-033 — Screening a tender

> **Summary:** From a tender that reaches the house to a verdict — bid,
> possible or decline — each answer backed by a clause of the authority's
> own terms. Only a tender that passes is recorded.
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
rest on them and keeps out of the pipeline every tender the house cannot
win.

It starts when a tender reaches the house — from a watch (`PRO-035`), or
by hand. **The screener** — any agent
given the portable skill, or whoever sells — runs it; **the Oracle**
receives the verdict.

---

## 2. Preconditions

- The house's card, current: its requirements, its turnover ceiling and
  the list of what the house does not make (`OPS-018`).
- The values of a tender's record: where a call was read, what the buyer
  really buys, the house's chance, and the table for weighing a tender
  (`STD-038`); the record standard (`STD-039`).

---

## 3. Procedure

1. **Look for the file first.** Search the opportunities series by the
   authority's file number. Already there: read that record and stop, or
   write a line in its timeline; never open a second.
2. **Read the terms, never the summary.** On the authority's own platform
   or regional portal, download the justification memo, the administrative
   terms' table of characteristics and the technical terms, in that order
   (a portal with no text in its pages: the sales kit's README). No terms:
   say so and stop short of a verdict.
3. **Say what they really buy.** One plain sentence from the technical
   terms: build or deliver. A resale, a licence, hardware passed on, or
   what the house does not make, with no maker as partner: decline.
4. **Run the hard filters, stopping at the first that fails.** Each card
   row the terms ask — turnover above the ceiling, team, payment, bidders'
   register, insurance, certification, past works (none may be asked of a
   company under five years below the harmonised threshold); the service
   starting before the offers close (a listing to verify); the offer
   period closed; points resting on one person's record.
5. **Answer the five questions, each with its clause.** Do we make it or
   only resell it? Do we pass the filters? Can we deliver in the time,
   place and cash asked — what is paid first, when, penalties, warranty?
   Can it be won with these criteria, at a price we can hold, against the
   abnormally-low threshold? Is it worth it?
6. **Weigh what survives** by the register's table for weighing a tender.
   A secondary physical part needs a partner named now.
7. **Give the verdict.** Bid: five yeses. Possible: only the first or the
   third fails, and a named partner fixes it by a named day. Decline: the
   second fails, the first with no partner, or the fourth is impossible —
   name the clause.
8. **Bid or possible: open the record.** Kind `tender`, from the template:
   `read_from`, `object`, `file_ref`, the procedure, the call, the closing
   day, how it pays, and the criteria table, every row yes or check with
   its clause. The timeline: `found`, a line marked `read`, and a `next`
   line — the decision in `PRO-031`. Run the tool; it computes the chance.
9. **Decline: record nothing.** A tender that fails a hard requirement is
   not written into the opportunities series. What it taught goes to the
   card: the requirement's row, or a title pattern in the list of what the
   house does not make, so the next sweep skips it.
10. **Tell the Oracle, in Spanish.** What they really buy; the five answers
    with their clauses; the reachable score; the dates — offers close,
    questions close, platform and register; the verdict; one line: tender ·
    fits · passes · action.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | No two records share a file reference and value (the tool's check) |
| 2 | The record says `read_from: terms` or `notice`, never a summary |
| 3 | The record says `object: build` or `deliver` |
| 4–7 | The record's criteria table names the clause behind each row; no row says no |
| 8 | A `found` line, a line marked `read`, a `next` line; the pipeline tool reports no breach |
| 9 | No record for a declined tender; the card changed, or says why it stays |

---

## 5. Escalation

A tender closing within five working days goes to the Oracle the day it is
read, as far as the verdict got. A possible goes with the partner named. A
disproportionate requirement becomes a question to the authority before
its questions close. Terms not found after two attempts go to the Oracle;
the verdict waits.

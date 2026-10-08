---
id: "PRO-035"
uid: ""
title: "Watching for opportunities"
type: procedure
status: draft
version: "0.2.0"
created: "2026-10-02T21:00:00+02:00"
updated: "2026-10-08T12:40:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [procedure, sales, watch, tenders, grants, feed, automation]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-017", "STD-038", "STD-039", "OPS-018", "PRO-033", "PRO-032", "PRO-028"]
derived_from: "PRI-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-035 — Watching for opportunities

> **Summary:** From the places where opportunities are published to the
> Oracle's yes or no: a watch sweeps them, weighs what could fall, writes
> it unreviewed to its feed, and nothing enters the archive until the
> Oracle accepts it and a reviewed change writes its record.
> **Epistemic:** How does an opportunity published somewhere reach the Oracle's decision without entering the archive unreviewed?
> **Pragmatic:** Sweep, weigh, write to the feed, show it, let the Oracle
> decide, open the record by a pull request.
> **Audience:** Agents · Oracles

**Binds:** whoever keeps a watch for Numen Games — person, agent or
program, on any machine.

---

## 1. Purpose and trigger

Calls close in fifteen days and are published in a dozen places; a watch
that only told the Oracle in a chat left no trace, and one that wrote
straight into the archive would let a program decide what the house holds.
This procedure keeps the two apart: the watch finds and weighs, the Oracle
decides, a reviewed change records (the bot-proposes, person-accepts pattern
of dependency updates; [Willison, git scraping](https://simonwillison.net/2020/Oct/9/git-scraping/)).

It starts on the watch's schedule. **The watcher** — the agent the watch is
given to, today Kairos — sweeps, weighs and writes to the feed; **the
Oracle** decides; **whoever sells** opens the record.

---

## 2. Preconditions

- The house's card, current: what it makes and does not make, what calls
  usually ask and what it holds (`OPS-018`).
- The watch's verdicts and which reach the feed: the register's table *A
  watch's verdict* (`STD-038`).
- The feed: a public repository of the part it serves, written without
  review (`STD-017` AUT-069); for opportunities, `numinia-archive-feed`.

---

## 3. Procedure

1. **Sweep.** The watcher reads each place on the watch's list at the
   watch's cadence — today public tenders and grants in Spain and the
   European Union, every half hour — and keeps only what is new: not seen
   before, not already a record in the opportunities series.
2. **Triage by the card.** Only what the house can take alone, with what
   it holds today, is read. Drop unread what `OPS-018` says it does not
   make.
3. **Read the terms of what survives**, nearest close first, as the
   screenings do: a tender's by `PRO-033` steps 2 to 7, a grant's bases by
   `PRO-032`. A notice or an aggregator's summary can never give a high
   verdict.
4. **Give the verdict** from the register: high, medium, low, or none. Name the clause that decides it and
   what the house would have to do, by when.
5. **Write to the feed.** A high or a medium goes to the feed, with its
   blocker and next step; a low or a none stays in the watcher's own
   memory, outside any repository. Before writing, the same name check a record passes
   (`STD-039` OPP-006): an item that reads as a person's name is held back
   and reported. A call the archive already holds carries its record's id.
6. **The archive shows it, unreviewed.** The pipeline page (`/system/pipeline`)
   reads the feed when built, checks names and closing days again, and
   shows it apart from the records, never in the funnel.
7. **Tell the Oracle** what is new and high or medium, or closes within
   seven days, in Spanish: what it is, the money, the close, why, what to do. A
   run with nothing new sends nothing.
8. **The Oracle decides.** Yes: it goes on. No: nothing is written in the
   archive; if the reason is a requirement, it goes to the card.
9. **Open the record by a pull request.** Whoever sells writes the record
   (`STD-039`) — a tender from `PRO-033` step 8, a grant from `PRO-032`, a
   sale from `PRO-028` step 1 — and opens a pull request the Oracle
   reviews. Only its merge puts the opportunity in the archive; the feed
   then links it.
10. **Retune when the Oracle reopens a drop.** The cause goes first to the
    card (a requirement, a word of what the house does not make), then to
    the watch's filters, the same day, and the change is said to him.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1–4 | The feed's item names its source, its address, the verdict and the clause behind it |
| 5 | No low and no none in the feed; no person's name (the archive's check finds none) |
| 6 | The pipeline page's *Unreviewed* list matches the feed, less what closed |
| 8 | A yes has a record or a pull request; a no has none |
| 9 | Every record that came from a watch entered by a merged pull request |
| 10 | The card or the filter changed the day a drop was reopened |

---

## 5. Escalation

A source that fails three runs in a row goes to the Oracle. A call closing
within five working days goes to him the day it is read, as far as the
verdict got. An item held back for a name goes to him with the field that
tripped; the watcher never rewrites it to pass. If the feed cannot be
written, the watch stops writing and says so; it never writes to the
archive instead.

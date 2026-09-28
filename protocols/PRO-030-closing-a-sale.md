---
id: "PRO-030"
uid: ""
title: "Closing a sale"
type: protocol
status: draft
version: "0.1.0"
created: "2026-09-28T16:00:00+02:00"
updated: "2026-09-28T16:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Sales"
tags: [protocol, sales, follow-up, agreement, handover, win-loss]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-038", "STD-039", "STD-036", "LEG-002", "PRO-029", "PRO-021"]
derived_from: "CAN-011"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-030 — Closing a sale

> **Summary:** From a proposal sent to a signed agreement or a closed door:
> follow up on a cadence, take the client's yes, fix the scope and the
> calendar, sign under the house's terms, hand the work to whoever builds
> and the money to the ledger, and write down why it was won or lost.
> **Epistemic:** How does a sent proposal end — signed, handed over and learnt from, or closed with a reason?
> **Pragmatic:** No proposal waits without a date; no signature without the
> scope fixed; no closing without its lesson.
> **Audience:** Agents · Oracles

**Binds:** whoever follows up, negotiates, signs or hands over a sale in
Numen Games' or Numinia's name.

---

## 1. Purpose and trigger

A proposal sent and then forgotten is the commonest way the house loses. A
signature on a scope nobody fixed is the second. And a sale closed without a
sentence on why teaches the next one nothing. This protocol closes all
three.

It starts when an opportunity reaches `proposed`. **Whoever sells** follows
up and negotiates; **the legal specialist** reads any clause the client
changes; **the Oracle** signs; **whoever builds** and **whoever keeps the
ledger** receive the handover.

---

## 2. Preconditions

- The opportunity record at `proposed`, pointing to the proposal sent, with
  a next date.
- The house's terms and conditions, which name the written agreement a
  project needs (`LEG-002`).
- The stages register's stale days and its list of reasons (`STD-038`).

---

## 3. Procedure

1. **Follow up on the register's cadence.** At the next date, one contact;
   if silence, a second a fortnight later. Each one is a transition row's
   evidence and a new next date. After the second silence: `lost`, reason
   `silence`, and a last courteous line to the client.
2. **Take the answer.** A yes in writing moves the record to `agreed`. A no
   moves it to `lost` with the reason the client gave, from the register's
   list, and their words in the body. A "later" sets a next date and stays
   at `proposed`.
3. **Fix the scope and the calendar.** From the proposal, the definitive
   scope: what is delivered, when, what the client provides and by when,
   how acceptance is declared. The one-page map becomes the plan. Nothing
   the proposal did not contain enters without a new price.
4. **Write the agreement.** From the house's terms and the fixed scope.
   Any clause the client changes is read by the legal specialist before
   anyone signs. The price is the proposal's; a change is the Oracle's,
   written in the record.
5. **Sign.** The Oracle signs. The record moves to `won`: the agreement's
   path, the closing date, the value confirmed.
6. **Hand over.** To whoever builds: the record's Need, the map, the scope
   and the calendar — the protocol for building starts there. To whoever
   keeps the ledger: the value, the invoicing dates and the agreement, so
   the month closes on it (`PRO-021`).
7. **Learn.** Won or lost, in the record's body: what the client asked that
   the offer record did not answer, what they wanted that the house did not
   offer, and why they chose as they did. What changes the offer goes to
   the offer record, the client unnamed. A won case is written as a case
   the next proposal may show.
8. **Run the pipeline tool.** The record conforms, and the report shows the
   sale where it ended.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | Every follow-up is a transition row with its date; nothing at `proposed` has a past next date |
| 2 | Stage `agreed`, or `lost` with a reason from the register |
| 3–4 | The scope and calendar exist; changed clauses carry the legal specialist's reading |
| 5 | Stage `won`, agreement path, closing date |
| 6 | Whoever builds has the Need, map, scope and calendar; the ledger has the value and dates |
| 7 | The record's body holds the lesson; the offer record changed, or a case was written |

---

## 5. Escalation

A clause the legal specialist will not accept stops the signature until the
Oracle and the client settle it. A client who asks, after agreeing, for
more than the proposal contained is answered with a revised proposal, never
with silent extra work. A price the client pushes below the house's floor
is the Oracle's to accept or refuse, in writing. A won record whose value
has not reached the ledger by the month's close is raised at that close.

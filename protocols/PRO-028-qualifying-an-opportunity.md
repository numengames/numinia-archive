---
id: "PRO-028"
uid: ""
title: "Qualifying an opportunity"
type: protocol
status: draft
version: "0.1.1"
created: "2026-09-28T16:00:00+02:00"
updated: "2026-09-28T19:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Sales"
tags: [protocol, sales, opportunity, qualification, pipeline]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-038", "STD-039", "PRO-029", "PRO-030", "CAN-002"]
derived_from: "CAN-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-028 — Qualifying an opportunity

> **Summary:** From the first sign that an organisation might buy something
> of ours to a record that says pursue or decline: who they are, whether
> what they need is what we make, who can sign, and what happens next.
> **Epistemic:** How does a sign of interest become an opportunity worth pursuing, or a door closed with a reason?
> **Pragmatic:** Open the record, ask the fit question, name the decider,
> decide — in days, not weeks.
> **Audience:** Agents · Oracles

**Binds:** whoever hears of a chance to sell something in Numen Games' or
Numinia's name, and whoever decides whether to pursue it.

---

## 1. Purpose and trigger

Most of the house's lost sales were never sales: a conversation that went
nowhere because nobody wrote it down, or effort spent on something we could
not make. This protocol puts every sign of interest into a record on the
day it arrives, and decides within two weeks whether it is worth pursuing.

It starts when an organisation shows a need — a form, an email, a
conversation at an event, a referral — or when the Oracle chooses one to
approach. **Whoever hears of it** opens the record; **whoever sells** (the
Oracle today, or whom he names) qualifies it and decides.

---

## 2. Preconditions

- The opportunities series, where every record lives in public; the mould
  of the record from the sales kit.
- The record of the offer this would sell, published; without one, there is
  nothing to qualify against.
- The stages register at hand for the stage, its evidence and its stale
  days (`STD-038`).

---

## 3. Procedure

1. **Open the record, that day.** Copy the mould; fill the organisation by
   sector and size, the source, the contact's role and channel, what they
   said in their words, and a next action with its date. Stage `lead`. The
   record is public: nobody's name, e-mail or phone in it, and the
   organisation unnamed until it agrees (`STD-039`).
2. **Ask the fit question.** Is what they need learnt by walking it, or made
   of people participating? If they need a course, a video or a report,
   say so and decline: `lost`, reason `not-a-fit`, and point them
   somewhere honest. The house sells what it makes.
3. **Find who signs and from where.** In one conversation or two: the role
   of the person who can approve the spend, and the budget line it would
   come from. Neither found after two attempts: `lost`, reason
   `no-decider` or `no-budget`.
4. **Decide to pursue.** Whoever sells weighs the fit, the decider and the
   house's capacity to deliver in the time asked, and decides. Pursue:
   stage `qualified`, the decider's role in the header, a transition row,
   and the next action is the needs analysis. Decline: `lost`, reason
   `we-declined`, and the reason in a sentence in the body.
5. **Run the pipeline tool.** The record conforms, or the tool says which
   rule it breaks; fix it before the day ends.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1 | A record exists in the opportunities series, opened the day the sign arrived, stage `lead` |
| 2–3 | The body holds the fit answer, the decider's role and the budget line — or the record is `lost` with its reason |
| 4 | Stage `qualified` with a transition row, or `lost`; the next action names the needs analysis |
| 5 | The pipeline tool reports no breach on the record |

---

## 5. Escalation

A need that fits but exceeds what the house can deliver alone — a size, a
technology, a deadline — goes to the Oracle before pursuing, with the
partner or the refusal it would take. A need that would rehearse something
harmful or unlawful is declined at step 2 and told to the legal specialist.
A record stale in `lead` past the register's days is decided that week:
pursue or `lost`, never left open.

---
id: "DBT-026"
uid: ""
title: "Pay per use runs on example figures and on choices left for later"
type: documentation
status: active
version: "0.1.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T08:24:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [debt, payments, pay-per-use, tariff, hosting]
license: "CC-BY-4.0"
severity: medium
severity_reason: "every price of a world is an example until measured use sets it, and nothing is sold in live mode before it is set"
detected: "2026-10-13T08:24:00+02:00"
visibility: "public"
visibility_reason: "the figures will be public prices; a client and a reviewer may read which are still examples"
opened_by: "ursa"
related: ["ADR-070", "MIS-169", "MIS-161", "MIS-177", "MIS-184", "DBT-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# DBT-026 — Pay per use runs on example figures

> **Summary:** The Oracle asked for the mechanical parts of pay per use to
> be built first and for what is judgement to wait as debt (`ADR-070`).
> This entry lists that judgement: every figure the till starts with as an
> example, each choice left for later, and who sets each one.
> **Epistemic:** Which prices and rules of a paid world are still guesses,
> and what would turn each into a decision.
> **Pragmatic:** Read it before going live: each row is set in the tariff
> screen (`MIS-184`), decided in a record, or left on purpose.
> **Audience:** Agents · Oracles · Clients

---

## 1. The defect

Counted on 2026-10-13 from the design `ADR-070` records. The figures are
written in the till as tariff data, so changing one needs no code.

| What | Example today | Who sets it, and from what |
|---|---|---|
| Price of a day running and of a day stopped, for a world of 2 GB | 0.60 and 0.05 euros without VAT; two cheaper lists were weighed: 0.45 and 0.03, like Hermes Cloud, and 0.35 and 0.03 | the Oracle, from the cost model (`MIS-161`) and measured use |
| Other sizes | none yet | the Oracle, with the reservation of `MIS-163` |
| The event boost | 1.80 euros a day for 4 cores and 8 GB, about 0.28 of cost | the Oracle |
| Minimum top-up and quick amounts | 10 euros; 10, 20, 50 and 100 | the Oracle; below 10, Stripe's fixed fee passes 5 % |
| Balance needed to create or start | two days running | the Oracle |
| Low-balance warning by default | 3 days at the current pace | the Oracle; each account changes its own |
| Notice before a price rise | 30 days | the Oracle, once counsel answers (`DBT-022`) |
| Days a world is kept at zero | 90, decided on 2026-10-13 | a rule the Oracle can change |
| The two final notices before a deletion | 14 and 2 days before | the Oracle |
| Refunding unused balance on request | not built; the ledger's lots allow it | the Oracle, after weighing stolen cards, top-up and refund loops, a corrective invoice and VAT per country, the fee Stripe keeps and the hand work, with counsel and the gestoría |
| A monthly spending cap, automatic top-ups, monthly plans with included balance, payment with a crypto wallet | not built, as in Nous Portal | the Oracle, with the first five clients; crypto after the gestoría |
| Metronome instead of our ledger | not used | the Oracle, if there are hundreds of clients |

One truth weighs on every price row: while machines are rented by the
month, a stopped world saves the house nothing. The stopped price is low on
purpose, so nobody deletes a world for lack of money; the running price
must carry a half-empty machine.

---

## 2. Evidence

The cost of a running world, measured on 2026-10-12: an OVH VPS-2 costs
8.49 euros a month without VAT and with no commitment, and holds three
worlds of 2 GB, so 2.83 euros a month each, about 0.09 euros a day with the
machine full and 0.19 at half. A world's copies in S3 in Paris cost about
0.03 euros a day for 2 GB. Stripe takes 1.5 % and 0.25 euros per European
card, 0.4 % for the invoice and 0.5 % for its tax service: 0.49 euros of a
10-euro top-up, 0.73 of 20, 1.45 of 50. Hermes Cloud charges 0.51 dollars a
day running and 0.03 stopped for 2 GB and 2 vCPU.

---

## 3. Closure condition

> **Closes when:** each row holds a figure the Oracle set from measured use,
> a piece built and live, or a decision to leave it out, linked here.

---

## 4. Cost of leaving it open

A price set by guess either loses money on every half-empty machine or
drives away the first clients; a notice period or a refund rule written
without counsel may not hold before a consumer. Until the price rows are
set, nothing is sold in live mode (`MIS-169`).

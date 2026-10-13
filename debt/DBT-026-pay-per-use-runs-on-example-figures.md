---
id: "DBT-026"
uid: ""
title: "Pay per use runs on starting figures and on choices left for later"
type: documentation
status: active
version: "0.2.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T14:17:50+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [debt, payments, pay-per-use, tariff, hosting]
license: "CC-BY-4.0"
severity: medium
severity_reason: "the starting prices rest on a cost model and a load test on a workstation, not yet on an OVH machine or on measured use, and nothing is sold in live mode before they are confirmed"
detected: "2026-10-13T08:24:00+02:00"
visibility: "public"
visibility_reason: "the figures will be public prices; a client and a reviewer may read which are still starting figures"
opened_by: "ursa"
related: ["ADR-070", "MIS-169", "MIS-161", "MIS-163", "MIS-177", "MIS-184", "DBT-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# DBT-026 — Pay per use runs on starting figures

> **Summary:** The Oracle asked for the mechanical parts of pay per use to
> be built first and for what is judgement to wait as debt (`ADR-070`).
> This entry lists that judgement: every figure the till starts with —
> the three sizes' starting prices, approved on 2026-10-13, among them —
> each choice left for later, and who sets each one.
> **Epistemic:** Which prices and rules of a paid world are still guesses,
> and what would turn each into a decision.
> **Pragmatic:** Read it before going live: each row is set in the price
> room (`MIS-184`), decided in a record, or left on purpose.
> **Audience:** Agents · Oracles · Clients

---

## 1. The defect

Counted on 2026-10-13 from the design `ADR-070` records, and brought up to
date the same afternoon with the Oracle's decisions on the prices. The till
keeps the figures as tariff data, so changing one needs no code; the three
sizes enter it when the Oracle first publishes from the price room.

| What | Today | Who sets it, and from what |
|---|---|---|
| Prices per day by size | Small, up to 20 people at once: 0.20 running and 0.02 stopped; Medium, up to 50: 0.75 and 0.05; Large, up to 100: 1.80 and 0.10 — euros without VAT, the starting figures the Oracle approved on 2026-10-13. The 2 GB size of the till's first version (0.60 and 0.05) stays until a version leaves it out | the Oracle, from the price room (`MIS-184`), as measured use teaches |
| What each size holds | people at once measured on a workstation, not yet on an OVH machine, whose cores are slower; today any admin of a world can raise its limit of people | a load test on an OVH machine, Large first; the machine setting the limit and each size's reservation (`MIS-163`) |
| The event boost | 1.80 euros a day: a day of Large | the Oracle |
| Copies | full nightly zips, 21 held: 3.60 euros a month for a Large world with 8 GB of files, against 4.90 for its share of the machine; copies that keep the files once and the database each night would cost about twenty times less | `MIS-158`, `MIS-160` |
| Minimum top-up and quick amounts | 10 euros; 10, 20, 50 and 100 | the Oracle; below 10, Stripe's fixed fee passes 5 % |
| Balance needed to create or start | two days running | the Oracle |
| Low-balance warning by default | 3 days at the current pace | the Oracle; each account changes its own |
| Notice before a price rise | 30 days | the Oracle, once counsel answers (`DBT-022`) |
| Days a world is kept at zero | 90, decided on 2026-10-13 | a rule the Oracle can change |
| A world asleep because it is empty | pays as running, decided on 2026-10-13 (`ADR-070`) | decided |
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

The pricing study of 2026-10-13. An OVH VPS-3 (6 vCore, 12 GB, 100 GB)
costs 12.24 euros a month without VAT and with no commitment, the cheapest
core of the range; keeping 1 GB and half a core for the machine itself, it
holds 22 Small worlds, 11 Medium or 5 Large. In a load test on a
workstation the same day, an empty world used 0.4 % of a core and about
250 MB; its processor grew with the square of the people inside — about
0.00003 × N² cores — while its memory stayed between 110 and 140 MB from 1
to 175 people, and 50, 100 and 125 people moved comfortably with a quarter,
half and one core. With the machines half full, full nightly copies in S3,
a 20-euro average top-up and Stripe as the seller (Managed Payments: 1.5 %
and 0.25 euros per European card plus 3.5 %, the route chosen that day for
the payments), a day costs the house 0.06 euros for Small, 0.23 for Medium
and 0.65 for Large, support included: gross margins of 71, 69 and 64 %. An
example fleet of 20 Small, 10 Medium and 3 Large always running leaves 327
euros a month, 65 % of its revenue, before salaries and taxes.

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

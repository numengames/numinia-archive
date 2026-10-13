---
id: "MIS-187"
uid: ""
title: "The norms follow the pay-per-use decision: prices without VAT for companies, the tariff instead of a price typed in the record, the account with teams and the till, team roles apart from ranks, and the offer record in test"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T08:24:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [payments, standards, procedures, offers, vat, pay-per-use]
license: "CC0-1.0"

priority: high
effort: S
executor: agent
assigned_to: null
completed: null

parent_mission: "MIS-169"
requires_oracle_approval: true
context: "2026-10-13T08:24:00+02:00"
paths: [standards/STD-033-every-charge-delivers-something.md, procedures/PRO-020-putting-something-on-sale.md, system/SYS-008-the-account.md, standards/STD-003-platform-ranks.md]
related: ["ADR-070", "MIS-169", "MIS-188", "STD-033", "PRO-020", "SYS-008", "STD-003", "STD-036", "OPS-014", "OPS-016"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-187 — The norms follow the pay-per-use decision

> **Summary:** `ADR-070` amends what the house's norms say about a charge.
> This mission writes it into them: `STD-033` lets companies see prices
> without VAT and lets a price per day come from a dated tariff; `PRO-020`
> gains the steps for something sold by a tariff; `SYS-008` gains the
> till, its database and a Stripe customer per account; `STD-003` says a
> team role is not a rank; and an offer record for "3D worlds — pay per
> use" goes into `operations/` in test state, before anything is created in
> Stripe's live mode.
> **Epistemic:** Which rules of a charge change with pay per use, and which
> hold as they were.
> **Pragmatic:** A reviewer checks a top-up or a tariff against the norms,
> not against a decision record alone.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **`STD-033`:** the whole price, tax included, binds what a consumer sees;
  a company sees prices without VAT, which the payment page adds before
  paying (PAY-002). A price per day may come from a dated tariff the offer
  record points to, read by every site that shows it (PAY-003). PAY-004 and
  PAY-005 hold as they are.
- **`PRO-020`:** the steps for something sold by a tariff — the record
  names the good and the tariff; the Oracle creates the top-up prices with
  VAT included for consumers and without for companies; the homage
  questions do not apply to hosting.
- **`SYS-008`:** the till, its database, a Stripe customer per account, the
  till's restricted key, how a top-up flows into the ledger and how a
  month's top-ups and consumption reach the house's one account.
- **`STD-003`:** one line — a team role is not a rank and grants nothing
  outside its team. The wider rewrite of ranks and roles belongs to the
  identity design, still open with the Oracle.
- **The offer record** "3D worlds — pay per use" in `operations/`: what a
  day running and a day stopped deliver per size, that downloading is free,
  what happens at zero, that paid balance is not refunded except where the
  law obliges, and the tariff it reads; state *test*.

Out of scope: the legal texts, which counsel writes (`DBT-022`).

---

## 2. Acceptance criteria

- [ ] `STD-033` says that a company sees prices without VAT, added on the
  payment page before paying, while a consumer sees the whole price, and
  that a price per day may come from a dated tariff the record points to.
  Today: PAY-002 asks for every price "tax included", and PAY-003 has
  sites read the price from the record.
- [ ] `PRO-020` holds the steps for something sold by a tariff and says the
  homage questions do not apply to hosting. Today: its steps create one
  product and price from a price written in the record.
- [ ] `SYS-008` lists the till, its database, a Stripe customer per account
  and the till's restricted key among its components, with how a top-up
  flows. Today: it leaves out "bespoke services Numen Games quotes and
  invoices one by one" and knows no team.
- [ ] `STD-003` says that a team role is not a rank and grants nothing
  outside its team. Today: `grep -c -i 'team role'` over `STD-003` returns
  0.
- [ ] An offer record for "3D worlds — pay per use" exists in `operations/`
  in test state and points to the till's tariff. Today: no record prices a
  world.

---

## 3. Closure

*(Fill when the mission closes.)*

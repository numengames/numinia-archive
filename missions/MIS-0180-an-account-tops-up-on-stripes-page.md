---
id: "MIS-180"
uid: ""
title: "An account tops up on Stripe's page: one Stripe customer per account, each country's tax computed and the tax ID collected, invoices on Stripe's portal, and every Stripe event counted once"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T08:24:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [payments, stripe, vat, invoices, pay-per-use, numinia-web]
license: "CC0-1.0"

priority: high
effort: M
executor: hybrid
assigned_to: null
completed: null

parent_mission: "MIS-169"
depends_on: ["MIS-177", "MIS-179"]
requires_oracle_approval: true
context: "2026-10-13T08:24:00+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md, standards/STD-033-every-charge-delivers-something.md, standards/STD-044-every-purchase-ends-in-thanks.md, system/SYS-008-the-account.md]
related: ["ADR-070", "MIS-169", "MIS-177", "MIS-179", "MIS-183", "MIS-184", "STD-033", "STD-044", "STD-022", "SYS-008", "DBT-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-180 — An account tops up on Stripe's page

> **Summary:** A top-up happens on Stripe's own page, from 10 euros. Each
> account — personal or team — is one Stripe customer, so its billing
> details stay for the next top-up and its invoices sit together on
> Stripe's portal. Stripe computes each country's tax and collects a
> company's tax ID, and issues one invoice per top-up. The till learns of a
> payment only from Stripe's events, each verified and counted once, and
> holds a key that cannot refund.
> **Epistemic:** What proves a top-up, how VAT splits it, and which Stripe
> permissions the till holds and which it lacks.
> **Pragmatic:** The balance rises within a minute of paying, whether or
> not the payer comes back to our page.
> **Audience:** Agents · Oracles · Technical reviewers

---

## 1. Scope

- **The Oracle, in Stripe's test mode first** (`STD-033` PAY-004,
  `PRO-020`): creates the top-up products and prices — for consumers with
  VAT included and for companies without, 10, 20, 50 and 100 euros and one
  "customer chooses" price from 10 —; turns on Stripe Tax, tax-ID
  collection and the customer portal; creates a restricted key that may
  only write customers, Checkout Sessions and portal sessions and read
  prices and invoices; creates the webhook endpoint; and sets the key and
  the endpoint's secret as the till's secrets (`STD-022`).
- **The till:**
  - one Stripe customer per account, created at its first top-up;
  - a Checkout Session per top-up, for one of the Oracle's prices, with an
    invoice after payment, tax computed automatically, the tax ID collected
    for a company, the terms accepted in Stripe's checkbox with our text
    beside it, the account's id as the client reference, and the return to
    numinia.com's thanks page (`STD-044`);
  - the customer portal for billing details and invoices;
  - only owners, administration and finance may top up (`MIS-179`).
- **Stripe's events,** each verified by its signature within five minutes
  and counted once by its id: a completed payment writes one lot with its
  net amount, its VAT and its invoice (`MIS-177`); a refund an Oracle makes
  in Stripe's dashboard and a dispute each write a line that takes the
  amount off the balance; a payment not yet confirmed shows as pending,
  never as failed, the way Hermes words it.
- **The ledger counts net euros** (`ADR-070`): for a consumer, "+10 euros"
  is 8.26 of balance and 1.74 of Spanish VAT; for a Spanish company, 10.00
  of balance and 2.10 of VAT added on Stripe's page.

Out of scope: automatic top-ups and monthly plans (`DBT-026`); refunds on
request; the screens (`MIS-183`); the monthly cross-check (`MIS-184`).

---

## 2. Acceptance criteria

- [ ] In test mode, "+10 euros" from a personal account writes one lot of
  8.26 euros with 1.74 of VAT and its Stripe invoice, and "+10 euros" from a
  team with a Spanish tax ID writes one lot of 10.00 euros with 2.10 of VAT
  added on Stripe's page. Today: Stripe holds one test payment link, the
  Backer's (`SYS-008`), and nothing for a world.
- [ ] The same Stripe event delivered twice writes one line, and an event
  with a wrong signature or older than five minutes writes none. Today: no
  service of the house receives Stripe's events.
- [ ] A refund made in Stripe's dashboard and a dispute each write one line
  that names its lot and takes the amount off the balance. Today: no lot
  exists.
- [ ] An account keeps one Stripe customer across its top-ups, and its
  billing details and invoices open on Stripe's customer portal from the
  till. Today: no account exists.
- [ ] The till's README lists its Stripe key's permissions, and a refund
  attempted with that key is refused in test mode. Today: no key exists.

---

## 3. Closure

*(Fill when the mission closes.)*

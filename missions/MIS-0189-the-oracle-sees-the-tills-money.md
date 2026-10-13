---
id: "MIS-189"
uid: ""
title: "The Oracle sees the till's money: collected against consumed in a month, the client balances, the month's cross-check with Stripe, and every adjustment by hand with who and why"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-13T14:17:50+02:00"
updated: "2026-10-13T14:17:50+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [payments, ledger, reconciliation, pay-per-use, numinia-web]
license: "CC0-1.0"

priority: medium
effort: M
executor: agent
assigned_to: null
completed: null

parent_mission: "MIS-169"
depends_on: ["MIS-177", "MIS-180"]
requires_oracle_approval: false
context: "2026-10-13T14:17:50+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md, standards/STD-036-one-account.md, system/SYS-008-the-account.md]
related: ["ADR-070", "MIS-169", "MIS-177", "MIS-180", "MIS-184", "STD-036", "SYS-008", "DBT-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-189 — The Oracle sees the till's money

> **Summary:** A screen for Oracles only, beside the price room
> (`MIS-184`): what came in and what was consumed in a month, the client
> balances — paid and not yet consumed — whether the ledger matches
> Stripe's report for that month, the accounts and their state, and
> adjustments by hand, each with who and why. It was the first half of
> `MIS-184` until the price room was built on its own, and it waits for
> Stripe (`MIS-180`).
> **Epistemic:** Whether the till's money matches the payment processor's.
> **Pragmatic:** The Oracle closes each month knowing the ledger and Stripe
> agree, and corrects a balance by hand with the reason written.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **The month:** for a chosen month, collected (net and VAT), consumed, the
  client balances (collected and not yet consumed: advances, whose account
  the gestoría confirms, `DBT-022`), and the cross-check with Stripe's
  balance report for the same month — it matches, or each difference is
  listed.
- **The accounts,** with their state: normal, low, at zero, kept for free,
  deleted.
- **An adjustment by hand** needs a reason and writes a line with who and
  why (`MIS-177`); nobody but an Oracle can make one.
- These figures feed the house's one account, where each month's top-ups
  and consumption enter as lines (`STD-036`, `SYS-008`).
- Dates are the ledger's UTC days, and every hour is shown in the viewer's
  own zone, computed from UTC (`ADR-070`).

Out of scope: refunds, which an Oracle makes in Stripe's dashboard
(`ADR-070`); the prices, which are `MIS-184`.

---

## 2. Acceptance criteria

- [ ] The till screen shows, for any month, collected, consumed and client
  balances, and says whether the ledger matches Stripe's report for that
  month, listing each difference. Today: the till's ledger exists
  (`MIS-177`), no top-up can reach it before Stripe is wired (`MIS-180`),
  and no screen reads it.
- [ ] An adjustment by hand needs a reason and writes a line naming who and
  why, and the till refuses one from anyone who is not an Oracle. Today:
  the ledger takes an adjustment only with who and why, and nothing can
  write one.

---

## 3. Closure

*(Fill when the mission closes.)*

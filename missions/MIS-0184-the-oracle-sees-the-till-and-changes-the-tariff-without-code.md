---
id: "MIS-184"
uid: ""
title: "The Oracle sees the till and changes the tariff without code: collected against consumed, client balances, the month's cross-check with Stripe, every manual adjustment with who and why, and dated tariff changes with their history"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T08:24:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [payments, ledger, tariff, reconciliation, pay-per-use, numinia-web]
license: "CC0-1.0"

priority: medium
effort: M
executor: agent
assigned_to: null
completed: null

parent_mission: "MIS-169"
depends_on: ["MIS-177", "MIS-180"]
requires_oracle_approval: false
context: "2026-10-13T08:24:00+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md, standards/STD-036-one-account.md, system/SYS-008-the-account.md]
related: ["ADR-070", "MIS-169", "MIS-177", "MIS-180", "MIS-182", "MIS-183", "STD-036", "SYS-008", "DBT-026"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-184 — The Oracle sees the till and changes the tariff without code

> **Summary:** Two screens for Oracles only. *Till:* what came in and what
> was consumed in a month, the client balances — paid and not yet consumed
> — whether the ledger matches Stripe's report for that month, the accounts
> and their state, and adjustments by hand, each with who and why.
> *Tariff:* the prices and rules in force, with and without VAT, a change
> scheduled with its start date, and the history of every version. Prices
> change without code, as the Oracle asked (`ADR-070`).
> **Epistemic:** Whether the till's money matches the bank's processor, and
> which tariff charged which day.
> **Pragmatic:** The Oracle sets a price or a rule in a minute, and closes
> each month knowing the ledger and Stripe agree.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **Till:** for a chosen month, collected (net and VAT), consumed, the
  client balances (collected and not yet consumed: advances, whose account
  the gestoría confirms, `DBT-022`), and the cross-check with Stripe's
  balance report for the same month — it matches, or each difference is
  listed. The accounts, with their state: normal, low, at zero, kept for
  free, deleted. An adjustment by hand needs a reason and writes a line
  with who and why (`MIS-177`); nobody but an Oracle can make one.
- **Tariff:** the version in force without VAT and with Spanish VAT; a new
  version with its start date, prices per size and the rules (`MIS-177`);
  a cut applies from the next day; a rise that would start before the
  notice period ends is refused with the first date allowed, and its mail
  goes out the day it is scheduled (`MIS-182`); the history lists every
  version with who scheduled it and when.
- These figures feed the house's one account, where each month's top-ups
  and consumption enter as lines (`STD-036`, `SYS-008`).

Out of scope: refunds, which an Oracle makes in Stripe's dashboard
(`ADR-070`); the figures themselves (`DBT-026`).

---

## 2. Acceptance criteria

- [ ] The till screen shows, for any month, collected, consumed and client
  balances, and says whether the ledger matches Stripe's report for that
  month, listing each difference. Today: no ledger exists.
- [ ] An adjustment by hand needs a reason and writes a line naming who and
  why, and the till refuses one from anyone who is not an Oracle. Today: no
  ledger exists.
- [ ] An Oracle schedules a tariff version with its start date; a rise that
  would start before the notice ends is refused with the first date
  allowed; the history lists every version with who scheduled it. Today:
  no tariff exists, and numen.games/hosting gives its fee "in the
  proposal".

---

## 3. Closure

*(Fill when the mission closes.)*

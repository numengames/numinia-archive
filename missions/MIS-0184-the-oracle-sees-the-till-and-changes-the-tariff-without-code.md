---
id: "MIS-184"
uid: ""
title: "The Oracle sets the worlds' prices from a room of his own: a calculator shows what each size costs the house and what it leaves, and Publish schedules a dated tariff version in the till"
type: mission
status: in-progress
version: "0.3.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T14:17:50+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [payments, tariff, pricing, pay-per-use, numinia-web]
license: "CC0-1.0"

priority: high
effort: M
executor: agent
assigned_to: "ursa"
started: "2026-10-13T14:17:50+02:00"
completed: null

parent_mission: "MIS-169"
depends_on: ["MIS-177"]
requires_oracle_approval: false
context: "2026-10-13T14:17:50+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md, debt/DBT-026-pay-per-use-runs-on-example-figures.md]
related: ["ADR-070", "MIS-169", "MIS-177", "MIS-161", "MIS-163", "MIS-182", "MIS-183", "MIS-189", "DBT-026"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-184 — The Oracle sets the worlds' prices from a room of his own

> **Summary:** A room for Oracles in LAP's Management group on numinia.com.
> It shows the tariff in force, with and without VAT; a calculator that
> works out, from dated costs, what a day of each size costs the house and
> the margin it leaves, and what an example fleet leaves in a month; and
> Publish, which writes a new tariff version in the till with its start
> day, who published it and why. Prices will change often, as the Oracle
> asked: they change here, without code (`ADR-070`).
> **Epistemic:** What each size really costs the house and leaves it, and
> which tariff charged which day.
> **Pragmatic:** The Oracle changes a price in a minute, sees its margin
> before publishing, and every version stays in the history with its
> reason.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **The room:** under LAP's Management group, for Oracles only. The till's
  door it uses is reachable only from numinia.com's own Worker, through a
  service binding, and that Worker lets only an Oracle's session through:
  the till keeps no public address.
- **In force:** the version that charges today, its start day, who
  published it and why; each size's price per day running and stopped,
  without VAT and with Spanish VAT, and a month running with VAT; a later
  version already scheduled, if there is one.
- **The calculator:** the costs it reads, each with the day it was read and
  its source — OVH machines without commitment, copies in S3 in Paris,
  Stripe's fees with Stripe as the seller or with Numen as the seller, the
  ECB's dollar rate. Per size: the people it holds at once, the files
  included, and what it reserves on its machine. The assumptions the Oracle
  moves: the machine, how full the machines are, how much processor is
  promised, full or incremental copies, the average top-up, the team's hour
  and the support minutes a month. For each size, what a day costs the
  house piece by piece and the gross margin. For an example fleet, the
  month's revenue, machines, copies, support, Stripe, fixed costs and an
  amount for voice, video and AI in the worlds, and the profit. Beside
  them, what comparable services charge for a world a month.
- **Publish:** the prices per size and the rules (`MIS-177`) become a new
  version with its start day, who published it, why, and the calculator's
  assumptions at that moment. A cut or a new size starts the next day at
  the earliest; a rise is refused before its notice ends, with the first
  day allowed (`ADR-070`); a size that worlds are still charged for cannot
  be left out; versions are only ever added.
- **History:** every version with its start day, who published it, when
  and why, and which one is in force; any of them can be brought back into
  the calculator.
- Dates are the till's UTC days; every hour is shown in the viewer's own
  zone (`ADR-070`).

### What this room leaves to others

- The till's money — collected against consumed, the client balances, the
  month's cross-check with Stripe, adjustments by hand — is `MIS-189`,
  after Stripe (`MIS-180`).
- The mail announcing a rise to every account with worlds is `MIS-182`;
  until it exists, the room says that nobody is notified.
- The figures are the Oracle's (`DBT-026`); the clients' screens that show
  them are `MIS-183`.

---

## 2. Acceptance criteria

- [ ] An Oracle opens the price room under Management and sees the version
  in force with and without VAT, what a day of each size costs the house
  piece by piece and the margin it leaves, and an example fleet's monthly
  profit, every cost with the day it was read and its source. Today: the
  calculator is a prototype outside the sites, and numinia.com has no
  price room.
- [ ] Publish writes a new version in the till with its start day, who
  published it, why and the calculator's assumptions; a cut or a new size
  starts the next day at the earliest; a rise is refused before its notice
  ends, with the first day allowed; a size still charged to worlds cannot
  be left out. Today: the till holds the one version its first migration
  wrote, and nothing can add another.
- [ ] The history lists every version with who published it, when, why,
  and which one is in force. Today: no screen shows the till's versions.
- [ ] Only numinia.com's Worker reaches the till's door, and only for an
  Oracle's session: nobody else, from the internet or signed in, reads or
  publishes the tariff. Today: the till has no door, no route and no
  binding.

---

## 3. Closure

*(Fill when the mission closes.)*

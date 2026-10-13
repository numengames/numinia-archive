---
id: "MIS-188"
uid: ""
title: "numen.games/hosting sells the World plan from 10 euros: 'Start with 10 €' leads to numinia.com, the prices per day come from the tariff in force, and the dedicated plan and events stay by proposal"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T08:24:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [hosting, offers, pay-per-use, numengames-web, sales-page]
license: "CC0-1.0"

priority: medium
effort: S
executor: agent
assigned_to: null
completed: null

parent_mission: "MIS-169"
depends_on: ["MIS-177", "MIS-187"]
requires_oracle_approval: true
context: "2026-10-13T08:24:00+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md]
related: ["ADR-070", "MIS-169", "MIS-177", "MIS-183", "MIS-187", "STD-033"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-188 — numen.games/hosting sells the World plan from 10 euros

> **Summary:** numen.games/hosting sells every plan by request, proposal and
> invoice, with "the taxes apart". With pay per use, its shared plan —
> *Mundo* — can be bought on the spot: "Start with 10 €" leads to
> numinia.com, where the person signs in, tops up and creates a world. The
> prices per day the page shows come from the till's tariff in force, never
> typed in the page. The dedicated plan and events stay by proposal.
> **Epistemic:** Which plan is bought on the spot and which by proposal,
> and where the page's prices come from.
> **Pragmatic:** A client who reads the page can have a world within
> minutes, without a call.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **The *Mundo* plan** gains "Start with 10 €", leading to numinia.com's
  sign-in, a new account's top-up and *New world* (`MIS-183`).
- **Prices per day,** running and stopped, read from the till's tariff in
  force; the page's test, which forbids a typed price, now allows only a
  price read from the tariff.
- **The page's questions** say what happens at zero, that paid balance is
  not refunded except where the law obliges, and that a world is
  downloaded for free at any time.
- The dedicated plan and events keep "how it is contracted": request, call,
  proposal, invoice. The page still never names the engine, and the front
  of numen.games still sells one thing: participatory experiences for
  events.

Out of scope: numinia.com's screens (`MIS-183`); live mode, which waits for
`MIS-169`'s conditions.

---

## 2. Acceptance criteria

- [ ] The *Mundo* plan on numen.games/hosting offers "Start with 10 €", which
  leads to numinia.com's top-up for a new account. Today: the page says
  "Cuota mensual por plan, con los impuestos aparte. Te la damos por escrito
  en la propuesta" (numengames-web at `6da7bf2`).
- [ ] The prices per day the page shows come from the till's tariff in
  force, and a test fails if a price figure is typed in the page's content.
  Today: a test forbids any price figure, because none was decided.
- [ ] The page's questions say what happens at zero, that paid balance is
  not refunded except where the law obliges, and that a world is downloaded
  for free at any time. Today: no question on the page mentions a balance.

---

## 3. Closure

*(Fill when the mission closes.)*

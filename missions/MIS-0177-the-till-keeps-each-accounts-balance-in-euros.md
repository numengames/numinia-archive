---
id: "MIS-177"
uid: ""
title: "The till keeps each account's balance in euros as lines that are only ever added: each top-up a lot spent oldest first, each world's day a line, and the tariff as dated versions"
type: mission
status: todo
version: "0.2.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T10:15:09+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [payments, ledger, pay-per-use, hosting, cloudflare, numinia-web]
license: "CC0-1.0"

priority: high
effort: M
executor: agent
assigned_to: null
completed: null

parent_mission: "MIS-169"
requires_oracle_approval: false
context: "2026-10-13T08:24:00+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md]
related: ["ADR-070", "MIS-169", "MIS-178", "MIS-179", "MIS-180", "STD-036", "DBT-026"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-177 — The till keeps each account's balance in euros

> **Summary:** The first piece of `ADR-070`, and the house's first
> database: a service apart from the website — the till — where each
> account's balance is the sum of lines that are only ever added. A top-up
> is a lot, spent oldest first; a world's day is a line; a correction is a
> new line. The prices live in the same database as tariff versions with a
> start date, and every line keeps the version it was charged with.
> **Epistemic:** What a balance is made of, and why it can always be
> walked back to the payment and the day behind each euro.
> **Pragmatic:** The nightly close (`MIS-178`), the top-ups (`MIS-180`) and
> every screen read one ledger.
> **Audience:** Agents · Oracles · Technical reviewers

---

## 1. Scope

- **The service.** A Cloudflare Worker with its own database (D1), built
  for its trial as a folder of numinia-web beside the site, with its own
  tests in the repository's CI. It holds no key yet; Stripe (`MIS-180`) and
  its signing keys (`MIS-181`) come later.
- **Accounts,** the least the ledger needs: an id, personal or team, and
  when it was created. People, roles and invitations are `MIS-179`.
- **Lines,** in euro cents, with no VAT: the ledger counts net money and
  the screens add VAT for consumers (`ADR-070`).
  - *top-up:* a lot — its net amount, its VAT, and the ids of its Stripe
    payment and invoice;
  - *world-day:* the account, the world, the UTC date, minutes running
    and minutes stopped, the size, the tariff version and the amount,
    rounded once to the cent;
  - *adjustment:* who made it and why;
  - *refund* and *chargeback:* the lot they come from.
- **Lots,** spent oldest first, so the remainder of each top-up is known at
  any date — what a refund on request or an expiry would need one day
  (`DBT-026`).
- **The tariff,** as versions with a start date: per size, a price for a
  day running and one for a day stopped; and the rules — event boost,
  minimum top-up, quick amounts, minimum balance to create a world (in days
  running), days a world is kept at zero, the notice before a rise and the
  default warning, in days. The figures are the design's examples
  (`DBT-026`).

Out of scope: who may read or change what (`MIS-179`); the nightly close
(`MIS-178`); any screen (`MIS-183`, `MIS-184`).

---

## 2. Acceptance criteria

- [ ] The till runs as its own Worker with its own database, and its tests
  run in numinia-web's CI. Today: numinia-web at `5811252` holds two apps,
  `com` and `store`, and no Wrangler file binds a database
  (`git grep -c d1_databases` returns nothing).
- [ ] The database refuses to change or delete a ledger line — an update or
  a delete fails with an error — and a correction is a new line that names
  the line it corrects. Today: no ledger exists.
- [ ] An account's balance is the sum of its lines, and each lot's remainder
  is known at any date: a test with three top-ups, a week of world-days and
  a refund of the middle lot gives every remainder to the cent, oldest lot
  spent first. Today: no lot exists.
- [ ] A tariff version starts on its date: a test schedules a new version
  and every line charged before it keeps its version and its amount.
  Today: no tariff exists; numen.games/hosting gives its fee "in the
  proposal".
- [ ] Every library file of the till is covered 100 % by lines, functions
  and statements and 95 % by branches, numinia-web's bar for its
  libraries. Today: the till has no library.

---

## 3. Closure

*(Fill when the mission closes.)*

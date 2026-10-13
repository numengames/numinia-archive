---
id: "MIS-183"
uid: ""
title: "Clients see their money on numinia.com: the account switcher, each world's price per day, the balance and how long it lasts, usage by day with its CSV, invoices, the team and the thanks page — in five languages"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T08:24:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [payments, pay-per-use, ux, accessibility, i18n, numinia-web]
license: "CC0-1.0"

priority: high
effort: L
executor: agent
assigned_to: null
completed: null

parent_mission: "MIS-169"
depends_on: ["MIS-177", "MIS-178", "MIS-179", "MIS-180", "MIS-181"]
requires_oracle_approval: false
context: "2026-10-13T08:24:00+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md, standards/STD-044-every-purchase-ends-in-thanks.md, standards/STD-033-every-charge-delivers-something.md]
related: ["ADR-070", "MIS-169", "MIS-179", "MIS-180", "MIS-184", "MIS-186", "STD-033", "STD-044", "SYS-014"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-183 — Clients see their money on numinia.com

> **Summary:** The screens a client lives in, built from the clickable
> prototype the Oracle reviewed with the design of `ADR-070`: switching
> between the personal account and each team; each world with its price per
> day and what it spent; the balance and how many days it lasts; usage by
> day, by world or by concept, with its table and its CSV; invoices; the
> team with its roles; and a thanks page after paying. Consumers see VAT
> included, companies do not, and every refusal says what to do next.
> **Epistemic:** What a client sees before and after paying, and the words
> for each refusal.
> **Pragmatic:** A client knows what a world costs before creating it, and
> never meets a bare "error".
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **The switcher:** the personal account and each team the person belongs
  to, top right, as in Nous Portal.
- **My worlds:** each world with its state, size, price per day running and
  stopped and what it spent this month, and Stop, Start, Download and Code
  as the role allows (`MIS-179`). *New world* shows the price per day and
  how many days the balance lasts before anyone signs; with too little
  balance it is off and says how much is missing.
- **Balance:** the balance as the big figure, how many days it lasts at
  today's pace, today's spend as provisional, the month's, the quick top-up
  amounts and another amount, the warning threshold, and the movements.
- **Usage:** one bar per day for 7, 30 or 90 days, by world or by concept,
  today hatched as provisional; the same figures as a table for whoever
  cannot see the colours; a CSV download (`PRI-012`).
- **Invoices:** one per top-up with its base, VAT and total, opened from
  Stripe; billing details changed on Stripe's portal (`MIS-180`); monthly
  statements as CSV, which are not invoices.
- **Team:** the personal account explained; in a team, its people and roles,
  invitations, and the role table.
- **Thanks** (`STD-044`): thanks first, what happens now, where the receipt
  is and whom to write to — with no amount, no email address and no search
  indexing.
- **Tax view:** a consumer sees every amount with VAT included and a company
  without, from the same ledger figures (`ADR-070`).
- **Every refusal has its way out,** like Hermes' billing policy: no
  permission (which role, who has it), too little balance (how much, for
  how many days), payment not confirmed ("pending — check your Stripe mail
  before repeating it", never "failed"), card declined (Stripe's words),
  machine full, machine silent (retry the same request), session expired
  (sign in), and an unknown refusal shown as the till wrote it.
- The site's rules hold: five languages, `data-metric` on every control,
  accessibility tests, 3D always lazy, the weight budgets.

Out of scope: the Oracle's screens (`MIS-184`); the worlds room's signing
flow for team members, which comes with the machine's side (`MIS-186`).

---

## 2. Acceptance criteria

- [ ] A person sees each world's price per day running and stopped and what
  it spent this month, and, before creating one, its price per day and how
  many days the balance lasts; with too little balance *New world* is off
  and says how much is missing. Today: the worlds room serves Oracles only
  and shows no price (`/lap/admin/worlds`).
- [ ] A consumer sees every amount with VAT included and a company sees it
  without, on every screen, from the same ledger figures. Today: no screen
  shows a balance.
- [ ] Usage shows a bar per day for 7, 30 or 90 days, by world or by
  concept, today marked as provisional, and the same figures as a table and
  as a CSV. Today: no usage is recorded.
- [ ] Each refusal in the scope shows its own words and its way out, and an
  unknown one shows the till's text as it came. Today: the till does not
  exist.
- [ ] The screens exist in the site's five languages, every control carries
  its `data-metric`, and the accessibility tests pass on each. Today: none
  of the screens exists.

---

## 3. Closure

*(Fill when the mission closes.)*

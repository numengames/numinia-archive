---
id: "MIS-169"
uid: ""
title: "A world is paid for by the day from a prepaid balance: an account tops up on Stripe's page, each night charges each of its worlds by state and size, and at zero the worlds stop and nothing is lost"
type: mission
status: in-progress
version: "0.3.0"
created: "2026-10-12T13:27:54+02:00"
updated: "2026-10-13T08:24:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [virtual-worlds, hosting, payments, stripe, ledger, pay-per-use, teams, fleet]
license: "CC0-1.0"

priority: high
effort: XL
executor: hybrid
assigned_to: "ursa"
completed: null

depends_on: ["MIS-177", "MIS-178", "MIS-179", "MIS-180", "MIS-181", "MIS-183", "MIS-185", "MIS-186"]
requires_oracle_approval: true
context: "2026-10-13T08:24:00+02:00"
started: "2026-10-13T08:24:00+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md, standards/STD-033-every-charge-delivers-something.md, procedures/PRO-020-putting-something-on-sale.md, system/SYS-008-the-account.md]
related: ["ADR-070", "MIS-161", "MIS-163", "MIS-158", "MIS-160", "MIS-159", "MIS-176", "STD-033", "STD-036", "STD-044", "PRO-020", "SYS-008", "DBT-022", "DBT-026"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-169 — A world is paid for by the day from a prepaid balance

> **Summary:** numen.games/hosting sells a world's hosting by request,
> proposal and invoice, and no site takes a payment for a world. This
> mission makes a world payable the way Hermes Cloud is: an account — a
> person's own or a team's — tops up a balance in euros on Stripe's page,
> each night each of its worlds costs one line by its state and size, and
> at zero the worlds stop and nothing is lost (`ADR-070`). It carries the
> whole route; each piece is a child mission.
> **Epistemic:** What a world is sold as, what proves it was paid, and the
> order in which the pieces land.
> **Pragmatic:** A client gets a world without a call, sees what it costs
> before creating it, and leaves with it whole.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **What is sold:** a world's day, running or stopped, priced by the size
  its machine reserves for it; a running day costs far more than a stopped
  one. Downloading a world is always free (`PRI-012`). The event boost is a
  day at a larger size.
- **Who buys:** people from their personal account, with VAT included in
  every price they see, and teams, which may be companies with a tax ID
  and see prices without VAT (`ADR-070`). Everything runs in Stripe's test
  mode until the terms in `DBT-022` are written.
- **The pieces, each a child mission:**

| Mission | Piece | Where |
|---|---|---|
| `MIS-177` | the ledger: a balance in euros as lines only ever added, top-ups as lots spent oldest first, the tariff as dated versions | the till, a service apart (numinia-web) |
| `MIS-178` | each night's close, first with a pretend meter, and what happens at zero | the till |
| `MIS-179` | personal accounts and teams: four roles, invitations by email | the till |
| `MIS-180` | top-ups on Stripe's page: one customer per account, tax per country, invoices, events counted once | the till and Stripe |
| `MIS-181` | the three things the till signs for machines | the till |
| `MIS-182` | the mails: balance low, at zero, a world kept for free, before a deletion, before a price rises | the till and Amazon SES |
| `MIS-183` | the client's screens on numinia.com | numinia-web |
| `MIS-184` | the Oracle's till and tariff screens | numinia-web |
| `MIS-185` | a machine counts each world's day and gives it to the till | numinia-assets |
| `MIS-186` | a machine obeys a world's owners and the till | numinia-assets and the worlds room |
| `MIS-187` | the norms follow the decision, and the offer record in test | the archive |
| `MIS-188` | numen.games/hosting sells the World plan from 10 euros | numengames-web |

### Standards selected (`ADR-070`)

| Area | Selected | Why |
|---|---|---|
| How a world is charged | a prepaid balance in euros, charged daily in arrears by state and reserved size | what Hermes Cloud does; predictable for the client, measurable by the machine |
| Where the balance lives | a ledger of our own where lines are only added, crossed with Stripe every month | Stripe's credits apply only when an invoice is finalised and cannot stop a world at zero |
| How it is paid | Stripe Checkout Sessions for top-up prices an Oracle created, one Stripe customer per account, the customer portal for details and invoices | the payment company's page (`STD-033` PAY-005), billing details kept per account |
| Who collects the tax | Stripe Tax computes it per country and collects the tax ID; Numen declares it | the gestoría confirms (`DBT-022`) |
| What proves a payment | Stripe's events, verified and counted once, never the browser | `STD-044` CEL-008 |
| Who may act on a world | four team roles in each tenant; owners alone for the delicate; the till's signed capabilities for the daily and for money | tenant-scoped roles, as Nous Portal and GitHub use; a capability is a signed permission of limited reach |

Out of scope: monthly plans with included balance, automatic top-ups, a
monthly spending cap and payment by crypto wallet, which wait for the first
five clients (`DBT-026`); the dedicated plan and events, which stay by
proposal and invoice; Metronome.

---

## 2. Acceptance criteria

- [ ] In Stripe's test mode the whole path runs once, end to end, and its
  evidence is linked here: a person signs in, creates a team and invites a
  second person; tops up as a company, with a tax ID and VAT added on
  Stripe's page, and from a personal account as a consumer, with VAT
  included; creates a world after seeing its price per day and how many
  days the balance lasts; the nightly close charges its days; the Oracle
  schedules a tariff change and the next day is charged at the new version
  while earlier days keep theirs; the balance reaches zero, and that night
  the world stops after saving and shows as kept for free; a top-up and one
  signature start it again; the world is downloaded; every top-up has its
  invoice in Stripe, and the month's ledger matches Stripe's report. Today:
  no site takes a payment for a world, and no account, team or balance
  exists — numinia-web at `5811252` holds two apps, `com` and `store`, and
  no database binding in any Wrangler file.
- [ ] The first world bought in Stripe's live mode is bought after a machine
  refuses a world that does not fit (`MIS-163`), after each world's copy
  leaves its machine every night (`MIS-158`, `MIS-160`), and after counsel's
  hosting terms and the gestoría's answers are recorded in `DBT-022`.
  Today: no world has been bought, and none of the three holds.

---

## Execution log

**2026-10-12 — the route to the first paid world, measured against
numen.games/hosting as published that day.** The order of work below is the
Oracle's; it selects none of the standards above.

- **The page already sells by hand:** request, call, proposal, then "You
  accept the proposal and pay the first month. We send the invoice." The
  first payment needs no payment integration. It needs a price per plan,
  set from real measurements (`MIS-161`), and the page's promises made true
  on the fleet.
- **Promises kept today:** an address with HTTPS; the full export
  (*Download*); security updates (the machine's unattended upgrades);
  servers in France (open-1 is an OVH server in Strasbourg); monthly, with
  no lock-in.
- **Not kept yet:** reserved power (`MIS-163`); a copy every night and going
  back to any saved night (`MIS-158`, `MIS-160`, `MIS-164`); the event boost
  (`MIS-172`); "how many people came in and when the peak was", and the
  monthly summary (`MIS-162`); the client's own domain without anyone
  logging into the machine (`MIS-171`).
- **Before a client's world shares a machine:** each world its own admin
  code (`MIS-170`), and each world's `/status` closed to outsiders
  (`MIS-166`) — today it hands anyone every visitor's id, name and live
  position.
- **The contract:** a proposal to a client also needs the Data Processing
  Agreement that `LEG-002` promises — the client as controller, Numen as
  processor, OVH and AWS as sub-processors. No template exists in the
  archive, and item 20 of `DBT-022` records that no data processing
  agreement is on file with any provider.
- **The order, chosen by the Oracle:** `MIS-170` with `MIS-173` (the
  pinned recipe) → `MIS-158` and `MIS-160` → `MIS-164` → `MIS-162` →
  `MIS-163` → `MIS-166` (its `/status` part), `MIS-171` and `MIS-172` →
  `MIS-161` and the first invoice. Stripe comes after the first clients.

**2026-10-12, evening — the Oracle reorders.** "For operations we first need
the zips, and then to be able to buy the service through the payment
gateway": `MIS-164` first, then this mission, before the first clients.
`MIS-164` merged that night (numinia-assets #22, numinia-web #107).

**2026-10-13 — opened and rewritten at 0.3.0, by `ADR-070`.** The Oracle
took the design of a payment like Nous Portal's: consumers as well as
companies; prices changed without code, their figures estimated later;
teams with their own billing details; paid balance not refunded except
where the law obliges, and never expiring; at zero, worlds stop and are
kept 90 days for free; the mechanical parts first and the judgement as debt
(`DBT-026`). What changed from 0.2.0, which git keeps: a monthly price per
size became a daily charge from a prepaid balance; "organisations only, or
people too" became both; the birth of a paid world is signed by its owner
with the till's "has credit" beside it, not by an Oracle; and "when the
subscription ends" became the rules at zero. The pieces moved to the child
missions in the table above.

---

## 3. Closure

*(Fill when the mission closes.)*

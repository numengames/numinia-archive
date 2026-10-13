---
id: "ADR-070"
uid: ""
title: "A world is paid for by the day from a prepaid balance in euros, kept in a ledger of our own: Stripe takes the money and the tax, teams share a balance, and only a world's owners sign what cannot be undone"
type: adr
status: draft
version: "0.3.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T14:17:50+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [decisions, adr, payments, stripe, ledger, pay-per-use, hosting, virtual-worlds, teams]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "Hosting a world is paid for by the day from a prepaid balance in euros that each account, a person's own or a team's, tops up on Stripe's page. Each night a ledger of our own, in a service apart from the website, charges each world by its state and its size at the tariff in force. At zero the running worlds stop after saving and nothing is deleted for 90 days. Paid balance is not refunded except where the law obliges, and it does not expire. Consumers see prices with VAT, companies without. Teams have four roles, and only a world's owners sign what cannot be undone."
amends: "STD-033"
related: ["MIS-169", "STD-033", "STD-036", "STD-044", "PRO-020", "SYS-008", "STD-003", "ADR-069", "SYS-014", "DBT-022", "DBT-025", "DBT-026", "MIS-161", "MIS-163", "MIS-158", "MIS-176", "MIS-167", "MIS-184"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-070 — A world is paid for by the day from a prepaid balance

> **Summary:** An account tops up a balance in euros on Stripe's page, and
> every night each of its worlds costs one line: a price for a day running,
> a much smaller one for a day stopped. The balance lives in a ledger of our
> own, in a service apart from the website. At zero the worlds stop and
> nothing is lost. People and teams buy alike; consumers see VAT included.
> **Epistemic:** `MIS-169` left open how a world is charged, who collects
> the tax, what proves a payment and who may sign a paid world's birth. This
> record answers the four, from how Hermes Cloud and five other services
> charge, and from what Stripe's own credits can and cannot do.
> **Pragmatic:** The till can be built and tested with a pretend meter
> before any machine changes. What is judgement — the figures, the notice
> before a rise, refunds on request — is data or debt (`DBT-026`), not code.
> **Audience:** Agents · Oracles · Technical reviewers

---

## 1. Context

numen.games/hosting sells a world's hosting by request, call, proposal and
invoice. No site of the house takes a payment for a world, and a fleet
machine obeys only the Oracles listed on it (`SYS-014`).

The Oracle asked for the model he pays with himself: Nous Portal, where a
person tops up 10 dollars and everything after is pay as you go, with a
chart of each day's spend. Measured on 2026-10-12:

- **Hermes Cloud** charges once a day, in arrears, from one prepaid
  balance: 0.51 dollars a day running and 0.03 a day stopped (2 GB, 2
  vCPU), with 2 dollars of balance needed to deploy. The Portal has a
  personal account and teams with a shared balance, and four roles —
  owner, admin, finance admin and member; only the first three pay.
- **OpenAI, Anthropic and OpenRouter** sell prepaid balance with a receipt
  or invoice per top-up; OpenAI and Anthropic let it expire after a year and
  refund none of it. **Fly.io** and **Railway** bill by the second, and on
  Fly.io a stopped machine still pays for its disk.
- **Stripe's own credits** reach the balance only when an invoice is
  finalised: "Credits are only reconciled at invoice time. Customers can
  exceed their balance during the cycle"
  ([Stripe, compare Metronome](https://docs.stripe.com/billing/subscriptions/usage-based/compare-metronome)).
  They apply only to metered prices on a subscription, a customer may hold
  at most 100 unused grants, and the Spanish pricing page still lists them
  as a preview. They cannot stop a world at zero.
- **Metronome**, Stripe's usage-billing platform, has a prepaid wallet and
  low-balance alerts, at 0.04 dollars per thousand events plus 0.8 % of
  billed volume, and takes no Checkout payment without custom calls.

The house's figures, the same day: an OVH VPS-2 (4 vCore, 8 GB) costs 8.49
euros a month with no commitment and holds three worlds of 2 GB, so a
running world costs the house about 0.09 euros a day with the machine full
and 0.19 at half; Stripe takes 1.5 % + 0.25 euros per European card, so a
10-euro top-up loses about 5 % to fees, invoice and tax service included.
Machines are rented by the month: a stopped world saves the house nothing.

The Oracle decided on 2026-10-13: consumers buy as well as companies; prices
are changed without code and their figures are estimated later; a person
signs in and creates teams with their own billing details; paid balance is
not refunded, as elsewhere, except where the law obliges, and it never
expires; at zero the worlds stop and are kept 90 days for free; and what is
judgement goes to debt while the mechanical parts are built first.

---

## 2. Decision

1. **Every account has a balance in euros.** An account is a person's own
   or a team's. It tops up on Stripe's page from 10 euros (buttons for 10,
   20, 50 and 100, or another amount), and each top-up is one lot with its
   payment and its invoice. The house never says "credits".
2. **Each night charges each world one line.** At 00:30 UTC the till asks
   each machine for the day that has just closed and writes one line per
   world: minutes running and minutes stopped, priced by the size the world
   reserves, never by the processor it used. UTC is the reference time:
   days are UTC days, every one of 24 hours, and every other time is
   computed from it — a screen shows hours in its viewer's own zone.
   Today's spend shows as provisional. What was not measured is not
   charged: a machine that does not answer is charged when it does, up to
   35 days back, and nothing is estimated. A world asleep because nobody is
   in it (`MIS-167`) counts as running: it keeps its room on the machine to
   wake the moment someone arrives. A world is stopped only when a person
   stopped it, or the balance at zero did (point 4).
3. **The tariff is data with a date.** The prices per day for each size,
   the event boost, the minimum top-up, the quick amounts, the minimum
   balance to create a world (two days running), the days a world is kept
   at zero and the notice before a rise are versions an Oracle schedules
   from a screen, each with the day it starts. Every charged line keeps the
   version it was charged with, so history never changes. A cut applies
   from the next day; a rise only after notice to every account with
   worlds. Sizes are sold by how many people a world holds at once —
   Small up to 20, Medium up to 50, Large up to 100 — each a reservation and
   a ceiling on its machine, with a limit of people that the machine sets
   and the world's admins cannot raise. The Oracle sets and changes the
   figures from his price room (`MIS-184`); the starting ones, and what is
   still judgement, are in `DBT-026`.
4. **At zero nothing is lost.** That night the account's running worlds
   stop after saving, as any stop does. Stopped worlds are then kept for
   free for 90 days, with a notice every week to whoever may pay, and their
   download stays open. After 90 days and two final notices they are
   deleted with their copies. The only debt possible is the last night's
   small overshoot, taken from the next top-up. A top-up does not start a
   world by itself: someone starts it with one signature.
5. **Paid balance is not refunded and never expires.** The exceptions are
   what the law obliges — a consumer's withdrawal, a charging error — and an
   Oracle makes them by hand in Stripe's dashboard, with the reason
   written; Stripe's event then takes the amount off the balance. The
   ledger spends lots oldest first, so refunding on request or expiring
   could be added later without rebuilding it.
6. **Consumers and companies buy alike, each with its own tax view.** The
   ledger counts net euros. A consumer sees every price and balance with
   VAT included: a "+10 euros" button charges 10 euros, of which 8.26 is
   balance and 1.74 Spanish VAT. A company gives its tax ID on Stripe's
   page, sees prices without VAT, and Stripe adds the VAT of its country
   before paying, or none under the reverse charge. Stripe computes the tax
   per country and issues one invoice per top-up. Nothing is sold in live
   mode before the terms of `DBT-022` are written and the gestoría has
   answered.
7. **A person has a personal account and may create teams.** A team has a
   shared balance, its worlds and its billing details, and four roles:
   owner, administration, finance and member. Paying is for the first
   three; starting and stopping worlds for owners, administration and
   members; creating worlds for owners and administration. Deleting a
   world, seeing or changing its code and downloading it are for owners
   only. Invitations go by email with the role inside and expire in seven
   days. A team role is not a rank of the city (`STD-003`): it grants
   nothing outside its team.
8. **The ledger is ours, in a service apart from the website.** It is a
   table where lines are only ever added — one per top-up, per world and
   day, per adjustment — and a balance is their sum. It keeps the
   accounts, teams, members, invitations and tariff versions too, in its
   own database on Cloudflare, the house's first. It runs as its own
   Worker, built for its trial as a folder of the numinia-web repository,
   and is crossed with Stripe's reports every month.
9. **Stripe holds the money, the customers and the invoices.** Each account
   is one Stripe customer, so its billing details are kept for the next top-
   up and changed on Stripe's own page. The till opens a Checkout Session
   for one of the top-up prices an Oracle created in Stripe, with tax
   computed and the tax ID collected, and the customer portal for details
   and invoices. Its key is restricted to customers, Checkout Sessions,
   portal sessions and reading prices and invoices: it cannot refund. Each
   Stripe event is verified and counted once. Only an Oracle creates
   products and prices (`STD-033` PAY-004 holds), and no card field appears
   on our sites (PAY-005 holds).
10. **Machines obey three kinds of signature, and money never touches them
    directly.**
    - **An Oracle:** everything, as today.
    - **A world's owners:** a world's order names its account and its
      owners' wallets; only an owner signs deleting it, seeing or changing
      its code and downloading it.
    - **The till**, with keys of its own that rotate without stopping a
      machine: a short team pass — "this wallet is a member of this team
      with this role until this time" — which, with the person's own
      signature, lets the machine create, start or stop as the role allows;
      "this account has credit for a world of this size until this time",
      which the machine requires to create or start a client's world; and
      "stop this world for balance".
    So whoever steals the till can start, stop or create worlds and stop
    them for balance, but cannot delete, copy or open a world, and cannot
    charge anyone. In the industry this is a capability: a permission of
    limited reach, signed for one purpose.
11. **The mechanical parts are built first.** The ledger, the nightly close
    with a pretend meter, the teams and roles, the tariff as data, Stripe in
    test mode, the till's signatures and the warning mails need no figure
    decided and no machine changed. `MIS-169` and its children
    (`MIS-177` to `MIS-188`) order the work.

This decision binds from the merge, for every world the house sells by
the day. Bespoke work and the dedicated plan stay by proposal and invoice.

---

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Stripe Billing's credits as the balance | They are applied only when an invoice is finalised, so a customer spends past zero during the cycle; they need a subscription with metered prices, cap a customer at 100 live grants and are a preview on Stripe's Spanish pricing page. They cannot stop a world at zero. |
| Metronome as the ledger | It has the prepaid wallet, but costs 0.04 dollars per thousand events plus 0.8 %, takes payments only through invoices or custom calls, and adds a supplier. It is the way out if one day there are hundreds of clients. |
| A monthly subscription per size (`MIS-169` as first written) | The client pays for a month whether the world runs or not, and the price cannot follow a world stopped for weeks. Charging by the day lets a client save by stopping, which sells better than a fee, even though a stopped world saves the house nothing. |
| Payment Links with no API key (the design's first version) | Each payment through a link creates a new Stripe customer, so a team's billing details and invoices would scatter across customers. One customer per account needs the till to open each Checkout Session with a restricted key. |
| Credits instead of euros | A unit the client must convert hides the price. Hermes, OpenAI and Anthropic show money. |
| Charging by processor and memory used | The bill becomes unpredictable and depends on visitors the client does not control. A reserved size is the price the machine really holds aside (`MIS-163`). |
| Selling a size by its memory, as "a world of 2 GB" (this record's first version) | In a load test on 2026-10-13 a world ran out of processor, never of memory: its processor grows with the square of the people inside while its memory barely moves. The market sells worlds by people at once, and numen.games/hosting already asks how many come. |
| A world asleep because it is empty paying as stopped | Hermes Cloud charges only the time a machine is up. An asleep world here keeps its room reserved to wake at once, so the house holds the machine for it; charged as stopped, the example fleet's margin would fall to 39 % with worlds used half the month. |
| Madrid days (this record's first version) | A local day: one that changes the clock lasts 23 or 25 hours, one run at 00:30 needs two schedules, and a client outside Spain reads another country's day. The Oracle fixed UTC as the reference time, as Nous charges, with every local time computed from it. |
| Starting the worlds when a top-up arrives | A top-up would spend money nobody chose to spend. One signature starts them. |
| Refunding unused balance on request | Stolen cards, top-up-and-refund loops, a corrective invoice and a VAT correction per country, and Stripe keeps its fee. Not refunding is what Hermes, OpenAI and Anthropic do; the ledger's lots keep the door open (`DBT-026`). |
| Letting balance expire after a year | The client loses money for not using a world; nothing in the house's costs asks for it. |
| Selling to organisations only | The Oracle chose to sell to people too: a person running a world for friends pays 10 euros without a tax ID. |
| A team role as a rank of the city | A rank says how far a person has walked in Numinia; a role says what they may do with one team's money and worlds. Mixing them would make a buyer a Pilgrim and an Oracle an owner of every team. |
| The till as part of numinia.com's Worker | A website holds sessions for every visitor; the till holds the money and signs for machines. Apart, a stolen website gets no signing key. |

---

## 4. Consequences

**Obliges.**

- `STD-033`: the whole price, tax included, binds what consumers see;
  companies see prices without VAT and Stripe adds it on its page before
  paying (PAY-002). The prices per day live in the till's tariff, which the
  offer record and the public page read, instead of a figure typed in the
  record (PAY-003). Changed by `MIS-187`, with `PRO-020`'s steps for a
  dated tariff, `SYS-008` gaining accounts, teams and the till, and
  `STD-003` saying that team roles are not ranks.
- An offer record for "3D worlds — pay per use" in `operations/`, in test
  state, before anything exists in Stripe's live mode (`PRO-020`).
- The till is a new root of trust: its keys are an Oracle's to set as
  secrets, it holds no key that refunds, and its ledger is crossed with
  Stripe every month (`STD-036`).
- The questions only counsel and the gestoría can answer join `DBT-022`;
  the figures and choices that are judgement are listed in `DBT-026`.

**Costs.**

- The house keeps its first database, with personal data in it (names,
  email addresses, wallets, tax IDs held by Stripe), and its backups and
  breach duties.
- About 5 % of a 10-euro top-up goes to Stripe; the minimum top-up exists
  for that reason.
- A world stopped for weeks keeps paying its small daily price while
  costing the house the same machine.
- In Madrid a UTC day runs from 01:00 to 01:00 in winter and from 02:00 to
  02:00 in summer, so the first hour or two after a Spanish midnight count
  on the previous day's line; the screens say their days are UTC.
- Refusing refunds may cost a sale; the lots keep the way open.
- A machine must now say what it charged for each world and day, and obey
  owners and the till as well as Oracles (`MIS-185`, `MIS-186`).

**Reversal.** Metronome replaces the ledger if there are hundreds of
clients; refunds on request or an expiry rule arrive as a new tariff rule
if counsel, the gestoría or the market ask for them; monthly plans, a
spending cap and automatic top-ups join with the first five clients.

---

## 5. Status

Proposed on 2026-10-13, pending the Oracle's acceptance on the pull request.
The design it records, with its screens as a clickable prototype, was put
to the Oracle on 2026-10-12 and 2026-10-13. He decided who buys, how prices
change, what happens at zero, that balance is neither refunded nor expired,
and the teams; he left three technical choices to Ursa — the ledger in a
service of our own, automatic top-ups later, and Amazon SES for mail — which
can change without a new record.
Changed on 2026-10-13 (0.2.0), at the Oracle's request: the reference time
is UTC and every other time is computed from it, so the night's close runs
at 00:30 UTC over days of 24 hours (point 2), and Madrid days move to the
alternatives.
Changed on 2026-10-13 (0.3.0), from the Oracle's decisions on the prices:
sizes are sold by people at once (point 3), a world asleep because it is
empty counts as running (point 2), and the figures change from the price
room (`MIS-184`); the starting figures are in `DBT-026`.

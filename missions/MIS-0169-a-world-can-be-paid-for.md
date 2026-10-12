---
id: "MIS-169"
uid: ""
title: "A world can be paid for: hosting a world goes on sale through the house's one payment account, priced by the size it reserves, and a paid world is born with its buyer as owner"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T13:27:54+02:00"
updated: "2026-10-12T13:27:54+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [virtual-worlds, hosting, payments, stripe, offers, fleet]
license: "CC0-1.0"

priority: medium
effort: L
executor: hybrid
assigned_to: null
completed: null

depends_on: ["MIS-161", "MIS-163", "MIS-158", "MIS-159"]
requires_oracle_approval: true
context: "2026-10-12T13:27:54+02:00"
paths: [standards/STD-033-every-charge-delivers-something.md, procedures/PRO-020-putting-something-on-sale.md, system/SYS-008-the-account.md]
related: ["MIS-161", "MIS-163", "MIS-158", "MIS-159", "STD-033", "STD-044", "PRO-020", "SYS-008", "DBT-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-169 — A world can be paid for

> **Summary:** numen.games/hosting sells a world's hosting by request,
> proposal and invoice; no site lets anyone pay for a world. This mission
> puts hosting on sale through the house's one payment account (`STD-033`):
> a record of the offer, a price per size taken from the cost model
> (`MIS-161`) and matching the reservation a world holds on its machine
> (`MIS-163`), payment on the payment company's own page, and a world born
> with its buyer's wallet as its owner (`MIS-159`), which stops when the
> payment stops.
> **Epistemic:** What a world is sold as — a size, a period, a copy every
> night — and what proves it was paid.
> **Pragmatic:** A client gets a world without a call; the house charges for
> what the machine really gives.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **The record first:** an offer record in `operations/` for a world's
  hosting, per `PRO-020`: what it delivers, its price with tax per size,
  its period, its site and its state. No record, no charge (`STD-033`).
- **What is sold:** a size — the memory and processor its machine reserves
  for it (`MIS-163`) — by the month or by the day it exists, with the
  nightly copy the offer promises (`MIS-158`) and the owner's own
  stop, start and download (`MIS-159`).
- **How it is paid:** on the payment company's page, from links an Oracle
  creates in Numen Games' account; no card field on our sites; leaving takes
  one step (`STD-033`). What proves payment is read on the server, never
  from the browser (`STD-044`).
- **Who signs the birth of a paid world.** A machine obeys only the Oracles
  listed on it, and a buyer is not one. Decide when the mission opens: an
  Oracle signs each paid world by hand at first, or a signer of limited reach
  that can only create the size that was paid for.
- **When the payment stops:** the world stops, its data is kept for a stated
  time, and its owner can still download it (`PRI-012`).
- **Who may buy:** organisations only, as numen.games/hosting sells today, or
  people too, which needs consumer terms first (`DBT-022`).

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| How a world is charged | the plan | a monthly price per size, prorated, as cloud servers are sold; usage by the day or hour a world exists (Stripe usage-based billing; Hermes Cloud charges by the day, running or stopped) |
| Who collects the tax | VAT | Stripe directly, Numen declaring it; a merchant of record that collects and remits it — the gestoría decides (`SYS-008`) |
| What proves a payment | the world's birth | the Checkout Session read on the server; Stripe's webhooks |
| A limited signer | a paid creation without an Oracle | capability tokens (UCAN, Biscuit); an EIP-712 grant an Oracle signs ahead for one size on one machine |

The choice and its reason go in this mission's execution log.

Out of scope: prices of other products; invoicing software (Verifactu,
from 2027); several worlds per payment; voice or agents inside a world,
priced in `MIS-161`'s model.

---

## 2. Acceptance criteria

- [ ] An offer record for a world's hosting exists in `operations/`, with a
  price with tax for each size, and the site that sells it reads the price
  from it. Today: numen.games/hosting gives a monthly fee in writing in each
  proposal, and no record prices a world.
- [ ] In the payment company's test mode, a buyer pays and, within minutes,
  a world of the paid size runs with the buyer's wallet as its owner. Today:
  only an Oracle's signature creates a world.
- [ ] When a subscription ends, its world stops by itself, and its owner can
  still download it for the stated time. Today: no world is tied to a
  payment.
- [ ] The worlds room shows the Oracle each paid world, its size and the
  state of its payment. Today: the room knows nothing about payments.

---

## 3. Closure

*(Fill when the mission closes.)*

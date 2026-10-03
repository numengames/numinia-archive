---
id: "DES-018"
uid: ""
title: "Our own payment gateway: Redsys and Bizum through our bank"
type: design
former_id: "BLU-018"
former_id_note: "Renamed by ADR-067 cut 4 (2026-10-03): the series blueprints/ took the industry's word, designs/, and the prefix BLU- became DES-."
status: draft
version: "0.1.2"
created: "2026-09-29T14:00:00+02:00"
updated: "2026-10-03T22:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Finance"
tags: [design, payments, redsys, bizum, stripe, fees]
license: "CC0-1.0"
related_missions: []
related: ["STD-033", "SYS-008", "OPS-014", "PRO-020", "STD-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# DES-018 — Our own payment gateway: Redsys and Bizum through our bank

> **Summary:** The payment processor is expensive on small payments. A
> virtual card terminal from our own bank, through Redsys, charges a
> fraction of it and adds Bizum; with AI help, wiring it ourselves now looks
> within reach. This page keeps the question open, with the figures and the
> point at which it pays.
> **Epistemic:** What does taking payments cost, and when would doing it
> ourselves be worth it?
> **Pragmatic:** Re-read it whenever the processor's monthly fees are
> reviewed; start the work only when the trigger in section 3 is met.
> **Audience:** Agents · Oracles

> **A design describes what is not yet built.** It is not a decision, not a
> mission, and not a description of what exists. If it has been built, its
> description belongs in `system/`; if it must be built, the work belongs in a
> mission that cites this design.

---

## 1. Current state

As of 29 September 2026, the one processor is Stripe (`SYS-008`), with
nothing on sale yet. The first things to sell are `OPS-014`'s cards: Backer
from 5 EUR a month, Sponsor from 200 EUR.

Stripe's fee for a standard European card is 1.5 % + 0.25 EUR, plus 0.7 %
when the payment recurs through its billing (stripe.com/es/pricing, read
2026-09-29). The fixed 0.25 EUR is what hurts: it is the same on 5 EUR as
on 500.

| A monthly payment of | Stripe keeps | Share of what is left after VAT |
|---|---|---|
| 5 EUR | 0.36 EUR | 8.7 % |
| 10 EUR | 0.47 EUR | 5.7 % |
| 25 EUR | 0.80 EUR | 3.9 % |
| 200 EUR | 4.65 EUR | 2.8 % |

---

## 2. Future state

Numen Games takes payments through a **virtual card terminal (TPV virtual)
from its own bank**, which in Spain runs on **Redsys**, the card switch the
Spanish banks share. The money lands in the company's account directly.

- **Cost.** Each bank sets its own price; there is no public list. Reported
  ranges for small businesses are about **0.3 % to 0.9 % per payment**,
  sometimes with a minimum per payment and a monthly fee (0 to about 10
  EUR, often waived). At 0.5 %, a 5 EUR payment would cost about 0.03 EUR
  instead of 0.36.
- **Bizum.** The same terminal can take Bizum, the way most people in Spain
  already pay each other. Redsys publishes its integration guide for
  merchants.
- **Recurring payments.** Redsys supports them: the first payment stores
  the card with the buyer's consent (*credential on file*), and each month
  the merchant starts the next charge (*merchant-initiated*). Whether the
  bank enables it on our terminal must be asked.
- **How it is wired.** Redsys offers a redirect: our site sends the buyer to
  Redsys's page with the order signed (HMAC SHA-256), and Redsys calls back
  when it is paid. No card touches our sites, so `STD-033` PAY-005 holds.
  The signing key would live as a secret in Cloudflare, set by an Oracle;
  no agent holds it (`STD-022`).

**Is it doable with AI help?** Yes, the payment part: the redirect, the
signature and the callback are a few hundred lines on a Cloudflare Worker,
and Redsys documents them in the open. What Stripe does besides taking the
money is the real work, and it would all become ours:

- charging each month, retrying a failed card, and telling the payer;
- a one-step way to cancel (`STD-033` PAY-006);
- receipts and invoices, with Verifactu from 1 January 2027;
- the monthly report the account is closed from (`PRO-021`);
- the payer's two choices for the homage list;
- keeping the key safe and the code maintained.

A middle path would be: keep Stripe for recurring cards, and add Redsys
first for Bizum and one-off payments, where there is no monthly billing to
build.

---

## 3. The gap

What would decide it, measured monthly once support starts:

- **The trigger.** Look at it again when Stripe's fees pass **100 EUR a
  month** (about 280 Backer payments at 5 EUR). Below that, the saving does
  not pay for the time to build and run it.
- **Questions for the bank.** Price per payment and any minimum, monthly
  fee, recurring payments enabled, Bizum included, how payouts and reports
  arrive.
- **Question for the gestoría.** Whether invoices issued by our own system
  fit Verifactu, and what changes in how income is booked.
- **Other options to compare at that point.** SEPA direct debit (cheap for
  monthly payments, slower, can be reversed for eight weeks), and Spanish
  gateways that bundle Bizum and cards (for example MONEI, whose Bizum is
  1.29 % + 0.25 EUR + 0.17 EUR: no cheaper than Stripe on small payments).

---

## 4. Cost and risk

- **Building it:** days of agent work plus the Oracle's time with the bank.
- **Running it:** every failed charge, dispute and cancellation lands on
  us, not on Stripe's staff.
- **Risk:** a billing bug charges people twice or not at all; that costs
  more trust than any fee saves. Test mode first, as `PRO-020` step 7 asks.
- **Not doing it:** we pay about 9 % of what is left after VAT on a 5 EUR
  payment, and nothing else changes.

---

## Sources

- Stripe, *Tarifas*: stripe.com/es/pricing (read 2026-09-29).
- Redsys, *Conexión vía REST* and *Tokenización MIT*:
  pagosonline.redsys.es, developer documentation (read 2026-09-29).
- Redsys, *Guía de integración Bizum comercios*, version 2.0, 1 April 2025.
- MONEI, *Bizum — comisiones*: docs.monei.com/es/payment-methods/bizum
  (read 2026-09-29).
- Reported bank terminal ranges: micontabilidad.online/tpv-virtual-negocio,
  pagosrecurrentes.com/blog/comparativa-comisiones-tpv-bancos (read
  2026-09-29). Each bank quotes its own; ask ours.

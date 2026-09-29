---
id: "OPS-014"
uid: ""
title: "Supporting Numinia — the offer"
type: documentation
status: draft
version: "0.1.0"
created: "2026-09-29T13:00:00+02:00"
updated: "2026-09-29T13:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Funding"
tags: [operations, offer, support, backer, sponsor, payments]
license: "CC-BY-4.0"
related: ["CAN-011", "STD-033", "SYS-008", "PRO-020", "PRO-021"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# OPS-014 — Supporting Numinia — the offer

> **Summary:** The first two things Numinia will sell on numinia.org, taken
> from Open Collective's *Contribute* page: **Backer**, from 2 EUR a month,
> and **Sponsor**, from 200 EUR a month, both with VAT included. Neither is a
> donation. What each one delivers is not fixed yet, so neither is on sale.
> **Epistemic:** The record every page, price and payment link for
> supporting Numinia reads from (`STD-033` PAY-003).
> **Pragmatic:** Read it before building the support page or creating
> anything in the payment processor; change it when a good or a price is
> fixed.
> **Audience:** Agents · Oracles · Supporters

---

## 1. Context

Open Collective hosts thousands of open projects that live on what their
readers give each month, and every one of them offers it the same way: a
*Contribute* page with a few cards, each with a name, one sentence, a
starting price and the people already in it; a short path to pay; and a
wall of contributors after. It works, so Numinia copies it, card for card
and price for price, in its own design (`opencollective.com/webpack/contribute`,
read on 2026-09-29).

It copies all of it but one card. Open Collective's third card is
*Donation*, an amount of your choice for nothing in return. Numinia does
not take donations (`CAN-011`): every payment buys something named before
paying (`STD-033` PAY-001), so that card is left out.

---

## 2. The record

### Backer

| | |
|---|---|
| **In one sentence** | Support Numinia every month and help it keep going |
| **Delivers** | *To be fixed.* The Oracle names it before it goes on sale |
| **Price with VAT** | From 2 EUR a month |
| **Period** | Monthly, cancellable in one step (`STD-033` PAY-006) |
| **Site** | numinia.org |
| **State** | Not on sale |
| **Payment link** | None yet |

### Sponsor

| | |
|---|---|
| **In one sentence** | Become a sponsor with a monthly payment of at least 200 EUR |
| **Delivers** | *To be fixed.* Open Collective's is "maybe your logo on our website, with a link to yours (not guaranteed)" |
| **Levels** | Bronze 200–2,000 EUR · Silver 2,000–10,000 EUR · Gold 10,000–50,000 EUR, as on Open Collective |
| **Price with VAT** | From 200 EUR a month |
| **Period** | Monthly, cancellable in one step |
| **Invoice** | Sent after each payment, as Open Collective does for sponsors |
| **Site** | numinia.org |
| **State** | Not on sale |
| **Payment link** | None yet |

### What a payment turns into

For 2 EUR, VAT included, with Spanish VAT at 21 % and the processor's fee for
a standard European card on a recurring payment (1.5 % + 0.7 % + 0.25 EUR):

| | EUR |
|---|---|
| VAT, to the tax authority | 0.35 |
| The processor's fee | 0.29 |
| **What reaches Numinia** | **1.36** |

The fixed 0.25 EUR weighs most on the smallest card. Which VAT route
applies is the gestoría's decision (`SYS-008`).

### How whoever pays appears

On the payment page, two optional questions (`PRO-020` step 4): appear in
the homage list with a name, an alias or none, and with what they gave or
without it. Saying nothing means no name and no amount (`STD-033` PAY-007).

---

## 3. Why neither is on sale

- **What it delivers is not fixed.** A charge must deliver something named
  before paying (`STD-033` PAY-001); both *Delivers* rows are empty.
- **The terms do not allow selling to people.** numinia.org's terms say
  the site is for organisations only. Selling to people needs consumer
  terms: fourteen days to withdraw, the digital-content exception, and a
  button that says paying is an obligation. They come in the Oracle's legal
  book.

Until both are done the support page may show the cards, the prices and
the wall, with the pay button marked *Coming soon*.

---

## 4. Open questions

- **What each card delivers**, and whether the two prices are the only
  steps or each card offers several fixed amounts. A payment link's
  recurring price is fixed, so every amount is one price the Oracle
  creates.
- **Whether a one-off or a yearly payment** is offered beside the monthly
  one. Open Collective's two cards are monthly only.
- **What Sponsor's levels change** beyond the name.

---

## 5. Validity

**As of:** 2026-09-29. Re-checked when a card goes on sale, changes price
or is withdrawn (`PRO-020`).

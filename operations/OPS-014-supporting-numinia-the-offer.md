---
id: "OPS-014"
uid: ""
title: "Supporting Numinia — the offer"
type: documentation
status: draft
version: "0.2.0"
created: "2026-09-29T13:00:00+02:00"
updated: "2026-09-29T14:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Funding"
tags: [operations, offer, support, backer, sponsor, payments]
license: "CC-BY-4.0"
related: ["CAN-011", "STD-033", "SYS-008", "PRO-020", "PRO-021", "BLU-018"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# OPS-014 — Supporting Numinia — the offer

> **Summary:** The first two things Numinia will sell on numinia.org, taken
> from Open Collective's *Contribute* page: **Backer**, from 5 EUR a month,
> and **Sponsor**, from 200 EUR a month, both with VAT included. Neither is a
> donation. What each delivers is proposed from common practice, and
> neither is on sale until the consumer terms exist.
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

It copies all of it but two things. Open Collective's Backer starts at 2;
ours starts at 5 EUR, because the processor's fixed fee takes 18 % of what
is left of 2 EUR after VAT and 9 % of 5 EUR — and 5 a month is where most
membership platforms start. Open Collective's third card is
*Donation*, an amount of your choice for nothing in return. Numinia does
not take donations (`CAN-011`): every payment buys something named before
paying (`STD-033` PAY-001), so that card is left out.

---

## 2. The record

### Backer

| | |
|---|---|
| **In one sentence** | Support Numinia every month and help it keep going |
| **Delivers** | *Proposed:* your place on the wall of those who hold Numinia up, as you choose to appear (`STD-033` PAY-007), and a backer's badge. Never early or exclusive access to what the archive gives freely (PAY-008) |
| **Price with VAT** | 5, 10 or 25 EUR a month, the payer's choice |
| **Period** | Monthly, or yearly for the price of ten months; cancellable in one step (`STD-033` PAY-006) |
| **Site** | numinia.org |
| **State** | Not on sale |
| **Payment link** | None yet |

### Sponsor

| | |
|---|---|
| **In one sentence** | Become a sponsor with a monthly payment of at least 200 EUR |
| **Delivers** | *Proposed:* your logo on numinia.org with a link to your site, as on Open Collective, and a place on the wall |
| **Levels** | Bronze from 200 EUR · Silver from 2,000 EUR · Gold from 10,000 EUR a month, as on Open Collective. The level sets the logo's size and place |
| **Price with VAT** | 200, 2,000 or 10,000 EUR a month |
| **Period** | Monthly, or yearly for the price of ten months; cancellable in one step |
| **Invoice** | Sent after each payment, as Open Collective does for sponsors |
| **Site** | numinia.org |
| **State** | Not on sale |
| **Payment link** | None yet |

### What a payment turns into

With Spanish VAT at 21 % and the processor's fee for a standard European
card on a recurring payment (1.5 % + 0.7 % + 0.25 EUR):

| A month | VAT, to the tax authority | The processor | **What reaches Numinia** |
|---|---|---|---|
| 5 EUR | 0.87 | 0.36 | **3.77** |
| 10 EUR | 1.74 | 0.47 | **7.79** |
| 25 EUR | 4.34 | 0.80 | **19.86** |
| 200 EUR | 34.71 | 4.65 | **160.64** |

The fixed 0.25 EUR weighs most on the smallest card; `BLU-018` keeps open
the question of taking payments through our own bank instead. Which VAT
route applies is the gestoría's decision (`SYS-008`).

### How whoever pays appears

On the payment page, two optional questions (`PRO-020` step 4): appear in
the homage list with a name, an alias or none, and with what they gave or
without it. Saying nothing means no name and no amount (`STD-033` PAY-007).

---

## 3. Why neither is on sale

- **What it delivers is proposed, not approved.** A charge must deliver
  something named before paying (`STD-033` PAY-001); the Oracle confirms
  both *Delivers* rows.
- **The terms do not allow selling to people.** numinia.org's terms say
  the site is for organisations only. Selling to people needs consumer
  terms: fourteen days to withdraw, the digital-content exception, and a
  button that says paying is an obligation. They come in the Oracle's legal
  book.

Until both are done the support page may show the cards, the prices and
the wall, with the pay button marked *Coming soon*.

---

## 4. How these choices were made

The Oracle asked for the most common working practice where he had no
preference of his own:

- **Three fixed amounts on the entry card**, lowest one pre-selected: most
  membership platforms start at 5 a month and offer a few steps above it.
  Each amount is one price in the processor, so the list stays short.
- **Access and recognition, not objects**, as the reward: it costs nothing
  to deliver and cannot close what the archive keeps open.
- **A yearly option with two months free**, the usual discount for paying a
  year ahead.
- **No one-off payment for now**: without something delivered it reads as
  a donation. It can come later with its own good.

---

## 5. Validity

**As of:** 2026-09-29. Re-checked when a card goes on sale, changes price
or is withdrawn (`PRO-020`).

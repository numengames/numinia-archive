---
id: "OPS-014"
uid: ""
title: "Supporting Numinia — the offer"
type: documentation
status: draft
version: "0.4.1"
created: "2026-09-29T13:00:00+02:00"
updated: "2026-09-30T12:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Funding"
tags: [operations, offer, support, backer, sponsor, payments]
license: "CC-BY-4.0"
related: ["CAN-011", "STD-033", "SYS-008", "PRO-020", "PRO-021", "BLU-018"]

# The cards on sale. They are sold on numinia.com/support, never on
# numinia.org: the archive keeps the record, the product site sells
# (STD-033 PAY-003: the site's prices are copied from here). Prices are with
# VAT, in EUR. `link` is the payment link an Oracle creates (PRO-020 step 5);
# a link starting `https://buy.stripe.com/test_` is test mode and charges
# nothing. Empty means the button says "Coming soon".
goods:
  - id: backer
    name: "Backer"
    kind: "Recurring contribution"
    sentence: "Support Numinia with a coffee and help it keep going."
    delivers: "A supporter's badge on your citizen profile on numinia.com, if you sign in with the email you paid with."
    amounts: [5]
    intervals: [once]
    year_months: 10
    state: "test"
    link: "https://buy.stripe.com/test_fZu4gA4WU2ZG3iMgssdMI00"
  - id: sponsor
    name: "Sponsor"
    kind: "Recurring contribution"
    sentence: "Become a sponsor with a monthly payment of at least 200 EUR."
    delivers: "Your logo with a link to your site, sized by level, the supporter's badge, and an invoice after each payment."
    amounts: [200, 2000, 10000]
    levels: ["Bronze", "Silver", "Gold"]
    intervals: [month, year]
    year_months: 10
    state: "not on sale"
    link: ""
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# OPS-014 — Supporting Numinia — the offer

> **Summary:** The first two things Numinia sells: **Backer**, a coffee
> for 5 EUR, and **Sponsor**, from 200 EUR, both with VAT included. They are
> sold on numinia.com/support, reached from a small coffee cup at the foot of
> every page of numinia.com. Neither is a donation: whoever pays gets a
> supporter's badge inside Numinia.
> **Epistemic:** The record every page, price and payment link for
> supporting Numinia copies (`STD-033` PAY-003).
> **Pragmatic:** Read it before changing the support page or creating
> anything in the payment processor; change it when a good or a price is
> fixed.
> **Audience:** Agents · Oracles · Supporters

---

## 1. Context

Ko-fi, Buy Me a Coffee, GitHub Sponsors and Open Collective offer support
the same way: a quiet link in the footer (a heart or a cup and one word), a
page of its own that says why in a few lines and what whoever pays takes
away, and the payment on the processor's page. Numinia copies that.

**Selling happens on numinia.com, never on numinia.org.** The archive is
open to read and holds no shop; it keeps this record. numinia.com is the
product: it has the sign-in and the citizen profile where the gift lands.

Numinia takes no donations (`CAN-011`): every payment buys something named
before paying (`STD-033` PAY-001), so the gift is named on the page.

---

## 2. The record

### Backer

| | |
|---|---|
| **In one sentence** | Support Numinia with a coffee and help it keep going |
| **Delivers** | A supporter's badge on the citizen profile on numinia.com. Never early or exclusive access to what the archive gives freely (PAY-008) |
| **Price with VAT** | 5 EUR |
| **Period** | Once. Giving every month comes later, as its own price |
| **Site** | numinia.com/support |
| **State** | Test: the payment link is in Stripe's test mode and charges nothing |
| **Payment link** | `https://buy.stripe.com/test_fZu4gA4WU2ZG3iMgssdMI00` (test) |
| **Thanks page** | numinia.com/support/thanks/backer, in the buyer's language (`STD-044`); set as the link's confirmation page |

### Sponsor

| | |
|---|---|
| **In one sentence** | Become a sponsor with a payment of at least 200 EUR |
| **Delivers** | *Proposed:* your logo with a link to your site, sized by level, the supporter's badge, and an invoice after each payment |
| **Levels** | Bronze from 200 EUR · Silver from 2,000 EUR · Gold from 10,000 EUR |
| **Period** | Once or every month, the payer's choice, when the links exist |
| **Site** | numinia.com/support |
| **State** | Not on sale: shown as *Coming soon* |
| **Payment link** | None yet |

### What a payment turns into

With Spanish VAT at 21 % and the processor's fee for a standard European
card on a one-off payment (1.5 % + 0.25 EUR; a recurring one adds 0.7 %):

| A payment | VAT, to the tax authority | The processor | **What reaches Numinia** |
|---|---|---|---|
| 5 EUR | 0.87 | 0.33 | **3.80** |
| 200 EUR | 34.71 | 3.25 | **162.04** |

Which VAT route applies is the gestoría's decision (`SYS-008`).

---

## 3. How the gift reaches whoever paid

1. **Signed in on numinia.com when paying:** the payment carries the
   citizen's identity, and the badge lands on the profile when the processor
   confirms the payment.
2. **Not signed in:** the processor gives us the email. The badge waits,
   tied to that email, and is claimed by signing in on numinia.com with the
   same email.
3. **Never signs in:** the support was anonymous; nothing is kept but the
   processor's own record.

Nobody is asked to sign in before paying. This path needs the server of
numinia.com to create the payment and to hear the processor's confirmation;
until it exists, the test link above is a plain payment link and delivers
nothing.

---

## 4. What stops real sales

- **The consumer terms.** Selling to people needs them: fourteen days to
  withdraw, the digital-content exception, and a button that says paying is
  an obligation. numinia.com's terms are checked against this before the
  link leaves test mode.
- **The gift is delivered.** The badge must reach the account (§3) before a
  live payment promises it.

---

## 5. Validity

**As of:** 2026-09-30. Re-checked when a card goes on sale, changes price
or is withdrawn (`PRO-020`).

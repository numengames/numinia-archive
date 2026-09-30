---
id: "OPS-016"
uid: ""
title: "Season pass — the offer"
type: documentation
status: draft
version: "0.1.0"
created: "2026-09-30T13:00:00+02:00"
updated: "2026-09-30T13:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Funding"
tags: [operations, offer, season, pass, payments, nft]
license: "CC-BY-4.0"
related: ["CAN-011", "STD-033", "SYS-008", "PRO-020", "OPS-014"]
# The season pass on sale, read by numinia.com/lap/seasons (STD-033
# PAY-003: sites read the price from this record). Price with VAT, in EUR.
# `link` is the payment link an Oracle creates (PRO-020 step 5); empty
# means the button says "Coming soon".
goods:
  - id: season-001-pass
    name: "Season I pass — The Awakening of the Veil"
    kind: "Season pass"
    sentence: "The premium loot of the eight doors of Season I, and a pass token in your wallet."
    delivers: "The premium reward of each of the eight adventures, and one Season I pass token minted to the wallet you sign in with. The eight adventures and their free rewards stay open to everyone."
    amounts: [9.99]
    intervals: [once]
    year_months: 0
    state: "not on sale"
    link: ""
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# OPS-016 — Season pass — the offer

> **Summary:** The first thing numinia.com sells: the pass of Season I,
> *The Awakening of the Veil*, for 9.99 EUR with VAT, paid once. Everyone
> plays the eight adventures and takes their free rewards; the pass adds the
> premium reward of each one and a pass token in the buyer's wallet.
> **Epistemic:** The record the season page's price, its button and its
> payment link read from (`STD-033` PAY-003).
> **Pragmatic:** Read it before changing the season page on numinia.com or
> creating anything for the pass in the payment processor.
> **Audience:** Agents · Oracles · Players

---

## 1. Context

numinia.store, the site numinia.com replaces, already had a season pass:
Season I, eight escape-room adventures in worlds on oncyber, a pass for
9.99 EUR through the processor, and a token minted on Base to the buyer.
It ran as a test from April to July 2026, was never announced and sold
nothing. It moves to numinia.com and is launched there for real.

It moves with four changes, each for a debt found in the old one:

- **The adventures are open.** On numinia.store the pass locked the eighth
  door, but the door's address was public, so the lock held no one. Now
  every door is open and the pass sells what it can actually deliver: the
  premium rewards.
- **The price lives here.** numinia.store kept the price and the
  processor's price id in a data file of its own. Now the site reads this
  record.
- **Buyers are private.** numinia.store would have written each buyer's
  wallet into a public repository. The list of pass holders now goes to
  the private state repository the site already uses for its census.
- **No invented reward.** numinia.store promised a one-of-one artwork for
  burning the eight rewards, with no artwork and no artist behind it. That
  promise is dropped until it exists.

---

## 2. The record

### Season I pass

| | |
|---|---|
| **In one sentence** | The premium loot of the eight doors of Season I, and a pass token in your wallet |
| **Delivers** | The premium reward of each of the eight adventures, and one Season I pass token minted to the wallet the buyer signs in with. The adventures and their free rewards stay open to everyone (`STD-033` PAY-008) |
| **Price with VAT** | 9.99 EUR |
| **Period** | One-off. One payment, one pass per wallet, for the whole of Season I |
| **The token** | One ERC-1155 token on Base, in the contract numinia.store used. Counsel has reviewed it against the European crypto-assets regulation, the Oracle says (2026-09-30), which clears `STD-033` PAY-009 |
| **Site** | numinia.com, `/lap/seasons/` |
| **Dates** | To be set by the Oracle when the pass goes on sale |
| **State** | Not on sale |
| **Payment link** | None yet |

### What a payment turns into

With Spanish VAT at 21 % and the processor's fee for a standard European
card on a one-off payment (1.5 % + 0.25 EUR):

| Paid | VAT, to the tax authority | The processor | **What reaches the house** |
|---|---|---|---|
| 9.99 EUR | 1.73 | 0.40 | **7.86** |

Minting the token costs gas on Base, paid by the house's minting wallet.
The first mints measure it, and this table gains a row for it.

### How a payment becomes a pass

1. The player signs in on numinia.com with a wallet and opens the payment
   link from the season page. The link carries the wallet as its reference.
2. The processor takes the payment on its own page (`STD-033` PAY-005).
3. On return, the site asks the processor whether that payment exists and
   is paid, and takes the wallet from the payment, never from the browser.
4. The wallet is written to the private state repository as a pass holder,
   once; coming back with the same payment changes nothing.
5. The token is minted to that wallet. If minting fails the pass still
   holds, and the mint is retried.

---

## 3. Why it is not on sale yet

- **The payment link does not exist.** An Oracle creates the product, the
  price and the link in the processor (`PRO-020` steps 4–5).
- **The return path is not built.** Steps 3–5 above need a read-only key
  of the processor and the minting wallet's key, both secrets of the
  numinia.com Worker, never in a repository (`STD-022`).
- **The dates are not set.**

Until then the season page shows the eight adventures, both rewards of
each, the pass and its price, with the pay button marked *Coming soon*.

---

## 4. The three questions (`PRO-020` step 2)

- **What does whoever pays take away?** Eight premium rewards and one pass
  token, in the wallet they signed in with.
- **Where is it written?** Here, and on the season page before paying,
  reward by reward.
- **Can it be seen whole?** Yes: the page names every premium reward beside
  the free one, and every adventure can be played before paying.

---

## 5. Open questions

- The season's dates.
- What the premium rewards are as files: numinia.store named them and gave
  them no image or model. Each needs its card in the Summa before it is
  delivered.
- Whether the old contract on Base stays, or Season I gets a new one.

---

## 6. Validity

**As of:** 2026-09-30. Re-checked when the pass goes on sale, changes
price or is withdrawn (`PRO-020`).

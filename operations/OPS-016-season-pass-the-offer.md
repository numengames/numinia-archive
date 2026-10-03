---
id: "OPS-016"
uid: ""
title: "Season pass — the offer"
type: documentation
status: draft
version: "0.3.1"
created: "2026-09-30T13:00:00+02:00"
updated: "2026-10-03T19:40:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Products and services"
tags: [operations, offer, season, pass, payments, nft]
license: "CC-BY-4.0"
related: ["CAN-011", "STD-033", "SYS-008", "PRO-020", "OPS-014"]
# The season pass on sale, read by numinia.com/lap/seasons (STD-033
# PAY-003: sites read the price from this record). Price with VAT, in EUR.
# `link` is the payment link an Oracle creates (PRO-020 step 5); empty
# means the button says "Coming soon". A link starting
# `https://buy.stripe.com/test_` is test mode and charges nothing.
goods:
  - id: season-001-pass
    name: "Season I pass — The Awakening of the Veil"
    kind: "Season pass"
    sentence: "The eighth door of Season I, the gold reward of all eight, and a pass token in your wallet."
    delivers: "Entry to the eighth adventure, The Veil; the premium reward of each of the eight adventures; and one Season I pass token minted to the wallet you sign in with. The first seven adventures and their free rewards stay open to everyone."
    amounts: [9.99]
    intervals: [once]
    year_months: 0
    state: "test"
    link: "https://buy.stripe.com/test_fZu4gA4WU2ZG3iMgssdMI00"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# OPS-016 — Season pass — the offer

> **Summary:** The first thing numinia.com sells: the pass of Season I,
> *The Awakening of the Veil*, for 9.99 EUR with VAT, paid once. Everyone
> plays the first seven adventures and takes their free rewards; the pass
> opens the eighth, adds the premium reward of all eight and puts a pass
> token in the buyer's wallet.
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

- **The lock on the eighth door is real.** On numinia.store the pass locked
  the eighth door, but the door's address was public, so the lock held no
  one. Now the site gives the address only to a wallet that holds the pass,
  and the world itself is closed on oncyber by the Oracle.
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
| **Delivers** | Entry to the eighth adventure, *The Veil*; the premium reward of each of the eight adventures; and one Season I pass token minted to the wallet the buyer signs in with. The first seven adventures and their free rewards stay open to everyone. The Veil is a game world, not something the archive gives, so locking it keeps `STD-033` PAY-008 |
| **Price with VAT** | 9.99 EUR |
| **Period** | One-off. One payment, one pass per wallet, for the whole of Season I |
| **The token** | One ERC-1155 token on Base, in the contract numinia.store used. Counsel has reviewed it against the European crypto-assets regulation, the Oracle says (2026-09-30), which clears `STD-033` PAY-009 |
| **Site** | numinia.com, `/lap/seasons/` |
| **Dates** | To be set by the Oracle when the pass goes on sale |
| **Contract** | The season pass contract numinia.store used on Base (Oracle, 2026-09-30); its address is set on the numinia.com Worker as `SEASON_PASS_CONTRACT` |
| **State** | Test: the payment link is in Stripe's test mode and charges nothing |
| **Payment link** | `https://buy.stripe.com/test_fZu4gA4WU2ZG3iMgssdMI00` (test) — the same test link as `OPS-014`'s Backer, by the Oracle's choice (2026-09-30) |

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

### How the season knows how far you got

A door counts as crossed when the wallet holds that door's free reward; the
pass counts when the wallet holds the pass token (Oracle, 2026-09-30). No
form and no one marking it by hand: the digital good is the proof. The
season page reads the wallet's balances on Base and draws it as a game's
pass track — crossed doors lit, the next one open, the rest in fog, the
eighth behind a padlock. Until the rewards are minted as tokens, nothing can
be proven, so every door shows.

### How it is bought

One button with the price in euros on the season page, no cart. Before it,
a separate box the buyer ticks: they want the content now and lose the
fourteen days to withdraw — the exception European consumer law allows for
digital content only with that express consent and acknowledgement,
confirmed afterwards (Consumer Rights Directive art. 16(m); CPC Network,
*Key principles on in-game virtual currencies*, 2024, principle 5).

### How the industry does it (read 2026-09-30)

Two parallel tracks — free above, paid below — along one path, as Fortnite
set it in 2018 and most live games copy. Since 2022 the larger ones sell
passes that do not expire once bought (Halo Infinite; Helldivers 2's
Warbonds at 10 USD; Marvel Rivals' 10 USD Luxury pass). Season I follows
them: the pass is kept after the season ends. No premium currency: the price
is shown in euros, as the CPC principles ask.

---

## 3. Why it is not on sale yet

- **The payment link is a test one.** It is the Backer's test link, shared
  so the whole path can be walked in test mode (`PRO-020` step 7): it shows
  the Backer's product and 5 EUR on the processor's page, not the pass and
  9.99 EUR. Going on sale needs the pass's own product, price and live link.
- **The return path is not built.** Steps 3–5 above need a read-only key
  of the processor and the minting wallet's key, both secrets of the
  numinia.com Worker, never in a repository (`STD-022`).
- **The dates are not set.**
- **The rewards are figurative.** They are named and shown on the track,
  and have no token yet (Oracle, 2026-09-30: they stay figurative for now).
  Until each has its token id in the season contract no wallet can hold it,
  so every door shows and no fog falls.
- **The eighth world is open on oncyber.** Its address circulated on
  numinia.store; the Oracle closes it there (private or password).

Until then the season page shows the track, both rewards of each door, the
pass and its price, and a buy button that opens the test link with a note
that nothing is charged.

---

## 4. The three questions (`PRO-020` step 2)

- **What does whoever pays take away?** Entry to The Veil, eight premium
  rewards and one pass token, in the wallet they signed in with.
- **Where is it written?** Here, and on the season page before paying,
  reward by reward.
- **Can it be seen whole?** Yes: the page names every premium reward beside
  the free one, and seven of the eight adventures can be played before
  paying.

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

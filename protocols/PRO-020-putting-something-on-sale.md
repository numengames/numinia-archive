---
id: "PRO-020"
uid: ""
title: "Putting something on sale"
type: protocol
status: draft
version: "0.4.2"
created: "2026-09-24T18:10:00+02:00"
updated: "2026-10-03T20:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "Finance"
tags: [protocol, economy, payments, sale, records]
license: "CC0-1.0"
applies_to: [all-agents]
approved_by: "ADR-065"
related: ["STD-033", "CAN-011", "SYS-008", "STD-022", "PRO-021", "STD-044"]
derived_from: "CAN-011"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-020 — Putting something on sale

> **Summary:** How a thing goes from an idea to a payment link on a site of
> the house, and how it is taken off sale.
> **Epistemic:** How does something go on sale, and come off it, with the price written only in its record?
> **Pragmatic:** Put something on sale, or withdraw it, without a price
> written by hand anywhere.
> **Audience:** Agents · Oracles

**Binds:** whoever prepares, approves, creates or withdraws something on
sale in Numinia's or Numen Games' name.

---

## 1. Purpose and trigger

A sale starts when the Oracle asks for something to be sold, or approves an
agent's proposal to sell it. The **agent** writes the record and wires the
site; the **Oracle** approves it and creates it in the payment processor.
A withdrawal starts when the Oracle decides the thing comes off sale.

---

## 2. Preconditions

- **The record is merged before anything exists in the processor.** No
  product, price or payment link is created until the record of the thing on
  sale is on `main`.

---

## 3. Procedure

### Putting on sale

1. **Write the record.** Agent: what it delivers in one sentence, price with
   VAT, one-off or recurring, site, state *on sale*. Open a pull request.
2. **Put the three questions to it.** Agent, in the pull request: what does
   whoever pays take away, where is it written, can it be seen whole.
3. **Approve.** Oracle: review and merge.
4. **Create it in the processor from the record.** Oracle: product and price
   carry the record's good, price with VAT and period, exactly. For a
   recurring price, turn on the customer portal so cancelling is one step;
   add the optional questions *How would you like to appear in the homage
   list?* — name, alias or none, *none* by default — and *Show what you
   gave?* — yes or no, *no* by default.
5. **Create the payment link.** Oracle, and hand it to the agent. A payment
   link is not a key. Its confirmation page redirects to the good's thanks
   page on the site that sells it (`STD-044`), never to the processor's.
6. **Add the link to the record.** Agent, in a pull request.
7. **Test the whole path in test mode.** Agent and Oracle: pay, receive the
   good, appear in the homage list as chosen, cancel. Do not publish until
   it passes.
8. **Publish.** Agent: the site reads the record; `/updates` says what went
   on sale.

### Withdrawing

1. **Mark the record withdrawn.** Agent, in a pull request. Keep the record;
   do not delete it.
2. **Deactivate the link.** Oracle, in the processor.
3. **Tell the subscribers.** Oracle: active subscriptions run until each
   person cancels, and each person is told. Whoever bought it keeps what
   they bought.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 1–3 | The merged pull request with the record and the three answers |
| 4–5 | The processor's product carries the record's good, price and period; the link opens its page |
| 6 | The record carries the link on `main` |
| 7 | A test-mode payment and cancellation, noted in the pull request of step 6 |
| 8 | The site shows the record's price; the `/updates` entry |
| Withdrawing | The record on `main`, marked withdrawn; the link inactive |

---

## 5. Escalation

A thing that fails any of the three questions is not sold: the agent says
which question fails and hands it to the Oracle. A mismatch between record
and processor stops publication until the Oracle corrects the processor. A
resaleable on-chain token stops at step 1 until legal review.

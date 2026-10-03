---
id: "STD-044"
uid: ""
title: "Every purchase ends in thanks"
type: standard
subtype: standard
status: draft
version: "0.1.3"
created: "2026-09-30T12:30:00+02:00"
updated: "2026-10-03T21:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "Finance"
tags: [standards, payments, purchase, thanks, checkout, confirmation]
license: "CC0-1.0"
related: ["STD-033", "PRI-011", "STD-034", "STD-035", "PRO-020", "OPS-014"]
derived_from: "PRI-011"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Every purchase ends in thanks

> **Summary:** After paying, the buyer comes back to the site that sold,
> to a page that thanks them, names what they bought, says when and where
> it arrives and how to get help. The page proves nothing and keeps
> nothing about them.
> **Epistemic:** What does a buyer see the moment after paying?
> **Pragmatic:** Build or review the page a payment returns to, and set
> it in the payment processor before a link goes on sale.
> **Audience:** Agents · Oracles

**Binds:** every payment link or checkout of ours, and the page it
returns to.

## Rules

### Where the buyer lands

**Back home.** Every payment MUST return the buyer to a thanks page on the
site that sold, in the buyer's language, never to the processor's default
page.

**One page per good.** Each thing on sale MUST have its own thanks page,
or one that names the good it thanks for.

### What the page says

**Thanks first.** The page MUST open by thanking the buyer and naming what
they bought, in one line, before anything else.

**What happens next.** The page MUST say what arrives, where and when, and
what the buyer has to do to receive it, if anything.

**Where the receipt is.** The page MUST say that the receipt comes from the
payment company by email, and how to cancel when the payment repeats.

**Help in one step.** The page MUST give one way to reach a person if
something went wrong.

**One way on.** The page SHOULD end with one link onward, to where the
good lives or back to the site.

### What the page is not

**It proves nothing.** Reaching the page MUST NOT deliver anything. Only
the processor's confirmation of the payment delivers the good.

**It keeps nothing.** The page MUST NOT show or store the amount paid, the
buyer's name or email, and its address MUST NOT carry them.

**It is not found by search.** The page MUST ask search engines not to
index it and stay out of the sitemap.

**Joy without noise.** A celebration MAY move, and MUST stay still for
whoever asks the device for reduced motion.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| CEL-001 | Back home | [Stripe, payment link confirmation page](https://docs.stripe.com/payment-links/post-payment) | by hand, in the processor, at PRO-020 step 5 |
| CEL-002 | One page per good | — | by hand, at the pull request |
| CEL-003 | Thanks first | [Nielsen Norman Group, confirmation pages](https://www.nngroup.com/articles/confirmation-pages/) | by hand |
| CEL-004 | What happens next | Nielsen Norman Group, confirmation pages | by hand |
| CEL-005 | Where the receipt is | law: [TRLGDCU, RDL 1/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555) art. 63, confirmation on a durable medium | by hand; the processor's receipt setting |
| CEL-006 | Help in one step | — | by hand |
| CEL-007 | One way on | — | by hand |
| CEL-008 | It proves nothing | [Stripe, fulfil orders from webhooks](https://docs.stripe.com/checkout/fulfillment) | by hand, at the pull request that delivers a good |
| CEL-009 | It keeps nothing | law: [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 5(1)(c), data minimisation | by hand |
| CEL-010 | It is not found by search | [Google, block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) | the site's acceptance tests, where the page exists |
| CEL-011 | Joy without noise | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) 2.3.3, animation from interactions | the site's accessibility tests |

## Why

The moment after paying is when a buyer is most unsure: did it work, what
now, where is my thing. A processor's grey page answers none of it and
sends them away from us. A thanks page that answers all three turns a
payment into the start of a bond, and one that proves nothing keeps a
shared address from giving goods away.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-033` | Every charge delivers something | the charge this page closes |
| `PRI-011` | What has value also makes a bond | why a payment is thanked |
| `STD-034` | Accessibility | the motion rule |
| `STD-035` | Personal data | what the page may keep |
| `PRO-020` | Putting something on sale | where the return page is set |

---
id: "SYS-008"
uid: ""
title: "The account: how money moves and is recorded, as wired today"
type: documentation
subtype: reference
status: active
version: "0.1.1"
created: "2026-09-24T18:00:00+02:00"
updated: "2026-09-24T18:30:00+02:00"
author: "ursa"
owner: "oracle"
tags: [system, reference, economy, payments, ledger, accounting]
territory: "Funding"
license: "CC0-1.0"
related: ["STD-033", "CAN-011", "STD-022", "SYS-001"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SYS-008 — The account, as wired today

> **Summary:** Where Numinia's money comes from, where it goes, who holds
> each key, where each figure is recorded and who reads it — with each piece
> marked as wired or not wired yet.
> **Epistemic:** The pieces the charges-and-account standard rules over, and
> which of them exist today.
> **Pragmatic:** Before touching a charge or a figure, know which component
> owns it and whether it is running.
> **Audience:** Agents · Oracles

> **A system document is a reference manual, not a plan.** Pieces that do not
> exist yet are listed as *not wired*, with the cut that wires them; nothing
> here says they run until they do.

---

## 1. Scope

The money of Numinia: every payment it takes, every cost it incurs, and the
record of both. Numen Games S.L. is the legal entity: it pays everything
Numinia consumes and collects everything Numinia charges. There is no split
between the two; the ledger carries a project column for the day there is
another project.

Not covered: bespoke services Numen Games quotes and invoices one by one;
the company's statutory books, which the gestoría keeps; the legal texts
(terms, privacy), which live in `operations/`.

---

## 2. How it works

### Components

| Component | Holds | Who holds the keys | State |
|---|---|---|---|
| **Numen Games' bank account** | the money | the company's administrators | wired |
| **Payment processor account** (Stripe) | products, prices, payment links, subscriptions, the customer portal, monthly reports | an Oracle only (`STD-033` PAY-004) | account live; nothing on sale |
| **The gestoría** | the statutory books, VAT and corporate tax returns, payroll, the received-invoices book | the gestoría and the company | wired |
| **Supplier invoices and payrolls** | the documents behind every cost | the company, kept outside this repository (`STD-033` LED-007) | wired, not yet gathered in one place |
| **Records of things on sale** | what each charge delivers, price with VAT, period, site, state | the archive, by pull request | not wired — first record with the first charge |
| **The ledger** | one line per cost or income | the archive, by pull request, from the documents | not wired — first with simulated lines on numinia.org |
| **The views** | public, technology, finance and bank, gestoría — computed from the ledger | numinia.org, built from the archive | not wired — the prototype exists outside the tree |

Agents hold no key to any of these (`STD-022`). A payment link is not a key
and may be written in a record.

### How a payment flows

1. A visitor reads the record of a good on a site of the house and follows
   its payment link.
2. The processor's page takes the payment; no site of the house sees a card
   (`STD-033` PAY-005).
3. The processor pays out to Numen Games' bank account, net of its fees.
4. The payer chooses, on that page, how to appear in the homage list: by
   name, by alias or not at all. Silence is *not at all*.
5. At the month's close, the processor's report enters the ledger as income
   lines: gross, VAT, fees, net.

### How a cost flows

1. A supplier invoices Numen Games; the invoice goes to the gestoría, which
   books it.
2. At the month's close, each invoice becomes one ledger line: date,
   supplier, concept, accounting account, base, VAT, total, period covered,
   project (`STD-033` LED-001). A yearly licence covers twelve months; a
   monthly service covers its month.
3. Staff enter as one line per month for all staff together — gross pay,
   the employer's social security and the headcount — from the gestoría's
   payroll total. The ledger is public, so per-person figures never enter
   it; they stay with the company and the gestoría (`STD-033` LED-006).

### What each reader sees

| Reader | Reads | Asks of it |
|---|---|---|
| A citizen | the public view: what Numinia costs, what came in, who carries the difference, the homage list | that it is whole and plain |
| Technology (CTO) | cost per service per day, month and year; trend | what each service costs and whether it grows |
| Finance and a lender | profit and loss by year in the accounting plan's headings; cash and months of runway | whether the company can repay |
| The gestoría | the received-invoices book per quarter, exportable to a spreadsheet | that it matches the books |
| An auditor or the tax authority | the same figures, walked from total to line to document | that every figure has its paper |

All five read the same lines (`STD-033` LED-002). Billed and consumed are
both computed: billed on the invoice date, consumed spread over the days a
line covers (`STD-033` LED-003).

---

## 3. How to verify it

Nothing in the tree runs yet. Until the ledger exists, the checks are by
hand:

```
$ ls ledger/ 2>/dev/null || echo "no ledger in the tree yet"
no ledger in the tree yet
```

- **Processor account:** an Oracle confirms in the processor's dashboard
  that the account is live and that no product is on sale that has no
  record in the archive.
- **Books:** the gestoría confirms that the quarter's received-invoices book
  matches the ledger lines of the same quarter, once lines exist.

When the ledger lands, this section gains the command that recomputes every
view from the lines and fails if any two disagree.

---

## 4. Accuracy

**Verified against:** the Oracle's statements in session and `main` at
`aa11a98`, on 2026-09-24.

- The processor account being live is the Oracle's word; it was not
  inspected — agents hold no key to it.
- Open decision for the gestoría: whether VAT on digital sales to consumers
  in other EU countries is declared by the company or handled by the
  processor as merchant of record. It changes how income lines are booked,
  not what the standard requires.
- How long each document is kept beyond the six years of the Commercial Code
  is the gestoría's to confirm (`STD-033` LED-008).
- The views exist as a prototype with invented figures, outside this
  repository.

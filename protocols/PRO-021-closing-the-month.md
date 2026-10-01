---
id: "PRO-021"
uid: ""
title: "Closing the month"
type: protocol
status: draft
version: "0.5.0"
created: "2026-09-24T18:10:00+02:00"
updated: "2026-10-01T18:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
tags: [protocol, economy, ledger, accounting, close, audit]
license: "CC0-1.0"
applies_to: [all-agents]
ratified_by: "ADR-065"
supersedes_version: "0.1.0"
related: ["STD-036", "STD-033", "CAN-011", "SYS-008", "PRO-020", "PRO-031", "PRO-032"]
derived_from: "CAN-011"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-021 — Closing the month

> **Summary:** How a month of costs and income becomes closed lines in the
> ledger, and how a quarter is handed to the gestoría.
> **Epistemic:** How does a month of costs and income become closed lines in the ledger?
> **Pragmatic:** Close a month, and a quarter, so every published figure can
> be walked back to its paper.
> **Audience:** Agents · Oracles

**Binds:** whoever brings the month's documents, turns them into ledger
lines, or reviews the close.

---

## 1. Purpose and trigger

Every figure Numinia publishes about its money comes from closed months. A
month is closed once all of its documents have arrived; a quarter, once its
three months are closed. The **Oracle** (or the gestoría) brings the
documents; an **agent** writes the lines; the **Oracle** reviews and merges.
Nothing is closed from an estimate.

---

## 2. Preconditions

- **Every document of the month is in hand.** Lacking one, the month stays
  open (see Escalation).

---

## 3. Procedure

### The month

1. **Gather the documents.** Oracle or gestoría: the month's supplier
   invoices, the month's payroll total for all staff (gross, employer's
   social security, headcount) and the payment processor's monthly report.
2. **Write the cost lines.** Agent: one line per invoice — date, supplier,
   concept, accounting account, base, VAT, total, period it covers, project —
   naming its document by supplier, number and date. Never commit the
   invoice, payroll or report itself: the repository holds lines, not
   documents.
3. **Write the people line.** Agent: one line for all staff together, at
   employer cost, with social security, income tax withheld and headcount;
   never net pay. With three people or more, one line a month; with fewer,
   payroll, freelancers and the director's invoices go into one people line
   a quarter, written when the quarter closes. The per-person figures stay
   with the company and the gestoría: the ledger is public.
4. **Write the income lines.** Agent: from the processor's report — gross,
   VAT, fees, net, number of payers. A public contract invoiced, and a
   grant or public loan paid in the month, is one line each, naming its
   record in the opportunities or funding series; a grant's amount is
   income only once paid, never when granted.
5. **Update the homage list.** Agent: only as each payer chose; the quarter's
   and the year's lists when those close.
6. **Recompute the views.** Agent: every view from the lines; the four views
   must agree on every shared figure. Mark the open month's figures
   provisional wherever they are shown.
7. **Open the close.** Agent: one pull request with the month's lines and a
   table of totals by concept, billed and consumed.
8. **Review and merge.** Oracle. The month's figures stop being provisional;
   the next month opens as provisional.

### The quarter

1. **Export the received-invoices book.** Agent: the quarter's lines, one per
   invoice, as a spreadsheet file for the gestoría.
2. **Estimate the quarter's taxes.** Agent: from the lines, the VAT result —
   to pay, to offset, or, in the fourth quarter, to refund — and the income
   tax withheld, each labelled an estimate on the open books, with the
   filing date.
3. **Reconcile.** Gestoría: the book matches its own.
4. **Load the filed returns.** Agent: each return's result replaces its
   estimate; a difference enters as a new dated line that says why.

### Correcting a closed month

1. **Add a new dated line.** Agent: it says which line it corrects and why.
   Never edit the old line. Any difference found in reconciling is corrected
   this way.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 2–4 | Every document of the month has one line; the lines' totals match the documents' totals; no document is committed |
| 3 | One people line, monthly with three or more people and quarterly with fewer, with headcount and no per-person figure |
| 6 | The views' recomputation reports no disagreement; open-month figures show as provisional |
| 7–8 | The merged pull request of the month |
| Quarter | The estimated taxes on the open books; the gestoría's confirmation that the book matches, or the correcting lines; each filed return's result in place of its estimate |

---

## 5. Escalation

A missing document leaves the month open and marked provisional; the agent
names the missing supplier to the Oracle. A line that cannot be placed in an
account goes to the gestoría. A view that disagrees with another stops the
close until the line that causes it is found.

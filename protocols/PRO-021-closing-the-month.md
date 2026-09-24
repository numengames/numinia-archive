---
id: "PRO-021"
uid: ""
title: "Closing the month"
type: protocol
status: draft
version: "0.2.0"
created: "2026-09-24T18:10:00+02:00"
updated: "2026-09-24T18:30:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
tags: [protocol, economy, ledger, accounting, close, audit]
license: "CC0-1.0"
applies_to: [all-agents]
ratified_by: "ADR-065"
supersedes_version: "0.1.0"
related: ["STD-033", "CAN-011", "SYS-008", "PRO-020"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-021 — Closing the month

> **Summary:** How a month of costs and income becomes closed lines in the
> ledger, and how a quarter is handed to the gestoría.
> **Epistemic:** The Oracle or the gestoría brings the documents; an agent
> turns them into lines; nothing is closed from an estimate, and no document
> enters the repository.
> **Pragmatic:** Close a month, and a quarter, so every published figure can
> be walked back to its paper.
> **Audience:** Agents · Oracles

**Binds:** whoever brings the month's documents, turns them into ledger
lines, or reviews the close.
**Does not bind:** the company's statutory books and tax returns, which the
gestoría keeps and files.

---

## 1. Purpose and trigger

Every figure Numinia publishes about its money comes from closed months. A
month is closed once all of its documents have arrived; a quarter, once its
three months are closed. The **Oracle** (or the gestoría) brings the
documents; an **agent** writes the lines; the **Oracle** reviews and merges.

---

## 2. Rules

**MON-001 — Lines, never documents.** Invoices, payrolls and processor
reports MUST NOT be committed. Each becomes one ledger line naming its
document by supplier, number and date.

**MON-002 — People in one line.** Staff cost MUST enter the ledger as one
line per month for all staff together, with the headcount. The per-person
figures stay with the company and the gestoría: the ledger is public.

**MON-003 — The month is provisional until merged.** Figures for an open
month MUST be marked provisional wherever they are shown.

**MON-004 — A closed month reopens by a new line.** A correction to a closed
month MUST be a new dated line that says what it corrects, never an edit
of the old one.

---

## 3. Procedure

### The month

1. **Gather the documents.** Oracle or gestoría: the month's supplier
   invoices, the month's payroll total for all staff (gross, employer's
   social security, headcount) and the payment processor's monthly report.
2. **Write the cost lines.** Agent: one line per invoice — date, supplier,
   concept, accounting account, base, VAT, total, period it covers, project.
3. **Write the staff line.** Agent: one line for the month — gross pay,
   employer's social security, headcount.
4. **Write the income lines.** Agent: from the processor's report — gross,
   VAT, fees, net, number of payers.
5. **Update the homage list.** Agent: only as each payer chose; the quarter's
   and the year's lists when those close.
6. **Recompute the views.** Agent: every view from the lines; the four views
   must agree on every shared figure.
7. **Open the close.** Agent: one pull request with the month's lines and a
   table of totals by concept, billed and consumed.
8. **Review and merge.** Oracle. The next month opens as provisional.

### The quarter

1. **Export the received-invoices book.** Agent: the quarter's lines, one per
   invoice, as a spreadsheet file for the gestoría.
2. **Reconcile.** Gestoría: the book matches its own; any difference
   becomes a correcting line under `MON-004`.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 2–4 | Every document of the month has one line; the lines' totals match the documents' totals |
| 6 | The views' recomputation reports no disagreement |
| 7–8 | The merged pull request of the month |
| Quarter | The gestoría's confirmation that the book matches, or the correcting lines |

---

## 5. Escalation

A missing document leaves the month open and marked provisional; the agent
names the missing supplier to the Oracle. A line that cannot be placed in an
account goes to the gestoría. A view that disagrees with another stops the
close until the line that causes it is found.

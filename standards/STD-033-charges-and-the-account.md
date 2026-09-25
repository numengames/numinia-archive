---
id: "STD-033"
uid: ""
title: "Every charge delivers something; the account is one"
type: documentation
subtype: standard
status: draft
version: "0.2.0"
created: "2026-09-24T17:40:00+02:00"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [standards, economy, payments, ledger, accounting, transparency, audit]
ratified_by: "ADR-064"
threshold: governed
related: ["CAN-011", "CAN-010", "STD-022", "STD-003"]
series_change: "0.2.0 — 2026-09-25: written in plain words for a narrator, and the Spanish general accounting plan and the FinOps cost specification move in from the external standards as the sources of the one-ledger and billed-and-consumed rules."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Every charge delivers something; the account is one

> **Summary:** Every charge delivers a good named before paying, at its
> whole price, from a record in the archive, collected in one account. Every
> cost and income is one line in one ledger, closed from documents; every
> view comes from it.
> **Epistemic:** What makes a charge ours, and what makes the account hold up
> in front of a citizen, a lender, an auditor and the tax authority.
> **Pragmatic:** Check a charge before it exists; check a figure before it is
> published.
> **Audience:** Agents · Oracles

**Binds:** every site of ours that takes a payment, every record of
something on sale, and the ledger of what Numinia costs and takes in.
**Does not bind:** services quoted and invoiced one by one for a client.

## Rules

### The charge

**Something in return.** Every charge MUST deliver a digital good described
before payment. No charge MAY be called a donation.

**The whole price.** The price shown MUST be final, with tax included.
Nothing MAY be added at the last step.

**No record, no charge.** Everything on sale MUST have a record in the
archive saying what it delivers, its price with tax, its period, its site
and its state. Sites MUST read the price from that record.

**One account, the Oracle's keys.** Every payment MUST be collected in Numen
Games' account. Only an Oracle MAY create products, prices or payment
links.

**No card on our sites.** Payment MUST happen on the payment company's own
page; our site MUST only link to it.

**Leaving takes one step.** A recurring payment MUST be changeable and
cancellable from a link on every receipt and on the site.

**Remembered by choice.** A payer MUST appear only as they choose — name,
alias or not at all — and not at all when they say nothing. No amount paid
by one person MAY be published. The choice MAY change at any time.

**Open stays open.** No good MAY be the key to something the archive already
gives freely.

**A resaleable token waits.** A good that is a resaleable token on a
blockchain MUST NOT go on sale before a lawyer has reviewed it.

### The account

**One ledger.** Every cost and income MUST be one line: date, supplier,
concept, its account in the Spanish general accounting plan, base, tax,
total, period covered and project. Every view MUST be computed from these
lines.

**Same figures, four views.** The public view, the technology view, the
finance view and our accountants' view MUST agree on every figure they
share.

**Billed and consumed.** The ledger MUST report both what was billed, on the
invoice date, and what was consumed, spread over the days the line covers.

**Closed from documents.** A month MUST be closed from invoices and the
payment company's report. An open month or an estimate MUST say so.

**Traceable to the paper.** Every total MUST be traceable to its lines, and
every line to its document, so an auditor or the tax authority can walk
from one to the other.

**People counted, not named.** Staff MUST enter as the company's cost per
month. No published view MAY let anyone infer a person's pay.

**Documents stay out.** Invoices, payslips and payment reports MUST NOT be
committed to the archive. The archive holds the lines; the documents stay
with the company.

**Kept for as long as the law can ask.** Documents MUST be kept at least six
years after the last entry, and for as long as any tax right they support
can still be checked.

This standard is over its word budget: the charge and the account are one
subject, and splitting them would leave a price without its books.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| PAY-001 | Something in return | — | by hand, in every pull request that touches a charge |
| PAY-002 | The whole price | — | by hand, in every pull request that touches a charge |
| PAY-003 | No record, no charge | — | by hand until the records exist; then a check that every price a site shows comes from a record |
| PAY-004 | One account, the Oracle's keys | — | the payment processor's account permissions — outside this repository |
| PAY-005 | No card on our sites | — | by hand, in every pull request that touches a charge |
| PAY-006 | Leaving takes one step | — | by hand, in every pull request that touches a charge |
| PAY-007 | Remembered by choice | — | by hand, in every pull request that touches a charge |
| PAY-008 | Open stays open | — | by hand, in every pull request that touches a charge |
| PAY-009 | A resaleable token waits | — | by hand, in every pull request that touches a charge |
| LED-001 | One ledger | [Plan General de Contabilidad, RD 1514/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-19884) — group 62 services, 64 staff; the gestoría keeps the books from it | by hand at each month's close; `web/src/lib/account.ts` computes every view from the lines |
| LED-002 | Same figures, four views | — | `web/src/lib/account.ts` and `/system/open-books` render the four views from one set of lines |
| LED-003 | Billed and consumed | [FinOps FOCUS](https://focus.finops.org/) — billed cost and effective (consumed) cost | by hand at each month's close |
| LED-004 | Closed from documents | — | by hand at each month's close |
| LED-005 | Traceable to the paper | — | by hand at each month's close |
| LED-006 | People counted, not named | — | by hand, in every ledger pull request |
| LED-007 | Documents stay out | — | by hand, in every ledger pull request |
| LED-008 | Kept for as long as the law can ask | — | the gestoría's retention, outside this repository |

## Why

A charge that is not written becomes a favour asked of someone who cannot see
where it goes; a ledger kept twice becomes two stories. One record per thing
on sale and one line per cost make the account the same for a citizen, a
bank, an auditor and the tax authority, and keep people's pay their own.
Following the national accounting plan and a common cost vocabulary lets
anyone check the books against something they already know.

## References

| ID | Name | Why cited |
|---|---|---|
| `CAN-011` | What has value also makes a bond | the reason for every rule here |
| `CAN-010` | Leave things better than you found them | why no person's pay is published |
| `STD-022` | Secrets | no payment key is written in the tree |
| `STD-035` | Personal data | what we may keep about a payer |

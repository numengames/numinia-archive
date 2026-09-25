---
id: "STD-033"
uid: ""
title: "Every charge delivers something; the account is one"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-24T17:40:00+02:00"
updated: "2026-09-24T17:40:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [standards, economy, payments, ledger, accounting, transparency, audit]
ratified_by: "ADR-064"
threshold: governed
related: ["CAN-011", "CAN-010", "STD-022", "STD-011", "STD-003"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Every charge delivers something; the account is one

> **Summary:** Every charge delivers a good named before paying, at its
> whole price, from a record in the archive, collected in one account. Every
> cost and income is one line in one ledger, closed from documents, from
> which every view — public, technology, finance, the gestoría's — is
> computed.
> **Epistemic:** What makes a charge Numinia's, and what makes the account
> hold up in front of a citizen, a lender, an auditor and the tax authority.
> **Pragmatic:** Check a charge before it exists; check a figure before it is
> published.
> **Audience:** Agents · Oracles

**Binds:** every site of Numinia and Numen Games that takes a payment, every
record of something on sale, and the ledger of what Numinia costs and takes
in.
**Does not bind:** bespoke services quoted and invoiced one by one; the
reason behind these rules, which is `CAN-011`'s.

## Rules

### The charge

**PAY-001 — Something in return.** Every charge must deliver a digital good
described before payment. No charge may be called a donation.

**PAY-002 — The whole price.** The price shown must be final, VAT included.
Nothing may be added at the last step.

**PAY-003 — No record, no charge.** Everything on sale must have a record in
the archive: what it delivers, price with VAT, period, site, state. Sites
must read the price from that record.

**PAY-004 — One account, the Oracle's keys.** Every payment must be collected
in Numen Games' account. Only an Oracle may create products, prices or
payment links.

**PAY-005 — No card on our sites.** Payment must happen on the payment
processor's page; a site must only link to it.

**PAY-006 — Leaving takes one step.** A recurring payment must be changeable
and cancellable from a link on every receipt and on the site.

**PAY-007 — Remembered by choice.** A payer must appear only as chosen —
name, alias or none — and none when silent. No per-person amount may be
published. The choice may change at any time.

**PAY-008 — Open stays open.** No good may be the key to something the
archive already gives freely.

**PAY-009 — A resaleable token waits.** A good that is a resaleable on-chain
token must not go on sale before legal review.

### The account

**LED-001 — One ledger.** Every cost and income must be one line: date,
supplier, concept, accounting account, base, VAT, total, period covered,
project. Every view must be computed from these lines.

**LED-002 — Same figures, four views.** The public, technology, finance and
gestoría views must agree on every figure they share.

**LED-003 — Billed and consumed.** The ledger must report both what was
billed, on the invoice date, and what was consumed, spread over the days the
line covers.

**LED-004 — Closed from documents.** A month must be closed from invoices
and the processor's report. An open month or an estimate must say so.

**LED-005 — Traceable to the paper.** Every total must be traceable to its
lines, and every line to its document, so an auditor or the tax authority
can walk from one to the other.

**LED-006 — People counted, not named.** Staff must enter as company cost per
month. No published view may let a person's pay be inferred.

**LED-007 — Documents stay out.** Invoices, payrolls and processor reports
must not be committed. The archive holds the lines; the documents stay with
the company.

**LED-008 — Kept for as long as the law can ask.** Documents must be kept
at least six years after the last entry, and while any tax right they
support can still be checked.

## Check

| Plate | Verified by |
|---|---|
| PAY-001, 002, 005..009 | `[MANUAL]` — reviewed in every PR that touches a charge |
| PAY-003 | `[MANUAL]` until the records exist; then a check that every price a site shows comes from a record |
| PAY-004 | the payment processor's account permissions — outside this repository |
| LED-001..005 | `[MANUAL]` at each month's close; the ledger's own totals are recomputed by the script that renders the views |
| LED-006, 007 | `[MANUAL]` — review of every ledger PR |
| LED-008 | `[MANUAL]` — the gestoría's retention, outside this repository |

## Why

A charge that is not written becomes a favour asked of someone who cannot see
where it goes; a ledger kept twice becomes two stories. One record per thing
on sale and one line per cost make the account the same for a citizen, a
bank, an auditor and the tax authority, and keep people's pay theirs. Over
budget: the charge and the account are one subject, and splitting them would
leave a price without its books.

## References

| ID | Name | Why cited |
|---|---|---|
| `CAN-011` | What has value also makes a bond | the reason for every rule here |
| `CAN-010` | Leave things better than you found them | why no person's pay is published |
| `STD-022` | Secrets | no payment key is written in the tree |
| `STD-011` | External standards | the accounting plan and the cost specification this ledger follows |

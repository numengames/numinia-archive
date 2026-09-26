---
id: "STD-033"
uid: ""
title: "Every charge delivers something"
type: documentation
subtype: standard
status: draft
version: "0.4.1"
created: "2026-09-24T17:40:00+02:00"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [standards, economy, payments, consumer-law]
ratified_by: "ADR-064"
threshold: governed
related: ["CAN-011", "STD-036", "STD-022", "STD-003", "STD-035", "BLU-017"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Every charge delivers something

> **Summary:** Every charge delivers a good named before paying, at its
> whole price, from a record in the archive, collected in one account, paid
> on the payment company's page and left in one step.
> **Epistemic:** What may we charge for, and how? What makes a charge ours
> and what the law asks of it.
> **Pragmatic:** Check a charge before it exists. How the money is then
> written down is the account standard's. This is not legal advice.
> **Audience:** Agents · Oracles

**Binds:** every site of ours that takes a payment, and every record of
something on sale.

## Rules

Where a rule says the law requires it, a lawyer or the gestoría, the
company's accountants, should confirm how it applies to us.

### The charge

**Something in return.** Every charge MUST deliver a digital good described
before payment, and none is called a donation. Our choice; the law does not
require it.

**The whole price.** The price shown MUST be final, with tax included and
nothing added at the last step. Spanish consumer law requires it so the
buyer can compare before paying. Once our sales to consumers in other
European countries pass ten thousand euros a year, the tax is each buyer's
country's, declared through the European one-stop shop. The law requires
this.

**No record, no charge.** Everything on sale MUST have a record in the
archive saying what it delivers, its price with tax, its period, its site
and its state, and sites read the price from it. Our choice; the law does
not require it.

**One account, the Oracle's keys.** Every payment MUST be collected in Numen
Games' account, and only an Oracle creates products, prices or payment
links. Our choice; the law does not require it.

**No card on our sites.** Payment MUST happen on the payment company's own
page, reached by a link or a redirect, with no card field embedded in ours.
That keeps us in the lightest tier of the card industry's security standard,
a short self-assessment, and leaves the strong authentication European
payment law asks for to the payment company. The card networks require
this by contract; the law does not require it of us.

**Leaving takes one step.** A recurring payment MUST be cancellable as
easily as it was started, from a link on every receipt and on the site.
The law requires this.

**Remembered by choice.** A payer MUST appear only as they choose — name,
alias or not at all — and not at all when they say nothing; they may
withdraw that consent as easily as they gave it. The law requires this;
never publishing what one person paid is our choice.

**Open stays open.** A good MUST NOT be the key to something the archive
already gives freely. Our choice; the law does not require it.

**A resaleable token waits.** A good that is a resaleable token on a
blockchain MUST NOT go on sale before a lawyer has checked it against the
European crypto-assets regulation. The law may require this; the wait is
our choice.

Every charge becomes a line in the one account, which has its own
standard.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| PAY-001 | Something in return | — | by hand, in every pull request that touches a charge |
| PAY-002 | The whole price | law: [TRLGDCU, RDL 1/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555) arts. 20 and 60.2.c; [Consumer Rights Directive 2011/83/EU](https://eur-lex.europa.eu/eli/dir/2011/83/oj) art. 6(1)(e); [VAT one-stop shop](https://vat-one-stop-shop.ec.europa.eu/) above €10,000 a year of EU cross-border consumer sales | by hand, in every pull request that touches a charge; the one-stop-shop threshold by the gestoría |
| PAY-003 | No record, no charge | — | by hand until the records exist; then a check that every price a site shows comes from a record |
| PAY-004 | One account, the Oracle's keys | — | the payment processor's account permissions — outside this repository |
| PAY-005 | No card on our sites | [PCI DSS v4.0.1, SAQ A](https://www.pcisecuritystandards.org/document_library/) — card-network contract; [PSD2, Directive (EU) 2015/2366](https://eur-lex.europa.eu/eli/dir/2015/2366/oj) strong customer authentication, done by the processor | by hand, in every pull request that touches a charge |
| PAY-006 | Leaving takes one step | law: [TRLGDCU](https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555) art. 62.3 | by hand, in every pull request that touches a charge |
| PAY-007 | Remembered by choice | law: [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 6(1)(a), 7(3), 25(2); no amount per person is ours | by hand, in every pull request that touches a charge |
| PAY-008 | Open stays open | — | by hand, in every pull request that touches a charge |
| PAY-009 | A resaleable token waits | [MiCA, Regulation (EU) 2023/1114](https://eur-lex.europa.eu/eli/reg/2023/1114/oj) — what the lawyer checks | by hand, in every pull request that touches a charge |

## Why

A charge that is not written becomes a favour asked of someone who cannot see
where it goes. Saying which rules the law makes and which we chose shows what
may bend and what may not.

## References

| ID | Name | Why cited |
|---|---|---|
| `CAN-011` | What has value also makes a bond | the reason for every rule here |
| `STD-036` | One account | where every charge is written down |
| `STD-022` | Secrets | no payment key is written in the tree |
| `STD-035` | Personal data | what we may keep about a payer |
| `BLU-017` | Legal obligations to confirm | invoicing, withdrawal and consumer terms still to cover |

---
id: "STD-033"
uid: ""
title: "Every charge delivers something; the account is one"
type: documentation
subtype: standard
status: draft
version: "0.3.0"
created: "2026-09-24T17:40:00+02:00"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [standards, economy, payments, ledger, accounting, transparency, audit, consumer-law]
ratified_by: "ADR-064"
threshold: governed
related: ["CAN-011", "CAN-010", "STD-022", "STD-003", "STD-035", "BLU-017"]
series_change: "0.3.0 — 2026-09-25: each rule now says whether the law requires it and rests on its law or outside standard — Spanish consumer law, the card-industry security standard, the data protection regulation, the Commercial Code, the General Tax Law and FinOps FOCUS 1.2 — with consent withdrawable as easily as given and every cost line carrying both billed and consumed cost."
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
> **Epistemic:** What makes a charge ours, what the law asks of it, and what
> makes the account hold up before a citizen, a lender, an auditor and the
> tax authority.
> **Pragmatic:** Check a charge before it exists; check a figure before it is
> published. This is not legal advice.
> **Audience:** Agents · Oracles

**Binds:** every site of ours that takes a payment, every record of
something on sale, and the ledger of what Numinia costs and takes in.
**Does not bind:** services quoted and invoiced one by one for a client.

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

### The account

**One ledger.** Every cost and income MUST be one line: date, supplier,
concept, its account in the Spanish general accounting plan (the
small-company version, to confirm with the gestoría), base, tax, total,
period covered and project; every view is computed from these lines. The
law requires the plan; the single ledger is our choice.

**Same figures, four views.** The public view, the technology view, the
finance view and our accountants' view MUST agree on every figure they
share. Our choice; the law does not require it.

**Billed and consumed.** Every cost line MUST carry both what was billed, on
the invoice date, and what was consumed, spread over the charge period it
covers, as the open cost and usage specification names them. Spreading
cost over the period it serves is also the accounting rule of accrual. The
law requires accrual in the books; the two figures on every line are our
choice.

**Closed from documents.** A month MUST be closed from invoices and the
payment company's report, and an open month or an estimate is labelled as
such. The law requires books kept in order from documents; the label is our
choice.

**Traceable to the paper.** Every total MUST be traceable to its lines, and
every line to its document, so an auditor or the tax authority can walk
from one to the other. The law requires this.

**People counted, not named.** Staff MUST enter as the company's cost per
month, and no published view lets anyone infer a person's pay. Our choice;
the law does not require it.

**Documents stay out.** Invoices, payslips and payment reports MUST NOT be
committed to the archive; it holds the lines, and the documents stay with
the company. Our choice; the law does not require it.

**Kept for as long as the law can ask.** Documents MUST be kept six years
after the last entry, and longer while the tax authority can still check
the years they support — four as a rule, up to ten for tax credits. The law
requires this.

This standard is over its word budget: the charge and the account are one
subject, and splitting them would leave a price without its books.

## Check

Every rule above, with the code an agent cites it by, the law or outside
standard it rests on, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| PAY-001 | Something in return | — our choice | by hand, in every pull request that touches a charge |
| PAY-002 | The whole price | law: [TRLGDCU, RDL 1/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555) arts. 20 and 60.2.c; [Consumer Rights Directive 2011/83/EU](https://eur-lex.europa.eu/eli/dir/2011/83/oj) art. 6(1)(e); [VAT one-stop shop](https://vat-one-stop-shop.ec.europa.eu/) above €10,000 a year of EU cross-border consumer sales | by hand, in every pull request that touches a charge; the one-stop-shop threshold by the gestoría |
| PAY-003 | No record, no charge | — our choice | by hand until the records exist; then a check that every price a site shows comes from a record |
| PAY-004 | One account, the Oracle's keys | — our choice | the payment processor's account permissions — outside this repository |
| PAY-005 | No card on our sites | [PCI DSS v4.0.1, SAQ A](https://www.pcisecuritystandards.org/document_library/) — card-network contract; [PSD2, Directive (EU) 2015/2366](https://eur-lex.europa.eu/eli/dir/2015/2366/oj) strong customer authentication, done by the processor | by hand, in every pull request that touches a charge |
| PAY-006 | Leaving takes one step | law: [TRLGDCU](https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555) art. 62.3 | by hand, in every pull request that touches a charge |
| PAY-007 | Remembered by choice | law: [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 6(1)(a), 7(3), 25(2); no amount per person is ours | by hand, in every pull request that touches a charge |
| PAY-008 | Open stays open | — our choice | by hand, in every pull request that touches a charge |
| PAY-009 | A resaleable token waits | [MiCA, Regulation (EU) 2023/1114](https://eur-lex.europa.eu/eli/reg/2023/1114/oj) — what the lawyer checks | by hand, in every pull request that touches a charge |
| LED-001 | One ledger | law: [PGC PYMES, RD 1515/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-19966) likely, rather than the full [PGC, RD 1514/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-19884) — the gestoría confirms; group 62 services, 64 staff | by hand at each month's close; `web/src/lib/account.ts` computes every view from the lines |
| LED-002 | Same figures, four views | — our choice | `web/src/lib/account.ts` and `/system/open-books` render the four views from one set of lines |
| LED-003 | Billed and consumed | [FinOps FOCUS 1.2](https://focus.finops.org/docs/specification/v1-2/) BilledCost, EffectiveCost, ChargePeriodStart/End; accrual principle, PGC part one | by hand at each month's close |
| LED-004 | Closed from documents | law: [Código de Comercio](https://www.boe.es/buscar/act.php?id=BOE-A-1885-6627) arts. 25 and 29; the open-month label is ours | by hand at each month's close |
| LED-005 | Traceable to the paper | law: [Código de Comercio](https://www.boe.es/buscar/act.php?id=BOE-A-1885-6627) art. 25; [Ley General Tributaria 58/2003](https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186) art. 29 | by hand at each month's close |
| LED-006 | People counted, not named | — our choice | by hand, in every ledger pull request |
| LED-007 | Documents stay out | — our choice | by hand, in every ledger pull request |
| LED-008 | Kept for as long as the law can ask | law: [Código de Comercio](https://www.boe.es/buscar/act.php?id=BOE-A-1885-6627) art. 30 (six years); [Ley General Tributaria](https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186) arts. 66–70 (four years; up to ten for tax credits) | the gestoría's retention, outside this repository |

## Why

A charge that is not written becomes a favour asked of someone who cannot see
where it goes; a ledger kept twice becomes two stories. Saying which rules
the law makes and which we chose shows what may bend and what may not, and
resting each on the plan, the code and the cost vocabulary others already
use lets anyone check the books against something they know.

## References

| ID | Name | Why cited |
|---|---|---|
| `CAN-011` | What has value also makes a bond | the reason for every rule here |
| `CAN-010` | Leave things better than you found them | why no person's pay is published |
| `STD-022` | Secrets | no payment key is written in the tree |
| `STD-035` | Personal data | what we may keep about a payer |
| `BLU-017` | Legal obligations to confirm | invoicing, withdrawal and consumer terms still to cover |

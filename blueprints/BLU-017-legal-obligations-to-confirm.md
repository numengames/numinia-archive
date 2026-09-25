---
id: "BLU-017"
uid: ""
title: "Legal obligations to confirm"
type: blueprint
status: draft
version: "0.1.1"
created: "2026-09-25T15:00:00+02:00"
updated: "2026-09-25T16:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [blueprint, legal, consumer-law, tax, DSA, GDPR]
territory: "Funding"
license: "CC0-1.0"
related_missions: []
related: ["STD-033", "STD-035", "STD-029", "STD-034", "OPS-003"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Legal obligations to confirm

> **Summary:** Ten things the law likely asks of a small Spanish company
> selling digital goods and hosting a community, which no rule of ours yet
> covers, each with who should confirm it.
> **Epistemic:** Where our standards stop short of the law.
> **Pragmatic:** Take each to the lawyer or the gestoría, then write the
> rule into the standard it belongs to. This is not legal advice.
> **Audience:** Agents · Oracles

> **A blueprint is a design not yet executed.** Nothing here binds anyone.
> When an item is confirmed, it becomes a rule inside the standard it
> serves, marked as the law, and leaves this page.

## Current state

As of September 2026 our standards mark which rules the law requires in
three places: conduct in the commons, the charge and the account, and
personal data. What follows came up in that review and is covered nowhere
yet. Every item is our reading of the law, to be confirmed by a lawyer or
by the gestoría, the company's accountants.

## Future state

Each item is confirmed or dismissed, and each confirmed one is a rule in a
standard, with its article in that standard's check table.

### Selling to consumers

**The right to withdraw from a digital purchase.** A consumer normally has
fourteen days to change their mind. For digital content delivered at once,
that right ends only if, before delivery, the buyer expressly agreed and
acknowledged losing it, and we confirmed the sale on a durable medium such
as an email. Without that, a buyer can ask for their money back after
using the good. The checkout needs the consent box and the confirmation; a
lawyer confirms the wording.

**A guarantee that the good works.** Digital content must match what was
described and keep working as promised, and the buyer has remedies if it
does not. With it come the consumer terms of sale every shop must publish.
We have neither written; a lawyer drafts them.

**The lowest recent price, when discounting.** An announced discount must
show, as the earlier price, the lowest one of the previous thirty days. It
matters as soon as the first sale runs; the price record in the archive can
keep that history. A lawyer confirms.

### Tax

**An invoice for every sale.** Every sale needs an invoice, a simplified one
for consumers, and invoicing software will have to meet the Spanish
tamper-proof invoicing rules, reported compulsory for companies paying
corporate tax from January 2027. Whether the payment company's receipts are
enough is the gestoría's call.

**Tax by the buyer's country.** Once sales to consumers in other European
countries pass ten thousand euros a year, their tax is charged at the
buyer's country's rate and declared through the European one-stop shop.
The charge standard names the threshold; registering and filing are the
gestoría's.

### Hosting a community

**What every host owes.** The European rules for online services ask any
host, however small, for a contact point for authorities and for users,
terms that say how content is moderated, a way to report illegal content,
and a statement of reasons with each removal. The conduct standard now says
so; none of it is published. A lawyer confirms the scope.

### Personal data

**Proving we keep the data rules.** The personal-data standard now holds
the record of processing, contracts with suppliers who handle data, the
security of what we keep, and breach notice within seventy-two hours. None
exists yet. A lawyer, or a data protection adviser, confirms what a company
our size must keep.

**Minors.** In Spain, a child under fourteen cannot consent to the use of
their data; a parent must. A game world will draw young players, so sign-up
needs an age question and a route for parental consent. A lawyer confirms.

### The sites themselves

**Accessibility of the shop.** The European Accessibility Act covers online
shops from June 2025, unless the company is a microenterprise: under ten
people and no more than two million euros a year. The Oracle confirmed we
are one, so the law does not oblige us; the accessibility standard already
asks for more. Look again if the company grows past either line.

**Who we are, on every site.** Spanish law on online services asks every
site to show the company's name, tax number, registered address, registry
entry and a contact. It costs one footer; a lawyer confirms the details.

## The gap

| Gap | What closes it |
|---|---|
| No withdrawal consent or confirmation at checkout | a consent box and a confirmation email, then a rule in the charge standard |
| No consumer terms, no conformity guarantee | terms drafted by a lawyer |
| No invoicing decision | the gestoría's answer on receipts and tamper-proof invoicing |
| No notice form, statement of reasons or contact point | three templates and a published page |
| No record of processing, breach procedure or age check | the privacy work the notice already awaits |
| No legal notice on the sites | one footer, from the company's details |

## Cost and risk

Most items cost a lawyer's hour and a page of text; the invoicing one may
cost software. Doing nothing risks refunds after use, fines from consumer
and data protection authorities, and tax filed in the wrong country. The
cheaper alternative, waiting for a complaint, was rejected: several of
these apply from the first sale.

## Sources

- [Spanish consumer law, TRLGDCU, RDL 1/2007 — arts. 98.7, 99.2, 103(m), 114–127](https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555)
- [Consumer Rights Directive 2011/83/EU — art. 16(m)](https://eur-lex.europa.eu/eli/dir/2011/83/oj)
- [Digital Content Directive (EU) 2019/770](https://eur-lex.europa.eu/eli/dir/2019/770/oj)
- [Omnibus Directive (EU) 2019/2161 — lowest price of the prior 30 days](https://eur-lex.europa.eu/eli/dir/2019/2161/oj)
- [Invoicing regulation, RD 1619/2012](https://www.boe.es/buscar/act.php?id=BOE-A-2012-14696)
- [Verifactu, RD 1007/2023](https://www.boe.es/buscar/act.php?id=BOE-A-2023-24840)
- [VAT one-stop shop](https://vat-one-stop-shop.ec.europa.eu/)
- [Digital Services Act, Regulation (EU) 2022/2065 — arts. 11–12, 14, 16, 17](https://eur-lex.europa.eu/eli/reg/2022/2065/oj)
- [GDPR, Regulation (EU) 2016/679 — arts. 28, 30, 32, 33](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [LOPDGDD, Ley Orgánica 3/2018 — art. 7](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673)
- [European Accessibility Act, Directive (EU) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj)
- [LSSI, Ley 34/2002 — art. 10](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758)

---
id: "STD-049"
uid: ""
title: "The doors, by country"
type: standard
subtype: register
status: draft
version: "0.1.0"
created: "2026-10-08T13:00:00+02:00"
updated: "2026-10-08T13:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [standards, register, sales, outreach, cold-contact, LSSI, Robinson, CAN-SPAM, TCPA, jurisdictions]
license: "CC0-1.0"
related: ["STD-048", "STD-035", "STD-047", "OPS-007"]
derived_from: "PRI-012"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The doors, by country

> **Summary:** For each country, which channels the law leaves open for a
> first contact with someone who did not ask, what must be done first, the
> law that says so, and whether a lawyer has confirmed it. One table per
> legal framework: Spain and the EU, the United States. Where the door is
> already open, and the audit of every change to the sales process. A
> register records: the rules that read it are in *Reaching someone who
> did not ask* (`STD-048`). Not legal advice.
> **Epistemic:** Which doors does the law of each country leave open for a first contact?

## How to read it

What each country leaves open, by channel. *State*: `confirmed` — read by a
lawyer; `pending` — read by the house from the law's text, not yet
confirmed. *Before* is what must be done before using the door.

## Spain and the EU

| Door | Open? | Before | Source | State |
|---|---|---|---|---|
| What the organisation published to be reached for this: a tender, a grant, a call for suppliers, partners, sponsors, exhibitors or speakers | yes, through the channel it published | read the call; answer what it asks | it asked for it: not unsolicited ([LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) art. 21.1) | pending |
| A call made by a person to an organisation's published number | yes, under legitimate interest | read the Lista Robinson for a person not yet asked; a no ends it | [Law 11/2022 on telecommunications](https://www.boe.es/buscar/act.php?id=BOE-A-2022-10757) art. 66.1.b; [LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) art. 23.4 | pending |
| An automated or recorded call | no, without consent | — | Law 11/2022 art. 66.1.a | pending |
| A letter by post to an organisation | yes, under legitimate interest | read the Lista Robinson when addressed to a person | LOPDGDD art. 23.4; [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 6.1.f | pending |
| Meeting in person — a fair, a congress, a meetup | yes | ask there for the yes to write, and keep it | GDPR arts. 6.1.a, 7 | pending |
| An introduction by someone both sides know | yes, once the person asks to hear from us | keep the yes | LSSI art. 21.1 (requested) | pending |
| An e-mail, a text or a messaging app to someone who has not asked — any address, a person's or `info@` | **no** | — | LSSI art. 21.1; fines up to 30,000 € a message, 30,001–150,000 € if massive or insistent (arts. 38.3.c, 38.4.d, 39) | pending |
| An e-mail to a former client about similar services | yes | an opt-out in every message | LSSI art. 21.2 | pending |
| A private message on a professional network, or a website's contact form, to sell | treated as an e-mail: **no** until a lawyer says otherwise | — | LSSI art. 21.1, "electronic means equivalent" | pending |
| A person's professional address or phone, to reach their organisation | yes, only to deal with the organisation | tell them, at the first contact, who we are, where we found it and how to have it erased | LOPDGDD art. 19; GDPR art. 14.3.b | pending |

**Exclusion list:** the [Lista Robinson](https://www.listarobinson.es/empresas),
run by Adigital: the house registers as a company and reads it before a
campaign by phone, post, e-mail or text to people who have not said yes.

## United States

The house is still bound by Spanish and EU law here (`STD-048`, *The
strictest law travels*): until a lawyer confirms the rows below, the Spanish table
applies. What the United States' own law says, read from its federal texts:

| Door | US law | Before | Source | State |
|---|---|---|---|---|
| A commercial e-mail to someone who has not asked | allowed without consent, business to business included, if it meets the rules | true sender and subject, says it is an advertisement, a valid postal address, an opt-out honoured within 10 business days; up to 53,088 $ a message | [CAN-SPAM Act](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business), 15 U.S.C. 7701–7713; 16 CFR 316 | pending — and LSSI art. 21 may still bind a sender established in Spain (LSSI art. 2) |
| A call made by a person to a business | mostly outside the Telemarketing Sales Rule, National Do Not Call Registry included | keep the house's own do-not-call list; state laws may ask more | [Telemarketing Sales Rule](https://www.ftc.gov/business-guidance/resources/complying-telemarketing-sales-rule), 16 CFR 310.6(b)(7) | pending |
| A call to a consumer's number | allowed outside the National Do Not Call Registry | read the National Do Not Call Registry | 16 CFR 310.4(b)(1)(iii)(B) | pending |
| An automated or recorded call, or a text, to a mobile number | no, without prior express consent | — | Telephone Consumer Protection Act, 47 U.S.C. 227(b) | pending |
| A person's data, wherever they are | the house, established in the EU, applies the GDPR to it | as in Spain | GDPR art. 3.1 | pending |

## Where the door is already open

The house looks first for organisations that ask to be reached: they
publish a call for suppliers or a supplier registration, an open
innovation challenge, a call for partners, sponsors, exhibitors or
speakers, a tender or a grant, an accelerator's intake. There the first
message answers a question they asked, through the channel they gave, and
the record's door is `published`.

## Audits

| Date | What changed | Checked against | Result |
|---|---|---|---|
| 2026-10-08 | The page is written; the first-contact e-mail of `STD-047` waits for a yes; records carry the organisation's public mailbox (`STD-039` OPP-017) | every rule | the first-contact e-mail had no door: now it is sent only after a yes or to a published call |

## Why

The same message is a fine in one country and ordinary business in
another. Kept as one table per legal framework, a seller or an agent finds
the door for the recipient in front of them, and the house enters a new
market by adding a table and having a lawyer confirm it, not by
improvising.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-048` | Reaching someone who did not ask | the rules that read this register |
| `STD-035` | Personal data | what holds for every person reached |
| `STD-047` | The sales collateral | the first-contact pieces these doors gate |
| `OPS-007` | Sales — commercial strategy | the strategy these doors serve |

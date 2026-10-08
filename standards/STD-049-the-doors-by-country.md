---
id: "STD-049"
uid: ""
title: "The doors, by country"
type: standard
subtype: register
status: draft
version: "0.2.1"
created: "2026-10-08T13:00:00+02:00"
updated: "2026-10-08T15:30:00+02:00"
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

| Door | Record's `door` | Open? | Before | Source | State |
|---|---|---|---|---|---|
| What the organisation published to be reached for this: a tender, a grant, a call for suppliers, partners, sponsors, exhibitors or speakers, a preliminary market consultation | `published` | yes, through the channel it published | read the call; answer what it asks | it asked for it: not unsolicited ([LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) art. 21.1) | pending |
| A call made by a person to an organisation's published number | `call` | yes, under legitimate interest | **never from a mobile number**: a fixed line, or 800/900; to a named person, read the Lista Robinson first; say who we are, where we found the number, and that they can ask us never to call again; a no ends it | [Law 11/2022 on telecommunications](https://www.boe.es/buscar/act.php?id=BOE-A-2022-10757) art. 66.1.b; [Orden TDF/149/2025](https://www.boe.es/buscar/act.php?id=BOE-A-2025-2870) arts. 9–10; [Ley 10/2025](https://www.boe.es/buscar/act.php?id=BOE-A-2025-26698) and the [Resolution of 14 April 2026](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-8409), commercial-call code 400 from 17 October 2026; [LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) art. 23.4; [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 14.3.b, 21.4 | pending |
| An automated or recorded call | — | no, without consent | — | Law 11/2022 art. 66.1.a | pending |
| A letter by post to an organisation | `letter` | yes, under legitimate interest | to a named person, read the Lista Robinson first; the letter carries the notice below | LOPDGDD art. 23.4; GDPR arts. 6.1.f, 14 | pending |
| Meeting in person — a fair, a congress, a meetup, a visit | `in-person` | yes | ask there for the yes to write — whom, on what, by which channel — keep it, and give the short notice (the one-page sheet carries it) | GDPR arts. 6.1.a, 7, 13; LSSI art. 21.1 ("expressly authorised") | pending |
| An introduction by someone both sides know | `introduction` | yes, once the person asks to hear from us — then `asked` | keep the yes | LSSI art. 21.1 (requested) | pending |
| An e-mail, a text or a messaging app to someone who has not asked — any address, a person's or `info@` | — | **no** | — | LSSI art. 21.1; an infringement up to 30,000 € (art. 38.4.d), 30,001–150,000 € if massive, insistent or systematic (arts. 38.3.c, 39.1) | pending |
| An e-mail after they asked for it | `asked` | yes | the yes kept (whom, on what, channel, words); the footer of `CLD-008` | LSSI art. 21.1; GDPR art. 7.1 | pending |
| An e-mail to a former client about similar services | `former-client` | yes | the address came from the contract; the services are the house's own and similar; the opt-out was offered when the data was taken and is in every message, as an e-mail address | LSSI arts. 21.2, 22.1 | pending |
| A private message on a professional network, or a website's contact form, to sell | — | treated as an e-mail: **no** until a lawyer says otherwise; a form the organisation published for proposals is `published` | — | LSSI art. 21.1, "electronic means equivalent" | pending |
| Holding a person's professional address or phone, to reach their organisation | — | yes, to *hold* it — only to locate them and deal with their organisation; which channel is open is decided by the rows above | the notice below at the first contact; the right to object shown apart | LOPDGDD art. 19; GDPR arts. 14, 21.4 | pending |

**Exclusion list:** the [Lista Robinson](https://www.listarobinson.es/empresas),
run by Adigital. The house registers as a company and reads it before each
call, letter or former-client e-mail to a named person who has not given
consent; the consultations are logged.

### What the first contact says

**Spoken, on a call:** «Le llamo de Numen Games S.L., un estudio de
Madrid. He encontrado este número en {{fuente}}. Si prefiere que no le
llamemos más, dígamelo y no volveremos a hacerlo; tiene toda la
información en numen.games, apartado Privacidad.»

**Written, in a letter or the first message to a professional:**
«Responsable: NUMEN GAMES S.L. (CIF B70735949), Calle Chile 10, 28290 Las
Rozas de Madrid; legal@numengames.com. Hemos obtenido su nombre, cargo y
contacto profesional de {{fuente}} y los usamos solo para tratar con
{{organización}}, por interés legítimo (art. 6.1.f RGPD, art. 19 LOPDGDD).
No los cedemos. Los conservamos hasta 12 meses desde el último contacto o
hasta que se oponga. Puede acceder, rectificar, suprimir, limitar o
llevarse sus datos en legal@numengames.com y reclamar ante la AEPD.
**Puede oponerse en cualquier momento, sin coste, respondiendo «BAJA» o
escribiendo a legal@numengames.com; no volveremos a contactarle.**»

**The line every commercial message carries:** «Comunicación comercial de
NUMEN GAMES S.L. (CIF B70735949), Calle Chile 10, 28290 Las Rozas de
Madrid. Si no desea recibir más mensajes nuestros, responda «BAJA» o
escriba a legal@numengames.com; lo atenderemos el mismo día y sin coste.»


## United States

The house is still bound by Spanish and EU law here (`STD-048`, *The
strictest law travels*): on the text, LSSI binds a sender registered in
Spain (art. 2.1, 2.3), so until a lawyer confirms the rows below, the
Spanish table applies. What the United States' own law says, read from its
federal texts:

| Door | US law | Before | Source | State |
|---|---|---|---|---|
| A commercial e-mail to someone who has not asked | allowed without consent, business to business included, if it meets the rules | true sender and subject, says it is an advertisement, a valid postal address, an opt-out honoured within 10 business days; up to 53,088 $ a message | [CAN-SPAM Act](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business), 15 U.S.C. 7701–7713; 16 CFR 316 | pending |
| A call made by a person to a business | mostly outside the Telemarketing Sales Rule, National Do Not Call Registry included | keep the house's own do-not-call list; no misrepresentation (16 CFR 310.3(a)(2), (4) still apply); state laws may ask more | [Telemarketing Sales Rule](https://www.ftc.gov/business-guidance/resources/complying-telemarketing-sales-rule), 16 CFR 310.6(b)(7) | pending |
| A call to a consumer's number | allowed outside the National Do Not Call Registry | read the National Do Not Call Registry and the house's own list; call between 8 am and 9 pm local time; send caller ID | 16 CFR 310.4(b)(1)(iii), 310.4(c), 310.4(a)(8) | pending |
| An automated or recorded call, or a text, to a mobile number | no, without prior express consent — written consent for marketing | — | Telephone Consumer Protection Act, 47 U.S.C. 227(b); 47 CFR 64.1200(a)(2) | pending |
| A person's data, wherever they are | the house, established in the EU, applies the GDPR to it | as in Spain | GDPR art. 3.1 | pending |

## Where the door is already open

The house looks first for organisations that ask to be reached: they
publish a call for suppliers or a supplier registration, a preliminary
market consultation, an annual procurement plan, an open innovation
challenge, a call for partners, sponsors, exhibitors or speakers, a tender
or a grant, an accelerator's intake. There the first message answers a
question they asked, through the channel they gave, and the record's door
is `published`.

## Audits

| Date | What changed | Checked against | Result |
|---|---|---|---|
| 2026-10-08 | The page is written; the first-contact e-mail of `STD-047` waits for a yes; records carry the organisation's public mailbox (`STD-039` OPP-017) | every rule | the first-contact e-mail had no door: now it is sent only after a yes or to a published call |
| 2026-10-08 | Review of every sales and legal document and every record: a `door` on each record (OPP-018), the kit's e-mail gated and footed, twelve records moved from e-mail to a call or a meeting, mobile numbers ruled out | every rule of `STD-048` | twelve open records planned a cold e-mail or form: each now goes through a call, a meeting or a published channel; what is still missing is debt, in `DBT-022` and `DBT-024` |
| 2026-10-08 | From MVP to alpha: every record checked against its door, and against whether it is still alive | `CLD-001`, `CLD-002` | three lost event sales (OPP-2026-002, 003, 004) and their proposals had no door: deleted, nothing kept. Five more deleted on the Oracle's reading: three grants out of time or with no 2026 call (021, 022, 023), a call the house cannot enter, since it asks for a game already sold and funds only pre-production (036), and a partner with nothing known (020). The thirteen open records left each go through a published call, a call, or a meeting |

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

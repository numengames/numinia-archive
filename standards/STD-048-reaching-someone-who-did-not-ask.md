---
id: "STD-048"
uid: ""
title: "Reaching someone who did not ask"
type: standard
subtype: standard
status: draft
version: "0.2.0"
created: "2026-10-08T13:00:00+02:00"
updated: "2026-10-08T15:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [standards, sales, outreach, cold-contact, LSSI, GDPR, LOPDGDD, Robinson, CAN-SPAM, TCPA, legal-by-design]
license: "CC0-1.0"
related: ["STD-049", "STD-035", "STD-038", "STD-039", "STD-047", "OPS-007", "PRO-028", "LEG-001"]
derived_from: "PRI-012"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Reaching someone who did not ask

> **Summary:** The house goes first to an organisation only through a door
> the law of the place leaves open: what the organisation itself published,
> a call by a person, a letter, a meeting in person, an introduction. An
> e-mail, a text or a chat message waits for a yes, and the yes is kept.
> Every person's data lives in one private place; exclusion lists are
> read first; the first contact says who we are and where we
> found the data; a no is final; every commercial message says who we are
> and how to stop it. The doors
> differ by country; until a lawyer confirms a looser one, the house carries
> Spanish and EU law everywhere. Every change to the sales process is
> audited against this page.
> **Epistemic:** Through which doors may the house reach someone who did not ask, in each country?
> **Pragmatic:** Before a first contact, find the door in *The doors, by
> country* (`STD-049`) for the recipient's country; if there is none, do
> not make it.
> **Audience:** Agents · Oracles

**Binds:** every first contact made in Numen Games' or Numinia's name with
an organisation or a person who has not asked to hear from the house — by a
seller, an Oracle or an agent — and every template, list or tool that
prepares one. Not legal advice: the rows marked *pending* wait for a
lawyer.

## Rules

### The door comes first

**A door from the register.** A first contact MUST go through a door that
*The doors, by country* (`STD-049`) lists as open for the country where
the recipient is, and the record MUST say which in its `door` field
(`STD-039` OPP-018). No door, no contact.

**Nothing electronic until they ask.** An e-mail, a text, a chat, a
private message on a network or a website's contact form MUST NOT carry a
commercial message to someone who has not asked for it or expressly
authorised it — not even to ask whether we may write, and not to an
organisation's general mailbox either: the law protects organisations as
well as people. Three exceptions: the organisation published that channel
to receive exactly this (a call, a tender, a request for suppliers,
partners, sponsors or speakers); the recipient is a former client under
the conditions `STD-049` sets; or `STD-049` lists the channel as open for
that country and its row is *confirmed*. A public mailbox in a record
(`STD-039` OPP-017) says where to write once a door is open; it is not a
door.

**The yes is kept.** When someone asks to hear from us, the day, the door,
whom it covers, on what, by which channel, and their words MUST be kept in
the house's private contacts — never in this archive (`STD-039` OPP-006).
Withdrawing the yes stops everything, the day it arrives.

### Before and after

**One place for every person.** Every person's data the house holds for
a sale MUST be kept in the house's private contacts, with: organisation,
role, where the data was found, door, the yes, purpose and a no — not in a
mailbox, a phone or a notebook. Calling an organisation's published
switchboard without asking for anyone by name needs none of it.

**Exclusion lists first.** Before any commercial communication — a call,
a letter, or an e-mail to a former client — to a person who has not given
us their consent, the exclusion lists `STD-049` names for the country MUST
be read, and anyone on them is left out.

**The first contact says who and where from.** At the first contact with a
person whose data was not given by them, the house MUST say who it is,
where it found their data, why it uses it, and that they may object at
once — spoken on a call, written in a letter or a message. `STD-049` holds
the words.

**A no is final.** A no, in any words and through any channel, MUST end
every commercial contact with that person, by every channel. They are told
they can also join the exclusion list. The no is kept in a suppression
list holding only what identifies the person, the channel and the date,
and every list is checked against it before any contact.

**Every message says who and how to stop.** A commercial message MUST say
that it is commercial, name NUMEN GAMES S.L. and its postal address, and
give a free way to stop receiving them — in an e-mail, an e-mail address —
which is honoured the day it arrives. No tracking pixel or per-reader
tracked link goes in a commercial e-mail without consent.

### Where the law differs

**The strictest law travels.** The house is established in Spain: Spanish
and EU rules on commercial messages bind every message it sends, and the
GDPR follows every person's data it holds, wherever the person is. A
country's looser rule MAY apply only where a lawyer confirms that the
Spanish rule does not reach that recipient, and its row in `STD-049`
moves from *pending* to *confirmed*. The GDPR never gives way.

**Audited at every change.** Every pull request that changes a door, a
template of first contact, a list of targets or a step of the sales process
MUST check that change against this page and add a line to the *Audits* of
`STD-049`. A rule found wrong is changed here first.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| CLD-001 | A door from the register | the Oracle's ruling of 2026-10-08: legal by design | `machine/packages/sales-kit/pipeline.mjs` OPP-018: an open record with an `out` line carries a `door` from the register; by hand that the door is open in the recipient's country (`STD-049`) |
| CLD-002 | Nothing electronic until they ask | law: [LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) arts. 21, 38, 39 and annex f) | `machine/packages/sales-kit/pipeline.mjs` OPP-018: `contact_channel` email or form only through `published`, `asked`, `inbound` or `former-client`; `collateral.mjs` does not render the first-contact e-mail through any other door |
| CLD-003 | The yes is kept | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 7.1, 7.3; LSSI arts. 21.1, 22.1 | by hand; the private contacts are not yet built |
| CLD-004 | One place for every person | law: GDPR arts. 5.2, 30; [LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) arts. 19, 31 | nothing yet: the private contacts are not built — the first job before the calls of the week of 13 October |
| CLD-005 | Exclusion lists first | law: LOPDGDD art. 23.4; 16 CFR 310.4(b)(1)(iii)(B) | nothing yet: the house is not registered with the Lista Robinson |
| CLD-006 | The first contact says who and where from | law: GDPR arts. 14.3.b, 21.4; LOPDGDD art. 11 | by hand; the words are in `STD-049`, the e-mail's footer in the kit's template |
| CLD-007 | A no is final | law: GDPR art. 21.3; LOPDGDD arts. 23.1, 23.3; LSSI art. 22.1; 16 CFR 310.4(b)(1)(iii)(A) | by hand; the private contacts are not yet built |
| CLD-008 | Every message says who and how to stop | law: LSSI arts. 20.1, 21.2, 22.1, 22.2; [CAN-SPAM](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business), 15 U.S.C. 7704(a)(3)–(5) | `machine/packages/sales-kit/templates/first-contact-email.es.txt` carries the line; by hand on every other message |
| CLD-009 | The strictest law travels | law: GDPR art. 3.1; LSSI art. 2.1, 2.3 | by hand; each row's State column in `STD-049` |
| CLD-010 | Audited at every change | the Oracle's ruling of 2026-10-08 | by hand: the *Audits* table of `STD-049`, in the same pull request |

## Why

A message nobody asked for costs its reader attention and costs the house
trust, and in Spain it also costs a fine. The law already draws
the line in the place a decent seller would: go to those who asked, call
like a person, meet in person, and write once they say yes. Writing it down
as doors lets an agent prepare a first contact without guessing, and
keeping each country's rows apart lets the house enter a new market by
adding a table, not by improvising. The audit at every change is how a
sales process that is still being learnt stays inside the law while it
moves.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-049` | The doors, by country | the register of doors, exclusion lists and audits these rules read |
| `STD-035` | Personal data | the basis, the notice and the erasure that hold for every contact |
| `STD-038` | The stages of an opportunity | the `out` line a first contact writes |
| `STD-039` | An opportunity has a record | the public mailbox it may carry, and the names it may not |
| `STD-047` | The sales collateral | the first-contact pieces these doors gate |
| `OPS-007` | Sales — commercial strategy | the strategy these doors serve |
| `PRO-028` | Qualifying an opportunity | where a first contact is prepared |
| `LEG-001` | Privacy Policy — Numen Games | where the person is told what we hold |

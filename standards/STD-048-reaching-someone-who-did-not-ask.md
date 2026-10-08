---
id: "STD-048"
uid: ""
title: "Reaching someone who did not ask"
type: standard
subtype: standard
status: draft
version: "0.1.0"
created: "2026-10-08T13:00:00+02:00"
updated: "2026-10-08T13:00:00+02:00"
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
> Exclusion lists are read before calling or writing, a no is final, and
> every commercial message says who we are and how to stop it. The doors
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
*The doors, by country* (`STD-049`) lists as open for the country where the recipient is, and the
record's `out` line MUST name it. No door, no contact.

**Nothing electronic until they ask.** An e-mail, a text, a chat or a
private message on a network MUST NOT be sent to someone who has not asked
for it or authorised it — not even to ask whether we may write. Three
exceptions: the organisation published that channel to receive exactly
this (a call, a tender, a request for suppliers, partners, sponsors or
speakers); the recipient is a former client and the message is about
services like the ones they bought; or `STD-049` lists the channel as
open for that country and its row is *confirmed*.

**The yes is kept.** When someone asks to hear from us, the day, the door
and their words MUST be kept in the house's private contacts — never in
this archive (`STD-039` OPP-006). Withdrawing the yes stops everything,
the day it arrives.

### Before and after

**Exclusion lists first.** Before a call or a letter to a person who has
not said yes, the exclusion lists `STD-049` names for the country MUST
be read, and anyone on them is left out.

**A no is final.** A no, in any words and through any channel, MUST end
contact with that person for that purpose. The no is kept in the private
contacts, and every list is checked against it before any contact.

**Every message says who and how to stop.** A commercial message MUST say
who sends it, the house's postal address and a free, simple way to stop
receiving them, which is honoured.

### Where the law differs

**The strictest law travels.** The house is established in Spain:
Spanish and EU rules on personal data and commercial messages go with it to
every country. A country's own, looser rule MAY replace them only once a
lawyer confirms it, and its row in `STD-049` moves from *pending* to
*confirmed*.

**Audited at every change.** Every pull request that changes a door, a
template of first contact, a list of targets or a step of the sales process
MUST check that change against this page and add a line to the
*Audits* of `STD-049`. A
rule found wrong is changed here first.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| CLD-001 | A door from the register | the Oracle's ruling of 2026-10-08: legal by design | by hand, at the audit of every change (`STD-049` *Audits*); no field holds the door yet |
| CLD-002 | Nothing electronic until they ask | law: [LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) arts. 21, 38, 39 | by hand; the first-contact e-mail of `STD-047` is not rendered for a record without a yes — not yet checked by the kit |
| CLD-003 | The yes is kept | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 7.1, 7.3; LSSI art. 22.1 | by hand; the private contacts are not yet built |
| CLD-004 | Exclusion lists first | law: [LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) art. 23.4; 16 CFR 310.4(b)(1)(iii)(B) | nothing yet: the house is not registered with the Lista Robinson |
| CLD-005 | A no is final | law: GDPR art. 21.3; LSSI art. 22.1; 16 CFR 310.4(b)(1)(iii)(A) | by hand; the private contacts are not yet built |
| CLD-006 | Every message says who and how to stop | law: LSSI arts. 20, 21.2, 22.1; CAN-SPAM, 15 U.S.C. 7704(a)(3), (a)(5) | by hand, on every template of `STD-047` |
| CLD-007 | The strictest law travels | law: GDPR art. 3.1; LSSI art. 2 | by hand; each row's State column in `STD-049` |
| CLD-008 | Audited at every change | the Oracle's ruling of 2026-10-08 | by hand: the *Audits* table of `STD-049`, in the same pull request |

## Why

A message nobody asked for costs its reader attention and costs the house
trust, and in Spain it also costs a fine per message. The law already draws
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

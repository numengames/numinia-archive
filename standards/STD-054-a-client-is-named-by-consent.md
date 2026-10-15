---
id: "STD-054"
uid: ""
title: "A client is named by consent"
type: standard
subtype: standard
status: draft
version: "0.1.0"
created: "2026-10-15T10:28:18Z"
updated: "2026-10-15T10:28:18Z"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [standards, sales, opportunity, personal-data, consent, disclosure]
license: "CC0-1.0"
related: ["STD-039", "STD-035", "STD-048", "STD-040", "PRI-012"]
derived_from: "PRI-012"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A client is named by consent

> **Summary:** A record of an opportunity carries no person's name, and
> names the organisation only once it has agreed. Until then the record
> speaks of the sector, the size, the line of the house and what the deal is
> about. A client who asks to stay out is never named.
> **Epistemic:** Who may be named in the record of an opportunity, and when?
> **Pragmatic:** Write roles and channels, never people. Keep the
> organisation as sector and size until the client has been told the house
> works in the open, and name it only if it did not object.
> **Audience:** Agents · Oracles

**Binds:** every record of an opportunity kept in Numen Games' or Numinia's
name, its proposal, and every tool that reads them.

## Rules

### People

**Nobody's name.** A record and its proposal MUST carry roles and channels,
never a person's name, address, number or anything that identifies one — in
the header or in the body, and not even a public officer's, whose office is
the role. Who said what is kept where the conversation happened, outside the
archive. The record is public; a person did not choose to be. The only names
that MAY appear are those the house's card lists as named: its own people,
and a client's people whose signed agreement allows it.

### The organisation

**The organisation, named when it knows.** A record MUST name the
organisation by sector and size until the client has been told, in the
proposal, that the house works in the open. From then on the record MAY
carry its name with the disclosure `open`. A client who asks not to be named
is not named, at any stage, and the record carries `unnamed`. An
organisation that is a person — a sole trader, a professional — is never
named, unless its signed agreement allows it. A lost record MUST go back to
sector and size, whatever it said before: why a sale was lost is public; who
lost it to us is not. A tender's authority and a grant's funder are public
bodies that publish their call, and MAY be named at any stage.

**The organisation's door.** Once the organisation may be named — a tender,
a grant, or a record with the disclosure `open` — an open record MUST say
how to reach it: the page where the opportunity is described — the `call`
for a call, `web` for any other kind, and `web` on a call too when its
contact is published elsewhere — and `contact_email`, the mailbox the
organisation itself publishes for it: a contracting service, a call's
helpdesk, an information desk. It MAY go without one only when the
organisation takes contact by a form alone, and says so as its channel. The
mailbox MUST be the organisation's, never a person's: an address that names
someone is refused, wherever it is published. Before the organisation may be
named the record carries neither, since both would name it. A person found
on the way — a name, an own address, a phone — is kept outside the archive,
in the house's private contacts. The mailbox says where to write once a door
is open; it is not a door.

How little a record says about an organisation is read at review, not
checked by a tool: it keeps the least needed to pursue the opportunity,
under the house's legitimate interest in offering its services.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| NAM-001 | Nobody's name | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 5(1)(c), 6; `STD-035` PRV-001; the Oracle's ruling of 2026-10-02: not even a public officer, so no mistake can enter | `machine/packages/sales-kit/pipeline.mjs`: header fields against a closed list; the record and its proposal scanned for an e-mail, a phone, and anything that reads as a person's name — a common first name before a capitalised word, or a courtesy title — unless the card's *Who may be named* lists it; deliberately eager, a false alarm costs a look |
| NAM-002 | The organisation, named when it knows | the client's interest; customer-reference practice — a client's name used with its consent, withdrawable; `LCSP` art. 133 (a bidder's own offer is not the authority's to disclose) | `machine/packages/sales-kit/pipeline.mjs`: a name without `disclosure: open`, or any name in a lost record, is reported, a tender or a grant exempt; the client's answer is entered by the step of `PRO-029` that sets the disclosure |
| NAM-003 | The organisation's door | the Oracle's ruling of 2026-10-08: every record says where to write and where to read; a functional mailbox of an organisation is not personal data ([GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 4(1)); a person's professional address is: art. 19 of the [LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) lets the house hold it to deal with the organisation, and publishing it would exceed that | `machine/packages/sales-kit/pipeline.mjs`: `web` an address and `contact_email` one mailbox; neither before the organisation may be named; on an open named record, `web` required off a call and `contact_email` unless the channel is `form`; a mailbox whose local part holds a common first name refused under NAM-001; that field alone is exempt from the e-mail scan |

## Why

A person did not choose to be in a public file, and a client has not yet
chosen to be in one either. Roles and sectors let the pipeline stay open
while nobody can be identified by it.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-039` | An opportunity has a record | the record these rules apply to |
| `STD-035` | Personal data | what may be kept about the people met on the way |
| `STD-048` | Reaching someone who did not ask | the mailbox says where to write; it is not a door |
| `STD-040` | A proposal says four things | the proposal that tells the client the house works in the open |

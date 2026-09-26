---
id: "STD-035"
uid: ""
title: "Personal data"
type: documentation
subtype: standard
status: draft
version: "0.3.3"
created: "2026-09-25T13:00:00+02:00"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [standards, privacy, GDPR, LOPDGDD, personal-data]
related: ["OPS-003", "OPS-010", "STD-033", "BLU-017"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Personal data

> **Summary:** What we keep about a person, we keep on a lawful basis, for
> a purpose we have said, and only as long as needed. The person can see it,
> correct it, take it and have it erased.
> **Epistemic:** What may we keep about a person?
> **Pragmatic:** Decide whether a form, a log or a list may hold someone's
> data, and for how long. This is not legal advice.
> **Audience:** Agents · Oracles

**Binds:** everything of ours that collects or keeps data about a person.

## Rules

### Why we keep it, and for how long

**A basis and a purpose said first.** Personal data MUST be collected only on
a lawful basis, such as consent, a contract or a legal duty, and for a
purpose told to the person before collection. The notice says who we are and
how to reach us. We never reuse the data for another purpose, even a
compatible one.

**Blocked, then erased.** Once its purpose is done, personal data MUST be
blocked for as long as a claim over it can still arise, and then erased.
Blocked data is kept apart, out of any use, and reachable only by a court or
an authority.

### What the person can do

**The person is in charge of it.** Anyone MUST be able to see what we hold
about them, correct it, have it erased, limit its use, take it away in a
common format, and object to its use. They ask through the contact in our
privacy notice and get an answer within one month.

**Under fourteen, a parent decides.** Consent from anyone under fourteen
MUST come from a parent or guardian.

### What we keep ready

**A record of what we do with data.** We MUST keep a written record of each
use of personal data: what, why, whose, shared with whom, for how long. It
is the first thing an inspector asks for.

**A site says what it stores.** A public site MUST ask consent before it
stores anything in the visitor's browser that the requested service does not
need. Refusing is as easy as accepting, and consent is asked again when the
purposes change. A preference the visitor set, like the mode, needs none.
Beyond that, nothing is stored, loaded from anyone else, or measured and sent
from the visitor's device unless the cookie policy names it with its purpose
and duration.

**Anyone handling data for us signs first.** A supplier who processes
personal data on our behalf MUST do so under a written contract that binds
them to our instructions and to keeping it safe.

**A breach is reported within three days.** A breach of personal data that
puts people at risk MUST be reported to the Spanish data protection
authority within seventy-two hours of our knowing. When the risk is high,
the people affected are told too.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| PRV-001 | A basis and a purpose said first | law: [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 5(1)(b), 6, 13 | by hand; the privacy texts are `OPS-003`, a reserved legal text with open questions awaiting a lawyer |
| PRV-002 | Blocked, then erased | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 5(1)(e); [LOPDGDD, Ley Orgánica 3/2018](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) art. 32 | by hand; a lawyer confirms the blocking periods |
| PRV-003 | The person is in charge of it | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 12, 15–18, 20, 21 | by hand; the contact lives in `OPS-003` |
| PRV-004 | Under fourteen, a parent decides | law: [LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) art. 7; [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 8 | nothing yet: no age check exists |
| PRV-005 | A record of what we do with data | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 30 | nothing yet: no record is kept |
| PRV-008 | A site says what it stores | law: [ePrivacy Directive](https://eur-lex.europa.eu/eli/dir/2002/58/oj) art. 5(3); [LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) art. 22.2; [AEPD cookie guide, July 2023](https://www.aepd.es/guias/guia-cookies.pdf); holds retired DSN-015 | nothing yet: `check-storage` is described, and runs in none of the four sites (`RPT-021`); the inventory is `OPS-010` |
| PRV-006 | Anyone handling data for us signs first | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 28 | by hand; the suppliers' data processing terms, outside this repository |
| PRV-007 | A breach is reported within three days | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 33–34 | nothing yet: no breach procedure is written |

## Why

Data about a person is theirs, lent to us. A purpose said first stops a
list gathered for one thing from serving another. Blocking, then erasing,
keeps what a claim may need and nothing more. The record, the contracts and
the breach notice let us prove it when asked.

## References

| ID | Name | Why cited |
|---|---|---|
| `OPS-003` | Privacy Policy — Numen Games | the privacy notice these rules are kept in |
| `STD-033` | Every charge delivers something | what a payer may choose to show |
| `OPS-010` | Cookie Policy — Numen Games | the inventory every site is held to |
| `BLU-017` | Legal obligations to confirm | what remains to put in place |

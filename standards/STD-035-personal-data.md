---
id: "STD-035"
uid: ""
title: "Personal data"
type: documentation
subtype: standard
status: draft
version: "0.3.0"
created: "2026-09-25T13:00:00+02:00"
updated: "2026-09-26T12:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [standards, privacy, GDPR, LOPDGDD, personal-data]
related: ["OPS-003", "OPS-010", "STD-033", "BLU-017"]
series_change: "0.3.0 — 2026-09-26: what a site may store in a visitor's browser comes in from the design tokens standard, since it is about data kept on a person. One obligation moved in, held below 1.0.0 because only the Oracle promotes, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Personal data

> **Summary:** What we keep about a person, we keep on a lawful basis and
> for a purpose we have said, only as long as needed, and the person can see
> it, correct it, take it and have it erased.
> **Epistemic:** What the European data protection regulation and the
> Spanish law that completes it ask of us, in words anyone can check.
> **Pragmatic:** Decide whether a form, a log or a list may hold someone's
> data, and for how long. This is not legal advice.
> **Audience:** Agents · Oracles

**Binds:** everything of ours that collects or keeps data about a person.
**Does not bind:** data that cannot identify anyone.

## Rules

Every rule here is law, from the European data protection regulation, the
European and Spanish rules on cookies, and the Spanish data protection law;
a lawyer should confirm how each applies.

### Why we keep it, and for how long

**A basis and a purpose said first.** Personal data MUST be collected only on
a lawful basis — consent, a contract, a legal duty — and for a purpose told
to the person before collection, in a notice that says who we are and how to
reach us. It is never reused for a purpose the person would not expect. The
law requires this; refusing even compatible reuse is our choice.

**Blocked, then erased.** Once its purpose is done, personal data MUST be
blocked — kept apart, out of any use, reachable only by a court or an
authority — for as long as a claim over it can still arise, and then erased.
The law requires this.

### What the person can do

**The person is in charge of it.** Anyone MUST be able to see what we hold
about them, correct it, have it erased, limit its use, take it away in a
common format, and object to its use, through a contact in our privacy
notice, and get an answer within one month. The law requires this.

**Under fourteen, a parent decides.** Consent from anyone under fourteen
MUST come from a parent or guardian. The law requires this in Spain.

### What we keep ready

**A record of what we do with data.** We MUST keep a written record of each
use of personal data: what, why, whose, shared with whom, for how long. It
is the first thing an inspector asks for. The law requires this.

**A site says what it stores.** A public site MUST ask consent before it
stores anything in the visitor's browser that the service they asked for
does not need; refusing is as easy as accepting, and consent is asked again
when the purposes change. A preference the visitor set, like the mode,
needs none. The law requires this. By choice we go further: nothing is
stored, loaded from anyone else, or measured and sent from the visitor's
device unless the cookie policy names it with its purpose and duration.

**Anyone handling data for us signs first.** A supplier who processes
personal data on our behalf MUST do so under a written contract that
binds them to our instructions and to keeping it safe. The law requires
this.

**A breach is reported within three days.** A breach of personal data that
puts people at risk MUST be reported to the Spanish data protection
authority within seventy-two hours of our knowing, and to the people
affected when the risk is high. The law requires this.

This standard is over its word budget: the rights and duties the law sets
are one subject, and a shorter list would drop one of them.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| PRV-001 | A basis and a purpose said first | law: [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 5(1)(b), 6, 13; no compatible reuse is ours | by hand; the privacy texts are `OPS-003`, a reserved legal text with open questions awaiting a lawyer |
| PRV-002 | Blocked, then erased | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 5(1)(e); [LOPDGDD, Ley Orgánica 3/2018](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) art. 32 | by hand; a lawyer confirms the blocking periods |
| PRV-003 | The person is in charge of it | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 12, 15–18, 20, 21 | by hand; the contact lives in `OPS-003` |
| PRV-004 | Under fourteen, a parent decides | law: [LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) art. 7; [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 8 | nothing yet: no age check exists |
| PRV-005 | A record of what we do with data | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 30 | nothing yet: no record is kept |
| PRV-008 | A site says what it stores | law: [ePrivacy Directive](https://eur-lex.europa.eu/eli/dir/2002/58/oj) art. 5(3); [LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) art. 22.2; [AEPD cookie guide, July 2023](https://www.aepd.es/guias/guia-cookies.pdf); the named inventory is ours, stricter; holds retired DSN-015 | nothing yet: `check-storage` is described, and runs in none of the four sites (`RPT-021`); the inventory is `OPS-010` |
| PRV-006 | Anyone handling data for us signs first | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 28 | by hand; the suppliers' data processing terms, outside this repository |
| PRV-007 | A breach is reported within three days | law: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) arts. 33–34 | nothing yet: no breach procedure is written |

## Why

Data about a person is theirs lent to us, not ours. A basis and a purpose
said first stop a list gathered for one thing being used for another;
blocking, then erasing, keeps what a claim may need and nothing more; the
record, the contracts and the breach notice are what let us prove it when
asked.

## References

| ID | Name | Why cited |
|---|---|---|
| `OPS-003` | Privacy Policy — Numen Games | the privacy notice these rules are kept in |
| `STD-033` | Every charge delivers something | what a payer may choose to show |
| `OPS-010` | Cookie Policy — Numen Games | the inventory every site is held to |
| `BLU-017` | Legal obligations to confirm | what remains to put in place |

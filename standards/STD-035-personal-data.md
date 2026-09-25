---
id: "STD-035"
uid: ""
title: "Personal data"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-25T13:00:00+02:00"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [standards, privacy, GDPR, personal-data]
series_change: "0.1.0 — 2026-09-25: personal data gets a standard of its own, resting on the European data protection regulation."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Personal data

> **Summary:** What we keep about a person, we keep for a purpose we have
> said, only for as long as we need it, and the person can see it and have
> it erased.
> **Epistemic:** The few commitments the European data protection law asks
> of us, in words anyone can check us against.
> **Pragmatic:** Decide whether a form, a log or a list may hold someone's
> data, and for how long. This is not legal advice.
> **Audience:** Agents · Oracles

**Binds:** everything of ours that collects or keeps data about a person.
**Does not bind:** data that cannot identify anyone.

## Rules

### Why we keep it, and for how long

**A purpose said first.** Personal data MUST be collected only for a purpose
stated to the person before collection, and MUST NOT be used for another.

**Kept only as long as needed.** Personal data MUST be deleted once its
purpose is done, unless a law obliges us to keep it longer.

### What the person can do

**The person can see it and erase it.** Anyone MUST be able to ask what we
hold about them, receive it, and have it erased, through a contact given in
our privacy notice.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| PRV-001 | A purpose said first | [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj), purpose limitation | by hand; the privacy texts are `OPS-003`, a reserved legal text with open questions awaiting a lawyer |
| PRV-002 | Kept only as long as needed | [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj), storage limitation | by hand |
| PRV-003 | The person can see it and erase it | [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj), rights of access and erasure | by hand; the contact lives in `OPS-003` |

## Why

Data about a person is theirs lent to us, not ours. A purpose said first
stops a list gathered for one thing being used for another; a deletion date
stops a harmless list becoming a liability; a way to see and erase keeps the
person in charge. The European law asks all three already, and naming it
lets anyone hold us to it.

## References

| ID | Name | Why cited |
|---|---|---|
| `OPS-003` | Privacy Policy — Numen Games | the privacy notice these rules are kept in |
| `STD-033` | Charges and the account | what a payer may choose to show |
| `STD-011` | External standards | where this rule came from |

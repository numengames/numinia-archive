---
id: "DBT-024"
uid: ""
title: "The sales process cannot yet reach a named person"
type: documentation
status: active
version: "0.1.0"
created: "2026-10-08T17:00:00+02:00"
updated: "2026-10-08T17:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Sales and partners"
tags: [debt, sales, outreach, private-contacts, robinson, legal-by-design]
license: "CC-BY-4.0"
severity: high
severity_reason: "twelve open records plan calls for the week of 13 October; without the private contacts, the suppression list and a fixed line, a call to a named person would break STD-048"
detected: "2026-10-08T15:00:00+02:00"
visibility: "public"
visibility_reason: "the sales process is public like the records it moves; what is missing is no secret"
opened_by: "ursa"
related: ["STD-048", "STD-049", "STD-047", "OPS-007", "PRO-028", "DBT-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# DBT-024 — The sales process cannot yet reach a named person

> **Summary:** `STD-048` says how the house reaches someone who did not
> ask. The review of 8 October 2026 found what it needs and does not have:
> a private place for people's data with a suppression list, a Lista
> Robinson registration, a fixed line for calls, a call script in the kit,
> and a commercial strategy that matches what the house sells today.
> **Epistemic:** Until these close, the house may call an organisation's switchboard, but not a person by name.
> **Pragmatic:** Close rows 1–3 before the calls of the week of 13 October; strike each row with what closed it.
> **Audience:** Oracles · Agents

---

## 1. The defect

| # | Item | Who |
|---|---|---|
| 1 | The private contacts: one place outside the archive holding, per person, organisation, role, where the data was found, door, the yes, purpose and a no; the no's are the suppression list, checked before any contact (`STD-048` CLD-004, CLD-007). Where it lives and who reaches it is undecided. | company |
| 2 | Register Numen Games S.L. with the Lista Robinson (Adigital) as a company, and log each consultation (`STD-048` CLD-005). | company |
| 3 | A fixed line, or an 800/900 number, for commercial calls: a mobile number may not be used (Orden TDF/149/2025 art. 9). | company |
| 4 | The record of processing activities, with an entry for prospecting (`DBT-022` #20). | company · counsel |
| 5 | The call script and the letter of `STD-047` exist only as rows: write them as templates of the sales kit, in Spanish, with the spoken and written notice of `STD-049`. | ours |
| 6 | `OPS-007` is still April 2026's strategy for NWOS: its ideal client, prices, typed funnel and eight-week pilot no longer match what the house sells (`OPS-012`, `OPS-013`). Rewrite it: the lines and clients of the house's card, the doors per client, weekly activity targets, prices read from the offers, the funnel read from the pipeline. | ours · Oracle |
| 7 | The one-page sheet handed out at events carries no notice and no way to give the yes to write: add the short notice and a consent QR code. | ours |

## 2. Evidence

```
$ node machine/packages/sales-kit/pipeline.mjs opportunities   # before the review
OPP-018 ... contact_channel email through the door `none`   (×11, and one form)
$ grep -n "nothing yet" standards/STD-048-reaching-someone-who-did-not-ask.md
CLD-004 · CLD-005 — nothing yet
```

## 3. Closure condition

> **Closes when:** every row above is struck through with the pull request
> or the document that closed it, and `STD-048` CLD-004 and CLD-005 say how
> they are verified instead of "nothing yet".

## 4. Cost of leaving it open

A call to a named person whose data has nowhere lawful to live, or who is on
the Lista Robinson, or a call from a mobile, is an infringement the house
can avoid by doing three small things first. A strategy that describes
another product sends whoever reads it after the wrong client.

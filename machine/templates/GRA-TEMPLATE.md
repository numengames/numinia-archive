---
# Copy this file to funding/GRA-YYYY-NNN.md and fill it in. The record is
# PUBLIC: its rules are STD-046 (the record) and STD-045 (stages, instruments,
# payments, reasons); the chance is STD-038's. Nobody's name, e-mail or phone.
# The funder is a public body and is named. Read the call against the house's
# card for grants (OPS-019) into the Criteria table below.
id: "GRA-YYYY-NNN"
uid: ""
title: "The call, in a line"
type: grant
# status: the DOCUMENT's state; how the CALL goes is `state`, below.
status: active
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
guild: "Procurators"
territory: "Funding"
tags: [funding, grants]
license: "CC0-1.0"

# THE CALL — every field below is read by the funding tool.
funder: "the public body that calls"
# instrument: grant | loan | prize | programme (STD-045)
instrument: "grant"
# amount: the most the house could receive, in EUR; 0 for a programme.
amount: 0
currency: "EUR"
# payment: advance | on-justification | in-kind (STD-045)
payment: "advance"
# advance: the share paid before the work, 0 to 100.
advance: 100
call: "https://…"
opens: "YYYY-MM-DD"
closes: "YYYY-MM-DD"
# estimated: yes while the call is not out (the days are last year's); no once read from the gazette.
estimated: "yes"
# state: foreseen | open | applied | granted | justified | paid | denied | declined (STD-045)
state: "foreseen"
# chance: high | medium | low | none (STD-038) — follows the Criteria table.
chance: "medium"
next_action: "what happens next, in one line"
next_date: "YYYY-MM-DD"
opened: "YYYY-MM-DD"

# WHEN DUE — absent until the stage asks for them; never written empty.
# granted: 0                                     # from granted: the amount the resolution gives
# closed: "YYYY-MM-DD"                           # at paid, denied or declined
# reason: "not-eligible"                         # denied or declined: not-eligible | not-a-fit | no-cash | timing | outscored | excluded
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# GRA-YYYY-NNN — the call

> **Summary:** What the call funds, how much, how it pays, when it closes —
> and the house's chance in one line.
> **Epistemic:** Can the house take this money, and carry the work until it is paid?
> **Pragmatic:** Prepare the next step, or decide not to apply.
> **Audience:** Funding · Oracles

## Criteria

One row per condition of the call, read against the house's card for grants.

| Criterion | The call asks | The house | Meets |
|---|---|---|---|
| Who may apply | … | … | check |

## Transitions

| Date | From | To | By | Evidence |
|---|---|---|---|---|
| YYYY-MM-DD | — | foreseen | who found it | how it reached us |

## Notes

What was learnt, dated, without anyone's name.

---
# Copy to reports/RPT-NNN-<yyyy>-w<ww>.md for a week that ended on Sunday.
# The shape is set by the report standard (STD-043): nine headings, in this
# order, for a board that does not know the work. Delete the guidance.
id: "RPT-NNN"
uid: ""
title: "What happened in the week, in one line a board member understands"
type: report
subtype: rollup
# a roll-up opens as draft while its figures are provisional (no ledger yet)
status: draft
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [report, rollup, week]
license: "CC-BY-4.0"
visibility: "public"
period: "YYYY-Www"
evidence_script: "machine/scripts/telemetry.mjs"
evidence_head: "<sha of the last commit of the period>"
# every identifier this report replaces; the lower level's list moves whole
absorbs: []
related: ["STD-043", "PRO-017"]
---

# Week WW of YYYY

> **Summary:** One sentence: what the week changed for the company.
> **Epistemic:** The state of the whole organisation at the close of the period.
> **Pragmatic:** What a board member needs before the next meeting.
> **Audience:** Oracles · the board · the public

## 1. The period in brief

Three numbered lines. Enough for a reader who reads nothing else.

1. …
2. …
3. …

## 2. Business and customers

Opportunities opened, won and lost, with their value and the stage they
reached; proposals sent; customers served. A table against the period
before. Where the sales records are empty, say so in one line.

| | week before | this week |
|---|---|---|
| Opportunities open | | |
| Won · lost | | |
| Value in play (EUR) | | |

## 3. Money

Income, spend and cash from the ledger, billed and consumed, against the
period before. Until the ledger feeds the archive: "No figures: the ledger
is not wired yet." Never an estimate presented as a figure.

| EUR | week before | this week |
|---|---|---|
| Income | | |
| Spend | | |
| Cash at close | | |

## 4. Products and services

What customers and visitors can use that they could not before: the four
sites, the platform, the offers. One line per product, with its version
at the close of the period.

## 5. The world and its creations

The lore, the manual, adventures, art and assets: what was written,
translated, licensed or published.

## 6. People and agents

Who works here — Oracles, agents, contributors — who joined or left, and
what each was trusted with. Changes in how agents are operated.

## 7. Governance

Canon, standards, protocols and decisions that changed a rule, and which
came into force. Legal texts published or changed.

## 8. Risks and debts

Debts opened and closed, open questions for counsel, anything that could
hurt the company, each with who holds it.

## 9. The outlook

What next week will decide, in one or two lines.

## The archive in figures

| | week before | this week | change |
|---|---|---|---|
| Documents | | | |
| Corpus, tokens | | | |
| Pull requests merged | | | |
| Open missions · debts | | | |

Measured by `machine/scripts/telemetry.mjs` at `<sha>`.

## Closed and removed

One line per record this report absorbs: identifier, title, one sentence
copied from its closure, and its mark — `rule`, `debt`, `address` or
`none`. Only the first three are carried up to the quarter.

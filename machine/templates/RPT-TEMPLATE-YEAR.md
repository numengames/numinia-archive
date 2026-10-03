---
# Copy to reports/RPT-NNN-<yyyy>.md; it absorbs the year's four quarterlies.
# The shape is set by the report standard (STD-043): nine headings, in this
# order, for a board that does not know the work. Delete the guidance.
id: "RPT-NNN"
uid: ""
title: "What the year was, in one sentence a stranger understands"
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
section: "Knowledge and quality"
tags: [report, rollup, year]
license: "CC-BY-4.0"
visibility: "public"
period: "YYYY"
evidence_script: "machine/scripts/telemetry.mjs"
evidence_head: "<sha of the last commit of the period>"
# every identifier this report replaces; the lower level's list moves whole
absorbs: []
related: ["STD-043", "PRO-017"]
---

# YYYY

> **Summary:** One sentence: what the year made of the company.
> **Epistemic:** The state of the whole organisation at the close of the period.
> **Pragmatic:** What a board member needs before the next meeting.
> **Audience:** Oracles · the board · the public

## 1. The period in brief

One paragraph, no list. Then one row per quarter.

### Our story so far

Told by an Oracle: from the founding to the end of this year. Each annual
report copies last year's story and adds this year to it; nothing earlier
is rewritten.

## 2. Business and customers

Opportunities opened, won and lost, with their value and the stage they
reached; proposals sent; customers served. A table against the period
before. Where the sales records are empty, say so in one line.

| | year before | this year |
|---|---|---|
| Opportunities open | | |
| Won · lost | | |
| Value in play (EUR) | | |

## 3. Money

Income, spend and cash from the ledger, billed and consumed, against the
period before. Until the ledger feeds the archive: "No figures: the ledger
is not wired yet." Never an estimate presented as a figure.

| EUR | year before | this year |
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

The promises the company carries into next year, three to five lines.

## The archive in figures

| | year before | this year | change |
|---|---|---|---|
| Documents | | | |
| Corpus, tokens | | | |
| Pull requests merged | | | |
| Open missions · debts | | | |

Measured by `machine/scripts/telemetry.mjs` at `<sha>`.

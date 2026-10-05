---
# Copy to reports/RPT-NNN-<yyyy>-q<n>.md; it absorbs the quarter's weeklies (ISO weeks, by their Thursday).
# The shape is set by the report standard (STD-043): nine headings, in this
# order, for a board that does not know the work. Delete the guidance.
id: "RPT-NNN"
uid: ""
title: "What the quarter changed, in one line"
type: report
subtype: rollup
# a roll-up opens as draft while its figures are provisional (no ledger yet)
status: draft
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "person-responsible"
section: "Knowledge and quality"
tags: [report, rollup, quarter]
license: "CC-BY-4.0"
visibility: "public"
period: "YYYY-Qn"
evidence_script: "machine/scripts/telemetry.mjs"
evidence_head: "<sha of the last commit of the period>"
# every identifier this report replaces; the lower level's list moves whole
absorbs: []
related: ["STD-043", "PRO-017"]
---

# The Nth quarter of YYYY

> **Summary:** One sentence: where the company stands at the close of the quarter.
> **Epistemic:** The state of the whole organisation at the close of the period.
> **Pragmatic:** What a board member needs before the next meeting.
> **Audience:** People responsible · the board · the public

## 1. The period in brief

Five numbered lines. Then a table with one row per week: its title and
its figures, so the trend reads at a glance.

| Week | The week in one line | PRs | Documents |
|---|---|---|---|

## 2. Business and customers

Opportunities opened, won and lost, with their value and the stage they
reached; proposals sent; customers served. A table against the period
before. Where the sales records are empty, say so in one line.

| | quarter before | this quarter |
|---|---|---|
| Opportunities open | | |
| Won · lost | | |
| Value in play (EUR) | | |

## 3. Money

Income, spend and cash from the ledger, billed and consumed, against the
period before. Until the ledger feeds the archive: "No figures: the ledger
is not wired yet." Never an estimate presented as a figure.

| EUR | quarter before | this quarter |
|---|---|---|
| Income | | |
| Spend | | |
| Cash at close | | |

## 4. Products and services

What customers and visitors can use that they could not before: the sites,
the products, the offers. One line per product, with its version
at the close of the period.

## 5. The world and its creations

What the organisation created — content, documentation, designs and
assets: what was written,
translated, licensed or published.

## 6. People and agents

Who works here — people responsible, agents, contributors — who joined or left, and
what each was trusted with. Changes in how agents are operated.

## 7. Governance

Principles, standards, procedures and decisions that changed a rule, and which
came into force. Legal texts published or changed.

## 8. Risks and debts

Debts opened and closed, open questions for counsel, anything that could
hurt the company, each with who holds it.

## 9. The outlook

The quarter ahead: what is committed, what is at stake, what the board
will be asked to decide.

## The archive in figures

| | quarter before | this quarter | change |
|---|---|---|---|
| Documents | | | |
| Corpus, tokens | | | |
| Pull requests merged | | | |
| Open missions · debts | | | |

Measured by `machine/scripts/telemetry.mjs` at `<sha>`.

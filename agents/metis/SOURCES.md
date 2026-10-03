---
agent: metis
title: "SOURCES — Metis"
type: agent
status: draft
version: "0.3.2"
created: "2026-09-28T18:00:00+02:00"
updated: "2026-10-03T20:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, metis, sales, sources]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Metis

Where this agent's authoritative project knowledge lives. Pointers, not copies:
the repository is the source of truth and this file only says where to look.

## What the house sells

`operations/OPS-012-training-the-offer.md` — the Training offer: what is
delivered, how learning is judged, the cases, how price is set.

`operations/OPS-011-positioning-and-market.md` — what the house says to a
buyer: the problem it names, who it sells to.

`operations/OPS-007-sales.md` — the commercial strategy: ideal client, funnel,
current blockers.

## How a sale is run

`protocols/PRO-033-screening-a-tender.md` — how a public tender is screened:
from the terms, never a summary; bid, possible or decline with the clause.
Then `PRO-031` to bid, and `PRO-032` for a grant. The portable adapter for
any agent is `agents/skills/tender-screening/SKILL.md`.

`operations/OPS-018-the-house-card.md` — what calls usually ask, what the
house holds, and what would unlock each gap.

`standards/STD-038-the-stages-of-an-opportunity.md` — the kinds of
opportunity, the stages of each, and the timeline's events that move it.

`standards/STD-039-an-opportunity-has-a-record.md` — one record per
opportunity of any kind, its header and timeline, and what never enters it.

`standards/STD-040-a-proposal-says-four-things.md` — what a proposal must say
before it leaves the house.

`protocols/PRO-028-qualifying-an-opportunity.md`,
`protocols/PRO-029-making-a-proposal.md`,
`protocols/PRO-030-closing-a-sale.md` — the steps.

`system/SYS-010-selling-as-wired-today.md` — which parts of the sales system
are wired today and which are not.

## The records

`opportunities/` — every opportunity and its proposals.

`machine/templates/OPP-TEMPLATE.md` and `PRP-TEMPLATE.md` — the one record
template for every kind, and the proposal template. `machine/packages/sales-kit/pipeline.mjs` — the tool that
checks the records and computes the pipeline.
The published view is `/system/pipeline` on numinia.org.

## Brand and voice

`canon/CAN-002-brand-and-culture.md` — the house's identity and voice when a
draft speaks for it.

---

When a needed fact is not in these sources: say what is missing, consult
`agents/INDEX.md` for the right specialist, or ask the operator. Do not invent
project-specific facts.

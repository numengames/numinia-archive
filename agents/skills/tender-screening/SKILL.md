---
name: tender-screening
description: "Use when a public tender reaches you — a link, an aggregator's card, an alert. Run the screening protocol: bid, possible or decline, from the authority's own terms."
title: "SKILL — tender-screening"
type: agent
status: active
version: "2.1.0"
created: "2026-10-01T16:00:00+02:00"
updated: "2026-10-02T12:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [agents, skill, tenders, public-procurement, screening]
license: "CC0-1.0"
registration: exempt
registration_reason: "a cross-agent skill is identified by its folder name, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Screening a tender for Numen Games

An adapter: it holds no steps of its own. The procedure is the archive's
protocol **PRO-033 Screening a tender** (`protocols/PRO-033-screening-a-tender.md`);
follow it step by step. Any agent on any model can be given this file with
the tender's link or card.

## Read before you start

1. `protocols/PRO-033-screening-a-tender.md` — the steps, from the file
   number to the verdict, the record and the answer to the Oracle.
2. `operations/OPS-018-the-house-card.md` — what calls usually ask, what
   the house holds, its turnover ceiling, what it does not make.
3. `standards/STD-038-the-stages-of-an-opportunity.md` — a tender's stages,
   where a call was read, what the buyer really buys, the house's chance,
   and the table for weighing a tender.
4. `standards/STD-039-an-opportunity-has-a-record.md` — what the record
   must carry; `node machine/packages/sales-kit/pipeline.mjs opportunities`
   judges it.

## The one rule you must not break

No verdict without the authority's own terms read. An aggregator's summary
can invent the object — it once turned a forklift and crane simulator,
bought whole with its joysticks, into "a multimedia platform with 3D
models". If the terms cannot be found, say so and stop.

## Mistakes already made

- Trusting an aggregator's summary: the real object was another.
- Assuming offers go through the state platform when the authority has its
  own portal.
- Missing the deadline for questions to the authority, usually a week
  before the offers close.
- Judging fit by words in the title ("simulator", "multimedia", "3D",
  "gamification") instead of the deliverable in the technical terms.
- Forgetting the cash: a contract that makes the house buy material first
  and pays sixty days later can sink a company with no cushion.
- Recording a tender the house cannot win. A tender that fails a hard
  requirement is not recorded; its lesson goes to the card.

## When you are done

If the verdict is bid or possible, the record is written and the tool is
green; if decline, nothing is recorded and the card holds the lesson. The
Oracle has the answer in Spanish, in the form the protocol's last step
gives. After bid or possible, the next protocol is
`protocols/PRO-031-bidding-for-a-tender.md`.

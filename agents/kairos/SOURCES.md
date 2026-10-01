---
agent: kairos
title: "SOURCES — Kairos"
type: agent
status: draft
version: "0.1.0"
created: "2026-10-02T12:00:00+02:00"
updated: "2026-10-02T12:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [agents, kairos, opportunities, sources]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Kairos

Where this agent's authoritative project knowledge lives. Pointers, not copies:
the repository is the source of truth and this file only says where to look.

## What the house sells, and what it does not

`operations/OPS-012-training-the-offer.md` — Training: a browser 3D place
where an organisation's people rehearse a procedure.

`operations/OPS-013-live-gamification-the-offer.md` — live gamification for
events: roles and territories run by a crew.

`operations/OPS-018-the-house-card.md` — what calls usually ask, what the
house holds, what would unlock each gap, what the house makes and does not
make, and the figures a screening reads. A watch's sense of "ours" comes from
here, never from a private list.

`operations/OPS-011-positioning-and-market.md` — who the house sells to.

## How a found opportunity is weighed

`protocols/PRO-033-screening-a-tender.md` — screening one tender from its
terms; the portable adapter is `agents/skills/tender-screening/SKILL.md`.

`protocols/PRO-032-applying-for-a-grant.md`, `protocols/PRO-031-bidding-for-a-tender.md`
— what happens after the Oracle says yes.

`protocols/PRO-028-qualifying-an-opportunity.md` — where a found lead goes
next, in the sales agent's hands.

`standards/STD-038-the-stages-of-an-opportunity.md` — the kinds of
opportunity, their stages, and *Weighing a tender*, the chance scale.

## Where found opportunities are kept

`opportunities/` — every opportunity the house has accepted, one record
each (`standards/STD-039-an-opportunity-has-a-record.md`), moulded on
`machine/templates/OPP-TEMPLATE.md` and checked by
`machine/packages/sales-kit/pipeline.mjs`. A watch skips what is already
here. The published view is `/system/pipeline` on numinia.org.

## Not yet in the archive

The watching procedure itself — which places each watch sweeps, how often,
the doubt rule, what is brought to the Oracle, how filters are retuned — and
the sweep script of the first watch (tenders and grants) still live in the
instantiating platform's profile. They are to be carried here as a protocol, a
watch template and a package under `machine/packages/`, so that any machine
can rebuild every watch from this repository alone.

---

When a needed fact is not in these sources: say what is missing, consult
`agents/INDEX.md` for the right specialist, or ask the operator. Do not invent
project-specific facts.

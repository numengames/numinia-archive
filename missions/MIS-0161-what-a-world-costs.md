---
id: "MIS-161"
uid: ""
title: "What a world costs: a cost model by piece — machine share, hours on, voice, agents, event boost — before any public price"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-10T12:00:00+02:00"
updated: "2026-10-10T12:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [virtual-worlds, hosting, pricing, cost-model, pay-as-you-go, offers]
license: "CC0-1.0"

priority: medium
effort: S
executor: hybrid
assigned_to: null
completed: null

depends_on: ["MIS-156"]
requires_oracle_approval: true
context: "2026-10-10T12:00:00+02:00"
paths: [operations/OPS-012-training-the-offer.md, designs/]
related: ["MIS-156", "MIS-159", "OPS-012", "OPS-018"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-161 — What a world costs

> **Summary:** The earlier AWS setup scaled well but came as one block:
> everything on, about 500 € a month, or nothing. The fleet of small
> machines makes a world a sum of pieces, each with a cost: its share of a
> machine (size), the hours it is on, voice (LiveKit), agents inside it, an
> event-day boost. This mission writes that cost model — the house's real
> costs per piece — so the offer can charge by use, and so each world's
> order carries the fields the model needs.
> **Epistemic:** numen.games/hosting sells two plans (shared or own
> server) by monthly fee. The model underneath is missing; without it
> "pay as you go" cannot be measured or shown in the Worlds room.
> **Pragmatic:** A design page with costs, no public price. Prices stay the
> Oracle's call (`OPS-012`'s floor rule); the page gives him the numbers.
> **Audience:** Oracles

---

## 1. Scope

- A design page: the pieces, each with its unit (machine-month share,
  world-hour on, voice-minute or voice-room-hour, agent-hour, boost-day),
  the house's cost per unit from OVH and LiveKit price lists, and how a
  world's monthly cost is computed from its order and its on/off history.
- The fields an order needs for the model (`size` or machine class, `voice`,
  `agents`) proposed as a change to numinia-assets' order shape, for the
  room to show and the reconciler to apply later.
- How the offer page's two plans map onto the model.

Out of scope: any public price; billing or invoicing; changing the offer
page; metering code (a later mission once the model stands).

---

## 2. Acceptance criteria

- [ ] The design page lists every piece with a unit, a source for its cost
  and a date. Today: no such page.
- [ ] Worked example: the cost of one world on a shared machine, on 24/7 for
  a month, and the same world on 40 hours, both computed from the page.
  Today: not computable.
- [ ] The order fields are proposed as a pull request on numinia-assets'
  README and test, not merged until the Oracle accepts the model. Today: no
  fields.

---

## 3. Closure

*(Fill when the mission closes.)*

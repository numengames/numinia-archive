---
id: "ADR-042"
uid: ""
title: "The corpus rolls up weekly"
type: adr
status: active
version: "1.1.3"
created: "2026-09-08T22:00:00Z"
updated: "2026-10-03T22:00:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC-BY-4.0"
guild: "Alchemists"
section: "Knowledge and quality"
tags: [decisions, adr, deflation, rollup, lifecycle, lesson]
deciders: ["oracle"]
consulted: ["ursa"]
outcome: accepted
decision: "Records roll up weekly, quarterly and annually; what survives is what changed a rule, opened a debt, or produced an address; git is the daily record."
amends: ["ADR-030", "PRI-001"]
related: ["STD-012", "PRO-017", "STD-025", "RPT-018"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# ADR-042 — The corpus rolls up weekly

> **Summary:** Ratifies `STD-012` (the rule) and `PRO-017` (the procedure);
> amends `ADR-030` so a period roll-up is a written resolution; amends
> `PRI-001` with the principle *a system that only adds is not contained*.
> **Epistemic:** The record of the most important lesson of April–September
> 2026: the archive grew faster than anyone could read it.
> **Pragmatic:** Closed records leave the corpus every week without the
> Oracle's hand.
> **Audience:** Agents · Oracles

## 2. Decision

1. `STD-012` is ratified: three levels (weekly, quarterly, annual); git is
   the daily; a line survives if it changed a rule, opened or closed a debt,
   or produced an address; identifiers resolve to the highest living level.
2. `PRO-017` is ratified and mandatory: the weekly roll-up runs every Monday
   before the Dark Council, by any agent.
3. `ADR-030` test 3 accepts a period report that carries the record's line.
4. `PRI-001` gains one paragraph under *Numinia's Rituals*: the Dark Council
   opens with the roll-up; a contained system forgets on schedule.
5. `debt/` and `designs/` follow the same exit as `missions/`: a line,
   then deletion. `decisions/` do not roll up; their deflation is rules
   moving into standards.

## 4. Consequences

- `DEF-002` has no guard: `period` is not read by any script. Recorded here,
  not as a `DBT-` file; it closes when a guard reads it.
- `RPT-017` stays closed for growth; `RPT-018` is the alpha's index of
  weeks, not its narrative.

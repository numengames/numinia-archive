---
id: "MIS-297"
uid: ""
title: "Let a machine create a world from a named engine template"
type: mission
status: todo
version: "0.1.0"
created: "2026-11-06T12:45:00Z"
updated: "2026-11-06T12:45:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [fleet, machine, templates, worlds]
license: "CC0-1.0"

priority: medium
weight: 5
model_planned: sonnet
budget_usd: 0.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null

parent_mission: "MIS-296"
context: "2026-11-06T12:45:00Z"
paths: ["open-worlds/machine/reconcile.py", "open-worlds/machine/fleetd.py", "open-worlds/machine/walletsig.py", "open-worlds/machine/nightly.py", "open-worlds/machine/README.md"]
related: ["MIS-0296", "MIS-0298"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-297 — Let a machine create a world from a named engine template

> **Summary:** A machine creates worlds from a signed `CreateWorld` request
> with no template, so every world is born as the engine's default. This
> mission adds a signed request that names a template, keeps it in the
> world's order, and passes it to the engine as `MOTOR_PLANTILLA`.
> **Epistemic:** Which template a world was born from, on the machine that runs it.
> **Pragmatic:** The room can ask for a world born as `hermes` or any template the engine ships.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle creating a world from the room, I want the machine to honour
the template I chose, so that the world is born with that content.

---

## 2. Scope

`numinia-assets`, `open-worlds/machine/` only, one pull request. The recipe is still there on 2026-11-06; if it has moved to `numinia-fleet` when this mission starts, the mission follows it there.

On 2026-11-06 at 12:30 UTC, `CreateWorld` signs `machine`, `world`, `domain`, `image`, `memory`, `cpus`, `maxUploadMb`, `nonce` and `expires`. `clean()` in `reconcile.py` keeps `org` as its only optional field, and `engine_service()` maps it to an engine setting.

The mission:

- adds a new signed request type `CreateWorldFromTemplate`: `CreateWorld`'s fields plus `template`. A new type, so a machine that does not know it refuses it by name, and the room's `CreateWorld` keeps working unchanged;
- checks `template` against the engine's own name rule (`^[a-z0-9][a-z0-9_-]{0,30}$`) in `refusal()`;
- keeps it in the cleaned order and in `nightly.py`'s kept keys, and sets `MOTOR_PLANTILLA` in `engine_service()` when present. The engine reads it only on a world's first boot, so later passes change nothing;
- adds a key `templates: true` to `/fleet/v1/machine`, the way `imports` and `versions` tell the room what the machine can do;
- adds tests beside the existing ones, and a line in `README.md`.

### Out of scope

The room's side (`MIS-298`), and a list of templates kept on the machine. The names come from the engine release.

---

## 3. Acceptance criteria

- [ ] A test signs a `CreateWorldFromTemplate` with `template: "hermes"` and finds `MOTOR_PLANTILLA=hermes` in the rendered compose for that world (today: no such request).
- [ ] A test with `template: "../x"` is refused with a reason that names the rule, not the value.
- [ ] A test with plain `CreateWorld` renders the same compose as before this change.
- [ ] The repository's checks pass (the machine's Python tests and REUSE).

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 5 «sube el nivel».
- Why this card: the signed contract with live machines, contained by a new type and the `org` pattern.
- Process: blind rounds on 2026-11-06 (round 1: doulos 3, talos 8, senet 3; round 2: all 5); sealed by Ursa as Scrum Master.

**Time — how much work there is**
- 30 minutes, in one board card titled `MIS-297 · …`.
- Like: the `org` field in orders (`reconcile.py`, `MOTOR_PASE_ORG`).
- Biggest risk: the signed type must match, field for field, what the room hashes. `MIS-298` copies it from here.

---

## 5. What we learned

*(Written at the end.)*

---

## 6. Invoice

*(Pasted by the invoice script.)*

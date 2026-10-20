---
title: "SKILL reference — Building limits"
type: agent
status: active
version: "1.0.0"
created: "2026-10-20T14:00:00+02:00"
updated: "2026-10-20T14:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, skill, reference]
license: "CC0-1.0"
registration: exempt
registration_reason: "a reference file of a cross-agent skill is identified by its path inside the skill folder (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Limits

Whatever you do, the world decides; these are the caps it and the relay apply. If one refuses you, read its reason once, change what you ask, and do not repeat the same call.

| What | Limit |
|---|---|
| Permission | your role needs `build-in-worlds`; `quien_soy` lists your permissions |
| Rest | Dormida: no building; a change of state reaches you within about 10 minutes |
| The world | its owner may close building to AIs; the refusal says so |
| Rate | 12 changes every 10 s (`colocar`, `mover`, `borrar`, `deshacer`); a refusal for the cap does not count, a refusal for bad numbers does |
| Reach | 40 m from your body, for placing, moving and walking |
| Size | `escala` 0.1 to 10 per axis |
| Position | x and z within ±2000 m; y 0 to 30 m |
| Names | an object's name, 40 characters; what you say, 190 |
| Call | arguments up to 4096 bytes |
| Undo | your last 50 changes |
| A zone | holds at most 2000 objects; a full zone refuses more |
| Presence | 3 AIs of your organization inside worlds at once; your body leaves after 10 minutes without a call |
| Models | only those `mirar` lists: CC0 or the house's own work |

You never change another person's permissions, moderate anyone or lift a cap. Ask the person who answers for you (Panel › Agents) for a role that builds.

## Next

- `guia recetas` — work that fits inside the caps.

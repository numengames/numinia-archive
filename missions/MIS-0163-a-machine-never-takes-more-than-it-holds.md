---
id: "MIS-163"
uid: ""
title: "A machine never takes more than it holds: each world reserves its share, the machine refuses a world that does not fit, and the room says why"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T13:11:36+02:00"
updated: "2026-10-12T13:11:36+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, capacity, admission-control, numinia-web]
license: "CC0-1.0"

priority: high
effort: M
executor: hybrid
assigned_to: null
completed: null

depends_on: ["MIS-162"]
requires_oracle_approval: true
context: "2026-10-12T13:04:00+02:00"
paths: [system/SYS-014-the-worlds-fleet-as-wired.md]
related: ["MIS-162", "MIS-164", "MIS-167", "MIS-161", "SYS-014", "DBT-025"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-163 — A machine never takes more than it holds

> **Summary:** A machine's door accepts any Create or Start today, whatever
> the machine already carries: open-1 runs two worlds whose ceilings add up
> to 4 GB of memory and 3 processors, the whole machine and more. This
> mission gives each world a reservation — the memory and processor its
> machine sets aside for it — beside its ceiling; the machine counts
> reservations against what it can give and refuses a world that does not
> fit; the room shows *open-1: 3 of 3.5 GB reserved* and switches Create and
> Start off, saying why.
> **Epistemic:** The difference between what a world is promised (its
> reservation, which the count uses) and what it spends this minute
> (`MIS-162`, which the count shows but does not use: an empty world can fill
> up in five minutes).
> **Pragmatic:** The machine never chokes; the Oracle decides which world
> goes to sleep to make room.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **The order gains a reservation** (memory and processor) beside its
  ceiling. The starting point is what César's paused AWS cluster asked for
  each world, about 256 MiB and a quarter of a processor; the default is set
  from what `MIS-162` measures an empty world spends.
- **What a machine can give:** its memory and processors minus a share it
  keeps for itself (the system, Docker, Caddy, the door, the measuring),
  measured by `MIS-162`. Its disk keeps a free floor.
- **The count:** the door refuses a CreateWorld or a StartWorld whose
  reservation does not fit — and an ImportWorld once it exists (`MIS-164`) —
  with 409 `no-room`, naming the resource, what the world needs and what is
  free. The reconciler counts again before starting a world, so two requests
  that arrive together cannot both pass.
- **The worlds already running** take the default reservation the first time
  the new reconciler runs, without a restart.
- **The machine's facts** (`/fleet/v1/machine`) add its capacity: total,
  kept for itself, reserved by worlds, free — memory, processors and disk.
- **The room:** each machine card reads *open-1: 3 of 3.5 GB reserved ·
  1.2 GB in use*; on a full machine, Create and Start are off with *open-1 is
  full: stop another world first*; the wizard shows the room left on the
  chosen machine before the signature, and the reservation as one more
  parameter.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| Admission by reservation | when a world does not fit | Kubernetes requests, limits and node allocatable; Nomad's reservation and `memory_max` (memory oversubscription) |
| Reservation and ceiling in the container | what the kernel protects and what it kills | Docker Compose `deploy.resources` reservations and limits; cgroup v2 `memory.low` and `memory.max` |

The choice and its reason go in this mission's execution log.

Out of scope: placing a world on the machine with the most room, which
needs a second machine; stopping worlds by themselves (`MIS-167`); changing
a running world's reservation or ceiling (`DBT-025`, an order edit);
counting network bandwidth.

---

## 2. Acceptance criteria

- [ ] `curl -s https://open-1.numinia.com/fleet/v1/machine` answers memory,
  processors and disk: total, kept for the machine, reserved by worlds,
  free. Today: `{"machine": "open-1", "door": "fleetd/1", "oracles": 1,
  "zones": ["numinia.com", "numen.games"]}` (2026-10-12, 13:04 Madrid).
- [ ] A signed CreateWorld or StartWorld that does not fit is refused 409
  `no-room` with the resource and both numbers, and of two such requests
  sent together at most one world starts. Today: the door's check before
  accepting a request (numinia-assets, the door's `clash`) looks at the
  name, the address and the order's rules, never at room.
- [ ] Every order on open-1 carries a reservation, and the worlds that were
  running took theirs without a restart. Today: an order carries only its
  ceilings (`limits`: memory `2g`, cpus `1.5`, `maxUploadMb` 50 for both
  worlds on open-1).
- [ ] In the room, a full machine says it is full and to stop another world
  first, in the five languages, and its Create and Start are off. Today:
  Create is off only when no machine's door answers.
- [ ] The wizard shows the room left on the chosen machine before the
  signature. Today: it does not.

---

## 3. Closure

*(Fill when the mission closes.)*

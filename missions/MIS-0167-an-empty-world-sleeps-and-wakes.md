---
id: "MIS-167"
uid: ""
title: "An empty world sleeps and wakes when someone arrives: the machine stops a world left empty and brings it back for its first visitor, who waits a few seconds"
type: mission
status: on-hold
version: "0.1.0"
created: "2026-10-12T13:11:36+02:00"
updated: "2026-10-12T13:11:36+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, scale-to-zero, capacity]
license: "CC0-1.0"

priority: low
effort: L
executor: hybrid
assigned_to: null
completed: null

depends_on: ["MIS-162", "MIS-163"]
requires_oracle_approval: true
context: "2026-10-12T13:04:00+02:00"
hold_reason: "The Oracle parked it on 2026-10-12 until a machine holds more worlds than room; MIS-163 refusing a Start for lack of room is the signal to open it."
paths: [system/SYS-014-the-worlds-fleet-as-wired.md]
related: ["MIS-162", "MIS-163", "MIS-161", "SYS-014", "DBT-025"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-167 — An empty world sleeps and wakes when someone arrives

> **Summary:** A world that is on stays on today, empty or not, and a
> stopped world's address ends in a TLS error. This mission lets a machine
> hold more worlds than it can run at once: a world empty for a while is
> stopped, its address shows *waking the world…*, and the first visitor
> waits a few seconds and enters. César's AWS cluster did this (Knative,
> minimum zero); Fly.io does it with autostop and autostart.
> **Epistemic:** How many worlds a machine holds when only some of them have
> people at the same time.
> **Pragmatic:** Ten worlds where five fit, as long as no more than five
> have people at once.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **Empty for a while:** the machine reads people inside from `MIS-162` and
  stops a world after a set time with nobody in it.
- **The wake:** a sleeping world's address answers a waiting page that
  starts the world and lets the visitor in when it answers.
- **Room first:** the count (`MIS-163`) decides whether a waking world fits;
  when it does not, the waiting page says so instead of starting it.
- **Nothing lost:** a world goes to sleep only after its last save. The
  engine saves every `SAVE_INTERVAL` seconds (the machine passes 60) and does
  not save when it is told to stop, so a stop can lose the edits of that
  last interval; saving when told to stop belongs to the engine's own
  repository.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| Scale to zero | stopping the empty and waking on the first request | Knative's activator; Fly.io autostop and autostart; Sablier (AGPL-3.0, a Caddy plugin: a signed decision under `STD-010`); a waker of the house's own in the machine's door |

The choice and its reason go in this mission's execution log.

Out of scope: moving a sleeping world to another machine; waking on a
schedule (an event's hours); saving money by stopping a machine, which a
monthly server does not give.

---

## 2. Acceptance criteria

- [ ] A world empty for the set time stops by itself, and its address shows
  a waiting page instead of a TLS error. Today: a stopped world has no site
  in its machine's Caddyfile, so its address ends in a TLS alert.
- [ ] The first visitor to a sleeping world is inside within the set wait.
  Today: nothing wakes a world.
- [ ] An edit made just before a world went to sleep is there when it wakes.
  Today: a stop can lose up to 60 seconds of edits.
- [ ] A waking world that does not fit shows that there is no room instead
  of starting. Today: no count (`MIS-163`).

---

## 3. Closure

*(Fill when the mission closes.)*

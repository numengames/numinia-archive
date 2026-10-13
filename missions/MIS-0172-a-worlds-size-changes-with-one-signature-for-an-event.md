---
id: "MIS-172"
uid: ""
title: "A world's size changes with one signature for an event, and goes back by itself: the event boost numen.games/hosting sells"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T16:48:26+02:00"
updated: "2026-10-12T16:48:26+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, capacity, events, numinia-web]
license: "CC0-1.0"

priority: medium
effort: M
executor: hybrid
assigned_to: null
completed: null

requires_oracle_approval: true
context: "2026-10-12T16:48:26+02:00"
paths: [system/SYS-014-the-worlds-fleet-as-wired.md]
related: ["MIS-163", "MIS-169"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-172 — A world's size changes with one signature for an event

> **Summary:** numen.games/hosting sells an *event boost*: give the date,
> the world gets more power that day, and afterwards it goes back to its
> normal size. No request changes a world's size today; its memory and
> processors are fixed when it is created. This mission adds one signed
> resize with an end time: the machine applies it the way it stops a world,
> after the world's next save, puts the world back to its order's size by
> itself when the time comes, and refuses a size that does not fit.
> **Epistemic:** What a world may take for a day, and whether the machine
> can give it.
> **Pragmatic:** The Oracle boosts a client's world for an event from the
> room, and nobody has to remember to undo it.
> **Audience:** Agents · Oracles · Clients

---

## 1. Scope

- **The request:** a signed resize naming the machine, the world, its new
  memory and processors and the time the boost ends, checked like the other
  requests; its fields keep the strict patterns of an order's limits.
- **How it is applied:** like a stop — the machine waits for the world's
  next save, then brings the container back with the new limits; whoever is
  inside is disconnected for a few seconds, and the room says so before the
  signature.
- **Going back:** at the end time the machine returns the world to its
  order's size by itself, the same way, with no new signature. The order
  keeps its own size; the boost is a change with an end, not a new order.
- **What does not fit is refused:** a boost larger than what the machine
  can give is refused with its rule before anything changes — by `MIS-163`'s
  count once it exists, and by the machine's own memory and processors
  before that.
- **The history:** the machine's log shows both changes, the boost and the
  return, with when and, for the boost, the signer's short wallet; the
  world's card in the room shows the boost and its end time, in the five
  languages.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| Changing a running container's size | the boost itself | `docker update` of memory and processors in place; recreating the container with the Docker Compose `deploy.resources` limits the reconciler already writes |
| A change that undoes itself | the return at the end time | a scheduled scale-down, as cloud autoscaling schedules do; a lease with an expiry kept in the machine's book |

The choice and its reason go in this mission's execution log.

Out of scope: a boost scheduled days ahead (the Oracle signs it on the day);
growing beyond one machine; boosting by itself from the number of people
inside (`MIS-162` measures it first).

---

## 2. Acceptance criteria

- [ ] One signature raises a running world's memory and processors until a
  stated time, and the world's container runs with the new limits within two
  minutes. Today: no request changes a world's limits — the machine
  understands CreateWorld, DeleteWorld, StopWorld, StartWorld, DownloadWorld
  and ShowAdminCode (numinia-assets `walletsig.py`).
- [ ] At the end time the world is back at its order's size with no new
  signature, and an edit made just before either change is still there.
  Today: nothing changes a world's size, so nothing puts it back.
- [ ] A boost that does not fit is refused with its rule, and the world keeps
  running as it was. Today: the door's check before it takes a request
  (`clash`, in numinia-assets `fleetd.py`) looks at the world's name, its
  address and the order's rules, never at what the machine has left.
- [ ] The machine's log and the room's history show the boost and the
  return, each with its time. Today: the log has one line per request of
  the six types above, and none of them changes a size.

---

## 3. Closure

*(Fill when the mission closes.)*

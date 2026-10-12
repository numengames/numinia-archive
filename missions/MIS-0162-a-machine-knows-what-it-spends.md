---
id: "MIS-162"
uid: ""
title: "A machine knows what it spends: each fleet machine measures itself and every world on it, and the worlds room shows the numbers"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-12T13:11:36+02:00"
updated: "2026-10-12T13:11:36+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [virtual-worlds, hosting, fleet, metrics, observability, numinia-web]
license: "CC0-1.0"

priority: high
effort: M
executor: hybrid
assigned_to: null
completed: null

depends_on: ["MIS-156"]
requires_oracle_approval: true
context: "2026-10-12T13:04:00+02:00"
paths: [system/SYS-014-the-worlds-fleet-as-wired.md]
related: ["MIS-163", "MIS-165", "MIS-166", "MIS-167", "MIS-161", "SYS-014"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-162 — A machine knows what it spends

> **Summary:** Nobody can say today how much memory, processor or disk a
> world uses: a machine's door publishes its worlds' ceilings, never what
> they spend. This mission makes each fleet machine measure itself and each
> world every minute, keep a week of it, publish the numbers at its door with
> no person in them, and makes the worlds room show them on each machine and
> each world.
> **Epistemic:** What a world really costs its machine, empty and full — the
> number that the count (`MIS-163`), the views by rank (`MIS-165`), the
> public list (`MIS-166`), the sleep (`MIS-167`) and the cost model
> (`MIS-161`) all need first.
> **Pragmatic:** Before creating or bringing back a world, the Oracle sees
> whether its machine has room, and which world is using it.
> **Audience:** Agents · Oracles

---

## 1. Scope

- **What each machine measures, every minute**, after the USE method
  (utilisation, saturation and errors for every resource):
  - the machine: memory (total, in use, available), swap in use, processors
    and their use, pressure (Linux PSI), the disk that holds the worlds
    (total, used, free);
  - each world: memory in use and its peak against its ceiling, processor in
    use against its ceiling, the disk its folder and its copies take, people
    inside (a count), time up, restarts and kills for lack of memory;
  - the machine's own work: when the reconciler last ran and how it ended,
    and which build of the door and the reconciler is running.
- **Where the numbers come from:** the kernel's own counters — cgroup v2 for
  each world's container, `/proc` for the machine — and each world's
  `/status`, read from inside the machine, keeping the count and dropping
  the people.
- **What the door publishes:** the latest sample, and per world the last 24
  hours and 7 days, at `https://<alias>.numinia.com/fleet/v1/metrics` —
  public like the door's other facts (`SYS-014`), counts only. Each number
  takes its OpenTelemetry name (`system.memory.usage`,
  `container.memory.usage`, `container.cpu.time`…), so it means what the
  industry means by it.
- **What the room shows**, to the Oracle as today: on each machine card,
  memory, processor and disk in use against the total; on each world card,
  memory and processor in use against its ceiling.
- Measuring stays small on a small machine: its own cost is measured on
  open-1 and written down.

### Standards to select when the mission opens (not the selection)

| Area | What it covers here | Candidates |
|---|---|---|
| What to measure | which numbers, per machine and per world | the USE method (Brendan Gregg); the four golden signals (Google SRE) |
| Names and units | what each number is called | OpenTelemetry semantic conventions, system and container metrics |
| Where it is read | the source of each number | Linux cgroup v2 and pressure stall information (kernel documentation); `docker stats` |
| Who collects and keeps it | the program on the machine | the machine's own code on Python's standard library; node_exporter with cAdvisor and Prometheus (Apache-2.0); Beszel's agent (MIT); Netdata (GPL-3.0, a signed decision under `STD-010`) |
| How it is served | how a tool reads it | the door's JSON; OpenMetrics text, so a standard tool can read the same numbers later |

The choice and its reason go in this mission's execution log; an ADR only
if it changes `ADR-069`.

Out of scope: refusing a world for lack of room (`MIS-163`); who besides the
Oracle sees the numbers (`MIS-165`); a public page (`MIS-166`); alerts by
mail or chat; the cost in euros (`MIS-161`); the five worlds of the hand-run
server, which the room keeps watching as today.

---

## 2. Acceptance criteria

- [ ] `curl -s https://open-1.numinia.com/fleet/v1/metrics` answers the
  machine's memory, processor and disk, and for each world its memory and
  processor against its ceiling, disk, people inside, time up, restarts and
  kills, from a sample no older than two minutes. Today: 404
  `{"error": "not-found"}` (2026-10-12, 13:04 Madrid).
- [ ] The same door answers each world's last 24 hours and 7 days of people
  inside, memory and processor. Today: no history is kept anywhere.
- [ ] No answer of the door carries a person's name, id or position: a test
  feeds it a `/status` that lists people and finds none of them in the
  output. Today: the engine's `/status` lists each connected person's id,
  name and live position (numinia-hyperfy2 at `0e20453`, its server's
  index file), and nothing on the machine reduces it.
- [ ] The machine's README maps every published number to its OpenTelemetry
  name and its source. Today: no number is published.
- [ ] Measuring costs open-1 less than 1 % of one processor and 50 MB of
  memory, measured and written in that README. Today: not measured.
- [ ] In the worlds room, each machine card shows memory, processor and disk
  in use against the total, and each world card its memory and processor in
  use against its ceiling. Today: a world card shows its ceilings, the people
  inside and its time up, never what it spends; a machine shows only whether
  it answers.

---

## 3. Closure

*(Fill when the mission closes.)*

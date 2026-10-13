---
id: "MIS-185"
uid: ""
title: "A machine counts each world's day by state and size, keeps 35 days of it, and gives each day to the till on a signed read"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T08:24:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [fleet, metering, pay-per-use, numinia-assets, hosting]
license: "CC0-1.0"

priority: high
effort: M
executor: hybrid
assigned_to: null
completed: null

parent_mission: "MIS-169"
requires_oracle_approval: true
context: "2026-10-13T08:24:00+02:00"
paths: [system/SYS-014-the-worlds-fleet-as-wired.md, decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md]
related: ["ADR-070", "MIS-169", "MIS-162", "MIS-163", "MIS-172", "MIS-178", "MIS-181", "SYS-014"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-185 — A machine counts each world's day

> **Summary:** The till charges what a machine says each world did each
> day, and nothing it did not measure (`ADR-070`). This mission makes each
> fleet machine keep, for each world and Madrid day, its minutes running
> and stopped and the size it reserved, for 35 days, and hand a day's lines
> to the till when the till asks with its signature. The till's pretend
> meter (`MIS-178`) gives way to it.
> **Epistemic:** Where a charged minute comes from, and why a day can be
> charged late but never invented.
> **Pragmatic:** A world's bill can be traced to the machine's own events —
> create, start, stop, resize, delete — with their times.
> **Audience:** Agents · Oracles · Technical reviewers

---

## 1. Scope

- **What is counted,** per world and per Madrid day: minutes running,
  minutes stopped and the size reserved, from the machine's own events —
  create, start, stop (including a stop for balance), a resize for an
  event (`MIS-172`) and delete — with their times. A day while a world
  existed adds up to its length, 23, 24 or 25 hours.
- **Kept 35 days,** the margin the till waits for a silent machine.
- **Read by the till:** the door hands a day's lines only to a read the
  till signed, as it already checks Oracles' signatures (`SYS-014`); the
  answer travels over the door's HTTPS.
- **Not by processor:** what a world used is `MIS-162`'s measurement, never
  the price; the price follows the reserved size (`MIS-163`).

Out of scope: charging (`MIS-178`); per-minute counts of people inside,
which are a presence log, not a bill.

---

## 2. Acceptance criteria

- [ ] For each world, the machine keeps per Madrid day its minutes running
  and stopped and the size reserved, from its own events, for 35 days, and
  a day while the world existed adds up to the day's length. Today: the
  door publishes the machine, its worlds, its log, requests and copies, and
  none says how long a world ran on a day (numinia-assets `fleetd.py` at
  `9eb226f`).
- [ ] The door gives a day's lines only to a read the till signed. Today:
  the door checks only Oracles' signatures.
- [ ] The till's pretend meter is replaced by the machines' days with no
  change to how the till charges, and a day the machine has not yet given
  stays pending. Today: the till does not exist (`MIS-177`).

---

## 3. Closure

*(Fill when the mission closes.)*

---
id: "MIS-178"
uid: ""
title: "Each night closes the day: at 00:30 UTC the till charges one line per world by its state and size, waits for a day nobody measured, and at zero stops the running worlds and keeps the stopped ones 90 days for free"
type: mission
status: todo
version: "0.2.0"
created: "2026-10-13T08:24:00+02:00"
updated: "2026-10-13T10:15:09+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [payments, ledger, pay-per-use, hosting, fleet, numinia-web]
license: "CC0-1.0"

priority: high
effort: M
executor: agent
assigned_to: null
completed: null

parent_mission: "MIS-169"
depends_on: ["MIS-177"]
requires_oracle_approval: false
context: "2026-10-13T08:24:00+02:00"
paths: [decisions/ADR-070-a-world-is-paid-for-by-the-day-from-a-prepaid-balance.md]
related: ["ADR-070", "MIS-169", "MIS-177", "MIS-181", "MIS-182", "MIS-185", "MIS-186", "DBT-026"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-178 — Each night closes the day

> **Summary:** Every night the till closes the UTC day that has just
> ended: for each world it writes one line with its minutes running and
> stopped, priced at that day's tariff. It never estimates a day nobody
> measured, and it never charges the same day twice. When a close leaves an
> account at zero, that account's running worlds are listed to stop for
> balance and its stopped worlds are kept for free, 90 days by the
> tariff's rule. Until machines count their days (`MIS-185`), a pretend
> meter feeds it.
> **Epistemic:** When a day is charged, what makes a day's line right, and
> what happens to worlds when the money ends.
> **Pragmatic:** The till charges and protects worlds with no machine
> changed; replacing the pretend meter changes nothing else.
> **Audience:** Agents · Oracles · Technical reviewers

---

## 1. Scope

- **The run.** A scheduled run fires at 00:30 UTC every night and closes
  every UTC day that has ended and is not closed yet. Running it again
  writes nothing.
- **A day's line,** one per world: minutes running and minutes stopped,
  priced per minute at the tariff version in force that day for the world's
  size (`MIS-177`). Every day lasts 1,440 minutes: UTC changes no clock
  (`ADR-070`). Today's spend is computed for the screens as provisional
  and never written.
- **The meter.** The close reads each machine's day through one interface.
  Its first implementation is a pretend meter fed by test data; the
  machines' own count replaces it (`MIS-185`).
- **What nobody measured.** A world whose machine did not answer has its
  day pending and is charged on the first run that reads it, up to 35 days
  back. Older than that, the day is reported to the Oracle, never estimated
  (`ADR-070`).
- **At zero.** After a close, an account at or below zero:
  - its running worlds are listed to stop for balance — the till signs
    each stop (`MIS-181`) and the machine stops the world after saving
    (`MIS-186`);
  - its stopped worlds are charged nothing while the balance stays at or
    below zero, and each gets a deletion date, 90 days later by the
    tariff's rule; the warnings go out by mail (`MIS-182`);
  - the last night's overshoot stays as a small negative balance that the
    next top-up pays first;
  - a top-up ends the keeping-for-free from the next day; no world starts
    by itself.

Out of scope: deleting a world when its date comes, which is the machine's
(`MIS-186`) on the till's word, and the mails (`MIS-182`).

---

## 2. Acceptance criteria

- [ ] A run over a test day writes exactly one line per world, and a second
  run over the same day writes none. Today: nothing closes a day.
- [ ] Every day is charged over 1,440 minutes, the days Spain changes its
  clock included: the till's tests charge 25 October 2026 and 28 March 2027
  as days of 1,440 minutes and refuse a reading longer than that. Today: no
  day is charged.
- [ ] A day whose meter did not answer shows as pending and is charged by
  the first run that reads it, up to 35 days later; a day older than that is
  reported and never estimated. Today: nothing reads a machine's day.
- [ ] When a close leaves an account at or below zero, the run lists that
  account's running worlds to stop for balance, charges its stopped worlds
  nothing from then on, and gives each a deletion date as many days later
  as the tariff's rule says; the next top-up ends the keeping-for-free from
  the following day and starts no world. Today: no account has a balance.
- [ ] The run has one schedule, 00:30 UTC, the same all year. Today: the
  till does not exist (`MIS-177`).

---

## 3. Closure

*(Fill when the mission closes.)*

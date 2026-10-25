---
id: "MIS-216"
uid: ""
title: "Keep Hermes and the servers cheap, backed up and healthy"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-25T15:30:00Z"
updated: "2026-10-25T15:30:00Z"
author: "ursa"
owner: "oracle"
section: "Operations"
tags: [missions, boards, parent]
license: "CC0-1.0"

priority: medium
model_planned: sonnet
budget_usd: 13.60
budget_minutes: 80
executor: agent
assigned_to: "ursa"
completed: null
sub_missions: ["MIS-274", "MIS-275", "MIS-276", "MIS-277", "MIS-278", "MIS-279"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-216 — Keep Hermes and the servers cheap, backed up and healthy

> **Summary:** A parent mission, split into 6 child missions
> (MIS-274, MIS-275, MIS-276, MIS-277, MIS-278, MIS-279); each child holds the board cards
> titled with its own number.
> **Epistemic:** What the boards held on 2026-10-25 for this area, gathered
> into one mission so that the archive shows the work the boards carry.
> **Pragmatic:** Pick a card titled `MIS-216 · …`, seal its weight, open its
> pull request.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle, I want Hermes and the servers to restart cleanly, keep nightly copies and not waste money, so that nothing is lost and the bill stays where we expect.

---

## 2. Scope

Nightly backups with 14 days of retention, shorter gateway restarts that do not cut crons, VACUUM of the state database, the usage panel's false alarms reported upstream, the tender radar's filter before waking an agent, the release script's assumptions on open-1, a load test on VPS-3, and approvals generated from each agent's automation level.

Repositories: hermes-mejora · open-worlds. A parent: each child card is one pull request in one
repository.

### Out of scope

The invoice of missions (its own mission).

---

## 3. Acceptance criteria

- [ ] Its 6 child missions are done — today none is
- [ ] A nightly copy of the worlds' machine exists for each of the last 14 days — today there is none
- [ ] A gateway restart does not cancel a running cron — today it does

---

## 4. Budget

**Weight — how much thinking it needs**
- Sealed per child card when it opens; a parent has no card of its own.
- Process: Sonnet by default, about $13.60 (16 cards × $0.85, the
  median finished card of the boards).

**Time — how much work there is**
- 80 minutes of agent work (16 cards × 5, the median finished
  card), plus the Oracle's reviews.
- Biggest risk: cards that wait for the Oracle or for a real device.

---

## 5. What we learned

---

## 6. Invoice

---
id: "MIS-253"
uid: ""
title: "Make worlds load fast: zone manifests, model LOD and a client size gate"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-25T16:00:00Z"
updated: "2026-10-25T16:00:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [missions, boards, child]
license: "CC0-1.0"

priority: high
weight: 8
model_planned: sonnet
budget_usd: 12.50
budget_minutes: 75
executor: agent
assigned_to: "ursa"
completed: null
parent_mission: "MIS-210"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-253 — Make worlds load fast: zone manifests, model LOD and a client size gate

> **Summary:** A child of MIS-210. Its 5 cards on the Hermes board
> `motor-vr` carry the title prefix `MIS-253 · `.
> **Epistemic:** One thing a person notices, cut from a parent that was too big.
> **Pragmatic:** Take its cards in order; the Oracle owns the mission.
> **Audience:** Agents · Oracles

---

## 1. Story

As a visitor, I want worlds to load fast, so that I am in quickly even on a weak connection.

---

## 2. Scope

The 5 cards titled `MIS-253 · …` on the board `motor-vr`, in the repository
numinia-engine.

### Out of scope

The rest of MIS-210: its other children.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-253 · …` is open on the Hermes boards — today 5 are open
- [ ] Models get LOD at ingest, each zone has a sha256 manifest with hash cache, and the client stays ≤ 300 kB gz in npm run gates — today there is no LOD, manifest or size gate
- [ ] People far away draw as one call and VRM avatars have a decided far behaviour, with the PR open — today far avatars cost full draw calls

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 8, from the split (one agent's call; the team votes it with cards when weight ≥ 3).
- Process: sonnet, about $12.50 (5 cards × $2.50, the median card of weight 8). Opus rescues it if the review fails.

**Time — how much work there is**
- 75 minutes (5 cards × 15 min, calibration round 1).

---

## 5. What we learned

---

## 6. Invoice

---
id: "MIS-272"
uid: ""
title: "Harden numinia-web and numinia-assets repo settings"
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

priority: medium
weight: 2
model_planned: haiku
budget_usd: 2.10
budget_minutes: 18
executor: agent
assigned_to: "ursa"
completed: null
parent_mission: "MIS-215"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-272 — Harden numinia-web and numinia-assets repo settings

> **Summary:** A child of MIS-215. Its 5 cards on the Hermes board
> `numinia-com` carry the title prefix `MIS-272 · `.
> **Epistemic:** One thing a person notices, cut from a parent that was too big.
> **Pragmatic:** Take its cards in order; the Oracle owns the mission.
> **Audience:** Agents · Oracles

---

## 1. Story

As a maintainer, I want safe defaults in the web repositories, so that dependencies and workflows are protected.

---

## 2. Scope

The 5 cards titled `MIS-272 · …` on the board `numinia-com`, in the repository
numinia-web.

### Out of scope

The rest of MIS-215: its other children.

---

## 3. Acceptance criteria

- [ ] No card titled `MIS-272 · …` is open on the Hermes boards — today 5 are open
- [ ] numinia-web has the 7-day Dependabot cooldown, a rollback.yml that does not inject inputs.version_id into the shell, and the PR template with «bump version» and «CLA» boxes — today the cooldown is local only, the input is injected and the boxes are missing
- [ ] numinia-assets has SECURITY.md, CODE_OF_CONDUCT.md, .editorconfig and a PR template, and numinia-web's CLAUDE.md names the project skill — today these are missing

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 2, from the split (one agent's call; the team votes it with cards when weight ≥ 3).
- Process: haiku, about $2.10 (5 cards × $0.42, the median card of weight 2).

**Time — how much work there is**
- 18 minutes (5 cards × 3.7 min, calibration round 1).

---

## 5. What we learned

---

## 6. Invoice

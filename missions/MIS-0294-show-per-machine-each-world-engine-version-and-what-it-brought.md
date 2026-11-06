---
id: "MIS-294"
uid: ""
title: "Show in the Worlds room, per machine, each world's engine version and what that version brought"
type: mission
status: todo
version: "0.1.0"
created: "2026-11-06T12:45:00Z"
updated: "2026-11-06T12:45:00Z"
author: "ursa"
owner: "oracle"
section: "Products and services"
tags: [numinia-com, worlds, engine, versions, fleet]
license: "CC0-1.0"

priority: high
weight: 5
model_planned: sonnet
budget_usd: 0.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null

parent_mission: "MIS-291"
context: "2026-11-06T12:45:00Z"
paths: ["apps/store/src/lib/worlds.ts", "apps/store/src/lib/worlds-source.ts", "apps/store/src/components/lap/admin/WorldsPanel.tsx", "apps/store/src/i18n/worlds.ts"]
related: ["MIS-0291", "MIS-0292"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-294 — Show in the Worlds room, per machine, each world's engine version and what that version brought

> **Summary:** The Worlds room on numinia.com names the newest engine by its
> build and lists the worlds behind it. This mission adds the semantic
> version, groups the worlds by machine, and opens what each version brought.
> **Epistemic:** Which engine version each world on each machine runs, and what changed in it.
> **Pragmatic:** The Oracle answers «is my world current?» and «what is new?» from one block.
> **Audience:** Agents · Oracles

---

## 1. Story

As the Oracle in the Worlds room, I want each machine with its worlds, each
world marked current, behind or pinned, and the newest version with its
notes, so that I know where the fleet stands without asking.

---

## 2. Scope

`numinia-platform`, `apps/store` only, one pull request. Starts when `MIS-292` is `done`.

On 2026-11-06 at 12:30 UTC the room's «Motor» block (`fleetEngine` in `lib/worlds.ts`, drawn in `WorldsPanel.tsx`):

- reads `imagen.json` of the latest engine release into `EngineRelease` (`image`, `commit`, `build`, `digest`);
- shows the newest build, then either «up to date» or the worlds behind it;
- shows each machine's last update pass.

The mission:

- adds `version` to `EngineRelease` and reads `novedades.json` beside `imagen.json`, both from the same release; a release without them keeps today's line, with no version and no notes;
- shows the newest engine as `0.106.0 · 30c0431 2026-11-06`;
- lists every open machine with its worlds, one line each with build and mark (current, behind, pinned, other engine);
- adds a fold «What it brought», with the notes of the newest release, grouped by kind;
- adds texts in the five locales of `i18n/worlds.ts`, a note in `content/updates/`, and the tests that keep `lib/worlds.ts` at 100 %.

### Out of scope

Notes of older releases, and changing how or when worlds update (put off by the Oracle on 2026-11-06).

---

## 3. Acceptance criteria

- [ ] With `DATA_SOURCE=fixture`, the built Worlds room shows a semantic version beside the build in the «Motor» block (today: build only). A Gherkin scenario in `features/` checks it.
- [ ] The same fixture with two machines shows each machine's alias as a heading with its worlds beneath, each marked (today: one list of the worlds behind, no machine headings).
- [ ] A release fixture without `version` or `novedades.json` still renders the block as today (a test in `lib/worlds.test.ts`).
- [ ] `npm run verify` passes, the visual baselines included.

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 5 «sube el nivel».
- Why this card: large files at 100 % coverage, five locales and the visual baselines.
- Process: blind round 1 on 2026-11-06, agreed (doulos 5, talos 5, senet 5); sealed by Ursa as Scrum Master.

**Time — how much work there is**
- 30 minutes, in one board card titled `MIS-294 · …`.
- Like: the update-pass lines added to the same block (`release.lastPass`).
- Biggest risk: the visual baselines, which change with the block.

---

## 5. What we learned

*(Written at the end.)*

---

## 6. Invoice

*(Pasted by the invoice script.)*

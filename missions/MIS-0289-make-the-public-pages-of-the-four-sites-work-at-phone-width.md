---
id: "MIS-289"
uid: ""
title: "Make the public pages of the four sites work at phone width"
type: mission
status: todo
version: "0.1.0"
created: "2026-10-31T11:00:00Z"
updated: "2026-10-31T11:00:00Z"
author: "talos"
owner: "oracle"
section: "Technology"
tags: [mobile, web, responsive, touch, ci, accessibility]
license: "CC0-1.0"

priority: high
weight: 5
model_planned: sonnet
budget_usd: 2.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: null

requires_oracle_approval: true
paths: ["machine/tools/check-responsive.mjs", "web/package.json", ".github/workflows/ci.yml"]
related: ["MIS-0203", "MIS-0237", "MIS-0239", "MIS-0260"]
context: "2026-10-31T11:00:00Z"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-289 — Make the public pages of the four sites work at phone width

> **Summary:** The four public sites were built and checked on a desktop.
> One phone-width check exists in this repository as a tool that CI does not
> run, and that tool exits 0 when it cannot measure. This mission makes
> the phone state of the public pages measurable, gated, and reported.
> **Epistemic:** Whether a visitor on a phone can read and touch each public
> page, measured at 375 and 390 px, today and after each child mission.
> **Pragmatic:** A phone-width gate that fails when a page breaks, and an
> honest list of the pages that still break.
> **Audience:** Agents · Oracle

---

## 1. Story

As a visitor who opens numinia.org, numinia.com, numen.games or
nwos.numen.games on a phone, I want every public page to fit the screen and
every control to be easy to touch, so that I can read and move around without
sideways scrolling or missed taps.

---

## 2. Scope

**Surface (decided by Talos, for the Oracle to confirm):** the
public web pages of the four sites, read on a phone. Entering the 3D worlds
from a phone is **not** in this mission. Thirteen open missions already cover
the engine on phones (MIS-0202, 0203, 0204, 0210, 0213, 0232–0235, 0237–0239,
0260, all `todo`, assigned to `ursa`). They stay where they are.

**In this repository (numinia-archive), this mission's own pull request:**

- `machine/tools/check-responsive.mjs`, the phone check. Its child mission
  makes three changes: it finds `web/` from its own location under
  `machine/tools/` (today it looks under `machine/`); it exits non-zero when it
  cannot measure, instead of exiting 0 after a SKIP; it measures at 375 and at
  390 px.
- Wiring the check into `.github/workflows/ci.yml`, so that a violation fails
  the `build` job. The GitHub App that Ursa acts through has no `workflows`
  permission, so Pablo adds that workflow step himself.

**Per site, each in its own repository and its own child mission (ADR-083):**

- numinia.com → `numinia-web` (`apps/store`)
- numen.games → `numengames-web`
- nwos.numen.games → `nwos-deploy`
- numinia.org → `numinia-archive` (`web/`), the child that uses the check above

**Out of scope:** copy and text of the pages; the legal documents (LEG-*); the
3D engine (see above); the design-system values in STD-023, which Galatea may
propose to change in a later card.

**Distribution (proposed 2026-10-22, approved by Pablo 2026-10-27):**

| Agent | Role in this mission | Model |
|---|---|---|
| Galatea | Design of screens, flows and accessibility | Opus |
| Ursa | Orchestrates and builds | Sonnet |
| Zephyr | Walks the public pages on a real phone and reports | Haiku |
| Hekate | Second look before an Oracle | Sonnet |
| Talos | The phone-width gate in this repository | Sonnet |
| Vesta | Token budget, PR queue, triage of unassigned cards | per her profile |

---

## 3. Acceptance criteria

> **Every criterion must be FALSE at the base commit.** The "today" clauses
> were measured on 2026-10-31 at `numinia-archive` main `e3eb80e2`,
> `numinia-web` main `3db3e8b`, `numengames-web` main `60aaaf2`, and
> `nwos-deploy` main `649f443`; the page figures are from the deployed sites,
> read live that day.

- [ ] `cd web && CHECK_BASE=https://numinia.org node ../machine/tools/check-responsive.mjs` prints a `check-responsive:` measurement line and does not print `SKIP` (today: prints `SKIP check-responsive: playwright-core not installed` and exits 0 after `npm ci` in `web/` put playwright-core in `web/node_modules`; the script resolves `web/` as `machine/web`, which does not exist).
- [ ] With playwright-core absent, the same command exits non-zero (today: exits 0).
- [ ] `grep -n 'check-responsive' .github/workflows/ci.yml` returns a step inside the `build` job (today: 0 lines).
- [ ] The home page of each of the four sites is measured at 375 and 390 px by a check that its repository's CI runs and that its `build` required check enforces (today: numinia.org, numengames-web and nwos-deploy: none found in workflows or package.json; numinia.com: phone specs exist in its e2e job, but home coverage is not confirmed).
- [ ] Zero non-prose touch targets under 44×44 px at 390 px on the four home pages (today, browser survey 2026-10-31, Chromium emulated at 390×844, all links, buttons and inputs, prose links included: numinia.org/ 462 of 559 under 44 px; numinia.com/es/ 14 of 43; numen.games/es/ 28 of 39; nwos.numen.games/ 7 of 33). The survey does not exclude inline prose links, so the rule-correct count is lower; the first real run of the check gives the baseline.
- [ ] Zephyr's walk of the four home pages on a real phone is recorded in Closure, one line per page (today: no walk recorded).

### Already true today (a guard to keep, not a criterion)

- At 390 px the four home pages do not scroll sideways (document `scrollWidth` equals 390 on all four, re-read 2026-10-31). It holds today, so a criterion would be decoration; the gate's job is to keep it true.
- numinia.com/es/ has 84 elements past the viewport inside a clipped carousel. The page does not scroll, so this is not a defect at the document level.
- The `e2e` job in `numinia-web` (apps/store/e2e, required through `build`) already holds phone-width specs for some routes. Its coverage is route by route, not site-wide.

---

## 4. Budget

*(Written when the mission opens, never edited. A new estimate is a new dated line under this one.)*

**Weight — how much thinking it needs**
- Card: 5 «criterio de diseño», set by Talos (author); one estimator.
- Why this card: the surface and the repository boundary are judgement calls, and the gate must fail closed.
- Process: sonnet, about $2.00. No closest closed example.

**Time — how much work there is**
- 30 minutes for this opening: survey, criteria, mission file, local branch. The children carry their own budgets.
- Biggest risk: the Oracle's answer on the surface and Pablo's workflow step. They block the children, not this card.

---

## 5. What we learned

*(Written while doing it and at the end.)*

- **Id:** the board card said MIS-196. That number is taken on main (MIS-0196, "split the living pieces"). MIS-0288 is the highest id on main and on any remote branch, and id 197 is held by `feat/activate-pro014`, in review. The next free number is **289**, so this mission is MIS-0289 in the filename and `MIS-289` in the header.
- **Premise corrected:** the board card said no mission mentions mobile. Thirteen open missions about the engine on phones are already in the queue. That is why the surface is set here as the public pages, not the worlds.
- **Gate that looks green:** the existing phone check passes by skipping. Its SKIP line is printed, but its exit code is 0, so a CI job that runs it stays green.
- **Not yet done:** the pull request (no GitHub write credentials for this profile), and the child cards on the board (they follow the merge, so that each names a mission that exists on main).

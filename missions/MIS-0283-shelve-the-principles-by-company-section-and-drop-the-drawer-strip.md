---
id: "MIS-283"
uid: ""
title: "Shelve the principles by company section and drop the drawer strip"
type: mission
status: in-progress
version: "0.1.0"
created: "2026-10-25T15:30:00Z"
updated: "2026-10-25T15:30:00Z"
author: "ursa"
owner: "oracle"
section: "Knowledge and quality"
tags: [principles, web, vocabulary, narrative-dial]
license: "CC0-1.0"

priority: medium
effort: S
executor: agent
assigned_to: "ursa"
completed: null

started: "2026-10-25T15:30:00Z"
context: "2026-10-25T15:30:00Z"
requires_oracle_approval: true
paths: [web/src/lib/corpus.ts, web/src/pages/[series].astro, machine/scripts/test/standards-index.test.mjs]
related: ["STD-030", "STD-007", "PRI-001"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-283 — Shelve the principles by company section and drop the drawer strip

> **Summary:** The principles index groups the principles under four
> shelves named in the city's words, and one of them holds eleven
> principles of six different kinds. The Oracle ruled (chat, 2026-10-25)
> that principles are shelved in a company's words, by the section each
> already declares in its header; that at the full moon no company word
> shows; and that the strip "The other drawers" leaves every series page.
> **Epistemic:** Under which shelf would someone from a company look for
> each principle.
> **Pragmatic:** A reader opens `/principles` and finds six shelves they
> would expect in any organisation; at the full moon the same shelves
> read as the houses that serve them.
> **Audience:** Agents · Oracles

---

## 1. Scope

- `READING_GROUPS_PRINCIPLES` in `web/src/lib/corpus.ts` becomes six
  shelves, one per section the principles declare (`STD-030`): Strategy
  and governance, Brand and marketing, People and culture, Finance, Legal
  and compliance, Technology. Each principle sits on the shelf of its own
  header's section.
- The shelf label is the section's name and its line is the line `STD-030`
  gives that section. At the full moon the label and line are replaced by
  the houses that serve the section, read from `STD-030` (the front door's
  own rule: no word is invented).
- The strip "The other drawers" at the foot of every series page is removed.
- Out of scope: the text and titles of every principle (round by round,
  later), the `section` of any principle, any standard.

> **Scope and Acceptance criteria are written when the mission OPENS and are
> not edited afterwards.** What happened goes in Closure.

---

## 2. Acceptance criteria

- [ ] Every principle is on the shelf named after its own `section` header (today: four shelves in the city's words).
- [ ] `web/src/pages/[series].astro` has no "The other drawers" strip (today: it ends every series page).
- [ ] At the full moon no shelf shows a company word; at the new moon none shows a house name.
- [ ] `npm test`, `npm run checks -- --rules` and the web build pass.

---

## 3. Closure

- **What was done:** pending.
- **What diverged, and why:** pending.
- **Evidence:** pending.
- **Closed:** pending · **by:** ursa

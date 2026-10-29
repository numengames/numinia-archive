---
id: "MIS-283"
uid: ""
title: "Shelve the principles by company section and drop the drawer strip"
type: mission
status: done
version: "0.3.0"
created: "2026-10-25T15:30:00Z"
updated: "2026-10-29T09:25:00Z"
author: "ursa"
owner: "oracle"
section: "Knowledge and quality"
tags: [principles, web, vocabulary, narrative-dial]
license: "CC0-1.0"

priority: medium
effort: S
executor: agent
assigned_to: "ursa"
completed: "2026-10-29T09:25:00Z"

started: "2026-10-25T15:30:00Z"
in_review_at: "2026-10-25T16:20:00Z"
context: "2026-10-25T15:30:00Z"
requires_oracle_approval: true
paths: ["web/src/lib/corpus.ts", "web/src/pages/[series].astro", "machine/scripts/test/standards-index.test.mjs"]
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

- [x] Every principle is on the shelf named after its own `section` header (today: four shelves in the city's words).
- [x] `web/src/pages/[series].astro` has no "The other drawers" strip (today: it ends every series page).
- [x] At the full moon no shelf shows a company word; at the new moon none shows a house name.
- [x] `npm test`, `npm run checks -- --rules` and the web build pass.

---

## 3. Closure

- **What was done:** `READING_GROUPS_PRINCIPLES` is six shelves, one per section the principles declare, with `STD-030`'s name and line; each principle is on the shelf of its own header. The page names the houses that serve each shelf (`translator.servedBy`) and shows them beside the name at the half moon and in its place at the full moon. The strip "The other drawers" is gone from every series page. The page's introduction said "four shelves"; it now says six.
- **What diverged, and why:** the plan said the full moon would show the city's four old names; they grouped differently from the sections and no document names the six, so the houses stand in (the Oracle chose this, 2026-10-25).
- **Evidence:** `npm test` 1013 tests, 1011 pass, 0 fail, 2 skipped; `--rules` 12 checks, 0 failed; web build ok; built `/principles` shows the six shelves at the three moons (checked in a browser) and no strip on any series page.
- **Closed:** proposed 2026-10-29 on numinia-archive #763 (merged 2026-10-26): READING_GROUPS_PRINCIPLES in web/src/lib/corpus.ts, no drawer strip; pending the Oracle's word · **by:** ursa

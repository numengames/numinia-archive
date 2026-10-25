---
id: "MIS-196"
uid: ""
title: "Split the living pieces into two procedures and bring both into force"
type: mission
status: in-progress
version: "0.1.0"
created: "2026-10-25T11:34:00Z"
updated: "2026-10-25T11:34:00Z"
author: "ursa"
owner: "oracle"
section: "Knowledge and quality"
tags: [procedures, design, activation, one-question]
license: "CC0-1.0"

priority: medium
effort: M
executor: agent
assigned_to: "ursa"
completed: null

started: "2026-10-25T11:34:00Z"
context: "2026-10-25T11:34:00Z"
requires_oracle_approval: true
paths: [procedures/PRO-022-building-the-living-pieces.md, standards/STD-023-design-values.md, designs/DES-011-book-and-veil.md, procedures/PRO-014-producing-a-design-piece.md]
related: ["PRO-022", "PRO-014", "PRO-023", "STD-007", "STD-023"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-196 — Split the living pieces into two procedures and bring both into force

> **Summary:** `PRO-022` builds three pieces in one document: the sky and
> the Veil, which are the night backdrop, and the reading-aloud player,
> which is a tool the reader uses. The Oracle ruled (chat, 2026-10-25)
> that a procedure attacks one thing: it is split in two, moving text and
> changing no sentence, and both procedures are brought into force.
> **Epistemic:** Which of the three pieces answer the same question, and
> which a second one.
> **Pragmatic:** Whoever builds the backdrop and whoever builds the player
> each open one short procedure that holds only their piece.
> **Audience:** Agents · Oracles

---

## 1. Scope

- The backdrop (steps 3.1 and 3.2 of `PRO-022`) moves to a new procedure,
  `PRO-041`, *Building the night backdrop*. `PRO-022` keeps the player
  (step 3.3) and is retitled *Building the reading-aloud player*; its old
  address redirects to the player.
- No sentence of a step changes: text moves, headings and numbering follow.
- Every citer of the old document points at the piece it meant:
  `STD-023` (sky and Veil to `PRO-041`, player to `PRO-022`), `DES-011`,
  `PRO-014`, the test that reads `PRO-022`, the site's reading order.
- Both procedures go `active` in a separate commit (`PRO-023` step 9) and
  are named in `AGENTS.md`'s *In force* list (step 10).
- Out of scope: the other draft procedures, any standard, `STD-023`'s
  values, and the Oracle's approval to push (waits for his go).

> **Scope and Acceptance criteria are written when the mission OPENS and are
> not edited afterwards.** What happened goes in Closure.

---

## 2. Acceptance criteria

- [ ] No procedure holds both the sky and the reading player: `grep -l "Reading aloud" procedures/*.md` and `grep -l "The sky" procedures/*.md` list different files (today: both in `PRO-022`).
- [ ] `PRO-022` and `PRO-041` are `status: active` and named in `AGENTS.md` (today: `PRO-022` is draft, `PRO-041` does not exist).
- [ ] `/procedures/pro-022-building-the-living-pieces` still answers, by redirect (today: it is the page itself).
- [ ] `npm test`, `npm run checks -- --rules` and the web build pass.

---

## 3. Closure

*(Filled when the mission closes.)*

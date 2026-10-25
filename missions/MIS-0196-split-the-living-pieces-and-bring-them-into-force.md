---
id: "MIS-196"
uid: ""
title: "Split the living pieces into two procedures and bring both into force"
type: mission
status: in-review
version: "0.2.0"
created: "2026-10-25T11:34:00Z"
updated: "2026-10-25T12:45:00Z"
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
in_review_at: "2026-10-25T12:45:00Z"
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

- **What was done:** `PRO-041` *Building the night backdrop* holds the sky and the Veil layer; `PRO-022` is now *Building the reading-aloud player*. Steps 3.1, 3.2 and the seven player steps moved without a word of a step changed; the framing sections (purpose, preconditions, verification) were split to match. Citers repointed: `STD-023` (sky and Veil placement to `PRO-041`), `DES-011`, `DES-016`, `PRO-014`, the token-coverage test in `rules.test.mjs`, the reading order in `corpus.ts`. The old address redirects to the player. Both procedures are `active` at 1.0.0 in a header-only commit, named in `AGENTS.md`. A test in `regime.test.mjs` holds it (seen failing first: \"PRO-041 does not exist\").
- **What diverged, and why:** the first reading of `PRO-022` (an agent review, then mine) called it ready to activate unchanged, because its Epistemic line asks one question. The Oracle saw that it holds two things, a backdrop and a tool the reader uses; the split followed. Lesson for the next activations: read the steps, not the question line. `STD-031` reports 5 findings on `PRI-006` (Charles Peirce's name, two years), on trial and not enforced.
- **Evidence:** `npm test` 974 pass, 0 fail; `--rules` 12 checks, 0 failed; `--build` all ok; `web/dist/binding/index.html` lists `PRO-022` and `PRO-041` in force; `web/dist/procedures/` answers all four old and new addresses.
- **Closed:** pending the Oracle's review · **by:** ursa

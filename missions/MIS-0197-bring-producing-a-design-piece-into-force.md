---
id: "MIS-197"
uid: ""
title: "Bring PRO-014, producing a design piece, into force"
type: mission
status: in-review
version: "0.2.0"
created: "2026-10-25T11:54:00Z"
updated: "2026-10-25T12:20:00Z"
author: "ursa"
owner: "oracle"
section: "Knowledge and quality"
tags: [procedures, design, activation, one-question]
license: "CC0-1.0"

priority: medium
effort: S
executor: agent
assigned_to: "ursa"
completed: null

started: "2026-10-25T11:54:00Z"
in_review_at: "2026-10-25T12:20:00Z"
context: "2026-10-25T11:54:00Z"
requires_oracle_approval: true
paths: [procedures/PRO-014-producing-a-design-piece.md, AGENTS.md]
related: ["PRO-014", "PRO-023", "STD-007", "STD-023", "STD-008"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-197 — Bring PRO-014, producing a design piece, into force

> **Summary:** `PRO-014` is the order in which an agent takes the design
> decisions of a piece, and the checklist it passes before delivery. The
> Oracle ruled (chat, 2026-10-25) that the draft procedures are brought into
> force one at a time, each answering one question; this is the second, after
> `PRO-022` and `PRO-041`.
> **Epistemic:** What stands between `PRO-014` and `status: active`.
> **Pragmatic:** A header change, and one sentence fixed first so the
> procedure asks one thing.
> **Audience:** Agents · Oracles

---

## 1. Scope

- The Epistemic line of `PRO-014` asks two questions (the order of the
  decisions, and what is checked before delivery); it is reduced to one.
- Every document, tool and address it cites is read to exist.
- `PRO-014` goes `active` in a header-only commit (`PRO-023` step 9) and is
  named in `AGENTS.md`'s *In force* list (step 10).
- Out of scope: any step of the procedure, `STD-023`, `STD-008`, and the
  Oracle's approval to push (waits for his go).

> **Scope and Acceptance criteria are written when the mission OPENS and are
> not edited afterwards.** What happened goes in Closure.

---

## 2. Acceptance criteria

- [ ] The Epistemic line of `PRO-014` holds one question mark (today: two questions in one line).
- [ ] `PRO-014` is `status: active` and named in `AGENTS.md` (today: draft).
- [ ] `npm test` and `npm run checks` pass.

---

## 3. Closure

- **What was done:** the Epistemic line of `PRO-014` was reduced to the order of the decisions (the delivery checklist stays in the Summary and steps). Every document and tool it cites was read to exist: `DES-009` to `DES-015`, `sistema.prompt.txt`, `generate-design-kit.mjs --check` (passes), `STD-023` §20 (the ceilings it points at are there), `PRO-041` and `PRO-022`. Active at 3.2.0 in a header-only commit, named in `AGENTS.md`. A test in `regime.test.mjs` holds it, seen failing first.
- **What diverged, and why:** the earlier review said `PRO-014` pointed at a wrong section of `STD-023`; reading it, `§20` is the right one (the texture ceilings), so nothing was changed there. `STD-008` (draft) cites step 4 of this procedure as the way its `DSN-010` is checked by hand, and the verification row of `PRO-014` names `ACC-004` of `STD-034` (draft): both documents are still on trial.
- **Evidence:** `npm test` 0 fail; `--rules` 12 checks, 0 failed; `--build` all ok after telemetry; `web/dist/binding` lists `PRO-014` in force.
- **Closed:** pending the Oracle's review · **by:** ursa

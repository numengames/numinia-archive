---
id: "STD-025"
uid: ""
title: "A mission is a card"
type: documentation
subtype: standard
status: draft
version: "1.0.1"
created: "2026-09-09T23:00:00+02:00"
updated: "2026-09-11T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
threshold: governed
license: "CC0-1.0"
tags: [standard, missions, board, lifecycle]
related: ["STD-001", "STD-016", "STD-018", "PRO-003", "ADR-030"]
series_change: "1.0.1 — 2026-09-11: Check rows name the folder a script lives in (machine/scripts/, machine/tools/, machine/guards/rules/); a bare filename does not say where to run it, and three of them had moved. Patch: prose only. 1.0.0 — new standard, cut under ADR-043: the obligations PRO-003 carried on the mission artefact since v1 (states, stamps, immutability, one executor, parent and child, exit by deletion), now plated. PRO-003 keeps the briefing, the cycle and the coordination. CORE-36..39 and CORE-41 keep their numbers under MSN-."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A mission is a card

> **Summary:** What a file in `missions/` must be: one unit of work, on the
> board before it starts, with a stated end, one executor, a closed set of
> states, and an exit through deletion, never through editing.
>
> **Epistemic:** The mission is the only place where plan and outcome sit
> side by side. Everything here protects that difference: it is the one
> thing a closed mission teaches.
>
> **Pragmatic:** Check any card against nine plates; know who may set each
> status and what stamp it carries; know when a card may leave the folder.

**Binds:** every file in `missions/`, and whoever sets a field on one.
**Does not bind:** how an agent briefs, executes or coordinates a mission —
`PRO-003`; the header fields themselves — `STD-016`; the identifier —
`STD-018`.

## Rules

**MSN-036 — Registered before executed.** Work MUST exist as a card,
committed, before any of it happens. A card written after the fact is
fiction.

**MSN-037 — Done is stated before work starts.** A card MUST carry
acceptance criteria that are false at the base commit and phrased as a
final state. Scope and criteria are not edited after opening; what
happened goes in Closure.

**MSN-041 — Read whole, never by title.** The agent reads the whole card —
deliverable, effort, criteria, dependencies, assignee — before acting.

**MSN-001 — Five states, closed.** `status` MUST be one of `todo`,
`in-progress`, `in-review`, `done`, `frozen`. It is the only state surface:
no status folder, no index, no cancelled value — a cancelled mission is
`frozen` with `freeze_reason: cancelled`.

**MSN-002 — Each state has its hand and its stamp.** `todo` and `done`
(`completed`) are set by the Oracle; `in-progress` (`started`) and
`in-review` (`in_review_at`) by the executor; `frozen` (`freeze_reason`) by
the Oracle, from any non-terminal state.

**MSN-039 — Paused says why.** A `frozen` card MUST carry `freeze_reason`.
Unfreezing returns it to `todo` and clears the reason.

**MSN-003 — One executor.** An active card MUST name exactly one
`assigned_to`, and only that agent edits it. Work that splits becomes
child cards, one per agent, ordered by `depends_on`.

**MSN-038 — A parent waits for its children.** A card with children MUST
NOT be `done` while any child is neither `done` nor frozen-cancelled.

**MSN-004 — Done is immutable; the exit is deletion.** A `done` card MUST
NOT be edited once merged. It leaves the folder under `ADR-030`'s four
tests; a `frozen` card too, once a living document records its identifier,
title and reason. Ninety days in `todo` without activity is stale: frozen
or deleted at the next review.

## Check

| Rule | Verified by |
|---|---|
| MSN-036 | manual — the card's date against the work's first commit |
| MSN-037 | manual — the section is checkable; whether it states a test is not |
| MSN-041 | manual — no trace distinguishes a read from a skim |
| MSN-001 | `web/src/content.config.ts` (build fails on any other value) |
| MSN-002 | `machine/guards/rules/std-004-the-header.mjs` — stamp present for the status |
| MSN-039 | `machine/guards/rules/std-004-the-header.mjs` — `freeze_reason` present when `frozen` |
| MSN-003 | manual — `assigned_to` is one value; who edits is judgement |
| MSN-038 | manual — parent and child are declared in prose |
| MSN-004 | `machine/tools/check-deletable.mjs` for the exit; the immutability is manual |

## Why

Without this, the board lies: work appears after it happened, cards drift
to match their outcome, two agents write one file, a parent closes over an
open child, and a finished card is quietly rewritten. Each plate closes one
way for a card to say something other than what occurred.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-016` | Header fields | the fields these plates set: `HDR-004` lifecycle, `freeze_reason`, `in_review_at`, `started`, `completed` |
| `STD-018` | Identity | `IDN-011`, `IDN-014`, `IDN-015`: permanence, no reuse, first commit keeps the number |
| `ADR-030` | Lifecycle and deletion | the four tests a card passes to leave the folder |
| `PRO-003` | Mission cycle | the protocol that executes this standard |
| `STD-007` | One page per document | the shape this file takes |

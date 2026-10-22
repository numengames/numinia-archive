---
agent: vesta
title: "SOURCES — Vesta"
type: agent
status: draft
version: "0.1.0"
created: "2026-10-22T10:30:00+02:00"
updated: "2026-10-22T10:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, vesta, operations, schedule, budget, queue, sources]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Vesta

Where this agent's authoritative project knowledge lives. Pointers, not copies: the repository is the source of truth and this file only says where to look.

## How the work is ordered

`procedures/PRO-003-mission-cycle.md` — the life of a mission, from card to closing.

`standards/STD-025-a-mission-is-a-card.md` — what a mission card says.

`procedures/PRO-001-agent-session.md` — how an agent session opens and closes.

`system/SYS-002-agent-cycle.md` — the agent cycle as wired today.

`operations/OPS-008-session-state.md` — where the state of a session is kept.

## When the house works

`operations/OPS-022-the-houses-hours.md` — the house's hours.

`procedures/PRO-017-rolling-up-the-week.md` — the weekly roll-up; `procedures/PRO-021-closing-the-month.md` — the month's close.

## How much an agent may be left alone

`standards/STD-041-the-levels-of-automation.md` — the five levels of automation.

`standards/STD-042-what-an-agent-may-do-without-asking.md` — what an agent may do without asking.

## How a report speaks

`standards/STD-043-a-report-speaks-to-the-board.md` — how a report speaks to the board.

`procedures/PRO-005-escalation.md` — when and how to escalate.

## Where the work is recorded

`missions/` — mission cards; `reports/` — dated reports; `decisions/` — the rationale behind choices.

`agents/INDEX.md` — the roster, to route a thread to whoever carries it.

## Not yet in the archive

The live schedule of scheduled jobs, the AI consumption figures and the control map of threads run from the instantiating platform's profile and are not kept in the archive. A package under `machine/packages/` to carry them, so that any machine can rebuild the control map from this repository alone, is still to be written.

---

When a needed fact is not in these sources: say what is missing, consult `agents/INDEX.md` for the right specialist, or ask the operator. Do not invent project-specific facts.

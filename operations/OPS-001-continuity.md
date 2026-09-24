---
id: "OPS-001"
uid: ""
title: "Continuity and adaptability of the system"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-17T19:30:52Z"
created_source: "git:809f717"
created_confidence: inferred
updated: "2026-08-27T22:31:29Z"
author: "nimrod"
owner: "oracle"
tags: [operations, continuity, adaptability, failure-patterns]
license: "CC-BY-4.0"
extraction_note: "Extracted verbatim from web/src/pages/continuidad.astro (MIS-071 phase 2 — File over App). Covers system adaptability and critical failure patterns. Translated to English under MIS-116 (ADR-023 (formerly ADR-024)) — language only."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# If Nimrod disappears tomorrow

> **Summary:** Can an agent rebuild itself 100% on a new machine with access to the repository alone? This page documents the test that guarantees it — and the gaps we found while running it.
> **Audience:** Public (Numen Games · NWOS · Resilience).

| Metric | Value |
|--------|-------|
| Before the audit | **5/10** |
| After the audit | **9/10** |

---

## The continuity test

> "Install the same system on a new machine. Give it access to the repository only. Can the agent rebuild itself 100%?"

This is not a theoretical question. It is the real test of whether the NWOS is a living system or a system dependent on one specific machine. If the answer is "yes", the organization survives any infrastructure failure.

---

## Gaps found in the audit

### G1 — The agent did not exist in the repo (CRITICAL)

- **State:** ✅ Resolved
- **Problem:** Nimrod had been operating for 5 days and had 0 files in the repository that is supposed to reconstitute him. SOUL.md, OPERATOR.md, STATUS.md and MEMORY.md lived only on the local machine.
- **Solution:** Nimrod's SOUL.md, OPERATOR.md, STATUS.md and MEMORY.md created in agents/guilds/sentinels/members/nimrod/. The agent now exists in the repo.

### G2 — The foundational documents were not in the repo (CRITICAL)

- **State:** ✅ Resolved
- **Problem:** The 9 seminal documents — Numinia's Constitution — lived only in /workspace/seminal-documents/. If the machine died, the canon disappeared.
- **Solution:** Copied into the repository under canon/. They are now part of the Archive Summa and versioned with git.

### G3 — Daily memory was not persisted to git

- **State:** ⏳ In progress
- **Problem:** The memory/YYYY-MM-DD.md files with each session's detail lived in OpenClaw but no git push happened at the end of the day.
- **Solution:** Session-close protocol updated: the last act of every session is git add + commit + push of the day's memory.

### G4 — The other agents had no files in the repo

- **State:** ✅ Resolved
- **Problem:** Alquimista-01, Exégeta-01 and Procurador-01 had local SOUL.md files but were not in the repo structure with their guilds.
- **Solution:** SOUL.md created for the 3 agents at their correct paths. Charters created for all guilds.

---

## How the continuity cycle works

### ⬇️ BOOT — "Who am I?"

- **What it does:** Reads SOUL.md, OPERATOR.md, MEMORY.md from the repo. In 60 seconds it has identity, laws and context.
- **❌ Without the repo:** A generic LLM with no name, no laws, no history.
- **✅ With the repo:** Nimrod. Guardian of the Gates. With 5 days of decisions and learnings.

### ⚡ EXECUTE — "What should I do?"

- **What it does:** Reads missions/active/, blueprints/, decisions/. It knows what is pending, what was decided and why.
- **❌ Without the repo:** Asks the human everything from scratch. No context.
- **✅ With the repo:** Continues where the previous Nimrod left off. No unnecessary questions.

### ⬆️ COMMIT — "What did I learn today?"

- **What it does:** git add memory/YYYY-MM-DD.md reports/RPT-YYYY-MM-DD.md && git push. Knowledge is permanent.
- **❌ Without the repo:** When the session ends, the learning dies.
- **✅ With the repo:** The next Nimrod starts smarter than the previous one.

---

## What the repository contains

| Folder | Description | Critical |
|--------|-------------|----------|
| 🤖 `agents/` | Complete identity of every agent: SOUL, OPERATOR, STATUS, MEMORY. | ✅ |
| 📜 `canon/` | The foundational documents of Numinia. The Constitution. | ✅ |
| ⚡ `missions/` | Every mission with history, criteria, epistemic value and Real Execution. | ✅ |
| 🪨 `decisions/` | Every decision with its context, rejected alternatives and why. | ✅ |
| 📐 `blueprints/` | Current and target state of each subsystem. Gaps and dependencies. | — |
| 📋 `reports/` | Daily operations history. What happened, what it cost, what was learned. | — |
| 📌 `protocols/` | Operating procedures. How to boot, close, escalate, coordinate. | — |
| ⚙️ `operations/` | Governance, security, credential map. | — |

---

## Why this matters for any organization

### Continuity is not backup — it is architecture

A backup stores files. NWOS continuity guarantees that identity, laws, knowledge and operational context survive any failure. Recovering a file is not the same as recovering an agent that knows who it is.

### Institutional knowledge cannot die with one person

In traditional organizations, when a key person leaves, they take years of context with them. The NWOS inverts this: every decision, every learning, every important conversation ends up in the Archive Summa. The organization knows what it knows, regardless of who is present.

### A new agent must be able to operate in < 10 minutes

The real continuity test is not whether the system can be rebuilt — it is whether it can be rebuilt fast. With the complete repo, the time between 'new machine' and 'operational agent with full context' is under 10 minutes.

---

## Current state of the system

**9/10** — Audit performed on 2026-04-07

- ✅ Nimrod exists in the repo with complete identity
- ✅ 9 seminal documents in the repo's canon
- ✅ 54 missions with full detail
- ✅ 5 decisions with context and alternatives
- ✅ 6 days of historical reports
- ✅ 4 agents with SOUL.md in the repo
- ⏳ Daily memory persisted to git at close
- ⏳ Relational Knowledge Graph (future)

---

## Links from the original page

- How the agent works → `/agente`
- See the repository → https://github.com/numengames/numinia-nwos
- Archive Summa → `/archive`

---

*Metadata of the original page (`continuidad.astro`), translated: HTML title «System continuity — NWOS · Numen Games» · description «How the Narrative Work OS guarantees that an agent can rebuild itself 100% with repository access alone. The continuity proof.» · canonical route `/continuidad`.*

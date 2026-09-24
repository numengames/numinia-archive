---
id: "SYS-006"
uid: ""
title: "NWOS — System Description, Layers and Principles"
type: documentation
subtype: reference
status: active
version: "1.1.0"
created: "2026-08-17T19:30:52Z"
created_source: "git:809f717"
created_confidence: exact
updated: "2026-09-21T18:00:00+02:00"
author: "claude-fable-5"
owner: "oracle"
tags: [system, reference, nwos, architecture, layers, principles]
territory: "CAO"
license: "CC0-1.0"
former_id: "BLU-008"
former_id_note: "Reshelved 2026-09-21 under ADR-035's test: this text describes what runs — the layers, the features, the principles — not a design awaiting a decision. It was written as the home page of numinia.org and extracted from it (MIS-071); the home now shows the classification of the archive, and this is the manual behind what it used to say. Same move as BLU-005 → SYS-003. Minor: the body is unchanged, the header gains the card STD-007 asks for."
extraction_note: "Extracted verbatim from web/src/pages/index.astro (MIS-071 phase 2 — File over App): feature descriptions, the L0-L4 layer architecture, the six operating principles, the implementation requirements and the Narrative Layer note."
related: ["SYS-001", "SYS-003", "CAN-007"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# Narrative Work OS

> **Summary:** What the NWOS is, as it runs: five layers from files to
> narrative, six features a team gets on day one, six design principles and
> the three things an organisation needs to adopt it.
> **Epistemic:** The system described from the outside in — what a reader
> who has never opened the repository should understand first.
> **Pragmatic:** The reference behind the site's own description of itself;
> onboarding text for a team evaluating the system.
> **Audience:** Agents · Oracles · External collaborators

> A structured, file-based operating system for organizations. Built on markdown, git, and AI agents. No proprietary formats. No lock-in.

---

## What it is

| | |
|---|---|
| **For teams** | 10–200 people who need shared memory, decision traceability, and async coordination. |
| **Not a SaaS** | A set of structured conventions and file formats. You own your data. It runs anywhere git runs. |
| **AI-native** | Designed from the start for AI agents to read, write, and operate within the same files as humans. |

---

## Architecture — Layers L0–L4

| Layer | Name | Description |
|---|---|---|
| L0 | 📄 File Layer | All data is markdown files with YAML frontmatter. No proprietary formats. |
| L1 | 🔀 Version Layer | Git provides full history, branching, and collaboration via PRs. |
| L2 | 🤖 Agent Layer | AI agents read and write files like any contributor. |
| L3 | 🧬 Human Layer | Oracles (humans) approve decisions, set direction, and audit agent work. |
| L4 | 🎭 Narrative Layer | Optional. Guilds, lore, and game mechanics that make the system engaging for humans. |

```
┌──────────────────────────────────────────────┐
│  L4 · Narrative Layer 🎭          [Optional] │
│      Guilds, lore, game mechanics            │
├──────────────────────────────────────────────┤
│  L3 · Human Layer 🧬                         │
│      Oracles approve, direct, audit          │
├──────────────────────────────────────────────┤
│  L2 · Agent Layer 🤖                         │
│      AI agents read/write like contributors  │
├──────────────────────────────────────────────┤
│  L1 · Version Layer 🔀                       │
│      Git: history, branching, PRs            │
├──────────────────────────────────────────────┤
│  L0 · File Layer 📄                          │
│      Markdown + YAML frontmatter             │
└──────────────────────────────────────────────┘
```

*L4 (Narrative) is opt-in. The system works without it. It adds engagement and cultural coherence for teams that want it.*

---

## Features

### Mission System

- **id:** `missions` · **Status:** Active · **Default:** on

Each unit of work is a structured document with a unique ID, acceptance criteria, epistemic value, and pragmatic value. Missions are versioned in git.

- **Why it matters:** Transforms tasks into documented knowledge. Closing a mission leaves a trace — what was done, why it diverged from the plan, and what was learned.
- **vs. alternatives:** Linear and Jira track completion. The Mission System tracks knowledge.
- **Fields:** id · title · type (biological/digital/hybrid) · priority · effort · status · story · acceptance criteria · epistemic value · pragmatic value · execution reality

### Blueprints (System Maps)

- **id:** `blueprints` · **Status:** Active · **Default:** on

Living architecture documents that show the current state, target state, gap delta, and open questions for each subsystem.

- **Why it matters:** Most organizations have architectural decisions in people's heads. Blueprints externalize that knowledge into auditable, updatable files.
- **vs. alternatives:** Architecture Decision Records (ADRs) capture one decision. Blueprints show the whole system at a glance.
- **Fields:** id · area · status semaphore (green/yellow/red) · current state · target state · related decisions · gap → mission delta table · open questions · dependencies

### Decision Registry

- **id:** `decisions` · **Status:** Active · **Default:** on

Append-only log of architectural and strategic decisions. Each record captures context, the decision made, alternatives rejected, and pros/cons.

- **Why it matters:** Decisions made without documentation get remade. The registry prevents wheel reinvention and makes the cost of changing direction explicit.
- **vs. alternatives:** Notion docs get edited and lose history. The Decision Registry is immutable — superseded by new decisions, never deleted.
- **Fields:** id · title · date · status (active/provisional/superseded) · context · decision · why · rejected alternatives · pros/cons

### Digital Agents (CAO)

- **id:** `agents` · **Status:** Active · **Default:** opt-in

AI agents with persistent identity files (SOUL.md, OPERATOR.md, MEMORY.md) that operate within the system. Each agent has a guild, a role, and operational laws.

- **Why it matters:** Agents are not chatbots. They are long-running collaborators with memory, responsibilities, and verifiable identity. They read and write the same files humans do.
- **vs. alternatives:** ChatGPT and Copilot are stateless. NWOS agents maintain state across sessions via the git repository.
- **Fields:** SOUL.md (identity) · OPERATOR.md (laws) · MEMORY.md (persistent context) · guild assignment · mission assignments · operation logs

### Operational Reports

- **id:** `reports` · **Status:** Active · **Default:** on

Daily and weekly markdown reports committed to the repository. Reports are append-only — closed reports are never modified.

- **Why it matters:** Reports create accountability without overhead. A 5-minute daily summary in git is auditable, searchable, and doesn't require a BI tool.
- **vs. alternatives:** Slack summaries disappear. Email reports aren't searchable. Git reports are permanent and diffable.
- **Fields:** id · date · agent · model · completed work · epistemic value · pragmatic value · pending items requiring human input

### Protocols

- **id:** `protocols` · **Status:** Active · **Default:** on

Operational procedures written as markdown files. Protocols define how recurring tasks are executed — from briefing an agent to onboarding a new member.

- **Why it matters:** Recurring tasks without protocols become dependent on specific people. Protocols make processes portable.
- **vs. alternatives:** SOPs in Confluence rot and go unread. Markdown protocols are lightweight, versioned, and executable by agents.
- **Fields:** id · title · trigger · steps · owner · version

---

## Design principles

1. **File over App** — Data lives in markdown files, not locked in a SaaS database. If the tool disappears, the knowledge survives.
2. **Append-only history** — Decisions and reports are never edited retroactively. The record of what was thought and done at each moment is permanent.
3. **Explicit over implicit** — Every architectural decision, every divergence from a plan, every open question is written down. Nothing lives only in someone's head.
4. **Epistemic value as first-class citizen** — Every mission asks: what do we learn by doing this? Documentation that only records what was done is incomplete.
5. **Human approval for external actions** — Agents execute internal work autonomously. Any action that leaves the system (email, publish, deploy) requires explicit human approval.
6. **Layered architecture** — Each layer (files, version control, agents, humans, narrative) can fail without taking the others down. The system degrades gracefully.

---

## Implementation — Requirements

| Requirement | Note |
|---|---|
| ✓ Git repository | GitHub, GitLab, or self-hosted |
| ✓ Markdown editor | Any editor that reads .md files |
| ✓ AI agent access | Optional. Unlocks the agent layer. |

---

## About the Narrative Layer

The NWOS was built alongside **Numinia** — a narrative universe where guilds, missions, and archives are not metaphors but the actual vocabulary of work. The narrative layer is not required, but it changes how people relate to the system.

If you want the system without the narrative, it's still the same files, the same git workflow, the same agents. The narrative is an optional skin that makes the system feel alive.

---

*Metadata of the original page (`index.astro`): HTML title «Narrative Work OS — Numen Games» · description «A file-based operating system for organizations that need alignment, memory, and AI agent integration. No proprietary formats. No lock-in.» · canonical route `/`.*
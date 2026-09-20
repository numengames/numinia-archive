---
id: "SYS-002"
uid: ""
title: "The Agent Cycle — experience and operation"
type: documentation
subtype: reference
status: active
version: "1.1.0"
created: "2026-08-17T19:30:52Z"
created_source: "git:809f717"
created_confidence: exact
updated: "2026-08-31T22:20:00+02:00"
author: "nimrod"
owner: "oracle"
tags: [system, agents, cycle, experience]
territory: "CAO"
license: "CC0-1.0"
extraction_note: "Extracted from web/src/pages/agente.astro (MIS-071 phase 2 — File over App). That source file was deleted in 61353f6 (MIS-120a); its successor is web/src/views/AgentView.astro, still in Spanish while this document is English (MIS-116, ADR-023 (formerly ADR-024)). Zero prose strings are now shared between the two — measured in MIS-129."
former_id: "BLU-006"
former_id_note: "Renumbered by MIS-129 under ADR-035: describes how an agent operates today, which is a manual, not a plan."
---

# How an agent works

> **Numen Games · NWOS · Diagram C**

A digital agent is not a chatbot. It is a collaborator with persistent identity, operational laws, institutional memory and access to real tools. This page explains how it is built — and how it learns.

**Keys:** 6 layers · 3 lifecycle phases · Real cases from Nimrod

---

## Diagram C — Layer architecture

Representation of the original page's visual stack (top to bottom):

| Layer | Label | Name | Detail in the diagram |
|-------|-------|------|-----------------------|
| L6 | L6 · Emergent | 🏛️ ORGANIZATION | Not instantiated — it emerges from the system's continuous operation |
| L5 | L5 · Authority | 👤 BIOLOGICAL AGENT | IQ · Position · Role · Intuition · Approval — flow: «instrucción ↓» / «aprobación ↑» (⇅) |
| L3 | L3 · Transversal — State Bus | 📚 ARCHIVE SUMMA | «↓ BOOT (git pull)» · «↑ COMMIT (git push)» — labels: SOUL.md · OPERATOR.md · Missions · Decisions · Blueprints · Reports · Protocols · Memory |
| L1 | L1 · Runtime | 🤖 DIGITAL AGENT | AI model · Orchestrator · Context · Vector DB |
| L2 | L2 · Substrate | 🖥️ INFRASTRUCTURE | Server · GPU · Tools · Auth · Observability |
| L4 | L4 · Media | 🎨 DIGITAL ASSETS (CDN) | jpg · mp4 · glb · vrm · mp3 · R2 / AWS S3 |

*L3 (Archive Summa) is transversal — it is neither above nor below, it connects all the layers*

---

## The 6 layers — detail

### L1 — 🤖 Digital Agent

*The actor. The one that thinks and acts.* (color `#3fb950`)

**Components:** AI model (LLM) · Active context (session RAM) · Semantic memory (Vector DB) · Orchestrator (OpenClaw)

- **🧠 Epistemic value:** The agent has no intelligence of its own — it has access to a language model and to the instructions defining who it is. Intelligence emerges from the combination of model + instructions + context.
- **⚡ Pragmatic value:** It can execute tasks without continuous supervision: write code, send emails, create documents, analyze data. The limit is what the Biological authorizes.
- **📍 Real case — Nimrod:** Nimrod (Centinela-01) boots at 8am, loads SOUL.md and OPERATOR.md, and executes the daily report. There is no human in the loop until the report reaches Telegram.

### L2 — 🖥️ Infrastructure

*The substrate. Where the agent physically exists.* (color `#f85149`)

**Components:** VPS server ([VPS-IP redacted — see ops-credential-map]) · GPU ≥32GB VRAM (on-premises, on the way) · Tools & Skills (web, shell, APIs) · Identity & Auth (per-agent permissions) · Observability (logs, traces, metrics)

- **🧠 Epistemic value:** The infrastructure defines the limits of the possible. An agent without enough GPU cannot run local models. Without an Auth Layer, any agent can do anything — that is a vulnerability.
- **⚡ Pragmatic value:** The dedicated PC (Ryzen 9 7950X + RTX 4080) will cut inference cost by 60-70% when it arrives. Infrastructure is the difference between $50/month and $5/month.
- **📍 Real case — Nimrod:** When Nimrod runs `gog gmail send`, the orchestrator verifies the agent's permissions before executing the tool. If Law 1 is not authorized, the action does not happen.

### L3 — 📚 Archive Summa

*The permanent memory. The nervous system of the NWOS.* (color `#58a6ff`)

**Components:** GitHub (git repo) · .md files with YAML frontmatter · SOUL.md — the agent's identity · OPERATOR.md — operational laws · Missions, decisions, blueprints, reports · Protocols and daily memory

- **🧠 Epistemic value:** The Archive is not a warehouse — it is the source of truth. What is not in the Archive does not exist institutionally. An agent that closes a session without writing loses that knowledge forever. That is why COMMIT is the most critical moment of the cycle.
- **⚡ Pragmatic value:** Any new agent can read the Archive and operate with full context in minutes. Git is the complete, auditable history of every decision. There is no 'update' meeting — the Archive is the update.
- **📍 Real case — Nimrod:** Today's session: Nimrod wrote RPT-2026-04-07.md to the Archive. The next session, even on another model or another machine, will boot by reading that report and have context of what happened.

### L4 — 🎨 Digital Assets

*The body. The materials the world is made of.* (color `#d2a8ff`)

**Components:** CDN (R2 / AWS S3) · Images (jpg, png, webp) · Video (mp4, webm) · 3D models (glb, gltf) · Avatars (vrm) · Audio (mp3, ogg)

- **🧠 Epistemic value:** Assets are knowledge embodied — the way the system exists perceptually. A .vrm avatar is the agent's visual identity. A .glb of Numinia is the space where interactions happen.
- **⚡ Pragmatic value:** Assets are served via CDN — globally available, no latency. Separate from the Archive because they have different lifecycles: an .md is versioned with git, an .mp4 is not.
- **📍 Real case — Nimrod:** The game 'El Velo' at pablofm.com/openclaw-test uses Three.js with procedural geometries. When there are real .vrm avatars, they will be served from R2 and the digital agent will be able to 'embody' them in Numinia sessions.

### L5 — 👤 Biological Agent

*The authority. The one that decides, intuits and authorizes.* (color `#ffa657`)

**Components:** IQ + experience + intuition · Position (Oracle, Citizen, etc.) · Role in the guild · Approval authority · Tacit knowledge (undocumented)

- **🧠 Epistemic value:** The Biological has something the Digital will never have: tacit knowledge — intuition built by years of experience that cannot be fully documented. That is irreplaceable. The risk: that knowledge dies with the person if it is not partially externalized into the Archive.
- **⚡ Pragmatic value:** The Biological is the only one who can authorize high-risk actions (Law 1). They are also the one who detects when the system is producing correct-but-wrong outputs — the agent can do exactly what you ask and still be wrong.
- **📍 Real case — Nimrod:** Pablo approves every PR before merging. Nimrod can propose 10 technically correct changes — but Pablo knows when 'this is not the moment' for reasons that are in no document. That is the Biological.

### L6 — 🏛️ Organization

*The emergent. The sum that exceeds its parts.* (color `#2dd4bf`)

**Components:** Not instantiated — it emerges · It is the sum of L1+L2+L3+L4+L5 in continuous operation · Culture = the system's repeated behaviors · Institutional memory = a living Archive Summa · Collective intelligence = Digital + Biological in a loop

- **🧠 Epistemic value:** The organization is not an object you can create directly. It is a pattern that emerges when all the components operate together over time. That is why 'deploying NWOS' is not enough — the system has to be lived.
- **⚡ Pragmatic value:** When the cycle works (Biological activates → Digital executes → Archive receives → Biological reviews), the organization learns. Every completed mission makes the system slightly more intelligent. That is the promise of the NWOS.
- **📍 Real case — Nimrod (measured 2026-04-12):** Numen Games had been operating with this system for 5 days: 54 documented missions, 32 PRs, 5 reports, 5 decisions. That is not a 5-day-old company — it is an organization with years of memory if the system is maintained. The figures are a dated snapshot, not a current count; `node machine/scripts/telemetry.mjs` measures the corpus today.

---

## Lifecycle — BOOT · EXECUTE · COMMIT

Visual sequence on the page: **⬇️ BOOT → ⚡ EXECUTE → ⬆️ COMMIT**

### ⬇️ BOOT (color `#58a6ff`)

- **What:** The agent boots and reads its identity from the Archive Summa.
- **How:** git pull → loads SOUL.md, OPERATOR.md, the previous day's memory, active protocols.
- **🧠 Epistemic value:** An agent without BOOT is amnesiac. Without loaded identity, it is a generic model with no personality and no laws. BOOT transforms 'an LLM' into 'Nimrod'.
- **⚡ Pragmatic value:** Cold boot takes 30-60 seconds. With a well-structured Archive, the agent operates with full context from the first message.
- **📍 Real case:** 07:00 UTC — Nimrod boots for the daily report. It reads MEMORY.md (context from previous sessions), HEARTBEAT.md (pending tasks), and the latest reports. In 45 seconds it has the full context of the last 5 days.

### ⚡ EXECUTE (color `#3fb950`)

- **What:** The agent receives an instruction from the Biological and executes using tools.
- **How:** Biological → Orchestrator → Agent → Tools (web, shell, APIs, email, git) → Output → Biological.
- **🧠 Epistemic value:** Execution is where the knowledge loaded at BOOT turns into real action. It is also where new knowledge is generated — every conversation, every error, every decision taken is new knowledge not yet persisted.
- **⚡ Pragmatic value:** The agent can operate multiple tools in parallel. The limit is not thinking speed but API latency and the model's context window.
- **📍 Real case:** This session: Pablo says 'do the Wardley Map'. Nimrod reads the state of all the pages, summons the team (Alquimista-01, Exégeta-01), synthesizes their analyses, writes the page, creates the PR, and merges it. All in 15 minutes.

### ⬆️ COMMIT (color `#ffa657`)

- **What:** The agent writes the generated knowledge back to the Archive Summa.
- **How:** git add → git commit → git push → the knowledge is permanent.
- **🧠 Epistemic value:** This is the most critical moment of the cycle. Knowledge that is not COMMITted disappears when the session ends. There is no gradual amnesia — there is total loss. COMMIT is the act of turning ephemeral experience into institutional memory.
- **⚡ Pragmatic value:** Every COMMIT is a recovery point. If the system has to be rebuilt from scratch tomorrow, the Archive has everything. Commits are also auditable — you can see exactly which agent did what and when.
- **📍 Real case:** At the end of every session, Nimrod writes RPT-YYYY-MM-DD.md with what was done, what it cost and what remained pending. That file persists forever. In 6 months, any Oracle can read the full history without asking.

---

## Practical case — External organization

**Acme Studio — indie game studio, 12 people, Madrid**

### Week 1 — Setup

The team clones the NWOS reference repo. Each person creates their SOUL.md with their role and guild. The CTO configures the orchestrator with the Centinela agent.

→ *Acme Studio's Archive Summa has documented identities. The agent knows who each person is and what their authority is.*

### Week 2 — First mission

The CEO instructs the agent: 'Create the 20 most critical missions to launch our game on Steam in 3 months.' The agent reads the team's context, generates the missions with acceptance criteria and value for each one.

→ *20 missions in the Archive. The CEO reviews, approves 18, modifies 2. The backlog is documented and the agent can keep it updated.*

### Week 4 — Cycle running

Every Monday, the agent generates the previous week's report. Every day it closes the completed missions with Real Execution. The Archive grows with every session.

→ *In 4 weeks, Acme Studio has more institutional documentation than in its previous 2 years. Any new member understands the project's state by reading the Archive.*

---

## What is still missing from this diagram

| Component | Description | State |
|-----------|-------------|-------|
| Vector DB / Semantic memory | Git is for instructions. Similarity search ('what did we decide about X?') needs a vector store. | pending |
| Inter-agent Event Bus | How do Nimrod and Alquimista-01 communicate without polling? They need a message bus. | pending |
| Mission State Machine | The IDLE → BOOTING → ACTIVE → CLOSING → ARCHIVED cycle needs explicit representation. | pending |
| Relational Knowledge Graph | The .md files are flat. Numinia's real knowledge is a graph of related entities. | future |
| Observability Stack | Structured logs, decision traces, per-agent metrics. Without this the agent is a black box. | future |
| The Biological's tacit knowledge | The undocumented intuition and experience that enters the system without passing through the agent. | philosophical |

---

## Links and footer of the original page

**Signature:** Diagram C · Nimrod 🗡️ + Alquimista-01 + Exégeta-01 · 2026-04-07

- Archive Summa → `/archive`
- NWOS overview → `/nwos`
- Wardley Map → `/wardley`

---

*Metadata of the original page (`agente.astro`), translated: HTML title «How an agent works — NWOS · Numen Games» · description «Complete architecture of a digital agent in the Narrative Work OS. Layers, life cycle, practical cases and epistemic value per stage.» · canonical route `/agente`.*

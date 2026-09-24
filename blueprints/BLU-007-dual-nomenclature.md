---
id: "BLU-007"
uid: ""
title: "Sistema de Nomenclatura Dual — Narrative & Gamification Dials"
type: blueprint
status: active
version: "1.0.0"
created: "2026-08-17T19:30:52Z"
created_source: "git:809f717"
created_confidence: exact
updated: "2026-08-27T22:02:10Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, nomenclature, narrative-dial, gamification-dial, i18n]
territory: "CAO"
license: "CC0-1.0"
extraction_note: "Extracted verbatim from web/src/pages/idioma.astro (MIS-071 phase 2 — File over App). Related mission: MIS-055."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Two Dials. One System.

> **Numen Games · NWOS · Adaptability**

The Narrative Work OS speaks any language. Organizations choose how much narrative and how much gamification they want. The system is the same — the vocabulary adapts.

---

## The two dials

### 🎭 Narrative Dial (1 → 10)

Controls vocabulary and semantic identity. At 1, it's a business tool. At 10, you're inside a living world.

| Extreme | Label |
|---------|-------|
| 1 — Business | "Project Management" |
| 10 — Numinia | "Misiones del Oráculo" |

### 🎮 Gamification Dial (1 → 10 · 5 real thresholds)

Gamification has qualitative jumps, not a smooth curve. Five named thresholds. Independent from the narrative dial.

| Level | Name | Description | Color |
|-------|------|-------------|-------|
| 1 | None | Just the OS | `#6b7280` |
| 3 | Visibility | Dashboards, streaks, progress % | `#86efac` |
| 5 | Achievement | Badges, milestones, celebration | `#fbbf24` |
| 7 | Progression | Ranks, reputation, history | `#f97316` |
| 10 | Full Economy | Tokens, Prism Cells, real weight | `#2dd4bf` |

*Intermediate levels (2,4,6,8,9) are blends — no name, full config*

### The dials are independent

| Example | Configuration | Feel |
|---------|---------------|------|
| 🏢 **Corp standard** | Narrative 1 · Gamification 1 | Pure business tool |
| 🎮 **Gaming company** | Narrative 4 · Gamification 9 | Gamified but business language |
| 🌒 **Numinia** | Narrative 10 · Gamification TBD | Full immersion |

---

## Narrative Dial — 5 levels

### 1 — Business (color `#6b7280`)

*Pure operational language. No metaphors.*

- **Who:** Traditional companies, corporate teams, skeptical C-suites.
- **Feel:** "This is a work management system with structured documentation and AI agents."

### 3 — Functional (color `#fbbf24`)

*Light metaphors. Familiar structure with a distinct voice.*

- **Who:** Agencies, creative studios, scale-ups with culture already.
- **Feel:** "We run initiatives through guilds, with agents that keep institutional memory alive."

### 5 — Mixed (color `#34d399`)

*Half-narrative. Familiar enough to onboard fast, interesting enough to retain.*

- **Who:** Tech startups, DAOs, companies building culture intentionally.
- **Feel:** "Our missions run through Knowledge Leads and Innovation Leads, tracked in the Archive."

### 7 — Narrative (color `#a78bfa`)

*Rich vocabulary. The system has character.*

- **Who:** Gaming companies, Web3 teams, organizations that want meaning at work.
- **Feel:** "Exégetas and Alquimistas run missions together, reporting to the Council."

### 10 — Numinia (color `#2dd4bf`)

*Full immersion. The city is the system.*

- **Who:** Numen Games. Organizations ready for a complete narrative operating system.
- **Feel:** "The Guardián de las Puertas runs the Dark Council. The Oráculos govern from the Archive Summa."

---

## Vocabulary map

*Same concept · 5 languages.* Columns: **Business 1 · Functional 3 · Mixed 5 · Narrative 7 · Numinia 10**

### Agents & Roles

| Concept | Business 1 | Functional 3 | Mixed 5 | Narrative 7 | Numinia 10 |
|---------|------------|--------------|---------|-------------|------------|
| Executive | Executive | Founder | Council Lead | Arconte | Oráculo |
| Operations Lead | Head of Operations | Operations Lead | Operations Lead | Centinela | Centinela |
| CTO / Innovation | CTO / Head of Product | Innovation Lead | Innovation Lead | Alquimista | Alquimista |
| Chief of Staff / Knowledge | Chief of Staff | Knowledge Lead | Knowledge Lead | Exégeta | Exégeta |
| COO / Business | Head of Business | Business Lead | Business Lead | Procurador | Procurador |
| AI Orchestration | AI Orchestration Layer | System Intelligence | System Intelligence | Procyon | Procyon |
| AI Agent | AI Agent | Digital Coworker | Digital Agent | Agente Digital | Agente Digital |
| New member | Onboarding | New member | Explorer | Nómada | Nómada |
| Team member | Team Member | Member | Citizen | Ciudadano | Ciudadano |
| Senior | Senior / Principal | Senior Member | Pilgrim | Peregrino | Peregrino |
| Expert | Expert / Principal | Expert | Expert | Vernáculo | Vernáculo |
| Director / Lead | Director / Lead | Lead | Archon | Arconte | Arconte |

### Structures

| Concept | Business 1 | Functional 3 | Mixed 5 | Narrative 7 | Numinia 10 |
|---------|------------|--------------|---------|-------------|------------|
| Department / Team | Department | Team | Guild | Gremio | Gremio |
| Division / Area | Division | Area | Faction | Facción | Facción |
| Operations Center | Operations Center | Ops Center | CAO | CAO | CAO |
| System Blueprint | System Blueprint | System Map | Blueprint | Plano | Plano |
| Knowledge Base | Knowledge Base | Knowledge Base | Archive | Archivo | Archive Summa |
| Decision Record | Decision Record | Decision Record | Decision Stone | Decisión | Piedra del Camino |
| Report | Report | Report | Dispatch | Reporte | Reporte |
| Process / SOP | Process / SOP | Protocol | Protocol | Protocolo | Protocolo |

### Actions & Rituals

| Concept | Business 1 | Functional 3 | Mixed 5 | Narrative 7 | Numinia 10 |
|---------|------------|--------------|---------|-------------|------------|
| Project / Initiative | Project | Initiative | Mission | Misión | Misión |
| Daily Standup | Daily Standup | Daily | Daily | Daily | Daily |
| Weekly Strategy | Weekly Strategy Meeting | Strategy Session | Council | Dark Council | Dark Council |
| Creative Session | Creative Session | Creative Session | Coven | Lunar Coven | Lunar Coven |
| Onboarding Workshop | Onboarding | Onboarding Workshop | Session Zero | Session Zero | Session Zero |
| Campaign / Program | Program | Campaign | Adventure | Aventura | Aventura |
| Quarter / Cycle | Quarter | Cycle | Season | Temporada | Temporada |

### System & Product

| Concept | Business 1 | Functional 3 | Mixed 5 | Narrative 7 | Numinia 10 |
|---------|------------|--------------|---------|-------------|------------|
| Work Operating System | Work Operating System | Work OS | Narrative Work OS | Narrative Work OS | Narrative Work OS |
| The Organization | The Organization | The System | The City | Numinia | Numinia |
| Membership Token | Membership Token | Access Token | Prism Cell | Prism Cell | Prism Cell |
| Badge / Certificate | Badge | Achievement | Seal | Sello | Sello |

*Column colors in the original page: Business 1 `#6b7280` · Functional 3 `#fbbf24` · Mixed 5 `#34d399` · Narrative 7 `#a78bfa` · Numinia 10 `#2dd4bf`.*

---

## Why this changes everything

### Narrative is a feature, not a requirement

The system works at dial 1. No lore needed. Organizations that want the narrative can unlock it — organizations that don't can ignore it completely.

### Solves the first-impression problem

A traditional C-suite sees a structured work OS with AI agents. A gaming studio sees a living narrative world. Same system. Different entry points.

### Gamification is independent

A company can have full gamification (ranks, achievements, tokens) at narrative level 1. The mechanics don't require the metaphors.

### Numinia is the reference, not the constraint

Numinia (10/10) is what full adoption looks like. It's the vision, not the requirement. Every organization starts wherever they are.

---

## ⚡ Work in progress — MIS-055

This page documents a system design proposal that emerged from the Dark Council on 2026-04-06. The vocabulary table above is a first proposal — it will evolve.

Once validated, this becomes **DEC-006** — a decision that modifies the NWOS architecture to include the two-dial system as a standard configuration parameter.

**Links from the original page:**

- MIS-055 → `/missions/mis-055`
- Decision Registry → `/decisiones`
- NWOS overview → `/nwos`

---

*Metadata of the original page (`idioma.astro`): HTML title «Narrative Dial — Language System · Numen Games» · description «Two dials. One system. Organizations choose their level of narrative and gamification. The NWOS speaks any language.» · canonical route `/idioma`.*

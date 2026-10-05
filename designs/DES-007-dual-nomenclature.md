---
id: "DES-007"
uid: ""
title: "Dual nomenclature — the narrative and gamification dials"
type: design
former_id: "BLU-007"
former_id_note: "Renamed by ADR-067 cut 4 (2026-10-03): the series blueprints/ took the industry's word, designs/, and the prefix BLU- became DES-."
status: active
version: "1.2.0"
created: "2026-08-17T19:30:52Z"
created_source: "git:809f717"
created_confidence: exact
updated: "2026-10-05T17:40:00+02:00"
author: "nimrod"
owner: "oracle"
tags: [design, nomenclature, narrative-dial, gamification-dial, i18n]
section: "Products and services"
license: "CC0-1.0"
extraction_note: "Extracted verbatim from web/src/pages/idioma.astro (MIS-071 phase 2 — File over App). Related mission: MIS-055."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Two Dials. One System.

> **Summary:** Two independent dials, narrative and gamification, set how
> much of the world's vocabulary and how much play an organisation takes on;
> the system underneath stays the same.
> **Epistemic:** How can one system speak both as a business tool and as a
> living world?
> **Pragmatic:** Pick a setting on each dial and read the vocabulary and
> mechanics that come with it.

The Narrative Work OS speaks any language. Organizations choose how much narrative and how much gamification they want. The system is the same — the vocabulary adapts.

---

## The two dials

### 🎭 Narrative Dial (three levels)

Controls vocabulary and semantic identity. At 1, it's a business tool. At 3, you're inside a living world. The three levels are the moon's three stops on the sites: new moon, half moon, full moon.

| Extreme | Label |
|---------|-------|
| 1 — Business | "Project Management" |
| 3 — Numinia | "Misiones del Oráculo" |

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
| 🎮 **Gaming company** | Narrative 1 · Gamification 9 | Gamified but business language |
| 🌒 **Numinia** | Narrative 3 · Gamification TBD | Full immersion |

---

## Narrative Dial — three levels

Reduced from five to three on 2026-09-29, to keep it simple: the three
levels are the three stops of the moon in every site's bar. The earlier
scale (1 · 3 · 5 · 7 · 10, with *Functional* and *Narrative* between) is
retired.

### 1 — Business (new moon, colour `#6b7280`)

*Pure operational language. No metaphors.* The archive is written at this level.

- **Who:** Traditional companies, corporate teams, skeptical C-suites.
- **Feel:** "This is a work management system with structured documentation and AI agents."

### 2 — Mixed (half moon, colour `#34d399`)

*Half and half: the business words with Numinia's beside them.*

- **Who:** Tech startups, DAOs, companies building culture intentionally.
- **Feel:** "Our missions run through the guilds, tracked in the Archive."

### 3 — Numinia (full moon, colour `#2dd4bf`)

*Full immersion. The city is the system.*

- **Who:** Numen Games. Organizations ready for a complete narrative operating system.
- **Feel:** "The Guardián de las Puertas runs the Dark Council. The Oráculos govern from the Summa Archive."

---

## Vocabulary map

*Same concept · 3 levels.* Columns: **Business 1 · Mixed 2 · Numinia 3**

### Agents & Roles

| Concept | Business 1 | Mixed 2 | Numinia 3 |
|---------|------------|---------|------------|
| Founding Partner | Founding Partner | Oracle | Oráculo |
| Operations Lead | Head of Operations | Operations Lead | Centinela |
| CTO / Innovation | CTO / Head of Product | Innovation Lead | Alquimista |
| Chief of Staff / Knowledge | Chief of Staff | Knowledge Lead | Exégeta |
| COO / Business | Head of Business | Business Lead | Procurador |
| AI Orchestration | AI Orchestration Layer | System Intelligence | Procyon |
| AI Agent | AI Agent | Digital Agent | Agente Digital |
| New member | New member | Nomad | Nómada |
| Team member | Team member | Citizen | Ciudadano |
| Contributor | Contributor | Pilgrim | Peregrino |
| Principal | Principal | Vernacular | Vernáculo |
| Executive | Executive | Archon | Arconte |

### Structures

| Concept | Business 1 | Mixed 2 | Numinia 3 |
|---------|------------|---------|------------|
| Profession | Profession | Guild | Gremio |
| Specialization | Specialization | Branch | Rama |
| Subspecialization | Subspecialization | House | Casa |
| Area | Area | Faction | Facción |
| Operations Center | Operations Center | CAO | CAO |
| Design document | Design document | Blueprint | Plano |
| Knowledge Base | Knowledge Base | Archive | Summa Archive |
| Decision Record | Decision Record | Decision Stone | Piedra del Camino |
| Report | Report | Dispatch | Reporte |
| Procedure / SOP | Procedure / SOP | Procedure | Procedimiento |

### Actions & Rituals

| Concept | Business 1 | Mixed 2 | Numinia 3 |
|---------|------------|---------|------------|
| Project / Initiative | Project | Mission | Misión |
| Daily Standup | Daily Standup | Daily | Daily |
| Weekly Strategy | Weekly Strategy Meeting | Council | Dark Council |
| Creative Session | Creative Session | Coven | Lunar Coven |
| Onboarding Workshop | Onboarding | Session Zero | Session Zero |
| Experience / Event | Experience | Adventure | Aventura |
| Quarter / Cycle | Quarter | Season | Temporada |

### System & Product

| Concept | Business 1 | Mixed 2 | Numinia 3 |
|---------|------------|---------|------------|
| Work Operating System | Work Operating System | Narrative Work OS | Narrative Work OS |
| The Organization | The Organization | The City | Numinia |
| Contribution Credit | Contribution Credit | Prism Cell | Prism Cell |
| Badge / Certificate | Badge | Seal | Sello |

*Column colours: Business 1 `#6b7280` · Mixed 2 `#34d399` · Numinia 3 `#2dd4bf`.*

---

## Why this changes everything

### Narrative is a feature, not a requirement

The system works at dial 1. No lore needed. Organizations that want the narrative can unlock it — organizations that don't can ignore it completely.

### Solves the first-impression problem

A traditional C-suite sees a structured work OS with AI agents. A gaming studio sees a living narrative world. Same system. Different entry points.

### Gamification is independent

A company can have full gamification (ranks, achievements, tokens) at narrative level 1. The mechanics don't require the metaphors.

### Numinia is the reference, not the constraint

Numinia (level 3) is what full adoption looks like. It's the vision, not the requirement. Every organization starts wherever they are.

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

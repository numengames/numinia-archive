---
id: "SYS-003"
uid: ""
title: "The Archive's Fondos"
type: documentation
subtype: reference
status: active
version: "1.1.2"
created: "2026-08-17T19:10:09Z"
created_source: "git:715cc53"
created_confidence: exact
updated: "2026-09-09T15:10:00+02:00"
author: "claude-fable-5"
owner: "oracle"
tags: [system, archive, fondos, taxonomy]
territory: "CAO"
license: "CC0-1.0"
extraction_note: "Extracted from web/src/pages/archive/[fondo].astro and archive/index.astro (MIS-065 phase C — File over App). Document paths corrected to the post-MIS-066 flat layout (agents flat, missions flat, P-001 English); 'Archive System' has no matching file in canon/ today — kept as declared, flagged for MIS-071. The per-fondo lore lines were folded into this file's fondos[].lore under ADR-036 (2026-09-01): canon/ became CC0, so the one-file-one-regime split that justified the separate lore file no longer applied and that file was retired. Translated to English under MIS-116 (ADR-023 (formerly ADR-024)) — language only."
former_id: "BLU-005"
former_id_note: "Renumbered by MIS-129 under ADR-035: this is the reference manual of the seven fondos, not a plan. Its frontmatter also carries the live data for the /archive pages, which were repointed in the same commit."
fondos:
  - id: canon
    lore: "El Archive no comenzó con código. Comenzó con nueve preguntas que nadie supo responder sin ponerse de acuerdo."
    titulo: "Canon"
    subtitulo: "Immutable Memory"
    icono: "📜"
    color: green
    descripcion: "The 7 foundational documents of Numinia. Immutable by policy and by technique. They are the ground everything else is built upon."
    governance: "Only Oracle can modify. Blocking CODEOWNERS. No exceptions."
    documentos:
      - { nombre: "Welcome to Numinia", desc: "Gateway into the world. Historical context and purpose of the system.", file: "canon/CAN-001-welcome-to-numinia.md" }
      - { nombre: "Numinia Brand & Culture", desc: "Visual, verbal and cultural identity of Numinia v0.1.2.", file: "canon/CAN-002-brand-and-culture.md" }
      - { nombre: "Compendium of Attributes and Ranks", desc: "Attribute system, ranks and the agent's character sheet. Absorbed the rank specifications (ADR-036).", file: "canon/CAN-003-attributes-and-ranks.md" }
      - { nombre: "Role Structure", desc: "Role theory: Basic Level (guilds) + Prototype (factions).", file: "canon/CAN-004-role-structure.md" }
      - { nombre: "Licensing", desc: "The licensing regimes of the corpus: what is open, what is reserved, and why.", file: "canon/CAN-005-licensing.md" }
      - { nombre: "Epistemic Relations", desc: "The OS→Model→Narrative triad. Peirce + Jung applied to organizations.", file: "canon/CAN-006-epistemic-relations.md" }
      - { nombre: "Pragmatic Numen System", desc: "The pragmatic framework underneath the system's epistemology.", file: "canon/CAN-007-pragmatic-numen-system.md" }
    documentos_relacionados:
      - { nombre: "Platform ranks", desc: "Ranks and permissions of the Digital Goods v2 platform. Left canon under ADR-035 — a platform spec, not world canon.", file: "standards/STD-003-platform-ranks.md" }
      - { nombre: "About Session Zero", desc: "4 introductory escape rooms, seals, Prism Cells. Left canon under ADR-036 — game design, not governance.", file: "lore/adventures/session-zero.md" }
      - { nombre: "Numinia — The Role-Playing Game", desc: "Complete RPG manual in Spanish, v0.6.0.", file: "lore/game/manual-v0.6.0.md" }
  - id: agents
    lore: "No son herramientas. Son funciones vivas que existen mientras operan dentro de sus reglas."
    titulo: "Agents"
    subtitulo: "Living Entities"
    icono: "🤖"
    color: teal
    descripcion: "The digital agents operating in the system. Each with a machine-readable card (AGENT.yaml), an identity (SOUL), governance (OPERATOR), a source map (SOURCES) and platform adapters."
    governance: "SOUL, OPERATOR and AGENT.yaml are modified only by Oracle-reviewed change (AGENTS.md, Canonical Changes). Runtime state lives on the platform, not in the archive."
    documentos:
      - { nombre: "Agents — Index", desc: "The operative roster: seven agents, their routing, and the authorship archaeology.", file: "agents/INDEX.md" }
      - { nombre: "Ursa — SOUL.md", desc: "Technical Architect & Orchestrator. Identity, function, limits.", file: "agents/ursa/SOUL.md" }
      - { nombre: "Byblos — SOUL.md", desc: "Records Manager & Information Governance. The custodian of the archive (formerly Adonaz).", file: "agents/byblos/SOUL.md" }
  - id: missions
    lore: "Una misión no termina cuando se cierra. Termina cuando se entiende por qué divergió del plan."
    titulo: "Missions"
    subtitulo: "Movement"
    icono: "⚡"
    color: yellow
    descripcion: "Tasks with verifiable acceptance criteria. A mission is the system's minimum unit of work. When completed, it remains with its Real Execution documented."
    governance: "Only the executor edits their active mission. A done mission is immutable."
    documentos:
      - { nombre: "Mission Template v2", desc: "Standard template with divergence_log, executor, blocked_reason.", file: "missions/TEMPLATE.md" }
      - { nombre: "MIS-037 — Archive Summa", desc: "The mission that created this repository. Completed.", file: "missions/MIS-0037-create-archive-summa-repo.md" }
      - { nombre: "MIS-051 — Gmail/Drive/Calendar", desc: "Google Workspace integration with the gog CLI. Completed.", file: "missions/MIS-0051-gmail-calendar-drive-gog.md" }
      - { nombre: "MIS-054 — Multi-Oracle access", desc: "Oracle onboarding to Telegram with Nimrod. In progress.", file: "missions/MIS-0054-multi-oracle-telegram-access.md" }
  - id: protocols
    lore: "Un ritual no es burocracia. Es la forma en que el sistema recuerda cómo hacerlo bien."
    titulo: "Protocols"
    subtitulo: "Operating Rituals"
    icono: "📋"
    color: blue
    descripcion: "The exact procedures for starting sessions, executing missions, coordinating between agents and escalating decisions. Never edited — versioned."
    governance: "New version = new file. Never edit in place. Oracle approves."
    documentos:
      - { nombre: "P-001 Agent Briefing", desc: "The canonical boot. The inviolable steps for starting any session.", file: "protocols/P-001-agent-briefing.md" }
      - { nombre: "P-002 Agent Onboarding v1", desc: "How to bring a new agent into the system without losing coherence.", file: "protocols/P-002-onboarding-agente-v1.md" }
      - { nombre: "P-003 Mission Cycle", desc: "Create, execute, document and close a mission correctly (v3: flat folder, state in frontmatter).", file: "protocols/P-003-ciclo-mision-v1.md" }
      - { nombre: "P-004 Inter-Agent v1", desc: "Coordination between agents without ambiguity or write conflicts.", file: "protocols/P-004-inter-agent-v1.md" }
      - { nombre: "P-005 Escalation v1", desc: "When and how to escalate to the coordinator or the Oracle.", file: "protocols/P-005-escalation-v1.md" }
  - id: decisions
    lore: "Una decisión no documentada es una deuda que otro pagará sin saber que existe."
    titulo: "Decisions"
    subtitulo: "Crystallized Will"
    icono: "🗿"
    color: purple
    descripcion: "The architectural decisions that are not revisited, only superseded. Every ADR exists because someone had to choose and did so explicitly. They are the permanent record of the why."
    governance: "Append-only. Never delete. Only 'superseded by ADR-XXX' may be added."
    documentos:
      - { nombre: "ADR-001 — GitHub as Archive", desc: "Why GitHub and not Notion, Confluence or another system?", file: "decisions/ADR-001-the-archive.md" }
      - { nombre: "ADR-001 (formerly ADR-002) — Universal Markdown", desc: "Why .md and not PDF, Word or other formats?", file: "decisions/ADR-001-formato-markdown.md" }
  - id: blueprints
    lore: "Todo lo que existe fue primero potencial. Los blueprints son el lugar donde el potencial espera."
    titulo: "Blueprints"
    subtitulo: "Unmanifested Potential"
    icono: "🔮"
    color: indigo
    descripcion: "The designs and architectures being thought out. The Archive Summa itself began as a blueprint. The future lives here before becoming present."
    governance: "Oracle and agents may create. Oracle approves the merge."
    documentos:
      # The three archive-summa v0.1.0 documents were the whole of this shelf
      # until 2026-08-31. PR #170 deleted them as closed April drafts from the
      # old numinia-agents repo — their surviving content became the PRO- and
      # STD- series and the canon — and this list kept offering them, so
      # /archive/blueprints served three dead download links. Removed rather
      # than repointed: the content was dissolved into other series, not moved,
      # so there is no successor file to name. BLU-008 is what the shelf holds
      # now; the empty list this briefly left behind broke the build.
      - { nombre: "BLU-008 — NWOS System", desc: "What this system is and what it is for.", file: "blueprints/BLU-008-nwos-system.md" }
  - id: operations
    lore: "Sin governance explícita, el sistema se deteriora. Sin seguridad, el sistema se expone."
    titulo: "Operations"
    subtitulo: "Circulatory System"
    icono: "⚙️"
    color: orange
    descripcion: "The rules of who can do what, the credential maps and the security policies. It is the circulatory system keeping everything cohesive."
    governance: "Oracle modifies. Agents may propose via PR."
    documentos:
      - { nombre: "Governance", desc: "Complete table: who can create, modify, archive each document type.", file: "GOVERNANCE.md" }
      - { nombre: "Secrets handling", desc: "The system's security rules and the credential map. What never goes in the repo, and where things actually live.", file: "operations/OPS-009-secrets-handling.md" }
graph:
  nodes:
    - { id: canon, label: "canon/", subtitle: "Immutable Memory", color: "0x00ff88", x: 0, y: 2, z: 0 }
    - { id: agents, label: "agents/", subtitle: "Living Entities", color: "0x00d9c4", x: 2, y: 0.5, z: 1 }
    - { id: missions, label: "missions/", subtitle: "Movement", color: "0xffcc00", x: -2, y: 0.5, z: 1 }
    - { id: protocols, label: "protocols/", subtitle: "Operating Rituals", color: "0x4488ff", x: 0, y: 0.5, z: -2.5 }
    - { id: decisions, label: "decisions/", subtitle: "Crystallized Will", color: "0xaa44ff", x: 2, y: -1, z: -1 }
    - { id: blueprints, label: "blueprints/", subtitle: "Potential", color: "0x8844cc", x: -2, y: -1, z: -1 }
    - { id: operations, label: "operations/", subtitle: "Circulatory System", color: "0xff8800", x: 0, y: -2, z: 0.5 }
  edges:
    - [canon, agents]
    - [canon, missions]
    - [protocols, agents]
    - [protocols, missions]
    - [operations, agents]
    - [operations, missions]
    - [missions, decisions]
    - [missions, blueprints]
    - [agents, missions]
---
# BP — The Archive's Fondos

> **Summary:** The Archive's taxonomy: the seven documentary fondos,
> what each contains, who governs it, and how they relate to each
> other. The data in this frontmatter feeds the viewer's `/archive`
> pages — the archive is the source, the web the lens.
> **Epistemic:** How the system's memory is organized.
> **Pragmatic:** Canonical reference for the fondos and their relations.
> **Audience:** Agents · Oracles

---

## The seven fondos

| Fondo | Subtitle | Governance |
|---|---|---|
| `canon/` | Immutable Memory | Oracle only. Blocking CODEOWNERS. |
| `agents/` | Living Entities | SOUL/OPERATOR: Oracle. STATUS: the agent. |
| `missions/` | Movement | Only the executor edits their active mission. |
| `protocols/` | Operating Rituals | New version = new file. |
| `decisions/` | Crystallized Will | Append-only. Never delete. |
| `blueprints/` | Unmanifested Potential | Oracle approves the merge. |
| `operations/` | Circulatory System | Oracle modifies; agents propose. |

## Relations

```
            canon
           /     \
      agents ←→ missions ── decisions
        |      /   |
   protocols  /    blueprints
        |    /
    operations
```

The canon feeds agents and missions; the protocols ritualize both; the
operations sustain them; missions crystallize into decisions and are
born from blueprints. The exact positions and edges of the viewer's 3D
diagram live in the frontmatter (`graph:`).

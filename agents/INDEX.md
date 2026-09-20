---
id: "agents-index"
title: "Agents — Index"
type: meta
status: active
version: "3.0.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-08-28T09:54:16Z"
author: "ursa"
owner: "oracle"
tags: [agents, index]
license: "CC0-1.0"
registration: exempt
registration_reason: "singular document, not a numbered series"
---
# Agents — Operative Roster

> **Summary:** index of the digital agents defined in this archive.
> **Epistemic:** who the agents are, what work routes to each, and how a
> reader arriving from `git log` resolves a retired author name.
> **Pragmatic:** the routing map — read `AGENT.md` for the card (`AGENT.yaml` where not yet converted),
> `SOUL.md` for the identity, `adapters/hermes/` to instantiate.
> **Audience:** Agents · Oracles

---

Agent files live in `agents/{name}/`. The repository defines the agent; a
platform (Hermes, or any other) instantiates it from `adapters/`
(ADR-026, MIS-118). Each folder carries:

```
agents/{name}/
├── AGENT.md              ← the entity card: status, forms, routing (AGENT.yaml until converted)
├── SOUL.md               ← identity, function, limits
├── OPERATOR.md           ← governance: authority, escalation
├── SOURCES.md            ← where its authoritative knowledge lives
└── adapters/
    └── hermes/
        ├── profile.yaml  ← Hermes routing description
        └── config.yaml   ← Hermes approvals, memory, delegation
```

## Roster

| Agent | Role | Route here when | Since |
|---|---|---|---|
| [Ursa](ursa/SOUL.md) | Technical Architect & Orchestrator | software, architecture, Hermes, orchestration | 2026-08-28 |
| [Byblos](byblos/SOUL.md) | Records Manager & Information Governance | classification, lifecycle, naming, archive governance | 2026-08-28 |
| [Antunj](antunj/SOUL.md) | Product Strategist & Narrative Architect | positioning, product narrative, naming, coherence | 2026-08-28 |
| [Lexa](lexa/SOUL.md) | Legal & Regulatory Analyst | legal issues, licensing, crypto/Web3, compliance risk | 2026-08-28 |
| [Senet](senet/SOUL.md) | Game Master & Interactive Design | RPG sessions, mechanics, puzzles, encounters | 2026-08-28 |
| [Procyon](procyon/SOUL.md) | Ambassador & Onboarding Guide | first explanations, orientation, stakeholder guidance | 2026-08-28 |
| [Doulos](doulos/SOUL.md) | General-Purpose Execution Worker | bounded, repetitive, low-ambiguity work | 2026-08-28 |
| [Calliope](calliope/SOUL.md) | Copywriter & Professional Writer | copywriting, editorial writing, channel adaptation | 2026-09-04 |
| [Nimrod](nimrod/SOUL.md) | Repository Guide & Knowledge Navigator | repository navigation, authority mapping, provenance | 2026-09-04 |
| [Talos](talos/SOUL.md) | Repository Security & Operational Assurance | CI/CD, safeguards, automation integrity, control verification | 2026-09-04 |

Routing does not transfer authority: a specialist escalates or consults
another specialist when a task materially exceeds its own domain
(`AGENTS.md`, Specialist Routing).

## Renames

**An agent that has committed never loses its previous name** (`STD-001` §5.2).

- **Byblos** is the agent previously designed as **Adonaz** (renamed
  2026-08-28). Adonaz recorded no commits, so no git authorship is affected.

## Authorship archaeology

Git authorship cannot be rewritten. A reader arriving from `git log` resolves
retired author strings here — this table survives any roster change
(`D-027`).

| Git author string | Was | In use | Commits |
|---|---|---|---|
| `Centinela-01 <khepri@ai.numengames.com>` | Nimrod — **retired 2026-08-28**, no successor | 2026-04-06 → 2026-08-17 | 57 |
| `Ursa <ursa-numinia@users.noreply.github.com>` | [Ursa](ursa/SOUL.md) | 2026-08-25 → | 5 |
| `Ursa (agente) <ursa@numen.games>` | [Ursa](ursa/SOUL.md) | 2026-08-24 → | 30+ |

`Centinela-01` committed the ten seminal canon documents on 2026-04-07,
including `CAN-001-welcome-to-numinia.md`. The agent was renamed to Nimrod by
`MIS-089` and retired by `MIS-118`; the history did not change and cannot.
See `D-027`.

## Retired rosters

The pre-2026-08-28 roster (Nimrod, Adonaz, procurador-01, and the
character-voiced Senet/Ursa personas, with their `STATUS.md`/`MEMORY.md`
state files) was retired by `MIS-118` and remains in Git history. Runtime
state no longer lives in the archive: `status:` is a field in `AGENT.md`,
and session metrics belong to the platform, not the canon.

## Version history

- v3.0.0 (2026-08-28) — MIS-118: full roster replacement. Seven operative
  definitions under CC0 (ADR-026); adapters/ structure; STATUS/MEMORY files
  retired; archaeology table made independent of living folders.
- v2.0.0 (2026-04-07) — historical-identities table added (D-027).
- v1.0.0 (2026-04-06) — initial index.

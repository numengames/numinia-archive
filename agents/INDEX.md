---
id: "agents-index"
title: "Agents — Index"
type: meta
status: active
version: "3.6.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-10-22T10:28:26+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, index]
license: "CC0-1.0"
registration: exempt
registration_reason: "singular document, not a numbered series"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# Agents — Operative Roster

> **Summary:** index of the agents of this archive: the Oracles who govern
> it and the digital agents defined in it.
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
├── PLAYBOOK.md           ← how the agent does its job well; the agent edits it through pull requests; present once it has a first lesson
└── adapters/
    └── hermes/
        ├── profile.yaml  ← Hermes routing description
        └── config.yaml   ← Hermes approvals, memory, delegation
```

## Oracles

The humans. They govern; the rank is the ceiling (`STD-003`).
A roster is a register; the principle says what the house is, not who staffs it.

| Name | Role |
|---|---|
| Clio Beruete | Oracle |
| Daniel Garrido | Oracle |
| Christian Märtens | Oracle |
| Pablo Fernández-Maquieira | Oracle |

## Roster

No two digital agents share a first letter: an initial is enough to tell them apart in a log, a mention or a commit.

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
| [Metis](metis/SOUL.md) | Sales Agent | opportunities, qualification, proposals, pipeline | 2026-09-28 |
| [Kairos](kairos/SOUL.md) | Opportunity Watcher | finding tenders, grants, calls and buyers; scheduled watches; filters | 2026-10-02 |
| [Hekate](hekate/SOUL.md) | Adversarial Reviewer | an independent second look at a pull request, a design or a plan before an Oracle sees it | 2026-10-22 |
| [Zephyr](zephyr/SOUL.md) | World Playtester | walking a world as a visitor: does it load, run smoothly and work; what is broken | 2026-10-22 |
| [Vesta](vesta/SOUL.md) | Operations Steward | shifts, scheduled jobs, calendar, AI consumption budget, the pull-request queue, the map of threads | 2026-10-22 |
| [Iris](iris/SOUL.md) | Deploy Courier | carrying a tested change from the test server to production, step by step, and verifying it arrived | 2026-10-22 |
| [Rosetta](rosetta/SOUL.md) | Legacy Systems Translator | other engines, old code, porting old worlds to the Numinia engine, migrations | 2026-10-22 |
| [Galatea](galatea/SOUL.md) | 3D Artist & UX Designer | GLB models, visual direction, screens and flows | 2026-10-22 |

Routing does not transfer authority: a specialist escalates or consults
another specialist when a task materially exceeds its own domain
(`AGENTS.md`, Specialist Routing).

## What every agent shares

Each agent's `OPERATOR.md` says what that agent escalates and what it may do
without asking. Three things are the same for all of them and are said here
once:

- **Authority.** The operator is the Oracle (Pablo FM). Authorisation for a
  gated action comes from the operator, or from a mission brief the operator
  has signed.
- **Its own identity.** An agent may PROPOSE changes to its own `SOUL.md`,
  `OPERATOR.md` or card, and never applies them: identity changes need the
  operator's review.
- **Traceability.** Changes to authoritative content travel through Git —
  commits, reviews, the pull request. History is not sacrificed for
  convenience.

## How an agent grows

An agent improves through its own folder. After a task it records what it learned in `agents/{name}/PLAYBOOK.md` — when the lesson applies, what to do, the pitfall, the evidence — and ships the change through a pull request; the operator's merge is the review. `SOUL.md`, `OPERATOR.md` and the card change only by the operator: the agent proposes in the pull request body. A new lesson that contradicts an old one replaces it; detail that outgrows the playbook moves to `agents/{name}/references/`.

## How an agent arrives

A new agent is defined in the repository first and instantiated on a platform second (ADR-026). The agent folder says who it is; the platform gives it a body. On its first day the agent reads the cross-agent skill [`agents/skills/numinia-bienvenida/SKILL.md`](skills/numinia-bienvenida/SKILL.md) (published at https://numinia.org/agents/skills/numinia-bienvenida/skill/): what Numen Games and Numinia are, the minimum lore, its guild, branch and house, how the house works, and a five-line self-check that shows the agent is awake. Whoever instantiates the agent follows the same skill's `references/instantiate-hermes.md`, and records the self-check answer.

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

`Centinela-01` committed the ten founding documents (today's principles) on 2026-04-07,
including `PRI-001-welcome-to-numinia.md`. The agent was renamed to Nimrod by
`MIS-089` and retired by `MIS-118`; the history did not change and cannot.
See `D-027`.

## Retired rosters

The pre-2026-08-28 roster (Nimrod, Adonaz, procurador-01, and the
character-voiced Senet/Ursa personas, with their `STATUS.md`/`MEMORY.md`
state files) was retired by `MIS-118` and remains in Git history. Runtime
state no longer lives in the archive: `status:` is a field in `AGENT.md`,
and session metrics belong to the platform, not the principles.

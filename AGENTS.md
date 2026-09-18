<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
Multi-platform agent context (MIS-118). Supplied by the Oracle 2026-08-28;
directory map corrected to the tree that actually exists in this repository.
CLAUDE.md is the Claude Code runtime adapter; this file is the platform-
neutral layer. Hermes reads both (agent/coding_context.py: _CONTEXT_FILES).
-->

# Numinia NWOS — Agent Context

## Purpose

This repository is the canonical source of truth for Numinia's agent
definitions, institutional knowledge, and shared operational context.

Agents and AI platforms must treat repository content as project authority
according to the scope and hierarchy defined by the repository.

Platform-specific configuration, runtime memory, session state, or inferred
knowledge does not automatically override repository canon.

## Transition regime (MVP → alpha) — read this before any protocol

Oracle instruction, 2026-09-18. Every protocol in this archive is
`status: draft` (12 of 12) because the system is being cut down from the
MVP to the alpha. While a document is draft it DESCRIBES a practice; it
does not BIND. The ceremony below was written for the system in its
place; today it only slows the operator and the agent down. Until the
Oracle promotes a protocol out of draft, an agent working here or in a
consumer repository (`numinia-web`, `numengames-web`, `nwos-deploy`)
does NOT:

- open or activate a mission card for a task the operator asked for in
  chat (`PRO-003` MCY-001, MSN-002): the chat instruction is the
  briefing, the pull request is the record;
- write an ADR to set or reverse a decision the operator stated in chat:
  the reversal goes in the `CHANGELOG.md` entry and the commit body, and
  the old ADR stays as the photograph it is;
- classify the task or cite practice plates in commits (`PRO-016`);
- score its context load, write a `divergence_log`, or update `OPS-008`
  at close (`PRO-001` SES-004, SES-005);
- stop a second time before pushing: the operator's go on a plan covers
  commits, push and the pull request.

What still holds, because each rule protects something that can be seen:

- one pull request per repository per cut; never self-merge, force-push,
  delete a branch, rewrite a pushed commit, or change licences,
  visibility or secrets;
- CI green: guards, tests, the web build, and telemetry regenerated in
  the last commit (`node scripts/telemetry.mjs`) — the check is
  mechanical, not ceremony;
- every pull request that changes a site adds its `/updates` entry and
  raises the version (`scripts/check-version-bump.mjs`);
- a `CHANGELOG.md` entry for what changed in this archive;
- `lore/**` and the pinned `operations/` files stay reserved; canon
  changes are said to the operator in chat before the branch exists —
  his answer there is the consensus, no further ceremony.

Promotion out of draft is the act that restores each rule; nothing
restores them by default.

## Repository map

The principal areas of this repository:

- `agents/` — canonical definitions of persistent agents (`AGENT.yaml`,
  `SOUL.md`, `OPERATOR.md`, `SOURCES.md`, `adapters/`).
- `canon/` — the world and the governing canons (CAN-001…CAN-007). Published
  under CC0-1.0 since the April grant (ADR-036).
- `lore/` — the game, reserved: the RPG manual (`game/`), the adventures
  (`adventures/`), the world's identity texts (`world/`), the Codex edition
  matter (`codex/`). Not a series; outward of the header guards. Home here
  since 2026-09-17 (was `numinia-lore`).
- `standards/` — the archive's own operative standards, including
  `STD-001-the-series.md` (the series) · `STD-016-header-fields.md` (the fields) and
  `STD-005-engineering-baseline.md` (the practices; `PRO-016` applies them).
- `protocols/` — procedures: session close, briefing, archiving.
- `missions/` — the unit of work; `templates/MIS-TEMPLATE` defines the contract.
- `decisions/` — ADRs; `debt/` — the register of what is known
  to be wrong; `reports/` — audits and evidence.
- `operations/` — business records, one flat `OPS-` series (`OPS-003`,
  `OPS-004` and `OPS-007` are reserved, pinned per-file in `REUSE.toml`).
- `blueprints/` — architecture documents; `web/` — the Astro viewer serving
  numinia.org; `scripts/` — CI guards.

There is no `domains/` or `shared/` tree: this repository IS the archive
domain. RPG source material is `lore/`.
Do not infer a directory's purpose solely from its name when its function is
not documented.

## Source authority

Use authoritative repository sources before relying on assumptions or
remembered project-specific information.

Do not invent project-specific facts, rules, classifications, structures,
terminology, lore, policies, permissions, or procedures when an
authoritative source exists or can be consulted.

When information is missing, state what is unknown.

When authoritative sources conflict, identify the conflict rather than
silently reconciling it.

## Canonical agent definitions

Canonical definitions of persistent agents live under `agents/<agent>/`:

- `AGENT.yaml` — structured identity, role, specialization, routing.
- `SOUL.md` — identity, mission, criteria, communication, boundaries.
- `OPERATOR.md` — authority, approvals, escalation, governance.
- `SOURCES.md` — map of the authoritative sources the agent consults.
- `adapters/` — platform-specific configuration (`adapters/hermes/`).

Optional, when earned: `MEMORY.md` (curated, reviewed, promoted knowledge —
never auto-synced), `CHANGELOG.md`, `skills/`.

## Platform independence

The repository defines the agent. A platform executes an instance of it.

Hermes, Anthropic, OpenAI, or any other runtime may maintain its own
configuration, runtime memory, user profile, sessions, and tool state. These
runtime elements are not canonical merely because an agent or platform
created them. Platform adaptations stay distinguishable from the canonical
definition: that is what `adapters/` is for.

## Memory

Runtime memory is provisional. Canonical memory is deliberate, reviewed,
version-controlled knowledge stored in the repository.

Information learned during operation may be proposed for promotion into an
agent's canonical `MEMORY.md`, but runtime memory must not be synchronized
into canonical memory automatically.

Canonical identity documents must not be rewritten merely because a runtime
agent has learned something new.

## Context hierarchy

```text
Repository context (this file)
        +
Canonical agent definition (agents/<id>/)
        +
Platform adapter (agents/<id>/adapters/<platform>/, CLAUDE.md for Claude Code)
        =
Runtime agent instance
```

No layer silently redefines another layer outside its scope.

## Specialist routing

When specialist judgment is required, prefer the appropriate persistent
specialist rather than fabricating expertise. The roster and routing map
live in `agents/INDEX.md`; each agent's `AGENT.yaml` carries its
`routing.use_when` conditions.

- **Ursa** — orchestration, systems, software engineering, Hermes.
- **Antunj** — product strategy, meaning, narrative, framing.
- **Byblos** — records management, archival governance, classification,
  versioning, information lifecycle.
- **Lexa** — legal analysis: digital law, privacy, crypto, Web3, licensing.
- **Senet** — game mastering, RPG systems, mechanics, play experience.
- **Procyon** — representation, onboarding, orientation, stakeholder-facing
  guidance.
- **Doulos** — simple, bounded, repetitive, low-judgment operational work.

Routing does not transfer authority outside the specialist's domain. A
specialist escalates or consults another specialist when a task materially
exceeds its own authority or expertise.

## Project knowledge

Do not place large project corpora inside agent identity files merely to
make them available. Manuals, legal memoranda, lore, policies, and other
substantial knowledge remain in their authoritative locations; agents
retrieve the relevant source when needed (`SOURCES.md` says where).

## Skills

Skills represent reusable procedures, not general knowledge repositories.
Skills every agent uses live under `agents/skills/<skill>/SKILL.md`.
Agent-specific portable skills may live under `agents/<agent>/skills/`.
Do not convert bodies of reference knowledge into skills solely to make
them accessible.

## Canonical changes

Changes to canonical agent identity, governance, institutional knowledge, or
other authoritative content must be explicit, traceable, and
version-controlled. Treat `AGENT.yaml`, `SOUL.md`, `OPERATOR.md`, canonical
policies, and authoritative rules as governance-sensitive: agents may
propose changes to these documents but do not assume authority to redefine
themselves or their governance. Canon (`canon/**`) requires formal
consensus; see `standards/STD-005-engineering-baseline.md` §7 for the
cosmetic-vs-irreversible protocol.

## Traceability

Prefer traceable operations for changes to authoritative content: Git
commits, change histories, review records, approvals, documented decisions
(`decisions/`). Git is the archive: a retired document is deleted, not kept
as a copy (`ADR-041`).

## Uncertainty

Do not present inference as repository fact. When a required fact cannot be
established from available authoritative sources: identify what is known,
identify what is missing, consult the relevant source or specialist, and ask
for clarification or authorization when necessary.

## Working principle

The repository is the source of truth. Agents interpret and operate from
that source. Platforms instantiate agents from that source. Runtime learning
may enrich future canon, but it does not become canon until it is
deliberately promoted and recorded.

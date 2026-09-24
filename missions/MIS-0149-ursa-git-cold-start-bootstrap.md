---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-149"
uid: ""
title: "Ursa's canonical definition carries the full cold-start context — one instruction, no repeated prompts"
status: todo
# ^ todo — the board's state for a mission awaiting assignment. (The Oracle
#   asked for "backlog"; `STD-001` (mission status) retired that value on 2026-08-30 — the
#   surviving equivalent is `todo`, per MIS-135 row 1. Decided by the Oracle
#   2026-09-02.)
priority: high
effort: L
guild: "Sentinels"
territory: "CAO"
type_execution: digital
assigned_to: null
completed: null

# REGISTRO — not consumed by the build, but every document in this archive
# carries them (`STD-024`).
type: mission
version: "2.0.0"
created: "2026-09-02T09:40:00Z"
created_source: "git:68bd5f1"
created_confidence: exact
updated: "2026-09-02T14:45:00Z"
author: "ursa"
owner: "oracle"
tags: [ursa, bootstrap, context, hermes, onboarding, continuity, cold-start]
license: "CC0-1.0"

# OPCIONALES
depends_on: ["MIS-135"]
requires_oracle_approval: true
paths:
  - AGENTS.md
  - README.md
  - protocols/PRO-001-agent-session.md
  - protocols/PRO-003-mission-cycle.md
  - agents/ursa/
  - agents/INDEX.md
  - missions/MIS-0041-agent-onboarding-protocol.md
  - missions/MIS-0059-context-load-protocol.md
  - missions/MIS-0060-agent-canon-repo-sync.md
  - missions/MIS-0068-nwos-propagation-drift-guard.md
  - missions/MIS-0096-nwos-versioning-sovereign-adoption.md
  - missions/MIS-0118-agent-roster-replacement.md
  - missions/MIS-0135-normalisation-residue-register.md
context: "2026-09-02"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# MIS-149 — Ursa's canonical definition carries the full cold-start context

> **Summary:** a fresh Ursa session today needs a long manual prompt
> sequence (fetch repos → analyse gaps → adopt `agents/ursa` → re-evaluate →
> check the board → pick and plan a mission → ask). This mission integrates
> that behaviour and context into Ursa's **existing canonical definition**
> (SOUL, OPERATOR, SOURCES, AGENT.yaml, PRO-001, PRO-003, Hermes adapter) so
> that one operator instruction — *"Bájate los repos a los que tienes
> acceso, usa tu skill de $GITHUB y la de $HERMES_HOME"* — makes Ursa
> retrieve its persistent sources, reconstruct who it is and how to act, and
> continue autonomously to a planned, authorised-stop state.
> **Epistemic:** whether the existing canonical layers can carry the full
> cold-start behaviour without a new conceptual artefact — and, if one layer
> proves insufficient, where exactly the insufficiency lies.
> **Pragmatic:** one human intervention instead of a repetitive prompt
> sequence; a session that survives conversation loss by rebuilding state
> from its own canonical sources.
> **Audience:** Agents · Oracles

---

## Story

As the Oracle, I want a new Ursa conversation to reconstruct its full
operational context from its own persistent, versioned definition — so that
a single initial instruction replaces the manual sequence, and a lost
conversation no longer forces the operator to rebuild context by hand.

---

## Problem context (measured at `68bd5f1`)

A new Ursa conversation currently begins with:

> “Bájate los repos a los que tienes acceso, usa tu skill de $GITHUB y la de
> $HERMES_HOME.”

After that, the operator must manually prompt:

- review what information was missing and what would have enabled better
  inference;
- analyse how to reduce surprise;
- explicitly adopt / incorporate `agents/ursa`;
- re-evaluate what context was missing;
- inspect repositories, branches and concurrent work;
- not trample other agents' work;
- find an isolated branch or worktree;
- consult the mission board;
- choose a small mission;
- plan it;
- stop;
- ask whether execution is authorised.

That sequence is the problem this mission removes. Losing a conversation
must not force the operator to rebuild all of it manually.

## Architectural principle

**Not** URSA → discovers an external BOOTSTRAP → reads it → learns what to
do.

**Yes** URSA → retrieves its persistent sources → reconstructs who it is,
what it can do, where to look, and how to act → continues autonomously.

- The **existing canonical definition of Ursa must contain, directly or by
  reference, everything needed.** Hermes is the runtime and adapter; Ursa is
  the agent. The information we are persisting belongs to Ursa, not to
  Hermes.
- **No new conceptual artefact** (a `BOOTSTRAP` or `STARTUP` document, or any
  new layer) unless execution demonstrates — with evidence, written in this
  mission's execution log — that the existing layers are insufficient and a
  new one is truly necessary.
- **One canonical source per responsibility**, with clear references between
  layers. The mission must reduce redundant context, not increase it: the
  same full procedure must NOT be copied into SOUL.md, OPERATOR.md,
  SOURCES.md, the adapter, Hermes config, and an extra file.

---

## Scope

Integrate into Ursa's **existing canonical definition** the behaviour and
context that the operator currently supplies manually, completing the
responsibility of each layer:

| Layer | Responsibility to complete |
|---|---|
| `agents/ursa/SOUL.md` | how Ursa thinks: inference principles, surprise reduction, behaviour under incomplete context, no reliance on conversational memory, seek evidence before asking |
| `agents/ursa/OPERATOR.md` | what needs no authorisation, what escalates, when to stop, investigate/read/plan vs execute, explicit no-execute-without-authorisation rule |
| `agents/ursa/SOURCES.md` | where reality is reconstructed from: repos, GitHub, HERMES_HOME where relevant, protocols, mission board, source hierarchy/priority, what to obtain alone before asking the operator |
| `agents/ursa/AGENT.yaml` | declarative identity, role, capabilities, structured references, routing/discovery where appropriate |
| `protocols/PRO-001-agent-session.md` | session-opening procedure: what to do after retrieving sources, how to reconstruct state, how to verify persisted state is still valid |
| `protocols/PRO-003-mission-cycle.md` | mission cycle: selection, planning, states, isolation, execution/authorisation |
| `agents/ursa/adapters/hermes/*` | ONLY what is specific to materialising/executing Ursa inside Hermes; access/integration with Hermes capabilities; no duplication of canonical identity or procedure beyond the minimum reference |

Before proposing any new file, the mission must attempt to solve the problem
by completing these responsibilities correctly. A new artefact may be
proposed only if execution demonstrates that **none** of these layers can
house the responsibility without mixing concepts or generating duplication
— with the demonstration written down.

**Where it stops:**

- **Only `numinia-nwos` and Ursa's Hermes runtime instance.** Not other
  agents, not other repositories, not `numinia-lore`.
- **No canonical content is changed in this draft.** The mission may PROPOSE
  changes to `AGENTS.md`, `agents/ursa/*`, protocols or adapters; applying
  governance-sensitive changes requires the Oracle's review (AGENTS.md,
  Canonical Changes; OPERATOR.md — self-modification is propose-only).
- The repository remains platform-independent: canonical context is not
  converted into Ursa-specific Hermes configuration. Hermes is runtime; the
  adapter is the only layer that speaks Hermes.

## Out of scope

What someone would reasonably expect to be included and is not:

- **Hermes platform internals** — changing Hermes itself (its context-file
  discovery, `SOUL.md` loading, `$HERMES_HOME` resolution) is not this
  mission. The mission may only use documented Hermes mechanisms
  (`.hermes.md`, `AGENTS.md`, `SOUL.md`, profile config, `hermes` CLI) and
  must compare alternatives before choosing one.
- **Automated installation/sync daemons** — a cron/symlink layer (MIS-060
  Phase 2) is deliberately excluded; this mission is about *reconstruction
  from a clone*, not continuous propagation.
- **Consumer-repo propagation** (MIS-068), **NWOS versioning/sovereignty**
  (MIS-096), **GitHub-independent continuity** (MIS-069), and **non-Ursa
  agents**.

---

## Required persisted behaviour

After the initial human instruction to retrieve repositories and context,
Ursa must be able to continue alone. The definition of Ursa must make the
following happen deterministically:

### 1. Retrieval and reconstruction
- retrieve/sync the repositories it has access to;
- use the available GitHub and HERMES_HOME capabilities correctly;
- identify the canonical sources;
- check the real current state, without trusting memories of previous
  conversations;
- reconstruct its context from persistent information.

### 2. Reconstruction of Ursa itself
It must know to recover from its sources: identity, role, principles,
authority, limits, sources, applicable protocols, current work state. The
operator must never again type “adopta `agents/ursa`”: being Ursa and
knowing how to reconstruct itself as Ursa is part of the agent.

### 3. Surprise reduction (persisted, not prompted)
The function of the prompts “¿qué mejorarías del proceso?”, “¿qué te habría
facilitado una mejor inferencia?”, “¿cómo podemos reducir la sorpresa?”
becomes persistent behaviour. During context reconstruction it must detect:
- information it had to infer;
- information it expected but did not find;
- contradictions between sources;
- protocols referencing obsolete state;
- non-existent files or paths;
- information discovered too late;
- operator questions that could have been avoided;
- context that should have been discoverable earlier;
- differences between expected and real state.

When an uncertainty can be resolved by consulting available sources, it must
do so before asking. Relevant improvement findings may be summarised later
but must not unnecessarily interrupt the operational flow.

### 4. Work-state reconstruction
Inspect, per the applicable protocols: Git state, branches, worktrees,
local changes, concurrent work, active missions, assignments,
`in-progress` and `in-review` missions, and any signal that another agent
is working on the same scope. Never assume it works alone; never trample
another agent's work.

### 5. Recover work before seeking new work
Before choosing a new mission: check whether Ursa already has an active
mission or work; reconstruct that state from the persistent sources; and
continue it if appropriate. Only if no active work exists, look for a new
mission.

### 6. Mission selection and planning
If no active work: consult the real mission register/board; apply the
corresponding protocols; select a small mission appropriate for Ursa; review
dependencies; check conflicts or concurrent work; create Git isolation when
appropriate; read the necessary context; produce an execution plan.

### 7. Mandatory STOP
Autonomy ends at planning. Ursa must stop before executing the mission when
operator authorisation is required, presenting compactly: the relevant
reconstructed context, important anomalies found, the selected or recovered
mission, the Git isolation used, and the execution plan — then ask
explicitly whether the operator authorises execution.

---

## Deliverables

The mission is **not** resolved by delivering an analysis of technical
alternatives. It must produce concrete changes to Ursa's persistent
definition. After execution, the question “¿Dónde está escrito ahora lo que
hará Ursa en una conversación nueva?” must be answerable by pointing at the
specific canonical files containing each part of the behaviour.

### D1 — Responsibility matrix (defined in advance, verified at execution)

The mission defines up front a responsibility matrix of the form:

```
BEHAVIOUR → CANONICAL ARTEFACT → REASON
```

Provisional placement (to be verified against the actual current content of
each file during execution; the examples are guidance, not decisions):

| Behaviour | Artefact | Reason |
|---|---|---|
| Reduce surprise; seek evidence before asking; no reliance on conversational memory | `agents/ursa/SOUL.md` | cognitive principle of Ursa |
| Investigate/read/plan without authorisation; where autonomy stops; no-execute-without-authorisation | `agents/ursa/OPERATOR.md` | authority limits |
| Where to recover missions, protocols, state; source hierarchy; what to obtain alone before asking | `agents/ursa/SOURCES.md` | sources |
| Declarative identity, role, capabilities, routing/discovery | `agents/ursa/AGENT.yaml` | machine-readable card |
| Generic session-opening and reconstruction sequence; validating persisted state | `protocols/PRO-001` | session protocol |
| Mission selection, planning, states, isolation, execution/authorisation | `protocols/PRO-003` | mission protocol |
| Materialising/executing Ursa inside Hermes; discovery of the canonical definition | `agents/ursa/adapters/hermes/*` | platform adapter |

Each row must be verified: read the current file, confirm the responsibility
belongs there, and record any move with its reason. **A responsibility must
not appear in two artefacts** — that is the anti-duplication criterion, and
it is verifiable by grep.

### D2 — Concrete edits to the canonical definition

Changes to `SOUL.md`, `OPERATOR.md`, `SOURCES.md`, `AGENT.yaml`,
`PRO-001`, `PRO-003`, and the Hermes adapter — each edit justified by the
matrix. The minimal Hermes-side change needed for an Ursa instance to
discover its canonical definition is valid; hiding Ursa's knowledge inside
HERMES_HOME or Hermes-specific config is not the solution.

### D3 — No-new-artefact proof (or demonstrated exception)

If execution concludes that a new file is needed, the demonstration of
insufficiency must be written in the execution log: which layer(s) were
tried, why each mixes concepts or duplicates, and why the new artefact is
the smallest option. Default outcome: no new artefact.

### D4 — Cold-start acceptance test + measurement

Defined below, run end-to-end, with results recorded.

### D5 — Inconsistency detection (verified, not assumed)

From the tree: PRO-001 §1 STEP 1 reads a `STATUS` file under
`agents/{my-name}/`, which does not exist (the per-agent STATUS and MEMORY
documents were retired by MIS-118; README.md §Agents
still lists them). Any other bootstrap-blocking inconsistency found is
recorded with evidence and routed to its owning mission or to MIS-135, not
silently fixed.

---

## Acceptance criteria

> Every criterion must be FALSE at the base commit (`68bd5f1`). Assert the
> final state, not a delta. Verifiable by someone who did not do the work.

### AC1 — The cold-start test passes with the real first instruction

- [ ] A conversation with Ursa ends. A **new** conversation opens with no
      conversational context from the previous one. The operator provides
      ONLY the habitual initial instruction:
      “Bájate los repos a los que tienes acceso, usa tu skill de $GITHUB y
      la de $HERMES_HOME.”
      No other initialisation prompt is given.
      (today: the sequence requires the operator to add ~12 further prompts
      by hand)
- [ ] Ursa continues autonomously and: retrieves its repositories/sources;
      reconstructs who it is; recovers its authority and limits; consults
      the necessary protocols; checks the real state; detects relevant
      inconsistencies; minimises unnecessary inference; analyses what could
      reduce surprise; checks concurrent work; recovers active work if it
      exists, or selects an appropriate mission if not; creates isolation
      when appropriate; plans; **stops**; and asks authorisation to execute.
      (today: none of these steps happen without being prompted)
- [ ] The test **FAILS** if the operator must intervene with instructions
      like: “ahora adopta Ursa”, “ahora lee esta carpeta”, “ahora revisa el
      proceso”, “ahora mira las misiones”, “ahora busca una rama”, “ahora
      elige una misión”, “ahora planifícala”.
      (today: every one of these interventions is required)

### AC2 — Reconstruction survives conversation loss

- [ ] Closing and reopening the session (no conversation reuse) lets Ursa
      rebuild operational state from its persistent sources alone, without
      the operator re-explaining identity, protocols or the board.
      (today: reconstruction depends on the lost conversation)

### AC3 — Responsibility matrix shipped and anti-duplication verified

- [ ] The matrix (D1) is finalised and every responsibility maps to exactly
      one canonical artefact; a grep over `SOUL.md`, `OPERATOR.md`,
      `SOURCES.md`, `AGENT.yaml`, `PRO-001`, `PRO-003`, and
      `adapters/hermes/*` shows no duplicated full procedure.
      (today: no matrix exists; duplication is unchecked)

### AC4 — No new artefact without proof

- [ ] If a new file exists at the end, the execution log contains the
      demonstrated insufficiency of every existing layer. If no new file
      exists (default), the criterion is trivially met.
      (today: no new artefact exists; nothing to prove — the point is to
      keep it that way)

### AC5 — Measurement recorded, old vs new

- [ ] The mission records, for both the current manual process and the new
      cold start: number of human interventions (target: **1**); number of
      initialisation prompts; tokens/context consumed to reach the state
      “mission planned and awaiting authorisation”; sources/files loaded;
      information that had to be inferred; unnecessary operator questions;
      contradictions detected; success/failure of reconstruction after
      opening a new conversation.
      (today: none of these are measured anywhere)

### AC6 — Inconsistencies detected and routed

- [ ] The PRO-001 §1 / missing per-agent `STATUS` drift is verified from the tree
      and recorded, with its resolution routed (fix in PRO-001 and README,
      or registered in MIS-135's register — decided at execution, Oracle
      review).
      (today: PRO-001 §1 references a file that does not exist; README
      lists retired files)

---

## Measurement protocol

| Metric | Recorded for old process | Recorded for new cold start |
|---|---|---|
| Human interventions | yes | yes (target 1) |
| Initialisation prompts | yes | yes (target: only the first) |
| Tokens/context to “planned, awaiting authorisation” | yes | yes |
| Sources/files loaded | yes | yes |
| Information inferred | yes | yes |
| Unnecessary questions to operator | yes | yes |
| Contradictions detected | yes | yes |
| Reconstruction success after new conversation | yes | yes |

The measurements are recorded in the mission's Closure (or an attached
runbook) with the exact commands used to run the cold-start test.

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**

---

## Execution log

*(one line per significant step: date · step · evidence)*

- 2026-09-02 — Draft v1 registered (as MIS-137) by Ursa, at the Oracle's
  request. Base commit `68bd5f1`. Status `draft` per PRO-003 §2. Known
  deviation: lint-frontmatter does not accept `draft` for missions (STD-001
  §7 set); recorded rather than silently normalised.
- 2026-09-02 — **Reformulated to v2.0.0** per the Oracle's review.
  Reoriented from “study which bootstrap mechanism to use” to “integrate
  into Ursa's existing canonical definition the behaviour and context the
  operator currently supplies manually, using Hermes only as
  runtime/adapter”. Explicit: no new conceptual artefact unless
  demonstrated necessary; responsibility matrix defined in advance (D1);
  acceptance test uses the real first instruction and fails on any listed
  follow-up prompt; measurement protocol expanded. Still `draft`; no
  execution, no canonical changes.
- 2026-09-02 — **Renumbered MIS-137 → 143** (PRO-003 §4, ID
  collision). `MIS-137` was already assigned in `origin/main`
  (`MIS-137` (now in `RPT-017`), merged after this draft was
  created); the surviving equivalent `todo` state and all content were
  carried over. Next free number that did not collide with an existing
  branch claim: 143 (MIS-140 was claimed by
  `mission/MIS-0140-publish-coverage-guard`). *(The two numbers in this entry
  are written bare, without the `MIS-` prefix, because they name the number
  this mission carried, not another document. Spelled as identifiers the
  reference lint reads them as a citation of the mission that now holds 143 —
  a different mission entirely, since #240 — and fails. The fact recorded is
  unchanged.)*
- 2026-09-02 — **Moved to `todo`** (the board's backlog equivalent) by the
  Oracle (PRO-003 §2). The Oracle asked for `backlog`; `STD-001` (mission status) retired
  that value on 2026-08-30, so the surviving equivalent `todo` was applied,
  recorded here, and the PRO-003/STD-001 conflict re-registered in this
  mission's context (MIS-135 row 1). Branch rebased onto `main` `b9ed412`.
  Still not assigned, not executed.
- 2026-09-04 — **Renumbered `MIS-0143` → MIS-149** (PRO-003 §4, ID collision
  again). This draft claimed that number on 2026-09-02 and would have kept it
  under "whoever committed first", but it sat unmerged for two days while
  `MIS-0143` (integrate three new agents) was written,
  reviewed and merged into `main` (#240, 2026-09-04). The number is taken by
  a document that is in the tree; this one is not. A branch claim only binds
  the agents who can see it, so the merged document wins and this draft
  moves. `MIS-149` is the first free number: 144…148 are held by `main` or by
  live branches. Content unchanged; only the identifier, the filename and the
  H1 move. The entries above keep the numbers they were written with — an
  out-of-date record is history (`STD-024`).

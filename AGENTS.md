<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
Multi-platform agent context (MIS-118). Supplied by the Oracle 2026-08-28.
CLAUDE.md is the Claude Code runtime adapter; this file is the platform-
neutral layer every runtime reads (AGT-001). Hermes reads both
(agent/coding_context.py: _CONTEXT_FILES).
-->

# Numinia NWOS — Agent Context

**First instruction (AGT-001): audit the current branch state before assuming
anything.** Never trust that the repository matches this file, a README or a
mission brief — read what is actually there first.

This file is the platform-neutral layer every runtime reads. `CLAUDE.md` is
the Claude Code adapter and points here; it does not restate these rules.

## Transition regime (MVP → alpha) — read this before any protocol

Oracle instruction, 2026-09-18. Every protocol in this archive is
`status: draft` (11 of 11) because the system is being cut down from the
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
  the last commit (`node machine/scripts/telemetry.mjs`) — the check is
  mechanical, not ceremony;
- every pull request that changes a site adds its `/updates` entry and
  raises the version (`machine/scripts/check-version-bump.mjs`);
- a `CHANGELOG.md` entry for what changed in this archive;
- the test before the code (`STD-015` DEV-008): for a feature, a fix or a
  refactor, the test that describes the change is written first, run, and
  seen to fail for the right reason; then the code that makes it pass; then
  the clean-up with everything green. The pull request shows that order —
  a `test(...)` commit before the `feat`/`fix` commit — because a diff
  cannot tell when a test was written and the history can. Behaviour that
  already exists and has no test gets one when it is touched; a bug gets
  the test that reproduces it before the fix. Read at review; it fails no
  build while the register is draft;
- `lore/**` and the pinned `operations/` files stay reserved; canon
  changes are said to the operator in chat before the branch exists —
  his answer there is the consensus, no further ceremony.

Promotion out of draft is the act that restores each rule; nothing
restores them by default.

## Commands

Run from the repository root; Node ≥ 22.12.

- `npm run guards -- --rules` — every registered guard over the corpus
- `npm test` — the guard, script and tool test suites, with coverage
- `node machine/scripts/telemetry.mjs` — regenerate `machine/telemetry/`
  in the last commit of a cut. It needs the tokenizer rank file: without
  it every token figure is silently written as `null`. Fetch it first with
  `node machine/scripts/telemetry.mjs --fetch-tokenizer`.
- `node machine/tools/check-register.mjs --check` — the STD-015 register
  against the tree

Inside `web/` (the Astro viewer serving numinia.org):

- `npm run dev` · `npm run build` · `npm run type-check` · `npm run check:responsive`

CI runs the guards, the tests, the web build, then the build-time ratchets.

## Repository map

- `agents/` — canonical agent definitions, one folder each. `agents/INDEX.md`
  owns the roster and the folder contract; read it there rather than here.
- `canon/` — the world and the governing canons (CAN-001…CAN-008).
- `lore/` — the game, reserved: RPG manual, adventures, world texts, codex.
- `standards/` — this archive's operative standards (STD-001…STD-028).
- `protocols/` — procedures: session close, briefing, archiving.
- `missions/` — the unit of work; `machine/templates/MIS-TEMPLATE` is the contract.
- `decisions/` — ADRs · `debt/` — what is known to be wrong · `reports/` — audits.
- `operations/` — business records, one flat `OPS-` series (`OPS-003`, `OPS-004`,
  `OPS-007` and `OPS-010` are reserved, pinned per-file in `REUSE.toml`).
- `objects/` — entity cards: one Markdown per registered thing that is not a
  document (an avatar, a model). The bytes live in the depot.
- `system/` — reference manuals of how the system works today.
- `blueprints/` — architecture documents · `web/` — the Astro viewer ·
  `machine/` — guards, scripts, tools and telemetry.

There is no `domains/` or `shared/` tree: this repository IS the archive
domain. Do not infer a directory's purpose from its name when its function
is not documented.

## The rules that govern work here

`standards/`, `protocols/` and `canon/` hold 46 rule documents. Each opens
with a `**Binds:**` line saying whom it governs. Read that line before
opening the document.

Two that decide the rest: `STD-009` says which rule wins when two conflict;
`STD-017` says who may change what. Licensing is `STD-010`: what we emit, what
we may consume, and what needs the Oracle before it ships — read it before
adding a dependency, changing a LICENSE or making anything public.

## Canonical changes

Agents may propose changes to agent identity, governance and authoritative
rules; they do not assume authority to redefine themselves or their
governance. `canon/**` requires the operator's answer in chat before the
branch exists. Git is the archive: a retired document is deleted, not kept
as a copy (`ADR-041`).

Runtime memory is provisional and is never synchronised into an agent's
canonical `MEMORY.md` automatically; promotion is deliberate and reviewed.

## Specialist routing

When specialist judgment is required, prefer the persistent specialist over
fabricating expertise. The roster, what routes to each agent and how to
instantiate one live in `agents/INDEX.md` — it is the source the site itself
reads, so it does not get a second copy here.

Routing does not transfer authority outside the specialist's domain.

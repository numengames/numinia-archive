---
agent: nimrod
title: "SOURCES — Nimrod"
type: agent
status: draft
version: "0.1.1"
created: "2026-09-04T08:23:00Z"
updated: "2026-09-10T09:00:00+02:00"
author: "antunj"
owner: "oracle"
tags: [agents, nimrod, repository, navigation, provenance]
license: "CC0-1.0"
registration: exempt
registration_reason: "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SOURCES — Nimrod

Where this agent learns how the repository is organized, governed, traversed,
and interpreted. Pointers, not copies: the repository is the source of truth.

## Repository context and source authority

`AGENTS.md` — repository map, source authority, agent-definition model,
platform independence, specialist routing, canonical-change rules, and
traceability expectations.

`README.md` — public entry point and high-level repository map.

## Archive topology

`system/SYS-003-archive-fondos.md` — architecture of the archive and the
relationships among its documentary areas.

## Controlled terminology and documentary classes

`standards/STD-001-the-series.md` — the series; `standards/STD-004-the-header.md`
— fields and controlled terms; `standards/STD-018-one-document-one-identifier.md`
— identifiers and naming.

`standards/` — operative standards governing repository artefacts and working
conventions. Consult the relevant standard before explaining a formal process
or documentary requirement.

## Processes

`protocols/` — documented procedures for recurring repository operations.

`machine/templates/MIS-TEMPLATE` and `missions/` — the mission contract and active or
historical units of work.

## Decisions, evidence, and change history

`decisions/` — append-only decision records and the reasons behind adopted
changes.

`reports/` — audits, observations, and evidence.

`debt/` — known deficiencies, unresolved problems, and explicitly recorded
gaps.

Git history — commits, diffs, file history, renames, and provenance when the
current tree alone does not explain how a state was reached.

## Agent routing

`agents/INDEX.md` — roster, routing map, current specialists, and agent
history.

`agents/<agent>/AGENT.yaml` — machine-readable routing conditions for a
specific specialist.

## Archive areas

Consult the relevant top-level area according to the question:

- `canon/` — what the system is;
- `standards/` — what an artefact must conform to;
- `protocols/` — what procedure an actor follows;
- `missions/` — what work is being or was performed;
- `decisions/` — why an adopted decision was made;
- `blueprints/` — proposed or designed structures not necessarily implemented;
- `operations/` — business and operational records;
- `reports/` — observed evidence and audits;
- `debt/` — known unresolved problems;
- `web/` — public viewer and presentation layer;
- `machine/scripts/` — repository automation and guards.

Nimrod may explain where security or CI material lives, but security,
automation integrity, CI/CD compliance, permissions, and repository
administration belong to the appropriate specialist and are not Nimrod's
domain.

---

When a needed fact cannot be established: identify what is known, identify
what is missing, trace the nearest authoritative source, and route to the
relevant specialist when interpretation exceeds repository navigation.

Do not invent paths, authority, history, or project-specific facts.

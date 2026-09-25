---
id: "STD-016"
uid: ""
title: "Header fields"
type: documentation
subtype: register
status: draft
version: "2.1.1"
created: "2026-08-28T15:10:00Z"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Platform"
tags: [frontmatter, register, lint, metadata]
license: "CC0-1.0"
series_change: "2.1.1 — 2026-09-25: the summary and the prose between the tables are written in plain words a narrator can read aloud, with no code, file name or plate in them; the tables are unchanged."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Header fields

> **Summary:** Every field a document's header may carry, ring by ring:
> what its value must be, the code the header check reports when it fails,
> and which series may carry it. A field not listed here is an error.

## Ring 1 — identity, every document

| Field | Rule | Plate |
|---|---|---|
| `id` | present; matches its series prefix, or `registration: exempt` with a reason | HDR-001 |
| `title` | present, non-empty, English (language `[MANUAL]`) | HDR-002 |
| `type` | present; in the vocabulary below | HDR-003 |
| `status` | present; in the lifecycle of its type | HDR-004 |
| `version` | present; semantic version, no `v` prefix | HDR-005 |
| `created` | present; ISO 8601 with time; midnight rejected for new documents | HDR-006 |
| `updated` | present; ISO 8601 with time; not earlier than `created` | HDR-007 |
| `license` | present; SPDX identifier; agrees with the licence manifest (`HDR-043` when absent) | HDR-008 |

## Ring 2 — provenance, every document that makes a claim

| Field | Rule | Plate |
|---|---|---|
| `author` | who wrote it, person or agent | HDR-010 |
| `owner` | who answers for it now | HDR-011 |
| `provenance` | `human` · `ai-assisted` · `ai-generated` | HDR-012 |
| `created_source` | `git:<sha>` or `declared` — where the date came from | HDR-013 |
| `created_confidence` | `exact` · `inferred` — never invented | HDR-014 |
| `requested_by` | optional; who commissioned it | HDR-015 |
| `supersedes` · `superseded_by` · `derived_from` · `absorbs` · `ratified_by` · `related` · `parent_mission` · `former_id` | resolvable identifiers | HDR-016 |

| Relation | Means |
|---|---|
| `related` | relevant; no stronger direction known |
| `supersedes` / `superseded_by` | a later record replaces an earlier one |
| `absorbs` | a later record carries the earlier reasoning; the old identifier keeps resolving |
| `ratified_by` | an authority promoted or confirmed the record |
| `parent_mission` | a bounded child of a larger mission |
| `former_id` | the identifier before a governed move |

## Ring 3 — extension by series (`HDR-030`)

| Series | Registered fields |
|---|---|
| `missions/` | `priority` (HDR-037) `effort` (HDR-038) `assigned_to` `started` `completed` `type_execution` `freeze_reason` `in_review_at` `depends_on` `parent_mission` `sub_missions` `blocked_by` `requires_oracle_approval` `human_approval_score` `paths` `context` `divergence_log` |
| `reports/` | `severity` `period` `subtype` `model` `agent` `week` `scope` `former_id` `former_id_note` `absorbs` |
| `decisions/` | `deciders` `consulted` `outcome` `decision` `absorbs` `amends` |
| `standards/` | `absorbs` `series_change` |
| `canon/` | `absorbs` |
| `agents/` | `role` `platform` `model` `soul` `agent` · `name` `description` (portable `SKILL.md` under `agents/<agent>/skills/`) |
| `debt/` | `severity` `severity_reason` `detected` `refuted` `source_audit` `opened_by` `visibility_reason` |
| `blueprints/` `operations/` | `extraction_note` `restoration_note` |
| `blueprints/` | `semaforo` |
| `protocols/` | `applies_to` `mandatory` |
| `standards/` `canon/` | `threshold` |
| `standards/` `canon/` `protocols/` | `supersedes_version` `ratified_by` |
| all | `tags` `visibility` `guild` `territory` · `registration` `registration_reason` `registration_exemption` · `evidence_script` `evidence_head` · `related` · `uid` (reserved empty, HDR-020) |

Retired fields are reported wherever they remain: `area`, now `territory`;
`blocked_reason`; and the field names from the Spanish era.

## Vocabularies

| Field | Values | Plate |
|---|---|---|
| `type` | the closed list in `STD-001`, plus `agent` for `agents/` | HDR-003 |
| `type` → series | strict for registered genres; warn-only for the two general ones | HDR-017 |
| `subtype` | reports: `audit` `analysis` `proposal` `rollup` (`daily` retired, `STD-012`) · documentation: `standard` `register` `guide` | HDR-018 |
| `guild` | `Sentinels` · `Alchemists` · `Exegetes` · `Procurators` | HDR-033 |
| `type_execution` | `digital` · `biological` · `hybrid` | HDR-034 |
| `visibility` | `public` · `restricted-oracle` | HDR-035 |
| `territory` | the eight registered words | HDR-036 |

A value marked as to be announced is allowed in a field with a closed list,
and is reported only once. On a mould, the comment at the end of a line is
set aside before the value is judged.

## Status lifecycles

This is the only place that says which states a document may hold. The
machine keeps a copy, and a test fails the moment the two differ.

| Type | Lifecycle | Plate |
|---|---|---|
| mission | `todo → in-progress → in-review → done`, plus `frozen` (paused; returns to any state) | HDR-004 |
| everything else | `draft → active → withdrawn` | HDR-004 |

| State | Means |
|---|---|
| `draft` | written, not yet in force; binds nobody (`PRE-006`) |
| `active` | in force, or — for a report or a closed mission's evidence — published and standing |
| `withdrawn` | no longer in force. The one terminal state: whether an heir exists is said by `superseded_by`, present or absent, never by a second state (`GIT-045`) |

Two states are retired, and the header check rejects them. Closed meant
published for a report, and would have had to mean no longer binding for a
standard. Superseded named an heir, and an heir is a relation, not a state.
Whether a document's body may still change is its series' **threshold**,
set in the register of series, not its status.

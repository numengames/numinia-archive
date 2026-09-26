---
id: "STD-004"
uid: ""
title: "The header"
type: documentation
subtype: standard
status: draft
version: "4.1.0"
created: "2026-08-28T15:10:00Z"
created_source: "git:4c0a02e"
created_confidence: exact
updated: "2026-09-26T16:00:00+02:00"
ratified_by: "ADR-043"
absorbs: ["STD-016"]
author: "ursa"
owner: "oracle"
territory: "Archive"
license: "CC0-1.0"
tags: [frontmatter, standard, lint, metadata, RFC-3339, YAML, Dublin-Core, PROV, register]
series_change: "4.1.0 — 2026-09-26: the header fields come in whole from their own register, which retires into this standard: both answered what a correct header is. The fields keep their rings — identity, provenance with its outside meaning, extension by series — their vocabularies and the one table of status lifecycles; no field, plate or rule changes, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# The header

> **Summary:** Every document opens with a short block of labelled fields
> that says what it is, who wrote it and when. Every field is listed below,
> ring by ring, or it is an error. A value nobody knows is left out, never
> guessed.
> **Epistemic:** What a correct header is, which outside standards its
> values follow, and why each rule is one a machine can check.
> **Pragmatic:** Write a header, add a field, or read a finding by its code.
> **Audience:** Agents · Oracles

**Binds:** every document's header, and every date the archive writes.
**Does not bind:** the body below the header, or the site's own page schema.

## Rules

None of these rules is required by law; each is our choice, made so that
any tool that already reads the outside standard can check us unaided.

### Every document has a header

**Every governed document has a header.** Every document in a governed
folder MUST open, at its very first character, with a block of fields in
the plain data format called YAML, fenced by three dashes on their
own lines; so any tool finds the header without guessing where it starts.

**A field in no ring is an error.** A field that no ring registers MUST be
reported, the way a closed schema refuses any property it does not list: a
misspelt field is caught on the day it is written, instead of silently
meaning nothing.

**Adding a field costs a row and a decision.** A new field MUST arrive with
its line in the rings below and the decision that justifies it, in the same
change.

### What a header may say

**Empty is absent.** A field MUST NOT hold an empty value. To say nothing is
known, leave the field out, write null, or write that it is to be announced.

**Absent is never guessed.** A placeholder, a plausible date or an invented
author MUST NOT stand in for a value. Where history cannot testify, a date
is marked as declared, so a reader tells evidence from claim.

**A deferred value has an owner.** A value left to be announced MUST sit in
a field that a mission owns, and the check names that mission. Whether the
mission is still alive is judged by hand.

**Retired fields leave in waves.** A retired field MUST be reported wherever
it still appears until its migration lands; the rule naming it goes with
its last occurrence.

**The universal identifier stays empty.** The field reserved for a
universal identifier MUST stay empty until the system that assigns it
exists.

### What the values follow

**The licence is a name from the shared list.** Every header MUST declare a
licence, written exactly as the open-source world's shared licence list
spells it, the same tag the file's own licence lines carry; so one check
reads the terms of every file and they never disagree.

**A version counts what changed.** A version MUST be three numbers in the
semantic versioning form, bumped as the standard of versions says; a reader
knows from the number alone whether an obligation was dropped, added or
only reworded.

**Replaced is a relation, not a state.** A document that has an heir MUST
say so with a link to it, never with a status of its own; unlike the usual
decision-record habit of a superseded status, a link names the heir and
cannot drift from it.

**Relations live in the header and resolve.** Every relation — replaces,
replaced by, absorbs, derived from, ratified by, related, part of — MUST
name a document that exists, and each means what the library world's
Dublin Core terms and the web's provenance vocabulary say it means; so any
catalogue tool reads our links as its own.

**Titles are English.** Every title MUST be in English, and a language is
always named with the internet's standard language tags; so a program and a
person agree on which language a text is in.

### How dates are written

**Dates are written the internet's way.** Every date MUST follow the
internet's timestamp format: year, month, day, the hour and its offset from
universal time, in that order; so dates sort as text, read one way only,
and no updated date comes before its created date.

This standard is over its word budget because each rule now says what its
outside standard does, as well as what it obliges.

## Check

Each rule, its code, its source and its check. Then every field, ring by
ring: its value, its code, which series carry it and the outside term it
means. A field not listed is an error.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| HDR-000 | Every governed document has a header | [YAML 1.2.2](https://yaml.org/spec/1.2.2/) — ours adds: fenced by `---` at byte 0 | `machine/guards/rules/std-004-the-header.mjs`, with HDR-040 (the fence) and HDR-043 (the licence) |
| HDR-040 | the fence at byte 0, part of HDR-000 | [YAML 1.2.2](https://yaml.org/spec/1.2.2/), document markers | `machine/guards/rules/std-004-the-header.mjs` — the file starts with `---\n` |
| HDR-041 | retired → TXT-002 (the header parses) | [YAML 1.2.2](https://yaml.org/spec/1.2.2/) | `machine/guards/rules/std-006-plain-text.mjs` under TXT-002; plate kept, never reused |
| HDR-030 | A field in no ring is an error | [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/json-schema-core), `additionalProperties: false`, as the model | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-042 | Adding a field costs a row and a decision | — | by hand, at review: the register row and the decision |
| HDR-009 | Empty is absent | — | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-044 | Absent is never guessed | — ([EDTF](https://www.loc.gov/standards/datetime/) is the candidate for uncertain dates) | `machine/guards/rules/std-004-the-header.mjs`, placeholder values |
| HDR-032 | A deferred value has an owner | — | `machine/guards/rules/std-004-the-header.mjs`; whether the mission lives, by hand |
| HDR-031 | Retired fields leave in waves | — | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-020 | The universal identifier stays empty | — | `machine/guards/rules/std-004-the-header.mjs` |
| HDR-043 | The licence is a name from the shared list — declared | [REUSE 3.3](https://reuse.software/spec-3.3/); [SPDX 2.3 Annex E](https://spdx.github.io/spdx-spec/v2.3/using-SPDX-short-identifiers-in-source-files/) | `machine/guards/rules/std-004-the-header.mjs` — `license` present |
| HDR-008 | The licence is a name from the shared list — spelt right | [SPDX License List](https://spdx.org/licenses/) | `machine/guards/rules/std-004-the-header.mjs` — value against the manifest |
| HDR-005 | A version counts what changed | [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html); bump rules in `STD-019` | `machine/guards/rules/std-004-the-header.mjs` — shape; the bump, by hand |
| HDR-004 | Replaced is a relation, not a state | differs on purpose from [MADR](https://adr.github.io/madr/) and [Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) `superseded`; the heir is [`dcterms:isReplacedBy`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/isReplacedBy/) | `machine/guards/rules/std-004-the-header.mjs` — status in its lifecycle |
| HDR-016 | Relations live in the header and resolve | [DCMI Metadata Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/): `replaces`, `isReplacedBy`, `relation`, `isPartOf`; [PROV-O](https://www.w3.org/TR/prov-o/) `wasDerivedFrom`; the field map is the outside meaning below | by hand, presence only: no guard resolves header relations; `machine/guards/rules/std-020-git-is-the-archive.mjs` reads the body |
| HDR-002 | Titles are English | [BCP 47](https://www.rfc-editor.org/info/bcp47) — the tag `en` | `machine/guards/rules/std-004-the-header.mjs`, presence; language by hand |
| HDR-045 | Dates are written the internet's way | [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), a free, exact profile of [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) — ours adds: time required, `updated` ≥ `created` | `machine/guards/rules/std-004-the-header.mjs` for `created` and `updated` (HDR-006, HDR-007); other dates by hand |
| HDR-046 | retired → DOC-013 of One page per document, how the rules of a document are worded | — | — |
| HDR-001, 003, 006, 007, 012..014, 017..019, 033..038 | each field's own rule, in the rings below | — | `machine/guards/rules/std-004-the-header.mjs`, one plate per finding |
| HDR-010, 011, 015 | author, owner, commissioned by | — | by hand, presence only |

A governed folder is one `machine/scripts/lib/rules.json` lists under
`governed.dirs`. HDR-045 was EXT-006 and HDR-046 was EXT-001 in the external
standards; those plates are retired there.

### Ring 1 — identity, every document

| Field | Rule | Plate |
|---|---|---|
| `id` | present; matches its series prefix, or `registration: exempt` with a reason | HDR-001 |
| `title` | present, non-empty, English — BCP 47 `en` (language `[MANUAL]`) | HDR-002 |
| `type` | present; in the vocabulary below | HDR-003 |
| `status` | present; in the lifecycle of its type | HDR-004 |
| `version` | present; Semantic Versioning 2.0.0, no `v` prefix | HDR-005 |
| `created` | present; RFC 3339 date-time (a profile of ISO 8601), time required; midnight rejected for new documents | HDR-006 |
| `updated` | present; RFC 3339 date-time, time required; not earlier than `created` | HDR-007 |
| `license` | present; SPDX License List identifier; agrees with the licence manifest (`HDR-043` when absent) | HDR-008 |

### Ring 2 — provenance, every document that makes a claim

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

### Outside meaning

Where the library world's Dublin Core terms or the web's provenance
vocabulary already name what a field means, it means exactly that, so an
auditor's catalogue reads our headers unaided; the names stay ours.

| Field | Means | Note |
|---|---|---|
| `id` | `dcterms:identifier` | |
| `title` | `dcterms:title` | |
| `created` | `dcterms:created` | |
| `updated` | `dcterms:modified` | |
| `license` | `dcterms:license` | value from the SPDX License List |
| `author` | `dcterms:creator` | |
| `supersedes` | `dcterms:replaces` | |
| `superseded_by` | `dcterms:isReplacedBy` | an heir is this relation, never a status |
| `related` | `dcterms:relation` | |
| `parent_mission` | `dcterms:isPartOf` | |
| `derived_from` | `prov:wasDerivedFrom` | |
| `tags` | `dcterms:subject` | |
| `visibility` | `dcterms:accessRights` | |
| `requested_by` | `prov:actedOnBehalfOf` | |
| `provenance` | — | NOT `dcterms:provenance`, which records custody; ours says how the piece was made. The name clash is a pending decision |

`dcterms:` is [DCMI Metadata Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/); `prov:` is [PROV-O](https://www.w3.org/TR/prov-o/).

### Ring 3 — extension by series (`HDR-030`)

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

### Vocabularies

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

### Status lifecycles

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
| `withdrawn` | no longer in force. The one terminal state: whether an heir exists is said by `superseded_by`, present or absent, never by a second state (`DEF-008`) |

Two states are retired, and the header check rejects them. Closed meant
published for a report, and would have had to mean no longer binding for a
standard. Superseded named an heir, and an heir is a relation, not a state.
Whether a document's body may still change is its series' **threshold**,
set in the register of series, not its status.

## Why

A person reads the body; guards, indexes and the site read only the header.
Everything the machinery knows about a document is in these lines, so a
guessed value corrupts every view at once, and an unregistered field starts
a count that never stops. Each value follows a norm the world already
reads, so an auditor checks us with tools they already own.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-007` | One page per document | the body that follows the header |
| `STD-019` | Versions | when each number of a version moves |
| `STD-001` | The series | the folders and prefixes the fields draw on |

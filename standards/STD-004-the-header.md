---
id: "STD-004"
uid: ""
title: "The header"
type: standard
subtype: standard
status: active
version: "4.19.1"
created: "2026-08-28T15:10:00Z"
created_source: "git:4c0a02e"
created_confidence: exact
updated: "2026-10-08T12:00:00+02:00"
approved_by: "ADR-043"
absorbs: ["STD-016"]
author: "ursa"
owner: "oracle"
section: "Knowledge and quality"
license: "CC0-1.0"
tags: [frontmatter, standard, lint, metadata, RFC-3339, YAML, Dublin-Core, PROV, register]
derived_from: "PRI-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# The header

> **Summary:** Every document opens with labelled fields saying what it is,
> who wrote it and when. Every field is listed below, the core fields and then
> the extension fields of each series; any other is an error. An unknown value
> is left out, never guessed.
> **Epistemic:** What is a correct header?
> **Pragmatic:** Write a header, add a field, or read a finding by its code.
> **Audience:** Agents · Oracles

**Binds:** every document's header, and every date the archive writes.

## Rules

Each rule follows an outside standard, so any tool that reads it can check
us unaided.

### Every document has a header

**Every governed document has a header.** Every document in a governed
folder MUST open, at its very first character, with a block of YAML fields
fenced by three dashes on their own lines, so any tool finds the header
without guessing.

**A field in no list is an error.** A field that neither the core nor a
series' extension registers MUST be reported, as a closed schema refuses any
property it does not list. A misspelt field is caught the day it is written.

**Adding a field costs a row and a decision.** A new field MUST arrive in
the same change as its line in the tables below and the decision that
justifies it.

### What a header may say

**Empty is absent.** A field MUST NOT hold an empty value. When nothing is
known, leave the field out, write null, or mark it to be announced.

**Absent is never guessed.** A placeholder, a plausible date or an invented
author MUST NOT stand in for a value. Where history cannot testify, mark
the date as declared, so a reader can tell evidence from claim.

**A deferred value has an owner.** A value left to be announced MUST sit in
a field that a mission owns, and the check names that mission. A mission
that is gone or finished owns nothing.

**Deprecated fields leave in waves.** A deprecated field MUST be reported
wherever it still appears until its migration lands. The rule that names it
leaves with its last occurrence.

**The universal identifier stays empty.** The field reserved for a
universal identifier MUST stay empty until the system that assigns it
exists.

### What the values follow

**The licence is a name from the shared list.** Every header MUST declare a
licence, spelt exactly as the shared open-source licence list spells it.
The file's own licence lines carry the same tag, so one check reads every
file's terms and the two never disagree.

**A version counts what changed.** A version MUST be three numbers in
semantic versioning form, bumped as the standard of versions says. The
number alone tells whether an obligation was dropped, added or reworded.

**Replaced is a relation, not a state.** A document that has an heir MUST
say so with a link to the heir, never with a status of its own. A link
names the heir and cannot drift from it, as the superseded status many
decision records use can.

**Relations live in the header and resolve.** Every relation (replaces,
replaced by, absorbs, derived from, approved by, related, part of) MUST
name a document that exists. Each means what Dublin Core and the web's
provenance vocabulary say it means, so catalogue tools read our links as
their own.

**Titles are English.** Every title MUST be in English, and a language is
always named with the internet's standard language tags.

### How dates are written

**Dates are written the internet's way.** Every date MUST follow the
internet's timestamp format: year, month, day, the hour and its offset from
universal time, in that order. Dates then sort as text and read one way;
no updated date comes before its created date. Where a date's source gives
no hour, the house's hours card (`OPS-022`) gives it.

This standard runs over its word budget because each rule names the outside
standard it follows.

## Check

Each rule with its code, source and check; then every field, the core and
then the extensions, with its value, code, series and outside meaning.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| HDR-000 | Every governed document has a header | [YAML 1.2.2](https://yaml.org/spec/1.2.2/) — ours adds: fenced by `---` at byte 0 | `machine/checks/rules/std-004-the-header.mjs`, with HDR-040 (the fence) and HDR-043 (the licence) |
| HDR-040 | the fence at byte 0, part of HDR-000 | [YAML 1.2.2](https://yaml.org/spec/1.2.2/), document markers | `machine/checks/rules/std-004-the-header.mjs` — the file starts with `---\n` |
| HDR-030 | A field in no list is an error | [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/json-schema-core), `additionalProperties: false`, as the model | `machine/checks/rules/std-004-the-header.mjs` |
| HDR-042 | Adding a field costs a row and a decision | — | by hand, at review: the register row and the decision |
| HDR-009 | Empty is absent | — | `machine/checks/rules/std-004-the-header.mjs` |
| HDR-044 | Absent is never guessed | — ([EDTF](https://www.loc.gov/standards/datetime/) is the candidate for uncertain dates) | `machine/checks/rules/std-004-the-header.mjs`, placeholder values |
| HDR-032 | A deferred value has an owner | — | `machine/checks/rules/std-004-the-header.mjs`: a deferral with no owner, or whose mission is gone or finished |
| HDR-031 | Deprecated fields leave in waves | — | `machine/checks/rules/std-004-the-header.mjs` |
| HDR-020 | The universal identifier stays empty | — | `machine/checks/rules/std-004-the-header.mjs` |
| HDR-043 | The licence is a name from the shared list — declared | [REUSE 3.3](https://reuse.software/spec-3.3/); [SPDX 2.3 Annex E](https://spdx.github.io/spdx-spec/v2.3/using-SPDX-short-identifiers-in-source-files/) | `machine/checks/rules/std-004-the-header.mjs` — `license` present |
| HDR-008 | The licence is a name from the shared list — spelt right | [SPDX License List](https://spdx.org/licenses/) | `machine/checks/rules/std-004-the-header.mjs` — value against the manifest |
| HDR-005 | A version counts what changed | [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html); bump rules in `STD-019` | `machine/checks/rules/std-004-the-header.mjs` — shape; the bump, by hand |
| HDR-004 | Replaced is a relation, not a state | differs on purpose from [MADR](https://adr.github.io/madr/) and [Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) `superseded`; the heir is [`dcterms:isReplacedBy`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/isReplacedBy/) | `machine/checks/rules/std-004-the-header.mjs` — status in its lifecycle |
| HDR-016 | Relations live in the header and resolve | [DCMI Metadata Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/): `replaces`, `isReplacedBy`, `relation`, `isPartOf`; [PROV-O](https://www.w3.org/TR/prov-o/) `wasDerivedFrom`; the field map is the outside meaning below | `machine/checks/rules/std-004-the-header.mjs` resolves every relation field against the tree and its history, with the resolver the body's citations use (`DEF-009`) |
| HDR-002 | Titles are English | [BCP 47](https://www.rfc-editor.org/info/bcp47) — the tag `en` | `machine/checks/rules/std-004-the-header.mjs`: presence, and a title carrying words or marks only Spanish uses is reported |
| HDR-045 | Dates are written the internet's way | [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), a free, exact profile of [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) — ours adds: time required, `updated` ≥ `created`; the hour a source leaves out comes from `OPS-022` | `machine/checks/rules/std-004-the-header.mjs`: `created` and `updated` under HDR-006 and HDR-007; every other header field holding a date must carry its hour and offset, and midnight passes only where a call's notice wrote it |
| HDR-001, 003, 006, 007, 012..014, 017..019, 033..038 | each field's own rule, in the tables below | — | `machine/checks/rules/std-004-the-header.mjs`, one rule ID per finding |
| HDR-010, 011, 015 | author, owner, commissioned by | — | by hand, presence only |

A governed folder is one `machine/scripts/lib/rules.json` lists under
`governed.dirs`. HDR-045 was EXT-006 and HDR-046 was EXT-001 in the external
standards; those rule IDs are deprecated there.

### Core fields 1 — identity, every document

| Field | Rule | Rule ID |
|---|---|---|
| `id` | present; matches its series prefix, or `registration: exempt` with a reason | HDR-001 |
| `title` | present, non-empty, English — BCP 47 `en` | HDR-002 |
| `type` | present; in the vocabulary below | HDR-003 |
| `status` | present; in the lifecycle of its type | HDR-004 |
| `version` | present; Semantic Versioning 2.0.0, no `v` prefix | HDR-005 |
| `created` | present; RFC 3339 date-time (a profile of ISO 8601), time required; midnight rejected for new documents | HDR-006 |
| `updated` | present; RFC 3339 date-time, time required; not earlier than `created` | HDR-007 |
| `license` | present; SPDX License List identifier; agrees with the licence manifest (`HDR-043` when absent) | HDR-008 |

### Core fields 2 — origin, every document that makes a claim

| Field | Rule | Rule ID |
|---|---|---|
| `author` | who wrote it, person or agent | HDR-010 |
| `owner` | who answers for it now | HDR-011 |
| `digital_source_type` | `human` · `ai-assisted` · `ai-generated` — how the piece was made; the name is IPTC's, the values are ours (see the outside meaning) | HDR-012 |
| `created_source` | `git:<sha>` or `declared` — where the date came from | HDR-013 |
| `created_confidence` | `exact` · `inferred` — never invented | HDR-014 |
| `requested_by` | optional; who commissioned it | HDR-015 |
| `supersedes` · `superseded_by` · `derived_from` · `absorbs` · `approved_by` · `related` · `parent_mission` · `former_id` | resolvable identifiers | HDR-016 |

| Relation | Means |
|---|---|
| `related` | relevant; no stronger direction known |
| `derived_from` | on a standard or procedure: the one principle it makes concrete or carries out; `/core` is built from it |
| `supersedes` / `superseded_by` | a later record replaces an earlier one |
| `absorbs` | a later record carries the earlier reasoning; the old identifier keeps resolving |
| `approved_by` | an authority promoted or confirmed the record (document control's *approval*, ISO 9001 7.5.2) |
| `parent_mission` | a bounded child of a larger mission |
| `former_id` | the identifier before a governed move — a reshelving, or a series taking a new prefix (`CAN-NNN` → `PRI-NNN`, `BLU-NNN` → `DES-NNN`, 2026-10-03); the old identifier keeps resolving |

### Outside meaning

Where Dublin Core, the web's provenance vocabulary or the press's source
vocabulary already defines a field, it means exactly that, so an auditor's
catalogue reads our headers unaided. The field names stay our own except
where the industry's name is the better one.

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
| `digital_source_type` | [IPTC Digital Source Type](https://cv.iptc.org/newscodes/digitalsourcetype/), the name | the field says how the piece was made, which IPTC's vocabulary (adopted by C2PA) names and Dublin Core's `provenance` does not — that term is custody history. The values stay ours: IPTC defines its terms for images (`digitalCreation` ≈ `human`, `trainedAlgorithmicMedia` ≈ `ai-generated`) and has no term for text drafted by a model and finished by a person, which is `ai-assisted` |

`dcterms:` is [DCMI Metadata Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/); `prov:` is [PROV-O](https://www.w3.org/TR/prov-o/). Until 2026-10-03 the source field was called `provenance` and the approval field `ratified_by`.

### Extension fields — by series (`HDR-030`)

| Series | Registered fields |
|---|---|
| `missions/` | `priority` (HDR-037) `effort` (HDR-038) `assigned_to` `started` `completed` `executor` (HDR-034) `hold_reason` `in_review_at` `depends_on` `parent_mission` `sub_missions` `blocked_by` `requires_oracle_approval` `human_approval_score` `paths` `context` `divergence_log` |
| `reports/` | `severity` `period` `subtype` `model` `agent` `week` `scope` `former_id` `former_id_note` `absorbs` |
| `decisions/` | `deciders` `consulted` `outcome` `decision` `absorbs` `amends` |
| `standards/` | `absorbs` |
| `principles/` | `absorbs` |
| `agents/` | `role` `platform` `model` `soul` `agent` · `name` `description` (portable `SKILL.md` under `agents/<agent>/skills/`) · `entity` `executor` `forms` (the entity card `AGENT.md`) · `automation_level` (the operator file `OPERATOR.md`: assisted · partial · conditional · high · full) |
| `debt/` | `severity` `severity_reason` `detected` `refuted` `source_audit` `opened_by` `visibility_reason` |
| `designs/` `operations/` `legal/` | `extraction_note` `restoration_note` · `designs/` (`blueprints/` until 2026-10-03): `former_id` `former_id_note` |
| `operations/` | `goods` — an offer's cards on sale, which the site reads its prices from (`STD-033` PAY-003) |
| `procedures/` | `applies_to` `mandatory` |
| `system/` | `category` `stage` `confidence` (a card of the semantic census, an entry of `SYS-011`) · `category` (a supplier card, an entry of `SYS-012`) |
| `standards/` `principles/` `procedures/` | `supersedes_version` `approved_by` |
| `opportunities/` | the record: `kind` `organisation` `sector` `source` `operation` `line` `value` `currency` `pays` `contact_role` `contact_channel` `opened` · written when due: `offer` `advance` `proposal` `agreement` `decider_role` `disclosure` `follows` `gives_back` `web` `contact_email` `closes` · a tender or a grant: `call` `read_from` · a tender: `procedure` `file_ref` `object` `turnover_asked` `works_asked` `starts` · a grant: `instrument` `opens` `estimated` · the proposal: `opportunity` `date` `valid_until` `level` `price` `tax_rate` — their values are judged by the pipeline tool (`STD-039`, `STD-040`); the stage, the next step and the chance are computed from the record's timeline, never written in the header |
| all | `tags` `visibility` `guild` `section` · `registration` `registration_reason` `registration_exemption` · `evidence_script` `evidence_head` · `related` · `uid` (reserved empty, HDR-020) |

Deprecated fields are reported wherever they remain: `area` and `territory`
(now `section`, `ADR-066`), `blocked_reason`, `threshold` (the series
register states the approval level once per series), `provenance` (now
`digital_source_type`), `type_execution` (now `executor`), `ratified_by` (now
`approved_by`), `freeze_reason` (now `hold_reason`), `semaforo` (a Spanish-era
key never used) and the other field names from the Spanish era (`ADR-067`).

### Vocabularies

| Field | Values | Rule ID |
|---|---|---|
| `type` | the closed list in `STD-001`, plus `agent` for `agents/`; a document of `standards/` is `type: standard`, one of `principles/` is `type: principle` (`seminal` until 2026-10-03), one of `designs/` is `type: design` (`blueprint` until 2026-10-03) | HDR-003 |
| `type` → series | strict for registered genres, `standard` among them; warn-only for the two general ones | HDR-017 |
| `subtype` | reports: `audit` `analysis` `proposal` `rollup` (`daily` deprecated, `STD-012`) · standard: `standard` `register` · documentation: `register` `guide` `reference` | HDR-018 |
| `guild` | `Sentinels` · `Alchemists` · `Exegetes` · `Procurators` | HDR-033 |
| `executor` | `agent` · `human` · `hybrid` — who carries the work out (ISO/IEC 22989's *human* and *AI agent*; until 2026-10-03 `type_execution: digital · biological · hybrid`) | HDR-034 |
| `visibility` | `public` · `restricted-oracle` | HDR-035 |
| `section` | the ten sections of the front door, as written in `STD-030` (`ADR-066`) | HDR-036 |

A value marked as to be announced is allowed in a field with a closed list,
and is reported only once. On a template, the comment at the end of a line is
set aside before the value is judged.

### Status lifecycles

Only this table says which states a document may hold. The machine keeps a
copy, and a test fails the moment the two differ.

| Type | Lifecycle | Rule ID |
|---|---|---|
| mission | `todo → in-progress → in-review → done`, plus `on-hold` (paused, with its reason in the hold field; returns to any state) | HDR-004 |
| everything else | `draft → active → withdrawn` | HDR-004 |

| State | Means |
|---|---|
| `draft` | on trial: followed, warns, never blocks; any change is analysed, then its owner decides (`PRE-006`) |
| `active` | in force: followed, and breaking it blocks; any change is analysed, then its owner decides; for a report or a closed mission's evidence, published and standing |
| `withdrawn` | no longer in force. The one terminal state: whether an heir exists is said by `superseded_by`, present or absent, never by a second state (`DEF-008`) |

Two states are deprecated and the header check rejects them: closed, which
meant one thing for a report and another for a standard, and superseded,
because an heir is a relation. The paused mission was `frozen` until
2026-10-03; the board's word is *on hold*. Whether a document's body may
still change is its series' **approval level**, set in the register of
series, not its status.

## Why

A person reads the body; the checks, the indexes and the site read only the
header. One guessed value there corrupts every view at once, and one
unregistered field starts a count that never stops.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-007` | One page per document | the body that follows the header |
| `STD-019` | Versions | when each number of a version moves |
| `STD-001` | The series | the folders and prefixes the fields draw on |

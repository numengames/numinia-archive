---
id: "STD-004"
uid: ""
title: "The header"
type: documentation
subtype: standard
status: draft
version: "3.1.5"
created: "2026-08-28T15:10:00Z"
created_source: "git:4c0a02e"
created_confidence: exact
updated: "2026-09-11T12:00:00+02:00"
ratified_by: "ADR-043"
author: "ursa"
owner: "oracle"
territory: "Archive"
license: "CC0-1.0"
tags: [frontmatter, standard, lint, metadata]
series_change: "3.1.5 — 2026-09-11: Check rows name the folder a script lives in (machine/scripts/, machine/tools/, machine/guards/rules/); a bare filename does not say where to run it, and three of them had moved. Patch: prose only. 3.1.4 — 2026-09-11: Check rows repoint to machine/guards/rules/std-004-the-header.mjs (R3 fold of lint-frontmatter and the HDR rules of check-core-rules). Patch: prose only. 3.1.3 — 2026-09-10: HDR-031 and the HDR-001..038 check row no longer speak of a baseline; there is none (STD-005 2.2.0). Patch: prose only. 3.1.2 — 2026-09-10: status `active` → `draft` under the alpha reset the Oracle ordered on 2026-09-10: the state had been set by agents, not signed one by one. Text unchanged; the state returns to `draft` until the tree meets the standard and the Oracle ratifies it one by one. Patch move (VER-064). 3.1.0 — HDR-040, HDR-041 and HDR-043 are defined here, inside HDR-000, instead of in STD-009 (ADR-043 cut of STD-009). 3.0.0 — the standard takes the ADR-043 shape and splits: 2,108 -> 465 words of body here; every field table, vocabulary and lifecycle is the register STD-016. No HDR plate changes number. Major: §7.1, §7.2, §8.2 and §9 were cited by four documents and no longer exist; §8 (context card, standards template) is superseded by STD-007 DOC-002..006; §9 by ENG-033."
---
# The header

> **Summary:** Every governed document opens with YAML frontmatter in three
> rings: identity, provenance, extension. Every field is in the register
> `STD-016` or is an error. A value nobody knows is declared absent, never
> guessed.
> **Epistemic:** What a conformant header is, and why every rule about it is
> one the lint can run.
> **Pragmatic:** Write a header, add a field, or read a lint finding by its
> plate.
> **Audience:** Agents · Oracles

**Binds:** every Markdown file under the directories `machine/scripts/lib/rules.json`
lists as governed.
**Does not bind:** the body (`STD-007`); the site pipeline's own schema,
which is the renderer's.

## Rules

**HDR-000 — Every governed file has a header.** Frontmatter fenced by `---`
on its own lines (**HDR-040**), parsing as valid YAML (**HDR-041**), and
declaring a licence (**HDR-043**; the value is HDR-008).

**HDR-030 — A field in no ring is an error.** Ring 1 is mandatory for every
document, Ring 2 for every document that makes a claim, Ring 3 as each
series registers in `STD-016`. There is no out-of-band extension.

**HDR-042 — Adding a field costs a row and a decision.** One line in the
register plus the decision record that justifies it, in the same change.

**HDR-009 — Empty is absent.** A field with an empty value is an error.
Absence is declared: omit the field, write `null`, or write `TBA`.

**HDR-044 — Absent is never guessed.** A placeholder, a plausible date, an
invented author fail. Ring 2 admits `declared` where git cannot testify, so a
reader can always tell evidence from claim.

**HDR-032 — A `TBA` has an owner.** `TBA` is legal only in a field a mission
owns; the lint counts each and names the mission. A `TBA` in a field no
mission owns fails. Whether the mission is alive is `[MANUAL]`.

**HDR-031 — Retirements are waves.** A retired field (`area` → `territory`;
`blocked_reason`; the Spanish-era keys) is reported wherever it still
appears until its migration lands; the rule that names it goes with the
last occurrence.

**HDR-020 — `uid` stays empty.** A non-empty `uid` is an error until the
identifier system exists.

**HDR-016 — Relations are frontmatter and resolve.** `supersedes`,
`superseded_by`, `absorbs`, `derived_from`, `ratified_by`, `related` name
identifiers that exist. `related` is never used when a stronger relation is
known, and no relation is inferred from a shared folder, author or subject.

**HDR-002 — Titles are English.** Presence is checked; language is
`[MANUAL]` because detectors lie.

## Check

| Plate | Verified by |
|---|---|
| HDR-000..009, 012..014, 017..020, 030..038, 040, 043, 044 | `machine/guards/rules/std-004-the-header.mjs`, one plate per finding |
| HDR-041 | `machine/guards/rules/std-006-plain-text.mjs` (TXT-002 — a header that parses) |
| HDR-010, 011, 015, 016 | `[MANUAL]` — presence only. No guard resolves frontmatter relations: `machine/guards/rules/std-020-git-is-the-archive.mjs` reads the body, not the header |
| HDR-042 | `[MANUAL]` — review checks the register row and the decision |

## Why

A human reads the body; guards, indexes and the site read only the header.
Everything the machinery knows about a document is these lines, so a guessed
value corrupts every derived view at once, and a field nobody registered is
the first step of a count that never stops growing. Three rings keep the
mandatory core at eight fields and let each series extend without touching
the others.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-016` | Header fields | every field, its shape, its plate |
| `STD-007` | One page per document | the body that follows the header |
| `STD-001` | Vocabulary | the words the fields draw on |

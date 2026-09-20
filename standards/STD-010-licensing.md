---
id: "STD-010"
uid: ""
title: "Licensing"
type: documentation
subtype: standard
status: draft
version: "1.1.1"
created: "2026-09-07T10:30:00+02:00"
updated: "2026-09-10T19:30:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [licensing, legal, REUSE, SPDX]
threshold: governed
series_change: "1.1.1 — Check row repoints to machine/guards/rules/std-010-licensing.mjs (R3, MIS guards-tests-ci-alpha): the guard moved out of machine/scripts/, the name did not change. 1.0.1 — LIC-058 and LIC-059 retired as duplicates of LIC-007 and HDR-008; the Check names the header plates instead (ADR-043 cut of STD-009). 1.0.0 — the standard takes the ADR-043 shape: 3,020 -> 495 words of body across three files. LIC-001..013 are the obligations of the old §2-§7; the allowlist, the metadata-field table and the licence texts are the register STD-013; the two irreversible gates are STD-014. LIC-058..060 (core rules) are cited, not restated. Nothing that bound is dropped; what explained is in the Why or in CAN-005."
---

# Licensing

> **Summary:** Deployable apps are `AGPL-3.0-only`, packages `MIT`, public
> assets and data `CC0-1.0`, documentation `CC-BY-4.0`, lore and brand
> reserved. Every file declares; the strongest copyleft in the shipped tree
> sets the floor and never flows into a permissive package.
> **Epistemic:** What must be done about `CAN-005`: which licence each piece
> gets, how it is declared, what may be depended on.
> **Pragmatic:** License a new file or check an existing one without a legal
> consultation. Not legal advice.
> **Audience:** Agents · Oracles

**Binds:** every repository of Numen Games, Numinia's and NWOS's included.
**Does not bind:** client workspaces our generators produce (`LIC-010`);
third-party material, which keeps its licence of origin.

## Rules

**LIC-001 — Ours, or not published.** Without demonstrable ownership —
contract, commission, assignment or compatible origin — a piece MUST NOT be
published.

**LIC-002 — Licence by kind.** Application that decides (`apps/*`)
`AGPL-3.0-only`. Package, SDK, tokens, script, CI (`machine/packages/*`) `MIT`.
Public assets, data, design `CC0-1.0`. Documentation `CC-BY-4.0`.
Agent definitions (`agents/*`) and `canon/` `CC0-1.0`, irrevocably. Lore,
brand, prototypes: reserved.

**LIC-003 — Copyleft flows down, never up.** AGPL MUST NOT be imported by
MIT. The strongest copyleft in the *distributed* tree sets the floor;
`devDependencies` do not count. Two processes over HTTP are two works.

**LIC-004 — Inherited copyleft is isolated.** A third party's copyleft engine
lives in its own repository; ours is declared per directory.

**LIC-005 — Allowed inputs only.** A dependency's licence MUST be on the
allowlist (`STD-013`), resolved before adding. Absent or unknown blocks
until its `LICENSE` is read.

**LIC-006 — Present is not distributed.** A forbidden dependency that stays
out of the artifact MAY be tolerated only with a `debt/` entry tagged `legal`,
an exit condition, and a guard that reads the artifact. An AGPL artifact
with added restrictions has no exception.

**LIC-007 — Every repository declares.** `LICENSE`, `LICENSES/`, `REUSE.toml`,
`TRADEMARKS.md`; `NOTICE` if any Apache-2.0 ships; exact SPDX in every
`package.json`. All in English.

**LIC-008 — One file, one regime.** An SPDX `AND` MUST NOT occur; split the
content. Pinned, vendored or metadata-less files are declared by `REUSE.toml`
or `.license`, never edited.

**LIC-009 — The licence travels inside the file.** A media file carries its
licence in its own metadata (`STD-013`). A CC0 VRM MUST override the
specification's restrictive defaults.

**LIC-010 — A generator never propagates its licence.** The template is ours
and licensed by `LIC-002`; the generated work belongs to the client and MUST
receive a reserved-rights `LICENSE` in the client's name.

**LIC-011 — Provenance declared.** Every piece states `human`, `ai-assisted`
or `ai-generated`; what is published as ours has recorded human intervention.

**LIC-012 — CC0 waives only our rights.** Before CC0 on media: sample
origin, written consent for identifiable people, EXIF cleared, chain of
rights in video, consent covering cloning in voice.

**LIC-013 — Contributions are covered per repository.** Any repository with
AGPL code: CLA. MIT-only and documentation: DCO. Assets: explicit CC0 in the
pull request.

## Check

| Plate | Verified by |
|---|---|
| LIC-007 (documents), LIC-008 | `machine/guards/rules/std-010-licensing.mjs` (also `HDR-043`, `HDR-008`) |
| LIC-005, LIC-007 (packages) | `license-check` in CI, default severity error — not yet in this repository |
| LIC-003, LIC-006 | `[MANUAL]` — the dependency-direction lint and the artifact inspector are described, not built (`DBT-020`) |
| LIC-001, 002, 004, 009–013 | `[MANUAL]` — review at the pull request |

## Why

`CAN-005`: every piece is born in the most closed regime that makes sense
and is opened by deliberate acts, because opening is irreversible. What
decides is copyleft so improvements return; what is reused is permissive so
it spreads; what is published is public domain so it needs no permission.

## References

| ID | Title | Relation |
|---|---|---|
| `CAN-005` | Legal by design | why; where this and the canon disagree, one is wrong and is corrected |
| `STD-013` | Licence allowlist and fields | what LIC-005 and LIC-009 check against |
| `STD-014` | Publishing gates | the two irreversible acts and their checks |

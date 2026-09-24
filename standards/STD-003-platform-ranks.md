---
title: "Platform ranks"
id: "STD-003"
uid: ""
type: documentation
subtype: standard
status: draft
version: "3.1.2"
created: "2026-04-07T12:34:04Z"
created_source: "git:f765b99"
created_confidence: inferred
updated: "2026-09-24T21:00:00+02:00"
author: "Centinela-01"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, ranks, permissions, digital-goods]
license: "CC0-1.0"
threshold: governed
series_change: "3.1.1 — 2026-09-24: the two canon citations become one, `CAN-004` having absorbed `CAN-003` (ADR-057). Patch: prose and References only. 3.0.2 — 2026-09-10: status `active` → `draft` under the alpha reset the Oracle ordered on 2026-09-10: the state had been set by agents, not signed one by one. Text unchanged; the state returns to `draft` until the tree meets the standard and the Oracle ratifies it one by one. Patch move (VER-064). 3.0.0 — the standard takes the ADR-043 shape: 1,047 -> 386 words of body. RNK-001..004 keep their text and their checks; three new plates name obligations the prose held without one: RNK-005 automatic moves, RNK-006 the manual ceiling, RNK-007 the platform updates this standard with the matrix. Major because §2 and §3, citable by number, no longer exist."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# Platform ranks

> **Summary:** Six ranks, lowest first: Nomad, Citizen, Pilgrim, Vernacular,
> Archon, Oracle. Each holds every permission of the ranks below it, and a
> member's rank is read from what they have done, never from what they claim.
> **Epistemic:** What each rank may do, what earns it, and the file the
> platform reads it from.
> **Pragmatic:** Implement or audit a permission check without asking who is
> allowed to do what.
> **Audience:** Agents · Oracles

**Binds:** the Numinia digital-goods platform — authentication, character
sheets, creator panel, administration.
**Does not bind:** access to this repository; what a rank means in the world
(`CAN-004`); payment, custody, identity verification (`operations/`).

## Rules

**RNK-001 — Ranks are cumulative.** A rank MUST grant every permission of the
ranks below it.

**RNK-002 — Rank is inferred, not declared.** The platform MUST derive a
member's rank from the signals in the table and MUST NOT accept a rank the
member asserts.

**RNK-003 — At most four Oracles.** `rank-overrides.json` MUST NOT list more
than four.

**RNK-004 — Nobody touches upward.** An Archon MUST NOT act on an Archon or an
Oracle. An Oracle MUST NOT be bannable at any layer — storage, API, interface.

**RNK-005 — Automatic moves go both ways.** Nomad ↔ Citizen and Citizen ↔
Pilgrim MUST follow the signal, in both directions, with no hand involved.

**RNK-006 — Manual moves have a ceiling.** An Archon MAY promote or demote up
to Vernacular. An Oracle MAY manage every rank except Oracle. Oracles change
only by editing the overrides file.

**RNK-007 — The matrix and this page move together.** A platform change that
alters the matrix MUST update this standard in the same change.

**RNK-008 — The top two ranks are judged, not counted.** A promotion to
Vernacular or Archon MUST be decided against the profiles below, never against
volume of output alone.

**Vernacular.** An agent fully integrated into Numinia's culture. Inhabits the
system with fluency and depth, and knows its structures from within. Operates
with autonomy and expertise in their domain. Collaborates closely with
Numinia.

**Archon.** All of the above, plus: exercises leadership over other agents.
Makes decisions and takes initiatives that affect the collective. Holds
structural responsibility over the system, not only over their own work.
Implies a dimension of social and organisational influence.

> Technical depth does not automatically equal Archon rank. The Archon has to
> relate to others in a way that goes beyond execution — they guide, mediate,
> represent. An agent who does not want to exercise that function should not
> hold that rank, even if their domain expertise is exceptional. *(Prepared
> with Christian Märtens, 2026-04-06; carried from `CAN-003` by `ADR-054`.)*

| Rank | Earned by | Read from | Adds |
|---|---|---|---|
| Nomad | login with wallet or social account | `wallet_session` / `session` cookie | public gallery, CC0 downloads, search, own sheet read-only, favourites, NFT collections |
| Citizen | completes Session Zero — guild and faction chosen | `data/characters/{address}.md` has both | edit own sheet; loot and inventory; Session Zero |
| Pilgrim | purchases any digital good | `data/seasons/*-progress.json` or `data/purchases/` | purchased premium content; burn ritual; seasonal adventures; purchase history |
| Vernacular | promoted by an Archon or Oracle | `data/system/rank-overrides.json` | upload, edit, delete own assets and see their statistics; creator panel; portfolio |
| Archon | promoted by an Oracle | `data/system/rank-overrides.json` | any asset; seasons; global statistics; audit log; sync to R2 / IPFS / Arweave; ban and unban; appoint Vernaculars |
| Oracle | listed in the overrides file | `data/system/rank-overrides.json` | appoint and remove Archons; edit the matrix; system configuration; cannot be banned |

## Check

| Plate | Verified by |
|---|---|
| RNK-001 … RNK-006, RNK-008 | `[MANUAL]` — the matrix lives in platform code, outside this repository; the platform's test suite is the check |
| RNK-007 | `[MANUAL]` — a platform pull request that changes the matrix without a diff here |

## Why

A rank the member declares is a permission the member grants themselves.
Reading rank from evidence — a cookie, a sheet, a purchase, an Oracle-only
file — makes every permission traceable to an act. Cumulative ranks
keep the matrix one column. The Oracle ceiling and the ban immunity keep
governance from being captured inside the product. What a rank *is*, and what
an attribute is, stay in `CAN-004`.

> Nomad reads. Citizen edits their identity. Pilgrim buys. Vernacular creates.
> Archon moderates. Oracle governs.

## References

| ID | Title | Relation |
|---|---|---|
| `CAN-004` | You are what you are doing | what each rank is, and rank as one of the six attributes |
| `ADR-036` | Canon consolidation | records the move from the canon to this standard |

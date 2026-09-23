---
id: "ADR-036"
uid: ""
title: "The canon is CAN-"
type: adr
status: active
version: "2.0.0"
created: "2026-09-01T00:00:00+02:00"
updated: "2026-09-10T03:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [canon, taxonomy, series, prefixes, licensing, CC0, deletion]
license: "CC-BY-4.0"
related: ["CAN-005", "STD-018", "SYS-003"]
threshold: governed
supersedes_record_of: ["canon/INDEX.md", "canon/README.md"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-036 — The canon is CAN-

> **Summary:** The `C-` series became `CAN-` on 2026-09-01; two dated
> "frozen" documents were living canon and entered the series; two left the
> folder; `canon/` was declared `CC0-1.0`, which it had been since April.
> **Epistemic:** This record is the only place the `S-` → `C-` → `CAN-`
> map survives. Closed records cite the old names; this table resolves them.
> **Pragmatic:** A `C-006` or `C-007` in a record written before 2026-09-01
> names a different document than the `CAN-` of the same number. Read here.
> **Audience:** Agents · Oracles

## 2. Decision

**`C-` is `CAN-`.** Seven documents on that day; `CAN-008` joined later.

**Two dated files were never photographs.** *Epistemic Relations* and
*Pragmatic Numen System* carried dated filenames declaring them frozen while
`CAN-007`'s rule that function and structure are distinguishable but not
separable was being cited as active law. The Oracle ruled them living
canon; they took `CAN-006` and `CAN-007`.

**Two numbers were reused, deliberately.** `C-006` *Session Zero* and
`C-007` *Rank Specifications* left the folder in the same change and the two
de-frozen documents took their numbers — an Oracle-ordered exception to
`IDN-014`, recorded rather than hidden. It rests on `uid` being empty across
the corpus, so the number was carrying an identity it was not designed to
carry alone. Citations to `C-006`/`C-007` in closed records are photographs
(`CIT-053`) and resolve only through §6.

**Two documents left.** *Session Zero* is game design, not governance: it
moved to `numinia-lore:seminal/About_Session_Zero.md`, reserved regime.
*Rank Specifications* was twenty lines on a subject `CAN-003` already held;
merged verbatim, attribution kept.

**The regime is what was granted.** `REUSE.toml` annotates `canon/**` as
`CC0-1.0`; `CAN-005` records the exception in the canon itself. The seven
lore lines of the retired «archive-lore» file moved into `SYS-003`'s
`fondos[].lore`; the canon index and readme were retired, their record
inherited below.

## 6. Identifier map (number kept: closed records cite §6)

Records before 2026-08-25 cite `S-`; between 2026-08-25 and 2026-09-01,
`C-`. Both resolve here.

| Original | Then | Now |
|---|---|---|
| `S-001` | `C-001` | `CAN-001` Welcome to Numinia |
| `S-002` | `C-002` | `CAN-002` Brand & Culture |
| `S-003` | — | `CAN-006` Epistemic Relations |
| `S-004` | `C-003` | `CAN-003` Attributes and Ranks |
| `S-005` | `C-004` | `CAN-004` Role Structure |
| `S-006` | — | `STD-003` Platform ranks (left canon 2026-08-25) |
| `S-007` | `C-006` | `numinia-lore:seminal/About_Session_Zero.md` |
| `S-008` | — | `numinia-lore` RPG manual; pointer only, never copied |
| `S-009` | `C-007` | merged into `CAN-003` |
| `S-010` | — | retired (was `canon/README.md`) |
| — | `C-005` | `CAN-005` Licensing |
| — | — | `CAN-007` Pragmatic Numen System, unlisted for four months |

## 7. Consequences

- `canon/` went from twelve files to seven.
- Reserved lore now sits in a `CC0` file (`SYS-003`): consistent with the
  April grant, but a regime change to text authored expecting reservation.
  Stated, not assumed.
- The RPG manual is pointed at, never copied, and has no `CAN-` number.

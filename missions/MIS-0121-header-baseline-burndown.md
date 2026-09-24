---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-121"
uid: ""
title: "Burn the header baseline down: 843 frozen violations to zero"
status: done
priority: high
effort: XL
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
started: "2026-08-30"
completed: "2026-09-08"

# REGISTRO
type: mission
version: "1.4.0"
created: "2026-08-30T04:43:00Z"
created_source: "git:fd4d045"
created_confidence: exact
updated: "2026-09-08T20:30:00Z"
author: "ursa"
owner: "oracle"
tags: [archive, frontmatter, s-004, migration, debt]
license: "CC0-1.0"

paths: [machine/scripts/lint-frontmatter.mjs, machine/scripts/frontmatter-baseline.json, standards/STD-004-the-header.md, debt/, missions/, web/src/content.config.ts]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# MIS-121 — Burn the header baseline down

> **Summary:** `STD-004` is now enforced by a guard in CI, and the guard froze
> **843 existing violations** so it could ratchet instead of cliff. This
> mission spends that baseline down to zero.
> **Epistemic:** the baseline's size is the corpus's public entropy metric.
> Each number that leaves it is a defect that can no longer come back.
> **Pragmatic:** a corpus whose headers all conform can be queried, filtered
> and rendered by rule instead of by exception.
> **Read the sequencing before scheduling any of it.** Measuring the values
> rather than the counts showed that **798 of the 843 are blocked on a
> decision, not on effort**, and only **45 are mechanical**: `territory` has
> no working vocabulary to migrate into (blocker 4), `uid` cannot be emptied
> until `MIS-122` fixes the rule (blocker 1), `HDR-030` is 62 separate
> judgements wearing one number, and `HDR-004` is four unrelated lifecycles.
> The arithmetic is in *Sizing* below. This mission is mostly a decision
> queue with a script attached, and scheduling it as a cleanup sprint would
> fail in its first week.
> **Audience:** Agents · Oracles

## Base commit

**`bc76270`** — before any of this work started. Every criterion below is
false there. Two are true at the time of writing because their checks have
already been executed inside this mission; they are marked `[x]` with their
evidence, not silently dropped.

At `bc76270`: guard written but **not wired**, baseline **844**.

## Scope

The frontmatter of every tracked `.md` file that `machine/scripts/lint-frontmatter.mjs`
inspects, and the standards, decisions and web schema that a header migration
forces to move with it.

**In scope:** the sixteen check classes `HDR-000`…`HDR-031`; the baseline file; the
debt entries that already register individual classes (`D-002`, `D-008`,
`D-009`, `D-010`, `D-012`); the Astro content schema where a field rename
would otherwise break the board.

**Out of scope:** changing what `STD-004` *says* — the `HDR-009` rule that
punishes the conforming empty `uid` is a normative fix and lives in
`MIS-122`. Emptying the 34 written `uid` values is **in** scope (blocker 1).
Also out of scope: the *content* of any document. This mission moves keys
and values in frontmatter. It does not rewrite prose, retitle documents, or
change what a document says. Where a header value cannot be corrected without
a judgement about meaning, the mission stops and asks the Oracle.

> **Scope and Acceptance criteria are written now and are not edited
> afterwards.** What happens goes in `Closure`.

## Acceptance criteria

Each check is one class of violation, sized from the baseline at `843`.
Order is deliberate: mechanically safe first, contested last.

```
✓  node machine/scripts/lint-frontmatter.mjs --report | grep -c '^H-'   returns 0
   (at bc76270: 844 · today: 843)

   There is no floor. Emptying the 34 written uid values is in scope
   (Oracle, 2026-08-30); the 64 conforming ones stop being findings when
   MIS-122 fixes the rule that miscounts them.
```

### Blockers already cleared

- [x] **The guard runs in CI.** Without it a migration cannot be verified and
      regressions re-enter silently.
      *Evidence:* `D-017` closed; `ci.yml` step `header lint`; run
      [`33276755484`](https://github.com/numengames/numinia-nwos/actions/runs/33276755484)
      green on `main` at `baf188b`. False at `bc76270`, where `ci.yml` had
      four steps and none of them this one.
- [x] **The baseline is honest.** It was reporting `1 baselined finding(s)
      healed` on every run — a stale number is not a metric.
      *Evidence:* `844 → 843`, banked in `#125` and this branch. The count
      only ever goes down.

### Ruled 2026-08-30 — these go first, and in this order

- [x] **A · The template family stops emitting defects — 9.** *Done (#139,
      #143): templates fixed at source, then exempted from HDR-006/HDR-007 for
      their placeholder dates — the placeholder IS the template's content.
      Today they emit 0.*
      `machine/templates/MIS-TEMPLATE`, `machine/templates/MIS-TEMPLATE-EXAMPLE`, `machine/templates/MIS-TEMPLATE-CHANGES`. First
      because every mission copied from them inherits what they carry: fixing
      them last means draining a baseline that refills from its own source.
      `area → territory` ×2, placeholder dates given a real ISO time ×6,
      `type: standard` in `missions/` ×1. Smallest check in the mission and
      the one with the largest half-life.
- [x] **B · `debt/` adopts the declared lifecycle — 37.** *Done (#140):
      `open → active` ×35, `resolved → closed` ×2; the two entries needing
      reading were read. Today `debt/` emits 0.*
      `open → active` ×35, `resolved → closed` ×2, against the
      `[draft active closed]` cycle `STD-004` already gives
      `type: documentation`. Two entries need reading, not renaming: one
      carries the literal `status: cancelled  →  status: frozen`, another a
      trailing comment that corrupts the value (`D-016` territory).
      Publishing is **not** affected: `corpus.ts` gates `debt/` on
      `visibility`, never on `status`, and 37 of 38 entries declare
      `visibility: "public"`.

### Mechanical classes — measured, and most of them are not mechanical

**Correction, 2026-08-30.** An earlier draft of this mission called these
five classes "mechanical, a script can do them". That was written from
finding *counts*, not from finding *values*. Measuring the values killed the
claim: **only one of the five is a rename.** The rest are decisions wearing a
rename's clothes, and the numbers below say how many decisions each is.

- [x] **`HDR-031` retired fields — 158, of which `area → territory` is 142 and
      only 66 are a rename.** *Done (#139, #141, #143) except 9 findings in
      the two fragile documents. ADR-027 (formerly ADR-028) unblocked the migration: 66 mapped
      1:1, 76 took `"TBA"`; the Astro schema moved with the rename.* The other keys (`blocked_reason` ×7, five
      Spanish-era keys ×9) are deletions and genuinely mechanical.
      **`area` is not.** Measured across 142 documents, 35 distinct values:

      | | |
      |---|---|
      | map 1:1 onto `STD-001` §7 `territory` | **66** |
      | compound — `Platform / numinia-web`, `CAO / Product`, one with `{a\|b\|c}` | **43** |
      | orphan — `web` ×12, `Documentation` ×9, `Operations` ×5, `Ops`, `Business`, `Strategy` | **33** |

      `STD-001` §7 already diagnosed the compounds: *"the slash reveals the
      field doing two jobs: functional domain plus technical surface."*
      **76 of the 142 need a judgement, not a rename** — and this is exactly
      what `D-010` says it is blocked on. This check is therefore three
      pieces of work: 66 renames, 33 vocabulary decisions, 43 field splits.
      Do not schedule it as one.

      **A worse finding, and it is not this mission's to fix.**
      `STD-001` §7 declares `territory` as `CAO · Product · Platform ·
      Infrastructure · Content · Sales · Funding · Archive`. The 67
      documents that already carry `territory` use `Archive` ×48, `Canon` ×8,
      `Infrastructure` ×4, `Legal` ×3, `Governance` ×2, `Standards` ×2.
      **`Canon`, `Legal`, `Governance` and `Standards` are not in the
      declared vocabulary; `CAO`, `Product`, `Platform`, `Content`, `Sales`
      and `Funding` are used by nobody.** The field the migration targets is
      itself undeclared, and the guard never checks the value — `HDR-031` only
      checks the key. Migrating `area` into `territory` today pours 142
      documents into a vocabulary that does not exist as written. **The
      vocabulary must be settled before this check starts.**

      **Coupled to the web:** `content.config.ts` declares `area` in three
      collections; the rename lands with the schema or the build drops the
      field.

- [x] **`HDR-009` empty values — 74.** *Done: `uid` exempted by rule (#129),
      real empties dropped in #142 — 5 of 10 turned out to be keys with
      nested children, preserved; `parseFM` fixed in #143 so it can tell
      the difference. Today: 0.*
- [x] **`HDR-030` unregistered fields — 111 across 62 distinct field names.**
      *Done (#141, #143) except 22 findings in the two fragile documents —
      the Spanish-era keys (`iconografia`, `presupuesto_lectura`…) that were
      predicted to "belong with `CAN-005`". Web layer checked BEFORE each
      retirement; `fondos`/`graph`/`lore` registered because the site reads
      them.*
      Not a class: a queue of 62 decisions. Only `visibility_reason` ×11,
      `threshold` ×9, `adr_id` ×8 and `semaforo` ×7 appear more than four
      times; **44 of the 62 appear exactly once.** A one-off field is a
      judgement about whether the document needed it — `register` or `remove`
      is a call per field, and roughly a dozen are Spanish-era leftovers
      (`iconografia`, `presupuesto_lectura`, `edicion_razonada`) that belong
      with `CAN-005`, not here. **Sequence this last, or split it out.**
- [x] **`HDR-004` status vocabularies — 118, in four independent groups.**
      *Done (#140, #143) except 2 findings in the fragile pair (the two
      documents missing `status` entirely). `draft → todo` ruled by the
      Oracle 2026-08-30 ("draft = backlog"); `MissionsView.astro` moved
      with the values.*
      50 `backlog` + 5 `draft` in missions (`D-009`), 35 `open` + 2
      `resolved` in `debt/` (check **B**), 19 `published` in reports, and a
      tail: `designed` ×3, `provisional`, `done`, plus **2 documents missing
      `status` entirely** (`canon/CAN-005-licensing.md`,
      `STD-008`, then `standards/STD-008-design-system`) that the same check
      code reports. Each group is a different lifecycle question. Only
      `debt/` is settled (ruled 2026-08-30).
      **Coupled to the web:** `MissionsView.astro` keys its columns off
      `backlog` and maps `draft → backlog` explicitly; renaming the value
      without moving that map empties a column on the live board.
- [x] **`HDR-003` types outside the closed vocabulary — 24.** *Done (#142,
      #143) except 2 in the fragile pair. The 22 resolvable ones had answers
      in the corpus itself; `DEC-001..006 → type: adr` with ids intact
      (Oracle, 2026-08-30 — renumbering would break 154 references and
      violate ADR-004); `roster` registered for `guilds/`.* `decision` ×6,
      `technical` ×4, `roster` ×4, `standard` ×3, `proposal` ×2, `audit` ×2,
      `template` ×1, plus the same 2 documents that are missing `type`
      outright. `roster` ×4 is what `guilds/` calls itself; whether the
      closed vocabulary is wrong or the documents are is a decision, not a
      substitution.
- [x] **`HDR-005` `v`-prefixed SemVer — 7, `HDR-017` type/folder mismatch — 4,
      `HDR-013` `git:pending` — 3, `HDR-018` unregistered subtype — 1.**
      *Done across #130, #139, #143. The HDR-017 that were honest mismatches
      are registered in `SETTLED_ELSEWHERE` with reasons.*
      *These* are mechanical. 15 findings, no judgement.
- [x] **`HDR-020` non-empty `uid` — 34.** *Done (post-#129 batches): all 34
      hand-authored values emptied per STD-001 §6.2. The only `uid` values
      left in the repo are examples inside document bodies (the superseded constitution and the mission-system
      blueprint, both deleted 2026-09-08, `ADR-041`) — prose, not headers.* The hand-authored pseudo-UUIDv7
      values, 2 of them colliding. `uid: "018ef820-…"` → `uid:`. `STD-001` §6.2
      already states the disposal: *"the 32 legacy values are removed, not
      preserved: they were never identifiers."*
      **Ordering constraint (`MIS-122` first), measured not assumed:**
      emptying one of them today produces `HDR-009 :: empty value written for
      "uid" — omit the field instead`, a **new** violation the ratchet
      rejects. Verified on `blueprints/AUDIT-numengames-2026-04-08.md`, then
      reverted. So this check **cannot start until `MIS-122` fixes the `HDR-009`
      rule** — not a preference, a mechanical block. Trading 34 `HDR-020` for 34
      `HDR-009` would also leave the count unchanged.

      **Unblocked 2026-08-30 (`ec4c968`, PR #129).** `MIS-122` closed: `HDR-009`
      now exempts `uid`, so emptying a value no longer trades one violation
      for another. The census that gates this work, remeasured at `7fae24f`:
      **99** files declare the field — **34** with a hand-authored value,
      **65** declared-and-empty as §6.2 requires. The guard's 34 is exact
      (0 false positives, 0 misses). §6.2's "32" is the stale figure and is
      the one to correct when these are emptied.

## Progress — 2026-08-30

| Commit | What changed | Baseline |
|---|---|---|
| `baf188b` | starting point, before any of this | **844** |
| `ec4c968` (#129) | `HDR-009` exempts `uid`; `HDR-020`'s message corrected; `todo` column restored to the web | **779** |
| `7fae24f` (#130) | `created`/`updated` backfilled from git with provenance; `git:pending` redeemed; `created_confidence` settled on one spelling | **543** |
| `0499b8c` (#139) | `area → territory` (66 mapped, 76 took `TBA` per ADR-027); guild/type_execution/visibility vocabularies enforced; ring-table transcription errors; single-cycle statuses; `AG-`/singular ids resolved with `registration: exempt` | **304** |
| `9d3afaa` (#140) | status lifecycles (60 out-of-cycle values); 42 non-series documents exempted instead of renumbered | **207** |
| `86431b3` (#141) | orphan fields: `adr_id` retired (verified duplicate ×8), `decision`/`threshold`/`visibility_reason`/`semaforo` registered — `semaforo` is painted by the site, checked value-by-value | **168** |
| `eb674f3` (#142) | 6 impostor types resolved from the corpus's own vocabulary; truly-empty fields dropped; **`check-frontmatter-yaml.mjs` born** (D-039 §2: no instrument checked that headers parse — the web build was the only witness) | **150** |
| `a086d56` (#143) | final sweep: `DEC-001..006 → type: adr` ids intact (Oracle ruling, 154 refs preserved); 5 missions `draft → todo` ("draft = backlog"); 12 headerless docs given headers from git history; ~35 fields registered after checking the web layer FIRST; 3 lint false positives fixed at the source | **44** |
| `aebcf54`…`203267c` (#198) | missions/ normalisation: `uid`, `created_source`, `owner` on every mission; `mission_id` retired; MIS-0NNN filenames | **21** (unchanged — the 21 survivors are outside missions/) |

**844 → 44 (95%). 328 of 330 documents clean (99%).** The 44 survivors all
live in two documents — `canon/CAN-005-licensing.md` and
`STD-008` (then `standards/STD-008-design-system`), the Spanish-era fragile
pair — set aside for a short one-by-one session: translate ~20 header keys
with the document in front, bodies untouched.

**What the burndown proved about the instruments, not the corpus:** three
lint false positives were fixed at their source along the way (`parseFM`
flattening nested YAML to "empty"; templates punished for their own
placeholder content; honest type/folder mismatches parked forever in the
baseline), and twice a retirement nearly deleted data something still read
(`semaforo` painted by the site; `fondos`/`changelog` children orphaned —
the YAML guard exists because of that second one). The rules were written
before the instruments; auditing the rules that misfired is follow-up work,
not this mission's.

**Standing guards this mission leaves behind:** ratcheted header lint
(baseline only goes down), delimiter guard, YAML-parse guard, license
guard — all in CI, all tested in both directions (PRO-013).

### Judgement classes — no script decides these

- [x] **`HDR-006`/`HDR-007` invented dates — 252. DONE 2026-08-30, baseline
      779 → 546.** `created` with a midnight nobody wrote at (182) and
      `updated` with no time at all (70). `STD-001`
      §8 governs: backfill from git, report the commit each date comes from,
      mark inferred ones, **never invent a date to fill the field**.

      **Measured, and the news is better than expected — with a catch.**
      All 182 `HDR-006` files have a first-commit timestamp in git; none is
      unrecoverable. But those 182 files resolve to only **42 distinct
      timestamps**, the largest bucket being 49 files sharing
      `2026-08-17T14:12:00Z`. That is the signature of bulk imports, not of
      182 authoring events. The git date is **honest about the commit and
      silent about the writing** — it says when the file entered the
      repository, which for a migrated corpus is not when it was created.

      So the backfill is derivable but not automatic: each date must be
      marked as inferred-from-commit, and `STD-001` §8's requirement to
      *"report the commit each date comes from"* is what keeps it honest.
      A bulk rewrite that silently stamps 49 documents with one identical
      timestamp would replace an obvious lie with a plausible one — which is
      `D-021`'s exact failure mode, and worse than the defect.

      **How it was resolved, 2026-08-30.** `machine/scripts/backfill-dates.py` writes
      three fields, never one: the date, the commit it came from
      (`created_source: "git:<sha>"`) and whether the trail crossed a rename
      (`created_confidence: exact | inferred`). The shared timestamps survive
      **and say what they are** — 49 documents reading `git:b484b68` are
      visibly one import, not 49 authoring events, which is the opposite of
      the plausible lie. **178 files, 233 findings healed, 0 new.** 109
      `exact`, 69 `inferred`. Idempotent: a second run changes nothing.
      Templates were excluded — backfilling `{YYYY-MM-DD}` would propagate a
      false date into every document copied from them.
- [x] **`HDR-000` no frontmatter — 12** and **`HDR-001` missing `id` — 41.**
      *Done (#139, #143) except 1 HDR-001 in the fragile pair. The 12 headers
      were built from git history (`created_source: git:<sha>`), nothing
      invented; apparatus resolved with `registration: exempt` instead of
      minting ids that `check-references.mjs` would then have to resolve.*
      **Measured: 25 of the 41 are in `agents/`**, including `_template/`
      files, plus `guilds/` ×8 and README/INDEX apparatus. Giving apparatus a
      registered identifier is a filing decision (`STD-001` §5.0 already
      exempts some), and **`check-references.mjs` reads frontmatter `id`** —
      minting ids creates references that must then resolve.
- [x] **`HDR-002` missing `title` — 2**, **`HDR-008` missing `license` — 2.**
      *Closed 2026-09-08: `lint-frontmatter` reports 0 findings, 0 baselined at `4a60735`.*
      *NOT done — these four are the fragile pair itself; they land with
      its one-by-one session, along with the 22 HDR-030, 9 HDR-031, and the rest
      of the 44.*

Every criterion above is falsifiable by:

```bash
node machine/scripts/lint-frontmatter.mjs --report | grep -c '^H-NN '
```

## Sizing — 798 decisions, 45 substitutions

Every number below was read from `lint-frontmatter.mjs --report` at
`baf188b` by grouping *values*, not counts. The two columns sum to 843.

| Class | Blocked on a decision | Mechanical | What the decision is |
|---|---:|---:|---|
| `HDR-006`/`HDR-007` dates | **252** | — | git gives a date for all 182 `HDR-006` files, but they collapse to **42 distinct timestamps** (49 share one). Commit date ≠ authoring date; the convention for marking inferred dates is the decision |
| `HDR-004` status | **118** | — | four unrelated lifecycles (missions, debt, reports, tail) |
| `HDR-030` unregistered | **111** | — | 62 distinct fields, 44 appearing once — register or remove, per field |
| `HDR-031` `area` | **142** | — | 66 renames blocked on the vocabulary, 43 compounds, 33 orphans |
| `HDR-009` `uid` | **64** | — | clears with `MIS-122`'s rule fix, no edit |
| `HDR-001` ids | **41** | — | which apparatus gets a registered identifier |
| `HDR-020` `uid` | **34** | — | ordered behind `MIS-122` |
| `HDR-003` types | **24** | — | is the closed vocabulary wrong, or the 24 documents? |
| `HDR-000` no frontmatter | **12** | — | same filing question as `HDR-001` |
| `HDR-031` other retired keys | — | **16** | `blocked_reason` ×7 + 5 Spanish-era keys ×9 — deletions |
| `HDR-009` non-`uid` | — | **10** | drop the empty key |
| `HDR-005` `v`-prefix | — | **7** | strip one character |
| `HDR-017` type/folder | — | **4** | |
| `HDR-013` `git:pending` | — | **3** | |
| `HDR-002`, `HDR-008`, `HDR-018` | — | **5** | |
| **Total** | **798** | **45** | |

**The ratio is the finding.** 95% of this baseline is not cleanup work. The
earlier estimate — *"~350 of 843 automatable, 2–3 h with an idempotent
script"* — was produced by reading finding counts and assuming a class with
one code shares one fix. It was wrong by an order of magnitude, and it is
recorded here rather than corrected silently because the schedule built on
it would have failed in week one.

**What this means for order:** checks **A** (9) and **B** (37) are the only
substantial work that is both unblocked and decided. After them the mission
runs out of things it can do without the Oracle. Blocker 4 (`territory`)
gates the single largest class.

## Coupling map — what breaks if a header moves alone

Measured at `baf188b`, not assumed. **Two of the sixteen classes touch code
outside `missions/`; the other fourteen are text-only.**

| Consumer | Reads | Breaks on |
|---|---|---|
| `web/src/content.config.ts` | `area` in 3 collections (`missions`, `blueprints`, `decisions`) | **`HDR-031`** — rename `area → territory` without the schema and the build drops the field |
| `web/src/views/MissionsView.astro` | `status`, maps `draft → backlog`, four columns | **`HDR-004`** — rename `backlog` and a live column empties |
| `web/src/lib/corpus.ts` | `visibility` in `debt/` only | nothing here — it never reads `status` |
| `machine/scripts/count-evidence.py` | `area`, `status`, `uid`, `created` | reports the old names; it measures, so it degrades quietly rather than failing |
| `machine/scripts/check-references.mjs` | frontmatter `id` | **`HDR-001`** — inventing ids creates references that must then resolve |
| `machine/scripts/check-license-frontmatter.mjs` | `license` vs `REUSE.toml` | **`HDR-008`** — 2 findings, already at the edge of this guard |
| `machine/scripts/lint-frontmatter.mjs` | everything | itself; the baseline is the ledger |

**300 files carry at least one finding**, out of 322 tracked `.md`. By
folder: `missions/` 124, `debt/` 38, `reports/` 25, `agents/` 25,
`blueprints/` 24, `decisions/` 15, `protocols/` 13, `canon/` 12,
`operations/` 10, `guilds/` 8, `standards/` 5, `infra/` 1.

This is not a corner of the repository. It is the repository's filing system,
and that is the argument for doing it by class rather than by folder: a class
is one rule applied 158 times and verified once.

## Blockers, and how they were ruled

Small, specific, each one stopping a class of work. **Three were ruled on
2026-08-30; the fourth was found while measuring them and is unruled.** The
rulings are recorded here rather than in a chat log, because a mission that
hides its decisions makes the next reader guess.

> **Update 2026-08-30 — two of these blockers were decided the same day.**
> `ADR-027` (*absence is declared, not omitted*) rules that a field may carry
> `"TBA"` when the value applies but is not yet decided, and that no closed
> vocabulary ships without a check. `ADR-027 (formerly ADR-029)` ratifies `STD-004`
> (`draft` → `active`, `1.0.0`) and admits `type: agent`, which the guard was
> already enforcing without a decision.
>
> Consequence for this mission: **the 142 `area` → `territory` findings are
> unblocked without settling the `territory` vocabulary** — 66 map 1:1 and
> take their value, the other 76 take `"TBA"` and name the mission that
> resolves them. The `territory` vocabulary itself stays unruled (`D-010`).
>
> Neither ADR changes any check. `MIS-123` is the mission that implements
> them; until it lands, `"TBA"` is legal prose that no instrument counts.

1. **`uid` — the values are debt, the rule is broken. Ruled 2026-08-30.**
   **FIXED the same day (`MIS-122`, baseline 843 → 779).** `HDR-009` no longer
   flags an empty `uid`, and `HDR-020` now advises emptying the field rather than
   the opposite. The 64 documents that were being counted as debt for obeying
   `STD-001` §6.2 are gone from the baseline, and **emptying the 34 written
   values no longer trades one violation for another** — that work is
   unblocked and still belongs to this mission.
   **No document should carry a `uid` value. Where one exists it is debt, not
   data; the field is declared and left empty. Emptying the 34 written values
   belongs to THIS mission.** The ruling restates `STD-001` §6.2 verbatim —
   *"the field is declared and left empty, Oracle decision, non-negotiable"* —
   so nothing new is being decided; what is new is that the guard does not
   agree with it.

   **The guard punishes the conforming form.** `HDR-009` fires on `uid:` written
   empty and says *"omit the field instead"*, which is the opposite of what
   the standard requires. **64 of those findings are documents doing exactly
   what `STD-001` §6.2 mandates.** The remaining 34 (`HDR-020`) are the real
   defect: hand-authored pseudo-UUIDv7 values, 2 of them colliding.

   **Measured, not assumed — and it sets the order.** Emptying a written
   `uid` today converts an `HDR-020` into a **new** `HDR-009` the ratchet rejects.
   Verified on `blueprints/AUDIT-numengames-2026-04-08.md` and reverted. The
   work is therefore blocked mechanically, not by preference:

   | | |
   |---|---|
   | `MIS-122` | fixes the `HDR-009` rule so the empty form conforms. **Must go first.** 64 findings vanish with the rule, not with any edit. |
   | This mission | empties the 34 values. Cannot start before that. |

   The split is not about who owns `uid` — it is that changing a rule and
   obeying a rule are different acts, and one must precede the other.

   Two numbers that disagree, for `MIS-122` to settle: `STD-001` §6.2 records
   **32** present, the guard finds **34**, and 100 tracked files carry the
   field.

   **Blind spot found while measuring:** the guard flags 98 of those 100.
   `README.md` and the superseded constitution (deleted, `ADR-041`) sat at the repository root and it never
   reaches them — worth registering against `D-025`, which requires a guard
   to declare what it cannot see.
2. **The debt series runs an undeclared status vocabulary.** 35 `open` +
   2 `resolved` against `type: documentation`, whose lifecycle is
   `[draft active closed]`. Adjacent to `D-008` and `D-012`.
   **Ruled: fix the entries, not the standard — `debt/` adopts the declared
   lifecycle.** `open → active`, `resolved → closed`. The vocabulary the
   series was already using informally becomes the one the standard names.
   No new lifecycle is minted. Check **B** below.
3. **The template family still emits violations.** Three files —
   `machine/templates/MIS-TEMPLATE`, `machine/templates/MIS-TEMPLATE-EXAMPLE`, `machine/templates/MIS-TEMPLATE-CHANGES` — produce
   **9 findings** between them, and every mission copied from them inherits
   the defects: `area:` retired (×2), placeholder dates that are not ISO
   times (×6), `type: standard` in `missions/` (×1).
   **Ruled: fix the templates first.** Otherwise the baseline refills from
   the template while it is being drained. Check **A** below — it goes
   before everything else for exactly that reason.

4. **`territory` has no working vocabulary — found 2026-08-30, unruled.**
   `STD-001` §7 declares eight values: `CAO · Product · Platform ·
   Infrastructure · Content · Sales · Funding · Archive`. The 67 documents
   already carrying `territory` use `Archive` ×48, `Canon` ×8,
   `Infrastructure` ×4, `Legal` ×3, `Governance` ×2, `Standards` ×2.

   **Four values in use are undeclared. Six declared values are used by
   nobody.** The overlap between the declared vocabulary and the practised
   one is two entries out of eight. Nothing catches this: `HDR-031` checks that
   the *key* `area` is retired, and no check reads the *value* of
   `territory` at all. §7 says *"a value not listed here is not valid.
   Adding one requires an ADR"* — so 19 documents are invalid by a rule
   nothing enforces.

   `area` is worse: 142 documents, 35 distinct values, of which 66 map to a
   declared `territory`, 43 are compound (`Platform / numinia-web`) and 33
   are orphans (`web` ×12, `Documentation` ×9, `Operations` ×5).

   **The consequence for scheduling is hard.** `HDR-031` is the largest single
   class (158) and the one that looked most mechanical, and it is blocked:
   migrating `area` into `territory` today pours 142 documents into a
   vocabulary that does not describe what the repository actually files. The
   destination has to be settled — by ADR, per §7 — before the migration is
   worth running. **This is the real content of `D-010`,** which says it is
   blocked on a decision and does not name it.

   *Needs an Oracle ruling: does the declared vocabulary change to match
   practice, does practice change to match the declaration, or does the
   compound case become two fields as §7 suggests?* Not answered here.

## Closure

*(Fill when the mission closes. Not before, and not with intentions.)*

- **What was done:** the baseline is gone. `machine/scripts/lint-frontmatter.mjs`
  at `4a60735` reports **0 findings (0 baselined)** — from 843 frozen
  violations at `fd4d045`. The mechanical classes went by script in the
  lots recorded above; the judgement classes went one by one across the
  missions/ normalisation (lots 1–4), the `decisions/` and `standards/`
  consolidations, and — decisively — the four deletion batches of
  2026-09-08 (#286, #289, #291, #293), which removed 115 mission files
  and with them every remaining HDR-002/HDR-008/HDR-030/HDR-031 the fragile pair
  carried.
- **What diverged, and why:** the last 44 were budgeted as a one-by-one
  session. They never got it: the documents holding them were deleted
  under `ADR-040` before anyone opened them. A violation in a file that
  no longer exists is not fixed, it is gone — the count is honest about
  that, the mission does not claim repair work it did not do.
- **Evidence:** `node machine/scripts/lint-frontmatter.mjs` → `0 findings (0
  baselined)`; `machine/scripts/frontmatter-baseline.json` empty; CI green on
  `main` at `4a60735`.
- **Closed:** 2026-09-08 · **by:** Oracle (instruction "ok hacerlas"),
  executed by Ursa.

## Status check — 2026-09-02

*Read against `203267c` during the missions/ normalisation (lot 4). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** Header baseline 844 → 44 (2026-08-30) → 21 today (frontmatter-baseline count). The 21 survivors: 12 HDR-030 + 4 HDR-031 + the Spanish-era pair (CAN-005, Sistema de Diseño). Closure block blank. in-progress, no started date.
- **Recommendation:** Keep in-progress; it is the live burndown and its Progress table is exact. Set started: 2026-08-30 (its own first commit) and add today's row (21). Closes when MIS-124 rules territory and the two Spanish headers are translated.

## Version history

- v1.3.0 (2026-09-02) — import-era `---` rules removed; retired identifiers repointed: C-005→CAN-005, P-013→PRO-013; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 4.
- v1.4.0 (2026-09-08) — closed: baseline at zero at `4a60735`; Closure filled; last checkbox ticked with the measurement.

---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-123"
uid: ""
title: "Make ADR-027 (formerly ADR-028) real: value checks, a TBA counter, and the vocabulary the guard never read"
status: done
priority: high
effort: M
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: null
completed: "2026-09-09"

# REGISTRO
type: mission
version: "1.1.0"
created: "2026-08-30T09:00:00Z"
created_source: "git:765ee27"
created_confidence: exact
updated: "2026-09-02T01:55:26+02:00"
author: "ursa"
owner: "oracle"
tags: [standards, frontmatter, guard, vocabulary, adr-028, tba]
license: "CC0-1.0"

paths: [machine/scripts/lint-frontmatter.mjs, standards/STD-001-glossary.md, standards/STD-004-the-header.md]
depends_on: [ADR-027, ADR-027 (formerly ADR-029)]
blocked_by: null
---

# MIS-123 — Make ADR-027 real

**Base:** `main` @ `fd4d045` · **Decisions:** `ADR-027`, `ADR-027`

## Why this mission exists

`ADR-027` was signed on 2026-08-30. It declares three forms of absence and
rules that a closed vocabulary without a check is not a vocabulary.

**Nothing in it changes what any machine does.** An ADR is a record, not a
mechanism. Until the checks below exist, the repository has a signed decision
that verifies nothing — which is precisely the failure `D-001` has been
describing since 2026-08-24.

This mission is the difference between deciding and enforcing.

## What is broken today

`STD-001` §7 declares five vocabularies **closed**. The guard verifies two.

| Field | Declared closed | Value check | Invalid values in the corpus |
|---|---|---|---|
| `type` | yes | **yes** (HDR-003) | — |
| `status` | yes | **yes** (HDR-004) | — |
| `guild` | yes | **no** | **14** |
| `territory` | yes | **no** | **15** |
| `type_execution` | yes | **no** | **5** |
| `visibility` | **never declared** | no | vocabulary does not exist |

Thirty-four documents carry values `STD-001` §7 calls invalid and **no
instrument has ever said so**. `guild` holds `Procuradores` ×8 — Spanish,
from before `ADR-023 (formerly ADR-024)` renamed the guilds.

`visibility` is the worst of the six: `web/src/lib/corpus.ts` decides **what
reaches the public site** by reading it, and its vocabulary was never written
down anywhere.

The shape of the failure, in database terms: the repository has `NOT NULL`
and no `CHECK` constraint.

## Deliverables

1. **Value checks for `guild`, `territory`, `type_execution`** in
   `lint-frontmatter.mjs`, reading the vocabularies from `STD-001` §7.
2. **`visibility` declared** in `STD-001` §7 with the values `corpus.ts`
   actually honours, then checked like the rest.
3. **A `TBA` counter**: every run reports `TBA` per field. It **must not
   fail** on `TBA` — it must display it. Debt that is visible is still debt,
   but debt that is invisible is a surprise.
4. **`TBA` requires an owner**: a document writing `TBA` names the mission
   that will resolve it. A `TBA` with no owner is a violation the day it is
   written.
5. **Blindness declared** per `D-025`: the guard states in its own output
   what it does not look at — starting with the repository root, which it
   has never scanned (100 files carry `uid`, the guard sees 98).

## Declared cost — the number goes up before it goes down

**Remeasured at `7fae24f`, 2026-08-30 — and it is cheaper than first written.**
The original estimate of ~34 was made against a guessed guild vocabulary; the
real one is `STD-001` line 957, four guilds only: `Sentinels · Alchemists ·
Exegetes · Procurators`.

| Field | Values in use | Invalid | What they are |
|---|---|---|---|
| `guild` | 190 | **14** | `Procuradores` ×8 (Spanish), `alchemists` ×4 (lowercase), `procurators` ×1, 1 with a trailing comment |
| `type_execution` | 106 | **6** | `híbrido` ×3, `technical`, `técnico`, 1 with a trailing comment |
| `territory` | 70 | **16** | see below — the vocabulary is the suspect, not the documents |
| `visibility` | 41 | — | `public` ×40, `restricted-oracle` ×1; **no vocabulary declared at all** |

**543 → ~563 for `guild` + `type_execution`, then down.** Anyone reading the
counter without this paragraph will think the repository got worse on the day
it started telling the truth.

### `territory` is blocked on a decision, not on code

`STD-001` line 964 declares `CAO · Product · Platform · Infrastructure ·
Content · Sales · Funding · Archive`. **Actual use barely overlaps:** `Archive`
×50 and `Infrastructure` ×4 are the only declared values in service, while
`Canon` ×8, `Standards` ×3, `Legal` ×3 and `Governance` ×2 are used and
undeclared.

Turning the check on as written would mark **16 documents wrong when the more
likely error is the vocabulary**. Held for the Oracle: either the four
in-service values join `STD-001` §7, or the 16 documents are migrated. This
mission does not decide it.

## Acceptance

- [ ] `guild`, `territory`, `type_execution` rejected on invalid values, both
      directions tested per `PRO-013` §1
- [ ] `visibility` vocabulary declared in `STD-001` §7 and checked
- [ ] `TBA` counted per field in the summary line, never fatal
- [ ] A `TBA` without a named resolving mission is a violation
- [ ] The guard prints what it is blind to
- [ ] Baseline re-banked with the new findings, and the jump explained in the
      commit message

## What this mission does not do

It does not decide the `territory` vocabulary. That is `D-010`, and `TBA`
exists precisely so the migration is not blocked on settling it. Four values
in use are undeclared; six declared values are unused.

## Closure

- **What was done:** Verified against `origin/main` @ `6331f4c` (mission-purge
  audit). Criteria 1, 3 and 4 were already live before this closure:
  `guild`/`territory`/`type_execution` value checks (`HDR-033`, `HDR-036`,
  `HDR-034`), the `TBA` counter (never fatal), and `TBA`-requires-an-owner
  (`HDR-032`) all run in `machine/scripts/lint-frontmatter.mjs`, confirmed by running
  it live (`0 findings, 0 baselined`). Criterion 5 (blindness declared) is
  present in the guard's own `BLIND TO (D-025)` output. Criterion 2
  (`visibility` vocabulary) was found declared in `STD-016` §"Header fields"
  (`public` · `restricted-oracle`) rather than in `STD-001` §7 as this
  mission's deliverables specified — a different document than named, but
  the vocabulary exists and is checked (`HDR-035`). Criterion 6 (baseline
  re-banked) was performed as part of this same audit's reference-lint pass.
  The `territory` decision this mission explicitly deferred (§"blocked on a
  decision, not on code") was resolved separately by MIS-124's closure in
  the same audit: the corpus converged on the eight declared values by
  attrition (76 `TBA` in August → 0 today), so no vocabulary amendment was
  needed.
- **What diverged, and why:** The mission named `STD-001` as `visibility`'s
  home; it actually lives in `STD-016`. Not corrected here — the check
  works, the citation in this closure note is accurate, and moving prose
  between standards is out of this closure's scope.
- **Evidence:** `node machine/scripts/lint-frontmatter.mjs` → `lint-frontmatter: 0
  findings (0 baselined) — no new violations — the ratchet holds`, no
  `deferred values` line (zero live `TBA` in `territory`, confirmed by
  `telemetry.missions.territory_tba = 0`).
- **Closed:** 2026-09-09 · **by:** ursa (mission-purge audit, Oracle-approved)

## Evidence

Measured on `main` @ `fd4d045`, 2026-08-30. Counts of invalid values per
field come from comparing each document's frontmatter against the lists in
`STD-001` §7; the `null` census (`completed` ×37, `assigned_to` ×24 = 61
documents, zero baseline entries) is what `ADR-027` legalises.

## A mission can be conformant or visible, not both — RESOLVED 2026-08-30

> **Fixed in `ec4c968` (PR #129). Kept here because it is the evidence, and
> because it is why anyone looked.** `todo` is now a first-class column and
> **57 missions** that were invisible on numinia.org are rendered, these three
> among them. Verified against the built HTML, not the source: the cards carry
> `data-status="todo"`, and `astro build` produces 673 pages.

The defect, as found: `STD-001` §9 declares `todo` a valid mission status, so
this mission carries it. **`web/src/views/MissionsView.astro` never rendered
it:** `COLUMN_ORDER` was `["in-progress", "in-review", "backlog", "done"]`,
and only `draft` was mapped into a column (line 71, into `backlog`).

`MIS-121`, `MIS-122` and this mission were therefore **absent from the mission
board on numinia.org** while being perfectly valid documents. The alternative
— writing `backlog` — is a retired status and adds an `HDR-004` finding.

This was `D-009` seen from the other side: the board was built around the
vocabulary the standard retired, so conformance and visibility pointed in
opposite directions. **The fix went to the code, not to the documents** —
writing `backlog` into 50 files would have been correcting the corpus to suit
a bug, and would have added 50 findings to do it.

**How it was found matters more than the fix.** The Oracle's instruction that
the Mission Board is where Numinia's history lives sent this work to
`missions/` in the first place; the defect surfaced on the way. Nothing in the
guards would have caught it — no check reads the web layer. That gap is still
open.

## Status check — 2026-09-02

*Read against `203267c` during the missions/ normalisation (lot 4). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** Its first criterion is done by reality: HDR-033…HDR-036 vocabulary checks are live in lint-frontmatter.mjs (VOCAB_CHECK) and HDR-032 checks TBA ownership. Remaining: visibility vocabulary in `STD-001` (mission status), TBA counter in the summary line, baseline re-bank. Depends on ADR-027 (resolves).
- **Recommendation:** Keep todo, re-scope to the three remaining criteria; tick the first two from the guard's own source (form). Small.

## Version history

- v1.1.0 (2026-09-02) — retired identifiers repointed: P-013→PRO-013; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 4.

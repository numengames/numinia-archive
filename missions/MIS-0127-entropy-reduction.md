---
id: "MIS-127"
uid: ""
title: "Entropy reduction: fewer documents, one vocabulary, registers that die"
status: done
priority: high
effort: XL
guild: "Alchemists"
territory: "Archive"
assigned_to: null
started: "2026-08-30"
completed: "2026-09-09"

type: mission
version: "0.10.0"
created: "2026-08-30T18:50:00Z"
created_source: "git:77e6086"
created_confidence: exact
updated: "2026-09-04T21:35:00+02:00"
author: "ursa"
owner: "oracle"
tags: [entropy, consolidation, debt, standards, reduction]
license: "CC0-1.0"

related: ["ADR-030", "ADR-036", "P-010", "MIS-125", "MIS-121"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Entropy reduction: fewer documents, one vocabulary, registers that die

> **Summary:** The umbrella mission for the 2026-08-30 reduction line:
> folder by folder, merge what says the same thing, extinguish what is
> done, measure every cut in tokens.
> **Epistemic:** What was cut, where it went, and what each cut measured.
> **Pragmatic:** The running ledger for the reduction; each PR lands here.
> **Audience:** Agents · Oracles

## Mandate (Oracle, 2026-08-30)

Reduce the system's uncertainty: too many documents, overlapping
registers, divergent vocabularies. Work folder by folder, decisions one
at a time, missions kept short. Every removed document is measured in
tokens (cl100k_base). Baseline census at `eb2d8f4`: **328 md files,
570,202 tokens** (original figure, method not preserved).

**2026-08-30 · re-measurement note (ursa, on Oracle instruction to
verify, not assume):** a same-method re-count at `eb2d8f4` — every
tracked `.md` file except `.github/`, `git show <rev>:<path>` piped
through `tiktoken.get_encoding("cl100k_base")` — gives **575,958
tokens**, not 570,202 (1.0% over, 5,756 tokens). The census script that
produced the original figure is not in the repo and could not be found;
the gap is not explained (a frontmatter-exclusion hypothesis was tested
and rejected — it undercounts by 54K, the wrong direction). Flagged, not
silently corrected: the ledger below uses the **575,958 re-measurement**
as its baseline, consistently, so every delta in this table is
same-method start-to-finish. Anyone auditing against the original
570,202 will see a ~1% base offset that is not this mission's doing.

## Ledger

| # | PR | What | Docs | Tokens (re-measured, cl100k_base, same method throughout) |
|---|---|---|---|---|
| 1 | [#145](https://github.com/numengames/numinia-nwos/pull/145) (merged) | Root norms into `standards/`: GOVERNANCE moved+absorbed §7F/§9; STANDARDS superseded to a map; D-003 ruling; ARC-006 commit types | −1 active norm, 0 files | **−2,401** |
| 2 | [#146](https://github.com/numengames/numinia-nwos/pull/146) (merged) | ADR-030 debt extinction; nine closed/de-facto-resolved entries extinguished; INDEX backfill ADR-027..030 | −7 files | **−8,903** |
| 3 | [#147](https://github.com/numengames/numinia-nwos/pull/147) (merged) | ADR-026 (formerly ADR-031): LD-NNN dissolved into D-042..046 (tag `legal`), 404→D-040/041, GAPS frozen to reports/, C-005 v1.3.0 amended | +6 files | **+2,422** (root register genre extinct; live text kept, restructured into more, smaller files — a document-count win with a token cost) |
| 4 | [#148](https://github.com/numengames/numinia-nwos/pull/148) (merged) | Five DEC entries (001,002,003,005,006) retired as superseded, one-line succession banners; decisions/ down to one living series (ADR) | 0 files | **+418** |
| — | [#149](https://github.com/numengames/numinia-nwos/pull/149) (merged) | *Not a reduction PR* — MIS-128 link hygiene fix, listed here only because it touched a mission `.md` (frontmatter timestamp fix) | +1 file | +1,330 (not part of this line; MIS-128's own scope) |
| — | [#150](https://github.com/numengames/numinia-nwos/pull/150) (merged) | *Not a reduction PR* — MIS-120 closure documentation | 0 files | +1,167 (MIS-120's own closure, not this line) |
| — | [#151](https://github.com/numengames/numinia-nwos/pull/151) (merged) | *Not a reduction PR* — MIS-128 closure documentation | 0 files | +788 (MIS-128's own closure, not this line) |
| — | [#152](https://github.com/numengames/numinia-nwos/pull/152) (merged) | *Not a reduction PR* — this mission's own ledger correction (re-measurement note + #148 backfill) | 0 files | not separately measured (self-referential, see note above) |
| 5 | #153 (pending) | ADR-030 (formerly ADR-032): `blueprints/` joins the operational series (extends ADR-030/PRO-010 §5); six April blueprints extinguished (BP-repo, BP-web, BP-misiones, BP-datos, BP-infraestructura — foundation decisions DEC-001/002/003/005 all superseded; BP-cao-overview — losing side of OPS-002 CON-001, now resolved); `BP-financiero` kept active per prior Oracle ruling, one dead cross-reference removed | −6 files, +1 file (ADR-030) = **−5 net** | **−1,561** (−3,698 removed + 2,015 new ADR + 128 net edits to PRO-010/OPS-002/BP-financiero) |
| — | [#155](https://github.com/numengames/numinia-nwos/pull/155) (merged, squash `e8571cb`) | *Not a reduction PR* — MIS-125 Stage A: ADR-004/ADR-005 v1.1.0 (13-series register, `agents/` reversal formalized), P-010 v0.4.0, D-008 v2.0.0 (re-measured), D-024 closed (v1.2.0), `check-references.mjs` extended to the new register + bare-filename citations. Detail in `MIS-125` itself, not duplicated here. | 0 files (frontmatter/content edits only) | not measured — not a reduction PR |
| — | [#156](https://github.com/numengames/numinia-nwos/pull/156) (merged) | *Not a reduction PR* — MIS-125 Stage A mission-log rescue (a commit pushed after #155's squash-merge, orphaned on the closed branch, cherry-picked here) | 0 files (content edits only) | not measured — not a reduction PR |
| — | [#157](https://github.com/numengames/numinia-nwos/pull/157) (merged) | *Not a reduction PR* — MIS-125 Stage B pre-work: D-008 v2.1.0 (the superseded constitution excluded as apparatus, `debt/D-001` extinguishment recount) | 0 files (content edits only) | not measured — not a reduction PR |
| — | [#159](https://github.com/numengames/numinia-nwos/pull/159) (merged) | *Not a reduction PR* — D-001 closure (this mission, see "Debt extinguished" below): wired yaml/naming CI guards, added HDR-037/HDR-038 | +1 file (`machine/scripts/lint-naming.mjs`) | not measured — not a reduction PR |
| — | [#160](https://github.com/numengames/numinia-nwos/pull/160) (merged) | *Not a reduction PR* — D-002 closure (this mission, see "Debt extinguished" below): `blocked_reason` retired | 0 files (content edits only) | not measured — not a reduction PR |
| — | [#161](https://github.com/numengames/numinia-nwos/pull/161) (merged, `534e25e`) | *Not a reduction PR* — MIS-125 Stage B: `machine/scripts/rename-series.mjs` built and dry-run tested (6 real bugs caught, incl. a CodeQL regex-injection fix); D-008 v2.2.0 (`debt/D-002` extinguishment recount, discovered via this PR's own dry-run count mismatch). Detail in `MIS-125` itself. | +1 file (`machine/scripts/rename-series.mjs`) | not measured — not a reduction PR |
| 6 | #TBD (this PR) | **`decisions/` consolidated 16 → 7 by theme.** Nine identifiers absorbed (ADR-002/003/DEC-001→ADR-001; ADR-024→ADR-023; ADR-031→ADR-026; ADR-028/029→ADR-027; ADR-032/033→ADR-030), `INDEX.md` deleted (the site derives its index from the collection). ADR-030 v3.0.0 defines **absorption** and amends `STD-001`; `check-references.mjs` reads the new `absorbs:` field so absorbed IDs keep resolving; 18 URLs 301 to their absorbing record, not to the section index | −10 files | **−19,996** in `decisions/`, +715 across 47 files for the citation rewrite = **−19,281 net** |

| 7 | [#190](https://github.com/numengames/numinia-nwos/pull/190) (merged) | **`canon/` consolidated 12 → 7, one series, one regime.** `C-` renamed to `CAN-` (eight `N-04` violations closed); the two dated documents ruled NOT frozen artifacts and entered the series as `CAN-006`/`CAN-007`; `C-007` merged verbatim into `CAN-003`; `C-006 Session Zero` moved to `numinia-lore` (`ADR-035` — game design, not governing canon); the three apparatus files (index, readme and the lore sheet) retired, the index's historical record inherited by `ADR-036` §6 and the lore lines folded into `SYS-003`'s frontmatter (the `canonLore` collection is gone). `REUSE.toml` corrected to `CC0-1.0`: the documents were first published under the CC0 root licence in April 2026, four months before the reserved regime, and a CC0 grant is irrevocable — same fault `ADR-026` fixed for `agents/**`. ⚠️ `ADR-004` rule 4 suspended by Oracle ruling (`CAN-006`/`007` reuse burned numbers) until `uid` is populated | −4 files | **−9,043** in `canon/` (−9,835 retired, +792 the merge), +4,391 `ADR-036`, +427 across citations, guards and web = **−4,225 net** |

| 8 | [#192](https://github.com/numengames/numinia-nwos/pull/192) (merged) | **`operations/` flattened, renamed to `OPS-`, 10 → 9.** The two subfolders retired: `legal/` and `strategy/` were never organisation, they were **licence regime** carried by path (`DBT-005`). The regime is now pinned per-file in `REUSE.toml` — the mechanism `STD-003` already used — so the three reserved documents keep `LicenseRef-Numen-AllRightsReserved` with no widening, verified by `check-license-frontmatter`. `O-` renamed to `OPS-` (`ADR-005` v1.1.0), closing **62 baselined `N-04` violations** and emptying `operations/` from the naming baseline. `security-policy.md` + `credential-map.md` merged into `OPS-009`: one subject split in two, each pointing at the other, both carrying `registration: exempt` for `pending-genre-ruling` (`D-024`) — the merged document enters the series as the `type: protocol` both already declared. 13 redirects; 10 citations in closed records baselined, not rewritten (`PRO-010` §3.4). | −1 file | **−85 net** — the merge preserved both documents' content verbatim, so the saving is the removed apparatus (one header, two cross-references), not prose. **This entry is not a reduction and should not be read as one:** its value is structural (one level, one series, one regime per file), and the ledger records it at its true weight rather than inflating it |
| 9 | [#193](https://github.com/numengames/numinia-nwos/pull/193) · [#194](https://github.com/numengames/numinia-nwos/pull/194) · [#195](https://github.com/numengames/numinia-nwos/pull/195) (merged 2026-09-01/02) | **`reports/` flattened, one series, `AUD-`/`PROP-` retired (`ADR-005` v1.2.0).** Four active documents gave three answers to "how is a report named"; the norm was settled first (#193), then 45 files moved once each: 11 `AUD-` + 3 root files → `RPT-003`…`RPT-016` by `created`, 8 dailies kept `RPT-YYYY-MM-DD` (`ADR-004` r.3), annex → `reports/evidence/RPT-011/`, `INDEX.md` deleted, 3 evidence `.py` → `machine/scripts/experiments/` (MIT, DBT-005), the deleted-canon text → `history/`. `reports/audits/` and `reports/daily/` gone. Naming baseline 155 → 135, frontmatter 32 → 21, `count-evidence` reports 0/22 → 24/24. Web (#195): one head — `pages/reports.astro` + five `daily-*.astro` (41.7 KB of hand-written Spanish copies, the `PRO-010` §2 "hardcoded today — MIS-065" note) and `pages/audits/*` deleted, −1,059 lines; `/audits*`, `/reportes/*`, `/corpus/reports/*` redirect to `/reports/*`, one hop; 616 → 616 public URLs, 0 dead, verified on numinia.org after deploy. Prose-in-code ratchet (`MIS-071`): 69,737 → 58,758 chars (−10,979; five daily copies were the largest single item); re-frozen in #196, which #195 forgot. | 0 files net (−1 `INDEX.md`, +1 `evidence/README.md`) | **+8,533** — *not a reduction*: +4,897 is `RPT-002` (filed as written that morning, not this line's text), +1,254 `ADR-005` v1.2.0, +453 `STD-001`, +311 `DBT-001`, +271 `PRO-010`, +396 the frozen-artefact header on the recovered canon, ~+70 × 14 `former_id` notes; −618 `INDEX.md`. The value is structural (one rule, one folder, one evidence convention), recorded at that weight. |
| 10 | [#198](https://github.com/numengames/numinia-nwos/pull/198) (open) | **`missions/` normalised in four lots.** 134 files → `MIS-0NNN-<slug>` (id unchanged, ADR-005 v1.1.0 as MIS-0129 read it); `MIS-115a/b` and the closure-guard proposal registered as `MIS-132…134`; `uid` declared, `CC0-1.0` on the shelf (REUSE.toml), `mission_id` retired, `owner`/`created_source` completed; 37 import-era placeholder cards filled from each brief's own text, 85 inline attribute lines removed, 8 retired assignees nulled; 55 live missions carry a dated `Status check` (evidence + recommendation, status untouched); `MIS-135` opened with 20 out-of-scope findings. | 135 mission files + 6 norms + 3 guards | measured at merge |
| 11 | #TBD (this branch) | **`debt/` extinguished in full — 12 → 0 files, by Oracle instruction (2026-09-04), against Ursa's recorded dissent.** `RPT-001` (2026-08-30) had already reduced 39 → 12 by the same test ("does this answer a live question no other document answers") and closed with a documented rationale; this round overrides that closure without a stated counter-argument on the twelve survivors' individual merits — recorded here, not litigated. 229 pre-deletion citations across 30 live documents measured (`git grep DBT-NNN`); left as historical citations of a retired register (`RPT-001` §6 precedent: citations of an extinguished ID are not rewritten, they baseline) rather than rewritten, **except** two guard-data files whose entries are structural, not prose (`machine/scripts/blind-spots.json` — 2 stale `debt:` pointers nulled) and one prose sentence each in `README.md` and `web/astro.config.mjs`'s redirect comments. `web/astro.config.mjs`: 27 `/corpus/debt/*` redirects re-pointed from the twelve `dbt-NNN` slugs to `/corpus/debt` (the register index — same target `RPT-001` used for its own extinguished entries), so no URL dies. `machine/scripts/references-baseline.json`: 802 → 881 (+79, all citations of the twelve now-nonexistent IDs, frozen rather than silently green). **Eight in-flight missions (`MIS-136/137/139/140/141/145/150` + `MIS-131`) still have their entire scope written as "close DBT-NNN" and were left untouched** — their acceptance criteria now reference a file that does not exist; that is a second decision (rewrite eight live mission bodies) this instruction did not cover and is flagged separately, not taken unilaterally. Guards green: `check-references` (0 new broken, baseline banked), `lint-frontmatter` (21→0 baselined findings, the debt files were the only carriers), `check-url-lifecycle` (659 URLs, 0 dead), `check-orphan-content`, `check-internal-links` (13,945 links, 662 pages), `npm run build` — all exit 0. | −12 files | **−37,576** (deleted) **+227** (3 citation-repoint files) = **−37,349 net** (`cl100k_base`, MIS-127 method) |
| 12 | [#249](https://github.com/numengames/numinia-nwos/pull/249) (open) | **Deliberation and per-file version histories retired across the doctrinal layer — 0 files deleted, 999 lines removed.** A decision record is read for what was decided, not for how the decision was reached: once a ruling is executed into a standard, the argument that produced it is weight on every reader's path. Block A retired `Context` / `Alternatives discarded` / `Consequences` from ten ADRs (−4,207 words). Block B retired 21 hand-maintained version histories outside `decisions/` (−4,802 words; `STD-008` alone was 2,431 of them) — sixteen were not mirrored in `CHANGELOG.md`, so this trades a ledger nobody validated for `git log`. Block C repaired 18 dead-prefix citations in live normative prose (the retired `P-` protocol prefix repointed to `PRO-`, the old glossary and licensing prefixes to their current homes); block D corrected 3 present-tense figures nothing measures (`history/2026_09_08-Superseded_Constitution-v2.0.0.md` "228 documents", `OPS-001` "54 missions"/"the 9 foundational documents", `SYS-002`'s April snapshot, now dated and pointed at the instrument). **Not removed, deliberately:** `ADR-005` v1.1.0/v1.2.0 (the original plan was to absorb `ADR-005` into `STD-001` entirely — `lint-naming.mjs`, `lint-frontmatter.mjs` and `lib/rules.json` cite those amendments by rule number in twenty places, so they are live authority, not a record of a past debate); `CAN-002` §History (flagged by section name, cleared by reading it — it is the brand origin story, not a changelog); the five ADR histories recording an absorption (they stay resolvable via the `absorbs:` frontmatter field, verified on all five); `STD-006` `TXT-001`…`TXT-011` and `OPS-002` `CON-001`…`CON-006` (local numbering, not citations); figures recording what a past change moved (`ADR-036` "383 → 379"); and `D-NNN` debt citations, which have no live target since the register was extinguished in entry 11 above — rewriting them is a content decision, not a rename. **Uncovered by the rename:** `SYS-001` listed nine protocols and five of them have no file — agent onboarding, inter-agent communication, session close, context load and mission briefing. The dead prefix had been hiding it from `check-references`: an unresolvable identifier in the retired scheme reads as legacy, the same identifier in the live scheme reads as a bug. `BLU-002` was measuring protocol compliance against the session protocol plus a session-close protocol that does not exist, so half that metric pointed at nothing. Both now describe the seven protocols that exist. Also fixed four pre-existing `STD-007` violations in `STD-001`, unseen because `check-plain-writing.mjs` is **not wired into `ci.yml`** (flagged, not fixed here). Guards green, all eleven `ci.yml` steps run locally in pipeline order: `check-references` (**57 previously-broken references now resolve**, 0 new), `check-plain-writing` (340→269, 0 new), `lint-naming`, `lint-frontmatter`, `check-frontmatter-yaml`, `check-frontmatter-delimiter`, `check-license-frontmatter`, `telemetry --check` + self-tests, `npm run build` (289 pages), `check-orphan-content`, `check-url-lifecycle` — all exit 0. | 0 files | **−16,297** (−16,338 retired, +41 added; `cl100k_base`, MIS-127 method, measured `origin/main`→HEAD) |

**Reduction-line total (PRs #145–148, #153, #190, #192): −33,616 tokens,
−21 files net**, against
the 575,958-token re-measured baseline. The four non-reduction closures
(#149–152, +3,285 tokens combined, #152 not separately measured) are unrelated mission
paperwork that happened to land in the same window — real, necessary, and outside this
ledger's mandate, not netted against it.

**Cumulative repo state before #153: 328 files, 570,779 tokens** (per #152's
measurement). **After #153 lands: 323 files, ≈569,218 tokens** — a projected
net −6,740 from the 575,958 re-measured baseline.

**Measured at #190's base (`3b570ee`): 268 files, 549,435 tokens; at its head
(`f42b4f3`): 264 files, 545,210 tokens.** Same method as the re-measurement
above — every tracked `.md` except `.github/`, `git show <rev>:<path>` through
`cl100k_base`. Note the census population differs from the 328-file figures
above: those counted a repository that still held the `decisions/`,
`blueprints/` and `debt/` documents this line has since retired.

## Open decision queue (one at a time, Oracle signs each)

- Freeze April-era commercial missions (MIS-017..050 todo, ~40 docs).
- ~~Freeze April blueprints nothing invokes (20 active, ~160K chars).~~
  **Partially resolved by ADR-030/#153**: 6 of 16 tracked blueprints
  extinguished (foundation decisions dead, or losing side of a resolved
  contradiction) — `BP-repo`, `BP-web`, `BP-misiones`, `BP-datos`,
  `BP-infraestructura`, `BP-cao-overview`. `BP-financiero` confirmed
  staying active (depends on pending missions, not a dead decision —
  still folds into the point below). The remaining 9 blueprints
  (`BP-cao`, `SYS-001`, `SYS-003`,
  `BLU-002`, `the Mission System v2 record`,
  `BP-numengames-improvement-roadmap`, `BLU-008`,
  `SYS-002`, `BLU-007`) were not evaluated
  against the extinction criterion — out of scope for #153, still an
  open question if the Oracle wants them reviewed. `blueprints/INDEX.md`
  (last touched 2026-04-07, lists 3 of 16) remains stale — not fixed.
- Single status vocabulary across every series (STD-001).
- **MIS-125 prefix register execution — started 2026-08-31.** Stage A
  (normative docs, PR #155+#156) merged. Stage B (rename tool, PR
  #157+#161) merged — `machine/scripts/rename-series.mjs` built, dry-run tested,
  6 real bugs caught. **Blocked before Stage C**: `P-010` §3.2 vs `D-008`
  conflict over 5 frozen-artifact/legacy-dated files — Oracle ruling
  pending. Detail in `MIS-125` itself, not duplicated here.
- protocols/ ↔ standards/ merge assessment.
- **`operations/` — surveyed 2026-09-01 (ursa); `uid` added, nothing else
  executed.** 10 files, 21,739 tokens, two subfolders (`legal/`,
  `strategy/`). The Oracle's instruction is that territory becomes a
  **frontmatter tag, not a folder**. `uid: ""` added to all 10 headers, declared and empty
  per `STD-001` §6.2 / `HDR-020`, positioned after `id` as everywhere else.
  `operations/` was the only governed series at 0 % coverage while `canon/`,
  `decisions/`, `protocols/`, `standards/`, `debt/` and `system/` were at
  100 %. Ring audit run at the same time: **Ring 1 is complete in all 10**
  (id, title, type, status, version, created, updated, license), Ring 3
  carries no unregistered field, and the four `type`↔series mismatches
  (`credential-map`, `security-policy`, both `legal/` texts) are recorded in
  the linter's `SETTLED_ELSEWHERE` with a written reason rather than parked
  in a baseline. `provenance` is absent in 8 of 10 and was **deliberately
  not filled**: `HDR-012` only validates the value when present, the field
  exists in just 3 of 267 documents repo-wide, and inventing authorship to
  satisfy a field nobody enforces is the failure mode `D-021` exists for.
  Survey findings, in descending order of how much surprise they carry:
  1. **`territory` is absent from all 10 files.** The field is registered in
     `STD-001` (it replaced `area`) and is in use in 351 documents elsewhere,
     with a closed 9-value vocabulary. `operations/` uses folders instead.
     Tagging is additive and reversible — it can be done before any move.
  2. **The two subfolders carry the licence regime.** `REUSE.toml` gives
     `operations/legal/**` and `operations/strategy/**`
     `LicenseRef-Numen-AllRightsReserved` **by path**, while `operations/**`
     is CC-BY-4.0. Flattening the folders silently relicenses four reserved
     documents to open. This is exactly the mechanism registered as `DBT-005`,
     which the Oracle left open as an unresolved design question on
     2026-08-25 with no closing proposal. **`DBT-005` gates the flattening;
     the tagging does not depend on it.**
  3. **`web/src/pages/legal/[slug].astro` maps Spanish URLs to filenames by
     hand** (`terminos`/`privacidad` → `o-004`/`o-003`). A rename breaks the
     two public legal pages, and no guard covers it — the page throws at
     build, so CI would catch it, but only after the fact.
  4. **`O-` should be `OPS-` and the guard already says so**: 10 of 10 files
     are baselined `N-04` violations. Note that `ADR-005` rule 4 (2026-08-24)
     *rejected* `OPS-`; its own v1.1.0 amendment (2026-08-31, `MIS-125`)
     reinstated it. The live register is the amendment. 165 citations of
     `O-00N` exist outside `operations/`, concentrated in `PRO-001` (13),
     `AUD-2026-08-26` (11) and `PRO-003` (10).
     **The rename belongs to `MIS-125` Stage C, not here** — that mission owns
     the tool, the risk order and the per-series commits. Dry run recorded
     2026-09-01 (`node machine/scripts/rename-series.mjs --dir operations --to OPS
     --from O`, nothing written): 8 files planned, `credential-map.md` and
     `security-policy.md` correctly skipped as `registration: exempt`.
     **A defect was found in that dry run and must be fixed before any
     `--apply` on this series:** the tool locates citations with
     `git grep -Fl`, which is case-sensitive, but
     `web/src/pages/legal/[slug].astro` and `[slug].md.ts` cite the two legal
     basenames in **lowercase** (`ops-003-privacy-policy-numengames`) as hand-
     written slug values. The tool would not see them, would not rewrite
     them, and `getEntry` would throw at build — taking `/legal/terminos` and
     `/legal/privacidad`, the two public legal pages, down with it. `guilds/`
     did not surface this because no `.astro` hand-maps guild filenames.
     Filed here rather than acted on, because the tool is `MIS-125`'s.
  5. **`OPS-001-continuity.md` is not an operational document.** It is a dated
     audit report of a resilience test on the Nimrod agent ("If Nimrod
     disappears tomorrow", before/after scores). Genre question, so per
     `STD-001` §3 it needs a ruling, not a move inside a refactor — the same
     bar already applied to `security-policy.md` and `credential-map.md`.
  6. **`OPS-008-session-state.md` contradicts its own usage rule.** It declares
     "rewritten at the close of every session"; its content is the state of
     the 2026-08-18 session and its last real commit is 2026-08-30. A file
     that promises to be current and is not is worse than no file.
  7. **`operations/security-policy.md` and root `SECURITY.md` share a name
     and do not share a subject** — internal rule (what never enters the
     repo) versus external disclosure policy (how to report a
     vulnerability). Not duplicates; the collision is in the name only.
  8. **`simulations.astro` and `solutions.astro` (736 lines) re-type the
     content of `OPS-005`/`OPS-006` with zero collection reads.** Verified
     2026-09-01: the numbers still agree (29/31/23/17, n=100). Latent
     divergence, not yet actual — recorded now so the claim stays honest.
- **New, opened by #153:** freeze the April commercial missions that
  `BP-financiero` depends on (MIS-021/031/034/048) — same mandate as
  the first bullet, now with a named blocking dependency.

## Debt extinguished by this mission (ADR-030)

**D-001 — "The glossary declares rules that no machine verifies" — closed
2026-08-31.** Remeasured against `main` against its original 2026-08-24
table (2/11 rules `[CI]`) and found the table itself had gone stale, not
just the repo: `guild`/`territory`/`type_execution` were already covered
by HDR-033/HDR-034/HDR-036 (added 2026-08-30, unrelated work) with nobody updating
D-001 to say so. What this closure actually did:

1. Wired `check-frontmatter-yaml.mjs` into `ci.yml` — existed since `D-039`,
   ran nowhere, no argument for the gap.
2. Built `machine/scripts/lint-naming.mjs` (N-01…N-05: root-level filenames must
   be all-uppercase, no
   version/date in a living filename, frozen-artifact shape, series scheme
   per `ADR-005` v1.1.0, kebab-case slug). 266 pre-existing violations
   frozen in `machine/scripts/naming-baseline.json`, same ratchet pattern as
   `lint-frontmatter.mjs` — shrinks as Stage C lands renames, never grows.
3. Added HDR-037/HDR-038 (`priority`/`effort` closed vocabularies) to
   `lint-frontmatter.mjs` — zero new violations on adoption, every live
   value already conformed, only the instrument was missing.
4. Confirmed `lint-type-vs-folder.mjs` was never a fourth script: it was
   already merged into `lint-frontmatter.mjs` as HDR-017 before D-001's table
   was written. Its row now states the real scope — strict on 8/11 types,
   argued `[MANUAL]` on `documentation`/`meta` per `STD-001` line 448 — instead
   of implying total coverage.

**Eleven of eleven rules in `STD-001`'s table now carry `[CI]` or an argued
`[MANUAL]`.** Verified live: `node machine/scripts/lint-frontmatter.mjs` and
`node machine/scripts/lint-naming.mjs` both report `no new violations — the ratchet
holds` against `main` at closing time.

**Not resolved by this closure** (declared per D-025, not silently
carried): `lint-naming.mjs` checks slug shape, not slug language — a
Spanish slug in valid kebab-case still passes. Neither guard verifies a
timestamp is *true*, only well-formed. The 266-entry naming baseline and
44-entry frontmatter baseline are real debt this closure does not pay —
closing D-001 means the archive can no longer lie about verifying itself,
not that every document already conforms. Paying the baselines down is
Stage C's job.

Full text of the closed entry is in git history: run
`git log --follow -- 'debt/D-001*'` to recover it.

**D-002 — "`blocked_reason` is orphaned: the status it explained no longer
exists" — closed 2026-08-31.** The entry's own OPEN QUESTION (does a
blocked mission need a field distinct from `frozen`/`freeze_reason`, or is
`blocked_reason` a duplicate?) was already answered by usage, not by a new
ruling: of 8 carriers measured 2026-08-25, 7 were `null` and the one
substantive value (`MIS-052`, "PC in transit — pending physical arrival")
sat on a mission that was never `frozen` — `status: todo`, waiting on an
external event, not deliberately paused. That is not what `freeze_reason`
is for either; it moved to body prose instead, during the mechanical
header-burndown phase (`machine/scripts/phase2-mechanical.py`, 2026-08-30, value
preserved in `machine/scripts/phase8-retired-values.txt` so it wasn't lost in
silence). Verified 2026-08-31: **zero live `blocked_reason` occurrences**
in any frontmatter, corpus-wide (`git grep`) — the migration this entry
called for had already happened, only the debt entry and two `STD-001`
citations hadn't caught up. Closure per option 1 of the entry's own text
("retire it"): `HDR-031` (added 2026-08-30, unrelated work) already guards
the field against regression, corpus-wide, in CI — so this closure adds no
new guard, only stops the archive from citing an open question that
usage had already settled. `STD-001` §6 and §7 updated to state the
retirement instead of pointing at an active entry; `debt/D-021`'s
citation of the file (a historical audit table, not a live reference)
updated to describe the closure rather than link a deleted path.

Full text of the closed entry is in git history: run
`git log --follow -- 'debt/D-002*'` to recover it.

## Done when

The Oracle declares the reduction line closed. Each PR in the ledger
records its own token delta; this mission is the sum.

**Closed 2026-09-09, by Oracle instruction** (mission-purge audit). Twelve
ledger rows executed across `standards/`, `decisions/`, `canon/`,
`operations/`, `reports/`, `missions/` and `debt/` (rows 1–11 merged; row 12
open as PR #249 at close time). Cumulative measured reduction: **−33,616
tokens, −21 files net** against the 575,958-token re-measured baseline
(rows 1–4, 6, 7 — the only rows carrying a same-method token delta).
Non-numeric structural wins (rows 8, 9) and non-reduction closures are
recorded in the ledger, not summed into that figure — see the ledger's own
per-row caveats. The open decision queue (April missions, blueprint
review, single status vocabulary, `protocols/`↔`standards/` merge, the
remaining `operations/` rename) is **not resolved** by this closure —
closing the mandate ends the umbrella, not the individual open items,
several of which now have their own tracking (or were purged in the same
audit — see MIS-142, MIS-131, MIS-134, MIS-124, MIS-096, MIS-112, MIS-113).

## Status check — 2026-09-02

*Read against `203267c` during the missions/ normalisation (lot 4). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** Ledger rows 1–9 all merged (#145…#194; #190/#192/#194 shown 'pending' in the table are merged as of 2026-09-01). Decision queue and 'Done when' list unchecked. No started date, no priority/effort until lot 1 filled them. 30 citations (18 files) — the hub of the last two weeks.
- **Recommendation:** Keep in-progress as the ledger of the normalisation (this PR is its row 10: missions/). Update the three 'pending' rows to merged (form, from GitHub). Close when the Oracle says the entropy target is met — it is a mandate, not a checklist.

## Version history

- v0.9.0 (2026-09-02) — Ledger row 10 (missions/ normalisation, #198), rows 7–9 marked merged; retired identifiers repointed: C-005→CAN-005, P-010→PRO-010; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 4.
- v0.9.1 (2026-09-02) — merged with main's v0.8.1 (#196): ledger row 9 takes main's form (#193 · #194 · #195, merged 2026-09-01/02); row 10 (#198) kept. No other change.
- v0.10.0 (2026-09-04) — Ledger row 12 (#249): deliberation and per-file version histories retired across the doctrinal layer, −16,297 tokens, 0 files deleted. Row 11 (`debt/` extinction) still shows `#TBD (this branch)` — it merged as #248, squash `15e64b4`; not corrected here because that is row 11's own bookkeeping, not this row's.

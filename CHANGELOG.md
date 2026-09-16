# Changelog — numinia-digital-agents

> **Summary:** NWOS system document — CHANGELOG.
> **Epistemic:** Complete history of changes to the Archive Summa.
> **Pragmatic:** What changed and when — consult to understand system evolution.
> **Audience:** Agents · Oracles

---

All notable changes to the Archive Summa are documented here.
Format: [type] description — date — author

---

## [Unreleased]

### Changed — 2026-09-16 (web: footer round two, /updates, legal slugs, version-bump guard)
- `web/src/components/Footer.astro` takes the final house shape the Oracle approved: brand as written name + one line; Navigation in two columns when > 4; a **Numen Games** column naming the four sites (numen.games, numinia.com, numinia.org, nwos.numen.games) with this one as text; Legal; Social (GitHub org now, X/Discord when the accounts exist); closing line unchanged. Data: `web/src/data/house-links.ts`, `web/src/data/social-links.ts`.
- `/updates` (new, `web/src/pages/updates.astro`): the SITE's version timeline, newest first, with a Pending block — modelled on numinia.com/updates and mirrored on the other sites. The footer's version now comes from `web/src/data/updates.ts` (`v0.1.0`), not from `web/package.json` (`0.0.1`, never raised).
- `scripts/check-version-bump.mjs` (new build guard, registered in `scripts/blind-spots.json`, step `version bump` in `ci.yml`): a PR that changes `web/src/**` must add an entry and raise the version in `updates.ts`, or CI refuses it. The Oracle's rule: each production push raises the minor.
- Legal slugs unified with the other sites: `/legal/terms`, `/legal/privacy` (and `.md`); `/legal/terminos`, `/legal/privacidad` redirect (`web/astro.config.mjs`). `OPS-002` CON-004 keeps its dated "current state" line as the record it is.

### Changed — 2026-09-16 (web: the house footer, the same on the three sites)
- `web/src/components/Footer.astro` takes the shape numinia.com and numen.games now share (Oracle instruction, 2026-09-16): brand · Navigation · Legal · Social, then the closing line — the scarab, `by Numen Games — we build for a better future.`, and the build line `licence · telemetry · version · commit`. The licence link moves from `CAN-005` to `REUSE.toml` (the map answers "which licence?" per path; the tooltip spells out the regimes); the version now links to this `CHANGELOG.md`; the commit keeps its GitHub link.
- `web/src/data/social-links.ts` emptied: the two personal accounts it held were a placeholder, and the column is drawn only when the house has accounts. The company URLs (X, Discord, GitHub) arrive with the Oracle; then the same list goes to the three sites.
- `web/src/brand/Khepri_Logo.svg` copied from `numinia-web/packages/ui/src/assets/brand/` and annotated reserved in `REUSE.toml` (after the `web/**` MIT block, last match wins). A copy, not an install: no brand package exists yet — `STD-023 §7` catalogues `Numen_Games_Horizontal_Word.svg` and `Khepri_NG_Logo.svg`, and neither file is in any of the three repositories. Recorded here as the gap it is.

### Removed — 2026-09-09 (guilds/ and infra/: two series without a consumer, ADR-045)
- `guilds/` deleted (8 files: GLD-001..004 charters, GLD-005..008 rosters). Nothing read them — `corpus.ts` excluded the folder, `lint-frontmatter.mjs` validates `guild:` against a typed list — and the charters' branch tables contradicted `CAN-004` on every guild. The one live fact, agent → guild, now lives in `agents/<id>/AGENT.yaml` as `guild:` (Ursa → Alchemists, Talos → Sentinels, Byblos/Senet/Calliope → Exegetes; the five agents in no roster carry `null` for the Oracle). Eight `/corpus/guilds/...` URLs redirect to `CAN-004`.
- `infra/` deleted; `ruleset-protect-main.json` moved to `.github/rulesets/protect-main.json` with a short README carrying the re-export command. The `INF` series (0 documents in 15 days) leaves the register; `MIS-0135` row 7 records the ruling.
- Registers updated in the same change: `STD-001` 5.1.0 (rows `guilds/`, `infra/`, genre `charter`), `rules.json`, `content.config.ts`, `REUSE.toml`, `LICENSE`, `SYS-003`, `templates/README.md`, `rings.mjs`, `README.md`, `AGENTS.md`, `CLAUDE.md`, three `SOURCES.md`. The two moulds (GLD, INF) deleted from `templates/`. `legacy.mjs` keeps both prefixes: it reproduces a frozen golden at `6a97fbf` and is historical by contract.

### Removed — 2026-09-09 (scripts/: eight dead files, tests gathered under scripts/test/)
- Deleted, criterion 0 citations from living documents ∧ 0 invocations from CI, `web/package.json` or another script: `verify-orphan-guard.sh` (absolute path to one machine), `verify-declaration-rule.sh`, `translate-corpus.mjs` (MIS-120d, Ollama; cache untracked), `measuring_root.py` (its importers left with `count-evidence.py`, #198), `field-decisions.{mjs,json}` (MIS-126, JSON read by nobody), `rename-plates.mjs` (one-shot, ran in #301; ADR-043 v1.1.3 now points at `9645477`), `experiments/` (four August censuses cited only by closed missions). ~2,600 lines. All remain in git (STD-020).
- `lint-naming.test.mjs` and `rename-series.test.mjs` moved to `scripts/test/`, beside the other tests. `lint-naming.test.mjs` was already 4/9 before the move (dated-id cases the guard stopped enforcing) — moved as-is, not repaired here; the failure is pre-existing and recorded so nobody reads it as caused by the move.
- `CLAUDE.md` test line corrected: only `telemetry.test.mjs` runs in CI.

### Removed — 2026-09-04 (reports/ series extinction, Oracle instruction)
- 22 of 24 `reports/RPT-*.md` deleted: none post-dates 2026-08-26, no report series has produced anything since, register judged obsolete noise. `RPT-003-wardley-map.md` and `RPT-008-gaps-capability-map.md` kept — `web/src/lib/wardley.ts` and `gaps.ts` parse them at build time as the data source for `/wardley` and `/gaps`; they are live inputs, not archive prose.
- `reports/evidence/` removed in full (`RPT-011` licensing-audit annex — SBOM, `reuse lint` transcript, seven `robots.txt` captures; `RPT-2026-08-25` forensic note on the 2026-04-15 canon deletion), overriding ADR-005 v1.2.0 rule 5's "never rewritten" guarantee by explicit dated Oracle authority — see `decisions/ADR-005-prefix-ruling.md` §Note, 2026-09-04. Both remain reachable in git history.
- `scripts/references-baseline.json` regenerated to absorb now-broken citations to the deleted IDs (881 → 632 known-broken references — a net decrease, most prior entries were internal to the deleted files) rather than rewriting the ~30 citing documents.
- `web/astro.config.mjs`: 22 `/reports/rpt-*` addresses (plus their `/reportes/diario-*` and `/reports/daily-*` aliases) 301 to `/reports`, the section index — the question each report answered was withdrawn, not moved, same precedent as the debt register extinction (#244).

### Changed — 2026-09-03 (STD refactor, licensing: STD-003 reservation reversed)
- STD-003 (then `platform-role-system`, now `standards/STD-003-platform-ranks.md`): `license` LicenseRef-Numen-AllRightsReserved → CC0-1.0. Oracle ruling, 2026-09-03: the 2026-08-25 reservation (rank names and promotion mechanics as Numinia trade secret) rests on a premise the Oracle now holds false. Recorded as a dated licence-amendment note at the top of the document body, alongside the original `series_change` field it reverses — preserved unmodified, as the record of the ruling it supersedes.
- Verified against git history rather than assumed: the file was born 2026-04-07 under its old canon name, carried no `license:` field until 2026-08-25, and the repository's root `LICENSE` has been CC0-1.0 since the initial commit `9f51ad1` (2026-04-06). For four and a half months in a public repository the only licence statement covering it was CC0. The reservation was therefore unenforceable when written; this entry records a release that had already happened rather than performing a new one. The waiver remains irrevocable and is accepted as such.
- REUSE.toml: removed the STD-003 exclusion annotation. `standards/**` CC0-1.0 now applies without exception. The 2026-08-31 MIS-127 note had already flagged this exception as probably moot; that open question is now closed rather than left flagged.
- Scope note: licensing only. The broader standards refactor (STD-005's draft/MUST contradiction, STD-002's dead debt links, the amendment-in-place practice in decisions/) remains open and is being carried in separate PRs.

### Changed — 2026-09-02 (MIS-138 step 7: closure — §10.5 proposed, README, ledger repaired)
- standards/STD-001-glossary.md v5.3.0: §10.5 *A corpus figure is produced once and cited everywhere else* added as PROPOSED (decision 2 = citation form); awaits the Oracle's signature.
- telemetry/README.md: what each file is, who writes it, how to run and read the instrument.
- telemetry/history.jsonl repaired from git: the ship steps of #211–#213 deleted `telemetry/` before measuring and truncated the ledger to one line each time (criterion 9 violated three times, unnoticed). Every line ever committed restored in order (5 @ `924ca38`); a test now fails if any committed line is missing.
- Acceptance run at `924ca38`: 87 figures, 9 families; see the mission's closure for the per-criterion reading.

### Added — 2026-09-02 (MIS-138 step 6: families `contradictions` and `figures` — D4, D5)
- scripts/lib/families/claims.mjs. `contradictions` layer 1, extractor classes: status vocabulary vs rules.json, `[CI]` rows of STD-001 vs `run: node` steps of ci.yml (6 scripts run that no row claims @ `0d0d5e7`), id digit width per series (MIS, RPT cited with both widths). Layer 2, the verified register `telemetry/claims.json`: MIS-135's deferred rows with a locating quote; every run checks each quote → open · resolved · moved (5 open @ `0d0d5e7`). Not built, said so: `pages_built`, `series_registered`.
- `figures`: `live` = lines outside telemetry/ stating a corpus-shaped figure with no `@ head` beside it (661 @ `0d0d5e7` — a detector, not a verdict), `cited` and `stale_citations` for the §10.5 form `key = value @ head`. 87 figures in 9 families; instrument v0.5.0. The instrument never edits a document.

### Changed — 2026-09-02 (MIS-138 step 5: families `headers` and `provenance`, five censuses retired)
- scripts/lib/families/provenance.mjs: `headers` (docs with/without frontmatter, field_usage, uid_present/collisions, created_T000000Z, hygiene) and `provenance` (authorship by nature of `author:`, created vs first-add commit over the whole corpus with renames followed, REUSE regime crossings over every rename in history, P-003 anchor rule on missions). One `git log` walk per run. 72 figures in 7 families; instrument v0.4.0.
- Retired, their predicate now in the dataset with its definition: scripts/experiments/{frontmatter-census, provenance-census, dates-vs-commits, regime-crossings, protocol-anchor}.py. Two were not reproducible as they stood (hard-coded `/repos/numinia-nwos` root; protocol-anchor read its input from /tmp) — the dataset states what was ported and what was not. Kept: complexity-census, index-coverage, public-surface-census, mis127-token-delta (MIS-127's ledger, not measurement of this kind), resolve-citations (a guard-shaped check, not a count).
- Where the old and new predicates differ they differ on purpose and the definition says so: `headers.docs_with_frontmatter` uses the shared reader (264) where frontmatter-census used a raw regex (262); `provenance.authorship` classifies the whole corpus, not the RPT-011 SBOM grant list.

### Added — 2026-09-02 (MIS-138 step 4: family `tokens`, no tokenizer dependency)
- scripts/lib/cl100k.mjs: cl100k_base encoder over the rank file, ≈60 lines, no package. Rank file pinned by sha256 (the one tiktoken pins), fetched by `node scripts/telemetry.mjs --fetch-tokenizer` into `scripts/lib/tokenizer/` (gitignored). Equal to `tiktoken.encode_ordinary` over every tracked .md (criterion 6, by test — tiktoken venv present; named skip otherwise).
- scripts/lib/families/tokens.mjs: `tokens.total` = 601857 @ `19c5b96` (whole file, frontmatter included, tracked .md outside web/), `by_dir`, `by_status`, `missions_share_pct` (39.21 %), `largest`; per-document `tokens` column in `telemetry/docs.json`. Rank file absent → every key `null` with the reason, exit 0. 56 figures in 5 families; instrument v0.3.0.

### Changed — 2026-09-02 (MIS-138 step 3: family `legacy`, `count-evidence.py` retired)
- scripts/telemetry.mjs v0.2.0: family `legacy` — the 20 keys of `count-evidence.py --json`, same names, same values, each with its predicate written out (including the reproduced defects: `uid_colisiones` counts shared placeholders, `misiones_por_status` counts TEMPLATE/ANNEX/INDEX). `--legacy-json` prints the old dict. 50 figures in the dataset. Declares its blind spots on exit, as the guards do.
- scripts/count-evidence.py removed (criterion 2): dict-equal to `--legacy-json` at `6a97fbf`, golden kept as `scripts/test/fixtures/count-evidence-6a97fbf.json` and re-run against that tree by `telemetry.test.mjs`. `measuring_root.py` stays (formatter; MIS-127's scripts import it).
- Live citers re-pointed, text only, no figure re-typed: STD-001 v5.2.0 (`evidence_script`, §0, §4.1, §8), DBT-001 v4.3.1, PRO-010 v0.8.3, scripts/blind-spots.json (`count-evidence` → `telemetry`). Records — done missions, reports, ADR-005 L44, this file — keep their citations.

### Added — 2026-09-02 (MIS-138 step 2: the instrument, first three families)
- scripts/telemetry.mjs (new, v0.1.0): measures the corpus and writes `telemetry/latest.json` (every figure with value · unit · definition, plus `head`, `corpus_hash`, `root_dirty`), `telemetry/docs.json` (one row per document), `telemetry/latest.md` (rendered view — the only document that states figures, D5) and appends `telemetry/history.jsonl` on committed trees. `--check` exits 1 when the dataset is stale (other `corpus_hash`) or altered (same corpus, other values); `--key family.key` prints one figure with its predicate. Not wired to CI.
- scripts/lib/corpus.mjs + scripts/lib/families/{corpus,series,missions}.mjs: 30 figures, families `corpus` · `series` · `missions`. `series.registration` reproduces `count-evidence.py matricula` per series (registered/total/apparatus) — checked by test while both exist (criterion 2); `count-evidence.py` is not retired yet.
- scripts/test/telemetry.test.mjs (new, 8 checks): shape, determinism, legacy equality, three fixtures in a scratch repo (added mission moves `missions.total` and `done_without_closure` by 1; mis-named file lowers `pct` not `registered`; changed tree → `--check` STALE).
- REUSE.toml: `telemetry/**` → CC0-1.0 (data, the regime of what it describes). references-baseline 670 → 669: the planned-artefact entry for `telemetry/latest.md` resolves now.

### Changed — 2026-09-02 (MIS-138 step 1: shared classifiers — `scripts/lib/rules.json`)
- scripts/lib/rules.json (new): the series register (ADR-005 v1.2.0), retired prefixes, apparatus list (DBT-001 ruling 2026-08-31), type/status/subtype vocabularies (STD-004 §4–5) and governed dirs (§8) as one data file. scripts/lib/frontmatter.mjs (new): the one `parseFM` (lint-frontmatter's, NESTED contract kept), `loadRules`, `prefixToDir`, `isApparatus`, `isTemplate`.
- scripts/lint-naming.mjs, lint-frontmatter.mjs, check-references.mjs: read the register and vocabularies from rules.json instead of three private copies (D1.1 of MIS-138). Verdicts identical before and after on `--report` output; the five baselines unchanged byte for byte; 147 lines removed, 50 added.
- scripts/test/rules.test.mjs (new, 17 checks): the data is well-formed, every target series exists in the tree, each guard imports the lib and keeps no private map, `parseFM` keeps the NESTED contract, `isApparatus`/`isTemplate` agree with the lists they replaced.

### Changed — 2026-09-02 (MIS-138 v1.1.0: iteration 1 with the Oracle, `in-progress`)
- missions/MIS-0138 → v1.1.0, `status: in-progress`: Design section (D1–D6) — one instrument in Node beside the guards, 12 measurers absorbed and retired, guards not; families `corpus` · `tokens` · `contradictions` · `provenance`; `corpus_hash` as the authority for a committed `telemetry/` dataset; the v1.0.0 render markers inside other documents dropped for one rendered dataset document; STD-001 §10.5 re-drafted as the citation form (pure ban costed as the alternative); criteria in key + target form; adds/removes and surprise accounted in tokens. No instrument code.
- guards: references-baseline 669 → 670 (+1, deliberate: the brief names the planned rendered dataset document, which does not exist yet; the entry is removed by the PR that creates it).

### Added — 2026-09-02 (MIS-138: telemetry instrument — brief)
- missions/MIS-0138 opened (`todo`, Alchemists, effort L): one program measures the corpus and writes one dataset with each figure's unit, definition and `HEAD`; `count-evidence.py` and the one-shot censuses fold into it; two documents rendered from it (STD-001 §4.1, DBT-001 coverage). Every figure in the brief was measured at `e4b94e7` by script — 152 hand-typed live figures in 28 documents; "pages built" carries 6 different values across 6 documents. Four decisions for the Oracle. No instrument code in this PR.

### Changed — 2026-09-02 (missions/ normalisation, lots 2–4 — judgement; PR #198)
- missions/ bodies, all 134: the 2026-04 import placeholders in 37 context cards replaced with each brief's own Story/Epistemic/Pragmatic text; 85 inline attribute lines (`**Area:** … **Effort:**`) removed — they disagreed with the frontmatter in 38; import-era `---` rules removed. Closed records: form only (STD-001 §2.1), each with a dated version-history line.
- live missions (66): a dated `## Status check — 2026-09-02` with evidence and a recommendation — status **not** changed (PRO-003 §2). Retired ids repointed in live text only (P-→PRO-, C-→CAN-, S-→STD-, D-→DBT- per `absorbs`). 8 todo missions assigned to agents retired 2026-08-28 → `assigned_to: null`; 6 with a repository or model name as assignee → null; MIS-084 gets its `freeze_reason`; the four in-progress hubs get `started` from git.
- MIS-135 opened: register of 20 incoherences found at other levels (protocols, standards, guards, web) and left untouched by instruction. MIS-127 ledger row 10.
- guards: lint-naming treats `type: meta` as apparatus (the rule count-evidence already applied) — naming-baseline 2 → 0; references-baseline 671 → 669; url-baseline 622 → 624. count-evidence missions 132/132 · 100 %.

### Changed — 2026-09-02 (missions/ normalisation, lot 1 of 4 — mechanical)
- missions/: all 134 series files renamed `MIS-NNN-*` → `MIS-0NNN-*` (ADR-005 v1.1.0). The `id:` field keeps the registered number, as the MIS-0129 precedent did, so no citation, URL or relation entry changes. `MIS-115a`/`MIS-115b` (letter suffix, never a legal id shape) → `MIS-132`/`MIS-133` with `former_id`; `PROPOSAL-closure-guard` (unregistered prefix) → `MIS-134`, todo. Three `-v1`/`-v2` slug suffixes retired (N-02).
- missions/ headers: `uid: ""` declared on all 135 (STD-004 HDR-020); `license: CC0-1.0` on all 135 and `REUSE.toml` follows (Oracle, 2026-09-01: every mission is CC0); `mission_id` removed (58, identical to `id` in 58/58) and retired from STD-004 + lint-frontmatter; `owner: oracle` on 25 that lacked it; `created_source`/`created_confidence` from first commit on 35 (STD-001 §8: never invented); `territory`/`assigned_to`/`completed` completed where the CORE block was short. Field order: CORE · REGISTRO · optional, as TEMPLATE.md. No body text changed except the H1 of the three re-numbered files.
- norms: PRO-003 v4.1.0 (§Mission IDs still prescribed `MIS-NNN`, max 999, and the dot form; sub-missions now take a number and `parent_mission`); ADR-004 v1.1.1; PRO-010 v0.8.2; STD-001 v5.1.1 (§4.1 missions 0/131 → 134/134); STD-004 v1.4.1; README v2.0.1.
- guards: lint-naming and count-evidence treat `missions/TEMPLATE-*.md` as apparatus (lint-frontmatter already did). naming-baseline 135 → 2; references-baseline 599 → 671 (+73: basename citations in three closed records and one done mission, not rewritten per PRO-010 §3.4 rule 2; −1 healed); url-baseline 616 → 622 (+6, 0 died; 5 redirects for the retired ids).

### Changed — 2026-09-01 (ADR-005 v1.2.0, reports/ normalisation — PRs #193, #194)
- decisions/ADR-005 v1.2.0: dailies keep `RPT-YYYY-MM-DD` (subtype daily only); everything else in `reports/` is `RPT-NNN`; subtype vocabulary closed (daily · audit · analysis · proposal); folder flat; evidence in `reports/evidence/<RPT-id>/`; `AUD-`, `PROP-` retired. PRO-010 v0.8.0, STD-001 v5.1.0, STD-002 v2.1.0, STD-004 v1.4.0, DBT-001 v4.2.0 follow.
- reports/ flattened: `audits/` and `daily/` removed; 11 `AUD-*` + wardley/gaps/PROP → `RPT-003`…`RPT-016` by `created` (former_id on each); 8 dailies moved, ids unchanged; licensing annex → `reports/evidence/RPT-011/` (opaque block); `reports/INDEX.md` deleted (stale apparatus, ADR-030); `evidence/*.py` → `scripts/experiments/` with MIT SPDX; deleted-canon text → `Epistemic_Relations (deleted 2026-09-08)`.
- scripts: lint-naming/lint-frontmatter/count-evidence implement v1.2.0; `lint-naming.test.mjs` new (9 cases); rename-series.mjs gains `--into`, reserved numbers, dated-id handling, refuses baselines and test files (26 tests).
- web: collection `reports` reads `reports/RPT-*.md`; `/reports` (index by subtype) + `/reports/[id]` + `/reports/[id].md` for every report; wardley/gaps read the collection; 30 redirects, 0 dead URLs.
- web (PR #195): `pages/reports.astro` + 5 `daily-*.astro` (41.7 KB of hand-written Spanish copies, MIS-065 debt) and `pages/audits/*` deleted; `/audits*`, `/reportes/*`, `/reports/daily-*` redirect to `/reports/*`. One folder, one collection, one head.

### Added — 2026-08-21 (P-011, security audit protocol)
- protocols/P-011-security-audit.md v0.1.0 (draft) — how a security audit is scoped, executed, classified and closed: identity/authorization axes, phases A/B1/B2/C/D with a hard gate before any irreversible act, hot-finding incident path, output tiering (public/internal/hot), stable `FND-YYYY-NN` finding IDs, and three separate scores (doctrine, execution, coverage). Runs at least annually plus event triggers. Touches SEC-004, SEC-006, LEG-01
- README protocol table completed: P-010 was missing from it, P-011 added

### Changed — 2026-08-17 (MIS-066, mission system unification)
- missions/ flattened: 81 files in 4 status directories → 66 unique missions in one folder; `status:` frontmatter is the only state surface
- All missions in English; 15 duplicate IDs merged; MIS-00058 renumbered to MIS-067 (collision with MIS-058); padded IDs unpadded
- States renamed: todo→backlog, freeze→frozen; draft added (P-003 v3.0.0, STANDARDS §4B/§5 updated)
- /missions builds from missions/ at deploy; /misiones and missions-index.json retired (redirects in place)
- queue/INDEX.md and protocols/P-001-briefing-agente-v1.md deleted (stale duplicates)
- Earlier same day (LD-001 closure): presentation layer aligned with per-path licensing, SPDX headers in all first-party code, frontmatter license fields matched to REUSE.toml, license guard added to the build

## [0.5.0] — 2026-04-07 (evening)

### Added
- DEC-006: English as official NWOS repo language
- decisions/INDEX.md updated with DEC-006
- agents/INDEX.md v2.0.0 — updated to flat structure, real agents (MIS-057 QA)

### Fixed
- MIS-037 closed (was open in active/ while also in done/)
- CHANGELOG updated to reflect full history

### Changed
- MIS-056 acceptance criteria fully completed

## [0.4.0] — 2026-04-07 (afternoon, MIS-056)

### Added
- the constitution (superseded, deleted 2026-09-08) v1.2.0 — full English translation + language policy
- agents/nimrod/MEMORY.md → v0.2.0 (EN)
- agents/ursa/STATUS.md → v0.2.0 (EN)
- agents/senet/SOUL.md, OPERATOR.md, STATUS.md → v0.2.0 (EN)
- agents/procurador-01/SOUL.md → v0.2.0 (EN)
- agents/_template/SOUL.md — updated to English standard
- reports/daily/RPT-2026-04-04 through 07-tarde → v1.1.0 (EN)
- missions/backlog/MIS-056 v2.0.0 — translation scope defined
- missions/backlog/MIS-060 v1.2.0 — agent sync architecture
- missions/backlog/MIS-061 — El Sistema web visualization
- DEC-006 — English as official NWOS repo language

### Changed
- All protocols P-001 through P-008 → v1.1.0 (EN)
- All operations documents → v1.1.0 (EN)
- All guild charters and rosters → v1.1.0 (EN)
- All decisions ADR-001, ADR-001 (formerly ADR-002), DEC-001 through DEC-005 → v1.1.0 (EN)

## [0.3.0] — 2026-04-07 (morning)

### Added
- the constitution (superseded, deleted 2026-09-08) v1.1.0 — Active Inference, OODA, BML, context cards (§7G-I, §8)
- P-007 Context Load Protocol
- P-008 Approval Brief Protocol
- APPROVAL-REQUEST-template.md
- agents/nimrod/ — SOUL.md, OPERATOR.md, STATUS.md, MEMORY.md (flat structure)
- agents/adonaz/ — complete pack (SOUL, OPERATOR, STATUS, MEMORY)
- agents/ursa/ — SOUL.md, OPERATOR.md (new — replaces Alquimista-01)
- agents/senet/ — SOUL.md (new — replaces Exégeta-01)
- guilds/ — charters + rosters for sentinels, exegetas, procuradores
- missions/active/MIS-057 — Deep QA of the NWOS System
- missions/active/MIS-058 — Approval Brief Protocol
- missions/backlog/MIS-050 — Backlog review ritual
- Audit document — web vs repo coherence
- AUDIT-2026-04-07-web-vs-repo.md

### Changed
- Agent architecture migrated to flat structure (agents/{name}/ instead of agents/guilds/{guild}/)
- P-001 updated to flat agent path
- P-003 added ID verification rule before assigning mission IDs
- OPERATOR.md updated: git pull as mandatory startup step

### Fixed
- Duplicate agents/guilds/sentinels and agents/guilds/centinelas bug resolved

## [0.2.0] — 2026-04-06 (Dark Council session with Christian Märtens)

### Added
- the constitution (superseded, deleted 2026-09-08) v1.0.0 — ISO 8601 timestamps, UUID v7, frontmatter schema, commit conventions, BDD/Cucumber, ADR, Wardley, DORA, SemVer
- P-006 Session Close Protocol (Alquimista-01 proposal + Nimrod validation)
- agents/adonaz/ initial design
- guild charters — sentinels, alquimistas, exegetas
- canon/INDEX.md v1.1.0 — S-009 Rank Specifications added
- operations/STD-002-governance.md, security-policy.md, credential-map.md
- missions/active/MIS-037 — Archive Summa (Adonaz MIS-037 completed)
- missions/active/MIS-054 — Multi-Oracle Telegram access
- missions/active/MIS-055 — Dual Nomenclature System
- decisions/ADR-001, ADR-001, DEC-001 through DEC-005
- reports/daily/RPT-2026-04-06

## [0.1.0] — 2026-04-06 (initial)

### Added
- Initial repository structure (8 documentary funds)
- README.md — ontological portal of the system
- GOVERNANCE.md — modification rules derived from 100 simulations
- CONTRIBUTING.md — guide for external contributors
- agents/ — Nimrod and Adonaz initial profiles
- protocols/ — P-001 to P-005
- missions/ — Template v2 + active and completed missions
- decisions/ — ADR-001
- blueprints/ — architecture documents
- canon/ — index of the 9 seminal documents
- reports/daily/ — RPT-2026-04-04, RPT-2026-04-05

---

*Maintained by Nimrod 🗡️ — Numen Games — CC0 1.0*

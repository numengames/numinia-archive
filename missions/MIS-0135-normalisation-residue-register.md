---
id: "MIS-135"
uid: ""
title: "Register of incoherences found outside missions/ during the missions/ normalisation — continue the refactor where this one stopped"
status: in-progress
started: "2026-09-02T10:30:00+02:00"
priority: high
effort: M
guild: "Sentinels"
territory: "Archive"
type_execution: hybrid
assigned_to: "ursa"
completed: null

type: mission
version: "1.1.2"
created: "2026-09-02T02:10:00+02:00"
created_source: declared
created_confidence: exact
updated: "2026-09-09T15:10:00+02:00"
author: "ursa"
owner: "oracle"
requested_by: "oracle"
tags: [archive, normalisation, guards, standards, protocols, debt]
license: "CC0-1.0"

depends_on: ["MIS-127"]
parent_mission: "MIS-127"
paths: [protocols/, standards/, machine/scripts/, web/src/, CLAUDE.md, debt/]
context: "2026-09-02"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# MIS-135 — Register of incoherences found outside missions/ during the missions/ normalisation

> **Summary:** what the four lots of the missions/ normalisation (PR #198) saw at other levels of the system and, by instruction, did not touch — each item with where it was measured, so the next refactor starts from evidence instead of a re-audit.
> **Epistemic:** which contradictions between norms, guards and corpus survive after `reports/`, `operations/`, `canon/`, `decisions/` and `missions/` were normalised, and why each survived (out of scope, Oracle-owned, or another repository).
> **Pragmatic:** a numbered list the Oracle can rule on line by line; each line is one PR or one ruling.
> **Audience:** Oracle · Sentinels · Ursa

## Origin

The Oracle's instruction of 2026-09-01: *"si ves incoherencia en otros niveles las apuntamos en una nueva misión para continuar con el refactor y la normalización del sistema — estamos buscando estabilizarlo y reducir la sorpresa."* The missions/ work is `MIS-127`'s row 10 (ledger). This mission is its residue.

Everything below was measured against `7f51235` (main, 2026-09-01) and the four commits of PR #198. Nothing here was changed by that PR unless the line says so.

## Register

Severity: **A** — a norm and a guard, or two norms, contradict each other; **B** — a norm says something false about the corpus; **C** — housekeeping.

| # | Sev | Where | What | Evidence | Disposition (2026-09-02) |
|---|---|---|---|---|---|
| 1 | A | `protocols/PRO-003-mission-cycle.md` §2 | The state diagram and the "who sets it" table still carry `draft`, `backlog` and `cancelled` — three values `STD-001` §7 withdrew on 2026-08-30 (`todo · in-progress · in-review · done · frozen`). `lint-frontmatter` enforces STD-001; the protocol every agent reads prescribes the retired set. | `sed -n 128,153p protocols/PRO-003-mission-cycle.md` vs `STD-001` §7 table; `MissionsView.astro` L76 maps `backlog/draft → todo` at render time to hide it | **execute** — done, #200: PRO-003 v4.2.0. |
| 2 | A | `web/src/views/MissionsView.astro` L146–147 | The board still computes a `cancelled` column (`missions.filter(m => m.status === "cancelled")`) for a status that no longer exists in the corpus (0 files). Dead code that documents a retired state as live. | `grep -n cancelled web/src/views/MissionsView.astro`; `grep -rl '^status: cancelled' missions/` → 0 | **execute** — done, #200: column, sort and toggle removed. |
| 3 | A | `protocols/PRO-010-how-to-archive.md` | `status: draft`, v0.8.2, since 2026-08-24 — the protocol that governs how every series is named, renamed and closed, cited by ADR-005, STD-001, MIS-089, MIS-125, MIS-127 and this normalisation as authority, has never been signed. `MIS-089` F0 ("P-010 signed") was the gate the whole IA plan waited on; the plan executed, the gate did not. | `grep -m1 '^status' protocols/PRO-010-how-to-archive.md` | **defer** — the Oracle signs; no text change. Ruling requested in the PR body. |
| 4 | B | `CLAUDE.md` L21 | *"No tests or lint yet (MIS-070)."* The repo runs two test suites (`rename-series.test.mjs` 26 cases, `lint-naming.test.mjs` 9) and a 10-step CI of guards. The entry-point document for every cold agent states the opposite of the tree. | `.github/workflows/ci.yml` (10 `run:` steps); `ls machine/scripts/*.test.mjs` | **execute** — done, #200: sentence rewritten; MIS-101 criterion 4 ticked. |
| 5 | B | `STD-004` (then `standards/STD-004-header-standard`) §7 ring table | `assigned_to` is defined as *"agent-id, or null"*; the corpus carried a repository name (`numinia-nwos` ×3, `nwos-workspace-template`, `numengames-web + nwos-deploy`, `numinia-web`) and a model name (`claude-fable-5` ×2) as assignees. Fixed on the live missions in PR #198 (→ null); the `done` ones keep theirs as record. No guard checks the value. | `grep -h '^assigned_to' missions/MIS-*.md \| sort \| uniq -c` | **defer** → new guard rule (HDR-039 `assigned_to` ∈ roster) needs STD-004 §7.2 text + roster source; one small mission, Sentinels. Interim: #198 nulled the 8 retired assignees; live values today: null ×30, ursa ×2. |
| 6 | B | `standards/STD-001-glossary.md` §4.1 row `reports/` | Says 10/25 · 40 %. `count-evidence.py` reports 24/24 · 100 % since #194. Stale by one day; the table is the one `MIS-125` said "is not copied from an earlier version". | `python3 machine/scripts/count-evidence.py` | **reject** — already true: the §4.1 table was re-measured at `7f51235` (#196, v5.1.1) and at the #198 merge (v5.1.2); every row reads 100 % from `count-evidence.py`. |
| 7 | B | `debt/DBT-001-series-prefixes-not-applied.md` L40, L222 | *"missions/ MIS-NNNN 0/131"* and *"131 files … last"*. 132/132 · 100 % by `count-evidence.py` as of #198 (apparatus excluded). The entry's premise is closed for 10 of 11 series; `infra/` has 0 files. | `count-evidence.py` | **execute** (partial), #200: DBT-001 v4.3.0 records `missions/` closed and the condition met pending the `infra/` ruling. The close itself is the Oracle's (ADR-030). Ruling 2026-09-09: `infra/` retired by ADR-045; the condition no longer has a pending term. |
| 8 | A | `machine/scripts/lint-frontmatter.mjs` L179 `PREFIX` vs `machine/scripts/lint-naming.mjs` L57 `SERIES` | Two registers of the same 13 prefixes in two guards, hand-maintained separately (lint-naming's own comment: *"NOT the stale 8-series map in lint-frontmatter.mjs's PREFIX constant"*). Every series change edits both; `MIS-125` bug class. | both files | **defer** → one `machine/scripts/lib/series.mjs` consumed by four guards touches CI-critical code; a mission with the two test suites as its net. Not a residue fix. |
| 9 | B | `machine/scripts/check-references.mjs` L201 `ID_RE` | Accepts `MIS-\d{1,4}`: a 4-digit `MIS-0129` citation would resolve to nothing (ids are 3-digit) and be reported — correct — but the same regex accepts `D-\d{1,4}`, `P-` is gone, and `AUD` is gone; the alternation is edited by hand per series (see 8). Three citations to `MIS-0135` in PR #198 were caught by it — the guard works; the register it reads should be shared. | `sed -n 201p machine/scripts/check-references.mjs` | **defer** — same mission as 8. |
| 10 | B | `STD-004` (then `standards/STD-004-header-standard`) §7, `missions/` row | Still lists `sub_missions`, `divergence_log`, `executor`, `mission_mode`, `phase` as registered fields. Corpus: `sub_missions` 10 files (all the retired `MIS-NNN.N` dot form, MIS-062 the only one with content); `divergence_log` 6 files, all `null`; `executor` 1, empty (TEMPLATE-CHANGES measured this on 2026-08-25 and recommended retiring them). PR #198 retired only `mission_id`. | `machine/templates/MIS-TEMPLATE-CHANGES` §table; `grep -c '^divergence_log' missions/*.md` | **defer** → STD-004 v1.5.0 + HDR-031 waves for `sub_missions` `divergence_log` `executor` `phase` (`mission_mode` stays: 1 live carrier, MIS-117). Carriers today: sub_missions 10 (9 empty, MIS-062 record), divergence_log 6 (all null), executor 1 (null), phase 1. Needs the retirement note per field (STD-004 §7) — a header mission, not this PR. |
| 11 | C | `machine/templates/MIS-TEMPLATE` L38 | The OPCIONALES comment block still offers `blocked_reason: null` as a field to fill — retired 2026-08-31 (its debt entry closed in #160; `HDR-031` fails the field corpus-wide). The template teaches what the guard forbids. | `grep -n blocked_reason machine/templates/MIS-TEMPLATE` | **execute** — done, #200: line dropped. |
| 12 | B | `web/src/views/ContinuityView.astro` L60, L78 | Prose says *"Lee missions/active/, blueprints/, decisions/"* and *"54 misiones con historia"*. `missions/active/` has not existed since MIS-066 (2026-08-17); there are 134 missions; `blueprints/` holds 3 files. A page that teaches continuity from a layout three refactors old. | `grep -n 'missions/' web/src/views/ContinuityView.astro` | **execute** — done, #200: three strings dated/rewritten; the counts are not derived at build (that is the MIS-066 pattern, out of scope here). |
| 13 | B | `README.md` §"The mission system" | *"State is a frontmatter field, never a path"* — true; but the paragraph's example set and the "Where things live" index are hand-written (MIS-112/113 open). Not a contradiction; a maintenance debt the two missions already own. | — | **reject** — no action, as the row says: MIS-112/113. *Superseded 2026-09-09: MIS-112/113 closed (mission purge, no work done — see audit report). This row's disposition is now unowned; nobody executes it unless reopened.* |
| 14 | A | `machine/scripts/check-internal-links.mjs` | Exits 1 on `main` (identical output on main and on #198) and is **not** in `ci.yml`. A guard that always fails and is never run is D-039's vacuous green inverted: permanent red nobody reads. | `node machine/scripts/check-internal-links.mjs; echo $?` on `7f51235` | **reject** — the finding was wrong: `check-internal-links.mjs` exits 0 on a fresh `web/dist` (13,371 links / 626 pages, measured 2026-09-02 on the #198 merge). It exits 1 only when `web/dist` is absent — the "fails on main" observation was a missing build, not a broken guard. Whether it joins CI is a PRO-013 handoff question; unchanged here. |
| 15 | B | `REUSE.toml` `web/**` → MIT | `MIS-065`'s unverified criterion: *"no culture-branch content is matched by web/** → MIT"*. `ContinuityView.astro`, `HomeView.astro` and the `archive/[fondo].astro` lore strings are prose inside MIT-licensed components. Never audited. | `grep -c lore: web/src/pages/archive/\[fondo\].astro` | **defer** → DBT-005 (path-derived licensing); needs a C-005 §2 classification signed by the Oracle. |
| 16 | C | `machine/scripts/phase8-final-sweep.py` L137–141, L186 | One-shot script from 2026-08-30 hard-codes six `missions/MIS-NNN-*.md` paths that no longer exist after #198. A record (PRO-010 §3.4), left as is; listed so nobody runs it. | `grep -n 'missions/MIS-' machine/scripts/phase8-final-sweep.py` | **defer** → the `machine/scripts/phase*.py` → `machine/scripts/experiments/` move is mechanical but touches `RPT-010`'s `evidence_script` path and MIS-125/127 citations; one small PR of its own, after #198 merges. |
| 17 | B | `standards/STD-001-glossary.md` L1390 | *"Missions with MIS-NNN 105/105"* in a 2026-08 census table — a second, older count that now contradicts §4.1's row two screens up. | `grep -n 'MIS-NNN' standards/STD-001-glossary.md` | **execute** — done, #200: census table labelled as dated (STD-001 v5.1.3). |
| 18 | C | `agents/INDEX.md` | Lists Nimrod, Adonaz→Byblos, `procurador-01` as retired 2026-08-28. 8 todo missions were still assigned to them until #198. No guard relates `assigned_to` to the roster (see 5). | `grep -n retired agents/INDEX.md` | **defer** — covered by 5. |
| 19 | A | `web/astro.config.mjs` L143 `"/misiones/[id]": "/missions/[id]"` | Parameterised redirect: `check-url-lifecycle` declares it *"matched literally … neither verified nor expanded"* (its own blind-spot list). The 130 `/misiones/mis-NNN` URLs in `url-baseline.json` are therefore covered by an unverified rule; #198 had to add explicit rules for `mis-115a/b`. | `machine/scripts/check-url-lifecycle.mjs` blind spots; `grep -c '/misiones/mis-' machine/scripts/url-baseline.json` | **defer** → design choice (expand `[id]` rules in the guard vs. 134 explicit redirects); the Oracle picks. Fact for the choice: `web/dist/misiones/mis-NNN/` pages are materialised today, so the alias works; the guard simply cannot see it. |
| 20 | B | `missions/` — 30 of 52 `done` missions | No filled `## Closure` (What was done / diverged / evidence / closed-by). `MIS-134` (ex-PROPOSAL) is the guard for this; the 30 are its baseline. Not touched in #198: substance of closed records (PRO-010 §3.4 rule 2). | `.hermes` census in PR #198 description | **defer** → MIS-134 (the ratchet). Measured 2026-09-02 on main (`68bd5f1`), definition = `done` mission with no `## Closure` section: **34 of 62** (31 of 52 before #199; the ten closed there carry a Closure). *Amended 2026-09-02, v1.1.1: v1.1.0 printed "43 of 62" — a figure from a script with a different, unrecorded definition; not reproducible, withdrawn.* MIS-134 fixes the definition before it baselines. *Superseded 2026-09-09: MIS-134 closed unimplemented (mission purge — its own evidence showed the design would fail against MIS-109, the best-executed record in the corpus). The closure-guard mechanism this row deferred to does not exist. Re-open under a new mission if the Oracle still wants it enforced.* |

## What this mission is not

- It does not re-open any `done` mission. Where a closed record contradicts today's tree (MIS-066's 90 old basenames, RPT-004's `queue/`…`done/` paths) the contradiction is the record doing its job; `check-references` baselines it by class.
- It does not decide status. The 55 `Status check` sections written by PR #198 into live missions are recommendations; the Oracle's rulings on them are `MIS-127`'s decision queue, not this register.
- It does not touch other repositories (numinia-web, numengames-web, nwos-workspace-template). Missions parked here for those repos (MIS-074, 077, 085, 102, 106, 107, 108) are flagged in their own Status check.

## Acceptance criteria

- [ ] Every row above has a disposition signed by the Oracle (execute · defer · reject), recorded in the row. — *proposed in every row, #200; signature = merge*
- [ ] Rows marked *execute* are each closed by one PR that cites this mission and the row number. — *7 execute rows, all in #200; row 7 partial (the close is the Oracle's)*
- [ ] Rows 1, 3 and 8 (the three A-severity norm/guard contradictions) are closed before any further series-level refactor opens.
- [x] `MIS-127`'s ledger carries this mission as a row. — row 10 (#198)

## Execution log

*(one line per row closed: date · row · PR)*

- 2026-09-02 — rows 1, 2, 4, 7 (partial), 11, 12, 17 executed; 3 awaits signature; 5, 8, 9, 10, 15, 16, 18, 19, 20 deferred to named work; 6, 13, 14 rejected with the reason in the row (14: the finding was a missing build, not a failing guard). #200.

## Closure

*(Fill when the mission closes. Not before, and not with intentions.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**

## Version history

- v1.0.0 (2026-09-02) — Opened at the end of the missions/ normalisation (PR #198, lots 1–4), by the Oracle's instruction of 2026-09-01. Twenty rows, measured against `7f51235` + `#198`.
- v1.1.0 (2026-09-02) — every row carries a disposition; seven executed in #200, one rejected as a wrong finding (14), the rest deferred to named work. `status: in-progress`.
- v1.1.1 (2026-09-02) — row 20 figure corrected: "43 of 62" withdrawn (unreproducible), replaced by the measured 34 of 62 with its definition stated. Author's error, #202.

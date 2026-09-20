---
id: "RPT-020"
uid: ""
title: "What the guards see"
type: report
subtype: audit
status: active
version: "1.0.0"
created: "2026-09-10T14:00:00+02:00"
created_source: "declared"
created_confidence: exact
updated: "2026-09-10T14:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Sentinels"
territory: "Archive"
tags: [report, audit, guards, alpha, baseline]
license: "CC-BY-4.0"
visibility: "public"
severity: high
scope: "The 20 scripts under `machine/scripts/`, run on the whole tree at `417aa68` after the normative axis went to draft (#352) and three baselines went to zero (#353). Not examined: whether each rule is right, and the web build's own tests."
evidence_head: "417aa68"
evidence_script: "machine/scripts/*.mjs --report"
related: ["STD-005", "STD-007", "STD-020", "STD-006", "DBT-020"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# What the guards see

> **Summary:** On 2026-09-10 every guard ran on the whole tree with no
> exception list: 175 findings, 0 enforced, because all 43 rule-holding
> documents are `draft`.
> **Epistemic:** the tree as the guards measure it, one commit after the
> alpha reset. Figures; the judgement is §4.
> **Pragmatic:** the work list of the alpha. Each row is a batch to
> propose, a rule to ratify, or a debt to write.

## 1. Scope and method

Every script in `machine/scripts/` ran on `417aa68` with `--report` where the flag
exists: 16 guards, 3 tools that are not guards (`generate-design-kit`,
`rename-series`, `check-responsive`), `telemetry`, and the 7 test suites
under `machine/scripts/test/`.

The regime (`ENG-067`, `STD-005`) was in force: a finding fails the build
only while the standard holding its plate is `active`. After #352 none is.
Every figure here is what a guard *says*, not what it *stops*.

**Measured at:** `417aa68`, 2026-09-10.

## 2. Findings

### 2.1 By guard

| # | Guard | Holder | Findings | Enforced |
|---|---|---|---|---|
| 1 | `check-prose-in-code` | `STD-006` TXT-003 | 55,606 chars in 20 components | 0 |
| 2 | `check-references` | `STD-020` GIT-048 | 74: 2 dead links, 36 unknown ids, 36 unknown filenames | 0 |
| 3 | `check-document-shape` | `STD-007` DOC-002..004 | 22 form failures in 10 documents | 0 |
| 4 | `check-document-shape` (budgets) | `STD-007` S-01/05/06/07 | 57 overruns: 29 bodies, 15 titles, 4 Why, 4 cards | never (SHOULD) |
| 5 | `check-core-rules` | `STD-019` VER-021/024 · `STD-021` CIT-050 | 5 in 4 documents | 0 |
| 6 | `check-deletable` | tool | 2 `done` missions with no living citer | n/a |
| 7–10 | `check-url-lifecycle` · `check-orphan-content` · `check-internal-links` · `telemetry` | build guards | 752 URLs, 0 vanished · 2 orphans tracked · 7,728 links resolve · 87 figures match | pass |
| 11–18 | `lint-frontmatter` · `lint-naming` · `check-frontmatter-yaml` · `-delimiter` · `check-license-frontmatter` · `check-templates` · `check-section-citations` · `check-plain-writing` | various | 0 | 0 |

Rule findings: 175 (rows 1–5, prose counted once). Enforced: 0.

### 2.2 By series (`check-document-shape`)

| Series | Docs | Over budget | Form failures | Worst |
|---|---|---|---|---|
| missions | 11 | 11 | 4 | `MIS-121` 4,521 words on 500 |
| canon | 8 | 6 | 8 | `CAN-002` 5,068 on 1,500 |
| blueprints | 10 | 5 | 6 | `BLU-009` 3,100 on 1,000 |
| reports | 5 | 4 | 2 | `RPT-017` 5,190 on 1,000 |
| protocols | 11 | 1 | 3 | `PRO-015`: no Binds, no plated rule |
| debt | 1 | 1 | 1 | `DBT-020` 626 on 300 |
| standards | 24 | 1 | 0 | — |
| decisions | 7 | 0 | 0 | — |

Standards and decisions are in shape. The weight is in canon, missions and
blueprints.

### 2.3 By severity

Severity is blast radius: what a reader is misled about.

**High — a citation that resolves to nothing.** 74. 36 identifiers no
document carries (`P-001`, `P-003`, `P-010`, `S-009`, `D-017`, `D-032`,
`D-033`: pre-ADR-005 prefixes) cited from `CHANGELOG.md` (9), `decisions/`
(10), `missions/` (5), `operations/` (3). 36 bare filenames that no longer
exist (`MEMORY.md` ×7, `STATUS.md` ×5, `GOVERNANCE.md` ×3), mostly from
`CHANGELOG.md`, `system/`, `operations/`. 2 dead links (`README.md` →
`ADR-023`; `SYS-001` → `BP-cao.md`).

**High — text the archive cannot see.** 55,606 characters of prose only in
20 `.astro` components. Largest: `solutions.astro` 9,247, `HomeView` 5,508,
`ContinuityView` 4,506, `SpeechPlayer` 4,457, `wardley.astro` 3,703. Site
pages with no `.md` behind them.

**Medium — a document missing its shape.** 22: 19 cards missing Summary,
Epistemic or Pragmatic (`BLU-007`, `BLU-008`, `CAN-004`, `CAN-006`,
`CAN-007`, `MIS-0123`, `ANNEX-mission-selection`, `RPT-008`); 3 in `PRO-015`.

**Medium — a header that contradicts its log.** `MIS-0135`, `RPT-017`,
`RPT-018`: header version ≠ newest log entry; `RPT-018`'s log runs
backwards. `STD-008` cites `CAN-008 §3` by number.

**Low — over budget.** 57 SHOULD overruns; reported, never blocking.

**Low — closed missions nobody cites.** `MIS-0123`, `MIS-0153`: roll-up
candidates (`ADR-033`, `PRO-017`).

### 2.4 Outside CI

`ci.yml` runs 12 of 16 guards and 1 of 7 test suites. Not run: the rule
guards `check-document-shape`, `check-section-citations`,
`check-prose-in-code`, `check-plain-writing`; the suites `regime`, `rules`,
`blindness`, `prose-ratchet`, `rename-series`, `lint-naming`. All pass on
main except `lint-naming.test.mjs`, 4/9. The regime that decides what CI
enforces is tested by nothing CI runs.

## 3. What this report did NOT examine

- Whether each rule is the right rule; that is step 5's argument.
- The web's own tests and `check-responsive` (needs a browser).
- The 23 `.md` files with no `license:` that `check-license-frontmatter`
  skips by design.
- Whether the 36 pre-ADR-005 identifiers resolve in git history (`ADR-043`
  rule 8). The guard cannot tell; neither did I.

## 4. Recommendations

In order of dependency, each with its actor.

1. **Oracle — decide whether `active` requires `ratified_by`.** A guard
   reads `status` and trusts it. Until decided, ratification rests on a word
   an agent can type.
2. **Ursa — every guard and every test into CI, reporting.** Nothing blocks
   while the axis is draft; the regime gains a test that runs.
   `lint-naming.test.mjs` is repaired first or enters as known. The YAML is
   the Oracle's to paste.
3. **Ursa — batches for the Oracle to approve:** (a) the 74 references;
   (b) the 22 form failures, 10 documents; (c) the 5 core-rule findings, 4
   documents; (d) the prose in code, one page at a time or a declared
   exception each; (e) the 29 bodies over budget, canon first, each cut a
   conversation under `ADR-043`.
4. **Oracle — ratify one standard at a time** as its guard reaches zero:
   `STD-007` after (b), `STD-019`/`STD-021` after (c), `STD-020` after (a),
   `STD-006` after (d).

## References

| ID | Title | Relation |
|---|---|---|
| `STD-005` | Engineering baseline | the regime `ENG-067` every figure obeys |
| `STD-007` | One page per document | holder of DOC-002..004 and the budgets |
| `STD-020` | Git is the archive | holder of GIT-048 |
| `STD-006` | Plain text is sovereign | holder of TXT-003 |
| `DBT-020` | Declared automatic, executed by nobody | the `[MANUAL]` rows §2.4 extends |

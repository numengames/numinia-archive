---
id: "RPT-017"
uid: ""
title: "The MVP story: sixty-six missions, five arcs, one road still open to Alpha"
type: report
subtype: analysis
status: active
version: "0.5.1"
created: "2026-09-08T10:27:15Z"
created_source: "git:59f5cfa"
created_confidence: exact
updated: "2026-09-10T05:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
tags: [mvp, narrative, missions, alpha, reset, compression]
license: "CC-BY-4.0"
visibility: "public"
scope: "What `missions/` shows as `done` at the measured commit, compressed into a narrative; not an audit of quality or of what remains."
related: ["MIS-127", "MIS-146", "ADR-005", "ADR-030", "ADR-040", "PRO-003", "RPT-018"]
absorbs: ["MIS-027", "MIS-0027", "MIS-053", "MIS-0053", "MIS-058", "MIS-0058", "MIS-064", "MIS-0064", "MIS-078", "MIS-0078", "MIS-079", "MIS-0079", "MIS-080", "MIS-0080", "MIS-081", "MIS-0081", "MIS-082", "MIS-0082", "MIS-083", "MIS-0083", "MIS-087", "MIS-0087", "MIS-088", "MIS-0088", "MIS-110", "MIS-0110", "MIS-126", "MIS-0126", "MIS-130", "MIS-0130", "MIS-133", "MIS-0133", "MIS-010", "MIS-0010", "MIS-011", "MIS-0011", "MIS-016", "MIS-0016", "MIS-037", "MIS-0037", "MIS-038", "MIS-0038", "MIS-039", "MIS-0039", "MIS-041", "MIS-0041", "MIS-042", "MIS-0042", "MIS-044", "MIS-0044", "MIS-045", "MIS-0045", "MIS-047", "MIS-0047", "MIS-051", "MIS-0051", "MIS-056", "MIS-0056", "MIS-057", "MIS-0057", "MIS-059", "MIS-0059", "MIS-060", "MIS-0060", "MIS-062", "MIS-0062", "MIS-063", "MIS-0063", "MIS-065", "MIS-0065", "MIS-066", "MIS-0066", "MIS-072", "MIS-0072", "MIS-073", "MIS-0073", "MIS-075", "MIS-0075", "MIS-076", "MIS-0076", "MIS-086", "MIS-0086", "MIS-089", "MIS-0089", "MIS-090", "MIS-0090", "MIS-091", "MIS-0091", "MIS-092", "MIS-0092", "MIS-093", "MIS-0093", "MIS-094", "MIS-0094", "MIS-105", "MIS-0105", "MIS-109", "MIS-0109", "MIS-111", "MIS-0111", "MIS-114", "MIS-0114", "MIS-115", "MIS-0115", "MIS-116", "MIS-0116", "MIS-117", "MIS-0117", "MIS-118", "MIS-0118", "MIS-119", "MIS-0119", "MIS-120", "MIS-0120", "MIS-122", "MIS-0122", "MIS-125", "MIS-0125", "MIS-128", "MIS-0128", "MIS-129", "MIS-0129", "MIS-132", "MIS-0132", "MIS-136", "MIS-0136", "MIS-137", "MIS-0137", "MIS-139", "MIS-0139", "MIS-140", "MIS-0140", "MIS-143", "MIS-0143", "MIS-144", "MIS-0144", "MIS-145", "MIS-0145", "MIS-147", "MIS-0147", "MIS-001", "MIS-0001", "MIS-002", "MIS-0002", "MIS-003", "MIS-0003", "MIS-004", "MIS-0004", "MIS-005", "MIS-0005", "MIS-006", "MIS-0006", "MIS-007", "MIS-0007", "MIS-009", "MIS-0009", "MIS-012", "MIS-0012", "MIS-013", "MIS-0013", "MIS-014", "MIS-0014", "MIS-015", "MIS-0015", "MIS-017", "MIS-0017", "MIS-019", "MIS-0019", "MIS-020", "MIS-0020", "MIS-023", "MIS-0023", "MIS-024", "MIS-0024", "MIS-025", "MIS-0025", "MIS-028", "MIS-0028", "MIS-029", "MIS-0029", "MIS-030", "MIS-0030", "MIS-031", "MIS-0031", "MIS-033", "MIS-0033", "MIS-034", "MIS-0034", "MIS-036", "MIS-0036", "MIS-040", "MIS-0040", "MIS-046", "MIS-0046", "MIS-049", "MIS-0049", "MIS-052", "MIS-0052", "MIS-054", "MIS-0054", "MIS-061", "MIS-0061", "MIS-067", "MIS-0067", "MIS-068", "MIS-0068", "MIS-074", "MIS-0074", "MIS-077", "MIS-0077", "MIS-084", "MIS-0084", "MIS-106", "MIS-0106", "MIS-108", "MIS-0108", "MIS-138", "MIS-0138", "MIS-141", "MIS-0141", "MIS-008", "MIS-0008", "MIS-018", "MIS-0018", "MIS-021", "MIS-0021", "MIS-022", "MIS-0022", "MIS-026", "MIS-0026", "MIS-032", "MIS-0032", "MIS-035", "MIS-0035", "MIS-043", "MIS-0043", "MIS-048", "MIS-0048", "MIS-050", "MIS-0050", "MIS-055", "MIS-0055", "MIS-071", "MIS-0071", "MIS-069", "MIS-0069", "MIS-070", "MIS-0070", "MIS-085", "MIS-0085", "MIS-095", "MIS-0095", "MIS-102", "MIS-0102", "MIS-103", "MIS-0103", "MIS-104", "MIS-0104", "MIS-107", "MIS-0107", "MIS-152", "MIS-0152"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# The MVP story: sixty-six missions, five arcs, one road still open to Alpha

> **Summary:** Sixty-six missions are `done` at `59f5cfa` (2026-09-08). This
> report compresses them into one narrative — what was actually built, not a
> list of cards — ahead of a planned corpus reset that will remove most of
> `missions/`'s present detail.
> **Epistemic:** What the `done` missions, read together, say happened.
> Individual mission bodies remain the primary source; this report is a
> lossy summary of them, made on purpose.
> **Pragmatic:** Read this instead of sixty-six files to understand what
> exists today. Cite the missions themselves, not this report, for any
> claim needing acceptance-criteria detail.
> **Audience:** Agents · Oracles · External collaborators

---

## Why this report exists, and why it stays open

Numen Games is about to do a **gran reseteo**: a deliberate reduction of
`missions/` that will strip most present-tense detail from the corpus and
start much of the system's operating memory close to zero. That is a good
move — it is the same "reduce uncertainty, keep only what a live question
needs" discipline `MIS-127` has been running on `decisions/`, `canon/`,
`operations/`, `reports/` and `debt/` since 2026-08-30 (see that mission's
ledger for the token-by-token accounting of each cut).

The problem a reset creates: once a `done` mission's record thins out or
disappears, the *story* of what was built goes with it — not the
acceptance criteria (nobody needs those after the fact), the narrative.
This report exists to save that narrative before the corpus does not carry
it any more.

**It stays `status: active`, not `closed`.** `STD-001` describes `reports/`
as a `closed`-from-publication series — but `machine/scripts/lib/rules.json`, the
lifecycle the CI guard actually enforces, has no `report`-specific entry
and falls through to the default `draft → active → closed`. Enforcement
allows what the prose does not name. This report uses that room
deliberately: it is meant to be **appended to** — with dated notes, never
silent rewrites — as more missions close on the way to Alpha, and closed
only when the Oracle decides the MVP chapter is over. That is a
premise gap between doctrine and guard worth the Oracle's attention on its
own terms; it is not litigated here, only used and flagged.

**Measured at:** `59f5cfa`, 2026-09-08. Method: every `missions/MIS-*.md`
front matter parsed (`id`, `status`, `completed`, `guild`, `territory`,
`title`), template and annex files excluded. 149 mission files read; 66
carry `status: done`.

---

## The story, in five arcs

Sixty-six done missions, read by date and territory, cluster into five
arcs. Titles are exactly the missions' own; nothing paraphrased.

### Arc 1 — Bootstrap (2026-04-05 to 04-08, 11 missions)

The company got a repository, its agents got working tools, and the first
two protocols were written. `MIS-037` created the canon repository itself
(then `numinia-digital-agents`). `MIS-016` put Caddy and SSL in front of
every server service; `MIS-011` audited numengames.com. `MIS-051` and
`MIS-053` wired Gmail, Calendar, Drive and email (Khepri) into the agent
layer. `MIS-059` and `MIS-038` wrote the Context Load Protocol and the
Design Briefing Protocol — the first two things an agent was told to obey
before doing anything else. (The mission's own title still calls it
"P-007"; no live protocol answers to that id today — an unrenamed relic
of the pre-`PRO-` prefix scheme, not a citable identifier.) `MIS-057` ran the first deep QA of the whole
NWOS system. `MIS-042` and `MIS-047` gave the org a README and a standing
weekly report. `MIS-063` deployed the first public form, at `/velo`.

### Arc 2 — The archive becomes legible (2026-08-17/18, 11 missions)

Four months later, the corpus stopped being a private git tree and became
a public, English, on-brand website. `MIS-056` translated the canon to
English; `MIS-066` unified the mission system into one folder, one
language. `MIS-087` mirrored every canon document on numinia.org, `MIS-088`
made it downloadable as formatted PDF, `MIS-090` built a frozen demo
workspace so the system could be shown without burning tokens. `MIS-092`
`MIS-092` through `MIS-094` moved the whole surface onto Design System v5 — palette,
Phosphor icons, typography — commissioned by numinia.org as the consumer,
not handed down from elsewhere. `MIS-010` published the public roadmap
v1.0, `MIS-041` wrote the agent onboarding protocol, `MIS-044` published
the GAPS capability map — see `RPT-008` today.

### Arc 3 — Governance becomes visible (2026-08-25, 10 missions)

The board that tracks the work got designed as carefully as the product.
`MIS-132` and `MIS-133` reordered the Mission Board by operability and gave
mission cards a three-level hierarchy. `MIS-039` built the agent log
system. `MIS-045`
documented the CAO architecture. `MIS-091` extended the design system to
numen.games and nwos.numen.games. `MIS-110`, `MIS-111` and `MIS-114`
cleared dead nav entries, gave every corpus section a real index ordered
by certainty, and let `debt/` rejoin the build glob while an unready entry
stayed unpublished. `MIS-027` improved numengames.com itself.

### Arc 4 — The entropy-reduction line (2026-08-27 to 09-05, 20 missions)

This is the largest arc, and it is the one still running: it is the same
line `MIS-127` (still `in-progress`, not `done` — the umbrella outlives
its own child PRs) has been ruling on since 2026-08-30. `MIS-116` finished
the English translation; `MIS-064` updated `PRO-001` (then still cited as
"P-001") to Agent Briefing Protocol v2; `MIS-125` found and closed the
prefix register
gap across four series no rule knew about; `MIS-129` sent six blueprints to
the shelves their content actually belonged on. `MIS-144` retired dead
migration scripts; `MIS-145` gave every registered series a real
copy-from template (twelve of fourteen templates weren't even `.md` files
before this); `MIS-147` documented the relations between the corpus's
document genres. `MIS-062` shipped Mission System v2 (states,
sub-missions, IDs, kanban); `MIS-065` moved canon rendering to build time,
out of the code regime; `MIS-089` reordered the archive's information
architecture; `MIS-105` signed the standards governing three repositories
at once; `MIS-115` redesigned the Mission Board around what's actionable.
`MIS-117` added client-side search; `MIS-118` replaced the agent roster
with real operative definitions; `MIS-120` shipped `es-ES` as the first
additional locale. `MIS-122`, `MIS-126`, `MIS-128` and `MIS-130` are the
smaller repairs this line produces as a matter of course: a `uid` rule
that contradicted its own standard, a field-decision index so the canon
gets asked before the Oracle does, post-rename link hygiene, four dead
links in the front door. `MIS-058` and `MIS-060` are the protocol and
sync-mechanism side of the same discipline: structured human-machine
approval, and agents kept synchronized with the canonical repo.

### Arc 5 — The platform gets built (dates not recorded, 14 missions)

`numinia-web` — the product itself — is `done` in fourteen missions that
share one gap worth naming plainly: **none of them carries a `completed`
date.** `MIS-072` laid the monorepo foundations, domain model and quality
floor; `MIS-073` made the CC0 Archive browsable in five locales; `MIS-075`
reached functional parity with the original numinia.store; `MIS-076`
delivered the three pillars — La Ciudad, Assets, L.A.P.; `MIS-078` dressed
the platform (Khepri); `MIS-079` wrote the City as one scrolling
narrative; `MIS-080` turned L.A.P. into a real platform; `MIS-081` opened
the Manual and made the Archive count; `MIS-082` built the session
surface (Settings, the door); `MIS-083` opened the Oracle's admin zone
behind real sessions; `MIS-086` brought the real legal corpus into
numinia.com with a consent gate; `MIS-109` made canon filable
(frontmatter, registration, the term-divergence question); `MIS-119` let
the archive read any document aloud; `MIS-0143` integrated three new
agents — Calliope, Nimrod, Talos. **This report does not know when any of
these fourteen shipped**, only that `status: done` is asserted. That is a
data gap in `missions/` itself, not something this report can resolve by
summarizing harder.

---

## What this story leaves out, on purpose

Sixty-six `done` missions are roughly 44% of the 149 read at this commit.
The rest, briefly, so the MVP does not read as the whole picture:

- **32 `todo`**, **11 `in-progress`**, **2 `in-review`** — live work,
  covered by the board itself, not by a narrative report.
- **38 `frozen`** — 22 of them marked `cancelled` outright, 16 blocked or
  parked. The cancelled 22 are concentrated in the original commercial
  plan: `Product`, `Sales`, `Funding` and `Content` territory missions
  (34 total, only 3 `done`) include `MIS-001` — **"Define the Numinia MVP
  in one page,"** the mission that named the MVP this report is about —
  now itself `frozen: cancelled`, along with the first prototype
  (`MIS-003`), the first pricing model (`MIS-004`), the first landing page
  (`MIS-005`), and eight more of the same April cohort. **The MVP that
  shipped is not the MVP that was planned.** That is not a defect this
  report is positioned to judge; it is a fact worth the Oracle reading
  plainly rather than inferring from a missing card.

---

## The road to Alpha

The gran reseteo, when it lands, is expected to remove references and
restart most of `missions/` close to zero — the same reduction discipline
Arc 4 above has already been running, taken to a larger scope. This
report is written to survive that: its claims are sourced to commit
`59f5cfa` and to the missions themselves (recoverable from git history
even after a card is gone), and it is meant to grow — one dated section,
never a silent edit — as the corpus keeps moving from this MVP toward
Alpha. When the Oracle judges that transit complete, this report closes
(`status: closed`) as its own final entry, not before.

---

## Appendix — the 66, in arc order

| # | ID | Completed | Territory | Title |
|---|---|---|---|---|
| 1 | MIS-016 | 2026-04-05 | Infrastructure | Caddy + SSL for all server services |
| 2 | MIS-051 | 2026-04-05 | CAO | Gmail, Calendar and Drive integration with agents |
| 3 | MIS-053 | 2026-04-05 | CAO | Khepri — Numen Games email operational |
| 4 | MIS-037 | 2026-04-06 | CAO | Create numinia-digital-agents repository (Archive Summa) |
| 5 | MIS-059 | 2026-04-07 | CAO | P-007 — Context Load Protocol |
| 6 | MIS-057 | 2026-04-07 | CAO | Deep QA of the NWOS System — Coherence, Cycles, Human-in-the-Loop, Metrics |
| 7 | MIS-042 | 2026-04-07 | TBA | Main README for numinia-agents |
| 8 | MIS-047 | 2026-04-07 | TBA | Configure automatic weekly report |
| 9 | MIS-063 | 2026-04-07 | Product | NWOS Phase 2 — Iteration 1: Deploy Form at /velo |
| 10 | MIS-011 | 2026-04-08 | Infrastructure | Technical audit of numengames.com |
| 11 | MIS-038 | 2026-04-08 | CAO | Design Briefing Protocol v1.0 |
| 12 | MIS-010 | 2026-08-17 | Product | Numinia public roadmap v1.0 |
| 13 | MIS-041 | 2026-08-17 | CAO | Onboarding protocol for new agents |
| 14 | MIS-044 | 2026-08-17 | TBA | GAPS.md — Numen Games capability map |
| 15 | MIS-056 | 2026-08-17 | TBA | Repo Translation to English — NWOS Canon in English Only |
| 16 | MIS-066 | 2026-08-17 | CAO | Unify the mission system: one folder, one language, one page |
| 17 | MIS-087 | 2026-08-18 | TBA | The complete mirror: every canon .md navigable on numinia.org |
| 18 | MIS-088 | 2026-08-18 | TBA | The canon on paper: PDF download of the .md files with design-system formatting |
| 19 | MIS-090 | 2026-08-18 | TBA | Frozen demo workspace: showing NWOS without burning AI tokens |
| 20 | MIS-092 | 2026-08-18 | TBA | The palette comes home: numinia.org migrates to the System v5.0.0 canonicals |
| 21 | MIS-093 | 2026-08-18 | TBA | The icons speak Phosphor and the typography falls in line with the system |
| 22 | MIS-094 | 2026-08-18 | TBA | The emitter governs: Design System 5.1.0 commissioned by the consumer |
| 23 | MIS-027 | 2026-08-25 | Content | numengames.com improvement |
| 24 | MIS-039 | 2026-08-25 | CAO | Agent log system |
| 25 | MIS-045 | 2026-08-25 | TBA | Document CAO architecture |
| 26 | MIS-064 | 2026-08-25 | CAO | Update P-001 — Agent Briefing Protocol v2 |
| 27 | MIS-091 | 2026-08-25 | TBA | The System dresses the house: numen.games and nwos.numen.games adopt the standards |
| 28 | MIS-110 | 2026-08-25 | TBA | Retire the thirteen Sistema entries from the nav, leaving their pages reachable |
| 29 | MIS-111 | 2026-08-25 | TBA | Give each corpus section a real index, ordered from least to most uncertain |
| 30 | MIS-114 | 2026-08-25 | TBA | Filter the build by visibility, so debt/ can return to the glob without publishing D-033 |
| 31 | MIS-132 | 2026-08-25 | TBA | Order the Mission Board by operability, and show the date it sorts by |
| 32 | MIS-133 | 2026-08-25 | TBA | Give the mission card a three-level hierarchy, on the design system's scale |
| 33 | MIS-116 | 2026-08-27 | Archive | Translate the repo's remaining Spanish documents to English |
| 34 | MIS-117 | 2026-08-28 | TBA | Add client-side search to numinia.org with Pagefind |
| 35 | MIS-118 | 2026-08-28 | TBA | Replace the agent roster with the operative agent definitions |
| 36 | MIS-120 | 2026-08-29 | TBA | Multi-language numinia.org: es-ES first |
| 37 | MIS-128 | 2026-08-30 | Archive | Link hygiene after the English renames: canonicals, raw-md, OG image, and a 404 that helps |
| 38 | MIS-122 | 2026-08-30 | Archive | The uid rule contradicts its standard: fix HDR-009 before anyone obeys it |
| 39 | MIS-126 | 2026-08-30 | Archive | The field decision index — ask the canon before asking the Oracle |
| 40 | MIS-130 | 2026-09-01 | Archive | Fix the four dead links in README.md — the entry point resolves |
| 41 | MIS-058 | 2026-09-02 | TBA | Approval Brief Protocol: Structured communication for human-machine approvals |
| 42 | MIS-060 | 2026-09-02 | CAO | Agent Synchronization with the Canonical Repo |
| 43 | MIS-062 | 2026-09-02 | CAO | Mission System v2 — States, Sub-missions, IDs, Kanban |
| 44 | MIS-065 | 2026-09-02 | TBA | Canon at build time — narrative out of the code regime |
| 45 | MIS-089 | 2026-09-02 | Archive | Information architecture: the archive gets ordered and the web mirrors it by sections |
| 46 | MIS-105 | 2026-09-02 | TBA | Sign the standards and define the sync: a draft is governing three repositories |
| 47 | MIS-115 | 2026-09-02 | TBA | Redesign the Mission Board so its order and cards say what is actionable |
| 48 | MIS-125 | 2026-09-02 | Archive | The prefix register — four series carry identifiers no rule knows about |
| 49 | MIS-129 | 2026-09-02 | Archive | Send each blueprint to the shelf its content belongs on, and open the two shelves that were missing |
| 50 | MIS-144 | 2026-09-03 | Archive | Retire dead migration scripts and superseded one-shot fixes from machine/scripts/ |
| 51 | MIS-145 | 2026-09-04 | Archive | Series template library: every registered series gets a copy-from template in machine/templates/ |
| 52 | MIS-147 | 2026-09-05 | Archive | Document the relations between the NWOS document genres |
| 53 | MIS-072 | — | Platform | numinia-web foundations: monorepo, domain model, quality floor |
| 54 | MIS-073 | — | Platform | The CC0 Archive: every public asset browsable in 5 locales |
| 55 | MIS-075 | — | Platform | Functional parity with the original numinia.store public surface |
| 56 | MIS-076 | — | Platform | Three pillars: La Ciudad, Assets, L.A.P. |
| 57 | MIS-078 | — | Platform | Khepri: the platform dresses itself |
| 58 | MIS-079 | — | Platform | The City chronicle: /city/ as one scrolling narrative |
| 59 | MIS-080 | — | Platform | The L.A.P. becomes a platform |
| 60 | MIS-081 | — | Platform | The Manual opens, the Archive counts |
| 61 | MIS-082 | — | Platform | Settings and the door: L.A.P. session surface |
| 62 | MIS-083 | — | Platform | The Oracle's zone: admin surface behind real sessions |
| 63 | MIS-086 | — | Platform | The real legal corpus enters numinia.com and the gate asks for its acceptance |
| 64 | MIS-109 | — | Archive | Make canon filable: frontmatter, registration and the term divergence |
| 65 | MIS-119 | — | TBA | Listen to the archive: speak any document aloud from its page |
| 66 | MIS-0143 | — | Archive | Integrate three new agents: Calliope, Nimrod, Talos |

---

## 2026-09-08 — The reset lands: 70 `done` missions deleted, this report is their record

Dated addition, v0.2.0. Nothing above is rewritten.

**What was done.** Under `ADR-040` (a `done` mission may be deleted) and
`ADR-030` (four tests), every `status: done` mission in `missions/` was
deleted in two batches: 16 in PR #286, and the remaining 54 in the PR that
carries this note. `missions/` goes from 133 files to 79; `done` goes to 0.
Each deleted identifier is listed in this report's `absorbs:` front matter,
so `machine/scripts/check-references.mjs` resolves any citation of it to this
document, and each public address (`/missions/mis-NNNN` and its `/misiones/`
alias) 301s here from `web/astro.config.mjs`. The mission bodies remain in
git history at `2677f01` and earlier.

**Oracle instruction.** The Oracle ruled on 2026-09-08 that the reset takes
priority over per-citation rewriting: all `done` missions are removed, and
the places that mention them keep their mentions, resolved by `absorbs:`.
That is `ADR-030`'s reachability clause served by the resolver rather than by
editing 65 living files — a reader following `MIS-056` lands on the text
that now contains its story. Where a living document carried a markdown
*link* to a deleted file (a path, not an identifier), the link was replaced
with a plain identifier, because a path cannot be absorbed.

**Four missions this narrative did not cover.** `MIS-136`, `MIS-137`,
`MIS-139` and `MIS-140` were closed in PR #284, *after* v0.1.0 of this
report was written. They are deleted with the rest. Their closures, checked
against the tree before deletion:

- `MIS-136` — corrected the DEUDA-404 comment in `web/astro.config.mjs`.
  **Verified true** (the comment at line 24–25 reads as claimed).
- `MIS-137` — claims `machine/scripts/requirements-tools.txt` pinning `reuse==6.2.0`
  and a CI step. **Neither exists** in `main`, in any branch, or in any
  commit (`git log --all -S`).
- `MIS-139` — claims two legacy manual references repointed in
  `numinia-web`. **Not done**: the decisions log (line 111) and
  the onboarding report (line 23) in `numengames/numinia-web` still carry the
  retired name.
- `MIS-140` — claims `machine/scripts/check-published-coverage.mjs` and a CI step.
  **Neither exists** anywhere in the repository's history.

Three of the four `done` closures in #284 assert evidence the tree does not
hold. They are recorded here as *claimed, not delivered*, so that the debt is
not lost with the cards: the `reuse` pin, the publish-coverage guard and the
`numinia-web` repoint remain open work for the Alpha, unowned by any mission
file until one is written.

**Measured at:** `2677f01` before the deletion. `missions/` 133 → 79;
`done` 54 → 0; `todo` 32, `in-progress` 7, `in-review` 2, `frozen` 38
unchanged.

---

## 2026-09-08 — The frozen shelf goes too: 38 missions that were decided against, or never got started

Dated addition, v0.3.0. Nothing above is rewritten.

**What was done.** On the Oracle's instruction, the 38 `status: frozen`
missions were deleted in the PR that carries this note. `missions/` goes
from 79 to 41; `frozen` goes to 0. What remains is live work only: `todo`,
`in-progress`, `in-review`. Their identifiers join this report's `absorbs:`
and their addresses 301 here, as with the `done` batches. Bodies remain in
git history at `3a71b0b`.

**Why this needed a rule change.** `PRO-003` §2 said of a cancelled
mission: *"keeps its file, `frozen` with the reason. Never deleted."*
`ADR-040` deliberately left that standing — a cancelled mission has no
successor document to carry its resolution into. This section *is* that
document: the record of what was decided against, and why, survives here
in one table instead of thirty-eight files. `PRO-003` is amended in the
same PR (`ADR-040` v1.1.0, dated note) so the protocol and the tree agree.

**The 22 cancelled — the plan that did not ship.** Every one carries
`freeze_reason: cancelled`; all but three were written on 2026-04-07, the
day the company drafted its first commercial plan. They are the MVP that
was planned and replaced by the one that was built (see *What this story
leaves out*, above): the one-page MVP definition, the paying-user map, the
navigable prototype, monetisation v1, a landing page with lead capture, a
Cal.com onboarding, a 5-user pilot, a pitch deck, a content strategy, a
funding memo. On the infrastructure side: CI/CD, monitoring, Umami, a
stack document — replaced by the archive-first line Arc 2 to 4 describe.
Nothing here is a loss the Alpha needs to recover; it is the record that
the question was asked and answered *no*.

| ID | Territory | Title |
|---|---|---|
| MIS-001 | Product | Define the Numinia MVP in one page |
| MIS-002 | Product | User map: who pays and why |
| MIS-003 | Product | Navigable Numinia prototype |
| MIS-004 | Product | Define monetization model v1 |
| MIS-005 | Product | Numinia landing page with lead capture |
| MIS-006 | Product | Experience architecture: Numinia session |
| MIS-007 | Product | Integrate Cal.com into Numinia onboarding |
| MIS-009 | Product | Closed pilot with 5 beta users |
| MIS-012 | Infrastructure | Set up CI/CD pipeline for numengames.com |
| MIS-013 | Infrastructure | Monitoring and alerts system |
| MIS-014 | Infrastructure | Install Umami on numengames.com |
| MIS-015 | Infrastructure | Document Numinia's tech stack |
| MIS-020 | Sales | Interactive Demo / Pitch Deck |
| MIS-024 | Sales | Post-call follow-up system |
| MIS-025 | Content | 30-day content strategy |
| MIS-030 | Content | Weekly \ |
| MIS-036 | Funding | Memo: Q2 2026 funding strategy |
| MIS-046 | TBA | READMEs for numengames org repos |
| MIS-049 | TBA | DORA Metrics for numengames-web |
| MIS-054 | CAO | Multi-Oracle access to Nimrod via Telegram |
| MIS-061 | Product | El Sistema — NWOS Web Visualization at pablofm.com/sistema |
| MIS-067 | CAO | Inspections System — document type, directory and first ISO 15489 inspection |

**The 16 parked — blocked on something the repository does not hold.**
These were not decided against. Each was frozen because its next step
lived outside this repo: a Sales owner the Oracle has not named (`MIS-017`,
`MIS-019`, `MIS-023`), a channel decision never written (`MIS-028`,
`MIS-029`), a grant cycle that passed (`MIS-031`), a sponsor or funding
model never decided (`MIS-033`, `MIS-034`), a dashboard target that was
retired (`MIS-040`), hardware in transit (`MIS-052`), numinia-web work on
the wrong shelf or copy the Oracle has not written (`MIS-074`, `MIS-077`),
a domain renewal date (`MIS-084`), an external repository and a CAN-005
ruling (`MIS-106`, `MIS-108`), and one folded into `MIS-096` (`MIS-068`).
The trigger for each is recorded in the table so that, if the Alpha meets
it, the question can be re-opened as a new mission — not by restoring the
card.

| ID | Territory | Title | Freeze reason |
|---|---|---|---|
| MIS-017 | Sales | B2B Prospecting Pipeline (50 leads) | no owner and no live Sales channel; unfreeze when the Oracle names one |
| MIS-019 | Sales | Sequential outreach to 20 prospects | waits on MIS-017 having an owner; a 3-touch sequence with no prospect list is not executable |
| MIS-023 | Sales | Initial Case Study | no client case exists yet; unfreeze when one does |
| MIS-028 | Content | Founding Newsletter / Mailing list | no owner and no channel decision recorded; same family as MIS-005 |
| MIS-029 | Content | Community on Discord or Telegram | its own criterion 1 asks for a community-channel DEC that was never written; unfreeze when it is |
| MIS-031 | Funding | Final review of the Arbitrum grant | wallet address never provided and the grant cycle passed; the Oracle decides whether the grant is still pursued |
| MIS-033 | Funding | Identify 10 Web3/Gaming sponsors | no owner, no citer, no channel; the sponsor model was never decided |
| MIS-034 | Funding | Angel investor deck v1.0 | no funding round open; same ruling as MIS-020 |
| MIS-040 | CAO | CAO dashboard: KPI definition | targets the retired pablofm.com dashboard; re-brief against numinia.org/missions (which already shows mission KPIs) to unfreeze |
| MIS-052 | Infrastructure | On-premises infrastructure — Dedicated PC | waiting on hardware delivery — the PC in transit; unfreeze when it exists |
| MIS-068 | CAO | NWOS propagation: consumer repos never drift from the source of truth | folded into MIS-096 on 2026-09-02: its two surviving criteria (inventory of propagating artefacts; reporting guard) moved there; this file stays as the diagnosis record |
| MIS-074 | Platform | Progressive identity (Web2→Web3) for numinia.com | numinia-web work (Session Zero ranks) parked on the wrong shelf; nothing executable from numinia-nwos |
| MIS-077 | Platform | Data dignity: Numinia vs today's internet | numinia-web copy the Oracle has not written; nothing an agent of this repo can start |
| MIS-084 | Platform | numinia.store → numinia.com: SEO migration and legacy shutdown | parked by Oracle order 2026-08-16; the numinia.store renewal date is the trigger |
| MIS-106 | TBA | The mould carries a retired name: the template still calls the system Khepri | blocked on an external repository and an Oracle ruling (CAN-005, *the name is never opened*) |
| MIS-108 | TBA | Offer the mould its own provenance: the template still calls itself the source | blocked with MIS-106 — same external repository, same ruling |

**Measured at:** `3a71b0b` before the deletion. `missions/` 79 → 41;
`frozen` 38 → 0; `todo` 32, `in-progress` 7, `in-review` 2 unchanged.

---

## 2026-09-08 — The alpha focus: 23 more, and `missions/` becomes the alpha board

Dated addition, v0.4.0. Nothing above is rewritten.

**The Oracle's rule, stated once.** From this point `missions/` holds only
work that ships the numinia-nwos alpha. Anything else is deleted, not
parked: *if it is relevant it will be rediscovered when its time comes.*
`missions/` goes from 41 to 18. Bodies remain in git history at `45d67fd`.

**2 closed by the Oracle and deleted the same day.** `MIS-138` (the
telemetry instrument, `machine/scripts/telemetry.mjs`, 87 figures, `--check` in
CI) and `MIS-141` (the dataset published at `/telemetry/`) are `done` by
Oracle decision, loose ends to be picked up if they surface. Together
with Arc 5 above they close the measurement line this report was written
against.

| ID | Territory | Title |
|---|---|---|
| MIS-138 | Archive | Build the telemetry instrument so every live figure in the corpus is measured, not typed |
| MIS-141 | Archive | Publish the telemetry dataset as a page on numinia.org |

**11 April stubs.** Written 2026-04-07 alongside the 22 cancelled in the
previous section, never frozen because nobody looked at them again. ~500
tokens each, no body beyond the summary, `assigned_to: null` for five
months. Deleted on the same grounds as their siblings: the plan they
belonged to was replaced.

| ID | Territory | Title |
|---|---|---|
| MIS-008 | Product | Define the product's North Star metrics |
| MIS-018 | Sales | Commercial Value Proposition (One-Pager) |
| MIS-021 | Sales | Pricing and Packages Definition |
| MIS-022 | Sales | Alliances with indie studios and DAOs |
| MIS-026 | Content | X/Twitter channel activation |
| MIS-032 | Funding | Research: Ethereum Foundation ESP |
| MIS-035 | Funding | Grants and funding CRM |
| MIS-043 | TBA | Complete reading of the Numinia RPG Manual |
| MIS-048 | TBA | Agent cost tracking system |
| MIS-050 | TBA | Backlog review ritual (Dark Council) |
| MIS-055 | CAO | Dual Nomenclature System — Narrative Dial + Gamification Dial |

**1 by Oracle order.** `MIS-071` (*File over App, total*) was
`in-progress` since 2026-08-17 with no executor. Deleted on instruction;
its question — is every piece of the system a `.md`? — is answered by the
tree itself now, not by a card.

**9 outside the alpha.** Real missions, written in August with real
findings, whose deliverable lives in another repository, another site, or
the organisation at large. The reason each one is not alpha work is
recorded so that whoever rediscovers it knows where it was pointing.

| ID | Territory | Title | Why not alpha |
|---|---|---|---|
| MIS-069 | Infrastructure | Plan B: GitHub-independent continuity for the NWOS source of truth | continuity plan for the org, not a deliverable of this repo; git is already distributed |
| MIS-070 | Infrastructure | Testing and best practices across the numengames org | testing across the numengames org — other repositories |
| MIS-085 | Platform | Numinia Codex Reader + LAP (numinia.com/lap/) | Codex Reader + LAP on numinia.com — a world artefact, another site |
| MIS-095 | TBA | Every web publishes its Updates: the evolution, readable by humans | Updates pages across every web — org-wide |
| MIS-102 | Product | The last three consumers stop copying: pin the emitted kit at 5.1.0 | pin the emitted kit in three consumer repos — other repositories |
| MIS-103 | TBA | The other seventeen: inventory and adoption across the organization | inventory of the other seventeen repositories — org-wide |
| MIS-104 | Infrastructure | The ghost Worker: what actually serves nwos-web.pablofm.workers.dev | a ghost Worker in a personal account; numinia.org is served by Workers Builds "numinia-nwos" today |
| MIS-107 | Content | numen.games speaks Spanish: nine components ignore the locale they receive | numen.games locale bug — other repository |
| MIS-152 | TBA | Highlight the sentence SpeechPlayer is currently reading | SpeechPlayer sentence highlight — a web enhancement, not alpha-blocking |

`MIS-151` declared `depends_on: ["MIS-152"]`; its body says the
dependency was tracked loosely. The field is dropped in this PR so no live
mission points at a deleted card.

**Measured at:** `45d67fd` before the cut. `missions/` 41 → 18: `todo`
32 → 12, `in-progress` 7 → 6, `in-review` 2 → 0.

---

## 2026-09-08 — This report stops growing

Dated addition, v0.5.0. Four deletion batches in one day took this
report from 66 missions narrated to 115 identifiers absorbed and ~10k
tokens: it was becoming the thing it was written to replace. From here
the MVP story is closed. Missions that close on the alpha board are
recorded in `RPT-018` — one dated line each — and their identifiers
resolve there. `absorbs:` above is final.

---

## Version history

- v0.1.0 (2026-09-08) — First publication. 66 `done` missions at `59f5cfa`
  compressed into five narrative arcs, ahead of the planned corpus reset.
- v0.2.0 (2026-09-08) — The reset lands: all 70 `done` missions deleted (#286
  + this PR); their identifiers absorbed here; three false closures from #284
  recorded as claimed-not-delivered.
- v0.3.0 (2026-09-08) — The frozen shelf deleted: 22 cancelled, 16 parked,
  each recorded here with its reason; PRO-003 amended via ADR-040 v1.1.0.
- v0.4.0 (2026-09-08) — The alpha focus cut: 23 missions (2 done, 11 April
  stubs, 1 by order, 9 outside the alpha); `missions/` is the alpha board.
- v0.5.0 (2026-09-08) — closed for growth; alpha-board closures go to `RPT-018`.

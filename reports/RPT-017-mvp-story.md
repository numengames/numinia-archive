---
id: "RPT-017"
uid: ""
title: "The MVP story: sixty-six missions, five arcs, one road still open to Alpha"
type: report
subtype: analysis
status: active
version: "0.6.0"
created: "2026-09-08T10:27:15Z"
created_source: "git:59f5cfa"
created_confidence: exact
updated: "2026-09-28T18:00:00+02:00"
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

## What this report is now

The MVP's story, closed on 2026-09-08. The 115 missions it absorbed resolve
here through `absorbs:` in the header. Their cards, the appendix of the 66
in arc order, and the dated sections recording the three deletion batches
of that day are in git: `git show 2d2f465:reports/RPT-017-mvp-story.md`.
Removed 2026-09-28 at the Oracle's word, to cut what nobody reads twice.

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

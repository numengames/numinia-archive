---
id: "ADR-068"
uid: ""
title: "Each thing lives in one place: how the house's repositories are organised"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-09T16:01:15+02:00"
updated: "2026-10-09T16:01:15+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [decisions, adr, repositories, polyrepo, single-source-of-truth, reusable-workflows, legal, gitops]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "The house keeps several repositories with a single source: every fact, text or piece of machinery has exactly one original, and every other repository links to it or installs it, never copies it. A repository is split off only for a hard reason and is never renamed; the legal texts have one address on numinia.org; the common CI and community files live in the organisation's .github repository; the monorepo question is settled by a measured trial."
related: ["ADR-044", "ADR-041", "STD-010", "STD-015", "STD-017", "STD-037", "PRO-027", "LEG-001", "LEG-002", "LEG-003", "LEG-004", "SYS-013"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# ADR-068 — Each thing lives in one place

> **Summary:** Polyrepo with a single source of truth: several repositories,
> one original of each thing, and every other place links to it or installs
> it. Repositories split only for a hard reason and are never renamed.
> **Epistemic:** A study of 787 merged pull requests found that every repair
> whose cause sat in another repository came from a hand-kept copy or a
> renamed repository.
> **Pragmatic:** The legal texts get one address, the common CI moves to the
> organisation's `.github` repository, and the monorepo question gets a trial
> instead of a debate.
> **Audience:** Agents · Oracles

---

## 1. Context

**The study.** Ursa read every pull request merged between August and
9 October 2026 in the thirteen repositories of the numengames organisation:
787 in all, 621 of them in this archive. Six agents classified each one from
its title and body. The raw data was produced by Ursa and is held outside
the archive; it is available on request.

| What the pull request was | Count |
|---|---|
| Not a repair | 633 |
| A repair whose cause was inside the same repository | 128 |
| A repair whose cause was in another repository of the house | 17 |
| A repair with an external cause (dependencies, platform) | 7 |
| A repair whose cause could not be told | 2 |
| Planned coordination across repositories (not repairs) | 116 |

Every one of the 17 cross-repository repairs came from one of two things: a
copy kept by hand that drifted (legal texts, cookie styles, design tokens,
branch rulesets), or the rename of a repository — numinia-nwos became
numinia-archive, which alone caused 4 of the 17. Inside a repository, most
repairs came from the same rule written twice, renames that left leftovers,
and squash merges that lost work. The 116 coordinated pull requests are the
same change (a footer, a legal header, the day/night switch) made three or
four times, once per site. About 45% of this archive's pull requests change
records and code together (counted during the review below, by series
folder).

**Measured on 2026-10-09.** `LEG-001` is at 2.2.0 here, while the copies in
the three other sites are at 2.1.0. The common CI workflows (secret scan,
workflow lint, dependency audit, outside probe, Dependabot auto-merge) exist
in four hand-copied versions with different action pins — the OpenSSF
Scorecard action is pinned at v2.4.2 in one repository and v2.4.4 in
another. The pull request template is byte-identical in all four.

**The review.** The options were put to a panel of six expert voices (CTO,
CEO, archivist, agents, security, and an advocate of the monorepo) over two
rounds. The panel was simulated: one model playing six roles. Its agreement
weighs less than six people's would, and is used here as a check on the
argument, not as evidence.

---

## 2. Decision

1. **Polyrepo with a single source.** The house keeps several repositories,
   but every fact, text or piece of machinery has exactly one original. The
   others link to it or install it, and never copy it. This extends
   `ADR-044` ("consumers install packages, never copy") with "or link". It
   is not a new paradigm; it combines known practice: DRY, *Don't Repeat
   Yourself* (Hunt and Thomas, *The Pragmatic Programmer*, 1999); polyrepo
   shared through published packages; GitHub's organisation `.github`
   repository; and GitOps — the machines that run things read their wanted
   state from git — for anything a machine applies.
2. **A repository is split off only for a hard reason**: a different writer
   or review regime (the feed, where machines write without review), weight
   (binary assets), or confidentiality. Never by product, never by taste.
   Folders are cheap; repositories are expensive — each brings its own CI,
   rulesets, deploys and permissions. Repositories are never renamed.
3. **Legal texts have one address.** The originals, `LEG-001` to `LEG-004`,
   live in this archive's `legal/` and are published on numinia.org.
   numinia.com, numen.games and nwos.numen.games link to the numinia.org
   pages and keep no copies. numinia.com reads the current published version
   to ask its users to accept again when it changes.
4. **The organisation's `.github` repository** is the single home of the
   common CI workflows, as reusable workflows each repository calls with one
   line, pinned by commit, and of the default community files (the pull
   request template). A repository keeps a workflow of its own only when the
   job is specific to it: its build, its deploy.
5. **The monorepo hypothesis stays open, and is tested, not argued.** Whether
   the Numinia sites join this archive is decided by a trial: 15–20 real
   coordinated changes taken from the study, done by the same agent and
   model once in a local monorepo and once with packages, against a
   threshold written down before the run (+15 points of success rate). If
   the monorepo wins, the sites join this archive itself, not a separate
   repository of sites.
6. **Open questions — explicitly not decided here:**
   - the 3D worlds fleet: a separate `numinia-fleet` repository read by the
     machines; public or private (private needs GitHub Team to keep
     rulesets); where its secrets live; whether the world records live in
     this archive;
   - the shared site shell (header, footer, cookies, day/night) as a
     package;
   - what is archived as read-only: numinia-docs and numengames-experiments.

Binds from the merge, for every repository of the numengames organisation.
Today's state, repository by repository, and the copies still standing are
in `SYS-013`.

---

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Monorepo: archive, sites and machinery in one repository | Atomic changes and one context for agents, but one permission unit, one blast radius and a heavier CI; whether it beats packages for the sites is what the trial in point 5 measures, so it is kept as a hypothesis, not chosen by argument. |
| Today's copies: several repositories copying shared things by hand | It is the cause of every one of the 17 cross-repository repairs and of the 116 repeated pull requests. |
| Meta-repo: today's repositories plus a map repository for agents | A map helps an agent find things but removes no copy; it is one more thing to keep in step, and the pattern is young, with little measured evidence. |
| Split by file type (prose, code, binaries, machine data) — the Oracle's idea | Kept as a lens, because file type often follows licence, tooling and writer, which are hard reasons; not the rule, because about 45% of this archive's pull requests change records and code together, and a split by type would turn each into two coordinated pull requests. |

---

## 4. Consequences

**Obliges.** A new shared thing gets one original before it gets a
consumer. A copy found in a consumer is debt, listed in `SYS-013` until it
becomes a link or an install. The documents that change next, each in its
own pull request:

- `STD-037` — the legal rule: the sites link to numinia.org, no copies;
- `STD-015` — the common CI as reusable workflows from `.github`;
- `STD-017` — who approves changes in the `.github` repository, since one
  merge there changes the CI of every repository;
- `PRO-027` — re-acceptance when a legal text's published version changes;
- `LEG-001` to `LEG-004` — their scope names the sites that link to them.

**Costs.** The three sites lose their local legal pages and need redirects;
numinia.com needs a reader of the published version; every repository's
workflows are rewritten as one-line calls, and the agent's GitHub App,
which cannot touch workflows, hands those changes to the Oracle as patches.
A change in `.github` reaches every repository at once, for good or ill.

**Limits of the evidence.** The study counts only the breakages someone
noticed and repaired with a pull request; a cross-repository breakage is
silent by nature, so the 128 : 17 ratio probably undercounts it. The pull
requests were written by the same agents that caused the breakages, and
this archive dominates the sample. The expert review was simulated.

**Reversal.** The trial in point 5 can move the sites into this archive
without contradicting this record: a single source is the rule, the number
of repositories is not.

---

## 5. Status

Proposed on 2026-10-09, pending the Oracle's acceptance on the pull request.

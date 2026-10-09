---
id: "SYS-013"
uid: ""
title: "The repositories, as wired"
type: documentation
subtype: reference
status: draft
version: "0.1.0"
created: "2026-10-09T16:01:15+02:00"
updated: "2026-10-09T16:01:15+02:00"
author: "ursa"
owner: "oracle"
digital_source_type: ai-assisted
section: "Technology"
tags: [system, reference, repositories, polyrepo, licences, consumers, single-source-of-truth]
license: "CC0-1.0"
related: ["ADR-068", "ADR-044", "STD-010", "STD-015", "STD-017", "STD-037", "SYS-006", "SYS-009"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SYS-013 — The repositories, as wired

> **Summary:** Every repository of the numengames organisation — what it
> holds, who writes to it and under what review, its visibility, its licence
> regime and what reads it — with each one marked as wired or not wired, and
> the copies between them that are still standing.
> **Epistemic:** Where each thing of the house lives today, and which things
> still live in two places.
> **Pragmatic:** Before changing something another repository reads, know
> who reads it; before copying something, find its original.
> **Audience:** Agents · Oracles

> **A system document is a reference manual, not a plan.** Pieces that do not
> exist yet are listed as *not wired*, with the cut that wires them; nothing
> here says they run until they do.

---

## 1. Scope

The repositories of the numengames organisation on GitHub and the lines
between them: who reads what from whom. The rule they follow is `ADR-068`;
how each site is built and deployed is in each repository's own README.
Private repositories outside the organisation's public list (the workspace
template nwos-deploy generates from) are named where they are read, not
described.

---

## 2. How it works

### The repositories

Thirteen today, all public. *To confirm* marks a fact this document could
not read from the repository itself.

| Repository | What it holds | Who writes, under what review | Visibility | Licence regime | What reads it | State |
|---|---|---|---|---|---|---|
| **numinia-archive** | The memory of the house: about 360 Markdown documents (principles, standards, procedures, decisions, missions, the game, operations, the legal texts in `legal/`), the site numinia.org in `web/`, and `machine/` (checks, tools, telemetry, the design-kit and sales-kit packages) | Oracles and agents, by pull request with human reviewers; one open pull request at a time; no self-merge (`AGENTS.md`) | public | per file, declared in `REUSE.toml`: documents CC0-1.0 or CC-BY-4.0, tools MIT, fonts OFL-1.1, legal texts and the brand reserved | numinia.org, built on every push to main; numinia-web reads lore paths and `objects/catalogue.json`; nwos-deploy installs the design kit from a release; three sites hold copies of the legal texts | wired |
| **numinia-assets** | The heavy files (images, audio, models, avatars) whose records live in the archive | to confirm | public | per file (`REUSE.toml`, headers or `.license` notices); no repository-wide grant | the sites, by its README; which ones, to confirm | wired; first intake only |
| **numinia-archive-feed** | What the house's automation finds, unreviewed — today the tender radar's board | machines, without review (`STD-017` AUT-069); nothing becomes a record until a reviewed pull request writes it into the archive | public | data CC0-1.0, by its README; no `REUSE.toml` | the archive, which shows it marked *unreviewed* | wired |
| **numinia-web** | numinia.com: an npm-workspaces monorepo; the store app serves the site; shared packages for auth, domain, UI, state, analytics | by pull request with human reviewers | public | per directory (`REUSE.toml`): apps AGPL-3.0-only, packages MIT, documentation CC-BY-4.0, fixtures CC0-1.0, legal texts reserved | numinia.com, deployed on every push to main | wired |
| **numengames-web** | numen.games, the company site | by pull request with human reviewers | public | AGPL-3.0-only for code, CC0-1.0 for public assets, CC-BY-4.0 for documentation, legal texts reserved, by its README and `REUSE.toml`; its `LICENSE` file holds the GPL-3.0 text — to confirm which is meant | numen.games, deployed on every push to main | wired |
| **nwos-deploy** | nwos.numen.games: NWOS as a service — a landing page and a generator that creates an organisation's workspace from a private template | by pull request with human reviewers; contributions need the CLA | public | AGPL-3.0-only for the application, per path in `REUSE.toml` | nwos.numen.games, deployed on every push to main | wired |
| **numinia-hyperfy2** | The 3D world engine: a fork of Hyperfy 2 | to confirm | public | GPL-3.0, inherited from the original; no `REUSE.toml` | to confirm | wired as a fork; the fleet that would run it is not |
| **hyperfy-components** | Reusable components for Hyperfy worlds (visibility, rotation, translation, emitters, teleport) | to confirm | public | MIT | worlds built on Hyperfy; which ones, to confirm | wired; last push in September |
| **numinia-docs** | A Docusaurus site | to confirm | public | no licence file | to confirm | idle since August; whether it is archived is open in `ADR-068` |
| **numengames-experiments** | An experimental rebuild of numen.games | to confirm | public | all rights reserved, by its `LICENSE` | none known | idle since September; whether it is archived is open in `ADR-068` |
| **numinia-k8s** | The earlier AWS infrastructure (EKS), paused for cost | to confirm | public | AGPL-3.0 | none while paused | kept as it is; last push in July |
| **numinia-terragrunt** | The earlier AWS infrastructure as code | to confirm | public | GPL-3.0 | none while paused | kept as it is; last push in July |
| **alchemists-tower** | The back office that managed worlds on the earlier infrastructure | to confirm | public | GPL-3.0 | none while paused | kept as it is; last push in September |
| **.github** (organisation) | The common CI as reusable workflows, and the default community files (the pull request template) | to be set by `STD-017` | public | workflows MIT, README and pull request template CC0-1.0 | every repository of the organisation | **not wired** — the cut that moves the common workflows out of the four site repositories (`ADR-068`) |
| **3D worlds fleet** | — | — | — | — | — | **not wired**; open questions in `ADR-068` |

### How a shared thing flows

An original lives in one repository. Every other repository either **links**
to it (a page address, a published version it reads) or **installs** it (a
versioned package, a reusable workflow pinned by commit). Nothing is copied
by hand. Where a link reads the original by its path in git rather than by a
published address, a move of that file breaks the reader without any check
in the archive seeing it.

The copies that still exist today, as known debt:

| Copy | Original | Where the copies are | What has drifted |
|---|---|---|---|
| The legal texts | `LEG-001` to `LEG-004`, in this archive | numinia-web, numengames-web, nwos-deploy, each with its own copy | `LEG-001` is 2.2.0 here and 2.1.0 in all three copies (2026-10-09) |
| The design kit | the design-kit package in this archive, 6.4.0 | numinia-web pins the design standard v5.0.0, a document deleted on 2026-08-24, and vendors its stylesheet and script; numengames-web keeps a tokens stylesheet of its own | both copies are behind the package; nwos-deploy installs the kit instead (6.0.0, from a release of this archive) |
| The common CI workflows | none yet: the organisation's `.github` repository is not wired | four hand-copied versions, one per site repository | different action pins — the OpenSSF Scorecard action at v2.4.2 here and v2.4.4 in the three sites |
| The lore read by path | the game's texts in this archive's `lore/`, and one operations record | numinia-web's lore fetch script reads 25 archive paths from main on every deploy | not a copy, but tied to paths: a moved file fails or silently stales numinia.com's deploy |

---

## 3. How to verify it

```
$ curl -s https://api.github.com/orgs/numengames/repos?per_page=100 \
    | grep -E '"(name|visibility|archived)"'
```

Thirteen names, each `"visibility": "public"`. For each row, the
repository's README, `LICENSE` and `REUSE.toml` are the source of the
licence column. For the debt table: compare the `version:` line of each
legal copy with `legal/` here, and the `uses:` lines of each site's
workflows with this archive's.

---

## 4. Accuracy

**Verified against:** the GitHub organisation listing and the four local
clones of the site repositories (numinia-archive at `48f6a4c`), on
2026-10-09.

- Who writes to the nine repositories other than the four sites and the
  feed, and under what review, was not read from them: *to confirm*.
- The licence of numengames-web disagrees with itself (README and
  `REUSE.toml` say AGPL-3.0-only; the `LICENSE` file holds GPL-3.0).
- The private workspace template that nwos-deploy generates from is not
  in the organisation's public list and is not described here.

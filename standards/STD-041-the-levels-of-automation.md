---
id: "STD-041"
uid: ""
title: "The levels of automation"
type: standard
subtype: register
status: draft
version: "0.1.2"
created: "2026-09-29T12:30:00+02:00"
updated: "2026-10-03T20:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "People and culture"
tags: [standards, register, agents, automation, autonomy, oversight]
license: "CC0-1.0"
related: ["STD-042", "STD-017", "STD-003", "PRO-008", "CAN-004"]
derived_from: "CAN-004"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The levels of automation

> **Summary:** The five levels at which an agent may be operated here, from
> the one where the person does everything to the one where the
> organisation runs on its own: what each level means, what the person does
> in it, where they approve, and what the agent does alone. The two ends
> outside the scale, named so that nobody mistakes them for a level. The
> permissions register grades every permission against these levels; each
> agent's operator file declares one of them; the site reads both. A
> register records: nothing in it binds by itself.
> **Epistemic:** At which levels may an agent be operated, and what does the person do in each?

## The levels

| Level | Means | You | You approve | The agent does alone | The agent asks |
|---|---|---|---|---|---|
| `Assisted` | the agent proposes; the person does. Nothing changes without their hands | execute | at every act | read and propose | everything that touches anything |
| `Partial` | the agent runs the steps of an approved task, and every flagged step waits | approve each step | at each flagged command | read, its own desk, local commits | almost everything the scanner flags |
| `Conditional` | the bridge: the agent proposes a plan and, once approved, runs it whole; the person stays in command | approve plans and deliveries | once per pull request, before the push | local tools, the network, the token to read | before pushing; at any irreversible doubt |
| `High` | the agent carries parts of its mission alone; the person reviews what was done, not what is about to be | review results | on the open pull request, at merge | push branches, open pull requests, run on a schedule | only the floor, speaking outwards, and what it cannot decide |
| `Full` | the autonomous organisation: it runs on its own and the agents review one another. The goals remain the Oracles' and the floor does not move | set goals and keep the floor | on the goals and on the books | merge with another agent's review, speak outwards under protocol | only the floor |

At every level the goals are set from outside the agent: by the person, by
the Oracles, by the organisation. That is what the outside scale calls
*heteronomous*, and it holds from the first level to the last. Each level
contains the ones below it, as a rank contains the ranks below it.

## How a level is held

An agent's level is written in its operator file, in the field `automation_level`,
as one of the five names above. A session may lower it and never raise it;
raising it is an act of the Oracle, shown before it is done, as bringing a
rule into force is shown. With nobody present — a scheduled task, an
unattended session — the level falls to `Assisted` unless the operator
file declares `High` or `Full`. An agent whose file declares no level is at
`Assisted`, and the test that reads the files says so.

## Outside the scale

Two organisations are not on this scale, and naming them keeps the scale
honest:

| End | Means | Why it is not a level |
|---|---|---|
| no automation | an organisation with no agent at all: there are no rings because there is nobody to grant anything to | the outside scale's level 0; nothing here to grade |
| autonomous | a system that changes its own goals or its own domain of use without intervention, control or oversight: there are no rings because there is nobody watching | the outside scale's level 6; excluded by the rule that no agent edits its own identity |

Neither is what this house proposes. `Full` is the ceiling: the
organisation runs on its own, and the people still set the goals and keep
the floor.

## Where each level sits outside

| Level | Outside scale | Tools we use | The person's role in the literature |
|---|---|---|---|
| `Assisted` | level 1, assistive automation | Claude Code read-only · Codex read-only | operator |
| `Partial` | level 2, partial or task automation | Hermes `manual` · Claude Code default | collaborator |
| `Conditional` | level 3, conditional automation | Hermes `smart` · Claude Code `acceptEdits` · Codex `workspace-write` | consultant |
| `High` | level 4, high automation | Claude Code `auto` · agents in continuous integration | approver |
| `Full` | level 5, full automation | Dependabot with auto-merge, bounded by the ruleset | observer |

## Check

| Row | Source | Verified by |
|---|---|---|
| the five names and their order | [ISO/IEC 22989:2022 cl. 5.13, as reproduced by SPDX 3.1 *IsoAutomationLevel*](https://spdx.github.io/spdx-spec/v3.1-RC1/model/Core/Vocabularies/IsoAutomationLevel) (clause unverified against the original; the house infers a paywalled norm from its public reproductions) | `machine/scripts/test/automation-levels.test.mjs`: the site's levels are these rows, in this order |
| the person's role per level | [Feng, McDonald & Zhang, *Levels of Autonomy for AI Agents* (2025)](https://arxiv.org/abs/2506.12469) | by reading |
| a level falls with nobody present | [Regulation (EU) 2024/1689 art. 14(3): oversight proportionate to the level of autonomy](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) (voluntary source: our agents are not high-risk systems); Hermes `cron_mode: deny` | by reading; the runtime default |
| raising a level is the Oracle's act | `STD-017` AUT-065, rank sets the reach; `PRO-023`, shown before done | by hand |
| the file declares the level | `STD-004` Ring 3, `agents/`: `automation_level` | `machine/scripts/test/automation-levels.test.mjs`: every operator file names one of the five |
| the ends outside the scale | the same SPDX vocabulary: levels 0 and 6; `STD-017` AUT-067, no agent edits its own identity | by reading |

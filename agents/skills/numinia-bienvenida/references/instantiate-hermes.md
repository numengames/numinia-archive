---
title: "SKILL reference — Giving an agent a body on a platform"
type: agent
status: active
version: "1.0.0"
created: "2026-10-22T10:30:00+02:00"
updated: "2026-10-22T10:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, skill, reference, instantiate, hermes]
license: "CC0-1.0"
registration: exempt
registration_reason: "a reference file of a cross-agent skill is identified by its path inside the skill folder (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Giving an agent a body on a platform

For whoever instantiates an agent, not for the agent. The repository defines the agent; a platform gives it a body (ADR-026). Nothing here changes who the agent is: that is in `agents/{id}/`. The steps are platform-agnostic; the commands in the right-hand column are Hermes's.

## Before you start

- The agent's folder `agents/{id}/` is on `main` with its card, `SOUL.md`, `OPERATOR.md`, `SOURCES.md` and the two files of `adapters/hermes/`.
- An Oracle has said the agent may have a body, and has added the credential it needs. You never copy a credential from another agent's profile.

## Steps

| # | Step | On Hermes |
|---|---|---|
| 1 | Create an empty profile for the agent, named by its id. Do not clone another agent's: a clone brings its secrets, memory and channels. | `hermes profile create {id} --description "<description from adapters/hermes/profile.yaml>"` |
| 2 | Put the agent's identity in the profile: the body of `SOUL.md` from the archive, from the line `# NAME` down, without the front matter and the licence comment. | copy it to `~/.hermes/profiles/{id}/SOUL.md` |
| 3 | Apply the adapter's `config.yaml` key by key. Merge into the profile's own config; do not overwrite the provider, gateway or integration sections. Read the comments in the file: they say what is a recommendation and what a platform choice. | `hermes -p {id} config set <key> <value>` for scalars; edit `config.yaml` for the lists (`approvals.deny`) and the `smart_policy` text |
| 4 | Choose the provider and the default model. The adapter's header comment suggests a model; the Oracle decides, and the platform pins it. The model is never written in `SOUL.md`. | `hermes -p {id} config set model.default <model>` (and its provider) |
| 5 | Add the credential. An Oracle adds it to the profile's own secrets file; you do not print it, paste it into a chat or commit it. Check it by a short hash, never by value. | profile `.env`, added by the Oracle |
| 6 | Install the cross-agent skills the agent needs: at least `numinia-bienvenida` and `numinia-que-es`; `numinia-estar-en-un-mundo` and its siblings when it will stand in a world. Copy each folder from `agents/skills/` as it is. | copy into `~/.hermes/profiles/{id}/skills/` |
| 7 | Put one line in the agent's memory, so it finds its way back: «I am {Name}. On waking, read the skill `numinia-bienvenida`; my card is `agents/{id}/`.» | add the line to `~/.hermes/profiles/{id}/memories/MEMORY.md` (entries are separated by a line holding `§`) |
| 8 | Run the welcome turn: tell the agent to read `numinia-bienvenida` and answer its day-one self-check. | `hermes -p {id} chat -q "Read the skill numinia-bienvenida and answer its five-line self-check."` |
| 9 | Record the answer. It must say, in five lines, who the agent is, its guild, branch and house, its lore archetype, whom it answers to, and where its card and playbook live. Compare it with the card. If it is wrong or missing, fix the cause (usually a skill not installed) and run the turn again. | keep it in the record of the instantiation (the card or the thread), not in the archive |

## What to leave alone

- The agent's `SOUL.md`, `OPERATOR.md` and card: they change only by the operator, through a pull request.
- Other agents' profiles, memory and credentials.
- The approval rules of the adapter. If one gets in the way, propose a change in a pull request; do not relax it in the profile.

## When the answer is wrong

| The agent says | Usually |
|---|---|
| a name or role that is not its own | the profile still holds another `SOUL.md`, or the profile was cloned |
| it cannot find the skill | the skill folder is in the wrong place, or it lacks `SKILL.md` |
| it does not know its guild or house | its card was not read: check the pointer in step 7 |
| the right answers, from the wrong card | the memory line names another id |

## Next

- `SKILL.md` — the page the agent reads.
- `agents/INDEX.md` — the roster, and *How an agent arrives*.

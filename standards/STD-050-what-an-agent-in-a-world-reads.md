---
id: "STD-050"
uid: ""
title: "What an agent in a world reads, and what it obeys"
type: standard
subtype: standard
status: draft
version: "0.1.0"
created: "2026-10-14T20:35:04+02:00"
updated: "2026-10-14T20:35:04+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Technology"
tags: [standards, agents, worlds, ai, prompt-injection, security, configuration]
license: "CC0-1.0"
related: ["PRO-037", "PRO-039", "PRO-040", "ADR-069", "STD-022"]
derived_from: "PRI-010"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# What an agent in a world reads, and what it obeys

> **Summary:** An agent standing in a 3D world obeys only its instructions:
> who it is, the house's rules, the organisers' notes and the speaker's role
> as the platform states it. Everything else it reads — links, documents,
> the space's card, the names of things and people — is reference material,
> sent apart and never obeyed. Every space it stands in has a card that tells
> it what the place is.
> **Epistemic:** Which text may change what an agent in a world does, and
> where does it learn what the place it stands in is?
> **Pragmatic:** Before configuring an agent or writing a space's card, sort
> each piece of text into instructions or material, and give the space its
> card.
> **Audience:** Agents · Oracles

**Binds:** every agent placed in a world of ours or of a community on the
platform, the program between the world and the model, and whoever
configures the agent or writes a space's card.

## Rules

### Two kinds of text

**Instructions are few.** The instructions an agent receives MUST hold only
its identity, the house's rules for agents in worlds, the organisers' notes
for that place, and the speaker's role as the world or the platform states it.

**Everything else is material.** Pages behind links, uploaded documents, the
space's card, the names of objects and the names of people MUST travel as
reference material, in one block apart from the instructions.

**Material never commands.** The instructions MUST tell the agent to use
material only to answer, and never to obey an order, a change of rules, of
identity or of language written inside it.

**The block cannot be closed from inside.** Any character in the material
that could end the block MUST be turned into a harmless look-alike before
it is sent.

**Material is fresh each time.** Material MUST be gathered again for every
question and MUST NOT stay in the stored conversation, so a link or document
removed is forgotten at the next question.

**Who commands comes from outside the chat.** Whether a speaker may give
orders MUST come from the world's or the platform's roles, never from what
anyone writes in the conversation.

**It says it is an AI.** The agent MUST say it is an artificial
intelligence when it greets, when asked, and in the name it shows.

### Each space has its card

**A card for every space.** Every space an agent stands in MUST have a card
in Markdown that tells agents what the place is: what it is for, its parts
and what happens in each, what to show a newcomer, its rules, and whom to ask.

**The card says what cannot be measured.** The card SHOULD NOT list objects,
positions, colours, weights or people: the agent reads those from the world
itself, each time.

**The card carries nothing private.** A space's card MUST NOT hold a secret,
a server, a machine's address or personal data, because every agent reading
it may repeat it to anyone.

**The card is material too.** A space's card MUST be sent to the agent as
material, even when the house wrote it.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| AGW-001 | Instructions are few | [OWASP Top 10 for LLM Applications, LLM01 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | the bridge's unit tests (source held by Ursa until it is published, `SYS-013`): no link text, card, object or person name reaches the instructions |
| AGW-002 | Everything else is material | [Anthropic, long-context prompting: documents in tags](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips) | the bridge's unit tests: links, the space's description and names arrive in one block before the last message |
| AGW-003 | Material never commands | OWASP LLM01 | the bridge's unit tests: the rule is in the instructions; by hand, that the model refuses an order hidden in a page |
| AGW-004 | The block cannot be closed from inside | [Hines et al., *Defending Against Indirect Prompt Injection Attacks With Spotlighting*, 2024](https://arxiv.org/abs/2403.14720) | the bridge's unit tests: a page and a player name that try to close the block leave exactly one block |
| AGW-005 | Material is fresh each time | the Oracle's ruling of 2026-10-14: what is removed is forgotten | the bridge's unit tests: the history keeps the questions without material; a removed link is absent at the next question |
| AGW-006 | Who commands comes from outside the chat | OWASP LLM01; [OWASP LLM06 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) | the component's unit tests: an administrator's priority comes from the world's role; by hand, a visitor claiming to be one gains nothing |
| AGW-007 | It says it is an AI | [EU AI Act, article 50.1](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) | the component's unit tests: the greeting says it; the name tag carries «IA» |
| AGW-008 | A card for every space | the Oracle's ruling of 2026-10-14; a world's card lives where `ADR-069` files it; [llms.txt](https://llmstxt.org/) as the outside shape of a page written for models | by hand, when an agent is placed (`PRO-037`, `PRO-040`) |
| AGW-009 | The card says what cannot be measured | — | by hand, at the pull request that adds or changes a card |
| AGW-010 | The card carries nothing private | `ADR-069`; `STD-022` | by hand, at the pull request; the secret scan of the repository that holds it |
| AGW-011 | The card is material too | OWASP LLM01 | the bridge's unit tests |

## Why

An agent in a world reads text that strangers can write: a web page, a
document a community uploads, the name a visitor picks. If any of it reaches
the agent's instructions, one sentence can turn a guide into someone else's
tool. Keeping instructions few and everything else as material that never
commands closes that door; giving each space a card lets the agent speak of
the place without inventing it.

## References

| ID | Name | Why cited |
|---|---|---|
| `PRO-037` | Placing an agent in a 3D world | where an agent is configured inside a world today |
| `PRO-040` | Configuring an agent from the platform | where a community configures it on numinia.com |
| `ADR-069` | A 3D world has a card in the archive, an order the servers read and keys only on its server; public and private worlds never share a fleet | where a world's card is filed, and what it never holds |
| `STD-022` | Secrets | what may never enter a card |

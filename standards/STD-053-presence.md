---
id: "STD-053"
uid: ""
title: "Presence"
type: standard
subtype: standard
status: draft
version: "0.1.0"
created: "2026-10-14T23:36:00+02:00"
updated: "2026-10-14T23:36:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
section: "Products and services"
tags: [standards, presence, status, organisations, privacy, GDPR, accessibility]
license: "CC0-1.0"
related: ["ADR-071", "STD-051", "STD-035", "STD-034"]
derived_from: "PRI-012"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Presence

> **Summary:** A person chooses to look online, idle, busy or invisible, and
> the platform works out idle and offline on its own. Only the people who
> share an organisation with them see it, nobody is shown before choosing,
> an invisible person looks offline, and nothing but the present moment is
> kept.
> **Epistemic:** Who may see whether a person is connected?
> **Pragmatic:** Build or audit the status menu, the lists of who is
> connected and the service behind them, without asking what to show to whom.
> **Audience:** Agents · Oracles

**Binds:** numinia.com's status menu, its lists of people, and the service
that knows who is connected.

## Rules

### What a status says

**Four to choose, one worked out.** A person MUST be able to choose online,
idle, do not disturb or invisible; the platform shows them offline after two
minutes without word from any page they have open.

**Idle sets itself.** The platform MUST show a person as idle after ten
minutes without input, and online again when they come back, unless they chose
idle themselves.

**The most available device shows.** With several devices open, a person
MUST show as the most available of them, unless they chose invisible.

**Do not disturb holds every notice.** While a person is on do not disturb,
the platform MUST NOT interrupt them with a notice; notices wait for them.

**A phrase that clears itself.** A status phrase holds one emoji and at most
128 characters, and it MUST clear itself at the time the person chose.

**Never colour alone.** Each status MUST show a shape and a text alternative
as well as its colour.

### Who sees it

**Nobody is shown before choosing.** The first time, a person MUST be asked who
may see that they are connected, with no answer chosen in advance; until they
answer, they look offline.

**Invisible looks offline.** To everyone else, an invisible person MUST look
exactly like an offline one, phrase included, while they keep full use of the
site.

**Only fellow members see who it is.** A person's status and phrase MUST be
shown only to people who share an organisation with them, and to the house's
staff where they enter; anyone else sees numbers, never names.

**Now, never history.** The platform MUST keep only a person's present
status: no last time seen, and no record of when they were connected.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| PRS-001 | Four to choose, one worked out | [IETF RFC 6121, 4.7.2.1, the show element](https://www.rfc-editor.org/rfc/rfc6121); [Discord, Gateway Events, Update Presence](https://discord.com/developers/docs/events/gateway-events) | by hand: numinia.com's test suite |
| PRS-009 | Idle sets itself | [Matrix Specification v1.19, presence: idle after a threshold](https://spec.matrix.org/v1.19/client-server-api/); ten minutes, the Oracle's ruling of 2026-10-14 (`ADR-071`) | by hand: numinia.com's test suite |
| PRS-010 | The most available device shows | [Rocket.Chat, user presence and status](https://docs.rocket.chat/docs/user-presence-and-status) | by hand: numinia.com's test suite |
| PRS-007 | Do not disturb holds every notice | [Discord Support, Changing Online Status](https://support.discord.com/hc/en-us/articles/227779547-Changing-Online-Status) | by hand: nothing to check until the site sends notices |
| PRS-006 | A phrase that clears itself | — | by hand: numinia.com's test suite |
| PRS-008 | Never colour alone | [WCAG 2.2, 1.4.1 Use of Color and 1.1.1 Non-text Content](https://www.w3.org/TR/WCAG22/), selected by `STD-034` | by hand: numinia.com's accessibility tests |
| PRS-003 | Nobody is shown before choosing | [GDPR, Regulation (EU) 2016/679, art. 25(2)](https://eur-lex.europa.eu/eli/reg/2016/679/oj); [EDPB Guidelines 03/2022 on deceptive design patterns, version 2.0](https://www.edpb.europa.eu/system/files/2023-02/edpb_03-2022_guidelines_on_deceptive_design_patterns_in_social_media_platform_interfaces_v2_en_0.pdf) | by hand: numinia.com's test suite |
| PRS-002 | Invisible looks offline | [Discord, Gateway Events: invisible, shown as offline](https://discord.com/developers/docs/events/gateway-events) | by hand: numinia.com's test suite |
| PRS-004 | Only fellow members see who it is | [GDPR, art. 25(2)](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | by hand: numinia.com's test suite |
| PRS-005 | Now, never history | [GDPR, art. 5(1)(c), data minimisation](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | by hand: numinia.com's test suite |

## Why

Whether someone is connected tells others where they are and when. Shown to
everyone by default, it exposes people who never chose it, and kept over time
it becomes a record of their days. Asking first, showing only fellow members
and keeping nothing but the present moment let an organisation see who is
there to meet now, which is all presence is for.

## References

| ID | Name | Why cited |
|---|---|---|
| `ADR-071` | An organisation runs its own roles, as a Discord server does, and its members see who is connected | the decision these rules come from, and the standards it selects |
| `STD-051` | Organisation roles | who shares an organisation, and when the house enters one |
| `STD-035` | Personal data | what may be kept about a person, and for how long |
| `STD-034` | Accessibility | the level every page meets |

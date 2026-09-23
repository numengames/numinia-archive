---
id: "ADR-048"
uid: ""
title: "The first canon is written to be walked into, not consulted"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-23T12:00:00+02:00"
updated: "2026-09-23T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, rituals, onboarding, refactor]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-001 is rewritten as the experience of entering Numinia rather than an inventory of its parts: three sections, no enumerations, no tool, no schedule and no borders section. Canon names no tool and holds no schedule. The rituals move to PRO-019, which covers every ritual and not only the weekly ones."
amends: ["ADR-042"]
related: ["CAN-001", "CAN-002", "CAN-004", "CAN-006", "PRO-019", "STD-007"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-048 — The first canon is written to be walked into, not consulted

> **Summary:** `CAN-001` becomes the door it always claimed to be: what
> entering Numinia is like, why the work is narrated, and how to tell a real
> name from set dressing.
> **Epistemic:** It had become an inventory of parts, a manual for a dead
> vendor and a meeting calendar — three genres, none of them a first canon.
> **Pragmatic:** One short text to read first, one protocol that holds every
> ritual, and no expiring fact left in `canon/`.
> **Audience:** Agents · Oracles

---

## 1. Context

Measured on `CAN-001` v2.1.1, the document a newcomer is pointed at first:

| | |
|---|---|
| body words | 1 705 against a canon budget of 1 500 |
| top-level sections | 9 |
| card fields still holding the template's example text | 2 of 3 |
| sections duplicating a document that develops them fully | 4 |
| third-party tools named as canon | 1, dead |
| meeting times stated, contradicting two other canons | 3 |

**Four defects, one document.**

*It described instead of admitting.* The text was an inventory: four guilds,
four factions, ranks, units of activity, a board and a calendar. A reader
finished it knowing the names of the parts and not what it is like to work
here — and this is the one document whose job is the second thing. Its
Summary, Epistemic and Pragmatic lines were never filled in; the published
page told readers "what you learn by reading this document".

*It restated its neighbours, worse.* Guilds and factions appeared here as bare
lists and in `CAN-004` as tables with their operational equivalents; the
epistemic relation here in summary and in `CAN-006` entire; the mission
contract here as prose and in `STD-025` as plated rules. A reader entering
through `CAN-001` learnt the poorer version of three documents beside it.

*It named a tool.* The mission board was canon as **Huly**, with its columns
and a workspace URL. The instance is gone and the link is dead. Canon expiring
because a vendor changed is a category error, not bad luck.

*It held a calendar.* Three rituals with hours, in a series whose threshold is
`governed` — correcting a meeting time required an Oracle's approval, while
the fact itself was already wrong in three different ways across three canons.

The rituals also revealed a gap: Numinia holds more than the two weekly ones —
seasonal and annual ones live in `CAN-002` — and nothing described how any of
them is convoked, prepared or recorded.

## 2. Decision

`CAN-001` is rewritten at `3.0.0` as **the experience of entering Numinia**,
not an inventory of it: what a newcomer meets, why the work is told as a city,
and how to tell a real name from decoration. Three sections, no enumerations,
about 560 words.

The principle it turns on is unchanged and now arrives last, as something the
reader can use: **everything here exists twice — as a function and as a name
in the world — and neither version may say what the other denies.**

Three rules bind from this decision:

**Canon names no tool.** A vendor, product or application MUST NOT appear in
`canon/` as the way something is done. Where a capability is required, canon
states the capability; the instrument is named in `system/` or a protocol.

**Canon holds no schedule.** A date, hour or cadence MUST NOT be stated in
`canon/`. The calendar is the calendar; the roster of what recurs is
`PRO-019`.

**A canon does not list what it is not.** A borders section — *what this
document does not define* — is not written in `canon/`. Where a reader must be
sent elsewhere, the site's navigation and the header's `related:` do it;
prose spent on absences reads as apology and displaces the text that binds.

The rituals move to **`PRO-019` — Holding a ritual**, which covers every
ritual of Numinia and not only the weekly ones: five plated rules, a roster
with cadence and convoker, and what must remain after — decisions, cards and
debts, never minutes. The daily stand-up is retired, not moved: it was not
being held.

`ADR-042`'s fourth consequence — that `CAN-001` carry a paragraph on the Dark
Council reading the weekly roll-up — is amended: the paragraph is now the
roster row and `RIT-002` in `PRO-019`.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Patch the two stale blocks and leave the rest | The stale blocks were symptoms; a document that inventories instead of admitting goes stale again next quarter |
| Rewrite it to the mould, keeping the borders section | Tried first. Five paragraphs on what the document does not do, in the one text a newcomer reads first: it distracted more than it bounded |
| Keep the mission section, without the tool | The contract is `STD-025`'s, plated and verified; canon restating it creates a second place to go stale |
| Keep the rituals in `CAN-002` only | `CAN-002` says what they mean; nothing said how one is convoked, prepared or recorded, and that is a procedure |
| Retire `CAN-001` and let `CAN-004` and `CAN-006` carry it | The system needs one text that says why it is narrated at all; neither does, and a newcomer needs a first door |
| Name the current board in canon instead of Huly | Same error one instrument later; the repository is also a tool, and what binds is the property, not the vendor |

## 4. Consequences

- **Obliges:** canon authors to state capabilities, not instruments, to keep
  schedules out of `canon/`, and not to spend canon prose on what a document
  does not cover; convokers of any ritual to follow `PRO-019`.
- **Costs:** `CAN-001` no longer works as an index — a reader who wanted
  guilds, factions, missions and rituals on one page now depends on the site's
  navigation, and anyone who linked to its section anchors loses them. The
  page shortens by roughly two thirds. `CAN-TEMPLATE` still prescribes a
  borders section as its fourth, which this canon no longer has: the mould is
  now behind the text it moulds, and that gap is real until the template is
  amended.
- **Reversal:** if newcomers consistently fail to find guilds and factions
  from `CAN-001`, the fix is navigation on the site, not re-duplication in
  canon — this decision is superseded only if that fails too.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it, which is the same pull request that rewrites `CAN-001` and adds
`PRO-019`.

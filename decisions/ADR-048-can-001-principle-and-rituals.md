---
id: "ADR-048"
uid: ""
title: "CAN-001 states the principle; the rituals become a protocol"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-23T12:00:00+02:00"
updated: "2026-09-23T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, rituals, refactor]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: superseded
superseded_by: "ADR-049"
decision: "CAN-001 is rewritten to the canon mould as one principle and its consequences; the guild, faction, mission and epistemic material it duplicated is left to the documents that own it; canon names no tool and holds no schedule; the rituals move to PRO-019, which covers every ritual and not only the weekly ones."
amends: ["ADR-042"]
related: ["CAN-001", "CAN-002", "CAN-004", "CAN-006", "PRO-019", "STD-007"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-048 — CAN-001 states the principle; the rituals become a protocol

> **Summary:** The founding canon is rewritten to say one thing and derive the
> rest from it; the rituals leave it for a protocol of their own.
> **Epistemic:** `CAN-001` had become an index of the other canons plus a
> vendor manual plus a meeting calendar — three genres, none of them canon.
> **Pragmatic:** One canon to read first, one protocol that holds every
> ritual, and no expiring fact left in `canon/`.
> **Audience:** Agents · Oracles

---

## 1. Context

Measured on `CAN-001` v2.1.1, the document a newcomer is pointed at first:

| | |
|---|---|
| body words | 1 705 against a canon budget of 1 500 |
| top-level sections | 9; the canon mould prescribes 4 |
| card fields still holding the template's example text | 2 of 3 |
| sections duplicating a document that develops them fully | 4 |
| third-party tools named as canon | 1, dead |
| meeting times stated, contradicting two other canons | 3 |

**Four defects, one document.**

*It is not in the mould.* The canon template asks for the definition, the
governing principle, what follows from it and what it does not define.
`CAN-001` had none of the four, and its Summary, Epistemic and Pragmatic lines
were never filled in — the published page told readers "what you learn by
reading this document".

*It restates its neighbours, worse.* Guilds and factions appear here as bare
lists and in `CAN-004` as tables with their operational equivalents; the
epistemic relation appears here in summary and in `CAN-006` entire; the
mission contract appears here as prose and in `STD-025` as plated rules. A
reader entering through `CAN-001` learnt the poorer version of three documents
sitting beside it.

*It named a tool.* The mission board was canon as **Huly**, with its columns
and a workspace URL. The instance is gone and the link is dead. Canon expiring
because a vendor changed is a category error, not bad luck.

*It held a calendar.* Three rituals with hours, in a series whose threshold is
`governed` — so correcting a meeting time required an Oracle's approval, while
the fact itself was already wrong in three different ways across three canons.

The rituals also revealed a gap: Numinia holds more than the two weekly ones —
seasonal and annual ones live in `CAN-002` — and nothing described how any of
them is convoked, prepared or recorded.

## 2. Decision

`CAN-001` is rewritten at `3.0.0` to the canon mould, around one principle:
**every structure of this system exists twice — as a function and as a name in
the world — and neither version may say something the other denies.** What
follows from it is stated by subject and left to the documents that own it.

Three rules bind from this decision:

**Canon names no tool.** A vendor, product or application MUST NOT appear in
`canon/` as the way something is done. Where a capability is required, canon
states the capability; the instrument is named in `system/` or a protocol.

**Canon holds no schedule.** A date, hour or cadence MUST NOT be stated in
`canon/`. The calendar is the calendar; the roster of what recurs is
`PRO-019`.

**Canon does not restate a canon or a standard.** Where another document
develops a structure, `CAN-001` names it and stops; the identifier appears in
the References table, not in the sentence.

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
| Patch the two stale blocks and leave the rest | The stale blocks were symptoms; a document off its mould, over budget and duplicating three others goes stale again next quarter |
| Keep the rituals in `CAN-002` only | `CAN-002` says what they mean; nothing said how one is convoked, prepared or recorded, and that is a procedure |
| Retire `CAN-001` and let `CAN-004` and `CAN-006` carry it | The system needs one text that states why it is narrated at all; neither does, and a newcomer needs a first door |
| Name the current board in canon instead of Huly | Same error one instrument later; the repository is also a tool, and the property — visible, proposable, trackable — is what binds |
| Keep the mission section, without the tool | The contract is `STD-025`'s, plated and verified; canon restating it creates a second place to go stale |

## 4. Consequences

- **Obliges:** canon authors to state capabilities, not instruments, and to
  keep schedules out of `canon/`; convokers of any ritual to follow `PRO-019`;
  `CAN-002`, `CAN-004` and `STD-025` to remain the only places their material
  is developed.
- **Costs:** a reader who wanted guilds, factions, missions and rituals on one
  page now follows four pointers. The published `CAN-001` page shortens by
  well over half, and anyone who linked to its section anchors loses them.
- **Reversal:** if newcomers consistently fail to find guilds and factions
  from `CAN-001`, the fix is navigation on the site, not re-duplication in
  canon — this decision is superseded only if that fails too.

## 5. Status

Superseded by `ADR-049`, which replaced the four-section mould this record
applied with three obligations of content. Its rules on tools and schedules
remain in force, carried forward there; `PRO-019` and the retirement of the
daily stand-up stand unchanged.

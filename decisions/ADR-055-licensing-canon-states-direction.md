---
id: "ADR-055"
uid: ""
title: "The licensing canon states the direction; the standard holds the licences"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-23T22:30:00+02:00"
updated: "2026-09-23T22:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Archive"
tags: [decisions, adr, canon, licensing, openness]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-005 states why Numen opens things and in which direction, in prose and without naming a licence. The regime table, the manoeuvre-room table and the borders list are removed: the first duplicated LIC-002 in a shorter and staler form, and the other two are said better as reasoning. The count of canon documents is replaced by the mechanism that produced it."
related: ["CAN-005", "STD-010", "ADR-049", "ADR-036"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-055 — The licensing canon states the direction

> **Summary:** The canon keeps the why and gives up every operational table;
> a fact that would expire on the next canon becomes a rule that will not.
> **Epistemic:** A canon that carries the standard's table is a second copy
> of it, and the copy is always the one that goes stale.
> **Pragmatic:** One page to learn what Numen gives away and why; one
> standard to learn what each file carries.
> **Audience:** Agents · Oracles

---

## 1. Context

`CAN-005` is the strongest document of the eight: it already states, argues
and leaves the reader able to act. Three things in it belong elsewhere.

**The regime table duplicated the standard, with less.** The canon carried
four rows mapping kinds of value to SPDX identifiers. `STD-010`'s `LIC-002`
carries six — it adds documentation under `CC-BY-4.0`, the agent definitions
and the distributable packages — and it is the one a guard reads. Two tables
of licence identifiers is how the first one goes stale, which is exactly the
defect removed from `CAN-002` yesterday.

**A count was doing the work of a rule.** The text said *"the seven canon
documents"* were published before the reservation. There are eight, and the
eighth was first committed on 2026-09-08, three weeks after the reservation
of 2026-08-16 — verified with `git merge-base --is-ancestor`: the seven
precede the cut and `CAN-008` does not. Yet `REUSE.toml` declares `canon/**`
open, so `CAN-008` has stood as a public offer since the day it was pushed.

Under this canon's own principle that is settled, not a defect to repair: a
public offer is the grant, and an offer cannot be withdrawn. The failure was
never the eighth document — it was writing a number where a mechanism
belonged, in a document that will be read when there are nine.

**The manoeuvre-room table was reasoning in a grid.** Five rows of position
and remaining freedom, in a canon whose job is to explain the direction of
travel. It reads better as the sentence it always was.

**The borders list was an index.** Five bullets pointing at which document
holds which operational detail — the apparatus `ADR-049` removed from canon,
and the material is reachable from `related:` and the References table.

## 2. Decision

`CAN-005` moves to `4.0.0` and states the direction in prose.

**No licence is named in the body.** The four kinds of value — catalogue,
edge, core, world and name — are described by how each is held and why:
given away because it is how people arrive; shared because its worth grows
with adoption; protected by copyleft, free to whoever shares back; kept
because nobody else could have made it. Which identifier each carries is
`STD-010`'s, where a guard verifies it.

**The count becomes the mechanism.** What has been publicly offered under an
open licence is open from that offer, however many documents that turns out
to be. And the rule the incident yields is stated where it can prevent the
next one: **a piece meant to be born reserved is declared so before it is
published, never after** — including a document added to an already-open
folder, which inherits that folder's offer the moment it is pushed.

**The two tables and the borders list are removed.** The manoeuvre-room table
becomes the sentence it was; the regime table and the index go.

The principle, *silence does not declare*, *a birth licence is not a
publication*, the trademark reservation and the closing line — *the system can
be copied; one cannot claim to be Numen* — are unchanged.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Reserve `CAN-008` and correct `REUSE.toml` | It has stood as a public offer in a public repository since 2026-09-08. Withdrawing it is precisely what this canon forbids, and the document is the visual identity — the least sensitive of the eight |
| Keep the regime table, correct it to six rows | Then there are two correct tables until one changes. The guard reads `STD-010`; the canon should not hold a second |
| Write "the eight canon documents" | True today and false on the ninth. The number was never the point |
| Keep the borders list as navigation | `ADR-049` settled this: the site navigates, `related:` links, and canon prose spends itself on what binds |

## 4. Consequences

- **Obliges:** whoever creates a document meant to be reserved to declare it
  before the first push; whoever wants a licence identifier to read the
  standard.
- **Costs:** a reader who wanted the regime map on the same page as the
  reasoning now follows one pointer. `CAN-008` stays open, which this decision
  accepts explicitly rather than by omission.
- **Reversal:** none available for the openness itself — that is the canon's
  point. If the regime map proves genuinely needed beside the reasoning, it
  returns as a link, never as a copy.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.

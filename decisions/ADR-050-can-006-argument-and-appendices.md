---
id: "ADR-050"
uid: ""
title: "CAN-006 keeps its argument and loses its appendices"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-23T18:00:00+02:00"
updated: "2026-09-23T18:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, epistemics, rituals]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-006 gains the card and the scope line it never had and loses its two closing sections, which stated a meeting calendar and a summary of what the archive already holds elsewhere. Its argument — the Borromean knot, Peirce, Jung — is not edited."
related: ["CAN-006", "CAN-001", "ADR-049", "PRO-019"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-050 — CAN-006 keeps its argument and loses its appendices

> **Summary:** The dense canon gets its header apparatus and drops two
> appended sections; not a word of the argument changes.
> **Epistemic:** A text can be wholly sound and still carry, at its end,
> material that belongs to another series.
> **Pragmatic:** The canon a reader meets now opens with what it claims and
> ends where its reasoning ends.
> **Audience:** Agents · Oracles

---

## 1. Context

`CAN-006` is the corpus's most worked text: the germinal motive, the
regulatory model and the narrative projection as a Borromean knot, read
through Peirce's sign and Jung's archetype. It was written as an academic
argument and it holds.

Two things were wrong with it, and neither is the argument.

*It had no apparatus.* No Summary, no Epistemic, no Pragmatic, no `Binds:`
line, no `related:`. The site renders that card as the page's opening and
agents read it before deciding to open the file; `CAN-006` offered neither a
statement of what it claims nor a way in. A reader met eleven paragraphs of
Peirce with no indication of why.

*It ended in two appendices.* After the argument closed, two sections
followed. *Connection with the Structure of Numinia* restated, in summary,
what the preceding text had already established and what `CAN-001` now says
first-hand. *Connection with the Numen Games Framework* was a meeting
calendar: two rituals, their hours, their weekday, their venue — the same
clock facts that `ADR-048` removed from `CAN-001` as the kind of thing that
expires first, and which here disagreed with two other canons on the hour.

Under the mould of `ADR-049` those appendices are a plain breach: canon holds
no clock and does not restate a neighbour.

## 2. Decision

`CAN-006` moves to `2.0.0`. The argument is not edited — not a sentence, not a
heading, not a term. The change is confined to the apparatus and the tail:

**The card and the scope line are added.** The Summary states the claim the
text argues: three interlinked rings, none removable. The Epistemic names what
the reader will understand and through which lens. The Pragmatic names what
this canon uniquely offers — the model applies to projects that are not this
one, which is the document's own stated ambition. `Binds:` and `related:` are
filled.

**The two closing sections are removed.** Their live content is already held:
the metagame observation and the claim that Numinia is entered through play
are in `CAN-001`; the rituals, their cadence and their convokers are in
`PRO-019`; their hours are in the calendar, where a clock belongs.

`2.0.0` is a major move because a canon losing two sections reverses what the
document undertook to cover, and only an Oracle moves a major digit.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Rewrite the argument to read more plainly | It is academic on purpose and it is the corpus's most worked text. Nothing in it is stale; ease of reading is not a defect worth risking the reasoning for |
| Keep the two sections and only fix the hours | The hours were the visible fault, not the only one: both sections restate what other documents hold, and a summary of a neighbour is a second place to go stale |
| Move the rituals paragraph into `PRO-019` | Nothing to move. `PRO-019` already holds cadence and convoker for all five rituals; the hours are deliberately not in the archive |
| Split the text into two canons | The argument is one chain: the conclusion depends on every link. This is the text that proved a sectioning mould wrong |

## 4. Consequences

- **Obliges:** nothing new. It applies `ADR-049` to a second canon.
- **Costs:** the page gets shorter by two sections, and anyone who linked to
  either heading loses the anchor. A reader who learnt the ritual names here
  now meets them in the protocol and in the canon of brand and culture.
- **Reversal:** none foreseen; the removed material is held elsewhere, and
  git holds what it said.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.

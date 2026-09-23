---
id: "ADR-049"
uid: ""
title: "Canon is written as prose, not filled into sections"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-23T17:00:00+02:00"
updated: "2026-09-23T17:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, templates, writing]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "The canon mould stops prescribing sections and prescribes obligations instead: a canon must say what is so, why it is so, and leave the reader able to do something — in whatever shape its argument takes. The header and the card stay required and checked. CAN-001 is rewritten again under that rule, as the experience of entering Numinia."
supersedes: "ADR-048"
related: ["CAN-001", "CAN-006", "STD-007", "STD-001"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-049 — Canon is written as prose, not filled into sections

> **Summary:** The mould prescribes what a canon must accomplish, never how
> many parts it comes in; `CAN-001` is rewritten to match.
> **Epistemic:** Four numbered sections produced documents that complied and
> did not persuade — and the one section nobody could fill honestly got
> filled anyway.
> **Pragmatic:** Write the text; the mould checks the header, the card, and
> three obligations of content.
> **Audience:** Agents · Oracles

---

## 1. Context

`ADR-048` shipped yesterday. It rewrote `CAN-001` to the four-section mould
and, in the same record, admitted two things it could not resolve:

- the borders section — *what this canon does not define* — was removed from
  `CAN-001` because five paragraphs on absences distracted more than they
  bounded, which left the text at three sections against a mould that asks
  for four;
- `CAN-TEMPLATE` was therefore behind the document it moulds, and the gap was
  recorded as a cost rather than closed.

Reading the result aloud made the rest visible. What improved `CAN-001` was
not losing a section: it was losing section *labels* written in a different
register from the text under them. *The definition* and *The governing
principle* are filing categories. *The city you walked into* is a sentence
from the argument. A reader can tell which was written for them.

Measured across the series: of eight canons, three carry a title that states
a claim and five carry a topic label. The mould asks for a claim in an HTML
comment, and the comment is not read.

And one canon cannot take the shape at all. `CAN-006` is a continuous
argument — Peirce's triad, the Borromean knot, Jung's archetype — where the
conclusion depends on a chain the sections would sever. Under a sectioning
mould it must either be violated or left silently non-conforming. An escape
hatch was drafted for it (`mould: essay`) and then deleted: a rule that
needs an exception for its best text is the wrong rule.

## 2. Decision

**The canon mould prescribes obligations, not sections.** A canon MUST do
three things, in any order, in any shape — as one continuous text, with
headings the author chooses, or with none:

- **Say what is so.** The claim in the present indicative, with whatever makes
  it land. Stating is not listing: a canon that enumerates the parts of a
  thing has written an inventory.
- **Say why it is so.** Reasoning that survives being quoted alone and applied
  to a case the document never imagined. Not the history of the decision —
  that is an ADR.
- **Leave the reader able to do something.** A test they can run, a
  distinction they can draw, a thing they may now refuse, on the first day.

What stays required and mechanically checked is unchanged: the header fields,
the three-part card, and the `Binds:` line. Everything below them is prose.

**A border is written only when it is real.** Say what a canon does not cover
only where the document a reader would confuse it with can be named. This
narrows `ADR-048`, which forbade the borders section outright.

**Canon carries no date and no byline in its body.** A text with a voice
arguing on a particular day is a report or a decision; both have their own
series. This is the boundary against the blog register the prose mould invites.

`CAN-001` is rewritten at `4.0.0` under this rule, as the experience of
entering Numinia rather than an inventory of its parts: 646 words, retitled
*You are already in the game*. `ADR-048`'s two other rules — canon names no
tool, canon holds no schedule — are carried forward unchanged.

The escape hatch is not adopted. Under an obligations mould `CAN-006` conforms
as it stands, and no exception mechanism is needed.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Keep four sections, rename them to read like prose | Renaming does not help the canon whose argument does not divide into four; and the next author restores the labels, because the mould shows labels |
| Keep sections, add `mould: essay` for the exceptions | A rule that needs an exception for its strongest text is the wrong rule. Drafted, then deleted |
| Adopt the blog register outright, as first proposed | A post has a date, a byline and an argument against someone. Canon says what is, in the present, unsigned — adopting the genre imports the ageing we just cured |
| Leave the gap `ADR-048` recorded and fix the template later | The mould would have taught four sections to every canon written in between, and this is the series where drift is most expensive |

## 4. Consequences

- **Obliges:** whoever writes a canon to satisfy three obligations of content
  and to choose their own shape; the mould to stop showing numbered headings.
- **Costs:** the shape is no longer verifiable. A guard can check that a card
  exists; nothing can check that a text leaves the reader able to do
  something, so this moves weight from the guard to the review — and the
  1 500-word budget becomes the only structural discipline left. A weak canon
  will now be weak in prose rather than weak in a form, which is harder to
  spot at a glance and harder to excuse.
- **Reversal:** if canons written under this mould are found to omit one of
  the three obligations more often than the sectioned ones did, the sections
  return as an optional scaffold — offered, not required.

## 5. Status

Proposed. It supersedes `ADR-048`, which stays in the archive as the record of
what was believed yesterday: its rules on tools and schedules remain in force,
carried here.

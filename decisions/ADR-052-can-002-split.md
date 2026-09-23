---
id: "ADR-052"
uid: ""
title: "CAN-002 is split: belief stays canon, positioning is a register, conduct is a standard"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-23T20:00:00+02:00"
updated: "2026-09-23T20:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, brand, split, deflation]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-002 is cut from 5 149 words to about 900 and keeps only what the company believes. The commercial positioning becomes OPS-011, the community rules become STD-029, the visual material is dropped as a stale duplicate of CAN-008 and STD-023, and the market figures, the dated objectives and the technology stack leave the archive entirely."
amends: ["ADR-030"]
related: ["CAN-002", "CAN-008", "OPS-011", "STD-029", "ADR-049"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-052 — CAN-002 is split

> **Summary:** The longest canon was a filled-in brand template. What it
> believes stays; what it sells, what it enforces and what it measures go to
> their own series or out of the archive.
> **Epistemic:** A compilation document hides its own staleness: nobody reads
> 5 000 words to the end, so the wrong parts are never found.
> **Pragmatic:** One short canon of belief, one commercial register, one
> conduct standard, and nothing published that is already false.
> **Audience:** Agents · Oracles

---

## 1. Context

`CAN-002` was the corpus's longest document and the one a reader meets when
asking what this company is.

| | |
|---|---|
| body words | 5 149 — against a canon budget of 1 500 |
| headings | 57 |
| paragraphs that are template instructions, not content | 14 |
| unfilled placeholders published live | 1 (`???M People \| +??% Annual Growth \| ? Countries`) |
| third-party encyclopaedia summaries | 3 (Big Five, Plutchik, Jungian archetypes) |
| internal contradictions | 2 (five Oracles named, four listed; 2026–2027 objectives whose first milestone is 2024) |

**It was a brand template, filled in halfway.** The instructions were never
deleted: *"How did your project begin and what inspired you? The origins
section will explain your motivation…"*, *"What is the core problem that your
organization solves?"*, *"This section should give a brief overview of your
organization's past, present, and future"*. Those sentences are published on
numinia.org, addressing the reader in the second person about how to fill in a
document.

**Four genres in one file.** What the company believes (canon); what it sells
and to whom (a commercial register); how people must behave in community
spaces (a standard binding an actor); and what it measures — market size,
revenue targets, headcount, milestones — which is not archive material at all.

**Some of it was already false.** The technology section names AWS, MongoDB,
LastPass and Microsoft Teams; the system runs on Cloudflare and GitHub. The
objectives are labelled 2026–2027 and list a 2024 milestone. The market table
was never filled in.

**And some of it was a stale copy.** The palette, the typography and Khepri
are carried by `STD-023` and `CAN-008`, where they are current; `CAN-002`
held an older version of the same facts, which is exactly the second place to
go stale that `ADR-049` forbids.

## 2. Decision

**`CAN-002` keeps what the company believes**, at `3.0.0`, retitled *We build
a game to work better*: the purpose, the mission, the four values, the three
pillars, the manifesto, the voice and its three levels, the creative threads
and the symbols, and who the Oracles are. About 900 words.

**The commercial positioning becomes `OPS-011`.** Problem, solution, concept,
context, buyer typology, the elevator pitches, the go-to-market statement,
core language, product shape, revenue models, support, strengths and
weaknesses, and the research lines. It binds nothing: a register records, and
the canon states what binds.

**The community rules become `STD-029`**, plated `CMS-001`…`CMS-007`. Conduct
binds an actor and must be citable when enforced; inside a canon of culture it
read as a description of a pleasant atmosphere.

**The visual and verbal material is dropped, not moved.** `CAN-008` and
`STD-023` already hold it, current. The one exception is the three levels of
language, which is carried into the new `CAN-002` because it is how the brand
speaks, not how it looks.

**The figures leave the archive.** Market sizing, revenue targets, headcount
and dated milestones are not reproduced anywhere. Figures belong where they are
measured and revised. This narrows `ADR-030`: a record whose content is a
number with a date is not preserved by being moved to another series.

**The encyclopaedia summaries and the template instructions are deleted.**
Numen Games decided none of them, and git holds what they said.

**The Oracles are four.** The text claimed five and listed four; the Oracle
ruled four.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Prune only: remove template text, encyclopaedia and false facts | Leaves four genres in one file, and the next reader still meets 3 000 words to find four values |
| Split into canon and one "business" document | The commercial framing and the conduct rules bind differently — one records, one obliges. Merging them recreates the problem at smaller scale |
| Move the figures to `operations/` unchanged | They were stale on arrival. Moving a false number preserves it; the Oracle ruled them out of the archive |
| Keep the palette and typography as a summary | They already disagree with `STD-023`. Two versions of a hex value is how a design system dies |
| Rewrite the whole thing as new prose | The beliefs, values, manifesto and creative threads are good and are the Oracle's own words. They are carried, not reworded |

## 4. Consequences

- **Obliges:** whoever writes about the brand to state belief in `CAN-002`,
  commercial framing in `OPS-011`, and conduct in `STD-029`; nobody to
  reproduce a measured figure in the archive.
- **Costs:** the largest single deletion the corpus has taken — about 4 200
  words leave `CAN-002`, and anyone who linked to one of its 57 headings
  loses the anchor. Two new documents enter the corpus against a standard
  that says the corpus does not grow; the net is strongly negative, but the
  count of files rises by two.
- **Reversal:** if the commercial register is never consulted, it is deleted
  and the sales record absorbs what survives — a register nobody reads is the
  failure mode this decision accepted.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.

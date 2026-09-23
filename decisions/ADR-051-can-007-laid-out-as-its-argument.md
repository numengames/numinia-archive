---
id: "ADR-051"
uid: ""
title: "CAN-007 is laid out as the argument it makes"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-23T19:00:00+02:00"
updated: "2026-09-23T19:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, canon, function, structure, form]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "CAN-007 keeps every claim it made and loses the layout that contradicted them: forty headings across four levels become six, the three transversal elements stop being split by plane, the 1–10 scale becomes the three named moments of the transition, and the self-summarising table and the closing self-description go."
related: ["CAN-007", "CAN-006", "ADR-036", "ADR-049"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-051 — CAN-007 is laid out as the argument it makes

> **Summary:** The canon's form is rebuilt to match its content; no thesis
> changes and nothing it claimed is dropped.
> **Epistemic:** A document whose layout contradicts its own thesis teaches
> the layout — this one split, across two headings, the elements it says
> cannot be split.
> **Pragmatic:** The rule that renaming is not restructuring is now readable
> in one pass, and citable as a sentence rather than a section number.
> **Audience:** Agents · Oracles

---

## 1. Context

`CAN-007` carries the corpus's only falsifiable and directly useful thesis:
an organisation exists on two planes, and intervening only in the plane of
function — renaming roles, introducing dynamics — produces apparent
transformation over an intact system. It gives that thesis two operators, the
Interpreter and the Architect, which together form a test any initiative can
be held to.

Measured on v1.0.1:

| | |
|---|---|
| body words | 1 520 |
| headings | 40 |
| heading depth | 4 levels (`#### In function` inside `### 4.1` inside `## 4`) |
| card fields | none — no Summary, Epistemic, Pragmatic, `Binds:` or `related:` |
| sections of two lines with a heading of their own | 11 |

**The layout contradicted the thesis.** Section 4 states that narrative,
gamification and autonomy "are not layers; they are operators that act on both
planes" — and then splits each of the three into `#### In function` and
`#### In structure`, which is precisely the division the sentence denies. A
reader learns the headings before they learn the claim.

**The apparatus was missing**, as in `CAN-006`: the site renders the card as
the page's opening and agents read it before opening the file.

**Two passages were not canon.** The 1–10 implementation model was a
measuring instrument with tables of high/medium/low presence; the closing
table restated in rows what the prose had just argued, and the final sentence
described the document to itself.

The Oracle's own diagram of this canon states, in three words, what the text
takes eleven paragraphs to circle: *co-presence, co-dependence, co-evolution*,
and the transversal elements "do not belong to one plane — they exist in the
relation". It also names the three moments of the transition: exploration,
hybridisation, transformation. The diagram communicates the canon better than
the canon does.

## 2. Decision

`CAN-007` moves to `2.0.0`. Every claim is kept; the layout is rebuilt to
carry them.

**Forty headings become six, all at one level.** No argument is cut. The
bulleted fragments — attributions, manifestations, "Nature" — are absorbed
into the prose of the operator they describe.

**The three transversal elements stop being split by plane.** Each gets one
paragraph carrying both halves of its action, because the text says they exist
in the relation between the planes and the form must not deny it.

**The 1–10 model becomes the three moments of the transition**, named as the
diagram names them: exploration, hybridisation, transformation. Nothing the
scale asserted is lost — the dominance of each operator at each stage is
stated in prose. What goes is the pretence of measurement: a canon states how
a transformation behaves; it does not score it.

**The summarising table and the closing self-description are removed.** A
canon does not summarise itself, and does not tell the reader what kind of
document it is.

**The title states the claim:** *Function makes the system inhabitable;
structure makes it work differently* — the Oracle's own formulation, replacing
the topic label *Pragmatic Numen System*.

`ADR-036` cited this canon by section number (`§2.3`). That citation is
rewritten in the same change to name the rule instead, as `DOC-008` requires.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Add the card and leave the layout | The layout is the defect: it splits what the text says is unsplittable, and it is why a strong thesis reads as a form |
| Split the canon into canon, protocol and instrument | Considered seriously. The transition reads like a procedure, but it describes how a system behaves over time, not steps an actor executes — the diagram makes that plain |
| Keep the 1–10 scale inside the canon | A scale measures; a canon states. The named moments carry every claim the scale made |
| Move the scale to `system/` as an instrument | Nothing would consult it: what it asserted is in the prose, and an instrument nobody runs is a document that goes stale unobserved |
| Keep the title | It names the topic, not the claim. The Oracle's diagram already carries the sentence the canon needed |

## 4. Consequences

- **Obliges:** nothing new. It applies `ADR-049` to a third canon.
- **Costs:** section numbers disappear, so any citation of `CAN-007 §N` breaks;
  the one that existed is rewritten here, but external links to the published
  headings lose their anchors. The body drops from 1 520 to about 1 100 words.
- **Reversal:** none foreseen. Git holds the scale and the table.

## 5. Status

Proposed. It takes effect when the Oracle approves the pull request that
carries it.

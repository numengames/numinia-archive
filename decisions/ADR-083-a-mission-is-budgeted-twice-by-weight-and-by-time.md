---
id: "ADR-083"
uid: ""
title: "A mission carries a story, fits in one pull request, and is budgeted twice: by weight, a card that picks the model, and by time, in minutes"
type: adr
status: draft
version: "0.1.0"
created: "2026-10-25T13:00:00Z"
updated: "2026-10-25T13:00:00Z"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
section: "Knowledge and quality"
tags: [decisions, adr, missions, estimation, budget, board, governance]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa", "talos", "doulos", "senet"]
outcome: proposed
decision: "A mission is named by level — task (company), user story (mixed), mission (Numinia) — opens with a one-sentence user story, fits in one pull request in one repository (what does not is a parent with children), and carries two budgets written at opening and never edited: weight, a card of the deck that says how much thinking it needs and picks the model and the dollars, and time, in minutes, over 30 split. It closes with what was learned and an invoice the board measured, actual against budget on each axis. Cards of weight 3 and above are played face down by the estimators; 0 to 2 carry the orchestrator's card only. Board cards name their mission at the start of the title; the orchestrator assigns them; improvised work goes under an umbrella mission per area and week. The archive holds the priority; the board holds the order of the day. People of the team vote on the mission's pull request; the Oracle decides weight 13 and above, money, personal data and security on a decision card."
amends: ["PRO-003"]
related: ["STD-004", "STD-025", "PRI-009"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-083 — A mission is budgeted twice: weight and time

> **Summary:** A mission says who notices it, fits in one pull request, and is
> budgeted on two axes before it starts — how much thinking (weight, a card
> that picks the model) and how much work (time, in minutes). At the end the
> board's own measurements give the invoice, and what diverged is written
> between the two.
> **Epistemic:** The Oracle's ruling of 2026-10-25 («dos presupuestos, uno
> por peso y otro por tiempo, porque el peso va relacionado a la cantidad de
> proceso») and his approval of the design the same day («me parece bien, a
> por ello»). The figures are Ursa's, read the same day from the Hermes boards:
> 240 finished runs, 158 with a session cost.
> **Pragmatic:** Open a mission from `machine/templates/MIS-TEMPLATE.md`; the
> example beside it is a real card with a real invoice.
> **Audience:** Agents · Oracles

---

## 1. Context

On 2026-10-25 the boards held 275 open cards, none saying which mission it
served, and the archive 47 missions, 3 with a user story and 38 with no one
assigned. The header's `effort` (XS to XL) measured size, which the time a
card takes already measures better: the median finished run took 3.6 minutes
and almost every one under 30. What `effort` did not measure is the amount of
processing — a larger or a smaller model — which is where the money goes: the
median card cost $0.85, the 85th percentile $2.17. Agents estimating in hours
guessed about three times too long.

The deck already existed. The Oracle named its cards on 2026-10-20 — from 0
«ojos cerrados» to 100 «bestia legendaria», with ∞ for an idea and ? for a
lost thread — and three agents played a first round on eight finished
stories. It was never used on a live mission.

Two findings from the industry shape the rest. An agent fails with long
work, not with hard work (METR, task time horizons, 2025): a unit of one pull
request keeps it short. And estimates improve against evidence, not
intuition (Spolsky's evidence-based scheduling; Flyvbjerg's outside view):
each budget cites the closest closed example.

## 2. Decision

1. **Names by level.** Task (company) · user story (mixed) · mission
   (Numinia). The Hermes subdivision of a card is a *subtask*.
2. **Every mission opens with a story:** «As a…, I want…, so that…», with
   someone who would notice. If nobody would, it is a card of another mission.
3. **One mission, one pull request, one repository.** What does not fit is
   a parent mission with children.
4. **Two budgets, written at opening, never edited** (`weight`,
   `model_planned`, `budget_usd`, `budget_minutes` in the header):
   - **Weight** is how much thinking it needs — difficulty, risk, judgement —
     a card of the deck. It picks the model: 0–2 Haiku, 3–5 Sonnet, 8 Sonnet
     with an Opus rescue, 13 and above split before it starts. The model
     gives the dollars.
   - **Time** is how much work there is, in minutes; over 30 is split.
   Weight replaces `effort`, which stays legal on the cards that carry it.
5. **What was learned sits between the budget and the invoice;** the invoice
   is pasted by a script from what the board measured, with actual ÷ budget
   on each axis and whether the card was right.
6. **Who estimates.** Weight 3 and above: the estimators play face down, the
   highest and the lowest say why, two rounds at most, neighbours take the
   higher card, and the orchestrator settles a third disagreement and writes
   it down. Weight 0 to 2: the orchestrator's card alone, because a round
   costs more than the work.
7. **The board.** A card's title starts with `MIS-NNN · `; the mission does
   not list its cards. The orchestrator assigns cards. Improvised work goes
   under an umbrella mission opened per area and week. The archive holds a
   four-level priority; the order of the day lives only on the board.
8. **Who votes where.** People of the team vote on the mission's pull
   request: approve is yes, request changes is no, «card N because…» is their
   card. The Oracle decides weight 13 and above, money, personal data and
   security, on a decision card (yes · no · later).

## 3. Consequences

- `machine/templates/MIS-TEMPLATE.md` gains Story, Budget, What we learned
  and Invoice; its example is a real VR card of 2026-10-17.
- `STD-004` registers the four budget fields and the `weight` vocabulary
  under HDR-038.
- `PRO-003` announces missions of weight 5 and above, lets the orchestrator
  assign cards and sends improvised work to an umbrella mission.
- Until the deck is calibrated on finished cards, the dollars per card are
  provisional and each budget says which example it copied.
- Old missions keep `effort`; nothing is rewritten.

## References

- METR, «Measuring AI ability to complete long tasks» (2025).
- J. Spolsky, «Evidence Based Scheduling» (2007).
- B. Flyvbjerg, «From Nobel Prize to project management: getting risks right» (2006).
- `PRO-003` · `STD-004` · `STD-025`

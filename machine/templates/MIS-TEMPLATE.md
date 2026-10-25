---
# Copy this file to missions/MIS-NNNN-<kebab-slug>.md and fill it in.
# The filename carries FOUR digits, zero-padded (MIS-0145-...); the `id` field
# carries three (MIS-145). That asymmetry is deliberate and enforced.
#
# THE COMMON HEADER — every document carries these, in this order (STD-004).
id: "MIS-NNN"
# reserved for the universal identifier: always written, always empty
uid: ""
title: "One line, in the imperative: what this mission does"
type: mission
# status: todo | in-progress | in-review | done | on-hold
status: todo
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "person-responsible"
# section: Strategy and governance | Products and services | Brand and marketing | Sales and partners | Operations | People and culture | Finance | Legal and compliance | Technology | Knowledge and quality
section: "Knowledge and quality"
tags: [area, subject]
license: "CC0-1.0"

# THE BOARD — what /missions paints. The build needs `id` and `title`; the
# rest have defaults, and a card that leaves them out is painted wrong.
# priority: critical | high | medium | low
priority: medium
# THE BUDGET — two of them, written when the mission opens and never edited (ADR-083).
# weight = how much thinking it needs (difficulty, risk, judgement), one card of
# the deck. It picks the model: 0-2 haiku · 3-5 sonnet · 8 sonnet with an opus
# rescue · 13 and above is split before it starts · inf is an idea · ? is unclear.
# weight: 0 | 1 | 2 | 3 | 5 | 8 | 13 | 20 | 40 | 100 | inf | ?
weight: 3
# the model the card picks, and the dollars it should cost, from the closest closed example
model_planned: sonnet
budget_usd: 1.00
# time = how much work there is: minutes; over 30 means split it into more missions
budget_minutes: 20
# executor: agent = an agent can do it; human = needs a person; hybrid
executor: agent
# agent-id, or null while unassigned
assigned_to: null
# YYYY-MM-DDTHH:MM:SS+02:00, filled when status becomes done
completed: null

# OPTIONAL — use when they apply, omit without guilt.
# depends_on: ["MIS-NNN"]           # missions that must land first
# blocked_by: "MIS-NNN"
# parent_mission: "MIS-NNN"         # when this is a phase of a larger mission
# requires_oracle_approval: false   # true when the mission leaves the system
# context: "YYYY-MM-DDTHH:MM:SS+02:00" # when the premise was last checked
# paths: []                         # repo paths to start from — a hint, not a fence
# hold_reason: "why this is on hold"
# started: "YYYY-MM-DDTHH:MM:SSZ"   # when status became in-progress
# in_review_at: "YYYY-MM-DDTHH:MM:SSZ"
---

# MIS-NNN — Verb + object + result

> **Summary:** One sentence. WHAT this mission changes.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with it.
> **Audience:** Agents · People responsible

<!-- Title: verb + object + result, e.g. "Retire the /print/ intermediates
     from the served site". Not "Print pages" — a noun is not a mission. -->

---

## 1. Story

As a {who will notice}, I want {what}, so that {why}.

One sentence, with someone who would notice the change. If nobody would
notice it, it is not a mission: it is a card of another one (ADR-083).

---

## 2. Scope

What this mission touches, and where it stops. **One repository**: a mission
fits in one pull request; what does not is a parent mission with children,
each in one repository (ADR-083). Concrete: files, folders,
series, routes. If a boundary matters, say it — *"only `numinia-nwos`"*,
*"the glob, not the documents"*.

> **Scope and Acceptance criteria are written when the mission OPENS and are
> not edited afterwards.** What happened goes in Closure. Correcting the brief
> so it matches the outcome deletes the difference between plan and reality —
> and that difference is the only thing a closed mission teaches.

<!-- Optional, in this same block when the boundary is contested:
## Out of scope
What someone would reasonably expect to be included and is not, and why. -->

---

## 3. Acceptance criteria

> **Every criterion must be FALSE at the base commit.** One that already
> passes before the work starts graduates nothing — it is decoration. If a
> criterion cannot be shown false today, it is not a criterion.
>
> **State the final state, not a delta.** The corpus moves under your feet: a
> criterion that hard-codes a count expires between being written and being
> checked. Assert what must be true at the end, not how much must change.

```
✓  curl -s numinia.org/print/missions/mis-109/ returns 404   (today: 200)
✓  find web/dist/print -name index.html returns 0            (today: 247)
✗  278 /print/ pages are retired                             (a delta — it rots)
✗  the site is more coherent                                 (not falsifiable)
```

- [ ] Verifiable by someone who did not do the work
- [ ] With the command that verifies it, when there is one
- [ ] False at the base commit — say what it returns today
- [ ] Phrased as a final state, not as a delta

---

## 4. Budget

*(Written when the mission opens, with the header's four budget fields, and
never edited. A new estimate is a new dated line under the old one.)*

**Weight — how much thinking it needs**
- Card: N «name», sealed in round R: estimator N · estimator N · estimator N
  (cards 0, 1 and 2 carry one card only, the orchestrator's: round 0)
- Why this card: difficulty, risk and judgement, in one sentence
- Process: model, about $X (closest closed example: what it cost with this card)

**Time — how much work there is**
- N minutes, in K board cards titled `MIS-NNN · …`
- Like: the closest closed mission or card, and how long it took
- Biggest risk: what would make it longer

---

## 5. What we learned

*(Written while doing it and at the end — between the budget and the
invoice. Not before, and not with intentions.)*

- **What was done:** the real state, not the planned one.
- **What diverged, and why:** the difference between the plan and what
  happened. **This is the paragraph that produces knowledge** — a mission that
  went exactly as planned teaches nothing the plan did not already say.
- **For the next similar mission:** what it should know before it starts.

---

## 6. Invoice

*(Pasted by the invoice script from what the board measured — minutes,
dollars, tokens and models of every card titled `MIS-NNN · …`. Not typed.)*

| | Budget | Actual | Ratio |
|---|---|---|---|
| Time | N min | N min in R runs | actual ÷ budget |
| Weight | card N · model · $X | model(s) · $Y · tokens | actual ÷ budget |

- **Was the card right?** yes · no, it behaved like an N
- **Evidence:** pull request, commit, command or route that proves it.
- **Closed:** YYYY-MM-DD · **by:** agent-id

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

KEEP EVERY COMMENT ON ITS OWN LINE. An inline `#` after a value ends up INSIDE
the value in some parsers: `status: todo  # todo|done` is read by one check as
the status `todo` and by another as the whole string. That is how the corpus
came to hold a status value reading "todo  # todo|done" — from a version of
this template that put its vocabularies inline. The vocabularies above are on
their own lines for that reason; keep them there or delete them, never move
them onto the value.

VERSION opens at 0.1.0. Every artefact starts there; only the person responsible promotes
to 1.0.0.

THE DECK — the weight cards, with the names the Oracle gave them:
0 «ojos cerrados» (eyes closed) · 1 «manos a la obra» (hands on) ·
2 «pequeña» (small) · 3 «criterio de diseño» (design judgement) ·
5 «sube el nivel» (levels you up) · 8 «hace sudar» (makes you sweat) ·
13 «quema las manos» (burns your hands) · 20 «bestia grande» (big beast) ·
40 «la otra bestia» (the other beast) · 100 «bestia legendaria» (legendary
beast) · inf «idea fascinante» (fascinating idea) · ? «he perdido el hilo»
(I lost the thread).
Weight measures difficulty, never hours: renaming 200 files is long and easy
(weight 1, many minutes); a bug only seen in VR goggles is short and hard
(weight 8, few minutes). Estimators play their cards face down; the highest
and the lowest say why; two rounds at most; neighbours take the higher card.

OPTIONAL SECTIONS — add only when they earn their place.

## Epistemic value
ONLY when the mission claims it learns something. Then with a hypothesis and
how it is validated:
  Hypothesis: <what we believe>
  Validated by: <command, measurement, or observation that could refute it>
An "epistemic value" with no method is an intention, not knowledge.

## Pragmatic value
What practical capability this leaves behind, when it is not obvious from Scope.

## Execution log
Running notes during a long mission. Small missions do not need one.
-->

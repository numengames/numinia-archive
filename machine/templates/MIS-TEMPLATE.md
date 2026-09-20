---
# Copy this file to missions/MIS-NNNN-<kebab-slug>.md and fill it in.
# The filename carries FOUR digits, zero-padded (MIS-0145-...); the `id` field
# carries three (MIS-145). That asymmetry is deliberate and enforced.
#
# CORE — the ten fields the build verifies (web/src/content.config.ts).
# If one is missing or changes type, `npm run build` fails.
id: "MIS-NNN"
uid: ""
title: "One line, in the imperative: what this mission does"
# status: todo | in-progress | in-review | done | frozen
status: todo
# priority: critical | high | medium | low
priority: medium
# effort: XS | S | M | L | XL
effort: S
# guild: Sentinels | Alchemists | Exegetes | Procurators
guild: "Alchemists"
# territory: CAO | Product | Platform | Infrastructure | Content | Sales | Funding | Archive
territory: "Archive"
# type_execution: digital = an agent can do it; biological = needs a human; hybrid
type_execution: digital
# agent-id, or null while unassigned
assigned_to: null
# YYYY-MM-DD, filled when status becomes done
completed: null

# REGISTRO — not consumed by the build, but every document carries them.
type: mission
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
tags: [area, guild]
license: "CC0-1.0"

# OPTIONAL — use when they apply, omit without guilt.
# depends_on: ["MIS-NNN"]           # missions that must land first
# blocked_by: "MIS-NNN"
# parent_mission: "MIS-NNN"         # when this is a phase of a larger mission
# requires_oracle_approval: false   # true when the mission leaves the system
# context: "YYYY-MM-DD"             # when the premise was last checked
# paths: []                         # repo paths to start from — a hint, not a fence
# freeze_reason: "why this is frozen"
# in_review_at: "YYYY-MM-DDTHH:MM:SSZ"
# started: "YYYY-MM-DDTHH:MM:SSZ"
---

# MIS-NNN — Verb + object + result

> **Summary:** One sentence. WHAT this mission changes.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with it.
> **Audience:** Agents · Oracles

<!-- Title: verb + object + result, e.g. "Retire the /print/ intermediates
     from the served site". Not "Print pages" — a noun is not a mission. -->

---

## 1. Scope

What this mission touches, and where it stops. Concrete: files, folders,
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

## 2. Acceptance criteria

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

## 3. Closure

*(Fill when the mission closes. Not before, and not with intentions. Add here
— never edit Scope or the criteria to match what happened.)*

- **What was done:** the real state, not the planned one.
- **What diverged, and why:** the difference between the plan and what
  happened. **This is the paragraph that produces knowledge** — a mission that
  went exactly as planned teaches nothing the plan did not already say.
- **Evidence:** command, figure, commit, or route that proves it.
- **Closed:** YYYY-MM-DD · **by:** agent-id

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

KEEP EVERY COMMENT ON ITS OWN LINE. An inline `#` after a value ends up INSIDE
the value in some parsers: `status: todo  # todo|done` is read by one guard as
the status `todo` and by another as the whole string. That is how the corpus
came to hold a status value reading "todo  # todo|done" — from a version of
this template that put its vocabularies inline. The vocabularies above are on
their own lines for that reason; keep them there or delete them, never move
them onto the value.

VERSION opens at 0.1.0. Every artefact starts there; only the Oracle promotes
to 1.0.0.

OPTIONAL SECTIONS — add only when they earn their place.

## Story
As a {persona}, I want {goal}, so that {benefit}.
Useful for product missions and anything involving a real user. For a small
technical mission it forces inventing a fictional persona to say "take debt/
out of the glob" — omit it there.

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

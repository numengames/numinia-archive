---
id: "ANNEX-mission-selection"
uid: ""
title: "Draft — how the next mission is chosen"
status: draft

type: meta
version: "0.1.0"
created: "2026-08-25T20:05:59Z"
created_source: "git:5abd27f"
created_confidence: exact
updated: "2026-08-25T20:05:59Z"
author: "ursa"
owner: "oracle"
tags: [missions, policy, draft, board]
license: "CC0-1.0"

registration: exempt
registration_reason: "annex to the mission series, not a numbered mission"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# Draft — how the next mission is chosen

> **⚠️ THIS IS A DRAFT, NOT A POLICY.** It has been applied exactly once, to one
> board, on one day. It is written down because the alternative is worse: with
> nothing written, three cold agents invented three different tiebreakers in the
> August tests. A bad rule on paper can be corrected; an invented one cannot
> even be found.
>
> **Epistemic:** what ordering rule survived contact with a real board of 111
> missions.
> **Pragmatic:** an order you can argue with, instead of one you have to guess.

`ROOT = numengames/numinia-nwos` · `HEAD = 25b3922` · 2026-08-25

---

## The rule

Applied in order. The first criterion that separates two missions decides.

**1 · Unblocking.** If A unblocks B, A goes first.
The only *objective* criterion here: it is read from `depends_on`, not judged.
Everything below is judgement, and that is why this one comes first.

**2 · Debt with a number.** Work that closes a `D-NNN` outranks work that closes
nothing. The debt was already judged worth registering by someone; that judgement
is reused rather than re-litigated.

**3 · Visibility.** Between equals, what a visitor can see wins over what only
the repository can see. This archive's purpose is to be readable.

**4 · Known cost.** On a tie, lower `effort` first.
And a hard gate rather than a tiebreak: **a mission with no executable criteria
does not enter the queue at all.** `MIS-074` and `MIS-085` are not ranked low —
they are unrankable, because nobody can say when they would be finished.

**Final tiebreak: lowest ID.** Arbitrary, and declared. Arbitrary-and-declared
beats arbitrary-and-invented-three-times.

---

## Applied once, to this board

| # | Mission | Which criterion decided it |
|---|---|---|
| 1 | `MIS-111` section indexes | (1) unblocks `MIS-113` |
| 2 | `MIS-114` visibility filter | (2) partially closes `D-033`, unblocks `debt/` publishing |
| 3 | `MIS-115` board redesign | (3) visible, and already started |
| 4 | `MIS-113` README index | (1) unblocked by #1 |
| 5 | `MIS-112` home from README | (3) visible, (4) cost M |
| 6 | `MIS-062` (cut) uid migration | (2) closes the surviving line of a B |
| 7 | `MIS-100` the two open scenarios | (2) closes `D-011` step 3 |
| 8 | `MIS-095` `/updates` | (3) visible, and returns 404 today |

## What the single application already showed

**Criteria 2 and 3 collided at positions 2–3** and the tie was broken toward
debt. That collision is the most useful thing this draft produced: it means the
order between *"closes a numbered debt"* and *"a visitor can see it"* is not
settled by the rule as written — it was settled by me, once, and it could
reasonably have gone the other way.

**That is the first thing to fix when this becomes a policy.** Either the two are
explicitly ranked, or the rule admits that they are peers and says who decides.

## What this draft does not do

It does not say **when** to stop a mission, how to split one, or what to do with
a mission that is wanted but unrankable. `MIS-074` and `MIS-085` were pushed out
of the queue by the gate in criterion 4 — the rule removed them from
consideration without saying what should happen to them next. **A selection
policy that can only say "not this one" is half a policy.**

It has one application behind it. It needs several more before it earns a
`C-00X` or an `S-NNN`, on the same reasoning that keeps the mission template
from being promoted yet: a standard exists to be adopted by others, and a
one-day-old rule has not been adopted by anyone.

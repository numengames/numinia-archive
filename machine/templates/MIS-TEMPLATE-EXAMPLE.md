---
id: "MIS-EXAMPLE"
uid: ""
title: "Example — a real small mission written with this template"
type: mission
status: done
version: "2.0.0"
created: "2026-10-17T09:00:00Z"
updated: "2026-10-25T12:00:00Z"
author: "ursa"
owner: "person-responsible"
section: "Technology"
tags: [engine, vr, example]
license: "CC0-1.0"

priority: high
weight: 8
model_planned: sonnet
budget_usd: 4.00
budget_minutes: 30
executor: agent
assigned_to: "ursa"
completed: "2026-10-17T11:00:00Z"
---
# MIS-EXAMPLE — Make VR movement go where you look, at a human pace

> **Summary:** after a snap turn the stick moved you sideways, and half the
> stick already ran; now it follows your gaze and walks.
> **Epistemic:** what a filled-in mission looks like, with both budgets and a
> real invoice that shows why one budget is not enough.
> **Pragmatic:** copy this shape, not this content.
> **Audience:** Agents · People responsible

---

> **This document is an example, not a mission.** It is filled with a real,
> measured case: one card of the `motor-vr` board, closed on 2026-10-17. The
> invoice is real (the board's runs and their session cost). The budget and
> the round of cards are written as they would have been: nobody estimated
> this card at the time. It carries `id: MIS-EXAMPLE`, so it consumes no
> identifier, and it lives beside the template, so the board never counts it.

---

## 1. Story

As a visitor wearing VR goggles, I want the stick to take me where I look and
at walking pace, so that I can move around a world without feeling sick.

---

## 2. Scope

The direction of movement after a snap turn, and the travel and speed of the
stick in VR. One repository: `numinia-engine`.

### Out of scope

The fog (the Oracle likes it). Choosing a movement mode is another mission.

---

## 3. Acceptance criteria

- [x] After three snap turns right and the stick forward, you move forward —
      today you move to the left (a test covers both turn directions)
- [x] Half the stick walks; only the end of its travel runs — today half the
      stick runs
- [x] In VR you walk at about 1.5 m/s and run at about 4 m/s — today 6 m/s

---

## 4. Budget

**Weight — how much thinking it needs**
- Card: 8 «hace sudar», sealed in round 2. Round 1: Doulos 5 · Talos 8 ·
  Senet 3, no agreement. Round 2, after the reasons: Doulos 5 · Talos 8 ·
  Senet 5 — neighbours, the higher card.
- Why this card: a bug only seen in real goggles, on one side only, with no
  test that reproduces it.
- Process: Sonnet with an Opus rescue, about $4.

**Time — how much work there is**
- 30 minutes, in 1 board card.
- Like: no VR bug measured before.
- Biggest risk: it cannot be reproduced without the goggles.

---

## 5. What we learned

- **What was done:** the move after a turn reads the fresh direction; the
  stick walks until the end of its travel; walking and running speeds are
  human.
- **What diverged, and why:** the card blamed the sign of the turn. The cause
  was elsewhere: three.js refreshes the XR camera only inside `render()`, so a
  move right after a turn read the direction from before it. The symptom was
  right; the hypothesis was wrong.
- **For the next similar mission:** the goggles emulator (IWER) against a
  real local server reproduces it. No goggles needed next time.

  One estimator alone would have played 5, and the invoice would have read
  2.1 on weight. The round raised it to 8, and the invoice reads 1.06.

---

## 6. Invoice

| | Budget | Actual | Ratio |
|---|---|---|---|
| Time | 30 min | 21.8 min in 1 run | 0.73 |
| Weight | card 8 · sonnet · $4.00 | claude-sonnet-5 · $4.24 · 14,085,208 tokens | 1.06 |

- **Was the card right?** yes.
- **Evidence:** commit `060a3c2` on branch `vr/giro-y-velocidad`, `numinia-engine`.
- **Closed:** 2026-10-17 · **by:** ursa

---
id: "PRO-041"
uid: ""
title: "Building the night backdrop"
type: procedure
status: draft
version: "0.1.0"
created: "2026-10-25T11:40:00Z"
updated: "2026-10-25T11:40:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [procedure, design, motion, velo, sky]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-023", "STD-008", "STD-034", "PRO-014", "PRO-022", "DES-011"]
derived_from: "PRI-008"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-041 — Building the night backdrop

> **Summary:** How the two pieces of the house that sit behind the reading at
> night are built: the sky and the Veil layer.
> **Epistemic:** How are the sky and the Veil layer built, taking every
> number from the design values?
> **Pragmatic:** Build or change one of the two pieces without breaking what
> a reader already relies on.
> **Audience:** Agents · Oracles

**Binds:** whoever builds, changes or reviews the sky or the Veil layer on a
site of the house.

---

## 1. Purpose and trigger

Two pieces are already in production and each was reached by fixing
something a reader hit. This procedure keeps how they are built in one place,
so the next change starts from what was learned. It starts when a piece of
the two is built on a new site, or changed on one that has it. An **agent**
builds; the **Oracle** approves anything that changes what a reader sees.

---

## 2. Preconditions

The values the piece uses are in `STD-023`: the sky's tiers in §15 and its
count in §20, its motion as animation 14 of §14, the Veil
tokens and their ceilings in §20. A value that is not there is proposed
there first.

---

## 3. Procedure

### 3.1 The sky

1. **Draw the five tiers.** Weights, radii and colours from `STD-023` §15,
   no other colour.
2. **Animate it as it stands in production.** The star count of
   `velo.cielo` (§20); the drift, reappearance and breathing of animation
   14 (§14), each star at its own rhythm; reseeding on resize.
3. **Draw it in Nocturno.** As built today, Diurno has no sky.
4. **Stop it under `prefers-reduced-motion`.** The stars stay fixed at mid
   alpha.

### 3.2 The Veil layer

**Ceilings and placement.** As built today, in Nocturno only: in Diurno the
Veil does not exist, same logic as the relief.
1. **Lay grid and fog as background layers**, behind the reading text and
   outside cards and elevated surfaces.
2. **Put `velo.cristal` over something**: a grid, fog or veiled image behind
   it. Blurring nothing is smoke.
3. **Measure text over glass** at the secondary minimum, AA against the worst
   background (`STD-034`).
4. **Choose grid or circuit relief, not both**: two meshes fight
   `[EXTENSION — validate]`. Fog can settle over the relief at half its
   alpha.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 3.1 | The sky stops with reduced motion on, and is absent in Diurno |
| 3.2 | No Veil layer sits over reading text or inside a card; contrast AA over the worst background (`STD-034`) |

---

## 5. Escalation

A change that needs a value `STD-023` does not hold stops: the value is
proposed to `STD-023` by pull request and the piece waits. A reader-facing
change the Oracle has not seen is not merged.

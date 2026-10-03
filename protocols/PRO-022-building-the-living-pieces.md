---
id: "PRO-022"
uid: ""
title: "Building the living pieces"
type: protocol
status: draft
version: "0.2.1"
created: "2026-09-26T18:00:00+02:00"
updated: "2026-10-03T19:40:00+02:00"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [protocol, design, motion, velo, sky, reading-aloud]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-023", "STD-008", "STD-034", "PRO-014", "BLU-011"]
derived_from: "CAN-008"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-022 — Building the living pieces

> **Summary:** How the three pieces of the house that move or sit over the
> reading are built: the sky, the Veil layer and the reading-aloud player.
> **Epistemic:** How are the sky, the Veil layer and the reading player
> built, taking every number from the design values?
> **Pragmatic:** Build or change one of the three pieces without breaking
> what a reader already relies on.
> **Audience:** Agents · Oracles

**Binds:** whoever builds, changes or reviews the sky, the Veil layer or the
reading-aloud player on a site of the house.

---

## 1. Purpose and trigger

Three pieces are already in production and each was reached by fixing
something a reader hit. This protocol keeps how they are built in one place,
so the next change starts from what was learned. It starts when a piece of
the three is built on a new site, or changed on one that has it. An **agent**
builds; the **Oracle** approves anything that changes what a reader sees.

---

## 2. Preconditions

The values the piece uses are in `STD-023`: the sky's tiers in §15, the Veil
tokens and their ceilings in §20, the reading player's numbers in §22. A
value that is not there is proposed there first.

---

## 3. Procedure

### 3.1 The sky

1. **Draw the five tiers.** Weights, radii and colours from `STD-023` §15,
   no other colour.
2. **Animate it as it stands in production.** **175 stars**; drift of `±0.06 px` per frame with
   reappearance on the opposite side; alpha breathing between `.05` and
   `.85`, each star at its own rhythm (`.002–.006` per frame);
   reseeding on resize.
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

### 3.3 Reading aloud — the dock, the ruler, the ink

Every number here is `STD-023` §22; the reasons each pattern was chosen are
in the history of that section and of this one.

1. **The reader leads.** The page follows the voice only until the
   reader scrolls. From then on the voice keeps going and a *Back to the
   reading* control appears above the dock, pointing to where the voice is;
   reaching the word again by hand re-arms the following. One scroll per
   page: the page's.
2. **Build the dock.** It surfaces at the bottom while playing, in
   `velo.cristal` with `velo.cristal-borde`, at the width of the text
   column: play or pause, section name, time in mono, ruler, rate, close.
   The entry point in the page stays quiet until it plays.
3. **Build the ruler.** A hairline with a fine mark along it and a longer
   mark at each section; the heard part in the halftone of §22. Hover shows
   time, section and the first words of the sentence; a drop starts at the
   head of that sentence; arrows step sentence by sentence.
4. **Dry the ink.** What the voice has passed keeps its own colour and
   loses brightness in the three steps of §22, painted with the CSS Custom
   Highlight API, never with spans, so translation and selection survive.
   It is a state, not an animation. Under `prefers-contrast: more` nothing
   dries.
5. **Light the word.** The reading light of §22 drifts just above the
   spoken word, placed by spoken weight and re-synced at the end of every
   sentence. The ruler's head is the same light. Under
   `prefers-reduced-motion` it jumps, with no trail.
6. **Let a touch start the voice.** While it plays, a click on a sentence
   starts it there; links, buttons and a selection keep their meaning. One
   button steps through the speeds of §22, and the chosen speed follows the
   reader across documents.
7. **Use glyphs for the document tools.** Copy, download and source are
   icons, each with a name a screen reader says and a tooltip. The ruler's
   preview is dark glass like the dock, an exception to the opposite-mode
   tooltip because white over the reading dazzles in Nocturno.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 3.1 | The sky stops with reduced motion on, and is absent in Diurno |
| 3.2 | No Veil layer sits over reading text or inside a card; contrast AA over the worst background (`STD-034`) |
| 3.3 | Scrolling while it speaks keeps the page where the reader put it; browser translation still works while it plays |

---

## 5. Escalation

A change that needs a value `STD-023` does not hold stops: the value is
proposed to `STD-023` by pull request and the piece waits. A reader-facing
change the Oracle has not seen is not merged.

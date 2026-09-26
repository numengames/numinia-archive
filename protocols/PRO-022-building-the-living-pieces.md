---
id: "PRO-022"
uid: ""
title: "Building the living pieces"
type: protocol
status: draft
version: "0.1.0"
created: "2026-09-26T18:00:00+02:00"
updated: "2026-09-26T18:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
tags: [protocol, design, motion, velo, sky, reading-aloud]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-023", "STD-008", "STD-034", "PRO-014", "BLU-011"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-022 — Building the living pieces

> **Summary:** How the three pieces of the house that move or sit over the
> reading are built: the sky, the Velo layer and the reading-aloud player.
> **Epistemic:** How each piece is put together and why. Every number it
> uses is a value of `STD-023`; none is written here.
> **Pragmatic:** Build or change one of the three pieces without breaking
> what a reader already relies on.
> **Audience:** Agents · Oracles

**Binds:** whoever builds, changes or reviews the sky, the Velo layer or the
reading-aloud player on a site of the house.
**Does not bind:** the values themselves, which are `STD-023`; the
direction, which is `CAN-008`.

---

## 1. Purpose and trigger

Three pieces are already in production and each was reached by fixing
something a reader hit. This protocol keeps how they are built in one place,
so the next change starts from what was learned. It starts when a piece of
the three is built on a new site, or changed on one that has it. An **agent**
builds; the **Oracle** approves anything that changes what a reader sees.

---

## 2. Rules

**LIV-001 — The sky is background.** The sky MUST be drawn only in Nocturno,
MUST NOT react to cursor or scroll, MUST NOT sit under long reading text,
and MUST stop, stars fixed at mid alpha, under `prefers-reduced-motion`.

**LIV-002 — The Velo adds transparency, never colour.** Every Velo layer
MUST be one of the values of `STD-023` §20, placed as §3.2 says.

**LIV-003 — The reader owns the page.** The reading-aloud player MUST NOT
take the scroll from the reader, touch the page's text nodes, or animate the
colour of text.

---

## 3. Procedure

### 3.1 The sky

1. **Draw the five tiers.** Weights, radii and colours from `STD-023` §15,
   no other colour.
2. **Animate it as it stands in production.** **175 stars**; drift of `±0.06 px` per frame with reappearance on the opposite side; **alpha breathing** between `.05` and `.85`, each star at its own rhythm (`.002–.006` per frame); reseeding on resize.
3. **Apply `LIV-001`.** Check Diurno, reduced motion and a reading page.

### 3.2 The Velo layer

**Ceilings and placement.** Grid ≤ 3 % alpha, fog ≤ 8 % — more is scenery.
Nocturno only: in Diurno the Velo does not exist, same logic as the relief.
Grid and fog are background layers, never over reading text nor inside cards
and elevated surfaces. `velo.cristal` only over a background that has grid,
fog or veiled image behind it: blurring nothing is smoke, and text over glass
is secondary minimum with AA verified against the worst background. Grid and
circuit relief do not coexist — two meshes fight `[EXTENSION — validate]`;
fog MAY settle over the relief at half its alpha.

### 3.3 Reading aloud — the dock, the ruler, the ink

Verified in production on the document pages of the archive's site, in its
player that reads a page aloud. Four patterns, each built to fix something a
reader actually hit, and each reusable wherever a piece plays through a text
or a timeline. The numbers are `STD-023` §22.

| Pattern | Value | Why |
|---|---|---|
| **The reader leads** | The page follows the voice only until the reader scrolls. From then on the voice keeps going and a *Back to the reading* control appears above the dock, its arrow pointing to where the voice is. Reaching the word again by hand re-arms the following. | A player that drags the page takes the reader's scroll away; reading ahead or going back while it speaks was a fight. The reader owns the scroll, always. One scroll per page: the page's. |
| **The dock** | Surfaces at the bottom while playing (surfacing, 10); `velo.cristal` + `velo.cristal-borde`, frame radius, the width of the text column. Play/pause · section name · time in mono · ruler · rate · close. The entry point in the page stays quiet: hairline and dim text until it plays. | It reads as part of the document's card, not a widget laid over it. Controls that follow the reader beat a toolbar left behind at the top. |
| **The ruler** | A hairline with a fine mark every ~1/90 of its width, a longer mark at each section, the heard part printed in a halftone of Verdemar (dots 2.1 px on a 4 px pitch, fading in from 35 %). Hover shows time · section and the first words of the sentence; a drop starts at the **head of that sentence**; arrows step sentence by sentence. | Not a loading bar: a 1920 print ruler — paper and press (1920), a signal you can scrub (2020), light over glass (2120). Landing mid-sentence is noise; sentences are the unit a listener thinks in. |
| **Drying ink** | What the voice has passed keeps **its own colour** and loses brightness in three steps: the last 3 words at 80 %, the 6 before at 65 %, the rest at 50 % of the ink's alpha. Painted with the CSS Custom Highlight API, one highlight per ink colour and step, never with spans. Under `prefers-contrast: more` nothing dries. | Read text recedes like ink that has set, so the eye finds the present without a highlight shouting it — and it stays ink: a link still reads as a link, a bold as a bold (a first version turned everything one grey and the page went dull; a second, keeping colour at 75 %, was too subtle to notice). It is a **state, not an animation**: the colour of text is never transitioned. No DOM is touched, so browser translation and text selection survive. |
| **The reading light** | A diffuse light in Arena (`--text`, never pure white, 14 px) with a small core of ink at its centre, drifting just above the spoken word, with a soft trail of 12 fading copies; critically damped spring (k 90), sliding along the word as it is spoken; dims to 45 % on pause. Its position is estimated by **spoken** weight (a figure weighs what it takes to say) and re-synced at the end of every sentence, the unit the engine speaks. The ruler's head is the same light. | The old amber dot hopped word to word and competed with the Ámbar that marks what shines. Arena is the page's own ink colour: the light belongs to the text; the core lets a reader with low vision follow it. Under `prefers-reduced-motion` it jumps, with no trail and no drift. |

**Touch to hear.** While the voice is on, a click on a sentence starts it there (links, buttons and a selection keep their meaning). **Speeds** step 1 · 1.25 · 1.5 · 2 · 0.75 from one button — the first step gentle, no 1.75, a slower one for learners — and the chosen speed follows the reader across documents. **The ruler's preview is dark glass**, like the dock: a recorded exception to the web recipe's rule that a tooltip takes the opposite mode, because white paper over the reading dazzles in Nocturno.

**Icons over words in document tools.** Copy, download and source are
glyphs, each with a name a screen reader says and a tooltip in the opposite
mode; the words added nothing a reader of the glyph did not already know.

---

## 4. Verification

| Step | Evidence it completed |
|---|---|
| 3.1 | The sky stops with reduced motion on, and is absent in Diurno |
| 3.2 | No Velo layer sits over reading text or inside a card; contrast AA over the worst background (`STD-034`) |
| 3.3 | Scrolling while it speaks keeps the page where the reader put it; browser translation still works while it plays |

---

## 5. Escalation

A change that needs a value `STD-023` does not hold stops: the value is
proposed to `STD-023` by pull request and the piece waits. A reader-facing
change the Oracle has not seen is not merged.

---
id: "PRO-022"
uid: ""
title: "Building the reading-aloud player"
type: procedure
status: active
version: "1.0.0"
created: "2026-09-26T18:00:00+02:00"
updated: "2026-10-25T12:05:00Z"
author: "ursa"
owner: "oracle"
section: "Technology"
tags: [procedure, design, motion, velo, reading-aloud]
license: "CC0-1.0"
applies_to: [all-agents]
related: ["STD-023", "STD-008", "STD-034", "PRO-014", "PRO-041", "DES-011"]
derived_from: "PRI-008"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-022 — Building the reading-aloud player

> **Summary:** How the reading-aloud player of the house is built: the dock,
> the ruler and the ink that dries as the voice passes.
> **Epistemic:** How is the reading player built, taking every number from
> the design values?
> **Pragmatic:** Build or change the player without breaking what a reader
> already relies on.
> **Audience:** Agents · Oracles

**Binds:** whoever builds, changes or reviews the reading-aloud player on a
site of the house.

---

## 1. Purpose and trigger

The player is already in production and was reached by fixing something a
reader hit. This procedure keeps how it is built in one place, so the next
change starts from what was learned. It starts when the player is built on a
new site, or changed on one that has it. An **agent** builds; the **Oracle**
approves anything that changes what a reader sees.

---

## 2. Preconditions

The values the player uses are in `STD-023`: the reading player's numbers in
§22. A value that is not there is proposed there first.

---

## 3. Procedure

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
| 1–7 | Scrolling while it speaks keeps the page where the reader put it; browser translation still works while it plays |

---

## 5. Escalation

A change that needs a value `STD-023` does not hold stops: the value is
proposed to `STD-023` by pull request and the piece waits. A reader-facing
change the Oracle has not seen is not merged.

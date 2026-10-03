---
id: "BLU-010"
uid: ""
title: "The pixel register"
type: blueprint
status: active
version: "1.1.3"
created: "2026-09-09T11:00:00+02:00"
updated: "2026-10-03T21:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "Brand and marketing"
tags: [blueprint, design, recipes]
license: "CC0-1.0"
related_missions: ["MIS-0146"]
related: ["STD-008", "STD-023", "PRI-008"]
extraction_note: "Extracted verbatim from STD-008 v6.1.0 (old §2.7.2–2.7.3, 3.5, 4.1, 8.6, 9.4, 11) under ADR-043 and ADR-044: recipes leave the standard; the standard keeps the rules, the register keeps the values. Sections 7–8 came from PRO-014 v1.1.0 (then its sections 6.9 and 6.10) on 2026-09-09."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# BLU-010 — The pixel register

> **Summary:** How a pixel piece is built: dithering and palette cycling over the Píxel-16 index, Pixelify in scene, the integer grid, the register's components, sprite animation and the working grammar from silhouette to depth.
> **Epistemic:** The recipes the old standard carried for the pixel register; the index and the grids are `STD-023`, the register's direction is `PRI-008`.
> **Pragmatic:** Drawing or reviewing a sprite, a scene, a HUD or a dialogue box.
> **Audience:** Agents · Oracles

> **A blueprint is a design not yet executed.** This one is: every recipe here is in production. It stays a blueprint because a recipe is how, not whether — the rules are `STD-008`, the values `STD-023`.

## 1. Clusters, dithering, transitions and palette cycling

- Volume is built first with flat areas. Dithering does NOT substitute for a badly chosen ramp.
- Only the checkerboard of **two adjacent colors from the same ramp** is allowed, as §11 already fixes. It is used for material transition, fog or a wide surface; never to "create" a new brand color.
- The outer outline, typography, eyes, inventory icons and objects that must be found fast are NOT dithered.
- The checkerboard keeps a stable pattern. Changing the pattern without reason produces noise and flicker when animating.
- Visible color bands are valid and preferable to a smoothed gradient. No *blur*, antialias or intermediate transparency is applied to hide them.

#### Palette cycling
Index rotation or substitution — the classic resource for water, light and signals — MAY be used as an optimization, but **it does not create a tenth animation**. It only implements an already-authorized animation: signal sweep (§9.1-03), progress phase (§9.1-06) or legendary pulse (§9.1-05). It keeps geometry and contrast, respects `prefers-reduced-motion` and does not alter reading-text color.

## 2. Pixel typography

In the pixel register, the display and dialogue voice is **Pixelify Sans** (Stefie Justprince, SIL OFL 1.1, Google Fonts) — proportional and with a friendly lowercase, the closest freely-licensed thing to the spirit of SCUMM dialogues. The original fonts of Monkey Island, DOTT and La Abadía are **proprietary**: they are cited as heritage, neither used nor imitated pixel by pixel.

Rules: self-hosted (`PixelifySans-Variable.woff2`, 22 KB, with its OFL in `/assets/fonts/`); sizes in **exact multiples** of its grid (22, 33, 44 px…), no subpixel; only for dialogue, scene headlines and HUD — **long body remains Geist** even inside the register; dialogue text carries a 1 px Noche outline over active scenes and colors by speaker (§2.7); never in level III nor in printed Diurno.

#### Text composition in scene
- Pixelify Sans renders without fake bold, fake italic, smoothed outline or CSS transforms. Weight is chosen in the font; it is not simulated.
- Dialogue is presented over a solid `nocturno.fondo-superficie` or `fondo-elevada` surface, with a Noche border when the scene remains visible. If it overlays the image directly, the canonical veil is applied before the text.
- The speaker's name uses Pixelify and the approved color; short body MAY use Pixelify. Explanations, help, accessibility and long text switch to Geist to preserve legibility.
- Lines MUST NOT be forced with spaces. Breaks are decided by unit of meaning and tested at the interface's minimum width.
- The block cursor accompanies the typing and retires when finished. It is not left blinking next to already-finished text.
- Text is composed on integer coordinates. Scale, `line-height`, translation and box MUST NOT produce half-pixel positions.

## 3. The internal grid

The web grid organizes the page; the pixel grid organizes the content inside the scene. They do not mix.

- Position, scale, crop and origin of every sprite use integer numbers. `translate`, camera zoom and displacement that generate subpixels are forbidden.
- When the viewport does not admit an integer scale, the scene reduces to the lower multiple and fills the remaining space with Noche. It does not stretch to fill.
- Filtering is `nearest-neighbor`; on web, `image-rendering: pixelated`. Smoothing and mipmaps are disabled wherever the engine could alter the pixel at game scale.
- All frames of an animation share cell, origin and occupancy box. The pose change happens inside the cell, not by accidentally moving the canvas.
- The HUD and the dialogue box MAY belong to the pixel register; navigation, forms, extended help and product controls follow the System's vector system. The boundary between both registers MUST be visible.
- Testing happens in three views: ×1 for decision, one integer presentation scale and the minimum supported viewport. If it fails at ×1, it is not fixed by enlarging.

---

## 4. Components inside a scene

These components live **inside a pixel scene or experience**. They do not replace the corporate components of §8.1–9.5.

| Component | Construction | Usage rule |
|---|---|---|
| **Dialogue box** | Basalto or dark Bronce surface, 1 px Noche border, Pixelify text, speaker in an approved color | one voice per block; full reading available before or after the typing |
| **Portrait** | `24×24` grid or `48×48` module, clear silhouette, same light direction as the scene | accompanies a conversation; does not replace the speaker's name |
| **Inventory slot** | `12×12` object, straight `linea-fuerte` frame, name visible on focus or selection | selected state = Turquesa border + label; not just a color change |
| **Brief HUD** | `12×12` icon, flat background; numbers in **Geist Mono if the datum persists** (counters, time, resources) and in **Pixelify if diegetic** (floating damage, loot, the world's voice) | only state needed during the action; nothing ornamental; the two voices do not mix in the same indicator |
| **Achievement / badge** | `12×12` or `24×24` grid, rarity written and treated per §2.6 | the legendary halo remains the only glow |

The system's focus (`2 px` Turquesa, offset `2 px`) remains vectorial and visible even around a pixel component. Accessibility takes precedence over historical fidelity.

## 5. Sprite animation

A sprite's internal animation is pixel-register content, not a tenth interface animation. It is limited to narrative or game actions and does NOT authorize movement of layout, buttons or surfaces.

- **Two frames:** alternation of gesture, spark, indicator or minimal movement. The extremes must be distinct and legible.
- **Four frames:** walk cycle or simple action. Recommended order for locomotion: contact · step · opposite contact · opposite step.
- **Cadence:** use existing durations: `120 ms` per frame for fast actions, `200 ms` for locomotion and gestures, `320 ms` for deliberate reveals. No duration is invented per sprite.
- **Key pose first:** the poses with the most reading are drawn before the in-betweens. If a cycle is not understood from its key poses, adding frames does not fix it.
- **No interpolation:** there is no *tweening*, motion blur, smoothed rotation or subpixel displacement. Movement happens in whole jumps and the poses carry the sensation of weight.
- **Stable volume:** head, torso and main mass keep their size. The contour only changes when the action demands it; involuntary trembling invalidates the cycle.
- **Loops with cause:** walking while the character walks, machine while it operates, signal while it communicates. A still character does not need to breathe eternally; stillness is also a decision.
- **Reduced motion:** the most informative pose is shown, functional states complete instantly and decorative cycles stop.

The palette cycling of §2.7.3 and sprite cycles cannot compete in the same focal zone: a single orchestrated moment per piece remains the rule.

---

## 6. Working grammar


The register is decided in `PRI-008` §3.3. This is how a pixel piece is built.

### Visual grammar · legibility before detail
The 90s reference is not reproduced as a nostalgic filter: its discipline is adopted. The artist works with few pixels, few colors and visible decisions. Every pixel MUST belong to a shape, a light, a material or an action; noise that does not communicate is removed.

- **Silhouette first.** Characters, interactive objects and emblems MUST be recognizable as a single-color mass at native scale. If two elements serve different functions, their silhouettes MUST NOT depend on the palette to be told apart. The test is done over Noche and Basalto **and, if the figure is dark, over Ceniza** [learned by producing]: a Noche silhouette disappears over its own color.
- **Reading by masses.** Every main figure is organized into shadow, body and light before adding detail. Accents come last. Detail that breaks the reading at real size is removed even if it looks attractive magnified.
- **Cluster, not confetti.** Pixels group into continuous clusters. An isolated pixel may only exist as a specular highlight, star, functional particle or an indispensable facial feature; never as indiscriminate texture.
- **Deliberate steps.** Diagonals and curves keep a regular pixel rhythm. Accidental jaggies, double outlines and arbitrary thickness changes are corrected at ×1 scale.
- **Selective outline.** Noche (`#14110F`) separates the silhouette from the active background; inside the figure, divisions are resolved with shadows from the ramp itself. A uniform black outline around everything flattens the volume and SHOULD NOT be used except in very small sprites.
- **Single light.** The main source comes from top-left, as the register already fixes. Every plane, cast shadow, metallic highlight and material change MUST obey it. There is no *pillow shading* — centered light wrapping the shape — and no reflections without a source.
- **Character through proportion.** Head, torso, tools and gesture are exaggerated only to improve reading; not to imitate a specific franchise. The narrative economy of the graphic adventure is inherited, not its proprietary designs.

Depth is built with **overlap, scale, contrast and detail density**; not with blur. The background uses more neutrals, less internal contrast and larger clusters. The foreground MAY have darker edges and greater detail, but MUST NOT cover necessary actions.

1. **Background:** establishes place and climate; avoids accents except one narrative signal.
2. **Play plane:** concentrates characters, interactive objects and routes. It is the zone with the greatest silhouette clarity.
3. **Foreground:** frames or gives depth; never competes with the objective.
4. **Focus:** a single dominant point per scene. Ámbar signals value or discovery; Turquesa, interaction; Coral, real time.

An interactive object MUST be locatable through at least two channels: silhouette + position, name + symbol, or contrast + focus response. Never color alone.

### Visual matrix · how yes / how no
| How yes | How no |
|---|---|
| Draw the silhouette and test it over Noche and Basalto | Add texture before resolving the shape |
| Share colors between materials to cohere the scene | Create a new ramp for every object |
| Reserve loose pixels for highlights or functional particles | Sprinkle noise so it "looks retro" |
| Exaggerate gesture, tool or direction to read at ×1 | Trust details only visible magnified |
| Keep the same origin and volume across frames | Let the character tremble through outline changes |
| Use nostalgia as production grammar | Copy proprietary compositions, characters or interfaces |

## 7. Production pipeline of a scene

*The blueprint in one line:* Nocturno, level II; Píxel-16 index with neutral dominance ≥60 %; sprites on 24/12/48 grids with Noche outline; Pixelify at multiples; dialogue typed and colored by speaker; integer scaling with `pixelated`; the register is entered and left completely.

1. **Declare function and level.** Write what the person must understand, discover or do; confirm that level II is justified.
2. **Choose the grid.** Assign `12×12`, `24×24` and `48×48` modules before drawing. Inventory assets and states.
3. **Mass thumbnail.** Compose background, play plane, foreground and focus with neutrals only. Verify the 40/40/20 dose by squinting.
4. **Silhouettes.** Resolve characters and interactive objects in one color. Test direction, pose and hierarchy at ×1.
5. **Values and light.** Add shadow, body and light from top-left; lock cast shadows before the details.
6. **Assign ramps.** Choose ramps from `STD-023` §6, keep neutrals ≥60 % and reserve accents for function or story.
7. **Build clusters.** Clean isolated pixels, regularize diagonals, apply selective outline and use dithering only where `BLU-010` §1 allows it.
8. **Add interface and text.** Integrate `BLU-010` §4 components, AA contrast, visible focus and a reduced-motion alternative.
9. **Animate from key poses.** Select 2–4 frames and a `BLU-010` §5 cadence. Test the cycle at ×1 without smoothing.
10. **Export and validate.** Export the master as indexed PNG; sprite sheets with uniform cells; check palette, transparency, integer scale, weight, names and absence of colors outside Píxel-16.

## 8. Minimum deliverables

| Deliverable | Must contain |
|---|---|
| **Editable master** | indexed mode, ordered Píxel-16 palette, named layers or groups, labelled frames |
| **Individual PNG** | native dimensions, binary transparency, no smoothing or rescaling |
| **Sprite sheet** | uniform cells, same origin, documented sequence, no accidental margin between frames |
| **Asset sheet** | function, grid, states, ramp, duration, anchor point, alt text if applicable |
| **QA capture** | ×1 view and integer scale, real background, focus state and reduced-motion variant |

**Exit criterion:** the asset is approved first at ×1. Magnification only demonstrates; it never rescues.

## Check

After the general checklist in step 6 of `PRO-014`, and before delivering:

- [ ] Píxel-16 only, neutrals ≥60 %, Grana without dialogue, 12/24/48 grid, integer scaling with `pixelated`, Noche outline, Pixelify at multiples, the canonical scarab sprite; full register entry and exit; never in level III.
- [ ] Produced at ×1: legible silhouette, continuous clusters, regular diagonals, no *pillow shading*, top-left light, 2–4 colours per material, dithering only between adjacent colours, no decorative loose pixels.
- [ ] Sprites: stable cells and anchors, 2–4 frames, 120/200/320 ms, no interpolation or subpixel; reduced motion shows the most informative pose.
- [ ] Export: indexed PNG, binary transparency, palette verified, uniform sprite sheet, ×1 test + integer scale + minimum viewport.
- [ ] The five deliverables of §8, approved first at ×1.

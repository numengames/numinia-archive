---
id: "STD-023"
uid: ""
title: "Design values"
type: documentation
subtype: register
status: draft
version: "1.4.0"
created: "2026-09-09T11:00:00+02:00"
updated: "2026-09-24T14:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
tags: [design, register, tokens, palette, typography, motion]
license: "CC0-1.0"
related: ["STD-008", "CAN-008", "ADR-044"]
series_change: "1.4.0 — 2026-09-24: the reading light enters the catalogue as animation 15, the second sanctioned loop (the Oracle); drying ink deepened to 80/65/50 %. 1.3.1 — 2026-09-24: §22 revised in production — drying ink keeps each colour; the reading light re-syncs per sentence by spoken weight; touch to hear; the speed scale; the dark preview recorded as an exception to BLU-009 §8. 1.3.0 — 2026-09-24: §22 Reading aloud — the dock, the ruler, the drying ink and the reading light, carried from the Listen player in production; the reading light filed as catalogue candidate 15. 1.1.0 — 2026-09-17: §18 The house footer and §19 The share card added — the values DSN-013 and DSN-014 point at: the footer's elements, the card's pattern, and the one table of the four sites (name, line, domain) that footer, head and card all read. Minor with STD-008 7.1.0. 1.0.3 — 2026-09-10: status `active` → `draft` under the alpha reset the Oracle ordered on 2026-09-10: the state had been set by agents, not signed one by one. Text unchanged; the state returns to `draft` until the tree meets the standard and the Oracle ratifies it one by one. Patch move (VER-064). 1.0.0 — new register, split from STD-008 under ADR-043 and ADR-044: every closed list the old standard held — palette, neutrals, text variants, rarity, Píxel-16, ramps, data palette, type scale, space and grid, icon weights and subset, brand inventory, brandmark path, the animation catalogue, the sky, pixel grids and the external references. Values unchanged; tables moved verbatim (old §2.1–2.3, 2.6–2.8, 3.3, 4, 6.1, 6.3, 7.1, 7.4, 9.1, 10.1, 11.2, 17)."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Design values

> **Summary:** Every closed list of the design system, as values: colours
> and contrasts, type and space scales, icon subset, brand inventory,
> animations, sky and pixel grids. `machine/packages/design-kit/` carries the same
> values as tokens; where they differ, the generator fails.
> **Epistemic:** What the values are. Why they are what they are is
> `CAN-008`; what a builder must do with them is `STD-008`.
> **Pragmatic:** Look a value up here or in the tokens file; never in a
> piece.
> **Audience:** Agents · Oracles

## 1. Palette

| Hex | Name | Thread | Role |
|---|---|---|---|
| `#A6DAD5` | **Verdemar** | Solar | Confirmation, calm, surface tints |
| `#018EA1` | **Turquesa** | Cyber | Interaction: links, focus, accents (the action fill is its shadow `#017C8D`, the button recipe in `BLU-009`) |
| `#EFA517` | **Ámbar** | Solar | Emphasis, value, achievement; the scarab's sun |
| `#F9EBDC` | **Arena** | Solar | Main neutral |
| `#F35059` | **Coral** | Cyber | Warning, real time; flash, never ambience |
| `#D33440` | **Grana** | — | Critical, gravity |

## 2. Neutrals

**Nocturno** (screen, default): background `#14110F` Noche · surface `#1E1A17` Basalto · elevated `#292420` dark Bronce · lines `#241F1B` / `#3A332D` · text `#F9EBDC` (16.1:1) / `#C4B5A6` (9.6:1) / `#8A7D72` Ceniza (4.7:1).
**Diurno** (print, long document): paper `#F9EBDC` · surface `#FDF6EE` · line `#E2D3C2` · ink `#14110F` (15.8:1) / `#4A423B` (8.6:1) / `#6E6259` (5.1:1).

**Tertiary rule [learned by auditing]:** the contrasts in this table are against the **base background**. The Nocturno tertiary drops to 4.3:1 over surface and 3.8:1 over elevated: **inside surfaces, the minimum is the secondary**; the tertiary lives only over the base background.

**Diurno semantic tints** [DERIVED — canonical formula: 12 % of the accent over paper]: confirmation `#EFE9DB` · warning `#F8D8CC` · critical `#F4D5C9` · interactive `#DBE0D5` — all with ink ≥13.6:1 on top. For status bands in documents and light product. They replace the old tint `#E4F2F0`, retired as an orphan and as the Diurno's only cold-clinical note.

## 3. Text variants over light

The canonicals are *mood* colors; over Arena, as text, the variant is used: Turquesa→`#016E7D` (5.1:1) · Grana→`#B02330` (5.8:1) · Ámbar→`#7A5100` (6.0:1) · **Verdemar→`#1F6B5F` (5.4:1)** — success can finally be written over light. **Coral has no variant and that is a decision, not an oversight:** a coral-text would be a perceptual twin of grana-text and would break the warning/critical separation. The warning over light is composed by rule: a Coral fill chip with Noche ink, or icon + text in ink.

## 4. Rarity scale

Categorical layer for game and product (objects, rewards, Navigation Charts, digital assets). An MMO convention any player recognizes without a manual, tuned to this palette and verified:

| Rarity | Nocturno | vs Noche | Text in Diurno | vs Arena | Coherence |
|---|---|---|---|---|---|
| **Poor** | `#F9EBDC` | 16.1 | `#6E6259` | 5.1 | = Arena: the poor is the paper |
| **Common** | `#8A7D72` | 4.7 | `#5A4F45` | 6.8 | = Ceniza, the existing neutral |
| **Uncommon** | `#8FC46B` | 9.2 | `#356C19` | 5.4 | Warm green, Verdemar's sibling |
| **Rare** | `#5D9BD6` | 6.4 | `#2E6BB0` | 4.7 | Tempered blue, distinct from the interactive Turquesa |
| **Epic** | `#A98BE0` | 6.7 | `#6B44B8` | 5.7 | Purple softened to the warm world |
| **Legendary** | `#EFA517` | 9.0 | `#7A5100` | 6.0 | **= Ámbar**: the legendary and the achievement are the same sun |

**Why color never goes alone, with first and last name:** under protanopia and deuteranopia, epic and rare collapse — the purple loses its red and lands one step from the blue (verified by simulation). The progressive border and the written name are not courtesy: they are the channel that keeps working when color fails.

Rules: full scale and in order, no invented steps. **Progressive treatment beyond color**: poor/common border `linea.tenue`; uncommon/rare border of its color at 40 %; epic full border; legendary full border + halo `0 0 12px rgba(239,165,23,.25)` — **the system's only glow**. Name written in `type.etiqueta` the first time per view. It lives in product and game; NEVER in corporate communication: a price is not epic and a deadline is not legendary.

## 5. Píxel-16 palette

Sixteen colors, **zero new hexes**: seven neutrals, the six brand colors and three already-defined shadows, plus the rarity green. Every sprite and every pixel scene must limit itself to this index.

| Nº | Hex | Name | Origin | Role in pixel |
|---|---|---|---|---|
| 01 | `#14110F` | Noche | nocturno.fondo-base | Background, sprite outline |
| 02 | `#1E1A17` | Basalto | nocturno.superficie | Deep shadow |
| 03 | `#292420` | Dark Bronce | nocturno.elevada | Shadow |
| 04 | `#3A332D` | Bronce | nocturno.linea-fuerte | Mid shadow, metal |
| 05 | `#8A7D72` | Ceniza | nocturno.terciario | Working grey |
| 06 | `#C4B5A6` | Veiled Arena | nocturno.secundario | Mid light |
| 07 | `#F9EBDC` | Arena | brand | Light, highlight, base sprite |
| 08 | `#A6DAD5` | Verdemar | brand | Solar accent |
| 09 | `#018EA1` | Turquesa | brand | Cyber accent |
| 10 | `#016E7D` | Deep Turquesa | text-over-light | Shadow of 09 |
| 11 | `#EFA517` | Ámbar | brand | Gold, achievement, sun |
| 12 | `#7A5100` | Toasted Ámbar | text-over-light | Shadow of 11 |
| 13 | `#F35059` | Coral | brand | Living signal |
| 14 | `#D33440` | Grana | brand | Deep red — **fill only** |
| 15 | `#B02330` | Deep Grana | text-over-light | Shadow of 14 |
| 16 | `#8FC46B` | Verde | rareza.poco-comun | Nature, the solarpunk garden |

**Dominance:** ≥ 60 % of the surface in neutrals 01–07. **Dialogue subset** (pixel text over Noche, ≥ 4.5:1 verified): Arena 16.1 · Verdemar 12.2 · Veiled Arena 9.4 · Verde 9.2 · Ámbar 9.0 · Coral 5.5 · Turquesa 4.8 · Ceniza 4.7. **Grana stays out of dialogue** (3.9:1): fill yes, text never.

## 6. Functional ramps

The palette is single, but work happens through **shared ramps**. A ramp adds no colors: it orders the existing ones so that different materials appear to belong to the same world.

| Ramp | Available colors | Main use |
|---|---|---|
| **Mechanical neutral** | Noche · Basalto · dark Bronce · Bronce · Ceniza · veiled Arena · Arena | structure, stone, metal, clothing, general volume |
| **Solar** | Toasted Ámbar · Ámbar · Arena | sun, reward, lit brass, point of value |
| **Cold signal** | Deep Turquesa · Turquesa · Verdemar | interaction, energy, glass, technology in the service of life |
| **Warm signal** | Deep Grana · Grana · Coral | damage, alarm and real time; Coral and Grana still do not coexist in one composition |
| **Garden** | Verde · Verdemar · Arena | vegetation and living matter |

Each material should resolve with **2–4 colors** from one or two ramps. Sharing a shadow or a light between materials coheres the scene and preserves the limited character of 90s graphics.

## 7. Data palette

Intelligence reports are product: charts have canonical color. Like the ramps, this palette **adds no hexes: it orders the existing ones**.

| Series | Categorical order | Verification over Noche (graphic object ≥3:1) |
|---|---|---|
| 1–6 | **Turquesa → Ámbar → Verdemar → Grana → Verde → Ceniza** | 4.8 · 9.0 · 12.2 · 3.9 · 9.2 · 4.7 ✓ |

**Sequential** (magnitude): Noche → Deep Turquesa → Turquesa → Verdemar → Arena. **Divergent** (two poles): Grana ↔ Ceniza ↔ Turquesa. Rules: maximum **6 series** per chart (more series = another chart); every series with a direct label or legend, never color alone; in Diurno, series use their text variants where they exist and lines thicken to 2 px; rarity never colors data — a datum is not epic.

---

## 8. Type scale

Scale 1.200, base 16 px; pt for the 1920×1080 canvas: `display.xl` 4.300rem/50pt · `display.l` 3.583/42 · `display.m` 2.986/34 · `titulo.l` 2.488/28 · `titulo.m` 2.074/24 · `titulo.s` 1.728/20 · `cuerpo.l` 1.440/17 · `cuerpo.m` 1/14 · `cuerpo.s` 0.875/12 · `etiqueta` 0.750/11 (Mono 500, small caps, tracking `+0.10em`) · `dato.xl` 2.986 Mono 500 · `dato.m` 1 Mono 400. Display weights 500, titles 600; display tracking `-0.03/-0.02em`.

## 9. Space, grid, shape, elevation, focus


**Spacing** base 4 px: `4·8·12·16·24·32·48·64·96·128` (`space.100–1000`); every gap must be from the scale.
**Grids**: web ≤1280 / 12 col / margin 64 / gutter 24; tablet 8/40/24; mobile 4/20/16; slide 1920×1080 / 12 / 120 / 32; A4 12 / 20 mm / 5 mm. Baseline 8 (4 mm printed). Rhythm: sections `s900` web · `s800` deck; blocks `s700`; headline→body `s400`; card `s500`.
**Shape [CANON — direction decision, 4.0.0]**: two radii and nothing more — **control `6px`** (buttons, fields, chips, toggles) and **frame `8px`** (cards, panels, dialogs, canvases, status bands). Warm without fashion: the frame rounds a little; the content inside inherits no radius of its own. Circle only in markers, avatars and stickers; the pill is a capsule. **The pixel register keeps its straight edges** (the pixel does not curve) and printed tables too. Borders 1 px.
**Elevation**: in Nocturno no shadows — surface step + hairline (`base→superficie→elevada`); sole exception the legendary halo. In Diurno a single shadow `0 1px 2px rgba(20,17,15,.08), 0 8px 24px rgba(20,17,15,.06)`.
**Focus**: `outline: 2px solid #018EA1; offset 2px`, always visible, never animated. Non-negotiable.

## 10. Icon weights


`regular` **by default** (16–40 px) · `fill` active or reached state · `bold` at < 16 px · `light` illustrative at ≥ 48 px · **`thin` forbidden** (it disappears over Noche) · **`duotone` forbidden** (it breaks the flat discipline).

## 11. The icon subset


**The house subset [CANON — audited in production, 5.0.0].** Of Phosphor's ~1,500 glyphs, the organization uses **twenty-six**, self-hosted in `machine/packages/ui/src/icons/` and served as inline SVG with `currentColor`. This is the vocabulary, not a sample of someone else's catalogue: `archive · bell · book-open · caret-down · caret-left · chart-bar · download-simple · flame · flame-light · gear · github-logo · globe-hemisphere-west · globe-hemisphere-west-light · house · magnifying-glass · moon · moon-stars · music-notes · package · sign-out · sun · sword · sword-light · user · users · x-logo`. Expanding it is a decision, not an oversight: a new icon enters the subset with its concept declared. **Entered in 1.3.0** (the reading player, §22): `play-fill` and `pause-fill` — the voice runs or rests (fill: an active state); `arrow-down-bold` — where the reading is, at 11 px (bold under 16 px). `x` (close) and `copy` were already served by the site and are named here for completeness.

## 12. Brand inventory

All normalized to `fill="currentColor"`, in `/assets/`.

| File | What it is | viewBox | Canonical use |
|---|---|---|---|
| `Khepri_Logo.svg` | Brandmark: the scarab | 75.44×75.53 | Closing, favicon, avatar, seal |
| `Khepri_NG_Logo.svg` | Brandmark + NG | 75.44×75.53 | Compact with attribution |
| `NG_Logo.svg` | Monogram | 113.37×50.29 | < 120 px wide |
| `Numen_Games_Horizontal_Word.svg` | Horizontal wordmark | 382.79×28.09 | **Main signature** |
| `Numen_Games_Vertical_Word.svg` | Stacked wordmark | 180.74×73.25 | Square/vertical formats |
| `Numen_Word.svg` | «numen» | 180.74×28.09 | When «games» is evident |
| `Numinia_Word.svg` | The world | 194.25×28.01 | **Only** Numinia pieces |
| `pixel/khepri-sprite-24.png` | Canonical scarab sprite | 24×24 px | Pixel register; the brand's only pixel translation |
| `pixel/moneda-12.png` | Ámbar coin (corrected to the Solar ramp) | 12×12 px | The register's example object; tokens, rewards |
| `pixel/moneda-giro-12x4.png` | The coin's turn sheet | 48×12 px · 4 frames | Canonical reference cycle: 200 ms · steps(4) · stable volume |
| `pixel/cartografo-24.png` | The Cartographer | 24×24 px | Reference character of the `BLU-010` production pipeline; status [EXTENSION — validate] |
| `pixel/guia/` | Didactic how-yes / how-no pairs | 16×16 px ×1 and ×8 | Production-guide material; not game assets |
| `fonts/PixelifySans-Variable.woff2` | Pixel typeface | variable 400–700 | Dialogue and display of the pixel register |
| `marca/glifo-space.svg` | *Space* glyph (the wordmark's n) | 31×29 | Brand play (`CAN-008`, the glyphs): the space, the territory |
| `marca/glifo-people.svg` | *People* glyph (n + dot) | 31×39 | Brand play (`CAN-008`, the glyphs): the person |
| `marca/glifo-connect.svg` | *Connect* glyph (the final ɑ) | 29×29 | Brand play (`CAN-008`, the glyphs): the connection |

Selection: horizontal by default → vertical in square → NG under 120 px → brandmark for closing/avatar. `Numinia_Word` never signs corporate communication.

## 13. Canonical brandmark


```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.44 75.53" fill="currentColor">
<path d="M75.44,48.41v-6.01c0-7.43-2.44-12.51-6.61-15.5,3.83-2.74,6.21-7.23,6.58-13.69h0V0h-15.86v7.92h8.44v5.29h-.01c-.58,7.07-4.65,10.37-11.02,10.37h0s-.79,0-.79,0c-.91-11.22-8.07-16.29-18.43-16.29s-17.51,5.07-18.43,16.29h-.8c-6.37,0-10.44-3.3-11.02-10.37h-.01v-5.29h8.44V0H.03v13.22h0c.37,6.46,2.75,10.96,6.58,13.69-4.17,2.99-6.61,8.06-6.61,15.5v6.01h7.43v-6.01c0-8.32,4.21-12.17,11.1-12.17h0s.66,0,.66,0v13.83c0,2.48.28,4.7.79,6.67h-1.51C7.91,50.73.68,56.02,0,67.71h0v7.81h23.14v-7.8H7.45c.58-7.07,4.65-10.37,11.02-10.37h4.91c3.26,3.74,8.24,5.51,14.34,5.51s11.09-1.77,14.34-5.51h4.91c6.37,0,10.44,3.3,11.02,10.37h-15.7v7.8h23.14v-7.81h0c-.68-11.7-7.9-16.98-18.46-16.98h-1.51c.52-1.97.79-4.19.79-6.67v-13.83h.66c6.89,0,11.1,3.85,11.1,12.17v6.01h7.43ZM37.72,13.91c6.21,0,10.22,3.13,10.97,9.83-4.62.66-8.39,2.55-10.94,5.81-2.56-3.28-6.35-5.16-10.99-5.82.74-6.69,4.76-9.82,10.97-9.82ZM26.62,44.07v-13.54c4.67,1.22,7.41,5.02,7.41,11.73v13.55c-4.67-1.22-7.41-5.02-7.41-11.73ZM48.82,44.07c0,6.68-2.72,10.48-7.35,11.72v-13.53c0-6.68,2.72-10.48,7.35-11.71v10.73h0v2.79Z"/>
<path d="M46.18,7.36c-.57-4.16-4.14-7.36-8.46-7.36s-7.89,3.2-8.46,7.36c2.55-.77,5.39-1.15,8.46-1.15s5.91.38,8.46,1.15Z"/>
</svg>
```

## 14. The animation catalogue — fifteen, and no more


| # | Animation | Specification | Where yes | Where no |
|---|---|---|---|---|
| **01** | **Typing** — the flagship [CANON]: text letter by letter with a block cursor, heritage of graphic adventures and 90s terminals | `22 ms/character`, linear; block cursor in Ámbar | Hero headlines, lore revelations (level II), product loads | Long body, functional interface, level III, print |
| 02 | Reveal on approach | `320 ms` · ciclo; opacity + 8 px rise, on entering the viewport, once | Content upon being discovered | Controls; re-firing on scroll |
| 03 | Signal sweep | `8 s` linear infinite; Turquesa band traversing the binary | **Maximum one per view** — the ambient cyber dose | Several at once; over reading text |
| 04 | Elevation | `120 ms` · ciclo; climbs one surface step, **no displacement** | Surface hover | Any position movement |
| 05 | Legendary pulse | `2.4 s` ease-in-out **× 2**; the halo breathes | Only the moment of obtaining; afterwards, static halo | Ambient loop; other elements |
| 06 | Lunar phase | **Loading [cadence corrected in 5.0.0]**: full cycle of the **eight phases** — quarters included — at `1,400 ms`/phase with fade ≤ `240 ms` (one turn ≈ 11.2 s). At 900 ms the quarters could not be read: **a phase that gives no time to be recognized is not a phase**. The shape is computed — fixed limb + elliptical terminator —, not swapped drawings: that way the moon truly grows. **Real progress and reading**: only waxing phases, from new to full — finishing is a full moon | Long loads, real sequence progress, reading progress of a long document (this very guide demonstrates it) | Waits < 2 s; full cycle on progress (waning while advancing confuses) |
| 07 | Waiting dots | `900 ms` · steps(3); `Cargando···` | Loading buttons | Running text |
| 08 | Block cursor | `1 s` · steps(2) | Accompanying the typing or an active field | Loose, decorative |
| 09 | Orchestrated moment | Headline typing + reveals staggered at `80 ms` | The piece's entrance — one per piece | Repeated; on every section |
| **10** | **Surfacing** — knowledge comes out of the fog [5.0.0] | `560 ms` · ciclo; opacity 0→1 + `blur(8px)→0` + 8 px rise; on entering the viewport, once | Velo register: archive, Summa, sheets upon opening, revelations | Functional interface; long lists (reveal 02 suffices); Diurno; corporate Umbral |
| **11** | **Crystallization** — the glass materializes [5.0.0] | `320 ms` · ciclo; `backdrop-blur 0→12px` + border 0→50 % + opacity | Velo panels and modals (`BLU-009`) | Outside the Velo; over backgrounds without atmosphere |
| **12** | **Page turn** — **RETIRED in 5.1.0 (H5)** | 5.0.0 registered it "to be verified against the LAP"; verification came back empty: the codex does not animate the page turn — the only living thing in that view is the Trazo (13). The number is not reused (append-only catalogue); if someday the paper turns pages with animation, it will enter as a new piece with its own specs | — | — |
| **13** | **Trazo** — the corners draw themselves [5.0.0 · in production] | `1.6 s` · ease · `stroke-dashoffset: 340 → 0`; four engraving frames staggered at `120 ms` | Book cover and chapter opening (`BLU-011`, the living paper) — it **is** that view's orchestrated moment | Interface; re-firing on scroll; alongside another orchestrated moment |
| **14** | **Sky** — the Velo's background breathes [5.0.0 · in production] | Drift of `±0.06 px`/frame with reappearance on the opposite side + alpha oscillating between `.05` and `.85` at its own rhythm (`.002–.006`) | Background of the Velo register (the sky, below) — **a sanctioned exception** to the ambient-loop veto | Over long reading; with parallax; reacting to cursor or scroll |
| **15** | **Reading light** — a light follows the voice [1.4.0 · in production] | A diffuse Arena halo (14 px, a small ink core, never pure white) just above the spoken word, a trail of 12 fading copies; critically damped spring (k 90); gliding along the word at the voice's pace, resting where it rests; 45 % on pause | Following a voice or any playback through a text (the reading player, §22) — **the second sanctioned loop**: it lives only while the voice plays and moves only because the voice moves | Ambient; decoration; without a voice or playback behind it; with `prefers-reduced-motion` (it jumps: no trail, no spring, no bob) |

The first three 5.0.0 pieces (10–12) are **transitions, not loops** and **invent no durations**: they reuse `duration.largo` (560) and `duration.medio` (320). The **trazo** (13) arrives measured from production with its own `1.6 s` — it is the catalogue's only new duration, and it is justified because drawing four corners faster turns them into a blink. The **sky** (14) is a sanctioned exception to the ambient-loop veto (DSN-012): it is authorized because it is the **register's background**, not a view's ornament — and that is why it reacts to nothing. The **reading light** (15) is the other one, for the opposite reason: it is not ambient at all — it lives only while a voice plays, and it moves only because the voice does. The codex's **reading moon** is not a new animation: it is the lunar phase (06) demonstrated in production. 10–12 belong to the Velo register and the living paper; the 01–09 catalogue serves Umbral and Velo alike. The orchestrated moment remains **one per piece**. With `prefers-reduced-motion`, surfacing and crystallization appear instantly: opacity is kept, blur and displacement are removed.

## 15. The sky

The star background of `numinia.org` is not decoration: **the sky's distribution is the rarity scale** (above). Sixty of every hundred stars are common and one is legendary — whoever looks at the sky reads the same grammar they read in loot, without anyone explaining it. It is the **only sanctioned appearance of rarity outside the game**, and it is authorized because the sky *is* world: it does not color data, prices or deadlines (the rarity rule stays intact there).

| Tier | Weight | Radius | Canonical color |
|---|---:|---|---|
| Common | 60 | 0.3–1.2 px | Arena `#F9EBDC` |
| Uncommon | 25 | 0.5–1.5 px | Verde `#8FC46B` |
| Rare | 10 | 0.6–1.8 px | Tempered blue `#5D9BD6` |
| Epic | 4 | 0.8–2.5 px | Purple `#A98BE0` |
| Legendary | 1 | 1.0–3.0 px | Ámbar `#EFA517` |

Behavior (canonized exactly as it stands in production): **175 stars**; drift of `±0.06 px` per frame with reappearance on the opposite side; **alpha breathing** between `.05` and `.85`, each star at its own rhythm (`.002–.006` per frame); reseeding on resize. Hard rules: Nocturno only; **no parallax and no reaction to cursor or scroll** — it is background, not interaction; never under long reading text; with `prefers-reduced-motion` the sky stops and the stars stay fixed at mid alpha.

**Drift detected `[FIX]`:** numinia.org today draws the sky with hexes foreign to the system (`#22C55E`, `#3B82F6`, `#A855F7`, `#F97316` — Tailwind defaults). The rule is written with the canonicals of the rarity scale; the recoloring goes to the web repository roadmap.

## 16. Pixel grids

| Family | Canonical grid | Decided first | Checked at ×1 |
|---|---:|---|---|
| **Object / badge** | `12×12 px` | silhouette, orientation, interaction point | that the object is not mistaken for another in the same inventory |
| **Character / emblem** | `24×24 px` | pose, balance axis, dominant tool or feature | that action and direction read without animation |
| **Scene module** | `48×48 px` | depth, entry/exit, focus and light mass | that the focus stays visible without zoom |

- Drawing and correcting happen at **×1**; ×2, ×3, ×4, ×6 and ×8 serve inspection and presentation, not pixel decisions.
- An asset's scale is fixed at the start. It must not be drawn large to be reduced later, nor rotated with interpolation. A new scale demands a redraw on its grid.
- All anchor points — feet, object center, tool origin and dialogue box — use integer coordinates and hold across frames.
- The *hitbox* and touch zone belong to interaction, not the visual outline: it may be larger than the sprite to meet the `44×44 px` accessibility minimum without enlarging the drawing.

## 17. External references


| Resource | Authorship | License | Link · distribution | Use in the system |
|---|---|---|---|---|
| **Geist · Geist Mono** | Vercel | SIL OFL 1.1 | [vercel.com/font](https://vercel.com/font) · npm `geist` · self-hosted in `/assets/fonts/` | Sole typography (type scale) |
| **Phosphor Icons** | Helena Zhang · Tobias Fried | MIT | [phosphoricons.com](https://phosphoricons.com) · [github.com/phosphor-icons/core](https://github.com/phosphor-icons/core) · npm `@phosphor-icons/web` | Sole iconography (icon weights and subset) |
| **Pixelify Sans** | Stefie Justprince | SIL OFL 1.1 | [Google Fonts](https://fonts.google.com/specimen/Pixelify+Sans) · self-hosted in `/assets/fonts/` | Pixel-register typography (`BLU-010`) |
| **Alegreya · Alegreya SC** | Juan Pablo del Peral · Huerta Tipográfica | SIL OFL 1.1 | [Google Fonts](https://fonts.google.com/specimen/Alegreya) · variable roman + italic and small caps 400/500, self-hosted (v5 rebuild) | Third voice — book and codex (`BLU-011`) |
| **W3C Design Tokens (DTCG)** | W3C Community Group | Open specification | [design-tokens.github.io/community-group/format](https://design-tokens.github.io/community-group/format/) | Token format (`PRO-014`) |
| **WCAG 2.2** | W3C | Norm (EN 301 549) | [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/) | Accessibility floor (DSN-005) |
| **Octalysis** | Yu-kai Chou | Behavioral framework | [yukaichou.com](https://yukaichou.com/gamification-examples/octalysis-complete-gamification-framework/) | Behavioral design of proposals |
| **8 Bit & '8 Bitish' Graphics — Outside the Box** | Mark Ferrari · GDC 2016 | Professional reference | [gdcvault.com/play/1023586](https://www.gdcvault.com/play/1023586/8-Bit-8-Bitish-Graphics) | Clusters, limited palette and palette cycling; production reference, not visual canon |
| **ScummVM · Understanding the graphics settings** | ScummVM project | GPL / documentation | [docs.scummvm.org](https://docs.scummvm.org/en/latest/advanced_topics/understand_graphics.html) | Adventure graphics scaling, nearest-neighbor and pixel preservation |
| **SDL · Integer scale** | Simple DirectMedia Layer | zlib | [wiki.libsdl.org](https://wiki.libsdl.org/SDL2/SDL_RenderSetIntegerScale) | Technical reference for integer scaling |
| **Aseprite · Indexed color and sprite sheets** | Igara Studio | Official documentation | [aseprite.org/docs](https://www.aseprite.org/docs/color-mode/) | Indexed workflow, closed palette and sprite-sheet export |
| **Plutchik's wheel · Jung's archetypes** | — | Theoretical foundation | — | Emotion and personality of the Brand & Culture |
| **Brand & Culture Numinia v0.1.2** | Numen Games | Internal | `2026_03_20-Numinia_Brand_and_Culture-v0.1.2.pdf` | Source of the identity |


## 18. The house footer

The one closing every public site of Numen Games serves (`DSN-013`).
Adopted 2026-09-16 from numinia.org, the site that had it best; the four
sites served it by 2026-09-17.

```
<site name, written>                      Navigation        Numen Games       Legal        Social
<one line: what this site is>             …                 Numen Games       Terms        GitHub
                                          (two columns      Numinia           Privacy      X
                                           when > 4)        NWOS ← you are here            Discord
                                                            NWOS for your organisation
──────────────────────────────────────────────────────────────────────────────────────────────
[scarab]  by Numen Games — we build for a better future.
          Open by licence · Telemetry · v0.1.1 · 28e0656
```

| Element | Value |
|---|---|
| Site name | Written, never the logo alone; `Numinia_Word` only on numinia.com |
| One line | The site's line from the share-card table below |
| Navigation | The site's primary routes; two columns from five entries, reading down the first column then the second |
| Numen Games column | The four sites, in the order of the share-card table, this one marked «you are here» and not linked |
| Legal | Only texts published for this site's scope; none invented |
| Social | Company accounts only; a missing account is a missing entry, never a personal one |
| Signature | `by Numen Games — we build for a better future.` in English on every site; `Numen Games` opens numen.games in a new tab |
| Build line | `licence · telemetry · vX.Y.Z · sha` — licence opens the repository's `REUSE.toml`; version opens `/updates`; sha opens the commit |
| Never | A copyright line; `all rights reserved`; a year |

Column headings translate with the site; the signature does not.

## 19. The share card

What a link to any of the four looks like when pasted anywhere
(`DSN-014`). One pattern, four contents; generated from the repository at
build time, never drawn by hand.

```
┌────────────────────────────────────────────────────────┐ 1200 × 630
│                                          [scarab, Marfil]
│  NUMEN GAMES · <SITE>                    ← Ámbar, Geist Mono, caps
│  <Name>                                  ← Marfil, Geist 600, ~120 px
│  <One line: what you will find.>         ← Marfil velada, Geist 400
│  ────                                    ← Turquesa rule
│  <domain>                                ← Geist Mono
└────────────────────────────────────────────────────────┘
```

Ground Carbón `#14110F`; the sky (above) at low density behind. Margin
90 px. Type from `/assets/fonts/`, embedded at render (`DSN-002`).

| Site | Name | Line | Domain |
|---|---|---|---|
| The company | Numen Games | We design participatory experiences: narrative, game dynamics, live facilitation. | numen.games |
| The game | Numinia | A world across three centuries. Its chronicle, its material culture — CC0 — and the game. | numinia.com |
| The archive | NWOS | The archive of Numen Games, built in public: canon, decisions, missions, how the work is done. | numinia.org |
| The service | NWOS for your organisation | A file-based operating system for organisations. Markdown, git, AI agents. Adopt it. | nwos.numen.games |

The same four rows are each site's `<title>`, `description`, `og:title`,
`og:description` and its entry in the footer's *Numen Games* column; the
`house-links` file in each repository copies this table until the design
kit serves it (`DSN-009`). The favicon is the canonical brandmark in Marfil on
Carbón: `favicon.svg`, `favicon.png` 32×32 and `apple-touch-icon.png`
180×180. `theme-color` is Carbón.

## 20. The Velo layer

Every Velo value is a canonical with transparency: the register adds alpha,
never a new hex. Carried from `CAN-008` by `ADR-056`, which left the canon
without values.

| Token | Value | Origin | Role |
|---|---|---|---|
| `velo.rejilla` | `rgba(166,218,213,.025)` · **40 px** cell | Verdemar at 2.5 % | The Akasha's grid, barely visible; the cell matches the Platform row (40 px) — archive and tool share the same beat `[DERIVED — verified in production, pablofm-web]` |
| `velo.niebla` | `rgba(1,142,161,.06)` · radial from bottom-left | Turquesa at 6 % | The corridors' fog: the diffuse signal of the background `[DERIVED — verified in production]` |
| `velo.imagen` | `rgba(20,17,15,.72)` | Noche at 72 % | The foundational veil (the image veil and the modal, `BLU-009`) — unchanged; Jardín may lighten it (`BLU-009`) |
| `velo.cristal` | `rgba(30,26,23,.65)` + `backdrop-filter: blur(12px)` | Basalto at 65 % | Glass surface: read through `[EXTENSION — validate]` |
| `velo.cristal-borde` | `rgba(58,51,45,.5)` | Strong line at 50 % | The glass's edge `[EXTENSION — validate]` |
| `velo.cielo` | 175 stars · weights `60/25/10/4/1` | the rarity scale above | The Velo's sky — verified in production, numinia.org |
| `velo.lectura` | `blur(2.2px)` + mask `0→90 %` | — | What lies beyond the Umbral is seen and not read (`BLU-011`) |

**Ceilings and placement.** Grid ≤ 3 % alpha, fog ≤ 8 % — more is scenery.
Nocturno only: in Diurno the Velo does not exist, same logic as the relief.
Grid and fog are background layers, never over reading text nor inside cards
and elevated surfaces. `velo.cristal` only over a background that has grid,
fog or veiled image behind it: blurring nothing is smoke, and text over glass
is secondary minimum with AA verified against the worst background. Grid and
circuit relief do not coexist — two meshes fight `[EXTENSION — validate]`;
fog may settle over the relief at half its alpha.

## 21. Motion and 3D budgets

**Default curve** `cubic-bezier(.2,0,0,1)`.

**Low-poly budget** `[EXTENSION — validate against the store's real assets]`:
character 2,000–10,000 tris; prop 200–2,000; modular environment by pieces.
House lighting is a warm Ámbar key with a cold Turquesa fill (`BLU-015`).
Formats GLB/glTF.

**Pixel outline.** In sprites of 12 px or less the outline may close
completely: at that size the silhouette is all there is.


## 22. Reading aloud — the dock, the ruler, the ink

`[EXTENSION — validate]` Verified in production on numinia.org's document
pages (the Listen player, `web/src/components/SpeechPlayer.astro`). Four
patterns, each built to fix something a reader actually hit, and each
reusable wherever a piece plays through a text or a timeline.

| Pattern | Value | Why |
|---|---|---|
| **The reader leads** | The page follows the voice only until the reader scrolls. From then on the voice keeps going and a *Back to the reading* control appears above the dock, its arrow pointing to where the voice is. Reaching the word again by hand re-arms the following. | A player that drags the page takes the reader's scroll away; reading ahead or going back while it speaks was a fight. The reader owns the scroll, always. One scroll per page: the page's. |
| **The dock** | Surfaces at the bottom while playing (surfacing, 10); `velo.cristal` + `velo.cristal-borde`, frame radius, the width of the text column. Play/pause · section name · time in mono · ruler · rate · close. The entry point in the page stays quiet: hairline and dim text until it plays. | It reads as part of the document's card, not a widget laid over it. Controls that follow the reader beat a toolbar left behind at the top. |
| **The ruler** | A hairline with a fine mark every ~1/90 of its width, a longer mark at each section, the heard part printed in a halftone of Verdemar (dots 2.1 px on a 4 px pitch, fading in from 35 %). Hover shows time · section and the first words of the sentence; a drop starts at the **head of that sentence**; arrows step sentence by sentence. | Not a loading bar: a 1920 print ruler — paper and press (1920), a signal you can scrub (2020), light over glass (2120). Landing mid-sentence is noise; sentences are the unit a listener thinks in. |
| **Drying ink** | What the voice has passed keeps **its own colour** and loses brightness in three steps: the last 3 words at 80 %, the 6 before at 65 %, the rest at 50 % of the ink's alpha. Painted with the CSS Custom Highlight API, one highlight per ink colour and step, never with spans. Under `prefers-contrast: more` nothing dries. | Read text recedes like ink that has set, so the eye finds the present without a highlight shouting it — and it stays ink: a link still reads as a link, a bold as a bold (a first version turned everything one grey and the page went dull; a second, keeping colour at 75 %, was too subtle to notice). It is a **state, not an animation**: the colour of text is never transitioned. No DOM is touched, so browser translation and text selection survive. |
| **The reading light** | A diffuse light in Arena (`--text`, never pure white, 14 px) with a small core of ink at its centre, drifting just above the spoken word, with a soft trail of 12 fading copies; critically damped spring (k 90), sliding along the word as it is spoken; dims to 45 % on pause. Its position is estimated by **spoken** weight (a figure weighs what it takes to say) and re-synced at the end of every sentence, the unit the engine speaks. The ruler's head is the same light. | The old amber dot hopped word to word and competed with the Ámbar that marks what shines. Arena is the page's own ink colour: the light belongs to the text; the core lets a reader with low vision follow it. Under `prefers-reduced-motion` it jumps, with no trail and no drift. |

**Touch to hear.** While the voice is on, a click on a sentence starts it there (links, buttons and a selection keep their meaning). **Speeds** step 1 · 1.25 · 1.5 · 2 · 0.75 from one button — the first step gentle, no 1.75, a slower one for learners — and the chosen speed follows the reader across documents. **The ruler's preview is dark glass**, like the dock: a recorded exception to the opposite-mode tooltip of `BLU-009` §8, because white paper over the reading dazzles in Nocturno.

**Icons over words in document tools.** Copy, download and source are
glyphs with an `aria-label` and a tooltip in the opposite mode; the words
added nothing a reader of the glyph did not already know.

**Catalogue status.** The drying ink is a state and the dock uses surfacing
(10); neither adds an animation. The reading light **is animation 15** (§14,
the Oracle, 2026-09-24): the second sanctioned loop after the sky, allowed
because it is not ambient — it exists only while a voice plays and moves only
because the voice moves.

---

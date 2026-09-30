---
id: "STD-023"
uid: ""
title: "Design values"
type: documentation
subtype: register
status: draft
version: "1.8.0"
created: "2026-09-09T11:00:00+02:00"
updated: "2026-09-30T14:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
tags: [design, register, tokens, palette, typography, motion]
license: "CC0-1.0"
related: ["STD-008", "STD-034", "CAN-008", "ADR-044", "PRO-022"]
derived_from: "CAN-008"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Design values

> **Summary:** The design system's closed lists, as values: colours,
> contrasts, type and space scales, icons, brand marks, animations, the sky
> and pixel grids. The design kit holds them for machines; a test fails if a
> colour here is missing there.
> **Epistemic:** Which are the design values?
> **Pragmatic:** Look a value up here or in the kit, never in a piece.
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

Sixteen colors, **zero new hexes**: seven neutrals, the six brand colors and three already-defined shadows, plus the rarity green. Every sprite and every pixel scene MUST limit itself to this index.

| Nº | Hex | Name | Role in pixel |
|---|---|---|---|
| 01 | `#14110F` | Noche | Background, sprite outline |
| 02 | `#1E1A17` | Basalto | Deep shadow |
| 03 | `#292420` | Dark Bronce | Shadow |
| 04 | `#3A332D` | Bronce | Mid shadow, metal |
| 05 | `#8A7D72` | Ceniza | Working grey |
| 06 | `#C4B5A6` | Veiled Arena | Mid light |
| 07 | `#F9EBDC` | Arena | Light, highlight, base sprite |
| 08 | `#A6DAD5` | Verdemar | Solar accent |
| 09 | `#018EA1` | Turquesa | Cyber accent |
| 10 | `#016E7D` | Deep Turquesa | Shadow of 09 |
| 11 | `#EFA517` | Ámbar | Gold, achievement, sun |
| 12 | `#7A5100` | Toasted Ámbar | Shadow of 11 |
| 13 | `#F35059` | Coral | Living signal |
| 14 | `#D33440` | Grana | Deep red — **fill only** |
| 15 | `#B02330` | Deep Grana | Shadow of 14 |
| 16 | `#8FC46B` | Verde | Nature, the solarpunk garden |

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

Each material SHOULD resolve with **2–4 colors** from one or two ramps. Sharing a shadow or a light between materials coheres the scene and preserves the limited character of 90s graphics.

## 7. Data palette

Intelligence reports are product: charts have canonical color. Like the ramps, this palette **adds no hexes: it orders the existing ones**.

| Series | Categorical order | Verification over Noche (graphic object ≥3:1) |
|---|---|---|
| 1–6 | **Turquesa → Ámbar → Verdemar → Grana → Verde → Ceniza** | 4.8 · 9.0 · 12.2 · 3.9 · 9.2 · 4.7 ✓ |

**Sequential** (magnitude): Noche → Deep Turquesa → Turquesa → Verdemar → Arena. **Divergent** (two poles): Grana ↔ Ceniza ↔ Turquesa. Rules: maximum **6 series** per chart (more series = another chart); every series with a direct label or legend, never color alone; in Diurno, series use their text variants where they exist and lines thicken to 2 px; rarity never colors data — a datum is not epic.

---

## 8. Type scale

Scale 1.200, base 16 px; pt for the 1920×1080 canvas: `display.xl` 4.300rem/50pt · `display.l` 3.583/42 · `display.m` 2.986/34 · `titulo.l` 2.488/28 · `titulo.m` 2.074/24 · `titulo.s` 1.728/20 · `cuerpo.l` 1.440/17 · `cuerpo.m` 1/14 · `cuerpo.s` 0.875/12 · `etiqueta` 0.700/11 (Mono, uppercase, tracking `+0.15em`; Verdemar when it heads a section, secondary text in the bar) · `dato.xl` 2.986 Mono 500 · `dato.m` 1 Mono 400. The page headline is Geist **400** with tracking `-0.025em`; titles 600. **[1.7.0 — numinia.org leads]** the label and the headline are read from numinia.org, which set them before this register did.

## 9. Space, grid, shape, elevation, focus


**Spacing** base 4 px: `4·8·12·16·24·32·48·64·96·128` (`space.100–1000`); every gap MUST be from the scale.
**Grids**: web column **≤1100** / 12 col / margin 24 / gutter 24 (numinia.org's column, 1.7.0); tablet 8/40/24; mobile 4/20/16; slide 1920×1080 / 12 / 120 / 32; A4 12 / 20 mm / 5 mm. Baseline 8 (4 mm printed). Rhythm: sections `s900` web · `s800` deck; blocks `s700`; headline→body `s400`; card `s500`.
**Shape [CANON — direction decision, 4.0.0]**: two radii and nothing more — **control `6px`** (buttons, fields, chips, toggles) and **frame `8px`** (cards, panels, dialogs, canvases, status bands). Warm without fashion: the frame rounds a little; the content inside inherits no radius of its own. Circle only in markers, avatars and stickers; the pill is a capsule. **No third radius** [1.7.0]: 12 and 16 px cards, 4 px buttons and 2–3 px bars are all read as one of the two, or as a capsule when the piece is a thin bar; a framework's own radius scale (`rounded-xl`, `rounded-lg`…) is not used, only the two values. **The pixel register keeps its straight edges** (the pixel does not curve) and printed tables too. Borders 1 px.
**Elevation**: in Nocturno no shadows — surface step + hairline (`base→superficie→elevada`); sole exception the legendary halo. In Diurno a single shadow `0 1px 2px rgba(20,17,15,.08), 0 8px 24px rgba(20,17,15,.06)`.
**Focus**: `outline: 2px solid #018EA1; offset 2px`, never animated — the look is ours; that it is always visible and never hidden is the accessibility standard's. Non-negotiable.

## 10. Icon weights


`regular` **by default** (16–40 px) · `fill` active or reached state · `bold` at < 16 px · `light` illustrative at ≥ 48 px · **`thin` forbidden** (it disappears over Noche) · **`duotone` forbidden** (it breaks the flat discipline).

## 11. The icon subset


**The house subset [CANON — numinia.org leads, 1.7.0].** Of Phosphor's ~1,500 glyphs, the organization uses **seventy-two**: exactly the ones numinia.org serves from `web/src/icons/`, as one sprite of `<symbol>`s with `currentColor`. The kit's `icon.subconjunto` lists the same names, and a test fails if the two part. One concept, one glyph, across the four sites:

- **Navigation and the bar:** `archive` · `crosshair` · `house` · `list` · `magnifying-glass` · `caret-down` · `caret-left` · `x` · `moon` · `moon-stars` · `sun` · `globe-hemisphere-west` · `globe-hemisphere-west-light`
- **Reading and documents:** `book-open` · `books` · `scroll` · `file-text` · `clipboard-text` · `note-pencil` · `copy` · `download-simple` · `upload-simple` · `push-pin` · `ruler` · `play-fill` · `pause-fill` · `arrow-down-bold` · `music-notes`
- **The archive's six functions:** `bank` (governance) · `crane-tower` (production) · `shield-check` (assurance) · `robot` (agency) · `sparkle` (creation) · `gear` (administration)
- **State of a piece of work:** `check` · `circle` · `hourglass` · `lightning` · `eye` · `snowflake` · `prohibit` · `warning` · `lock-key` · `arrows-clockwise` · `bell`
- **Kinds of work and people:** `dna` (biological) · `git-branch` (hybrid) · `brain` · `flask` · `target` · `user` · `users` · `sign-out` · `buildings` · `map-pin` · `calendar-blank` · `desktop`
- **Play and the world:** `game-controller` · `mask-happy` · `confetti` · `sword` · `sword-light` · `flame` · `flame-light` · `package` · `coins` · `palette` · `coffee` (supporting Numinia: the footer's button and its pages)
- **Data and outward links:** `chart-bar` · `chart-line` · `github-logo` · `x-logo`

Until 1.7.0 the subset named twenty-six and the site served seventy-one; the Oracle ruled that the site leads (2026-09-29). Expanding it further is still a decision: a new icon enters here with its concept, in the same pull request as its file.

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

The scarab's only drawing is the file `web/src/brand/Khepri_Logo.svg`,
viewBox 75.44×75.53, `fill="currentColor"`; every copy is taken from it.

## 14. The animation catalogue — sixteen, and no more


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
| **10** | **Surfacing** — knowledge comes out of the fog [5.0.0] | `560 ms` · ciclo; opacity 0→1 + `blur(8px)→0` + 8 px rise; on entering the viewport, once | Veil register: archive, Summa, sheets upon opening, revelations | Functional interface; long lists (reveal 02 suffices); Diurno; corporate Umbral |
| **11** | **Crystallization** — the glass materializes [5.0.0] | `320 ms` · ciclo; `backdrop-blur 0→12px` + border 0→50 % + opacity | Veil panels and modals (`BLU-009`) | Outside the Veil; over backgrounds without atmosphere |
| **12** | **Page turn** — **RETIRED in 5.1.0 (H5)** | 5.0.0 registered it "to be verified against the LAP"; verification came back empty: the codex does not animate the page turn — the only living thing in that view is the Trazo (13). The number is not reused (append-only catalogue); if someday the paper turns pages with animation, it will enter as a new piece with its own specs | — | — |
| **13** | **Trazo** — the corners draw themselves [5.0.0 · in production] | `1.6 s` · ease · `stroke-dashoffset: 340 → 0`; four engraving frames staggered at `120 ms` | Book cover and chapter opening (`BLU-011`, the living paper) — it **is** that view's orchestrated moment | Interface; re-firing on scroll; alongside another orchestrated moment |
| **14** | **Sky** — the Veil's background breathes [5.0.0 · in production] | Drift of `±0.06 px`/frame with reappearance on the opposite side + alpha oscillating between `.05` and `.85` at its own rhythm (`.002–.006`) | Background of the Veil register (the sky, below) — **a sanctioned exception** to the ambient-loop veto; at night on numinia.org, numinia.com and nwos.numen.games | Over long reading; **numen.games** (the Oracle, 2026-09-29) |
| **15** | **Reading light** — a light follows the voice [1.4.0 · in production] | A diffuse Arena halo (14 px, a small ink core, never pure white) just above the spoken word, a trail of 12 fading copies; critically damped spring (k 90); gliding along the word at the voice's pace, resting where it rests; 45 % on pause | Following a voice or any playback through a text (the reading player, `PRO-022`) — **the second sanctioned loop**: it lives only while the voice plays and moves only because the voice moves | Ambient; decoration; without a voice or playback behind it; with `prefers-reduced-motion` (it jumps: no trail, no spring, no bob) |
| **16** | **Entrance** — a page's first lines arrive [1.7.0 · in production, numinia.org] | `600 ms` · ciclo; opacity 0→1 + **24 px** rise; the hero's lines staggered at `100 ms` (label, headline, line) | The top of a page: its label, headline and one line, once on load | Content further down (reveal 02 does that); controls; re-firing on scroll |

The first three 5.0.0 pieces (10–12) are **transitions, not loops** and **invent no durations**: they reuse `duration.largo` (560) and `duration.medio` (320). The **trazo** (13) arrives measured from production with its own `1.6 s` — it is the catalogue's only new duration, and it is justified because drawing four corners faster turns them into a blink. The **sky** (14) is a sanctioned exception to the ambient-loop veto (DSN-012): it is authorized because it is the **register's background**, not a view's ornament. It starts by itself and lasts longer than five seconds, so the accessibility guidelines require a visible control to pause it; asking the system for less motion is not enough, and the sites do not meet this yet. The **entrance** (16) came from numinia.org, where every page opened with it before the catalogue knew it: its 600 ms and 24 px are the site's, taken as they are because the site leads (1.7.0); it is a transition, not a loop, and it replaces nothing — reveal (02) still serves what the reader scrolls to. The **reading light** (15) is the other one, for the opposite reason: it is not ambient at all — it lives only while a voice plays, and it moves only because the voice does. The codex's **reading moon** is not a new animation: it is the lunar phase (06) demonstrated in production. 10–12 belong to the Veil register and the living paper; the 01–09 catalogue serves Umbral and Veil alike. The orchestrated moment remains **one per piece**. With `prefers-reduced-motion`, surfacing and crystallization appear instantly: opacity is kept, blur and displacement are removed.

## 15. The sky

The star background of `numinia.org` is not decoration: **the sky's distribution is the rarity scale** (above). Sixty of every hundred stars are common and one is legendary — whoever looks at the sky reads the same grammar they read in loot, without anyone explaining it. It is the **only sanctioned appearance of rarity outside the game**, and it is authorized because the sky *is* world: it does not color data, prices or deadlines (the rarity rule stays intact there).

| Tier | Weight | Radius | Canonical color |
|---|---:|---|---|
| Common | 60 | 0.3–1.2 px | Arena `#F9EBDC` |
| Uncommon | 25 | 0.5–1.5 px | Verde `#8FC46B` |
| Rare | 10 | 0.6–1.8 px | Tempered blue `#5D9BD6` |
| Epic | 4 | 0.8–2.5 px | Purple `#A98BE0` |
| Legendary | 1 | 1.0–3.0 px | Ámbar `#EFA517` |

How the sky moves, and where it may not appear, is `PRO-022`.


## 16. Pixel grids

| Family | Canonical grid | Decided first | Checked at ×1 |
|---|---:|---|---|
| **Object / badge** | `12×12 px` | silhouette, orientation, interaction point | that the object is not mistaken for another in the same inventory |
| **Character / emblem** | `24×24 px` | pose, balance axis, dominant tool or feature | that action and direction read without animation |
| **Scene module** | `48×48 px` | depth, entry/exit, focus and light mass | that the focus stays visible without zoom |

- Drawing and correcting happen at **×1**; ×2, ×3, ×4, ×6 and ×8 serve inspection and presentation, not pixel decisions.
- An asset's scale is fixed at the start. It MUST NOT be drawn large to be reduced later, nor rotated with interpolation. A new scale demands a redraw on its grid.
- All anchor points — feet, object center, tool origin and dialogue box — use integer coordinates and hold across frames.
- The *hitbox* and touch zone belong to interaction, not the visual outline: it MAY be larger than the sprite to meet the `44×44 px` touch target without enlarging the drawing (the guidelines' highest level; their AA minimum is 24×24).

## 17. External references


| Resource | Authorship | License | Link · distribution | Use in the system |
|---|---|---|---|---|
| **Geist · Geist Mono** | Vercel | SIL OFL 1.1 | [vercel.com/font](https://vercel.com/font) · npm `geist` · self-hosted in `/assets/fonts/` | Sole typography (type scale) |
| **Pixelify Sans** | Stefie Justprince | SIL OFL 1.1 | [Google Fonts](https://fonts.google.com/specimen/Pixelify+Sans) · self-hosted in `/assets/fonts/` | Pixel-register typography (`BLU-010`) |
| **Alegreya · Alegreya SC** | Juan Pablo del Peral · Huerta Tipográfica | SIL OFL 1.1 | [Google Fonts](https://fonts.google.com/specimen/Alegreya) · variable roman + italic and small caps 400/500, self-hosted (v5 rebuild) | Third voice — book and codex (`BLU-011`) |
| **Octalysis** | Yu-kai Chou | Behavioral framework | [yukaichou.com](https://yukaichou.com/gamification-examples/octalysis-complete-gamification-framework/) | Behavioral design of proposals |
| **8 Bit & '8 Bitish' Graphics — Outside the Box** | Mark Ferrari · GDC 2016 | Professional reference | [gdcvault.com/play/1023586](https://www.gdcvault.com/play/1023586/8-Bit-8-Bitish-Graphics) | Clusters, limited palette and palette cycling; production reference, not visual canon |
| **ScummVM · Understanding the graphics settings** | ScummVM project | GPL / documentation | [docs.scummvm.org](https://docs.scummvm.org/en/latest/advanced_topics/understand_graphics.html) | Adventure graphics scaling, nearest-neighbor and pixel preservation |
| **SDL · Integer scale** | Simple DirectMedia Layer | zlib | [wiki.libsdl.org](https://wiki.libsdl.org/SDL2/SDL_RenderSetIntegerScale) | Technical reference for integer scaling |
| **Aseprite · Indexed color and sprite sheets** | Igara Studio | Official documentation | [aseprite.org/docs](https://www.aseprite.org/docs/color-mode/) | Indexed workflow, closed palette and sprite-sheet export |
| **Plutchik's wheel · Jung's archetypes** | — | Theoretical foundation | — | Emotion and personality of the Brand & Culture |
| **Brand & Culture Numinia v0.1.2** | Numen Games | Internal | `2026_03_20-Numinia_Brand_and_Culture-v0.1.2.pdf` | Source of the identity |


## 18. The house footer

Laid out in the standard of what every site carries, which is its one
home.

## 19. The share card

Laid out in the standard of what every site carries, which is its one
home.

## 20. The Veil layer

Every value of the veiled style is one of our colours made partly
transparent: the style adds transparency, never a new colour. These values
came here from the visual identity canon, which now holds none.

| Token | Value | Origin | Role |
|---|---|---|---|
| `velo.rejilla` | `rgba(166,218,213,.025)` · **40 px** cell | Verdemar at 2.5 % | The Akasha's grid, barely visible; the cell matches the Platform row (40 px) — archive and tool share the same beat `[DERIVED — verified in production, pablofm-web]` |
| `velo.niebla` | `rgba(1,142,161,.06)` · radial from bottom-left | Turquesa at 6 % | The corridors' fog: the diffuse signal of the background `[DERIVED — verified in production]` |
| `velo.imagen` | `rgba(20,17,15,.72)` | Noche at 72 % | The foundational veil (the image veil and the modal, `BLU-009`) — unchanged; Jardín may lighten it (`BLU-009`) |
| `velo.cristal` | `rgba(30,26,23,.65)` + `backdrop-filter: blur(12px)` | Basalto at 65 % | Glass surface: read through `[EXTENSION — validate]` |
| `velo.cristal-borde` | `rgba(58,51,45,.5)` | Strong line at 50 % | The glass's edge `[EXTENSION — validate]` |
| `velo.cielo` | 175 stars · weights `60/25/10/4/1` | the rarity scale above | The Veil's sky — verified in production, numinia.org |
| `velo.lectura` | `blur(2.2px)` + mask `0→90 %` | — | What lies beyond the Umbral is seen and not read (`BLU-011`) |

**Ceilings:** grid ≤ 3 % alpha, fog ≤ 8 % — more is scenery. How each layer
is placed is `PRO-022`.


## 21. Motion and 3D budgets

**Default curve** `cubic-bezier(.2,0,0,1)`.

**Low-poly budget** `[EXTENSION — validate against the store's real assets]`:
character 2,000–10,000 tris; prop 200–2,000; modular environment by pieces.
House lighting is a warm Ámbar key with a cold Turquesa fill (`BLU-015`).
Formats GLB/glTF.

**Pixel outline.** In sprites of 12 px or less the outline MAY close
completely: at that size the silhouette is all there is.


## 22. Reading aloud

The values of the reading-aloud player; how it is built is `PRO-022`.

| Value | |
|---|---|
| Drying ink | the last 3 words at 80 %, the 6 before at 65 %, the rest at 50 % of the ink's alpha; none under `prefers-contrast: more` |
| Reading light | Arena (`--text`), 14 px, an ink core; a trail of 12 copies; spring k 90; 45 % on pause |
| The ruler | halftone of Verdemar, dots 2.1 px on a 4 px pitch, from 35 %; a fine mark every ~1/90 of its width |
| Speeds | 1 · 1.25 · 1.5 · 2 · 0.75 |

**Catalogue status.** The drying ink is a state, and the dock uses the
surfacing animation; neither adds an animation. The reading light is
animation fifteen in the catalogue above.

## 23. The web piece

What the four sites share above the footer, read from numinia.org, which
leads the design (the Oracle, 2026-09-24 and 2026-09-29). Where this
register and numinia.org differed, the register moved.

| Piece | Value |
|---|---|
| Column | content `≤1100 px`, margin `24 px` each side; a map that must be seen whole (the home's astrolabe, the automation map) opens to `1280 px` |
| The bar | sticky at the top, `56 px`; the page's background at 85 % with `blur(24px)`; a hairline below in the strong line at 50 % |
| The mark | on the left, the site's **wordmark** in `currentColor`, 20 px high (16 on a phone), named for a screen reader: `Numinia_Word` on numinia.org and numinia.com, `Numen_Games_Horizontal_Word` on numen.games and nwos.numen.games (the Oracle, 2026-09-29) |
| Entries | the label type of the type scale with a Phosphor glyph at 14 px before it; secondary text, primary on hover |
| Active entry | primary text and a **2 px Turquesa** underline (Ámbar until 1.7.0; the Ámbar stays for emphasis) |
| Utilities | on the right: search, the mode switch, a 44 px button; nothing else |
| Mobile | a full-screen panel under the bar, the same entries and nothing else |
| Headline | Geist 400, tracking `-0.025em`, `3–3.75 rem` |
| Section label | the label type in Verdemar, tracking `+0.25em` above a headline, `+0.15em` elsewhere |
| Cards | surface at 60 %, the strong line, the frame radius (8 px), padding `20 px` |
| Entrance | animation 16 on the label, headline and line of the page's top |
| The sky | animation 14 behind everything, at night, on numinia.org, numinia.com and nwos.numen.games — not on numen.games |

**Why.** A visitor who has learnt one of the four has learnt the other
three: the bar is in the same place, says things the same way and marks
where they are with the same line. The mark tells which house they are in:
Numinia's for the world and its archive, Numen Games' for the company and
its service. numen.games carries no sky because it
is the company's door to clients, not a room of the world.


---

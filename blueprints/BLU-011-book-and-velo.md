---
id: "BLU-011"
uid: ""
title: "The book and the Velo"
type: blueprint
status: active
version: "1.1.1"
created: "2026-09-09T11:00:00+02:00"
updated: "2026-09-26T18:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
tags: [blueprint, design, recipes]
license: "CC0-1.0"
related_missions: ["MIS-0146"]
related: ["STD-008", "STD-023", "CAN-008"]
extraction_note: "Extracted verbatim from STD-008 v6.1.0 (old §3.6, 5.4–5.5, 6.5, 8.9, 10) under ADR-043 and ADR-044: recipes leave the standard; the standard keeps the rules, the register keeps the values. Section 6 came from PRO-014 v1.1.0 (then its sections 6.12) on 2026-09-09."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# BLU-011 — The book and the Velo

> **Summary:** How the two discovered registers are built: the serif that narrates, the atmosphere and the paper's grain, the book's icons and components, the sky's behaviour and the reading veil.
> **Epistemic:** The recipes the old standard carried for the codex and the Velo; their values are `STD-023`, their direction `CAN-008`.
> **Pragmatic:** Building or reviewing a codex page, a Velo surface or the archive.
> **Audience:** Agents · Oracles

> **A blueprint is a design not yet executed.** This one is: every recipe here is in production. It stays a blueprint because a recipe is how, not whether — the rules are `STD-008`, the values `STD-023`.

## 1. The third voice — the serif that narrates

Sans states, Mono measures, **the serif narrates**. The codex in production already uses it — living colophon: *"Compuesto en Alegreya con el Sistema"*. **Alegreya** (Juan Pablo del Peral, Huerta Tipográfica, SIL OFL 1.1) enters **whole**, because the codex already uses all three cuts — audited in the production repository:

| Cut | File | Role in the book |
|---|---|---|
| Variable roman | `Alegreya-Variable.woff2` | Long-reading body |
| Variable italic | `Alegreya-Italic-Variable.woff2` | Literary opening, quotes, epigraphs, glossary terms |
| **Small caps** (400/500) | `AlegreyaSC-{Regular,Medium}.woff2` | **Drop cap**, chapter titles, section small caps |

The **small caps is the piece that was missing from the record**: it is not a simulated typographic effect (synthetic `font-variant` is forbidden, like Pixelify's fake bold in §3.5), it is a proper cut with its own drawn shapes. A voice **exclusive to the book** (Book · codex surface, `BLU-011` §6); self-hosted with its OFL in `/assets/fonts/`, pending entry into the kit in the v5 rebuild. **Never** in interface, deck (the legacy guard `BLU-012` stays intact), corporate document or invoice. Until the Oracle's signature, its use stays confined to the already-published LAP.

---

## 2. The atmosphere and the grain

§5 had two textures: the signal (what flows) and the circuit (where it flows). 5.0.0 names the third: **the atmosphere** — the Velo's grid and fog (§10), the medium where the discovered orders itself. The three share the Nocturno background — and the grain (§5.5) takes the Diurno —: **the signal separates, the circuit gives body, the atmosphere gives depth, the grain gives paper.** Coexistence: hard rules in §10 (one dominates per view; fog over relief at half alpha; grid and relief do not coexist). In Diurno none of the three exists: paper is paper.

### The grammage — the paper's grain
The codex in production demonstrates the fourth matter, and it is the Diurno's: **the grain**. Generated fractal noise (`feTurbulence` `fractalNoise`, `baseFrequency 0.85`, `numOctaves 3`, tinted to `rgba(74,64,51,.045)` by color matrix), fixed on the background, in an embedded 240² SVG — no download, no image.

**Why it does not contradict §5.2.** That rule — "no texture in Diurno" — forbids the **circuit relief** over paper: the machine is not printed. The grain is not a texture *applied* to the paper: it **is** the paper. Rules: maximum **5 %** intensity; background layer only, `position: fixed`, `pointer-events: none`; never on elevated surfaces nor under data tables; in Nocturno the same grain **drops to half** (night paper is the same paper with less light); it does not combine with relief or the Velo's grid — paper has neither circuit nor Akasha.

With this, the matters are four and each has its world: **the signal separates, the circuit gives body, the atmosphere gives depth, the grain gives paper.**

---

## 3. The book's icons

The paper register has its own set, **of stroke and not of mass**: grid `16`, `stroke 1.5`, round terminals, no fill. Pieces in production: index, bookmark, narrator, pause, sun, moon, umbral (chevron) and the **fillet** — the hexagonal glyph with three nodes that separates the book's sections. They neither compete with Phosphor nor replace it: they live inside the register, just as the pixel has its own iconography inside its own (§8.6). Outside the book, Phosphor rules.

In production, **self-hosted subset** (inline SVG or sprite), as the guide's own `index.html` does. For prototypes: `@phosphor-icons/web` on npm/unpkg. Source of the official SVGs: `github.com/phosphor-icons/core` (`assets/{weight}/{name}[-{weight}].svg`).

---

## 4. The book's components

The codex's editorial carpentry. They live **inside the paper register** (`BLU-011` §6) and do not replace the components of §8.1–9.5.

| Component | Construction | Usage rule |
|---|---|---|
| **Book bar** | 54 px, paper background at 88 % + `blur(10px)`, bottom hairline; while reading it **yields to 40 px** and hides labels and the A·A·A control | **It never disappears**: bookmark, index and narrator stay one tap away; the main action keeps its name — it is never reduced to a cryptic arrow |
| **Drop cap** | chapter's first letter in small caps at `4.4em`, floated, structure color | One per chapter and only in the first paragraph; removed in printable sheets |
| **Reading box** | deep paper, 1 px border + 3 px solar edge on the left, radius `0 10px 10px 0`, `LECTURA` label riding the top border | Long quote, table rule or author's aside; in italics, secondary text |
| **Plate** | `marco` frame, gap with diagonal hatching when the illustration does not yet exist, caption with description + technical sheet in Mono | The gap **is shown**, not disguised: a book under construction says so |
| **Numbered table** | `caption` in Mono small caps («Tabla I · …»), header in structure, first column in italics, rows with hairline | The book's table is not the product's (`BLU-014`): here reading rules, not density |
| **Margin note** | 200–220 px side column from `1200 px`; below that, it drops to the paragraph's foot | **Never duplicated**: either margin or foot. Reference in Mono, superscript in interactive color |
| **Fillet** | hexagonal glyph centered between two 96 px gradients | Separator of the book's sections; replaces the binary inside the paper |
| **Umbral seal** | 100 px disc, structure border, halo `0 0 12px rgba(239,165,23,.25)` and inner radial gradient | The **only** use of the legendary halo outside rarity: it marks the session boundary, not an object |
| **Glossary** | `dt` in italic small caps over structure + `dd` with the definition and its source; the term reached from a chapter is marked with a solar edge | **Definitions come only from the manual's text and each cites its source**: a glossary that invents stops being a glossary |
| **Term in the body** | dotted underline in structure, `text-underline-offset 3px`; on hover it turns solid and interactive | It says "this is defined" without stealing the prose's color; not used for normal links |
| **Download card** | frame, format in Mono small caps over structure + one sentence of why | The three always together (.md, pdf, epub): the book travels free or does not travel |
| **Colophon** | **bar** binary (the word in bits, each bit a 5×12 bar; the one in structure), circular seal, authorship, license and signature | Closes the book; the bar binary is the printed variant of §5.1 — the message is still real text in the markup |
| **Rating gears** [5.1.0 · H2] | row of Phosphor `gear` 0–5, `regular` 18 px; the reached ones in `fill`; on setting the value, the set ones turn **a quarter turn** (120 ms, elevation 04) | Sheet rating (MIS-085); only where the user rates — never to display data they did not set; with `prefers-reduced-motion`, no turn |
| **The Narrator** [5.1.0 · H3] | play/pause in the book bar (proper icon of the §6.5 set); reads aloud via Web Speech, **highlights the block being read** (solar edge, like the reached glossary term), pace control next to the A·A·A | Scope: codex body, glossary and sheet — never interface; if Web Speech is unavailable, the control is not shown (no dead buttons); the highlight follows the audio, not the scroll |

## 5. The Velo: sky behaviour and the reading veil


The register is decided in `CAN-008` §3.6. These are its numbers.

### The sky · rarity made cosmos

### The reading veil · seen, not read
The codex's session boundary, already in production: the closed chapter **is shown** blurred (`blur(2.2px)`) and dissolving downward with a linear mask of `0→90 %`. It is not a wall that hides — it is a veil that promises; the funnel is soft by decision (D2 of the LAP). Rules: veiled text stays **inert** (`user-select:none`, `pointer-events:none`, out of the focus order); the Umbral's seal and its call float **sharp above**; content the person already had open is never veiled.

**Its animations** live in §9.1 (10–14). The 01–09 catalogue remains available to Umbral and Velo alike; 10–12 are exclusive to the Velo and the living paper (`BLU-011` §6).

## 6. The living paper — the codex's blueprint

*The blueprint in one line:* Diurno by default (it is paper) with Nocturno toggle as real night reading; the third voice narrates the body (`BLU-011` §1); the reading frame belongs to the Velo; the book can always be taken away.

All long-reading paper (codex, book, digital editorial) uses these pieces, **verified in production** at `numinia.com/lap/codex`:

```
PORTADA                                CAPÍTULO
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│  [quien] presenta            │      │ ← título del capítulo →   ○ luna      │
│  TÍTULO display (serif)      │      │ eyebrow de sección                    │
│  subtítulo nivel II          │      │ Apertura literaria en cursiva (II)    │
│  autores · edición · versión │      │ Cuerpo en la tercera voz (II/III),    │
│  «↓ abre el códex»           │      │ enlaces de glosario en línea          │
└──────────────────────────────┘      └───────────────────────────────────────┘

ÍNDICE                                 CIERRE DE LIBRO
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│ I   Capítulo …    abierto    │      │ «El libro viaja libre»                │
│ II  Capítulo …    tras el    │      │ [.md] [pdf] [epub]  ← siempre visible │
│                    Umbral    │      │ Agradecimientos                       │
│ ✦   Anexos        abierto    │      │ Colofón: «Compuesto en [voz] con el   │
│                              │      │ Sistema · La fuente de verdad vive    │
│                              │      │ en Git» · [escarabajo]                │
└──────────────────────────────┘      └───────────────────────────────────────┘
```

**Rules of the living paper:**

- **Frame and page are distinct registers.** The page (the paper) is Umbral-Diurno with the third voice; the **reading frame** (the LAP's bar, bookmark, A·A·A controls, switch) MAY live in Velo when the mode is Nocturno. The boundary is visible.
- **The moon is the bookmark** (`STD-023` §14-06, waxing phases): reading progress is told in moon, from new to full — finishing is a full moon. The reading position is persisted.
- **A · A · A:** the reading size belongs to the reader, not the designer — three steps over the type scale (`STD-023` §8), without breaking the grid.
- **The access state is named in the world:** chapters `abierto` / `tras el Umbral` — the session boundary uses the canonical lexicon (`CAN-008` §3.10), never "login required".
- **"The book travels free" is a principle, not a feature:** the downloads (.md first — File Over App made interface —, Diurno pdf for printing, epub) are always one step away.
- **The literary opening** in italics is the only level II inside a II/III body and does not blend with it.
- **The colophon always signs:** typographic voice + System + "La fuente de verdad vive en Git" + scarab. The invoice's footer and the book's colophon are the same idea on two papers.
- **The book has its own switch**, independent from the rest of the platform: someone can read at night without turning off the whole city. The book's Nocturno is dark paper (`#14110F` / `#1E1A17`) with the grain at half intensity, not the product Nocturno.
- **The book's inks** [5.1.0 · H1]: the system's tertiary text (`#6E6259`/`#8A7D72`) sits at 3.7:1 over the codex's paper — below AA. Inside the paper register, the tertiary is `#75695E` (Diurno) and `#97897D` (Nocturno) — token `papel.tinta-terciaria`, verified in production. Outside the paper, the system's inks stay intact.
- **The editions are blueprint, not courtesy** [5.1.0 · H4]: the **pdf** is produced by printing the site's CSS (`@media print`, A4 — the full codex prints like a real book, ~413 pages); the **printable sheet** ships without the action bar or controls (paper carries no buttons); the **epub** keeps the glossary links. No edition is generated with a separate typesetter: the source is one, the CSS is the same.
- **The editorial pieces** (drop cap, reading box, plate, numbered table, margin note, fillet, seal, glossary, downloads, colophon, rating gears, Narrator) are specified in `BLU-011` §4; the book's icons, in `BLU-011` §3; the grain, in `BLU-011` §2.
- **The invoice inherits none of it** (`BLU-011` §2): administrative paper remains pure Geist, one page, total in toasted Ámbar; neither third voice nor Velo frame.

## Check

After the general checklist of `PRO-014` §4, and before delivering:

- [ ] Velo: only alphas over canonicals; grid ≤3 %, fog ≤8 %; atmosphere behind the content, never on cards or elevated surfaces; glass only with atmosphere behind and text ≥ secondary; no Velo in Diurno; one dominant matter per view; animations 10–11 only here; still one orchestrated moment.
- [ ] Sky built as `PRO-022` §3.1; grain (§2) only on paper, ≤5 %, never with relief or grid.
- [ ] Living paper: third voice only in the book (roman body, SC drop cap and titles, italic lore, no synthetic small caps); bar that yields but does not disappear; glossary with a source per definition; moon as bookmark; `abierto / tras el Umbral` states; .md/pdf/epub visible; literary opening separated; full colophon with the scarab.
- [ ] The invoice inherits none of it (`BLU-013`).

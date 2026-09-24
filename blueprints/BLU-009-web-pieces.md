---
id: "BLU-009"
uid: ""
title: "Web pieces"
type: blueprint
status: active
version: "1.1.1"
created: "2026-09-09T11:00:00+02:00"
updated: "2026-09-24T17:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
tags: [blueprint, design, recipes]
license: "CC0-1.0"
related_missions: ["MIS-0146"]
related: ["STD-008", "STD-023", "CAN-008"]
extraction_note: "Extracted verbatim from STD-008 v6.1.0 (old §2.4–2.5, 3.1–3.2, 3.4, 5.1–5.3, 6.2, 6.4, 7.2–7.3, 8.1–8.5, 8.7–8.8, 9.2–9.3, 12) under ADR-043 and ADR-044: recipes leave the standard; the standard keeps the rules, the register keeps the values. Sections 12–13 came from PRO-014 v1.1.0 (then its sections 6.2 and 6.6) on 2026-09-09."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# BLU-009 — Web pieces

> **Summary:** How a corporate web piece is built with the system: colour semantics, the sans/mono contrast, composition, the binary and the relief, icon use, the mode switch, brand placement, every component from button to modal, the motion vetoes, the typing implementation and the accessibility floor.
> **Epistemic:** The recipes the old standard carried for the Umbral register; every value they name is in `STD-023`.
> **Pragmatic:** Building or reviewing a web page, product screen, document or deck.
> **Audience:** Agents · Oracles

> **A blueprint is a design not yet executed.** This one is: every recipe here is in production. It stays a blueprint because a recipe is how, not whether — the rules are `STD-008`, the values `STD-023`.

## 1. Colour semantics and categorical palettes

Interactive→Turquesa · Success→Verdemar · Emphasis/achievement→Ámbar · Warning/real time→Coral · Error→Grana. **Links** [written decision, previously an accident]: in Nocturno, Verdemar (12.2:1 — Turquesa sits at the limit as running text); in Diurno, turquesa-text `#016E7D`. **Interaction rule over fills with light text: interacting darkens, never lightens** — lightening destroys the contrast exactly when the user is looking. Maximum **three** colors per composition counting the neutral (the data layers §2.5–3.6 don't count: they are encoding). **Coral and Grana do not coexist.** Ámbar is the sun, not the sky: it emphasizes, it does not cover. Nothing means by color alone. Text 4.5:1; large and components 3:1.

### Project categorical palettes
First the six canonicals; then luminosity variants; never foreign hues. Every category carries **name + symbol + color**, all three always. **The only hue exception in the whole system:** the rare blue and the epic purple of the rarity scale (§2.6) — they exist precisely to be read as game categories and not as corporate voice, they live only where rarity lives, and no project can invoke them as precedent.

## 2. Type: family, contrast, composition

**Geist** and **Geist Mono** — Vercel's typeface ([vercel.com/font](https://vercel.com/font)) — across the whole organization. Simplicity, minimalism, speed; Swiss heritage (so declares the Brand & Culture). SIL OFL 1.1; full Latin coverage. Fallbacks: `'Inter','Aptos','Segoe UI',Arial,sans-serif` / `'Consolas','Courier New',monospace`.

**Distribution.** MUST be self-hosted in production: variable woff2 (`Geist-Variable.woff2` 56 KB, `GeistMono-Variable.woff2` 58 KB, in `/assets/fonts/` with their license), `font-display: swap`. Origin: npm package `geist`. CDN only for prototypes.

### The sans / mono contrast
**Sans for what is stated, Mono for what is measured.** Headlines, body and interface in Sans; figures, coordinates, labels, code and technical lore in Mono. The monospace *is* the machine: it resolves the steampunk without themed typefaces.

### Scale
Scale 1.200, base 16 px; pt for the 1920×1080 canvas: `display.xl` 4.300rem/50pt · `display.l` 3.583/42 · `display.m` 2.986/34 · `titulo.l` 2.488/28 · `titulo.m` 2.074/24 · `titulo.s` 1.728/20 · `cuerpo.l` 1.440/17 · `cuerpo.m` 1/14 · `cuerpo.s` 0.875/12 · `etiqueta` 0.750/11 (Mono 500, small caps, tracking `+0.10em`) · `dato.xl` 2.986 Mono 500 · `dato.m` 1 Mono 400. Display weights 500, titles 600; display tracking `-0.03/-0.02em`.

### Composition

Line height 1.1 display / 1.55 body / 1.35 data. Measure 60–75 characters, max 90. Sentence case except labels. Emphasis with weight 600 or Ámbar; italics only for quotes and lore. Figures always tabular Mono. One display level per piece. Widows forbidden in headlines.

## 3. Matter: the signal and the circuit


`0100110001100101…` degrading to `xxxxxx…`, Geist Mono `cuerpo.s`, color `linea.fuerte`, tracking `.15em`. It is real text, not an image. Use: section separator.

**The binary speaks [CANON — direction decision].** The signal is not noise: **it encodes a canon phrase in 8-bit ASCII per character**, followed by the `x` sediment. Whoever decodes the separator finds the promise — the house's easter egg, very much of the Akashic Records: everything leaves a trace. Current phrase:

> **«Leave things better than we found them.»** — 39 characters, 312 bits.

```
010011000110010101100001011101100110010100100000011101000110100001101001011011100110011101110011001000000110001001100101011101000111010001100101011100100010000001110100011010000110000101101110001000000111011101100101001000000110011001101111011101010110111001100100001000000111010001101000011001010110110100101110
```

Rules: the string is **copied** from here or from the `binaria.bits` token (or generated with the §13 kit) — no new noise is invented; the `x` sediment goes **after** the message completes (the signal finishes speaking and then sediments); the separator remains decorative (`aria-hidden`), the message is for whoever reads the code; visual cropping by width does not matter — the DOM always carries the whole phrase. Future easter-egg phrases are added here with their version.

### The circuit — relief

Derived from the **canonical normal map** (`textura-circuito-normal.png`, 4096², greeble panel: the Second Industrial Revolution meeting the digital, literally). Delivered derivatives:

| Asset | Format | Weight | Use | Distribution |
|---|---|---|---|---|
| `textura-circuito-normal.png` | PNG 4096² | 9.5 MB | 3D material (PBR normal channel, Three.js — Numinia's stack) | **materials** |
| `textura-relieve-nocturno-768.webp` | WebP 768² | 14 KB | **CSS**: Nocturno backgrounds, baked at 5.5 % | kit |
| `textura-relieve-nocturno.png` | PNG 1536² | 683 KB | High quality: covers, screen print, OG | kit |
| `textura-relieve-alpha.webp` | WebP 1536² RGBA | 695 KB | Arena lines over transparency, for baking derivatives | **materials** |

**Two packages, one reason:** the **kit** carries what a web repository needs in production (~1.5 MB); the **materials** (4096² normal and baking alpha, ~10 MB) travel separately, to the 3D and design repository — heavy material does not move into every web.

```css
.hero { background: var(--fondo-base) url("textura-relieve-nocturno-768.webp") center/cover; }
```

**Where yes:** Nocturno hero background, deck covers, OG images, wide separator bands, 3D materials.
**Where no:** in Diurno (paper is paper); on cards, modals and every elevated surface (they stay flat); behind long reading; above **6 %** visibility; as button or icon fill; in direct `repeat` (**it does not tile** — verified; use `cover` or mirror).
The texture MUST NOT drop the text's effective contrast below AA; the delivered bake keeps ≥15:1 against Arena.

## 4. The era patina

Seed of the photography and illustration direction: every image is treated toward **one** of the three decades, without leaving the warm world or the veil (§5.2). Three patinas:

| Patina | Decade | Treatment | Allowed accent |
|---|---|---|---|
| **Bronce** | 1920 | Warm duotone Noche→Bronce/veiled Arena; visible fine grain; soft antique-silver contrast | Ámbar (one light source) |
| **Señal** | 2020 | Full Noche veil; hard contrast; a single cold punctual flash (screen, sign, light) | Turquesa or Coral (one, never both) |
| **Jardín** | 2120 | Warm natural morning light; vivid greens; air and breath; the veil MAY lighten to `.60` if no text sits on top | Verdemar and Verde |

Rules: one patina per piece; the patina does not change the palette — it interprets it; portraits of people always in Bronce or Jardín (the Señal dehumanizes); with text on top, the veil returns to `.72` whatever the patina. Pending validation with six real photographs — then it will ascend to a full direction.

## 5. Icon use and the mode switch


**Yes:** action, object and navigation, with a text label on first use per piece; one concept = one icon across the whole system; they inherit `currentColor` and only take accent when the adjacent text takes it.
**No:** as decorative bullets; mixing weights in the same interface row; recoloring them outside the system; using them without meaning.
A custom icon only if Phosphor does not cover the concept; it is drawn on its grid and proposed here as an extension. **The scarab and the Moon are not icons: they are marks** — the sequence marker's phases are built as a proper geometric glyph, not with Phosphor's `moon`.

### The mode switch
Every public web carries it (`STD-008` DSN-016). The `moon-stars` / `sun` pair is one piece, not two loose icons. **Hard rule: the icon shows the mode a tap leads to, not the mode you are in** — the moon with stars invites the Nocturno, the sun invites the Diurno. Only one visible at a time, in `regular` 20 px, among the bar's utilities (`BLU-009` §12). Behavior canonized from production: while nobody chooses, the page **follows the operating system** and changes with it at nightfall; an explicit choice ends the following and is remembered; the preference is applied **before painting** so the page does not flash. The state is written on the document as `data-modo`, and its **absence means Nocturno** — light mode is always declared explicitly.

## 6. Brand: how yes, how no


Arena over Nocturno, Noche over Diurno — **the signature has no color version**; color over the brand exists, but lives in another register: the brand play (`CAN-008`). Respect area = the height of the «n» on all four sides. Minimums: wordmark 24 px / 12 mm; brandmark-favicon 16 px. Over image: veil `rgba(20,17,15,.72)` minimum. Over the circuit texture: only inside a **calm zone** (flat area equal to twice the respect area).

### How no

DO NOT recolor to accents (the brand does not compete with the signal) · DO NOT rotate or tilt · NO shadows, gradients or reliefs · DO NOT deform proportions · DO NOT enclose in foreign shapes · NOT over an active background without veil · NO `Numinia_Word` signing the corporate · **DO NOT redraw the scarab**: the canonical path (below) is the only valid one — it replaces any previous reconstruction. Single closed exception: the canonical pixel sprite of the pixel register (`CAN-008`), which is not redrawn either — the delivered one is used.

## 7. Components

All demonstrated live in `index.html`.

### Buttons

| Type | Style | When |
|---|---|---|
| **Primary** | Action fill `#017C8D`, white text | The main action. **One per view**. On Platform, the primary is ink (`BLU-014`) |
| **Ghost** | Transparent, `linea.fuerte` border; hover border+text Verdemar | Secondary action |
| **Quiet** | Verdemar text only, underline on hover | Tertiary action |
| **Destructive** | Grana fill, white text | Irreversible. **Confirmation mandatory. Never next to the primary** |

Specification: `control` radius (6 px), padding `10×24`, height M 40 px / S 32 px, weight 500. **Action fill `#017C8D`** (white on top 4.9:1 — the canonical Turquesa `#018EA1` gave 3.9 and stays for icons, links and accents). States [corrected in 3.6.0 — interaction **darkens**]: hover `#016E7D` (=turquesa-text, 5.95), active `#015866` (8.1), disabled `superficie` + secondary text + `not-allowed`, loading with **waiting dots** (§9) and locked width. The destructive dragged the same bug: its hover is now `#B02330` (=grana-text, 6.7), never `#E04450`. Optional icon on the left, 16 px, `gap s200`, same color. The label is a **verb that says exactly what happens** and keeps its name across the whole flow. Never all-caps.

### Status pills

Mono `cuerpo.s`, `control` radius, 8 px dot in `currentColor`, border of the color at 40 %. Semantic mapping §2.4. Always with text: the dot never goes alone.

### Input field

`base` background, `linea.fuerte` border, `control` radius, padding `10×16`; label above in `type.etiqueta`; placeholder in tertiary (never as a label substitute); focus = the system's Turquesa outline; error = Grana border + a message that explains what happened and how to continue.

### Card

`superficie` background, `linea.tenue` border, `marco` radius (8 px), padding `s500`, **no texture** (and no shadow in Nocturno; in Diurno, the §4 shadow); hover MAY climb one surface step (§9, elevation). Headline `titulo.s`, body `cuerpo.s` in secondary.

### Datum / KPI

Figure in tabular Mono `dato.xl`, label in `type.etiqueta` tertiary below. The figure's color follows the semantics (§2.4). `base` background with border: the datum is a probe, not a card.

## 8. Messages to the user

How the interface speaks when something happens. Universal template: **what happened + what to do**, in level I, without drama and without empty apology. The mute error ("Something went wrong", with no cause or way out) is FORBIDDEN.

| Piece | When | Anatomy | Hard rules |
|---|---|---|---|
| **Notice (toast)** | result of an action or a system event | elevated surface, `marco` radius, 2 px left border in the semantic color (§2.4), one sentence (optional title), silent close | bottom right (if the progress moon occupies the corner, stack above); auto-close 6 s, paused on hover; max 3 stacked; enters with reveal 02; `aria-live="polite"` — `assertive` only critical |
| **Tooltip** | clarify a control; never contain the essential | one `cuerpo.s` line, `control` radius; **speaks in the opposite mode**: Arena/Noche in Nocturno, Noche/Arena in Diurno | 400 ms delay (0 when chaining); also on keyboard focus; on touch it does not exist — the visible label rules |
| **Tip** | dismissible contextual help | `marco` card with `light` icon + CONSEJO eyebrow + one sentence | dismissed does not return; maximum one per view; never blocks |
| **Load error** | a resource does not arrive | empty state: `light` icon 48 px + what happened + **one** action (Retry, ghost) | does not blame the user; no typing — the error is not theatre; if the cause is known, it is said |
| **Field validation** | invalid datum | message under the field: what happened and how to fix it (§8.3) | never color alone; on submit, focus goes to the first field with an error |
| **Destructive confirmation** | before the irreversible | minimal `marco` dialog: verb in the title, consequence in one sentence, [Cancel ghost] [Destructive verb] | the destructive never pre-focused; Esc cancels; the verb repeats, not "Accept" |

## 9. Form controls and product pieces

The carpentry that was missing, unified by a single rule: **the active dresses in ink** — checked box, switched-on toggle, chosen option, current page and active row use the same ink pill/fill (Noche over light, Arena over dark) as the Platform's sidebar. Symmetric between modes, 16:1, zero decisions per control. State transitions (≤ `120 ms`) are states, not pieces of the §9 catalogue.

| Control | Specification | Hard rules |
|---|---|---|
| **Checkbox** | 18×18, `control` radius, `linea.fuerte` border; checked = ink fill + paper check; indeterminate = dash | label on the right, always clickable; error per §8.3 |
| **Option (radio)** | 18 circle, 8 inner dot in ink | group with a visible legend; never a single option |
| **Switch** | 36×20 capsule, 14 disc; off = surface + secondary disc; on = ink + paper disc | always with a label; the state also reads by position; for immediate actions (does not replace the checkbox in submitted forms) |
| **Select** | closed = §8.3 field + `caret-down` regular 16; open = `elevada` panel, `marco` radius, §4 shadow in Diurno; options in 40 px rows; **chosen = ink/paper pill** | full keyboard (arrows, Enter, Esc, typing jumps); max 7 visible + scroll; the native MAY in simple forms and SHOULD on mobile |
| **Modal dialog** | **canonical veil `rgba(20,17,15,.72)`** — the same piece that protects the brand over image; `elevada` panel, `marco` radius, 480 px (confirmation) / 640 (content); enters with reveal 02 | focus trapped and first focus on the safe control; Esc closes; the background does not scroll; destructive confirmation follows §8.7 |
| **Pagination** | Mono; `‹ 1 2 … 9 ›`; **current = ink/paper pill**; touch 44 | always states the total («3 de 9» in `etiqueta`); «Load more» MAY in continuous flows |
| **Progress bar** | 4 px, capsule; track `linea.fuerte`, **ink fill**; ALWAYS with a Mono figure beside it | **only with a real known percentage** — the indeterminate is forbidden: that is what the moon (§9.1-06) and the dots (07) exist for. Expressive variant [EXTENSION — validate]: the binary filling up — bits replacing sediment |

**Progress selection rule:** discrete sequence or reading? moon. Short unmeasured wait? dots. Real percentage? bar. Three shapes, zero ambiguity.

**Velo nuance (5.0.0):** on Velo-register surfaces, the modal MAY enter by **crystallization** (§9.1-11) instead of reveal 02; the background veil is still the canonical `velo.imagen` and the focus rules do not change. In the Umbral, the modal does not change.

---

## 10. Motion: forbidden, and the typing reference


*5.0.0 amendment: the Velo's sky (§9.1-14) is the only sanctioned exception to the ambient-loop veto; any other remains forbidden.*

Parallax. **Glitch** (tempting with cyber at 20 %: it breaks the solar calm and accessibility). Ambient loops outside the sweep. Animating reading-text color. Animating focus. Autoplay with sound.

### Typing implementation reference

The full text MUST be in the DOM before animating (SEO and accessibility): `aria-label` is set with the complete content, text nodes are emptied preserving the markup, they are written at `22 ms` with the `▌` cursor following the writing, and on finish cursor and `aria-label` are removed. Without JS or with reduced motion: the text simply is.

## 11. Accessibility


**WCAG 2.2 AA** (EN 301 549, EU legal obligation). Contrast 4.5:1 / 3:1. Focus always visible. Keyboard in logical order. Nothing by color alone — rarity included. Touch 44×44. Text alternative on informative images. `prefers-reduced-motion` respected (§9). At events: signage legible at 10 m without depending on color; instructions also in level I.

---

## 12. The web page

Nocturno, 12 col ≤1280 px, hero = the thesis with relief at the back and headline typing (the orchestrated moment); level II on home, I/III on inner pages; LCP < 2.5 s, < 1 MB initial; fonts and icons self-hosted.

**Hero skeleton** (annotated; the piece's only orchestrated moment):

```html
<section class="hero"><!-- background: var(--fondo) url(assets/textura-relieve-nocturno-768.webp) center/cover -->
  <div class="marca"><!-- isotipo del escarabajo 44px + wordmark 20px, ambos en var(--arena) --></div>
  <h1 data-tecleo>La tesis en una frase, con <span style="color:var(--ambar)">una palabra</span> en Ámbar.</h1>
  <p class="sub"><!-- cuerpo.l, texto-2, máx 56ch, nivel II --></p>
  <a class="btn btn-primario" href="#"><!-- verbo exacto; ÚNICO primario de la vista --></a>
  <div class="binaria" aria-hidden="true">0100110001100101…xxxx</div><!-- la frase del canon en 8 bits: `BLU-009` §3 · binaria() del kit -->
</section>
```

Following sections: `eyebrow` → `h2` → prose/cards with `.reveal`; at most one signal `barrido` per view.

**The menu** (web and public platform): one-line top bar — wordmark on the left; **≤5 entries** in Mono `type.etiqueta` uppercase; utilities on the right (language, mode, GitHub/X) as Phosphor `regular` 20 px icons; active entry with a 2 px Ámbar underline; on mobile, a full-screen panel with the same entries and nothing else. The menu is skin, not architecture: which entries exist is each product's decision.

## 13. Product and interface

Nocturno by default, level I, Turquesa for the interactive, Phosphor by weight (`STD-023` §10), rarity (`STD-023` §4) where objects and rewards exist.

## Check

After the general checklist of `PRO-014` §4, and before delivering:

- [ ] Hero = the thesis with relief at the back and headline typing: the only orchestrated moment; at most one `barrido` per view.
- [ ] Menu: ≤5 entries in Mono uppercase; active with a 2 px Ámbar underline; mobile = full-screen panel, nothing else.
- [ ] LCP < 2.5 s, < 1 MB initial; fonts and icons self-hosted.
- [ ] Controls (§9): active in ink, label always, modal with the canonical veil and trapped focus, `aria-sort` on tables, bar only with a real percentage.
- [ ] Messages (§8): cause + way out, never mute.
- [ ] Era only through sanctioned devices: `1920 · 2020 · 2120` seal, single patina (§4); with them removed, still the System's.

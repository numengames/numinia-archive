---
id: "STD-008"
uid: ""
title: "Design tokens"
type: documentation
subtype: standard
status: draft
version: "7.4.0"
created: "2026-08-18T13:41:01Z"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
registration: registered
related: ["CAN-008", "STD-023", "PRO-014", "STD-010", "ADR-044"]
license: "CC0-1.0"
series_change: "7.4.0 — 2026-09-25: written in plain words, at the Oracle's word in session, and the outside design tokens format leaves the external standards and joins the rule that already said every value lives in the token file. No colour code, file name, plate or acronym in the reading; exact values and checks wait in tables at the foot. 7.3.0 — 2026-09-24: DSN-016 (day and night on every site): every public web carries the moon/sun switch BLU-009 §5 specifies; until now the recipe said how, not that every site must. Minor by VER-022 (new obligation); at the Oracle's word in session (VER-064). 7.2.1 — 2026-09-24: DSN-012 counts fifteen animations (the reading light, STD-023 §14 no. 15); the reading light is not an ambient loop, so the sanctioned two are untouched. Patch: the rule is unchanged, only its count. 7.2.0 — 2026-09-18: DSN-015 (a site says what it stores) with its check. Minor by VER-022; moved at the Oracle's word in session (VER-064). 7.1.0 — 2026-09-17: two rules added, DSN-013 (one house, one footer) and DSN-014 (a link presents itself), with their checks; they write down what the four sites have served since 2026-09-16 and what the share cards will follow. Minor by VER-022 (new obligations); moved at the Oracle's word in session (VER-064). 7.0.2 — 2026-09-10: status `active` → `draft` under the alpha reset the Oracle ordered on 2026-09-10: the state had been set by agents, not signed one by one. Text unchanged; the state returns to `draft` until the tree meets the standard and the Oracle ratifies it one by one. Patch move (VER-064). 7.0.0 — the standard takes the ADR-043 shape and splits four ways under ADR-044: 9,934 -> 470 words of body here, as twelve plated rules DSN-001..012 (the old DS-01..04 conformance checks are DSN-009..012, same checks); every closed list is the register STD-023; every recipe is a blueprint (BLU-009 web, BLU-010 pixel, BLU-011 book and Velo); the kit source is machine/packages/design-kit. Major: sections §2-§17 were cited by CAN-008 and PRO-014 and no longer exist; those citations are repointed in the same change. Direction prose that CAN-008 §3 already holds is not carried."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Design tokens

> **Summary:** The parts of our design that answer yes or no. Sixteen
> colours and no new ones, four typefaces we serve ourselves, one spacing
> scale, two roundings, one family of icons, fifteen animations, text
> anyone can read, and day and night on every site.
> **Epistemic:** Which parts of the design can be checked, as opposed to
> direction, which is judged.
> **Pragmatic:** Know what an audit of any piece we make can fail on.
> **Audience:** Agents · Oracles

**Binds:** every public surface of Numen Games and Numinia — web, product,
document, deck, codex, pixel scene — and every consumer of the kit.
**Does not bind:** creative direction, matter, motion and voice, which the
visual identity canon holds, nor how a piece is produced.

## Rules

### Colour, type and shape

**The palette is closed.** A piece MUST use only the sixteen colours of the
design values, their text variants and the rarity scale. Ramps and chart
palettes only put them in order. A new colour is a breach, not a variation.

**Type is served by us.** Our four typefaces MUST come from our own server,
with their licences, never from someone else's. A browser MUST NOT be left
to fake a bold, an italic or small capitals.

**Space and shape follow the scale.** Every gap MUST be a step of the
four-pixel scale. A corner is rounded for a control or for a frame, and
nothing else; the pixel style has no rounded corners. Focus is always
visible and never animated.

**One family of icons.** Icons MUST come from our subset of one open icon
family, one weight per row. The thinnest and the two-tone weights are never
used. The scarab and the Moon are marks, not icons.

**Pixels sit whole.** Text and pixel art MUST sit on whole pixels: never
moved by half a pixel, never smoothed when scaled. Line breaks are never
forced with spaces.

### Anyone can read it

**Text is readable in both modes.** Text MUST meet the middle level of the
web's accessibility guidelines, by day and by night. A texture or a veil
MUST NOT lower that contrast. Anything touched is large enough for a finger.

**Colour never speaks alone.** Every state and every category MUST carry a
second sign — a name, a symbol, a position, a border or focus. Rarity too.

**Every public page passes before it ships.** Every public page MUST pass
the accessibility check, by day and by night, before it goes out.

### Motion

**Text comes before motion.** The whole text MUST be on the page before any
animation starts. When a visitor asks for less motion, every decorative
cycle stops and every change of state completes at once.

**Motion is catalogued.** Every animation MUST be one of the fifteen in the
design values. Parallax, glitch, focus that moves, sound that plays by
itself, and endless background loops beyond the two allowed, are forbidden.

### The kit and its values

**The kit is installed, never copied.** The published kit MUST be generated
from its package. A colour, a stylesheet or a copy of the kit edited by hand
is a breach.

**A value exists, or it does not.** Every value a piece uses MUST be in the
token file or in the design values; a value in neither does not exist. The
token file SHOULD follow the common format for design tokens, so every site
and tool reads the same source.

### Every site

**One house, one footer.** Every public site of Numen Games MUST close with
the house footer the design values lay out: the site's written name and its
line, its navigation, a column naming the four sites with this one marked,
the legal texts published for it, and its social accounts. Last comes the
closing line: the scarab, our signature, and the licence, telemetry,
version and commit. There is no copyright notice. The version opens that
site's updates page, and every release to production moves its minor
number.

**A link presents itself.** Every public site MUST carry the scarab as its
icon, and a title and description of its own that say what the reader will
find. A link to it shows a share card, generated from the repository on the
house pattern. No two sites present alike.

**A site says what it stores.** A public site MUST store nothing in the
visitor's browser, and load nothing from anyone else, that the published
cookie policy does not name with its purpose and how long it lasts. What a
service the visitor asked for does not need waits for consent. A consent
given before the list changed stops counting. Nothing measured about a
visitor leaves their device unless the policy names it.

**Day and night on every site.** Every public site of Numen Games MUST serve
both modes, night and day, and carry the mode switch the web recipe
describes. It is one button among the bar's tools, and it shows where a tap
leads: the moon with stars to the night, the sun to the day. The site
follows the visitor's system until they choose. The choice is remembered
under the name the cookie policy gives it, and applied before the page is
painted. A pixel scene, or a surface of the veiled style, keeps its night
inside a day page, framed.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today. Then the exact values the rules
point at.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| DSN-001 | The palette is closed | — | by hand: the value lookup in step 3 of `PRO-014` |
| DSN-002 | Type is served by us | — | by hand: the `PRO-014` checklist |
| DSN-003 | Space and shape follow the scale | — | by hand: the value lookup in step 3 of `PRO-014` |
| DSN-004 | One family of icons | [Phosphor Icons](https://phosphoricons.com/) | by hand: the `PRO-014` checklist |
| DSN-007 | Pixels sit whole | — | by hand: the `PRO-014` checklist; no site checks it (`RPT-021`) |
| DSN-005 | Text is readable in both modes | [WCAG 2.2, level AA](https://www.w3.org/TR/WCAG22/) | axe with Playwright, both modes — numinia.com only (`e2e/a11y.spec.ts`); this archive and the other two sites have no gate (`RPT-021`) |
| DSN-006 | Colour never speaks alone | [WCAG 2.2, use of colour](https://www.w3.org/TR/WCAG22/#use-of-color) | by hand: the `PRO-014` checklist; no site checks it (`RPT-021`) |
| DSN-011 | Every public page passes before it ships | [WCAG 2.2, level AA](https://www.w3.org/TR/WCAG22/) | as DSN-005: numinia.com only |
| DSN-008 | Text comes before motion | [Media query for reduced motion](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion) | by hand: the `PRO-014` checklist |
| DSN-012 | Motion is catalogued | — | by hand: the `PRO-014` checklist, against the catalogue in `STD-023` |
| DSN-009 | The kit is installed, never copied | — | `node machine/tools/generate-design-kit.mjs --check` — byte-identical; runs in no consumer's CI (`RPT-021`) |
| DSN-010 | A value exists, or it does not | [W3C design tokens format](https://www.designtokens.org/tr/drafts/format/) | by hand: the value lookup in step 3 of `PRO-014`; the token file is written in that format today (every value under `$value`), and no tool validates it against the format |
| DSN-013 | One house, one footer | — | `check-version-bump` in each site's CI, all four: a change to the site moves the version and writes its updates page |
| DSN-014 | A link presents itself | [Open Graph protocol](https://ogp.me/) | `share-card --check` in each site's CI, all four: the card exists at its size and the head carries icon, title, description and image |
| DSN-015 | A site says what it stores | [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) and the ePrivacy Directive, article 5(3) | nothing yet: `check-storage` is described, and runs in none of the four sites (`RPT-021`) |
| DSN-016 | Day and night on every site | — | Playwright on numinia.com only (`preferences.spec.ts`): the switch exists, a tap swaps mode and icon, a reload keeps the choice |

| Rule | Exact value |
|---|---|
| The palette is closed | the sixteen colours, text variants and rarity scale of `STD-023` |
| Type is served by us | Geist, Geist Mono, Pixelify Sans and Alegreya, variable `woff2`, from `/assets/fonts/` with their licence files |
| Space and shape follow the scale | spacing 4 px base; radius `control` 6 px, `frame` 8 px; focus `outline: 2px solid` Turquesa, offset 2 px |
| One family of icons | Phosphor, the house subset; `thin` and `duotone` never |
| Text is readable in both modes | contrast 4.5:1, 3:1 for large text and components; touch targets 44 × 44 px |
| Text comes before motion | `prefers-reduced-motion: reduce` |
| The kit is installed, never copied | source `machine/packages/design-kit/`; published to `web/public/design/kit/` with a sha256 manifest |
| A value exists, or it does not | `machine/packages/design-kit/sistema.tokens.json`, in the W3C design tokens format (`$value`, `$type`) |
| One house, one footer | closing line `by Numen Games — we build for a better future.`, then `licence · telemetry · version · commit`; the version links to `/updates` |
| A link presents itself | favicon as SVG, PNG and Apple touch icon; share card 1200 × 630; `og:image` |
| A site says what it stores | the inventory of `OPS-010`; `document.cookie`, `localStorage`, `sessionStorage`, third-party `<script src>` |
| Day and night on every site | the modes Nocturno and Diurno; storage key `numinia-modo`; attribute `data-modo` on the document, absent meaning Nocturno; the switch as in `BLU-009` |

## Why

A design system is mostly direction, and direction cannot fail a check.
These sixteen rules are the exceptions: each is a number, a file or a
property of the page that either holds or does not. Keeping them apart lets
the direction change freely while the checks stay stable, and lets another
organisation install the kit and keep the checks without inheriting our
taste.

## References

| ID | Name | Why cited |
|---|---|---|
| `CAN-008` | Visual identity | the direction this standard does not encode |
| `STD-023` | Design values | every closed list the rules point at |
| `PRO-014` | Producing a design piece | the manual checks and their order |
| `ADR-044` | Consumers install packages | why the kit is a package |
| `OPS-010` | Cookie Policy — Numen Games | the inventory every site is held to |

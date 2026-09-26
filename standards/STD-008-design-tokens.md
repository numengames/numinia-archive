---
id: "STD-008"
uid: ""
title: "Design tokens"
type: documentation
subtype: standard
status: draft
version: "10.0.1"
created: "2026-08-18T13:41:01Z"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
registration: registered
related: ["CAN-008", "STD-023", "STD-034", "STD-037", "PRO-014", "STD-010", "ADR-044"]
license: "CC0-1.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Design tokens

> **Summary:** The parts of our design that answer yes or no. Sixteen
> colours and no new ones, four typefaces we serve ourselves, one spacing
> scale, two roundings, one family of icons, fifteen animations, and one
> kit installed from its package.
> **Epistemic:** What a piece of our design can fail an audit on, and which
> of it is our choice, an outside norm, or the law.
> **Pragmatic:** Know what an audit of any piece we make can fail on.
> **Audience:** Agents · Oracles

**Binds:** every public surface of Numen Games and Numinia — web, product,
document, deck, codex, pixel scene — and every consumer of the kit.

## Rules

Contrast, colour as a signal, focus, the keyboard and stopping motion
belong to the accessibility standard; the rules here add only what is ours
or what another outside norm asks of design.

### Colour, type and shape

**The palette is closed.** A piece MUST use only the sixteen colours of the
design values, their text variants and the rarity scale; ramps and chart
palettes only put them in order. Our choice: a new colour is a breach, not
a variation.

**Type is served by us.** Our four typefaces MUST come from our own server,
with their licences, and every page switches off the browser's fake bold,
italic and small capitals with the one setting the web's fonts standard
gives for it, which a tool can check. Serving them ourselves also keeps
visitors' addresses away from a font company, which European data
protection law requires of us.

**Space and shape follow the scale.** Every gap MUST be a step of the
four-pixel scale; a corner is rounded for a control or for a frame, and
nothing else, and the pixel style has no rounded corners. Our choice.

**One family of icons.** Icons MUST come from our subset of one open icon
family, one weight per row, never the thinnest or the two-tone. Its licence
lets anyone use it on one condition, that its copyright notice ships with
it. The scarab and the Moon are marks, not icons.

**Pixels sit whole.** Text and pixel art MUST sit on whole pixels, never
moved by half a pixel, never smoothed when scaled. Lines are never broken
with spaces: the web accessibility guidelines count that as a failure,
because a screen reader or a narrow screen then reads the text out of
order.

### What we add to accessibility

**Texture never costs contrast, and a finger always fits.** A texture, a
veil or a glow MUST NOT lower the contrast the accessibility standard sets,
by day or by night, and anything touched is forty-four pixels a side. The
guidelines ask twenty-four at their middle level and forty-four at their
highest; we take the highest, by choice.

### Motion

**Text comes before motion.** The page's main text MUST be painted before
any animation starts and within two and a half seconds, with the layout
shifting under the reader by less than a tenth: the two figures the web's
page-experience measures use. Our choice, and it turns an impression into
a number anyone can measure.

**Motion is catalogued.** Every animation MUST be one of the fifteen in the
design values; parallax, glitch, focus that moves, sound that plays by
itself, and endless background loops beyond the two allowed, are
forbidden. The guidelines only ask that sound can be stopped; we allow
none, by choice. The two allowed loops still carry the pause the
accessibility standard requires.

### The kit and its values

**The kit is installed, never copied.** The published kit MUST be generated
from its package. By choice its number follows semantic versioning, so a
consumer knows from the number alone whether an update can break them,
and every file carries a fingerprint of the kind browsers use to refuse a
tampered file.

**A value exists, or it does not.** Every value a piece uses MUST be in the
token file or in the design values; a value in neither does not exist. The
token file follows, by choice, the first stable design tokens format, so
any tool can read it and a validator can prove it is well formed.

What every public site carries — the footer, the card a shared link shows,
and day and night — is a standard of its own.

## Check

Each rule, its code, its source and its check. Then the exact values the rules
point at. **Law** marks what a statute requires; everything else is a norm we
adopt, or our own choice.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| DSN-001 | The palette is closed | — (ours) | by hand: the value lookup in step 3 of `PRO-014` |
| DSN-002 | Type is served by us | [CSS Fonts 4, `font-synthesis`](https://www.w3.org/TR/css-fonts-4/#font-synthesis-prop); [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 6 — **law**: a visitor's IP sent to a third-party font host needs a legal basis | by hand: the `PRO-014` checklist; no check reads `font-synthesis: none` yet |
| DSN-003 | Space and shape follow the scale | — (ours); the focus clause moved to `ACC-002` | by hand: the value lookup in step 3 of `PRO-014` |
| DSN-004 | One family of icons | [Phosphor Icons](https://phosphoricons.com/), [MIT licence](https://opensource.org/license/mit): the notice ships (licence condition); names for icon-only buttons are `ACC-003` | by hand: the `PRO-014` checklist; the notice is declared in `REUSE.toml` and `LICENSES/MIT.txt` |
| DSN-007 | Pixels sit whole | [WCAG 2.2 failure F32](https://www.w3.org/WAI/WCAG22/Techniques/failures/F32), under SC 1.3.2 Meaningful Sequence (A), for the line-break clause; the rest ours | by hand: the `PRO-014` checklist; no site checks it (`RPT-021`) |
| DSN-005 | Texture never costs contrast, and a finger always fits | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) SC 1.4.3 and 1.4.11 through `ACC-002`, applied over veils and textures in both modes (ours); SC 2.5.8 Target Size (Minimum) AA is 24 × 24, SC 2.5.5 Target Size (Enhanced) AAA is 44 × 44 | axe with Playwright, both modes — numinia.com only (`e2e/a11y.spec.ts`); axe does not judge text over images nor measure 44 px; the other three sites have no gate (`RPT-021`) |
| DSN-008 | Text comes before motion | [Core Web Vitals](https://web.dev/articles/vitals): LCP ≤ 2.5 s, CLS ≤ 0.1; reduced motion and pausing moved to `ACC-005` | nothing measures it on any site yet |
| DSN-012 | Motion is catalogued | WCAG 2.2 SC 1.4.2 Audio Control (A) — stricter: no autoplay sound at all; pause, flashes and reduced motion are `ACC-005` | by hand: the `PRO-014` checklist, against the catalogue in `STD-023` |
| DSN-009 | The kit is installed, never copied | [Semantic Versioning 2.0.0](https://semver.org/) for the package; [Subresource Integrity](https://www.w3.org/TR/SRI/) for the sha256 manifest | `node machine/tools/generate-design-kit.mjs --check` — byte-identical; runs in no consumer's CI (`RPT-021`); the manifest holds hex digests, not yet `integrity` values |
| DSN-010 | A value exists, or it does not | [Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/) (first stable) | by hand: the value lookup in step 3 of `PRO-014`; the file uses `$value` and `$type`; Terrazzo or Style Dictionary could validate it, and neither runs today |

| Rule | Exact value |
|---|---|
| The palette is closed | the sixteen colours, text variants and rarity scale of `STD-023` |
| Type is served by us | Geist, Geist Mono, Pixelify Sans and Alegreya, variable `woff2`, from `/assets/fonts/` with their licence files; `font-synthesis: none` |
| Space and shape follow the scale | spacing 4 px base; radius `control` 6 px, `frame` 8 px |
| One family of icons | Phosphor, the house subset; `thin` and `duotone` never |
| Texture never costs contrast, and a finger always fits | the ratios of `ACC-002`, measured over the veil or texture; touch targets 44 × 44 px |
| Text comes before motion | LCP ≤ 2.5 s, CLS ≤ 0.1 |
| The kit is installed, never copied | source `machine/packages/design-kit/`; published to `web/public/design/kit/` with a sha256 manifest |
| A value exists, or it does not | `machine/packages/design-kit/sistema.tokens.json`, Design Tokens Format Module 2025.10 (`$value`, `$type`) |

## Why

A design system is mostly direction, and direction cannot fail a check.
These rules are the exceptions: each is a number, a file or a property of
the page that holds or does not. Where the world already has a norm we
follow it by name, so an auditor checks us with tools they already know;
what is left is ours, and says so. It runs past the usual length because
each rule now says which norm it follows and whether the law asks it.

## References

| ID | Name | Why cited |
|---|---|---|
| `CAN-008` | One identity, three forces | the direction this standard does not encode |
| `STD-023` | Design values | every closed list the rules point at |
| `STD-034` | Accessibility | contrast, colour, focus, keyboard and motion, which this standard only adds to |
| `PRO-014` | Producing a design piece | the manual checks and their order |
| `STD-037` | What every site carries | the footer, the share card and day and night |

---
id: "STD-008"
uid: ""
title: "Design tokens"
type: documentation
subtype: standard
status: draft
version: "8.0.0"
created: "2026-08-18T13:41:01Z"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
registration: registered
related: ["CAN-008", "STD-023", "STD-034", "PRO-014", "STD-010", "ADR-044", "OPS-010"]
license: "CC0-1.0"
series_change: "8.0.0 — 2026-09-25: every rule an outside norm owns now follows it by name and says whether the law requires it, colour-alone and the page gate retire into the accessibility standard (DSN-006 → ACC-002, DSN-011 → ACC-004), and reduced motion and focus move there too. 7.4.0 — 2026-09-25: written in plain words, at the Oracle's word in session, and the outside design tokens format leaves the external standards and joins the rule that already said every value lives in the token file. No colour code, file name, plate or acronym in the reading; exact values and checks wait in tables at the foot. 7.3.0 — 2026-09-24: DSN-016 (day and night on every site): every public web carries the moon/sun switch BLU-009 §5 specifies; until now the recipe said how, not that every site must. Minor by VER-022 (new obligation); at the Oracle's word in session (VER-064). 7.2.1 — 2026-09-24: DSN-012 counts fifteen animations (the reading light, STD-023 §14 no. 15); the reading light is not an ambient loop, so the sanctioned two are untouched. Patch: the rule is unchanged, only its count. 7.2.0 — 2026-09-18: DSN-015 (a site says what it stores) with its check. Minor by VER-022; moved at the Oracle's word in session (VER-064). 7.1.0 — 2026-09-17: two rules added, DSN-013 (one house, one footer) and DSN-014 (a link presents itself), with their checks; they write down what the four sites have served since 2026-09-16 and what the share cards will follow. Minor by VER-022 (new obligations); moved at the Oracle's word in session (VER-064). 7.0.2 — 2026-09-10: status `active` → `draft` under the alpha reset the Oracle ordered on 2026-09-10: the state had been set by agents, not signed one by one. Text unchanged; the state returns to `draft` until the tree meets the standard and the Oracle ratifies it one by one. Patch move (VER-064). 7.0.0 — the standard takes the ADR-043 shape and splits four ways under ADR-044: 9,934 -> 470 words of body here, as twelve plated rules DSN-001..012 (the old DS-01..04 conformance checks are DSN-009..012, same checks); every closed list is the register STD-023; every recipe is a blueprint (BLU-009 web, BLU-010 pixel, BLU-011 book and Velo); the kit source is machine/packages/design-kit. Major: sections §2-§17 were cited by CAN-008 and PRO-014 and no longer exist; those citations are repointed in the same change. Direction prose that CAN-008 §3 already holds is not carried."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Design tokens

> **Summary:** The parts of our design that answer yes or no. Sixteen
> colours and no new ones, four typefaces we serve ourselves, one spacing
> scale, two roundings, one family of icons, fifteen animations, one
> footer, and day and night on every site.
> **Epistemic:** Which parts of the design are our own choice, which follow
> an outside norm, and which the law requires.
> **Pragmatic:** Know what an audit of any piece we make can fail on.
> **Audience:** Agents · Oracles

**Binds:** every public surface of Numen Games and Numinia — web, product,
document, deck, codex, pixel scene — and every consumer of the kit.
**Does not bind:** creative direction, matter, motion and voice, which the
visual identity canon holds, nor what the accessibility standard requires.

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

### Every site

**One house, one footer.** Every public site of Numen Games MUST close with
the house footer the design values lay out: the site's written name and
its line, its navigation, a column naming the four sites with this one
marked, the legal texts published for it, and its social accounts. Last
comes the closing line: the scarab, our signature, and the licence,
telemetry, version and commit; there is no copyright notice. The version
opens the updates page and moves its minor number with every release, a
house rule, not semantic versioning. Spanish law on online services
requires every visitor to reach the company's name, address, registry
entry and tax number, so the legal texts include that notice.

**A link presents itself.** Every public site MUST carry the scarab as its
icon, a title of its own on every page, and the four open graph properties
that turn a link into a card: title, type, image and address. The
guidelines require the title, so a listener knows where they are; the
scarab and the card on the house pattern are ours.

**A site says what it stores.** A public site MUST ask consent before it
stores anything in the visitor's browser that the service they asked for
does not need. European and Spanish law require it, and the Spanish data
protection agency adds that refusing is as easy as accepting and that
consent is asked again when the purposes change; a preference the visitor
set, like the mode, needs none. By choice we go further: nothing is stored,
loaded from anyone else, or measured and sent from the visitor's device
unless the cookie policy names it with its purpose and duration, and any
change to that list asks again.

**Day and night on every site.** Every public site of Numen Games MUST
serve both modes, by choice, and carry the mode switch the web recipe
describes: the moon with stars leads to night, the sun to day. The site
follows the visitor's system through the web's colour scheme query until
they choose, remembers the choice under the name the cookie policy gives
it, and applies it before painting; the switch behaves as the accessible
rich internet applications practices describe a button. A pixel scene, or
a veiled surface, keeps its night inside a day page, framed.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today. Then the exact values the rules
point at. **Law** marks what a statute requires; everything else is a norm
we adopt, or our own choice.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| DSN-001 | The palette is closed | — (ours) | by hand: the value lookup in step 3 of `PRO-014` |
| DSN-002 | Type is served by us | [CSS Fonts 4, `font-synthesis`](https://www.w3.org/TR/css-fonts-4/#font-synthesis-prop); [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) art. 6 — **law**: a visitor's IP sent to a third-party font host needs a legal basis | by hand: the `PRO-014` checklist; no check reads `font-synthesis: none` yet |
| DSN-003 | Space and shape follow the scale | — (ours); the focus clause moved to `ACC-002` | by hand: the value lookup in step 3 of `PRO-014` |
| DSN-004 | One family of icons | [Phosphor Icons](https://phosphoricons.com/), [MIT licence](https://opensource.org/license/mit): the notice ships (licence condition); names for icon-only buttons are `ACC-003` | by hand: the `PRO-014` checklist; the notice is declared in `REUSE.toml` and `LICENSES/MIT.txt` |
| DSN-007 | Pixels sit whole | [WCAG 2.2 failure F32](https://www.w3.org/WAI/WCAG22/Techniques/failures/F32), under SC 1.3.2 Meaningful Sequence (A), for the line-break clause; the rest ours | by hand: the `PRO-014` checklist; no site checks it (`RPT-021`) |
| DSN-005 | Texture never costs contrast, and a finger always fits | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) SC 1.4.3 and 1.4.11 through `ACC-002`, applied over veils and textures in both modes (ours); SC 2.5.8 Target Size (Minimum) AA is 24 × 24, SC 2.5.5 Target Size (Enhanced) AAA is 44 × 44 — ours by choice | axe with Playwright, both modes — numinia.com only (`e2e/a11y.spec.ts`); axe does not judge text over images nor measure 44 px; the other three sites have no gate (`RPT-021`) |
| DSN-006 | retired → `ACC-002` | WCAG 2.2 SC 1.4.1 Use of Color | — |
| DSN-011 | retired → `ACC-004` | WCAG 2.2, level AA | — |
| DSN-008 | Text comes before motion | [Core Web Vitals](https://web.dev/articles/vitals): LCP ≤ 2.5 s, CLS ≤ 0.1 — ours by choice; reduced motion and pausing moved to `ACC-005` | nothing measures it on any site yet |
| DSN-012 | Motion is catalogued | WCAG 2.2 SC 1.4.2 Audio Control (A) — stricter: no autoplay sound at all; pause, flashes and reduced motion are `ACC-005` | by hand: the `PRO-014` checklist, against the catalogue in `STD-023` |
| DSN-009 | The kit is installed, never copied | [Semantic Versioning 2.0.0](https://semver.org/) for the package; [Subresource Integrity](https://www.w3.org/TR/SRI/) for the sha256 manifest | `node machine/tools/generate-design-kit.mjs --check` — byte-identical; runs in no consumer's CI (`RPT-021`); the manifest holds hex digests, not yet `integrity` values |
| DSN-010 | A value exists, or it does not | [Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/) (first stable) | by hand: the value lookup in step 3 of `PRO-014`; the file uses `$value` and `$type`; Terrazzo or Style Dictionary could validate it, and neither runs today |
| DSN-013 | One house, one footer | [LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) art. 10 — **law**: the provider's identity reachable from every site; the version rule is ours and is not SemVer | `check-version-bump` in each site's CI, all four; the legal notice by hand |
| DSN-014 | A link presents itself | [Open Graph protocol](https://ogp.me/): `og:title`, `og:type`, `og:image`, `og:url` required; WCAG 2.2 SC 2.4.2 Page Titled (A); [HTML `rel=icon`](https://html.spec.whatwg.org/multipage/links.html#rel-icon); scarab and 1200 × 630 card ours | `share-card --check` in each site's CI, all four: card size, icon, title, description and image; `og:type` and `og:url` not checked |
| DSN-015 | A site says what it stores | [ePrivacy Directive](https://eur-lex.europa.eu/eli/dir/2002/58/oj) art. 5(3); [LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) art. 22.2; [AEPD cookie guide, July 2023](https://www.aepd.es/guias/guia-cookies.pdf) — **law**; the named inventory is ours, stricter | nothing yet: `check-storage` is described, and runs in none of the four sites (`RPT-021`) |
| DSN-016 | Day and night on every site | [Media Queries 5, `prefers-color-scheme`](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme); [WAI-ARIA APG button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Playwright on numinia.com only (`preferences.spec.ts`): the switch exists, a tap swaps mode and icon, a reload keeps the choice |

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
| One house, one footer | closing line `by Numen Games — we build for a better future.`, then `licence · telemetry · version · commit`; the version links to `/updates` |
| A link presents itself | favicon as SVG, PNG and Apple touch icon; share card 1200 × 630; `og:title`, `og:type`, `og:image`, `og:url` |
| A site says what it stores | the inventory of `OPS-010`; `document.cookie`, `localStorage`, `sessionStorage`, third-party `<script src>` |
| Day and night on every site | the modes Nocturno and Diurno; storage key `numinia-modo`; attribute `data-modo` on the document, absent meaning Nocturno; the switch as in `BLU-009` |

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
| `CAN-008` | Visual identity | the direction this standard does not encode |
| `STD-023` | Design values | every closed list the rules point at |
| `STD-034` | Accessibility | contrast, colour, focus, keyboard and motion, which this standard only adds to |
| `PRO-014` | Producing a design piece | the manual checks and their order |
| `OPS-010` | Cookie Policy — Numen Games | the inventory every site is held to |

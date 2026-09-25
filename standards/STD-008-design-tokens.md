---
id: "STD-008"
uid: ""
title: "Design tokens"
type: documentation
subtype: standard
status: draft
version: "7.3.0"
created: "2026-08-18T13:41:01Z"
updated: "2026-09-24T17:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
registration: registered
related: ["CAN-008", "STD-023", "PRO-014", "STD-010", "ADR-044"]
license: "CC0-1.0"
series_change: "7.3.0 — 2026-09-24: DSN-016 (day and night on every site): every public web carries the moon/sun switch BLU-009 §5 specifies; until now the recipe said how, not that every site must. Minor by VER-022 (new obligation); at the Oracle's word in session (VER-064). 7.2.1 — 2026-09-24: DSN-012 counts fifteen animations (the reading light, STD-023 §14 no. 15); the reading light is not an ambient loop, so the sanctioned two are untouched. Patch: the rule is unchanged, only its count. 7.2.0 — 2026-09-18: DSN-015 (a site says what it stores) with its check. Minor by VER-022; moved at the Oracle's word in session (VER-064). 7.1.0 — 2026-09-17: two rules added, DSN-013 (one house, one footer) and DSN-014 (a link presents itself), with their checks; they write down what the four sites have served since 2026-09-16 and what the share cards will follow. Minor by VER-022 (new obligations); moved at the Oracle's word in session (VER-064). 7.0.2 — 2026-09-10: status `active` → `draft` under the alpha reset the Oracle ordered on 2026-09-10: the state had been set by agents, not signed one by one. Text unchanged; the state returns to `draft` until the tree meets the standard and the Oracle ratifies it one by one. Patch move (VER-064). 7.0.0 — the standard takes the ADR-043 shape and splits four ways under ADR-044: 9,934 -> 470 words of body here, as twelve plated rules DSN-001..012 (the old DS-01..04 conformance checks are DSN-009..012, same checks); every closed list is the register STD-023; every recipe is a blueprint (BLU-009 web, BLU-010 pixel, BLU-011 book and Velo); the kit source is machine/packages/design-kit. Major: sections §2-§17 were cited by CAN-008 and PRO-014 and no longer exist; those citations are repointed in the same change. Direction prose that CAN-008 §3 already holds is not carried."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Design tokens

> **Summary:** Sixteen colours and no new hexes; three self-hosted
> typefaces; a 4 px scale; two radii; one icon family; fifteen animations;
> AA contrast, nothing by colour alone; one footer and one share card for
> the four sites; a site says what it stores; every site has day and night. The values are `STD-023` and
> the kit; this standard says which are rules.
> **Epistemic:** Which parts of the design system answer yes or no — and
> are therefore checkable — as opposed to direction, which is judged.
> **Pragmatic:** What an audit of any Numen Games surface can fail on.
> **Audience:** Agents · Oracles

**Binds:** every public surface of Numen Games and Numinia — web, product,
document, deck, codex, pixel scene — and every consumer of the kit.
**Does not bind:** creative direction, matter, motion philosophy and voice
(`CAN-008`), nor how a piece is produced (`PRO-014`).

---

## Rules

**DSN-001 — Palette is closed.** The sixteen colours of `STD-023`, their
text variants and the rarity scale; ramps and data palettes order them. A
new hex value is a breach, not a variation.

**DSN-002 — Type is self-hosted.** Geist, Geist Mono, Pixelify Sans and
Alegreya as variable woff2 from `/assets/fonts/` with their licence; no
third-party font request in production. Fake bold, fake italic and
synthetic small caps are forbidden.

**DSN-003 — Space and shape on the scale.** Every gap is a value of the 4 px
scale; every radius is `control` (6 px) or `frame` (8 px), and the pixel
register has none. Focus is the system outline, always visible, never
animated.

**DSN-004 — One icon family.** Phosphor, from the house subset, one weight
per row; `thin` and `duotone` never. The scarab and the Moon are marks, not
icons.

**DSN-005 — Contrast AA.** Text meets WCAG 2.2 AA (4.5:1; 3:1 large and
components) in both modes; a texture, veil or patina must not drop the
effective contrast below it. Touch targets 44×44.

**DSN-006 — Never colour alone.** Every state and category carries a second
channel — name, symbol, position, border or focus. Rarity included.

**DSN-007 — Integer pixels.** Text and pixel-register assets sit on integer
coordinates; no half-pixel transforms, no interpolation, no forced line
breaks with spaces.

**DSN-008 — Text before motion.** The full text is in the DOM before any
animation; `prefers-reduced-motion` stops every decorative cycle and
completes every functional state instantly.

**DSN-009 — The kit is installed, never copied.** The published kit is
generated from `machine/packages/design-kit/`; a hand-edited token, stylesheet or
kit copy is a breach.

**DSN-010 — A value exists or it does not.** A value used in a piece is in
the token file or in `STD-023`; one that is in neither does not exist.

**DSN-011 — Public routes pass AA.** Every public route passes the
accessibility gate in both modes before it ships.

**DSN-012 — Motion is catalogued.** Every animation is one of the fifteen
in `STD-023`; parallax, glitch, ambient loops outside the sanctioned two,
animated focus and autoplay with sound are forbidden.

**DSN-013 — One house, one footer.** Every public site of Numen Games closes
with the house footer `STD-023` lays out: the site's written name and one
line; its navigation; the *Numen Games* column naming all four sites with
this one marked; the legal texts published for its scope; social; and the
closing line — scarab, `by Numen Games — we build for a better future.`,
`licence · telemetry · version · commit`. No copyright notice. The version
links to that site's `/updates`, and every production release moves its
minor.

**DSN-014 — A link presents itself.** Every public site carries the scarab
as favicon (SVG, PNG and Apple touch), a title and description of its own
that say what the reader will find, and a 1200×630 share card generated
from the repository on the share-card pattern `STD-023` lays out. Two
sites never present alike: the four names and lines are its table.

**DSN-015 — A site says what it stores.** A public site stores nothing in
the visitor's browser — no cookie, no local storage — and loads nothing
from a third party that the published cookie policy (`OPS-010`) does not
name, with its purpose and duration. What is not necessary for a service
the visitor asked for waits for consent; a consent that predates a change
in the inventory stops counting. No analytics that leaves the device
without being named there.

**DSN-016 — Day and night on every site.** Every public web of Numen Games
serves both modes, Nocturno and Diurno, and carries the mode switch
`BLU-009` §5 specifies: one button among the bar's utilities, showing the
mode a tap leads to — the moon with stars leads to the night, the sun to
the day; following the operating system until the visitor chooses; the
choice remembered under the key the cookie policy names (`numinia-modo`),
applied before painting; `data-modo` on the document, its absence meaning
Nocturno. A pixel scene or a Velo surface keeps its night inside a day page,
framed (`CAN-008`).

## Check

| Rule | Verified by |
|---|---|
| DSN-009 | `machine/tools/generate-design-kit.mjs --check` — byte-identical |
| DSN-005, DSN-011 | axe + Playwright on every public route, both modes (`ARC-010`) |
| DSN-001, DSN-003, DSN-010 | `PRO-014` step 3 — value lookup against the token file |
| DSN-002, DSN-004, DSN-006, DSN-007, DSN-008, DSN-012 | `PRO-014` checklist — visual review |
| DSN-013 | `check-version-bump` in each site's CI — a change to `src/` moves the version and writes `/updates` |
| DSN-014 | `check-share-card` in each site's CI — the card exists at 1200×630 and the head carries icon, title, description, `og:image` |
| DSN-016 | Playwright on each site: the switch exists with its label, a tap sets `data-modo` and swaps the icon, a reload keeps the choice, both modes pass DSN-011 |
| DSN-015 | `check-storage` in each site's CI — every `document.cookie`, `cookies.set`, `localStorage`/`sessionStorage` key and third-party `<script src>` in the source is listed in the site's storage inventory, which the policy page renders |

## Why

A design system is mostly direction, and direction cannot fail a check.
These sixteen are the exceptions: each is a number, a file or a DOM
property that either holds or does not. Keeping them apart from the
direction lets the direction change freely while the checks stay stable —
and lets another organisation install the kit and keep the checks without
inheriting the taste.

## References

| ID | Name | Why cited |
|---|---|---|
| `CAN-008` | Visual identity | the direction this standard does not encode |
| `STD-023` | Design values | every closed list the rules point at |
| `PRO-014` | Producing a design piece | the manual checks and their order |
| `ADR-044` | Consumers install packages | why the kit is a package |
| `OPS-010` | Cookie Policy — Numen Games | the inventory DSN-015 holds every site to |

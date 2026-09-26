---
id: "STD-037"
uid: ""
title: "What every site carries"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-26T13:00:00+02:00"
updated: "2026-09-26T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
license: "CC0-1.0"
tags: [standards, web, footer, share-card, modes, sites]
related: ["STD-008", "STD-023", "STD-034", "STD-035", "BLU-009", "OPS-010"]
series_change: "0.1.0 — 2026-09-26: what every public site carries gets a standard of its own, its three rules moved whole from Design tokens, where they were a second question beside what a design piece can fail an audit on. DSN-013, DSN-014 and DSN-016 become SIT-001, SIT-002 and SIT-003, at the Oracle's word in session."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# What every site carries

> **Summary:** Every public site of Numen Games closes with the house
> footer, presents itself when a link to it is shared, and serves both day
> and night with the same switch.
> **Epistemic:** What does every one of our sites carry, whatever else it
> is? The three things that make four sites look like one house.
> **Pragmatic:** Check a new or changed site against three lines before it
> goes out.
> **Audience:** Agents · Oracles

**Binds:** every public site of Numen Games and Numinia: numinia.org,
numinia.com, numen.games and nwos.numen.games.
**Does not bind:** what a design piece may use — colours, type, icons,
motion — which the design tokens hold, nor what a site may store about a
visitor, which the personal data standard holds.

## Rules

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
it rests on, and what verifies it today. Then the exact values. **Law**
marks what a statute requires.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| SIT-001 | One house, one footer | [LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) art. 10 — **law**: the provider's identity reachable from every site; the version rule is ours and is not SemVer | `check-version-bump` in each site's CI, all four; the legal notice by hand |
| SIT-002 | A link presents itself | [Open Graph protocol](https://ogp.me/): `og:title`, `og:type`, `og:image`, `og:url` required; WCAG 2.2 SC 2.4.2 Page Titled (A); [HTML `rel=icon`](https://html.spec.whatwg.org/multipage/links.html#rel-icon); scarab and 1200 × 630 card ours | `share-card --check` in each site's CI, all four: card size, icon, title, description and image; `og:type` and `og:url` not checked |
| SIT-003 | Day and night on every site | [Media Queries 5, `prefers-color-scheme`](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme); [WAI-ARIA APG button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Playwright on numinia.com only (`preferences.spec.ts`): the switch exists, a tap swaps mode and icon, a reload keeps the choice |

| Rule | Exact value |
|---|---|
| One house, one footer | closing line `by Numen Games — we build for a better future.`, then `licence · telemetry · version · commit`; the version links to `/updates` |
| A link presents itself | favicon as SVG, PNG and Apple touch icon; share card 1200 × 630; `og:title`, `og:type`, `og:image`, `og:url` |
| Day and night on every site | the modes Nocturno and Diurno; storage key `numinia-modo`; attribute `data-modo` on the document, absent meaning Nocturno; the switch as in `BLU-009` |

## Why

Four sites that close, present and switch the same way read as one house; a
visitor who learns one knows the other three. These three rules were half of
the design tokens standard until 26 September 2026, and a different question:
not what a piece can fail on, but what every site must have.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-008` | Design tokens | what a piece of a site may use |
| `STD-023` | Design values | the footer and the share card, laid out |
| `BLU-009` | Web pieces | the mode switch, drawn |
| `OPS-010` | Cookie Policy — Numen Games | the name under which the mode is remembered |

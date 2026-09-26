---
id: "STD-037"
uid: ""
title: "What every site carries"
type: documentation
subtype: standard
status: draft
version: "0.2.0"
created: "2026-09-26T13:00:00+02:00"
updated: "2026-09-26T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
license: "CC0-1.0"
tags: [standards, web, footer, share-card, modes, sites]
related: ["STD-008", "STD-023", "STD-034", "STD-035", "BLU-009", "OPS-010"]
series_change: "0.2.0 — 2026-09-26: the house footer and the share card come in laid out from the design values, so this is their one home; no rule changes, at the Oracle's word in session."
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

Each rule, its code, its source and its check. Then the footer and the card
laid out, and the exact values. **Law** marks what a statute requires.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| SIT-001 | One house, one footer | [LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) art. 10 — **law**: the provider's identity reachable from every site; the version rule is ours and is not SemVer | `check-version-bump` in each site's CI, all four; the legal notice by hand |
| SIT-002 | A link presents itself | [Open Graph protocol](https://ogp.me/): `og:title`, `og:type`, `og:image`, `og:url` required; WCAG 2.2 SC 2.4.2 Page Titled (A); [HTML `rel=icon`](https://html.spec.whatwg.org/multipage/links.html#rel-icon); scarab and 1200 × 630 card ours | `share-card --check` in each site's CI, all four: card size, icon, title, description and image; `og:type` and `og:url` not checked |
| SIT-003 | Day and night on every site | [Media Queries 5, `prefers-color-scheme`](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme); [WAI-ARIA APG button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Playwright on numinia.com only (`preferences.spec.ts`): the switch exists, a tap swaps mode and icon, a reload keeps the choice |

### The house footer

The one closing every public site of Numen Games serves. It was adopted from
the archive's own site, the one that had it best, and all four sites served
it within a day.

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
| One line | The site's line from the share card table below |
| Navigation | The site's primary routes; two columns from five entries, reading down the first column then the second |
| Numen Games column | The four sites, in the order of the share-card table, this one marked «you are here» and not linked |
| Legal | Only texts published for this site's scope; none invented |
| Social | Company accounts only; a missing account is a missing entry, never a personal one |
| Signature | `by Numen Games — we build for a better future.` in English on every site; `Numen Games` opens numen.games in a new tab |
| Build line | `licence · telemetry · vX.Y.Z · sha` — licence opens the repository's `REUSE.toml`; version opens `/updates`; sha opens the commit |
| Never | A copyright line; `all rights reserved`; a year |

Column headings translate with the site; the signature does not.

### The share card

What a link to any of the four looks like when pasted anywhere. One
pattern, four contents; generated from the repository when the site is
built, never drawn by hand.

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

Ground Carbón `#14110F`; the sky of the design values at low density
behind. Margin 90 px. Type from `/assets/fonts/`, embedded at render (`DSN-002`).

| Site | Name | Line | Domain |
|---|---|---|---|
| The company | Numen Games | We design participatory experiences: narrative, game dynamics, live facilitation. | numen.games |
| The game | Numinia | A world across three centuries. Its chronicle, its material culture — CC0 — and the game. | numinia.com |
| The archive | NWOS | The archive of Numen Games, built in public: canon, decisions, missions, how the work is done. | numinia.org |
| The service | NWOS for your organisation | A file-based operating system for organisations. Markdown, git, AI agents. Adopt it. | nwos.numen.games |

The same four rows are each site's `<title>`, `description`, `og:title`,
`og:description` and its entry in the footer's *Numen Games* column; the
`house-links` file in each repository copies this table until the design
kit serves it (`DSN-009`). The favicon is the canonical brandmark in
Marfil on Carbón: `favicon.svg`, `favicon.png` 32×32 and `apple-touch-icon.png`
180×180. `theme-color` is Carbón.

| Rule | Exact value |
|---|---|
| Day and night on every site | the modes Nocturno and Diurno; storage key `numinia-modo`; attribute `data-modo` on the document, absent meaning Nocturno; the switch as in `BLU-009` |

## Why

Four sites that close, present and switch the same way read as one house; a
visitor who learns one knows the other three.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-008` | Design tokens | what a piece of a site may use |
| `STD-023` | Design values | the colours, type and sky the footer and the card use |
| `BLU-009` | Web pieces | the mode switch, drawn |
| `OPS-010` | Cookie Policy — Numen Games | the name under which the mode is remembered |

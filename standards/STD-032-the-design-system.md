---
id: "STD-032"
uid: ""
title: "The Numinia Design System"
type: documentation
subtype: register
status: draft
version: "0.2.2"
created: "2026-09-24T15:00:00+02:00"
updated: "2026-09-25T15:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, register, design, design-system, sound, writing, play]
license: "CC0-1.0"
threshold: governed
related: ["CAN-008", "CAN-002", "STD-008", "STD-023", "STD-034", "PRO-014", "STD-021"]
series_change: "0.2.2 — 2026-09-25: one paragraph says that what anyone must be able to do with a piece follows the accessibility standard; the register table is unchanged."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The Numinia Design System

> **Summary:** Which documents make up the design system, and what each one
> gives. Design here is the whole experience — seen, read, heard, moved
> through and played — so the system reaches a logo, an invoice, a sound, a
> mission, a character or a world. It lives in many small documents; this
> table is what joins them.
> **Epistemic:** A map, not a rule: nothing here can be kept or broken. The
> rules are in the documents it lists.
> **Pragmatic:** Find the document that answers your piece, and see which
> parts of the system are not written yet. The design page of this site is
> drawn from this table, and so is its download.
> **Audience:** Everyone

## Parts

**Core** is what holds in every medium: why we exist, what we will not trade,
the three forces, the mix, the eras. **Languages** translate the core to one
sense each. **Recipes** apply the languages to one medium — a web page, an
invoice, a deck, a scene. **Toolkit** is what a maker installs or downloads.

A row with no document is a part of the system that is not written yet. A
row whose description opens with the words *read alongside* is a document
the system points to without carrying it: the page links it, and the
compiled system and the download name it and leave it out. The game manual
is one of these. Three thousand lines of rules are material for designing
play, not the design system, and the manual is downloaded on its own.

The design system says what is ours. What anyone must be able to do with a
piece — read it in either theme, reach it by keyboard, hear it, pause what
moves — follows the world's web accessibility guidelines, and lives in the
accessibility standard, which every row here serves.

## The register

| Part | Chapter | Document | Gives |
|---|---|---|---|
| Core | Purpose | `canon/CAN-002-brand-and-culture.md` | Why we exist, why a game, what we will not trade, how we sound |
| Core | Identity | `canon/CAN-008-visual-identity.md` | The three forces, the forty-forty-twenty mix, the eras, the brand architecture, the signature and the play |
| Core | Ethics | `canon/CAN-010-leave-things-better.md` | The sentence every piece closes on |
| Core | World | `canon/CAN-001-welcome-to-numinia.md` | The city every piece belongs to |
| Languages | Image | `standards/STD-008-design-tokens.md` | The rules an audit of any piece can fail on |
| Languages | Image | `standards/STD-023-design-values.md` | Every value: colours, type, space, icons, the brand inventory, the sky |
| Languages | Word | `standards/STD-030-the-worlds-vocabulary.md` | The names of the world, and what each is called outside the fiction |
| Languages | Word | `blueprints/BLU-007-dual-nomenclature.md` | How much of the world the words carry: the narrative dial, from plain business to inside the fiction |
| Languages | Word | `lore/game/manual/glossary-es-en.md` | Read alongside: the English of every Numinia term |
| Languages | Word | `standards/STD-021-evidence-and-citation.md` | A quote carries its author's name |
| Languages | Word | — | Not written yet: how we write — register by register, with rules and recipes |
| Languages | Sound | — | Not written yet: how Numinia sounds — music, effects, voice and silence. Today only the reading-aloud player is specified, in the design values |
| Languages | Motion | `standards/STD-023-design-values.md` | The animation catalogue, the sky and the motion budgets; still inside Image |
| Languages | Play | `lore/game/manual/en/07-building-the-adventure.md` | Read alongside: how the manual builds an adventure |
| Languages | Play | `lore/adventures/tabletop/TEMPLATE.md` | Read alongside: the mould of an adventure module |
| Languages | Play | `lore/codex/hoja-de-personaje.md` | Read alongside: the character sheet |
| Languages | Play | — | Not written yet: how a mission, a character or a place is designed as ours |
| Recipes | Any piece | `protocols/PRO-014-producing-a-design-piece.md` | The order in which a piece's decisions are taken |
| Recipes | Web | `blueprints/BLU-009-web-pieces.md` | A web page, a product screen, every component |
| Recipes | Pixel | `blueprints/BLU-010-pixel-register.md` | A sprite, a scene, a HUD |
| Recipes | Book and Velo | `blueprints/BLU-011-book-and-velo.md` | The codex, the archive, the atmosphere |
| Recipes | Deck | `blueprints/BLU-012-presentation-deck.md` | A presentation |
| Recipes | Document | `blueprints/BLU-013-document-and-invoice.md` | A document and an invoice |
| Recipes | Platform | `blueprints/BLU-014-platform.md` | The Platform |
| Recipes | Event, 3D, email | `blueprints/BLU-015-event-3d-and-email.md` | A physical event, a 3D scene, an email |
| Toolkit | Tokens | `machine/packages/design-kit/sistema.tokens.json` | Every value in a machine format (W3C design tokens) |
| Toolkit | Kit | `machine/packages/design-kit/sistema.css` | The stylesheet, installed, never copied |
| Toolkit | Kit | `machine/packages/design-kit/sistema.js` | The behaviour the stylesheet needs |
| Toolkit | Kit | `machine/packages/design-kit/sistema.prompt.txt` | The instruction an AI designs with |
| Toolkit | Fonts | `web/public/design/assets/fonts/` | Geist, Geist Mono, Pixelify Sans and Alegreya, with their licences |
| Toolkit | Icons | `web/src/icons/` | The Phosphor glyphs the site serves |
| Toolkit | Brand | `web/src/brand/Khepri_Logo.svg` | The scarab |
| Toolkit | Pixel | `web/public/design/assets/pixel/` | The reference sprites and the how-yes, how-no pairs |
| Toolkit | Matter | `web/public/design/assets/` | The circuit relief and its thumbnail |
| Toolkit | Templates | `web/public/design/templates/` | The invoice |

## References

| ID | Title | Relation |
|---|---|---|
| `CAN-008` | One identity, three forces | the direction every row serves |
| `STD-008` | Design tokens | the rules of the Image language |
| `STD-034` | Accessibility | what every piece must let anyone do |
| `PRO-014` | Producing a design piece | how a piece is made with what is listed here |

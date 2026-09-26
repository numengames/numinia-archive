---
id: "STD-034"
uid: ""
title: "Accessibility"
type: documentation
subtype: standard
status: draft
version: "0.2.2"
created: "2026-09-25T13:00:00+02:00"
updated: "2026-09-26T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
license: "CC0-1.0"
related: ["STD-008", "STD-015", "STD-023", "STD-032"]
tags: [standards, accessibility, WCAG, web]
series_change: "0.2.2 — 2026-09-26: the test on every change now also holds the engineering register's accessibility row, which said it again. 0.2.1 — 2026-09-25: the Oracle confirmed Numen Games is a microenterprise, so the European Accessibility Act does not oblige us; the guidelines stay our choice."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Accessibility

> **Summary:** Anyone can use our public pages: read them in either
> theme, move through them with a keyboard, hear them with a screen reader,
> and stop anything that moves. We follow the world's web accessibility
> guidelines, and a test checks every change.
> **Epistemic:** Which part of those guidelines we commit to, what the law
> asks of us and what we do anyway, and which sites are checked today.
> **Pragmatic:** Know what a page must do before it is published, and how to
> prove it.
> **Audience:** Agents · Oracles

**Binds:** every public page of every site of Numen Games and Numinia.
**Does not bind:** internal tools, and games played inside a world.

## Rules

### What every page does

**Every page meets the common guidelines.** Every public page MUST meet the
web accessibility guidelines, version 2.2, level double-A. That covers the
European accessibility norm, which asks for version 2.1 at the same level,
so one audit proves both. The European Accessibility Act covers online
shops, but exempts the smallest companies, and we are one: the law does not
oblige us. Our choice; we follow the guidelines anyway.

**Both themes count.** Text MUST keep a contrast of four and a half to one
against what lies behind it, three to one when large, and controls, icons
and the focus ring three to one, by day and by night. Colour never says
anything alone, and the keyboard focus is always visible, never hidden
under a bar. Ratios are numbers any tool reports, so the claim can be
proved rather than argued.

**Keyboard and screen reader first.** Everything a page offers MUST work
with a keyboard alone, in an order that follows the meaning and without
ever trapping the focus. Every control tells a screen reader its name, its
role and its state, as the accessible rich internet applications practices
describe, and a button that is only an icon still has a spoken name.

**Motion can be stopped.** Anything that moves by itself for more than five
seconds beside the content MUST have a visible control to pause it; the
guidelines require it, and asking the system for less motion is not
enough. Nothing flashes more than three times a second, and when a
visitor asks for less motion, decorative cycles stop and changes of state
complete at once.

### How we know

**A test checks every change.** Each of the four sites MUST run an
automatic accessibility test over its pages, in both themes, on every
change before it is published. Automatic tools catch only part of the
failures, so a person also audits each site from time to time, following
the evaluation method the guidelines' authors publish.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today. Then the criteria the first rule
already implies and nothing checks yet. **Law** marks what a statute
requires; the rest is a norm we adopt.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| ACC-001 | Every page meets the common guidelines | [WCAG 2.2, level AA](https://www.w3.org/TR/WCAG22/); a superset of [EN 301 549 V3.2.1](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf) clause 9 (= WCAG 2.1 AA). **Not law for us:** [European Accessibility Act](https://eur-lex.europa.eu/eli/dir/2019/882/oj), in Spain [Ley 11/2023](https://www.boe.es/buscar/act.php?id=BOE-A-2023-11022), from 28 June 2025, covers e-commerce such as numinia.com; art. 4(5) exempts microenterprises providing services (< 10 persons and turnover or balance ≤ €2 M) — Numen Games S.L. is one, confirmed by the Oracle on 2026-09-25; to review if the company grows | `numinia-web` only: `apps/store/e2e/a11y.spec.ts`, axe with Playwright over 31 routes, both themes; `numinia.org`, `numen.games` and `nwos.numen.games` have no accessibility test yet |
| ACC-002 | Both themes count | WCAG 2.2 SC 1.4.1 Use of Color (A), 1.4.3 Contrast (Minimum) (AA) 4.5:1 and 3:1 large, 1.4.11 Non-text Contrast (AA) 3:1, 2.4.7 Focus Visible (AA), 2.4.11 Focus Not Obscured (Minimum) (AA); absorbs `DSN-006` and the ratios and focus clause of `DSN-005`, `DSN-003` | as `ACC-001` for contrast in both modes; colour-alone and focus by hand |
| ACC-003 | Keyboard and screen reader first | WCAG 2.2 SC 2.1.1 Keyboard (A), 2.1.2 No Keyboard Trap (A), 2.4.3 Focus Order (A), 1.1.1 Non-text Content (A), 4.1.2 Name, Role, Value (A), 4.1.3 Status Messages (AA); [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) and the [APG](https://www.w3.org/WAI/ARIA/apg/) | as `ACC-001` for what axe can see; focus order and announcements by hand |
| ACC-005 | Motion can be stopped | WCAG 2.2 SC 2.2.2 Pause, Stop, Hide (A), 2.3.1 Three Flashes or Below Threshold (A), 2.3.3 Animation from Interactions (AAA, ours by choice); [Media Queries 5, `prefers-reduced-motion`](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion); moved from `DSN-008`, `DSN-012` | **not met yet on the sites**: the sky loop of numinia.org and the ambient loops start by themselves with no pause control; reduced motion by hand, the `PRO-014` checklist |
| ACC-004 | A test checks every change | [axe-core](https://github.com/dequelabs/axe-core), [pa11y](https://pa11y.org/) or [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci); manual audit by [WCAG-EM](https://www.w3.org/TR/WCAG-EM/); absorbs `DSN-011` and register row `ARC-010` | `numinia-web` CI only; nothing on the other three sites; no manual audit recorded |

| Implied by | Criterion | Source | Verified by |
|---|---|---|---|
| ACC-001 | Resize text to 200 % | WCAG 2.2 SC 1.4.4 (AA) | implied by ACC-001, not checked yet |
| ACC-001 | Reflow at 320 CSS px | WCAG 2.2 SC 1.4.10 (AA) | implied by ACC-001, not checked yet |
| ACC-001 | Text spacing | WCAG 2.2 SC 1.4.12 (AA) | implied by ACC-001, not checked yet |
| ACC-001 | Language of page and of parts | WCAG 2.2 SC 3.1.1 (A), 3.1.2 (AA) | implied by ACC-001, not checked yet (axe sees the page's `lang` only) |
| ACC-001 | Skip to content | WCAG 2.2 SC 2.4.1 Bypass Blocks (A) | implied by ACC-001, not checked yet |
| ACC-001 | Store forms: errors, labels, suggestions, error prevention, redundant entry, accessible authentication | WCAG 2.2 SC 3.3.1–3.3.4 (A/AA), 3.3.7 (A), 3.3.8 (AA) | implied by ACC-001, not checked yet |
| ACC-001 | Captions and alternatives for audio and video | WCAG 2.2 SC 1.2.1–1.2.5 (A/AA) | implied by ACC-001, not checked yet |
| ACC-001 | Accessibility information for the store | [EAA](https://eur-lex.europa.eu/eli/dir/2019/882/oj) Annex V; Ley 11/2023 art. 13 — **not law for us while a microenterprise**; our choice, recommended | not published |

## Why

A page that cannot be read aloud, reached by keyboard, paused or seen in
the dark theme shuts out people who came to take part. Writing our own rule
would buy a worse one than the guidelines the world already tests; their
middle level is what the European norm and most laws ask for, so one audit
answers all of them, and a test on every change is the only way a promise
like this survives the next redesign. It runs past the usual length
because its checks list every criterion nobody verifies yet.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-008` | Design tokens | what we add on top: textures, touch targets, catalogued motion |
| `STD-023` | Design values | the colours the ratios are measured on, and the animation catalogue |
| `STD-032` | The design system | the themes and components every page is built from |
| `STD-015` | Engineering checks | where the accessibility test runs |

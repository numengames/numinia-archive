---
id: "STD-034"
uid: ""
title: "Accessibility"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-25T13:00:00+02:00"
updated: "2026-09-25T13:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
license: "CC0-1.0"
tags: [standards, accessibility, WCAG, web]
series_change: "0.1.0 — 2026-09-25: accessibility gets a standard of its own, resting on the Web Content Accessibility Guidelines."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Accessibility

> **Summary:** Anyone can use our public pages: read them, move through
> them with a keyboard, and hear them with a screen reader, in the light
> theme and the dark.
> **Epistemic:** Which part of the world's accessibility guidelines we commit
> to, and which of our sites are checked for it today.
> **Pragmatic:** Know what a page must do before it is published, and how to
> check it.
> **Audience:** Agents · Oracles

**Binds:** every public page of every site of Numen Games and Numinia.
**Does not bind:** internal tools, and games played inside a world.

## Rules

### What every page does

**Every page meets the common guidelines.** Every public page MUST meet the
world's web accessibility guidelines, version 2.2, at the middle level,
which is the level most laws ask for.

**Both themes count.** Text and controls MUST keep enough contrast to be
read in the light theme and in the dark, and a page MUST NOT depend on
colour alone to say something.

**Keyboard and screen reader first.** Everything a page offers MUST be
reachable and usable with a keyboard alone, and MUST be announced correctly
by a screen reader.

### How we know

**A test checks every change.** Each site SHOULD run an automatic
accessibility test over its pages, in both themes, on every change before
it is published.

## Check

Every rule above, with the code an agent cites it by, the outside standard
it rests on, and what verifies it today.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| ACC-001 | Every page meets the common guidelines | [WCAG 2.2, level AA](https://www.w3.org/TR/WCAG22/) | `numinia-web` only: `apps/store/e2e/a11y.spec.ts`, axe with Playwright over 31 routes, both themes; `numinia.org`, `numen.games` and `nwos.numen.games` have no accessibility test yet |
| ACC-002 | Both themes count | [WCAG 2.2, contrast and use of colour](https://www.w3.org/TR/WCAG22/#contrast-minimum) | as above; nothing yet on the other three sites; the ratios and touch targets are `DSN-005` in `STD-008` |
| ACC-003 | Keyboard and screen reader first | [WCAG 2.2, keyboard and name, role, value](https://www.w3.org/TR/WCAG22/#keyboard) | as above for what axe can see; focus order and announcements by hand |
| ACC-004 | A test checks every change | — | `numinia-web` CI only; nothing yet on the other three sites |

## Why

A page that cannot be read aloud, reached by keyboard or seen in the dark
theme shuts out people who came to take part. Writing our own rule would buy
a worse one than the guidelines the world already tests; committing to their
middle level is what most laws ask for, and a test on every change is the
only way a promise like this survives the next redesign.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-032` | The design system | the themes and components every page is built from |
| `STD-008` | Design tokens | the contrast ratios, as design values |
| `STD-015` | Engineering checks | where the accessibility test runs |
| `STD-011` | External standards | where this rule came from |

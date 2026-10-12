---
id: "STD-031"
uid: ""
title: "A principle states"
type: standard
subtype: standard
status: draft
version: "0.3.0"
created: "2026-09-24T22:00:00+02:00"
updated: "2026-10-12T13:35:28+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
section: "Knowledge and quality"
tags: [standards, principles, writing, form, template]
license: "CC0-1.0"
approved_by: "ADR-062"
related: ["STD-007", "STD-001", "STD-024"]
derived_from: "PRI-009"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# A principle states

> **Summary:** A principle names no tool, keeps no clock and no byline, keeps
> document codes at the foot and calls the world by the manual's names. What
> it argues is read by its reviewers; what it carries is checked.
> **Epistemic:** What does a principle say?
> **Pragmatic:** Write a principle, or refuse one, against a list you can point
> at.
> **Audience:** Agents · Oracles

**Binds:** every document in the principles.

## Rules

A principle comes in any order and any shape: continuous prose, the author's
own headings, or none. No sectioning is prescribed.

### What a principle leaves out

**No tool.** A principle MUST NOT name a vendor, product or application as the
way something is done. It states the capability. The tool belongs in
the system notes or a procedure.

**No clock, no byline.** A principle MUST NOT carry a date, hour, cadence,
calendar or byline in its body. The schedule belongs in a procedure, the
hours in the calendar, and a signed voice arguing on a given day in a report
or a decision.

**Document names at the foot.** A principle MUST name a thing in words, and
keep its code in the header and the reference table, never mid-sentence.

### Whose names

**The manual names the world.** A principle written in English MUST call a
guild, branch, house, faction, rank or force by the English name the game
manual gives it. Where the two disagree, the manual is right and the
principle is corrected. The international thesaurus standard asks for one
preferred name per thing, so a search finds it under one word.

## Check

Each rule, its code, its source and its check.

| Rule ID | Rule | Source | Verified by |
|---|---|---|---|
| STA-006 | No tool | — | `machine/checks/rules/std-031-a-principle-states.mjs` |
| STA-007 | No clock, no byline | — | `machine/checks/rules/std-031-a-principle-states.mjs` |
| STA-011 | Document names at the foot | — | `machine/checks/rules/std-031-a-principle-states.mjs`; a section cited by number, `machine/checks/rules/std-021-evidence-and-citation.mjs` (`CIT-050`) |
| STA-012 | The manual names the world | [ISO 25964-1:2011, thesauri](https://www.iso.org/standard/53657.html) — one preferred term per concept | `machine/checks/rules/std-031-a-principle-states.mjs`, against the tables of `lore/game/manual/glossary-es-en.md` |
| — | the body length, 1,500 words, a SHOULD | — | `machine/checks/rules/std-007-one-page.mjs` (`DOC-006`) — counted and reported, never enforced |

| In the reading | Exact form |
|---|---|
| the principles | `principles/` |
| the system notes | `system/` |
| the header and the reference table | `related:` and the References table |
| the game manual | `lore/game/manual/glossary-es-en.md` |

## Why

Every rule here is the epitaph of a text. A board named after a vendor died
with the vendor and took the founding principles with it. Three rituals with
hours disagreed with two other principles within a month. Four numbered
sections produced documents that complied and did not persuade. Whether a
principle persuades is read, not parsed, so it is asked of its reviewers.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-007` | One page per document | the card, the length, the reference table |
| `STD-017` | Who may change what | why a rule in a decision binds nobody until it is here (`AUT-063`) |
| `STD-001` | The series | the principles' row: approval level, budget, template |

---
id: "DBT-021"
uid: ""
title: "Eight pages under /system/ hold their content in the template instead of the corpus"
type: documentation
status: active
version: "0.1.0"
created: "2026-09-22T12:20:00+02:00"
updated: "2026-09-22T12:20:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, web, corpus, portability]
license: "CC-BY-4.0"
severity: medium
severity_reason: "the site states things the archive does not hold. Nothing is wrong on screen; what is wrong is that the screen is the only place it exists, so it cannot be cited, versioned, licensed or measured"
detected: "2026-09-22"
visibility: "public"
visibility_reason: "a reader looking at those pages deserves to know they are not archive records"
opened_by: "ursa"
related: ["ADR-046", "STD-001", "STD-006", "STD-027"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# DBT-021 — Pages that say things the archive does not hold

> **Summary:** Five pages under `/system/` — the CAO dashboard, the narrative
> dial, the sales guide, the hundred simulations and the solutions map — carry
> their data as arrays inside their `.astro` template. `/blueprints/meta` is a
> hand-written protocol with no counterpart in `protocols/`. They render
> correctly and are cited by nothing, because there is nothing to cite.
> **Epistemic:** The site is not only a viewer. In six places it is also a
> store, and the only copy lives in a rendering component.
> **Pragmatic:** These six are exempt from `check-md-portability` with a stated
> reason. The exemption is the debt: the repair is to move the content to the
> corpus, not to generate a `.md` from the array.
> **Audience:** Agents · Oracles

---

## 1. What was measured

On 2026-09-22, giving every composed page its own markdown
(`web/src/lib/composed-md.ts`) required answering, for each page, *which
document governs what this page states*. Six could not answer.

| Page | Where its content lives | What the archive holds |
|---|---|---|
| `/system/cao` | `cao.astro`, agent metrics array | nothing |
| `/system/language` | `language.astro`, the five narrative levels | `CAN-002` has three levels, not five |
| `/system/sales` | `sales.astro`, ICP ranking | `operations/OPS-007-sales.md` exists, unread by the page |
| `/system/simulations` | `simulations.astro`, 100 runs | `operations/OPS-005-simulations.md` exists, unread |
| `/system/solutions` | `solutions.astro`, clusters | `operations/OPS-006-solutions.md` exists, unread |
| `/blueprints/meta` | `meta.astro`, in Spanish | nothing; it describes a protocol that belongs in `protocols/` |

`/system/continuity` and `/system/wardley` are a different case and are listed
with them only in the guard: `wardley` already reads `BLU-001` and links it;
`continuity` is a view wrapper whose source was not traced in this pass.

## 2. Why this is debt and not a bug

Nothing is broken on screen. What is broken is the direction of the mirror.

`ADR-046` classifies by the activity that produced a document, and `STD-001`
registers which folder holds what. A figure that exists only inside a template
has no series, so it has no identifier, no threshold, no licence declaration
and no place in any measurement the instrument takes. It cannot be superseded,
because nothing can cite it in order to supersede it.

Three of the six have the sharper version of the problem: `operations/`
already holds a document on the same subject, and the page does not read it.
Two archives of one thing, one of them silent — the exact failure `MIS-071`
closed for `/wardley` and `/gaps`, reopened five times over.

`/system/language` is worse than stale: the page presents **five** narrative
levels and `CAN-002` → Verbal Identity declares **three**. A reader who takes
the page as canon is reading something the canon does not say.

## 3. Why a generated `.md` would make it worse

`check-md-portability` could have been satisfied by emitting markdown from
those arrays. That was refused: a `.md` generated from a hardcoded array is
template data wearing the shape of an archive record. It would be downloadable,
quotable and wrong, and the guard would be green.

An exemption that says "this page has no document behind it" is an honest red
flag. A generated file would have been a silent lie.

## 4. What the repair is

Per page, in this order:

1. **The three with a document already** (`sales`, `simulations`, `solutions`):
   make the page read `OPS-007`, `OPS-005`, `OPS-006`. Where the array and the
   document disagree, the document wins or the document is corrected — that is
   a decision, not a merge.
2. **`/system/language`**: reconcile with `CAN-002`. Either the canon gains the
   five levels or the page drops to three. The Oracle's call.
3. **`/system/cao`**: decide whether agent metrics are a series at all. If they
   are, they are measured by the instrument, not typed. If they are not, the
   page goes.
4. **`/blueprints/meta`**: the cartography protocol belongs in `protocols/`,
   in English, with an identifier.

Each repair removes one line from `EXEMPT` in
`machine/scripts/check-md-portability.mjs`. When the map is empty, this entry
is deleted.

## 5. Open decisions

- Are agent metrics a series of the scheme, or an instrument's output?
- Three narrative levels or five? `CAN-002` and `/system/language` disagree
  today and both are published.

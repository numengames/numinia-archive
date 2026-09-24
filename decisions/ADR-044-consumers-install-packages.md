---
id: "ADR-044"
uid: ""
title: "Consumers install packages, never copy"
type: adr
status: active
version: "1.1.0"
created: "2026-09-09T10:30:00+02:00"
updated: "2026-09-10T03:00:00+02:00"
author: "ursa"
owner: "oracle"
deciders: ["oracle"]
guild: "Alchemists"
territory: "Archive"
tags: [design, packages, reconstruction, nwos, standards]
amends: []
related: ["STD-008", "STD-023", "CAN-008", "PRO-014"]
license: "CC-BY-4.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-044 — Consumers install packages, never copy

> **Summary:** What another repository needs to rebuild part of this system
> is a versioned package under `machine/packages/`, installed, never copied. The
> design kit is the first: source in `machine/packages/design-kit/`, published
> output at `/diseno/kit/` (since 2026-09-24, `/design/kit/`).
> **Epistemic:** Numinia is the first instance of NWOS; what it learns moves
> to the generic system in `nwos-deploy`. A copy cannot move; a package can.
> **Pragmatic:** One `npm install` replaces two hand-maintained copies that
> were already two versions behind.
> **Audience:** Agents · Oracles

## 2. Decision

**Anything a consumer outside this repository needs in order to rebuild a
part of this system is published as a versioned package under `machine/packages/`,
and the consumer installs it. Copies are a breach.**

The design system lives in five houses, each with one job:

| House | Holds | Consumed by |
|---|---|---|
| `CAN-008` | direction: the mix, brand play, voice | people |
| `STD-008` | the rules that answer yes or no (`DSN-`) | reviewers, CI |
| `STD-023` | the closed lists: palette, scales, animations, assets | the generator, which verifies register = tokens |
| `blueprints/` | recipes, one per medium | the workspace template |
| `machine/packages/design-kit/` | `sistema.css`, `.js`, `.tokens.json`, `.prompt.txt`, versioned (MIT) | every site, by install |

`web/public/diseno/kit/` (since 2026-09-24, `web/public/design/kit/`) stays as the published output with a sha256
manifest; its URLs are a contract and do not move.
`generate-design-kit.mjs --check` fails when output differs from package.

## 3. Why

Two other repositories consumed the kit and neither read it: `nwos-deploy`
carried tokens hand-copied and labelled a version behind, citing a section
that no longer existed. A rule against copying (`DS-01`) existed and two
consumers copied anyway. A rule with no way to install is a wish.

## 4. Alternatives

- **A `design/` folder.** A reader's convenience, still a copy for a
  consumer; a folder in another repository cannot be installed.
- **Source in `machine/scripts/` or `web/`.** Apparatus, or output edited in place.
- **Publish from `nwos-deploy`.** The right final home; the values are
  decided here today and the package moves up when the instance stops
  learning.

## 5. Consequences

- `@numengames/design-kit` is the source; the published kit is
  byte-identical except for the stamp line.
- `nwos-deploy` and `numinia-web` replace their copies with the package —
  a change in each, reviewed there.
- The same rule applies to whatever else the generic system takes from
  here — `machine/templates/`, the guards — when it is taken.

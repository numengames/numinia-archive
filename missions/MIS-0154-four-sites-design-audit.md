---
id: "MIS-154"
uid: ""
title: "Audit the four sites against the design system and bring them to it"
status: todo
priority: high
effort: L
guild: "Alchemists"
territory: "Product"
type_execution: hybrid
assigned_to: null
completed: null

type: mission
version: "0.1.0"
created: "2026-09-24T17:00:00+02:00"
updated: "2026-09-24T17:00:00+02:00"
author: "ursa"
owner: "oracle"
tags: [design-system, audit, web, day-night, four-sites]
license: "CC0-1.0"

requires_oracle_approval: true
context: "2026-09-24"
paths: [standards/STD-008-design-tokens.md, standards/STD-023-design-values.md, blueprints/BLU-009-web-pieces.md, standards/STD-032-the-design-system.md]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# MIS-154 — Audit the four sites against the design system and bring them to it

> **Summary:** Check numinia.org, numinia.com, numen.games and
> nwos.numen.games against every yes-or-no rule of the design system, write
> the result as one table, then fix the sites one by one — starting with day
> and night (DSN-016), which only numinia.com serves today.
> **Epistemic:** Where the four sites stand against the design system, rule
> by rule, measured and not assumed.
> **Pragmatic:** A report the Oracle reads in five minutes and one pull
> request per site that closes its gaps.
> **Audience:** Agents · Oracles

---

## 1. Scope

The four public sites and their repositories:

| Site | Repository | Package manager |
|---|---|---|
| numinia.org | `numengames/numinia-archive` (`web/`) | npm |
| numinia.com | `numengames/numinia-web` | npm workspaces + turbo |
| numen.games | `numengames/numengames-web` | pnpm via corepack |
| nwos.numen.games | `numengames/nwos-deploy` | npm |

**The rules** are the sixteen of `standards/STD-008-design-tokens.md`
(DSN-001 to DSN-016), with their closed lists in `STD-023` and the web recipe
in `BLU-009`. The whole system, readable at once, is `numinia.org/design`;
`numinia.org/design.md` is the same in one file.

**Phase 1 — audit, one report.** For every site and every rule: *holds*,
*fails* (with the evidence: file and line, or URL and what it shows), or
*cannot tell* (and why). Check in the source, not only the served page. At
least:

- **DSN-016, day and night.** The switch exists among the bar's utilities;
  the icon shows where a tap leads (sun → day, moon-stars → night); the page
  follows the device until the visitor chooses; the choice is kept under
  `numinia-modo` and applied before painting (no flash on reload);
  `data-modo` on `<html>`, absent = Nocturno; both modes pass AA.
  **numinia.com is the reference implementation** — read how it does it
  before touching the others, and copy it rather than invent.
- **DSN-001 / DSN-010, closed palette.** Every hex in the source is one of
  `STD-023` or the kit's tokens. Tailwind defaults (`#22C55E`, `#3B82F6`,
  `#A855F7`, `#F97316`…) are a fail.
- **DSN-002, fonts** self-hosted; **DSN-004, icons** Phosphor from the house
  subset, no thin, no duotone; **DSN-003**, space and radii on the scale.
- **DSN-012, motion** — every animation is one of the fifteen.
- **DSN-013 footer, DSN-014 favicon + title + share card, DSN-015 storage**
  — these have CI checks in some repos; say which run where.
- **DSN-009** — the kit installed from the package, not copied.

Output of phase 1: `reports/RPT-NNN-four-sites-design-audit.md` (use the
template in `machine/templates/RPT-TEMPLATE.md`), one table with rules as
rows and sites as columns, and under it, per site, the fails ranked by what
a visitor notices first.

**Phase 2 — fix, one PR per site.** Day and night first on each site that
lacks it, then the fails in the report's order. numinia.org is the largest
job: its styles were written for the night only (fixed hexes in ~80 places
in `web/src`, `html { background-color: #14110F }` in `global.css`); a day
mode means moving those to the Diurno variables of `STD-023` §2 first.

### Out of scope

- Writing new rules or changing `STD-008`/`STD-023`. A rule that looks wrong
  goes in the report as a finding for the Oracle, not into a change.
- Sound (the files from Fernando come later, into `numinia-assets`).
- Redesigning pages. This mission brings sites to the system; it does not
  change the system.

---

## 2. Acceptance criteria

- [ ] `reports/RPT-NNN-four-sites-design-audit.md` exists with a verdict for
  each of the 16 rules × 4 sites and the evidence for every fail.
  *(Today: no such report.)*
- [ ] On each of the four sites, a Playwright run clicks the mode switch,
  finds `data-modo="diurno"` on `<html>`, reloads and still finds it, and
  the icon has swapped. *(Today: passes only on numinia.com.)*
- [ ] `grep -rEo '#[0-9A-Fa-f]{6}' src` in each site's source returns only
  values present in `machine/packages/design-kit/sistema.tokens.json`, or
  each remaining one is listed in the report with its reason.
  *(Today: not measured.)*
- [ ] Each fix is a PR with its checks green, one per repository.

---

## 3. Closure

*(Fill when the mission closes.)*

---

## Prompt for the session that runs this

> Paste this as the first message of a new session.

```
Vamos a revisar que las cuatro webs cumplen el sistema de diseño y a
arreglarlas. La misión está escrita en numinia-archive:
missions/MIS-0154-four-sites-design-audit.md — léela entera antes de nada.

El sistema de diseño completo está en numinia.org/design (y en una sola
página en numinia.org/design.md). Las reglas de sí o no son las dieciséis
de standards/STD-008-design-tokens.md; la más nueva, DSN-016, dice que
todas las webs tienen modo día y noche con el botón de sol y luna, y hoy
solo lo tiene numinia.com — úsala de referencia.

Primero la auditoría: una tabla de reglas por webs con lo que cumple, lo
que falla y la prueba, en un informe en reports/. Enséñamelo antes de
tocar nada. Después, un PR por web, empezando por el día y la noche.
Explícamelo en castellano y claro: qué veré en cada web cuando esté hecho.
```

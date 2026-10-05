---
id: "SYS-011:force-threshold"
title: "Threshold"
type: entity
status: draft
version: "0.3.0"
created: "2026-09-29T12:10:00+02:00"
updated: "2026-10-05T16:55:00+02:00"
author: "ursa"
owner: "oracle"
section: "Products and services"
license: "CC0-1.0"
category: "force"
stage: draft
confidence: "medium"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Threshold

> **Summary:** In the world, the Threshold is the force through which things take a body:
> physical energy, matter, action. In the house it names the everyday design surface
> (pages, invoices), and on numinia.com it is the gate at the end of the free chapters.

Every claim ends with where it comes from: **(cited: `path` — «heading»)**
when a source says it (quote it, in the source's language), **(inferred)**
when several uses support it (name them), **(proposed)** when it is a
plausible reading nobody has confirmed yet.

## Entity

| | |
|---|---|
| Name in the manual (ES) | Umbral (cited: `lore/game/manual/glossary-es-en.md` — «\| Umbral \| Threshold \|») |
| Name in English | Threshold (cited: same) |
| Category | force |
| Also written as | «Umbral» left in Spanish in English house texts (cited: `principles/PRI-008-visual-identity.md` — «The three forces»); lower-case in code (cited: `standards/STD-026-operative-vocabulary.md` — «the code writes them in lower case»); «Umbrales» for the four guild portals (cited: `glossary-es-en.md` — «Umbrales y sellos») |

## Concept

The Threshold is one of Numinia's three forces, alongside the Veil and the Prisma, and it is the Veil's antagonist: «la materialización de energías físicas» (cited: `lore/game/manual/es/02-historia-y-leyendas-de-numinia.md` — «Las fronteras del Umbral»). It is not a wall or a portal: «es el punto exacto donde el mundo toma cuerpo» (cited: same). It is also a dynamic limit, «la línea en la que la realidad se afirma frente al caos» (cited: same). What every use shares is *the point where something becomes concrete or can be crossed* (inferred: uses in `02-historia…`, `PRI-008`, `CodexUmbral.astro`). The concept is wide and cannot be reduced to a single way of understanding it: in `PRI-008` it is the base design register, though the canon does not say «register»; on numinia.com it is a portal that marks us as belonging to the world, and crossing it is signing in, which is also a registration (cited: Christian's review, 2026-09-29 — «Cruzar el umbral es loguearse, por lo que también es un registro»; «no puede reducirse a un único modo de entender el registro»).

## Constitutive traits

- Manifestation and action: «Activar, mover, señalar las fronteras» (cited: `02-historia…` — «ASPECTO|VELO|UMBRAL|PRISMA»).
- It executes: «el Akasha registra y el Velo revela, el Umbral ejecuta» (cited: same).
- It holds tensions, not memories (cited: same — «guarda tensiones»).

## Facets

| Facet | What it is | Provenance |
|---|---|---|
| Cosmic force | The physical pole of the three forces | cited: `02-historia…` — «Las fronteras del Umbral» |
| Character resource | Points that add to physical rolls; at 0 the character enters Imbalance | cited: `lore/game/manual/es/03-creacion-del-personaje.md` — «su comunión y armonía con el mundo» |
| Border between order and chaos | The meaning behind the Legion's name | cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «El Umbral como frontera» |
| Trial portal | The four guild Thresholds in Session Zero, each earning seals | cited: `lore/adventures/virtual-worlds/session-zero.md` — «a portal that bears a significant name» |
| Design register | The base system, «the force that invoices» | cited: `principles/PRI-008-visual-identity.md` — «The three forces» |
| Access gate / sign-in | A portal that marks us as of Numinia: crossing it is signing in, a registration | cited: `numinia-web:apps/store/src/components/lap/codex/CodexUmbral.astro` — «an identity funnel, not a wall» |

## Contexts

| Facet | Context that activates it | Provenance |
|---|---|---|
| Cosmic force | Lore, world-building | cited: `02-historia…` |
| Character resource | Character sheet, Action rolls | cited: `lore/game/manual/es/04-sistema-de-juego.md` — «reserva de D6 del Umbral» |
| Border | Peacekeeping plots involving the Legion | cited: `05-geografia…` — «La Legión del Umbral» |
| Trial portal | Onboarding escape rooms | cited: `session-zero.md` |
| Design register | Corporate or product pieces, everyday UI | cited: `web/src/pages/design.astro` — «the everyday surface (a page, an invoice)» |
| Access gate | A visitor without a session reaches the end of the open content | cited: `numinia-web:apps/store/src/i18n/codex.ts` — «Aquí termina lo que la ciudad muestra a los viajeros.» |

## Relations

- **Veil** (ES «Velo»): its antagonist in the world; in the design system, the register of depth (cited: `02-historia…`; `PRI-008`).
- **Prisma**: refracts the other two forces (cited: `02-historia…` — «Si el Velo y el Umbral son fuerzas antagónicas»).
- **Imbalance**: the state reached when Threshold points hit 0 (cited: `03-creacion…`).
- **Legion / Bearers of the Threshold**: groups of people named after the force (cited: `05-geografia…`; `02-historia…` — «Portadores del Umbral»).
- **Seals**: the reward for crossing the guild Thresholds (cited: `glossary-es-en.md`).

## Current manifestations

| Where | How it shows up | Source |
|---|---|---|
| Game (manual, adventures) | A force, a stat, the Legion, the four portals | `lore/game/manual/es/02–05`, `session-zero.md` |
| House (canon, standards, agents, guilds of the archive) | The base design register; the token `velo.lectura`: «What lies beyond the Umbral is seen and not read» | `PRI-008`, `standards/STD-023-design-values.md` |
| Web (numinia.org, numinia.com) | The three forces on the design page; the «Cruzar el Umbral» button; chapters marked «tras el Umbral»; the «Umbral seal» | `web/src/pages/design.astro`, `codex.ts`, `designs/DES-011-book-and-veil.md` |
| Processes | None; only a homonym (see Observations) | `standards/STD-001-the-series.md` |

## Existing equivalences

| Source | Equivalence it proposes | Evaluation | Why |
|---|---|---|---|
| `STD-026` | Base design register (business) · Threshold · Umbral | complete | Confirmed by the lore reviewer on 2026-10-05 as the business label of the visual register; the Veil is the atmospheric and the Prisma the adaptive design register (cited: Christian's answers, 2026-10-05 — «Umbral (Threshold) continúa como Registro Base de Diseño») |
| `STD-030` | none | pending | The Threshold does not appear in it |
| `DES-007` | none | pending | Its «thresholds» are gamification levels |
| `glossary-es-en.md` | Umbral → Threshold | complete | Covers the language only |
| `PRI-008` | the base register, «the force that invoices» | partial | Keeps manifestation and action. Drops the antagonism with the Veil and the order/chaos limit. Its reason for the name («the border anyone can cross») conflicts with «no es una muralla ni un portal» |
| `design.astro` | «the everyday surface» | reductive | Keeps only the plain, everyday side |
| `CodexUmbral.astro` / `DES-011` | the sign-in gate | partial | A genuine facet: crossing the Threshold is signing in, a registration (Christian's review, 2026-09-29). Earlier doubt, now answered: the manual says the force «No separa dos mundos», and the gate separates open from locked content |

## Observations

- **Homonym clash:** the archive's rules use «threshold» for how hard a document is to change (`STD-001`, `STD-017`, `STD-027`, `web/src/lib/classification.ts`). `DES-007` uses it for gamification levels, and `about.astro` calls the home page «the threshold». If the dial matches on the word alone, it will confuse these with the force.
- **Two web meanings (resolved):** in `PRI-008` the Threshold is a register; on numinia.com it is a portal, and crossing it registers you. Both are facets of one wide concept; neither wins (Christian's review, 2026-09-29).
- **Citation not found (answered):** `DES-011` cited «`PRI-008` §3.10» for `abierto / tras el Umbral`. `PRI-008` has no numbered sections, and a grep finds neither term in it. The lore reviewer confirms neither the manual nor a canonical section fixes them: they are a proposal until the visual identity or the brand registers' standard writes them in (Christian's answers, 2026-10-05); `DES-011` now says so.
- **Empty table cell (answered):** in the forces table, the UMBRAL «Simbolismo» cell is empty, while the VELO column lists «umbral» as one of its symbols (`02-historia…`). The lore reviewer fills it with «Límite, tránsito, acción, manifestación» and replaces the Veil's «umbral» with «revelación» (Christian's answers, 2026-10-05); the manual is not yet changed.
- Common-noun «umbral» in the lore («siglo Umbral», «un umbral entre un ciclo y otro») is not the force.

## Sources

- `lore/game/manual/es/02-historia-y-leyendas-de-numinia.md`, `03-creacion-del-personaje.md`, `04-sistema-de-juego.md`, `05-geografia-y-cultura-de-numinia.md`
- `lore/game/manual/glossary-es-en.md`, `lore/codex/glosario.md`, `lore/adventures/virtual-worlds/session-zero.md`
- `principles/PRI-008-visual-identity.md`, `standards/STD-023-design-values.md`, `STD-026`, `STD-030`, `STD-001`
- `designs/DES-011-book-and-veil.md`, `designs/DES-007-dual-nomenclature.md`
- `web/src/pages/design.astro`; `numinia-web:apps/store/src/components/lap/codex/CodexUmbral.astro`, `numinia-web:apps/store/src/i18n/codex.ts`

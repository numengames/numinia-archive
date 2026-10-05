---
id: "SYS-011:rank-oracle"
title: "Oracle"
type: entity
status: draft
version: "0.3.0"
created: "2026-09-29T12:10:00+02:00"
updated: "2026-10-05T16:55:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
license: "CC0-1.0"
category: "rank"
stage: draft
confidence: "medium"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Oracle

> **Summary:** The sixth and highest rank. In the world, the Oracles are the
> founders who dreamed Numinia back into being. In the house, it is the
> co-founders' seat: the people who approve the canon and hold the last word.

Every claim ends with where it comes from: **(cited: `path` — «heading»)**
when a source says it (quote it, in the source's language), **(inferred)**
when several uses support it (name them), **(proposed)** when it is a
plausible reading nobody has confirmed yet.

## Entity

| | |
|---|---|
| Name in the manual (ES) | Oráculo (cited: `lore/game/manual/glossary-es-en.md` — «Rangos — Ranks») |
| Name in English | Oracle (cited: same) |
| Category | rank: the sixth of six, per the Oracle's ruling of 2026-09-29 (cited: `standards/STD-003-platform-ranks.md` — «Six ranks, lowest first») |
| Also written as | «Oráculos», usually plural, in the manual (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Los Oráculos, Arquitectos del Equilibrio»); `oracle`, a rank id (cited: `numinia-web:packages/domain/src/constants/ranks.ts` — «id: 'oracle'»); `owner: "oracle"` in 198 file headers (inferred: grep count, e.g. `standards/STD-003-platform-ranks.md`, `principles/PRI-004-role-structure.md`) |

## Concept

The Oracle is the highest rank. Each rank contains every rank below it (cited: `principles/PRI-004-role-structure.md` — «each rank contains every rank below it»). Its holder is a founder: «one of the founders of the new Numinia» (cited: `principles/PRI-004-role-structure.md` — «Six things, not one»). In the world, the Oracles «no gobiernan, no dictan leyes»; their job is to «activar, inspirar y preservar los fundamentos de la ciudad» (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Los Oráculos, Arquitectos del Equilibrio»). The ranks just below it are defined by how close they are to the Oracles (inferred: uses in `principles/PRI-004-role-structure.md`).

## Constitutive traits

- Founding: they «soñaron la ciudad y abrieron el paso a su reconstrucción» (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Los Oráculos, Arquitectos del Equilibrio»).
- Collective and small: they began as five (cited: same — «Los Oráculos son cinco»); one was lost on the way, so four remain, as on the platform (cited: `standards/STD-003-platform-ranks.md` — «No more than four Oracles»; Christian's review, 2026-09-29).
- Held by being named, not by being counted: «An Oracle is named on the list of Oracles» (cited: `standards/STD-003-platform-ranks.md` — «What each rank adds»).
- Cannot be banned, and every privileged action it takes is logged (cited: same — «Nobody acts upward»).
- Exclusive space: the Cámara de los Secretos is «accesible únicamente para los Oráculos» (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Templo de Khepri»).

## Facets

| Facet | What it is | Provenance |
|---|---|---|
| Founder (lore) | One of the five 2020 researchers who opened the breach at Tuna el-Yebel | cited: `lore/game/manual/es/02-historia-y-leyendas-de-numinia.md` — «autodenominados los Oráculos» |
| Custodian of the ethos | Steps in only when the ethos is threatened | cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «los Oráculos se manifiestan» |
| Designer of the system | Designed «La Quinta Forma» and the Consejo de Concordia | cited: same — «Órgano Creador» |
| Top of the ladder | Rank 6, holding every permission below it | cited: `standards/STD-003-platform-ranks.md` — «Ranks add up» |
| System administrator | Appoints and removes Archons, changes rank permissions, configures the system | cited: same — «What each rank adds»; `numinia-web:packages/domain/src/constants/permissions.ts` — «'edit-system-config'» |
| Approver / last word | The canon changes only with the Oracle's approval, and only an Oracle moves a major version | cited: `standards/STD-017-who-may-change-what.md` — «The canon needs the Oracle's approval» |
| Operator of agents | «The operator is the Oracle (Pablo FM)» | cited: `agents/INDEX.md` — «What every agent shares» |

## Contexts

| Facet | Context that activates it | Provenance |
|---|---|---|
| Founder / custodian | Manual chapters 2 and 5, and play | cited: `lore/codex/glosario.md` — «Oráculos» |
| Top of the ladder | Character sheet, and rank checks on numinia.com | cited: `numinia-web:packages/domain/src/constants/ranks.ts` — «level: 5» |
| Approver | Canon changes, rulings, escalations | cited: `AGENTS.md` — «Escalating to the Oracle» |
| Operator | Mission briefs and gated agent actions | cited: `agents/INDEX.md` — «Authority» |

## Relations

- **Archon** — rank 5, the «closest circle» to the Oracles. Archons are promoted and removed only by an Oracle (cited: `standards/STD-003-platform-ranks.md` — «An Archon was promoted by an Oracle»).
- **Vernacular** — rank 4, inside the Oracles' circle of trust (cited: `principles/PRI-004-role-structure.md` — «inside the Oracles' circle of trust»).
- **Consejo de Concordia** — designed by the Oracles, who have non-voting observers on it (cited: `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md` — «Observadores de los Oráculos»).
- **Archivo Summa** — founded by the Council «con aval de los Oráculos» (cited: same — «Archivo Summa»).

## Current manifestations

| Where | How it shows up | Source |
|---|---|---|
| Game (manual, adventures) | Five founders; not a player rank in the ES chapters | `05-geografia-y-cultura-de-numinia.md`; inferred: grep of `lore/game/manual/es/` |
| House (canon, standards, agents, guilds of the archive) | Approver, header owner; four named holders | `STD-017`; `agents/INDEX.md` — «## Oracles» |
| Web (numinia.org, numinia.com) | .org lists Oracles from the agents index; .com rank `oracle` holds all 22 permissions | `web/src/lib/agents.ts` — «The Oracles, read from the agents index»; `numinia-web:packages/domain/__tests__/permissions.test.ts` — «exactly the 22 declared permissions» |
| Processes | Escalation, rulings, approvals | `AGENTS.md` — «PRO-005», «PRO-008» |

## Existing equivalences

| Source | Equivalence it proposes | Evaluation | Why |
|---|---|---|---|
| `STD-026` | Founding Partner (business) · Oracle · Oráculo — the business label chosen by the Oracle on 2026-10-05, on the lore reviewer's answer | complete | A founder who also decides and acts: keeps the founding facet and the approver facet. Supersedes «Executive» and «Council lead» (cited: Christian's answers, 2026-10-05 — «Founding Partner, como Socio Fundador») |
| `STD-030` | none for Oracle; it defers the ranks to «a document of their own» | pending | No business term has been proposed yet |
| `DES-007` | Founding Partner / Founding Partner / Oracle / Arconte / Oráculo (until 2026-10-05: Executive / Founder / Council Lead) | partial | The business stops now follow `STD-026`. Using «Arconte» at stop 7 still merges two ranks |
| `DES-007` Numinia stop | «The Oráculos govern from the Summa Archive» | contradictory | Manual: «no gobiernan»; the Archive was founded by the Council, with the Oracles' endorsement |
| `STD-003` | admin / top RBAC role | partial | Covers permissions and the facet of being unbannable. Drops the founding and ethical facets |
| `PRI-004` | co-founder | partial | Accurate, but says nothing of the approver or operator facets |

## Observations

- **Ladder check:** `PRI-004`, `STD-003`, the glossary and `ranks.ts` all match the ruling: six ranks, same order. But no ES manual chapter defines the ladder (Nómada and Peregrino never appear there as ranks), and the glossary's rank table came from web code (cited: `lore/game/manual/glossary-es-en.md` — «Taken verbatim from `numinia-web/packages/domain/src/constants/`»).
- **Count (resolved):** the Oracles began as five and one was lost. The Chronicles of Numinia tell that he was caught in a sandstorm and, lost and confused, entered the Inversion Rift in the Neuma Subvale, passing to another plane of existence and leaving Numinia (Christian's review, 2026-09-29 — «quedó atrapado en una tormenta de arena […] terminó por introducirse en la Grieta de Inversión, en el Subvalle de Neuma»). Four remain: STD-003's cap and the four named in `agents/INDEX.md` agree with that. The manual still says «son cinco» without the loss; this story is not yet in the manual (proposed: a line in chapter 5 beside «La Grieta de Inversión»).
- **Singular vs plural (answered):** the house says «the Oracle» (Pablo, as operator; `agents/INDEX.md`), but the rank has four holders. The lore reviewer keeps formulas like «the Oracle's approval» (`STD-017`), read as *the Founding Partner's approval*; which Oracle is meant is for the Oracles to settle, with no proper names in a structure meant to be replicable (Christian's answers, 2026-10-05).
- **Rank vs institution:** the manual presents a founding collective with an «Órgano Creador», which reads close to an institution. The ruling says rank. Left open.
- **Observers conflict:** the Oracles' observers on the Council are «Arcontes» in one passage and «Vernáculos» in another (`05-geografia-y-cultura-de-numinia.md`, «Pensamiento organizado» section vs «El Consejo de Concordia»).
- **Business label (answered):** the dial's business stop takes «Founding Partner» (ES «Socio fundador»), not «Executive», which now names the Archon (`STD-026`, 2026-10-05).

## Sources

- `lore/game/manual/es/05-geografia-y-cultura-de-numinia.md`, `lore/game/manual/es/02-historia-y-leyendas-de-numinia.md`, `lore/codex/glosario.md` — world facets
- `principles/PRI-004-role-structure.md`, `lore/game/manual/glossary-es-en.md` — rank and names
- `standards/STD-003-platform-ranks.md`, `standards/STD-017-who-may-change-what.md`, `agents/INDEX.md`, `AGENTS.md`, `web/src/lib/agents.ts` — house facets
- `designs/DES-007-dual-nomenclature.md`, `standards/STD-030-the-worlds-vocabulary.md` — equivalences
- `numinia-web:packages/domain/src/constants/ranks.ts`, `permissions.ts` — platform

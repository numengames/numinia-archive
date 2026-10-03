---
id: "BLU-014"
uid: ""
title: "The Platform"
type: blueprint
status: active
version: "1.0.2"
created: "2026-09-09T12:00:00+02:00"
updated: "2026-10-03T19:40:00+02:00"
author: "ursa"
owner: "oracle"
section: "Brand and marketing"
tags: [blueprint, design, recipes]
license: "CC0-1.0"
related_missions: ["MIS-0146"]
related: ["STD-008", "STD-023", "BLU-009", "CAN-008"]
extraction_note: "Extracted verbatim from PRO-014 v1.1.0 (then its sections 6.11) under ADR-043 and ADR-044: recipes leave the protocol; the protocol keeps the order of decisions and the checklist. The direction decision it records (the Platform's primary is ink) is CAN-008's; this blueprint applies it."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# BLU-014 — The Platform

> **Summary:** Diurno by default with Nocturno toggle, level I, tool density, sidebar and content; the primary is ink, colour only informs; amounts and wallets always in Mono.
> **Epistemic:** A recipe. The rules it applies are `STD-008`; the values it names are `STD-023`; the order of decisions is `PRO-014`.
> **Pragmatic:** Followed literally by an agent producing this medium.
> **Audience:** Agents

---

## 1. The Platform

*The blueprint in one line:* Diurno by default with Nocturno toggle, level I, tool density, sidebar + content, data per `STD-023` §7 and figures in tabular Mono.

**The direction decision — the Platform's primary is ink:** Noche over light, Arena over dark (16.1:1). The platform is a sober tool: the main action dresses in ink, and color stays for what informs — links and focus in turquesa-text, states with the semantic tints (`STD-023` §2), data with the `STD-023` §7 palette. The `#017C8D` fill (`BLU-009` §7) remains the primary of the product-game and the web; here it would be brand noise over work. The living product already practiced it: it is canonized.

**Skeleton:**

```
┌ sidebar 240px ────────┬─ contenido ────────────────────────────┐
│ [wordmark 20px tinta] │  Título de vista (titulo.m)            │
│ GRUPO (etiqueta)      │  pestañas: activa subrayado 2px Ámbar  │
│ ○ Ítem  (fila 40px)   │  tarjetas en superficie + sombra `STD-023` §9    │
│ ● Activo = píldora    │  tablas: cabecera etiqueta Ámbar,      │
│   tinta/papel         │  cifras Mono tabular, filas 40px       │
│ …                     │  [primario tinta]  [fantasma]          │
│ [usuario · wallet]    │                                        │
└───────────────────────┴────────────────────────────────────────┘
```

Rules: sidebar in `superficie`; items in secondary text with Phosphor `regular` 18 px icon; **active = ink pill with paper text** (`control` radius, the same piece in both modes); groups with `type.etiqueta`; density: rows 36–40 px, padding `s300/s400` (the platform is compact, marketing breathes); amounts and wallet addresses ALWAYS in Mono (truncated `0x42e6…cA26` with the full title); state empties with `light` icon 48 px + one level I sentence; rarity (`STD-023` §4) only in inventory and loot, never in billing. Migration of the living product: white → paper `#F9EBDC`/`#FDF6EE`, black → Noche `#14110F`; the structure is not touched.

**The platform table (resolved, with sorting).** Header in `type.etiqueta` Ámbar (toasted in Diurno); sortable column = a button with a `bold` 12 px caret that appears on hover and stays fixed on the active column (label to primary text); `aria-sort` on the active `th`; figures in tabular Mono aligned right; 40 px rows, hover = one surface step (`CAN-008` §3.9-04); selection by checkbox in the first column; state in a `BLU-009` §7 pill; empty and error per `BLU-009` §8. Demonstrated sorting live in the guide.

## Check

After the general checklist in step 6 of `PRO-014`, and before delivering:

- [ ] Diurno by default; ink primary; compact density (rows 36–40 px, padding `s300/s400`).
- [ ] Wallets and amounts in Mono, truncated with the full title.
- [ ] Active sidebar item = ink pill with paper text, same piece in both modes.
- [ ] Rarity only in inventory and loot, never in billing.
- [ ] Tables: `aria-sort` on the active header; figures right-aligned tabular Mono; empty and error states per `BLU-009`.

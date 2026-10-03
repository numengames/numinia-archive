---
id: "BLU-012"
uid: ""
title: "The presentation deck"
type: blueprint
status: active
version: "1.0.3"
created: "2026-09-09T12:00:00+02:00"
updated: "2026-10-03T21:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "Brand and marketing"
tags: [blueprint, design, recipes]
license: "CC0-1.0"
related_missions: ["MIS-0146"]
related: ["STD-008", "STD-023", "BLU-009", "CAN-008"]
extraction_note: "Extracted verbatim from PRO-014 v1.1.0 (then its sections 6.3) under ADR-043 and ADR-044: recipes leave the procedure; the procedure keeps the order of decisions and the checklist."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# BLU-012 — The presentation deck

> **Summary:** 1920×1080 Nocturno, one idea per slide, four slide blueprints, Geist 500 display — the serif of earlier decks is legacy.
> **Epistemic:** A recipe. The rules it applies are `STD-008`; the values it names are `STD-023`; the order of decisions is `PRO-014`.
> **Pragmatic:** Followed literally by an agent producing this medium.
> **Audience:** Agents

---

## 1. The deck

1920×1080, Nocturno, 120 px margins; one idea per slide; max 4 cards; binary separators; closing = contact + steps + scarab. **Legacy guard:** the deck's display is **Geist 500** — the serif of earlier presentations (including the Presentación Numinia v0.6.0) is out-of-system legacy and MUST NOT be imitated when generating new slides.

**Slide blueprints** (12-col grid; measures in canvas px):

```
PORTADA                                CONTENIDO + IMAGEN (el patrón de la casa)
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│         (retícula 6%)        │      │ EYEBROW MONO ÁMBAR        ┌──────────┐│
│                              │      │ Título display.m          │ imagen   ││
│        [wordmark]            │      │                           │ velo .72 ││
│   Subtítulo cuerpo.l ámbar   │      │ Cuerpo cuerpo.m/l         │ [icono   ││
│   Presentado por … texto-2   │      │ máx 58ch, texto-2         │  light   ││
│                              │      │                           │  ≥48px]  ││
└──────────────────────────────┘      └───────────────────────────┴──────────┘

TARJETAS (máx. 4)                      CIERRE
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│ EYEBROW · Título display.m   │      │ EYEBROW pregunta · Título CTA         │
│ Entradilla                   │      │ [personas: foto b/n + cargo + mono]   │
│ ┌─────┐ ┌─────┐ ┌─────┐      │      │                                       │
│ │icono│ │icono│ │icono│      │      │   Frase de marca con better en Ámbar  │
│ │ h3  │ │ h3  │ │ h3  │      │      │            [escarabajo]               │
│ └─────┘ └─────┘ └─────┘      │      └───────────────────────────────────────┘
└──────────────────────────────┘
```

The image **always** carries the veil `rgba(20,17,15,.72)` as a minimum; the top-right ghost icon is Phosphor `light` in `texto-3` and MAY be omitted.

## Check

After the general checklist in step 6 of `PRO-014`, and before delivering:

- [ ] 1920×1080, Nocturno, 120 px margins; one idea per slide; at most four cards.
- [ ] Display in Geist 500; no serif imitated from earlier decks.
- [ ] Every image under the canonical veil `rgba(20,17,15,.72)` at minimum.
- [ ] Closing slide = contact + steps + scarab.

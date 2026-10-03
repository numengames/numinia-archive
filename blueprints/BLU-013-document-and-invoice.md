---
id: "BLU-013"
uid: ""
title: "Document and invoice"
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
related: ["STD-008", "STD-023", "BLU-011", "CAN-008"]
extraction_note: "Extracted verbatim from PRO-014 v1.1.0 (then its sections 6.4) under ADR-043 and ADR-044: recipes leave the procedure; the procedure keeps the order of decisions and the checklist."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# BLU-013 — Document and invoice

> **Summary:** Diurno A4 at level III, no texture, tabular figures, compact rhythm; the invoice fits on one page and its total is the only display figure.
> **Epistemic:** A recipe. The rules it applies are `STD-008`; the values it names are `STD-023`; the order of decisions is `PRO-014`.
> **Pragmatic:** Followed literally by an agent producing this medium.
> **Audience:** Agents

---

## 1. The document and the invoice

Diurno, A4, level III, no texture; tabular Mono figures; footer `AAAA_MM · Confidencial`; the proposal closes with scope, total without VAT and three numbered steps. **Compact rhythm** [learned by producing]: on A4 the section rhythm is `s500` and the interior `s300–s400` — `s700` is screen rhythm and overflows the paper. An invoice MUST fit on one page; canonical template at `plantillas/2026_08_03-Plantilla_Factura-v1.0.0.html`, with the total as the only display figure in toasted Ámbar and `page-break-inside: avoid` on rows and footer.

**Invoice block order** (the skeleton the template implements):

```
[wordmark 22px, tinta]……………………[«Factura» 19pt · nº en mono ámbar-texto]
[EMISOR | CLIENTE]           ← dos columnas, borde superior 1px tinta
[fecha · vencimiento · referencia]   ← banda en superficie FDF6EE
[tabla: CONCEPTO (con detalle en 9pt) | CANT | PRECIO | IMPORTE]
[base imponible / IVA / TOTAL]       ← derecha, 72mm; TOTAL única cifra display
[forma de pago | IBAN]               ← banda en superficie
[legal 8pt terciario]
[escarabajo 26px]…………………………[id de documento en mono 8pt]
```

## Check

After the general checklist in step 6 of `PRO-014`, and before delivering:

- [ ] Diurno, A4, level III, no texture; figures in tabular Mono; footer `AAAA_MM · Confidencial`.
- [ ] Section rhythm `s500`, interior `s300–s400`; nothing at `s700`.
- [ ] The invoice fits on one page; total as the only display figure, in toasted Ámbar; `page-break-inside: avoid` on rows and footer.
- [ ] The invoice inherits nothing from the living paper (`BLU-011`): pure Geist, no third voice, no Veil frame.

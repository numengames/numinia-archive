---
id: "BLU-015"
uid: ""
title: "Event, 3D and email"
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
related: ["STD-008", "STD-023", "CAN-008"]
extraction_note: "Extracted verbatim from PRO-014 v1.1.0 (then its sections 6.5, 6.7 and 6.8) under ADR-043 and ADR-044: recipes leave the procedure; the procedure keeps the order of decisions and the checklist."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# BLU-015 — Event, 3D and email

> **Summary:** The three media whose recipe is a paragraph: the physical event, the 3D scene and the email.
> **Epistemic:** A recipe. The rules it applies are `STD-008`; the values it names are `STD-023`; the order of decisions is `PRO-014`.
> **Pragmatic:** Followed literally by an agent producing this medium.
> **Audience:** Agents

---

## 1. Physical event

Credential in Diurno legible at 1.5 m; badges with name+symbol+color; signage legible at 10 m without depending on color; reusable supports, low-consumption inks.

## 2. 3D and metaverse

Canonical normal map as PBR material (Three.js); Ámbar as warm key light, Turquesa as cold fill; objects carry their rarity in material + label, never emissive alone.

## 3. Email

Body in level I or III, plain text or minimal HTML; no decorative images. **Signature:** name in Sans 600 · role in tertiary · contact in Mono, each datum on its line; no logo as an attached image (the wordmark only if the email client supports it inline); a single link in color, the rest in ink.

## Check

After the general checklist in step 6 of `PRO-014`, and before delivering:

- [ ] Event: credential legible at 1.5 m, signage at 10 m, neither depending on colour.
- [ ] 3D: low-poly register (`CAN-008`), flat palette colour, no photographic textures; Ámbar key + Turquesa fill; rarity in material + label, never emissive alone.
- [ ] Email: level I or III, no decorative images, one coloured link, no logo as attachment.

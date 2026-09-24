---
id: "RPT-018"
uid: ""
title: "The Alpha story: what missions/ ships while it is the alpha board"
type: report
subtype: analysis
status: active
version: "0.3.0"
created: "2026-09-08T20:30:00Z"
created_source: "git:4a60735"
created_confidence: exact
updated: "2026-09-09T00:45:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
tags: [alpha, narrative, missions, compression]
license: "CC-BY-4.0"
visibility: "public"
scope: "Every mission closed while `missions/` is the alpha board, recorded here at closure and deleted from `missions/` under ADR-040. The MVP's story is `RPT-017`; this one starts where it stops."
related: ["RPT-017", "ADR-030", "ADR-040", "PRO-003", "MIS-127"]
absorbs: []
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# The Alpha story: what `missions/` ships while it is the alpha board

> **Summary:** `RPT-017` closed the MVP: 115 missions compressed into one
> narrative and deleted. From `4a60735` (2026-09-08) `missions/` holds only
> the 18 cards that ship the numinia-nwos alpha. Each one that closes is
> recorded **here**, in a dated line, and deleted the same day — the
> anti-inflation mechanism `ADR-040` made lawful, applied at the cadence
> of one report per phase.
> **Epistemic:** what was done, in the words the closure used, with the
> commit that proves it. No card survives its closure; this line does.
> **Pragmatic:** `absorbs:` in this header is where the deleted
> identifiers resolve, and where `/missions/mis-NNN` redirects.

## How this report grows

*Amended 2026-09-08 (`ADR-042`):* this report is an **index**, not a
ledger. Closures land as one line each in the **weekly roll-up** report
(`PRO-017`); this report cites the week, not the line (`STD-012`,
`DEF-006`). The two lines already below — `MIS-121`, `MIS-151` — stay as
written and move to week 37's report at the first roll-up, Monday
2026-09-14. When the Oracle declares the alpha shipped, this report is
versioned as its record and the next phase opens its own report.

## Board at the start

18 missions at `4a60735`: `in-progress` 121, 127, 135, 142, 146, 151;
`todo` 096, 100, 101, 112, 113, 123, 124, 131, 134, 149, 150, 153.

## Closed

- 2026-W37 — `RPT-019`: `MIS-146` (normative refoundation) closed; the
  standards library is alpha-shaped.

---

## Version history

- v0.3.0 (2026-09-09) — first weekly pointer: `RPT-019` (2026-W37).
- v0.1.0 (2026-09-08) — created as the destination for alpha-board
  closures, so `RPT-017` stops growing.

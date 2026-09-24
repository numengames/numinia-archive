---
id: "SYS-003"
uid: ""
title: "The Archive's Fonds"
type: documentation
subtype: reference
status: active
version: "3.0.0"
created: "2026-08-17T19:10:09Z"
created_source: "git:715cc53"
created_confidence: exact
updated: "2026-09-20T19:30:00+02:00"
author: "claude-fable-5"
owner: "oracle"
tags: [system, archive, fonds, taxonomy, classification]
territory: "CAO"
license: "CC0-1.0"
extraction_note: "Extracted from the /archive pages under MIS-065 phase C (File over App), then inverted: until 2026-09-20 this frontmatter carried a `fondos:` array of seven entries and a `graph:` block that the viewer rendered directly, so the reference manual doubled as the page's database. ADR-046 retired that model — one fond, six functions — and both blocks were deleted with it. The /archive pages now read the scheme from STD-027 and STD-001 (web/src/lib/classification.ts): this document is prose again, and the standards are the source. Translated to English under MIS-116 (ADR-023)."
former_id: "BLU-005"
former_id_note: "Renumbered by MIS-129 under ADR-035: this is the reference manual of the classification, not a plan."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# The Archive's Fonds

> **Summary:** The Archive's taxonomy in prose: one fond, six functions, the
> activities under each, and the series each produces. The scheme itself is
> `STD-027` and the series register is `STD-001` — the viewer's `/archive`
> pages read those two, not this document.
> **Epistemic:** How the system's memory is organized.
> **Pragmatic:** Canonical reference for the fonds and their relations.
> **Audience:** Agents · Oracles

---

## One fond, six functions

This document called seven folders "fondos" until 2026-09-20. They are
**series of a single fond** — the whole output of one producer, Numen
Games S.L. The scheme that groups them is `STD-027`; this is its manual.

| Function | Activity | Series | Governance |
|---|---|---|---|
| **Governance** | Founding | `canon/` | Oracle only. Blocking CODEOWNERS. |
| | Standardising | `standards/` | An ADR, or a PR the Oracle approves. |
| | Prescribing | `protocols/` | New version = new file. |
| | Deciding | `decisions/` | Append-only. Superseded, never deleted. |
| **Production** | Planning | `blueprints/` | Oracle approves the merge. |
| | Executing | `missions/` | Only the executor edits their active mission. |
| **Assurance** | Observing | `reports/` | Closed: substance is not reopened. |
| | Admitting | `debt/` | Open: a pull request. |
| | Verifying | `machine/guards/` · `machine/tools/` · `machine/scripts/` | Instruments, not records. |
| | Measuring | `machine/telemetry/` | Regenerated, never hand-edited. |
| **Agency** | Constituting | `agents/` | SOUL/OPERATOR: Oracle. STATUS: the agent. |
| **Creation** | Worldbuilding | `lore/` | A second fond (`ADR-046`). CC0. |
| | Cataloguing | `objects/` | Open: a pull request. |
| **Administration** | Sustaining | `operations/` | Oracle modifies; agents propose. |
| | Wiring | `system/` | An ADR, or an approved PR. |
| | Templating | `machine/templates/` | Instruments, not records. |

## The second fond

`lore/` is recognised as a fond of its own: a different producer
relationship and a different licence regime from the administrative
corpus (`ADR-046`). It is listed here because the two fonds are read
together, not because it belongs to the first.

## Relations

```
         Governance
        /          \
   Agency  ←→  Production ── Assurance
      |        /    |
 Administration    Creation
```

Governance feeds agency and production; administration sustains them;
production is observed by assurance and born from planning; creation
supplies what production builds with. The viewer draws the same relations
at `/archive`; where a node sits in that diagram is presentation and is
declared in the viewer, not here.

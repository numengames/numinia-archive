---
id: "OPS-008"
uid: ""
title: "Session state — where to pick up"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-18T15:09:29Z"
created_source: "git:7e0e0a9"
created_confidence: inferred
updated: "2026-08-27T19:59:10Z"
author: "claude-fable-5"
owner: "oracle"
tags: [operations, handoff, session, state]
license: "CC-BY-4.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# Session state — where to pick up

> **Summary:** Continuation point at the close of the 2026-08-18
> session. What stayed alive, what awaits signature, and what the next
> step is on every front.
> **Epistemic:** The real state of the system at close, without
> rebuilding it from the commits.
> **Pragmatic:** A new agent (or the Oracle) opens this and knows where
> to continue.
> **Audience:** Agents · Oracle

**Usage rule:** this document is rewritten at the close of every
session — no history accumulates here (that is what `CHANGELOG.md` and
the board are for). First step of any session: `git pull` and audit
(AGT-001); what is written below was true at close, not necessarily now.

---

## 1. What awaits your signature (Oracle)

| What | Where | Pending decision |
|---|---|---|
| **Design System v5.1.0** | `STD-008` (then `standards/STD-008-design-system`) · [web](https://numinia.org/corpus/standards/std-008-design-tokens) | State still «proposed»; sign it or send it back |
| **MIS-089** information architecture | [web](https://numinia.org/missions/mis-089) | D1–D8 register of duplicates: approve dispositions |
| **MIS-095** Updates practice (PM-06) | [web](https://numinia.org/missions/mis-095) | 3 decisions: numinia.org versioning, language, SHOULD/MUST level |
| **MIS-096** sovereign versioning of NWOS | [web](https://numinia.org/missions/mis-096) | 5 open questions; the key one: what is the «NWOS core» |
| **Icon-subset expansion** | [MIS-093](https://numinia.org/missions/mis-093) | 69 Phosphor glyphs in use; ratify the vocabulary |

## 2. Open fronts, by state

- **Archive / information (MIS-089, draft):** 5-phase plan, F0 awaits
  signature. Duplicates detected and untouched: the game manual
  duplicated (.txt and .md), 2 audits in `blueprints/`, 3
  `archive-summa-*` that are a fondo, reports with a double source
  (`reports/daily/` vs 5 hardcoded pages), three naming conventions,
  manual INDEXes, ~32 files without frontmatter.
- **Propagation / sovereignty (MIS-068 in-progress, MIS-096 draft):**
  G-11 and G-12 written into `GOVERNANCE.md`; CON-006 registered. Still
  missing: version the NWOS core and reformulate the guard (it
  detects, it does not compel).
- **Design (MIS-092, MIS-093, MIS-094 done):** canonical palette,
  Phosphor icons, kit 5.1.0 with sha256 manifest published at
  `/diseno/kit/5.1.0/`. Pending: the kit regenerated as `sistema.*`
  when the issuer packages it, and `web/DESIGN.md` (superseded) awaits
  the Oracle's conservation list.
- **Legal (MIS-086 done):** published on numinia.org and numinia.com
  with pre-login acceptance in the LAP. **CON-004 and CON-005 remain
  open**: review flags FLAG-2..6 and the scope mismatch (the texts
  govern www.numen.games).
- **From the numinia-web agent (backlog, unassigned):** MIS-100 to
  MIS-107 — branch protection, the mould passing its own checklist,
  consumers pinning kit 5.1.0, the 17-repo inventory, the ghost
  Worker, **MIS-105 (sign the standards and define the sync — touches
  G-12/MIS-096 directly)**, the retired name in the mould, and
  numen.games ignoring its locale.

## 3. Technical state verified at close

- Working tree clean, `main` == `origin/main`, everything deployed.
- numinia.org: 475+ pages, 232 PDFs (28.6 MB), icon sprite at
  `/icons.svg` cached; missions board 186 KB (was 293).
- License guard green (202/236 .md declare a license).
- Deploy flow: `npm run build` → `npm run build:pdf` → `npx wrangler
  deploy` (CI only builds; the PDFs need local Chromium).

## 4. Rules learned this session (already written where they belong)

- **G-11** (`GOVERNANCE.md`): the canon is not copied, it is pinned.
- **G-12** (`GOVERNANCE.md`): a derived NWOS repo is sovereign; it is
  offered versions, not imposed law. With its error class to watch.
- **PRO-008 v1.2.0**: everything submitted for review carries its
  canonical numinia.org URL (L3 bridge between agents).
- **P-010 §3.1**: mission IDs are computed over what is committed after
  pull; on collision, whoever committed second renumbers.

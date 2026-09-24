---
id: "OPS-002"
uid: ""
title: "Pending contradictions — register"
type: documentation
status: active
version: "1.3.0"
created: "2026-08-17T20:00:17Z"
created_source: "git:8b72b9b"
created_confidence: inferred
updated: "2026-08-31T00:20:00+02:00"
author: "claude-fable-5"
owner: "oracle"
tags: [operations, contradictions, backlog, truth]
license: "CC-BY-4.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# Pending contradictions — register

> **Summary:** Contradictions detected between system sources that
> nobody has resolved yet. They are documented, not silently
> reconciled: settling them is the Oracle's decision, in a dedicated
> session.
> **Audience:** Oracles · Agents

**Rule:** an agent that detects a contradiction adds it here with its
two sources and does NOT pick a side. When the Oracle resolves it, the
entry moves to the "Resolved" section with the decision and its date.

---

## Open

### CON-002 — Wardley: commoditization window and layers

- **Detected:** 2026-08-17 (MIS-071 phase 2, reconciliation)
- **Source A:** `reports/RPT-003-wardley-map.md` (pre-v0.2.0) — window of
  12–18 months; Mission System grouped under "Frontier (Genesis)".
- **Source B:** the `/wardley` page — window of 18–24 months; Mission
  System under "The Differentiators"; coordinates with ±1 jitter on 7
  of 12 components.
- **Current state:** both versions coexist in `RPT-003-wardley-map.md`
  v0.2.0, the page's marked "(per /wardley)".

### CON-004 — Legal texts published with open review flags

- **Detected:** 2026-08-18 (publication of the legal texts on numinia.org)
- **Source A:** `operations/legal/OPS-003-privacy-policy-numengames.md`
  — frontmatter: FLAG-2..6 open, "must be resolved before external
  use"; the T&C ask to "verify against the original before external
  use". Oracle's note (FLAG-1 record): these texts were not published
  on any website; the archive is the master.
- **Source B:** Oracle's order (session 2026-08-18) — publish both
  documents on numinia.org (footer + pages) with the flags open,
  recording the exception here to address it later.
- **Current state:** published at `/legal/terminos` and
  `/legal/privacidad` deriving from the master at build; the flags
  remain open in the master's frontmatter.
- **Scope extended (2026-08-18, MIS-086):** also published on
  numinia.com (`/legal/terms/`, `/legal/privacy/`, five locales), as
  verbatim copies of the master in `apps/store/src/content/legal/`.
  The exception now covers two sites: resolving the flags closes both.

### CON-005 — Scope of the legal texts: numen.games vs numinia.org

- **Detected:** 2026-08-18 (publication of the legal texts on numinia.org)
- **Source A:** the two legal documents define their scope as
  `www.numen.games` ("These Terms … govern your access to and use of
  our website www.numen.games"; the privacy policy, likewise).
- **Source B:** the order publishes them as the footer legal texts of
  `numinia.org`, a site the texts do not mention.
- **Detail:** the order also requires the terms to be accepted before
  login in the onboarding flow; numinia.org has no login and no
  onboarding (static site) — that requirement stays pending for the
  app that implements that flow.
- **Current state (2026-08-18, MIS-086):** requirement fulfilled on
  numinia.com — `/lap/session/` does not mount the widget until
  acceptance, and the login endpoint rejects (400) any signup that
  does not name the current corpus (`terms@1.0.0+privacy@1.1.0`),
  which travels inside the signed session. The scope mismatch remains
  open: the page declares it in a note outside the text ("Numinia está
  operada por Numen Games S.L.; este texto se refiere a
  www.numen.games; su alcance está en revisión"), without touching a
  single comma of the master.

### CON-006 — Authority by fork vs sovereignty of the derived repo

- **Detected:** 2026-08-18 (the Oracle, on the MIS-095 draft)
- **Source A:** `STD-005` (then `standards/STD-005-engineering-standards`) §7.1 and header —
  numinia-nwos and «any workspace generated from the mould» are
  **downstream forks** that «receive this document through the fork
  relationship»; the sync mechanism is left open but the authority is
  taken for granted: what is written upstream applies downstream
  (MUSTs included).
- **Source B:** sovereignty principle (Oracle, 2026-08-18): **once an
  organization has created its NWOS repository, it is sovereign.**
  What makes sense is for the original NWOS to be **versioned** and
  for the organization to be able to **update** if it wants — not to
  receive law by fork inheritance.
- **Detail:** the design error slipped into the MIS-095 draft, which
  proposed writing a practice upstream «so it applies to all the
  webs». Corrected there. It pairs with **CON-003** (provenance: the
  document says numinia-nwos is a fork of the mould when it is the
  source) and with the doctrine that the canon is not copied (it
  is pinned) — which had already resolved this pattern for the Design
  System and had not been applied to the standards themselves.
- **What is missing:** version the original NWOS and define the
  sovereign-adoption model (MIS-096). The §7.1 part was resolved in
  **ADR-001 (formerly ADR-003)** (2026-08-20): it does not go upstream because there is
  no upstream — the correction is local and the mould is **offered**
  it (MIS-108).

## Resolved

### CON-001 — CAO roster: page vs blueprint

- **Detected:** 2026-08-17 (MIS-071 phase 2)
- **Source A:** `web/src/pages/cao.astro` — lists Alquimista-01 and
  Exegeta-01 as designed agents; Adonaz on `claude-sonnet-4.6`;
  Procurador-01 "designed" with no target year.
- **Source B:** `blueprints/BP-cao.md` (v0.2.0) — lists Ursa and Senet;
  Adonaz on `claude-haiku-3-5`.
- **Resolved:** 2026-08-31 by **ADR-030 (formerly ADR-032)**.
- **Decision:** the losing side removed. `blueprints/BP-cao-overview.md`
  — the 2026-04-07 dashboard snapshot that held the third, stalest
  version of the roster — extinguished as part of `blueprints/` joining
  the operational series. `BP-cao.md` (v0.2.0) and the live `/cao` page
  remain; their own divergence, if any, is a separate question this
  entry never covered.

### CON-003 — Provenance of `STD-005` (then `STD-005-engineering-standards`)

- **Detected:** 2026-08-17 (adoption of the standard)
- **Source A:** `STD-005` (then `standards/STD-005-engineering-standards`) §Downstream and
  §7.1 — claims that `numengames/numinia-nwos` "is a fork of the mould"
  (`numen-games-nwos-orgs/nwos-workspace-template`) and receives the
  document through the fork relationship.
- **Source B:** the ecosystem's operational canon — numinia-nwos IS
  the source of truth; the `numen-games-nwos-orgs` repos do not drink
  from it, and numinia-nwos is not a fork of nwos-workspace-template.
- **Note:** the correction, if warranted, goes upstream via ADR + PR
  (§7.1); the local copy is not edited.
- **Resolved:** 2026-08-20 by **ADR-001**.
- **Decision:** it was not a falsehood, it was a **register confusion**
  between two distinct artifacts. `STD-005` (then `STD-005-engineering-standards`)
  **originates here**: Numinia is NWOS's first client and its proving
  ground. The mould's copy is a **starting proposal** that binds
  nobody and becomes governed by whoever adopts it (sovereignty of derived repos, `STD-005` §1 and `PRO-016`). They are
  not the same document; the identical bytes were a coincidence of
  youth, not dependency. The divergence is adoption, not drift, and it
  is not synced.
- **Lineage evidence:** distinct git roots — numinia-nwos `9f51ad1`
  (2026-04-06), nwos-workspace-template `8f2037d` (2026-04-07, «Add
  files via upload»). No shared history.
- **Real cost before resolution:** §7.1 not only failed to prevent the
  error, it **ordered** it: an agent read «refuse the local edit» and
  proposed sending the correction to another organization's repo.

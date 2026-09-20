---
id: "ADR-046"
uid: ""
title: "The archive is classified by function, and instruments are not records"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-20T12:00:00+02:00"
updated: "2026-09-20T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decisions, adr, classification, archive, functions]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "One fond, six functions, sixteen activities; what verifies, measures, moulds or packages the archive moves under machine/ and is not a record; lore/ is recognised as a second fond."
amends: ["STD-001", "SYS-003"]
related: ["STD-027", "STD-024", "STD-012", "ADR-030"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# ADR-046 — The archive is classified by function

> **Summary:** The repository is arranged as one fond of six functions; the
> non-documentary folders gather under `machine/`; `lore/` is a second fond.
> **Epistemic:** The corpus already behaved like a functional classification —
> it was described in a vocabulary no archivist would recognise, and in one
> place described wrongly.
> **Pragmatic:** `STD-027` holds the scheme, `STD-001` gains two columns,
> `SYS-003` stops saying "seven fondos".
> **Audience:** Agents · Oracles

---

## 1. Context

Twenty top-level folders sit at the same level. Eleven hold records; six are
instruments — guards, tools, scripts, templates, telemetry, packages — and
`web/` is a renderer. A reader cannot tell which is which from the tree.

`SYS-003` calls seven of them "fondos". In archival terms a fond is the whole
output of one producer: there is one fond here, and those seven are series of
it. The error is not internal — it is published at numinia.org/archive.

Between the fond and the series there is no level, so the eleven series answer
eleven unrelated questions with nothing grouping them.

What the corpus already has, unnamed: a classification scheme (`STD-001`), an
appraisal rule (`ADR-030`), a retention schedule (`STD-012`, `ADR-042`), a
transfer procedure (`PRO-017`), authority records (`agents/`), finding aids
(`README.md`, `objects/catalogue.json`), original order (`STD-018`) and a
custody record (git, `STD-020`). The instruments exist; the vocabulary does
not.

Measured cost of the move: 156 in-repo references to `guards/`, 129 to
`tools/`, 131 to `templates/`, 69 to `telemetry/`, 37 to `packages/`. `scripts/`
appears 4,459 times, almost all inside `web/` and lockfiles for an unrelated
`web/scripts/`. **No numbered document moves**, so no citation between corpus
documents breaks.

---

## 2. Decision

**The repository is arranged as one fond, classified by function.** Six
functions — Governance, Production, Assurance, Agency, Creation,
Administration — each holding the activities that generate records and the
series each activity produces. Functions are nouns, activities verbs
(NAA convention). The scheme is registered in `STD-027`.

**Instruments move under `machine/`.** `guards/`, `tools/`, `scripts/`,
`templates/`, `telemetry/` and `packages/` are not records: they carry no
identifier, are not appraised, and are never cited as evidence. They are
classified — under Verifying, Measuring and Templating — but they are filed
apart from the series.

**`lore/` is a second fond.** The creative corpus has a different producer
relationship and a different licence regime from the administrative one.
Recognised here; executed in a follow-up mission, since it moves published
URLs.

**Classification does not replace thresholds.** `STD-024` SER-001 ranks
documents by what a change costs; this scheme says which activity produced
them. `decisions/` is Governance by function and non-binding by threshold, and
that is not a contradiction (`STD-027` CLS-003).

Binding from ratification. `STD-027` is the register; `STD-001` keeps the
series table and gains Function and Activity columns.

---

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Describe the scheme, move nothing | The root still shows twenty peers and an archivist still cannot tell an instrument from a series. Half the gain for a third of the work, but the naming debt is paid twice |
| Physical two-level tree (`governance/canon/`…) | Breaks every plain-text citation in the corpus, every `/corpus/` URL and `STD-024` SER-005. The identifier is the path |
| Keep ISAD(G) vocabulary (fond → series → file → item) | Superseded by RiC-CM 1.0 in November 2023; a strict hierarchy is the model RiC exists to replace |
| Classify by subject or by guild | Subject classification is what functional classification replaced; guilds are organisational units, which the NAA rule forbids naming a function after |
| `apparatus/` as the instruments folder | Oracle preference for `machine/`: plainer, and `apparatus` in `STD-001` already means something narrower (the moulds) |
| Wait until the corpus is larger | 150 documents now, none of which move. The lexical debt is published and compounds |

---

## 4. Consequences

- **Obliges:** a new top-level folder declares its function before its first
  commit (`STD-027` CLS-004); an instrument never carries an identifier
  (CLS-002); `STD-001` rows carry Function and Activity.
- **Costs:** every in-repo path to the six moved folders is rewritten —
  CI workflow, `package.json` test globs, the guard registry, `REUSE.toml`,
  and the standards that cite guard scripts by path. Roughly 520 references,
  all mechanical, all caught by the existing pipeline. The `/archive` pages
  still render the seven-fondo model and must be redesigned separately.
- **Reversal:** if `machine/` proves to hide the guards from the people who
  maintain them — measured as guard changes taking longer to land — the six
  folders return to the root and the scheme stays as description only.

---

## 5. Status

`draft`. Proposed 2026-09-20 by `ursa`. Ratifies `STD-027` on the Oracle's
signature.

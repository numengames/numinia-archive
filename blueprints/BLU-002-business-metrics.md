---
id: "BLU-002"
uid: ""
title: "Business Metrics Framework — NWOS CAO"
type: blueprint
status: draft
version: "0.1.0"
created: "2026-04-07T18:53:00Z"
updated: "2026-04-07T19:03:00Z"
author: "nimrod"
owner: "oracle"
tags: [metrics, business, kpi, roi, cao, framework]
territory: "CAO"
related_missions: ["MIS-057", "MIS-048"]
license: "CC0-1.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->
# BP — Business Metrics Framework v0.1.0

> **Summary:** Framework for measuring the business value of the NWOS digital agent system.
> **Epistemic:** What to measure, why, and how — so ROI is demonstrable, not just felt.
> **Pragmatic:** A living metrics system that tracks cost, output quality, and velocity of the CAO.
> **Audience:** Agents · Oracles

---

> ⚠️ **Status: Draft v0.1.0** — Foundation layer only. Requires Pablo input to complete cost targets, quality thresholds, and growth model.

---

## Why measure

You cannot manage what you cannot measure. The CAO runs on real cost ($) and produces real output (code, decisions, documents, business actions). Without metrics, we can estimate ROI but not prove it.

The goal is not to justify the system — it already works. The goal is to **optimize it** and to **communicate its value** to potential clients and investors.

---

## Metric categories

### Category 1 — Cost metrics

| Metric | Description | Current baseline | Target |
|--------|-------------|-----------------|--------|
| Cost per session | Total API cost / sessions | ~$10-20 | TBD by Pablo |
| Cost per mission | Total API cost / missions completed | ~$2-5 estimated | TBD |
| Cost per PR | Total cost / PRs merged | ~$2-3 estimated | TBD |
| Monthly CAO cost | Total API + infra cost per month | ~$80-100 to date | TBD |
| Cost per equivalent human-hour | CAO cost / equivalent human hours | ~€0.5-1/h estimated | TBD |

> ⚠️ **Blocked by MIS-048:** Need Anthropic API key with usage permissions to get real cost data instead of estimates.

### Category 2 — Output metrics

| Metric | Description | Current value |
|--------|-------------|--------------|
| PRs merged | Total code PRs to pablofm-web | 43+ |
| Missions completed | Done missions in repo | 4 (MIS-016, 037, 051, 053) |
| Documents created | Total .md files in repo | 80+ |
| Daily reports | Published reports | 5 |
| Active agents | Agents operational | 2 (Nimrod, Adonaz) |
| Agents designed | Agents ready to activate | 3 (Ursa, Senet, Procurador-01) |

### Category 3 — Velocity metrics

| Metric | Description | Current baseline |
|--------|-------------|-----------------|
| PRs/day | Average PRs merged per active day | ~5-7 |
| Missions/week | Missions completed per week | ~1-2 |
| Session duration | Average productive session | 4-8h |
| Time to first output | From session start to first commit | ~30 min |

### Category 4 — Quality metrics

| Metric | Description | How to measure |
|--------|-------------|---------------|
| Continuity score | System coherence across sessions | Manual audit (9.1/10 as of 2026-04-07) |
| Rework rate | PRs that needed fixes | ~10% estimated |
| Protocol compliance | Sessions following PRO-001 (opening and closing) | 100% (verifiable via commits) |
| Canon coherence | Decisions consistent with seminal docs | Manual QA |

### Category 5 — ROI metrics

| Metric | Formula | Current estimate |
|--------|---------|-----------------|
| Equivalent human cost | Hours × freelancer rate (€50-80/h) | ~€12,000-15,000 |
| CAO total cost | API + infra since activation | ~€92-100 |
| ROI multiplier | Equivalent cost / real cost | **80-133x** |
| Cost per page deployed | Total cost / live pages | ~€2/page |

---

## DORA metrics (engineering — future)

For when CI/CD is active (requires GitHub Actions PAT with `workflow` scope):

| Metric | Description | Target |
|--------|-------------|--------|
| Deployment Frequency | How often code ships | Daily |
| Lead Time for Changes | Commit → live | < 30 min (Vercel) |
| Change Failure Rate | % deploys causing issues | < 5% |
| MTTR | Time to recover from failure | < 1h |

---

## Business value model (external)

When presenting NWOS to potential clients:

| Cost layer | Monthly estimate (Numen Games) | Scalable to client? |
|------------|-------------------------------|---------------------|
| API costs (Claude) | ~€30-50/month active use | Yes — per org |
| Infrastructure (VPS) | ~€10-20/month | Yes — per org |
| **Total operational cost** | **~€40-70/month** | **Yes** |
| Equivalent human productivity | ~€5,000-10,000/month | Communicable as ROI |

> ⚠️ **Open question for Pablo:** What is the target price point for an NWOS license? This determines the business metrics that matter for sales.

---

## What this framework needs to become v1.0.0

- [ ] **Real API cost data** — Anthropic key with usage permissions (MIS-048)
- [ ] **Target thresholds** — what is "good" for each metric? Pablo defines.
- [ ] **Business model clarity** — license price? SaaS? Consulting? Affects which metrics matter
- [ ] **Client comparison baseline** — what does the equivalent human team cost for a target ICP?
- [ ] **Reporting cadence** — weekly in Dark Council? Monthly in reports?
- [ ] **Quality rubric** — how do we score output quality beyond "Pablo liked it"?

---

## Epistemic value

ROI of 80-133x is remarkable but unverifiable without real cost data. This framework makes it verifiable — and turns a feeling into a proof.

## Pragmatic value

- Gives Pablo a dashboard to show investors and clients
- Gives agents targets to optimize toward
- Makes the system's value legible to outsiders

---

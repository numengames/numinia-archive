---
id: "OPS-007"
uid: ""
title: "Sales — commercial strategy"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-17T19:30:52Z"
created_source: "git:809f717"
created_confidence: inferred
updated: "2026-08-27T22:31:29Z"
author: "nimrod"
owner: "oracle"
tags: [strategy, sales, commercial]
license: "LicenseRef-Numen-AllRightsReserved"
extraction_note: "Extracted verbatim from web/src/pages/ventas.astro (MIS-071 phase 2 — File over App). Reserved regime: commercial strategy is born closed (C-005 §1; Oracle-delegated decision 2026-08-17). Translated to English under MIS-116 (ADR-023 (formerly ADR-024)) — language only."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: LicenseRef-Numen-AllRightsReserved
-->

# How to get the first clients

> **Summary:** Operational guide for the Oracles. Defined ICP, sales funnel, current blockers and the 8-week pilot plan.
> **Audience:** Numen Games Oracles (Narrative Work OS sales guide — page `/ventas`).

**Honest diagnosis (April 2026):** NWOS has solid theoretical coherence, internal validation from 4 Oracles and 0 external clients. The gap between those two ends is not one of product — it is one of sequence. First external validation, then ICP, then a sellable product. This document is the map for covering that distance.

---

## The blockers — What prevents selling today

| ID | Severity | Blocker | Urgency | Description | Concrete action |
|----|----------|---------|---------|-------------|-----------------|
| B1 | 🔴 | No external proof | 10/10 | Nobody can buy what they have not seen work outside the founders. As long as no real case exists, the sales cycle starts with an unanswered question. | Blind-exposure protocol: 2 external people, 48h, no prior context. This week. |
| B2 | 🔴 | No operational ICP | 9/10 | Without knowing who signs the check, which metric justifies the purchase and from which budget line, there is no go-to-market. Only hope. | Bet on ONE profile: CEO of a technical startup, 5–15p. Design the entire message for them. |
| B3 | 🔴 | No sales format | 9/10 | If a company says 'I want it' tomorrow, there is nothing to send, nothing to charge, nobody free to implement it. | Define the minimum sellable product: an 8-week pilot with a fixed price, deliverables and a success criterion. |
| B4 | 🟠 | Entry cognitive cost | 7/10 | The full NWOS vocabulary in the first meeting closes doors. The adoption barrier occurs before the client has felt value. | Create the sales deck with 5 concepts maximum. Numinia is layer 3, not layer 1. |
| B5 | 🟠 | No ROI metrics for the decision-maker | 7/10 | A CHRO or CEO cannot approve an expense without knowing which number improves. 'More meaning' is not a business metric. | Define 3 pre-pilot KPIs the client agrees to measure. Retention, decision speed, internal NPS. |

---

## ICP — Whom to sell to · Target-profile ranking

Based on the 100 simulations and the gap analysis. Combined score: adoption rate + speed to value + decision-maker accessibility.

| # | Profile | Score | Adoption | Time to value | Decision-maker | Budget | Verdict |
|---|---------|-------|----------|---------------|----------------|--------|---------|
| 1 | Technical startup 5–15p | 92 | 85% | 2–4 wk | CEO / CTO | €500–2,000/mo | Ideal ICP now |
| 2 | Mixed startup 15–50p | 74 | 75% | 4–8 wk | CEO / Head of People | €1,500–5,000/mo | Expansion ICP |
| 3 | Creative agency 10–30p | 68 | 75% | 3–6 wk | CEO / Creative Director | €800–3,000/mo | Opportunity ICP |
| 4 | Traditional SME 50–150p | 31 | 35% | 6–12 mo | CHRO / General Manager | €3,000–8,000/mo | Avoid for now |
| 5 | Corporate team 100–500p | 18 | 30% | 9–18 mo | CHRO / VP People | €10,000–40,000/mo | Avoid until Series A |

### Detail — pain and buying signal

| # | Profile | Pain | Buying signal |
|---|---------|------|---------------|
| 1 | Technical startup 5–15p | Team culture breaks when going from 5 to 10 people | Looking for alternatives to Notion + Linear + alignment meetings |
| 2 | Mixed startup 15–50p | Technical and non-technical profiles speak different languages | Has tried OKRs and they did not work. Looking for something more alive. |
| 3 | Creative agency 10–30p | Every new project restarts the culture from scratch | Mentions 'company identity' or 'how we do things here' |
| 4 | Traditional SME 50–150p | High turnover, disconnection from company values | Has invested in leadership training with no results |
| 5 | Corporate team 100–500p | Cultural transformation post-merger or remote-first | Active RFP, annual culture budget approved |

*(The page highlights only the top 3 profiles of the ranking in detail cards.)*

---

## Sales message — What to say to each decision-maker

### Technical-startup CEO

- **Their pain:** "The team grows and the culture breaks"
- **Your message:** NWOS is the culture infrastructure that scales with the team. It is not one more tool — it is the common grammar connecting people to what they build.
- **Promised KPI →** Cultural onboarding time: from 3 months to 3 weeks

### Mixed-startup Head of People

- **Their pain:** "OKRs are not working and the team is disconnected"
- **Your message:** NWOS replaces motivation-by-metrics with motivation-by-purpose. Missions have context. Decisions have memory. People know why what they do matters.
- **Promised KPI →** eNPS: target +20 points in 6 months

### Agency Creative Director

- **Their pain:** "Every new client restarts the team's identity"
- **Your message:** NWOS gives the team permanent identity beyond each project. The Archive is the institutional memory that survives every delivery.
- **Promised KPI →** Senior creative talent retention: target -50% turnover

---

## Sales funnel — The target funnel

Conservative projection for the first 12 months. Awareness → client conversion: ~0.9%.

| Stage | n | Description |
|-------|---|-------------|
| Awareness | 1,000 | Contacts who know NWOS exists |
| Interest | 180 | Have read the one-pager or visited /nwos |
| Qualified | 54 | Right ICP + active pain + decision-maker identified |
| Pilot | 18 | Agree to an 8-week pilot |
| Client | 9 | Renew after the pilot |

**Conversion rates:** Awareness → Interest: **18%** · Interest → Qualified: **30%** · Qualified → Pilot: **33%** · Pilot → Client: **50%**

---

## The sellable product — The 8-week pilot

The entry format. Fixed price, defined deliverables, success criterion agreed before starting. Without this format, there is nothing to sell.

| Weeks | Phase | Tasks |
|-------|-------|-------|
| W1–W2 | Diagnosis | Organizational Maslach · Map of current roles · 3 agreed KPIs |
| W3–W4 | MVV | 5 concepts installed · First live mission · Weekly ritual (30 min) |
| W5–W6 | Expansion | Guild assigned · First digital agent · First Piedra del Camino |
| W7–W8 | Evaluation | Measurement vs. KPIs · Adoption report · Renewal decision |

### Pricing

| Segment | Price | Includes |
|---------|-------|----------|
| Startup (<15p) | €1,500 | 8-week pilot · all included |
| Startup (15–50p) — **Recommended** | €3,500 | 8-week pilot · with digital agent |
| Agency / SME | €6,000 | 8-week pilot · 2 agents + corp. mode |

---

## Action plan — The next 30 days

| # | Deadline | Action | Owner |
|----|---------|--------|-------|
| 01 | This week | Blind-exposure protocol: 2 external people, 48h without context. Observe without intervening. | Pablo + free Oracle |
| 02 | This week | Confirm ICP #1: technical-startup CEO, 5–15p. List 10 concrete contacts that fit. | Dark Council |
| 03 | Week 2 | Create the sales deck with 5 concepts maximum. No Numinia in layer 1. | Alquimista-01 |
| 04 | Week 2 | Define the 3 pilot KPIs the client will measure. Without this there is no success criterion. | Dark Council |
| 05 | Week 3 | First exploratory conversation with 3 contacts from ICP #1. It is not a demo — it is listening. | Pablo |
| 06 | Week 4 | If there is a positive signal: formalized pilot proposal. Price, deliverables, criterion. Signature. | Pablo + legal Oracle |

---

## Closing

**The only number that matters right now:** 1. One real external client who has gone through the 8-week pilot and renewed. That case turns everything else — the one-pager, the deck, the simulations, the gap analysis — from theory into evidence. With evidence, the sales cycle divides by three.

The sequence is: blind validation → confirmed ICP → pilot sold → documented case → scale. There is no shortcut.

---

*Metadata of the original page (`ventas.astro`), translated: HTML title «NWOS — Sales Strategy — Pablo FM» · description «Narrative Work OS sales guide for the Numen Games Oracles. ICP, funnel, blockers and pilot plan.» · canonical route `/ventas` · hero label «NWOS — Ventas».*

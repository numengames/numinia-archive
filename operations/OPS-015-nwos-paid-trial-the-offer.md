---
id: "OPS-015"
uid: ""
title: "NWOS paid trial — the offer"
type: documentation
status: draft
version: "0.1.0"
created: "2026-09-30T12:00:00+02:00"
updated: "2026-09-30T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Sales"
tags: [operations, offer, nwos, trial, payments]
license: "CC-BY-4.0"
related: ["CAN-011", "STD-033", "SYS-008", "PRO-020", "OPS-014", "LEG-002"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# OPS-015 — NWOS paid trial — the offer

> **Summary:** What nwos.numen.games sells before anything else: one NWOS
> workspace for one organisation, its four founding documents drafted by an
> AI model from public sources, for 29 EUR with VAT, paid once. The trial
> was free; every trial costs the house an AI bill, so it is now a sale.
> **Epistemic:** The record the trial's price, its button and its payment
> link read from (`STD-033` PAY-003).
> **Pragmatic:** Read it before changing the deploy form on
> nwos.numen.games or creating anything for it in the payment processor.
> **Audience:** Agents · Oracles · Clients

---

## 1. Context

On nwos.numen.games anyone could type an organisation's name and an email
and get, a minute or two later, a private repository with the NWOS
structure and four documents — mission, culture, structure, glossary —
written by an AI model that searched the web for that organisation. The
house paid the model and the search for every one of them, whoever asked
and however often.

A trial that costs the house money every time is a sale that does not
charge. So the trial is paid, and what is paid for is named before paying
(`STD-033` PAY-001). The frozen example workspace stays free: reading it
calls no model.

---

## 2. The record

### NWOS workspace — paid trial

| | |
|---|---|
| **In one sentence** | Your organisation's NWOS workspace, with its four founding documents drafted from what is public about you |
| **Delivers** | A private repository in the house's GitHub organisation with the NWOS structure; four drafts in `canon/` — mission, vision and values; culture; organisational structure; glossary — written by an AI model with web search and marked where it inferred; a provenance note saying how they were made; a private link to browse it on nwos.numen.games |
| **Price with VAT** | 29 EUR |
| **Period** | One-off. One payment, one workspace |
| **Who may buy** | Organisations and professionals, as nwos.numen.games's terms already say (`LEG-002`) |
| **Counts towards more** | If the organisation then contracts NWOS work, the 29 EUR is deducted from its first invoice |
| **If generation fails** | Full refund, made by hand by an Oracle while the volume is small |
| **Site** | nwos.numen.games, the deploy form at `/velo` |
| **State** | Not on sale |
| **Payment link** | None yet |

### What a payment turns into

With Spanish VAT at 21 % and the processor's fee for a standard European
card on a one-off payment (1.5 % + 0.25 EUR):

| Paid | VAT, to the tax authority | The processor | **What reaches the house** |
|---|---|---|---|
| 29 EUR | 5.03 | 0.69 | **23.28** |

The cost of the AI model per workspace is not yet measured: four documents,
each with web search. The first paid workspaces measure it, and this table
gains a row for it.

### How the payment guards the cost

- The model is called only after the server has asked the processor
  whether that payment exists and is paid. A call to the deploy route with
  no paid payment is refused.
- One payment makes one workspace. Coming back with the same payment
  returns the workspace already made; the model is not paid twice.
- The processor asks for the buyer's tax ID and sends the receipt and the
  invoice.

---

## 3. Why it is not on sale yet

- **The payment link and the read-only key do not exist.** An Oracle
  creates both in the processor (`PRO-020` steps 4–5); the key is a secret
  of the nwos Worker, never in a repository (`STD-033` PAY-004).
- **The terms name no price for the trial.** `LEG-002` covers services
  sold by proposal and invoice. A short clause — price, one workspace per
  payment, refund if generation fails, the deduction above — comes from
  the Oracle.

Until both exist the form on nwos.numen.games shows the price and a
*Coming soon* button, and no workspace can be generated.

---

## 4. The three questions (`PRO-020` step 2)

- **What does whoever pays take away?** One workspace and its four drafts,
  theirs from the moment they are written, as the provenance note in the workspace says.
- **Where is it written?** Here, and on the form before paying.
- **Can it be seen whole?** Yes, before paying: the example workspace on
  nwos.numen.games is a real one, made by the same path.

---

## 5. Open questions

- How long the deduction holds after the trial.
- What one workspace costs in AI, and whether 29 EUR still covers it.

---

## 6. Validity

**As of:** 2026-09-30. Re-checked when the price, the documents generated
or the model change (`PRO-020`).

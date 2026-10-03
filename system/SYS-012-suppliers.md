---
id: "SYS-012"
uid: ""
title: "Suppliers"
type: documentation
subtype: register
status: draft
version: "0.1.1"
created: "2026-09-30T19:00:00+02:00"
updated: "2026-10-03T19:40:00+02:00"
author: "ursa"
owner: "oracle"
provenance: ai-assisted
section: "Operations"
tags: [system, register, suppliers, services, costs, open-books]
license: "CC0-1.0"
related: ["SYS-008", "STD-036", "PRO-021", "DBT-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# SYS-012 — Suppliers

> **Summary:** One card per service Numen Games contracts from a company:
> who it is, what we use it for, what it holds of ours and what it cost,
> year by year. Thirteen cards, from the FY2025 book, all in draft.
> **Epistemic:** Which companies does the house depend on, and what does
> each one cost?
> **Pragmatic:** Read the card before adding, renewing or dropping a service;
> add a card when a new supplier's first invoice is booked.
> **Audience:** Agents · Oracles · Citizens

## The register

Net amounts, excluding VAT, for 2025. Sorted by cost.

| Supplier | Legal name | Category | Net 2025 |
|---|---|---|---|
| [ENISA](/system/suppliers/finance-enisa/) | Empresa Nacional de Innovación, S.M.E., S.A. | `finance` | 5.666,56 € |
| [Sleepy Studio](/system/suppliers/studio-sleepy-studio/) | Sleepy Studio LLC | `studio` | 5.515,91 € |
| [MERGE](/system/suppliers/event-merge/) | Merge Digital S.L. | `event` | 5.500,00 € |
| [Amazon Web Services](/system/suppliers/cloud-aws/) | Amazon Web Services EMEA SARL | `cloud` | 5.062,81 € |
| [OpenAI](/system/suppliers/ai-openai/) | OpenAI, LLC | `ai` | 1.398,27 € |
| [Microsoft 365](/system/suppliers/software-microsoft-365/) | Microsoft Ibérica S.R.L. | `software` | 1.152,64 € |
| [Cursor](/system/suppliers/ai-cursor/) | Anysphere, Inc. (booked as "CURSOR") | `ai` | 758,40 € |
| [Ony](/system/suppliers/advisory-ony/) | Ony | `advisory` | 500,00 € |
| [Docusign](/system/suppliers/software-docusign/) | Docusign, Inc. | `software` | 276,00 € |
| [LastPass](/system/suppliers/software-lastpass/) | LastPass Ireland Ltd | `software` | 188,41 € |
| [AEVI](/system/suppliers/membership-aevi/) | Asociación Española de Videojuegos | `membership` | 150,00 € |
| [Roll20](/system/suppliers/software-roll20/) | Roll20 (as booked) | `software` | 96,02 € |
| [LiveKit](/system/suppliers/cloud-livekit/) | LiveKit, Inc. | `cloud` | 95,57 € |
| **Total** | | | **26.360,59 €** |

## What is not here

- **People.** Freelancers and lawyers who invoice in their own name are
  natural persons: they enter the public books only with their consent
  (`DBT-022` §1.7), and not in this register.
- **One-off purchases** that are not a service: hardware, registry fees,
  travel. They are lines of the ledger, not suppliers we depend on.
- **Staff.** Payroll is not a supplier (`SYS-008`).

## Categories

| Category | Holds |
|---|---|
| `cloud` | infrastructure billed by usage: servers, storage, real-time media |
| `ai` | language models and AI tools |
| `software` | subscriptions to tools: mail, signature, passwords, tabletop |
| `advisory` | accounting, tax and legal advisers that are companies |
| `studio` | external studios that build for us |
| `event` | events we pay to attend or sponsor |
| `finance` | lenders and financial costs |
| `membership` | associations and their fees |

## The card

A card lives in `system/suppliers/`, one file per supplier, named
`<category>-<slug>.md`. It is an entry of this document, not a document of
its own: its identifier is `SYS-012:<file name>`, its type is `entity`, and
its header carries its `category`.

Every card has the same body: the supplier (legal name, website, use, VAT
regime, since), the cost by year, the data it holds of ours, notes, and what
is still missing. It names companies only. It never holds a credential, an
account number or a contract.

A figure in a card comes from the company's received-invoices book for that
year, which the gestoría keeps outside this repository; when the ledger
lands in the tree (`SYS-008`), the card will read it instead of restating it.

## References

| Identifier | Title | Why it is cited |
|---|---|---|
| `SYS-008` | The account, as wired today | how a cost flows into the ledger |
| `STD-036` | One account | the ledger every figure comes from |
| `PRO-021` | Closing the month | when a new supplier's first line is written |
| `DBT-022` | Legal debts and questions for counsel | why people are not in this register |

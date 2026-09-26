---
id: "STD-036"
uid: ""
title: "One account"
type: documentation
subtype: standard
status: draft
version: "0.1.2"
created: "2026-09-26T13:00:00+02:00"
updated: "2026-09-26T20:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Funding"
license: "CC0-1.0"
tags: [standards, economy, ledger, accounting, transparency, audit]
related: ["CAN-011", "CAN-010", "STD-033", "STD-035", "SYS-008", "PRO-021", "BLU-017"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# One account

> **Summary:** Every cost and income is one line in one ledger, closed from
> documents, traceable to its paper and kept as long as the law can ask.
> Every view is computed from those lines.
> **Epistemic:** How the money is written down, so the account holds up
> before a citizen, a lender, an auditor and the tax authority.
> **Pragmatic:** Check a figure before it is published, and close a month
> without asking how. This is not legal advice.
> **Audience:** Agents · Oracles

**Binds:** the ledger of what Numen Games and Numinia cost and take in, and
every view published from it.

## Rules

### The lines and their views

**One ledger.** Every cost and income MUST be one line: date, supplier,
concept, account in the Spanish general accounting plan, base, tax, total,
period covered and project. The plan is likely the small-company version;
the gestoría, our accountants, confirms it. Every view is computed from these
lines.

**Same figures, four views.** The public view, the technology view, the
finance view and our accountants' view MUST agree on every figure they
share.

**Billed and consumed.** Every cost line MUST carry two figures, named as in
the open cost and usage specification: what was billed, on the invoice date,
and what was consumed, spread over the charge period it covers. Spreading a
cost over the period it serves is also the accounting rule of accrual.

**Closed from documents.** A month MUST be closed from the invoices and the
payment company's report. An open month or an estimate is labelled as such.

**Traceable to the paper.** Every total MUST be traceable to its lines, and
every line to its document, so an auditor or the tax authority can walk
from one to the other.

**People counted, not named.** Staff MUST enter as the company's cost per
month. No published view lets anyone infer a person's pay.

**Documents stay out.** Invoices, payslips and payment reports MUST NOT be
committed to the archive. The archive holds the lines; the documents stay
with the company.

**Kept for as long as the law can ask.** Documents MUST be kept six years
after the last entry, and longer while the tax authority can still check the
years they support: four years as a rule, up to ten for tax credits.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| LED-001 | One ledger | law: [PGC PYMES, RD 1515/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-19966) likely, rather than the full [PGC, RD 1514/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-19884) — the gestoría confirms; group 62 services, 64 staff | by hand at each month's close; `web/src/lib/account.ts` computes every view from the lines |
| LED-002 | Same figures, four views | — | `web/src/lib/account.ts` and `/system/open-books` render the four views from one set of lines |
| LED-003 | Billed and consumed | [FinOps FOCUS 1.2](https://focus.finops.org/docs/specification/v1-2/) BilledCost, EffectiveCost, ChargePeriodStart/End; accrual principle, PGC part one | by hand at each month's close |
| LED-004 | Closed from documents | law: [Código de Comercio](https://www.boe.es/buscar/act.php?id=BOE-A-1885-6627) arts. 25 and 29 | by hand at each month's close |
| LED-005 | Traceable to the paper | law: [Código de Comercio](https://www.boe.es/buscar/act.php?id=BOE-A-1885-6627) art. 25; [Ley General Tributaria 58/2003](https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186) art. 29 | by hand at each month's close |
| LED-006 | People counted, not named | — | by hand, in every ledger pull request |
| LED-007 | Documents stay out | — | by hand, in every ledger pull request |
| LED-008 | Kept for as long as the law can ask | law: [Código de Comercio](https://www.boe.es/buscar/act.php?id=BOE-A-1885-6627) art. 30 (six years); [Ley General Tributaria](https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186) arts. 66–70 (four years; up to ten for tax credits) | the gestoría's retention, outside this repository |

## Why

A ledger kept twice becomes two stories. Each rule rests on the accounting
plan, the commercial code or a cost vocabulary others already use, so anyone
can check the books against something they know.

## References

| ID | Name | Why cited |
|---|---|---|
| `CAN-011` | What has value also makes a bond | the reason for every rule here |
| `CAN-010` | Leave things better than you found them | why no person's pay is published |
| `STD-033` | Every charge delivers something | what may be charged, each charge a line here |
| `STD-035` | Personal data | what the ledger may say about a person |
| `SYS-008` | The account: how money moves and is recorded, as wired today | where the ledger lives and who holds each key |
| `PRO-021` | Closing the month | the procedure these rules check |

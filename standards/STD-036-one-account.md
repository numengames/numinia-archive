---
id: "STD-036"
uid: ""
title: "One account"
type: documentation
subtype: standard
status: draft
version: "0.1.1"
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
> documents, traceable to its paper and kept as long as the law can ask;
> every view is computed from those lines.
> **Epistemic:** How is the money written down? What makes the account hold
> up before a citizen, a lender, an auditor and the tax authority.
> **Pragmatic:** Check a figure before it is published, and close a month
> without asking how. This is not legal advice.
> **Audience:** Agents · Oracles

**Binds:** the ledger of what Numen Games and Numinia cost and take in, and
every view published from it.
**Does not bind:** what may be charged for and how, which the charges
standard holds.

## Rules

Where a rule says the law requires it, a lawyer or the gestoría, the
company's accountants, should confirm how it applies to us.

### The lines and their views

**One ledger.** Every cost and income MUST be one line: date, supplier,
concept, its account in the Spanish general accounting plan (the
small-company version, to confirm with the gestoría), base, tax, total,
period covered and project; every view is computed from these lines. The
law requires the plan; the single ledger is our choice.

**Same figures, four views.** The public view, the technology view, the
finance view and our accountants' view MUST agree on every figure they
share. Our choice; the law does not require it.

**Billed and consumed.** Every cost line MUST carry both what was billed, on
the invoice date, and what was consumed, spread over the charge period it
covers, as the open cost and usage specification names them. Spreading
cost over the period it serves is also the accounting rule of accrual. The
law requires accrual in the books; the two figures on every line are our
choice.

**Closed from documents.** A month MUST be closed from invoices and the
payment company's report, and an open month or an estimate is labelled as
such. The law requires books kept in order from documents; the label is our
choice.

**Traceable to the paper.** Every total MUST be traceable to its lines, and
every line to its document, so an auditor or the tax authority can walk
from one to the other. The law requires this.

**People counted, not named.** Staff MUST enter as the company's cost per
month, and no published view lets anyone infer a person's pay. Our choice;
the law does not require it.

**Documents stay out.** Invoices, payslips and payment reports MUST NOT be
committed to the archive; it holds the lines, and the documents stay with
the company. Our choice; the law does not require it.

**Kept for as long as the law can ask.** Documents MUST be kept six years
after the last entry, and longer while the tax authority can still check
the years they support — four as a rule, up to ten for tax credits. The law
requires this.

## Check

Each rule, its code, its source and its check.

| Plate | Rule | Source | Verified by |
|---|---|---|---|
| LED-001 | One ledger | law: [PGC PYMES, RD 1515/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-19966) likely, rather than the full [PGC, RD 1514/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-19884) — the gestoría confirms; group 62 services, 64 staff | by hand at each month's close; `web/src/lib/account.ts` computes every view from the lines |
| LED-002 | Same figures, four views | — our choice | `web/src/lib/account.ts` and `/system/open-books` render the four views from one set of lines |
| LED-003 | Billed and consumed | [FinOps FOCUS 1.2](https://focus.finops.org/docs/specification/v1-2/) BilledCost, EffectiveCost, ChargePeriodStart/End; accrual principle, PGC part one | by hand at each month's close |
| LED-004 | Closed from documents | law: [Código de Comercio](https://www.boe.es/buscar/act.php?id=BOE-A-1885-6627) arts. 25 and 29; the open-month label is ours | by hand at each month's close |
| LED-005 | Traceable to the paper | law: [Código de Comercio](https://www.boe.es/buscar/act.php?id=BOE-A-1885-6627) art. 25; [Ley General Tributaria 58/2003](https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186) art. 29 | by hand at each month's close |
| LED-006 | People counted, not named | — our choice | by hand, in every ledger pull request |
| LED-007 | Documents stay out | — our choice | by hand, in every ledger pull request |
| LED-008 | Kept for as long as the law can ask | law: [Código de Comercio](https://www.boe.es/buscar/act.php?id=BOE-A-1885-6627) art. 30 (six years); [Ley General Tributaria](https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186) arts. 66–70 (four years; up to ten for tax credits) | the gestoría's retention, outside this repository |

## Why

A ledger kept twice becomes two stories. Resting each rule on the plan, the
code and the cost vocabulary others already use lets anyone check the books
against something they know.

## References

| ID | Name | Why cited |
|---|---|---|
| `CAN-011` | What has value also makes a bond | the reason for every rule here |
| `CAN-010` | Leave things better than you found them | why no person's pay is published |
| `STD-033` | Every charge delivers something | what may be charged, each charge a line here |
| `STD-035` | Personal data | what the ledger may say about a person |
| `SYS-008` | The account: how money moves and is recorded, as wired today | where the ledger lives and who holds each key |
| `PRO-021` | Closing the month | the procedure these rules check |

---
id: "ADR-064"
uid: ""
title: "A standard for charges and the account: STD-033"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-24T17:40:00+02:00"
updated: "2026-09-24T17:40:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [decisions, adr, standards, economy, payments, ledger, audit]
license: "CC-BY-4.0"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: proposed
decision: "STD-033 is created at 0.1.0, in draft: nine rules for a charge (PAY-001..009) and eight for the account (LED-001..008). One ledger of lines computes four views that must agree; a month is closed from documents; every total walks to its paper for an auditor or the tax authority; staff enter as company cost and no one's pay can be inferred; documents stay out of the tree and are kept at least six years. STD-003 stops sending payment to operations. STD-011 gains the Spanish accounting plan and FOCUS."
related: ["STD-033", "CAN-011", "ADR-063", "STD-003", "STD-011", "STD-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-064 — A standard for charges and the account

> **Summary:** The canon of money says why; this says what every charge and
> every figure must meet. Written with the Oracle's decisions of the session
> and with what a lender, an auditor and the tax authority ask of an account.
> **Epistemic:** Why the charge and the ledger share one standard, and where
> each rule comes from.
> **Pragmatic:** The rules the protocols *put something on sale* and *close
> the month* will execute.
> **Audience:** Agents · Oracles

---

## 1. Context

`CAN-011` (`ADR-063`) states what a payment is here and that the account is
open and one. Nothing yet says what a charge or a figure must meet. The
platform-ranks standard sends payment to `operations/`, where only a sales
strategy lives.

The Oracle's decisions in session, which the rules carry:

| Decision | Rule |
|---|---|
| Everything carries VAT; there is always a digital good | PAY-001, PAY-002 |
| One account, Numen Games; it pays everything Numinia consumes, now and later | PAY-004, LED-001 (no split between the two) |
| The homage list is anonymous by default, no amounts | PAY-007 |
| A resaleable token waits for the legal part | PAY-009 |
| The cost view a serious CTO and CFO would ask for: daily, prorated, by day, week, month, quarter, year | LED-001, LED-003 |
| Useful to a lending bank and to the gestoría; salaries in analytic accounting | LED-002, LED-006 |
| Do not forget fiscal audits and private auditors | LED-005, LED-008 |
| Invoices come in a spreadsheet; private data must be handled | LED-006, LED-007 |

External sources read for the account:

| Source | What it gives the ledger |
|---|---|
| Spanish General Accounting Plan (RD 1514/2007) | the account numbers each line carries (62x services, 64x staff) |
| VAT Regulation, art. 64 | the received-invoices book the gestoría keeps |
| Commercial Code, art. 30 | books and supporting documents kept six years from the last entry |
| General Tax Law, arts. 66 and 66 bis | four years to assess a tax; ten to check credits and deductions carried forward |
| Capital Companies Law, art. 263; Audit Law 22/2015 | when an audit is compulsory, and that the auditor's report is a formal document |
| FinOps FOCUS 1.4 | billed cost against effective (consumed) cost, the vocabulary of LED-003 |

## 2. Decision

**`STD-033` is created at `0.1.0`, *Every charge delivers something; the
account is one*,** in two blocks:

- **The charge** (`PAY-001..009`): something in return, the whole price, no
  record no charge, one account and the Oracle's keys, no card on our sites,
  leaving takes one step, remembered by choice, open stays open, a
  resaleable token waits.
- **The account** (`LED-001..008`): one ledger of lines; four views that
  agree; billed and consumed; closed from documents; traceable to the paper;
  people counted, not named; documents stay out of the tree; kept for as long
  as the law can ask.

The body runs over the 500-word budget; the standard says why in its last
sentence.

**`STD-003`** stops sending payment to `operations/`: it points at
`STD-033`.

**`STD-011`** gains two rows under Funding: the Spanish accounting plan
(distance 1) and FOCUS (distance 2 — the ledger borrows its vocabulary, no
tool checks conformance).

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Two standards, charges and ledger | Every charge is a ledger line; split, the price would live without its books and the books without their price. Over budget instead |
| Name the payment processor, VAT rates or retention in years for each tax | A processor is the system document's; rates and tax deadlines move. LED-008 keeps the one period the Commercial Code fixes and refers the rest to the law |
| Split costs between Numen Games and Numinia | The Oracle: Numen Games pays everything Numinia consumes. The ledger carries a project column for the day there is another |
| Publish salaries, as some open companies do | With two or three people any breakdown names someone's pay; `CAN-010` makes that their data |
| Commit invoices so the account is verifiable | Invoices and payrolls carry personal data and belong to the company's books; the lines are enough to walk to them (LED-005) |

## 4. Consequences

- **Obliges:** nothing on sale today; the first charge meets it. The cost
  register meets LED-001..008 from its first published month.
- **Costs:** one more standard; `STD-003` and `STD-011` touched.
- **Follow-up:** the system document of the account (sources, storage, who
  holds which key, what each reader sees); the protocols *put something on
  sale* and *close the month*; the cost register with simulated figures on
  numinia.org.
- **Reversal:** withdraw the standard; `CAN-011` still holds.

## 5. Status

Proposed. It takes effect — as a draft — when the Oracle approves the pull
request that carries it.

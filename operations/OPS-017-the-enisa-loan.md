---
id: "OPS-017"
uid: ""
title: "The ENISA loan"
type: documentation
status: draft
version: "0.1.0"
created: "2026-09-30T20:00:00+02:00"
updated: "2026-09-30T20:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Funding"
tags: [operations, funding, loan, enisa, open-books, public-funding]
license: "CC-BY-4.0"
related: ["SYS-008", "SYS-012", "STD-036", "PRO-021", "DBT-022"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# OPS-017 — The ENISA loan

> **Summary:** Numen Games S.L. holds a participative loan from ENISA, the
> Spanish state's lender for innovative companies, signed on 22 October
> 2024. In 2025 it cost 5,666.56 € in interest. This record says what is
> known, what is not yet, and how the loan is shown in public.
> **Epistemic:** What does the company owe the state, on what terms, and
> what has it paid so far?
> **Pragmatic:** Read it before quoting the loan anywhere; add each
> quarter's interest when the gestoría books it; fill the terms from the
> contract.
> **Audience:** Citizens · Oracles · Lenders

---

## 1. What it is

**ENISA** (Empresa Nacional de Innovación, S.M.E., S.A.) is a state-owned
company under the Ministry of Industry and Tourism. It lends to small
innovative companies through **participative loans**: no guarantee or
personal surety is asked, the interest has a fixed part and a variable part
tied to the company's results, and in the accounts the loan counts towards
equity for capital reduction and dissolution purposes. It is debt, not
equity: ENISA takes no shares ([ENISA](https://www.enisa.es);
[Plan de Recuperación](https://planderecuperacion.gob.es/noticias/conoce-proyectos-financiados-enisa-2025-apoyo-plan-recuperacion-prtr)).

## 2. What is known

| | |
|---|---|
| Lender | Empresa Nacional de Innovación, S.M.E., S.A. — [enisa.es](https://www.enisa.es) |
| Borrower | Numen Games S.L. (CIF B70735949) |
| Instrument | Participative loan |
| Signed | 2024-10-22 (the Oracle) |
| Line | a line before 2025 — to confirm which (Jóvenes Emprendedores, Emprendedores or Crecimiento) |
| Principal | to fill from the contract |
| Term, grace period, repayment | to fill from the contract |
| Fixed and variable interest | to fill from the contract |
| Where it goes in the books | principal: long-term debt; interest: financial expense (account 662), below operating costs |

## 3. What it has cost

The interest booked in the company's received-invoices book for 2025, net,
without VAT (financial services are exempt). One line per quarter.

| Quarter | Interest | Booked |
|---|---|---|
| 2025-Q1 | 1,249.49 € | 2025-03-31 |
| 2025-Q2 | 1,263.37 € | 2025-06-30 |
| 2025-Q3 | 1,576.85 € | 2025-09-30 |
| 2025-Q4 | 1,576.85 € | 2025-12-31 |
| **2025** | **5,666.56 €** | |

The page reads these figures from `web/src/data/enisa.ts`; a test holds
that file and this table to the same quarters and amounts.

The quarterly charge rose by a quarter from Q3. The contract will say
whether that is the rate being revised, a second tranche being drawn, or
the grace period ending.

Two book issues are open with the gestoría: the Q1 and Q2 lines carry the
same document number (3258), and the Q2 line is dated 2025-03-31 as its
operation date.

## 4. What the public registers say

Checked on 2026-09-30:

```
$ curl "https://www.infosubvenciones.es/bdnstrans/api/{concesiones,ayudasestado,minimis}/busqueda?vpd=GE&nifCif=B70735949"
totalElements: 0 · 0 · 0
```

The national register of grants and public aid (BDNS) lists nothing for the
company's tax ID under grants, state aid or de minimis aid. The same query
for another beneficiary returns its 46 grants, so the filter works. ENISA's
loans are financial operations and may be recorded elsewhere, or under the
lender's own notices; nothing public has been found that names the loan.
Until it is, this record is the public account of it.

## 5. How it is shown

- **numinia.org**, open books: a section with the loan, the interest by
  quarter and ENISA's seal.
- **numen.games**: the seal in the footer of every page, linking here.

ENISA issues the seal to the companies it finances. For loans signed
before 2025 it gives the *Sello horizontal* and *Sello vertical*, «Solo
podrán hacer uso de este archivo las empresas beneficiarias de préstamos
Startups y pymes o líneas de financiación anteriores a 2025 (Jóvenes
Emprendedores, Emprendedores y Crecimiento)»
([recursos gráficos](https://www.enisa.es/centro-de-ayuda/recursos-graficos/?tab=logos-enisa)).
The file is ENISA's mark, used as ENISA offers it and never ours to
license; `REUSE.toml` names its holder. Whether the contract obliges a
particular wording or placement is to be read in it.

## 6. To complete

- Principal, line, term, grace period, fixed and variable rates: from the
  contract.
- The repayment schedule, to put the principal's instalments in the
  forecast of the open books (today it models an invented loan).
- The publicity clause of the contract, if any.

## 7. Validity

A draft record. It changes each quarter the interest is booked, and once
the contract's terms are copied in.

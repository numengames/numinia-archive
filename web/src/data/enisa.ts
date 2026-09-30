// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The ENISA participative loan, as the open books show it. The record is
// operations/OPS-017-the-enisa-loan.md; these figures are a copy of its
// interest table, because the site cannot read a table out of a document.
// machine/scripts/test/enisa.test.mjs fails if the two disagree.
//
// REAL figures: the interest booked in the 2025 received-invoices book.
// Unlike the rest of the open books, nothing here is simulated.

export interface EnisaQuarter {
  readonly quarter: string;
  readonly amount: number;
}

export const ENISA = {
  lender: "Empresa Nacional de Innovación, S.M.E., S.A.",
  lenderUrl: "https://www.enisa.es",
  signed: "2024-10-22",
  instrument: "Participative loan",
  record: "OPS-017",
  seal: "/partners/enisa-financiada-por.png",
  interest: [
    { quarter: "2025-Q1", amount: 1249.49 },
    { quarter: "2025-Q2", amount: 1263.37 },
    { quarter: "2025-Q3", amount: 1576.85 },
    { quarter: "2025-Q4", amount: 1576.85 },
  ] as readonly EnisaQuarter[],
} as const;

export const ENISA_INTEREST_TOTAL = ENISA.interest.reduce((s, q) => s + q.amount, 0);

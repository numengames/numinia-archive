// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The ENISA participative loan, as the open books show it. The record is
// operations/OPS-017-the-enisa-loan.md; these figures are a copy of its
// interest table, because the site cannot read a table out of a document.
// machine/scripts/test/enisa.test.mjs fails if the two disagree.
//
// REAL figures: the principal and the date as ENISA publishes them in its
// public loan search (enisa.es → Sobre Enisa → Consulta datos públicos →
// Buscador de préstamos: "NUMEN GAMES, S.L. · 100.000,00 € · 22/10/2024 ·
// Madrid", read on 2026-09-30), and the interest booked in the 2025
// received-invoices book.

export interface EnisaQuarter {
  readonly quarter: string;
  readonly amount: number;
}

export const ENISA = {
  lender: "Empresa Nacional de Innovación, S.M.E., S.A.",
  lenderUrl: "https://www.enisa.es",
  signed: "2024-10-22",
  instrument: "Participative loan",
  principal: 100000,
  register: "https://www.enisa.es/sobre-enisa/consuta-datos-publicos/",
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

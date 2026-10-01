// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The money that came into Numen Games S.L., the cash it has left and the
// business plan, as /system/open-books shows them.
//
// Every figure carries its kind, and the page draws each kind in its colour:
//   real       booked or public: the invoice book, the BORME, ENISA's search
//   declared   said by the company, its document not yet loaded; it turns
//              real when the deed or the invoice is brought
//   plan       the business plan: what the company intends, not what happened
//   simulated  a guess to try scenarios, moved by the reader or by us
//
// The rounds are what the partners paid; the BORME registers only the
// nominal (company.ts), the rest is share premium, written in the deeds.
// Who paid which part is not here (DBT-022 §1.7). The client is shown by
// sector until it agrees to be named.
//
// machine/scripts/test/open-books-money.test.mjs holds these rules.

export type FigureKind = "real" | "declared" | "plan" | "simulated";

export interface Round {
  readonly date: string;
  readonly amount: number;
  readonly kind: FigureKind;
  readonly borme: string;
  readonly nominal: number;
  readonly what: string;
}

/** Equity rounds after incorporation: the money paid, nominal plus premium. */
export const ROUNDS: readonly Round[] = [
  { date: "2024-04-25", amount: 100000, kind: "declared", borme: "BORME-A-2024-86-28", nominal: 1312.4, what: "First round" },
  { date: "2026-01-28", amount: 120000, kind: "declared", borme: "BORME-A-2026-23-28", nominal: 1200, what: "Second round" },
];

export interface ClientIncome {
  readonly sector: string;
  readonly amount: number;
  readonly kind: FigureKind;
  readonly what: string;
  readonly invoices: string;
}

/** Income from clients, by sector until each client agrees to be named. */
export const CLIENTS: readonly ClientIncome[] = [
  { sector: "Public sector · United States", amount: 19079.8, kind: "declared", what: "A city government: a virtual world for its residents", invoices: "six monthly invoices, January to June 2025, in US dollars" },
  { sector: "Training", amount: 1800, kind: "declared", what: "Training services", invoices: "two invoices, July and November 2024" },
];

/** Cash in the bank: the balance the company gave. Declared until the bank
 *  statement is loaded; then it turns real (STD-036 LED-011). */
export const CASH = {
  kind: "declared" as FigureKind,
  amount: 19500,
  asOf: "2026-10-01",
  said: "About 19,500 € in the bank on 1 October 2026, in the company's words.",
};

/** The three futures of the next quarter (STD-036 LED-012): what the reader
 *  can choose. A cut is named by the cost it removes, never by a person. */
export const FUTURES = {
  kind: "simulated" as FigureKind,
  /** The month at whose end payroll stops, in the cuts future. */
  payrollEnds: ["2026-10", "2026-11"] as const,
  /** The one-off cost of payroll stopping, as a range. */
  oneOff: [2700, 4400] as [number, number],
  /** Income a month from November, in the income future. */
  income: [1500, 3000, 5000] as const,
  incomeFrom: "2026-11",
};

/** The business plan's starting assumptions: the reader moves them. */
export const PLAN = {
  kind: "plan" as FigureKind,
  drafted: "2026-10-01",
  vision:
    "Numen Games builds persistent virtual worlds for cities, schools and brands, on Numinia's open stack. It earns from projects, a world built for a client, and from hosting, the world kept alive afterwards. The plan is to live on projects first and on hosting later, so that each world sold keeps paying.",
  assumptions: {
    projectsPerYear: 3,
    projectSize: 20000,
    hostingPerWorld: 300,
    monthlyCost: 6000,
    growth: 0.25,
  },
  start: "2027",
};

export const GLOSSARY: readonly [string, string][] = [
  ["Burn", "What the company spends in a month, less what it earns. Ours is the monthly cost while there is almost no income."],
  ["Runway", "Cash in the bank divided by the burn: how many months are left before it runs out."],
  ["Time to tomb", "The same runway, as a date: the day the cash reaches zero if nothing changes."],
  ["Break-even", "The income at which the burn is zero. For us: how many projects a year pay the monthly cost."],
  ["Share capital and premium", "The BORME registers the nominal of each round; what the partners paid above it is the premium. Both are equity, not debt."],
  ["Participative loan", "ENISA's kind of loan: no guarantee, interest partly tied to results, counted as equity for dissolution, but it is owed."],
  ["Emerging company", "A status under Law 28/2022 that lowers taxes for five years. It is not money."],
];

export const MONEY_IN_TOTAL =
  3000 + ROUNDS.reduce((s, r) => s + r.amount, 0) + 100000 + CLIENTS.reduce((s, c) => s + c.amount, 0);

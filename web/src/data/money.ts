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
  { sector: "Public sector · United States", amount: 20000, kind: "declared", what: "A city government: a virtual world for its residents", invoices: "several invoices, to load" },
];

/** Cash in the bank today: not loaded. The company says it is very little. */
export const CASH = {
  kind: "simulated" as FigureKind,
  /** The slider's starting point: a guess, until the bank balance is brought. */
  guess: 8000,
  /** What the company has said about it, in its words. */
  said: "Very little cash is left.",
  asOf: "2026-10-01",
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

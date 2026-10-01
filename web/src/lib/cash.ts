// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The cash in the bank, where it comes from, and the next quarter.
//
// reconcile() walks from the money that came in to the money the bank holds:
// money in − outflows loaded − books not loaded yet (estimated) = cash
// expected; against the bank balance, the difference (STD-036 LED-011). Every
// row says its kind, and an unexplained difference larger than THRESHOLD
// raises an alert on the page.
//
// futures() looks one quarter ahead and no further (STD-036 LED-012): three
// futures from today's monthly cost — nothing changes; costs cut in phases;
// income arrives. Each ends in a date the cash runs out, at the last month's
// pace. Cuts name a cost, never a person (LED-006).
//
// Pure functions over the CSV text, so the page, the markdown and
// machine/scripts/test/open-books-cash.test.mjs compute the same figures.

export type Kind = "real" | "declared" | "plan" | "simulated";

type Row = Record<string, string>;
export interface Books {
  l25: Row[];
  l26: Row[];
  payroll: Row[];
  sales: Row[];
}

function parse(text: string): Row[] {
  const [head, ...body] = text.trim().split("\n");
  const cols = head.split(";");
  return body.map((l) => Object.fromEntries(l.split(";").map((v, i) => [cols[i], v])));
}

export function readBooks(l25: string, l26: string, payroll: string, sales: string): Books {
  return { l25: parse(l25), l26: parse(l26), payroll: parse(payroll), sales: parse(sales) };
}

/** What left the bank for a ledger line: base, plus Spanish VAT charged. Reverse-charged and foreign VAT add nothing. */
const paid = (l: Row) => Number(l.base) * (l.vat === "21" ? 1.21 : 1);
const sum = <T>(xs: T[], f: (x: T) => number) => xs.reduce((s, x) => s + f(x), 0);

/** An unexplained difference above this raises the alert. */
export const THRESHOLD = 500;

export interface ReconRow {
  group: "in" | "out" | "missing";
  label: string;
  amount: number;
  kind: Kind;
  note: string;
}

export interface Funds {
  capital: number;
  rounds: { what: string; amount: number; kind: Kind }[];
  loan: number;
}

export interface Bank {
  amount: number;
  kind: Kind;
  asOf: string;
}

/** The services of 2025 (no people, no counsel) over 10.5 months: the 2024 book's estimate. */
function estimate2024(b: Books) {
  return (sum(b.l25.filter((l) => !["people", "counsel"].includes(l.category)), paid) / 12) * 10.5;
}

export function reconcile(b: Books, funds: Funds, bank: Bank) {
  const salesBy = (y: string) => b.sales.filter((s) => s.date.startsWith(y));
  const gross = (s: Row) => Number(s.base) * (s.vat === "21" ? 1.21 : 1);
  const pay = (f: (q: Row) => boolean) => sum(b.payroll.filter(f), (q) => Number(q.employer_cost));
  const q26 = b.l26.filter((l) => l.kind === "real");
  const q26p = b.l26.filter((l) => l.kind !== "real");
  const rows: ReconRow[] = [
    { group: "in", label: "Share capital at incorporation", amount: funds.capital, kind: "real", note: "16 February 2024, the Mercantile Registry" },
    ...funds.rounds.map((r) => ({ group: "in" as const, label: `${r.what}, paid by the partners`, amount: r.amount, kind: r.kind, note: "nominal and share premium; the deeds are still to load" })),
    { group: "in", label: "ENISA participative loan", amount: funds.loan, kind: "real", note: "ENISA's public loan search" },
    ...["2024", "2025"].map((y) => ({ group: "in" as const, label: `Clients, ${y}`, amount: sum(salesBy(y), gross), kind: "declared" as Kind, note: `${salesBy(y).length} invoices issued, VAT included where charged` })),
    { group: "out", label: "Invoices received, 2025", amount: sum(b.l25, paid), kind: "real", note: "the whole book, VAT included where charged" },
    { group: "out", label: "Invoices received, July–September 2026", amount: sum(q26, paid), kind: "real", note: "the quarter's book, the lines already invoiced" },
    { group: "out", label: "July–September 2026, lines partly projected", amount: sum(q26p, paid), kind: "simulated", note: "the people block and one service, at their usual amount until the last invoice arrives" },
    { group: "out", label: "Payroll, quarters with every payslip", amount: pay((q) => q.kind === "real"), kind: "real", note: "employer cost, all staff together" },
    { group: "out", label: "Payroll, quarters partly estimated", amount: pay((q) => q.kind !== "real"), kind: "simulated", note: "employer cost; some months estimated until the payslips are loaded" },
    { group: "missing", label: "Invoices received, 2024", amount: estimate2024(b), kind: "simulated", note: "not loaded: 2025's services, without people and counsel, over 10.5 months" },
    { group: "missing", label: "Invoices received, January–June 2026", amount: sum(b.l26, paid) * 2, kind: "simulated", note: "not loaded: two quarters at July–September's pace" },
  ];
  const g = (k: ReconRow["group"]) => sum(rows.filter((r) => r.group === k), (r) => r.amount);
  const moneyIn = g("in"), out = g("out"), missing = g("missing");
  const expected = moneyIn - out - missing;
  const gap = expected - bank.amount;
  return { rows, moneyIn, out, missing, expected, bank, gap, threshold: THRESHOLD, alert: Math.abs(gap) > THRESHOLD };
}

/** Today's monthly cost: July–September 2026, net of VAT, by what it pays for. */
export function runRate(b: Books) {
  const q3 = b.l26.filter((l) => l.date >= "2026-07-01" && l.date <= "2026-09-30");
  const cat = (cs: string[]) => sum(q3.filter((l) => cs.includes(l.category)), (l) => Number(l.base)) / 3;
  const payroll = Number(b.payroll.find((q) => q.quarter === "2026-Q3")?.employer_cost ?? 0) / 3;
  const people = cat(["people"]);
  const optional = cat(["events", "studios", "hardware", "counsel", "advisory"]);
  const services = sum(q3, (l) => Number(l.base)) / 3 - people - optional;
  return { payroll, people, optional, services, total: payroll + people + optional + services };
}

export interface FutureMonth {
  month: string;
  out: number;
  outHigh: number;
  in: number;
  cash: number;
  cashLow: number;
}

export interface Future {
  id: "same" | "cuts" | "income";
  kind: Kind;
  months: FutureMonth[];
  tomb: string;
  tombEarly: string;
}

export interface FutureInput {
  cash: number;
  asOf: string;
  /** The month whose end payroll stops, "2026-10" or "2026-11". */
  payrollEnds: string;
  /** The one-off cost of payroll ending, as a range. */
  oneOff: [number, number];
  income: number;
  incomeFrom: string;
}

const addMonth = (ym: string, n: number) => {
  const d = new Date(Date.UTC(Number(ym.slice(0, 4)), Number(ym.slice(5, 7)) - 1 + n, 1));
  return d.toISOString().slice(0, 7);
};
const daysIn = (ym: string) => new Date(Date.UTC(Number(ym.slice(0, 4)), Number(ym.slice(5, 7)), 0)).getUTCDate();

/** The day the cash reaches zero: through the quarter month by month, then at the last month's pace. */
function tombDate(cash: number, start: string, nets: number[]): string {
  let c = cash;
  for (let i = 0; i < 120; i++) {
    const ym = addMonth(start, i), net = nets[Math.min(i, nets.length - 1)];
    if (i >= nets.length && net <= 0) return "never";
    if (net > 0 && c - net < 0) {
      const day = Math.floor((c / net) * daysIn(ym));
      return new Date(Date.UTC(Number(ym.slice(0, 4)), Number(ym.slice(5, 7)) - 1, 1 + day)).toISOString().slice(0, 10);
    }
    c -= net;
  }
  return "never";
}

/** Three futures, one quarter ahead from the day of the bank balance. */
export function futures(b: Books, f: FutureInput): Future[] {
  const r = runRate(b);
  const start = f.asOf.slice(0, 7);
  const months = [0, 1, 2].map((i) => addMonth(start, i));
  const build = (id: Future["id"], kind: Kind, cost: (m: string) => [number, number], inc: (m: string) => number): Future => {
    let c = f.cash, cl = f.cash;
    const ms = months.map((m) => {
      const [lo, hi] = cost(m), i = inc(m);
      c += i - lo; cl += i - hi;
      return { month: m, out: lo, outHigh: hi, in: i, cash: c, cashLow: cl };
    });
    return { id, kind, months: ms, tomb: tombDate(f.cash, start, ms.map((x) => x.out - x.in)), tombEarly: tombDate(f.cash, start, ms.map((x) => x.outHigh - x.in)) };
  };
  const cut = (m: string): [number, number] => {
    // Phase 1, from the month after today: what the company can do without stops.
    let base = r.total - (m > start ? r.optional : 0);
    // Phase 2: payroll ends at the end of the chosen month, with its one-off cost.
    if (m > f.payrollEnds) base -= r.payroll;
    return m === f.payrollEnds ? [base + f.oneOff[0], base + f.oneOff[1]] : [base, base];
  };
  return [
    build("same", "simulated", () => [r.total, r.total], () => 0),
    build("cuts", "simulated", cut, () => 0),
    build("income", "simulated", () => [r.total, r.total], (m) => (m >= f.incomeFrom ? f.income : 0)),
  ];
}

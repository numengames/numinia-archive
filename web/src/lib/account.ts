// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The ledger behind /system/account (STD-033 LED-001): one line per document,
// read from src/data/account-simulated.csv. The page computes its views from
// these lines in the browser; the markdown view (/system/account.md) sums the
// same lines here, so the two cannot disagree (LED-002).
//
// The forecast is computed HERE, once, at build time, and handed to both the
// page and the markdown: the run-rate each category starts from comes from
// the ledger's closed months; everything that changes after that is one line
// of src/data/account-forecast-simulated.csv, written in plain words.
//
// SIMULATED until the first month closes (PRO-021).
import raw from "@/data/account-simulated.csv?raw";
import rawForecast from "@/data/account-forecast-simulated.csv?raw";

export const ACCOUNT_CSV = raw;
export const FORECAST_CSV = rawForecast;
/** The ledger's cut-off: the last day it describes. */
export const AS_OF = "2026-09-24";
/** The company's first day. */
export const START = "2020-11-02";
/** The last month the forecast describes. */
export const HORIZON = "2028-12";
/** Invented bank balance, for the runway view. */
export const CASH = 48000;
export const SIMULATED = true;
/** The documents that govern the account. */
export const ACCOUNT_SOURCES = [
  "standards/STD-033-charges-and-the-account.md",
  "system/SYS-008-the-account.md",
  "protocols/PRO-021-closing-the-month.md",
];

export type Line = Record<string, string>;
function parse(text: string): Line[] {
  const [head, ...rest] = text.trim().split("\n");
  const cols = head.split(";");
  return rest.map((l) => {
    const v = l.split(";");
    return Object.fromEntries(cols.map((c, i) => [c, v[i] ?? ""]));
  });
}
export function lines(): Line[] {
  return parse(raw);
}
export function assumptions(): Line[] {
  // A note is plain words; a ';' inside one would silently cut it short.
  const bad = rawForecast.trim().split("\n").filter((l) => l.split(";").length !== 7);
  if (bad.length) throw new Error(`forecast assumptions: wrong number of fields in ${bad.map((l) => l.split(";")[0]).join(", ")}`);
  return parse(rawForecast);
}

export const CATEGORY_LABEL: Record<string, string> = {
  personas: "People",
  ia: "Artificial intelligence",
  software: "Software and licences",
  nube: "Servers, web and domains",
  asesoria: "Gestoría, registry and bank",
  encargos: "Art and commissions",
  web3: "Web3 (gas)",
};
export const CATEGORIES = Object.keys(CATEGORY_LABEL);

// ---------------------------------------------------------------- forecast
const DAY = 864e5;
const t = (s: string) => Date.parse(s + "T00:00:00Z");
const ym = (ms: number) => new Date(ms).toISOString().slice(0, 7);
const daysIn = (m: string) => new Date(Date.UTC(+m.slice(0, 4), +m.slice(5, 7), 0)).getUTCDate();
const nextM = (m: string) => {
  const y = +m.slice(0, 4), mo = +m.slice(5, 7);
  return mo === 12 ? `${y + 1}-01` : `${y}-${String(mo + 1).padStart(2, "0")}`;
};

/** Consumed cost per category per month, from the ledger (same rule as the page). */
function consumedByMonth(): Map<string, Record<string, number>> {
  const out = new Map<string, Record<string, number>>();
  const t0 = t(START), t1 = t(AS_OF);
  for (const l of lines()) {
    if (l.kind !== "cost") continue;
    const a0 = Math.max(t(l.period_from), t0), b = t(l.period_to);
    const per = Number(l.base) / (Math.round((b - a0) / DAY) + 1);
    for (let d = a0; d <= Math.min(b, t1); d += DAY) {
      const m = ym(d), r = out.get(m) ?? {};
      r[l.category] = (r[l.category] ?? 0) + per;
      out.set(m, r);
    }
  }
  return out;
}

export interface ForecastMonth {
  month: string;
  /** Share of the month the forecast covers (the first month is partial). */
  share: number;
  cost: Record<string, number>;
  /** Income from supporters, without VAT. */
  support: number;
  /** The payment processor's fees on that income. */
  fees: number;
  supporters: number;
  loanIn: number;
  loanOut: number;
}
export interface Forecast {
  from: string;
  horizon: string;
  cash: number;
  /** Monthly run-rate each category starts from, and the window it was read over. */
  baseline: { category: string; label: string; monthly: number; window: string }[];
  assumptions: Line[];
  months: ForecastMonth[];
}

export function forecast(): Forecast {
  const cm = consumedByMonth();
  const asOfM = AS_OF.slice(0, 7);
  const closed = [...cm.keys()].filter((m) => m < asOfM).sort();
  const avg = (cat: string, n: number) => {
    const ms = closed.slice(-n);
    return ms.reduce((s, m) => s + (cm.get(m)![cat] ?? 0), 0) / ms.length;
  };
  // People and running services: the last months are the rate. One-off
  // categories (commissions, gas): a year, so a single invoice does not set it.
  const WINDOW: Record<string, number> = { personas: 1, encargos: 12, web3: 12 };
  const baseline = CATEGORIES.map((c) => {
    const n = WINDOW[c] ?? 3;
    return { category: c, label: CATEGORY_LABEL[c], monthly: avg(c, n), window: n === 1 ? "last closed month" : `average of the last ${n} closed months` };
  });
  const base = Object.fromEntries(baseline.map((b) => [b.category, b.monthly]));
  const A = assumptions();
  const on = (a: Line, m: string) => a.from.slice(0, 7) <= m && m <= a.to.slice(0, 7);
  const heads0 = (() => {
    const staff = lines().filter((l) => l.category === "personas" && l.headcount).sort((x, y) => (x.date < y.date ? -1 : 1));
    return staff.length ? Number(staff.at(-1)!.headcount) : 0;
  })();

  const months: ForecastMonth[] = [];
  let m = asOfM, supporters = 0, first = true;
  const aiGrowth = A.filter((a) => a.kind === "growth");
  while (m <= HORIZON) {
    const dim = daysIn(m);
    const share = first ? (dim - +AS_OF.slice(8, 10)) / dim : 1;
    const cost: Record<string, number> = {};
    for (const c of CATEGORIES) {
      let v = base[c];
      if (c === "personas") {
        // raises compound each January from the rule's start; a hire adds one head at the current average
        let heads = heads0;
        for (const a of A.filter((x) => x.category === c && x.kind === "hire" && on(x, m))) heads += Number(a.value);
        const perHead = heads0 ? v / heads0 : 0;
        let mult = 1;
        for (const a of A.filter((x) => x.category === c && x.kind === "raise")) {
          const y0 = +a.from.slice(0, 4), y = +m.slice(0, 4);
          if (m >= a.from.slice(0, 7)) mult *= Math.pow(1 + Number(a.value), y - y0 + 1);
        }
        v = perHead * heads * mult;
      }
      for (const a of aiGrowth.filter((x) => x.category === c)) {
        if (m >= a.from.slice(0, 7)) {
          let k = 0;
          for (let x = a.from.slice(0, 7); x < m; x = nextM(x)) k++;
          v *= Math.pow(1 + Number(a.value), k);
        }
      }
      cost[c] = v * share;
    }
    // supporters: start, churn, new
    const start = A.find((a) => a.kind === "support_start"), churn = A.find((a) => a.kind === "support_churn");
    const neu = A.find((a) => a.kind === "support_new"), fee = A.find((a) => a.kind === "support_fee");
    if (start && m === start.from.slice(0, 7)) supporters = Number(start.value);
    else if (start && m > start.from.slice(0, 7)) {
      supporters = supporters * (1 - (churn && on(churn, m) ? Number(churn.value) : 0)) + (neu && on(neu, m) ? Number(neu.value) : 0);
    }
    const gross = fee && on(fee, m) ? Number(fee.value) : 0;
    const support = supporters * (gross / 1.21) * share;
    const fees = supporters * (gross ? gross * 0.022 + 0.25 : 0) * share;
    // loan: in on its date; one year of grace; then equal monthly parts to its end date
    let loanIn = 0, loanOut = 0;
    for (const a of A.filter((x) => x.kind === "loan")) {
      const f = a.from.slice(0, 7), g = `${+f.slice(0, 4) + 1}${f.slice(4)}`, e = a.to.slice(0, 7);
      if (m === f) loanIn += Number(a.value);
      if (m >= g && m <= e) {
        let n = 0;
        for (let x = g; x <= e; x = nextM(x)) n++;
        loanOut += Number(a.value) / n;
      }
    }
    months.push({ month: m, share, cost, support, fees, supporters: Math.round(supporters), loanIn, loanOut });
    m = nextM(m);
    first = false;
  }
  return { from: AS_OF, horizon: HORIZON, cash: CASH, baseline, assumptions: A, months };
}

/** Year totals of a forecast, for the markdown view and for checking the page. */
export function forecastYears(f: Forecast, withSupport = true, withLoan = true) {
  const ys = new Map<string, { cost: number; people: number; income: number; fees: number; loanIn: number; loanOut: number; cashEnd: number }>();
  let cash = f.cash;
  for (const r of f.months) {
    const y = r.month.slice(0, 4);
    const c = Object.values(r.cost).reduce((a, b) => a + b, 0);
    const inc = withSupport ? r.support : 0, fee = withSupport ? r.fees : 0;
    const li = withLoan ? r.loanIn : 0, lo = withLoan ? r.loanOut : 0;
    cash += inc - c - fee + li - lo;
    const e = ys.get(y) ?? { cost: 0, people: 0, income: 0, fees: 0, loanIn: 0, loanOut: 0, cashEnd: 0 };
    e.cost += c; e.people += r.cost.personas ?? 0; e.income += inc; e.fees += fee; e.loanIn += li; e.loanOut += lo; e.cashEnd = cash;
    ys.set(y, e);
  }
  return ys;
}

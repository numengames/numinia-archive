// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The single-file downloads of /system/open-books as workbooks in the house
// colours (@/lib/workbook): the accounts for a period, the taxes, and the
// business plan from the reader's own assumptions. Pure: the page passes in
// what it drew, the tests pass in the same, and both get the same book.
import type { Books } from "@/lib/cash";
import { accounts, accountsSheet, categorySheet, issuedBook, pnlByMonth, type Period } from "./exports.ts";
import type { Sheet, Role } from "./workbook.ts";

export interface Ctx {
  books: Books;
  vatQ: { q: string; out: number; inp: number; rc: number; before: number; result: string; amount: number; wh: number; ss: number; kind: string }[];
  calendar: { due: string; what: string; form: string; estimate: string }[];
  cash: { amount: number; asOf: string };
  build: { version: string; commit: string };
  labels: Record<string, { label: string }>;
  eur: (n: number) => string;
}

export interface Plan {
  assumptions: { projectsPerYear: number; projectSize: number; hostingPerWorld: number; monthlyCost: number; growth: number };
  start: number;
  rows: { y: number; proj: number; pr: number; host: number; cost: number; res: number; cum: number }[];
  cash: number[];
  breakEven: number;
  need: number;
  lowAt: number;
}

const r = (n: number) => Math.round(n);
const r2 = (n: number) => Math.round(n * 100) / 100;
const qOf = (d: string) => `${d.slice(0, 4)}-Q${Math.floor((Number(d.slice(5, 7)) - 1) / 3) + 1}`;
const built = () => new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC, in the reader's browser";
const from = (c: Ctx) => `numinia.org/system/open-books · site ${c.build.version} · commit ${c.build.commit}`;

/** VAT, withholding and social security by quarter, then what falls due. */
export function taxBook(c: Ctx, p: Period): Sheet {
  const qs = c.vatQ.filter((v) => v.q >= qOf(p.from) && v.q <= qOf(p.to));
  return {
    name: "Taxes",
    title: "Taxes",
    subtitle: `${p.label} · estimates until the gestoría's filed returns are loaded`,
    head: ["Quarter", "VAT charged (repercutido)", "VAT paid (soportado)", "Reverse charge (autorepercutido = deducido)", "Credit carried in", "Result (303)", "Amount", "Income tax withheld (111)", "Social security", "Kind"],
    cols: ["text", "eur", "eur", "eur", "eur", "text", "eur", "eur", "eur", "kind"],
    rows: [
      ...qs.map((v) => [v.q, r2(v.out), r2(v.inp), r2(v.rc), r2(v.before), v.result, r2(v.amount), r2(v.wh), r2(v.ss), v.kind === "simulated" ? "estimate" : v.kind]),
      ["Calendar: what falls due, by when", "", "", "", "", "", "", "", "", ""],
      ...c.calendar.map((x) => [x.due, x.what, x.form, x.estimate, "", "", "", "", "", ""]),
      ["Estimates from the lines until the gestoría's filed returns are loaded (STD-036 LED-009).", "", "", "", "", "", "", "", "", ""],
    ],
    roles: [...qs.map(() => undefined), "section", ...c.calendar.map(() => "muted" as Role), "note"],
  };
}

/** The business plan: a front page, the assumptions, three years, 36 months of cash. */
export function planBook(c: Ctx, P: Plan): Sheet[] {
  const A = P.assumptions, last = P.rows[P.rows.length - 1], eur = c.eur;
  const cash: (string | number)[][] = P.cash.map((v, i) => [i === 0 ? "Today" : new Date(Date.UTC(P.start, i - 1, 1)).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }), r(v)]);
  return [
    {
      name: "Business plan", title: "Business plan", subtitle: `Three years from ${P.start}, from the reader's own assumptions`,
      cover: { kpis: [
        { label: "Projects a year to break even", value: P.breakEven === Infinity ? "—" : Math.round(P.breakEven * 10) / 10, fmt: "dec1", note: `at ${eur(A.projectSize)} a project and ${eur(A.monthlyCost)} a month`, kind: "plan" },
        { label: "Money the plan needs", value: P.need ? r(P.need) : "None", note: P.need ? `the lowest point of cash, month ${P.lowAt}` : "cash never falls below zero in 36 months", kind: "plan" },
        { label: `Result in ${last.y}`, value: r(last.res), note: `accumulated over three years: ${eur(last.cum)}`, kind: "plan" },
        { label: "Cash in the bank today", value: c.cash.amount, note: c.cash.asOf, kind: "declared" },
      ] },
      head: ["", ""],
      rows: [
        ["What", "A plan, not a fact: what the company would earn and spend over three years if the assumptions hold. Move them on the page and download again."],
        ["Assumptions", `${A.projectsPerYear} projects a year · ${eur(A.projectSize)} a project · ${eur(A.hostingPerWorld)} hosting a world a month · ${eur(A.monthlyCost)} cost a month · +${Math.round(A.growth * 100)}% a year`],
        ["Today", "One client since 2024. Every figure in this book is a plan except the cash in the bank, which the company declares."],
        ["Built", built()],
        ["From", from(c)],
      ],
    },
    {
      name: "Assumptions", title: "The five assumptions", head: ["Assumption", "Value", "Kind"], cols: ["text", "int", "kind"], widths: [40, 16, 12],
      rows: [["Projects a year", A.projectsPerYear, "plan"], ["Average project (EUR)", A.projectSize, "plan"], ["Hosting a world, a month (EUR)", A.hostingPerWorld, "plan"], ["Cost of running, a month (EUR)", A.monthlyCost, "plan"], ["Growth a year (%)", Math.round(A.growth * 100), "plan"], ["Starting cash, bank " + c.cash.asOf + " (EUR)", c.cash.amount, "declared"], ["Projects a year to break even", Math.round(P.breakEven * 10) / 10, "plan"], ["Money the plan needs (EUR)", P.need ? r(P.need) : "None", "plan"], ["The reader's assumptions on numinia.org/system/open-books, not the company's forecast."]],
      roles: [undefined, undefined, undefined, undefined, undefined, "strong", "total", "total", "note"],
    },
    {
      name: "Results, 3 years", title: "Three years of results",
      head: ["Year", "Projects", "Income, projects", "Income, hosting", "Cost of running", "Result", "Accumulated"], cols: ["text", "dec1", "eur0", "eur0", "eur0", "eur0", "eur0"],
      rows: P.rows.map((x) => [String(x.y), Math.round(x.proj * 10) / 10, r(x.pr), r(x.host), -r(x.cost), r(x.res), r(x.cum)]),
      roles: P.rows.map(() => "strong" as Role),
      chart: { type: "col", title: "Result and accumulated, a year", cat: 0, series: [5, 6], colors: ["018EA1", "EFA517"], at: { col: 0, row: 10, cols: 7, rowsTall: 16 } },
    },
    {
      name: "Cash, 36 months", title: "Cash, month by month", head: ["Month", "Cash at month end (EUR)"], cols: ["text", "eur0"], widths: [16, 24],
      rows: cash, roles: cash.map((_, i) => (i === 0 ? "strong" : undefined)),
      chart: { type: "line", title: "Planned cash over 36 months", cat: 0, series: [1], at: { col: 3, row: 5, cols: 9, rowsTall: 22 } },
    },
  ];
}

/** The issued invoices as people read them; the Tax Agency's layout is in the gestoría pack. */
function issuedReadable(b: Books, p: Period): Sheet {
  const E = issuedBook(b, p.from, p.to);
  const rows: (string | number)[][] = E.rows.map((x) => [String(x[8]), [x[10], x[11]].filter(Boolean).join("-"), String(x[16]), x[21], x[22], x[23], x[20], String(x[35])]);
  const sum = (i: number) => r2(rows.reduce((s, x) => s + (x[i] as number), 0));
  return {
    name: "Invoices issued", title: "Invoices issued", subtitle: `From 1 January ${p.to.slice(0, 4)}, as the Tax Agency counts them, to ${p.to}`,
    head: ["Date", "Invoice", "Client sector", "Base (EUR)", "VAT %", "VAT (EUR)", "Total (EUR)", "Original currency"], cols: ["mono", "mono", "text", "eur", "int", "eur", "eur", "mono"],
    rows: [...rows, ["Total", "", `${rows.length} invoices`, sum(3), "", sum(5), sum(6), ""]], roles: [...rows.map(() => undefined), "total"],
  };
}

/** The accounts for a period: a front page, the P&L, where the money goes,
 *  the months, the invoices issued and the taxes. */
export function accountsWorkbook(c: Ctx, p: Period): Sheet[] {
  const a = accounts(c.books, p.from, p.to, c.labels), costs = a.supplies + a.staff + a.other + a.financial;
  const months = p.from.slice(0, 7) !== p.to.slice(0, 7);
  return [
    {
      name: "Accounts", title: "The accounts", subtitle: `${p.label} · ${p.from} to ${p.to} · Numen Games S.L.`,
      cover: { kpis: [
        { label: "Revenue", value: r(a.revenue), note: "invoices issued, net of VAT", kind: "real" },
        { label: "Costs", value: -r(costs), note: "each spread over the days it covers", kind: "real" },
        { label: "Result before tax", value: r(a.beforeTax), note: a.beforeTax < 0 ? "a loss for the period" : "a profit for the period", kind: "real" },
        { label: "Cash in the bank", value: c.cash.amount, note: c.cash.asOf, kind: "declared" },
      ] },
      head: ["", ""],
      rows: [
        ["What", "The profit and loss in the Spanish accounting plan's abbreviated headings, where the money goes, the invoices issued and the taxes, for the period you chose."],
        ["How", "Each cost spread over the days it covers, net of VAT. Payroll at employer cost, all staff together, never per person."],
        ["Not loaded yet", "the 2024 received-invoices book, January–June 2026 invoices, the bank statement, the filed returns"],
        ["Built", built()],
        ["From", from(c)],
      ],
    },
    { ...accountsSheet(a, p), subtitle: `${p.label} · ${p.from} to ${p.to}` },
    { ...categorySheet(a), title: "Where the money goes", subtitle: `${p.label} · net of VAT, spread by day` },
    ...(months ? [{ ...pnlByMonth(c.books, p.from, p.to, c.labels), title: "Profit and loss, month by month", subtitle: p.label }] : []),
    issuedReadable(c.books, p),
    taxBook(c, p),
  ];
}

// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Downloads from /system/open-books, for any period, built from the same
// lines the page draws (STD-036 LED-002). Pure functions: the page runs them
// in the browser, machine/scripts/test/open-books-exports.test.mjs runs them
// in node, and both get the same figures.
//
//   period()        a month, a quarter, a year or two dates
//   accounts()      the profit and loss in the accounting plan's abbreviated
//                   headings, each cost spread over the days it covers
//                   (LED-003); equipment (account 2xx) is an asset, apart
//   receivedBook()  the VAT record books in the AEAT's normalised design,
//   issuedBook()    EXPEDIDAS and RECIBIDAS, from 1 January (aeatBooks())
//   withholding…    forms 111/190; form347() a draft of the 347
//   pnlByMonth()    a CFO's P&L in monthly columns; bySupplier()
//   journal()       an auditor's double entries from every line, with source;
//                   trialBalance() from it
//   toCsv()         semicolon CSV with a byte-order mark
//   toXlsx()        an Office Open XML workbook in the house colours, one
//                   sheet per view (@/lib/workbook)
import type { Books } from "@/lib/cash";

export const BOOKS_START = "2024-02-16";

export interface Period {
  from: string;
  to: string;
  label: string;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const lastDay = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();
const short = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const clip = (d: string) => (d < BOOKS_START ? BOOKS_START : d);

export function period(kind: "month" | "quarter" | "year" | "custom", a: string, b?: string): Period {
  if (kind === "month") {
    const [y, m] = a.split("-").map(Number);
    return { from: clip(`${a}-01`), to: `${a}-${String(lastDay(y, m)).padStart(2, "0")}`, label: `${MONTHS[m - 1]} ${y}` };
  }
  if (kind === "quarter") {
    const [y, q] = a.split("-Q").map(Number), m0 = (q - 1) * 3 + 1, m1 = m0 + 2;
    return { from: clip(`${y}-${String(m0).padStart(2, "0")}-01`), to: `${y}-${String(m1).padStart(2, "0")}-${lastDay(y, m1)}`, label: `Q${q} ${y}` };
  }
  if (kind === "year") return { from: clip(`${a}-01-01`), to: `${a}-12-31`, label: a };
  const [f, t] = [a, b ?? a].sort();
  return { from: clip(f), to: t, label: `${short(clip(f))} – ${short(t)}` };
}

const day = (d: string) => Date.parse(d + "T00:00:00Z") / 86400000;
/** The share of a line's amount that falls between from and to, by days. */
function spread(amount: number, pFrom: string, pTo: string, from: string, to: string) {
  const a = day(pFrom), b = Math.max(a, day(pTo)), lo = Math.max(a, day(from)), hi = Math.min(b, day(to));
  return hi < lo ? 0 : (amount * (hi - lo + 1)) / (b - a + 1);
}

type Row = Record<string, string>;
const QEND = ["03-31", "06-30", "09-30", "12-31"], QSTART = ["01-01", "04-01", "07-01", "10-01"];
/** Every cost as one list: the two books and payroll, a quarter a line. */
function costLines(b: Books): Row[] {
  const pay = b.payroll.map((p) => {
    const [y, q] = p.quarter.split("-Q"), i = Number(q) - 1;
    return { date: `${y}-${QEND[i]}`, period_from: `${y}-${QSTART[i]}`, period_to: `${y}-${QEND[i]}`, category: "payroll", account: "640", base: p.employer_cost } as Row;
  });
  return [...b.l25, ...b.l26, ...pay];
}

export interface Accounts {
  revenue: number;
  supplies: number;
  staff: number;
  other: number;
  operating: number;
  financial: number;
  beforeTax: number;
  capitalised: number;
  byCategory: { category: string; label: string; amount: number }[];
}

/** The profit and loss for a period, PGC abbreviated headings, spread by day. */
export function accounts(b: Books, from: string, to: string, labels: Record<string, { label: string }> = {}): Accounts {
  const r: Accounts = { revenue: 0, supplies: 0, staff: 0, other: 0, operating: 0, financial: 0, beforeTax: 0, capitalised: 0, byCategory: [] };
  const cat: Record<string, number> = {};
  for (const l of costLines(b)) {
    const v = spread(Number(l.base), l.period_from || l.date, l.period_to || l.date, from, to);
    if (!v) continue;
    const acc = l.account;
    if (acc.startsWith("2")) { r.capitalised += v; continue; }
    if (acc.startsWith("60")) r.supplies += v;
    else if (acc.startsWith("64")) r.staff += v;
    else if (acc.startsWith("66")) r.financial += v;
    else r.other += v;
    cat[l.category] = (cat[l.category] ?? 0) + v;
  }
  for (const s of b.sales) if (s.date >= from && s.date <= to) r.revenue += Number(s.base);
  r.operating = r.revenue - r.supplies - r.staff - r.other;
  r.beforeTax = r.operating - r.financial;
  r.byCategory = Object.keys(cat).map((c) => ({ category: c, label: labels[c]?.label ?? c, amount: cat[c] })).sort((a, b) => b.amount - a.amount);
  return r;
}

export type { Sheet } from "./workbook.ts";
import type { Sheet } from "./workbook.ts";

const r2 = (n: number) => Math.round(n * 100) / 100;

/** The profit and loss as a sheet: heading, amount, account group. */
export function accountsSheet(a: Accounts, p: Period): Sheet {
  return {
    name: "Profit and loss",
    title: "Profit and loss",
    head: ["Heading (PGC PYMES, abbreviated)", "Amount (EUR)", "Accounts"],
    subtitle: `${p.label} · ${p.from} to ${p.to}`,
    cols: ["text", "eur", "mono"],
    widths: [46, 20, 12],
    roles: [undefined, undefined, undefined, undefined, "total", undefined, "total", "muted", "note"],
    rows: [
      ["1. Revenue", r2(a.revenue), "70"],
      ["4. Supplies (work by other companies)", -r2(a.supplies), "60"],
      ["6. Staff costs", -r2(a.staff), "64"],
      ["7. Other operating costs", -r2(a.other), "62"],
      ["A.1 Operating result", r2(a.operating), ""],
      ["13. Financial costs", -r2(a.financial), "66"],
      ["A.3 Result before tax", r2(a.beforeTax), ""],
      ["Bought as assets, not a cost (depreciated over years)", r2(a.capitalised), "21"],
      ["Each cost spread over the days it covers; net of VAT; payroll at employer cost, all staff together.", "", ""],
    ],
  };
}

export function categorySheet(a: Accounts): Sheet {
  const t = a.byCategory.reduce((s, c) => s + c.amount, 0) || 1;
  const rows: (string | number)[][] = a.byCategory.map((c) => [c.label, r2(c.amount), c.amount / t]);
  return { name: "Spending by category", head: ["What", "Amount (EUR)", "Share"], cols: ["text", "eur", "pct"], rows: [...rows, ["Total", r2(t === 1 && !rows.length ? 0 : t), rows.length ? 1 : 0]], roles: [...rows.map(() => undefined), "total"], chart: rows.length ? { type: "bar", title: "Where the money goes", cat: 0, series: [1], rows: [0, rows.length], at: { col: 4, row: 5, cols: 7, rowsTall: Math.max(14, rows.length + 4) } } : undefined };
}

const cell = (v: string | number, comma = false) => {
  const s = typeof v === "number" && comma ? v.toFixed(2).replace(".", ",") : String(v ?? "");
  return /[;"\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** Semicolons and a byte-order mark; `comma` writes amounts as the AEAT asks
 *  (two decimals after a comma, no thousands separator). */
export function toCsv(s: Pick<Sheet, "head" | "rows">, comma = false): string {
  return "\uFEFF" + [s.head.map((h) => cell(h)), ...s.rows.map((r) => r.map((v) => cell(v, comma)))].map((r) => r.join(";")).join("\r\n") + "\r\n";
}

// The workbook itself, in the house colours, is @/lib/workbook.
export { toXlsx } from "./workbook.ts";

// ── The packs: what the gestoría, a CFO and an auditor ask for ─────────────

const dmy = (d: string) => `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(0, 4)}`;
const qT = (d: string) => `${Math.floor((Number(d.slice(5, 7)) - 1) / 3) + 1}T`;
const together = (name: string) => /together/i.test(name);

/** The AEAT's normalised record design, column by column (Formato electrónico
 *  común de los Libros Registro de IVA e IRPF, 2025-2026). */
const AEAT_ISSUED = ["Autoliquidación · Ejercicio", "Autoliquidación · Periodo", "Actividad · Código", "Actividad · Tipo", "Actividad · Grupo o Epígrafe del IAE", "Tipo de Factura", "Concepto de Ingreso", "Ingreso Computable", "Fecha Expedición", "Fecha Operación", "Identificación de la Factura · Serie", "Identificación de la Factura · Número", "Identificación de la Factura · Número-Final", "NIF Destinatario · Tipo", "NIF Destinatario · Código País", "NIF Destinatario · Identificación", "Nombre Destinatario", "Clave de Operación", "Calificación de la Operación", "Operación Exenta", "Total Factura", "Base Imponible", "Tipo de IVA", "Cuota IVA Repercutida", "Tipo de Recargo Eq.", "Cuota Recargo Eq.", "Cobro · Fecha", "Cobro · Importe", "Cobro · Medio Utilizado", "Cobro · Identificación Medio Utilizado", "Tipo Retención del IRPF", "Importe Retenido del IRPF", "Registro Acuerdo Facturación", "Inmueble · Situación", "Inmueble · Referencia Catastral", "Referencia Externa"];
const AEAT_RECEIVED = ["Autoliquidación · Ejercicio", "Autoliquidación · Periodo", "Actividad · Código", "Actividad · Tipo", "Actividad · Grupo o Epígrafe del IAE", "Tipo de Factura", "Concepto de Gasto", "Gasto Deducible", "Fecha Expedición", "Fecha Operación", "Identificación Factura del Expedidor · (Serie-Número)", "Identificación Factura del Expedidor · Número-Final", "Fecha Recepción", "Número Recepción", "Número Recepción Final", "NIF Expedidor · Tipo", "NIF Expedidor · Código País", "NIF Expedidor · Identificación", "Nombre Expedidor", "Clave de Operación", "Bien de Inversión", "Inversión del Sujeto Pasivo", "Deducible en Periodo Posterior", "Periodo Deducción · Ejercicio", "Periodo Deducción · Periodo", "Total Factura", "Base Imponible", "Tipo de IVA", "Cuota IVA Soportado", "Cuota Deducible", "Tipo de Recargo Eq.", "Cuota Recargo Eq.", "Pago · Fecha", "Pago · Importe", "Pago · Medio Utilizado", "Pago · Identificación Medio Utilizado", "Tipo Retención del IRPF", "Importe Retenido del IRPF", "Registro Acuerdo Facturación", "Inmueble · Situación", "Inmueble · Referencia Catastral", "Referencia Externa"];

/** The AEAT asks for a year's books from 1 January, not split by quarter. */
function aeatSpan(_from: string, to: string) {
  const y = to.slice(0, 4);
  return { y, from: clip(`${y}-01-01`), to };
}

export function issuedBook(b: Books, from: string, to: string): Sheet {
  const s = aeatSpan(from, to);
  const rows = b.sales.filter((x) => x.date >= s.from && x.date <= s.to).sort((p, q) => (p.date < q.date ? -1 : 1)).map((x) => {
    const base = Number(x.base), out = x.vat === "OUT", rate = x.vat === "21" ? 21 : 0, vat = r2((base * rate) / 100);
    const [serie, num] = x.invoice.includes("-") ? [x.invoice.slice(0, x.invoice.lastIndexOf("-")), x.invoice.slice(x.invoice.lastIndexOf("-") + 1)] : ["", x.invoice];
    return [Number(x.date.slice(0, 4)), qT(x.date), "A", "03", "", "F1", "", "", dmy(x.date), "", serie, num, "", out ? "06" : "", out ? "US" : "", "", x.sector, "01", out ? "N2" : "S1", "", r2(base + vat), base, rate, vat, "", "", "", "", "", "", "", "", "", "", "", x.original ? `${x.original} @ ${x.fx} (BCE)` : ""];
  });
  return { name: "EXPEDIDAS", head: AEAT_ISSUED, rows, plain: true };
}

export function receivedBook(b: Books, from: string, to: string): Sheet {
  const s = aeatSpan(from, to);
  let n = 0;
  const rows = [...b.l25, ...b.l26].filter((l) => l.date >= s.from && l.date <= s.to).sort((p, q) => (p.date < q.date ? -1 : 1)).map((l) => {
    const base = Number(l.base), isp = l.vat === "ISP", rate = l.vat === "21" || isp ? 21 : 0, vat = r2((base * rate) / 100);
    const summary = together(l.supplier);
    n++;
    return [Number(l.date.slice(0, 4)), qT(l.date), "A", "03", "", summary ? "F4" : "F1", "", "", dmy(l.date), l.period_from && l.period_from !== l.date ? dmy(l.period_from) : "", l.document, "", dmy(l.date), String(n), "", "", "", "", l.supplier, "01", l.account.startsWith("2") ? "S" : "N", isp ? "S" : "N", "N", "", "", isp ? base : r2(base + vat), base, rate, vat, l.vat === "FOREIGN" ? 0 : vat, "", "", "", "", "", "", "", "", "", "", "", summary ? "Asiento resumen: personas sin consentimiento para ser nombradas (STD-036 LED-006)" : l.vat === "FOREIGN" ? "IVA extranjero, no deducible en España" : ""];
  });
  return { name: "RECIBIDAS", head: AEAT_RECEIVED, rows, plain: true };
}

/** The VAT books as the AEAT names the file: year + tax ID + C + name. */
export function aeatBooks(b: Books, company: { taxId: string; name: string }, from: string, to: string) {
  const s = aeatSpan(from, to);
  const name = company.name.toUpperCase().replace(/[.,]/g, "");
  return { file: `${s.y}${company.taxId}C${name}.xlsx`, sheets: [issuedBook(b, from, to), receivedBook(b, from, to)] };
}

/** Income tax withheld, for forms 111 (quarterly) and 190 (yearly). */
export function withholdingSheet(b: Books, from: string, to: string): Sheet {
  const rows: (string | number)[][] = [];
  const qOf = (d: string) => `${d.slice(0, 4)}-${qT(d)}`;
  for (const p of b.payroll) {
    const [y, q] = p.quarter.split("-Q"), end = `${y}-${QEND[Number(q) - 1]}`;
    if (end >= from && end <= to && Number(p.income_tax) > 0) rows.push([`${y}-${q}T`, "111 · 190", "Employees, all together (work income)", r2(Number(p.employer_cost)), r2(Number(p.income_tax))]);
  }
  for (const l of [...b.l25, ...b.l26]) if (l.date >= from && l.date <= to && Number(l.withholding || 0) > 0) rows.push([qOf(l.date), "111 · 190", together(l.supplier) ? `${l.supplier} (professionals)` : `${l.supplier} (professional)`, Number(l.base), Number(l.withholding)]);
  rows.sort((p, q) => (p[0] < q[0] ? -1 : 1));
  return { name: "Withholding 111-190", head: ["Quarter", "Form", "Who", "Base or employer cost (EUR)", "Withheld (EUR)"], rows };
}

/** A draft of form 347: domestic counterparties over 3,005.06 € a year, VAT
 *  included, by quarter. Foreign suppliers, reverse charge and operations with
 *  withholding are declared elsewhere and stay out. A draft for the gestoría. */
export function form347(b: Books, year: string): Sheet {
  const by: Record<string, { kind: string; q: number[] }> = {};
  const add = (name: string, kind: string, d: string, v: number) => { const e = (by[name] ??= { kind, q: [0, 0, 0, 0] }); e.q[Number(qT(d)[0]) - 1] += v; };
  for (const l of [...b.l25, ...b.l26]) if (l.date.startsWith(year) && (l.vat === "21" || l.vat === "EX") && !together(l.supplier) && !Number(l.withholding || 0)) add(l.supplier, "Supplier (B)", l.date, Number(l.base) * (l.vat === "21" ? 1.21 : 1));
  for (const x of b.sales) if (x.date.startsWith(year) && x.vat === "21") add(x.sector, "Client (A)", x.date, Number(x.base) * 1.21);
  const rows = Object.entries(by).map(([n, e]) => [n, e.kind, r2(e.q.reduce((s, v) => s + v, 0)), ...e.q.map(r2)] as (string | number)[]).filter((r) => (r[2] as number) > 3005.06).sort((p, q) => (q[2] as number) - (p[2] as number));
  return { name: "347 draft", head: ["Counterparty", "Key", "Year, VAT included (EUR)", "Q1", "Q2", "Q3", "Q4"], rows };
}

/** The profit and loss month by month, in columns: what a CFO reads first. */
export function pnlByMonth(b: Books, from: string, to: string, labels: Record<string, { label: string }> = {}): Sheet {
  const months: Period[] = [];
  for (let m = from.slice(0, 7); m <= to.slice(0, 7); ) {
    const p = period("month", m);
    months.push({ from: p.from < from ? from : p.from, to: p.to > to ? to : p.to, label: m });
    const [y, mm] = m.split("-").map(Number);
    m = mm === 12 ? `${y + 1}-01` : `${y}-${String(mm + 1).padStart(2, "0")}`;
  }
  const A = months.map((p) => accounts(b, p.from, p.to, labels)), T = accounts(b, from, to, labels);
  const line = (h: string, f: (a: Accounts) => number) => [h, ...A.map((a) => r2(f(a))), r2(f(T))];
  return {
    name: "P&L by month",
    roles: [undefined, undefined, undefined, undefined, "total", undefined, "total", "muted"],
    cols: ["text", ...months.map(() => "eur0" as const), "eur0"],
    widths: [36, ...months.map(() => 10), 13],
    head: ["Heading (PGC PYMES, abbreviated)", ...months.map((p) => p.label), "Total"],
    rows: [
      line("1. Revenue", (a) => a.revenue),
      line("4. Supplies (work by other companies)", (a) => -a.supplies),
      line("6. Staff costs", (a) => -a.staff),
      line("7. Other operating costs", (a) => -a.other),
      line("A.1 Operating result", (a) => a.operating),
      line("13. Financial costs", (a) => -a.financial),
      line("A.3 Result before tax", (a) => a.beforeTax),
      line("Bought as assets", (a) => a.capitalised),
    ],
  };
}

/** Spend by supplier, billed in the period, with its recent monthly pace. */
export function bySupplier(b: Books, from: string, to: string, labels: Record<string, { label: string }> = {}): Sheet {
  const ls = [...b.l25, ...b.l26].filter((l) => l.date >= from && l.date <= to);
  const total = ls.reduce((s, l) => s + Number(l.base), 0) || 1;
  const cut = new Date(Date.parse(to + "T00:00:00Z") - 91 * 86400000).toISOString().slice(0, 10);
  const by: Record<string, Row[]> = {};
  for (const l of ls) (by[l.supplier] ??= []).push(l);
  const rows = Object.entries(by).map(([w, xs]) => {
    const net = xs.reduce((s, l) => s + Number(l.base), 0), ds = xs.map((l) => l.date).sort();
    return [w, labels[xs[0].category]?.label ?? xs[0].category, xs.length, r2(net), net / total, ds[0], ds[ds.length - 1], r2(xs.filter((l) => l.date > cut).reduce((s, l) => s + Number(l.base), 0) / 3)] as (string | number)[];
  }).sort((p, q) => (q[3] as number) - (p[3] as number));
  return { name: "Spend by supplier", cols: ["text", "text", "int", "eur", "pct", "mono", "mono", "eur"], head: ["Supplier", "Category", "Invoices", "Net (EUR)", "Share", "First", "Last", "A month, last 3 months billed (EUR)"], rows };
}

const ACCOUNTS: Record<string, string> = {
  "217": "Equipos para procesos de información", "472": "H.P., IVA soportado", "477": "H.P., IVA repercutido", "4751": "H.P., acreedora por retenciones practicadas",
  "410": "Acreedores por prestaciones de servicios", "430": "Clientes", "607": "Trabajos realizados por otras empresas", "623": "Servicios de profesionales independientes",
  "627": "Publicidad, propaganda y relaciones públicas", "629": "Otros servicios", "640": "Sueldos, salarios y seguridad social a cargo de la empresa, todo el personal", "662": "Intereses de deudas", "705": "Prestaciones de servicios",
};

/** Every published line as a balanced double entry, on its invoice date,
 *  naming the file and row it comes from. Payroll is one entry a quarter at
 *  employer cost against one payable: no entry shows net pay (LED-006). */
export function journal(b: Books, from: string, to: string): Sheet {
  const rows: (string | number)[][] = [];
  let n = 0;
  const entry = (date: string, doc: string, what: string, src: string, kind: string, legs: [string, number, number][]) => {
    n++;
    for (const [acc, dr, cr] of legs) if (dr || cr) rows.push([n, date, acc, ACCOUNTS[acc] ?? "", r2(dr), r2(cr), doc, what, src, kind]);
  };
  const cost = (l: Row, file: string, i: number) => {
    if (l.date < from || l.date > to) return;
    const base = Number(l.base), vat = l.vat === "21" ? r2(base * 0.21) : 0, isp = l.vat === "ISP" ? r2(base * 0.21) : 0, wh = Number(l.withholding || 0);
    entry(l.date, l.document, `${l.supplier} · ${l.concept}`, `web/src/data/${file}:${i + 2}`, l.kind || "real", [
      [l.account, base, 0], ["472", vat + isp, 0], ["477", 0, isp], ["4751", 0, wh], ["410", 0, r2(base + vat - wh)],
    ]);
  };
  b.l25.forEach((l, i) => cost(l, "ledger-2025.csv", i));
  b.l26.forEach((l, i) => cost(l, "ledger-2026.csv", i));
  b.payroll.forEach((p, i) => {
    const [y, q] = p.quarter.split("-Q"), d = `${y}-${QEND[Number(q) - 1]}`;
    if (d < from || d > to) return;
    entry(d, `PAYROLL-${p.quarter}`, "Payroll, all staff together, at employer cost", `web/src/data/payroll.csv:${i + 2}`, p.kind, [["640", Number(p.employer_cost), 0], ["410", 0, Number(p.employer_cost)]]);
  });
  b.sales.forEach((x, i) => {
    if (x.date < from || x.date > to) return;
    const base = Number(x.base), vat = x.vat === "21" ? r2(base * 0.21) : 0;
    entry(x.date, x.invoice, `${x.sector} · ${x.concept}`, `web/src/data/sales.csv:${i + 2}`, x.kind, [["430", base + vat, 0], ["705", 0, base], ["477", 0, vat]]);
  });
  rows.sort((p, q) => (p[1] < q[1] ? -1 : p[1] > q[1] ? 1 : (p[0] as number) - (q[0] as number)));
  return { name: "Journal", head: ["Entry", "Date", "Account", "Account name", "Debit", "Credit", "Document", "Description", "Source", "Kind"], rows };
}

/** Sums and balances, from the journal. Only the published lines: no bank,
 *  no equity, no opening balance until the gestoría's trial balance is loaded. */
export function trialBalance(j: Sheet): Sheet {
  const by: Record<string, [number, number]> = {};
  for (const r of j.rows) { const e = (by[r[2] as string] ??= [0, 0]); e[0] += r[4] as number; e[1] += r[5] as number; }
  const rows = Object.keys(by).sort().map((a) => [a, ACCOUNTS[a] ?? "", r2(by[a][0]), r2(by[a][1]), r2(by[a][0] - by[a][1])]);
  return { name: "Trial balance", head: ["Account", "Account name", "Debit", "Credit", "Balance"], rows };
}

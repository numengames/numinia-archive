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
//   receivedBook()  the received-invoices book in the gestoría's layout
//   issuedBook()    the issued-invoices book, clients by sector
//   toCsv()         semicolon CSV with a byte-order mark
//   toXlsx()        an Office Open XML workbook, one sheet per view, no
//                   library: stored zip entries and inline strings
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

export interface Sheet {
  name: string;
  head: string[];
  rows: (string | number)[][];
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** The profit and loss as a sheet: heading, amount, account group. */
export function accountsSheet(a: Accounts, p: Period): Sheet {
  return {
    name: "Profit and loss",
    head: ["Heading (PGC PYMES, abbreviated)", "Amount (EUR)", "Accounts"],
    rows: [
      ["Period", p.label, `${p.from} to ${p.to}`],
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
  return { name: "Spending by category", head: ["What", "Amount (EUR)", "Share"], rows: a.byCategory.map((c) => [c.label, r2(c.amount), `${((c.amount / t) * 100).toFixed(1)}%`]) };
}

/** The received-invoices book, by invoice date, in the gestoría's layout. */
export function receivedBook(b: Books, from: string, to: string): Sheet {
  const KEY: Record<string, [string, string, number]> = { "21": ["Interior", "N", 21], ISP: ["Inversión sujeto pasivo", "S", 21], EX: ["Exenta", "N", 0], FOREIGN: ["IVA extranjero, no deducible", "N", 0], OUT: ["No sujeta", "N", 0] };
  const rows = [...b.l25, ...b.l26].filter((l) => l.date >= from && l.date <= to).sort((x, y) => (x.date < y.date ? -1 : 1)).map((l) => {
    const base = Number(l.base), [k, isp, rate] = KEY[l.vat] ?? ["Interior", "N", 0], ret = Number(l.withholding || 0);
    const vat = isp === "S" ? 0 : r2((base * rate) / 100);
    return [l.date, l.period_from, l.document, l.supplier, l.concept, l.account, k, isp, base, rate, vat, ret, r2(base + vat - ret), isp === "S" ? r2(base * 0.21) : 0];
  });
  return { name: "Received invoices", head: ["Fecha expedición", "Fecha operación", "Número factura", "Nombre expedidor", "Concepto", "Cuenta PGC", "Clave operación", "Inversión sujeto pasivo", "Base imponible", "Tipo IVA %", "Cuota IVA soportado", "Retención IRPF", "Total factura", "Cuota autorepercutida ISP"], rows };
}

/** The issued-invoices book, clients by sector until they agree to be named. */
export function issuedBook(b: Books, from: string, to: string): Sheet {
  const rows = b.sales.filter((s) => s.date >= from && s.date <= to).map((s) => {
    const base = Number(s.base), rate = s.vat === "21" ? 21 : 0, vat = r2((base * rate) / 100);
    return [s.date, s.invoice, s.sector, s.concept, base, rate, vat, r2(base + vat), s.vat === "OUT" ? "No sujeta (servicio fuera de la UE)" : "Interior", s.original, s.fx, s.kind];
  });
  return { name: "Issued invoices", head: ["Fecha expedición", "Número factura", "Destinatario (sector)", "Concepto", "Base imponible", "Tipo IVA %", "Cuota IVA repercutido", "Total factura", "Clave operación", "Divisa original", "Tipo de cambio", "Clase"], rows };
}

const cell = (v: string | number) => {
  const s = String(v ?? "");
  return /[;"\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function toCsv(s: Pick<Sheet, "head" | "rows">): string {
  return "\uFEFF" + [s.head, ...s.rows].map((r) => r.map(cell).join(";")).join("\r\n") + "\r\n";
}

// ── A workbook without a library ───────────────────────────────────────────
const enc = new TextEncoder();
const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
const crc32 = (d: Uint8Array) => { let c = 0xffffffff; for (const x of d) c = CRC[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };

/** A zip with stored (uncompressed) entries: enough for a workbook. */
function zip(files: [string, string][]): Uint8Array {
  const parts: Uint8Array[] = [], central: Uint8Array[] = [];
  let off = 0;
  for (const [name, text] of files) {
    const n = enc.encode(name), d = enc.encode(text), c = crc32(d);
    const h = new DataView(new ArrayBuffer(30));
    h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint32(14, c, true); h.setUint32(18, d.length, true); h.setUint32(22, d.length, true); h.setUint16(26, n.length, true);
    const cd = new DataView(new ArrayBuffer(46));
    cd.setUint32(0, 0x02014b50, true); cd.setUint16(4, 20, true); cd.setUint16(6, 20, true); cd.setUint16(8, 0x0800, true); cd.setUint32(16, c, true); cd.setUint32(20, d.length, true); cd.setUint32(24, d.length, true); cd.setUint16(28, n.length, true); cd.setUint32(42, off, true);
    parts.push(new Uint8Array(h.buffer), n, d);
    central.push(new Uint8Array(cd.buffer), n);
    off += 30 + n.length + d.length;
  }
  const size = central.reduce((s, x) => s + x.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true); end.setUint32(12, size, true); end.setUint32(16, off, true);
  const all = [...parts, ...central, new Uint8Array(end.buffer)], out = new Uint8Array(all.reduce((s, x) => s + x.length, 0));
  let p = 0; for (const x of all) { out.set(x, p); p += x.length; }
  return out;
}

const col = (i: number) => { let s = ""; for (i++; i; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + ((i - 1) % 26)) + s; return s; };

function sheetXml(s: Sheet): string {
  const row = (r: (string | number)[], y: number, bold: boolean) => `<row r="${y}">${r.map((v, x) => {
    const ref = col(x) + y, st = bold ? ' s="1"' : "";
    return typeof v === "number" && isFinite(v) ? `<c r="${ref}"${st}><v>${v}</v></c>` : `<c r="${ref}" t="inlineStr"${st}><is><t xml:space="preserve">${xml(String(v ?? ""))}</t></is></c>`;
  }).join("")}</row>`;
  const widths = s.head.map((_, i) => Math.min(60, Math.max(10, ...[s.head, ...s.rows].map((r) => String(r[i] ?? "").length + 2))));
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("")}</cols><sheetData>${row(s.head, 1, true)}${s.rows.map((r, i) => row(r, i + 2, false)).join("")}</sheetData></worksheet>`;
}

export function toXlsx(sheets: Sheet[]): Uint8Array {
  const names = sheets.map((s) => s.name.replace(/[\\/?*[\]:]/g, " ").slice(0, 31));
  return zip([
    ["[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>`],
    ["_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`],
    ["xl/workbook.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${names.map((n, i) => `<sheet name="${xml(n)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets></workbook>`],
    ["xl/_rels/workbook.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`],
    ["xl/styles.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="2"><xf/><xf fontId="1" applyFont="1"/></cellXfs></styleSheet>`],
    ...sheets.map((s, i) => [`xl/worksheets/sheet${i + 1}.xml`, sheetXml(s)] as [string, string]),
  ]);
}

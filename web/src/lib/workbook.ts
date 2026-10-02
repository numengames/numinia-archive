// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The workbook every Open books download is written as, in the house's
// colours (Design System v5: Noche, Arena, Turquesa, Ámbar, Grana), with no
// library: stored zip entries, inline strings, one styles part, native
// charts. Pure: the page runs it in the browser, the tests in node.
//
//   A sheet is still { name, head, rows }. Everything else is optional:
//     title, subtitle   the dark band on top (default: the sheet's name)
//     cols              a format per column; guessed from the heading if absent
//     roles             a role per row: total, strong, section, muted, note
//     chart             a native line, column or bar chart beside the table
//     cover             a front page: big figures, then key and value rows
//     plain             no band, no colours: the Tax Agency's own layout
//   Every styled sheet: no gridlines, frozen heading, filter on long tables,
//   negatives in Grana, the four kinds of figure (real, declared, estimate,
//   plan) in their colours, landscape and fit to width when printed.

export type Fmt = "text" | "eur" | "eur0" | "int" | "dec1" | "pct" | "mono" | "kind";
export type Role = "total" | "strong" | "section" | "muted" | "note" | undefined;
export type Cell = string | number;

export interface Chart {
  type: "line" | "col" | "bar";
  title: string;
  /** Column of the categories and the columns of the series, 0-based. */
  cat: number;
  series: number[];
  /** Rows of the table to plot, 0-based, end exclusive. Default: all. */
  rows?: [number, number];
  colors?: string[];
  /** Where it sits, in columns and rows from A1, and how big. */
  at?: { col: number; row: number; cols?: number; rowsTall?: number };
}

export interface Kpi {
  label: string;
  value: Cell;
  fmt?: Fmt;
  note?: string;
  kind?: string;
}

export interface Sheet {
  name: string;
  head: string[];
  rows: Cell[][];
  title?: string;
  subtitle?: string;
  cols?: Fmt[];
  roles?: Role[];
  widths?: number[];
  chart?: Chart;
  cover?: { kpis: Kpi[]; legend?: boolean };
  plain?: boolean;
  tab?: string;
}

export interface BookOptions {
  /** The line under every title: the period and the company. */
  subtitle?: string;
  /** The line at the foot of every sheet. */
  footer?: string;
}

// ── The house colours, as Excel wants them (RRGGBB) ────────────────────────
export const C = {
  noche: "14110F", superficie: "1E1A17", elevada: "292420", linea: "3A332D",
  arena: "F9EBDC", arenaSoft: "FBF5EE", arenaRule: "EADFD2", muted: "C4B5A6", dim: "8A7D72",
  ink: "292420", turquesa: "018EA1", verdemar: "A6DAD5", ambar: "EFA517", ambarText: "7A5100",
  grana: "D33440", verde: "4E8A2E", azul: "2F6FAD", lila: "7A5BC0", white: "FFFFFF",
};
/** The four kinds of figure, as text on paper. */
export const KIND: Record<string, string> = { real: C.verde, booked: C.verde, public: C.verde, declared: C.azul, estimate: C.ambarText, simulated: C.ambarText, plan: C.lila };
const SERIES = [C.turquesa, C.ambar, C.grana, C.verdemar, C.lila, C.azul];

// ── Styles: every distinct look becomes one cellXfs entry ──────────────────
interface Look {
  b?: boolean; i?: boolean; sz?: number; color?: string; font?: string;
  fill?: string; top?: [string, string]; bottom?: [string, string];
  fmt?: number; h?: "left" | "right" | "center"; v?: "top" | "center" | "bottom"; wrap?: boolean; indent?: number;
}
const FMTS: Record<number, string> = {
  164: '#,##0.00\\ "€";\\−#,##0.00\\ "€";"–"',
  165: '#,##0\\ "€";\\−#,##0\\ "€";"–"',
  166: "0.0%",
  167: "#,##0.0",
  168: "#,##0",
  169: '+0%;\\−0%',
};
const FMT_OF: Record<Fmt, number | undefined> = { text: undefined, mono: undefined, kind: undefined, eur: 164, eur0: 165, pct: 166, dec1: 167, int: 168 };

class Styles {
  fonts = ['<font><sz val="10"/><color rgb="FF292420"/><name val="Calibri"/><family val="2"/></font>'];
  fills = ['<fill><patternFill patternType="none"/></fill>', '<fill><patternFill patternType="gray125"/></fill>'];
  borders = ["<border><left/><right/><top/><bottom/><diagonal/></border>"];
  xfs = ['<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'];
  private idx = new Map<string, number>();
  private put(list: string[], x: string) { let i = list.indexOf(x); if (i < 0) { list.push(x); i = list.length - 1; } return i; }
  id(l: Look): number {
    const key = JSON.stringify(l);
    const hit = this.idx.get(key); if (hit !== undefined) return hit;
    const font = this.put(this.fonts, `<font>${l.b ? "<b/>" : ""}${l.i ? "<i/>" : ""}<sz val="${l.sz ?? 10}"/><color rgb="FF${l.color ?? C.ink}"/><name val="${l.font ?? "Calibri"}"/><family val="2"/></font>`);
    const fill = l.fill ? this.put(this.fills, `<fill><patternFill patternType="solid"><fgColor rgb="FF${l.fill}"/><bgColor indexed="64"/></patternFill></fill>`) : 0;
    const side = (n: string, s?: [string, string]) => (s ? `<${n} style="${s[0]}"><color rgb="FF${s[1]}"/></${n}>` : `<${n}/>`);
    const border = l.top || l.bottom ? this.put(this.borders, `<border><left/><right/>${side("top", l.top)}${side("bottom", l.bottom)}<diagonal/></border>`) : 0;
    if (l.indent && !l.h) l = { ...l, h: "left" };
    const al = l.h || l.v || l.wrap || l.indent ? `<alignment${l.h ? ` horizontal="${l.h}"` : ""} vertical="${l.v ?? "center"}"${l.wrap ? ' wrapText="1"' : ""}${l.indent ? ` indent="${l.indent}"` : ""}/>` : '<alignment vertical="center"/>';
    this.xfs.push(`<xf numFmtId="${l.fmt ?? 0}" fontId="${font}" fillId="${fill}" borderId="${border}" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"${l.fmt ? ' applyNumberFormat="1"' : ""}>${al}</xf>`);
    const i = this.xfs.length - 1; this.idx.set(key, i); return i;
  }
  xml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="${Object.keys(FMTS).length}">${Object.entries(FMTS).map(([k, v]) => `<numFmt numFmtId="${k}" formatCode="${xml(v)}"/>`).join("")}</numFmts><fonts count="${this.fonts.length}">${this.fonts.join("")}</fonts><fills count="${this.fills.length}">${this.fills.join("")}</fills><borders count="${this.borders.length}">${this.borders.join("")}</borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="${this.xfs.length}">${this.xfs.join("")}</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
  }
}

// ── Small helpers ──────────────────────────────────────────────────────────
const enc = new TextEncoder();
export const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const col = (i: number) => { let s = ""; for (i++; i; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + ((i - 1) % 26)) + s; return s; };
const ref = (x: number, y: number) => col(x) + (y + 1);
/** A sheet name as a formula wants it, already escaped for XML ("P&L" breaks a workbook otherwise). */
const quoted = (n: string) => xml(`'${n.replace(/'/g, "''")}'`);
const isNum = (v: unknown): v is number => typeof v === "number" && isFinite(v);

const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
const crc32 = (d: Uint8Array) => { let c = 0xffffffff; for (const x of d) c = CRC[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };

/** A zip with stored (uncompressed) entries: enough for a workbook. */
export function zip(files: [string, string][]): Uint8Array {
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

/** A column's format, from what it holds and what its heading says. */
function guess(s: Sheet, i: number): Fmt {
  const h = s.head[i] ?? "", vs = s.rows.map((r) => r[i]).filter((v) => v !== "" && v !== undefined);
  if (/^kind$/i.test(h)) return "kind";
  if (/^(source|document|sha|commit)/i.test(h)) return "mono";
  if (!vs.length || !vs.some(isNum)) return "text";
  if (/share|%/i.test(h)) return "pct";
  if (/EUR|€|amount|debit|credit|balance|base|withheld|net|total|income|cost|result|cash|vat|cuota|importe|\bout\b|\bin\b/i.test(h)) return vs.every((v) => !isNum(v) || Number.isInteger(v)) ? "eur0" : "eur";
  if (/^(year|entry|ejercicio)/i.test(h)) return "text";
  return vs.every((v) => !isNum(v) || Number.isInteger(v)) ? "int" : "dec1";
}
/** A row's role, when the sheet does not say: the accounting plan's results stand out. */
const roleOf = (s: Sheet, y: number): Role => s.roles?.[y] ?? (/^(A\.\d|total\b|result\b)/i.test(String(s.rows[y][0] ?? "")) ? "total" : undefined);

// ── One sheet ──────────────────────────────────────────────────────────────
interface Built { xml: string; chart?: string }

const BAND = 5; // rows the band takes: eyebrow, title, subtitle, stripe, air

function plainSheet(st: Styles, s: Sheet): Built {
  const bold = st.id({ b: true });
  const row = (r: Cell[], y: number, head: boolean) => `<row r="${y + 1}">${r.map((v, x) => cellXml(x, y, v, head ? bold : isNum(v) && !Number.isInteger(v) ? st.id({ fmt: 4 }) : 0)).join("")}</row>`;
  const widths = s.head.map((_, i) => Math.min(60, Math.max(10, ...[s.head, ...s.rows].map((r) => String(r[i] ?? "").length + 2))));
  return { xml: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("")}</cols><sheetData>${row(s.head, 0, true)}${s.rows.map((r, i) => row(r, i + 1, false)).join("")}</sheetData></worksheet>` };
}

function cellXml(x: number, y: number, v: Cell | undefined, style: number) {
  const s = style ? ` s="${style}"` : "";
  if (isNum(v)) return `<c r="${ref(x, y)}"${s}><v>${v}</v></c>`;
  if (v === undefined || v === "") return style ? `<c r="${ref(x, y)}"${s}/>` : "";
  return `<c r="${ref(x, y)}" t="inlineStr"${s}><is><t xml:space="preserve">${xml(String(v))}</t></is></c>`;
}

function band(st: Styles, s: Sheet, o: BookOptions, span: number) {
  const dark = (l: Look = {}) => st.id({ fill: C.noche, ...l });
  const rows: string[] = [];
  const line = (y: number, ht: number, first: string, l: Look) =>
    `<row r="${y + 1}" ht="${ht}" customHeight="1">${cellXml(0, y, first, dark({ ...l, indent: 1 }))}${Array.from({ length: span - 1 }, (_, i) => cellXml(i + 1, y, "", dark())).join("")}</row>`;
  rows.push(line(0, 22, "NUMEN GAMES  ·  OPEN BOOKS", { b: true, sz: 8, color: C.ambar, v: "bottom" }));
  rows.push(line(1, 34, s.title ?? s.name, { b: true, sz: 20, color: C.arena }));
  rows.push(line(2, 22, s.subtitle ?? o.subtitle ?? "", { sz: 10, color: C.muted, v: "top" }));
  const stripe = st.id({ fill: C.turquesa });
  rows.push(`<row r="4" ht="4" customHeight="1">${Array.from({ length: span }, (_, i) => cellXml(i, 3, "", stripe)).join("")}</row>`);
  rows.push(`<row r="5" ht="12" customHeight="1"/>`);
  return rows.join("");
}

function sheetHead(s: Sheet, extra = "") {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheetPr><tabColor rgb="FF${s.tab ?? C.turquesa}"/><pageSetUpPr fitToPage="1"/></sheetPr>${extra}`;
}
const sheetTail = (merges: string[], filter: string, drawing: boolean) =>
  `${filter}${merges.length ? `<mergeCells count="${merges.length}">${merges.map((m) => `<mergeCell ref="${m}"/>`).join("")}</mergeCells>` : ""}<pageMargins left="0.5" right="0.5" top="0.6" bottom="0.6" header="0.3" footer="0.3"/><pageSetup paperSize="9" orientation="landscape" fitToWidth="1" fitToHeight="0"/>${drawing ? '<drawing r:id="rId1"/>' : ""}</worksheet>`;

function styledSheet(st: Styles, s: Sheet, o: BookOptions, sheetName: string): Built {
  const n = Math.max(s.head.length, 1);
  const cols = s.head.map((_, i) => s.cols?.[i] ?? guess(s, i));
  const span = n;
  const H = BAND; // heading row index (0-based)
  const out: string[] = [band(st, s, o, span)];
  const merges: string[] = [];

  // The heading.
  const left = (i: number) => cols[i] === "text" || cols[i] === "mono" || cols[i] === "kind";
  const hl = (i: number): Look => ({ b: true, sz: 9, color: C.ink, fill: C.arena, bottom: ["medium", C.turquesa], h: left(i) ? "left" : "right", v: "center", wrap: true, indent: left(i) || i === 0 ? 1 : 0 });
  out.push(`<row r="${H + 1}" ht="30" customHeight="1">${s.head.map((h, i) => cellXml(i, H, h, st.id(hl(i)))).join("")}</row>`);

  // The body.
  s.rows.forEach((r, k) => {
    const y = H + 1 + k, role = roleOf(s, k);
    if (role === "note" || role === "section") {
      const l: Look = role === "note" ? { i: true, sz: 9, color: C.dim, wrap: true, v: "top", indent: 1 } : { b: true, sz: 9, color: C.turquesa, bottom: ["thin", C.turquesa], indent: 1 };
      const text = r.filter((v) => v !== "" && v !== undefined).join("  ·  ");
      merges.push(`${ref(0, y)}:${ref(n - 1, y)}`);
      const ht = role === "note" ? Math.max(18, 14 * Math.ceil(text.length / Math.max(40, (s.widths ?? []).reduce((a, b) => a + b, 0) || n * 16))) : 22;
      out.push(`<row r="${y + 1}" ht="${ht}" customHeight="1">${cellXml(0, y, text, st.id(l))}${Array.from({ length: n - 1 }, (_, i) => cellXml(i + 1, y, "", st.id(l))).join("")}</row>`);
      return;
    }
    const zebra = !role && k % 2 === 1 ? C.arenaSoft : undefined;
    const cells = Array.from({ length: n }, (_, x) => {
      const v = r[x], f = cols[x];
      const l: Look = { sz: 10, fill: zebra, bottom: ["hair", C.arenaRule], v: "center" };
      if (f === "text") { l.h = "left"; l.wrap = String(v ?? "").length > 48; }
      if (f === "mono") { l.font = "Consolas"; l.sz = 9; l.color = C.dim; }
      if (f === "kind" && typeof v === "string") { l.b = true; l.sz = 9; l.color = KIND[v.toLowerCase()] ?? C.dim; }
      if (isNum(v)) { l.fmt = (f === "int" && !Number.isInteger(v) ? FMT_OF.dec1 : FMT_OF[f]) ?? (Number.isInteger(v) ? 0 : 4); l.h = "right"; if (v < 0 && f !== "pct") l.color = C.grana; }
      else if (f !== "text" && f !== "mono" && f !== "kind") l.h = "right";
      if (x === 0 || f === "text" || f === "mono" || f === "kind") l.indent = 1;
      if (role === "total") { l.b = true; l.fill = C.arena; l.top = ["thin", C.ink]; l.bottom = ["thin", C.ink]; l.sz = 11; l.font = undefined; if (!isNum(v)) l.color = C.ink; }
      if (role === "strong") { l.b = true; }
      if (role === "muted") { l.color = C.dim; l.i = true; l.sz = 9; if (!isNum(v)) { l.h = "left"; l.indent = 1; l.font = undefined; } }
      return cellXml(x, y, v, st.id(l));
    }).join("");
    out.push(`<row r="${y + 1}" ht="${role === "total" ? 22 : 18}" customHeight="1">${cells}</row>`);
  });

  // The foot.
  const fy = H + 1 + s.rows.length + 1;
  if (o.footer) out.push(`<row r="${fy + 1}">${cellXml(0, fy, o.footer, st.id({ i: true, sz: 8, color: C.dim, indent: 1 }))}</row>`);

  // Widths: the heading wraps, so the body decides.
  const widths = s.widths ?? s.head.map((h, i) => {
    const body = Math.max(0, ...s.rows.filter((_, k) => !["note", "section"].includes(roleOf(s, k) ?? "")).map((r) => {
      const v = r[i]; return isNum(v) ? (cols[i] === "eur" ? Math.abs(v).toFixed(2).length + 5 : String(Math.round(v)).length + 5) : String(v ?? "").length;
    }));
    return Math.min(i === 0 ? 46 : 40, Math.max(i === 0 ? 18 : 11, body + 3, Math.min(22, h.length * 0.6 + 4)));
  });
  const allW = [...widths, ...Array(Math.max(0, span - widths.length)).fill(14)];
  const long = s.rows.length > 12 && !s.chart;
  const filter = long ? `<autoFilter ref="${ref(0, H)}:${ref(n - 1, H + s.rows.length)}"/>` : "";
  const view = `<sheetViews><sheetView showGridLines="0" zoomScale="110" zoomScaleNormal="110" workbookViewId="0"><pane ySplit="${H + 1}" topLeftCell="A${H + 2}" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A${H + 2}" sqref="A${H + 2}"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="16" x14ac:dyDescent="0.25" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"/>`;
  const colsXml = `<cols>${allW.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w.toFixed(1)}" customWidth="1"/>`).join("")}<col min="${allW.length + 1}" max="${allW.length + 1}" width="3" customWidth="1"/></cols>`;
  const xmlOut = sheetHead(s, view.replace('<sheetFormatPr defaultRowHeight="16" x14ac:dyDescent="0.25" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"/>', '<sheetFormatPr defaultRowHeight="16"/>')) + colsXml + `<sheetData>${out.join("")}</sheetData>` + sheetTail(merges, filter, !!s.chart);
  return { xml: xmlOut, chart: s.chart ? chartXml(s, sheetName, H, allW.length) : undefined };
}

// ── The front page ─────────────────────────────────────────────────────────
function coverSheet(st: Styles, s: Sheet, o: BookOptions): Built {
  const k = s.cover!.kpis, span = Math.max(4, k.length);
  const out: string[] = [band(st, s, o, span)];
  const merges: string[] = [];
  let y = BAND;
  const kfill = C.arenaSoft;
  // The big figures: label, value, a note in the kind's colour.
  if (k.length) {
    out.push(`<row r="${y + 1}" ht="20" customHeight="1">${k.map((x, i) => cellXml(i, y, x.label.toUpperCase(), st.id({ b: true, sz: 8, color: C.dim, fill: kfill, top: ["medium", C.turquesa], v: "bottom", indent: 1 }))).join("")}</row>`); y++;
    out.push(`<row r="${y + 1}" ht="38" customHeight="1">${k.map((x, i) => cellXml(i, y, x.value, st.id({ b: true, sz: 22, color: isNum(x.value) && x.value < 0 ? C.grana : C.ink, fill: kfill, fmt: isNum(x.value) ? FMT_OF[x.fmt ?? "eur0"] : undefined, h: "left", indent: 1 }))).join("")}</row>`); y++;
    out.push(`<row r="${y + 1}" ht="30" customHeight="1">${k.map((x, i) => cellXml(i, y, x.note ?? "", st.id({ sz: 8, i: !x.kind, b: !!x.kind, color: x.kind ? KIND[x.kind] ?? C.dim : C.dim, fill: kfill, bottom: ["thin", C.arenaRule], wrap: true, v: "top", indent: 1 }))).join("")}</row>`); y++;
    out.push(`<row r="${y + 1}" ht="14" customHeight="1"/>`); y++;
  }
  // Key and value.
  for (const r of s.rows) {
    const key = String(r[0] ?? ""), val = r.slice(1).filter((v) => v !== "").join("  ·  ");
    const lines = Math.max(1, Math.ceil(val.length / (span * 22 - 26)));
    out.push(`<row r="${y + 1}" ht="${Math.max(20, lines * 14 + 6)}" customHeight="1">${cellXml(0, y, key.toUpperCase(), st.id({ b: true, sz: 8, color: C.turquesa, v: "top", bottom: ["hair", C.arenaRule], indent: 1 }))}${cellXml(1, y, val, st.id({ sz: 10, wrap: true, v: "top", bottom: ["hair", C.arenaRule] }))}${Array.from({ length: span - 2 }, (_, i) => cellXml(i + 2, y, "", st.id({ bottom: ["hair", C.arenaRule] }))).join("")}</row>`);
    merges.push(`${ref(1, y)}:${ref(span - 1, y)}`); y++;
  }
  // The four kinds, in their colours.
  if (s.cover!.legend !== false) {
    y++;
    out.push(`<row r="${y + 1}" ht="20" customHeight="1">${cellXml(0, y, "THE FOUR KINDS OF FIGURE", st.id({ b: true, sz: 8, color: C.dim, indent: 1 }))}</row>`); y++;
    const kinds: [string, string, string][] = [["● real", C.verde, "booked or public: an invoice, a register"], ["● declared", C.azul, "the company's word; the document is to load"], ["● estimate", C.ambarText, "computed or simulated until the document arrives"], ["● plan", C.lila, "what the company intends"]];
    out.push(`<row r="${y + 1}" ht="18" customHeight="1">${kinds.slice(0, span).map(([t, c], i) => cellXml(i, y, t, st.id({ b: true, sz: 10, color: c, indent: 1 }))).join("")}</row>`); y++;
    out.push(`<row r="${y + 1}" ht="30" customHeight="1">${kinds.slice(0, span).map(([, , d], i) => cellXml(i, y, d, st.id({ sz: 8, color: C.dim, wrap: true, v: "top", indent: 1 }))).join("")}</row>`); y++;
  }
  if (o.footer) { y++; out.push(`<row r="${y + 1}">${cellXml(0, y, o.footer, st.id({ i: true, sz: 8, color: C.dim, indent: 1 }))}</row>`); }
  const view = `<sheetViews><sheetView showGridLines="0" zoomScale="110" zoomScaleNormal="110" workbookViewId="0"/></sheetViews><sheetFormatPr defaultRowHeight="16"/>`;
  const colsXml = `<cols>${Array.from({ length: span }, (_, i) => `<col min="${i + 1}" max="${i + 1}" width="${s.widths?.[i] ?? 30}" customWidth="1"/>`).join("")}</cols>`;
  return { xml: sheetHead({ ...s, tab: s.tab ?? C.ambar }, view) + colsXml + `<sheetData>${out.join("")}</sheetData>` + sheetTail(merges, "", false) };
}

// ── Charts ─────────────────────────────────────────────────────────────────
const rich = (sz: number, color: string, b = false) => `<c:txPr><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="${sz}"${b ? ' b="1"' : ""}><a:solidFill><a:srgbClr val="${color}"/></a:solidFill><a:latin typeface="Calibri"/></a:defRPr></a:pPr><a:endParaRPr lang="en-GB"/></a:p></c:txPr>`;

function chartXml(s: Sheet, sheetName: string, H: number, ncols: number): string {
  const ch = s.chart!, [r0, r1] = ch.rows ?? [0, s.rows.length], q = quoted(sheetName);
  const y0 = H + 1 + r0, y1 = H + r1; // 0-based sheet rows
  const range = (x: number) => `${q}!$${col(x)}$${y0 + 1}:$${col(x)}$${y1 + 1}`;
  const colors = ch.colors ?? SERIES;
  const ser = ch.series.map((x, i) => {
    const c = colors[i % colors.length];
    const sp = ch.type === "line" ? `<c:spPr><a:ln w="31750" cap="rnd"><a:solidFill><a:srgbClr val="${c}"/></a:solidFill><a:round/></a:ln></c:spPr><c:marker><c:symbol val="none"/></c:marker>` : `<c:spPr><a:solidFill><a:srgbClr val="${c}"/></a:solidFill><a:ln><a:noFill/></a:ln></c:spPr><c:invertIfNegative val="0"/>`;
    const neg = ch.type !== "line" && ch.series.length === 1 ? "" : "";
    return `<c:ser><c:idx val="${i}"/><c:order val="${i}"/><c:tx><c:strRef><c:f>${q}!$${col(x)}$${H + 1}</c:f></c:strRef></c:tx>${sp}${neg}<c:cat><c:strRef><c:f>${range(ch.cat)}</c:f></c:strRef></c:cat><c:val><c:numRef><c:f>${range(x)}</c:f></c:numRef></c:val>${ch.type === "line" ? '<c:smooth val="0"/>' : ""}</c:ser>`;
  }).join("");
  const horiz = ch.type === "bar";
  const kind = ch.type === "line"
    ? `<c:lineChart><c:grouping val="standard"/><c:varyColors val="0"/>${ser}<c:marker val="1"/><c:axId val="10"/><c:axId val="20"/></c:lineChart>`
    : `<c:barChart><c:barDir val="${horiz ? "bar" : "col"}"/><c:grouping val="clustered"/><c:varyColors val="0"/>${ser}<c:gapWidth val="${horiz ? 40 : 70}"/><c:overlap val="-8"/><c:axId val="10"/><c:axId val="20"/></c:barChart>`;
  const n = r1 - r0, skip = ch.type === "line" && n > 14 ? `<c:tickLblSkip val="${Math.ceil(n / 7)}"/><c:tickMarkSkip val="${Math.ceil(n / 7)}"/>` : "";
  const fmtV = (s.cols?.[ch.series[0]] ?? guess(s, ch.series[0])) === "pct" ? "0%" : '#,##0 "€"';
  const cat = `<c:catAx><c:axId val="10"/><c:scaling><c:orientation val="${horiz ? "maxMin" : "minMax"}"/></c:scaling><c:delete val="0"/><c:axPos val="${horiz ? "l" : "b"}"/><c:numFmt formatCode="General" sourceLinked="1"/><c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="low"/><c:spPr><a:ln w="9525"><a:solidFill><a:srgbClr val="${C.muted}"/></a:solidFill></a:ln></c:spPr>${rich(900, C.dim)}<c:crossAx val="20"/><c:crosses val="autoZero"/><c:auto val="1"/><c:lblAlgn val="ctr"/><c:lblOffset val="100"/>${skip}<c:noMultiLvlLbl val="0"/></c:catAx>`;
  const val = `<c:valAx><c:axId val="20"/><c:scaling><c:orientation val="minMax"/></c:scaling><c:delete val="0"/><c:axPos val="${horiz ? "b" : "l"}"/><c:majorGridlines><c:spPr><a:ln w="6350"><a:solidFill><a:srgbClr val="${C.arenaRule}"/></a:solidFill></a:ln></c:spPr></c:majorGridlines><c:numFmt formatCode="${xml(fmtV)}" sourceLinked="0"/><c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="nextTo"/><c:spPr><a:ln><a:noFill/></a:ln></c:spPr>${rich(900, C.dim)}<c:crossAx val="10"/><c:crosses val="${horiz ? "max" : "autoZero"}"/><c:crossBetween val="between"/></c:valAx>`;
  const legend = ch.series.length > 1 ? `<c:legend><c:legendPos val="b"/><c:overlay val="0"/>${rich(900, C.ink)}</c:legend>` : "";
  void ncols;
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><c:chartSpace xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><c:roundedCorners val="0"/><c:chart><c:title><c:tx><c:rich><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="1200" b="1"/></a:pPr><a:r><a:rPr lang="en-GB" sz="1200" b="1"><a:solidFill><a:srgbClr val="${C.ink}"/></a:solidFill><a:latin typeface="Calibri"/></a:rPr><a:t>${xml(ch.title)}</a:t></a:r></a:p></c:rich></c:tx><c:overlay val="0"/></c:title><c:autoTitleDeleted val="0"/><c:plotArea><c:layout/>${kind}${cat}${val}<c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr></c:plotArea>${legend}<c:plotVisOnly val="1"/><c:dispBlanksAs val="gap"/></c:chart><c:spPr><a:solidFill><a:srgbClr val="${C.white}"/></a:solidFill><a:ln w="9525"><a:solidFill><a:srgbClr val="${C.arenaRule}"/></a:solidFill></a:ln></c:spPr><c:txPr><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr><a:latin typeface="Calibri"/></a:defRPr></a:pPr><a:endParaRPr lang="en-GB"/></a:p></c:txPr></c:chartSpace>`;
}

function drawingXml(s: Sheet, H: number, i: number): string {
  const ch = s.chart!, ncols = Math.max(s.head.length, 4);
  const at = { col: ch.at?.col ?? ncols + 1, row: ch.at?.row ?? H, cols: ch.at?.cols ?? 8, rowsTall: ch.at?.rowsTall ?? 18 };
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><xdr:twoCellAnchor editAs="oneCell"><xdr:from><xdr:col>${at.col}</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>${at.row}</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:from><xdr:to><xdr:col>${at.col + at.cols}</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>${at.row + at.rowsTall}</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:to><xdr:graphicFrame macro=""><xdr:nvGraphicFramePr><xdr:cNvPr id="${i + 2}" name="Chart ${i + 1}"/><xdr:cNvGraphicFramePr/></xdr:nvGraphicFramePr><xdr:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/></xdr:xfrm><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart"><c:chart xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="rId1"/></a:graphicData></a:graphic></xdr:graphicFrame><xdr:clientData/></xdr:twoCellAnchor></xdr:wsDr>`;
}

/** Filters on long tables, and the heading repeated on every printed page. */
function definedNames(sheets: Sheet[], names: string[]) {
  const out = sheets.flatMap((s, i) => {
    if (s.plain || s.cover) return [];
    const q = quoted(names[i]), d: string[] = [];
    if (s.rows.length > 12 && !s.chart) d.push(`<definedName name="_xlnm._FilterDatabase" localSheetId="${i}" hidden="1">${q}!$A$${BAND + 1}:$${col(s.head.length - 1)}$${BAND + 1 + s.rows.length}</definedName>`);
    d.push(`<definedName name="_xlnm.Print_Titles" localSheetId="${i}">${q}!$${BAND + 1}:$${BAND + 1}</definedName>`);
    return d;
  });
  return out.length ? `<definedNames>${out.join("")}</definedNames>` : "";
}

// ── The workbook ───────────────────────────────────────────────────────────
const REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

/** Sheets to an .xlsx. Styled in the house colours unless a sheet is plain. */
export function toXlsx(sheets: Sheet[], o: BookOptions = {}): Uint8Array {
  const used = new Set<string>();
  const names = sheets.map((s) => {
    let n = s.name.replace(/[\\/?*[\]:]/g, " ").slice(0, 31), k = 2;
    while (used.has(n.toLowerCase())) n = `${n.slice(0, 28)} ${k++}`;
    used.add(n.toLowerCase()); return n;
  });
  const st = new Styles();
  const built = sheets.map((s, i) => (s.plain ? plainSheet(st, s) : s.cover ? coverSheet(st, s, o) : styledSheet(st, s, o, names[i])));
  const charts = built.map((b, i) => (b.chart ? i : -1)).filter((i) => i >= 0);
  const files: [string, string][] = [
    ["[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}${charts.map((i) => `<Override PartName="/xl/drawings/drawing${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/><Override PartName="/xl/charts/chart${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/>`).join("")}</Types>`],
    ["_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${REL}/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`],
    ["docProps/core.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${xml(sheets[0]?.title ?? "Open books")}</dc:title><dc:creator>Numen Games S.L.</dc:creator><cp:keywords>numinia.org/system/open-books</cp:keywords></cp:coreProperties>`],
    ["xl/workbook.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="${REL}"><bookViews><workbookView activeTab="0"/></bookViews><sheets>${names.map((n, i) => `<sheet name="${xml(n)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets>${definedNames(sheets, names)}</workbook>`],
    ["xl/_rels/workbook.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="${REL}/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}<Relationship Id="rId${sheets.length + 1}" Type="${REL}/styles" Target="styles.xml"/></Relationships>`],
    ...built.map((b, i) => [`xl/worksheets/sheet${i + 1}.xml`, b.xml] as [string, string]),
    ...charts.flatMap((i) => [
      [`xl/worksheets/_rels/sheet${i + 1}.xml.rels`, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${REL}/drawing" Target="../drawings/drawing${i + 1}.xml"/></Relationships>`],
      [`xl/drawings/drawing${i + 1}.xml`, drawingXml(sheets[i], BAND, i)],
      [`xl/drawings/_rels/drawing${i + 1}.xml.rels`, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${REL}/chart" Target="../charts/chart${i + 1}.xml"/></Relationships>`],
      [`xl/charts/chart${i + 1}.xml`, built[i].chart!],
    ] as [string, string][]),
  ];
  files.splice(5, 0, ["xl/styles.xml", st.xml()]);
  return zip(files);
}

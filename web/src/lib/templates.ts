// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The templates behind /templates. Every fact on that page is read here, at
// build time, from the templates themselves (machine/templates/*-TEMPLATE.md)
// and from the header-field registry the guards enforce
// (machine/scripts/lib/rings.mjs). Nothing is typed twice: add a field to a
// template and it appears on the page, in the comparison table and in the .md.
//
// WHY A HEADER TABLE. The templates were written one at a time, by different
// hands, over a month. A field that means the same thing under two names, or
// a field registered for a series that its template never teaches, is invisible
// file by file and obvious side by side. The page puts them side by side.
//
// The frontmatter reader and the registry are the ones the guards use,
// imported by URL (as pipeline.ts imports the sales kit) so Vite does not
// bundle them and their own path resolution stays correct.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(process.cwd(), "..");
const DIR = "machine/templates";
const lib = (f: string) => import(/* @vite-ignore */ pathToFileURL(path.join(ROOT, "machine", "scripts", "lib", f)).href);
const FM = await lib("frontmatter.mjs");
const RINGS = await lib("rings.mjs");

/** Where each field is registered: for every document, or for some series. */
export type Reach = "every" | "series";

export interface Field {
  name: string;
  /** Written in the template, to be filled — or offered commented, to add when it applies. */
  kind: "filled" | "optional";
  /** The template's own comment on the field: what goes in it, which values. */
  note: string;
}

export interface Template {
  prefix: string;
  file: string;
  /** The series folder a copy goes to. */
  series: string;
  /** The `type` a copy declares. */
  type: string;
  /** The title the template teaches, i.e. how to name a document of this series. */
  titleHint: string;
  /** Where a copy goes, as the template's first comment says. */
  destination: string;
  fields: Field[];
  /** Registered for this series (ring 3) but never offered by its template. */
  unoffered: string[];
  /** The common-header fields in the order this template writes them, when that
   *  order is not the house's (COMMON_ORDER); null when it is. */
  outOfOrder: string[] | null;
  /** The `##` headings of the body: the sections a document of this series has. */
  sections: string[];
  licence: string;
  companions: { file: string; what: string }[];
}

/** What a series is for, in a line — the template library's own table words. */
const MAKES: Record<string, string> = {
  MIS: "a mission", STD: "a standard", PRO: "a procedure", ADR: "a decision",
  DBT: "a debt entry", RPT: "a report", OPS: "an operations record", LEG: "a legal text",
  CAN: "a canon text", BLU: "a blueprint", SYS: "a system reference",
  OPP: "a sales opportunity", PRP: "a proposal to a client", GRA: "a call for public money",
};

/** Records that sit beside a template and explain it; not templates themselves. */
const COMPANIONS: Record<string, { file: string; what: string }[]> = {
  MIS: [{ file: "MIS-TEMPLATE-EXAMPLE.md", what: "a real mission written with this template, closed, to read beside the blank one" }],
  RPT: [
    { file: "RPT-TEMPLATE-WEEK.md", what: "the weekly report: the nine headings on one page, for the board" },
    { file: "RPT-TEMPLATE-QUARTER.md", what: "the quarterly report: the nine headings, one row per week" },
    { file: "RPT-TEMPLATE-YEAR.md", what: "the annual report: the nine headings and the organisation's story so far" },
  ],
};

/** Templates that live elsewhere, because the tool that reads them needs them there. */
export const ELSEWHERE: { path: string; makes: string; why: string }[] = [
  { path: "agents/_template/", makes: "a digital agent", why: "a folder of files, not one file: the folder's shape is what it scaffolds" },
  { path: "lore/adventures/tabletop/TEMPLATE.md", makes: "a tabletop adventure", why: "game text, in Spanish, with no header: it is played, not filed" },
  { path: ".github/PULL_REQUEST_TEMPLATE.md", makes: "a pull request", why: "GitHub reads it from this path; moved, it stops working" },
  { path: ".github/ISSUE_TEMPLATE/task.md", makes: "an issue", why: "GitHub reads it from this path; moved, it stops working" },
  { path: "web/public/design/templates/2026_08_03-Plantilla_Factura-v1.0.0.html", makes: "an invoice", why: "a design piece, served as a file by the site" },
];

const commentOf = (lines: string[], i: number): string => {
  // The comment lines directly above a field, joined; the house writes the
  // vocabulary there ("# status: todo | in-progress ..."), never inline.
  const out: string[] = [];
  for (let j = i - 1; j >= 0 && /^#/.test(lines[j]); j--) {
    const c = lines[j].replace(/^#\s?/, "");
    if (/^[A-Z][A-Z ]+(—|$)/.test(c)) break; // a block heading ("OPTIONAL — ...")
    if (/^Copy this file/.test(c)) return ""; // the template's opening instructions, not about this field
    out.unshift(c);
  }
  return out.join(" ").replace(/^\w+:\s*/, "").trim();
};

function readTemplate(file: string): Template {
  const text = fs.readFileSync(path.join(ROOT, DIR, file), "utf8");
  const fm = FM.parseFM(text);
  const raw: string[] = FM.rawFM(text).split("\n");
  const prefix = file.split("-")[0];
  const fields: Field[] = [];
  raw.forEach((line, i) => {
    const on = /^([a-z_]+):/.exec(line);
    if (on) { fields.push({ name: on[1], kind: "filled", note: commentOf(raw, i) }); return; }
    const off = /^#\s+([a-z_]+):\s+(.*?)(\s{2,}#\s*(.*))?$/.exec(line);
    if (off && !(off[1] in fm) && !fields.some((f) => f.name === off[1]))
      fields.push({ name: off[1], kind: "optional", note: (off[4] ?? "").trim() });
  });
  const dest = /^#\s*Copy this file (?:beside its opportunity record, as )?(?:to )?(\S+?)[;.,]?(\s|$)/m.exec(FM.rawFM(text));
  const series = Object.entries(FM.loadRules().series as Record<string, { prefix: string[] }>)
    .find(([, s]) => s.prefix?.includes(prefix))?.[0];
  if (!series) throw new Error(`${DIR}/${file}: prefix ${prefix} names no registered series (rules.json)`);
  const offered = new Set(fields.map((f) => f.name));
  const unoffered = ((RINGS.RING3[series] ?? []) as string[]).filter((k) => !offered.has(k));
  const sections = FM.stripFM(text).split("\n")
    .filter((l: string) => /^##\s/.test(l))
    .map((l: string) => l.replace(/^##\s+/, "").replace(/^\d+\.\s+/, ""));
  const common = Object.keys(fm).filter((k) => COMMON_ORDER.includes(k));
  const sorted = [...common].sort((a, b) => COMMON_ORDER.indexOf(a) - COMMON_ORDER.indexOf(b));
  return {
    prefix, file, series, type: String(fm.type ?? ""),
    outOfOrder: common.join() === sorted.join() ? null : common,
    titleHint: String(fm.title ?? ""),
    destination: dest ? dest[1] : `${series}/${prefix}-…`,
    fields, unoffered: [...new Set(unoffered)], sections,
    licence: String(fm.license ?? ""),
    companions: COMPANIONS[prefix] ?? [],
  };
}

/** Every template, alphabetical by prefix. A template with no header fails the build. */
export function templates(): Template[] {
  const files = fs.readdirSync(path.join(ROOT, DIR)).filter((f) => /^[A-Z]{3}-TEMPLATE\.md$/.test(f)).sort();
  if (files.length === 0) throw new Error(`${DIR}: no templates found — the page would be empty`);
  for (const e of ELSEWHERE)
    if (!fs.existsSync(path.join(ROOT, e.path))) throw new Error(`/templates lists ${e.path}, which is not in the tree`);
  for (const [p, cs] of Object.entries(COMPANIONS))
    for (const c of cs)
      if (!fs.existsSync(path.join(ROOT, DIR, c.file))) throw new Error(`/templates lists ${DIR}/${c.file} as a companion of ${p}, and it is not in the tree`);
  return files.map(readTemplate);
}

export const makes = (prefix: string) => MAKES[prefix] ?? prefix;

/** Where a field is registered: every document, or only some series (named). */
export function reach(field: string): { reach: Reach; series: string[] } {
  if (RINGS.RING1.includes(field) || RINGS.RING2.includes(field) || RINGS.RING3_ALL.includes(field))
    return { reach: "every", series: [] };
  const series = Object.entries(RINGS.RING3 as Record<string, string[]>).filter(([, v]) => v.includes(field)).map(([k]) => k);
  return { reach: "series", series };
}

/** The mandatory ring: what every document carries whatever its series. */
export const MANDATORY: string[] = RINGS.RING1;

/**
 * The common header, in the order a template writes it (STD-004's rings, read
 * top to bottom). The table lists these first, in this order, so a template
 * that writes them in another order or leaves one out shows as a gap in the
 * top rows.
 */
export const COMMON_ORDER = ["id", "uid", "title", "type", "subtype", "status", "version", "created", "updated",
  "author", "owner", "guild", "section", "tags", "license"];

/**
 * The comparison: one row per field, one column per template, in the order a
 * reader meets them — the fields every template fills first, then by how many
 * templates use them, then alphabetically.
 */
export function matrix(ms = templates()) {
  const names = new Map<string, number>();
  for (const m of ms) for (const f of m.fields) names.set(f.name, (names.get(f.name) ?? 0) + 1);
  const rows = [...names.keys()].map((name) => ({
    name,
    ...reach(name),
    mandatory: MANDATORY.includes(name),
    cells: ms.map((m) => m.fields.find((f) => f.name === name)?.kind ?? null),
    used: names.get(name)!,
  }));
  const at = (n: string) => { const i = COMMON_ORDER.indexOf(n); return i < 0 ? 99 : i; };
  rows.sort((a, b) => at(a.name) - at(b.name) || b.used - a.used || a.name.localeCompare(b.name));
  return rows;
}

/** The figures the page's summary prints. */
export function figures(ms = templates()) {
  const rows = matrix(ms);
  return {
    templates: ms.length,
    fields: rows.length,
    inAll: rows.filter((r) => r.used === ms.length).length,
    inOne: rows.filter((r) => r.used === 1).length,
    unoffered: ms.reduce((n, m) => n + m.unoffered.length, 0),
  };
}

export const TEMPLATES_SOURCES = [
  "machine/templates/README.md",
  "machine/scripts/lib/rings.mjs",
  "standards/STD-004-the-header.md",
];

export const repoPath = (file: string) => `${DIR}/${file}`;

// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The front door: the archive arranged by the ten business sections of
// STD-030 ("Sections of the front door").
//
// WHY THIS EXISTS
// The Oracle (2026-09-29 → 2026-10-03): numinia.org opens on the ARCHIVE,
// read the way a company reads itself — strategy, products, brand, sales,
// operations, people, finance, legal, technology, knowledge — and the map of
// the Summa moves to /map. Each section shows its one line from the standard,
// how many records it holds, and the records grouped by series. A section
// with nothing in it says so; a record no section claims is shown, not
// hidden. At the full moon a line names the houses that serve the section
// (translator.servedBy) and the disciplines no house carries yet.
//
// WHAT A RECORD IS HERE
// Every page the site publishes for a document: the public corpus (STD-,
// PRO-, PRI-, OPS-, OPP-, LEG-, SYS-, the agents' files, objects, lore…) and
// the typed collections that render their own routes (decisions, designs,
// missions, reports). The typed `system` and `legal` collections are the
// corpus mirror's twins — the corpus serves their pages — so they are not
// read twice. The section comes from each record's `section` header, or —
// for a series whose records carry no header, like the game in lore/ — from
// the series' one section in STD-030 ("Series that take one section"); the
// series from the folder it lives in.
import { getCollection } from "astro:content";
import { getPublicCorpus, titleOf } from "@/lib/corpus";
import { sections as sectionRows, servedBy, seriesSections } from "@/lib/translator.mjs";

/** One published record, as the front door lists it. */
export interface FrontRecord {
  href: string;
  title: string;
  /** the series label, as the site prints it (and the register swaps it) */
  series: string;
  docId?: string;
  status?: string;
  /** the section the record declares, or undefined when none does */
  section?: string;
}

/** The series a section's records are grouped by, in this order. */
export const SERIES_ORDER = [
  "Principles", "Standards", "Procedures", "Decisions", "Designs", "Missions", "Reports",
  "Operations", "Opportunities", "Legal", "System", "Agents", "Debt", "Objects", "Lore", "History",
];

const SERIES_OF_FOLDER: Record<string, string> = {
  principles: "Principles", standards: "Standards", procedures: "Procedures", decisions: "Decisions",
  designs: "Designs", missions: "Missions", reports: "Reports", operations: "Operations",
  opportunities: "Opportunities", legal: "Legal", system: "System", agents: "Agents", debt: "Debt",
  objects: "Objects", lore: "Lore", history: "History",
};

export interface SeriesGroup { label: string; records: FrontRecord[] }

/** One block of the front door: a section of STD-030 and what it holds. */
export interface SectionBlock {
  /** anchor: the section's name as a slug — strategy-and-governance */
  id: string;
  name: string;
  /** the one line from STD-030 */
  line: string;
  apqc: string;
  count: number;
  groups: SeriesGroup[];
  /** the houses that serve it and the disciplines no house carries (full moon) */
  served: { houses: string[]; gaps: string[] };
}

export const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const str = (v: unknown) => (typeof v === "string" ? v : undefined);

/** Every record the site publishes, each with its section when it declares one. */
export async function allRecords(): Promise<FrontRecord[]> {
  const out: FrontRecord[] = [];
  const inherited = seriesSections() as Record<string, string>;
  for (const e of await getPublicCorpus()) {
    const f = e.data as Record<string, unknown>;
    const folder = e.id.split("/")[0];
    out.push({
      href: `/${e.id}`,
      title: titleOf(e),
      series: SERIES_OF_FOLDER[folder] ?? folder,
      docId: str(f.id),
      status: str(f.status),
      section: str(f.section) ?? inherited[folder],
    });
  }
  for (const e of await getCollection("decisions")) {
    const f = e.data as Record<string, unknown>;
    out.push({ href: `/decisions/${String(f.id).toLowerCase()}`, title: str(f.title) ?? String(f.id), series: "Decisions", docId: str(f.id), status: str(f.status), section: str(f.section) });
  }
  for (const e of await getCollection("designs")) {
    const f = e.data as Record<string, unknown>;
    out.push({ href: `/designs/${String(e.id).replace(/^DES-\d+-/i, "").toLowerCase()}`, title: str(f.title) ?? String(f.id), series: "Designs", docId: str(f.id), status: str(f.status), section: str(f.section) });
  }
  for (const e of await getCollection("missions")) {
    const f = e.data as Record<string, unknown>;
    out.push({ href: `/missions/${String(f.id).toLowerCase()}`, title: str(f.title) ?? String(f.id), series: "Missions", docId: str(f.id), status: str(f.status), section: str(f.section) });
  }
  for (const e of await getCollection("reports")) {
    const f = e.data as Record<string, unknown>;
    out.push({ href: `/reports/${e.id}`, title: str(f.title) ?? String(f.id), series: "Reports", docId: str(f.id), status: str(f.status), section: str(f.section) });
  }
  return out;
}

const byId = (a: FrontRecord, b: FrontRecord) =>
  (a.docId ?? a.title).localeCompare(b.docId ?? b.title, "en", { numeric: true });

/** Records grouped by series, in SERIES_ORDER; only the series present. */
export function groupBySeries(records: FrontRecord[]): SeriesGroup[] {
  const groups = new Map<string, FrontRecord[]>();
  for (const r of records) (groups.get(r.series) ?? groups.set(r.series, []).get(r.series)!).push(r);
  const rank = (s: string) => { const i = SERIES_ORDER.indexOf(s); return i < 0 ? SERIES_ORDER.length : i; };
  return [...groups.entries()]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
    .map(([label, rs]) => ({ label, records: rs.sort(byId) }));
}

/**
 * The ten sections of STD-030, in the standard's order, each with its
 * records; and, apart, the records that declare no section (or one the
 * standard does not know) — a gap the page shows.
 */
export async function frontDoor(): Promise<{ sections: SectionBlock[]; unplaced: SeriesGroup[]; unplacedCount: number; total: number }> {
  const records = await allRecords();
  const rows = sectionRows() as { Section: string; Line: string; "APQC category": string }[];
  const known = new Set(rows.map((r) => r.Section));
  const sections = rows.map((r) => {
    const mine = records.filter((x) => x.section === r.Section);
    return {
      id: slugOf(r.Section),
      name: r.Section,
      line: r.Line,
      apqc: r["APQC category"],
      count: mine.length,
      groups: groupBySeries(mine),
      served: servedBy(r.Section),
    };
  });
  const rest = records.filter((x) => !x.section || !known.has(x.section));
  return { sections, unplaced: groupBySeries(rest), unplacedCount: rest.length, total: records.length };
}

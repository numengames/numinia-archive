// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The pipeline behind /system/pipeline (STD-039 OPP-009): every figure comes
// from the records in opportunities/, read at build time THROUGH THE TOOL
// ITSELF — machine/packages/sales-kit/pipeline.mjs — so the page and the CI
// step can never disagree on a number. Sales, tenders, grants,
// collaborations and partners are one kind of record, judged by one tool and
// read against one card (OPS-018).
//
// This module adds only what a page needs and the tool does not: the address
// of each record, made HERE at build time. The link guard reads hrefs out of
// the built HTML, and a template literal inside a script is not an address it
// can follow.
//
// Nobody's name is in a record (OPP-006) and the organisation is a sector
// until it agrees (OPP-011), so everything here is public as it stands.
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(process.cwd(), "..");
const KIT = path.join(ROOT, "machine", "packages", "sales-kit", "pipeline.mjs");
// Imported by URL so Vite does not try to bundle a file outside the project.
const tool = await import(/* @vite-ignore */ pathToFileURL(KIT).href);

export const PIPELINE_SOURCES = [
  "standards/STD-038-the-stages-of-an-opportunity.md",
  "standards/STD-039-an-opportunity-has-a-record.md",
  "operations/OPS-018-the-house-card.md",
  "procedures/PRO-028-qualifying-an-opportunity.md",
  "procedures/PRO-029-making-a-proposal.md",
  "procedures/PRO-030-closing-a-sale.md",
  "procedures/PRO-031-bidding-for-a-tender.md",
  "procedures/PRO-032-applying-for-a-grant.md",
  "procedures/PRO-033-screening-a-tender.md",
  "procedures/PRO-035-watching-for-opportunities.md",
  "system/SYS-010-selling-as-wired-today.md",
  "machine/packages/sales-kit/pipeline.mjs",
];

export const CARD_URL = "/operations/ops-018-the-house-card";
/** Where the site shows the opportunity template (machine/templates/OPP-TEMPLATE.md): its section on /templates. */
export const TEMPLATE_URL = "/templates#opp";

/** The card's rows that decide most calls, in the card's own order (OPS-018 § What decides most calls). */
export const decidingRows = (card: CardRow[]) => card.filter((c) => c.decides !== null).sort((a, b) => (a.decides ?? 0) - (b.decides ?? 0));

export type Kind = "sale" | "tender" | "grant" | "collaboration" | "partner";
export interface PEvent { date: string; event: string; stage: string | null; reason: string | null; text: string }
export interface PRecord {
  id: string; kind: Kind; title: string | null; organisation: string | null; sector: string | null; source: string | null;
  offer: string | null; value: number; currency: string | null; pays: string | null; advance: number | null;
  stage: string; open: boolean; opened: string | null; closed: string | null; reason: string | null;
  next: { date: string; action: string } | null; overdue: boolean; stale: { days: number; limit: number } | null;
  events: PEvent[]; steps: Record<string, boolean>; chance: "high" | "medium" | null;
  criteria: { requirement: string; asks: string; house: string; meets: string }[];
  call: string | null; closes: string | null; opens: string | null; estimated: string | null; procedure: string | null;
  instrument: string | null; file_ref: string | null; gives_back: string | null; follows: string | null;
  /** made at build time: the record's page on this site */
  url: string;
}
export interface CardRow { requirement: string; asks: string; house: string; state: string; unlocks: string; decides: number | null; yes: number; check: number }
export interface Figures {
  today: string;
  kinds: { kind: Kind; is: string; stale: number | null; stages: string[] }[];
  steps: { step: string; means: string }[];
  records: PRecord[];
  due: { id: string; kind: Kind; date: string; action: string; overdue: boolean }[];
  /** per kind and `all`: records at each step, and each step's % of the step before (null for the first, or after an empty step) */
  funnel: Record<string, { counts: number[]; conversion: (number | null)[] }>;
  byKind: Record<string, { records: number; open: number; won: number; lost: number; openValue: number }>;
  reasons: Record<string, number>;
  daysPerStage: Record<string, Record<string, number | null>>;
  card: CardRow[];
  ceiling: number | null;
  overdue: string[];
  stale: { id: string; days: number; limit: number }[];
}

/** Labels for the page and the markdown twin — presentation only. */
export const KIND_LABEL: Record<Kind, string> = { sale: "Sale", tender: "Tender", grant: "Grant", collaboration: "Collaboration", partner: "Partner" };
export const KIND_PLURAL: Record<Kind, string> = { sale: "Sales", tender: "Tenders", grant: "Grants", collaboration: "Collaborations", partner: "Partners" };
export const STEP_LABEL: Record<string, string> = { detected: "Detected", contacted: "Contacted", positive: "Positive answer", won: "Won", again: "Repeats or refers" };

export const recordUrl = (id: string) => `/opportunities/${id.toLowerCase()}`;

/** The tool's figures as of `today`, each record carrying its address. */
export function pipeline(today = new Date().toISOString().slice(0, 10)): Figures {
  const register = tool.loadRegister();
  const card = tool.loadCard();
  const raw = tool.readFolder(path.join(ROOT, "opportunities"));
  const breaches = [...raw.flatMap((r: unknown) => tool.validate(r, register, card)), ...tool.duplicates(raw)] as { plate: string; what: string; file: string }[];
  if (breaches.length) {
    // The CI step already fails on this; here it fails the build too, so a
    // page never publishes a figure the tool would refuse.
    throw new Error(`opportunities/: ${breaches.length} breach(es) — ${breaches.map((b) => `${b.plate} ${path.basename(b.file)}: ${b.what}`).join("; ")}`);
  }
  const figures = tool.figures(raw, register, card, today) as Figures;
  for (const r of figures.records) r.url = recordUrl(r.id);
  return figures;
}

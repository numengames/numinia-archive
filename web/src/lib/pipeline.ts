// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The pipeline behind /system/pipeline (STD-039 OPP-009): every figure comes
// from the records in opportunities/, read at build time THROUGH THE TOOL
// ITSELF — machine/packages/sales-kit/pipeline.mjs — so the page and the CI
// step can never disagree on a number. This module adds only what a page
// needs and a CLI report does not: the records themselves (header + the
// transitions), so the browser can cut them by week, month, quarter and year.
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
  "standards/STD-038-the-stages-of-a-sale.md",
  "standards/STD-039-an-opportunity-has-a-record.md",
  "protocols/PRO-028-qualifying-an-opportunity.md",
  "protocols/PRO-029-making-a-proposal.md",
  "protocols/PRO-030-closing-a-sale.md",
  "system/SYS-010-selling-as-wired-today.md",
  "machine/packages/sales-kit/pipeline.mjs",
];

export interface Transition { date: string; from: string; to: string; by: string; evidence: string }
export interface Record_ {
  id: string; organisation: string; sector: string; offer: string; source: string; state: string;
  value: number; currency: string; next_action: string; next_date: string; opened: string; closed: string;
  reason: string; proposal: string; slug: string; transitions: Transition[];
}
export interface Register { order: string[]; closed: string[]; staleDays: Record<string, number | null>; reasons: string[] }

/** The register, the records and the tool's own figures, as of `today`. */
export function pipeline(today = new Date().toISOString().slice(0, 10)) {
  const register: Register = tool.loadRegister();
  const folder = path.join(ROOT, "opportunities");
  const raw = tool.readFolder(folder) as { file: string; fm: Record<string, string> | null; transitions: Transition[] }[];
  const breaches = raw.flatMap((r) => tool.validate(r, register)) as { plate: string; what: string; file: string }[];
  if (breaches.length) {
    // The CI step already fails on this; here it fails the build too, so a
    // page never publishes a figure the tool would refuse.
    throw new Error(`opportunities/: ${breaches.length} breach(es) — ${breaches.map((b) => `${b.plate} ${path.basename(b.file)}: ${b.what}`).join("; ")}`);
  }
  const records: Record_[] = raw.filter((r) => r.fm).map((r) => {
    const fm = r.fm as Record<string, string>;
    return {
      id: fm.id, organisation: fm.organisation, sector: fm.sector, offer: fm.offer, source: fm.source,
      state: fm.state, value: Number(fm.value) || 0, currency: fm.currency || "EUR",
      next_action: fm.next_action, next_date: fm.next_date, opened: fm.opened, closed: fm.closed,
      reason: fm.reason, proposal: fm.proposal, slug: fm.id.toLowerCase(), transitions: r.transitions,
    };
  });
  const figures = tool.figures(raw, register, today);
  return { today, register, records, figures };
}

// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The telemetry panel's data, read from the dataset at build time.
//
// THE PROBLEM THIS SOLVES
// The instrument measured every text file's tokens (docs.json) and kept a
// ledger of every clean measurement (history.jsonl), and the page under it
// printed the census and said "there is no chart". A product manager could
// not see where the archive grows; a CTO could not see what it costs to read
// or what the repository is made of; nobody could see that half the tokens
// sit in files with no page. Four counters on the site each counted
// something else, so none of them could be trusted.
//
// WHAT THIS MODULE DOES, AND WHAT IT REFUSES TO DO
// It COMPUTES NO MEASUREMENT. Every number comes from machine/telemetry/,
// written by machine/scripts/telemetry.mjs. It only regroups:
//
//   functionOfDir   top-level folder → function, read from STD-027's table
//                   (the classification scheme), never typed here.
//   panelRows()     one row per text file the instrument measured: its
//                   function, series, state, tokens, and — when it has no
//                   page on this site — why not.
//   panelSeries()   one point per measured day: the last clean measurement
//                   of that day, its tokens per function. A measurement whose
//                   tokens are null (a run without the tokenizer) is skipped:
//                   drawing it as zero would draw a collapse that never
//                   happened.
//
// The page ships these to the browser once; the period selector and the
// Product / CTO lens only filter what is already here.
import fs from "node:fs";
import path from "node:path";
import { functions } from "./classification.ts";

// Read from disk, as binding.ts and classification.ts do: the build and the
// tests (plain node, from web/) both run with web/ as cwd.
const TELEMETRY = path.resolve(process.cwd(), "..", "machine", "telemetry");
const readTelemetry = (f: string): string => fs.readFileSync(path.join(TELEMETRY, f), "utf8");
const docsRaw: unknown = JSON.parse(readTelemetry("docs.json"));
const historyRaw: string = readTelemetry("history.jsonl");
const latestRaw: unknown = JSON.parse(readTelemetry("latest.json"));

interface DocRow {
  path: string;
  dir: string;
  status: string | null;
  apparatus: boolean;
  tokens: number | null;
}

/** The repository root's own files (README, changelog…) and .github/. */
export const ROOT_AREA = "Repository";

/** Top-level folder → function, from STD-027. `machine/checks/` → `machine`. */
export const functionOfDir: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  for (const fn of functions())
    for (const a of fn.activities)
      for (const s of a.series) {
        const top = s.folder.replace(/\/.*$/, "");
        out[top] ??= fn.name;
      }
  return out;
})();

/** The six functions in the scheme's order, then the repository's own files. */
export const AREAS: readonly string[] = [...functions().map((f) => f.name), ROOT_AREA];

const fnOf = (dir: string): string => functionOfDir[dir] ?? ROOT_AREA;

export type Why = "page" | "unpublished" | "restricted" | "apparatus" | "repository";

export interface PanelRow {
  path: string;
  series: string;
  fn: string;
  /** active · draft · a mission state · none */
  state: string;
  tokens: number;
  why: Why;
}

/**
 * One row per text file the instrument measured.
 * `published` is the set of repository paths that have a page on this site.
 */
export function panelRows(published: ReadonlySet<string>): PanelRow[] {
  return (docsRaw as unknown as DocRow[]).map((d) => {
    const top = d.path.includes("/") ? d.path.split("/")[0] : "";
    const inRepoRoot = !top || top.startsWith(".");
    const why: Why = published.has(d.path)
      ? "page"
      : d.apparatus
        ? "apparatus"
        : inRepoRoot || top === "machine"
          ? "repository"
          : top === "debt"
            ? "restricted"
            : "unpublished";
    return {
      path: d.path,
      series: top || "(root)",
      fn: inRepoRoot ? ROOT_AREA : fnOf(top),
      state: d.status ?? "none",
      tokens: d.tokens ?? 0,
      why,
    };
  });
}

export interface PanelPoint {
  day: string;
  head: string;
  tokens: number;
  docs: number;
  byFn: Record<string, number>;
}

interface HistoryLine {
  head: string;
  measured_at: string;
  values: Record<string, unknown>;
}

/** One point per measured day, the day's last measurement that has tokens. */
export function panelSeries(): PanelPoint[] {
  const byDay = new Map<string, PanelPoint>();
  for (const line of historyRaw.split("\n")) {
    if (!line.trim()) continue;
    const h = JSON.parse(line) as HistoryLine;
    const total = h.values["tokens.total"];
    const dirs = h.values["tokens.by_dir"] as Record<string, number> | undefined;
    if (typeof total !== "number" || !dirs) continue;
    const byFn: Record<string, number> = {};
    for (const [dir, t] of Object.entries(dirs)) {
      const area = !dir || dir.startsWith(".") ? ROOT_AREA : fnOf(dir);
      byFn[area] = (byFn[area] ?? 0) + t;
    }
    const day = h.measured_at.slice(0, 10);
    byDay.set(day, { day, head: h.head, tokens: total, docs: Number(h.values["corpus.docs_total"] ?? 0), byFn });
  }
  return [...byDay.values()].sort((a, b) => (a.day < b.day ? -1 : 1));
}

export interface KindRow {
  kind: string;
  files: number;
  bytes: number;
}

/** Every tracked file by kind, from corpus.files_by_kind. Empty if not measured yet. */
export function filesByKind(): KindRow[] {
  const f = (latestRaw as unknown as { figures: Record<string, { value: unknown }> }).figures["corpus.files_by_kind"];
  if (!f) return [];
  return Object.entries(f.value as Record<string, { files: number; bytes: number }>).map(([kind, v]) => ({ kind, ...v }));
}

/** When and at which commit the dataset was measured. */
export const measured = {
  at: (latestRaw as unknown as { measured_at: string }).measured_at,
  head: (latestRaw as unknown as { head: string }).head,
  tokenizer: String(
    (latestRaw as unknown as { figures: Record<string, { value: unknown }> }).figures["tokens.tokenizer"]?.value ?? "",
  ),
};

/**
 * The thresholds each panel's action line compares against. Proposals for
 * review, one place to change them; a threshold the Oracle sets replaces the
 * number here and nothing else.
 */
export const THRESHOLDS = {
  /** one function taking more than this share of the period's added tokens */
  growthShare: 0.5,
  /** one function holding more than this share of all tokens */
  weightShare: 0.4,
  /** share of all tokens in files with no page */
  hiddenShare: 0.25,
  /** a document larger than this many tokens */
  docTokens: 8000,
  /** data files heavier than this share of the repository */
  dataShare: 0.3,
} as const;

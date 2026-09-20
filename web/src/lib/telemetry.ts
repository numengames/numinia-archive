// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The telemetry dataset, read at build time (MIS-141).
//
// THIS MODULE COMPUTES NO FIGURE. It reads telemetry/latest.json and
// telemetry/history.jsonl, both produced by scripts/telemetry.mjs, and
// reshapes them for rendering. Every number on /telemetry comes from that
// dataset; if a figure is wrong here, it is wrong there, and the fix is to
// run the instrument — never to edit this file.
//
// WHY A LENS AND NOT A SECOND INSTRUMENT
// telemetry/latest.md already renders the same dataset as a table. Rendering
// it a second way is the duplication MIS-138 exists to end, so this page adds
// exactly one thing latest.md cannot: it knows which build is showing it, and
// can therefore say whether the dataset still describes the tree being served.
//
// WHAT IS EXCLUDED
// Nothing, today. EXCLUDED_FAMILIES stays as the one place a family would be
// kept out of the view, with its reason written beside it.

import latestRaw from "../../../machine/telemetry/latest.json";
import historyRaw from "../../../machine/telemetry/history.jsonl?raw";
import { COMMIT_SHA, HAS_SHA } from "./build-info";

/** One measured figure, exactly as the instrument writes it. */
export interface Figure {
  key: string;
  family: string;
  /** number | string | Record | Array — the instrument's own shape. */
  value: unknown;
  unit: string;
  /** The predicate. What the number is true OF; never decoration. */
  definition: string;
}

export interface Dataset {
  head: string;
  corpus_hash: string;
  measured_at: string;
  figures: Figure[];
}

interface RawFigure {
  value: unknown;
  unit: string;
  definition: string;
}

const raw = latestRaw as unknown as {
  head: string;
  corpus_hash: string;
  measured_at: string;
  figures: Record<string, RawFigure>;
};

/** Families kept out of the public view, with the reason. See header. */
export const EXCLUDED_FAMILIES: Record<string, string> = {};

/**
 * Figures whose predicate is a heuristic over free prose rather than an exact
 * count over a defined set. Both kinds are honest; they are not equally
 * certain, and a reader cannot tell by looking at the number.
 *
 * figures.live is the one that matters: its own definition calls it "a
 * detector, not a verdict", and a manual classification of its 662 hits found
 * ~35% that cannot be corpus figures at all (CSS values like `40 px`, quality
 * scores like `7/10`, KPI targets like `-50% turnover`, port ranges read as
 * N/M). That is a floor, not an estimate.
 */
const HEURISTIC_KEYS = new Set([
  "figures.live",
  "figures.live_by_doc",
  "contradictions.id_form_per_series",
  "contradictions.id_form_mixed",
  "contradictions.ci_markers_std001",
  "contradictions.ci_marked_scripts_not_in_ci",
  "contradictions.ci_scripts_not_marked",
  "provenance.created_ahead_of_commit",
  "provenance.created_behind_commit",
  "provenance.created_ahead_list",
  "provenance.regime_crossings",
  "provenance.regime_crossings_list",
]);

export type Confidence = "exact" | "heuristic";

export const confidenceOf = (key: string): Confidence =>
  HEURISTIC_KEYS.has(key) ? "heuristic" : "exact";

/**
 * How often a figure can move. Mixing an editorial counter with a mechanical
 * one in a row of identical cards asserts a shared cadence that does not
 * exist: tokens.total moves on every commit that touches a document,
 * contradictions.claims_open moves only when a human edits claims.json — and
 * across the whole recorded history it has never moved.
 */
export type Cadence = "mechanical" | "editorial";

const EDITORIAL_PREFIXES = ["contradictions.claims", "missions."];

export const cadenceOf = (key: string): Cadence =>
  EDITORIAL_PREFIXES.some((p) => key.startsWith(p)) ? "editorial" : "mechanical";

/** The dataset, excluded families removed, sorted by family then key. */
export const dataset: Dataset = {
  head: raw.head,
  corpus_hash: raw.corpus_hash,
  measured_at: raw.measured_at,
  figures: Object.entries(raw.figures)
    .map(([key, f]) => ({
      key,
      family: key.split(".")[0],
      value: f.value,
      unit: f.unit,
      definition: f.definition,
    }))
    .filter((f) => !(f.family in EXCLUDED_FAMILIES))
    .sort((a, b) => a.family.localeCompare(b.family) || a.key.localeCompare(b.key)),
};

/** Count of figures the instrument measured but this view does not show. */
export const excludedCount =
  Object.keys(raw.figures).length - dataset.figures.length;

export const totalMeasured = Object.keys(raw.figures).length;

/** Figures grouped by family, in the order they should be read. */
const FAMILY_ORDER = [
  "corpus",
  "missions",
  "contradictions",
  "figures",
  "headers",
  "provenance",
  "series",
  "tokens",
];

export const byFamily: { family: string; figures: Figure[] }[] = FAMILY_ORDER
  .map((family) => ({
    family,
    figures: dataset.figures.filter((f) => f.family === family),
  }))
  .filter((g) => g.figures.length > 0);

// ── History ────────────────────────────────────────────────────────────────

export interface HistoryPoint {
  head: string;
  measured_at: string;
  corpus_hash: string;
  values: Record<string, unknown>;
}

export const history: HistoryPoint[] = (historyRaw as string)
  .split("\n")
  .filter((l) => l.trim())
  .map((l) => JSON.parse(l) as HistoryPoint);

/**
 * The measurements in which a key appears, oldest first.
 *
 * A key absent from a line means NOT MEASURED, never zero. The families grew
 * from 30 keys to 87 across the first five entries, so the early lines are
 * short — treating a missing key as 0 would draw a cliff that never happened.
 */
export const seriesFor = (key: string): { head: string; at: string; value: unknown }[] =>
  history
    .filter((p) => key in p.values)
    .map((p) => ({ head: p.head, at: p.measured_at, value: p.values[key] }));

/** Numeric delta against the previous measurement that carried the key. */
export const deltaFor = (key: string): { delta: number; from: string } | null => {
  const s = seriesFor(key);
  if (s.length < 2) return null;
  const [prev, last] = [s[s.length - 2], s[s.length - 1]];
  if (typeof prev.value !== "number" || typeof last.value !== "number") return null;
  return { delta: last.value - prev.value, from: prev.head };
};

// ── What changed ───────────────────────────────────────────────────────────

export interface Change {
  key: string;
  definition: string;
  unit: string;
  before: unknown;
  after: unknown;
  delta: number | null;
  confidence: Confidence;
}

/**
 * Every figure that differs between the last two measurements.
 *
 * This is the part of the page that answers "what is happening" rather than
 * "what is true": a reader who visits twice wants the diff, not the census.
 * Keys measured only once are excluded — appearing for the first time is not
 * a change in the corpus, it is a change in the instrument.
 */
export function whatChanged(): {
  from: HistoryPoint | null;
  to: HistoryPoint | null;
  changes: Change[];
} {
  if (history.length < 2) return { from: null, to: null, changes: [] };
  const to = history[history.length - 1];
  const from = history[history.length - 2];
  const excluded = Object.keys(EXCLUDED_FAMILIES);

  const changes: Change[] = [];
  for (const key of Object.keys(to.values)) {
    if (excluded.includes(key.split(".")[0])) continue;
    if (!(key in from.values)) continue;
    const a = from.values[key];
    const b = to.values[key];
    if (JSON.stringify(a) === JSON.stringify(b)) continue;
    const f = raw.figures[key];
    changes.push({
      key,
      definition: f?.definition ?? "",
      unit: f?.unit ?? "",
      before: a,
      after: b,
      delta:
        typeof a === "number" && typeof b === "number" ? b - a : null,
      confidence: confidenceOf(key),
    });
  }
  changes.sort((x, y) => x.key.localeCompare(y.key));
  return { from, to, changes };
}

// ── Freshness ──────────────────────────────────────────────────────────────

export type Freshness = "current" | "unverifiable";

/**
 * Whether the dataset describes the commit this build came from.
 *
 * DELIBERATELY NOT `--check`. Re-running the instrument at build time would
 * need git and the cl100k rank file (gitignored, fetched over the network in
 * CI step 7); a static site build has neither guaranteed. It would also make
 * the page a second instrument, which is the thing MIS-138 removed. So this
 * compares labels and says exactly what it compared.
 *
 * `head` names the commit the instrument ran at. It can legitimately trail the
 * build by one commit: the instrument runs, then its output is committed, and
 * that commit is what the site builds from. That is why a mismatch is reported
 * as "unverifiable from the page" and not as "stale" — the page cannot tell
 * the two apart without re-measuring, and saying so is cheaper than being wrong.
 */
export const freshness: {
  state: Freshness;
  buildSha: string;
  datasetHead: string;
} = {
  state: !HAS_SHA
    ? "unverifiable"
    : raw.head.replace(/\+index$/, "").startsWith(COMMIT_SHA) ||
        COMMIT_SHA.startsWith(raw.head.replace(/\+index$/, ""))
      ? "current"
      : "unverifiable",
  buildSha: COMMIT_SHA,
  datasetHead: raw.head,
};

// ── Formatting ─────────────────────────────────────────────────────────────

/** A scalar, or null when the value is a table/list. */
export const scalarOf = (v: unknown): string | number | null =>
  v !== null && typeof v === "object" ? null : (v as string | number);

/** Entries of a composite value, or null when it is a scalar. */
export const entriesOf = (v: unknown): [string, unknown][] | null => {
  if (v === null || typeof v !== "object") return null;
  if (Array.isArray(v)) return v.map((x, i) => [String(i + 1), x]);
  return Object.entries(v as Record<string, unknown>);
};

/** Thousands separators for readability; figures are tabular Mono (§4.4). */
export const fmt = (v: unknown): string => {
  if (v === null || v === undefined) return "—";
  if (typeof v === "number") return v.toLocaleString("en-US");
  return String(v);
};

export const signed = (n: number): string =>
  n > 0 ? `+${n.toLocaleString("en-US")}` : n.toLocaleString("en-US");

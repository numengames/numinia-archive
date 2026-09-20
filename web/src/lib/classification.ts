// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The classification scheme, read from the archive.
//
// WHY THIS FILE EXISTS
// --------------------
// Until 2026-09-20 the /archive pages carried their own copy of the
// classification: a hardcoded Spanish array in archive/index.astro naming
// `agents/guilds/`, `missions/active/done/backlog/` and
// `canon/platform-role-system.md` — none of which had existed for months —
// and a `fondos:` array in SYS-003's frontmatter saying "seven fondos", the
// model ADR-046 abandoned. numinia.org published a classification the archive
// itself no longer held.
//
// A page that restates the archive from memory is the failure mode this
// repository exists to remove. So the scheme is read, at build time, from the
// two documents that own it:
//
//   STD-027  the scheme:  Function · Activity · Series        (ADR-046)
//   STD-001  the series:  what each holds, prefix, threshold  (the register)
//
// Nothing about the classification is written here. What IS written here is
// the one thing the archive does not own: where the viewer serves each series.
// That map is checked against the table at build time — a series in STD-027
// with no entry in SERVED_AT fails the build rather than rendering a row that
// links nowhere.
//
// WHY PARSE MARKDOWN AND NOT A frontmatter BLOCK
// ----------------------------------------------
// The alternative was to keep the data in SYS-003's frontmatter and let the
// prose restate it. That is two copies again, one of which is already what
// drifted. The table in STD-027 is the normative statement of the scheme;
// machine/tools/check-register.mjs already parses STD-015's table the same
// way, so the pattern is the house's, not an invention. A malformed table
// fails the build loudly here, which is the behaviour a curated source needs.

import fs from "node:fs";
import path from "node:path";

const ARCHIVE_ROOT = path.resolve(process.cwd(), "..");
const STD_027 = "standards/STD-027-the-classification-scheme.md";
const STD_001 = "standards/STD-001-the-series.md";

/** One activity of a function, and the series it produces. */
export interface Activity {
  /** verb — "Standardising" */
  readonly name: string;
  /** the folders this activity produces, as written in STD-027 */
  readonly series: readonly Series[];
}

/** One folder of the archive. */
export interface Series {
  /** folder, as written in the archive — "standards/", "machine/guards/" */
  readonly folder: string;
  /** what it holds, from STD-001's table; empty for folders STD-001 does not list */
  readonly holds: string;
  /** identifier prefix from STD-001, e.g. "STD-NNN"; empty when the series has none */
  readonly prefix: string;
  /** change threshold from STD-001: governed · open · closed · live */
  readonly threshold: string;
  /** where this site serves it, or null when it is not published here */
  readonly href: string | null;
  /** why it is not published here — set exactly when href is null */
  readonly unpublished: string | null;
}

/** One function (noun) of the fond. */
export interface Fn {
  /** "Governance" */
  readonly name: string;
  /** route segment — "governance" */
  readonly slug: string;
  readonly activities: readonly Activity[];
}

// ---------------------------------------------------------------------------
// WHERE THE VIEWER SERVES EACH SERIES
// ---------------------------------------------------------------------------
//
// The only fact on this page the archive does not state about itself. A null
// is a published statement — the page prints the reason — so a reader is never
// shown a folder that silently goes nowhere.
//
// Instruments (`machine/**`) are not records (STD-027 CLS-002): they carry no
// identifier, are not appraised and are never cited as evidence. They are
// classified, so they appear in the table; they are not published, so they
// have no address.
const SERVED_AT: Record<string, { href: string | null; unpublished?: string }> = {
  "canon/": { href: "/corpus/canon/" },
  "standards/": { href: "/corpus/standards/" },
  "protocols/": { href: "/corpus/protocols/" },
  "decisions/": { href: "/corpus/decisions/" },
  "blueprints/": { href: "/corpus/blueprints/" },
  "missions/": { href: "/missions" },
  "reports/": { href: "/reports" },
  "debt/": { href: "/corpus/debt/" },
  "agents/": { href: "/corpus/agents" },
  "objects/": { href: "/corpus/objects/avocado" },
  "operations/": { href: "/corpus/operations/ops-001-continuity" },
  "system/": { href: "/corpus/system/" },
  "lore/": {
    href: null,
    unpublished:
      "A second fond, under a reserved licence regime. This viewer is public; the fiction and the game manual are served to citizens by numinia.com, not here.",
  },
  "machine/guards/": {
    href: null,
    unpublished: "An instrument, not a record — it verifies the archive and is read in the repository.",
  },
  "machine/tools/": {
    href: null,
    unpublished: "An instrument, not a record — it verifies the archive and is read in the repository.",
  },
  "machine/scripts/": {
    href: null,
    unpublished: "An instrument, not a record — it verifies the archive and is read in the repository.",
  },
  "machine/telemetry/": {
    href: "/telemetry",
  },
  "machine/templates/": {
    href: null,
    unpublished: "An instrument, not a record — the moulds a document is cut from, read in the repository.",
  },
};

// ---------------------------------------------------------------------------
// READING THE TWO TABLES
// ---------------------------------------------------------------------------

function read(rel: string): string {
  return fs.readFileSync(path.join(ARCHIVE_ROOT, rel), "utf8");
}

/** Cells of a Markdown table row, or null when the line is not one. */
function cells(line: string): string[] | null {
  if (!line.startsWith("|")) return null;
  const parts = line.split("|").slice(1, -1).map((c) => c.trim());
  if (parts.length === 0) return null;
  if (parts.every((c) => /^-+$/.test(c) || c === "")) return null;
  return parts;
}

/** Strip Markdown emphasis and code spans: "**Governance**" -> "Governance". */
function plain(cell: string): string {
  return cell.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

/** STD-001's series register: folder -> what it holds, its prefix, its threshold. */
function seriesRegister(): Map<string, { holds: string; prefix: string; threshold: string }> {
  const out = new Map<string, { holds: string; prefix: string; threshold: string }>();
  for (const line of read(STD_001).split("\n")) {
    const c = cells(line);
    // | Series | Function · Activity | Holds | Prefix | Threshold | Budget | Mould |
    if (!c || c.length < 5) continue;
    const folder = plain(c[0]);
    if (!folder.endsWith("/")) continue;
    out.set(folder, { holds: plain(c[2]), prefix: plain(c[3]), threshold: plain(c[4]) });
  }
  if (out.size === 0) {
    throw new Error(
      `${STD_001}: no series rows parsed. The register's table shape changed — ` +
        `web/src/lib/classification.ts reads it and must be updated with it.`,
    );
  }
  return out;
}

/**
 * STD-027's scheme table.
 *
 * The function cell is empty on continuation rows (the standard writes the
 * function once and lists its activities beneath), so the last non-empty value
 * carries down — the same way a reader reads it.
 */
function parseScheme(): Fn[] {
  const register = seriesRegister();

  interface Builder {
    name: string;
    slug: string;
    activities: Activity[];
  }
  const built: Builder[] = [];
  let current: Builder | null = null;
  let inTable = false;

  for (const line of read(STD_027).split("\n")) {
    const c = cells(line);
    if (!c || c.length < 3) {
      // The scheme table is the first three-column table in the standard's
      // body; the blank line after it ends the read, so the Grounds and
      // References tables below are never mistaken for more of the scheme.
      if (inTable && line.trim() === "") break;
      continue;
    }
    const [fnCell, activityCell, seriesCell] = c.map(plain);
    if (fnCell === "Function" && activityCell === "Activity") {
      inTable = true;
      continue;
    }
    if (!inTable) continue;

    if (fnCell) {
      current = { name: fnCell, slug: fnCell.toLowerCase(), activities: [] };
      built.push(current);
    }
    if (!current) {
      throw new Error(`${STD_027}: an activity row precedes any function — "${line}"`);
    }

    const folders = seriesCell
      .split("·")
      .map((s) => s.trim())
      .filter(Boolean);

    current.activities.push({
      name: activityCell,
      series: folders.map((folder) => {
        const served = SERVED_AT[folder];
        if (!served) {
          throw new Error(
            `${STD_027} names the series "${folder}" and web/src/lib/classification.ts ` +
              `does not say where this site serves it. Add it to SERVED_AT — with an ` +
              `href, or with null and the reason the page will print. A row that links ` +
              `nowhere is the drift this file exists to stop.`,
          );
        }
        const reg = register.get(folder);
        return {
          folder,
          holds: reg?.holds ?? "",
          prefix: reg?.prefix ?? "",
          threshold: reg?.threshold ?? "",
          href: served.href,
          unpublished: served.href === null ? (served.unpublished ?? "Not published on this site.") : null,
        };
      }),
    });
  }

  if (built.length === 0) {
    throw new Error(
      `${STD_027}: the scheme table parsed as empty. Its shape changed — ` +
        `web/src/lib/classification.ts reads it and must be updated with it.`,
    );
  }
  return built;
}

let _cache: Fn[] | null = null;

/** The six functions of the fond, in the order STD-027 writes them. */
export function functions(): Fn[] {
  if (!_cache) _cache = parseScheme();
  return _cache;
}

/** One function by its route segment. */
export function functionBySlug(slug: string): Fn | undefined {
  return functions().find((f) => f.slug === slug);
}

/** Every series of the scheme, in table order. */
export function allSeries(): Series[] {
  return functions().flatMap((f) => f.activities.flatMap((a) => a.series));
}

/** How many folders the scheme classifies, and how many this site serves. */
export function counts(): { functions: number; activities: number; series: number; published: number } {
  const fns = functions();
  const series = allSeries();
  return {
    functions: fns.length,
    activities: fns.reduce((n, f) => n + f.activities.length, 0),
    series: series.length,
    published: series.filter((s) => s.href !== null).length,
  };
}

// ---------------------------------------------------------------------------
// THE RELATION DIAGRAM
// ---------------------------------------------------------------------------
//
// SYS-003 states the relations between functions in prose: "Governance feeds
// agency and production; administration sustains them; production is observed
// by assurance and born from planning." The nodes below are that sentence, and
// the coordinates are presentation — where a sphere sits in a rotating diagram
// is not a fact about the archive.
//
// The previous version of this data lived in SYS-003's `graph:` frontmatter
// and drew the seven fondos ADR-046 retired. It was removed with them.
export const RELATIONS: readonly (readonly [string, string])[] = [
  ["governance", "agency"],
  ["governance", "production"],
  ["administration", "governance"],
  ["administration", "production"],
  ["production", "assurance"],
  ["agency", "production"],
  ["creation", "production"],
];

/** Where each function's node sits in the diagram, and in which colour. */
const NODE_STYLE: Record<string, { color: string; x: number; y: number; z: number }> = {
  governance: { color: "0x00ff88", x: 0, y: 2, z: 0 },
  production: { color: "0xffcc00", x: -2, y: 0.5, z: 1 },
  assurance: { color: "0x4488ff", x: 2, y: 0.5, z: 1 },
  agency: { color: "0x00d9c4", x: 2, y: -1, z: -1 },
  creation: { color: "0xaa44ff", x: -2, y: -1, z: -1 },
  administration: { color: "0xff8800", x: 0, y: -2, z: 0.5 },
};

export interface GraphNode {
  readonly id: string;
  readonly label: string;
  readonly subtitle: string;
  readonly color: number;
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

/** The six functions as diagram nodes, labelled from the scheme. */
export function graphNodes(): GraphNode[] {
  return functions().map((f) => {
    const style = NODE_STYLE[f.slug];
    if (!style) {
      throw new Error(
        `classification: STD-027 names the function "${f.name}" and the diagram has no ` +
          `node for it. Add one to NODE_STYLE in web/src/lib/classification.ts.`,
      );
    }
    return {
      id: f.slug,
      label: f.name,
      subtitle: f.activities.map((a) => a.name).join(" · "),
      color: Number(style.color),
      x: style.x,
      y: style.y,
      z: style.z,
    };
  });
}

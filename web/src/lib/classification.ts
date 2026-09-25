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
// Since 2026-09-21 this module is also the NAVIGATION. The bar, the footer,
// the mobile panel and the section strips read `functions()`: six menus, one
// per function, each listing the series its activities produce. The home page
// is the scheme itself. A hand-written nav list (web/src/data/navigation.ts,
// deleted) had drifted from the archive's own classification the same way the
// old /archive page had — this is the same fix applied to the second copy.
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
  /** what the menu prints — "Standards", "Guards" */
  readonly label: string;
  /** the activity (verb) that produced it — "Standardising" */
  readonly activity: string;
  /** what it holds, from STD-001's table; empty for folders STD-001 does not list */
  readonly holds: string;
  /** identifier prefix from STD-001, e.g. "STD-NNN"; empty when the series has none */
  readonly prefix: string;
  /** change threshold from STD-001: governed · open · closed · live; empty for an instrument */
  readonly threshold: string;
  /** where this site serves it, or null when it is not published here */
  readonly href: string | null;
  /**
   * Printed beside the link: why this series has no page of its own here
   * (an instrument, read in the repository), or why it is not published at
   * all when href is null. Null for an ordinary series with an index page.
   */
  readonly note: string | null;
  /** an instrument (STD-027 CLS-002): classified, never a document */
  readonly instrument: boolean;
}

/** One function (noun) of the fond. */
export interface Fn {
  /** "Governance" */
  readonly name: string;
  /** route segment — "governance" */
  readonly slug: string;
  /** the page that explains this function: /archive/<slug> */
  readonly href: string;
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
// Every row here is also the navigation: the bar, the footer and the section
// strips are derived from this map through `functions()`, so a series the
// scheme names and this map forgets fails the build instead of vanishing
// from the menu (2026-09-21).
//
// `label` is what the menu prints — the folder name, capitalised, unless a
// page calls the folder something else. Today none does.
//
// Instruments (`machine/**`) are not records (STD-027 CLS-002): they carry no
// identifier, are not appraised and are never cited as evidence. They are
// classified, so they appear in the table and the menu; they have no page of
// their own, so their address is the manual that explains them (SYS-007),
// anchored at the folder. The reason is printed beside the link.
//
// THREE ROWS WERE STALE UNTIL 2026-09-21: `objects/` pointed at one card,
// `operations/` at one document, and `lore/` said "not served here" the day
// after /lore/ went live. The index pages existed; this map had not heard.
const SERVED_AT: Record<string, { href: string | null; label?: string; unpublished?: string }> = {
  "canon/": { href: "/canon/" },
  "standards/": { href: "/standards/" },
  "protocols/": { href: "/protocols/" },
  "decisions/": { href: "/decisions/" },
  "blueprints/": { href: "/blueprints/" },
  "missions/": { href: "/missions" },
  "reports/": { href: "/reports" },
  "debt/": { href: "/debt/" },
  "agents/": { href: "/agents" },
  "objects/": { href: "/objects/" },
  "operations/": { href: "/operations/" },
  "system/": { href: "/system/" },
  "lore/": { href: "/lore/" },
  "machine/guards/": {
    href: "/system/sys-007-the-instruments#machineguards--verifying",
    label: "Guards",
    unpublished: "A short-lived record that never binds — the rules that run on every change; read in the repository, explained in the manual.",
  },
  "machine/tools/": {
    href: "/system/sys-007-the-instruments#machinetools--verifying",
    label: "Tools",
    unpublished: "A short-lived record that never binds — checks run by hand or against the registers; read in the repository, explained in the manual.",
  },
  "machine/scripts/": {
    href: "/system/sys-007-the-instruments#machinescripts--verifying",
    label: "Scripts",
    unpublished: "A short-lived record that never binds — the build and CI scripts; read in the repository, explained in the manual.",
  },
  "machine/telemetry/": {
    href: "/telemetry",
    label: "Telemetry",
  },
  "machine/templates/": {
    href: "/system/sys-007-the-instruments#machinetemplates--templating",
    label: "Templates",
    unpublished: "A short-lived record that never binds — the moulds a document is cut from; read in the repository, explained in the manual.",
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

/** The menu label of a folder: its last segment, capitalised — "standards/" -> "Standards". */
function labelOf(folder: string): string {
  const seg = folder.replace(/\/$/, "").split("/").pop() ?? folder;
  return seg.charAt(0).toUpperCase() + seg.slice(1);
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
    href: string;
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
      const slug = fnCell.toLowerCase();
      current = { name: fnCell, slug, href: `/archive/${slug}`, activities: [] };
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
        const instrument = folder.startsWith("machine/");
        // "—" in the register means "an instrument has none", not a value.
        const cell = (v: string | undefined) => (v && v !== "—" ? v : "");
        return {
          folder,
          label: served.label ?? labelOf(folder),
          activity: activityCell,
          holds: cell(reg?.holds),
          prefix: cell(reg?.prefix),
          threshold: cell(reg?.threshold),
          href: served.href,
          note: served.href === null ? (served.unpublished ?? "Not published on this site.") : (served.unpublished ?? null),
          instrument,
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

/**
 * Where a folder sits in the scheme: its function and the activity that
 * produced it. A section index prints this above its title ("Governance ·
 * Standardising") so a reader always knows which drawer they opened.
 * Undefined for a folder the scheme does not classify.
 */
export function placeOf(folder: string): { fn: Fn; activity: Activity; series: Series } | undefined {
  for (const fn of functions()) {
    for (const activity of fn.activities) {
      const series = activity.series.find((s) => s.folder === folder);
      if (series) return { fn, activity, series };
    }
  }
  return undefined;
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

// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The translator: how a company reads itself, and how the city reads the same
// work. Read from the tables at the end of the world's vocabulary (STD-030).
//
// WHY THIS EXISTS
// The Oracle, 2026-10-01: the archive is read two ways, by a company's
// sections (the new moon) and by the city's guilds and factions (the full
// moon), and what joins them must be written once and be very clear. The
// standard holds the words; this module only reads them, so the site and the
// tests cannot disagree with it. A table that is missing, or a row whose cells
// do not match its header, THROWS — a renamed heading breaks the build instead
// of silently emptying the front door.
//
// Plain .mjs on purpose: Astro and `node --test` both import it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
export const SOURCE = "standards/STD-030-the-worlds-vocabulary.md";

/** The standard's text; `text` may be passed by a test. */
const read = () => fs.readFileSync(path.join(ROOT, SOURCE), "utf8");

/** Split a table row on unescaped pipes, trimming each cell and the bold marks. */
function cells(line) {
  const body = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return body.split(/(?<!\\)\|/).map((c) => c.trim().replace(/\*\*/g, "").replace(/\\\|/g, "|"));
}

/**
 * The first table under `## heading`, as objects keyed by the header's cells.
 * Throws when the heading or the table is missing, or a row has the wrong
 * number of cells.
 */
export function table(heading, text = read()) {
  const lines = text.split("\n");
  const at = lines.findIndex((l) => l.trim() === `## ${heading}`);
  if (at < 0) throw new Error(`${SOURCE}: no "## ${heading}" section`);
  const rows = [];
  let header = null;
  for (let i = at + 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^## /.test(l)) break;
    if (!l.trim().startsWith("|")) {
      if (header && rows.length) break;
      continue;
    }
    const c = cells(l);
    if (!header) { header = c; continue; }
    if (c.every((x) => /^-+$/.test(x))) continue;
    if (c.length !== header.length) {
      throw new Error(`${SOURCE} "${heading}": ${c.length} cells where the header has ${header.length} — "${l.trim()}"`);
    }
    rows.push(Object.fromEntries(header.map((h, j) => [h, c[j]])));
  }
  if (!header || !rows.length) throw new Error(`${SOURCE}: "## ${heading}" has no table`);
  return rows;
}

/** The front door's sections, in order: { Section, Line, "APQC category" }. */
export const sections = (text) => table("Sections of the front door", text);

/** Each house by its disciplines; gaps have "—" as their house. */
export const disciplines = (text) => table("Disciplines", text);

/** Each faction by its business line. */
export const businessLines = (text) => table("Business lines", text);

/** The rank and the city's answers to a company's governance questions. */
export const whoDecides = (text) => table("Who decides", text);

/** The four guilds, from the tables that hold them. */
export const GUILD_TABLES = ["Alchemists", "Exegetes", "Procurators", "Sentinels"];

/**
 * The guild structure as the vocabulary writes it: per guild, its branches and
 * their houses. Each guild table lists the guild, then branch, house, house,
 * branch, house, house — the manual's order.
 */
export function guilds(text = read()) {
  return GUILD_TABLES.map((g) => {
    const names = table(`Guilds — ${g}`, text).map((r) => r["In-world"]);
    if (names.length !== 7 || names[0] !== g) {
      throw new Error(`${SOURCE} "Guilds — ${g}": expected the guild, then two branches of two houses (7 rows)`);
    }
    return {
      guild: g,
      branches: [
        { branch: names[1], houses: [names[2], names[3]] },
        { branch: names[4], houses: [names[5], names[6]] },
      ],
    };
  });
}

/** For a section: the houses that serve it, and the disciplines no house carries. */
export function servedBy(section, text) {
  const rows = disciplines(text).filter((r) => r.Section === section);
  return {
    houses: [...new Set(rows.filter((r) => r.House !== "—").map((r) => r.House))],
    gaps: rows.filter((r) => r.House === "—").map((r) => r.Discipline),
  };
}

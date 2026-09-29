// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// What an agent may do without asking, level by level — READ FROM THE ARCHIVE.
//
// THE PROBLEM THIS SOLVES
// An agent asks the operator for permission many times a session, and each
// request arrives as a line of shell the operator did not write and is asked
// to answer for. The archive holds the answer in six places — who may change
// what (STD-017), the approval protocol (PRO-008), the engineering protocol
// (PRO-016), each agent's OPERATOR.md, the transition regime in AGENTS.md and
// the Hermes adapter config — and in none of them for the person approving.
//
// WHERE THE FACTS LIVE
// Two registers in standards/ hold them, and this module reads both at build
// time (one fact, one place; a test fails if the page and the registers
// drift):
//   STD-041 The levels of automation — the five levels, what the person does
//           in each, the two ends outside the scale.
//   STD-042 What an agent may do without asking — the permissions, graded at
//           each level; what each is; the floor.
// Each agent's level comes from the `automation_level:` header of its own
// OPERATOR.md. What is typed here is presentation only: which tools sit at
// each level, and the notes the page prints beside a floor row.
//
// The five levels are those of the automation scale in ISO/IEC 22989 cl. 5.13
// as reproduced by the open SPDX 3.1 vocabulary `IsoAutomationLevel` (the
// ISO text is paywalled; the house does not buy standards while a public
// reproduction exists). The names are the scale's, never the number.

import fs from "node:fs";
import path from "node:path";

export type Grade = "alone" | "ask" | "never";

export interface Level {
  readonly id: 0 | 1 | 2 | 3 | 4;
  readonly name: string;
  /** One sentence: who does, who watches. */
  readonly line: string;
  /** The operator's role, after Feng, McDonald & Zhang (2025). */
  readonly you: string;
  readonly where: string;
  readonly alone: string;
  readonly asks: string;
  /** Where the tools we use sit on this scale. */
  readonly equiv: string;
  /** True on the level Ursa operates at today — read from her OPERATOR.md. */
  readonly today?: boolean;
}

export interface Permission {
  readonly n: number;
  readonly name: string;
  readonly lets: string;
  readonly wrong: string;
  readonly undo: string;
  readonly who: string;
  readonly risk: string;
  /** One grade per level, in level order. */
  readonly levels: readonly Grade[];
  /** Set when no level grants this alone, or when only the last does under a rule of its own. */
  readonly floor?: string;
  /** For a floor permission that a level opens under a rule: which level. */
  readonly floorOpensAt?: 3 | 4;
}

export interface Source {
  readonly text: string;
  readonly href?: string;
}

const ARCHIVE_ROOT = path.resolve(process.cwd(), "..");
const LEVELS_DOC = "standards/STD-041-the-levels-of-automation.md";
const PERMS_DOC = "standards/STD-042-what-an-agent-may-do-without-asking.md";

const read = (rel: string) => fs.readFileSync(path.join(ARCHIVE_ROOT, rel), "utf8");

/** The rows of the first markdown table under `## <heading>`, cells trimmed, backticks dropped. */
function tableUnder(text: string, heading: string): string[][] {
  const i = text.search(new RegExp(`^## ${heading}`, "m"));
  if (i < 0) throw new Error(`${heading}: no such section`);
  const rows: string[][] = [];
  let inTable = false;
  for (const line of text.slice(i).split("\n").slice(1)) {
    if (line.startsWith("## ")) break;
    if (/^\|\s*-/.test(line)) { inTable = true; continue; }
    if (!line.startsWith("|")) { if (inTable) break; continue; }
    if (!inTable) continue;
    rows.push(line.split("|").slice(1, -1).map((c) => c.trim().replace(/`/g, "")));
  }
  if (rows.length === 0) throw new Error(`${heading}: table has no rows`);
  return rows;
}

function header(text: string, key: string): string | undefined {
  const m = text.match(new RegExp(`^${key}:\\s*"?([^"\\n]*)"?\\s*$`, "m"));
  return m ? m[1].trim() : undefined;
}

// ---------------------------------------------------------------------------
// The levels — STD-041
// ---------------------------------------------------------------------------

/** Presentation: where the tools we use sit. Not a fact of the register. */
const EQUIV: Record<string, string> = {
  Assisted: "Claude Code read-only · Codex read-only",
  Partial: "Hermes manual · Claude Code default",
  Conditional: "Hermes smart · Claude Code acceptEdits · Codex workspace-write",
  High: "Claude Code auto · agents in CI",
  Full: "Dependabot already lives here, in its corner",
};

function ursaLevel(): string {
  return (header(read("agents/ursa/OPERATOR.md"), "automation_level") ?? "").toLowerCase();
}

function readLevels(): Level[] {
  const rows = tableUnder(read(LEVELS_DOC), "The levels");
  if (rows.length !== 5) throw new Error(`${LEVELS_DOC}: ${rows.length} levels, expected 5`);
  const today = ursaLevel();
  return rows.map(([name, means, you, where, alone, asks], i) => ({
    id: i as Level["id"],
    name,
    line: means.endsWith(".") ? means : `${means}.`,
    you: `You ${you}`,
    where: where.charAt(0).toUpperCase() + where.slice(1),
    alone: alone.charAt(0).toUpperCase() + alone.slice(1),
    asks: asks.charAt(0).toUpperCase() + asks.slice(1),
    equiv: EQUIV[name] ?? "",
    ...(name.toLowerCase() === today ? { today: true } : {}),
  }));
}

export const LEVELS: readonly Level[] = readLevels();

// ---------------------------------------------------------------------------
// The permissions — STD-042
// ---------------------------------------------------------------------------

const GRADE_OF: Record<string, Grade> = { alone: "alone", asks: "ask", never: "never" };

function readPermissions(): Permission[] {
  const doc = read(PERMS_DOC);
  const grid = tableUnder(doc, "The permissions");
  const what = new Map(tableUnder(doc, "What each permission is").map((r) => [r[0], r]));
  const floor = new Map(tableUnder(doc, "The floor").map((r) => [r[0], r[2]]));
  return grid.map((r) => {
    const n = Number(r[0]);
    const name = r[1];
    const grades = r.slice(2, 2 + LEVELS.length).map((c) => {
      const g = GRADE_OF[c];
      if (!g) throw new Error(`${PERMS_DOC}: row ${n} (${name}): grade "${c}" is not alone/asks/never`);
      return g;
    });
    const w = what.get(r[0]);
    if (!w) throw new Error(`${PERMS_DOC}: row ${n} (${name}) has no description row`);
    const floorText = floor.get(r[0]);
    const opensAt = floorText ? grades.findIndex((g) => g !== "never") : -1;
    return {
      n, name,
      lets: w[1].charAt(0).toUpperCase() + w[1].slice(1) + ".",
      wrong: w[2].charAt(0).toUpperCase() + w[2].slice(1) + ".",
      undo: r[2 + LEVELS.length].charAt(0).toUpperCase() + r[2 + LEVELS.length].slice(1) + (r[2 + LEVELS.length] === "—" ? "" : "."),
      who: w[3].charAt(0).toUpperCase() + w[3].slice(1) + ".",
      risk: w[4],
      levels: grades,
      ...(floorText ? { floor: floorText.charAt(0).toUpperCase() + floorText.slice(1) + "." } : {}),
      ...(floorText && opensAt >= 3 ? { floorOpensAt: opensAt as 3 | 4 } : {}),
    };
  });
}

export const PERMISSIONS: readonly Permission[] = readPermissions();

// ---------------------------------------------------------------------------
// Where each agent sits — its OPERATOR.md
// ---------------------------------------------------------------------------

/**
 * The level is a fact about how an agent is operated, so it lives in the
 * file that says who operates it (`automation_level:` in the header, one of
 * the five names). A test fails if one carries no level or a name outside
 * the scale. An agent without a file is not on the map — save Dependabot,
 * the one corner of the house already at Full, drawn so the rim is not an
 * empty promise.
 */
export interface AgentMark {
  /** folder under agents/; absent for a mark with no operator file */
  readonly id?: string;
  readonly name: string;
  readonly level: Level["id"];
  readonly levelName: string;
  /** Angle on the astrolabe, degrees from the top. */
  readonly angle: number;
  readonly note: string;
  /** Designed, not activated (no `activated:` date on its card). */
  readonly ghost?: boolean;
  readonly href?: string;
}

const LEVEL_BY_NAME = new Map(LEVELS.map((l) => [l.name.toLowerCase(), l]));

export function agentMarks(): AgentMark[] {
  const dir = path.join(ARCHIVE_ROOT, "agents");
  const ids = fs.readdirSync(dir).filter((d) => !d.startsWith("_") && fs.existsSync(path.join(dir, d, "OPERATOR.md"))).sort();
  const marks: AgentMark[] = ids.map((id, i) => {
    const op = fs.readFileSync(path.join(dir, id, "OPERATOR.md"), "utf8");
    const raw = header(op, "automation_level") ?? "";
    const level = LEVEL_BY_NAME.get(raw.toLowerCase());
    if (!level) throw new Error(`agents/${id}/OPERATOR.md: automation_level "${raw}" is not one of ${[...LEVEL_BY_NAME.keys()].join("/")}`);
    const cardMd = path.join(dir, id, "AGENT.md");
    const cardYaml = path.join(dir, id, "AGENT.yaml");
    const card = (fs.existsSync(cardMd) ? fs.readFileSync(cardMd, "utf8") : "") + (fs.existsSync(cardYaml) ? fs.readFileSync(cardYaml, "utf8") : "");
    // AGENT.yaml carries `activated: "YYYY-MM-DD"` (null while designed);
    // AGENT.md, the converted card, says it in its summary line.
    const activated = /^activated:\s*"?\d{4}-\d{2}-\d{2}/m.test(card) || /activated \d{4}-\d{2}-\d{2}/.test(card);
    const name = header(op, "title")?.replace(/^OPERATOR\s+—\s+/, "") ?? id;
    return {
      id, name, level: level.id, levelName: level.name,
      angle: Math.round((360 / (ids.length + 1)) * i + 15),
      note: activated ? (level.today ? "today" : "as its operator file declares") : "designed, not activated",
      ghost: !activated,
      href: `/agents/${id}`,
    };
  });
  marks.push({ name: "Dependabot", level: 4, levelName: LEVELS[4].name, angle: 150, note: "merges alone within its bounded mission, the ruleset watching" });
  return marks;
}

// ---------------------------------------------------------------------------
// Sources, for the foot of the page
// ---------------------------------------------------------------------------

export const SOURCES: readonly Source[] = [
  { text: "The levels are the register STD-041, The levels of automation; the permissions and the floor are the register STD-042, What an agent may do without asking. Both are read at build time.", href: "/standards/std-041-the-levels-of-automation" },
  { text: "The five levels are those of the automation scale of ISO/IEC 22989:2022, cl. 5.13, as reproduced by the open SPDX 3.1 vocabulary IsoAutomationLevel (clause unverified against the original). The sixth level of that scale, a system that sets its own goals, is out of the map by design.", href: "https://spdx.github.io/spdx-spec/v3.1-RC1/model/Core/Vocabularies/IsoAutomationLevel" },
  { text: "What the person does at each level: Feng, McDonald and Zhang, Levels of Autonomy for AI Agents (2025).", href: "https://arxiv.org/abs/2506.12469" },
  { text: "Human oversight and automation bias: Regulation (EU) 2024/1689, art. 14 (voluntary source) and art. 4 (AI literacy, binding on Numen Games as a deployer).", href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" },
  { text: "Least privilege and least agency: OWASP Top 10 for Agentic Applications 2026; joint guidance by CISA, NSA and the NCSC on the careful adoption of agentic AI, May 2026.", href: "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/" },
  { text: "Those who use the system understand their responsibilities: ISO/IEC 42001, Annex A.9.3; the floor answers A.9.4." },
  { text: "In the house: Who may change what (STD-017), Requesting approval (PRO-008), Applying the engineering standard (PRO-016), each agent's OPERATOR.md and the transition regime in AGENTS.md." },
];

/** The repository files this view is read from, for the composed markdown's preamble. */
export const AUTOMATION_SOURCES = [
  LEVELS_DOC,
  PERMS_DOC,
  "standards/STD-017-who-may-change-what.md",
  "protocols/PRO-008-decision.md",
  "agents/ursa/OPERATOR.md",
  "AGENTS.md",
] as const;

export const GRADE_LABEL: Record<Grade, string> = { alone: "alone", ask: "asks", never: "never" };

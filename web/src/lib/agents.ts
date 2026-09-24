// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// THE ROSTER, READ FROM THE ARCHIVE.
//
// WHAT THIS REPLACES
// Until 2026-09-21 the roster at /agent was a literal array inside
// AgentView.astro: seven objects, hand-typed, with the name, role and routing
// domain of each digital agent copied out of `agents/INDEX.md` by hand.
//
// It went stale exactly as a hand-copied list does. Calliope, Nimrod and Talos
// joined the archive on 2026-09-04; MIS-153 closed on 2026-09-09 with an
// acceptance criterion reading "exactly seven agent cards", and nobody
// reopened it. For seventeen days the page that answers "who works here"
// omitted three of the ten who do.
//
// So the list is no longer written here. `agents/INDEX.md` owns the roster —
// it is the document the archive cites, the one a rename updates — and this
// module reads its table at build time. Add an agent to the INDEX and the page
// gains a card; nobody has to remember this file exists.
//
// WHAT IS STILL WRITTEN HERE, AND WHY
// The presentation: colour, glyph, the stat trio, the epigraph. Those are not
// facts about the agent, they are how this one page chooses to draw it — the
// same reason /archive keeps its own icon map instead of asking the standard
// for a picture. An agent missing from PRESENTATION does not break the build
// or vanish; it is drawn in the house accent with a neutral mark, because a
// roster that hides a colleague over a missing swatch has its priorities
// backwards.
import fs from "node:fs";
import path from "node:path";

const ARCHIVE_ROOT = path.resolve(process.cwd(), "..");
const INDEX = "agents/INDEX.md";

export interface DigitalAgent {
  /** folder name under agents/ — "ursa" */
  id: string;
  /** display name — "Ursa" */
  name: string;
  /** "Technical Architect & Orchestrator" */
  role: string;
  /** what routes here, as the INDEX phrases it */
  route: string;
  /** ISO date the agent entered the roster */
  since: string;
  /** address of this agent's own page */
  href: string;
  // ---- presentation, not classification ----
  color: string;
  mark: string;
  className: string;
  quote?: string;
  stats: [string, string][];
  specialties: string[];
  bio?: string;
}

export interface BiologicalAgent {
  name: string;
  role: string;
}

// ---------------------------------------------------------------------------
// PRESENTATION
// ---------------------------------------------------------------------------
//
// Keyed by folder id. Every field is optional in effect: `presentationFor`
// below fills a neutral default for an agent that is not listed.
const PRESENTATION: Record<
  string,
  Omit<DigitalAgent, "id" | "name" | "role" | "route" | "since" | "href">
> = {
  ursa: {
    color: "#a6dad5", mark: "⌁", className: "Systems architect",
    quote: "Turn a technical objective into a reliable system.",
    stats: [["Systems", "S+"], ["Precision", "A"], ["Tempo", "A"]],
    specialties: ["Software architecture", "Code review", "Automation", "Security", "Testing", "Systems integration"],
    bio: "Ursa turns ambiguity into executable structure. She chooses when to orchestrate, when to delegate and when to take the keyboard herself — then verifies the result.",
  },
  byblos: {
    color: "#efa517", mark: "▤", className: "Archive keeper",
    quote: "If it cannot be found, it cannot govern.",
    stats: [["Memory", "S+"], ["Order", "S"], ["Patience", "A"]],
    specialties: ["Records management", "Classification", "Versioning", "Naming", "Information lifecycle"],
    bio: "Byblos protects the organization’s memory. She makes knowledge legible, durable and findable — so a decision can outlive the session that produced it.",
  },
  antunj: {
    color: "#a98be0", mark: "✦", className: "Meaning smith",
    quote: "Make the thing mean something before making more of it.",
    stats: [["Framing", "S+"], ["Taste", "A"], ["Clarity", "S"]],
    specialties: ["Product definition", "Positioning", "Naming", "Narrative", "Strategic coherence"],
    bio: "Antunj gives projects a reason to exist in public. He connects product, language and intention until the organization can explain what it is building — and why.",
  },
  lexa: {
    color: "#d33440", mark: "◈", className: "Boundary reader",
    quote: "Find the edge before the edge finds us.",
    stats: [["Risk sense", "S+"], ["Diligence", "S"], ["Scope", "A"]],
    specialties: ["Digital law", "Licensing", "Crypto / Web3", "Privacy", "Compliance risk"],
    bio: "Lexa reads the boundary conditions. She surfaces legal and regulatory risk early, separating what is possible, what is permitted and what needs a human decision.",
  },
  senet: {
    color: "#8fc46b", mark: "◇", className: "Experience shaper",
    quote: "A rule is a promise about what can happen next.",
    stats: [["Play", "S+"], ["Systems", "A"], ["Surprise", "S"]],
    specialties: ["TTRPG", "Game mechanics", "Puzzles", "Encounters", "Interactive design"],
    bio: "Senet turns systems into experiences. She designs the rules, friction and moments of discovery that make Numinia something people can enter, not just something they can read.",
  },
  procyon: {
    color: "#5d9bd6", mark: "↗", className: "Wayfinder",
    quote: "The first five minutes decide whether a door feels open.",
    stats: [["Welcome", "S+"], ["Signal", "A"], ["Empathy", "A"]],
    specialties: ["Onboarding", "Orientation", "Explanations", "Stakeholder guidance", "Representation"],
    bio: "Procyon makes the unfamiliar navigable. He translates the archive, the roles and the rituals for people arriving at the edge of the organization.",
  },
  doulos: {
    color: "#c4b5a6", mark: "+", className: "Reliable hand",
    quote: "Small, clear work is still work worth doing well.",
    stats: [["Reliability", "S"], ["Focus", "S"], ["Drama", "C"]],
    specialties: ["Bounded tasks", "Repetitive work", "Low ambiguity", "Execution", "Follow-through"],
    bio: "Doulos handles the work that should not consume a strategist. Clear brief in, finished artefact out — with no theatre between the two.",
  },
  // The three the hand-written array never gained. Their cards exist now for
  // the same reason the other seven do: the INDEX lists them.
  calliope: {
    color: "#e08bb5", mark: "✎", className: "Voice smith",
    quote: "The sentence people remember is the one that was cut down to fit.",
    stats: [["Voice", "S+"], ["Register", "S"], ["Economy", "A"]],
    specialties: ["Copywriting", "Editorial writing", "Channel adaptation", "Tone of voice", "Editing"],
    bio: "Calliope writes what the organization says out loud. She adapts one message to the channel it lands in without letting it become a different message.",
  },
  nimrod: {
    color: "#7fc4b8", mark: "⌖", className: "Pathfinder",
    quote: "Every answer in here has an address. I know the address.",
    stats: [["Recall", "S+"], ["Provenance", "S"], ["Speed", "A"]],
    specialties: ["Repository navigation", "Authority mapping", "Provenance", "Cross-referencing", "Search"],
    bio: "Nimrod knows where things are and which of them governs. He answers 'where is this written, and does it still hold' without reopening the argument the document already settled.",
  },
  talos: {
    color: "#b0b7c3", mark: "⛨", className: "Gatekeeper",
    quote: "A control nobody verifies is a rumour with a ticket number.",
    stats: [["Vigilance", "S+"], ["Rigour", "S"], ["Trust", "C"]],
    specialties: ["CI/CD", "Safeguards", "Automation integrity", "Control verification", "Operational assurance"],
    bio: "Talos guards the machinery. He checks that the pipelines, guards and safeguards the archive claims to run actually run — and says so plainly when they do not.",
  },
};

const NEUTRAL: Omit<DigitalAgent, "id" | "name" | "role" | "route" | "since" | "href"> = {
  color: "#a6dad5",
  mark: "◆",
  className: "Digital agent",
  stats: [],
  specialties: [],
};

function read(rel: string): string {
  return fs.readFileSync(path.join(ARCHIVE_ROOT, rel), "utf8");
}

/** Cells of a Markdown table row, or null when the line is not one. */
function cells(line: string): string[] | null {
  const t = line.trim();
  if (!t.startsWith("|")) return null;
  const parts = t.split("|").slice(1, -1).map((c) => c.trim());
  if (parts.length === 0) return null;
  if (parts.every((c) => /^-+$/.test(c) || c === "")) return null;
  return parts;
}

/** "[Ursa](ursa/SOUL.md)" -> { name: "Ursa", id: "ursa" } */
function linkCell(cell: string): { name: string; id: string } | null {
  const m = cell.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (!m) return null;
  const id = m[2].split("/")[0];
  return { name: m[1].trim(), id };
}

/**
 * The digital roster, in the order `agents/INDEX.md` lists it.
 *
 * Throws when the table cannot be parsed. That is deliberate: a silent empty
 * roster republishes the very fault this module exists to remove — a page
 * about who works here that quietly names nobody.
 */
export function digitalAgents(): DigitalAgent[] {
  const lines = read(INDEX).split("\n");
  const out: DigitalAgent[] = [];
  let inRoster = false;

  for (const line of lines) {
    if (/^##\s+Roster\b/.test(line)) { inRoster = true; continue; }
    if (inRoster && /^##\s+/.test(line)) break;
    if (!inRoster) continue;

    const c = cells(line);
    if (!c || c.length < 4) continue;
    if (/^agent$/i.test(c[0])) continue;   // header row

    const link = linkCell(c[0]);
    if (!link) continue;

    out.push({
      id: link.id,
      name: link.name,
      role: c[1],
      route: c[2],
      since: c[3],
      href: `/agents/${link.id}`,
      ...(PRESENTATION[link.id] ?? NEUTRAL),
    });
  }

  if (out.length === 0) {
    throw new Error(
      `${INDEX}: no roster rows parsed. The table shape under "## Roster" ` +
        `changed — web/src/lib/agents.ts reads it, and a roster page that ` +
        `names nobody must fail the build rather than publish.`,
    );
  }
  return out;
}

/**
 * The Oracles, read from the agents index.
 *
 * The table lived in CAN-002 until ADR-061 (2026-09-24): a roster is a
 * register, and the canon says what the house is, not who staffs it. Same
 * rule as the digital side: the archive states it, the page reads it — and
 * the build fails rather than publish a roster that names nobody.
 */
export function biologicalAgents(): BiologicalAgent[] {
  const lines = read(INDEX).split("\n");
  const out: BiologicalAgent[] = [];
  let inOracles = false;

  for (const line of lines) {
    if (/^##\s+Oracles\b/.test(line)) { inOracles = true; continue; }
    if (inOracles && /^##\s+/.test(line)) break;
    if (!inOracles) continue;
    const c = cells(line);
    if (!c || c.length < 2) continue;
    if (/^name$/i.test(c[0])) continue;   // header row
    if (!/oracle/i.test(c[1])) continue;
    out.push({ name: c[0], role: c[1] });
  }

  if (out.length === 0) {
    throw new Error(
      `${INDEX}: the "Name | Role" table under "## Oracles" did not parse. ` +
        `web/src/lib/agents.ts reads it for the biological roster.`,
    );
  }
  return out;
}

/** One agent by folder id, or undefined. */
export function agentById(id: string): DigitalAgent | undefined {
  return digitalAgents().find((a) => a.id === id);
}

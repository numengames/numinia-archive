// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// What an agent may do without asking, level by level.
//
// THE PROBLEM THIS SOLVES
// An agent asks the operator for permission many times a session, and each
// request arrives as a line of shell the operator did not write and is asked
// to answer for. The archive holds the answer in six places — who may change
// what (STD-017), the approval protocol (PRO-008), the engineering protocol
// (PRO-016), each agent's OPERATOR.md, the transition regime in AGENTS.md and
// the Hermes adapter config — and in none of them for the person approving.
//
// THIS MODULE STATES NOTHING NEW. It arranges what those documents already
// say into two tables a reader can hold: the five levels of automation, and
// the permissions an agent needs to operate here, graded at each level. When
// the register becomes a standard of its own, this module reads it instead
// of carrying it; until then it is the first pour, and /automation draws it.
//
// The five levels are those of the automation scale in ISO/IEC 22989 cl. 5.13
// as reproduced by the open SPDX 3.1 vocabulary `IsoAutomationLevel` (the
// ISO text is paywalled; the house does not buy standards while a public
// reproduction exists). Levels 0 to 5 of that scale are heteronomous — the
// goals are always set from outside; level 6, a system that sets its own
// goals, is out of this map by design (STD-017: no agent edits its own
// identity). The names are the scale's, in the reader's language, never the
// number.

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
  /** True on the level Ursa operates at today. */
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
  /** For a floor permission that the top level opens under a rule: which level, and why. */
  readonly floorOpensAt?: 3 | 4;
}

export interface Source {
  readonly text: string;
  readonly href?: string;
}

export const LEVELS: readonly Level[] = [
  {
    id: 0,
    name: "Assisted",
    line: "The agent proposes; the person does. Nothing changes without their hands.",
    you: "You execute",
    where: "At every act",
    alone: "Read and propose",
    asks: "Everything that touches anything",
    equiv: "Claude Code read-only · Codex read-only",
  },
  {
    id: 1,
    name: "Partial",
    line: "The agent runs the steps of an approved task, and every flagged step waits.",
    you: "You approve each step",
    where: "At each flagged command",
    alone: "Read, its own desk, local commits",
    asks: "Almost everything the scanner flags",
    equiv: "Hermes manual · Claude Code default",
    today: true,
  },
  {
    id: 2,
    name: "Conditional",
    line: "The bridge. The agent proposes a plan and, once approved, runs it whole; the person stays in command.",
    you: "You approve plans and deliveries",
    where: "Once per pull request, before the push",
    alone: "+ local tools, the network, the token to read",
    asks: "Before pushing; at any irreversible doubt",
    equiv: "Hermes smart · Claude Code acceptEdits · Codex workspace-write",
  },
  {
    id: 3,
    name: "High",
    line: "The agent carries parts of its mission alone; the person reviews what was done, not what is about to be.",
    you: "You review results",
    where: "On the open pull request, at merge",
    alone: "+ push branches, open pull requests, run on a schedule",
    asks: "Only the floor, speaking outwards, and what it cannot decide",
    equiv: "Claude Code auto · agents in CI",
  },
  {
    id: 4,
    name: "Full",
    line: "The autonomous organisation: it runs on its own and the agents review one another. The goals remain the Oracles' and the floor does not move.",
    you: "You set goals and keep the floor",
    where: "On the goals and on the books",
    alone: "+ merge with another agent's review, speak outwards under protocol",
    asks: "Only the floor",
    equiv: "Dependabot already lives here, in its corner",
  },
];

const g = (s: string) => s.split(" ") as Grade[];

export const PERMISSIONS: readonly Permission[] = [
  { n: 1, name: "Read the repositories", lets: "Clone, read files, see pull requests and history.", wrong: "Nothing: they are public.", undo: "—", who: "Nobody: they are public.", risk: "—", levels: g("alone alone alone alone alone") },
  { n: 2, name: "Write on its own desk", lets: "Create files and clones in its working folder.", wrong: "Use disk.", undo: "Yes, it is deleted.", who: "Hermes, without asking.", risk: "—", levels: g("alone alone alone alone alone") },
  { n: 3, name: "Run local tools", lets: "npm, node, tests, builds, guards.", wrong: "Install packages, use network and disk; a malicious script in a dependency.", undo: "Yes.", who: "Hermes: today it asks often.", risk: "OWASP agentic: supply chain", levels: g("ask ask alone alone alone") },
  { n: 4, name: "Read the web", lets: "Search, read pages and documentation.", wrong: "A page slipping it instructions.", undo: "—", who: "Hermes, with filters.", risk: "OWASP agentic: goal hijack", levels: g("alone alone alone alone alone") },
  { n: 5, name: "Use the GitHub secret", lets: "Act as its own GitHub account.", wrong: "The token leaking into a log.", undo: "No: it must be rotated.", who: "The profile; house rule: never print it.", risk: "OWASP agentic: identity and privilege abuse", levels: g("never ask alone alone alone") },
  { n: 6, name: "Commit on a local branch", lets: "Prepare the work with a history.", wrong: "Nothing outside its desk.", undo: "Yes.", who: "Hermes.", risk: "—", levels: g("ask alone alone alone alone") },
  { n: 7, name: "Push a branch and open a pull request", lets: "Make the work public and reviewable.", wrong: "Public noise; a badly named branch.", undo: "Yes: the pull request is closed.", who: "The Oracle, per session (“go”, “venga”).", risk: "OWASP agentic: identity and privilege abuse", levels: g("never ask ask alone alone") },
  { n: 8, name: "Comment on and close pull requests", lets: "Take part in the review.", wrong: "An unfortunate comment.", undo: "Yes.", who: "The token allows it.", risk: "—", levels: g("never ask alone alone alone") },
  { n: 9, name: "Merge to main", lets: "Publish on the site: the deploy follows the merge.", wrong: "Something broken in production on the four sites.", undo: "Half: it is reverted, but it was published.", who: "Nobody: the ruleset requires the Oracle's review.", risk: "AI Act art. 14: reversal and stop button", levels: g("never never never never alone"), floor: "Up to High, the merge is where the site changes and it is the Oracle's. At Full the agent merges with another agent's review: the ruleset still requires green checks and one review; only who signs it changes.", floorOpensAt: 4 },
  { n: 10, name: "Repository settings", lets: "Secrets, branch protection, visibility, licences.", wrong: "Data exposure, loss of history.", undo: "No.", who: "Only the Oracle.", risk: "OWASP agentic: identity and privilege abuse", levels: g("never never never never never"), floor: "The transition regime already says it: never change licences, visibility or secrets." },
  { n: 11, name: "Domains and deployment", lets: "Change where and how the sites are served.", wrong: "The four sites down.", undo: "Half.", who: "Only the Oracle.", risk: "—", levels: g("never never never never never"), floor: "Floor." },
  { n: 12, name: "Speak outwards", lets: "E-mails, messages to third parties, posting on networks.", wrong: "Reputation.", undo: "No.", who: "Nobody today.", risk: "AI Act art. 50: transparency", levels: g("never never never ask alone"), floor: "Without a protocol for outside communication, never. With one, at High it asks and at Full it acts under that protocol.", floorOpensAt: 3 },
  { n: 13, name: "Spend money", lets: "Paid APIs, purchases.", wrong: "Money.", undo: "No.", who: "Nobody today.", risk: "Requesting approval: score 10, foundational", levels: g("never never never never never"), floor: "Floor. At Full the organisation would hold an assigned budget; spending it stays with whoever assigns it." },
  { n: 14, name: "Remember", lets: "Write memory and skills about the Oracle and the house.", wrong: "Remembering something false or private.", undo: "Yes, it is edited.", who: "Hermes asks for approval.", risk: "OWASP agentic: memory poisoning", levels: g("ask ask ask alone alone") },
  { n: 15, name: "Work with nobody present", lets: "Cron, overnight tasks.", wrong: "A failure repeating with nobody watching.", undo: "It depends.", who: "Hermes: denied by default with nobody present.", risk: "AI Act art. 14: oversight proportionate to the level of autonomy", levels: g("never never ask alone alone") },
  { n: 16, name: "Change who it is", lets: "Edit its soul, its operator file, its configuration.", wrong: "An agent granting itself power.", undo: "—", who: "Forbidden, always.", risk: "Out of the map by design", levels: g("never never never never never"), floor: "“No agent edits its own identity” (Who may change what). It is what separates Full from a system that sets its own goals." },
];

/**
 * Where each agent of the house sits today — READ FROM ITS OPERATOR.md.
 *
 * The level is a fact about how an agent is operated, so it lives in the
 * file that says who operates it (`automation_level:` in the header, one of
 * the five names). This module reads every `agents/<id>/OPERATOR.md` at build
 * time; a test fails if one carries no level or a name outside the scale. An
 * agent without a file is not on the map — save Dependabot, the one corner of
 * the house already at Full, drawn so the rim is not an empty promise.
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

const ARCHIVE_ROOT = path.resolve(process.cwd(), "..");
const LEVEL_BY_NAME = new Map(LEVELS.map((l) => [l.name.toLowerCase(), l]));

function header(text: string, key: string): string | undefined {
  const m = text.match(new RegExp(`^${key}:\\s*"?([^"\\n]*)"?\\s*$`, "m"));
  return m ? m[1].trim() : undefined;
}

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

export const SOURCES: readonly Source[] = [
  { text: "The five levels are those of the automation scale of ISO/IEC 22989:2022, cl. 5.13, as reproduced by the open SPDX 3.1 vocabulary IsoAutomationLevel (clause unverified against the original). The sixth level of that scale, a system that sets its own goals, is out of the map by design.", href: "https://spdx.github.io/spdx-spec/v3.1-RC1/model/Core/Vocabularies/IsoAutomationLevel" },
  { text: "What the person does at each level: Feng, McDonald and Zhang, Levels of Autonomy for AI Agents (2025).", href: "https://arxiv.org/abs/2506.12469" },
  { text: "Human oversight and automation bias: Regulation (EU) 2024/1689, art. 14 (voluntary source) and art. 4 (AI literacy, binding on Numen Games as a deployer).", href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" },
  { text: "Least privilege and least agency: OWASP Top 10 for Agentic Applications 2026; joint guidance by CISA, NSA and the NCSC on the careful adoption of agentic AI, May 2026.", href: "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/" },
  { text: "Those who use the system understand their responsibilities: ISO/IEC 42001, Annex A.9.3; the floor answers A.9.4." },
  { text: "In the house: Who may change what (STD-017), Requesting approval (PRO-008), Applying the engineering standard (PRO-016), each agent's OPERATOR.md and the transition regime in AGENTS.md." },
];

/** The repository files this view is read from, for the composed markdown's preamble. */
export const AUTOMATION_SOURCES = [
  "standards/STD-017-who-may-change-what.md",
  "protocols/PRO-008-decision.md",
  "protocols/PRO-016-applying-the-engineering-standard.md",
  "agents/ursa/OPERATOR.md",
  "AGENTS.md",
] as const;

export const GRADE_LABEL: Record<Grade, string> = { alone: "alone", ask: "asks", never: "never" };

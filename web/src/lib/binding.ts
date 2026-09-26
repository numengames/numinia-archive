// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// What binds today, read from the archive.
//
// THE PROBLEM THIS SOLVES
// --------------------------------------------------------------------------
// This site publishes two halves of a sentence and not the third.
//
//   1. Eleven protocols, twenty-seven standards and the canons, rendered
//      in full, each with its steps and its obligations.
//   2. The definition of `draft` — "written, not yet in force: it binds
//      nobody" (STD-004) — printed on the home, in /llms.txt and in
//      /scheme.md.
//
// What follows from those two is the question every reader actually has, and
// the site answered it nowhere: IF NONE OF THIS BINDS, WHAT DOES?
//
// The answer exists and has existed since 2026-09-18. The Oracle wrote it as
// the transition regime in AGENTS.md — which protocol ceremony is suspended
// while the system is cut down from the MVP to the alpha, and which rules
// still hold because each one protects something visible. But AGENTS.md is a
// repository file the viewer does not serve (ADR-047: the repository's own
// furniture is not a document of a series), so the only readers who ever saw
// it were the ones already inside the repository.
//
// The cost is asymmetric and falls on the visitor. A person browsing
// /protocols reads a procedure that was derogated months ago and assumes it
// is how this place works. An agent arriving through /llms.txt — the door
// this site advertises to machines — does worse: it obeys it.
//
// WHAT THIS MODULE DOES, AND WHAT IT REFUSES TO DO
// --------------------------------------------------------------------------
// It READS. Nothing about the regime or the corpus's state is written here:
//
//   transitionRegime()  the Oracle's text, verbatim, from between the markers
//                       in AGENTS.md. Not paraphrased — a paraphrase of a
//                       governing instruction is a second instruction.
//   lifecycle()         how many documents of each rule-bearing folder are in
//                       each state, counted from the frontmatter in the tree.
//
// So the page moves by itself. The day the Oracle promotes a protocol out of
// draft, the count changes with no edit to the site; the day he rewrites the
// regime, the page rewrites with it. That is the same contract classification.ts
// holds for the scheme, and it exists for the same reason: a page that
// restates the archive from memory is the failure mode this repository was
// built to remove.
//
// WHY MARKERS AND NOT A HEADING
// --------------------------------------------------------------------------
// The regime is prose the Oracle owns and rewords. Anchoring the parser on
// its heading would mean a reworded title silently empties the page. Anchoring
// on `<!-- transition-regime:begin -->` gives him free rein between the
// markers and gives the build one thing to check. A missing marker THROWS:
// publishing a page titled "what binds today" with nothing under it is worse
// than not publishing it, because it reads as "nothing binds".
import fs from "node:fs";
import path from "node:path";

/** The repository root, from the site's own cwd — as classification.ts does. */
const ARCHIVE_ROOT = path.resolve(process.cwd(), "..");

const AGENTS_DOC = "AGENTS.md";
const STATUS_DOC = "standards/STD-004-the-header.md";

const BEGIN = "transition-regime:begin";
const END = "transition-regime:end";

/**
 * The folders whose documents carry rules, in the order a reader meets them:
 * what the system is, what an artifact must comply with, what an actor
 * executes. `decisions/` is deliberately absent — an ADR records a choice
 * that was made, it does not impose an obligation to be in force.
 */
const RULE_FOLDERS: ReadonlyArray<{ folder: string; label: string; holds: string }> = [
  { folder: "canon/", label: "Canon", holds: "what the system is" },
  { folder: "standards/", label: "Standards", holds: "what an artifact must comply with" },
  { folder: "protocols/", label: "Protocols", holds: "what an actor executes, step by step" },
];

export interface Regime {
  /** The Oracle's text, verbatim, markdown as written. */
  body: string;
  /** Where it is maintained — cited on the page so nobody edits the copy. */
  source: string;
}

export interface LifecycleRow {
  /** Folder as the archive names it: `protocols/`. */
  folder: string;
  label: string;
  holds: string;
  /** Documents per `status:` value found in that folder. */
  states: Record<string, number>;
  total: number;
}

/** Read a file under the archive root, or null when it is not there. */
function read(rel: string): string | null {
  try {
    return fs.readFileSync(path.join(ARCHIVE_ROOT, rel), "utf8");
  } catch {
    return null;
  }
}

/**
 * The transition regime, verbatim, from AGENTS.md.
 *
 * Throws when the markers are gone. That is the correct behaviour and not a
 * defensive habit: this page's whole claim is that it states what governs
 * right now, and a page that cannot find the rule must fail the build rather
 * than tell a reader there isn't one.
 */
export function transitionRegime(): Regime {
  const agents = read(AGENTS_DOC);
  if (agents === null) {
    throw new Error(
      `binding.ts: ${AGENTS_DOC} is not readable from ${ARCHIVE_ROOT}. ` +
        `/binding publishes what that file marks as the transition regime.`,
    );
  }

  const begin = agents.indexOf(BEGIN);
  const end = agents.indexOf(END);
  if (begin < 0 || end <= begin) {
    throw new Error(
      `binding.ts: ${AGENTS_DOC} carries no <!-- ${BEGIN} --> … <!-- ${END} --> block. ` +
        `The markers are how /binding finds the rule that governs while the ` +
        `protocols are draft; without them the page would publish an empty ` +
        `answer to "what binds today", which reads as "nothing does".`,
    );
  }

  // From the end of the opening comment to the start of the closing one.
  const from = agents.indexOf("-->", begin);
  const body = agents.slice(from < 0 || from > end ? begin + BEGIN.length : from + 3, end)
    .replace(/<!--[^]*$/, "")
    .trim();

  if (body.length < 200) {
    throw new Error(
      `binding.ts: the marked regime in ${AGENTS_DOC} is ${body.length} characters. ` +
        `That is not a governing instruction — check the markers did not collapse.`,
    );
  }

  return { body, source: AGENTS_DOC };
}

/** `status:` of a document, from its frontmatter. Undefined when it carries none. */
function statusOf(text: string): string | undefined {
  if (!text.startsWith("---")) return undefined;
  const close = text.indexOf("\n---", 3);
  const head = close < 0 ? text : text.slice(0, close);
  const m = /^status:\s*["']?([A-Za-z-]+)["']?\s*$/m.exec(head);
  return m ? m[1] : undefined;
}

/**
 * The states of the rule-bearing folders, counted from the tree.
 *
 * Counted, never typed: this is the figure the page's whole argument rests on
 * ("eleven protocols, all draft"), and a typed figure goes stale the first
 * time one is promoted — which is precisely the event a reader came here to
 * learn about. Folders that do not exist are skipped rather than reported as
 * empty: a missing folder is a different fact from an empty one and this
 * function is not the place to decide which happened.
 */
export function lifecycle(): LifecycleRow[] {
  const rows: LifecycleRow[] = [];

  for (const { folder, label, holds } of RULE_FOLDERS) {
    const dir = path.join(ARCHIVE_ROOT, folder);
    let files: string[];
    try {
      files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    } catch {
      continue;
    }

    const states: Record<string, number> = {};
    let total = 0;
    for (const f of files.sort()) {
      const status = statusOf(fs.readFileSync(path.join(dir, f), "utf8"));
      if (!status) continue;   // no header, no state to report — INDEX.md and friends
      states[status] = (states[status] ?? 0) + 1;
      total += 1;
    }
    if (total > 0) rows.push({ folder, label, holds, states, total });
  }

  return rows;
}

/**
 * The documents this page is read from, for its own preamble and for the
 * `sources` every composed view declares. AGENTS.md first: it is the one that
 * governs, and a reader who wants to argue with the rule must be sent there
 * and not to the page that renders it.
 */
export const BINDING_SOURCES: readonly string[] = [AGENTS_DOC, STATUS_DOC];

/** How many rule documents are in force right now, across the three folders. */
export function inForce(rows: LifecycleRow[] = lifecycle()): { active: number; draft: number; total: number } {
  let active = 0;
  let draft = 0;
  let total = 0;
  for (const r of rows) {
    active += r.states.active ?? 0;
    draft += r.states.draft ?? 0;
    total += r.total;
  }
  return { active, draft, total };
}

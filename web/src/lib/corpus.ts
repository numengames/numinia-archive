// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The corpus, filtered — and the sections it is made of.
//
// MIS-114. Two things live here because they are the same question asked twice:
// "what may be published" and "what belongs to which section".
//
// WHY A MODULE AND NOT A LINE IN content.config.ts
// The visibility rule has to hold for EVERY consumer of the collection, not
// just for the page that happens to render a document. There are four today
// (corpus/[...slug].astro, corpus/[...slug].md.ts, corpus/index.astro,
// print/[...slug].astro) and MIS-111 adds section indexes on top. A filter
// applied per page is a filter someone forgets on the fifth page.

import { getCollection, type CollectionEntry } from "astro:content";

type Entry = CollectionEntry<"corpus">;

// ---------------------------------------------------------------------------
// VISIBILITY
// ---------------------------------------------------------------------------

// The only value that publishes. Everything else — and everything absent —
// does not.
//
// FAIL CLOSED, AND HERE IS WHAT IT COSTS.
// 30 of the 35 entries in debt/ declare no `visibility` at all, and the five
// that do declare `internal`, `restricted-oracle` or `pending-oracle`. So on
// the day this lands, `debt/` returns to the glob and **publishes nothing**.
// That is not a bug and it is not a silent outcome: each entry becomes visible
// the day someone marks it, deliberately, in its own change.
//
// The alternative — publish unless marked otherwise — puts D-033 on the public
// web the first time somebody forgets a frontmatter field. D-033 enumerates 132
// controls the system claims to satisfy and does not verify: finished
// reconnaissance, with F-48 open. The asymmetry decides the default.
const PUBLIC = "public";

// Only these folders are governed by the field. The rest of the corpus is
// published as it always was.
//
// THIS SCOPE IS THE CORRECTION THAT MADE THE MISSION SAFE.
// The brief says "the rule must fail closed" without naming a scope. Applied to
// the whole collection it would have removed 112 pages in one commit, because
// `visibility` appears in exactly zero documents outside debt/. Measured before
// writing the filter, not discovered after.
const GOVERNED = ["debt/"];

function isGoverned(id: string): boolean {
  return GOVERNED.some((prefix) => id.startsWith(prefix));
}

export function isPublishable(entry: Entry): boolean {
  if (!isGoverned(entry.id)) return true;
  const v = (entry.data as Record<string, unknown>).visibility;
  return typeof v === "string" && v.trim().toLowerCase() === PUBLIC;
}

/** The corpus as the site may show it. Every consumer uses this, never getCollection directly. */
export async function getPublicCorpus(): Promise<Entry[]> {
  return (await getCollection("corpus")).filter(isPublishable);
}

// ---------------------------------------------------------------------------
// SECTIONS
// ---------------------------------------------------------------------------

// The answer to "what counts as a section, and what counts as a document in
// one" — the question MIS-113 depends on.
//
// ORDERED BY AUTHORITY: what binds the rest first, what is bound by everything
// last. The order is not invented here — it is the change-threshold table in
// S-001 §2.1, which is the only place the archive ranks its own series:
//
//   governed  canon/ · decisions/ · standards/ · protocols/  an ADR, or an approved PR
//             (canon first: STD-009 PRE-003, nothing is sealed since 2026-09-09)
//   open      blueprints/ · debt/                 a normal PR
//
// Inside `governed` the tie is broken by which one can change which: an ADR
// changes a standard, a standard defines what a protocol must satisfy, a
// protocol says how it is carried out. Nothing under `open` binds anything —
// blueprints propose and debt confesses.
//
// A section is a TOP-LEVEL FOLDER of the corpus that holds documents a reader
// is meant to browse. That excludes folders that are infrastructure for other
// documents, and it excludes anything already published by a typed collection.
export interface Section {
  /** path prefix inside the corpus collection */
  prefix: string;
  /** route segment: the address is /<slug>, STD-028 URL-001 */
  slug: string;
  label: string;
  /** what a reader finds here */
  blurb: string;
  /**
   * The question this series answers, in the reader's words.
   *
   * Every document in this archive opens with what it is for; a folder had no
   * equivalent, so a reader landing on a section index saw a list of titles
   * and had to infer why the folder exists. This is that missing line — and it
   * is what makes an EMPTY section legible: "nothing is broken right now"
   * reads very differently from a page that simply shows nothing.
   */
  question: string;
  /**
   * What a reader UNDERSTANDS after this section, and what they can then DO.
   *
   * Every document in this archive opens with that pair; the folders did not,
   * so the archive described its pieces in a language it never used about
   * itself. These are the folder's own `Epistemic` and `Pragmatic` lines.
   */
  epistemic: string;
  pragmatic: string;
  /**
   * True for the three series that OBLIGE — canon, standards, protocols.
   *
   * The line between them (`STD-024` SER-001 and SER-002) decides whether a
   * sentence in this archive can put a reader in breach, and it cannot be
   * learnt from any single folder: it exists only in the comparison. So the
   * three that bind carry it together, and the eight that record stay quiet —
   * a register claiming a boundary it does not have is worse than silence.
   */
  axis?: true;
  /**
   * What an empty section MEANS — because it does not mean the same thing twice.
   *
   * An empty `debt/` is good news: nothing outstanding is admitted. An empty
   * `standards/` would be an alarm. Only the sections where emptiness is a
   * legitimate state carry a line here; the rest fall back to the generic
   * "this publishes nothing yet" notice, which is the correct tone for them.
   */
  emptyMeans?: string;
  /**
   * The rights regime a reader has to know BEFORE reading, when it is not the
   * archive's default.
   *
   * Almost everything here is CC0 or CC-BY: take it, fork it, reuse it. Lore is
   * the one section where that is false, and a page that looks exactly like the
   * open ones while being reserved lets a reader assume wrongly. Displaying is
   * not licensing — so the page says so, in the reader's words, rather than
   * leaving REUSE.toml to be the only place that knows.
   */
  rights?: string;
  /**
   * Which collection holds this section's documents.
   *
   * Until 2026-09-20 this field carried a confession: four sections resolved
   * under /corpus/ and two did not, "predating this model", so an index could
   * not derive its own rows' addresses. ADR-047 removed the prefix — every
   * series is served at /<series>/<id> now — and what remains here is the
   * ordinary fact that a section may draw from a typed collection rather than
   * the corpus mirror. Its address is the same either way.
   */
  collection: "corpus" | "decisions" | "blueprints";
}

export const SECTIONS: Section[] = [
  { prefix: "canon/",      slug: "canon",      label: "Canon",      collection: "corpus",
    question: "What is Numinia, before anyone argues about how to build it?",
    blurb: "The ground the rest stands on: what Numinia is, before anyone argues about how to build it.",
    epistemic: "What this place is, and why it is told as a city rather than listed as a process.",
    pragmatic: "Read it before asserting what Numinia is \u2014 or before inventing a structure, a name or a ritual the system does not have.",
    axis: true,
  },
  { prefix: "decisions/",  slug: "decisions",  label: "Decisions",  collection: "decisions",
    question: "Why did we go this way and not the other one?",
    emptyMeans: "Nothing has been decided here yet — not that decisions are being made off the record.",
    blurb: "Why we went this way and not the other, written down while the reasons were still alive.",
    epistemic: "Why the system is the way it is, and what was rejected to get here.",
    pragmatic: "Reopen a settled question only with new evidence \u2014 or find out it was never settled at all.",
  },
  { prefix: "standards/",  slug: "standards",  label: "Standards",  collection: "corpus",
    question: "What does an artifact have to clear before it counts as done?",
    blurb: "The bar every artifact has to clear before it counts as done, and who checks that.",
    epistemic: "Which properties a thing must have here, and who verifies each one.",
    pragmatic: "Check any artifact against a numbered rule, and know whether it passes without asking a person.",
    axis: true,
  },
  { prefix: "protocols/",  slug: "protocols",  label: "Protocols",  collection: "corpus",
    question: "What steps do I follow, in order, so this job comes out the same way twice?",
    blurb: "The steps an actor follows, in order, so the same job comes out the same way twice.",
    epistemic: "Which situations recur often enough to be worth writing down, and what each one costs when improvised.",
    pragmatic: "Execute the procedure, and show afterwards that you did.",
    axis: true,
  },
  { prefix: "system/",     slug: "system",     label: "System",     collection: "corpus",
    question: "How is the machine actually wired today?",
    blurb: "How the machine is actually wired today: the manual you read when you need it to work, not to argue.",
    epistemic: "How the machine is wired today, as opposed to how it ought to be.",
    pragmatic: "Fix, extend or operate it without reverse-engineering what someone already wrote down.",
  },
  { prefix: "blueprints/", slug: "blueprints", label: "Blueprints", collection: "blueprints",
    question: "What could be built, argued through on paper before anyone commits to it?",
    emptyMeans: "Nothing is on the drawing board right now. Everything proposed has either been decided or dropped.",
    blurb: "Designs that could be built: argued through on paper, waiting for a decision that turns them real.",
    epistemic: "What could be built, argued through before anyone commits to it.",
    pragmatic: "Judge a proposal on paper, where changing your mind is still cheap.",
  },
  { prefix: "debt/",       slug: "debt",       label: "Debt",       collection: "corpus",
    question: "What do we already know is broken or missing?",
    emptyMeans: "Nothing is outstanding. No known defect is being carried — which is the state this register exists to make visible, not an error.",
    blurb: "What we know is broken or missing, admitted in writing before anyone else has to find it.",
    epistemic: "What is known to be broken or missing, admitted rather than discovered.",
    pragmatic: "Weigh a decision against what is already wrong, instead of finding out afterwards.",
  },
  // Operations and Objects close the last two holes in the mirror (2026-09-21).
  // Both folders already published every one of their documents — ten under
  // operations/, two under objects/ — and both answered 404 at the address of
  // the folder itself. A reader who found /operations/ops-003-privacy-policy
  // and cut the URL back to see what else was in there was told the folder did
  // not exist. It did; only its door was missing.
  //
  // They sit after the six governed series because neither one BINDS anything.
  // Operations records what the company is doing and what it has promised the
  // public; objects registers things that are not documents at all.
  { prefix: "operations/", slug: "operations", label: "Operations", collection: "corpus",
    question: "What is the company actually doing right now, and what has it promised in writing?",
    blurb: "The live record of the business: where work stands, what contradicts what, and the legal texts the public sites are bound by.",
    epistemic: "What the company is doing right now, and what it has promised in public.",
    pragmatic: "Act on the live state of the business \u2014 and read the terms the public sites are bound by.",
  },
  { prefix: "objects/",    slug: "objects",    label: "Objects",    collection: "corpus",
    question: "What does the archive hold that is not a document — and where do its bytes actually live?",
    emptyMeans: "No thing is registered yet. The folder exists and its cards are read at build time, so the first card to land appears here on its own.",
    blurb: "Cards for the things that are not documents — an avatar, a model, later a place. The card is the index; the bytes live in the asset depot.",
    epistemic: "What the archive holds that is not a document, and where its bytes actually live.",
    pragmatic: "Find a thing, know its licence, and follow it to the depot that stores it.",
  },
  // Lore — the second fond (ADR-046), and the only section whose documents
  // are RESERVED rather than open. It is served for reading and licensed to
  // nobody; the reasoning is in content.config.ts where the glob admits it.
  // Last on purpose: everything above governs how the archive works, and this
  // is the thing the archive was built to hold.
  { prefix: "lore/",       slug: "lore",       label: "Lore",       collection: "corpus",
    question: "What is the world of Numinia, and how is the game in it actually played?",
    rights: "All rights reserved. This is the one part of the archive Numen Games does not license: read it here, cite it, link to it — but copying, adapting or republishing it needs written permission, unlike everything else on this site.",
    blurb: "The fiction and the game: the RPG manual, the adventures a Director runs at a table, who Numinia is, and the Codex matter. All rights reserved — read it here, take nothing from it.",
    epistemic: "The world of Numinia and how the game in it is played.",
    pragmatic: "Run a session, write in the world, or settle what something in it is called.",
  },
];

// NOT sections, and why — recorded so the next reader does not re-litigate it:
//
//   missions/   The 111 MIS-* documents are NOT in this collection; they have
//               their own typed collection and their index is the board at
//               /missions (MIS-115 redesigns it). What remains under
//               missions/ in the corpus is 5 system documents — TEMPLATE,
//               TEMPLATE-CHANGES, TEMPLATE-EXAMPLE, PROPOSAL-closure-guard,
//               ANNEX-mission-selection-draft. Those describe how missions are
//               written; they are not a browsable family of their own, and
//               listing them as "Missions" beside a board of 111 would be a
//               second, poorer answer to the same question.
//
//   agents/     Per-agent state files (MEMORY, STATUS, SOUL). Infrastructure
//               for the roster at /agents, which is the door to that folder.
//   reports/    Dated dailies; chronological, and /reports already serves them.
//
// operations/ was on this list until 2026-09-21, described as "live operational
// records, not a reading family". That was wrong in the only way that matters:
// every one of its ten documents was already published and linked, so it WAS
// being read — as ten loose pages with no folder to return to. The OPS- series
// passes the test below: what it holds fits in one sentence.
//
// A folder can graduate to a section later. Each addition is a decision, made
// here, and the reason for the current eight is that a reader can name what each
// one contains in a single sentence — the `blurb` above is the test.

/**
 * How many documents this section holds that the build does NOT publish.
 *
 * Without this number an empty index cannot tell the truth. `debt/` today
 * holds one entry marked `restricted-oracle`, so "nothing is outstanding"
 * would be a lie — the debt exists, the reader just may not read it. With the
 * count, the page says which of the two silences it is looking at.
 */
export async function countWithheld(slug: string): Promise<number> {
  const section = SECTIONS.find((s) => s.slug === slug);
  if (!section) return 0;
  const all = await getCollection("corpus");
  return all.filter((e) => e.id.startsWith(section.prefix) && !isPublishable(e)).length;
}

export function sectionOf(entry: Entry): Section | undefined {
  return SECTIONS.find((s) => entry.id.startsWith(s.prefix));
}

// ---------------------------------------------------------------------------
// READING ORDER
// ---------------------------------------------------------------------------

// A section index sorted by identifier is sorted by the order things HAPPENED
// TO BE WRITTEN. CAN-001 came before CAN-002 because someone typed it first, and
// the reader who lands on /canon/ inherits that accident as if it were
// an argument. It is not one: "Welcome to Numinia" followed by "Brand and
// Culture" tells a stranger nothing, because the second document answers a
// question the first has not yet made them ask.
//
// So each section declares its own reading order: the sequence in which the
// documents ARGUE, not the sequence in which they were filed. The identifier
// still governs citation — C-005 is C-005 forever, that is ADR-004 — but it
// stops governing the page.
//
// RULES OF THIS TABLE
//   · A document listed here appears in this position.
//   · A document NOT listed falls to the end, ordered by identifier as before.
//     New documents are therefore visible (they pile up at the bottom) rather
//     than silently absorbed into a story that was not written for them.
//   · Keyed by href, which is the one identifier that is unique across the
//     three collections a section can draw from.
//
// `debt/` is deliberately absent: a register of confessions reads by number,
// and there is no story to tell about which defect comes first.
const READING_ORDER: Record<string, string[]> = {
  // What this place is → why the fiction is not decoration → how it becomes
  // an operating system → what it feels like → who lives here → what they are
  // made of, and how far they climb → what you may take with you.
  //
  // Rewritten 2026-09-01 (ADR-036) when canon went from twelve files to
  // seven. The story lost three of its beats and kept the rest in order:
  // "how far they climb" is no longer its own document — Rank Specifications
  // was absorbed into CAN-003, so the ranks are now read where the attributes
  // are; "how you get in" left for lore/adventures/, because Session Zero is game
  // design, not governing canon; "what the archive sounds like" moved into
  // system/SYS-003 with the fondos it describes; and the cover page is gone.
  canon: [
    "/canon/can-001-welcome-to-numinia",
    "/canon/can-006-epistemic-relations",
    "/canon/can-007-pragmatic-numen-system",
    "/canon/can-002-brand-and-culture",
    "/canon/can-004-role-structure",
    "/canon/can-003-attributes-and-ranks",
    "/canon/can-005-licensing",
  ],

  // The life of a document, in the order the archive had to decide it:
  // where it lives → what it is called → how it is registered → what the
  // words mean → what its header must declare → who owns it and where debt
  // is kept → how it dies.
  decisions: [
    "/decisions/adr-030",
  ],

  // Language first, because nothing below can be read without it. Then power:
  // who may change what. Then form, then craft, then what the craft produces,
  // then the superseded document kept for the record.
  //
  // The analogous-terminology table used to sit second, teaching the in-world
  // vocabulary. It was merged into CAN-004 on 2026-09-03: it translated names,
  // it never bound anything, and the canon already held the structure it named.
  standards: [
    "/standards/std-001-the-series",
    "/standards/std-024-a-series-is-a-function",
    "/standards/std-004-the-header",
    "/standards/std-016-header-fields",
    "/standards/std-003-platform-ranks",
    "/standards/std-005-engineering-baseline",
    "/standards/std-015-engineering-checks",
    "/standards/std-006-plain-text-is-sovereign",
    "/standards/std-007-one-page-per-document",
    "/standards/std-008-design-tokens",
    "/standards/std-023-design-values",
    "/standards/std-009-which-rule-wins",
    "/standards/std-017-who-may-change-what",
    "/standards/std-018-one-document-one-identifier",
    "/standards/std-019-versions",
    "/standards/std-020-git-is-the-archive",
    "/standards/std-021-evidence-and-citation",
    "/standards/std-022-secrets",
    "/standards/std-010-licensing",
    "/standards/std-014-publishing-gates",
    "/standards/std-013-licence-allowlist-and-fields",
    "/standards/std-011-external-standards",
    "/standards/std-012-corpus-does-not-grow",
  ],

  // One working day, in order: you sit down → you take a mission → you need a
  // ruling → it is stuck, you escalate → you file the result → you audit what
  // you built → you hand the check to CI so nobody has to remember it.
  protocols: [
    "/protocols/pro-001-agent-session",
    "/protocols/pro-003-mission-cycle",
    "/protocols/pro-008-decision",
    "/protocols/pro-005-escalation",
    "/protocols/pro-011-security-audit",
    "/protocols/pro-013-handing-a-guard-to-ci",
    "/protocols/pro-018-publishing-a-repository",
  ],

  // Five manuals, read outside in: what the system is, for someone who has
  // never opened it → the shape of the whole machine → the loop one agent
  // actually runs inside it → the shelves where everything it produces ends
  // up → the instruments that check those shelves.
  //
  // SYS-006 is the text that was the home page until 2026-09-21 (BLU-008,
  // reshelved); SYS-007 is new the same day, the manual of machine/.
  system: [
    "/system/sys-006-nwos-system",
    "/system/sys-001-cao-architecture",
    "/system/sys-002-agent-cycle",
    "/system/sys-003-archive-fondos",
    "/system/sys-007-the-instruments",
  ],

  // The company looking at itself, from the inside out: how it survives its own
  // failures → what it has not resolved → where the work was left → what the
  // failures would look like if they ran → what is being done about them → who
  // would pay for it → how the keys are handled → and last the three texts a
  // stranger can hold the company to, which are the only ones written for
  // someone outside it.
  operations: [
    "/operations/ops-001-continuity",
    "/operations/ops-002-contradictions",
    "/operations/ops-008-session-state",
    "/operations/ops-005-simulations",
    "/operations/ops-006-solutions",
    "/operations/ops-007-sales",
    "/operations/ops-009-secrets-handling",
    "/operations/ops-003-privacy-policy-numengames",
    "/operations/ops-004-terms-and-conditions-numengames",
    "/operations/ops-010-cookie-policy-numengames",
  ],

  // The card first, then the audit of whether its bytes are still where the
  // card says they are. Two rows today; the order is the one that survives
  // growth, because the check report always belongs after what it checks.
  objects: [
    "/objects/avocado",
    "/objects/check",
  ],

  // Two survivors of the first shelf, after ADR-035 moved the manuals to
  // system/, MIS-129 retired BLU-001 and BLU-003, and 2026-09-21 reshelved
  // BLU-008 (the system description — it described what runs) as SYS-006:
  // the vocabulary the system has to speak, then how anyone can tell it is
  // working. The seven design recipes (BLU-009..015) follow by number.
  blueprints: [
    "/blueprints/dual-nomenclature",
    "/blueprints/business-metrics",
  ],
  // The world before the game, and the game before its edition matter: who
  // Numinia is and why the fiction does real work → how a table actually plays
  // it, tutorial first → the reference shelf a Director reaches for mid-session.
  //
  // The RPG manual is absent because the build cannot render it: it embeds four
  // images that were never committed. See content.config.ts.
  lore: [
    "/lore/world/welcome-to-numinia",
    "/lore/world/epistemic-relations",
    "/lore/world/brand-and-culture",
    "/lore/world/role-structure",
    "/lore/adventures/session-zero",
    "/lore/adventures/el-espejo-roto",
    "/lore/game/attributes-and-ranks",
    "/lore/codex/glosario",
    "/lore/codex/hoja-de-personaje",
    "/lore/codex/legal",
    "/lore/codex/agradecimientos",
  ],
};

/**
 * Pages the SITE renders about a section, which are not documents of it.
 *
 * Eight pages under web/src/pages/system/ — a metrics dashboard, a sales
 * guide, a hundred simulated adoptions, a gaps analysis, a Wardley map, the
 * continuity proof, the narrative dial, the grouped solutions. Until
 * 2026-09-21 they sat at the site root with no link from any page: built,
 * served, unreachable. The Oracle's call: they belong to the System drawer,
 * with appraisal of each one deferred ("las cosas en su cajón, y luego ya
 * vemos qué hay dentro"). So they are filed here and the index lists them
 * under its documents, plainly marked as views the site draws, not records
 * of the series. Four are in Spanish and untouched since August; the index
 * says so rather than hide it.
 *
 * CHECKED AT BUILD, like READING_ORDER: [section].astro globs the folder and
 * fails when a page exists with no row here or a row names no page. A view
 * that falls off this list goes back to being unreachable, which is the
 * defect this table exists to end.
 */
export interface SectionView {
  /** the route, under the section: /system/wardley */
  href: string;
  title: string;
  /** one line, in the reader's words, including what is stale about it */
  what: string;
  /** the page's language when it is not the corpus's */
  lang?: "es";
}

export const SECTION_VIEWS: Record<string, SectionView[]> = {
  system: [
    { href: "/system/wardley", title: "Wardley map", what: "A strategic map of the NWOS — what is visible, what is evolving, where the moat is. Rendered from its report." },
    { href: "/system/gaps", title: "Gaps", what: "The blind spots of the NWOS from business, product and organisational theory. Rendered from its report." },
    { href: "/system/continuity", title: "Continuity", what: "The proof that an agent can rebuild itself from the repository alone.", lang: "es" },
    { href: "/system/language", title: "Narrative dial", what: "Two dials, five levels each: how much narrative and gamification an organisation chooses." },
    { href: "/system/cao", title: "CAO dashboard", what: "Metrics of the autonomous organisation: agents, missions, costs. Hand-written in August 2026; not refreshed since.", lang: "es" },
    { href: "/system/simulations", title: "100 simulations", what: "Results of a hundred simulated adoptions across five organisation archetypes. Hand-written in August 2026.", lang: "es" },
    { href: "/system/solutions", title: "Solutions", what: "The gaps grouped into clusters and three proposed solutions per cluster. Hand-written in August 2026.", lang: "es" },
    { href: "/system/sales", title: "Sales guide", what: "ICP, funnel, blockers and a pilot plan for the Oracles. Hand-written in August 2026.", lang: "es" },
  ],
};

// A story the reader cannot see is just a list in an unusual order. Each
// section gets one line of prose above its rows, in the same voice as the
// blurb: what the sequence is doing, so the order reads as a choice.
export const READING_NOTE: Record<string, string> = {
  canon: "Read top to bottom and the city builds itself: first what this place is, then why the fiction does real work, then who lives here and how far they can climb — and last, what you are free to take with you.",
  decisions: "The life of a document, in the order the archive had to settle it: where it lives, what to call it, what the words mean, what it must declare, and how it is allowed to die.",
  standards: "Language first — nothing below can be read without it. Then who may change what, then the shape a document takes, then how the thing gets built.",
  protocols: "One working day, in order: you sit down, you take a mission, you need a ruling, you get stuck, you file the result — and then you hand the checking to a machine that never forgets.",
  blueprints: "What does not exist yet, in the order you would have to argue it: the words the system has to speak, then how anyone could tell it is working — and then the recipes, one per medium, for how a piece of it should look.",
  system: "Not what we plan to build — what is running. Widest first: what the system is, then the whole machine, then the loop a single agent works inside, then the shelves everything it produces lands on, and last the instruments that check those shelves.",
  debt: "No order to argue about. These are confessions, filed by number, and the point of the register is that none of them is hidden.",
  operations: "The company looking at itself, inside out: how it survives its own failures, what it still has not resolved, where the work was left — then the strategy, the handling of keys, and last the three legal texts, the only documents here written for someone outside the company.",
  objects: "The card comes first and the audit after it: a card says where a thing's bytes live, and the check says whether they were still there the day someone looked.",
  lore: "The world first, then the table, then the shelf: who Numinia is and why its fiction does real work, then how a game is actually played in it — the tutorial before the adventure — and last the reference matter a Director reaches for mid-session.",
};

/** One row of a section index. */
export interface SectionDoc {
  href: string;
  title: string;
  docId?: string;
  status?: string;
  updated?: string;
}

const str = (v: unknown) => (typeof v === "string" ? v : undefined);

/**
 * Titles for documents that carry none — the one hand-kept table in this file,
 * and here is why it earns the exception.
 *
 * `titleOf` reads the document first: frontmatter, then a heading-like opening
 * line. That gets nine of the eleven lore documents right. Two it cannot:
 *
 *   welcome-to-numinia   opens with "Introduction to the Gamified System",
 *                        which is its first SECTION, not its title.
 *   brand-and-culture    opens with "V.0.1.2" — a version stamp from the
 *                        PDF's cover page.
 *
 * No amount of cleverness fixes that: the information is not in the file. The
 * real repair is a `title` in the document, but these are reserved texts and
 * editing them is the Oracle's call, not a build's. So the viewer declares
 * what it displays, out loud, keyed by address — and `getSectionDocs` throws
 * if a key here stops matching a document, exactly as it does for a stale
 * reading order. A silent override is a lie; a checked one is a caption.
 */
const TITLE_OVERRIDE: Record<string, string> = {
  "/lore/world/welcome-to-numinia": "Welcome to Numinia",
  "/lore/world/brand-and-culture": "Brand and Culture",
};

/**
 * The title of a corpus document, in order of trust.
 *
 * 1. `title` in the frontmatter. Most of the archive declares one.
 * 2. THE FIRST HEADING OF THE BODY — `# Heading`, or a bare first line that
 *    behaves like one. The lore documents carry no frontmatter at all: they
 *    arrived as prose converted from a PDF, and the conversion kept their
 *    opening title as plain text ("ABOUT SESSION ZERO") rather than as a
 *    Markdown heading. Without this a section index lists them by filename,
 *    and "welcome-to-numinia" is a slug wearing the coat of a title.
 *
 *    "Behaves like one" is deliberately strict — short, no closing full stop,
 *    not a list item or a quote. A first PARAGRAPH matching that by accident
 *    would be printed as the title, which is why the test errs toward the
 *    honest slug rather than toward a clever guess.
 * 3. The filename, unchanged. Better an honest slug than a guess: title-casing
 *    a slug turns "hoja-de-personaje" into "Hoja De Personaje", which is a
 *    mistake a machine made and a reader has to forgive.
 *
 * Read from the document, never from a list kept here: a hand-written table of
 * titles is one more thing to forget when a file is renamed.
 */
function titleOf(entry: Entry): string {
  const override = TITLE_OVERRIDE[`/${entry.id}`];
  if (override) return override;
  const fm = str((entry.data as Record<string, unknown>).title);
  if (fm) return fm;
  // The SPDX comment every document now opens with (`<!-- SPDX-… -->`) is
  // the file's licence, not its first line: it is removed before looking.
  const body = (typeof entry.body === "string" ? entry.body : "").replace(/<!--[\s\S]*?-->/g, "");
  // Markdown bold inside a heading survives conversion from PDF: `# **INTRO**`.
  const h1 = body.match(/^#\s+(.+?)\s*$/m)?.[1]?.replace(/\*\*/g, "").trim();
  if (h1) return h1;
  const first = body.split("\n").map((l) => l.trim()).find(Boolean) ?? "";
  const headingLike =
    first.length > 0 &&
    first.length <= 70 &&
    !/[.:;,]$/.test(first) &&
    !/^[-*>|#[!]/.test(first);
  if (headingLike) return first.replace(/\*\*/g, "");
  return entry.id.split("/").pop() ?? entry.id;
}

/**
 * The documents of one section, ready to list, sorted by identifier.
 *
 * Sorted by `docId` rather than by date: these are reference families, and a
 * reader looking for C-005 wants it where C-005 belongs. The board at /missions
 * is the surface where recency matters, and MIS-115 governs that.
 */
export async function getSectionDocs(slug: string): Promise<SectionDoc[]> {
  const section = SECTIONS.find((s) => s.slug === slug);
  if (!section) return [];

  let docs: SectionDoc[];

  if (section.collection === "decisions") {
    docs = (await getCollection("decisions")).map((e) => {
      const f = e.data as Record<string, unknown>;
      return {
        href: `/decisions/${String(f.id).toLowerCase()}`,
        title: str(f.title) ?? String(f.id),
        docId: str(f.id),
        status: str(f.status),
        updated: str(f.updated)?.slice(0, 10),
      };
    });
  } else if (section.collection === "blueprints") {
    docs = (await getCollection("blueprints")).map((e) => {
      const f = e.data as Record<string, unknown>;
      return {
        href: `/blueprints/${String(e.id).replace(/^BLU-\d+-/i, "").toLowerCase()}`,
        title: str(f.title) ?? String(f.id),
        docId: str(f.id),
        status: str(f.status),
        updated: str(f.updated)?.slice(0, 10),
      };
    });
  } else {
    docs = (await getPublicCorpus())
      .filter((e) => e.id.startsWith(section.prefix))
      .map((e) => {
        const f = e.data as Record<string, unknown>;
        return {
          href: `/${e.id}`,
          title: titleOf(e),
          docId: str(f.id),
          status: str(f.status),
          updated: str(f.updated)?.slice(0, 10),
        };
      });
  }

  // A section is not one collection — it is a FOLDER, and two of them are split
  // across a typed collection and the corpus catch-all. Measured, not assumed:
  //
  //   decisions/   12 ADR-/DEC- in the typed collection + INDEX.md in the corpus
  //   blueprints/  16 BP-* typed + 8 in the corpus (AUDIT-*, BLU-001,
  //                archive-summa-*, INDEX, README)
  //
  // Listing only the typed half would have shown 12 of 13 and 16 of 24, and the
  // missing rows are reachable pages — an index that omits reachable documents
  // is the same lie as an index that lists none, only harder to notice.
  //
  // So for those sections the corpus remainder is appended. `debt/` and the
  // rest are corpus-only and unaffected.
  if (section.collection !== "corpus") {
    const seen = new Set(docs.map((d) => d.href));
    const rest = (await getPublicCorpus())
      .filter((e) => e.id.startsWith(section.prefix))
      .map((e) => {
        const f = e.data as Record<string, unknown>;
        return {
          href: `/${e.id}`,
          title: titleOf(e),
          docId: str(f.id),
          status: str(f.status),
          updated: str(f.updated)?.slice(0, 10),
        };
      })
      .filter((d) => !seen.has(d.href));
    docs = docs.concat(rest);
  }

  // The reading order decides the page; the identifier only breaks ties among
  // documents the story does not yet mention. See READING_ORDER above.
  const order = READING_ORDER[slug] ?? [];

  // A reading order is a list of slugs, and slugs move: on 2026-08-31 the
  // STD- rename retired five of the eight entries below and this function
  // said nothing — every unmatched row simply fell to the end, alphabetically,
  // and the section quietly stopped telling its story. Failing loudly at build
  // time is the only way a curated order stays curated: an entry that matches
  // nothing is a bug in the order, not a document that went missing.
  if (order.length) {
    const live = new Set(docs.map((d) => d.href.replace(/\/$/, "")));
    const dead = order.filter((href) => !live.has(href));
    if (dead.length) {
      throw new Error(
        `READING_ORDER["${slug}"] points at ${dead.length} slug(s) that no ` +
          `longer exist: ${dead.join(", ")}. Update the order in ` +
          `web/src/lib/corpus.ts — the documents renamed, the story did not.`,
      );
    }

    // The same check for TITLE_OVERRIDE, and for the same reason: a caption
    // whose document moved away stops being applied and nothing says so — the
    // page quietly falls back to the slug it was written to replace.
    const mine = Object.keys(TITLE_OVERRIDE).filter((href) =>
      href.startsWith(`/${slug}/`),
    );
    const orphans = mine.filter((href) => !live.has(href));
    if (orphans.length) {
      throw new Error(
        `TITLE_OVERRIDE holds ${orphans.length} key(s) that match no document ` +
          `in "${slug}": ${orphans.join(", ")}. Either the file was renamed or ` +
          `it now declares its own title — update the table in ` +
          `web/src/lib/corpus.ts.`,
      );
    }
  }

  const rank = (d: SectionDoc) => {
    const i = order.indexOf(d.href.replace(/\/$/, ""));
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };

  return docs.sort((a, b) => {
    const ra = rank(a);
    const rb = rank(b);
    if (ra !== rb) return ra - rb;
    return (a.docId ?? a.title).localeCompare(b.docId ?? b.title, "en", { numeric: true });
  });
}

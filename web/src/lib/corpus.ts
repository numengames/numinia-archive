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
   * What an empty section MEANS — because it does not mean the same thing twice.
   *
   * An empty `debt/` is good news: nothing outstanding is admitted. An empty
   * `standards/` would be an alarm. Only the sections where emptiness is a
   * legitimate state carry a line here; the rest fall back to the generic
   * "this publishes nothing yet" notice, which is the correct tone for them.
   */
  emptyMeans?: string;
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
    blurb: "The ground the rest stands on: what Numinia is, before anyone argues about how to build it." },
  { prefix: "decisions/",  slug: "decisions",  label: "Decisions",  collection: "decisions",
    question: "Why did we go this way and not the other one?",
    emptyMeans: "Nothing has been decided here yet — not that decisions are being made off the record.",
    blurb: "Why we went this way and not the other, written down while the reasons were still alive." },
  { prefix: "standards/",  slug: "standards",  label: "Standards",  collection: "corpus",
    question: "What does an artifact have to clear before it counts as done?",
    blurb: "The bar every artifact has to clear before it counts as done, and who checks that." },
  { prefix: "protocols/",  slug: "protocols",  label: "Protocols",  collection: "corpus",
    question: "What steps do I follow, in order, so this job comes out the same way twice?",
    blurb: "The steps an actor follows, in order, so the same job comes out the same way twice." },
  { prefix: "system/",     slug: "system",     label: "System",     collection: "corpus",
    question: "How is the machine actually wired today?",
    blurb: "How the machine is actually wired today: the manual you read when you need it to work, not to argue." },
  { prefix: "blueprints/", slug: "blueprints", label: "Blueprints", collection: "blueprints",
    question: "What could be built, argued through on paper before anyone commits to it?",
    emptyMeans: "Nothing is on the drawing board right now. Everything proposed has either been decided or dropped.",
    blurb: "Designs that could be built: argued through on paper, waiting for a decision that turns them real." },
  { prefix: "debt/",       slug: "debt",       label: "Debt",       collection: "corpus",
    question: "What do we already know is broken or missing?",
    emptyMeans: "Nothing is outstanding. No known defect is being carried — which is the state this register exists to make visible, not an error.",
    blurb: "What we know is broken or missing, admitted in writing before anyone else has to find it." },
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
    blurb: "The live record of the business: where work stands, what contradicts what, and the legal texts the public sites are bound by." },
  { prefix: "objects/",    slug: "objects",    label: "Objects",    collection: "corpus",
    question: "What does the archive hold that is not a document — and where do its bytes actually live?",
    emptyMeans: "No thing is registered yet. The folder exists and its cards are read at build time, so the first card to land appears here on its own.",
    blurb: "Cards for the things that are not documents — an avatar, a model, later a place. The card is the index; the bytes live in the asset depot." },
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

  // Three manuals, read outside in: the shape of the whole machine → the
  // loop one agent actually runs inside it → the shelves where everything
  // it produces ends up.
  system: [
    "/system/sys-001-cao-architecture",
    "/system/sys-002-agent-cycle",
    "/system/sys-003-archive-fondos",
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

  // Three survivors, after ADR-035 moved the manuals to system/ and MIS-129
  // retired BLU-001 and BLU-003: the system as a whole, then the vocabulary it
  // has to speak, then how anyone can tell it is working.
  blueprints: [
    "/blueprints/nwos-system",
    "/blueprints/dual-nomenclature",
    "/blueprints/business-metrics",
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
  blueprints: "What does not exist yet, in the order you would have to argue it: the system as a whole, then the words it has to speak, then how anyone could tell it is working.",
  system: "Not what we plan to build — what is running. Widest first: the whole machine, then the loop a single agent works inside, then the shelves everything it produces lands on.",
  debt: "No order to argue about. These are confessions, filed by number, and the point of the register is that none of them is hidden.",
  operations: "The company looking at itself, inside out: how it survives its own failures, what it still has not resolved, where the work was left — then the strategy, the handling of keys, and last the three legal texts, the only documents here written for someone outside the company.",
  objects: "The card comes first and the audit after it: a card says where a thing's bytes live, and the check says whether they were still there the day someone looked.",
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
          title: str(f.title) ?? e.id.split("/").pop() ?? e.id,
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
          title: str(f.title) ?? e.id.split("/").pop() ?? e.id,
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

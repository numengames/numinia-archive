// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The markdown of a page that has no file behind it.
//
// THE PROBLEM THIS SOLVES
// Every document detail view offers the same four things: listen, copy the
// raw markdown, download the canonical file, open the source (DocToolbar).
// It works there because a document IS a file — `/[...slug].md.ts` serves
// the .md straight off disk and the toolbar points at it.
//
// The home, /scheme, the six function pages and the section indexes have no
// such file. They are COMPOSED at build time from the classification and the
// corpus. So until today they offered none of it: 8 of 26 pages had the
// toolbar and 18 did not, and the ones without were exactly the ones a
// reader arrives at first.
//
// "File over app" (STD-006, and the house's own vocabulary) does not say
// "documents are files". It says the data must be readable and portable
// without the application. A page whose content only exists as HTML fails
// that test even when every fact in it came from a file.
//
// WHAT A COMPOSED PAGE'S MARKDOWN IS, AND IS NOT
// It is NOT a transcription of the rendered page. It is the same query,
// answered in markdown: the rows the page draws, from the registers that own
// them. Nothing here is written by hand and nothing is duplicated — if the
// scheme changes, both the page and its .md change together, because both
// read the same module.
//
// WHERE `Source` POINTS, AND WHY NOT AT THE .astro
// At the DOCUMENT THAT GOVERNS, never at the template that draws it. The
// source of truth of /archive/governance is STD-027, the classification
// scheme — not `[function].astro`, which is a lens. Sending a reader who
// wants to argue with the content to a rendering component is sending them
// to the wrong argument. Where a page draws on two registers, `sources`
// lists both and the toolbar links the first.
import { ENISA, ENISA_INTEREST_TOTAL } from "@/data/enisa";
import { getCollection } from "astro:content";
import { functions, counts, allSeries, RELATIONS } from "@/lib/classification";
import { SECTIONS, getSectionDocs, countWithheld } from "@/lib/corpus";
import { digitalAgents, agentById } from "@/lib/agents";
import { transitionRegime, lifecycle, inForce, BINDING_SOURCES } from "@/lib/binding";
import { LEVELS, PERMISSIONS, agentMarks, SOURCES, GRADE_LABEL, AUTOMATION_SOURCES } from "@/lib/automation-levels";
import { bookLines, bookLines2026, payrollLines, saleLines, cashBooks, BOOK_CATEGORIES, BOOKS_SOURCES } from "@/lib/books";
import { reconcile, futures } from "@/lib/cash";
import { TAX_KINDS, VAT_RESULTS, CALENDAR } from "@/data/tax";
import { ROUNDS, CLIENTS, CASH, FUTURES, PLAN, MONEY_IN_TOTAL } from "@/data/money";
import { COMPANY, CAPITAL_STEPS, ACTS, ORGANS, bormeUrl } from "@/data/company";
import { RINGS, RING_ORDER, DISTRICTS, SEGMENTS, LENSES, INTENTS, TO_CREATE } from "@/lib/summa";
import { coreFlow, type CoreDoc, type CoreCanon } from "@/lib/core";
import { pipeline as salesPipeline, decidingRows, PIPELINE_SOURCES, CARD_URL, TEMPLATE_URL, KIND_LABEL, KIND_PLURAL, STEP_LABEL, recordUrl } from "@/lib/pipeline";
import { moulds as templateMoulds, matrix as templateMatrix, makes as templateMakes, ELSEWHERE as TEMPLATES_ELSEWHERE, TEMPLATES_SOURCES } from "@/lib/templates";
import { settings as configSettings, MOULDS as CONFIG_MOULDS, CONFIG_INTRO } from "@/lib/configuration";
import { compiled as designSystemMd, entries as designEntries, documents as designDocuments, REGISTER as DESIGN_REGISTER } from "@/lib/design-system";

/** A composed page's markdown, and where the facts in it come from. */
export interface ComposedPage {
  /** Route this belongs to, no trailing slash: "", "/scheme", "/canon". */
  route: string;
  /** Filename offered on download. */
  filename: string;
  /** Repo-relative paths of the documents that govern this page's content. */
  sources: string[];
  /** The markdown itself. */
  body: string;
}

/** The two standards that own the classification. Used by most pages here. */
const SCHEME_DOC = "standards/STD-027-the-classification-scheme.md";
const SERIES_DOC = "standards/STD-001-the-series.md";
/** The status lifecycles: what `draft`, `active` and `withdrawn` mean. */
const STATUS_DOC = "standards/STD-004-the-header.md";
/** The roster: who acts, and when to route work to them. */
const AGENTS_DOC = "agents/INDEX.md";

/**
 * The note every composed .md opens with.
 *
 * A reader who downloads this file must be able to tell it from a document of
 * the corpus at a glance — it has no identifier, no frontmatter and no place
 * in the scheme, because it is a VIEW, not a record. Saying so is cheaper
 * than letting someone cite it as if it were canon.
 */
function preamble(sources: string[]): string {
  const list = sources.map((s) => `\`${s}\``).join(", ");
  return [
    "<!--",
    "  A composed view of the archive, generated at build time.",
    "  This is not a document of the corpus: it has no identifier and no series.",
    `  What it states is read from: ${sources.join(", ")}`,
    "  Cite those, never this file.",
    "-->",
    "",
    `> Generated from ${list}. Cite the source documents, not this view.`,
    "",
  ].join("\n");
}

/** A markdown table, given headers and rows. Empty rows render as a dash. */
function table(headers: string[], rows: string[][]): string {
  const head = `| ${headers.join(" | ")} |`;
  const rule = `|${headers.map(() => "---").join("|")}|`;
  const body = rows.map((r) => `| ${r.map((c) => c || "—").join(" | ")} |`).join("\n");
  return [head, rule, body].join("\n");
}

// ---------------------------------------------------------------------------
// THE PAGES
// ---------------------------------------------------------------------------

/** `/scheme` — the classification in full. */
export function schemePage(): ComposedPage {
  const n = counts();
  const rows: string[][] = [];
  for (const fn of functions()) {
    for (const act of fn.activities) {
      for (const s of act.series) {
        rows.push([
          fn.name,
          act.name,
          `\`${s.folder}\`${s.instrument ? " *(instrument)*" : ""}`,
          s.holds || s.note || "",
        ]);
      }
    }
  }

  const body = [
    preamble([SCHEME_DOC, SERIES_DOC]),
    "# The scheme in full",
    "",
    "Every series the archive keeps, the activity that fills it and the function",
    "it answers to.",
    "",
    `- **1** fond`,
    `- **${n.functions}** functions`,
    `- **${n.activities}** activities`,
    `- **${n.series}** series, of which **${n.published}** have an address on this site`,
    "",
    "## The vocabulary",
    "",
    "A **fond** is everything one producer generates. A **function** is something",
    "the organisation does, named with a noun; an **activity** is the verb under",
    "it; a **series** is the folder of documents that activity produces. The",
    "identifier of a document names its series and never its function, so",
    "functions can be regrouped without moving a file or breaking a citation.",
    "",
    "## Every series",
    "",
    table(["Function", "Activity", "Series", "Holds"], rows),
    "",
    "## On `draft`",
    "",
    "Most of this archive says `draft`, including the canon. That is not a warning",
    "label, it is a state with a definition: **written, not yet in force — it binds",
    "nobody** (`STD-004`). `active` means in force; `withdrawn` means it no longer",
    "is, and it is the only terminal state.",
    "",
    "A document is published the day it is written, not the day it is ratified. The",
    "alternative — holding work private until it is perfect — is how an organisation",
    "ends up not knowing itself, which is the thing this archive exists against.",
    "",
    "## The second fond",
    "",
    "`lore/` is recognised as a fond of its own: a different producer relationship",
    "and a different licence regime from the administrative corpus. It is listed",
    "in the scheme because the two fonds are read together, not because it belongs",
    "to the first. It is served for reading, all rights reserved.",
    "",
  ].join("\n");

  return { route: "/scheme", filename: "scheme.md", sources: [SCHEME_DOC, SERIES_DOC, STATUS_DOC], body };
}

/** `/binding` — what governs while the rules are draft. */
export function bindingPage(): ComposedPage {
  const regime = transitionRegime();
  const rows = lifecycle();
  const n = inForce(rows);

  const table_ = table(
    ["Series", "Holds", "In force", "Draft", "Total"],
    rows.map((r) => [
      `\`${r.folder}\``,
      r.holds,
      String(r.states.active ?? 0),
      String(r.states.draft ?? 0),
      String(r.total),
    ]),
  );

  const body = [
    preamble([...BINDING_SOURCES]),
    "# What binds today",
    "",
    "This archive publishes its rules the day they are written, not the day they",
    "are ratified. That is deliberate, and it leaves a question the rest of the",
    "site does not answer: if `draft` binds nobody, and most of this is draft,",
    "what is actually in force right now?",
    "",
    "This page is that answer. It is not a summary of the rules — each document",
    "still says what it says. It is the standing instruction about which of them",
    "apply today, published here because until now it lived only in the",
    `repository, in \`${regime.source}\`, where a reader of this site never saw it.`,
    "",
    "## The state of the rules, counted from the tree",
    "",
    table_,
    "",
    `${n.active} of ${n.total} rule documents are in force; ${n.draft} are draft.`,
    "A `draft` document is **written, not yet in force — it binds nobody**",
    "(`STD-004`). `active` means in force. Nothing here is counted by hand: the",
    "figures are read from each document's own header at build time, so a",
    "promotion changes this page and no one has to remember to edit it.",
    "",
    "## Each document, and its state",
    "",
    "Before you follow a rule, find it here. `active` binds; `draft` describes",
    "and binds nobody. How one leaves draft is a protocol of its own:",
    "[bringing a rule into force](/protocols/pro-023-bringing-a-rule-into-force.md).",
    "",
    ...rows.flatMap((r) => [
      `### ${r.label}`,
      "",
      ...r.documents.map((d) => `- \`${d.id}\` [${d.title}](${d.href}.md) — ${d.status}`),
      "",
    ]),
    "## The instruction in force",
    "",
    `Verbatim from \`${regime.source}\`, the file every agent runtime loads. It is`,
    "reproduced and not summarised, because a paraphrase of a governing",
    "instruction is a second instruction.",
    "",
    regime.body,
    "",
    "## If you are an agent",
    "",
    "Read this page before any protocol. A protocol of this archive describes a",
    "practice; while it is draft it does not impose one. What the section above",
    "says still holds is what you are held to.",
    "",
  ].join("\n");

  return { route: "/binding", filename: "binding.md", sources: [...BINDING_SOURCES], body };
}

/** `/automation` — what an agent may do without asking, level by level. */
export function automationPage(): ComposedPage {
  const sources = [...AUTOMATION_SOURCES];
  const levels = table(
    ["Level", "Who does", "You", "Where you approve", "The agent does alone", "It asks"],
    LEVELS.map((l) => [l.name + (l.today ? " (Ursa today)" : ""), l.line, l.you, l.where, l.alone, l.asks]),
  );
  const matrix = table(
    ["#", "Permission", ...LEVELS.map((l) => l.name), "Undone"],
    PERMISSIONS.map((p) => [String(p.n), p.name, ...p.levels.map((g) => GRADE_LABEL[g]), p.undo]),
  );
  const body = [
    preamble(sources),
    "# What an agent may do without asking",
    "",
    "Every permission an agent asks for arrives as a line of shell. This view",
    "puts it in the approver's words: which permissions exist, what each",
    "implies, and which are granted alone at each level of automation. It states",
    "nothing of its own: the levels are the register",
    "[the levels of automation](/standards/std-041-the-levels-of-automation.md),",
    "the permissions and the floor the register",
    "[what an agent may do without asking](/standards/std-042-what-an-agent-may-do-without-asking.md),",
    "each agent's level its operator file, and how a permission is asked for",
    "[requesting approval](/protocols/pro-008-decision.md); all under",
    "[who may change what](/standards/std-017-who-may-change-what.md) and",
    "[what binds today](/binding.md).",
    "",
    "## The five levels",
    "",
    "From the least automated to the most. At every level the goals are the",
    "Oracles' and the floor does not move; a system that set its own goals is",
    "out of this map by design.",
    "",
    levels,
    "",
    "## The permissions, level by level",
    "",
    "`alone`: it does it without asking. `asks`: it stops and waits for a yes.",
    "`never`: no level grants it alone.",
    "",
    matrix,
    "",
    ...PERMISSIONS.flatMap((p) => [
      `### ${String(p.n).padStart(2, "0")} ${p.name}`,
      "",
      `- **What it lets it do:** ${p.lets}`,
      `- **What could go wrong:** ${p.wrong}`,
      `- **Undone:** ${p.undo}`,
      `- **Who grants it today:** ${p.who}`,
      `- **Risk it bounds:** ${p.risk}`,
      ...(p.floor ? [`- **Floor:** ${p.floor}`] : []),
      "",
    ]),
    "## Where each agent is today",
    "",
    "Read from the `automation_level` header of each agent's operator file.",
    "",
    ...agentMarks().map((a) => `- **${a.name}** — ${a.levelName}: ${a.note}${a.href ? ` ([card](${a.href}.md))` : ""}`),
    "",
    "## Where this comes from",
    "",
    ...SOURCES.map((s) => `- ${s.href ? `[${s.text}](${s.href})` : s.text}`),
    "",
  ].join("\n");
  return { route: "/automation", filename: "automation.md", sources, body };
}

/** `/` — the threshold. */
export function homePage(): ComposedPage {
  const n = counts();

  const body = [
    preamble([SCHEME_DOC, SERIES_DOC]),
    "# The archive",
    "",
    "This is where Numinia's source of truth lives. Everything decided, built and",
    "agreed, written down and open to read.",
    "",
    "Working in an organisation hurts: the documents live scattered, there are",
    "interests in some of them not being found, and the organisation ends up not",
    "knowing itself. Not here. What is decided, what is built and what is agreed",
    "is written down, as files, in the open.",
    "",
    "## Four questions, before you open any door",
    "",
    "**Who writes this?** Numen Games S.L., a studio in Spain building a narrative",
    "operating system for the way organisations work. We are the first organisation",
    "running on it, which makes this archive our documentation and our evidence at",
    "once: if it does not work for us, it does not work.",
    "",
    "**What is Numinia, and what is NWOS?** Two names for one thing, seen from two",
    "sides. NWOS is the machine: files in a git repository, one classification,",
    "checks that refuse a change breaking the rules. Numinia is the story that",
    "machine is told through — a city where tasks are missions, roles are",
    "characters, and the people doing the work are its citizens. The machine keeps",
    "the work honest; the story keeps it worth doing.",
    "",
    "**What state is this in?** Early, and openly so. Most of what you will read",
    "says `draft`, including the canon: written, not yet in force — it binds nobody",
    "(`STD-004`). A document is published the day it is written, not the day it is",
    "ratified, because the alternative is an archive that only shows its finished",
    "parts. So if most of it does not bind, what does? `/binding` — the standing",
    "instruction word for word, and the state of every rule, counted. What is broken",
    "is in `/debt/`; what changed is in `/updates/`; what can",
    "be counted is in `/telemetry`, measured by an instrument and never typed.",
    "",
    "**What can you do with it?** Read all of it — every page is a rendering of a",
    "real file, and every page hands you that file to copy, download or open where",
    "it lives. Take it, too: each file states its own licence, so the scheme, the",
    "standards or the whole method can be lifted into your own organisation.",
    "And if you would rather talk to us first, write to",
    "hola@numengames.com — a person answers.",
    "",
    "## Every series, in four blocks",
    "",
    "From the centre out: the rules, the work, the world, the offer — the same",
    "four blocks as the map. Every entry is a link.",
    "",
    ...RING_ORDER.flatMap((ring) => [
      `### ${RINGS[ring].name}`,
      "",
      RINGS[ring].line,
      "",
      table(["Entry", "What it is", "Address"], SEGMENTS.filter((sg) => sg.ring === ring).flatMap((sg) =>
        sg.entries.map((e) => [e.label, e.line, e.href ?? "to create"]))),
      "",
    ]),
    `${n.published} of ${n.series} series have an address on this site.`,
    "The classification in full is at \`/scheme\`.",
    "",
    "## What is not here",
    "",
    "Not everything is. There is protected matter that cannot live in the open —",
    "what is under someone else's licence, what would expose a person, what is not",
    "ours to publish. What does live here is everything that can be transparent,",
    "which is nearly all of it. Where a document is withheld, the archive says so",
    "instead of leaving a gap.",
    "",
  ].join("\n");

  return { route: "/about", filename: "about.md", sources: [SCHEME_DOC, SERIES_DOC, STATUS_DOC], body };
}

/**
 * `/` — the map: the Summa as four rings, as text. The same model the
 * astrolabe, the archive page and the wayfinder read (@/lib/summa).
 */
export function mapPage(): ComposedPage {
  const line = (e: { label: string; line: string; href: string | null; external?: string; count?: number }) =>
    e.external
      ? `- ${e.label} — ${e.line}. On ${e.external}: ${e.href}`
      : e.href
        ? `- [${e.label}](${e.href})${e.count ? ` (${e.count})` : ""} — ${e.line}.`
        : `- ${e.label} — ${e.line}. *To create.*`;
  const body = [
    preamble([SCHEME_DOC, SERIES_DOC]),
    "# The Summa",
    "",
    "The archive of Numen Games: everything we decide, build and offer, written",
    "down and open. Numinia is the story we tell it in — a city where work is a game.",
    "",
    "## What brings you here?",
    "",
    ...INTENTS.map((i) => `- ${i.label} → ${i.hint}`),
    "",
    "## The four rings, from the centre out",
    "",
    ...RING_ORDER.flatMap((ring) => [
      `### ${RINGS[ring].name}`,
      "",
      `${RINGS[ring].line} *(${RINGS[ring].classic}.)*`,
      "",
      ...SEGMENTS.filter((s) => s.ring === ring).flatMap((s) => [
        `**${s.title}**${s.district ? ` — ${DISTRICTS[s.district].place}` : ""}`,
        "",
        ...s.entries.map(line),
        "",
      ]),
    ]),
    "## Our other sites",
    "",
    "They hold no text of their own: what they show is here.",
    "",
    ...LENSES.map((l) => `- ${l.site} — ${l.who}. ${l.line}`),
    "",
    `*To create:* ${TO_CREATE}`,
    "",
    "Every series as one list: `/about`.",
    "",
  ].join("\n");
  return { route: "", filename: "home.md", sources: [SCHEME_DOC, SERIES_DOC], body };
}

/** `/archive/<function>` — one function of the fond. */
export function functionPage(slug: string): ComposedPage {
  const fn = functions().find((f) => f.slug === slug);
  if (!fn) {
    throw new Error(
      `functionPage("${slug}"): no such function in STD-027. ` +
        `A route exists for a function the scheme does not name.`,
    );
  }

  const rows = fn.activities.flatMap((act) =>
    act.series.map((s) => [
      act.name,
      `\`${s.folder}\`${s.instrument ? " *(instrument)*" : ""}`,
      s.holds || s.note || "",
      s.href ?? "not served here",
    ]),
  );

  const related = RELATIONS.filter(([a, b]) => a === slug || b === slug).map(
    ([a, b]) => `- ${a} → ${b}`,
  );

  const body = [
    preamble([SCHEME_DOC, SERIES_DOC]),
    `# ${fn.name}`,
    "",
    `A function of the fond: ${fn.activities.length} ` +
      `${fn.activities.length === 1 ? "activity" : "activities"}, and the series they produce.`,
    "",
    "## Activities and series",
    "",
    table(["Activity", "Series", "Holds", "Served at"], rows),
    "",
    ...(related.length ? ["## How it relates to the others", "", ...related, ""] : []),
  ].join("\n");

  return {
    route: `/archive/${slug}`,
    filename: `${slug}.md`,
    sources: [SCHEME_DOC, SERIES_DOC],
    body,
  };
}

/** `/<section>` — a section index: what the folder answers, and its documents. */
export async function sectionPage(slug: string): Promise<ComposedPage> {
  const section = SECTIONS.find((s) => s.slug === slug);
  if (!section) {
    throw new Error(
      `sectionPage("${slug}"): no such section in corpus.ts. ` +
        `A route exists for a folder SECTIONS does not list.`,
    );
  }

  const docs = await getSectionDocs(slug);
  const withheld = await countWithheld(slug);
  const place = allSeries().find((s) => s.folder === section.prefix);

  const rows = docs.map((d) => [d.docId ?? "", d.title, d.status ?? "", d.updated ?? "", d.href]);

  const body = [
    preamble([SERIES_DOC, SCHEME_DOC]),
    `# ${section.label}`,
    "",
    ...(place ? [`*${place.activity} — ${section.prefix}*`, ""] : []),
    section.blurb,
    "",
    `**The question it answers:** ${section.question}`,
    "",
    ...(section.rights ? [`**Rights:** ${section.rights}`, ""] : []),
    "## Documents",
    "",
    ...(docs.length
      ? [table(["Id", "Title", "Status", "Updated", "Address"], rows)]
      : [section.emptyMeans ?? "This section publishes nothing yet."]),
    "",
    ...(withheld > 0
      ? [
          `${withheld} document${withheld === 1 ? "" : "s"} in this folder ` +
            `${withheld === 1 ? "is" : "are"} withheld and not listed above.`,
          "",
        ]
      : []),
  ].join("\n");

  return {
    route: `/${slug}`,
    filename: `${slug}.md`,
    sources: [SERIES_DOC, SCHEME_DOC],
    body,
  };
}

/**
 * `/missions` and `/reports` — the two indexes whose documents live in a
 * typed collection of their own rather than in `SECTIONS`.
 *
 * They are not an exception to the rule, they are the same rule reading a
 * different shelf: the folder is a series of the scheme like any other, and
 * `placeOf` is what says so. Leaving them out would have given the archive
 * two index pages that cannot be downloaded — the two that move most.
 */
export async function collectionIndexPage(
  slug: "missions" | "reports",
): Promise<ComposedPage> {
  const folder = `${slug}/`;
  const place = allSeries().find((s) => s.folder === folder);
  if (!place) {
    throw new Error(
      `collectionIndexPage("${slug}"): STD-001 does not register \`${folder}\`. ` +
        `A page indexes a folder the series register does not know.`,
    );
  }

  const entries = await getCollection(slug);
  const rows = entries
    .map((e) => {
      const f = e.data as Record<string, unknown>;
      const id = typeof f.id === "string" ? f.id : String(e.id);
      const title = typeof f.title === "string" ? f.title : id;
      const status = typeof f.status === "string" ? f.status : "";
      const updated = typeof f.updated === "string" ? f.updated.slice(0, 10) : "";
      return [id, title, status, updated, `/${slug}/${id.toLowerCase()}`];
    })
    .sort((a, b) => a[0].localeCompare(b[0]));

  const body = [
    preamble([SERIES_DOC, SCHEME_DOC]),
    `# ${slug === "missions" ? "Missions" : "Reports"}`,
    "",
    `*${place.activity} — ${folder}*`,
    "",
    place.holds,
    "",
    "## Documents",
    "",
    rows.length
      ? table(["Id", "Title", "Status", "Updated", "Address"], rows)
      : "This section publishes nothing yet.",
    "",
  ].join("\n");

  return {
    route: `/${slug}`,
    filename: `${slug}.md`,
    sources: [SERIES_DOC, SCHEME_DOC],
    body,
  };
}

/**
 * `/agents/<id>` — one agent's front door: the roster line, and the agent's
 * own documents.
 *
 * The agent's SOUL, OPERATOR and SOURCES each have their own .md already.
 * What this view adds, and what cannot be downloaded anywhere else, is the
 * roster line — when to route work here — read from `agents/INDEX.md`.
 */
export function agentPage(id: string): ComposedPage {
  const agent = agentById(id);
  if (!agent) {
    throw new Error(
      `agentPage("${id}"): no such agent in agents/INDEX.md. ` +
        `A route exists for an agent the roster does not list.`,
    );
  }

  const body = [
    preamble([AGENTS_DOC]),
    `# ${agent.name}`,
    "",
    `*${agent.role}*`,
    "",
    `**Route here when:** ${agent.route}`,
    "",
    ...(agent.quote ? [`> ${agent.quote}`, ""] : []),
    "## Its documents",
    "",
    "An agent is constituted by four files: who it is, who governs it, where",
    "its knowledge comes from, and the state it is in. Each is a document of",
    "the corpus with its own address and its own markdown.",
    "",
    `Served at \`/agents/${agent.id}\`.`,
    "",
  ].join("\n");

  return {
    route: `/agents/${agent.id}`,
    filename: `${agent.id}.md`,
    sources: [AGENTS_DOC],
    body,
  };
}

/**
 * `/design` — the design system whole. Unlike the other views, its markdown is
 * not a table of the registers but the documents themselves, compiled: the
 * reader asked for the system in one file, and a list of links is not that.
 * `sources` opens with the register that decides which documents belong.
 */
export function designPage(): ComposedPage {
  const all = designEntries();
  const sources = [DESIGN_REGISTER, ...designDocuments(all).map((d) => d.path!).filter((p) => p !== DESIGN_REGISTER)];
  return {
    route: "/design",
    filename: "numinia-design-system.md",
    sources,
    body: preamble([DESIGN_REGISTER]) + designSystemMd(all),
  };
}

/**
 * /system/open-books — the books of Numen Games S.L., summed. The same lines
 * (@/lib/books), the same company (@/data/company) and the same loan
 * (@/data/enisa) the page draws, so the two views agree (STD-036 LED-002).
 */
export function accountPage(): ComposedPage {
  const lines = [...bookLines(), ...payrollLines().filter((l) => l.date.startsWith("2025"))];
  const lines26 = [...bookLines2026(), ...payrollLines().filter((l) => l.date >= "2026-07-01" && l.date <= "2026-09-30")];
  const eur = (n: number, d = 0) => "€" + n.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d });
  const total = lines.reduce((s, l) => s + Number(l.base), 0);
  const byCat = new Map<string, number>();
  for (const l of lines) byCat.set(l.category, (byCat.get(l.category) ?? 0) + Number(l.base));
  const cats = [...byCat.entries()].sort((a, b) => b[1] - a[1]);
  const byQ = new Map<string, number>();
  for (const l of lines) { const q = `Q${Math.floor((Number(l.date.slice(5, 7)) - 1) / 3) + 1}`; byQ.set(q, (byQ.get(q) ?? 0) + Number(l.base)); }
  let run = 0;
  const books = cashBooks();
  const recon = reconcile(books, { capital: 3000, rounds: ROUNDS.map((r) => ({ what: r.what, amount: r.amount, kind: r.kind })), loan: ENISA.principal }, { amount: CASH.amount, kind: CASH.kind, asOf: CASH.asOf });
  const fut = futures(books, { cash: CASH.amount, asOf: CASH.asOf, payrollEnds: FUTURES.payrollEnds[0], oneOff: FUTURES.oneOff, income: FUTURES.income[1], incomeFrom: FUTURES.incomeFrom });
  const label = (k: string) => (k === "simulated" ? "estimate" : k);
  const FNAME: Record<string, string> = { same: "Nothing changes", cuts: `Cuts in phases: events, studios, counsel and advisory stop from November; payroll ends at the end of October, one-off cost ${eur(FUTURES.oneOff[0])}–${eur(FUTURES.oneOff[1])}`, income: `Income arrives: ${eur(FUTURES.income[1])} a month from November` };
  const body = [
    "# The books of Numen Games S.L.",
    "",
    `Since ${COMPANY.incorporated}, the day the company was incorporated (Numinia was conceived on ${COMPANY.conceived}). Real figures: the FY2025 received-invoices book, the Q3 2026 invoices, payroll at employer cost, the Mercantile Registry and ENISA's public loan search. The 2024 invoice book and January–June 2026 invoices are not loaded yet.`,
    "",
    "## The company",
    "",
    table(["", ""], [
      ["Name", COMPANY.name],
      ["Tax ID", COMPANY.taxId],
      ["Office", COMPANY.address.join(", ")],
      ["Incorporated", COMPANY.incorporated],
      ["Share capital", eur(COMPANY.capital, 2)],
      ["Registry", COMPANY.registry],
      ["Activity", COMPANY.activity],
      ["Governed by", `${COMPANY.governedBy}: ${ORGANS.director.who}`],
      ["Emerging company", `since ${COMPANY.emerging.since}, ${COMPANY.emerging.years} years (Law 28/2022)`],
      ["Contact", COMPANY.contact],
    ]),
    "",
    "## What it spent in FY2025",
    "",
    `Net of VAT, payroll included at employer cost: **${eur(total)}**. Companies one line per invoice; people who invoice one line a month as a group, payroll one line a quarter for all staff, so nobody's pay can be read.`,
    "",
    table(["What", "FY2025", "Share"], [...cats.map(([c, v]) => [BOOK_CATEGORIES[c]?.label ?? c, eur(v), `${((v / total) * 100).toFixed(1)}%`]), ["**Total**", `**${eur(total)}**`, ""]]),
    "",
    table(["Quarter", "Net"], [...byQ.entries()].map(([q, v]) => [`${q} 2025`, eur(v)])),
    "",
    "The ledger itself: [/system/open-books.csv](/system/open-books.csv).",
    "",
    "## July–September 2026",
    "",
    `Net of VAT, payroll included: **${eur(lines26.reduce((s, l) => s + Number(l.base), 0))}**, about ${eur(lines26.reduce((s, l) => s + Number(l.base), 0) / 3)} a month. People who invoice and payroll each one line a quarter, since there are fewer than three.`,
    "",
    "## Income",
    "",
    table(["Date", "Invoice", "Sector", "Base", "Original"], saleLines().map((x) => [x.date, x.invoice, x.sector, eur(Number(x.base), 2), x.original || "—"])),
    "",
    "Each client by sector until it agrees to be named. Dollars converted at the European Central Bank's rate of each invoice's date.",
    "",
    "## Taxes",
    "",
    "Every tax figure is an estimate computed from the lines until the gestoría's filed returns are loaded. Not tax advice.",
    "",
    ...TAX_KINDS.flatMap((t) => [`- **${t.name}** (${t.spanish}; ${t.form}). ${t.plain} *For us:* ${t.ours}`]),
    "",
    "A VAT quarter ends in one of three ways:",
    "",
    ...Object.values(VAT_RESULTS).map((v) => `- **${v.label}.** ${v.plain}`),
    "",
    table(["By", "What", "Form", "Estimate"], CALENDAR.map((c) => [c.due, c.what, c.form, c.estimate])),
    "",
    "## How the capital grew",
    "",
    table(["Date", "Step", "Increase", "Capital after", "Source"], CAPITAL_STEPS.map((c) => [c.date, c.what, eur(c.increase, 2), eur((run += c.increase), 2), `[${c.borme}](${bormeUrl(c.borme)})`])),
    "",
    "Who holds which part is not in the Registry and is not published here until the partners agree.",
    "",
    "## Every registered act",
    "",
    ...ACTS.map((a) => `- **${a.date}** — ${a.title}. ${a.text} (${a.source.startsWith("BORME") ? `[${a.source}](${bormeUrl(a.source)})` : `[ENISA](${a.source})`})`),
    "",
    "## The ENISA loan",
    "",
    `A participative loan of **${eur(ENISA.principal)}** from ENISA (${ENISA.lender}), signed on ${ENISA.signed}, as published in [ENISA's public loan search](${ENISA.register}). It is debt, not equity; what it costs is the interest, a financial expense. The record: [${ENISA.record}](/operations/ops-017-the-enisa-loan).`,
    "",
    table(["Quarter", "Interest (net)"], [...ENISA.interest.map((q) => [q.quarter, eur(q.amount, 2)]), ["**2025**", `**${eur(ENISA_INTEREST_TOTAL, 2)}**`]]),
    "",
    "## Money in",
    "",
    "Each figure says its kind: real (booked or public), declared (the company's word, its document still to load), plan, or simulated.",
    "",
    table(["Date", "What", "Amount", "Kind"], [
      [COMPANY.incorporated, "Share capital at incorporation", eur(3000), "real"],
      ...ROUNDS.map((r) => [r.date, `${r.what} (nominal ${eur(r.nominal, 2)}, the rest share premium)`, `≈ ${eur(r.amount)}`, r.kind]),
      [ENISA.signed, "ENISA participative loan", eur(ENISA.principal), "real"],
      ...CLIENTS.map((c) => ["2025–2026", `Clients · ${c.sector}`, `≈ ${eur(c.amount)}`, c.kind]),
      ["", "**Together**", `**≈ ${eur(MONEY_IN_TOTAL)}**`, ""],
    ]),
    "",
    "## Where the cash comes from",
    "",
    `Cash in the bank on ${CASH.asOf}: **${eur(CASH.amount)}**, declared — the company's word until the bank statement is loaded. Money in, less what went out, less an estimate of the books not loaded yet, should leave that balance (STD-036 LED-011). Amounts include VAT where it was charged.`,
    "",
    table(["Step", "Amount", "Kind"], [
      ...recon.rows.map((r) => [r.label, (r.group === "in" ? "" : "−") + eur(r.amount), label(r.kind)]),
      ["**Cash the books expect**", `**${eur(recon.expected)}**`, "estimate"],
      [`Cash in the bank, ${CASH.asOf}`, eur(CASH.amount), "declared"],
      ["**Difference not explained**", `**${eur(recon.gap)}**`, ""],
    ]),
    "",
    recon.alert ? `**The figures do not add up yet:** ${eur(Math.abs(recon.gap))} is unexplained. It closes when the 2024 book, the January–June 2026 invoices and the bank statement are loaded.` : "The figures add up.",
    "",
    "## The next quarter, three ways",
    "",
    "Three futures from today's monthly cost, three months ahead and no further (STD-036 LED-012). All simulated; the page lets you choose the month payroll ends and the income.",
    "",
    table(["Future", ...fut[0].months.map((m) => `Cash, end ${m.month}`), "Runs out"], fut.map((f) => [FNAME[f.id], ...f.months.map((m) => eur(m.cash)), f.tomb])),
    "",
    "",
    "## Business plan",
    "",
    `*Plan, drafted ${PLAN.drafted}.* ${PLAN.vision}`,
    "",
    table(["Assumption", "Value"], [
      ["Projects a year", String(PLAN.assumptions.projectsPerYear)],
      ["Average project", eur(PLAN.assumptions.projectSize)],
      ["Hosting a world, a month", eur(PLAN.assumptions.hostingPerWorld)],
      ["Monthly cost", eur(PLAN.assumptions.monthlyCost)],
      ["Growth a year", `${PLAN.assumptions.growth * 100}%`],
    ]),
    "",
    "## Grants",
    "",
    `None: the national grants register (BDNS) lists nothing for ${COMPANY.taxId}, checked on 2026-09-30.`,
    "",
  ].join("\n");
  return { route: "/system/open-books", filename: "numen-games-open-books.md", sources: [...BOOKS_SOURCES], body: preamble([...BOOKS_SOURCES]) + body };
}

/**
 * /system/pipeline — every opportunity of every kind, the tool's own figures
 * as tables: the same records and the same tool the page reads (STD-039
 * OPP-009), so the markdown and the page agree.
 */
export function pipelinePage(): ComposedPage {
  const F = salesPipeline();
  const eur = (n: number) => "€" + Math.round(n).toLocaleString("en-GB");
  const cell = (s: string | null | undefined) => String(s ?? "").replace(/[\\|]/g, (c) => "\\" + c);
  const pays = (r: { pays: string | null; advance: number | null }) =>
    (r.pays === "advance" || r.pays === "milestones") && r.advance !== null ? `${r.pays}, ${r.advance} % before the work` : (r.pays ?? "");
  const byId = Object.fromEntries(F.records.map((r) => [r.id, r]));
  const open = F.records.filter((r) => r.open);
  const in7 = new Date(Date.parse(`${F.today}T00:00:00Z`) + 7 * 864e5).toISOString().slice(0, 10);
  const due7 = F.due.filter((d) => !d.overdue && d.date >= F.today && d.date <= in7).length;
  const adv = open.filter((r) => r.pays === "advance");
  const due = F.due.slice().sort((a, b) => Number(b.overdue) - Number(a.overdue) || a.date.localeCompare(b.date));
  const kinds = F.kinds.map((k) => k.kind);
  const step = (counts: number[], conversion: (number | null)[], i: number) => (conversion[i] === null ? String(counts[i] ?? 0) : `${counts[i]} (${conversion[i]} %)`);
  const posAt = F.steps.findIndex((s) => s.step === "positive");
  const noPositive = F.funnel.all && F.funnel.all.counts[0] > 0 && posAt >= 0 && F.funnel.all.counts[posAt] === 0;
  const STATE: Record<string, string> = { yes: "✓ yes", no: "✗ no", check: "? check" };
  const deciding = decidingRows(F.card);
  const body = [
    "# The pipeline",
    "",
    `Sales, tenders, grants, collaborations and partners, as of ${F.today}: ${F.records.length} record${F.records.length === 1 ? "" : "s"}, ${open.length} open. Nobody's name in any record; the organisation a sector until it agrees.`,
    "",
    "## Funnel",
    "",
    "How many records reached each step, ever, read from their timelines; in brackets, the share of the step before that reached it.",
    "",
    table(["Kind", ...F.steps.map((s) => STEP_LABEL[s.step] ?? s.step)], ["all", ...kinds].map((k) => {
      const f = F.funnel[k] ?? { counts: [], conversion: [] };
      return [k === "all" ? "All" : KIND_PLURAL[k as keyof typeof KIND_PLURAL], ...F.steps.map((_, i) => step(f.counts, f.conversion, i))];
    })),
    ...(noPositive ? ["", "No positive answer is on record yet: from now on every reply goes into its record's timeline."] : []),
    "",
    "## Asked / we have",
    "",
    `The requirements that decide most calls, as the card marks them: what calls usually ask, what the house holds today, and what would unlock each gap. The full card — every requirement, with sources — is [The house's card](${CARD_URL}).`,
    "",
    table(["Requirement", "Calls usually ask", "We hold", "State", "What unlocks it", "Open records at check"], deciding.map((c) => [
      c.requirement, cell(c.asks), cell(c.house), STATE[c.state] ?? c.state, cell(c.unlocks), String(c.check),
    ])),
    "",
    "## Key figures",
    "",
    table(["Figure", "Value"], [
      ["Open value", `${eur(open.reduce((a, r) => a + r.value, 0))} before tax`],
      ["Due in the next 7 days", String(due7)],
      ["Overdue", String(F.overdue.length)],
      ["Open value paid in advance", eur(adv.reduce((a, r) => a + r.value, 0))],
    ]),
    "",
    "## By kind",
    "",
    table(["Kind", "Records", "Open", "Won", "Lost", "Open value"], kinds.map((k) => {
      const b = F.byKind[k];
      return [KIND_PLURAL[k], String(b.records), String(b.open), String(b.won), String(b.lost), eur(b.openValue)];
    })),
    "",
    "## What's due",
    "",
    due.length
      ? table(["Date", "Record", "Kind", "Organisation", "Next step"], due.map((d) => [
          `${d.date}${d.overdue ? " (overdue)" : ""}`, `[${d.id}](${byId[d.id]?.url ?? recordUrl(d.id)})`, KIND_LABEL[d.kind], cell(byId[d.id]?.organisation), cell(d.action),
        ]))
      : "Nothing is open.",
    "",
    "## Every record",
    "",
    table(["Record", "Kind", "Organisation", "Stage", "Value", "Pays", "Next"], F.records.map((r) => [
      `[${r.id}](${r.url})`, KIND_LABEL[r.kind], cell(r.organisation), `${r.stage}${r.reason ? ` (${r.reason})` : ""}`,
      r.value ? eur(r.value) : "no money", cell(pays(r)), r.next ? `${r.next.date}: ${cell(r.next.action)}` : "",
    ])),
    "",
    "## Reasons lost",
    "",
    Object.keys(F.reasons).length ? table(["Reason", "Records"], Object.entries(F.reasons).map(([r, n]) => [r, String(n)])) : "Nothing lost yet.",
    "",
    "## Days per stage",
    "",
    table(["Kind", "Stage", "Average days"], kinds.flatMap((k) => Object.entries(F.daysPerStage[k] ?? {}).map(([s, d]) => [KIND_LABEL[k], s, d === null ? "" : String(d)]))),
    "",
    `A new opportunity starts from [the template](${TEMPLATE_URL}): one file per opportunity, one line per thing that happens.`,
    "",
    "The records themselves: [/opportunities/](/opportunities/). The tool that computes this: `machine/packages/sales-kit/pipeline.mjs`, run in CI on every change.",
    "",
  ].join("\n");
  return { route: "/system/pipeline", filename: "numinia-pipeline.md", sources: [...PIPELINE_SOURCES], body: preamble([...PIPELINE_SOURCES]) + body };
}


/** `/core` and each `/core/<canon>` — the core as a flow (web/src/lib/core.ts). */
const stateWord = (s: string) => (s === "active" ? "in force" : s);
function coreSources(c: CoreCanon): string[] {
  return [c, ...c.standards, ...c.protocols].map((d) => d.path);
}
function coreDocMd(d: CoreDoc, level: string): string {
  return [`${level} ${d.title}`, "", `*${stateWord(d.status)}* · ${d.question}`, "", d.reading, ""].join("\n");
}
export function corePage(): ComposedPage {
  const flow = coreFlow();
  const lines = ["# The core, as a flow", "",
    "Each canon, the standards that make it concrete, the protocols that carry it out. Every standard and protocol names its canon in its header (`derived_from`).", ""];
  for (const c of flow) {
    lines.push(`## ${c.title}`, "", `*${stateWord(c.status)}* · ${c.question}`, "", c.summary, "");
    if (c.standards.length) lines.push("Standards: " + c.standards.map((d) => `${d.title} (${stateWord(d.status)})`).join(" · "), "");
    if (c.protocols.length) lines.push("Protocols: " + c.protocols.map((d) => `${d.title} (${stateWord(d.status)})`).join(" · "), "");
  }
  return { route: "/core", filename: "core.md", sources: ["canon/", "standards/", "protocols/"], body: preamble(["canon/", "standards/", "protocols/"]) + lines.join("\n") };
}
export function coreCanonPage(slug: string): ComposedPage {
  const c = coreFlow().find((x) => x.slug === slug);
  if (!c) throw new Error(`composed-md: no canon at /core/${slug}`);
  const sources = coreSources(c);
  const parts = [`# ${c.title}`, "", `*${stateWord(c.status)}* · ${c.question}`, "", c.reading, ""];
  if (c.standards.length) { parts.push("## The standards", ""); for (const d of c.standards) parts.push(coreDocMd(d, "###")); }
  if (c.protocols.length) { parts.push("## The protocols", ""); for (const d of c.protocols) parts.push(coreDocMd(d, "###")); }
  return { route: `/core/${slug}`, filename: `core-${slug}.md`, sources, body: preamble(sources) + parts.join("\n") };
}

/**
 * Every composed page, for the routes that serve them and for the guard that
 * checks none is forgotten.
 */
/** `/templates` — every mould, and every header field of every mould. */
export function templatesPage(): ComposedPage {
  const ms = templateMoulds();
  const rows = templateMatrix(ms);
  const mark = (c: string | null) => (c === "filled" ? "●" : c === "optional" ? "○" : " ");
  const body = [
    "# Templates",
    "",
    `The ${ms.length} moulds every document of the archive is copied from, and their headers side by side. ● the mould writes the field, to be filled; ○ it offers it commented, to add when it applies; blank, it does not know it.`,
    "",
    "## The moulds",
    "",
    table(["Mould", "Makes", "Copy to", "Type"], ms.map((m) => [`\`${m.file}\``, templateMakes(m.prefix), `\`${m.destination}\``, `\`${m.type}\``])),
    "",
    "## Every header field, every mould",
    "",
    `| Field | ${ms.map((m) => m.prefix).join(" | ")} | Registered for |`,
    `|---|${ms.map(() => ":-:").join("|")}|---|`,
    ...rows.map((r) => `| \`${r.name}\` | ${r.cells.map(mark).join(" | ")} | ${r.reach === "every" ? "every document" : r.series.join(", ")} |`),
    "",
    ...ms.flatMap((m) => [
      `## ${m.prefix} — ${templateMakes(m.prefix)}`,
      "",
      `Copy to \`${m.destination}\`. Title, as the mould teaches it: *${m.titleHint}*`,
      "",
      ...m.fields.map((f) => `- \`${f.name}\`${f.kind === "optional" ? " (optional)" : ""}${f.note ? ` — ${f.note}` : ""}`),
      ...(m.outOfOrder ? ["", `Writes the common header in another order than the other moulds: ${m.outOfOrder.join(" · ")}.`] : []),
      ...(m.unoffered.length ? ["", `Registered for this series and not in the mould: ${m.unoffered.map((k) => `\`${k}\``).join(", ")}.`] : []),
      "",
      m.sections.length ? `Body: ${m.sections.join(" · ")}.` : "Body: prose, guided by the notes in the mould.",
      "",
    ]),
    "## Moulds that live elsewhere",
    "",
    ...TEMPLATES_ELSEWHERE.map((e) => `- \`${e.path}\` — ${e.makes}. ${e.why}.`),
    "",
  ].join("\n");
  return { route: "/templates", filename: "numinia-templates.md", sources: TEMPLATES_SOURCES, body: preamble(TEMPLATES_SOURCES) + body };
}

/** `/configure` — the settings of NWOS, gathered, from @/lib/configuration. */
export function configurePage(): ComposedPage {
  const sources = ["web/src/lib/configuration.ts", ...CONFIG_MOULDS.map((m) => m.file)];
  const body = [
    preamble(sources),
    "# Configure NWOS",
    "",
    CONFIG_INTRO,
    "",
    "## The four settings",
    "",
    table(["Setting", "The question", "Scale", "Where"], configSettings().map((s) => [s.label, s.question, s.scale, `[${s.href}](${s.href})`])),
    "",
    ...configSettings().flatMap((s) => [`### ${s.label}`, "", s.line, ""]),
    "## Building a new agent",
    "",
    "A new agent starts as a copy of these moulds:",
    "",
    ...CONFIG_MOULDS.map((m) => `- [${m.label}](${m.href}) — ${m.line}. \`${m.file}\``),
    "",
  ].join("\n");
  return { route: "/configure", filename: "numinia-configure.md", sources, body };
}

export async function allComposedPages(): Promise<ComposedPage[]> {
  const pages: ComposedPage[] = [mapPage(), homePage(), schemePage(), bindingPage(), automationPage(), configurePage(), designPage(), accountPage(), pipelinePage(), templatesPage(), corePage()];
  for (const c of coreFlow()) pages.push(coreCanonPage(c.slug));
  for (const fn of functions()) pages.push(functionPage(fn.slug));
  for (const s of SECTIONS) pages.push(await sectionPage(s.slug));
  pages.push(await collectionIndexPage("missions"));
  pages.push(await collectionIndexPage("reports"));
  for (const a of digitalAgents()) pages.push(agentPage(a.id));
  return pages;
}

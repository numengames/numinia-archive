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
import { getCollection } from "astro:content";
import { functions, counts, allSeries, RELATIONS } from "@/lib/classification";
import { SECTIONS, getSectionDocs, countWithheld } from "@/lib/corpus";
import { digitalAgents, agentById } from "@/lib/agents";
import { transitionRegime, lifecycle, inForce, BINDING_SOURCES } from "@/lib/binding";
import { LEVELS, PERMISSIONS, agentMarks, SOURCES, GRADE_LABEL, AUTOMATION_SOURCES } from "@/lib/automation-levels";
import { lines as accountLines, AS_OF as ACCOUNT_AS_OF, START as ACCOUNT_START, ACCOUNT_SOURCES, CATEGORY_LABEL, forecast as accountForecast, forecastYears, split as accountSplit, AMOUNTS as ACCOUNT_AMOUNTS, type Line } from "@/lib/account";
import { RINGS, RING_ORDER, DISTRICTS, SEGMENTS, LENSES, INTENTS, TO_CREATE } from "@/lib/summa";
import { coreFlow, type CoreDoc, type CoreCanon } from "@/lib/core";
import { pipeline as salesPipeline, PIPELINE_SOURCES } from "@/lib/pipeline";
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
 * /system/open-books — the ledger, summed. Consumed cost per year and concept,
 * each line spread evenly over the days it covers and cut at the ledger's last
 * day; income on its date. The same lines and the same rule the page uses in
 * the browser, so the two views agree (STD-036 LED-002).
 */
export function accountPage(): ComposedPage {
  const DAY = 864e5;
  const t = (s: string) => Date.parse(s + "T00:00:00Z");
  const t0 = t(ACCOUNT_START), t1 = t(ACCOUNT_AS_OF);
  const years = new Map<string, Record<string, number>>();
  const bump = (y: string, k: string, v: number) => {
    const r = years.get(y) ?? {};
    r[k] = (r[k] ?? 0) + v;
    years.set(y, r);
  };
  const all = accountLines();
  for (const l of all) {
    const base = Number(l.base);
    if (l.kind === "income") {
      if (t(l.date) <= t1) bump(l.date.slice(0, 4), "income", base);
      continue;
    }
    const a = Math.max(t(l.period_from), t0), b = t(l.period_to);
    const days = Math.round((b - Math.max(t(l.period_from), t0)) / DAY) + 1;
    for (let d = a; d <= Math.min(b, t1); d += DAY) {
      bump(new Date(d).toISOString().slice(0, 4), l.category, base / days);
    }
  }
  const ys = [...years.keys()].sort();
  const cats = Object.keys(CATEGORY_LABEL);
  const eur = (n: number) => (n < 0 ? "−€" : "€") + Math.round(Math.abs(n)).toLocaleString("en-GB");
  const eur2 = (n: number) => "€" + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  // Usage billed by the day is one invoice a month, so one line (the page folds it the same way).
  const folded = new Map<string, Line>();
  const docs: Line[] = [];
  for (const l of all) {
    if (t(l.date) > t1) continue;
    if (l.billing === "usage" && l.period_from === l.period_to) {
      const key = l.supplier + l.concept + l.date.slice(0, 7), x = folded.get(key);
      if (x) { x.base = String(Number(x.base) + Number(l.base)); if (l.date > x.date) { x.date = l.date; x.document = l.document; } continue; }
      const y = { ...l }; folded.set(key, y); docs.push(y); continue;
    }
    docs.push(l);
  }
  const latest = docs.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.document < b.document ? 1 : -1)).slice(0, 20);
  const cost = (r: Record<string, number>) => cats.reduce((s, k) => s + (r[k] ?? 0), 0);
  const rows = cats
    .filter((k) => ys.some((y) => (years.get(y)![k] ?? 0) > 0.5))
    .map((k) => [CATEGORY_LABEL[k], ...ys.map((y) => ((years.get(y)![k] ?? 0) > 0.5 ? eur(years.get(y)![k]) : ""))]);
  rows.push(["**Total cost**", ...ys.map((y) => `**${eur(cost(years.get(y)!))}**`)]);
  rows.push(["Came in", ...ys.map((y) => ((years.get(y)!.income ?? 0) > 0.5 ? eur(years.get(y)!.income) : ""))]);
  rows.push(["**Numen Games put in**", ...ys.map((y) => `**${eur(cost(years.get(y)!) - (years.get(y)!.income ?? 0))}**`)]);
  const body = [
    "# What Numinia costs",
    "",
    "> **Simulated figures.** No month has been closed yet; every line of the ledger is invented to show the shape. As each real month closes, its lines replace the simulated ones.",
    "",
    `Everything Numen Games spends on Numinia from ${ACCOUNT_START} to ${ACCOUNT_AS_OF}, consumed — each cost spread over the days it covers — and without VAT. Staff are one line a month for everyone together; nobody's pay is published.`,
    "",
    "## By year and concept",
    "",
    table(["Concept", ...ys], rows),
    "",
    `The ledger itself, one line per document (${all.length} lines): [/system/open-books.csv](/system/open-books.csv).`,
    "",
    "## The last lines",
    "",
    "The twenty newest lines of the ledger, without VAT; the page lists every one with filters.",
    "",
    table(["Date", "Who", "What", "Amount"], latest.map((l) => [l.date, l.supplier, l.concept + (l.headcount ? ` (${l.headcount} people)` : ""), (l.kind === "income" ? "+" : "−") + eur2(Number(l.base))])),
    "",
    "## VAT, and what each payment turns into",
    "",
    "Costs carry no VAT: the VAT on an invoice the company receives is deducted in the same quarterly return, so it passes through and is not a cost. Invoices from companies outside Spain arrive without VAT and the receiver declares it and deducts it at once (reverse charge, marked ISP in the book). Salaries carry no VAT and count at their cost to the company. A person's support is shown VAT included, as consumer law requires; of it, 21 % over the base goes to the tax authority and the card processor takes 1.5 % plus €0.25, and 0.7 % more for a repeating payment.",
    "",
    table(["A person pays", "VAT", "Processor", "Reaches Numinia"], ACCOUNT_AMOUNTS.map(accountSplit).map((r) => [eur2(r.price), eur2(r.vat), eur2(r.fee), eur2(r.net)])),
    "",
    ...forecastMd(),
  ].join("\n");
  return { route: "/system/open-books", filename: "numinia-open-books.md", sources: [...ACCOUNT_SOURCES], body: preamble([...ACCOUNT_SOURCES]) + body };
}

/**
 * /system/pipeline — every opportunity, the tool's own figures, and what
 * happened per month: the weekly, quarterly and annual report as a view. The
 * same records and the same tool the page reads (STD-039 OPP-009), so the
 * markdown and the page agree.
 */
export function pipelinePage(): ComposedPage {
  const P = salesPipeline();
  const { register: reg, records, figures: F, today } = P;
  const eur = (n: number) => "€" + Math.round(n).toLocaleString("en-GB");
  const open = records.filter((r) => !reg.closed.includes(r.state));
  const stageRows = reg.order.map((s) => `| ${s} | ${F.byStage[s].count} | ${F.byStage[s].value ? eur(F.byStage[s].value) : ""} | ${F.timePerStage[s] === null ? "—" : `${F.timePerStage[s]} d`} | ${reg.staleDays[s] === null ? "—" : `${reg.staleDays[s]} d`} |`);
  const months = new Map<string, { opened: number; forward: number; won: number; lost: number; wonValue: number }>();
  for (const r of records) for (const t of r.transitions) {
    const k = t.date.slice(0, 7), m = months.get(k) ?? { opened: 0, forward: 0, won: 0, lost: 0, wonValue: 0 };
    if (t.to === "lead") m.opened++; else if (t.to === "lost") m.lost++; else if (t.to === "won") { m.won++; m.wonValue += r.value; m.forward++; } else m.forward++;
    months.set(k, m);
  }
  const monthRows = [...months.keys()].sort().reverse().map((k) => { const m = months.get(k)!; return `| ${k} | ${m.opened} | ${m.forward} | ${m.won} | ${m.lost} | ${m.wonValue ? eur(m.wonValue) : ""} |`; });
  const body = [
    "# The pipeline",
    "",
    `Every chance to sell something, as of ${today}: ${records.length} record${records.length === 1 ? "" : "s"}, ${open.length} open worth ${eur(open.reduce((a, r) => a + r.value, 0))} before tax, ${F.won} won, ${F.lost} lost${F.winRate === null ? "" : ` (win rate ${F.winRate} %)`}${F.cycleDays === null ? "" : `, ${F.cycleDays} days from first sign to signature on average`}. Nobody's name in any record; the organisation a sector until it agrees.`,
    "",
    "## By stage",
    "",
    "| Stage | Open | Value | Average days held | Stale after |",
    "|---|---:|---:|---:|---:|",
    ...stageRows,
    "",
    "## Needs a move",
    "",
    ...(F.overdue.length || F.stale.length ? [
      ...F.overdue.map((o: { id: string; next_date: string; next_action: string }) => `- **${o.id}** — overdue since ${o.next_date}: ${o.next_action}`),
      ...F.stale.map((s: { id: string; state: string; days: number; limit: number }) => `- **${s.id}** — ${s.days} days at ${s.state}, the register allows ${s.limit}`),
    ] : ["Nothing overdue, nothing stale."]),
    "",
    "## The funnel",
    "",
    "| Stage | Reached, ever |",
    "|---|---:|",
    ...F.funnel.map((f: { stage: string; reached: number }) => `| ${f.stage} | ${f.reached} |`),
    "",
    "## By month",
    "",
    "| Month | Opened | Moved forward | Won | Lost | Value won |",
    "|---|---:|---:|---:|---:|---:|",
    ...(monthRows.length ? monthRows : ["| — | | | | | |"]),
    "",
    "## Why lost",
    "",
    ...(Object.keys(F.reasons).length ? Object.entries(F.reasons as Record<string, number>).sort((a, b) => b[1] - a[1]).map(([k, n]) => `- ${k}: ${n}`) : ["Nothing lost yet."]),
    "",
    "## Every record",
    "",
    "| Record | Organisation | Sector | Stage | Value | Opened | Closed | Reason |",
    "|---|---|---|---|---:|---|---|---|",
    ...records.slice().sort((a, b) => a.id.localeCompare(b.id)).map((r) => `| [${r.id}](/opportunities/${r.slug}) | ${r.organisation} | ${r.sector} | ${r.state} | ${eur(r.value)} | ${r.opened} | ${r.closed || ""} | ${r.reason || ""} |`),
    "",
    "The records themselves: [/opportunities/](/opportunities/). The tool that computes this: `machine/packages/sales-kit/pipeline.mjs`, run in CI on every change.",
    "",
  ].join("\n");
  return { route: "/system/pipeline", filename: "numinia-pipeline.md", sources: [...PIPELINE_SOURCES], body: preamble([...PIPELINE_SOURCES]) + body };
}

/** The forecast section of /system/open-books.md: the same computation the page draws. */
function forecastMd(): string[] {
  const f = accountForecast();
  const eur = (n: number) => (n < -0.5 ? "−€" : "€") + Math.round(Math.abs(n)).toLocaleString("en-GB");
  const ys = forecastYears(f);
  const Y = [...ys.keys()];
  const r = (label: string, fn: (e: ReturnType<typeof ys.get> & object) => number) => [label, ...Y.map((y) => { const v = fn(ys.get(y)!); return Math.abs(v) < 0.5 ? "" : eur(v); })];
  return [
    "## The next two years",
    "",
    `A forecast from ${f.from} to ${f.horizon}, with supporters and with the loan. It is not a figure of the account: it is never closed, and it changes whenever an assumption does.`,
    "",
    table(["Forecast", ...Y], [
      r("Support, without VAT", (e) => e.income),
      r("Staff costs", (e) => -e.people),
      r("Other operating expenses", (e) => -(e.cost - e.people + e.fees)),
      r("**Operating result**", (e) => e.income - e.cost - e.fees),
      r("Loan received", (e) => e.loanIn),
      r("Loan repaid", (e) => -e.loanOut),
      r("**Cash at year end**", (e) => e.cashEnd),
    ]),
    "",
    "### What it assumes",
    "",
    `Each cost starts from its run-rate in the ledger: ${f.baseline.filter((b) => b.monthly > 0.5).map((b) => `${b.label.toLowerCase()} ${eur(b.monthly)} a month (${b.window})`).join("; ")}. Cash starts at ${eur(f.cash)}.`,
    "",
    ...f.assumptions.map((a) => `- ${a.note}.`),
    "",
    "The assumptions: [/system/open-books-forecast.csv](/system/open-books-forecast.csv).",
    "",
  ];
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

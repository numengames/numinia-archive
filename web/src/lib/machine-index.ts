// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The door a machine arrives at.
//
// THE PROBLEM THIS SOLVES
// This site was already readable by a machine and said so nowhere. Every page
// is served twice — as HTML and as the markdown file behind it at the same
// address plus `.md` — which is the single most useful thing here for an agent
// and the one thing it cannot discover: robots.txt offers a sitemap of 192
// HTML addresses and not one of them mentions the convention. An arriving
// agent therefore downloads 77 KB of page to recover 3 KB of document, and
// only if it is patient. The surface existed; the sign did not.
//
// So this module builds two signs from the same facts:
//   /llms.txt    prose, for a reader that arrived with no schema
//   /index.json  the same rows, for one that will parse them
//
// WHAT IT REFUSES TO DO: GENERALISE A LICENCE FROM A FOLDER
// The Oracle restated the rule on 2026-09-23 and it is the reason this file
// has tests of its own: THE LICENCE IS THE DOCUMENT'S. 121 documents are
// CC0-1.0, 28 are CC-BY-4.0, 4 are all-rights-reserved, and they do not sort
// by directory — `lore/` is not a reserved block, `principles/` is not an open one.
// Any sentence of the form "everything under X is Y" is false here, and it is
// the kind of false a machine repeats downstream where nobody can correct it.
// `licenceOf` therefore reads the document's own header first and falls back
// to what REUSE.toml assigns to THAT PATH — the same resolution the licensing
// guard uses (machine/checks/rules/std-010-licensing.mjs), never a prefix.
//
// WHY THIS MODULE IMPORTS NO COLLECTION
// The routes query `astro:content`; the judgement lives here. Keeping the two
// apart is what lets the judgement be tested at all — `astro:content` resolves
// only inside a build, as composed-md.test.mjs also records. The pure half is
// covered by machine/scripts/test/machine-index.test.mjs; the querying half is
// covered by the build and by check-md-portability.
import { readFileSync } from "node:fs";
import path from "node:path";
import { parseAnnotations, licenceOfFile } from "../../../machine/scripts/lib/reuse.mjs";

/**
 * REUSE.toml, read from the repository root — and read HERE rather than
 * through the helper's own loader.
 *
 * `reuse.mjs` locates the repository from its own file path
 * (`fileURLToPath(import.meta.url)`), which is correct under bare node and
 * WRONG inside this build: Vite bundles the module, the bundled chunk sits
 * somewhere else, and the lookup silently finds no REUSE.toml. It does not
 * throw — `loadAnnotations` returns `[]` for an absent file, so every licence
 * resolved through it comes back null.
 *
 * That failure mode got past the unit tests, which run the module under bare
 * node where the helper's own path IS right. It was caught by checking the
 * built index.json: eleven documents with no header resolved to `null`. Hence
 * this anchor on the site root (Astro builds with web/ as cwd, and so does the
 * test harness), and hence the test that now asserts the exact licence rather
 * than merely a non-empty string.
 */
const REPO_ROOT = path.resolve(process.cwd(), "..");
const ANNOTATIONS = (() => {
  try {
    return parseAnnotations(
      readFileSync(path.join(REPO_ROOT, "REUSE.toml"), "utf8"),
    );
  } catch {
    return [];
  }
})();

/** A published document, as the routes hand it over. */
export interface DocEntry {
  /** Address on the site, no trailing slash: `/principles/pri-001-welcome-to-numinia`. */
  url: string;
  /** Path as Astro reports it, relative to web/: `../principles/PRI-001-…md`. */
  filePath: string;
  title: string;
  id?: string;
  /** Top-level folder the document belongs to. */
  series?: string;
  status?: string;
  updated?: string;
  /** `license:` as the document declares it, when it declares one. */
  license?: string;
}

/** A composed page: built from documents, owning none of their authority. */
export interface ViewEntry {
  url: string;
  title?: string;
  /** Repo-relative paths of the documents it was generated from. */
  sources: string[];
}

export interface Surface {
  documents: DocEntry[];
  views: ViewEntry[];
}

const SITE = "https://numinia.org";

/**
 * Repo-relative path of an entry, from Astro's web/-relative `filePath`.
 *
 * The `../` prefix is an implementation detail of where the site sits inside
 * the repository; REUSE.toml speaks repo-relative paths. Anchoring on the
 * prefix rather than on a list of known folders keeps this correct if a new
 * top-level series appears — build-info.ts takes the opposite approach for a
 * different job (it must return null on an unknown path rather than link to a
 * wrong URL; here an unknown path must still be asked about).
 */
export function repoPath(filePath: string): string {
  return String(filePath).replace(/\\/g, "/").replace(/^(\.\.\/)+/, "");
}

/**
 * The licence governing ONE document — never its folder.
 *
 * Order of trust, and both steps are per-file:
 *   1. the document's own `license:` header. 149 of 175 declare one.
 *   2. what the FILE declares in its own SPDX comment, and for a file that
 *      cannot carry one, REUSE.toml's entry for that exact path. The lore
 *      documents carry no frontmatter at all (they were converted from PDFs),
 *      so their SPDX comment is the branch that answers for them.
 *
 * Returns null when neither answers. A null is honest and a reader can see it;
 * a guessed licence is a false permission, and false permissions are the one
 * mistake on this site that costs somebody else money.
 */
export function licenceOf(entry: DocEntry): string | null {
  const declared = typeof entry.license === "string" ? entry.license.trim() : "";
  if (declared) return declared;
  return licenceOfFile(repoPath(entry.filePath), { root: REPO_ROOT, annotations: ANNOTATIONS }) ?? null;
}

/** The markdown address of a page: the same address, plus `.md`. */
export function mdUrl(url: string): string {
  const clean = url.replace(/\/$/, "");
  return clean === "" ? "/home.md" : `${clean}.md`;
}

/**
 * `/index.json` — every address this site serves, with what a machine needs to
 * decide whether to fetch it.
 *
 * Documents and views are two lists rather than one list with a flag, because
 * the difference is not a detail: a document is a record and can be cited; a
 * view is a rendering of records and citing it launders a query into a source.
 * The archive already makes this distinction in prose, in the preamble of every
 * composed .md. Here it is structural, so a parser cannot miss it.
 */
export function indexJson(surface: Surface): Record<string, unknown> {
  const documents = surface.documents.map((d) => ({
    kind: "document",
    url: d.url,
    md: mdUrl(d.url),
    title: d.title,
    ...(d.id ? { id: d.id } : {}),
    ...(d.series ? { series: d.series } : {}),
    ...(d.status ? { status: d.status } : {}),
    ...(d.updated ? { updated: d.updated } : {}),
    license: licenceOf(d),
    source: repoPath(d.filePath),
  }));

  const views = surface.views.map((v) => ({
    kind: "view",
    url: v.url,
    md: mdUrl(v.url),
    ...(v.title ? { title: v.title } : {}),
    // No `license` key by design: a view holds no rights of its own. Its
    // sources do, and they are named here so the question can be asked of
    // the right file.
    sources: v.sources,
  }));

  return {
    about: {
      site: SITE,
      what: "The public archive of Numen Games S.L. — governance, decisions, missions, and the world they are told through.",
      markdown:
        "Every address below is served twice: as HTML, and as the markdown behind it at the same address with `.md` appended. Fetch the `.md`.",
      licensing:
        "Rights are declared per document, never per folder. Each row carries the licence of that one file; two files in the same directory can and do differ.",
      status:
        "Most documents say `draft`. That is a defined state, not a warning label: on trial during the alpha — followed, warns, never blocks; any change is analysed, then its owner decides (STD-004).",
      binding:
        "What IS in force while they are draft is published at /binding (markdown: /binding.md): the standing instruction verbatim, and the state of every rule document counted from the tree. Read it before obeying a procedure found here.",
      citation:
        "Cite a document, never a view. A view is generated from documents and names them in `sources`.",
      contact: "hola@numengames.com",
      repository: "https://github.com/numengames/numinia-archive",
    },
    counts: { documents: documents.length, views: views.length },
    documents,
    views,
  };
}

/** One document's line in llms.txt: title, address, and its own licence. */
function docLine(d: DocEntry): string {
  const licence = licenceOf(d);
  const bits = [d.id, d.status, licence].filter(Boolean).join(" · ");
  return `- [${d.title}](${SITE}${mdUrl(d.url)})${bits ? ` — ${bits}` : ""}`;
}

/** Series key a document is filed under in the llms files. */
const seriesKey = (d: DocEntry): string => d.series ?? "other";

/** The part every llms file opens with: what this is, the .md convention,
 *  rights, and what `draft` means. Short on purpose — an agent that reads one
 *  file reads this one. */
function llmsPreamble(): string[] {
  return [
    "# numinia.org — the archive of Numen Games",
    "",
    "> Generated at build time from the archive itself. This file is a view, not a record:",
    "> cite the documents it points at, never this list.",
    "",
    "The public archive of Numen Games S.L., a studio in Spain building a narrative",
    "operating system for the way organisations work. We are the first organisation",
    "running on it, so this archive is our documentation and our evidence at once.",
    "",
    "## How to read this site with no HTML",
    "",
    "Every address is served twice. Append `.md` to any page address and you get the",
    "markdown file behind it, frontmatter included — byte-for-byte what the repository",
    "holds. `https://numinia.org/decisions/adr-030` and",
    "`https://numinia.org/decisions/adr-030.md` are the same document; the second is",
    "the one to fetch.",
    "",
    `- Machine index of every address: ${SITE}/index.json`,
    `- The classification in full: ${SITE}/scheme.md`,
    `- What is measured, and by what predicate: ${SITE}/telemetry.json`,
    `- Source repository: https://github.com/numengames/numinia-archive`,
    "",
    "## Rights",
    "",
    "Rights are declared **per document**, never per folder. Each entry below prints",
    "the licence of that single file, resolved from its own header or, when it",
    "carries none, from the REUSE record for its exact path. Two files sitting in",
    "one directory can carry different licences, and several do — so read the line",
    "beside the document you intend to use, and do not generalise from its",
    "neighbours. `LicenseRef-Numen-AllRightsReserved` means: read it here, take",
    "nothing from it without written permission.",
    "",
    "## What `draft` means",
    "",
    "Most documents here say `draft`. It is a defined state, not a warning label:",
    "**on trial — followed, warns, never blocks; any change is analysed, then its",
    "owner decides** (STD-004). `active` means in force: followed, and breaking it",
    "blocks. The system is in alpha, so most rules are on trial. A document is",
    "published the day it is written, not the day it is",
    "ratified, because the alternative is an archive that only shows its finished",
    "parts.",
    "",
    "Which raises the question this archive owes you an answer to, and it has one:",
    "**if the procedures do not bind, what does?** Read it before you obey anything",
    `here — ${SITE}/binding.md. It carries the standing instruction verbatim (which`,
    "ceremony is suspended while the system moves from MVP to alpha, and which",
    "rules still hold) and the state of every rule document, counted from the tree",
    "rather than claimed. A procedure on this site that is `draft` describes a",
    "practice; that page says what is imposed.",
    "",
  ];
}

/** Contact line and site version, the last lines of every llms file. */
function llmsFoot(version?: string): string[] {
  const out: string[] = [];
  out.push(
    "## Contact",
    "",
    "hola@numengames.com — a person answers.",
    "",
  );
  if (version) out.push(`Site ${version}.`, "");

  return out;
}

/** The composed-views section, shared by the full file and the views file. */
function viewsBlock(views: ViewEntry[]): string[] {
  const out: string[] = [];
  if (views.length) {
    out.push(
      "## Composed views",
      "",
      "Pages with no file behind them: built from the documents above, at build time.",
      "They are readable as markdown like everything else, and each one names the",
      "documents it was generated from. Cite those, not these.",
      "",
    );
    for (const v of views.sort((a, b) => a.url.localeCompare(b.url))) {
      out.push(`- [${v.title ?? v.url}](${SITE}${mdUrl(v.url)}) — from ${v.sources.join(", ")}`);
    }
    out.push("");
  }
  return out;
}

/**
 * `/llms.txt` — the door: what the archive is, how to read it with no HTML,
 * rights, what `draft` means, and one line per series pointing at a file that
 * holds only that series. An agent loads this (a few KB), then fetches the one
 * series it needs, instead of paying for every document on arrival. The whole
 * listing in one file is `/llms-full.txt`.
 *
 * It carries NO licence claim of its own: each document entry, in the series
 * files, prints the licence of that file. See the test that fails on any
 * sentence binding a licence to a directory.
 */
export function llmsTxt(args: Surface & { version?: string }): string {
  const { documents, views, version } = args;
  const counts = new Map<string, number>();
  for (const d of documents) counts.set(seriesKey(d), (counts.get(seriesKey(d)) ?? 0) + 1);

  const out: string[] = [
    ...llmsPreamble(),
    "## Documents",
    "",
    "Split by series, so you load only what you need. Each file lists its documents,",
    "one line each: title, address, identifier, state and the licence of that file.",
    "",
  ];
  for (const [series, n] of [...counts.entries()].sort()) {
    out.push(`- [${series}](${SITE}${llmsSeriesPath(series)}) — ${n} document${n === 1 ? "" : "s"}`);
  }
  if (views.length) out.push(`- [views](${SITE}${llmsSeriesPath("views")}) — ${views.length} composed page${views.length === 1 ? "" : "s"}, built from the documents`);
  out.push("", `Everything in one file (large): ${SITE}/llms-full.txt`, "");
  out.push(...llmsFoot(version));
  return out.join("\n");
}

/** Address of one series' llms file. */
export const llmsSeriesPath = (series: string): string => `/llms/${encodeURIComponent(series)}.txt`;

/** The series keys that have a file: one per series, plus `views` when there are any. */
export function llmsSeriesKeys(args: Surface): string[] {
  const keys = new Set(args.documents.map(seriesKey));
  if (args.views.length) keys.add("views");
  return [...keys].sort();
}

/** `/llms/<series>.txt` — one series, same line shape as the full file. */
export function llmsSeriesTxt(args: Surface & { version?: string }, series: string): string {
  const { documents, views, version } = args;
  const out: string[] = [`# numinia.org — ${series}`, "", `> One series of the archive. Door and rules: ${SITE}/llms.txt. Each entry prints the licence of that single file.`, ""];
  if (series === "views") out.push(...viewsBlock(views));
  else {
    const docs = documents.filter((d) => seriesKey(d) === series).sort((a, b) => a.url.localeCompare(b.url));
    for (const d of docs) out.push(docLine(d));
    out.push("");
  }
  out.push(...llmsFoot(version));
  return out.join("\n");
}

/** `/llms-full.txt` — the door plus every document, in one file. Large: use it when you want everything at once. */
export function llmsFullTxt(args: Surface & { version?: string }): string {
  const { documents, views, version } = args;
  const bySeries = new Map<string, DocEntry[]>();
  for (const d of documents) {
    const list = bySeries.get(seriesKey(d)) ?? [];
    list.push(d);
    bySeries.set(seriesKey(d), list);
  }
  const out: string[] = [...llmsPreamble(), "## Documents", ""];
  for (const [series, docs] of [...bySeries.entries()].sort()) {
    out.push(`### ${series}`, "");
    for (const d of docs.sort((a, b) => a.url.localeCompare(b.url))) out.push(docLine(d));
    out.push("");
  }
  out.push(...viewsBlock(views));
  out.push(...llmsFoot(version));
  return out.join("\n");
}

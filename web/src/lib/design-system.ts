// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The Numinia Design System, read from the archive.
//
// WHY THIS FILE EXISTS
// The design system began as one long guide (v5, a single HTML page served
// at /diseno) and was then cut into small documents so each could be read,
// argued and changed alone: the canon says why, the standards give the rules
// and the values, the protocol the order of work, the blueprints one recipe
// per medium, the kit what is installed. Cutting it made it maintainable and
// made it invisible: nobody could see the system whole, and the old guide,
// frozen in August, went on describing four registers after the canon had
// three forces.
//
// So the whole is not written again. SYS-009 lists which documents make up
// the system; this module reads that table, opens every document it names,
// and hands the page (/design), its markdown (/design.md) and the download
// (/design/numinia-design-system.zip) the same answer. Change a colour in its
// standard and the three change with it; add a row to SYS-009 and the page
// grows a card with no edit here.
//
// WHAT IS WRITTEN HERE
// Only where the site serves a path, which the archive does not state about
// itself (the same exception classification.ts makes). A row naming a file
// that does not exist fails the build: a design system that links to nothing
// is worse than a missing card.
import fs from "node:fs";
import path from "node:path";

const ARCHIVE_ROOT = path.resolve(process.cwd(), "..");
export const REGISTER = "system/SYS-009-the-design-system.md";

/** The four parts, in the order the system is read. */
export const PARTS = ["Core", "Languages", "Recipes", "Toolkit"] as const;
export type Part = (typeof PARTS)[number];

/** One row of the register. */
export interface Row {
  readonly part: Part;
  readonly chapter: string;
  /** repo-relative path, or null for a part of the system not written yet */
  readonly path: string | null;
  readonly gives: string;
}

/** A row, resolved against the tree. */
export interface Entry extends Row {
  /** a document's title, or the file or folder name for the toolkit */
  readonly title: string;
  /** a document's own one-line summary, when it states one */
  readonly summary: string | null;
  /** where a reader opens it: a page of this site, or the repository */
  readonly href: string | null;
  /** true for a markdown document compiled into the download */
  readonly document: boolean;
  /** true for a folder of the toolkit */
  readonly folder: boolean;
  /**
   * true for a document read alongside the system, not part of it: the page
   * links it, the compiled file and the download name it and do not carry it.
   * The RPG manual's chapter on adventures is three thousand lines of rules;
   * compiled whole it was more than half of "the design system". The manual
   * is downloaded on its own.
   */
  readonly linked: boolean;
}

/** The register marks a read-alongside row by how its "Gives" cell opens. */
const ALONGSIDE = /^Read alongside:\s*/;

function read(rel: string): string {
  return fs.readFileSync(path.join(ARCHIVE_ROOT, rel), "utf-8");
}

function cells(line: string): string[] | null {
  const t = line.trim();
  if (!t.startsWith("|") || !t.endsWith("|")) return null;
  return t.slice(1, -1).split("|").map((c) => c.trim());
}

const unquote = (c: string) => c.replace(/^`|`$/g, "");

/** The rows of SYS-009's register table, in order. */
export function rows(): Row[] {
  const text = read(REGISTER);
  const start = text.indexOf("## The register");
  if (start < 0) throw new Error(`${REGISTER}: no "## The register" section`);
  const out: Row[] = [];
  for (const line of text.slice(start).split("\n")) {
    if (line.startsWith("## ") && !line.startsWith("## The register")) break;
    const c = cells(line);
    if (!c || c.length !== 4 || c[0] === "Part" || /^-+$/.test(c[0])) continue;
    const part = c[0] as Part;
    if (!PARTS.includes(part)) {
      throw new Error(`${REGISTER}: unknown part "${c[0]}" — the parts are ${PARTS.join(", ")}`);
    }
    const p = c[2] === "—" ? null : unquote(c[2]);
    out.push({ part, chapter: c[1], path: p, gives: c[3] });
  }
  if (out.length === 0) throw new Error(`${REGISTER}: the register table is empty`);
  return out;
}

/** Frontmatter and the leading SPDX comment stripped; the body as a reader sees it. */
export function bodyOf(raw: string): string {
  let s = raw;
  if (s.startsWith("---")) {
    const end = s.indexOf("\n---", 3);
    if (end > 0) s = s.slice(end + 4);
  }
  s = s.trimStart();
  if (s.startsWith("<!--")) {
    const close = s.indexOf("-->");
    if (close >= 0) s = s.slice(close + 3);
  }
  return s.trim();
}

function frontmatterTitle(raw: string): string | null {
  if (!raw.startsWith("---")) return null;
  const end = raw.indexOf("\n---", 3);
  const m = /^title:\s*"?(.+?)"?\s*$/m.exec(raw.slice(0, end));
  return m ? m[1] : null;
}

/** First heading that is a title and not a chapter number. */
function headingTitle(body: string): string | null {
  for (const m of body.matchAll(/^#\s+(.+?)\s*$/gm)) {
    const h = m[1].replace(/\*\*/g, "").trim();
    if (/^(cap[ií]tulo|chapter)\s+\d+$/i.test(h)) continue;
    // Spanish chapter titles arrive in capitals from the PDF: say them once.
    return h === h.toUpperCase() ? h.charAt(0) + h.slice(1).toLowerCase() : h;
  }
  return null;
}

/** The `> **Summary:**` a document states about itself, joined into one line. */
function summaryOf(body: string): string | null {
  const lines = body.split("\n");
  const i = lines.findIndex((l) => l.startsWith("> **Summary:**"));
  if (i < 0) return null;
  const out = [lines[i].replace("> **Summary:**", "").trim()];
  for (let j = i + 1; j < lines.length; j++) {
    const l = lines[j];
    if (!l.startsWith(">") || /^>\s*\*\*/.test(l) || l.trim() === ">") break;
    out.push(l.replace(/^>\s?/, "").trim());
  }
  return out.join(" ").trim() || null;
}

/** Where this site serves a document, or null when it serves it nowhere. */
function siteHref(rel: string): string | null {
  // Mirrors the corpus collection's own exclusions (content.config.ts): the
  // manual's chapters are not published yet, and moulds and folder READMEs
  // never are. Those open in the repository instead of on a dead address.
  if (rel.startsWith("lore/game/manual/")) return null;
  if (/(^|\/)(README|INDEX|TEMPLATE)\.md$/.test(rel)) return null;
  const m = /^(canon|standards|protocols|lore|operations)\/(.+)\.md$/.exec(rel);
  if (m) return `/${m[1]}/${m[2].toLowerCase()}`;
  const b = /^blueprints\/BLU-\d+-(.+)\.md$/i.exec(rel);
  if (b) return `/blueprints/${b[1].toLowerCase()}`;
  return null;
}

export const REPO_BLOB = "https://github.com/numengames/numinia-archive/blob/main";
export const REPO_TREE = "https://github.com/numengames/numinia-archive/tree/main";

/** Every row, opened. Throws on a path the tree does not hold. */
export function entries(): Entry[] {
  return rows().map((r) => {
    if (r.path === null) {
      return { ...r, title: r.chapter, summary: null, href: null, document: false, folder: false, linked: false };
    }
    const abs = path.join(ARCHIVE_ROOT, r.path);
    if (!fs.existsSync(abs)) {
      throw new Error(`${REGISTER} names ${r.path}, which is not in the archive`);
    }
    const folder = fs.statSync(abs).isDirectory();
    const document = !folder && r.path.endsWith(".md");
    if (!document) {
      return {
        ...r,
        title: path.basename(r.path.replace(/\/$/, "")),
        summary: null,
        href: `${folder ? REPO_TREE : REPO_BLOB}/${r.path.replace(/\/$/, "")}`,
        document,
        folder,
        linked: false,
      };
    }
    const raw = read(r.path);
    const body = bodyOf(raw);
    // A header-less file (the lore, the glossary) has no title of its own
    // that reads well out of context — a mould opens with "TÍTULO DE LA
    // AVENTURA". The register's description of it does.
    const described = r.gives.replace(ALONGSIDE, "");
    return {
      ...r,
      title:
        frontmatterTitle(raw) ??
        (r.path.startsWith("lore/") ? described.charAt(0).toUpperCase() + described.slice(1) : null) ??
        headingTitle(body) ??
        path.basename(r.path, ".md"),
      summary: summaryOf(body),
      href: siteHref(r.path) ?? `${REPO_BLOB}/${r.path}`,
      document,
      folder,
      linked: ALONGSIDE.test(r.gives),
    };
  });
}

/** Rows of one part, grouped by chapter in first-seen order. */
export function chapters(all: Entry[], part: Part): { chapter: string; entries: Entry[] }[] {
  const out: { chapter: string; entries: Entry[] }[] = [];
  for (const e of all.filter((x) => x.part === part)) {
    let c = out.find((x) => x.chapter === e.chapter);
    if (!c) out.push((c = { chapter: e.chapter, entries: [] }));
    c.entries.push(e);
  }
  return out;
}

/** The documents a reader downloads, once each, in register order. */
export function documents(all: Entry[]): Entry[] {
  const seen = new Set<string>();
  return all.filter((e) => e.document && !e.linked && e.path && !seen.has(e.path) && seen.add(e.path));
}

// ---------------------------------------------------------------------------
// THE WHOLE SYSTEM AS ONE MARKDOWN FILE
// ---------------------------------------------------------------------------

/** Push every heading down `by` levels, leaving fenced code alone. */
export function shiftHeadings(md: string, by: number): string {
  let fenced = false;
  return md
    .split("\n")
    .map((l) => {
      if (/^\s*(```|~~~)/.test(l)) fenced = !fenced;
      if (fenced) return l;
      const m = /^(#{1,6})(\s.*)$/.exec(l);
      if (!m) return l;
      return "#".repeat(Math.min(6, m[1].length + by)) + m[2];
    })
    .join("\n");
}

/**
 * The quote the page opens with. His words, his name (STD-021 CIT-055); the
 * English is ours and says so.
 */
export const OPENING_QUOTE = {
  text: "Design goes beyond graphics: it is designing the experience.",
  original: "El diseño va más allá de lo gráfico, es diseñar la experiencia.",
  author: "Pablo FM",
};

export const DEFINITION =
  "Design is how a thing is experienced — seen, read, heard, moved through and played. " +
  "This system covers all of it: a logo, an invoice, a sound, a mission, a character, a world.";

/**
 * The body without its opening title lines: the compiled file already heads
 * each document with its title, and a chapter of the manual opens with two
 * (`# CAPÍTULO 7`, `# CONSTRUYENDO LA AVENTURA`).
 */
function withoutTitle(body: string): string {
  const lines = body.split("\n");
  let i = 0;
  while (i < lines.length && (lines[i].trim() === "" || /^#\s/.test(lines[i]))) i++;
  return lines.slice(i).join("\n");
}

/** The full system: every document of the register, whole, in order. */
export function compiled(all: Entry[] = entries()): string {
  const docs = documents(all);
  const out: string[] = [
    "# The Numinia Design System",
    "",
    `> ${OPENING_QUOTE.text}`,
    `> — ${OPENING_QUOTE.author} (translated from the Spanish: «${OPENING_QUOTE.original}»)`,
    "",
    DEFINITION,
    "",
    "The system lives in small documents so each can be read and changed alone. This file joins",
    `them, in the order the register \`${REGISTER}\` lists them. It is compiled at every build, so it`,
    "is never older than the documents it holds.",
    "",
    "## Contents",
    "",
  ];
  for (const part of PARTS) {
    out.push(`- **${part}**`);
    for (const { chapter, entries: es } of chapters(all, part)) {
      const names = es.map((e) => (e.path ? e.title : "*not written yet*")).join(" · ");
      out.push(`  - ${chapter}: ${names}`);
    }
  }
  out.push("");
  const missing = all.filter((e) => e.path === null);
  if (missing.length) {
    out.push("## Not written yet", "");
    for (const e of missing) out.push(`- **${e.part} · ${e.chapter}** — ${e.gives}`);
    out.push("");
  }
  for (const part of PARTS) {
    const inPart = docs.filter((d) => d.part === part);
    if (inPart.length === 0) continue;
    out.push(`## ${part}`, "");
    for (const d of inPart) {
      out.push(`### ${d.title}`, "", `*${d.chapter} · \`${d.path}\`* — ${d.gives}`, "");
      out.push(shiftHeadings(withoutTitle(bodyOf(read(d.path!))), 3), "");
    }
    const alongside = all.filter((e) => e.part === part && e.linked);
    if (alongside.length) {
      out.push("### Read alongside", "", "Linked, not carried: each is its own document.", "");
      for (const e of alongside) {
        const url = e.href!.startsWith("/") ? `https://numinia.org${e.href}` : e.href;
        out.push(`- **${e.chapter}** — ${e.title}: ${url}`);
      }
      out.push("");
    }
  }
  const tools = all.filter((e) => e.part === "Toolkit" && e.path);
  out.push("## Toolkit", "", "In the download beside this file, and in the repository:", "");
  for (const t of tools) out.push(`- **${t.chapter}** — \`${t.path}\`: ${t.gives}`);
  out.push("");
  return out.join("\n");
}

// ---------------------------------------------------------------------------
// VALUES THE PAGE DRAWS, READ FROM THE KIT
// ---------------------------------------------------------------------------

const TOKENS = "machine/packages/design-kit/sistema.tokens.json";

type Tok = { $value?: unknown; $extensions?: { numen?: Record<string, unknown> } };

export interface Swatch {
  readonly name: string;
  readonly hex: string;
  readonly note?: string;
}

function tokens(): Record<string, any> {
  return JSON.parse(read(TOKENS));
}

function swatches(group: Record<string, Tok>): Swatch[] {
  return Object.entries(group)
    .filter(([k, v]) => !k.startsWith("$") && typeof v?.$value === "string")
    .map(([k, v]) => ({
      name: k.replace(/-/g, " "),
      hex: String(v.$value),
      note: v.$extensions?.numen?.diurnoTexto as string | undefined,
    }));
}

/** The values the page shows, straight from the kit's tokens. */
export function values() {
  const t = tokens();
  const c = t.color;
  const dims = (g: Record<string, Tok>) =>
    Object.entries(g)
      .filter(([k, v]) => !k.startsWith("$") && typeof v?.$value === "string")
      .map(([k, v]) => ({ name: k, value: String(v.$value) }));
  return {
    source: TOKENS,
    brand: swatches(c.marca),
    night: swatches(c.nocturno),
    day: swatches(c.diurno),
    rarity: swatches(c.rareza),
    fonts: Object.entries(t.fontFamily as Record<string, Tok & { $description?: string }>)
      .filter(([k]) => !k.startsWith("$"))
      .map(([k, v]) => ({
        name: k,
        family: (v.$value as string[])[0],
        stack: (v.$value as string[]).join(", "),
      })),
    sizes: dims(t.fontSize),
    space: dims(t.space),
    radii: dims(t.borderRadius),
    durations: dims(t.duration),
    icons: (t.icon.subconjunto.$value as string[]).slice(),
    eras: t.epoca,
    textOnLight: swatches(c["texto-sobre-claro"]),
    data: {
      categorical: c.datos.categorica.$value as string[],
      sequential: c.datos.secuencial.$value as string[],
      divergent: c.datos.divergente.$value as string[],
    },
    pixel16: t.pixel["paleta-pixel16"].$value as string[],
    velo: {
      grid: String(t.velo.rejilla.$value),
      fog: String(t.velo.niebla.$value),
      glass: String(t.velo.cristal.$value),
      glassEdge: String(t["velo"]["cristal-borde"].$value),
      sky: t.velo.cielo.$value as { estrellas: number; pesos: number[]; alfa: number[]; radios: number[][] },
    },
    binary: { phrase: String(t.binaria.frase.$value), bits: String(t.binaria.bits.$value) },
    ease: (t.cubicBezier.ciclo.$value as number[]).join(", "),
  };
}

/** The animation catalogue, read from the design values' own table. */
export function animations(): { n: string; name: string; spec: string; where: string; retired: boolean }[] {
  const text = read("standards/STD-023-design-values.md");
  const start = text.indexOf("## 14. ");
  if (start < 0) throw new Error("STD-023: the animation catalogue (section 14) is missing");
  const end = text.indexOf("\n## ", start + 5);
  const out = [];
  for (const line of text.slice(start, end < 0 ? undefined : end).split("\n")) {
    const c = cells(line);
    if (!c || c.length < 3 || !/\d/.test(c[0])) continue;
    const n = c[0].replace(/\*/g, "");
    const [nameRaw] = c[1].split(" — ");
    const name = nameRaw.replace(/\*\*/g, "").trim();
    const spec = c[2].replace(/\*\*/g, "").replace(/`/g, "");
    const where = (c[3] ?? "").replace(/\*\*/g, "").replace(/`/g, "");
    out.push({ n, name, spec, where, retired: /RETIRED/.test(c[1]) });
  }
  if (out.length === 0) throw new Error("STD-023: the animation catalogue has no rows");
  return out;
}

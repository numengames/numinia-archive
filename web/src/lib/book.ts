// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The machine every composed book shares (/brand, /legal-playbook): a book is
// a VIEW over archive documents, and writes nothing of its own but its chapter
// titles, their one line, and which sections of which documents each chapter
// reads. The words are read from the files at build time; a section named in
// a book that a document does not have THROWS, so a renamed heading breaks
// the build instead of silently emptying a chapter.
import fs from "node:fs";
import path from "node:path";
import { readingOf } from "@/lib/core";

const ROOT = path.resolve(process.cwd(), "..");

/** A document read by a chapter: whole, some of its sections, or only its summary. */
export interface Part {
  path: string;
  /** H2 headings to read, in this order. Omitted: the whole body. */
  sections?: string[];
  /** Read only the document's Summary line. */
  summaryOnly?: boolean;
  /** Where the document is served, when it is not /<folder>/<file stem>. */
  href?: string;
}

export interface ChapterSpec {
  id: string;
  title: string;
  line: string;
  parts: Part[];
}

export interface BookPart {
  id: string;
  title: string;
  href: string;
  path: string;
  /** Markdown, headings demoted one level so they sit under the chapter. */
  markdown: string;
}
export interface BookChapter {
  id: string;
  numeral: string;
  title: string;
  line: string;
  parts: BookPart[];
}

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function field(text: string, name: string): string {
  const m = new RegExp(`^${name}:\\s*"?(.*?)"?\\s*$`, "m").exec(text.slice(0, text.indexOf("\n---", 3)));
  return m ? m[1] : "";
}

function summaryOf(text: string): string {
  const out: string[] = [];
  let on = false;
  for (const line of text.split("\n")) {
    if (!line.startsWith(">")) { if (on) break; continue; }
    const body = line.replace(/^>\s?/, "");
    const start = body.match(/^\*\*(\w+):\*\*\s*(.*)$/);
    if (start) { on = start[1] === "Summary"; if (on) out.push(start[2]); continue; }
    if (on) out.push(body.trim());
  }
  return out.join(" ").replace(/\s+/g, " ").trim();
}

/** The named H2 sections of a reading, in the order asked. Throws on a missing one. */
function pick(book: string, reading: string, sections: string[], file: string): string {
  const blocks = new Map<string, string>();
  const parts = ("\n" + reading).split(/\n(?=## )/);
  for (const p of parts) {
    const m = p.match(/^## (.*)\n/);
    if (m) blocks.set(m[1].trim(), p.trim());
  }
  return sections
    .map((s) => {
      const b = blocks.get(s);
      if (!b) throw new Error(`${book}: ${file} has no section "## ${s}"; the book reads it. Rename it there or restore the heading.`);
      return b;
    })
    .join("\n\n");
}

const demote = (md: string) => md.replace(/^(#{2,5}) /gm, "#$1 ");

/** Read every chapter of a book from its documents. */
export function composeBook(book: string, chapters: ChapterSpec[]): BookChapter[] {
  return chapters.map((c, i) => ({
    id: c.id,
    numeral: NUMERALS[i],
    title: c.title,
    line: c.line,
    parts: c.parts.map((p) => {
      const text = fs.readFileSync(path.join(ROOT, p.path), "utf8");
      // A book is public: it never reads a document the site would not publish
      // (corpus.ts isPublishable — debt/ is published only when it says so).
      const visibility = field(text, "visibility");
      if ((visibility && visibility !== "public") || (p.path.startsWith("debt/") && visibility !== "public")) {
        throw new Error(`${book}: ${p.path} is not public (visibility: ${visibility || "none"}); a book may not read it.`);
      }
      const stem = path.basename(p.path, ".md");
      const folder = p.path.split("/")[0];
      const reading = readingOf(text);
      const body = p.summaryOnly ? summaryOf(text) : p.sections ? pick(book, reading, p.sections, p.path) : reading;
      return {
        id: field(text, "id"),
        title: field(text, "title"),
        href: p.href ?? `/${folder}/${stem.toLowerCase()}`,
        path: p.path,
        markdown: demote(body),
      };
    }),
  }));
}

/** Every file a book reads, for the .md view's preamble and the tests. */
export function bookSources(chapters: ChapterSpec[]): string[] {
  return [...new Set(chapters.flatMap((c) => c.parts.map((p) => p.path)))];
}

/** The whole book as one markdown file, for its .md view. */
export function bookMarkdown(title: string, lead: string, chapters: BookChapter[], gaps: string[]): string {
  const lines = [`# ${title}`, "", lead, ""];
  for (const ch of chapters) {
    lines.push(`## ${ch.numeral}. ${ch.title}`, "", ch.line, "");
    for (const p of ch.parts) lines.push(`*From ${p.title} (${p.href}).*`, "", p.markdown, "");
  }
  if (gaps.length) lines.push("## Not written yet", "", ...gaps.map((g) => `- ${g}`), "");
  return lines.join("\n");
}

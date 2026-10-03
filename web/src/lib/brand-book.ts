// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The brand and culture book (/brand and /brand.md): who Numinia is, what it
// believes, how it looks and sounds, how it lives and where it is going.
//
// WHY THIS EXISTS
// The old brand-and-culture deck (a 167-slide PDF kept as one lore file) was
// merged into the archive block by block (the Oracle, 2026-10-03): every
// answer now lives in its own principles, standards or record. This book is the
// view that reads them in one breath, and replaces the old file.
//
// NOTHING HERE IS TYPED but the chapter titles, their one line, and which
// sections of which documents each chapter reads. The words are read from
// the files at build time; a section named here that a document does not
// have THROWS, so a renamed heading breaks the build instead of silently
// emptying a chapter.
import fs from "node:fs";
import path from "node:path";
import { readingOf } from "@/lib/core";

const ROOT = path.resolve(process.cwd(), "..");

/** A document read by a chapter: whole, some of its sections, or only its summary. */
interface Part {
  path: string;
  /** H2 headings to read, in this order. Omitted: the whole body. */
  sections?: string[];
  /** Read only the document's Summary line. */
  summaryOnly?: boolean;
}

interface ChapterSpec {
  id: string;
  title: string;
  line: string;
  parts: Part[];
}

const CHAPTERS: ChapterSpec[] = [
  {
    id: "where-we-come-from",
    title: "Where we come from",
    line: "The origin, the present era and who we are to each other.",
    parts: [{ path: "principles/PRI-014-friends-who-play-build-and-learn.md" }],
  },
  {
    id: "why-we-exist",
    title: "Why we exist",
    line: "The purpose, why it is a game, and the manifesto that closes on the epitaph.",
    parts: [{ path: "principles/PRI-002-brand-and-culture.md", sections: ["Why we exist", "Why a game", "What we believe"] }],
  },
  {
    id: "what-we-will-not-trade",
    title: "What we will not trade away",
    line: "Four values and three pillars: the terms on which we work.",
    parts: [{ path: "principles/PRI-002-brand-and-culture.md", sections: ["What we will not trade away"] }],
  },
  {
    id: "the-brand",
    title: "The brand in three words",
    line: "A personality, an emotion and a cause, at each narrative level.",
    parts: [{ path: "principles/PRI-013-a-magician-who-keeps-hope.md" }],
  },
  {
    id: "voice-and-look",
    title: "How we sound and how we look",
    line: "The voice and its three registers, the name and its symbols, the three forces of the identity.",
    parts: [
      { path: "principles/PRI-002-brand-and-culture.md", sections: ["How we sound", "The name"] },
      { path: "principles/PRI-008-visual-identity.md", sections: ["The mix: forty, forty, twenty"] },
    ],
  },
  {
    id: "how-we-live",
    title: "How we live together",
    line: "The one sentence of our ethics, how we treat each other, our rituals and how we recognise.",
    parts: [
      { path: "principles/PRI-010-leave-things-better.md", sections: ["The sentence", "Four things it applies to"] },
      { path: "standards/STD-029-community-conduct.md", summaryOnly: true },
      { path: "procedures/PRO-019-holding-a-ritual.md", sections: ["1. Purpose and trigger"] },
      { path: "principles/PRI-015-we-recognise-the-act.md" },
    ],
  },
  {
    id: "where-we-are-going",
    title: "Where we are going",
    line: "The strategy, the next milestone, and whom we speak to.",
    parts: [
      { path: "operations/OPS-020-the-strategy.md" },
      { path: "operations/OPS-011-positioning-and-market.md", sections: ["The problem and the solution", "Who it is for", "The words"] },
    ],
  },
];

/** What the book does not hold yet, said instead of filled. */
export const BRAND_GAPS: string[] = [
  "What each table recognises — the team, the citizens, the organisations that adopt the game — under the six tests of how we reward.",
  "How we speak on social networks: the old deck left the page empty, and the archive has nothing yet.",
  "The research questionnaire the brand was built from, with each question pointing to the document that answers it.",
];

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
function pick(reading: string, sections: string[], file: string): string {
  const blocks = new Map<string, string>();
  const parts = ("\n" + reading).split(/\n(?=## )/);
  for (const p of parts) {
    const m = p.match(/^## (.*)\n/);
    if (m) blocks.set(m[1].trim(), p.trim());
  }
  return sections
    .map((s) => {
      const b = blocks.get(s);
      if (!b) throw new Error(`brand-book.ts: ${file} has no section "## ${s}"; the brand book reads it. Rename it here or restore the heading.`);
      return b;
    })
    .join("\n\n");
}

const demote = (md: string) => md.replace(/^(#{2,5}) /gm, "#$1 ");

export function brandBook(): BookChapter[] {
  return CHAPTERS.map((c, i) => ({
    id: c.id,
    numeral: NUMERALS[i],
    title: c.title,
    line: c.line,
    parts: c.parts.map((p) => {
      const text = fs.readFileSync(path.join(ROOT, p.path), "utf8");
      const stem = path.basename(p.path, ".md");
      const folder = p.path.split("/")[0];
      const reading = readingOf(text);
      const body = p.summaryOnly ? summaryOf(text) : p.sections ? pick(reading, p.sections, p.path) : reading;
      return {
        id: field(text, "id"),
        title: field(text, "title"),
        href: `/${folder}/${stem.toLowerCase()}`,
        path: p.path,
        markdown: demote(body),
      };
    }),
  }));
}

/** Every file the book reads, for the .md view's preamble and the tests. */
export const BRAND_SOURCES: string[] = [...new Set(CHAPTERS.flatMap((c) => c.parts.map((p) => p.path)))];

export function brandMarkdown(): string {
  const lines = [
    "# Brand and culture",
    "",
    "Who Numinia is, what it believes, how it looks and sounds, how it lives and where it is going. Every word here is read from the archive; nothing is written for the book.",
    "",
  ];
  for (const ch of brandBook()) {
    lines.push(`## ${ch.numeral}. ${ch.title}`, "", ch.line, "");
    for (const p of ch.parts) lines.push(`*From ${p.title} (${p.href}).*`, "", p.markdown, "");
  }
  lines.push("## Not written yet", "", ...BRAND_GAPS.map((g) => `- ${g}`), "");
  return lines.join("\n");
}

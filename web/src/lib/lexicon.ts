// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The Lexicon (/lexicon): the business glossary as a book, A to Z, one page
// per letter (the Oracle, 3 October 2026).
//
// NOTHING HERE IS TYPED. Every word, definition and level name is read at
// build time from the operative vocabulary, STD-026 — the one place a word is
// defined. A page that kept its own copy of a definition would be the copy
// that drifts; change the register and the book changes.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "..");
export const LEXICON_SOURCE = "standards/STD-026-operative-vocabulary.md";
export const LEXICON_HREF = "/standards/std-026-operative-vocabulary";

export interface Term {
  term: string;
  slug: string;
  kind: string;
  /** "See X" entries carry only this. */
  is: string;
  clears: string;
  enables: string;
  /** business · mixed · Numinia, when the word changes with the dial */
  levels: [string, string, string] | null;
  also: string;
  game: string;
}
export interface Letter { letter: string; slug: string; terms: Term[] }

const cells = (l: string) => l.replace(/^\||\|$/g, "").split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, "|"));
export const slugOf = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function parseExtra(cell: string) {
  let levels: Term["levels"] = null, also = "", game = "";
  for (const part of cell.split("<br>").map((p) => p.trim()).filter(Boolean)) {
    if (part.startsWith("Also: ")) also = part.slice(6);
    else if (part.startsWith("In the game: ")) game = part.slice(13);
    else {
      const l = part.split(" · ").map((x) => x.trim());
      if (l.length === 3) levels = [l[0], l[1], l[2]];
    }
  }
  return { levels, also, game };
}

let cached: Letter[] | null = null;

/** Every letter of the register, in order, each with its terms. */
export function lexicon(): Letter[] {
  if (cached) return cached;
  const text = fs.readFileSync(path.join(ROOT, LEXICON_SOURCE), "utf8");
  const letters: Letter[] = [];
  let cur: Letter | null = null;
  for (const line of text.split("\n")) {
    const h = /^## ([A-Z])\s*$/.exec(line);
    if (h) { cur = { letter: h[1], slug: h[1].toLowerCase(), terms: [] }; letters.push(cur); continue; }
    if (!cur || !line.startsWith("| **")) continue;
    const [head, is, clears, enables, extra = ""] = cells(line);
    const m = /^\*\*(.+?)\*\*(?:\s*\*\((.+?)\)\*)?$/.exec(head);
    if (!m) throw new Error(`the Lexicon cannot read the row "${head}" in ${LEXICON_SOURCE}`);
    cur.terms.push({ term: m[1], slug: slugOf(m[1]), kind: m[2] ?? "", is, clears, enables, ...parseExtra(extra) });
  }
  if (!letters.length) throw new Error(`the Lexicon found no letters in ${LEXICON_SOURCE}`);
  cached = letters;
  return letters;
}

/** Where a term lives: its letter page and its anchor. */
export function hrefOf(term: string): string | null {
  const s = slugOf(term);
  for (const l of lexicon()) if (l.terms.some((t) => t.slug === s)) return `/lexicon/${l.slug}#${s}`;
  return null;
}

/** Inline markdown the register uses: *italic* and `code`. Escapes the rest. */
export function inline(s: string): string {
  const esc = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

export const LEXICON_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The role-playing manual as a book (/manual, the Oracle, 2026-10-05): the
// cover, its two tables of contents (one per edition) and one page per
// chapter at /manual/<file> — the Spanish and English file names differ, so
// both editions share the address space without a language segment. The text
// is the lore files themselves (lore/game/manual/es/ and en/); this module
// reads the chapter list from each edition's README, so order and titles live
// in one place.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "..");
const DIR = "lore/game/manual";

export interface ManualChapter {
  file: string;
  slug: string;
  title: string;
  href: string;
  lang: "es" | "en";
}
export interface ManualEdition {
  lang: "es" | "en";
  label: string;
  chapters: ManualChapter[];
}

function edition(lang: "es" | "en", label: string): ManualEdition {
  const readme = fs.readFileSync(path.join(ROOT, DIR, lang, "README.md"), "utf8");
  const chapters = [...readme.matchAll(/^\| `(\d\d-[a-z0-9-]+)\.md` \| ([^|]+?) \|/gm)].map((m) => ({
    file: `${DIR}/${lang}/${m[1]}.md`,
    slug: m[1],
    title: m[2].trim(),
    href: `/manual/${m[1]}`,
    lang,
  }));
  for (const c of chapters) {
    if (!fs.existsSync(path.join(ROOT, c.file))) throw new Error(`manual.ts: ${c.file} is in the README of ${lang} but not in the tree.`);
  }
  if (chapters.length === 0) throw new Error(`manual.ts: no chapters read from ${DIR}/${lang}/README.md`);
  return { lang, label, chapters };
}

export function manualEditions(): ManualEdition[] {
  return [edition("es", "Español — the original"), edition("en", "English — the translation")];
}

/** Every chapter of both editions, with its neighbours in its own edition. */
export function manualChapters(): (ManualChapter & { prev?: ManualChapter; next?: ManualChapter; edition: string })[] {
  return manualEditions().flatMap((e) =>
    e.chapters.map((c, i) => ({ ...c, edition: e.label, prev: e.chapters[i - 1], next: e.chapters[i + 1] })),
  );
}

/** A chapter's text: the file without its licence comment. */
export function chapterMarkdown(c: ManualChapter): string {
  return fs.readFileSync(path.join(ROOT, c.file), "utf8").replace(/^<!--[\s\S]*?-->\s*/, "");
}

export const MANUAL_SOURCES = [`${DIR}/es/README.md`, `${DIR}/en/README.md`];

/** What the book does not hold yet, said instead of filled. */
export const MANUAL_GAPS = [
  "Four illustrations of chapter 2 (the Oracles at Tuna el-Gebel, the first Khepris, the gearwork of the athanor, a sum of the name): they were in the printed manual and never reached the archive. The text says where each one goes.",
];

export function manualMarkdown(): string {
  const lines = [
    "# Numinia — the role-playing game",
    "",
    "The tabletop role-playing game of Numinia (v0.6.0), chapter by chapter, in the Spanish original and the English edition. Public domain (CC0 1.0): copy it, adapt it, play it.",
    "",
  ];
  for (const e of manualEditions()) {
    lines.push(`## ${e.label}`, "", ...e.chapters.map((c) => `- [${c.title}](${c.href})`), "");
  }
  lines.push("## Not written yet", "", ...MANUAL_GAPS.map((g) => `- ${g}`), "");
  return lines.join("\n");
}

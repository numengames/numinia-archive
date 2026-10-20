// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The guild handbook (/guild-handbook and /guild-handbook.md): how someone
// joins, what each role may do, and how they leave (the Oracle, 2026-10-20).
//
// WHY THIS EXISTS
// summa.ts listed this book as pending since 2026-09-27: its documents
// existed (PRI-004, PRO-015, PRO-024, STD-017, STD-042) but nothing gathered
// them. They stay in their own shelves — a principle, two procedures, two
// standards — this book only reads them, in the order a newcomer lives them:
// how they join, what a guild and a role are, who may change what, what an
// agent may do without asking, and how they leave.
//
// Nothing here is typed but the chapter titles, their one line, and which
// sections of which documents each chapter reads (web/src/lib/book.ts reads
// them, and throws on a missing heading).
import { composeBook, bookSources, bookMarkdown, type ChapterSpec, type BookChapter } from "@/lib/book";

const CHAPTERS: ChapterSpec[] = [
  {
    id: "how-someone-joins",
    title: "How someone joins",
    line: "Nobody starts before the agreement is signed: the trigger, the preconditions and the steps of bringing a person into Numinia.",
    parts: [
      { path: "procedures/PRO-015-joining.md", sections: ["1. Purpose and trigger", "2. Preconditions", "3. Procedure"] },
    ],
  },
  {
    id: "what-a-guild-is",
    title: "What a guild and a role are",
    line: "A guild is what you know, a faction is where you apply it, and a role is what appears where they cross.",
    parts: [
      { path: "principles/PRI-004-role-structure.md", sections: ["A guild is what you know", "A faction is where you apply it", "A role is what appears where they cross"] },
    ],
  },
  {
    id: "who-may-change-what",
    title: "Who may change what",
    line: "Every registered document names who may change it; this is the rule that decides.",
    parts: [
      { path: "standards/STD-017-who-may-change-what.md", sections: ["Rules", "Why"] },
    ],
  },
  {
    id: "what-an-agent-may-do",
    title: "What an agent may do without asking",
    line: "The permissions an agent carries by default, what each one is, and the floor nobody goes under.",
    parts: [
      { path: "standards/STD-042-what-an-agent-may-do-without-asking.md", sections: ["The permissions", "What each permission is", "The floor"] },
    ],
  },
  {
    id: "how-someone-leaves",
    title: "How someone leaves",
    line: "Nobody is gone before their access list is closed: the trigger, the preconditions and the steps of letting a person go.",
    parts: [
      { path: "procedures/PRO-024-leaving.md", sections: ["1. Purpose and trigger", "2. Preconditions", "3. Procedure"] },
    ],
  },
];

/** What the book does not hold yet, said instead of filled. */
export const GUILD_GAPS: string[] = [
  "The engineering handbook (STD-015, STD-022, PRO-011, PRO-016, PRO-018, PRO-034) is the other book still pending on the shelf; this one does not read its documents.",
];

export function guildBook(): BookChapter[] {
  return composeBook("guild-book.ts", CHAPTERS);
}

/** Every file the book reads, for the .md view's preamble and the tests. */
export const GUILD_SOURCES: string[] = bookSources(CHAPTERS);

export function guildMarkdown(): string {
  return bookMarkdown(
    "The guild handbook",
    "How someone joins, what each role may do, and how they leave. Every word here is read from the archive; nothing is written for the book.",
    guildBook(),
    GUILD_GAPS,
  );
}

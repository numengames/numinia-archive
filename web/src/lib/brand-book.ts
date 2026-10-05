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
// NOTHING HERE IS TYPED (web/src/lib/book.ts does the reading) but the chapter titles, their one line, and which
// sections of which documents each chapter reads. The words are read from
// the files at build time; a section named here that a document does not
// have THROWS, so a renamed heading breaks the build instead of silently
// emptying a chapter.
import { composeBook, bookSources, bookMarkdown, type ChapterSpec, type BookChapter } from "@/lib/book";

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

export type { BookChapter };

export function brandBook(): BookChapter[] {
  return composeBook("brand-book.ts", CHAPTERS);
}

/** Every file the book reads, for the .md view's preamble and the tests. */
export const BRAND_SOURCES: string[] = bookSources(CHAPTERS);

export function brandMarkdown(): string {
  return bookMarkdown(
    "Brand and culture",
    "Who Numinia is, what it believes, how it looks and sounds, how it lives and where it is going. Every word here is read from the archive; nothing is written for the book.",
    brandBook(),
    BRAND_GAPS,
  );
}

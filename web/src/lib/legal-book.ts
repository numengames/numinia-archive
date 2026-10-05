// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The legal playbook (/legal-playbook and /legal-playbook.md): what the law
// asks of us, gathered in one place (the Oracle, 2026-10-05).
//
// WHY THIS EXISTS
// The rules the law asks for were scattered: two principles, four standards,
// three procedures, the four published legal texts and a design of what is
// still to confirm. The debt that holds the questions for counsel (DBT-022) is
// restricted, so the book names it only as a gap (book.ts refuses to read a
// document that is not public). Each keeps
// its home; this book reads them in order — what we hold to, the rules, what
// to do when something happens, what we publish, what is still open.
//
// Nothing here is typed but the chapter titles, their one line, and which
// sections of which documents each chapter reads (web/src/lib/book.ts reads
// them, and throws on a missing heading).
import { composeBook, bookSources, bookMarkdown, type ChapterSpec, type BookChapter } from "@/lib/book";

const STANDARD = ["Rules", "Why"];

const CHAPTERS: ChapterSpec[] = [
  {
    id: "what-we-hold-to",
    title: "What we hold to",
    line: "Two principles under every legal text: opening is an act, and what is yours stays with you.",
    parts: [
      { path: "principles/PRI-005-licensing.md" },
      { path: "principles/PRI-012-what-is-yours-stays-with-you.md" },
    ],
  },
  {
    id: "the-rules",
    title: "The rules we keep",
    line: "Personal data, licences, the two acts that cannot be undone, and how we treat each other in the commons.",
    parts: [
      { path: "standards/STD-035-personal-data.md", sections: STANDARD },
      { path: "standards/STD-010-licensing.md", sections: STANDARD },
      { path: "standards/STD-014-publishing-gates.md", sections: STANDARD },
      { path: "standards/STD-029-community-conduct.md", sections: STANDARD },
    ],
  },
  {
    id: "when-something-happens",
    title: "When something happens",
    line: "A data breach, a person asking about their data, a site that starts storing something new: step by step.",
    parts: [
      { path: "procedures/PRO-025-handling-a-personal-data-breach.md" },
      { path: "procedures/PRO-026-answering-a-request-about-personal-data.md" },
      { path: "procedures/PRO-027-changing-what-a-site-stores.md" },
    ],
  },
  {
    id: "what-we-publish",
    title: "What we publish",
    line: "The four texts every site carries: privacy, terms, cookies and the legal notice.",
    parts: [
      { path: "legal/LEG-001-privacy-policy-numengames.md" },
      { path: "legal/LEG-002-terms-and-conditions-numengames.md" },
      { path: "legal/LEG-003-cookie-policy-numengames.md" },
      { path: "legal/LEG-004-legal-notice-numengames.md" },
    ],
  },
  {
    id: "still-open",
    title: "What is still open",
    line: "What the law likely asks of a company like ours and we have not confirmed yet.",
    parts: [
      { path: "designs/DES-017-legal-obligations-to-confirm.md", sections: ["The gap"], href: "/designs/legal-obligations-to-confirm" },
    ],
  },
];

/** What the book does not hold yet, said instead of filled. */
export const LEGAL_GAPS: string[] = [
  "The gaps between what the sites do and what their legal texts say, and the questions only a lawyer can answer: they are kept in a working list for the Oracle and counsel, not published, so no reader mistakes an open question for a commitment.",
  "The twelve obligations of DES-017 confirmed one by one, each turned into a rule or struck off.",
];

export function legalBook(): BookChapter[] {
  return composeBook("legal-book.ts", CHAPTERS);
}

/** Every file the book reads, for the .md view's preamble and the tests. */
export const LEGAL_SOURCES: string[] = bookSources(CHAPTERS);

export function legalMarkdown(): string {
  return bookMarkdown(
    "The legal playbook",
    "What the law asks of Numen Games, gathered in one place: what we hold to, the rules we keep, what to do when something happens, what we publish and what is still open. Every word here is read from the archive; nothing is written for the book.",
    legalBook(),
    LEGAL_GAPS,
  );
}

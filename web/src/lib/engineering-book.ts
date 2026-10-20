// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The engineering handbook (/engineering-handbook and
// /engineering-handbook.md): how the machine is built, checked, secured
// and published (the Oracle, 2026-10-20).
//
// WHY THIS EXISTS
// summa.ts listed this book as pending since 2026-09-27: its documents
// existed (STD-015, STD-022, PRO-011, PRO-016, PRO-018, PRO-034) but
// nothing gathered them. They stay in their own shelves — two standards,
// four procedures — this book only reads them, in the order an agent
// meets them: what every repository checks, how secrets are kept out,
// how identity and secrets are audited, how an agent applies the
// standard to its own task, how a repository is published, and how a
// site's own code is audited once it is live.
//
// Nothing here is typed but the chapter titles, their one line, and which
// sections of which documents each chapter reads (web/src/lib/book.ts reads
// them, and throws on a missing heading).
import { composeBook, bookSources, bookMarkdown, type ChapterSpec, type BookChapter } from "@/lib/book";

const CHAPTERS: ChapterSpec[] = [
  {
    id: "what-we-check",
    title: "What we check",
    line: "The practices every repository of ours keeps, grouped by what they protect, each with its level and its check.",
    parts: [
      { path: "standards/STD-015-engineering-checks.md" },
    ],
  },
  {
    id: "secrets",
    title: "Secrets",
    line: "No password, key or token goes into the archive; programs read them where they run.",
    parts: [
      { path: "standards/STD-022-secrets.md", sections: ["Rules", "Why"] },
    ],
  },
  {
    id: "auditing-identity",
    title: "Auditing identity, authorization and secrets",
    line: "How an agent measures the distance between what the documentation claims and what exists, and where it stops.",
    parts: [
      { path: "procedures/PRO-011-security-audit.md", sections: ["1. Purpose and trigger", "2. Preconditions", "3. Procedure"] },
    ],
  },
  {
    id: "applying-the-standard",
    title: "Applying the engineering standard",
    line: "The order a coding agent follows on any task, and the line between what it does alone and what waits for the Oracle.",
    parts: [
      { path: "procedures/PRO-016-applying-the-engineering-standard.md", sections: ["1. Purpose and trigger", "2. Preconditions", "3. Procedure"] },
    ],
  },
  {
    id: "publishing-a-repository",
    title: "Publishing a repository",
    line: "How an agent takes a repository from private to public, or a work to a permanent store: what is prepared, and who presses the button.",
    parts: [
      { path: "procedures/PRO-018-publishing-a-repository.md", sections: ["1. Purpose and trigger", "2. Preconditions", "3. Procedure"] },
    ],
  },
  {
    id: "auditing-a-sites-code",
    title: "Auditing a site's code",
    line: "How an agent checks what a site's own code exposes — its routes, what it lets a browser run, what it depends on — and where it stops.",
    parts: [
      { path: "procedures/PRO-034-auditing-a-sites-code.md", sections: ["1. Purpose and trigger", "2. Preconditions", "3. Procedure"] },
    ],
  },
];

/** What the book does not hold yet, said instead of filled. */
export const ENGINEERING_GAPS: string[] = [];

export function engineeringBook(): BookChapter[] {
  return composeBook("engineering-book.ts", CHAPTERS);
}

/** Every file the book reads, for the .md view's preamble and the tests. */
export const ENGINEERING_SOURCES: string[] = bookSources(CHAPTERS);

export function engineeringMarkdown(): string {
  return bookMarkdown(
    "The engineering handbook",
    "How the machine is built, checked, secured and published: what every repository checks, how secrets are kept out, how identity and secrets are audited, how an agent applies the standard, how a repository is published, and how a site's own code is audited. Every word here is read from the archive; nothing is written for the book.",
    engineeringBook(),
    ENGINEERING_GAPS,
  );
}

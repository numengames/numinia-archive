// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The real books behind /system/open-books: FY2025 from the company's
// received-invoices book, one line per invoice (src/data/ledger-2025.csv).
//
// Nobody's pay can be read here. Freelancers and lawyers who invoice in
// their own name enter as ONE line a month each group, with a headcount
// (STD-036 LED-006, DBT-022 §1.7); companies enter by name, one line per
// invoice. machine/scripts/test/open-books.test.mjs holds both rules and
// the total to the book's.
//
// Years before 2025 (the company was born on 16 Feb 2024) and 2026 are not
// loaded yet; the page draws them as empty, never as zero.
import raw from "@/data/ledger-2025.csv?raw";

export const BOOKS_CSV = raw;

export interface BookLine {
  document: string;
  date: string;
  period_from: string;
  period_to: string;
  category: string;
  supplier: string;
  concept: string;
  account: string;
  base: string;
  vat: string;
  billing: string;
  headcount: string;
}

export function bookLines(): BookLine[] {
  const [head, ...body] = raw.trim().split("\n");
  const cols = head.split(";");
  return body.map((l) => Object.fromEntries(l.split(";").map((v, i) => [cols[i], v])) as unknown as BookLine);
}

/** Categories in the order the page stacks them, with their data colour. */
export const BOOK_CATEGORIES: Record<string, { label: string; color: string }> = {
  people: { label: "People", color: "#6c8cff" },
  counsel: { label: "Legal counsel", color: "#e0746c" },
  studios: { label: "External studios", color: "#a77be0" },
  events: { label: "Events and travel", color: "#e08bb9" },
  finance: { label: "Loan interest", color: "#5D9BD6" },
  cloud: { label: "Cloud and servers", color: "#4cb89a" },
  ai: { label: "Artificial intelligence", color: "#A6DAD5" },
  software: { label: "Software and licences", color: "#8FC46B" },
  advisory: { label: "Gestoría, registry, associations", color: "#c9a27a" },
  hardware: { label: "Hardware", color: "#EFA517" },
};

/** The years the books cover or will cover, from the company's birth. */
export const BOOK_YEARS = [
  { year: "2024", from: "2024-02-16", loaded: false },
  { year: "2025", from: "2025-01-01", loaded: true },
  { year: "2026", from: "2026-01-01", loaded: false },
] as const;

export const BOOKS_SOURCES = [
  "system/SYS-008-the-account.md",
  "system/SYS-012-suppliers.md",
  "operations/OPS-017-the-enisa-loan.md",
  "web/src/data/money.ts",
  "web/src/data/payroll.csv",
  "standards/STD-036-one-account.md",
  "debt/DBT-022-legal-debts-and-questions-for-counsel.md",
] as const;

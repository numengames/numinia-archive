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
// FY2024 (the company was born on 16 Feb 2024) is not loaded yet, and of
// FY2026 only the third quarter is (src/data/ledger-2026.csv, where people
// enter as one block a quarter); the page draws the rest as empty, never as
// zero. Payroll is its own file (src/data/payroll.csv), one line a quarter
// for all staff, at employer cost; payrollLines() turns it into ledger lines
// so every view counts it. The issued invoices are src/data/sales.csv.
import raw from "@/data/ledger-2025.csv?raw";
import raw2026 from "@/data/ledger-2026.csv?raw";
import payrollRaw from "@/data/payroll.csv?raw";
import salesRaw from "@/data/sales.csv?raw";
import { readBooks, type Books } from "@/lib/cash";

export const BOOKS_CSV = raw;

/** The four books together, for the cash reconciliation and the futures (@/lib/cash). */
export function cashBooks(): Books {
  return readBooks(raw, raw2026, payrollRaw, salesRaw);
}
export const BOOKS_2026_CSV = raw2026;
export const PAYROLL_CSV = payrollRaw;
export const SALES_CSV = salesRaw;

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

function parse<T>(text: string): T[] {
  const [head, ...body] = text.trim().split("\n");
  const cols = head.split(";");
  return body.map((l) => Object.fromEntries(l.split(";").map((v, i) => [cols[i], v])) as unknown as T);
}

/** The FY2025 received-invoices book. */
export function bookLines(): BookLine[] {
  return parse<BookLine>(raw);
}

/** The FY2026 received-invoices book: the third quarter so far. */
export function bookLines2026(): (BookLine & { withholding: string; kind: string })[] {
  return parse(raw2026);
}

export interface PayrollQuarter {
  quarter: string;
  headcount: string;
  employer_cost: string;
  social_security: string;
  income_tax: string;
  kind: string;
}

export function payrollQuarters(): PayrollQuarter[] {
  return parse<PayrollQuarter>(payrollRaw);
}

const QSTART = ["01-01", "04-01", "07-01", "10-01"], QEND = ["03-31", "06-30", "09-30", "12-31"];

/** Payroll as ledger lines: one a quarter, all staff, at employer cost. */
export function payrollLines(): BookLine[] {
  return payrollQuarters().map((p) => {
    const [y, q] = p.quarter.split("-Q"), i = Number(q) - 1;
    return { document: `PAYROLL-${p.quarter}`, date: `${y}-${QEND[i]}`, period_from: `${y}-${QSTART[i]}`, period_to: `${y}-${QEND[i]}`, category: "payroll", supplier: "Payroll, all staff", concept: "Salaries and social security, at employer cost", account: "640", base: p.employer_cost, vat: "", billing: "quarter", headcount: p.headcount };
  });
}

export interface SaleLine {
  date: string;
  invoice: string;
  sector: string;
  concept: string;
  base: string;
  vat: string;
  original: string;
  fx: string;
  kind: string;
}

/** The issued-invoices book, by sector until each client agrees to be named. */
export function saleLines(): SaleLine[] {
  return parse<SaleLine>(salesRaw);
}

/** Categories in the order the page stacks them, with their data colour. */
export const BOOK_CATEGORIES: Record<string, { label: string; color: string }> = {
  payroll: { label: "Payroll", color: "#3f63d9" },
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
  { year: "2026", from: "2026-01-01", loaded: true },
] as const;

export const BOOKS_SOURCES = [
  "system/SYS-008-the-account.md",
  "system/SYS-012-suppliers.md",
  "operations/OPS-017-the-enisa-loan.md",
  "web/src/data/ledger-2026.csv",
  "web/src/data/sales.csv",
  "web/src/data/tax.ts",
  "web/src/data/money.ts",
  "web/src/data/payroll.csv",
  "standards/STD-036-one-account.md",
  "debt/DBT-022-legal-debts-and-questions-for-counsel.md",
] as const;

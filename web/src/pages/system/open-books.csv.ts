// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The ledger behind /system/open-books, served as it is: FY2025 from the
// received-invoices book, semicolon-separated (STD-036 LED-001). Companies one
// line per invoice; people and counsel one line a month each group, with a
// headcount (LED-006).
import type { APIRoute } from "astro";
import { BOOKS_CSV } from "@/lib/books";

export const GET: APIRoute = () =>
  new Response(BOOKS_CSV, {
    headers: { "Content-Type": "text/csv; charset=utf-8" },
  });

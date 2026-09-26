// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The ledger behind /system/open-books, served as it is: one line per document,
// semicolon-separated (STD-036 LED-001). Simulated until the first month
// closes (PRO-021).
import type { APIRoute } from "astro";
import { ACCOUNT_CSV } from "@/lib/account";

export const GET: APIRoute = () =>
  new Response(ACCOUNT_CSV, {
    headers: { "Content-Type": "text/csv; charset=utf-8" },
  });

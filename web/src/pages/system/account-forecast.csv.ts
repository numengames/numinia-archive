// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The forecast's assumptions behind /system/account, one line each, served as
// they are. Simulated, like the ledger they start from.
import type { APIRoute } from "astro";
import { FORECAST_CSV } from "@/lib/account";

export const GET: APIRoute = () =>
  new Response(FORECAST_CSV, {
    headers: { "Content-Type": "text/csv; charset=utf-8" },
  });

// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// /telemetry.json — the measured dataset, served as it was written.
//
// machine/telemetry/latest.json is produced by machine/scripts/telemetry.mjs
// and is the only place in this repository where a figure is stated. The page
// at /telemetry renders it and the file at /telemetry.md tabulates it; both
// are for a reader with eyes. This serves the dataset itself, unchanged, so a
// machine can read the figures rather than parse a table of them.
//
// No reshaping and no subsetting on purpose: the moment this endpoint decides
// which figures matter, it becomes a second instrument with a second opinion,
// and the archive's rule is that there is exactly one (STD-001 §10.5).
import type { APIRoute } from "astro";
import latest from "../../../machine/telemetry/latest.json";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(latest, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

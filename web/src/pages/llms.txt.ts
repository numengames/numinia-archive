// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// /llms.txt — the sign on a door that was already open.
//
// An agent arriving here reads robots.txt, finds a sitemap of HTML addresses,
// and has no way to learn the one fact that matters: every one of those
// addresses also serves the markdown behind it. This file says so, in the
// first screen, and then lists the corpus with each document's own licence
// beside it.
import type { APIRoute } from "astro";
import { llmsTxt } from "@/lib/machine-index";
import { surface } from "@/lib/machine-surface";
import { VERSION } from "@/lib/build-info";

export const GET: APIRoute = async () => {
  const body = llmsTxt({ ...(await surface()), version: VERSION });
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

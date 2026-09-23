// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// /index.json — every address this site serves, as data.
//
// The sitemap lists addresses and nothing else. This adds what a machine needs
// in order to decide whether to fetch one: the markdown address, the title,
// the state, the licence OF THAT FILE, and whether it is a record or a view of
// records. See @/lib/machine-index for why the licence is never folder-shaped.
import type { APIRoute } from "astro";
import { indexJson } from "@/lib/machine-index";
import { surface } from "@/lib/machine-surface";

export const GET: APIRoute = async () => {
  const body = JSON.stringify(indexJson(await surface()), null, 2);
  return new Response(body, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};

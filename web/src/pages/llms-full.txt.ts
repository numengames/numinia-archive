// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// /llms-full.txt — the door and every document in one file. Large on purpose:
// /llms.txt is the short door and /llms/<series>.txt the slices; this is for a
// reader that wants everything in a single fetch.
import type { APIRoute } from "astro";
import { llmsFullTxt } from "@/lib/machine-index";
import { surface } from "@/lib/machine-surface";
import { VERSION } from "@/lib/build-info";

export const GET: APIRoute = async () => {
  const body = llmsFullTxt({ ...(await surface()), version: VERSION });
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

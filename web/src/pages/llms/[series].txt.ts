// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// /llms/<series>.txt — one series of the archive, one line per document.
// /llms.txt links to each; an agent fetches only the series it needs.
import type { APIRoute, GetStaticPaths } from "astro";
import { llmsSeriesKeys, llmsSeriesTxt } from "@/lib/machine-index";
import { surface } from "@/lib/machine-surface";
import { VERSION } from "@/lib/build-info";

export const getStaticPaths: GetStaticPaths = async () =>
  llmsSeriesKeys(await surface()).map((series) => ({ params: { series } }));

export const GET: APIRoute = async ({ params }) => {
  const body = llmsSeriesTxt({ ...(await surface()), version: VERSION }, String(params.series));
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

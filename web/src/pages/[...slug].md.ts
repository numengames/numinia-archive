// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
// Raw-markdown static endpoint: serves each corpus document's canonical
// .md file (frontmatter included) at /<path>.md for copy/download.
import fs from "node:fs";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getPublicCorpus } from "@/lib/corpus";

export async function getStaticPaths() {
  const entries = await getPublicCorpus();
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: { filePath: entry.filePath as string },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const raw = fs.readFileSync(props.filePath as string, "utf-8");
  return new Response(raw, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};

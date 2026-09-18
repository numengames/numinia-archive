// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
// Raw-markdown static endpoint: serves each legal document's canonical
// .md file (frontmatter included) at /legal/<slug>.md for copy/download.
import fs from "node:fs";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

const SLUGS: Record<string, string> = {
  terms: "ops-004-terms-and-conditions-numengames",
  privacy: "ops-003-privacy-policy-numengames",
  cookies: "ops-010-cookie-policy-numengames",
};

export async function getStaticPaths() {
  const paths = [];
  for (const [slug, id] of Object.entries(SLUGS)) {
    const entry = await getEntry("legal", id);
    if (!entry) throw new Error(`Legal entry not found: ${id}`);
    paths.push({ params: { slug }, props: { filePath: entry.filePath as string } });
  }
  return paths;
}

export const GET: APIRoute = ({ props }) => {
  const raw = fs.readFileSync(props.filePath as string, "utf-8");
  return new Response(raw, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};

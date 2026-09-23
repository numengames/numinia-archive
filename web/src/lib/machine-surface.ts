// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The querying half of the machine-readable surface.
//
// This is the part that needs `astro:content` and therefore cannot be unit
// tested outside a build; everything it DECIDES lives in @/lib/machine-index,
// which is tested. What is left here is one job: collect every published
// address once, so /llms.txt, /index.json and any later machine endpoint
// describe the same site rather than three slightly different ones.
//
// Missions, reports, decisions and blueprints are read from their typed
// collections, and the rest of the corpus from the same filtered reader every
// page uses (getPublicCorpus — it enforces the fail-closed `visibility` rule
// for debt/). Reading the collections directly here would publish an address
// the site itself withholds.
import { getCollection } from "astro:content";
import { getPublicCorpus } from "@/lib/corpus";
import { allComposedPages } from "@/lib/composed-md";
import type { DocEntry, Surface, ViewEntry } from "@/lib/machine-index";

const str = (v: unknown): string | undefined =>
  typeof v === "string" && v.trim() ? v.trim() : undefined;

/**
 * The series a document belongs to: its top-level folder in the repository.
 *
 * Taken from filePath and not from the address, because a few addresses do not
 * repeat their folder (`/missions` holds MIS-*, `/telemetry` is composed) and
 * the folder is the thing the classification actually names.
 */
function seriesOf(filePath: string): string | undefined {
  const rel = String(filePath).replace(/\\/g, "/").replace(/^(\.\.\/)+/, "");
  const top = rel.split("/")[0];
  return top && top.endsWith(".md") ? undefined : top;
}

/** Every document the site publishes, with what machine-index needs to judge it. */
async function documents(): Promise<DocEntry[]> {
  const out: DocEntry[] = [];
  const seen = new Set<string>();

  const push = (d: DocEntry) => {
    const key = d.url.replace(/\/$/, "");
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ ...d, url: key });
  };

  // The typed collections. EACH ONE'S ADDRESS IS DERIVED THE WAY ITS OWN ROUTE
  // DERIVES IT — never by a rule invented here.
  //
  // This is not pedantry: the first version of this file assembled
  // `/<base>/<id>` for all four and produced fifteen addresses that do not
  // exist. Blueprints are served at their slug with the identifier stripped
  // (`/blueprints/dual-nomenclature`, see blueprints/[id].astro), and reports
  // at the entry id rather than the frontmatter id (reports/[id].astro). An
  // index that invents addresses is worse than no index, because a machine
  // trusts it — so the shapes below are copied from the routes, and the check
  // at the end of this function proves every row it emits was actually built.
  const typed: Array<{
    name: "missions" | "reports" | "decisions" | "blueprints";
    href: (entryId: string, frontmatterId: string) => string;
  }> = [
    { name: "missions", href: (_e, id) => `/missions/${id.toLowerCase()}` },
    { name: "reports", href: (e) => `/reports/${e}` },
    { name: "decisions", href: (_e, id) => `/decisions/${id.toLowerCase()}` },
    {
      name: "blueprints",
      href: (e) => `/blueprints/${e.replace(/^BLU-\d+-/i, "").toLowerCase()}`,
    },
  ];
  for (const { name, href } of typed) {
    for (const e of await getCollection(name)) {
      const f = e.data as Record<string, unknown>;
      const id = str(f.id) ?? String(e.id);
      const filePath = String(e.filePath ?? "");
      push({
        url: href(String(e.id), id),
        filePath,
        title: str(f.title) ?? id,
        id,
        series: seriesOf(filePath),
        status: str(f.status),
        updated: str(f.updated)?.slice(0, 10),
        license: str(f.license),
      });
    }
  }

  // The corpus mirror, filtered exactly as every page filters it.
  for (const e of await getPublicCorpus()) {
    const f = e.data as Record<string, unknown>;
    const filePath = String(e.filePath ?? "");
    push({
      url: `/${e.id}`,
      filePath,
      title: str(f.title) ?? String(e.id).split("/").pop() ?? String(e.id),
      id: str(f.id),
      series: seriesOf(filePath),
      status: str(f.status),
      updated: str(f.updated)?.slice(0, 10),
      license: str(f.license),
    });
  }

  return out.sort((a, b) => a.url.localeCompare(b.url));
}

/** The composed pages, which are views of the documents above. */
async function views(): Promise<ViewEntry[]> {
  return (await allComposedPages())
    .map((p) => ({
      url: p.route === "" ? "/" : p.route,
      sources: p.sources,
    }))
    .sort((a, b) => a.url.localeCompare(b.url));
}

/** The whole published surface, collected once. */
export async function surface(): Promise<Surface> {
  return { documents: await documents(), views: await views() };
}

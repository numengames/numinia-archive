// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// What Numinia sells, read from its record: the `goods:` block in the header
// of operations/OPS-014-supporting-numinia-the-offer.md. STD-033 PAY-003:
// "Sites read the price from that record." Nothing here states a price.
//
// Read once, at build time, by /contribute, its markdown view and the block
// at the foot of each document. A record that breaks shape stops the build.
import { getCollection } from "astro:content";
import { split } from "@/lib/account";

export const OFFER_FILE = "operations/OPS-014-supporting-numinia-the-offer.md";
export const OFFER_ROUTE = "/operations/ops-014-supporting-numinia-the-offer";
export const CONTRIBUTE_SOURCES = [
  OFFER_FILE,
  "standards/STD-033-every-charge-delivers-something.md",
  "canon/CAN-011-value-makes-a-bond.md",
];

export interface Good {
  id: string;
  name: string;
  kind: string;
  sentence: string;
  delivers: string;
  amounts: number[];
  levels?: string[];
  intervals: ("month" | "year")[];
  year_months: number;
  state: string;
  link: string;
}

let cache: Good[] | null = null;
export async function goods(): Promise<Good[]> {
  if (cache) return cache;
  const entry = (await getCollection("corpus")).find((e) => e.filePath?.endsWith(OFFER_FILE));
  if (!entry) throw new Error(`${OFFER_FILE}: not in the corpus collection`);
  const list = ((entry.data as { goods?: Good[] }).goods ?? []).map((g) => ({ ...g }));
  if (!list.length) throw new Error(`${OFFER_FILE}: no goods in the header`);
  for (const g of list) {
    for (const k of ["id", "name", "sentence", "delivers", "state"] as const) {
      if (!g[k]) throw new Error(`${OFFER_FILE}: good ${g.id ?? "?"} has no ${k}`);
    }
    if (!Array.isArray(g.amounts) || !g.amounts.length || g.amounts.some((a) => !(a > 0))) throw new Error(`${OFFER_FILE}: good ${g.id} has no valid amounts`);
    if (g.levels && g.levels.length !== g.amounts.length) throw new Error(`${OFFER_FILE}: good ${g.id} has ${g.levels.length} levels for ${g.amounts.length} amounts`);
    g.link = g.link ?? "";
    g.intervals = g.intervals?.length ? g.intervals : ["month"];
    g.year_months = g.year_months ?? 12;
  }
  cache = list;
  return list;
}

/** On sale means a payment link exists AND the record says so. */
export const onSale = (g: Good) => g.state === "on sale" && /^https:\/\//.test(g.link);

export const eur = (n: number) => "€" + n.toLocaleString("en-GB", { maximumFractionDigits: 2 });

/** What one payment turns into, for the page's small print. */
export const turnsInto = (price: number) => split(price);

// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The automation's feed, read by the archive (AUT-069). The tender radar
// writes what passes its filter to the public repository
// numengames/numinia-archive-feed, unreviewed; this reads it at build time
// so the pipeline page can show it apart from the records.
//
// THE ARCHIVE DOES NOT TRUST THE FEED. Every item goes through the same name
// check as a record (OPP-006, the sales kit's personNames) and is dropped if
// it trips it; a call already closed is dropped; an item the archive already
// holds keeps its record id, so the page links the record instead of showing
// the call twice. A feed that is slow, missing or malformed leaves the page
// saying so: it never breaks the build.
//
// NUMINIA_FEED_FILE points at a local file instead (tests, offline builds).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(process.cwd(), "..");
const KIT = path.join(ROOT, "machine", "packages", "sales-kit", "pipeline.mjs");

export const FEED_REPO = "https://github.com/numengames/numinia-archive-feed";
export const FEED_URL = "https://raw.githubusercontent.com/numengames/numinia-archive-feed/main/radar/board.json";

export interface FeedItem {
  id: string;
  source?: string;
  kind?: string;
  title: string;
  buyer?: string;
  url?: string;
  closes?: string;
  amount?: string;
  buys?: string;
  fit?: string;
  chance?: string;
  blocker?: string;
  why?: string;
  next?: string;
  read_from?: string;
  updated?: string;
  in_archive?: string;
}

export interface Feed {
  state: "read" | "unreachable";
  published: string | null;
  items: FeedItem[];
  /** items the archive's own name check held back */
  held: number;
}

const CHANCE_ORDER: Record<string, number> = { alta: 0, media: 1, baja: 2 };

async function raw(): Promise<unknown> {
  const local = process.env.NUMINIA_FEED_FILE;
  if (local) return JSON.parse(fs.readFileSync(local, "utf8"));
  const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const cache = new Map<string, Promise<Feed>>();

/** The radar's feed as of `today`, checked. Read once per build. */
export function radarFeed(today = new Date().toISOString().slice(0, 10)): Promise<Feed> {
  if (!cache.has(today)) cache.set(today, read(today));
  return cache.get(today)!;
}

async function read(today: string): Promise<Feed> {
  let doc: { published?: string; items?: FeedItem[] };
  try {
    doc = (await raw()) as typeof doc;
    if (!doc || !Array.isArray(doc.items)) throw new Error("no items");
  } catch (e) {
    console.warn(`[feed] the radar's feed is unreachable: ${(e as Error).message}`);
    return { state: "unreachable", published: null, items: [], held: 0 };
  }
  const kit = await import(/* @vite-ignore */ pathToFileURL(KIT).href);
  const named: string[] = kit.loadCard().named;
  let held = 0;
  const items = doc.items
    .filter((i) => i && typeof i.id === "string" && typeof i.title === "string")
    .filter((i) => {
      const d = /^(\d{4}-\d{2}-\d{2})/.exec(i.closes ?? "")?.[1];
      return !d || d >= today;
    })
    .filter((i) => {
      const text = Object.values(i).filter((v) => typeof v === "string").join("\n");
      if (kit.personNames(text, named).length) { held++; return false; }
      return true;
    })
    .sort((a, b) => (CHANCE_ORDER[a.chance ?? ""] ?? 9) - (CHANCE_ORDER[b.chance ?? ""] ?? 9) || (a.closes ?? "").localeCompare(b.closes ?? ""));
  return { state: "read", published: doc.published ?? null, items, held };
}

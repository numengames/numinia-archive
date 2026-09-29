// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The Summa, drawn as an instrument.
//
// Four rings from the centre out: the rules, the work, the world, the offer.
// Four districts cross ONLY the two outer rings (the world and the offer):
// the rules and the work belong to no district. Beyond the rim, the lenses —
// the sister sites that paint a part of the Summa and hold no text of their
// own.
//
// The world entries (2026-09-28) point at their own shelf of the lore index
// (/lore/#codex, #world, #adventures), never at one document inside it: the
// Codex used to open the glossary and World the first essay.
//
// Every entry that names a `folder` is counted from the tree at build time;
// an entry with no folder yet is a series still to be created and says so.
// This module is the one source for the home map, the bar, the wayfinder
// strip and the compass.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "..");

function countMd(folder: string): number {
  const dir = path.join(ROOT, folder);
  if (!fs.existsSync(dir)) return 0;
  let n = 0;
  const walk = (d: string) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(d, e.name));
      else if (e.name.endsWith(".md") && !/^(README|INDEX|CHECK|TEMPLATE)/i.test(e.name)) n++;
    }
  };
  walk(dir);
  return n;
}

export type RingId = "core" | "work" | "world" | "offer";
export type DistrictId = "play" | "learn" | "order" | "make";

export interface Entry {
  label: string;
  line: string;
  /** where it is served today; null = the series does not exist yet */
  href: string | null;
  /** served by a sister site, not by this archive yet */
  external?: string;
  /** repo folder, for the count and the "you are here" match */
  folder?: string;
  count?: number;
}

export interface Segment {
  id: string;
  ring: RingId;
  district?: DistrictId;
  /** the one word printed on the ring */
  word: string;
  title: string;
  a: [number, number];
  entries: Entry[];
}

export const RINGS: Record<RingId, { name: string; line: string; classic: string; r: [number, number] }> = {
  core: { name: "The rules", line: "What everything else emerges from. It changes rarely and few people sign it.", classic: "Governance — purpose, policies, procedures, decisions", r: [0, 76] },
  work: { name: "The work", line: "How the work is done, and how we know it goes well. Internal, and open to anyone who looks.", classic: "Operations — plan, execute, assure, sustain", r: [82, 150] },
  world: { name: "The world", line: "Numinia itself: its story, its objects and who lives in it.", classic: "Product and brand — the world, its goods, its people", r: [156, 218] },
  offer: { name: "The offer", line: "What reaches the outside: everything you can play, hire or own has a record here.", classic: "Offer and relations — products, services, partners", r: [224, 276] },
};
export const RING_ORDER: RingId[] = ["core", "work", "world", "offer"];

export const DISTRICTS: Record<DistrictId, { name: string; place: string; faction: string; a: number; line: string }> = {
  play: { name: "Play", place: "Ouroboros", faction: "Heirs of Eleusis", a: 45, line: "The labyrinth of play: the role-playing game, the adventures and experiences for events." },
  learn: { name: "Learn", place: "Vitruvian", faction: "Hermeticists", a: 135, line: "The temple of knowledge: the codex, the world's vocabulary and training." },
  order: { name: "Organise", place: "Solomon", faction: "Stellar Circle", a: 225, line: "The gearwork of order: the agents, NWOS for your organisation, and our partners." },
  make: { name: "Collect", place: "Sycamore", faction: "Neo-Atlantists", a: 315, line: "The canvas of imagination: objects, the world, the shop and supporting Numinia." },
};

const E = (label: string, line: string, href: string | null, folder?: string): Entry => ({
  label, line, href, folder, count: folder ? countMd(folder) : undefined,
});
/** An offer another site already serves; its record here is still to write. */
const X = (label: string, line: string, site: string): Entry => ({ label, line, href: `https://${site}`, external: site });

/** What "to create" means, said once wherever the tag appears. */
export const TO_CREATE = "Written in the plan, not yet in the Summa: the record of this offer is still to be made.";

export const SEGMENTS: Segment[] = [
  { id: "rules", ring: "core", word: "The Summa", title: "The rules", a: [0, 360], entries: [
    E("Canon", "Why we exist", "/canon/", "canon"),
    E("Standards", "What each thing must look like", "/standards/", "standards"),
    E("Protocols", "How each thing is done, step by step", "/protocols/", "protocols"),
    E("Decisions", "What was decided, and why", "/decisions/", "decisions"),
    E("The core, as a book", "Each canon, its rules and its steps, end to end", "/core"),
    E("The design system, as a book", "Everything a piece of ours is made of", "/design"),
  ] },
  { id: "production", ring: "work", word: "Production", title: "Production", a: [0, 120], entries: [
    E("Blueprints", "The plans for every piece", "/blueprints/", "blueprints"),
    E("Missions", "The work in progress, as cards", "/missions", "missions"),
  ] },
  { id: "assurance", ring: "work", word: "Assurance", title: "Assurance", a: [120, 240], entries: [
    E("Reports", "What we observed", "/reports", "reports"),
    E("Debt", "What is broken, said out loud", "/debt/", "debt"),
    E("Telemetry", "What is measured, never typed", "/telemetry"),
  ] },
  { id: "administration", ring: "work", word: "Administration", title: "Administration", a: [240, 360], entries: [
    E("Operations", "Continuity, strategy, secrets", "/operations/", "operations"),
    E("Legal", "Privacy, terms and cookies: the texts every site publishes", "/legal/", "legal"),
    E("System", "How the machine is wired today", "/system/", "system"),
    E("Open books", "What Numinia costs and takes in", "/system/open-books"),
    E("Opportunities", "Whom we are trying to sell to, in public", "/opportunities/", "opportunities"),
    E("The pipeline", "Every opportunity at its stage; where sales are won and lost", "/system/pipeline"),
    E("Templates", "The mould of every document type, headers side by side", "/templates"),
    E("The repository", "README, contributing, changelog, security", null),
  ] },
  { id: "world-play", ring: "world", district: "play", word: "Game", title: "Play · its world", a: [0, 90], entries: [
    E("The game", "The role-playing manual, ES and EN", null),
    E("Adventures", "Tabletop and virtual worlds", "/lore/#adventures", "lore/adventures"),
  ] },
  { id: "world-learn", ring: "world", district: "learn", word: "Codex", title: "Learn · its world", a: [90, 180], entries: [
    E("Codex", "Glossary, character sheet, acknowledgments", "/lore/#codex", "lore/codex"),
    E("World", "The city, its districts, its species", "/lore/#world", "lore/world"),
  ] },
  { id: "world-order", ring: "world", district: "order", word: "Agents", title: "Organise · its world", a: [180, 270], entries: [
    E("Agents", "Biological and digital: who does the work", "/agent", "agents"),
    E("Agents' index", "Every agent's file: its role, its operator, its sources", "/agents"),
  ] },
  { id: "world-make", ring: "world", district: "make", word: "Objects", title: "Collect · its world", a: [270, 360], entries: [
    E("Objects", "The catalogue of things in the world", "/objects/", "objects"),
    X("The gallery", "Every object, to look at and download", "numinia.com"),
  ] },
  { id: "offer-play", ring: "offer", district: "play", word: "Play", title: "Play · what it offers", a: [0, 90], entries: [
    E("Play an adventure", "Free, and whole", null),
    E("Season One pass", "Assets that show you backed the season", null),
    X("Events", "Experiences designed for your event", "numen.games"),
  ] },
  { id: "offer-learn", ring: "offer", district: "learn", word: "Training", title: "Learn · what it offers", a: [90, 180], entries: [
    // 2026-09-28: the offer has its record; the map points at it.
    E("Training", "A place where your people rehearse a procedure before the day it counts", "/operations/ops-012-training-the-offer"),
  ] },
  { id: "offer-order", ring: "offer", district: "order", word: "NWOS", title: "Organise · what it offers", a: [180, 270], entries: [
    X("NWOS for your organisation", "The whole structure, set up for you", "nwos.numen.games"),
    // 2026-09-29: the four settings of NWOS (narrative, gamification,
    // automation, the team) were four pages filed in four places.
    E("Configure NWOS", "Narrative, gamification, automation and the team: the settings an organisation chooses", "/configure"),
    E("Partners", "Who walks with us", null),
  ] },
  { id: "offer-make", ring: "offer", district: "make", word: "Shop", title: "Collect · what it offers", a: [270, 360], entries: [
    E("Shop", "Objects on sale", null),
    // 2026-09-29: the page exists; the cards are read from OPS-014.
    E("Support Numinia", "Backer from €5 a month, Sponsor from €200; always with something in return", "/contribute"),
  ] },
];

/**
 * The books: compilations, not series. Each gathers documents from several
 * series to be read or heard end to end, so none belongs to one function —
 * they get a menu of their own (the Oracle, 2026-09-27), and each served one
 * is also listed in the ring its documents come from. A book with no address
 * yet says why in `pending`.
 */
export interface Book {
  label: string;
  line: string;
  href: string | null;
  /** the series it is compiled from, as a reader would name them */
  from: string;
  pending?: string;
}
export const BOOKS: Book[] = [
  { label: "The core", line: "Each canon, the standards that make it concrete, the protocols that carry it out", href: "/core", from: "canon · standards · protocols" },
  { label: "The design system", line: "Everything a piece of ours is made of, on one page and in one download", href: "/design", from: "standards · protocols · system" },
  { label: "The role-playing manual", line: "The tabletop game of Numinia, in Spanish and English", href: null, from: "lore", pending: "Not on the site yet: four images the manual embeds were never committed" },
  { label: "The legal playbook", line: "The rules the law asks of us, gathered in one place", href: null, from: "standards · legal", pending: "Being written: the standards the law requires are still to be gathered" },
];

export const LENSES: { site: string; href: string; who: string; line: string; paints: string[] }[] = [
  { site: "numinia.com", href: "https://numinia.com", who: "For players and collectors", line: "The city to play in: the adventures (free, or with the season pass), the objects, and supporting Numinia.", paints: ["world-play", "world-learn", "world-make", "offer-play", "offer-make"] },
  { site: "numen.games", href: "https://numen.games", who: "For event organisers", line: "The studio: experiences for events built from narrative, game dynamics and live facilitation.", paints: ["offer-play", "offer-order"] },
  { site: "nwos.numen.games", href: "https://nwos.numen.games", who: "For teams and organisations", line: "The product: NWOS, the narrative operating system — your organisation set up with an archive, rules and agents, like ours.", paints: ["rules", "administration", "world-order", "offer-order"] },
];

export const INTENTS: { label: string; hint: string; target: string }[] = [
  { label: "I came to play", hint: "Play", target: "d-play" },
  { label: "I am organising an event", hint: "Events", target: "s-offer-play" },
  { label: "I want NWOS for my organisation", hint: "Organise", target: "s-offer-order" },
  { label: "I want an object, or to support Numinia", hint: "Collect", target: "d-make" },
  { label: "I want to learn", hint: "Learn", target: "d-learn" },
  { label: "I want to see how it works inside", hint: "The rules", target: "s-rules" },
];

/** Which segment a URL belongs to, for the wayfinder strip and the compass. */
export function locate(pathname: string): { seg: Segment; entry?: Entry } | null {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return null;
  let best: { seg: Segment; entry: Entry; len: number } | null = null;
  for (const seg of SEGMENTS) {
    for (const e of seg.entries) {
      // A shelf link (/lore/#codex) is not an address of its own: its folder matches.
      const keys = [e.href?.includes("#") ? null : e.href, e.folder ? "/" + e.folder : null].filter(Boolean) as string[];
      for (const k of keys) {
        const kk = k.replace(/\/+$/, "");
        if (p === kk || p.startsWith(kk + "/")) {
          if (!best || kk.length > best.len) best = { seg, entry: e, len: kk.length };
        }
      }
    }
  }
  if (best) return { seg: best.seg, entry: best.entry };
  // series served under a sibling path
  if (p.startsWith("/core")) { const seg = SEGMENTS.find((s) => s.id === "rules")!; return { seg, entry: seg.entries.find((e) => e.href === "/core") }; }
  if (p.startsWith("/agents")) return { seg: SEGMENTS.find((s) => s.id === "world-order")! , entry: SEGMENTS.find((s) => s.id === "world-order")!.entries[0] };
  if (p.startsWith("/lore")) return { seg: SEGMENTS.find((s) => s.id === "world-learn")! };
  if (p.startsWith("/legal")) return { seg: SEGMENTS.find((s) => s.id === "administration")!, entry: SEGMENTS.find((s) => s.id === "administration")!.entries[0] };
  return null;
}

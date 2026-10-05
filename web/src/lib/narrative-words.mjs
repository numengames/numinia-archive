// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The narrative dial's words: what the site says at each of the three stops.
//
// The reader chooses how the archive speaks to them with the moon in the bar:
// new moon (plain), half moon (the site as it is) and full moon (Numinia).
// Only the SITE's own words change — ring names, series labels, headings. A
// document's text never does: a cited sentence reads the same for everyone.
//
// THE RULE (the Oracle, 2026-09-29): no word is invented here. Every word at
// the plain or the Numinia stop is copied from a file of the archive that
// already uses it, and `source` names that file. The test
// machine/scripts/test/narrative-words.test.mjs opens each source and fails
// when the word is not in it. Where the archive has no word yet, the entry
// leaves that stop out and the site keeps today's word. GAPS lists them, for
// the Oracle and the semantic census to decide.

/**
 * The three stops, in dial order. The plain stop is the SOURCE (the Oracle,
 * 2026-09-29): documents are written in the business's words, and the half
 * moon and the full moon enrich them. The site opens there.
 */
export const STOPS = [
  { id: "plain", level: "L1", moon: "new", say: "L1 · Plain words, like any company's documentation. The archive is written in these." },
  { id: "bridge", level: "L2", moon: "half", say: "L2 · Half and half: plain words with Numinia's beside them." },
  { id: "numinia", level: "L3", moon: "full", say: "L3 · Numinia's own words, where the archive has them." },
];

/**
 * The site's own name at each level (the Oracle, 2026-10-02). Every page's
 * title ends with it, so the tab says one name, never seven. L1 is the page
 * as served: what search engines, link cards and agents read. Each name is
 * copied from the file in `source`, as every word here is.
 */
export const SITE_NAME = {
  plain: { text: "numinia.org, the archive of Numen Games", source: "standards/STD-037-what-every-site-carries.md" },
  bridge: { text: "the archive of Numinia", source: "lore/game/manual/en/06-inventory-and-bestiary.md" },
  numinia: { text: "the Summa Archive", source: "designs/DES-007-dual-nomenclature.md" },
};

/** A page's title at a level: its own name, then the site's. The home is the site alone. */
export function siteTitle(page, stop = "plain") {
  const site = SITE_NAME[stop]?.text ?? SITE_NAME.plain.text;
  return page ? `${page} — ${site}` : site;
}

/**
 * The page's own name inside a title a page wrote by hand. Pages used to end
 * their titles with whatever the site was called where they were written —
 * "Numen Games CAO", "numinia-archive", "NWOS", "Pablo FM", "the Summa" — so
 * the suffix is dropped here and the site's one name is added by siteTitle.
 */
const RETIRED_SUFFIX = /\s+(—|·)\s+(numinia\.org, the archive of Numen Games|the archive of Numinia|the Summa Archive|NWOS(, the archive of Numen Games)?|numinia-archive|Numen Games CAO|Numen Games S\.L\.|Numen Games|Numinia|Pablo FM|the Summa|the core, as a flow|how the archive is classified · Numen Games|every series of Numen Games)\s*$/;
const RETIRED_PREFIX = /^(NWOS|Numinia)\s+—\s+/;
const SITE_ALONE = /^(NWOS — the archive of Numen Games|Numinia — the Summa|numinia\.org(, the archive of Numen Games)?)$/;

export function pageTitleOf(raw) {
  let t = String(raw ?? "").trim();
  if (SITE_ALONE.test(t)) return "";
  for (let i = 0; i < 3; i++) t = t.replace(RETIRED_SUFFIX, "");
  t = t.replace(RETIRED_PREFIX, "");
  return SITE_ALONE.test(t) ? "" : t;
}

/** The stop a visitor arrives at. */
export const DEFAULT_STOP = "plain";

/**
 * One label of the site. `bridge` is the text the page serves today, exactly.
 * `plain` and `numinia` are optional; each carries its `source`.
 */
export const WORDS = [
  // ── the four rings: their classical names, already printed under each ring
  {
    bridge: "The rules",
    plain: { text: "Governance", source: "web/src/lib/summa.ts" },
    numinia: { text: "Tabularium", source: "standards/STD-030-the-worlds-vocabulary.md" },
  },
  {
    bridge: "The work",
    plain: { text: "Operations", source: "web/src/lib/summa.ts" },
    numinia: { text: "The guilds", source: "standards/STD-030-the-worlds-vocabulary.md" },
  },
  {
    bridge: "The world",
    plain: { text: "Product and brand", source: "web/src/lib/summa.ts" },
    numinia: { text: "The City", source: "designs/DES-007-dual-nomenclature.md" },
  },
  {
    bridge: "The offer",
    plain: { text: "Offer and relations", source: "web/src/lib/summa.ts" },
    numinia: { text: "Emporium", source: "standards/STD-030-the-worlds-vocabulary.md" },
  },

  // ── the districts, by the names the lore gives them
  { bridge: "Play", numinia: { text: "Ouroboros", source: "lore/codex/en/glossary.md" } },
  { bridge: "Learn", numinia: { text: "Vitruvian", source: "lore/codex/en/glossary.md" } },
  { bridge: "Organise", numinia: { text: "Solomon", source: "lore/codex/en/glossary.md" } },
  { bridge: "Collect", numinia: { text: "Sycamore", source: "lore/codex/en/glossary.md" } },

  // ── the series, by their operational equivalents. Standards, Decisions,
  // Reports and Agents: accepted for now by Christian and the Oracle
  // (2026-09-29) — finding a word is finding a meaning, and these will
  // change as the census understands them better.
  // Principles: the business word IS principle (the governance hierarchy
  // policy → standard → procedure → guideline; ISO 9000:2015 3.5.8), so no
  // plain word replaces it (ADR-067, cut 3). Canon, the series' word until
  // 2026-10-03, stays as the word of the Numinia stop.
  { bridge: "Principles", numinia: { text: "Canon", source: "lore/README.md" } },
  { bridge: "Standards", plain: { text: "Policies", source: "web/src/lib/summa.ts" } },
  { bridge: "Missions", plain: { text: "Project", source: "standards/STD-030-the-worlds-vocabulary.md" } },
  { bridge: "Adventures", plain: { text: "Experience", source: "standards/STD-030-the-worlds-vocabulary.md" } },
  // Designs: the business word IS design document (the RFC-style proposals:
  // PEP, Rust RFC, Kubernetes KEP; a vendor's *blueprint* is a deployable
  // template, which this is not), so no plain word replaces it (ADR-067,
  // cut 4). Blueprints, the series' word until 2026-10-03, stays as the word
  // of the Numinia stop (DES-007's table).
  { bridge: "Designs", numinia: { text: "Blueprints", source: "designs/DES-007-dual-nomenclature.md" } },
  // Procedures: the business word IS procedure (ISO 9000:2015 3.4.5 — a process is
  // the set of activities, a procedure the specified way to carry one out), so no
  // plain or Numinia word replaces it (ADR-067, cut 2).
  {
    bridge: "Decisions",
    plain: { text: "Decision Record", source: "designs/DES-007-dual-nomenclature.md" },
    numinia: { text: "Decision Stone", source: "designs/DES-007-dual-nomenclature.md" },
  },
  { bridge: "Reports", numinia: { text: "Dispatch", source: "designs/DES-007-dual-nomenclature.md" } },
  { bridge: "Agents", plain: { text: "Team", source: "designs/DES-007-dual-nomenclature.md" } },

  // ── the archive itself, by both of the names the site gives it
  {
    bridge: "The Summa",
    plain: { text: "Knowledge Base", source: "designs/DES-007-dual-nomenclature.md" },
    numinia: { text: "Summa Archive", source: "designs/DES-007-dual-nomenclature.md" },
  },
  {
    bridge: "The archive",
    plain: { text: "Knowledge Base", source: "designs/DES-007-dual-nomenclature.md" },
    numinia: { text: "Summa Archive", source: "designs/DES-007-dual-nomenclature.md" },
  },
];

/**
 * Texts written by hand at each stop (method 2 of the design): the front
 * door's heading, sentence and empty-section line, and the map's line on its
 * rings. They use
 * no word the register lacks: `uses` lists the labels each one names, and the
 * test checks that each stop names them by the register's word.
 */
export const TEXTS = {
  // The front door (2026-10-03): the archive by section. Its heading, its
  // one sentence and the line an empty section prints name the archive, so
  // each stop says it by the register's word.
  "home.thesis": {
    uses: ["The archive"],
    plain: "Our knowledge base, by section.",
    numinia: "The Summa Archive, by section.",
  },
  "home.what": {
    uses: ["The archive"],
    plain: "The knowledge base of Numen Games: everything we decide, build and offer, written down and open. Numinia is the story we tell it in — a city where work is a game.",
    numinia: "The Summa Archive of Numen Games: everything we decide, build and offer, written down and open. Numinia is the story we tell it in — a city where work is a game.",
  },
  "home.empty": {
    uses: ["The archive"],
    plain: "Nothing in the knowledge base yet.",
    numinia: "Nothing in the Summa Archive yet.",
  },
  // The map's first line on how to read it names the four rings, so it says
  // them in the register's words at each stop (narrative-home.test.mjs).
  "home.rings": {
    uses: ["The rules", "The work", "The world", "The offer"],
    plain: "From the centre out: governance, operations, product and brand, offer and relations.",
    numinia: "From the centre out: the Tabularium, the guilds, the City, the Emporium.",
  },
};

/** Stops the archive has no word for yet, per label: the conversation owed. */
export const GAPS = [
  // The front door (2026-10-03). The ten section names keep their business
  // name at every stop by the Oracle's decision; at the full moon the houses
  // that serve each one are named beneath it instead (translator.servedBy).
  "Procedures, Operations, Opportunities, Legal, System, Debt, Objects and Lore (series labels) at the plain and Numinia stops: the archive has no other word for them yet",
  "served by, records, Who we are, Books, Our other sites, Without a section (the front door's own labels): no plain or Numinia word in any file yet; the site keeps today's word",
];

/** Attributes for the site's own name, so a page that prints it changes it with the moon. */
export function siteNameAttrs() {
  return { "data-nw": "", "data-nw-bridge": SITE_NAME.bridge.text, "data-nw-plain": SITE_NAME.plain.text, "data-nw-numinia": SITE_NAME.numinia.text };
}

/** Attributes for an element whose text is `label`, or {} when the register has no entry. */
export function wordAttrs(label) {
  const w = WORDS.find((x) => x.bridge === label);
  if (!w) return {};
  const a = { "data-nw": "", "data-nw-bridge": label };
  if (w.plain) a["data-nw-plain"] = w.plain.text;
  if (w.numinia) a["data-nw-numinia"] = w.numinia.text;
  return a;
}

/**
 * Attributes for a hand-written text, by key. Throws on an unknown key.
 * `served` is the text the page prints today, kept in an attribute so the
 * dial can restore it even after another script (the typing) rewrote the node.
 */
export function textAttrs(key, served) {
  const t = TEXTS[key];
  if (!t) throw new Error(`narrative-words: no hand-written text "${key}"`);
  const a = { "data-nw": "" };
  if (served) a["data-nw-bridge"] = served;
  if (t.plain) a["data-nw-plain"] = t.plain;
  if (t.numinia) a["data-nw-numinia"] = t.numinia;
  return a;
}

/** The word a label takes at a stop: the register's, or the label itself. */
export function wordAt(label, stop) {
  if (stop === "bridge") return label;
  const w = WORDS.find((x) => x.bridge === label);
  return w?.[stop]?.text ?? label;
}

/**
 * Attributes for an element whose ATTRIBUTES name a label (a tooltip, an
 * aria-label): `spec` maps each attribute to a function of the stop that
 * composes its value, usually with wordAt. Only attributes that some stop
 * says differently are marked; {} when none does. The dial reads
 * data-nw-attrs and swaps each one listed.
 */
export function attrsAt(spec) {
  const a = {};
  const names = [];
  for (const [name, at] of Object.entries(spec)) {
    const bridge = at("bridge");
    const plain = at("plain"), numinia = at("numinia");
    if (plain === bridge && numinia === bridge) continue;
    names.push(name);
    a[`data-nw-bridge-${name}`] = bridge;
    if (plain !== bridge) a[`data-nw-plain-${name}`] = plain;
    if (numinia !== bridge) a[`data-nw-numinia-${name}`] = numinia;
  }
  if (!names.length) return {};
  a["data-nw-attrs"] = names.join(" ");
  return a;
}

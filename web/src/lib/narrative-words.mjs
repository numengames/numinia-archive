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

/** The three stops, in dial order. `bridge` is the site as served. */
export const STOPS = [
  { id: "plain", moon: "new", say: "Plain words, like any company's documentation." },
  { id: "bridge", moon: "half", say: "Half and half: the archive as it is today." },
  { id: "numinia", moon: "full", say: "Numinia's own words, where the archive has them." },
];

/** The stop a visitor arrives at. */
export const DEFAULT_STOP = "bridge";

/**
 * One label of the site. `bridge` is the text the page serves today, exactly.
 * `plain` and `numinia` are optional; each carries its `source`.
 */
export const WORDS = [
  // ── the four rings: their classical names, already printed under each ring
  { bridge: "The rules", plain: { text: "Governance", source: "web/src/lib/suma.ts" } },
  { bridge: "The work", plain: { text: "Operations", source: "web/src/lib/suma.ts" } },
  { bridge: "The world", plain: { text: "Product and brand", source: "web/src/lib/suma.ts" } },
  { bridge: "The offer", plain: { text: "Offer and relations", source: "web/src/lib/suma.ts" } },

  // ── the districts, by the names the lore gives them
  { bridge: "Play", numinia: { text: "Ouroboros", source: "lore/codex/en/glossary.md" } },
  { bridge: "Learn", numinia: { text: "Vitruvian", source: "lore/codex/en/glossary.md" } },
  { bridge: "Organise", numinia: { text: "Solomon", source: "lore/codex/en/glossary.md" } },
  { bridge: "Collect", numinia: { text: "Sycamore", source: "lore/codex/en/glossary.md" } },

  // ── the series, by their operational equivalents
  { bridge: "Missions", plain: { text: "Project", source: "standards/STD-030-the-worlds-vocabulary.md" } },
  { bridge: "Adventures", plain: { text: "Experience", source: "standards/STD-030-the-worlds-vocabulary.md" } },
  { bridge: "Blueprints", plain: { text: "System Blueprint", source: "blueprints/BLU-007-dual-nomenclature.md" } },
  { bridge: "Protocols", plain: { text: "Process", source: "blueprints/BLU-007-dual-nomenclature.md" } },
  { bridge: "Decisions", plain: { text: "Decision Record", source: "blueprints/BLU-007-dual-nomenclature.md" } },

  // ── the archive itself
  {
    bridge: "The archive",
    plain: { text: "Knowledge Base", source: "blueprints/BLU-007-dual-nomenclature.md" },
    numinia: { text: "Archive Summa", source: "blueprints/BLU-007-dual-nomenclature.md" },
  },
];

/**
 * Texts written by hand at each stop (method 2 of the design): only the
 * archive page's heading and lead. They use no word the register lacks.
 */
export const TEXTS = {
  "about.thesis": {
    plain: "Our knowledge base, in four blocks.",
    numinia: "The Archive Summa, in four blocks.",
  },
  "about.lead": {
    plain: "One of two ways to move through our knowledge base. The map shows how it fits together; this page takes you straight to a section.",
    numinia: "One of two ways to walk the Archive Summa. The map lets you explore it; this page takes you straight to a series.",
  },
};

/** Stops the archive has no word for yet, per label: the conversation owed. */
export const GAPS = [
  "The four rings at the Numinia stop (the rules, the work, the world, the offer)",
  "Canon and Standards at the plain stop",
  "Decisions and Reports at the Numinia stop (the English of «Piedra del Camino» is not fixed)",
  "Agents at the plain stop (the section holds people and digital agents)",
];

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

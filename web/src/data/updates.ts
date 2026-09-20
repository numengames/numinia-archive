// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The site's version timeline, newest first — what each production push
// changed, and what is still pending. The footer prints the newest
// version and links here; the same page exists on numinia.com,
// numen.games and nwos.numen.games (decision of 2026-09-16, modelled on
// numinia.com/updates).
//
// THE RULE: every pull request that changes web/src/** adds an entry here
// and raises the minor. CI refuses the merge otherwise
// (scripts/check-version-bump.mjs). A site that cannot say what changed
// between two visits forces every reader to diff it by eye.
//
// This is the SITE's timeline, not the archive's: CHANGELOG.md at the
// repository root records the corpus; this records the viewer.
export interface UpdateEntry {
  readonly type: "ADD" | "CHG" | "FIX" | "DEL";
  readonly text: string;
}

export interface UpdateVersion {
  readonly version: string;
  readonly date: string;
  readonly entries: readonly UpdateEntry[];
}

export interface PendingItem {
  readonly status: "planned" | "blocked";
  readonly text: string;
}

export const UPDATES: readonly UpdateVersion[] = [
  {
    version: "v0.4.0",
    date: "2026-09-20",
    entries: [
      {
        type: "ADD",
        text: "/corpus/objects/avocado — the first entity card of the archive: a thing that is not a document (here, the Avocado avatar by Polygonal Mind, CC0). The card is an index, not a copy: what the thing is, its history, each of its forms with its own licence and rights holder, and every place its bytes are, with their hash and size. Beside it, /corpus/objects/CHECK — the dated report of the last time every copy was fetched and its hash compared. One card today; the folder is not a section of the corpus index yet.",
      },
    ],
  },
  {
    version: "v0.3.1",
    date: "2026-09-19",
    entries: [
      {
        type: "FIX",
        text: "Every link to the repository — the commit in the footer, the home, the continuity page, the Wardley map — now points at numengames/numinia-archive, the name the repository has had since 2026-09-17. They pointed at the old name, numinia-nwos, and worked only because GitHub redirects it.",
      },
    ],
  },
  {
    version: "v0.3.0",
    date: "2026-09-18",
    entries: [
      {
        type: "ADD",
        text: "/legal/cookies — the Cookie Policy of Numen Games (OPS-010), written from a measured inventory of what each of the four sites stores: this one stores nothing. Linked from the footer. Closes the privacy policy's open reference to a cookie policy that did not exist.",
      },
      {
        type: "DEL",
        text: "The Umami analytics script (analytics.pablofm.com) is gone: it sent every visit to a personal server the policy did not name. Nothing leaves your browser from this site now.",
      },
    ],
  },
  {
    version: "v0.2.1",
    date: "2026-09-18",
    entries: [
      {
        type: "FIX",
        text: "The home page's title and description were still the service's line (the page passed its own, over the layout's default). Now the home reads the layout's: the archive, not the service.",
      },
    ],
  },
  {
    version: "v0.2.0",
    date: "2026-09-18",
    entries: [
      {
        type: "ADD",
        text: "A link to this site presents itself (DSN-014): the scarab as favicon, a title and description that say this is the archive of Numen Games — not the service —, and a 1200×630 share card drawn at build from the house's type and colours. The Astro template's pink-and-cyan M is gone.",
      },
    ],
  },
  {
    version: "v0.1.2",
    date: "2026-09-17",
    entries: [
      {
        type: "CHG",
        text: "The game comes home: lore/ holds the RPG manual, the adventures (Session Zero, El Espejo Roto, and a template for the next), the world's identity texts and the Codex matter — reserved regime, not published by this viewer. numinia.com reads it from here at build. The numinia-lore repository retires.",
      },
    ],
  },
  {
    version: "v0.1.1",
    date: "2026-09-16",
    entries: [
      {
        type: "FIX",
        text: "The footer's two-column navigation fills top-to-bottom, so the header's order survives: Canon → Blueprints down the left, Missions and Debt on the right. It was zigzagging across.",
      },
    ],
  },
  {
    version: "v0.1.0",
    date: "2026-09-16",
    entries: [
      {
        type: "ADD",
        text: "This page. The timeline starts here: the site had shipped for months without a version record, and the footer printed a package.json number nobody raised.",
      },
      {
        type: "CHG",
        text: "The footer takes the house shape, the same on the four sites: brand as text, Navigation in two columns, a Numen Games column that names the other three sites and what they are for, Legal, Social, and the closing line — scarab, signature, licence · telemetry · version · commit.",
      },
      {
        type: "CHG",
        text: "Legal pages move to /legal/terms and /legal/privacy, the same paths as numinia.com and numen.games; /legal/terminos and /legal/privacidad redirect.",
      },
      {
        type: "ADD",
        text: "GitHub in the Social column — the organisation, github.com/numengames. X and Discord follow when the company accounts exist.",
      },
    ],
  },
];

export const PENDING: readonly PendingItem[] = [
  { status: "blocked", text: "Company accounts on X and Discord for the Social column — waiting on the Oracle." },
  { status: "planned", text: "One design system on the four sites: install @numengames/design-kit on numinia.com and numen.games so colours and type stop differing (nwos.numen.games already has it)." },
  { status: "planned", text: "The brand marks STD-023 §7 catalogues (horizontal wordmark, Khepri_NG) exist in no repository; until they do the footer signs with the scarab and the written name." },
  { status: "planned", text: "A cookie policy: the privacy text cites one that does not exist in the archive (FLAG-4 of OPS-003)." },
];

/** The newest version — what the footer prints. */
export const CURRENT_VERSION: string = UPDATES[0]!.version;

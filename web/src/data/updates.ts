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
    version: "v0.8.0",
    date: "2026-09-21",
    entries: [
      {
        type: "CHG",
        text: "Every folder index now shows what the decision registry has always shown: the identifier, the date and the status of each document, colour-coded — green for what governs, amber for a draft, grey for what has been withdrawn. Until today /standards, /canon, /protocols and /system printed a bare list of titles, so you could see that a standard existed but not whether it was still in force. The data was already being calculated for every row and thrown away one line before it reached the page. A warning that comes with it: all 27 standards, all 8 canon documents and all 11 protocols declare themselves as drafts in their own headers, so those pages are amber from top to bottom. That is what the archive says about itself right now, and the fix belongs in the documents, not here.",
      },
      {
        type: "ADD",
        text: "Each folder says what question it answers, at the top of its index — the same line every document carries in its header, which folders never had. /debt opens with 'What do we already know is broken or missing?'. And an empty folder now explains itself instead of looking broken: if there is genuinely nothing, it says so in green ('Nothing is outstanding') because an empty debt register is good news; if documents exist but are not published, it says how many are being withheld and why. Those two silences used to print the same sentence, and only one of them was true.",
      },
      {
        type: "ADD",
        text: "The agent roster and the archive's classification are now in the top bar. Both pages were finished, built and served — /agents lists who works here, /archive shows the six functions the whole archive is classified under — and neither was linked from anywhere on this site. The only way to reach them was to already know the address.",
      },
    ],
  },
  {
    version: "v0.7.0",
    date: "2026-09-20",
    entries: [
      {
        type: "CHG",
        text: "Every document now lives at one address, and that address is its folder plus its name: /standards/std-028-one-document-one-address, /canon/can-001-welcome-to-numinia, /decisions/adr-047. The /corpus/ segment in front of half of them is gone. It stood before four folders and not the other four — the standards were at /corpus/standards but the decisions at /decisions — so nobody could work out an address without looking it up, and the word itself told a reader nothing: every page here is the archive. 111 addresses lost the segment. The rule is written down at /standards/std-028-one-document-one-address and the reasoning at /decisions/adr-047.",
      },
      {
        type: "DEL",
        text: "482 addresses were removed. 373 of them were redirects that answered nothing: 262 landed on one report saying a batch of missions had been cancelled, 45 on the debt register, 37 on the index of reports — a reader following any of them found a notice, not the document they came for. 40 more were Spanish paths (/misiones/…, /decisiones/…) duplicating an English one, and 35 pointed at pages this site no longer builds. The site went from 774 addresses to 292: 166 pages and 126 redirects, every one of the 126 leading to a document that answers the question the old address answered. Anything else now meets the 404 page, which offers search and a way back.",
      },
      {
        type: "DEL",
        text: "The repository's own files stopped being published as pages: /readme, /changelog, /claude, /contributing, /security, /trademarks. They are the repository's furniture, not documents of a series, and they are read on GitHub where they belong. The full corpus index at /corpus went with them — with every folder reachable from the top bar and from /archive, a seventh page meaning 'all of them at once' was a second answer to a question already answered.",
      },
      {
        type: "ADD",
        text: "A new check runs on every build and refuses to publish an address that breaks the rule: a folder nobody registered, a path naming a function instead of a series, two addresses for one document, a Spanish segment, or a redirect that leads to an index, to another redirect, or to a page that does not exist. 15 tests, and each rule was disabled one at a time to prove the tests catch it.",
      },
    ],
  },
  {
    version: "v0.6.0",
    date: "2026-09-20",
    entries: [
      {
        type: "CHG",
        text: "/archive is now the classification of the archive, and it reads it from the archive. The page used to carry its own copy of the model — a list of seven 'fondos' naming folders (agents/guilds/, missions/active/, missions/backlog/, canon/platform-role-system.md) that had not existed for months, plus twelve operating principles and five failure patterns no document in the repository records. All of it is gone. What you see now is generated at build time from the two documents that own the scheme: the classification standard (/corpus/standards/std-027-the-classification-scheme) and the series register (/corpus/standards/std-001-the-series). One fond, six functions, sixteen activities, eighteen series — and the figures are counted, not typed. If a folder is added to the standard and nobody says where this site serves it, the build stops instead of printing a row that links nowhere.",
      },
      {
        type: "CHG",
        text: "The seven pages under /archive were one per folder and are now one per function: /archive/governance, /archive/production, /archive/assurance, /archive/agency, /archive/creation, /archive/administration. Each lists its activities, the folders each activity produces, what each folder holds, its identifier prefix, what a change to it costs, and a link to read it — or, for the instruments under machine/ and for the lore, one line saying why it is not published here. Every old address keeps resolving: the five that asked 'what is in this folder' land on that folder's index in the corpus, and the two without one (agents/, operations/) land on the function that classifies them.",
      },
      {
        type: "DEL",
        text: "The reference manual of the archive (/corpus/system/sys-003-archive-fondos) no longer carries the page's data in its header. It held a seven-entry list and a diagram definition that this site rendered directly, so a manual doubled as a database and the two drifted apart. It is prose again; the standards are the source.",
      },
    ],
  },
  {
    version: "v0.5.0",
    date: "2026-09-20",
    entries: [
      {
        type: "CHG",
        text: "The archive is now classified by function: one fond, six functions — Governance, Production, Assurance, Agency, Creation, Administration — and the activity under each that produces a series. The folders themselves did not move and no address changed; what changed is that the README and /corpus now say which activity produced what you are reading, instead of listing eleven folders with nothing grouping them. The scheme is published at /corpus/standards/std-027-the-classification-scheme, its reasoning at /decisiones/adr-046.",
      },
      {
        type: "FIX",
        text: "The archive pages called seven folders 'fondos'. In archival terms a fond is everything one producer generates — there is one fond here, and those seven are series of it. Corrected in the reference manual (/corpus/system/sys-003-archive-fondos); the /archive pages themselves still render the old model and are the next thing to redesign.",
      },
    ],
  },
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

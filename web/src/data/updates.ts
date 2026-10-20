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

/**
 * A closed week, folded into one line. The versions of a week that has
 * ended leave this file when its weekly report is written (PRO-017); the
 * report keeps what a visitor noticed, git keeps every entry. The same
 * only on this site: the summaries live in the archive, and the other
 * three sites keep their updates pages whole (PRO-017).
 */
export interface FoldedWeek {
  /** ISO week, "2026-W39". */
  readonly week: string;
  /** "21–27 September". */
  readonly span: string;
  readonly first: string;
  readonly last: string;
  readonly releases: number;
  /** What a visitor noticed, copied from the report's products section. */
  readonly text: string;
  /** The weekly report that holds the week. */
  readonly report: string;
}

export interface PendingItem {
  readonly status: "planned" | "blocked";
  readonly text: string;
}

export const UPDATES: readonly UpdateVersion[] = [
  {
    version: "v0.168.0",
    date: "2026-10-20",
    entries: [
      { type: "ADD", text: "The board report for week 40 (RPT-031): the company began to sell in the open and published its real books — 19 opportunities open, none won, about 19,500 € in the bank. The 74 versions of that week fold into one line below, leading to the report; every one is still in the repository's history." },
    ],
  },
  {
    version: "v0.167.0",
    date: "2026-10-18",
    entries: [
      { type: "FIX", text: "The top bar now stays put while you scroll on every page, on phone and desktop." },
      { type: "FIX", text: "The search magnifying glass in the mobile menu opens the search box — it used to open nothing." },
      { type: "CHG", text: "An empty section on the front door now names itself (\"Nothing filed under X yet\") instead of a bare empty line." },
    ],
  },
  {
    version: "v0.166.0",
    date: "2026-10-17",
    entries: [
      { type: "CHG", text: "/automation grades a seventeenth permission: merging to a train branch, never to main. It is granted alone at High and Full; merging to main stays with the person." },
    ],
  },
  {
    version: "v0.165.0",
    date: "2026-10-16",
    entries: [
      { type: "ADD", text: "Three principles for Numinia Engine, on the citizens' shelf: What a machine can read, anyone can use; A device that heats up has been asked too much; A limit nobody can check is a promise." },
      { type: "ADD", text: "SYS-016, Numinia Engine as wired: its layers, what decides what, its checks, and what is measured, estimated or not measured yet. The engine joins the list of repositories, and the Lexicon defines it as a product." },
    ],
  },
  {
    version: "v0.164.0",
    date: "2026-10-15",
    entries: [
      { type: "ADD", text: "The pipeline report gains Ready to leave: opportunities lost more than 90 days ago, which the next quarterly roll-up counts and then deletes. Won ones stay." },
    ],
  },
  {
    version: "v0.163.0",
    date: "2026-10-15",
    entries: [
      { type: "CHG", text: "The standard for an opportunity's record splits in three, each on one page: the record itself, who may be named in it and when (A client is named by consent), and which tenders and grants are recorded at all (Only a call that passes is recorded). Same rules, on the shelf What leaves the house; the rule codes of the last two change prefix." },
    ],
  },
  {
    version: "v0.162.0",
    date: "2026-10-14",
    entries: [
      { type: "ADD", text: "ADR-071: each organisation runs its own roles, as a Discord server does, and its members see who is connected. Three standards in draft hold the rules, on the Living together shelf: Organisation roles, Organisation permissions and Presence." },
    ],
  },
  {
    version: "v0.161.0",
    date: "2026-10-12",
    entries: [
      { type: "DEL", text: "The brand book loses its chapter Where we come from: the principle it read joined We build a game to work better in one sentence, and the origin story left the principles. Six chapters remain." },
      { type: "CHG", text: "The principles shelf no longer lists Friends who play, build and learn; its old addresses lead to We build a game to work better." },
    ],
  },
  {
    version: "v0.160.0",
    date: "2026-10-09",
    entries: [
      { type: "ADD", text: "ADR-069: each 3D world has a card in the archive, an order the servers read and keys only on its server; public and private worlds never share a fleet. MIS-156 brings up the first public world." },
    ],
  },
  {
    version: "v0.159.0",
    date: "2026-10-09",
    entries: [
      { type: "CHG", text: "The legal texts have one address: STD-037 asks the other three sites to link to the numinia.org pages and keep no copy, and each legal text says it is the single text for the four sites." },
      { type: "CHG", text: "STD-015 7.0.0: the common checks are called from the organisation's .github repository, pinned by commit, and no shared thing is copied by hand; STD-017 3.0.0: a change there needs the Oracle." },
    ],
  },
  {
    version: "v0.158.0",
    date: "2026-10-09",
    entries: [
      { type: "ADD", text: "SYS-013, the repositories as wired: every repository of the house, who writes to it, its licence and what reads it, and the copies still standing between them." },
      { type: "DEL", text: "SYS-001, the April architecture reference, is retired as stale; its addresses lead to SYS-013." },
    ],
  },
  {
    version: "v0.157.0",
    date: "2026-10-08",
    entries: [
      { type: "CHG", text: "Kairos's card and the playbook say what the watch does now: it brings only what the house can take alone, with what it holds today." },
    ],
  },
  {
    version: "v0.156.0",
    date: "2026-10-08",
    entries: [
      { type: "CHG", text: "The pipeline shows each opportunity's number on its card, in the list and on the timeline — OPP-2026-037 — so when someone talks about \"the 37\" you can find it at a glance. A radar finding links to its record only while the record exists." },
      { type: "DEL", text: "Eight opportunities leave the archive: three lost event sales (OPP-2026-002, 003, 004) and their proposals, which had no door under the rules for reaching someone who did not ask; three grants out of time or with no call this year (021, 022, 023); the Creative Europe call, which asks for a game already sold (036); and a partner with nothing known (020)." },
    ],
  },
  {
    version: "v0.155.0",
    date: "2026-10-08",
    entries: [
      { type: "ADD", text: "A new section, Stakeholders: one card for each organisation, public body or event that takes part in the system — who they are, from what they publish, and the role they can play. The first nine are Active Inference Institute, Adigital, Arcasiles, City of Mesa, Codemotion, Commit Conf, Nerdearla, R3S3T and Tetuan Valley." },
    ],
  },
  {
    version: "v0.154.0",
    date: "2026-10-08",
    entries: [
      { type: "ADD", text: "A new standard, Reaching someone who did not ask: the doors the law leaves open for a first contact — what an organisation published, a call, a letter, a meeting, an introduction — and that an e-mail waits for a yes. Its register, The doors, by country, keeps Spain and the EU and the United States in separate tables, with the audit of every change." },
      { type: "ADD", text: "A new debt, DBT-024: what the sales process still lacks before it calls anyone by name — a private place for contacts, the Lista Robinson, a fixed line, a call script, and a strategy that matches what the house sells today." },
      { type: "CHG", text: "The pipeline says where to write: each record whose organisation may be named shows its public mailbox and the page it is read from, and the radar's unreviewed calls do too." },
    ],
  },
  {
    version: "v0.153.0",
    date: "2026-10-08",
    entries: [
      { type: "ADD", text: "A sale's wand hands over the first-contact sheet in two formats, an A4 page for the e-mail and a one-column page for a phone, each ready to print to PDF under the client's file name. The sheet shows the price with and without tax, is valid one week and asks one thing: yes or no." },
      { type: "ADD", text: "A new piece, the expiry e-mail: sent once when the week ends with no answer, it asks the buyer to confirm the no." },
      { type: "DEL", text: "The four-page first-contact deck is retired; the one-page sheet replaces it." },
      { type: "ADD", text: "The sales playbook shows, at the stage that sends the first contact, how it asks: the price in the open, one week, yes or no, the no welcome, no sign of need." },
    ],
  },
  {
    version: "v0.152.0",
    date: "2026-10-07",
    entries: [
      { type: "ADD", text: "The site is now watched from outside: every six hours a check opens the front door, its text version, the map and the lexicon, and raises an alarm for the team when one of them stops answering. Behind it, every change to the code is also scanned for security weaknesses and for vulnerable dependencies." },
    ],
  },
  {
    version: "v0.151.0",
    date: "2026-10-07",
    entries: [
      { type: "CHG", text: "The pipeline starts with what is due. /system/pipeline opens on four buttons — Today (late steps and the day's own), Next 7 days, All open and Closed, so old records no longer mix with new ones — then a search, the kind and a range of dates (7, 30 or 90 days, or two dates of your own)." },
      { type: "CHG", text: "Each opportunity is one row of a list grouped by day: what it is about, its next step and how late it runs, its deadline with the days left, its value and how it pays, and its chance. The list can be ordered by date or by chance; Timeline and Asked / we have are the other two views, and the funnel closes the page." },
      { type: "ADD", text: "Every opportunity says what it is about and the line of the house it falls in; its chance — high, medium or low — is computed from whether that line is one the house sells and whether the house has already won something in it. A deadline can be written on any kind of opportunity, not only on tenders and grants." },
    ],
  },
  {
    version: "v0.150.0",
    date: "2026-10-05",
    entries: [
      { type: "CHG", text: "The narrative dial on /system/language has three levels, like the moon in the bar: Business, Mixed and Numinia. The two in-between levels of the old five-level scale are gone, and the vocabulary table has three columns." },
      { type: "CHG", text: "The map's last two rings have Numinia names. At the full moon the centre ring of the map now reads Tabularium (the city's archive of official records) and the outer ring Emporium (the enclave where people trade and offer), instead of keeping their plain names." },
      { type: "CHG", text: "New business words on /system/language. The dial's table now says Founding Partner, Executive, Principal, Contributor, Team member and New member for the six ranks, Profession, Specialization and Subspecialization for guild, branch and house, Contribution Credit for the Prism Cell and Experience / Event for the adventure, as the lore reviewer answered." },
    ],
  },
  {
    version: "v0.149.0",
    date: "2026-10-05",
    entries: [
      { type: "CHG", text: "The game has its section. The ten texts of the role-playing game on the front door (the codex, the two tabletop adventures and Session Zero) now sit under Products and services, and the 'Without a section' block is gone. The game's folder names its section once, in the vocabulary standard, and every text in it inherits it." },
    ],
  },
  {
    version: "v0.148.0",
    date: "2026-10-05",
    entries: [
      { type: "CHG", text: "The books open the front door: right under the title, one card per book with its one line; the ones not gathered yet say what they wait for." },
      { type: "ADD", text: "The legal playbook, at /legal-playbook: what the law asks of us in five chapters — what we hold to, the rules we keep, what to do when something happens, what we publish, what is still open — read from the documents that hold it." },
      { type: "ADD", text: "The role-playing manual, at /manual: the game chapter by chapter, in the Spanish original and the English edition. Four illustrations of chapter 2 never reached the archive; the text says where each one goes." },
      { type: "ADD", text: "The open books join the shelf, and two books to gather are named: the guild handbook and the engineering handbook." },
    ],
  },
  {
    version: "v0.147.0",
    date: "2026-10-05",
    entries: [
      { type: "CHG", text: "The templates speak any organisation's language, so they can travel to NWOS clients: where they said the Oracle approves, they now say the person responsible; the guild leaves the header (the section stays); proposals are governed by the organisation's own terms, not Numen Games'; reports ask what the organisation created, not its lore. Numinia's words stay a layer on top." },
      { type: "ADD", text: "A new companion on /templates: the register of who is responsible for what — one row per section, with the role, the person, who stands in and the agents beside them. Every \"person responsible\" in a document resolves to its section's row." },
    ],
  },
  {
    version: "v0.146.0",
    date: "2026-10-04",
    entries: [
      { type: "DEL", text: "The lore holds the game only. Three texts about how the company works (the role structure, the agent attributes and an old 'Welcome to Numinia') were older copies of what the principles say better; they leave, and their addresses lead to those principles. The lore index loses its World shelf." },
      { type: "ADD", text: "A new debt, DBT-023: the books, papers, talks and authors those texts named, kept until each one finds its place as a reference." },
    ],
  },
];

export const FOLDED: readonly FoldedWeek[] = [
  {
    week: "2026-W40",
    span: "28 September – 4 October",
    first: "v0.72.0",
    last: "v0.145.0",
    releases: 74,
    text: "The home lists the archive by section; the open books, the pipeline, the Lexicon and the brand book are pages; security headers.",
    report: "/reports/rpt-031-2026-w40",
  },
  {
    week: "2026-W39",
    span: "21–27 September",
    first: "v0.8.0",
    last: "v0.71.0",
    releases: 65,
    text: "The map of the archive became the home page; day and night modes; every document can be listened to; search and the phone menu fixed.",
    report: "/reports/rpt-024-2026-w39",
  },
  {
    week: "2026-W38",
    span: "14–20 September",
    first: "v0.1.0",
    last: "v0.7.0",
    releases: 11,
    text: "This page and the version in the footer began; one address per document; the archive browsed by function; a cookie policy; no visitor tracking.",
    report: "/reports/rpt-029-2026-w38",
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

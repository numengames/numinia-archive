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
    version: "v0.111.0",
    date: "2026-10-01",
    entries: [
      {
        type: "CHG",
        text: "Open books are now the books of Numen Games S.L., from the day it was born (16 February 2024), with the real FY2025 figures instead of simulated ones. A company card opens the page; five figures follow; six rooms keep the rest in reach: spending, company and owners, funding, clients and tenders, cash and runway, and every line.",
      },
      {
        type: "ADD",
        text: "Spending by day, week, month, quarter or year, as stacked bars, shares, lines or a map. Hovering or tapping a bar shows what it is made of: each category with its amount and share, and the suppliers that weigh most.",
      },
      {
        type: "ADD",
        text: "Company and owners: how the share capital grew to 5,512.40 € in four steps, every act the Mercantile Registry has published, and who governs the company. Funding: the ENISA loan of 100,000 €, as ENISA publishes it. Cash and runway: three ways to run the company (keep running, lean, asleep), time to tomb and what closing would cost, with the cash in the bank as a slider until it is loaded.",
      },
      {
        type: "DEL",
        text: "The simulated ledger, the forecast built on it and the supporters' homage list leave this page; the page now shows only real books and says which scenarios are simulations.",
      },
    ],
  },
  {
    version: "v0.110.0",
    date: "2026-09-30",
    entries: [
      {
        type: "ADD",
        text: "Open books shows the ENISA loan: a participative loan from the Spanish state's lender for innovative companies, signed on 22 October 2024, with its interest quarter by quarter in 2025 and ENISA's seal. These are the first real figures on the page; the rest is still simulated. The record is OPS-017.",
      },
    ],
  },
  {
    version: "v0.109.0",
    date: "2026-09-30",
    entries: [
      {
        type: "FIX",
        text: "Folding closed weeks into one line is this site's alone. The previous version said the four sites would fold the same way; they will not. The weekly summaries live only in the archive, and numinia.com, numen.games and nwos.numen.games keep their updates pages whole.",
      },
    ],
  },
  {
    version: "v0.108.0",
    date: "2026-09-30",
    entries: [
      {
        type: "CHG",
        text: "This page shows the current week in full and every closed week as one line: its versions, what a visitor noticed, and a link to the week's report, where the board reads the whole company. 76 versions of weeks 38 and 39 left the page; every one is still in the repository's history.",
      },
    ],
  },
  {
    version: "v0.107.0",
    date: "2026-09-30",
    entries: [
      {
        type: "CHG",
        text: "The site now opens at the new moon: plain words, like any company's documentation. The archive is written in the words an operations lead, a CTO or a CFO already uses, and the half moon and the full moon add Numinia's words on top. Until now it opened at the half moon, as if Numinia's words were the original. Readers who already chose a moon keep theirs.",
      },
      {
        type: "CHG",
        text: "The dial says so: the new moon reads \"The archive is written in these\", the half moon \"plain words with Numinia's beside them\".",
      },
    ],
  },
  {
    version: "v0.106.0",
    date: "2026-09-30",
    entries: [
      {
        type: "ADD",
        text: "A new standard, Every purchase ends in thanks: after paying, a buyer comes back to our own thank-you page, which names what they bought, says what happens next, where the receipt is and how to get help, and proves and keeps nothing. The core's map lists it beside Every charge delivers something.",
      },
      {
        type: "ADD",
        text: "The footer carries a button with a coffee cup, Support Numinia, under the line that says what the archive is. It opens numinia.com/support: the archive sells nothing itself. The same button is in the footer of all four sites.",
      },
    ],
  },
  {
    version: "v0.105.0",
    date: "2026-09-30",
    entries: [
      {
        type: "DEL",
        text: "The archive no longer sells. The Contribute page, the block at the foot of every document that led to it, and its footer link are gone: numinia.org is for reading. Supporting Numinia now happens on numinia.com/support, found through a small coffee cup at the foot of numinia.com.",
      },
      {
        type: "CHG",
        text: "On the map, Support Numinia under The offer · Collect now leads to numinia.com/support. The record of the offer (OPS-014) stays here: a coffee for €5, Sponsor from €200, and a supporter's badge for whoever pays.",
      },
    ],
  },
  {
    version: "v0.104.0",
    date: "2026-09-29",
    entries: [
      {
        type: "CHG",
        text: "The bar opens with the Numinia wordmark instead of the name typed out, as numinia.com does. The design system now says it: every site's bar carries its wordmark, Numinia's on the Numinia sites and Numen Games' on the company's.",
      },
    ],
  },
  {
    version: "v0.103.0",
    date: "2026-09-29",
    entries: [
      {
        type: "CHG",
        text: "numinia.org now leads the design of the four sites, and the design system was rewritten to say what this site already does. The system page shows sixteen animations instead of fifteen: the entrance that opens every page here (label, headline and line rising 24 px over 600 ms, one after another) is now in the catalogue. The icon list names the 71 glyphs the site uses, grouped by what they mean. The page column, the bar (the name written, labels with a small icon, the active entry underlined in turquoise) and the headline in regular Geist are written down, so numinia.com, numen.games and nwos.numen.games can copy them.",
      },
      {
        type: "FIX",
        text: "Two roundings and no more: every card, box and panel has 8 px corners and every button or small control 6 px. Some cards had 12 or 16 px and some buttons 4 px; thin bars are fully rounded.",
      },
      {
        type: "FIX",
        text: "Three agents on /agents were painted in colours outside the palette (pink, aquamarine, silver); they now take palette colours: Arena, Turquesa and the veiled Arena.",
      },
    ],
  },
  {
    version: "v0.102.0",
    date: "2026-09-29",
    entries: [
      {
        type: "ADD",
        text: "A new standard on the second shelf of /standards, beside the one that rolls the reports up: A report speaks to the board. The weekly, quarterly and annual reports are written for a board and for the public, under nine headings — the period in brief, business and customers, money, products and services, the world and its creations, people and agents, governance, risks and debts, the outlook. /templates shows the three moulds beside the report mould.",
      },
    ],
  },
  {
    version: "v0.101.0",
    date: "2026-09-29",
    entries: [
      {
        type: "ADD",
        text: "The moon in the bar now reaches the map. Turn it and the home speaks at the stop you chose: the name at the top, the rings in each panel and in the astrolabe's centre, the district boxes, the rows of each panel, the \"What brings you here?\" answers, the line on how to read the map, the tooltips and what a screen reader hears. Until now only the Archive page listened to it.",
      },
      {
        type: "ADD",
        text: "At the full moon the four district boxes carry their faction under the name (Heirs of Eleusis, Hermeticists, Stellar Circle, Neo-Atlantists), since the name already is the place. At the new moon the centre reads Governance and the agents' piece reads Team.",
      },
      {
        type: "FIX",
        text: "The Sycamore faction is written Neo-Atlantists, as the codex glossary and the manual's name table write it; the map said Neo-Atlanteans.",
      },
    ],
  },
  {
    version: "v0.100.0",
    date: "2026-09-29",
    entries: [
      {
        type: "ADD",
        text: "This page can be listened to: the same reading player as every document, above the timeline.",
      },
      {
        type: "ADD",
        text: "Every version says the hour it shipped, in Central European Time, and the build it names — the commit that shipped it, linked to GitHub. Until now only the newest version had a commit, and none had an hour. Both are read from the repository's history when the site is built, not typed.",
      },
    ],
  },
  {
    version: "v0.99.0",
    date: "2026-09-29",
    entries: [
      {
        type: "FIX",
        text: "Two names of the world are written one way only. The Veil is the Veil in English — the design page, the canon and the recipes said «Velo»; the recipe for the book and the Veil moves to /blueprints/book-and-veil and the old address leads there. The Summa Archive keeps two m's and that word order everywhere.",
      },
      {
        type: "ADD",
        text: "The moon dial finds more words: at the Numinia stop, The work reads The guilds, The world reads The City, Decisions read Decision Stone and Reports read Dispatch; at the plain stop, Canon reads Purpose, Standards read Policies and Agents read Team. Words for now, accepted until the census understands them better.",
      },
    ],
  },
  {
    version: "v0.98.0",
    date: "2026-09-29",
    entries: [
      {
        type: "FIX",
        text: "The cookie notice shows Accept all and Reject all side by side and the same size on every screen, as on the other three sites. On a computer they were stacked one above the other.",
      },
      {
        type: "CHG",
        text: "The legal notice (/legal/notice, version 0.2.0) gives the company's entry in the Mercantile Registry of Madrid — volume 46518, folio 130, sheet M-816810, entry 1 — and the postal code of its registered address, 28290 Las Rozas de Madrid. The law asks every website to show them.",
      },
    ],
  },
  {
    version: "v0.97.0",
    date: "2026-09-29",
    entries: [
      {
        type: "ADD",
        text: "How the archive speaks to you. A moon beside day and night opens a small dial with three moons. New moon: plain words, the ones any company's documentation uses (Governance, Project, Process, Knowledge Base). Half moon: the archive as it is today, where every visitor arrives. Full moon: Numinia's own words (the districts Ouroboros, Vitruvian, Solomon and Sycamore; the Archive Summa) and the book's typeface, with the columns of the archive surfacing slowly, one after another. The page dissolves and returns in the new words; documents keep their own text. No word is invented: each one is copied from an archive file, and a test fails if it is not there. Where the archive has no word yet, today's stays.",
      },
    ],
  },
  {
    version: "v0.96.0",
    date: "2026-09-29",
    entries: [
      {
        type: "ADD",
        text: "A cookie notice on the first visit, with Accept all and Reject all side by side. This site has nothing optional to switch off — it keeps only your day or night mode, the reader's speed and your answer — and the notice says so. The footer gains Change my cookie choice.",
      },
      {
        type: "ADD",
        text: "Legal notice (/legal/notice): who runs the four sites — Numen Games S.L., tax ID, address, legal@numengames.com — what each licence lets you do, and the rules for using the sites. The registry entry is still to come.",
      },
      {
        type: "FIX",
        text: "The legal pages no longer show notes meant for us: review flags, archival notes, 'see the frontmatter', 'Audience: Oracle'. The privacy policy now says what the sites do: who hosts them, who handles sign-in, which providers are in the United States, and that services are for people aged 18 or over. A test fails the build if an internal note or an old email address comes back.",
      },
    ],
  },
  {
    version: "v0.95.0",
    date: "2026-09-29",
    entries: [
      {
        type: "ADD",
        text: "Configure NWOS (/configure) gathers the four settings an organisation chooses: the narrative dial, the gamification dial, the level of automation and the team of agents. Each had its own page filed in a different place — the dials sat at the foot of /system behind a single link. The map and the archive reach it from The offer · Organise, and it also opens the moulds a new agent is copied from.",
      },
      {
        type: "FIX",
        text: "Nothing is hidden any more. Pages no link led to from the map or the archive now have a door: the agents' index and Legal in the map and the archive, the draft on how the next mission is chosen on the mission board, the agent moulds on /configure. A new check fails the build when a page cannot be reached from the map or the archive.",
      },
    ],
  },
  {
    version: "v0.94.0",
    date: "2026-09-29",
    entries: [
      {
        type: "FIX",
        text: "The archive's map now leads to Contribute. Under The offer, Collect, the entry Support Numinia was marked 'to create' with no link; it opens /contribute, and says what it is: Backer from €5 a month, Sponsor from €200. It no longer promises a one-off payment, which is not offered.",
      },
    ],
  },
  {
    version: "v0.93.0",
    date: "2026-09-29",
    entries: [
      {
        type: "ADD",
        text: "Contribute, at /contribute: the ways to help keep Numinia going, modelled on Open Collective's Contribute page without its Donation card. Two cards, Backer from €5 a month and Sponsor from €200, each read from the record of what is on sale. Open one and walk the path: amount and how often, how you appear on the wall (name, alias or none; with the amount or without), and a summary with what each payment turns into. Nothing is on sale yet, so the last button says Coming soon until the terms for selling to people are published.",
      },
      {
        type: "ADD",
        text: "At the foot of every document, one short block: the archive is open and stays open, and you can hold it up from €5 a month. It links to /contribute; the footer does too.",
      },
    ],
  },
  {
    version: "v0.92.0",
    date: "2026-09-29",
    entries: [
      {
        type: "CHG",
        text: "The levels and the permissions on /automation are now two registers of the archive, read at build time: The levels of automation (STD-041, the five levels, what the person does in each, and the two ends outside the scale) and What an agent may do without asking (STD-042, sixteen permissions graded at each level, and the floor). Edit a register and the page changes; a test fails if they drift. Both sit on the first shelf of /standards, beside who may change what.",
      },
      {
        type: "CHG",
        text: "Requesting approval now asks for the plain words first — what I am about to do, what could go wrong, whether it can be undone — with the command beneath, because the person who answers did not write the command and answers for it.",
      },
    ],
  },
  {
    version: "v0.91.0",
    date: "2026-09-29",
    entries: [
      {
        type: "CHG",
        text: "Open books' support simulator offers 5, 10 and 25 euros a month, the amounts of the Backer card that Numinia will sell. It offered 3, 5, 10 and 20; below 5, the payment processor's fixed fee eats too much of each payment.",
      },
    ],
  },
  {
    version: "v0.90.0",
    date: "2026-09-29",
    entries: [
      {
        type: "CHG",
        text: "Whoever supports Numinia now chooses two things about how they appear: with a name, an alias or none, and with what they gave or without it. Saying nothing still means no name and no amount. The money canon, its standard, the account's system document and the protocol for putting something on sale all said an amount was never shown; they now say it is the payer's to show. Open books' homage list shows the second choice. Nobody's pay on the team is published: that rule is a different one and stays.",
      },
    ],
  },
  {
    version: "v0.89.0",
    date: "2026-09-29",
    entries: [
      {
        type: "ADD",
        text: "What an agent may do without asking, at /automation. An agent asks its operator for permission many times a session, and each request arrives as a line of shell he did not write. The page draws the five levels of automation as the home's astrolabe — Assisted at the centre, Partial, Conditional, High and Full at the rim, a dotted line beyond it for the floor no level grants alone — and grades sixteen permissions at each level: what each lets the agent do, what could go wrong, whether it can be undone, who grants it today. A lens shows where each agent of the house sits, read from the automation_level its operator file now declares (Ursa at Partial, the rest at Assisted); the same request is shown as the shell it arrives in and as the words it should arrive in. Nothing new: the rules the archive already holds, arranged for the person who says yes. Linked from what binds today.",
      },
    ],
  },
  {
    version: "v0.88.0",
    date: "2026-09-28",
    entries: [
      {
        type: "CHG",
        text: "A rule says whether it binds you where it says whom it binds. Every rule document opens with a Binds line — 'every agent, in every session' — and on a draft that sentence was not true today: draft binds nobody. The band under the title said draft, /binding said draft, and the first line of the document kept saying the opposite in the imperative, so a reader obeyed it. On a draft the line now reads 'Would bind, once in force:', followed by the document's own words, untouched; the day a rule is promoted it reads 'Binds:' again with nothing edited. The rule index agents read in AGENTS.md gains a State column for the same reason.",
      },
      {
        type: "CHG",
        text: "One name for one archive: document pages are titled '— numinia-archive' instead of '— Corpus NWOS', and the agent context is titled after the repository.",
      },
    ],
  },
  {
    version: "v0.87.0",
    date: "2026-09-28",
    entries: [
      {
        type: "CHG",
        text: "No more drop-down in the bar. Archive is a plain button: it opened a large panel every time the pointer crossed the bar and covered the page. The bar now has two ways in — the map, to explore, and the archive page, to go straight to a series.",
      },
      {
        type: "CHG",
        text: "On the archive page every entry of the four blocks is drawn as a button, so it is plain that each one is a link; the ones not written yet are dashed. The books and our other sites, which only the drop-down listed, now sit under the blocks.",
      },
    ],
  },
  {
    version: "v0.86.0",
    date: "2026-09-28",
    entries: [
      {
        type: "CHG",
        text: "The bar keeps two buttons: Map and Archive. Hovering Archive still opens its four blocks — the rules, the work, the world, the offer; clicking it now takes you to the archive page, which opens with those same four blocks. The books moved to a row at the foot of that menu.",
      },
      {
        type: "CHG",
        text: "The archive page lost the six function cards and the turning graph: they drew a second map of the same archive in older words, and disagreed with the four blocks. What only this page says stays — who writes this, what state it is in, how a document announces itself. The classification in full is still at /scheme.",
      },
      {
        type: "FIX",
        text: "Codex, World and Adventures in the menu took you into one document (the glossary, the welcome essay, one adventure). Each now opens the lore page at its own shelf.",
      },
      {
        type: "FIX",
        text: "Moving between pages no longer flashes white: the page's own colour is painted before anything else loads, browsers that can cross-fade from one page to the next, and a page starts loading while the pointer rests on its link. The descriptions under the menu entries now appear at once, in the site's own style.",
      },
    ],
  },
  {
    version: "v0.85.0",
    date: "2026-09-28",
    entries: [
      {
        type: "ADD",
        text: "Open books now shows every line of the ledger, newest first, with a search box and filters by category, year and direction — the way Open Collective lists its transactions. One line per document, without VAT; usage billed by the day appears as the one invoice a month it is; staff stay one line a month for everyone together.",
      },
      {
        type: "ADD",
        text: "A section on VAT: why every figure on the page carries none, what reverse charge (ISP) is and why most of Numinia's invoices fall under it, and a table of what each amount a person might pay turns into — the VAT for the tax authority, the card processor's fee and what reaches Numinia. The support simulator now uses the same split.",
      },
      {
        type: "CHG",
        text: "The panel at the top gains the year: costs today, this month, this year, since 2020, and what Numen Games has put in.",
      },
    ],
  },
  {
    version: "v0.84.0",
    date: "2026-09-28",
    entries: [
      {
        type: "ADD",
        text: "The home page now answers 'what binds today?' before anything else: most documents are drafts and bind nobody, and one link leads to /binding, the page that lists the few in force. The same panel tells an agent to start at /llms.txt and that any address plus .md gives the file behind the page. Every page's head now points at /llms.txt and /index.json, so a program finds them without guessing.",
      },
    ],
  },
  {
    version: "v0.83.0",
    date: "2026-09-28",
    entries: [
      {
        type: "DEL",
        text: "The old copy of 'The model needs a story' leaves the lore shelf: the text that explains how Numen Games and Numinia relate was there twice, once as the canon and once as an older version among the world's documents. The canon keeps it; /lore/world/epistemic-relations no longer exists.",
      },
    ],
  },
  {
    version: "v0.82.0",
    date: "2026-09-28",
    entries: [
      {
        type: "ADD",
        text: "/templates — every mould a document of the archive is copied from, gathered on one page to be worked on. A table puts every header field of every mould side by side, so a field that means the same thing under two names, or that one mould teaches and its neighbour forgets, is visible at a glance. Then each mould on its own: what it makes, where the copy goes, the fields it asks for and the sections of its body. It is read from the moulds themselves at build time; the map's Templates entry, which led nowhere, now leads here.",
      },
      {
        type: "CHG",
        text: "The mission mould opens with the same header as every other mould, in the same order (identifier, title, type, state, version, dates, author, owner, guild, territory, tags, licence), then the board's own fields. The filled example beside it follows the same order and the same numbered sections, and the long record of why the mould changed in August — its figures long stale — is gone; git keeps it.",
      },
    ],
  },
  {
    version: "v0.81.0",
    date: "2026-09-28",
    entries: [
      {
        type: "CHG",
        text: "An opportunity and its proposal are documents like every other: the same header (title, state of the document, version, dates, author) and the same card on top — what it is, what question it answers, what you can do with it, for whom. The page title is the record's heading — \"OPP-2026-001 — a national police force's training academy\", not \"OPP-2026-001.md\" — and the chips show where it stands: the document's state, the version and the date. Their moulds now sit with every other mould and are checked like them.",
      },
    ],
  },
  {
    version: "v0.80.0",
    date: "2026-09-28",
    entries: [
      {
        type: "ADD",
        text: "Metis, the sales agent, joins the roster at /agent. She is named after the Titaness of practical intelligence and prudence: she qualifies opportunities, prepares client meetings, keeps each record at its true stage, drafts proposals from the defined offer and follows them to a clear end. The sales system had its rules, its tool and its first opportunity; now it has an agent whose work it is.",
      },
    ],
  },
  {
    version: "v0.79.0",
    date: "2026-09-28",
    entries: [
      {
        type: "FIX",
        text: "Every page again has its \"View on GitHub\" link: the opportunities, the proposals, the legal texts, the lore (adventures, codex, world) and the object cards were rendered with no way back to the file they come from, because their folders were missing from the list that builds the link. Their breadcrumb now names the folder too, instead of \"raíz\".",
      },
    ],
  },
  {
    version: "v0.78.0",
    date: "2026-09-28",
    entries: [
      {
        type: "ADD",
        text: "The pipeline, as three readers see it: /system/pipeline reads every opportunity record through the sales kit's own tool at build time — no figure typed — and cuts them in the browser. Whoever sells gets what needs a move today, overdue first; management gets weighted value, win rate, cycle, days per stage and why lost; anyone gets the same records, public as they stand. What happened by week, month, quarter and year is read from the transitions each record carries: the weekly, quarterly and annual report as a view, not a document. A markdown twin at /system/pipeline.md says the same figures as text. Opportunities and the pipeline now sit on the map, in Administration, beside the open books.",
      },
    ],
  },
  {
    version: "v0.77.0",
    date: "2026-09-28",
    entries: [
      {
        type: "CHG",
        text: "The process is the evidence. A proposal no longer carries a reviewer's name: whoever sends it has read it, and the record's transition to proposed — dated, with the sender's name — says so once. Who signs lives in the agreement, private unless the contract is public. The role of whoever can sign for the client is required from agreed, not from qualified: the first real opportunity showed the house may not know it after one good conversation. The first proposal, 'The scene before the scene', now sits beside its record, drafted and not yet sent.",
      },
    ],
  },
  {
    version: "v0.76.0",
    date: "2026-09-28",
    entries: [
      {
        type: "ADD",
        text: "The first opportunity record, and the first proposal beside it: a national police force's training academy, where future officers would rehearse a crime scene — which evidence is there, what is done with each piece, in which order — from a phone, a computer or a headset. The record is at lead: the first meeting is still to happen. The proposal, 'The scene before the scene', is a draft for that meeting; it names the level at which learning will be judged (sequence errors, first walk against last) and shows the whole price. Nobody's name in either; the organisation by sector until it agrees.",
      },
    ],
  },
  {
    version: "v0.75.0",
    date: "2026-09-28",
    entries: [
      {
        type: "ADD",
        text: "Opportunities, a new series and a new section: every chance to sell something, as a public record. The Oracle's word: radical transparency — the pipeline is read by anyone, the records carry nobody's name, e-mail or phone, and they name the organisation by sector and size until it has agreed to a proposal. The folder is empty today; the first record to land appears here on its own, and the pipeline tool checks every record on every change.",
      },
      {
        type: "CHG",
        text: "'An opportunity has a record' no longer sends the records to a closed place: they live here, public, with a person never in them and the organisation named only once it agrees. 'The stages of a sale' says from which stage the organisation is named instead of how long personal data is kept.",
      },
    ],
  },
  {
    version: "v0.74.0",
    date: "2026-09-28",
    entries: [
      {
        type: "ADD",
        text: "Training has its offer record. 'Training — the offer' says what Numen Games sells under that name — a browser-based place, built from a client's own procedure, where their people rehearse it before the day it counts — what is delivered (the place, the accesses, the trace each learner leaves, the files, the measure), how learning is judged at one of four levels, two cases with the clients unnamed, and that the price is on quote. The map of the Summa no longer says 'In preparation' under Training: it points here.",
      },
      {
        type: "ADD",
        text: "'Selling, as wired today', on the system shelf: the pieces a sale passes through — rules, steps, offer record, moulds, tool, records, agreement, ledger — each marked wired or not yet, and how an opportunity flows through them.",
      },
    ],
  },
  {
    version: "v0.73.0",
    date: "2026-09-28",
    entries: [
      {
        type: "ADD",
        text: "Three protocols carry out how a sale is written down, in draft: 'Qualifying an opportunity' (open the record the day a sign of interest arrives, ask whether what they need is what we make, find who signs, decide within two weeks), 'Making a proposal' (hear the four things in the client's words, draw the procedure on one page with the specialist, write the proposal from the mould, have it reviewed and approved, send it) and 'Closing a sale' (follow up on a cadence, fix the scope, sign under the house's terms, hand over to whoever builds and to the ledger, write down why it was won or lost). They read among the protocols after 'Putting something on sale' and before 'Closing the month'. A test now fails if the register of stages names a state no protocol moves an opportunity into.",
      },
    ],
  },
  {
    version: "v0.72.0",
    date: "2026-09-28",
    entries: [
      {
        type: "ADD",
        text: "Three standards for how a sale is written down, opened in draft on the shelf What leaves the house. 'The stages of a sale' is a register: the seven states an opportunity passes through, what moves it, when it goes stale, the reasons one is lost. 'An opportunity has a record' says what the file of each opportunity must carry, with roles in the header and names only in the body, kept outside the public archive. 'A proposal says four things' follows the international standard for learning services: objectives in the client's words, why us, how it teaches and how it measures, price with tax visible. The repository ships a small kit beside them: two moulds and a script that reads a folder of records and prints the pipeline.",
      },
    ],
  },
];

export const FOLDED: readonly FoldedWeek[] = [
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

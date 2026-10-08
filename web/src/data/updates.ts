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
    version: "v0.153.0",
    date: "2026-10-08",
    entries: [
      { type: "ADD", text: "A new standard, Reaching someone who did not ask: the doors the law leaves open for a first contact — what an organisation published, a call, a letter, a meeting, an introduction — and that an e-mail waits for a yes. Its register, The doors, by country, keeps Spain and the EU and the United States in separate tables, with the audit of every change." },
      { type: "ADD", text: "A new debt, DBT-024: what the sales process still lacks before it calls anyone by name — a private place for contacts, the Lista Robinson, a fixed line, a call script, and a strategy that matches what the house sells today." },
      { type: "CHG", text: "The pipeline says where to write: each record whose organisation may be named shows its public mailbox and the page it is read from, and the radar's unreviewed calls do too." },
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
  {
    version: "v0.145.0",
    date: "2026-10-04",
    entries: [
      { type: "ADD", text: "A new procedure on the shelf, Handling a security weakness (PRO-036): when a key is exposed or someone reports a flaw, the key is changed before anything about it is written, the finder is answered within seven days, the fix is merged, and only then is it written up." },
      { type: "CHG", text: "Secrets (STD-022) is in force. Every rule it keeps is checked by a machine: the full-history secret scan, a test that refuses a tracked settings or key file, and a test that the security policy sends finders to GitHub's private reporting form. A rule leaves draft only when no row of its checks is left to a person (PRO-023)." },
    ],
  },
  {
    version: "v0.144.0",
    date: "2026-10-04",
    entries: [
      { type: "CHG", text: "The narrative moon in the bar turns with each tap: L1, plain words; L2, both; L3, Numinia's words; and back to L1. No dial opens. The moon shows the level you are in, and its tooltip names it." },
      { type: "CHG", text: "The day and night switch shows the mode you are in: the moon with stars at night, the sun by day. It showed the other way round until now." },
    ],
  },
  {
    version: "v0.143.0",
    date: "2026-10-03",
    entries: [
      { type: "CHG", text: "The site opens on the archive, arranged by the ten business sections of the world's vocabulary (STD-030): strategy and governance, products and services, brand and marketing, sales and partners, operations, people and culture, finance, legal and compliance, technology, knowledge and quality. Each section shows its one line, how many records it holds and every record by series, each a link; what no section claims yet is listed apart, not hidden. At the full moon a line under each section names the houses that serve it." },
      { type: "CHG", text: "The map of the Summa is at /map; the bar reads Archive · Map. The old About address leads home, and its books, sister sites and alpha notice moved to the front door." },
    ],
  },
  {
    version: "v0.142.0",
    date: "2026-10-03",
    entries: [
      { type: "CHG", text: "The folder of the rules that run on every change is now machine/checks, the word continuous integration uses for a program that passes or fails a change (the GitHub Checks API, the CI checks); it was machine/guards, and in programming a guard is a clause, not a program. The manual of the tooling (SYS-007) and the classification scheme name the new folder; the command is npm run checks." },
    ],
  },
  {
    version: "v0.141.0",
    date: "2026-10-03",
    entries: [
      { type: "CHG", text: "The series Blueprints is now Designs: the word engineering uses for a written account of how something is or will be built that obliges nobody — a design document, as the proposals of Python, Rust and Kubernetes are — where a vendor's blueprint is a template to deploy. Each document took a new identifier (DES-NNN for BLU-NNN) and remembers the old one; the old addresses under /blueprints lead to the new ones under /designs. On the dial, Blueprints is still what Numinia calls them." },
    ],
  },
  {
    version: "v0.140.0",
    date: "2026-10-03",
    entries: [
      { type: "CHG", text: "The series Canon is now Principles: the word the quality standards use for what an organisation states about itself and why, where a canon is the word of a story. Each document took a new identifier (PRI-NNN for CAN-NNN) and remembers the old one; the old addresses under /canon lead to the new ones under /principles. On the dial, Canon is still what Numinia calls them." },
    ],
  },
  {
    version: "v0.139.0",
    date: "2026-10-03",
    entries: [
      { type: "CHG", text: "The series Protocols is now Procedures: the word the quality standards use for a specified way of carrying out an activity, where a protocol in software means rules for exchanging messages. Every document kept its identifier (PRO-NNN); the old addresses under /protocols lead to the new ones under /procedures." },
    ],
  },
  {
    version: "v0.138.0",
    date: "2026-10-03",
    entries: [
      { type: "CHG", text: "The archive calls its own things by the words their trades use. A mission now says who carries it out — an agent, a person or both — instead of calling a person a biological agent; a paused mission is on hold, not frozen; a document's header says how it was made under the name the press uses for it; every standard is filed as a standard, not as documentation. The Lexicon says, for each word, which convention it follows and where that convention is written." },
    ],
  },
  {
    version: "v0.137.0",
    date: "2026-10-03",
    entries: [
      { type: "CHG", text: "Every record now says which section of the company it belongs to — Strategy and governance, Products and services, Brand and marketing, Sales and partners, Operations, People and culture, Finance, Legal and compliance, Technology, Knowledge and quality — the ten sections a company recognises, in place of the old territory label. Blueprints, decisions and missions show it." },
      { type: "ADD", text: "The world's vocabulary gains the translator: the company's sections beside the city's guilds and houses, the business lines beside the factions, and who decides what — one table, read by the site." },
    ],
  },
  {
    version: "v0.136.0",
    date: "2026-10-03",
    entries: [
      { type: "ADD", text: "Brand and culture, a book at /brand: where we come from, why we exist, what we will not trade away, the brand in three words, how we sound and look, how we live together and where we are going. Seven chapters, every word read from the canons and records; what is not written yet is said, not filled." },
      { type: "DEL", text: "The old brand and culture deck leaves the lore: everything worth keeping now lives in canon and records, and its address opens the book." },
    ],
  },
  {
    version: "v0.135.0",
    date: "2026-10-03",
    entries: [
      { type: "ADD", text: "A small skull at the end of the footer. Hover it, focus it or tap it and it shows the epitaph that closes the manifesto: they dreamed and experimented life, they imagined and took action." },
      { type: "ADD", text: "How to get help from us: one record with every door — Discord, email, the address for your personal data — and whether it is open today." },
      { type: "CHG", text: "The footer button says Back Numinia and leads to numinia.com/back; numinia.com/support is now the help page. Discord joins the social column." },
    ],
  },
  {
    version: "v0.134.0",
    date: "2026-10-03",
    entries: [
      { type: "ADD", text: "A canon among The citizens, in draft: 'We recognise the act; we never buy the game'. Why and how Numinia rewards anyone, in six tests: relations first, autonomy and competence and bonds, recognition after the act and never a prize to play, what you earn is yours, cathedrals not prefab homes, and the culture people live when nobody obliges them." },
      { type: "CHG", text: "Lines rescued from the old brand deck: the current era is the Repopulating of Numinia; the house admires the builders of role-playing games; the references are held within Mediterranean philosophy and mythology; the ideal customer, the concepts we want to be known by, and why the metaverse is early, like email and the web once were." },
    ],
  },
  {
    version: "v0.133.0",
    date: "2026-10-03",
    entries: [
      { type: "ADD", text: "Two canons among The citizens, both in draft. 'Friends who play, build and learn' tells where the house comes from: origin, present and future, and who the Oracles are to each other. 'A magician who keeps hope, with humans in charge' says what the brand is in three words — the Magician, hope, humans in charge, made with agents for humans — at each narrative level." },
      { type: "CHG", text: "The brand canon's 'What we believe' is the manifesto again, to be read in one breath, and it closes on the epitaph." },
    ],
  },
  {
    version: "v0.132.0",
    date: "2026-10-03",
    entries: [
      { type: "ADD", text: "The Lexicon, a book at /lexicon: the 158 words Numen Games works with, A to Z, one page per letter, a letter bar at the head of each and the next and previous letter at its foot. Each word says what it is, what it clears up, what it lets you do and how it is said at each narrative level, the one at your level marked. Every word is read from the operative vocabulary; the page types none." },
      { type: "ADD", text: "Books get a button back to the top once you have scrolled two screens down. The Lexicon has it first." },
    ],
  },
  {
    version: "v0.131.0",
    date: "2026-10-02",
    entries: [
      { type: "CHG", text: "The site has one name, said at your narrative level. Every tab reads the page, then the site: at L1 'numinia.org, the archive of Numen Games', at L2 'the archive of Numinia', at L3 'the Summa Archive'. The seven names a tab could show before (the Summa, numinia-archive, Numen Games CAO, NWOS, Numinia, Numen Games, Pablo FM) are gone. Search engines, link cards and agents read L1." },
      { type: "CHG", text: "The moon in the bar is the narrative level: its dial names its three stops L1, L2 and L3, and its title says Narrative level." },
    ],
  },
  {
    version: "v0.130.0",
    date: "2026-10-02",
    entries: [
      { type: "ADD", text: "Telemetry is a panel to decide from. Pick a period (week, month, quarter, all, or dates) and read it as Product or as CTO. Four figures up top: documents with a page, tokens in the whole archive, growth in the period, rules in force. Then where the archive grows, by function, and which function weighs most; for Product, how much is in force and what weighs with no page; for the CTO, the documents that cost most to read and what the repository is made of. Each panel ends in one action line with its threshold. The census of every figure stays below it." },
      { type: "ADD", text: "The instrument now weighs every tracked file by kind — text, code, image, data, font, office — files and bytes." },
      { type: "FIX", text: "The telemetry page's tab no longer reads 'Pablo FM', and it no longer says there is no chart." },
    ],
  },
  {
    version: "v0.129.0",
    date: "2026-10-02",
    entries: [
      { type: "CHG", text: "Draft no longer reads as 'binds nobody'. The system is in alpha, and a draft is a rule on trial: it is followed, its check warns and never blocks, and any change to it is analysed, then its owner decides. An active rule is followed too, and breaking it blocks. The same words now stand on the home, What binds today, the scheme, every draft's band, llms.txt, index.json and robots.txt; a draft's Binds line reads 'On trial, for:'." },
    ],
  },
  {
    version: "v0.128.0",
    date: "2026-10-02",
    entries: [
      { type: "ADD", text: "A new protocol, Watching for opportunities: from the places where calls are published to the Oracle's yes or no. A watch sweeps and weighs, writes what could fall to its own feed without review, the pipeline page shows it apart, the Oracle decides, and only a reviewed pull request opens the record." },
      { type: "CHANGE", text: "The sales playbook covers the whole road: it opens with Before the record (the watch, its feed and the Oracle's decision, with the table of a watch's verdicts) and gives a chapter to each kind — a sale, a tender, a grant, a collaboration, a partner — with its stages and the protocol that moves each on." },
    ],
  },
  {
    version: "v0.127.0",
    date: "2026-10-02",
    entries: [
      { type: "ADD", text: "The pipeline page shows what the tender radar found, marked Unreviewed and apart from the funnel: each call with its chance, close date, blocker and next step, linked to its record when the archive already holds it. It is read from the radar's own public repository when the page is built; the archive checks it again for names and closed calls." },
    ],
  },
  {
    version: "v0.126.0",
    date: "2026-10-02",
    entries: [
      { type: "ADD", text: "The wand on every sale's page: it shows the stages of the sale and where this one stands, and the pieces each stage hands over. The first-contact deck and e-mail are made from the record itself and can be seen, downloaded or copied; what a piece lacks is named, and the organisation's name and the person written to stay as marks." },
      { type: "ADD", text: "A new book, The sales playbook (/playbook): each stage of a sale, the protocol that moves it on and the collateral it hands over, read from the register of stages, the register of collateral and the protocols themselves. It is in the Books list and on the map, beside the pipeline." },
    ],
  },
  {
    version: "v0.125.0",
    date: "2026-10-02",
    entries: [
      { type: "ADD", text: "A new register on the standards shelf, The sales collateral: what each stage of a sale hands to the other side — a first-contact deck and e-mail, a one-page sheet, a video, a proposal — what each is made from, what stops it from being made and whether it has earned its place." },
    ],
  },
  {
    version: "v0.124.0",
    date: "2026-10-02",
    entries: [
      { type: "ADD", text: "A new protocol on the protocols shelf, Auditing a site's code: every route a site answers is listed and probed live, with what it fetches, what it lets a browser run, the headers and cookies as served, what its workflows may write and what it depends on. It stops before changing anything." },
      { type: "CHG", text: "Changing what a site stores now checks the built site twice — with an empty browser and with one carrying what the previous version stored — and says what to do with a stored item the change replaces." },
      { type: "ADD", text: "The site now tells every browser how to protect a visit: HTTPS only, no framing by another site, and a content policy that lets pages load only what comes from numinia.org itself. A researcher who finds a flaw can read where to report it at /.well-known/security.txt." },
      { type: "FIX", text: "The search loads its index without evaluating text as code, so the new content policy can refuse that everywhere. The cookie notice now lists the narrative dial's stored choice, which the cookie policy already named." },
    ],
  },
  {
    version: "v0.123.0",
    date: "2026-10-02",
    entries: [
      { type: "CHG", text: "The downloads on Open books now open as workbooks in the house's colours: a dark band with the title on every sheet, a front page with the four headline figures and the four kinds of figure, totals set apart, losses in red, and native charts — where the money goes, three years of the plan, 36 months of cash. Accounts and Taxes are Excel now, not CSV. The gestoría's VAT books keep the Tax Agency's own plain layout, so they still import." },
    ],
  },
  {
    version: "v0.122.0",
    date: "2026-10-02",
    entries: [
      {
        type: "ADD",
        text: "Kairos, the opportunity watcher, joins the roster at /agent. Named after the Greek god of the opportune moment, he sweeps the places where tenders, grants and calls are published, reads their terms, weighs what the house could win and brings the Oracle everything that could fall. His first watch — Spanish and European tenders and grants — already runs every half hour; he hands what the Oracle accepts to Metis.",
      },
    ],
  },
  {
    version: "v0.121.0",
    date: "2026-10-02",
    entries: [
      { type: "ADD", text: "A sales bell in the bar, on every page: from noon each day it counts the sales steps due, and a click lists them — each one an open opportunity's next step, linking to its record. A step not done stays, marked overdue." },
      { type: "ADD", text: "Eleven new opportunities from the sales plan of 1 October: five public training centres for police, emergencies, civil protection and fire, offered a space to rehearse a procedure; six business associations and hubs, offered a free talk on running a company with AI agents." },
    ],
  },
  {
    version: "v0.120.0",
    date: "2026-10-02",
    entries: [
      { type: "CHG", text: "/system/pipeline opens on the funnel: five large steps — detected, contacted, positive answer, won, repeats or refers — each with its count and the share it carried from the step before, following the kind you pick." },
      { type: "CHG", text: "Big switches: each kind shows how many records it holds, and the views are Timeline (now the default, with full names, value and how it pays), What's due, and Asked / we have. Reasons lost and days per stage sit under the timeline." },
      { type: "CHG", text: "Asked / we have shows the eight requirements that decide most calls, as the house's card marks them, and links the full card. A dashed link at the bottom opens the template for a new opportunity." },
    ],
  },
  {
    version: "v0.119.0",
    date: "2026-10-01",
    entries: [
      {
        type: "ADD",
        text: "Open books lets you download anything for the period you choose — a month, a quarter, a year or two dates — in three packs: for the gestoría, the VAT record books in the Tax Agency's own layout plus withholding and a 347 draft; for a CFO, the profit and loss month by month, spend by supplier, the cash against the bank and the next quarter; for an auditor, every line as a double entry with its source and a trial balance.",
      },
      {
        type: "ADD",
        text: "Single files too: accounts, invoice books and taxes as CSV, and the business plan with your own assumptions as Excel or a one-page PDF.",
      },
      {
        type: "ADD",
        text: "The whole page prints to PDF in day colours, every room one after another, without the menus.",
      },
    ],
  },
  {
    version: "v0.118.0",
    date: "2026-10-02",
    entries: [
      { type: "CHG", text: "One pipeline for sales, tenders, grants, collaborations and partners. /system/pipeline now has two rows of buttons — the kind, and the view — and shows one panel at a time: what is due next, a timeline of every record, the funnel from detected to won, and what calls ask against what the house holds." },
      { type: "CHG", text: "Grants moved into /opportunities/ as records of kind grant; the old /funding/ addresses lead to them." },
      { type: "DEL", text: "Tenders and grants the house cannot win are no longer kept as records: what they taught goes into the house's card." },
    ],
  },
  {
    version: "v0.117.0",
    date: "2026-10-01",
    entries: [
      {
        type: "CHG",
        text: "Open books runs on the cash really in the bank: about 19,500 € on 1 October 2026, as the company gave it, marked declared until the bank statement is loaded. The slider that guessed it is gone; the counter, the top figures and the business plan start from it.",
      },
      {
        type: "ADD",
        text: "Cash & runway shows where the cash comes from: money in, less what went out, less an estimate of the two books not loaded yet, against the bank. Every step says if it is real, declared or an estimate, and an amber notice says when the figures do not add up.",
      },
      {
        type: "ADD",
        text: "The next quarter, three ways: nothing changes, costs cut in phases, or income arrives — three months ahead and no further, each with the day the cash runs out. You choose the month payroll ends and the income a month.",
      },
      {
        type: "ADD",
        text: "Taxes counts the questions still open with the gestoría, by topic.",
      },
    ],
  },
  {
    version: "v0.116.0",
    date: "2026-10-01",
    entries: [
      {
        type: "ADD",
        text: "Open books gain a Taxes room, written for someone who has never filed a return: the five kinds of tax that touch the company, who really pays each, the three ways a VAT quarter can end (to pay, to offset, to refund), VAT quarter by quarter from 2024, what can be asked back each year, the losses kept for future profits, and a live counter to the next filing with its estimate.",
      },
      {
        type: "CHG",
        text: "Real payroll and the July–September 2026 invoices enter the books. People are counted all together and, while they are fewer than three, one block a quarter, so nobody's pay can be read. The monthly cost and the time to tomb now run on the last closed quarter, about 5,250 € a month, and the Spending chart has a year switch for 2024, 2025 and 2026.",
      },
      {
        type: "CHG",
        text: "Income from the issued-invoices book: six monthly invoices to a public body in the United States in 2025, in dollars at the European Central Bank's rate of each date, and two training invoices in 2024.",
      },
    ],
  },
  {
    version: "v0.115.0",
    date: "2026-10-01",
    entries: [
      { type: "ADD", text: "Screening a tender is a protocol of the archive, not only an agent's skill: read the authority's terms, decline at the first hard failure, answer five questions with their clauses, weigh what survives, write the record. The skill now sends any agent to it." },
      { type: "CHG", text: "Closing the month takes in public money: a contract invoiced and a grant paid are income lines naming their record; a grant counts only once paid." },
    ],
  },
  {
    version: "v0.114.0",
    date: "2026-10-01",
    entries: [
      { type: "ADD", text: "Tenders are screened from the authority's own terms, never an aggregator's summary: each record says where it was read and what the buyer really buys, and the tool refuses a hopeful verdict on a summary, a resale or a turnover above the house's card. A portable screening skill any agent can follow." },
      { type: "ADD", text: "The pipeline has a Tenders section — public buyers only — and a Grants section: every call read against the house's card, its criteria met, failed or still to check, and the house's chance, most likely first." },
      { type: "ADD", text: "/funding/: one public record per grant, public loan or prize the house might take; the first six are Spanish calls (Community of Madrid, Ministry of Culture, Madrid in Game, INJUVE, CDTI)." },
      { type: "ADD", text: "The house's two cards — what it can prove to a contracting authority and to a funder — and the two protocols that say what to do with a tender or a grant that fits." },
    ],
  },
  {
    version: "v0.113.0",
    date: "2026-10-01",
    entries: [
      {
        type: "ADD",
        text: "Open books gain a seventh room, the business plan: a vision, five assumptions the reader can move, profit and loss for three years, the break-even in projects a year, how much money the plan needs, and cash month by month. A short glossary explains burn, runway, break-even, share premium and the participative loan with the company's own figures.",
      },
      {
        type: "ADD",
        text: "A time-to-tomb counter on Cash & runway: days, hours, minutes and seconds until the money runs out at today's cost, from the cash the reader sets. The company says very little is left; the bank balance is not loaded yet, so the counter says it is simulated.",
      },
      {
        type: "CHG",
        text: "Money in: the two rounds the partners paid (about 100,000 € in 2024 and 120,000 € in 2026, next to the nominal the Registry published), the ENISA loan and the first client, a public body in the United States (about 20,000 €). Four kinds of figure now: real, declared (the company's word, its document still to load), plan and simulated. Payroll, two people in 2025 and one in 2026, enters the monthly cost as a simulation until the payslips come.",
      },
    ],
  },
  {
    version: "v0.112.0",
    date: "2026-10-01",
    entries: [
      {
        type: "ADD",
        text: "/system/pipeline gains a calendar: every open opportunity by its next date, cut by 30, 60 or 90 days ahead, with public tenders marked — the procedure the authority buys by and a link to its notice. Tenders enter the pipeline as records like any other (source tender), and a filed offer waits on the authority's clock: overdue, never stale.",
      },
    ],
  },
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

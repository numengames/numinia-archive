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
    version: "v0.42.0",
    date: "2026-09-24",
    entries: [
      {
        type: "ADD",
        text: "How Numinia's money is wired, in the System section (SYS-008): the bank account, the payment processor, the gestoría, the invoices, the ledger and the four views — who holds each key, how a payment and a cost flow into the record, what a citizen, the CTO, a lender, the gestoría and an auditor each read, and which pieces are not wired yet.",
      },
    ],
  },
  {
    version: "v0.41.0",
    date: "2026-09-24",
    entries: [
      {
        type: "ADD",
        text: "The rules for money, in draft. 'Every charge delivers something; the account is one' (STD-033) says what any payment on a Numinia or Numen Games site must meet — something in return, the whole price with VAT, a record in the archive, no card on our sites, cancel in one step, remembered only as you choose — and how the account is kept: one ledger of lines, closed from invoices, the same figures for the public, the technology view, the finance view and the gestoría, every total traceable to its paper for an auditor or the tax authority, and nobody's pay published (ADR-064).",
      },
    ],
  },
  {
    version: "v0.40.0",
    date: "2026-09-24",
    entries: [
      {
        type: "FIX",
        text: "The English glossary now says what the manual says: Tokens represent a bond, and may represent wealth as well.",
      },
    ],
  },
  {
    version: "v0.39.0",
    date: "2026-09-24",
    entries: [
      {
        type: "ADD",
        text: "A canon for money, opened in draft. 'What has value also makes a bond' (CAN-011) says what a payment is in Numinia: never a donation, always something you can name before paying, with the whole price in view; whoever pays is remembered by the name they choose, or by none, and no amount is shown; and the account is open — what Numinia has cost since its first day, what has come in, and who carries the difference, the same figures for a citizen, a lender, an auditor and the tax authority. It reads in The Summa, after the archive canon (ADR-063).",
      },
      {
        type: "CHG",
        text: "Tokens may now represent wealth as well as a bond. The RPG manual (chapter 6, in Spanish and English) and the glossary said they did not; they now say that what a Token is worth never erases where it came from.",
      },
    ],
  },
  {
    version: "v0.38.0",
    date: "2026-09-24",
    entries: [
      {
        type: "ADD",
        text: "Every Numen Games website must now have a day mode and a night mode, with the sun and moon button: the sun takes you to the day, the moon to the night. The design system page shows the button working on a small sample page, says who the page is for, and explains the words it uses (Umbral, Velo, Prisma, tokens).",
      },
    ],
  },
  {
    version: "v0.37.0",
    date: "2026-09-24",
    entries: [
      {
        type: "CHG",
        text: "The design system page now shows the system instead of listing it: the fifteen animations run, each at its real speed, with a Replay button; the moon changes phase, the stars of the sky follow the rarity weights, and the reading light follows a sentence. The colours for text on light, charts and pixel art, the scarab, the binary sentence, the three forces as surfaces, and the pixel references with their right-and-wrong pairs are all on the page.",
      },
      {
        type: "CHG",
        text: "The downloadable design system is lighter and more to the point: the RPG manual chapter, the adventure mould, the character sheet and the glossary are linked, not included. The single document went from about 5,400 lines to 2,150; the manual is downloaded on its own.",
      },
    ],
  },
  {
    version: "v0.36.0",
    date: "2026-09-24",
    entries: [
      {
        type: "ADD",
        text: "The whole RPG manual is now in English: chapters 3 to 7 (Character creation, Game system, Geography and culture of Numinia, Inventory and bestiary, Building the adventure) join the introduction and chapters 1 and 2. Every chapter keeps the Spanish's headings, tables and footnotes, and the translation glossary gains the 504 names met on the way.",
      },
    ],
  },
  {
    version: "v0.35.0",
    date: "2026-09-24",
    entries: [
      {
        type: "ADD",
        text: "The Numinia Design System, whole, at /design. Design here means the whole experience — what is seen, read, heard, moved through and played — so the page shows everything a piece of ours is made of in four parts: the core (why we exist, the three forces, the forty-forty-twenty mix), the languages (image, word, sound, motion, play), the recipes for each medium, and the toolkit. The colours, fonts, sizes, icons and animations are drawn from the kit itself, and the parts not written yet — sound, how we write, how a mission or a character is designed — are shown as gaps rather than hidden. It opens with a sentence of Pablo FM's, signed with his name.",
      },
      {
        type: "ADD",
        text: "Download the system: one button gives a zip with the whole system as a single document, every document on its own, the tokens, the stylesheet, the fonts, the icons, the scarab, the pixel references and the invoice template, with the licence of every file. The page also offers its markdown like any other.",
      },
      {
        type: "DEL",
        text: "The old design guide at /diseno is gone. It was the August v5 guide, frozen as one HTML file: it still described four registers after the canon had moved to three forces, and nothing kept it current. The old address now leads to /design; the kit's files move to /design/kit. The guide itself stays in the repository's history.",
      },
    ],
  },
  {
    version: "v0.34.0",
    date: "2026-09-24",
    entries: [
      {
        type: "ADD",
        text: "Chapter 2 of the RPG manual, 'History and legends of Numinia', is in English: Holberins and the first Numinia, the genesis of the Khepris, the shadow of Athanasius, the Dark Age and the birth of the five species, the three great forces, and Steiner's dreams. Three of the eight chapters are now translated.",
      },
    ],
  },
  {
    version: "v0.33.0",
    date: "2026-09-24",
    entries: [
      {
        type: "CHG",
        text: "While listening, what has been read now fades more clearly: down to half its brightness instead of three quarters, still in its own colour. At three quarters the difference was too subtle to notice.",
      },
      {
        type: "CHG",
        text: "The design kit (numinia.org/diseno/kit) moves to 6.1.0 and now teaches what the reading player showed: the reader owns the scroll, the print ruler, ink that dries in its own colour, touch to hear, the gentle speeds, and the reading light as animation number 15.",
      },
    ],
  },
  {
    version: "v0.32.0",
    date: "2026-09-24",
    entries: [
      {
        type: "CHG",
        text: "The canon reads in four shelves. /canon/ now groups its nine documents under a Roman numeral, a name in the city's own words and one line each — I The city, II The citizens, III The Summa, IV The ground — in the order a stranger needs them: where you are, who is here, how anything gets done, and last, once you have walked the city, why it works. The theory moves to the end on purpose. Three titles shortened to their claim: 'You are what you are doing' (CAN-004), 'The model needs a story' (CAN-006), 'Renaming is not transforming' (CAN-007).",
      },
    ],
  },
  {
    version: "v0.31.0",
    date: "2026-09-24",
    entries: [
      {
        type: "FIX",
        text: "Read text no longer turns grey. As the voice passes, each ink keeps its colour — a link stays a link, a bold stays bright — and only loses a little brightness, so you can still reread it.",
      },
      {
        type: "FIX",
        text: "The reading light keeps up with the voice on numbers and dates. A figure now counts for what it takes to say, and the light re-syncs at the end of every sentence, so it can never fall more than one sentence behind.",
      },
      {
        type: "ADD",
        text: "While listening, click any sentence and the voice reads from there. Links, buttons and selecting text to copy work as before.",
      },
      {
        type: "CHG",
        text: "Gentler speeds: 1×, 1.25×, 1.5×, 2× and 0.75×, and the speed you choose carries over to the next document. The reading light has a small core of ink so it is easier to follow, and the ruler's preview is dark glass instead of white paper. With 'more contrast' turned on in your system, read text does not fade.",
      },
    ],
  },
  {
    version: "v0.30.0",
    date: "2026-09-24",
    entries: [
      {
        type: "CHG",
        text: "Three canons of the house, rewritten from the Oracle's review. 'We build a game to work better' (CAN-002) now says why a game — play is our first narrative, our first lesson and our first creative drive — and no longer carries a founding history; the four Oracles are read from the agents index, where the roster lives. 'One identity, three forces' (CAN-008, retitled) speaks through the three forces of the world — the Umbral, the Velo and the Prisma, with low-poly and pixel as the Prisma's two manifestations — and stops restating the house's purpose. 'Opening is an act' (CAN-005) keeps every rule and opens on a reader who wants to use something of ours, with a case for each rule (ADR-061).",
      },
    ],
  },
  {
    version: "v0.29.0",
    date: "2026-09-24",
    entries: [
      {
        type: "ADD",
        text: "A canon for ethics, opened in draft. 'Leave things better than you found them' (CAN-010) takes the sentence every canon ends on and applies it to people, their data, the commons and the acts of a digital agent — four commitments already in force elsewhere, stated as one belief. Its body says it is a first statement to be argued with. It closes the canon sequence (ADR-060).",
      },
    ],
  },
  {
    version: "v0.28.0",
    date: "2026-09-24",
    entries: [
      {
        type: "ADD",
        text: "A canon for the work. 'The archive is the organisation' (CAN-009) says what no canon said: the company's memory is plain text in a public repository; a document is a claim and the history is the record; only canon, standards and protocols oblige; work is a change to the text; and a digital agent is a citizen bound by the same documents, with no last word. It reads fourth in the canon sequence, after function and structure and before the house (ADR-059).",
      },
    ],
  },
  {
    version: "v0.27.0",
    date: "2026-09-24",
    entries: [
      {
        type: "CHG",
        text: "The canon says who you are here in one document instead of two. 'What an agent is made of' (CAN-003) and 'A guild is what you know' (CAN-004) are now one canon, 'Nobody here has a role; you are what you are doing' (CAN-004): the six attributes, why guilds nest and factions do not, why play sits at the centre, what turns a profile into a role, and the six ranks by what each one is. The old address /canon/can-003-attributes-and-ranks redirects there. Canon reads in six steps now, not seven (ADR-057).",
      },
    ],
  },
  {
    version: "v0.26.0",
    date: "2026-09-24",
    entries: [
      {
        type: "ADD",
        text: "The RPG manual begins to exist in English: the introduction ('The echoes of a virtual city') and chapter 1 ('Welcome to Numinia') are translated, in lore/game/manual/en/, using the glossary's fixed terms. The other six chapters follow one by one.",
      },
    ],
  },
  {
    version: "v0.25.0",
    date: "2026-09-24",
    entries: [
      {
        type: "CHG",
        text: "Listening to a document no longer takes your scroll away. While the voice reads, a small glass player sits at the bottom of the page: play and pause, the section you are in, the time, speed and close. Scroll wherever you like and the voice keeps going; a 'Back to the reading' button takes you back to where it is.",
      },
      {
        type: "ADD",
        text: "A ruler to move through the reading, like an old printer's ruler: a long mark at each section, the part already heard printed in dots. Hover it to see the section and the first words of the sentence; click or drag to jump there, and the voice starts at the beginning of that sentence. With the keyboard, the arrows jump sentence by sentence.",
      },
      {
        type: "CHG",
        text: "What has been read dries like ink: it fades behind the voice, so your eye finds where it is without anything shouting. The reading marker is now a soft sand-coloured light instead of an amber dot, and it glides instead of hopping.",
      },
      {
        type: "CHG",
        text: "The document tools (copy, download .md, open on GitHub) are icons now, with a short explanation on hover.",
      },
    ],
  },
  {
    version: "v0.24.0",
    date: "2026-09-24",
    entries: [
      {
        type: "ADD",
        text: "A translation glossary for the RPG manual: the English every Numinia term takes before a single chapter is translated, so that Veil is always Veil and a Game Director never becomes a Game Master halfway through the book. The names numinia.com already shows in English (ranks, guilds, factions, districts, species…) are copied as they are; the manual's own concepts are proposed; three doubts are left open for the authors.",
      },
    ],
  },
  {
    version: "v0.23.0",
    date: "2026-09-24",
    entries: [
      {
        type: "CHG",
        text: "The RPG manual is now one file per chapter: an introduction and seven chapters, in Spanish, under lore/game/manual/es/, each with its own CC0 licence line. Not a word of the text changed; it was one 21,000-line file and is now eight you can open, link and translate one by one. The English edition will grow beside it, chapter by chapter. El Espejo Roto, the adventure that used to close the manual, is a module of its own again and lives only in lore/adventures/.",
      },
    ],
  },
  {
    version: "v0.22.0",
    date: "2026-09-24",
    entries: [
      {
        type: "CHG",
        text: "The lore is public domain. The RPG manual, the adventures, the world texts and the Codex matter move from 'all rights reserved' to CC0 1.0: copy them, adapt them, play them, publish your own adventures, with no permission and no attribution needed. Numen Games holds the rights and its authors agree. The /lore page loses its amber rights warning because there is no limit left to warn about. Only the names Numinia, Numen Games and Khepri, and their marks, are kept.",
      },
    ],
  },
  {
    version: "v0.21.0",
    date: "2026-09-24",
    entries: [
      {
        type: "CHG",
        text: "Every file now states its own licence, in its first lines. Until today the licence of most documents came from the folder they sat in: a single file, REUSE.toml, said 'everything under lore/ is reserved, everything under canon/ is CC0', and a document inherited whatever its shelf said — including a new one nobody had looked at, and one that simply moved. 154 files that relied on that now carry the declaration themselves; REUSE.toml keeps only what cannot hold a comment (images, fonts, JSON, generated copies), one exact path each and no folders. No licence changed: every one of the 526 files resolves to exactly the licence it had before, checked file by file. The footer's licence link now goes to LICENSE, which explains how to read them.",
      },
      {
        type: "FIX",
        text: "A document's title is no longer mistaken for its licence. Lore documents with no header are titled from their first line; now that the first lines are the licence comment, the title reader skips it.",
      },
    ],
  },
  {
    version: "v0.20.0",
    date: "2026-09-23",
    entries: [
      {
        type: "ADD",
        text: "Every section index now says what you learn there and what you can then do with it. Each document in this archive opens with an Epistemic and a Pragmatic line; the folders holding them did not, so the archive was describing its pieces in a language it never used about itself — a reader landing on /operations or /debt got a question and a list, and had to infer the rest. All eleven indexes carry the same pair now, in the reader's words rather than the corpus's.",
      },
      {
        type: "ADD",
        text: "Canon, standards and protocols also carry the line between them: these three bind, the rest record — canon says why, standards say what, protocols say how, and a standard is complied with by an artifact while a protocol is executed by an actor, the boundary being the mechanism and not the topic. That middle sentence is SER-002 of the series standard, quoted rather than paraphrased. It appears on those three pages only, because the distinction exists in the comparison and nowhere else: a reader on any single folder cannot derive it, and the eight recording series stay quiet rather than claim a boundary they do not have.",
      },
    ],
  },
  {
    version: "v0.19.0",
    date: "2026-09-23",
    entries: [
      {
        type: "ADD",
        text: "What binds today. This site published two halves of a sentence and not the third: eleven protocols, twenty-seven standards and eight canons rendered in full, and the definition of 'draft' — written, not yet in force, it binds nobody — printed on the home, in llms.txt and in the scheme. What followed from those two was the question nobody could answer here: if none of it binds, what does? The answer had existed since 18 September as the Oracle's transition regime in AGENTS.md, which every agent runtime loads and no visitor to this site could see, so a person browsing /protocols was reading ceremony derogated months ago as if it were live and an arriving agent was obeying it. /binding now publishes that instruction word for word — not summarised, because a paraphrase of a governing instruction is a second instruction — beside the state of every rule document, counted from each file's own header at build time: 0 in force, 46 draft. The day a protocol is promoted the page says so with nothing edited. It is reached from the home's third question, from robots.txt, from llms.txt, from index.json, and from a band on every draft document that until now printed the bare word as a chip and left the reader to infer what it meant.",
      },
      {
        type: "CHG",
        text: "AGENTS.md carries the regime between two markers. The text is the Oracle's and he rewords it; anchoring the site's parser on its heading would have meant a reworded title silently emptying a page titled 'what binds today', which reads as 'nothing binds' — the most expensive possible lie for an archive about governance. The markers are the contract, the prose between them is his, and a build with the markers missing fails instead of publishing the empty answer.",
      },
    ],
  },
  {
    version: "v0.18.0",
    date: "2026-09-23",
    entries: [
      {
        type: "ADD",
        text: "A door for machines. This site has always served every page twice — as HTML, and as the markdown file behind it at the same address plus '.md' — and said so nowhere: robots.txt offered a sitemap of 192 HTML addresses and not one of them mentioned the convention, so an arriving agent downloaded 77 KB of page to recover 3 KB of document, if it was patient. Three files now say it out loud. /llms.txt is prose for a reader that arrived with no schema: what this archive is, how to fetch the markdown, what 'draft' means, and every document listed with its own licence. /index.json is the same rows as data — for each address, its markdown address, its title, its state, its licence and whether it is a record or a view of records. /telemetry.json serves the measured dataset unchanged, so the figures can be read rather than scraped out of a table. robots.txt points at the first of them.",
      },
      {
        type: "ADD",
        text: "A guard that refuses an invented address. Route and index derive each document's URL in two different files, so they can drift apart with nothing failing: the first draft of this work emitted fifteen addresses that were never built — blueprints are served at their slug with the identifier stripped, reports at the entry id, and the index had assembled '/<series>/<frontmatter id>' for both. The build was green and the sitemap was right; only the invented rows were wrong, and nothing was looking at them. check-machine-index reads the built index back against web/dist and fails when a row names a page or a '.md' the build did not publish, when a document resolves to no licence at all, or when the index is empty. An index that invents addresses is worse than no index, because a machine believes it.",
      },
      {
        type: "FIX",
        text: "Eleven documents were published with no licence. The lore documents carry no frontmatter — they were converted from PDFs — so their rights come from the REUSE record for their path, and the reader of that record locates the repository from its own file path: correct under bare node, wrong once Vite bundles it, and silent either way because an absent REUSE.toml returns an empty map rather than an error. Every header-less document therefore resolved to null. It passed the unit tests, which run under bare node where the path is right, and was caught by reading the built index.json. The annotations are now read from the site root, and the test asserts the exact licence rather than merely a non-empty string, because a test that accepts any answer cannot tell 'resolved' from 'gave up'.",
      },
      {
        type: "CHG",
        text: "Rights are stated per document, never per folder. The licence of a file is the file's own: 121 documents are CC0-1.0, 28 are CC-BY-4.0 and four are all rights reserved, and they do not sort by directory — operations/ and reports/ each hold two different licences today. Nothing generated here summarises rights by folder, and a test fails the build on any sentence that binds a licence to a directory, because that kind of false claim is one a machine repeats downstream where nobody can correct it.",
      },
    ],
  },
  {
    version: "v0.17.0",
    date: "2026-09-22",
    entries: [
      {
        type: "CHG",
        text: "The site is in one language. Nine pages had been written in Spanish while the rest moved to English, so a reader following a link changed language mid-click: the decisions register was titled 'Decisiones', the blueprints index 'Los Planos del Mundo', and four pages under /system/ — the agent dashboard, the solutions, the hundred simulations and the sales plan — were Spanish end to end. Translation only: every figure, date, amount, address and identifier is byte-identical, and the object keys stay as they were, because renaming them is a refactor and does not belong in the same commit as a translation.",
      },
      {
        type: "FIX",
        text: "The perspective chips on /system/solutions were drawn from a lookup keyed by the Spanish words, so translating the labels alone would have left every chip without its colour. Key and value moved together — Negocio, Producto and Teoría became Business, Product and Theory in the map, in the twenty gap records, in the forty-eight solutions and in the legend, which was hand-written apart from the map and would otherwise have kept printing the old three. Verified on the built HTML: 43 chips carry their colour, none renders 'undefined'.",
      },
      {
        type: "CHG",
        text: "What stays in Spanish, stays on purpose. The vocabulary table at /system/language holds the registers of Numinia — Gremio, Facción, Misión, Arconte — and those columns ARE the Spanish register; translating them would erase what the table exists to show. The same for the lore documents, written in Spanish and listed by their real titles, and for the status keys in the code, which are slugs and not prose.",
      },
    ],
  },
  {
    version: "v0.16.0",
    date: "2026-09-22",
    entries: [
      {
        type: "ADD",
        text: "The home answers four questions before it classifies anyone: who writes this, what Numinia and NWOS each are, what state the archive is in, and what a reader may do with it. All four answers already existed — in CAN-001, CAN-006 and SYS-006, in the technical register, three clicks deep. A stranger arriving with no context was welcomed, shown the pain, and then handed a filing scheme; they could read the whole site without learning that Numen Games is a studio in Spain, that this archive is the first organisation running on its own product, or that anything outside lore/ can be taken and used.",
      },
      {
        type: "ADD",
        text: "There is a way to reach a person. Until today the site offered no address at all: hola@numengames.com is in the fourth answer, and a reader who wants to use the method in their own organisation no longer has to work out who to ask.",
      },
      {
        type: "ADD",
        text: "What `draft` means, said where it is read. Most of the archive carries that status, the canon included, and a reader with no definition reads sixty-eight drafts as sixty-eight doubts. STD-016 is exact — written, not yet in force; it binds nobody — and that is now on the home and in full on /scheme, beside the argument for publishing the day a thing is written rather than the day it is ratified.",
      },
      {
        type: "CHG",
        text: "The markdown of both pages carries the new text. The home and /scheme have no file behind them: their .md is composed from the registers, so the four questions and the note on draft are written once and rendered twice. Both files now declare STD-016 among the documents they were read from.",
      },
    ],
  },
  {
    version: "v0.15.0",
    date: "2026-09-22",
    entries: [
      {
        type: "CHG",
        text: "The site is built with Astro 7 and Tailwind 4. The piece that joined the two — @astrojs/tailwind — was retired upstream and only ever accepted Astro 5, so every Astro update had been failing on it since. Tailwind now connects straight to the build tool, and its theme lives in the stylesheet instead of a config file. Nothing about how the site looks was meant to change: all 331 pages build, and the same addresses are served.",
      },
      {
        type: "FIX",
        text: "Two things the new stylesheet reset would have taken away, put back by hand: buttons keep the hand cursor when you point at them, and every hairline keeps drawing its colour from the site's one border variable instead of inheriting the text colour. Neither is a style decision — both are what the site already looked like.",
      },
    ],
  },
  {
    version: "v0.14.1",
    date: "2026-09-22",
    entries: [
      {
        type: "FIX",
        text: "The listen button now works on the pages you arrive at. It reads the text out of the page, and it was looking for it in a wrapper that only document pages have — so on the home, the function pages, the indexes and the agent pages it found nothing, greyed itself out and said nothing about why. It now falls back to the page's main content, which every page has. The nine pages that were silent speak between 53 and 562 words; documents are unchanged.",
      },
      {
        type: "ADD",
        text: "A check now refuses to ship a listen button with nothing behind it. On every build, a page offering the button must have text the player can actually find — using the player's own logic, not a guess at it. Tested in both directions: it passes on the real site and fails on a copy of the home with its content wrapper removed. A button that is there but mute is worse than no button: it promises a reader who cannot read that the page can be heard.",
      },
    ],
  },
  {
    version: "v0.14.0",
    date: "2026-09-22",
    entries: [
      {
        type: "ADD",
        text: "Every page can now be taken out of the site. Listen, copy, download the markdown, open the source — the four things a document page has always offered — reach 179 pages instead of 8. The home, the six function pages, every section index, the mission board, the reports index, the decision and blueprint registries and every agent's front door now have their own .md.",
      },
      {
        type: "ADD",
        text: "Those pages have no file behind them: they are composed from the registers at build time. So their markdown is generated from the same registers the page itself reads — the same question, answered in markdown. If the classification scheme changes, the page and its file change together; neither can drift from the other. Each file opens saying which documents it was read from, and asking you to cite those rather than the file: it is a view, not a record.",
      },
      {
        type: "ADD",
        text: "A new check refuses to let this slip again. On every build, each published page must offer its markdown, that file must exist and it must not be empty. Thirteen pages are exempt and each one carries a written reason — and those reasons are themselves an admission, filed as debt: six pages hold their content inside the template instead of in the archive, and three of them ignore a document that already says the same thing better.",
      },
      {
        type: "CHG",
        text: "The Source button points at the document that governs the page, never at the template that draws it. On a function page it opens the classification scheme; on a section index, the series register; on an agent's page, the roster. A reader who wants to argue with what a page says is sent to the place where arguing changes something.",
      },
    ],
  },
  {
    version: "v0.13.0",
    date: "2026-09-22",
    entries: [
      {
        type: "CHG",
        text: "The home welcomes you before it classifies you. It used to open with 'One producer, one fond, six functions' and spend its next two screens on the filing vocabulary — fond, function, activity, series — and a table of all eighteen series. Every word of it was true and every word of it assumed you already knew what a fond was. It now opens at the threshold: welcome, curious explorer, this is where Numinia's source of truth lives. Then it says out loud what the archive is an answer to — documents scattered, interests in some of them not being found, an organisation that stops knowing itself — and only then shows the six doors.",
      },
      {
        type: "ADD",
        text: "The home shows a real document instead of describing the corpus. Every file in the archive opens by saying what it is, what you learn by reading it and what you can do with it (the header standard). The home now renders that block for the classification scheme itself — read from the file at build time, so if the document's wording changes the home changes with it, and if the block disappears the build fails rather than printing a sentence that is no longer true.",
      },
      {
        type: "ADD",
        text: "What is not here, said on the page. The archive withholds protected matter — what is under someone else's licence, what would expose a person — and until today the home never mentioned it. Silence about an absence reads as a gap; now it is a statement.",
      },
      {
        type: "ADD",
        text: "The home ends where the house stands: the city is being repopulated, five years is not long, and Khepri pushes the sun up every morning. Beside it, the figures the instrument measured — documents, missions, the date of the measurement, the site version — and a link to every figure it publishes. Nothing in that strip is typed.",
      },
      {
        type: "ADD",
        text: "The classification in full moved to its own page, /scheme: the vocabulary, the table of all eighteen series with what each one holds, and the note on the second fond. Nothing was deleted and nothing was rewritten — the same rows, read from the same two standards. It is one click from the home, for a reader who has decided to evaluate the system rather than to arrive at it.",
      },
      {
        type: "CHG",
        text: "The six function cards lead with a sentence in plain words — 'What is being built right now, and the plans behind it' — and keep the activity verbs underneath. They used to print the folder names as chips, which repeated the table that sat two blocks below them.",
      },
      {
        type: "CHG",
        text: "A decision is cited by its name before its code: 'Classification by function (ADR-046)' rather than a bare identifier. The identifier is the citation and it stays; a reader should not have to resolve a code to know what was decided.",
      },
    ],
  },
  {
    version: "v0.12.0",
    date: "2026-09-21",
    entries: [
      {
        type: "CHG",
        text: "The home is the archive's own classification. Until today the front page was a product pitch — 'Narrative Work OS', five layers, six features — written by hand in August and restating a blueprint from memory, and the page that explains how the archive is organised sat at /archive, behind the tenth entry of the bar. They have swapped places: you now land on one fond, six functions, the activities under each and the series they produce, with the relation graph and the full table, all read from the two standards that own the scheme. The pitch is a reference manual in System (SYS-006). /archive redirects here.",
      },
      {
        type: "CHG",
        text: "The bar is the classification. Six entries — Governance, Production, Assurance, Agency, Creation, Administration — each a menu of the series its activities produce, with the activity verb beside each series ('Canon — Founding'). Nothing in the menu is typed by hand: it is derived at build time from the classification scheme, so a series added to the standard appears in the menu on the next build or the build fails. Operations, Objects and Lore, which were hidden in the footer because the old bar had run out of width, are back at one click. The footer's navigation column lists the same six doors plus Updates and Telemetry.",
      },
      {
        type: "CHG",
        text: "Every section index says which drawer you opened. The label above the title used to read 'CAO · NWOS' on every one of them; it now reads the place in the scheme — 'Governance · Standardising', 'Assurance · Observing' — and the strip at the foot groups the other sections by function. The instruments (guards, tools, scripts, templates) have a manual (SYS-007): what each one is, what it checks, how it runs, and a link to the folder on GitHub. The table on the home links each of them to its section of that manual instead of printing 'not published here'.",
      },
      {
        type: "FIX",
        text: "Three rows of the classification table were stale: objects/ linked to one card instead of its index, operations/ to one document instead of its index, and lore/ said 'served by numinia.com, not here' the day after /lore went live on this site. All three now lead to the folder's index page. A test covers it.",
      },
      {
        type: "FIX",
        text: "The relation graph no longer loads its 3D library from a third-party server at runtime, and no longer spins forever. The library ships in the site's own bundle; the scene is still by default and turns when you drag it; it surfaces once as it scrolls into view; with reduced motion on, it simply appears in place. Both were breaches of the design standard (self-hosted resources; no ambient loops outside the two the catalogue allows) that had been on the page since it was written.",
      },
      {
        type: "CHG",
        text: "Eight pages that no link on the site reached — the Wardley map, the gaps analysis, the continuity proof, the narrative dial, the CAO dashboard, the hundred simulations, the solutions and the sales guide — are filed under /system/ and listed at the foot of the System index, marked as views the site draws rather than documents of the series, with their language and their age stated. Four are in Spanish and untouched since August; what to keep of each is deferred, not decided here. Their old addresses redirect.",
      },
    ],
  },
  {
    version: "v0.11.0",
    date: "2026-09-21",
    entries: [
      {
        type: "ADD",
        text: "The lore is on the site. /lore serves eleven documents — who Numinia is and why its fiction does real work, the two adventures a Director can run at a table, the attributes compendium, and the Codex matter: glossary, character sheet, legal note, acknowledgements. Until today the viewer withheld all of it, on the reasoning that serving a page is what makes a text public. It is not: the repository is public, so every one of these files was already readable on GitHub by anyone. Withholding them hid them from readers of this site and from nobody else.",
      },
      {
        type: "ADD",
        text: "The lore index opens with a rights notice, in amber, before any link: all rights reserved. Nothing about the licence changed — the regime is the same one REUSE.toml has always declared, and showing a text is not licensing it, exactly as the site already does with the privacy policy and the terms. But every other section here is CC0 or CC-BY, so a lore page that looked identical to them would let a reader assume wrongly. Read it, cite it, link to it; copying or republishing needs written permission.",
      },
      {
        type: "FIX",
        text: "The lore documents are listed by their real titles. They came from a PDF conversion and carry no title field, so the index would have shown filenames — 'welcome-to-numinia', 'hoja-de-personaje'. The page now reads the title out of each document's opening line, and for the two where that line is not a title (one starts with a section heading, another with a version stamp) the site declares the caption it prints, with a check that fails the build if the document it names ever moves.",
      },
      {
        type: "FIX",
        text: "The RPG manual is not published yet, and this is why: it embeds four images that were never committed to the repository. The build refuses it outright rather than render a document full of gaps. The manual has been incomplete since it arrived — nothing displayed it, so nothing noticed. It appears the day the four images land or the embeds come out, which is a change to a reserved text and so the Oracle's to make.",
      },
    ],
  },
  {
    version: "v0.10.0",
    date: "2026-09-21",
    entries: [
      {
        type: "ADD",
        text: "Operations has a front page at /operations. Its ten documents were all published and all reachable one by one, but the folder itself answered 404: anyone who found the privacy policy and trimmed the address back to see what else lived there was told the folder did not exist. It now lists all ten with their number, date and state, in the order the company reads itself — how it survives its own failures, what it has not resolved, where the work was left, then the strategy, the handling of keys, and last the three legal texts, which are the only documents there written for someone outside the company.",
      },
      {
        type: "ADD",
        text: "Objects has a front page at /objects. Two cards today — the Avocado avatar and the copy check that verifies its files are still where the card says — and the same 404 as Operations until now. A card registers something that is not a document: it says what the thing is and where its bytes live, which are kept in the asset depot, never in the archive. With these two pages every folder of the repository that publishes anything finally has a door on the web.",
      },
      {
        type: "CHG",
        text: "Operations and Objects are in the footer and in the section strip at the foot of every index, but not in the top bar. The bar was already at its limit — it switches to a hamburger below 1024px precisely because the entries stopped fitting — and two more would have pushed it into overflow, hiding its own last entries with nothing to say so. On a phone the menu lists all twelve; on a desktop the two new ones are one click away from any page, at the bottom.",
      },
    ],
  },
  {
    version: "v0.9.0",
    date: "2026-09-21",
    entries: [
      {
        type: "FIX",
        text: "The roster page was missing three of the ten agents. Calliope, Nimrod and Talos joined the archive on 4 September and never appeared on /agent, because that page carried its own hand-typed copy of the list instead of reading the one the archive keeps. For seventeen days the page answering 'who works here' named seven of the ten who do. The list is now read from the roster document itself at build time: add an agent there and the card appears, with nobody having to remember this page exists.",
      },
      {
        type: "ADD",
        text: "The Oracles are named. The section about the biological agents described the human layer in the abstract and named not one person, while the canon has carried the table of who they are all along — Clio Beruete, Daniel Garrido, Christian Martens and Pablo Fernandez-Maquieira. A page that lists ten digital agents by name and leaves the humans as a concept had its emphasis backwards. Same rule as the digital side: the canon names them, the page reads it.",
      },
      {
        type: "ADD",
        text: "Every agent now has a page of their own at /agents/ursa, /agents/byblos and so on. Each one gathers what that agent is for, when to bring it work, and its own documents — soul, operator and sources — each with its date and state. Those documents were already published and the folder that holds them was a 404, so the one address a reader would naturally guess was the only one that did not answer.",
      },
      {
        type: "FIX",
        text: "The filters on the roster hid every agent instead of narrowing to the ones you picked. The code compared a value the cards never carried, so the answer was always 'nothing matches'. It reads the right one now, and the buckets cover all ten agents rather than the seven that existed when it was written.",
      },
    ],
  },
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

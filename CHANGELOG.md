<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# Changelog — numinia-archive

> **Summary:** One line per change to the archive, newest first, grouped by day.
> **Epistemic:** An index: the pull request in each line holds the detail, git holds the rest.
> **Pragmatic:** Read the top after pulling to see what moved; open the pull request for why.
> **Audience:** Agents · Oracles

Format: [Keep a Changelog 1.1](https://keepachangelog.com/en/1.1.0/), one line
per entry — its kind, what changed in words, the pull request. Entries before
2026-09-28 were written as paragraphs; their full text is in git
(`git show 2d2f465:CHANGELOG.md`). The April releases 0.1.0–0.5.0 are there too.

## [Unreleased]

### 2026-10-02

- **Changed** A `draft` is on trial, not "binds nobody": followed, warns, never blocks; its owner decides a change. `STD-004` 4.11.0, `STD-009` 1.2.0, `PRO-023` 1.1.0 and every page that defines draft; a test holds the wording (site v0.129.0)
- **Security** Full-history secret scan in CI (`secrets.yml`, gitleaks, checksum-verified; 904 commits, 0 leaks); `CODE_OF_CONDUCT.md`, `.editorconfig`; `STD-015` 6.1.0 pays SEC-004, OSS-001/002, DEV-003, TRC-005 and corrects TRC-004 (30 debts → 24); `STD-022` 1.2.6
- **Removed** Every reference to the old `numinia-lore` repository: nothing reads it, the Oracle deletes it; links now point at `lore/` here (`DBT-022` #3b closed)
- **Changed** The design values and both vocabularies are in force, headers only: `STD-023` design values 1.9.0, `STD-026` operative vocabulary 0.2.0, `STD-030` the world's vocabulary 0.3.0; `STD-015` waits on its 30 debt rows; Oracle shown first (PRO-023)
- **Changed** ROLECE applied for and in process: `OPS-018` 0.5.1 moves the bidders' register from no to check; `OPP-2026-037` meets it
- **Added** `PRO-035` Watching for opportunities, the watch's verdicts in `STD-038`, the feed rule and Kairos pointing at it; the sales playbook opens before the record and walks every kind (site v0.128.0)
- **Added** The pipeline page reads the tender radar's feed (`numinia-archive-feed`), shown as Unreviewed and apart from the funnel; the archive checks it again for names and closed calls, and an unreachable feed never breaks the build (site v0.127.0)
- **Added** The wand on every sale's page: the sale's stages, where it stands, and each stage's collateral, the first-contact deck and e-mail rendered from the record by the sales kit, to see, download or copy. The sales playbook is a book at `/playbook` (site v0.126.0)
- **Added** The sales collateral (`STD-047`): what each stage of a sale hands over and what it is made from. The sales kit renders the first-contact deck and e-mail from a record's Pitch and the offer's Packages, outside the archive; OPP-2026-025 is the first case (site v0.125.0)
- **Changed** The archive's structure is in force, headers only: `STD-001` the series 5.11.0, `STD-024` a series is a function 3.1.0 (SER-004/007 fail the build), `STD-027` classification 0.7.0 (CLS-001/004); 0 findings before; Oracle shown first (PRO-023)
- **Security** numinia.org sends security headers (`web/public/_headers`: HSTS, frame refusal, a same-origin CSP without `unsafe-eval`; search drops `new Function`) and `security.txt`; CI tests fail on red; auto-merge writes only in its job; `LEG-003` 2.1.1 drops `siwe_nonce` (site v0.124.0)
- **Added** `PRO-034` Auditing a site's code: routes listed and probed live, fetch-by-address routes, leftovers, markup sinks, CSP and headers as served, cookies, workflow permissions, production dependencies, Scorecard; `STD-015` 6.0.0 `SEC-015`; `PRO-027` 0.2.0 checks a returning visitor (site v0.124.0)
- **Added** Automation writes to its own feed repository, never straight into the archive; a finding enters by a reviewed promotion (`STD-017` AUT-069). Nobody's name, not even a public officer's: the tool now refuses names in records and proposals unless `OPS-018` lists them
- **Added** The opportunity watch's first findings: Creative Europe MEDIA video games 2027 (`OPP-2026-036`, ≤200,000 €, 70 % advance) and a school science fair tender (`OPP-2026-037`, partner needed); `OPS-018` 0.4.1 reads the house's past graphic adventures as a published game to unlock
- **Changed** Open books downloads as workbooks in the house colours (`web/src/lib/workbook.ts`): band, front page with headline figures and the four kinds, native charts; Accounts and Taxes are Excel, not CSV; the AEAT books stay plain (site v0.123.0)
- **Added** Kairos, the opportunity watcher (Procurators): `agents/kairos/` card, soul, operator, sources and Hermes adapter; INDEX 3.4.0; his card on /agent. First watch: tenders and grants, Spain and EU; its procedure and script still to be carried in (site v0.122.0)
- **Added** A sales bell in the bar: from noon it counts the open opportunities' due next steps, from the pipeline tool, each linking its record; eleven records from the 1 October sales plan, OPP-2026-025…035 (site v0.121.0)
- **Changed** /system/pipeline opens on the funnel with each step's conversion from the tool; pill switches with counts, Timeline by default; Asked / we have shows the eight rows `OPS-018` 0.4.0 now marks as deciding most calls; a link to the template (site v0.120.0)
- **Changed** One pipeline: sales, tenders, grants, collaborations and partners are one record in `opportunities/`, one register `STD-038`, one card `OPS-018`, one tool; /system/pipeline switches by kind and view; grants left `funding/`; calls the house cannot win are not kept (site v0.118.0)

### 2026-10-01

- **Added** Open books downloads by month, quarter, year or dates in three packs — gestoría (AEAT VAT book design, 111/190, 347 draft), CFO (P&L by month, suppliers, cash, next quarter), auditor (journal with sources, trial balance, SHA-256) — from `web/src/lib/exports.ts`; STD-036 0.3.1, SYS-008 0.3.1; site v0.119.0.

- **Changed** Open books on the real bank balance (19,500 €, declared), reconciled to the lines with the gap in amber, and the next quarter in three futures; STD-036 0.3.0 (LED-011, LED-012), PRO-021 0.6.0, SYS-008 0.3.0, DBT-022 0.3.2; site v0.117.0.

- **Added** /system/open-books Taxes room for beginners (VAT to pay/offset/refund by quarter, withholding, losses, live filing counter); real payroll and Q3 2026 invoices, people one block a quarter; income book; `STD-036` 0.2.0, `PRO-021` 0.5.0 (site v0.116.0)
- **Added** `PRO-033` Screening a tender: the procedure lives in the axis and the `tender-screening` skill only points to it; `STD-038` 0.7.0 *Weighing a tender*; `PRO-031` starts from screening; `PRO-021` books contracts and paid grants (site v0.115.0)
- **Added** Tender screening from the terms: `STD-039` OPP-014/015 (where it was read, what it really buys, one file one record), the card's ceiling and out-of-domain list, the `tender-screening` skill, the marble school case as `OPP-2026-019` (site v0.114.0)
- **Added** Tenders and grants read against the house's card: `OPS-018`/`OPS-019` the cards, `PRO-031`/`PRO-032` what to do, `STD-045`/`STD-046` and `funding/` with six Spanish calls; 14 tenders get criteria and a chance; Tenders and Grants on /system/pipeline (site v0.114.0)
- **Added** /system/open-books: money in (two rounds ≈100,000 € and ≈120,000 €, ENISA, one client ≈20,000 €, all declared until their documents load), simulated payroll, a time-to-tomb counter and a seventh room, the business plan, with movable assumptions, P&L, break-even and a glossary (site v0.113.0)
- **Added** Fourteen public tenders on the radar as `OPP-2026-005`…`018`, every one at `lead` for the Oracle to decide, found in the procurement sweep of 1 October (closing 5 Oct–3 Nov); the tool reads a CPV code as a classification, not a phone
- **Changed** /system/open-books is the books of Numen Games S.L. from 16 Feb 2024: real FY2025 ledger, company card, six rooms, tooltips that break each bar down; ENISA 100,000 € as ENISA publishes it (`OPS-017` 0.2.0); simulated ledger removed (site v0.112.0)

### 2026-09-30

- **Added** Public tenders in the pipeline: `STD-038` 0.5.0 registers four procedures and two reasons lost; `STD-039` 0.6.0 OPP-012 (a tender names its procedure and links its notice); the tool exempts a filed offer from stale and computes the calendar `/system/pipeline` shows (site v0.112.0)
- **Added** `OPS-017` The ENISA loan: signed 2024-10-22, 5,666.56 € of interest in 2025, what the public registers show; open books gains its section with ENISA's seal, the first real figures on the page (site v0.110.0)
- **Added** `SYS-012` Suppliers: one card per service the company contracts, thirteen from the FY2025 book, in `system/suppliers/`; people stay out; `STD-004` 4.6.1 registers the card's `category`
- **Added** `DBT-022` 0.3.0 §1.7 *Open books*: naming the people we pay needs their consent, a transparency clause in new contracts and counsel on the legal basis and on payroll; block 8 of the letter, in the text and the Word file
- **Fixed** Folding closed weeks is numinia.org's alone: the summaries live only in the archive; STD-037 0.4.1 drops the four-site rule, PRO-017 3.3.1 folds on the archive's site only (site v0.109.0).
- **Changed** `OPS-016` 0.3.0: the season pass takes the Backer's Stripe test link and the old numinia.store contract, in test; its rewards stay figurative for now
- **Changed** /updates folds each closed week into one line linked to its weekly report; weeks 38–39 folded (76 versions out of the page, in git). STD-037 0.4.0 makes it a house rule for the four sites; PRO-017 3.3.0 adds the step (site v0.108.0).
- **Changed** The business's words are the source: the site opens at the new moon; `STD-030` 0.2.0 makes the operational word the preferred label and the in-world name its alternative; `AGENTS.md` says documents are written in plain words (site v0.107.0) (#588)
- **Changed** `OPS-016` 0.2.0: the eighth door is the pass holders' again, a real lock; a door counts as crossed when the wallet holds its free reward; one buy button, no cart, with the withdrawal acknowledgement; how the industry sells passes
- **Added** `STD-044` Every purchase ends in thanks: after paying, the buyer lands on our thanks page, which names the good, says what comes next and proves nothing; `PRO-020` 0.4.0 sets it at step 5, `OPS-014` 0.4.1 names the Backer's (site v0.106.0)
- **Changed** `STD-037` 0.3.0: the house footer carries a visible *Support Numinia* button with a coffee cup under the site's line, leading to numinia.com/support; numinia.org has it; `STD-023` 1.8.0 adds Phosphor's `coffee` as the 72nd icon of the house subset (site v0.106.0)
- **Added** The season pass moves from numinia.store to numinia.com: `OPS-016`, Season I's premium loot and a pass token for 9.99 EUR with VAT, adventures open to all, buyers kept private; not on sale

### 2026-09-29

- **Changed** The bar opens with the site's wordmark, by the Oracle's ruling: `Numinia_Word` on numinia.org and numinia.com, `Numen_Games_Horizontal_Word` on numen.games and nwos; `STD-023` §23, `BLU-009`, `STD-037` and kit 6.4.0 (`web.marca`) say so (site v0.104.0)
- **Changed** numinia.org leads the design: `STD-023` 1.7.0 takes its label, headline, column, 71 icons, entrance (animation 16) and §23 *The web piece*; `BLU-009`, `STD-008` and kit 6.3.0 follow; radii 6 / 8 px only; no sky on numen.games (site v0.103.0)
- **Added** Board reports for weeks 33–38 (RPT-025…029, RPT-019 rewritten) and the first quarterly, 2026-Q3 (RPT-030), reconstructed from git as tests under STD-043; week 39's figures recounted with the same method.
- **Added** STD-043 A report speaks to the board: weekly, quarterly and annual reports under nine headings for a board and the public; three moulds (week, quarter, year); PRO-017 uses them; RPT-024 week 39 as the first test (site v0.102.0).
- **Added** The moon dial reaches the map: rings, astrolabe, districts, panel rows, tooltips and aria labels speak at the chosen stop; Neo-Atlantists spelt as the glossary spells it (site v0.101.0) (#578)
- **Added** /updates shows the hour each version shipped (Central European Time) and the build it names, read from git at build time; the page gets the reading player (site v0.100.0).
- **Changed** Christian answers the census: Exegetes govern meaning (brand is one strand); Heirs of Eleusis' field is narrative projection holding gamification; four Oracles remain; the Threshold is also a sign-in. Chapter 2's bards become chroniclers
- **Fixed** The Veil in English (was «Velo»; BLU-011 now book-and-veil); the Summa Archive with two m's and in that order; a test keeps both; the moon dial gains seven words (site v0.99.0)
- **Changed** Legal notice (`LEG-004` 0.2.0) gives the Mercantile Registry entry and postal code; `DBT-022` 0.2.0 strikes nine closed rows, adds two and carries the letter to counsel (§5 and a .docx); the cookie notice keeps Accept and Reject side by side on desktop (site v0.98.0)
- **Changed** Selling leaves numinia.org: /contribute and its blocks are gone; support is sold on numinia.com/support. `OPS-014` 0.4.0: Backer is a 5 EUR coffee paid once, test-mode link; the gift is a supporter's badge on numinia.com (site v0.105.0)
- **Added** The narrative dial: a moon in the bar sets how the archive speaks — plain, as it is, or Numinia's own words — from a register whose every word is copied from an archive file (`web/src/lib/narrative-words.mjs`, tested); `LEG-003` 2.1.0 lists `numinia-narrative` (site v0.97.0)
- **Added** Legal debts for counsel (`DBT-022`, 33 gaps); legal notice (`LEG-004`); cookie notice with equal Accept and Reject; `LEG-001` 2.1.0 names providers and transfers outside the EEA; `LEG-003` 2.0.0 lists every key; a test keeps internal notes out of legal texts (site v0.96.0)

- **Changed** The semantic census answers its first question: a district is a faction's operative territory, tied to no guild or institution; Ouroboros is the Heirs of Eleusis' ground, play first with narration, ritual and dream inside it (Christian, SYS-011 0.2.0)
- **Fixed** The LAP's name, by the Oracle's ruling: LAP in every language, no dots; *Lector Akáshico Personal* in Spanish, *Lore Akashic Processor* in English. The translation glossary and the LAP census card say so; census dates no longer lie in the future
- **Added** /configure gathers the settings of NWOS (narrative, gamification, automation, the team); every page is reachable from the map or the archive, and `check-reachable` fails the build when one is not (site v0.95.0)
- **Fixed** The archive's map leads to /contribute: Support Numinia, under The offer · Collect, was marked to create with no link (site v0.94.0)
- **Added** The semantic census (`SYS-011`): one card per Numinia entity, facet by facet, every claim cited, inferred or proposed; eight pilot cards in draft for Christian. `RPT-023`: a newcomer's wall is the house's words, not the game's
- **Added** /contribute: Open Collective's Contribute cards and path (details, how you appear, payment) read from `OPS-014` 0.3.0's `goods` (a field `STD-004` 4.5.0 registers for operations/); pay button Coming soon; a block at the foot of every document links to it (site v0.93.0)
- **Added** Two registers: The levels of automation (STD-041) and What an agent may do without asking (STD-042); /automation reads them instead of carrying the tables; Requesting approval asks for the plain words before the command (site v0.92.0)
- **Changed** `OPS-014` 0.2.0: Backer starts at 5 EUR (5, 10 or 25 a month; 2 lost 18 % to the processor's fixed fee), yearly for ten months' price, what each card delivers proposed from common practice; Open books' simulator follows (site v0.91.0)
- **Added** `BLU-018` Our own payment gateway: Redsys and Bizum through our bank — what Stripe costs on small payments, what doing it ourselves would take, and the trigger to revisit (100 EUR a month in fees)
- **Added** The first record of something to sell: `OPS-014` *Supporting Numinia*, Open Collective's Contribute cards minus Donation — Backer from 2 EUR a month, Sponsor from 200 EUR — what each delivers still to fix, not on sale; `SYS-008` points to it
- **Changed** Whoever pays chooses what is public about their payment: a name, an alias or none, and whether the amount shows; silence hides both. CAN-011, STD-033 PAY-007, SYS-008, PRO-020 and Open books' homage list follow (site v0.90.0)
- **Added** What an agent may do without asking: /automation draws five levels of automation as the home's astrolabe and grades sixteen permissions at each; every OPERATOR.md declares its `automation_level` and the page reads it; a test holds both (site v0.89.0)

### 2026-09-28

- **Changed** A draft rule no longer says it binds: its Binds line reads "Would bind, once in force" on the site, and the rule index in AGENTS.md shows each rule's state; AGENTS.md and document pages carry the repository's name (site v0.88.0)
- **Changed** The site bar drops the Archive drop-down: Archive is a plain link to the archive page, whose four blocks are now drawn as buttons, with the books and the sister sites beneath them (#556)
- **Changed** The site bar keeps Map and Archive only; Archive opens a page drawn from the same four blocks as its menu; the lore index gains its three shelves (world, adventures, codex) and the menu opens each at its own; no white flash between pages (#553)
- **Fixed** The door names only what exists: AGENTS.md takes the repository's name, opens with the rules in force, and drops references the tree does not hold; a test pins every path and code in the root files to the tree (#552)
- **Added** Open books lists every line of the ledger with filters, explains VAT and reverse charge, shows what each payment turns into, and adds the year to its panel (site v0.85.0) (#551)
- **Added** The newcomer test: two blind readers with only the canon answer 23 questions — 10 of the canons' own 11, 5 of a newcomer's 12; the baseline any canon rewrite is measured against (RPT-022)
- **Changed** The front door says what binds: the README carries the repository's name, starts at /binding and AGENTS.md instead of a draft protocol, and names only sibling repositories that exist; the home page and every page's head point at /binding and /llms.txt (#549)
- **Removed** Duplicates: the old lore copy of the Numen Games–Numinia text, 78 filler lines in Brand and Culture, the three paragraphs every agent repeated, and a paragraph the two vocabularies shared (#548)
- **Removed** History that adds nothing: 18 decision records whose change is already in the text they decided, and the version logs, status checks and execution logs kept inside documents (#547)
- **Removed** The fat of the archive: the CHANGELOG becomes an index of one line per change, five closed missions and one closed report leave the corpus, and the MVP story drops its appendices (#546)
- **Added** The moulds, side by side (#545)
- **Changed** A sale's record is a document like every other (#544)
- **Added** Metis, the sales agent (#543)
- **Fixed** Every page links back to its file (#542)
- **Added** The pipeline, as three readers see it (#541)
- **Changed** The process is the evidence (#540)
- **Added** The first opportunity, the first proposal (#539)
- **Added** Opportunities, a public series (#538)
- **Added** Training, the offer; selling as wired (#537)
- **Added** The three moments of a sale, as protocols (#536)
- **Added** How a sale is written down (#535)

### 2026-09-27

- **Added** What is yours stays with you, carried out (#530)
- **Changed** Joining and leaving, two protocols; the living pieces, thinner (#529)
- **Changed** Every protocol has the five parts (#528)
- **Added** Books (#527)
- **Added** The core, as a flow (#526)
- **Changed** The corpus does not grow, in force (#525)
- **Fixed** The corpus-does-not-grow guard reads what the tree had (#524)
- **Changed** Bringing a rule into force, and one page per document, in force (#523)
- **Fixed** The protocols keep the designed system (#522)
- **Changed** Every protocol is steps (#521)
- **Changed** One document, one address, in force (#520)
- **Added** PRO-023, bringing a rule into force (#519)
- **Changed** The entry door, and six standards in force (#518)
- **Changed** The five longest standards, thinned (#516)
- **Added** /binding names which documents are draft (#515)
- **Added** Legal is its own series (#514)
- **Changed** One answer per question (#513)

### 2026-09-26

- **Changed** A requirement answers yes or no (#512)
- **Added** A canon for ownership (#511)
- **Changed** The canon shows its question (#510)
- **Changed** The standards index shows each question (#509)
- **Changed** The copy pass (#508)
- **Changed** Thinning the apparatus (#507)
- **Changed** One document, one question: the last rows (#506)
- **Changed** Thinning the standards: design values (#505)
- **Changed** Thinning the standards: the header (#504)
- **Changed** Thinning the standards (#503)
- **Changed** One document, one question: the second cut (#502)
- **Changed** One document, one question (#501)

### 2026-09-25

- **Changed** We are a microenterprise (#500)
- **Changed** Outside standards adopted where they say it better (#499)
- **Changed** Every standard reads for people first; STD-011 shared out (#498)
- **Changed** Licensing in plain words (#496)
- **Changed** Licensing leans on SPDX, REUSE and the DCO (#495)
- **Changed** Plates and sources leave the reading (#494)
- **Changed** External standards are rules, told aloud (#493)

### 2026-09-24

- **Changed** The map of the Summa is the home (#491)
- **Fixed** The cookie policy says what the sites keep (#489)
- **Changed** Open books (#487)
- **Changed** The Codex is the shared source (#486)
- **Added** The account looks ahead (#485)
- **Changed** Adventures on two shelves: tabletop and virtual worlds (#484)
- **Fixed** Nimrod is the Gatekeeper (#482)
- **Fixed** The ledger carries staff in one line (#481)
- **Added** The account, simulated (#483)
- **Changed** The standards read in five shelves (#480)
- **Added** PRO-020 and PRO-021, two protocols for money, ADR-065 (#479)
- **Added** SYS-008, the account as wired today (#478)
- **Fixed** The manual as its authors meant it; the English names the authors chose (#477)
- **Added** The four sites against the design system (#475)
- **Added** STD-033, every charge delivers something; the account is one, ADR-064 (#476)
- **Fixed** The English glossary follows the Token correction (#474)
- **Added** The Codex's edition matter, in English (#471)
- **Added** CAN-011, what has value also makes a bond, ADR-063 (#473)
- **Added** Day and night on every site (#472)
- **Changed** The design system, seen (#470)
- **Added** The Broken Mirror, in English (#469)
- **Fixed** AGENTS.md types no protocol count; REUSE lint clean (#468)
- **Fixed** The READMEs know the manual is whole in English (#467)
- **Added** The manual in English: chapters 3 to 7 (#466)
- **Added** The Numinia Design System, whole (#465)
- **Removed** The v5 guide (#465)
- **Changed** The kit speaks the current system (#465)
- **Added** The manual in English: chapter 2 (#464)
- **Added** STD-031, A canon states, ADR-062 (#462)
- **Changed** The canon reads in four shelves (#461)
- **Changed** Three canons of the house, ADR-061 (#459)
- **Added** CAN-010, leave things better than you found them, ADR-060 (#457)
- **Added** CAN-009, the archive is the organisation, ADR-059 (#457)
- **Fixed** STD-030 follows the translation glossary (#456)
- **Changed** CAN-007 says what function is, ADR-058 (#455)
- **Changed** CAN-004 absorbs CAN-003, ADR-057 (#454)
- **Added** The manual in English: introduction and chapter 1 (#453)
- **Added** The translation glossary (#451)
- **Changed** The manual, chapter by chapter (#450)
- **Changed** The lore is CC0 (#449)
- **Changed** The licence is the file's (#448)

### 2026-09-23

- **Added** What binds today (#437)
- **Added** A door for machines (#436)
- **Fixed** Eleven documents were published with no licence at all (#436)
- **Changed** Rights are stated per document, never per folder (#436)

### 2026-09-22

- **Changed** Fourteen gaps that were never gaps (#431)
- **Added** A SHOULD that nothing would ever fail (#431)
- **Added** 46 rules, and no cheap way to know which ones apply (#430)
- **Changed** The agent context said a great deal and checked none of it (#429)
- **Changed** The register named one vendor's adapter (#428)
- **Changed** A retired connector held every Astro update hostage (#426)
- **Fixed** The listen button had nothing to read (#425)
- **Added** Every page offers its own markdown (#424)
- **Changed** Source points at the document that governs, not the template that draws (#424)
- **Debt** `DBT-021` — six pages hold their content in the template instead of the corpus (#424)
- **Changed** The home is a threshold, not a filing plan (#423)

### 2026-09-21

- **Changed** The viewer's skeleton: the Summa is the home, the functions are the menu (#422)

### 2026-09-20

- **Changed** One document, one address: /corpus/ removed, 482 addresses deleted (#413)
- **Changed** The /archive pages read the archive, instead of remembering it (#412)
- **Changed** The first agent card: agents/ursa/AGENT.md replaces AGENT.yaml (#410)
- **Changed** The Avocado card is a draft, like the model it tests (#409)
- **Added** The first entity card: objects/avocado.md (#408)
- **Added** The template guard, proven (#407)
- **Added** Coverage of the guards and tools is seen in CI, not enforced (#406)

### 2026-09-19

- **Added** DEV-008: the test before the code (#405)
- **Fixed** The repository is numengames/numinia-archive on every live surface (#404)
- **Fixed** Telemetry: main no longer turns red with the calendar (#403)
- **Added** Ci: the web is type-checked and every file declares its licence — both report, neither bites yet (#402)

### 2026-09-18

- **Added** First CC0 resource intake (#401)
- **Added** A site says what it stores: OPS-010, DSN-015 (#400)
- **Fixed** The home page said the service's line (#399)
- **Changed** STD-015 1.3.0: the family pipeline — what every Numen repository runs (#398)
- **Added** DSN-014 on numinia.org: a link presents itself (#397)
- **Added** Dependencies: always the latest, merged by the checks (#383)
- **Added** STD-026: the operative vocabulary comes to the archive (#382)
- **Changed** Transition regime: draft describes, it does not bind (#381)

### 2026-09-17

- **Added** Lore/: the game comes home (#379)

### 2026-09-16

- **Changed** Web: footer round two, /updates, legal slugs, version-bump guard (#377)
- **Changed** Web: the house footer, the same on the three sites (#376)

### 2026-09-09

- **Removed** Guilds/ and infra/: two series without a consumer, ADR-045 (#343)
- **Removed** Machine/scripts/: eight dead files, tests gathered under machine/scripts/test/ (#411)

### 2026-09-04

- **Removed** Reports/ series extinction, Oracle instruction (#248)

### 2026-09-03

- **Changed** STD refactor, licensing: STD-003 reservation reversed (#227)

### 2026-09-02

- **Changed** MIS-138 step 7: closure — §10.5 proposed, README, ledger repaired (#215)
- **Added** MIS-138 step 6: families `contradictions` and `figures` — D4, D5 (#214)
- **Changed** MIS-138 step 5: families `headers` and `provenance`, five censuses retired (#213)
- **Added** MIS-138 step 4: family `tokens`, no tokenizer dependency (#212)
- **Changed** MIS-138 step 3: family `legacy`, `count-evidence.py` retired (#211)
- **Added** MIS-138 step 2: the instrument, first three families (#209)
- **Changed** MIS-138 step 1: shared classifiers — `machine/scripts/lib/rules.json` (#411)
- **Changed** MIS-138 v1.1.0: iteration 1 with the Oracle, `in-progress` (#205)
- **Added** MIS-138: telemetry instrument — brief (#204)
- **Changed** Missions/ normalisation, lots 2–4 — judgement; PR #198 (#198)
- **Changed** Missions/ normalisation, lot 1 of 4 — mechanical (#198)

### 2026-09-01

- **Changed** ADR-005 v1.2.0, reports/ normalisation — PRs #193, #194 (#194)

### 2026-08-21

- **Added** P-011, security audit protocol

### 2026-08-17

- **Changed** MIS-066, mission system unification

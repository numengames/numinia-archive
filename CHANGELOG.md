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

### 2026-09-29

- **Changed** The bar opens with the site's wordmark, by the Oracle's ruling: `Numinia_Word` on numinia.org and numinia.com, `Numen_Games_Horizontal_Word` on numen.games and nwos; `STD-023` §23, `BLU-009`, `STD-037` and kit 6.4.0 (`web.marca`) say so (site v0.104.0)
- **Changed** numinia.org leads the design: `STD-023` 1.7.0 takes its label, headline, column, 71 icons, entrance (animation 16) and §23 *The web piece*; `BLU-009`, `STD-008` and kit 6.3.0 follow; radii 6 / 8 px only; no sky on numen.games (site v0.103.0)
- **Added** STD-043 A report speaks to the board: weekly, quarterly and annual reports under nine headings for a board and the public; three moulds (week, quarter, year); PRO-017 uses them; RPT-024 week 39 as the first test (site v0.102.0).
- **Added** The moon dial reaches the map: rings, astrolabe, districts, panel rows, tooltips and aria labels speak at the chosen stop; Neo-Atlantists spelt as the glossary spells it (site v0.101.0) (#578)
- **Added** /updates shows the hour each version shipped (Central European Time) and the build it names, read from git at build time; the page gets the reading player (site v0.100.0).
- **Changed** Christian answers the census: Exegetes govern meaning (brand is one strand); Heirs of Eleusis' field is narrative projection holding gamification; four Oracles remain; the Threshold is also a sign-in. Chapter 2's bards become chroniclers
- **Fixed** The Veil in English (was «Velo»; BLU-011 now book-and-veil); the Summa Archive with two m's and in that order; a test keeps both; the moon dial gains seven words (site v0.99.0)
- **Changed** Legal notice (`LEG-004` 0.2.0) gives the Mercantile Registry entry and postal code; `DBT-022` 0.2.0 strikes nine closed rows, adds two and carries the letter to counsel (§5 and a .docx); the cookie notice keeps Accept and Reject side by side on desktop (site v0.98.0)
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

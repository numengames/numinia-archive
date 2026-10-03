---
id: "STD-026"
uid: ""
title: "Operative vocabulary"
type: standard
subtype: register
status: active
version: "0.6.0"
created: "2026-09-18T12:00:00+02:00"
updated: "2026-10-03T21:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
section: "Knowledge and quality"
license: "CC0-1.0"
tags: [standard, register, vocabulary, glossary, onboarding]
related: ["PRI-002", "PRI-005", "PRI-006"]
derived_from: "PRI-002"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Operative vocabulary

> **Summary:** The words Numen Games works with, A to Z, in plain words:
> what each one is, what it clears up, and what it lets you do here. One
> definition per word, written once, here; every other document uses the
> word and does not define it again. The list grows only by decision, and
> only with what is essential.
>
> Each entry names the kind of thing first, then what sets it apart, in one
> sentence, as the international rule for definitions asks. Then what it
> clears up, what it enables here, its names at the three narrative levels
> when they differ (business · mixed · Numinia), and its other names after
> "Also", as the web consortium's model for vocabularies lays out. Where the game uses the same word in its
> own sense, the entry says so and points to the game's glossary.
> **Epistemic:** What do our operative words mean?
> **Pragmatic:** Look up a word before writing it into a document; write the
> word, never its definition.

The three narrative levels are the dial's business, functional-mixed and
Numinia settings. The in-world names of each guild, faction and unit of
activity are a translation, not a definition, and live in the world's
vocabulary. Each entry ends by naming the convention its word follows, with
its source, and a house word says that the industry has none (`ADR-067`).

## A

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Absorbs** *(relation)* | The header field by which a later record says it carries an earlier one's reasoning, so the old identifier keeps resolving. | Merging two records deletes nothing anyone cited. | Consolidating decisions, debts or standards without breaking a citation. | Convention: none in the industry; house word — Dublin Core and MADR have no relation for a merge. |
| **Acceptance criteria** *(condition)* | The checkable statements a piece of work must meet before it counts as done. | "done" stops being an opinion; each criterion is answered yes or no. | Handing a mission to a person or an agent and checking it without a meeting. |  |
| **Accessibility** *(quality)* | The property of a page or piece that lets anyone use it, whatever their body, device or way of reading. | It is not a feature for a few; it is whether the page works at all. | Every public page reads in both themes, by keyboard and by screen reader, and lets you stop what moves. |  |
| **Active** *(status)* | The status of a document in force: followed, and breaking it blocks. | A draft warns; an active document bites. | Knowing that what you read obliges you today. | Also: in force.<br>Convention: published, in force, approved — the ISO stage and document-control words; kept, because the owner ruled the meaning and the `/binding` page translates it. |
| **Active inference** *(theory)* | A theory of the brain holding that every organism perceives and acts to minimise surprise about its world. | One language for perception, action and learning, and for why good systems keep their maps current. | The reason documents carry an epistemic and a pragmatic value, and the reason design avoids surprising whoever acts. |  |
| **Activity** *(unit of the scheme)* | What an organisation does within a function, and the level of the classification scheme that produces a series. | A folder is filed by the activity that produced it, not by its subject. | Knowing which function a new document serves before writing it. | Convention: activity — the business classification scheme of the National Archives of Australia (function → activity → series); ISO 15489-1:2016. |
| **Address** *(locator)* | Where a document is read on the web: one document, one address, for as long as it answers its question. | A moved document keeps answering at its old address or says where it went. | Linking to a document without fearing the link will rot. | Also: URL.<br>Convention: URL, URI — RFC 3986; the W3C's *Cool URIs don't change*; *address* is the plain-English word, kept for readers. |
| **Adventure** *(unit of activity)* | A run of missions joined by one purpose and one story, over weeks or months. | A programme is not a pile of tasks; it has a start, a thread and an end. | Grouping work so people can tell what it is for. | Programme · Adventure · Aventura<br>In the game: a played story; see the game's glossary.<br>Convention: programme — the business label, by the W3C SKOS model of preferred and alternative labels (`STD-030`); a dial word, kept. |
| **Agent** | See *Digital agent* and *Human*. | | | |
| **Agent files** *(set of files)* | The files an agent is made of: `SOUL` (who it is), `OPERATOR` (who runs it and how far), `STATUS` (where it stands), `MEMORY` (what it keeps), `SOURCES` (what it reads). | An agent is a folder of readable files, not a configuration locked in a tool. | Copying, reviewing or retiring an agent by editing text. | Convention: none in the industry; house words — agent frameworks say *system prompt*, *persona* and *config*, with no settled set. |
| **Apparatus** *(kind of file)* | A file that accompanies a series without being a document of it: a readme, an index, a template. | Scaffolding is not a record; it has no identifier and binds nobody. | Keeping a folder usable without counting its furniture as documents. | Convention: none in the industry; house word, from textual criticism's *critical apparatus*. |
| **Approval** *(act)* | A person's recorded yes to a change or an act that an agent may not take alone. | Who said yes, and when, is written, not remembered. | An agent asks once, with everything needed, and goes on when the answer is in the record. |  |
| **Approval level** *(setting of a series)* | What a change to a document of a series takes, in five levels: `sealed`, `governed`, `closed`, `live`, `open`. | A folder's function says why its records exist; its approval level says what changing them costs. | Knowing before editing whether you may, and what the edit needs (`STD-017`). | Also: threshold (until 2026-10-03).<br>Convention: approval level, change-control level — ISO 9001:2015 7.5.3.2 c), control of changes; the five values are house words, the industry knowing only controlled and uncontrolled. |
| **Approved by** *(field)* | The header field naming the decision or authority that confirmed a document, written `approved_by`. | Who said yes to a norm is in its header, not in memory. | Reading a standard's authority in one line. | Also: ratified_by (until 2026-10-03).<br>Convention: approval — ISO 9001:2015 7.5.2 c), review and approval; *ratify* belongs to treaties. |
| **Archive** *(system)* | The public plain-text repository where Numen Games keeps its memory and works by changing it. | Where the company really lives: in the files, not in the tools that open them. | Knowing without asking whether something binds you; what is not written here binds no one. | Knowledge base · Archive · Summa Archive |
| **Artifact** *(record)* | What a run of the tooling leaves: a measurement, a check's output, a generated index. | It is a short-lived record, kept while current, and never a document: no identifier, no page, no force. | Citing a figure as evidence of what it measured, never as a rule. | Also: instrument (until 2026-10-03).<br>Convention: artifact — continuous-integration practice (a build's artifacts); ISO 15489-1:2016 for the record it is while kept. |
| **Audience** *(field)* | The line of a document that names who it is written for. | A document for agents and one for the public are read differently. | Skipping what is not for you, and writing for the reader actually named. | Convention: intended audience — technical-writing practice. |
| **Avatar** *(digital body)* | The form that represents a person inside a digital world and with which they act there. | Not decoration but embodied identity: it changes how you are seen and how you take part. | The catalogue's avatars are CC0 and portable; your digital body is yours and travels with you. |  |

## B

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Binds** *(line)* | The line of a normative document that names what it applies to. | A rule applies to what its scope names, and to nothing else. | Knowing in one line whether a standard reaches you. | Convention: scope — ISO/IEC Directives, Part 2, the Scope clause. |
| **Blockchain** *(record)* | A shared, ordered record kept by many machines at once, where nothing written can be altered unnoticed. | Who guarantees this without a central authority: the guarantee is mathematical and collective. | Where proofs of ownership will live; today it names the destination, not the present. | Also: distributed ledger. |
| **Blueprint** *(document)* | A recorded design: how something is or will be built, without obliging anyone to build it. | A recipe is how, not whether; the rule that obliges lives in a standard. | Building a piece from a written recipe instead of from memory. | System blueprint · Blueprint · Plano<br>Convention: design document — the RFC-style proposal (PEP 1, Rust RFC, Kubernetes KEP); the series takes the word in cut 4 of `ADR-067`. |
| **Board** *(body)* | The group that governs the organisation and to which its reports are addressed. | A report is written for whoever governs, not for whoever did the work. | Writing a weekly, quarterly or annual report anyone could govern from. | Weekly strategy · Council · Dark Council<br>Also: council. |
| **Bond** *(relation)* | The tie that paying makes between a person and the city, remembered as the person chooses. | Paying buys something named, and leaves a memory the payer controls. | Being remembered by name, by no name, with what you gave or without it. |  |
| **Book** *(view)* | A long reading made by gathering many small documents of the archive, which writes nothing of its own. | The book is a way to read the archive whole, not a second copy of it. | Understanding a whole field in one sitting; change a document and the book changes. | Convention: book — the compiled reading of mdBook, GitBook and Sphinx. |
| **Branch** *(line of work)* | A separate line of changes in a repository, kept apart from the main line until merged. | Work in progress does not touch what is published. | Several people and agents working at once without stepping on each other. |  |
| **Brand** *(asset)* | The name of the house and its marks: the one thing nobody else may be. | Everything else may be opened; the name is never opened. | Using the catalogue freely without passing yourself off as Numen Games. |  |
| **Budget** *(limit)* | The number of words a document's body may hold, set per series. | A long document is a cost to every reader and agent; the limit is a figure, not a feeling. | Writing one page, and knowing when a document must split. | Also: word budget.<br>Convention: word limit — the web's *performance budget* lends the figure its name. |
| **Build** *(act)* | The automatic step that turns the archive's files into the sites and packages people use. | A site is made from the text, not edited by hand. | A failing build stops a broken change before anyone sees it. |  |

## C

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Canon** | See *Principle*: the series' word until 2026-10-03, and the word of the Numinia stop of the dial. | | | |
| **Card** *(record)* | A record read on one screen: a mission card, an entity card, the house card, a supplier card. | A card is the whole record, not a summary of one kept elsewhere. | Reading what a thing is and where it stands without opening a second file. | Convention: card — Kanban, and the one-screen record of common interface practice. |
| **CC0** *(licence)* | The legal declaration that gives a work to the world by waiving every right that can be waived. | "may I use this?" answered with an unconditional yes. | The whole public catalogue is CC0: download it, remix it, sell it. | Also: open licence; public domain dedication. |
| **Check** *(program)* | A small program that reads the archive and says where it breaks one of its own rules. | Nothing is judged by whether it looks right to whoever opened it last. | A rule that bites: once its standard is signed, its check can fail the build. | Also: guard (until 2026-10-03; the folder `machine/guards/` keeps the name until cut 5 of `ADR-067`).<br>Convention: check — the GitHub Checks API and the CI *checks*; lint rule, validator. |
| **Citation** *(reference)* | The named source a claim rests on: a file, a document or a quotation's author. | A claim without a source is an opinion. | Anyone can check what a document says against what it points to. | Convention: citation — scholarly practice; `STD-021`. |
| **Citizen** *(rank)* | The rank of a person who has chosen a guild and a faction. | Arriving is not belonging; a citizen has said what they know and where they apply it. | Taking part in the city with a place of one's own. | Team member · Citizen · Ciudadano |
| **Claim** *(statement)* | What a document says, whether belief, method or decision; it is not true by being written. | When a document and its history disagree, the history wins. | Settling what holds when two sources contradict each other. |  |
| **Classification scheme** *(register)* | The map of the archive: one producer, six functions, their activities and the series each produces. | A function classifies; a series files. They are not the same thing. | Knowing where a new document belongs before writing it. | Convention: business classification scheme — ISO 15489-1:2016 and the National Archives of Australia's function → activity → series. |
| **Client** *(party)* | The organisation that buys what the house makes. | The one who pays is not always the one who uses; a proposal speaks to both. | Naming a client only when they agree; until then, by sector. |  |
| **Code of conduct** *(document)* | The shared rules for how people treat each other in a community, and what follows when broken. | Moderation climbs from correction to warning, limit and ban; threats skip the ladder. | Knowing what is expected, and what happens, before anything goes wrong. |  |
| **Collaboration** *(kind of opportunity)* | Work done with or for someone for no money or little, where what comes back is written. | Working for free is still an exchange, and its return is recorded. | Deciding whether a favour is worth it by what it gives back. |  |
| **Commit** *(change)* | One recorded change to a repository, with its author, its time and its reason. | History is a list of commits; nobody can quietly rewrite it. | Finding who changed what, when and why. |  |
| **Component** *(piece)* | A reusable part of an interface, built once and used the same way everywhere. | A button is not redesigned each time; it is taken from the kit. | Four sites that look the same without anyone copying by hand. |  |
| **Consent** *(lawful basis)* | A person's free, informed and specific yes to a use of their data, withdrawable at any time. | Silence or a pre-ticked box is not consent. | Storing or measuring only what the person agreed to. |  |
| **Continuous integration** *(practice)* | The automatic run of checks on every change before it may join the main line. | A rule is worth the machine that checks it. | A change that breaks a rule is stopped by the pipeline, not by a reviewer's memory. | Also: CI; the checks.<br>Convention: continuous integration — the practice as the industry names it. |
| **Cookie** *(browser storage)* | A small file a site leaves in a visitor's browser to remember something between visits. | Not every cookie needs consent; those that measure or track do. | Changing what a site stores only after the procedure says so. |  |
| **Cookie policy** *(legal text)* | The public text that lists what a site stores in a visitor's browser, why, and how to refuse it. | It describes what the site does, not what would be convenient. | Changing what a site stores means changing this text first. | Convention: cookie policy — ePrivacy Directive art. 5(3); the sector's word. |
| **Copyleft** *(licence regime)* | An open licence that requires whoever shares an improved version to share it under the same terms. | Free to whoever shares back, paid by whoever will not. | A studio may run its own city on our system and give its improvements back. |  |
| **Core fields** *(part of the header)* | The header fields every document carries: its identity (`id`, `title`, `type`, `status`, `version`, dates, `license`) and its origin (`author`, `owner`, how it was made, where its dates came from). | A document with no core fields is invisible to every check. | Reading any document's header the same way. | Also: rings 1 and 2 (until 2026-10-03).<br>Convention: core elements — Dublin Core; the core/extension split of schema practice. |
| **Corpus** *(set of documents)* | Everything the archive holds as text, taken together. | The corpus does not grow; records roll up and leave. | Measuring the archive's size and cost to read it whole. | Convention: corpus — corpus linguistics and information retrieval. |
| **Created source** *(field)* | The header fields `created_source` and `created_confidence`: where a document's date came from (`git:<sha>` or `declared`) and how sure it is (`exact` or `inferred`). | A date is evidence or a claim, and the header says which. | Telling a measured date from a remembered one. | Convention: none in the industry; house words — the Extended Date/Time Format is the nearest, for uncertain dates. |

## D

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Data controller** *(party)* | The person or company that decides why and how personal data is processed, and answers for it. | Whoever decides the purpose answers to the person, even when another company does the processing. | Knowing who a request about personal data goes to. |  |
| **Data dignity** *(stance)* | The stance that a person's data deserves the treatment of their property: consent, portability, minimal capture. | Digital ownership, not digital rental. | Analytics without personal data, telemetry without identity, nothing personal stored unless asked. |  |
| **Data processor** *(party)* | A company that processes personal data on behalf of the controller and only under its written instructions. | A hosting or payment company holds our data; it does not own it. | No processor is used without a processing agreement. | Also: processing agreement (DPA), for the contract. |
| **Data-subject rights** *(rights)* | What a person may ask about their data: see, correct, erase, limit, take away or stop its use. | The data is theirs; asking is enough, no reason needed. | Answering a request on time and in the way the procedure sets. |  |
| **Debt** *(record)* | A written gap between what the archive says should be and what is. | A known gap written down is debt; unwritten, it is a surprise. | Deciding what to fix first, from a list that says what each gap risks. | Convention: technical debt — Cunningham, 1992; a debt register is common practice. |
| **Decentralisation** *(property)* | Spreading a function across many participants so no single point can fail, censor or capture it. | A spectrum, not a switch: ask what is decentralised and how much. | The storage road, where each step removes a single point of failure. |  |
| **Decision** *(act)* | A choice taken by whoever has the authority, written down with the alternatives it rejected. | A decision not written is a conversation, and conversations are not memory. | Knowing why something is as it is, and changing it on purpose. |  |
| **Decision record** *(document)* | The record of one decision: its context, the alternatives weighed and what was chosen. | It records; it does not oblige until a standard carries it. | Reopening a decision knowing what was already considered. | Decision record · Decision · Piedra del Camino<br>Also: ADR.<br>Convention: architecture decision record — Nygard, 2011; MADR for the fields `deciders` and `consulted`. |
| **Dependency** *(software)* | A piece of software someone else wrote that ours needs in order to run. | What we depend on is part of what we ship, with its licence and its risks. | The licence gate and the audits watch what comes in. |  |
| **Deploy** *(act)* | Putting a built version of a site or service where people can reach it. | Merged is not live; deploying is the step that publishes. | Each site deploys itself when its main line changes. |  |
| **Deprecated** *(state of a field, a rule ID or a value)* | A header field, a rule ID or a value that is no longer used and is reported wherever it remains, until its migration lands. | A field leaves in waves, named; a document leaves by being withdrawn. | Reading an old header and knowing which fields to migrate: `provenance`, `type_execution`, `ratified_by`, `freeze_reason`, `semaforo`. | Also: retired (until 2026-10-03).<br>Convention: deprecated — Semantic Versioning 2.0.0 and API lifecycle practice (deprecated, then removed); ISO says *withdrawn* for a document. |
| **Design system** *(system)* | The set of documents, values and pieces that makes everything the house shows look and behave as one. | Design here is the whole experience: seen, read, heard, moved through and played. | Making a new piece from what exists instead of inventing it. |  |
| **Design token** *(value)* | A named design value, such as a colour, a size or a typeface, used by name and never retyped. | A colour is chosen once and read everywhere; nobody retypes a hex code. | Changing a value in one place and seeing it change in every site. |  |
| **Digital agent** *(software system)* | A software system, today usually an AI, that perceives, decides and acts on assignments with real autonomy. | Not "which tool do I use?" but "who do I work with?": a collaborator, not a command. | Agents with missions, gates that check their work, and rules both people and agents obey. | AI agent · Digital agent · Agente Digital<br>Convention: AI agent — ISO/IEC 22989:2022. |
| **Digital divide** *(gap)* | The distance between those who use technology fluently and those left out by access, skills or hostile design. | The platform is a staircase from the everyday web, not a club for converts. | Everything works without a wallet, without JavaScript and without knowing what a blockchain is. |  |
| **Digital source type** *(field)* | The header field `digital_source_type`: how a piece was made — `human`, `ai-assisted` or `ai-generated`. | Who holds a record is custody; how it was made is its source, and the two are different fields. | Reading whether a text was written by a person, with a model's help, or by a model. | Also: provenance (until 2026-10-03).<br>Convention: Digital Source Type — the IPTC NewsCodes vocabulary, adopted by C2PA, for the name; the three values are ours, since IPTC defines its terms for images. |
| **Digital sovereignty** *(capacity)* | A person's capacity to control their identity, data and digital goods without asking an intermediary. | The test every feature faces: does it empower, or create dependence? | An exportable character sheet, seals you carry, sessions issued by us and not by a vendor. |  |
| **Diurno and Nocturno** *(theme)* | The two themes every site serves: Diurno, paper by day; Nocturno, the night. | One switch, the same on every site; neither is the "real" one. | Reading in the light that suits you, with the same contrasts in both. | Also: light and dark mode. |
| **Documentation** *(kind of document)* | A guide or a reference that explains a series or a system, without obliging anyone; its header says `type: documentation`. | A norm is normative; what explains it is documentation. | Telling what you must satisfy from what helps you understand. | Convention: informative, as against normative — ISO/IEC Directives, Part 2; the Diátaxis genres for guides and references. |
| **Draft** *(status)* | The status of a document published to be read and argued with, and quoted against nobody. | A draft binds no one, however firm it sounds. | Sharing a rule before it is in force, without surprising anyone. | Convention: draft — universal; the ISO stage before publication. |

## E

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Effort** *(field)* | The size of a mission, from `XS` to `XL`. | A size is a comparison, not a promise of hours. | Choosing the next mission by what it costs. | Convention: T-shirt sizing — agile estimation practice. |
| **Epistemic value** *(field)* | The question a document answers about the world: what it lets its reader know. | A document that answers no question has no reason to exist. | Finding the document that answers your question by reading one line. | Convention: purpose — technical-writing practice; the Oracle's ruling keeps the question as the line's form. |
| **Escalation** *(act)* | An agent stopping and asking a person instead of deciding something beyond its authority. | In doubt, an agent stops; guessing is the failure. | Sending one complete question and waiting, instead of improvising. |  |
| **Evidence** *(proof)* | What shows a claim or a step is true: a file, a line of the record, a receipt. | A stage, a check or a figure stands on its evidence, not on who says it. | Moving a record forward only when its evidence is in. | Convention: evidence — ISO 15489-1:2016, records as evidence. |
| **Evidence script** *(field)* | The header fields `evidence_script` and `evidence_head`: which script and which commit produced a document's figures. | A figure nobody can re-run is an opinion with a date. | Re-running a report's measurement at the commit it names. | Convention: none in the industry; house words — PROV-O's *wasGeneratedBy* is the nearest. |
| **Executor** *(field)* | The header field saying who carries a mission or an agent's work out: `agent`, `human` or `hybrid`. | Rules are shared; whether a person must act is written, not assumed. | Routing a card to an agent, a person or both. | Also: type_execution, with the values digital · biological · hybrid (until 2026-10-03).<br>Convention: human and AI agent — ISO/IEC 22989:2022; the field name follows the industry's *executor*, *actor*. |
| **Extended reality** *(technology)* | The whole spectrum mixing the physical and the digital: virtual, augmented and everything between. | Design for the spectrum, not for the gadget of the season. | Worlds on web standards, entered by browser, phone or headset. | Also: XR. |
| **Extension fields** *(part of the header)* | The header fields a series registers for its own documents, beyond the core: a mission's `priority`, a decision's `deciders`, an opportunity's `kind`. | A field no series registers is an error, caught the day it is written. | Adding a field to one series without touching every other. | Also: ring 3 (until 2026-10-03).<br>Convention: extension — the core/extension split of schema practice. |

## F

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Faction** *(field of development)* | The ground where a person applies what they know; there are four: play, framework, education and art. | Where you apply knowledge is not what you know (that is the guild). | Placing any person or piece of work on a field without inventing a department. | Area · Faction · Facción<br>In the game: each faction is a people of the city; see the game's glossary.<br>Convention: area — the business label, by W3C SKOS (`STD-030`); a dial word, kept. |
| **File over app** *(principle)* | The principle that data lives in readable, portable files, not inside an application that can die. | Not "which app do I use?" but "whose is the file when the app is gone?". | Catalogue in JSON, sheets in Markdown, state in git: everything outlives the platform. |  |
| **Fonds** *(set of records)* | The whole of the records one producer creates; the archive is one fonds of six functions, and `lore/` a second. | Folders are series of one fonds, not fonds of their own. | Classifying a new folder by the function that produced it. | Also: fond (until 2026-10-03), a misspelling.<br>Convention: fonds — ISAD(G), 2nd ed., glossary; RiC-CM 1.0 says a *record set* of type fonds. |
| **Function** *(plane)* | What an element of the organisation is, defined by what it is for and what it is worth. | Renaming a thing does not transform it; its relations (the structure) must change. | Telling a real guild from a department in costume. | Convention: function — ISO 15489-1:2016 and the business classification scheme, where a function is what an organisation does and a series what it produces. |
| **Funnel** *(model)* | The five steps an opportunity's record passes, used to count how many reach each one. | The stage says where one record is; the funnel says where the pipeline leaks. | Seeing which step loses most opportunities, and working there. |  |

## G

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Gamification** *(practice)* | Using what makes games work, such as goals, progress, reward and story, in activities that are not games. | Not adding points but designing motivation; done badly, it is manipulation with confetti. | The method of the house: the whole city is a play layer over learning and making. |  |
| **Gamification dial** *(setting)* | How much play an organisation takes on, in five thresholds from none to a full economy. | Play has jumps, not a smooth curve, and is set apart from the vocabulary. | Offering an organisation dashboards without badges, or badges without tokens. | Convention: none in the industry; house word. |
| **Git** *(tool)* | The version-control system that keeps the archive's whole history, shared whole by every copy. | The history is the record nobody can change; documents are claims, git is evidence. | Recovering any past state and seeing who wrote every line. |  |
| **Grant** *(kind of opportunity)* | Public money that is not a sale: a grant, a public loan, a prize or a programme. | A grant is won when the money is in the bank, not when it is granted. | Reading each call against the house card before applying. |  |
| **Guide** *(kind of documentation)* | Documentation that walks a reader through doing something, step by step, without obliging them. | A guide helps; a procedure binds. | Learning a task before being held to it. | Convention: how-to guide — Diátaxis. |
| **Guild** *(qualification)* | What a person is trained in; there are four: Alchemists, Exegetes, Procurators and Sentinels. | What you know is not where you apply it (the faction) nor what you do now (the role). | Placing anyone without inventing categories; people name their branch: not an Alchemist, an Engineer. | Discipline · Guild · Gremio<br>In the game: see the game's glossary.<br>Convention: discipline — the business label, by W3C SKOS (`STD-030`); the header key `guild:` is the one surface the dial cannot translate; a dial word, kept. |

## H

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Header** *(part of a document)* | The labelled fields that open every document: what it is, who wrote it and when. | An unknown value is left out, never guessed. | Tools read any document without opening its body. | Convention: Dublin Core Terms, PROV-O, the SPDX License List, Semantic Versioning 2.0.0 and RFC 3339 — one per field, mapped in `STD-004`. |
| **House card** *(record)* | What the company holds when a public body asks who it is: size, age, record, certificates, cash. | Every call is read against one card, not answered from memory. | Knowing in minutes whether a tender or grant is within reach, and what would unlock it. |  |
| **Human** *(person)* | A person, named beside the digital agents because both receive missions and answer for them. | The same working frame without the same nature: rules are shared, decisions stay human. | Processes written once, valid for any mix of people and agents. | Also: biological agent (until 2026-10-03); person; hybrid team, for a mix.<br>Convention: human, as against AI agent — ISO/IEC 22989:2022; *biological agent* is a hazard in occupational-safety law. |

## I

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Identifier** *(code)* | The series code a document carries for life, such as STD-026; a used number is never reused. | The file name says neither state nor version; the identifier never changes. | Pointing at a document that will still be found after it moves. | Convention: `dcterms:identifier` — DCMI Metadata Terms. |
| **Interoperability** *(property)* | The capacity of things to work outside the place they were born, in other tools and worlds. | Every proprietary format is a border for your goods. | Publishing in open formats (VRM, glTF, Markdown, JSON) so goods travel. |  |
| **Invoice** *(document)* | The legal document that asks for payment for something delivered, with its tax. | Every invoice becomes one line in the ledger, traceable to its paper. | Books that close from documents, never from estimates. |  |

## L

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Leave things better** *(principle)* | The house's single ethical rule: leave things better than you found them. | A belief, not a policy; it applies to people, data, what is published and what agents may do. | Deciding a doubtful case with one question. |  |
| **Ledger** *(register)* | The single book where every cost and income of the company is one line, closed from documents. | Every view of the money is computed from the same lines; there is no second set. | Open books, tax returns and reports that never disagree. | Also: the account; the books. |
| **Legal** *(folder)* | The series `legal/`: what the company has promised the public in law — privacy, terms, cookies, the legal notice. | These texts change when the law or the service does, not when a style does. | Finding what the company has promised, in one folder. | Convention: legal — the sector's word. |
| **Level of automation** *(setting)* | How far an agent runs alone, in five levels from assisted to full. | Each level says what the person still does and where they approve. | Granting an agent more room step by step, never by default. | Convention: level of automation — the SAE J3016 ladder as a model, `STD-041`. |
| **Licence** *(legal terms)* | The written terms that say what others may do with a work. | A file with no licence is all rights reserved by law, and looks like an oversight. | Every piece states its terms; a stranger knows in thirty seconds what they may take. |  |
| **Lore** *(folder)* | The series `lore/`: the fiction and the game, a second fonds. | The world is written by a different producer than the company's records. | Reading the game without mistaking it for a rule. | Convention: lore — the games industry's word for a world's written background. |

## M

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Machine** *(folder)* | The folder `machine/`: the tooling — checks, tools, scripts, templates, telemetry — and the artifacts it leaves. | Nothing under it is a document; it has no prefix, no approval level, no page. | Finding the program that verifies a rule. | Convention: tooling, ci, scripts — conventions of the industry, none a standard; kept. |
| **Markdown** *(format)* | A plain-text format where light marks give a document its headings, lists and links. | Readable by a person as it is and by any tool, now and in thirty years. | The whole archive is written in it. |  |
| **Merge** *(act)* | Joining the changes of a branch into the main line once reviewed and checked. | A merge is a decision with an author, not a side effect. | Work reaches the main line only by a reviewed pull request. |  |
| **Metaverse** *(idea)* | Persistent, shared digital worlds where people have presence, ownership and continuity across worlds. | Past the hype, the useful question: what persists, and what is yours, when you leave? | Portals to worlds, portable avatars, identity that crosses. |  |
| **Mission** *(unit of work)* | One piece of work with a stated end and one person or agent doing it. | A mission that cannot say what it is worth is a ticket. | Putting work on the board before it starts, and deleting it when it ends. | Project · Mission · Misión<br>In the game: see the game's glossary.<br>Convention: work item, issue or task — Jira, GitHub Issues, Azure DevOps; a dial word, kept, and rendered *project* at the business stop. |
| **Month close** *(procedure)* | Turning a month of costs and income into closed lines of the ledger. | A month is closed once, from documents; later changes are new lines. | Handing each quarter to the tax advisers without rework. |  |
| **Moon** | See *Narrative dial*. | | | |

## N

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Narrative dial** *(setting)* | How much of the world's vocabulary an organisation takes on, from plain business to full Numinia. | The vocabulary changes; the system underneath stays the same. | Offering the same system to a bank and to a game studio. | Convention: none in the industry; house word — the dial, its three stops and the moon that opens it in the bar. |
| **NFT** *(token)* | An entry on a blockchain that says one particular digital object belongs to one wallet. | What is scarce is not the file, which copies, but the title over it. | The intended way for loot and season rewards to be real possessions. |  |
| **Normative documents** *(set of documents)* | The principles, the standards and the procedures: the only documents that oblige. | Everything else records; a sentence binds you only if it lives in a normative document. | Telling whether a sentence obliges you by where it is written. | Also: axis (until 2026-10-03); what binds.<br>Convention: normative, as against informative — ISO/IEC Directives, Part 2; ISO 9001:2015 7.5, documented information to be maintained. |
| **Numen Games** *(company)* | The company, Numen Games S.L., that makes Numinia and runs on it. | Numen Games is who signs and invoices; Numinia is how it works. | Knowing which name goes on a contract and which on a story. |  |
| **Numinia** *(world)* | The way Numen Games works, told as a city that anyone can walk into. | You do not learn it by being briefed; you learn it by walking in. | Using the city's words when they help, and the plain ones when they do not. | The organisation · The city · Numinia |
| **NWOS** *(product)* | The Narrative Work Operating System: the archive, its agents and its narrative layer, offered to other organisations. | A work system first; the story is an optional layer on top. | An organisation adopts files, versions, agents and people, and adds narrative if it wants. | Work operating system · Narrative Work OS · Narrative Work OS |

## O

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Object** *(record)* | A thing the archive registers that is not a document — an avatar, an agent — kept as a card in `objects/` or beside the agent. | The catalogue reads the cards; the bytes live in their copies, never here. | Knowing what the house holds and under which licence, without opening the files. | Convention: asset — digital asset management; ISO 15489 would still call it a record. |
| **Offer** *(record)* | Something the house sells, written once with what it delivers, for whom and at what price. | A proposal is cut from an offer, never invented per client. | Putting something on sale from a record, not from a conversation. | Convention: offer, product — CRM vocabulary (Salesforce). |
| **On hold** *(status)* | The status of a mission that is paused, with its reason written in `hold_reason`; it returns to any state. | A paused card says why; a cancelled card is on hold with that reason. | Keeping the board honest about what is not moving. | Also: frozen (until 2026-10-03).<br>Convention: on hold, blocked — Kanban and Jira workflow states. |
| **Open books** *(view)* | The company's real accounts shown in public, computed from the ledger. | Nobody's pay is visible; everything else is. | Anyone entitled to check the account finds it whole. |  |
| **Open source** *(software)* | Software whose code anyone may read, use, change and share again. | Trust is audited, not promised; no black boxes in the foundations. | Copying and improving what we build; and watching what comes in. |  |
| **Opening** *(act)* | The deliberate act that moves a piece to a more open licence, with no way back. | Everything is born closed; opening is a promise, not an accident. | Knowing what you give before you give it, and that you will not get it back. |  |
| **Operations** *(folder)* | The series `operations/`: what sustains the business — strategy, sales, continuity. | What the company does to stay alive is recorded, not remembered. | Finding the house's offer, its card and its continuity plan. | Convention: operation — ISO 9001:2015 clause 8. |
| **Operator** *(person)* | The person who runs a digital agent and answers for what it does. | An agent acts; a person is responsible. | Knowing whom to ask about an agent's work. |  |
| **Opportunity** *(record)* | A chance to bring money or work into the house, kept as one public file with its timeline. | There are five kinds: sale, tender, grant, collaboration and partner. | The stage, the next step and the chance are computed from the record, never typed. | Convention: opportunity — CRM vocabulary (Salesforce); the folder is `opportunities/`. |
| **Oracle** *(rank)* | The highest rank in Numinia: one of the founders, who signs the decisions that bind the house. | Who decides in the end; digital agents propose, they do not sign. | Knowing whom to escalate to when you cannot decide. | Executive · Council lead · Oráculo<br>Convention: executive — the business label, by W3C SKOS (`STD-030`); a dial word, kept. |
| **Outcome** *(field)* | The header field of a decision record saying where the decision stands: `proposed` or `accepted`. | The document's lifecycle is `status`; the decision's own state is this field. | Reading whether a decision was taken or only put forward. | Convention: the MADR template's `status` (proposed · rejected · accepted · deprecated · superseded); the archive's `status` is the lifecycle, so a second key is forced. |
| **Owner** *(field)* | The person who answers for a document and approves its changes. | The author wrote it; the owner keeps it. | Knowing whom to ask before changing a document. | Convention: document owner — ISO/IEC 27001 practice. |

## P

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Partner** *(kind of opportunity)* | Another organisation the house bids or sells beside, with an agreed split. | A partner is neither a client nor a supplier. | Going after work too big to do alone. |  |
| **Payment link** *(tool)* | The address of the payment company's page where a buyer pays for one named good. | We never take card details; the buyer pays on the payment company's page. | Selling from any site with one link per good. |  |
| **Permanent storage** *(storage)* | Networks built to keep files for decades without anyone paying a server each month. | "what if the company closes?": permanence stops depending on a monthly invoice. | What Numinia publishes must not be able to disappear. |  |
| **Personal data** *(data)* | Any information about an identified or identifiable person. | An e-mail, an IP or a wallet address can be personal data. | Keeping it only on a lawful basis, for a stated purpose, as long as needed. |  |
| **Personal-data breach** *(incident)* | Personal data we hold being seen, lost, changed or taken by someone who should not have it. | A suspicion is enough to start; the clock for telling the authority runs from then. | Acting in order, and telling the authority and the people affected on time. |  |
| **Pipeline** *(view)* | Every open opportunity, read from the records and shown by stage. | The pipeline is computed; nobody types it. | Seeing what may be won this quarter from one page. | Convention: pipeline — CRM vocabulary (Salesforce). |
| **Platform** *(product)* | The service where people of Numinia hold their account, rank, goods and sessions. | The platform is one way in; the archive and the files outlive it. | Entering with an e-mail and raising your sovereignty when you choose. |  |
| **Playful learning** *(idea)* | The idea that people learn by playing, because play explores the unknown without fear of error. | Experience first, content second. | Adventures, riddles and the graphic-adventure heritage in what we build. |  |
| **Position** *(attribute)* | The stable post a person holds that others can name, such as treasurer. | A position is a post; a role is what you are doing now. | Naming posts without confusing them with people's knowledge. |  |
| **Positioning** *(statement)* | What the house says to a buyer: the problem, the solution, who it is for and the words used. | Positioning is a choice of market, not a belief; it is not principles. | Every piece of sales material speaks with one voice. |  |
| **Pragmatic value** *(field)* | What a document lets its reader do once read. | Knowing is not enough; a document must change what you can do. | Choosing the document that lets you act, by reading one line. | Convention: purpose — technical-writing practice, as the pair with the epistemic value. |
| **Precedence** *(rule)* | The order that decides which source wins when two disagree. | History beats a document, a document beats code, the costlier document beats the cheaper. | Settling a contradiction without asking who is more important. | Also: which rule wins. |
| **Price** *(amount)* | What a buyer pays for a named good, shown whole, with tax, before paying. | No hidden fees; the price seen is the price paid. | Every charge passes the question "can the whole price be seen?". |  |
| **Principle** *(document)* | A normative document that says what is so and why, and leaves the reader able to act; its header says `type: principle`. | A principle gives reasons, not procedures; it names no tool and keeps no clock. | Deciding a case nobody wrote a rule for, from the reason behind the rules. | Principle · Principle · Principio<br>Also: canon (until 2026-10-03); the word of the Numinia stop.<br>Convention: the governance hierarchy policy → standard → procedure → guideline; *policy*, "intentions and direction of an organization as formally expressed by its top management" — ISO 9000:2015 3.5.8. The archive's founding texts state what the system is and why, so the word is *principles* (the legal texts of `legal/` keep *policy*); the series `principles/` took it in cut 3 of `ADR-067`, the prefix `PRI-` for `CAN-`, each document keeping its old identifier in `former_id`. |
| **Priority** *(field)* | How urgent a mission is: `critical`, `high`, `medium` or `low`. | Urgency is declared once, in the card, and the board sorts by it. | Picking what to do first without a meeting. | Convention: priority — ITIL's words. |
| **Prism Cell** *(token)* | The unit of membership and value in Numinia's economy. | A membership that is owned, not rented. | Taking part in the full economy at the highest gamification threshold. | Membership token · Prism Cell · Celda Prisma<br>In the game: see the game's glossary. |
| **Prisma** *(force)* | The force of refraction in the visual identity: it multiplies perspectives and gives the world a body. | It creates no truths; it lets each guild and faction show its own angle. | Choosing the look of a piece that shows the world, not the business. |  |
| **Privacy policy** *(legal text)* | The public text that tells people what personal data a site keeps, why, for how long and their rights. | It describes what is true, not what would be nice. | Changing what a site stores means changing this text too. | Convention: privacy policy — GDPR Art. 13; *policy* here is the sector's word, not the governance hierarchy's. |
| **Procedure** *(document)* | A normative document that says how an actor carries something out, step by step; its header says `type: procedure`. | A standard says what must be true; a procedure says how to get there. | Doing a task the same way whoever does it, person or agent. | Procedure · Procedure · Procedimiento<br>Also: protocol (until 2026-10-03).<br>Convention: procedure, "specified way to carry out an activity or a process" — ISO 9000:2015 3.4.5; in software a protocol is a rule of message exchange. The series `procedures/` took the word in cut 2 of `ADR-067`, the prefix `PRO-` kept. |
| **Profile** *(attribute)* | What a person has learnt and can do, the attribute they choose most freely. | Training is not role: an actor's diction is profile; tonight's character is role. | Describing what someone can do without fixing what they must do. |  |
| **Progressive identity** *(access model)* | An access model where each person enters where they can and raises their sovereignty when they choose. | Undoes the false choice between everyday web and Web3: they are steps on one path. | E-mail or social login to start, your own wallet when you are ready. |  |
| **Proposal** *(document)* | The document that offers a client a piece of work, its why, its method and its cost. | A proposal says four things: what the client can do afterwards, why us, how we teach and measure, and what it costs. | A record renders both the document and the page. | Convention: proposal — CRM vocabulary (Salesforce); `STD-040`. |
| **Public domain** *(legal status)* | The status of a work nobody holds rights over, free for anyone to use for anything. | CC0 is how we place our works there on purpose. | Using and selling the catalogue without asking. |  |
| **Publishing gate** *(check)* | The checks and signature required before an act that cannot be undone, such as making a repository public. | Two acts have no undo: writing to the permanent web and opening a private repository. | Confirming the work is ours, holds nothing of others and no personal data, then an Oracle signs. |  |
| **Pull request** *(proposal of change)* | A request to merge a branch into the main line, open to review before it lands. | Every change reaches the main line by one, reviewed; nobody merges their own. | Discussing a change on the change itself. | Also: PR. |

## Q

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Qualification** *(step)* | Deciding whether an opportunity fits what the house makes and is worth pursuing. | Most opportunities should be declined early, with a reason. | Spending time only on what can be won. |  |
| **Quest** *(unit of activity)* | A short piece of work or learning a person takes on, smaller than a mission. | Not every piece of work needs a mission card. | Giving newcomers a first, contained task. | In the game: see the game's glossary.<br>Convention: task — the business label, by W3C SKOS (`STD-030`); a dial word, kept. |

## R

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Rank** *(attribute)* | How far a person has come, read from what they have done; six, from Nomad to Oracle. | The only attribute the system assigns; nobody claims a rank. | Each rank holds every permission of those below it. | Seniority · Rank · Rango<br>Convention: seniority — the business label, by W3C SKOS (`STD-030`); a dial word, kept. |
| **Reference** *(kind of documentation)* | Documentation that describes a system as it is, for looking things up; the `system/` series is made of it. | A reference describes; it neither teaches nor obliges. | Finding how something is wired without reading a rule. | Convention: reference — Diátaxis. |
| **Register** *(document)* | A standard that fixes the values or terms other rules cite, without obliging anyone by itself. | A register is a lookup table; the rule that cites it is what binds. | Changing a value once, here, for every document that uses it. | Convention: register — ISO 19135-1:2015, a managed list of items with identifiers; kept, though ISO 15489 uses the word for the log that assigns identifiers. |
| **Report** *(document)* | The weekly, quarterly or annual account of the whole organisation, written for a board and the public. | It compares every figure with the period before and leads with what matters. | Governing from one page a week. | Report · Dispatch · Reporte<br>Convention: report — universal; ISO 15489-1:2016 for the record it is. |
| **Repository** *(store)* | A folder of files under version control, with its whole history. | The archive is a repository; each site is one too. | Copying the whole company memory with one command. |  |
| **Reserved** *(licence regime)* | The regime of a piece that grants no rights, declared as plainly as any licence. | What is kept is said out loud, so a missing licence never looks like an oversight. | A stranger never has to guess whether we forgot or meant it. |  |
| **Review** *(act)* | Someone other than the author reading a change before it is merged. | Nobody approves their own work. | Catching mistakes before they reach what is published. |  |
| **Ritual** *(event)* | A regular gathering of Numinia with a convener, what must exist before and what must remain after. | A meeting that leaves nothing written did not happen. | Holding the weekly council, creative sessions and onboardings the same way each time. | Meeting · Session · Ritual<br>Convention: meeting — the business label, by W3C SKOS (`STD-030`); a dial word, kept. |
| **Role** *(attribute)* | What appears when a person's knowledge meets a field in an act; it lasts while the act lasts. | Nobody has a role; a role is the part being played now. | Staffing work by need, not by job title. |  |
| **Roll-up** *(procedure)* | Turning closed records into one line of the week's, quarter's or year's report, then deleting them. | The archive does not grow; it rolls up. | Keeping only what changed a rule, a debt or an address. | Convention: roll-up — OLAP and reporting practice. |
| **Rule** *(requirement)* | A requirement of a standard, answered yes or no, with the check that verifies it; each carries a rule ID. | A rule nobody can check is a wish. | Knowing whether you comply without asking anyone. | Convention: requirement — ISO/IEC/IEEE 29148:2018 5.2.5; its code is a rule ID. |
| **Rule ID** *(code)* | The code of a rule: three letters and three digits, such as HDR-030, unique and never reused. | A finding names the rule it breaks, so it can be fixed without a conversation. | Citing, testing and tracing one requirement alone. | Also: plate (until 2026-10-03).<br>Convention: requirement identifier — ISO/IEC/IEEE 29148:2018 5.2.5; control ID (ISO/IEC 27001 Annex A, NIST SP 800-53); rule ID (ESLint, Semgrep). |
| **Ruling** *(decision)* | An Oracle's answer to a question an agent escalated, written so it can be caught when wrong. | A later ruling beats an earlier one. | An agent goes on with the answer in the record. |  |

## S

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Sale** *(kind of opportunity)* | A client buying what the house makes, from first sign to signed agreement. | A sale is won when the agreement is signed and the value reaches the ledger. | Following one playbook from lead to won or lost. |  |
| **Sales collateral** *(set of pieces)* | What each stage of a sale hands to the other side: a deck, an e-mail, a sheet, a proposal. | Each piece is made from the record and the offer, never from memory. | The sales kit renders it and says what is missing. |  |
| **Seal** *(badge)* | A verifiable mark of something a person achieved, that they keep and carry. | A seal is a fact about you, not a sticker the platform lends. | Proving what you did in any place that reads seals. | Badge · Achievement · Sello<br>In the game: see the game's glossary.<br>Convention: badge — the business label, by W3C SKOS (`STD-030`); a dial word, kept. |
| **Secret** *(credential)* | A password, key or token that gives access and must never be written into the archive. | Programs read secrets where they run; a leaked key is changed before the leak is written down. | A public archive with nothing in it that opens a door. |  |
| **Section** *(field)* | The header field naming which of the ten sections of the company a document belongs to. | A document is placed in the company, not in a territory. | Reading the archive by section from the front door. | Convention: company section — a business label; ISO/IEC Directives use *section* and *clause* for the parts of a document, which the archive cites as `DOC-NNN §X`. |
| **Security audit** *(procedure)* | Measuring the distance between what the documentation claims about access and secrets and what exists. | An audit says how many things it examined, out of how many. | Finding gaps before someone else does. |  |
| **Seed of knowledge** *(unit of activity)* | The smallest unit of learning in Numinia: one idea, ready to grow. | Learning starts small and is counted. | Building courses and adventures from small pieces. | In the game: see the game's glossary. |
| **Seminal** | See *Principle*: its `type` value until 2026-10-03; `principle` since. | | | |
| **Series** *(folder)* | A folder of the archive that holds one kind of document, numbered under one prefix. | A folder is a series only if losing it would break a named function. | Knowing how a document is numbered, what a change costs and which template it copies. | Convention: series — ISO 15489-1:2016 (which also says *aggregation*) and ISAD(G). |
| **Shelf** *(reading group)* | A group of standards on the `/standards` page, named for what they are for. | A shelf is a way to read; the series is the way to file. | Finding the standards about one concern together. | Convention: none in the industry; house word. |
| **SPDX** *(notice)* | The short standard notice in each file naming its copyright holder and its licence. | The licence travels inside the file, not only in a list somewhere. | A tool checks every file's terms in seconds. | Also: REUSE, for the specification that checks them. |
| **Stage** *(state)* | Where an opportunity stands, from found to won or lost, set by the evidence in its record. | A stage is computed from the timeline, never typed. | Knowing the next step and the procedure that takes it. | Also: lead, for a sale's first stage.<br>Convention: stage — CRM vocabulary (Salesforce); the first of a sale is *lead*. |
| **Staircase** *(model)* | The path by which a person enters without a key of their own and adds one when they choose. | Entering never asks for a wallet; holding one is a step, not a toll. | Anyone can arrive, and anyone can leave with what is theirs. |  |
| **Standard** *(document)* | A normative document that says what an artefact must satisfy, each requirement answered yes or no; its header says `type: standard`. | A standard obliges things, not people; a procedure obliges actors. | Checking a site, a document or an invoice against a list. | Convention: normative document, standard — ISO/IEC Guide 2:2004 3.2; `type: standard` since 2026-10-03. |
| **Status** *(field)* | The header field saying where a document stands in its lifecycle: `draft`, `active`, `withdrawn`; for a mission, its board states. | Replaced is a relation, not a status; an heir is named in `superseded_by`. | Reading whether a document binds, and whether it is still alive. | Convention: lifecycle state — the ISO stage codes; document control; RFC 2026's *Obsoletes* for the heir as a relation. |
| **Stop** | See *Narrative dial*. | | | |
| **Structure** *(plane)* | How the elements of an organisation relate: how information flows, how decisions are taken. | Real change happens here; renaming the elements changes nothing. | Telling a new experience from a new way of working. |  |
| **Summa** *(name)* | The archive under its Numinia name: the sum of what the house knows. | Summa and archive are the same thing at different narrative levels. | Reading Numinia texts that call the archive by this name. | Convention: knowledge base — the business label, by W3C SKOS (`STD-030`); a dial word, kept. |
| **Superseded by** *(relation)* | The header field naming the document that replaced this one, written `superseded_by`. | An heir is a link, never a status, so it cannot drift. | Following a withdrawn document to its answer. | Convention: `dcterms:isReplacedBy` — DCMI Metadata Terms; RFC 2026's *Obsoletes*. |
| **Supplier** *(party)* | A company the house pays for a service, with what it holds of ours and what it costs. | A supplier that holds personal data is also a data processor. | One card per supplier, year by year. |  |
| **System** *(folder)* | The series `system/`: how the machine is wired, as reference documentation. | What runs is described where it can be checked, not promised. | Finding the commands that prove a description still true. | Convention: system — generic, and not wrong. |
| **Systems thinking** *(approach)* | Seeing things as parts that affect each other in loops, where structure explains behaviour. | Look for causes in relations, not culprits: a repeated failure is a structure. | Each document says what it observes, what it regulates and what it is coupled to. |  |

## T

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Telemetry** *(set of figures)* | The figures the repository states about itself, measured by the tooling and never typed. | A figure typed from memory is a claim; a measured one is evidence. | Reading the archive's size, cost and health from one dataset. | Convention: metrics, measurements — the industry's words for figures over a repository; *telemetry* (OpenTelemetry) is the remote measurement of running systems; kept. |
| **Template** *(file)* | The file a new document of a series is copied from, one per series, in `machine/templates/`. | A template is normative for its shape, and a document born from it must pass every check unedited. | Starting a document right, with its header and sections in place. | Also: mould (until 2026-10-03).<br>Convention: template — universal. |
| **Tender** *(kind of opportunity)* | A public buyer's call for offers, answered by a filed bid under the buyer's terms. | Each answer is backed by a clause of the buyer's terms, not by our reading of them. | Screening a tender in a day: bid, possible or decline. |  |
| **Terms and conditions** *(legal text)* | The contract between a site and whoever uses or buys from it. | The rules of the deal are written before anyone pays. | Selling with terms the buyer could read first. | Convention: terms and conditions — the sector's word; Consumer Rights Directive 2011/83/EU. |
| **Timeline** *(part of a record)* | The lines of an opportunity's record, one per thing that happened, in order. | The record's state is read from its timeline, never typed by hand. | Anyone can see what happened and why the record is where it is. |  |
| **Tooling** *(set of programs)* | The programs that read, verify, measure and template the archive: the checks, the tools, the scripts. | The tooling is not the archive; it reads it and binds nobody. | Running a check or a measurement, by hand or in CI. | Also: instruments (until 2026-10-03).<br>Convention: tooling — continuous-integration practice. |
| **Trademark** *(legal right)* | A registered right over a name or mark that stops others trading under it. | The name is never opened, even when everything else is. | Remixing our world freely without using our name as yours. |  |
| **Type** *(field)* | The header field naming a document's genre: `standard`, `procedure`, `adr`, `mission`, `report`, `blueprint`, `principle`, `legal`, `agent`, `entity`, `opportunity`, `proposal`, `documentation`, `meta`. | A genre has a folder; a document of a strict genre filed elsewhere is an error. | Finding every document of one kind. | Convention: `dcterms:type` — DCMI Metadata Terms; the values match their folders. |

## U

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Umbral** *(force)* | The force of manifestation in the visual identity: the base system of sites, documents, invoices and interface. | It is the border anyone can cross, and the force that invoices. | Every business piece is built in it, recognisable to whoever arrives from outside. | In the game: the Threshold; see the game's glossary. |

## V

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **VAT** *(tax)* | The value added tax charged on sales and paid on purchases. | A price shown to a buyer includes it; a price in the books is shown without it. | Quarterly returns from the same ledger lines. |  |
| **Veil** *(force)* | The force of depth in the visual identity: the atmosphere seen behind archive and viewers. | The Veil adds no new colour, only transparency. | Discovery surfaces that show how knowledge settles, in layers. | In the game: the city's symbolic skin; see the game's glossary. |
| **Version** *(number)* | Three numbers, major, minor and patch, that say what changed in a document. | Breaking raises the first, offering more the middle, rewording the last. | Knowing whether a change affects what you built on it. | Convention: Semantic Versioning 2.0.0. |
| **View** *(page)* | A page that composes what the archive states and states nothing of its own. | Change the document and the view changes; the view has no second copy. | Reading a board, a pipeline or a map that is always current. | Convention: view — the derived, read-only presentation of databases and MVC. |
| **Virtual reality** *(technology)* | Technology that fully replaces what you see and hear with a digital world, usually through a headset. | The immersive end of the spectrum: total presence. | The horizon: Numinia's worlds visited with a headset, not only a screen. | Also: VR. |
| **Virtual world** *(space)* | A shared digital place people enter as avatars to meet, play or work. | A world is a place, not a web page; people are present in it. | Hosting events and sessions in worlds of our own or of others. |  |
| **Visibility** *(field)* | The header field saying who may read a document: `public` or `restricted-oracle`. | What the public archive hides is declared, not implied. | Keeping a record out of the public site by one line. | Convention: visibility — GitLab and GitHub usage; `dcterms:accessRights`. |
| **Visual identity** *(system)* | How the house looks: one foundation that speaks through three forces, the Umbral, the Veil and the Prisma. | Each piece declares its force before its medium. | Recognising the house in a website, an invoice or a world. |  |
| **VRM** *(format)* | An open format for humanoid 3D avatars: one file with the model, its bones and its usage permissions. | Interoperability made format: one avatar for every world is engineering, not promise. | The format of Numinia's avatars, which any compatible world accepts. |  |

## W

| Term | What it is | What it clears up | What it enables here | At the three levels · also |
|---|---|---|---|---|
| **Wallet** *(key ring)* | A person's cryptographic key pair, used to sign, prove identity and hold what is theirs. | An account is granted and revoked by a service; a wallet stays yours if the service goes. | Proving you hold an address is all the platform asks to recognise you. |  |
| **Watch** *(procedure)* | The sweep of the places where opportunities are published, ending in an Oracle's yes or no. | Nothing found enters the archive until an Oracle accepts it. | Never missing a call, never filling the archive with noise. |  |
| **Web3** *(layer of the internet)* | The layer of the internet where ownership and identity are proven by cryptography on open networks. | Using a service versus owning something inside it, the distinction that structures Numinia. | A good or a rank that is truly yours: portable, verifiable, not confiscable. | Also: the ownership internet. |
| **Withdrawn** *(status)* | The status of a document no longer in force; the one terminal state. | Whether an heir exists is said by `superseded_by`, present or absent, never by a second state. | Reading a document knowing it binds nobody any more. | Convention: withdrawn — the ISO stage for a standard; `dcterms:isReplacedBy` for its heir. |

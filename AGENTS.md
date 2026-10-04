<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
Multi-platform agent context. Supplied by the Oracle 2026-08-28.
CLAUDE.md is the Claude Code runtime adapter; this file is the platform-
neutral layer every runtime reads. Hermes reads both
(agent/coding_context.py: _CONTEXT_FILES).
-->

# numinia-archive — agent context

**First instruction: audit the current branch state before assuming
anything.** Never trust that the repository matches this file, a README or a
mission brief — read what is actually there first.
(This is the `AGT-001` row of `STD-015`, the engineering register.)

This file is the platform-neutral layer every runtime reads. `CLAUDE.md` is
the Claude Code adapter and points here; it does not restate these rules.

<!-- transition-regime:begin — numinia.org/binding publishes what is between
     these markers, verbatim. The text is the Oracle's; the markers are a
     contract with web/src/lib/binding.ts, which throws if they go missing
     rather than serving an empty page under the title "what binds today".
     Edit freely between them; do not remove them. -->

## What binds today — read this before any other rule

Oracle instruction, 2026-09-18. The system is being cut down from the MVP
to the alpha, so almost every rule document here is `status: draft`. A
draft is on trial: follow it, and note what does not fit. Its check warns and
never blocks; any change to it is analysed, then its owner decides.
Every procedure in this archive is `status: draft`, save those named in force
below.

In force: `PRO-023` (bringing a rule into force, since 2026-09-27): no
rule leaves draft without its steps, and the Oracle sees each activation
before the branch. And the standards whose header says `active`:
`STD-001` the series ·
`STD-004` the header every document opens with ·
`STD-005` when a rule bites ·
`STD-007` one page per document ·
`STD-010` licensing ·
`STD-012` the corpus does not grow ·
`STD-018` one document, one identifier ·
`STD-019` versions ·
`STD-020` git is the archive ·
`STD-021` evidence and citation ·
`STD-022` secrets ·
`STD-023` the design values ·
`STD-024` a series is a function ·
`STD-026` the operative vocabulary ·
`STD-027` the archive is classified by function ·
`STD-028` one document, one address ·
`STD-030` the world's vocabulary.

Nothing else in `principles/`, `standards/` or `procedures/` binds you. A test
(`machine/scripts/test/door-resolves.test.mjs`) fails if this list and the
headers disagree, so a promotion out of draft shows up here or CI goes red.

What still holds, because each rule protects something that can be seen:

- one pull request per repository per cut; never self-merge, force-push,
  delete a branch, rewrite a pushed commit, or change licences,
  visibility or secrets;
- CI green: checks, tests, the web build, and telemetry regenerated in
  the last commit (`node machine/scripts/telemetry.mjs`) — the check is
  mechanical, not ceremony;
- every pull request that changes a site adds its `/updates` entry and
  raises the version (`machine/scripts/check-version-bump.mjs`);
- a `CHANGELOG.md` entry for what changed in this archive;
- the test before the code: for a feature, a fix or a refactor, the test
  that describes the change is written first, run, and seen to fail for the
  right reason; then the code that makes it pass; then the clean-up with
  everything green. The pull request shows that order — a `test(...)`
  commit before the `feat`/`fix` commit — because a diff cannot tell when a
  test was written and the history can. Behaviour that already exists and
  has no test gets one when it is touched; a bug gets the test that
  reproduces it before the fix. Read at review; it fails no build while the
  register is draft;
- the reserved files (the legal texts in `legal/`, sales in `operations/`)
  and the brand mark stay reserved; changes to the principles are said to the operator
  in chat before the branch exists — his answer there is the consensus, no
  further ceremony.

What the draft procedures describe and you do NOT do while they are draft:
open a mission card for a task the operator asked for in chat (the chat is
the briefing, the pull request is the record); write a decision record to
set or reverse what the operator stated in chat (the reversal goes in the
`CHANGELOG.md` entry and the commit body); classify the task or cite
practice codes in commits; score your context load or keep a session log;
stop a second time before pushing — the operator's go on a plan covers
commits, push and the pull request.

Promotion out of draft is the act that restores each rule; nothing
restores them by default.

<!-- transition-regime:end -->


## Commands

Run from the repository root; Node ≥ 22.12.

- `npm run checks -- --rules` — every registered check over the corpus
- `npm test` — the check, script and tool test suites, with coverage
- `node machine/scripts/telemetry.mjs` — regenerate `machine/telemetry/`
  in the last commit of a cut. It needs the tokenizer rank file: without
  it every token figure is silently written as `null`. Fetch it first with
  `node machine/scripts/telemetry.mjs --fetch-tokenizer`.
- `node machine/tools/check-register.mjs --check` — the STD-015 register
  against the tree

Inside `web/` (the Astro viewer serving numinia.org):

- `npm run dev` · `npm run build` · `npm run type-check` · `npm run check:responsive`

CI runs the checks, the tests, the web build, then the build-time ratchets.

## Repository map

- `agents/` — canonical agent definitions, one folder each. `agents/INDEX.md`
  owns the roster and the folder contract; read it there rather than here.
- `principles/` — the world and the governing principles; the rule index below lists them.
- `lore/` — the game: RPG manual, adventures, world texts, codex. Each file declares its own licence.
- `standards/` — this archive's operative standards; the rule index below lists them.
- `procedures/` — how a recurring task is carried out: session close, briefing, archiving.
- `missions/` — the unit of work; `machine/templates/MIS-TEMPLATE.md` is the contract.
- `decisions/` — ADRs · `debt/` — what is known to be wrong · `reports/` — audits.
- `operations/` — business records, one flat `OPS-` series (`OPS-007` is
  reserved — it says so in its own SPDX comment).
- `legal/` — the legal texts the public sites are bound by, one `LEG-` series;
  every one is reserved and says so in its own SPDX comment.
- `opportunities/` — every opportunity — a sale, a tender, a grant, a
  collaboration, a partner — one public record each
  (`OPP-YYYY-NNN.md`, its proposals beside it); nobody's name in them, the
  organisation by sector until it agrees. `machine/packages/sales-kit/` holds
  the tool that reads them.
- `objects/` — entity cards: one Markdown per registered thing that is not a
  document (an avatar, a model). The bytes live in the depot.
- `system/` — reference manuals of how the system works today.
- `designs/` — architecture documents · `web/` — the Astro viewer ·
  `machine/` — checks, scripts, tools and telemetry.

The folders above are all there is. Do not infer a directory's purpose from
its name when its function is not documented.

## The rules that govern work here

`standards/`, `procedures/` and `principles/` hold the rule documents. Each opens
with a `**Binds:**` line saying whom it governs. Read that line before
opening the document.

Documents are written in the business's words — the ones an operations
lead, a CTO or a CFO already uses. Numinia's words (guilds, ranks, the
Oracle) enrich that text on the site; they are not its source. Where a
document needs an in-world name, `STD-030` gives the business's word first
(the Oracle, 2026-09-29).

Two that decide the rest: `STD-009` says which rule wins when two conflict;
`STD-017` says who may change what. Licensing is `STD-010`: what we emit, what
we may consume, and what needs the Oracle before it ships — read it before
adding a dependency, changing a LICENSE or making anything public.

<!-- rule-index:begin — generated by machine/tools/rule-index.mjs; do not edit by hand -->

| Rule | What it rules | State | Binds |
|---|---|---|---|
| `PRI-001` | You are already in the game | draft | every document, artefact and agent that speaks in Numinia's name |
| `PRI-002` | We build a game to work better | draft | every piece of work that speaks, looks or behaves in Numinia's name |
| `PRI-004` | You are what you are doing | draft | whoever describes, classifies or registers a person, a role or a piece of work in Numinia |
| `PRI-005` | Opening is an act | draft | every Numen Games repository, and whoever publishes from one |
| `PRI-006` | The model needs a story | draft | whoever reasons about how Numen Games, its model and Numinia relate |
| `PRI-007` | Renaming is not transforming | draft | whoever designs, renames or reorganises anything in this system |
| `PRI-008` | One identity, three forces | draft | every piece that carries the Numen Games or Numinia mark |
| `PRI-009` | The archive is the organisation | draft | every document of this archive, every change to it, and whoever — human or digital… |
| `PRI-010` | Leave things better than you found them | draft | whoever acts in Numinia's name, human or digital |
| `PRI-011` | What has value also makes a bond | draft | whoever sets a price, takes a payment or keeps the account in Numinia's name, human or digital |
| `PRI-012` | What is yours stays with you | draft | whoever builds, runs or changes anything that holds something of a person's in Numinia's name… |
| `PRI-013` | A magician who keeps hope, with humans in… | draft | every piece of work that speaks, looks or behaves in Numinia's name |
| `PRI-014` | Friends who play, build and learn | draft | every piece that tells where Numinia comes from |
| `PRI-015` | We recognise the act; we never buy the game | draft | whoever designs, grants or audits a reward, a rank, a title or a recognition in Numinia's name |
| `PRO-001` | Opening and closing a session | draft | every agent, in every session, whatever the mission |
| `PRO-003` | Running a mission | draft | any agent assigned a mission, and the Oracle who opens, reviews and closes it |
| `PRO-005` | Escalating to the Oracle | draft | any agent facing a decision it may not, or cannot, take alone |
| `PRO-008` | Requesting approval, issuing rulings | draft | any agent requesting approval; any Oracle issuing a ruling; any agent executing one |
| `PRO-011` | Auditing identity, authorization and secrets | draft | any agent running a security audit over a Numinia scope, and the report it files |
| `PRO-013` | Handing a check to CI | draft | any agent that writes a check script, and the Oracle who wires it |
| `PRO-014` | Producing a design piece | draft | any agent producing a design piece in any medium |
| `PRO-015` | Joining Numinia | draft | whoever brings a person into Numinia to work, paid or not |
| `PRO-016` | Applying the engineering standard | draft | any agent executing a task in a repository that carries `STD-005` |
| `PRO-017` | Rolling up the week | draft | any agent executing a weekly, quarterly or annual roll-up |
| `PRO-018` | Publishing a repository | draft | any agent preparing a visibility change or a permanent publication of a Numen Games repository… |
| `PRO-019` | Holding a ritual | draft | whoever convokes, prepares or records a ritual of Numinia |
| `PRO-020` | Putting something on sale | draft | whoever prepares, approves, creates or withdraws something on sale in Numinia's or Numen Games'… |
| `PRO-021` | Closing the month | draft | whoever brings the month's documents, turns them into ledger lines, or reviews the close |
| `PRO-022` | Building the living pieces | draft | whoever builds, changes or reviews the sky… |
| `PRO-023` | Bringing a rule into force | in force | whoever proposes, prepares or approves a document leaving draft |
| `PRO-024` | Leaving Numinia | draft | whoever lets a person go from Numinia, whoever is leaving, and whoever takes over their work |
| `PRO-025` | Handling a personal data breach | draft | whoever learns of a possible breach of personal data we hold… |
| `PRO-026` | Answering a person's request about their data | draft | whoever receives or answers a request from a person about the data we hold on them |
| `PRO-027` | Changing what a site stores or loads | draft | whoever changes a site so that it stores, loads or sends something it did not before… |
| `PRO-028` | Qualifying an opportunity | draft | whoever hears of a chance to sell, collaborate or partner in Numen Games' or Numinia's name… |
| `PRO-029` | Making a proposal | draft | whoever analyses a need, writes, reviews or approves a proposal in Numen Games' or Numinia's… |
| `PRO-030` | Closing a sale | draft | whoever follows up, negotiates, signs or hands over a sale in Numen Games' or Numinia's name |
| `PRO-031` | Bidding for a tender | draft | whoever reads, decides on or files a tender in Numen Games' name |
| `PRO-032` | Applying for a grant | draft | whoever finds, reads, decides on, applies for or justifies a grant, a public loan… |
| `PRO-033` | Screening a tender | draft | whoever judges, in Numen Games' name, whether a tender is worth bidding for — person or agent… |
| `PRO-034` | Auditing a site's code | draft | any agent auditing the code of a Numen Games or Numinia site, and the report it files |
| `PRO-035` | Watching for opportunities | draft | whoever keeps a watch for Numen Games — person, agent or program, on any machine |
| `PRO-036` | Handling a security weakness | draft | whoever learns of a weakness in a repository or a site of ours… |
| `STD-001` | The series | in force | every tracked document of the archive |
| `STD-003` | Platform ranks | draft | the Numinia digital-goods platform — authentication, character sheets, creator panel… |
| `STD-004` | The header | in force | every document's header, and every date the archive writes |
| `STD-005` | When a rule bites | in force | this repository and every workspace born from it; personal repositories SHOULD follow |
| `STD-006` | Plain text is sovereign | draft | every document; everything that stores, serves, builds or reads it… |
| `STD-007` | One page per document | in force | every document on every shelf of the archive |
| `STD-008` | Design tokens | draft | every public surface of Numen Games and Numinia, and every consumer of the kit |
| `STD-009` | Which rule wins | draft | every registered document of the archive, and everyone who reads one |
| `STD-010` | Licensing | in force | every repository of Numen Games and Numinia |
| `STD-012` | The corpus does not grow | in force | every document that leaves the archive or its series; roll-ups bind records only |
| `STD-014` | Publishing gates | draft | every permanent publication, and every Numen Games repository turned public |
| `STD-015` | Engineering checks | draft | register — scope belongs to the standard that cites it |
| `STD-017` | Who may change what | draft | every change to a registered document |
| `STD-018` | One document, one identifier | in force | every registered document of the archive |
| `STD-019` | Versions | in force | every registered document, and everything else the archive versions |
| `STD-020` | Git is the archive | in force | every commit to this repository |
| `STD-021` | Evidence and citation | in force | every document that cites, claims something about the code, or quotes a person |
| `STD-022` | Secrets | in force | every file in this repository, and every report about it |
| `STD-023` | Design values | in force | register — scope belongs to the standard that cites it |
| `STD-024` | A series is a function | in force | every folder of the archive and every document in one |
| `STD-025` | A mission is a card | draft | every mission, and whoever sets a field on one |
| `STD-026` | Operative vocabulary | in force | register — scope belongs to the standard that cites it |
| `STD-027` | The archive is classified by function | in force | every folder of the repository |
| `STD-028` | One document, one address | in force | every web address the public site gives a document of the archive |
| `STD-029` | How we treat each other in the commons | draft | everyone in a Numinia community space: citizens, moderators, Oracles and digital agents alike |
| `STD-030` | The world's vocabulary | in force | register — scope belongs to the standard that cites it |
| `STD-031` | A principle states | draft | every document in the principles |
| `STD-033` | Every charge delivers something | draft | every site of ours that takes a payment, and every record of something on sale |
| `STD-034` | Accessibility | draft | every public page of every Numen Games and Numinia site |
| `STD-035` | Personal data | draft | everything of ours that collects or keeps data about a person |
| `STD-036` | One account | draft | the ledger of what Numen Games and Numinia cost and take in, and every view published from it |
| `STD-037` | What every site carries | draft | every public site of Numen Games and Numinia: numinia.org, numinia.com… |
| `STD-038` | The stages of an opportunity | draft | register — scope belongs to the standard that cites it |
| `STD-039` | An opportunity has a record | draft | every record of an opportunity kept in Numen Games' or Numinia's name — a sale, a tender… |
| `STD-040` | A proposal says four things | draft | every proposal for a service that Numen Games sends to an organisation, and whoever writes… |
| `STD-041` | The levels of automation | draft | register — scope belongs to the standard that cites it |
| `STD-042` | What an agent may do without asking | draft | register — scope belongs to the standard that cites it |
| `STD-043` | A report speaks to the board | draft | every roll-up report of a week, a quarter or a year |
| `STD-044` | Every purchase ends in thanks | draft | every payment link or checkout of ours, and the page it returns to |
| `STD-047` | The sales collateral | draft | register — scope belongs to the standard that cites it |

83 rule documents, of which 18 are in force; a `draft` is on trial until promoted: followed, warns, never blocks; 8 are registers and take their scope from the standard that cites them; every other document names whom it binds.
<!-- rule-index:end -->

## Canonical changes

Agents may propose changes to agent identity, governance and authoritative
rules; they do not assume authority to redefine themselves or their
governance. `principles/**` requires the operator's answer in chat before the
branch exists. Git is the archive: a retired document is deleted, not kept
as a copy (`ADR-041`).

Runtime memory is provisional and is never synchronised into an agent's
canonical `MEMORY.md` automatically; promotion is deliberate and reviewed.

## Specialist routing

When specialist judgment is required, prefer the persistent specialist over
fabricating expertise. The roster, what routes to each agent and how to
instantiate one live in `agents/INDEX.md` — it is the source the site itself
reads, so it does not get a second copy here.

Routing does not transfer authority outside the specialist's domain.

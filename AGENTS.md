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
before the branch. `PRO-003` (running a mission) and `PRO-005` (escalating
to the Oracle), since 2026-10-15: a task starts from a mission card, and an
escalation names its mission. The procedures of selling, since 2026-10-15 —
`PRO-028` (qualifying an opportunity), `PRO-029` (making a proposal),
`PRO-030` (closing a sale), `PRO-031` (bidding for a tender), `PRO-032`
(applying for a grant), `PRO-033` (screening a tender) and `PRO-035`
(watching for opportunities): an opportunity's record moves only by their
steps. `PRO-015` (joining Numinia) and `PRO-024` (leaving Numinia), since
2026-10-15: nobody starts before the agreement is signed, and nobody is
gone before their access list is closed. And the principles and standards whose header says
`active`:
`PRI-001` you are already in the game ·
`PRI-002` we build a game to work better ·
`PRI-004` you are what you are doing ·
`PRI-005` opening is an act ·
`PRI-008` one identity, three forces ·
`PRI-009` the archive is the organisation ·
`PRI-010` leave things better than you found them ·
`PRI-011` what has value also makes a bond ·
`PRI-012` what is yours stays with you ·
`PRI-013` a magician who keeps hope, with humans in charge ·
`PRI-015` we recognise the act; we never buy the game ·
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
`STD-030` the world's vocabulary ·
`STD-031` a principle states ·
`STD-038` the stages of an opportunity ·
`STD-039` an opportunity has a record ·
`STD-054` a client is named by consent ·
`STD-055` only a call that passes is recorded.

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
write a decision record to set or reverse what the operator stated in chat
(the reversal goes in the `CHANGELOG.md` entry and the commit body);
classify the task or cite practice codes in commits; score your context load or keep a session log;
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

- `agents/` — canonical agent definitions; `agents/INDEX.md` owns the roster and the folder contract.
- `principles/` · `standards/` · `procedures/` — the rule documents; the rule index below lists them.
- `lore/` — the game (manual, adventures, world texts, codex); each file declares its own licence.
- `missions/` — the unit of work (`machine/templates/MIS-TEMPLATE.md` is the contract).
- `decisions/` ADRs · `debt/` known faults · `reports/` audits · `system/` how the system works today · `designs/` architecture.
- `operations/` — business records, flat `OPS-` series (`OPS-007` reserved).
- `legal/` — the legal texts the sites are bound by, `LEG-` series; all reserved.
- `opportunities/` — one public record per opportunity (`OPP-YYYY-NNN.md`), nobody's name in them.
  `stakeholders/` — one card per outside party. `objects/` — one card per registered non-document thing.
- `web/` — the Astro viewer · `machine/` — checks, scripts, tools, telemetry.

These folders are all there is. Do not infer a directory's purpose from its name when it is not documented.

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
| `PRI-001` | You are already in the game | in force | every document, artefact and agent that… |
| `PRI-002` | We build a game to work better | in force | every piece of work that speaks, looks… |
| `PRI-004` | You are what you are doing | in force | whoever describes, classifies or… |
| `PRI-005` | Opening is an act | in force | every Numen Games repository, and… |
| `PRI-006` | The model needs a story | draft | whoever reasons about how Numen Games,… |
| `PRI-007` | Renaming is not transforming | draft | whoever designs, renames or reorganises… |
| `PRI-008` | One identity, three forces | in force | every piece that carries the Numen… |
| `PRI-009` | The archive is the organisation | in force | every document of this archive, every… |
| `PRI-010` | Leave things better than you found them | in force | whoever acts in Numinia's name, human… |
| `PRI-011` | What has value also makes a bond | in force | whoever sets a price, takes a payment… |
| `PRI-012` | What is yours stays with you | in force | whoever builds, runs or changes… |
| `PRI-013` | A magician who keeps hope, with humans in… | in force | every piece of work that speaks, looks… |
| `PRI-015` | We recognise the act; we never buy the game | in force | whoever designs, grants or audits a… |
| `PRO-001` | Opening and closing a session | draft | every agent, in every session, whatever… |
| `PRO-003` | Running a mission | in force | any agent assigned a mission, and the… |
| `PRO-005` | Escalating to the Oracle | in force | any agent facing a decision it may not,… |
| `PRO-008` | Requesting approval, issuing rulings | draft | any agent requesting approval; any… |
| `PRO-011` | Auditing identity, authorization and secrets | draft | any agent running a security audit over… |
| `PRO-013` | Handing a check to CI | draft | any agent that writes a check script,… |
| `PRO-014` | Producing a design piece | draft | any agent producing a design piece in… |
| `PRO-015` | Joining Numinia | in force | whoever brings a person into Numinia to… |
| `PRO-016` | Applying the engineering standard | draft | any agent executing a task in a… |
| `PRO-017` | Rolling up the week | draft | any agent executing a weekly, quarterly… |
| `PRO-018` | Publishing a repository | draft | any agent preparing a visibility change… |
| `PRO-019` | Holding a ritual | draft | whoever convokes, prepares or records a… |
| `PRO-020` | Putting something on sale | draft | whoever prepares, approves, creates or… |
| `PRO-021` | Closing the month | draft | whoever brings the month's documents,… |
| `PRO-022` | Building the living pieces | draft | whoever builds, changes or reviews the… |
| `PRO-023` | Bringing a rule into force | in force | whoever proposes, prepares or approves… |
| `PRO-024` | Leaving Numinia | in force | whoever lets a person go from Numinia,… |
| `PRO-025` | Handling a personal data breach | draft | whoever learns of a possible breach of… |
| `PRO-026` | Answering a person's request about their data | draft | whoever receives or answers a request… |
| `PRO-027` | Changing what a site stores or loads | draft | whoever changes a site so that it… |
| `PRO-028` | Qualifying an opportunity | in force | whoever hears of a chance to sell,… |
| `PRO-029` | Making a proposal | in force | whoever analyses a need, writes,… |
| `PRO-030` | Closing a sale | in force | whoever follows up, negotiates, signs… |
| `PRO-031` | Bidding for a tender | in force | whoever reads, decides on or files a… |
| `PRO-032` | Applying for a grant | in force | whoever finds, reads, decides on,… |
| `PRO-033` | Screening a tender | in force | whoever judges, in Numen Games' name,… |
| `PRO-034` | Auditing a site's code | draft | any agent auditing the code of a Numen… |
| `PRO-035` | Watching for opportunities | in force | whoever keeps a watch for Numen Games —… |
| `PRO-036` | Handling a security weakness | draft | whoever learns of a weakness in a… |
| `PRO-037` | Placing an agent in a 3D world | draft | whoever places an agent in a world of… |
| `PRO-038` | Choosing the brain that agents in worlds… | draft | the Oracle who holds the brain's key.… |
| `PRO-039` | Opening the brain to the worlds | draft | the Oracle who holds the brain's key… |
| `PRO-040` | Configuring an agent from the platform | draft | whoever manages a community's agents,… |
| `STD-001` | The series | in force | every tracked document of the archive |
| `STD-003` | Platform ranks | draft | the Numinia digital-goods platform —… |
| `STD-004` | The header | in force | every document's header, and every date… |
| `STD-005` | When a rule bites | in force | this repository and every workspace… |
| `STD-006` | Plain text is sovereign | draft | every document; everything that stores,… |
| `STD-007` | One page per document | in force | every document on every shelf of the… |
| `STD-008` | Design tokens | draft | every public surface of Numen Games and… |
| `STD-009` | Which rule wins | draft | every registered document of the… |
| `STD-010` | Licensing | in force | every repository of Numen Games and… |
| `STD-012` | The corpus does not grow | in force | every document that leaves the archive… |
| `STD-014` | Publishing gates | draft | every permanent publication, and every… |
| `STD-015` | Engineering checks | draft | register — scope belongs to the standard that cites it |
| `STD-017` | Who may change what | draft | every change to a registered document |
| `STD-018` | One document, one identifier | in force | every registered document of the archive |
| `STD-019` | Versions | in force | every registered document, and… |
| `STD-020` | Git is the archive | in force | every commit to this repository |
| `STD-021` | Evidence and citation | in force | every document that cites, claims… |
| `STD-022` | Secrets | in force | every file in this repository, and… |
| `STD-023` | Design values | in force | register — scope belongs to the standard that cites it |
| `STD-024` | A series is a function | in force | every folder of the archive and every… |
| `STD-025` | A mission is a card | draft | every mission, and whoever sets a field… |
| `STD-026` | Operative vocabulary | in force | register — scope belongs to the standard that cites it |
| `STD-027` | The archive is classified by function | in force | every folder of the repository |
| `STD-028` | One document, one address | in force | every web address the public site gives… |
| `STD-029` | How we treat each other in the commons | draft | everyone in a Numinia community space:… |
| `STD-030` | The world's vocabulary | in force | register — scope belongs to the standard that cites it |
| `STD-031` | A principle states | in force | every document in the principles |
| `STD-033` | Every charge delivers something | draft | every site of ours that takes a… |
| `STD-034` | Accessibility | draft | every public page of every Numen Games… |
| `STD-035` | Personal data | draft | everything of ours that collects or… |
| `STD-036` | One account | draft | the ledger of what Numen Games and… |
| `STD-037` | What every site carries | draft | every public site of Numen Games and… |
| `STD-038` | The stages of an opportunity | in force | register — scope belongs to the standard that cites it |
| `STD-039` | An opportunity has a record | in force | every record of an opportunity kept in… |
| `STD-040` | A proposal says four things | draft | every proposal for a service that Numen… |
| `STD-041` | The levels of automation | draft | register — scope belongs to the standard that cites it |
| `STD-042` | What an agent may do without asking | draft | register — scope belongs to the standard that cites it |
| `STD-043` | A report speaks to the board | draft | every roll-up report of a week, a… |
| `STD-044` | Every purchase ends in thanks | draft | every payment link or checkout of ours,… |
| `STD-047` | The sales collateral | draft | register — scope belongs to the standard that cites it |
| `STD-048` | Reaching someone who did not ask | draft | every first contact made in Numen… |
| `STD-049` | The doors, by country | draft | register — scope belongs to the standard that cites it |
| `STD-050` | What an agent in a world reads, and what it… | draft | every agent placed in a world of ours… |
| `STD-051` | Organisation roles | draft | numinia.com's organisations — their… |
| `STD-052` | Organisation permissions | draft | register — scope belongs to the standard that cites it |
| `STD-053` | Presence | draft | numinia.com's status menu, its lists of… |
| `STD-054` | A client is named by consent | in force | every record of an opportunity kept in… |
| `STD-055` | Only a call that passes is recorded | in force | every tender and every grant recorded… |

94 rule documents, of which 45 are in force; a `draft` is on trial until promoted: followed, warns, never blocks; 10 are registers and take their scope from the standard that cites them; every other document names whom it binds.
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

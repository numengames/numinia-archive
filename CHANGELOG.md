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

### 2026-10-20
- **Changed** `PRO-019` 0.3.0: a new step 5, "Recognise the act" — merits earned since the last occasion are praised aloud, at the table, where the ritual's purpose allows it, as part of the incentive system, not a gesture alongside it; `PRI-015` now cites a step that exists (D-018).

### 2026-10-19
- **Added** `ADR-081`: a zone is a coloured bubble (safe, PvE, PvP; sphere, box or upward cylinder) the game director places anywhere; its rules are flags planted around it and written into `entorno/zonas.json`; the server resolves overlaps; acts are thrown from capsules out of the director's box.

### 2026-10-18
- **Fixed** `web/src/layouts/Layout.astro` (site v0.167.0): the top bar now stays put on scroll — `overflow-x-hidden` on `<body>` turned it into its own scroll container, breaking `position: sticky` in Safari; switched to `overflow-x-clip`.
- **Fixed** `web/src/components/{SiteSearch,Navigation}.astro`: the mobile menu's search glass opened a modal hidden inside the desktop-only wrapper; split into a `trigger`/`modal` pair sharing one modal outside any hidden wrapper.
- **Changed** `web/src/pages/index.astro`, `web/src/lib/composed-md.ts`: an empty section now names itself ("Nothing filed under &lt;section&gt; yet") instead of a bare "Nothing written yet."

- **Changed** `lore/game/manual/es/` and `en/`, chapters 2 and 5: the two edits pending since #649 — the fifth Oracle's disappearance at the Inversion Rift (ch. 5) and the Threshold's blank symbolism cell, now "Límite, tránsito, acción, manifestación" (the Veil's cell drops "umbral" for "revelación").
- **Added** `machine/tools/check-visual-header-footer.mjs` + `machine/visual-baselines/`: a Playwright + pixelmatch gate for the home page's nav bar and footer against a committed reference PNG; wired into `.github/workflows/ci.yml` after `build checks` (patch — the App has no `workflows` permission).
- **Changed** 7 agent `OPERATOR.md` (ursa 1.1.3; byblos, antunj, lexa, senet, doulos 1.1.2; nimrod 0.2.2): dropped the blanket "escalate any push" line that contradicted the PR-slot rule — pushing/opening a PR is allowed when the slot is free; still escalate branch deletion, security, or another's open PR.
- **Changed** `STD-042` 0.1.6, `agents/ursa/OPERATOR.md` 1.1.2: row 3 and the *Allowed without asking* section now name the `command_allowlist` grant of 2026-10-15 — heredoc and `-e`/`-c` script execution auto-approve for Ursa on every surface, cron included; `approvals.mode` stays `manual` for the rest.
- **Debt** `DBT-022` 0.8.0: row 67 and letter question [#67] for counsel — may a balance go negative when a refund or chargeback is resolved against us after the money was spent, and a won dispute restores it (D-004); `ADR-070` and `STD-033` wait for the answer.
- **Changed** `SYS-013` 0.5.0, `SYS-014` 0.3.0, `SYS-016` 0.2.0: refreshed against numinia-engine `328ea0a` and numinia-assets `55c75ad` — the fleet now runs Numinia Engine's image beside the Hyperfy fork, a world's engine build can change by `UpdateWorld`, and proximity voice is wired.
- **Changed** `README.md`, `CONTRIBUTING.md`: the README gains a "Run it locally" section (tests, checks, site dev and build); both files now say commit messages and pull request titles are written in English.
- **Changed** `MIS-173` (0.3.0): closed by the Oracle's word after a live re-check (`https://open-1.numinia.com/fleet/v1/machine` answers a full 40-character `recipe` commit) — the mission's only remaining step was `requires_oracle_approval`.

### 2026-10-17
- **Changed** `STD-042` 0.1.5 (site v0.166.0): a new permission, *Merge to a train branch* (`tren/*`, never main), `alone` at `High` and `Full`; merges to `main` stay the person's; the permissions after it move up one number.

### 2026-10-16
- **Added** `PLAYBOOK.md` (1.0.0, draft) for Doulos, Nimrod and Talos: how each agent does its job well — when a lesson applies, what to do, the pitfall, the evidence — edited by the agent through pull requests; the first lessons are the seeds written on 2026-10-16.
- **Added** `agents/INDEX.md` 3.5.0 (minor, by Pablo's go in chat on 2026-10-16, `STD-017` AUT-065): the section *How an agent grows* — an agent records what it learned in its own `PLAYBOOK.md` and ships it by pull request; the operator's merge is the review.
- **Changed** Hermes adapters of Ursa, Byblos, Antunj, Lexa, Senet, Doulos and Nimrod: pushing a branch and opening a pull request needs no ask while the repository has no other open pull request (Dependabot does not count); force-pushes, tags, remote-branch deletion and `.github/workflows/` still escalate.
- **Added** `DES-019`: where an object's logic lives in Numinia Engine — closed rules first, new classes in code on the server with a counted budget, only rules travel between worlds; an agent re-evaluates it every six hours.
- **Added** `ADR-079`: a world's content lives in its own files, the service on the platform, secrets and people on the machine; numinia.com edits a world by writing into its files; amends `ADR-074` and `ADR-069`.
- **Added** `ADR-080`: an AI enters a world through one door — its own key listed in the world, the world's tools over MCP, a connection it opens — and Hermes, with any model, builds in the Oracle's worlds; amends `ADR-075`.
- **Added** `PRI-016`, `PRI-017`, `PRI-018` (site v0.165.0): what Numinia Engine owes whoever comes to it — a machine can read it, so anyone can use it; a device is never asked more than it can bear; every limit says how it is known. They sit on the citizens' shelf (`MIS-195`).
- **Added** `SYS-016` *Numinia Engine, as wired*: the engine's layers, what decides what, its gates and what is measured, estimated or not measured yet (`MIS-195`).
- **Changed** `SYS-013` (0.4.0): `numinia-engine` joins the repositories as wired — public, AGPL-3.0-only, not yet on the fleet.
- **Added** `STD-026` 0.11.0: *Numinia Engine* (product) joins the operative vocabulary; `MIS-195` opens the gathering of the engine's principles, standards and procedures into the Summa, whose source of truth is the archive.
- **Added** `ADR-073` to `ADR-077`: the engine's standing decisions, recorded so the Oracle can change them — purpose and first product (a one-room escape room, one group at a time); a world is text; logic on the server, live building by role; every thing carries a card; adventures are text, KHR_interactivity a bridge.
- **Added** `ADR-078`: the object model for the escape room — class and scope, closed rules «when → then» editable from both ends, one selector for the target, a live world and a city by published version, the object list in the page with «mine» from the server, a gauge per zone that stops building at 100 %.
- **Added** `ADR-072`: a world's address is written by the fleet, through the till's DNS desk (an A record, DNS only, at the machine's IPv4); the only Cloudflare key lives in the till, limited to numinia.com and numen.games; amends `ADR-069`.

### 2026-10-15
- **Changed** `PRO-015` *Joining Numinia* (2.1.0) and `PRO-024` *Leaving Numinia* (1.0.0) are in force: nobody starts before the agreement is signed, nobody is gone before their access list is closed; `AGENTS.md` names them (`PRO-023`, MIS-194).
- **Changed** `AGENTS.md` 21.7 → ~18 KB, under the 20 KB cap Hermes enforces (above it the middle of the file is dropped): the repository map is shorter and the rule index quotes the first 40 characters of each `Binds:` line (`rule-index.mjs` `SCOPE_CHARS` 96 → 40); no rule changed.
- **Changed** `STD-038`, `STD-039`, `STD-054` and `STD-055` are in force at 1.0.0: the opportunity register, record, naming and call rules bind; every Check row is verified by the pipeline tool in CI, no row by hand (`PRO-023`, MIS-192).
- **Changed** `PRO-028` to `PRO-033` and `PRO-035` are in force at 1.0.0: an opportunity's record moves only by the steps of qualifying, proposing, closing, bidding, applying, screening and watching; `AGENTS.md` names them (`PRO-023`, MIS-193).
- **Changed** `STD-054` 0.2.0, `PRO-029` 0.5.0: a company is named only once it has confirmed in writing, not once told and not objecting.
- **Changed** `STD-039` 0.16.1 (OPP-019): a lost opportunity is kept 90 days, then the next quarterly roll-up counts it and deletes its file; won ones stay. `PRO-017` and the quarterly template carry the step, the pipeline report lists *Ready to leave* (site v0.164.0).
- **Changed** `STD-039` 0.15.0 splits in three, same obligations: `STD-054` *A client is named by consent* (NAM-001–003) takes who may be named; `STD-055` *Only a call that passes is recorded* (CAL-001–004) takes the public call; OPP-007 and OPP-010 leave to the reviewers and procedures.
- **Changed** `PRO-003` *Running a mission* (5.2.0) and `PRO-005` *Escalating to the Oracle* (3.2.0) are in force: a task starts from a mission card, an escalation names its mission, and `AGENTS.md` stops suspending the card. `PRO-003` first takes the procedure form (5.1.0); MCY-001–007 become steps.
- **Changed** `STD-052` 0.2.0: `top-up` is a permission of its own, given to the base role by every template; `manage-balance` keeps the billing details. `ADR-070` 0.3.2, `ADR-071` 0.1.1 and `MIS-179` 0.3.0 follow; `DBT-022` 0.7.0 asks counsel who buys when a member pays (#66).
- **Changed** `STD-050` 0.2.0: what an agent's body does comes only from a list the world declares (AGW-012); short orders such as a gesture's name are decided by the program (AGW-013); every movement file is CC0 (AGW-014). `PRO-037` 0.4.0 adds the panel's Gestos section and `/p salta`.

### 2026-10-14
- **Added** `ADR-071`: each organisation runs its own roles, as a Discord server does, and its members see who is connected; selects OWASP ASVS 5.0.0 (L2 + 8.3.2), OWASP's authorization and logging cheat sheets, AuthZEN 1.0, GDPR art. 25(2) with EDPB 03/2022 v2.0, and RFC 6121 (site v0.162.0).
- **Added** `STD-051` organisation roles (ORG-001–012: roles add up, owners are not a role, act only below your highest role, read on the server at each request, the house's reach, every change logged), `STD-052` the register of what a role can carry, `STD-053` presence (PRS-001–010); all draft.
- **Changed** `STD-003` 3.4.0: inside an organisation a rank adds nothing but the house's reach, and an Oracle may enter any organisation as its access for the house allows; `STD-026` 0.10.0 adds *Organisation role* and *Presence*.
- **Changed** `ADR-070` 0.3.1 and `MIS-179` 0.2.0: the four team roles become the Team template of each organisation's own roles (`ADR-071`); `DES-016` 0.12.9 adds the three questions (46 standards).
- **Debt** `DBT-022` 0.6.0: rows 62–65 for counsel — the first-run presence question as consent, the house's access during the alpha, how long an organisation's log is kept, and who decides an organisation's ban under the DSA.
- **Added** `STD-050`: what an agent in a world reads, and what it obeys — instructions hold only identity, house rules, organisers' notes and roles; links, documents, a space's card and names are material sent apart and never obeyed; every space has a `.md` card for agents.
- **Changed** `PRO-040` 0.2.0 and `PRO-037` 0.3.0: an agent reads each world's card, the space's own `.md`, and keeps `STD-050`; `DES-016` 0.12.8 adds its question (43 standards).
- **Added** `PRO-040`: configuring an agent from the platform — a community adds an AI on its numinia.com panel, fills its page (identity, five links, five `.md` documents, behaviour, which roles it obeys) and switches on its worlds; the platform places it, the agent never holds a world's code.
- **Changed** `PRO-037` 0.2.0: the agent answers only `/p` or its name, appears in front of the speaker, follows on *sígueme*, gives administrators priority; up to five links; the bridge is found on the world's own machine.
- **Changed** `PRO-038` 0.2.0, now choosing the brain: a Claude key by default; Hermes optional, with empty memory, a 16+ character key, and tools taken from its API only (`platform_toolsets`, not the global `disabled_toolsets`).
- **Changed** `PRO-039` 0.2.0: the bridge installs beside each world with one installer — no domain, no certificate, no other machine; an HTTPS door only for a Hermes elsewhere.
- **Added** `PRO-037`: placing an agent in a 3D world — drop the agent component into a Hyperfy world, choose who it is and what it knows in its panel, test the connection, talk to it; the component carries no secret.
- **Added** `PRO-038`: raising the brain agents in worlds think with — Hermes on its own machine, signed in to the Nous Portal, listening only inside it, every tool taken away; why not a Hermes Cloud instance.
- **Added** `PRO-039`: opening the brain to the worlds — a bridge that holds the key and the limits and answers only listed worlds, behind one HTTPS door and a firewall.

### 2026-10-13
- **Added** `DBT-027`, restricted to the Oracle: what the first security audit found worth fixing — the numen.games forms can put a visitor's details in a URL when their script fails, the sites' content security policy allows inline code, and the worlds server is not yet audited; no key or way in was found.
- **Changed** `ADR-070` 0.3.0, from the Oracle's decisions on the prices: sizes are sold by people at once — Small up to 20, Medium up to 50, Large up to 100 — a world asleep because it is empty counts as running, and the figures change from the price room (`MIS-184`).
- **Changed** `MIS-184` 0.3.0, opened: the Oracle's price room on numinia.com — a calculator with dated costs, each size's cost and margin, an example fleet's monthly profit, and Publish, which schedules a dated tariff version in the till with who and why.
- **Added** `MIS-189`: the Oracle sees the till's money — collected against consumed in a month, client balances, the month's cross-check with Stripe, adjustments by hand with who and why — split from `MIS-184`, after Stripe (`MIS-180`).
- **Changed** `MIS-185` 0.3.0: a world asleep because nobody is in it counts its minutes as running; stopped minutes are those a person or the balance at zero stopped.
- **Changed** `MIS-169` 0.4.0 logs the prices: three sizes by people at once with starting figures, an asleep world pays as running, `MIS-184` becomes the price room and the till's money moves to `MIS-189`.
- **Changed** `DBT-026` 0.2.0: starting figures — Small 0.20 and 0.02, Medium 0.75 and 0.05, Large 1.80 and 0.10 euros a day without VAT — from the pricing study of 2026-10-13, with what is still judgement: a load test on OVH, the machine holding the people limit, the copies.
- **Changed** `ADR-070` 0.2.0, at the Oracle's request: UTC is the reference time and every other time is computed from it — the night's close runs at 00:30 UTC over days of 24 hours, and screens show hours in the viewer's zone; `MIS-177`, `MIS-178`, `MIS-183`, `MIS-184` and `MIS-185` 0.2.0 follow.
- **Added** `ADR-070`: a world is paid for by the day from a prepaid balance in euros, in a ledger of our own apart from the website; Stripe takes the money and the tax, one customer per account; consumers see VAT, companies do not; teams with four roles; only owners sign the delicate.
- **Changed** `MIS-169` 0.3.0, opened and rewritten by `ADR-070`: a monthly fee per size becomes a daily charge from a prepaid balance, people and teams buy, a paid world's owner signs its birth beside the till's "has credit"; the pieces move to `MIS-177` to `MIS-188`.
- **Added** `MIS-177`: the till keeps each account's balance as lines only ever added — top-ups as lots spent oldest first, world-days, adjustments — and the tariff as dated versions; the house's first database, in a Worker of its own.
- **Added** `MIS-178`: each night at 00:30 Madrid time the till charges one line per world by state and size, never estimates a day nobody measured, and at zero lists the running worlds to stop and keeps the stopped ones 90 days for free.
- **Added** `MIS-179`: a personal account for every person and teams with four roles — owner, administration, finance, member — checked cell by cell; invitations by email for seven days; a team always keeps an owner; nobody acts upward.
- **Added** `MIS-180`: top-ups on Stripe's page — one customer per account, tax per country, tax ID collected, one invoice per top-up, events verified and counted once, refunds and disputes as lines, a key that cannot refund.
- **Added** `MIS-181`: the till signs three things a machine checks — a team pass of at most 15 minutes, "has credit" for a size, "stop for balance" — under a domain of its own, with two keys and a shared file of examples.
- **Added** `MIS-182`: the till mails whoever may pay — balance low at the current pace, at zero, weekly while a world is kept for free, twice before a deletion, the day a price rise is scheduled — through Amazon SES in Paris.
- **Added** `MIS-183`: the clients' screens on numinia.com — account switcher, worlds with their price per day, balance and days left, usage by day with table and CSV, invoices, team, thanks — VAT shown to consumers, every refusal with its way out.
- **Added** `MIS-184`: the Oracle's till and tariff screens — collected against consumed, client balances, the month's cross-check with Stripe, adjustments with who and why, a rise refused before its notice ends, the history of versions.
- **Added** `MIS-185`: a machine counts each world's day — minutes running and stopped, the size reserved — keeps 35 days and gives each day to the till on a signed read, replacing the till's pretend meter.
- **Added** `MIS-186`: a machine obeys a world's owners and the till — the order names account and owners, the delicate needs an owner, the daily a team pass beside the person's signature, a client's world starts only with credit.
- **Added** `MIS-187`: the norms follow `ADR-070` — `STD-033` net prices for companies and a dated tariff, `PRO-020` steps for a tariff, `SYS-008` the till, `STD-003` team roles are not ranks — and the offer record in test.
- **Added** `MIS-188`: numen.games/hosting sells the World plan from 10 euros — "Start with 10 €" leads to numinia.com and the prices per day come from the tariff in force; the dedicated plan and events stay by proposal.
- **Added** `DBT-026`: pay per use runs on example figures — prices per day, the event boost, the minimum top-up, the notice before a rise, the final notices — and on choices left for later: refunds on request, plans, automatic top-ups, crypto.
- **Changed** `DBT-022` 0.5.0: rows 52 to 61 for pay-per-use hosting — terms for consumers and companies, withdrawal, a price rise, deletion at zero, privacy; a top-up's VAT, Stripe's invoices, the advance, the one-stop shop — and block 2 of the letter.

### 2026-10-12
- **Changed** `MIS-160` 0.2.0 logs the Oracle's direction, copies first: no AWS key in the Worker; each machine's narrow key writes and reads `copies/`, deletes nothing, and the machine presigns downloads on a signed request; a versioned bucket in Paris, 14 days, a folder per organisation; keys stay on the machine.
- **Changed** `MIS-164` 0.2.0 logs the Oracle's direction: an imported world is born stopped on the machine the Oracle picks, so the import needs free disk, not `MIS-163` (`depends_on` emptied); restoring a night from the bucket is the same piece (a hypothesis).
- **Changed** `MIS-169` 0.2.0 logs the route to the first paid world: numen.games/hosting already sells by proposal and invoice, so it needs a price (`MIS-161`), the page's promises kept, per-world codes and a closed `/status` before clients share a machine, and a DPA template; Stripe after the first clients.
- **Added** `MIS-170`: each world has its own admin code, shown and changed with one Oracle signature (`ShowWorldCode`, `RotateWorldCode`); a change restarts only that world and keeps who everyone is, today's codes stay until changed — built (numinia-assets #21, numinia-web #106, site v0.79.0) and in review.
- **Added** `MIS-171`: a client's own domain is added with one signature — the machine writes the world's site only once the name resolves to it, so no certificate is asked for a name it cannot serve, and the room says which DNS record to set; today someone logs into the machine to list it.
- **Added** `MIS-172`: a world's size changes with one signature for an event and goes back by itself at its end time, each change after the world's next save, refused when it does not fit — the event boost numen.games/hosting sells.
- **Added** `MIS-173`: a machine installs one reviewed commit of its recipe — the room's line names it (`FLEET_REF`), the machine installs exactly that one and its door says which, and the room warns when a machine runs another; built (numinia-assets #21, numinia-web #106, site v0.79.0) and in review.
- **Added** `MIS-174`, deferred by the Oracle: numinia-assets' `main` cannot change by one hand — its ruleset goes from 0 approvals and no checks to one approval from someone other than the last pusher, stale approvals dismissed, the CI check required, no bypass.
- **Added** `MIS-175`: changing a world's code leaves no one its administrator — the machine sets every administrator of that world back to visitor while it is down (inside the restart, or at once when stopped), in every world, and the room's dialog says so; builders keep their rank.
- **Added** `MIS-176`: the house enters a client's world only when the client asks or for security — it operates every machine, the client owns its world; Show and Change code carry a signed reason the door's log keeps, and the hosting terms and the DPA say so (GDPR art. 28(3)(a)).
- **Changed** `DBT-025` 0.2.0: a tenth shortcut — the engine saves only on its timer, so the machine waits one save interval before a stop or a copy (paid by saving on SIGTERM); and one admin code per world now, but a change of code demotes nobody, since the engine keeps ranks in the world (`MIS-175`).
- **Changed** `SYS-014` 0.2.0, as wired at site v0.79.0 and numinia-assets `2ca8e2c`: each world's own code, shown and changed; the recipe pinned and named at the door; the save before a stop or a copy; reloads that keep visitors; `busy` and `still-deleting`; deletes typed by address; three worlds on open-1.
- **Changed** Principles, one belief one home: `PRI-014` retires into `PRI-002`; ranks to `STD-003`/`STD-026`, data to `PRI-012`, the threads' dose and era to `STD-023`. In force: `STD-031` 1.0.0 and the eleven principles by ursa (`PRI-006`/`PRI-007` stay on trial, their findings warn) (site v0.161.0).
- **Changed** `STD-031` 0.3.0: a principle's tools, dates, names, bare ids and Spanish world names are checked by `std-031-a-principle-states` (draft: reported, not blocking); judgement rows go to the PR template. Principles form pass: banners, restated standards, repeats cut; Threshold, Prism; three citations fixed.
- **Added** `MIS-162`: each fleet machine measures itself and every world on it (memory, processor, disk, people inside, restarts), keeps a week, publishes it at its door with no person in it, and the worlds room shows it.
- **Added** `MIS-163`: a machine never takes more than it holds — each world reserves its share, the door refuses one that does not fit (`no-room`), and the room shows the machine's room and switches Create and Start off, saying why.
- **Added** `MIS-164`: a world comes back from its zip — one signed `ImportWorld` brings up the fleet's own copies, the Alchemists' Tower's backups and the hand-run server's worlds, with every hostile-zip rule tested.
- **Added** `MIS-165`: each rank sees the fleet at its own depth — an owner their worlds, an Archon every number without acting, the Oracle everything — written in `STD-003` and built in the worlds room.
- **Added** `MIS-166`: a public list of the open worlds on numinia.com with the people inside, fed by the machines; each world's `/status` stops handing outsiders every visitor's name and position.
- **Added** `MIS-167`, on hold until a machine holds more worlds than room: an empty world sleeps and wakes for its first visitor, without losing an edit.
- **Added** `MIS-168`: a machine updates itself when the Oracle signs the commit to install, and goes back by itself if the new build does not come up — no bootstrap line over SSH.
- **Added** `MIS-169`: a world can be paid for — hosting on sale through the house's one payment account, priced by the size a world reserves, born with its buyer as owner, stopped when the payment stops.
- **Fixed** Core coherence, no activation: draft means on trial in `STD-026`/`PRI-009`; `STD-012` checks DEF-004/010/011; seven-day security answer; duplicates retired (URL-006, CIT-051, STA-010, SEC-004, LEG-001); sales flow agrees on silence, validity, one `won`; reference titles tested.
- **Added** `SYS-014` The worlds fleet, as wired: an Oracle signs one request in numinia.com's worlds room and the machine checks it and creates, stops, starts, downloads or deletes the world; what each piece holds, what it refuses, what a theft gives.
- **Added** `SYS-015` Signing in to numinia.com, as wired: thirdweb and Sign-In with Ethereum, the site's own one-hour session, where each rank comes from, the two lists of Oracles, and what is not built (bans, early revocation).
- **Added** `DBT-025`: nine shortcuts of the worlds fleet's trial no technical reviewer has checked (one admin code per machine, no nightly copy yet, the engine as root…), each with what pays it; OVHcloud's card in `SYS-012` 0.2.0.
- **Changed** `ADR-069` 0.2.0: at the Oracle's request the book of orders lives on each machine and changes by a request the Oracle's wallet signs; the pull-request path is gone. `SYS-013` 0.3.0, `MIS-156` 0.3.0 log it; `STD-003` 3.3.0 lists the worlds room under the Oracle.

### 2026-10-10
- **Changed** `MIS-156` 0.2.0 shrinks to one thing: a new small machine (`open-1`) that obeys the order book — bootstrap, reconciler, first card and order; the hand-run server stays as it is.
- **Added** `MIS-158`: each fleet machine makes, every night, a self-contained zip of each world (the Alchemists' Tower backup shape) that runs anywhere with `docker compose up`.
- **Added** `MIS-159`: the Worlds room shows machines, copies with *Download*, the admin code, and owners by wallet who see only their worlds.
- **Added** `MIS-160`: copies and keys reach the console through the house's AWS (S3, Secrets Manager) with two least-privilege users; `ADR-069` to be patched then.
- **Added** `MIS-161`: the cost model of a world by piece (machine share, hours on, voice, agents, boost) before any public price.

### 2026-10-09
- **Changed** `MIS-157` 0.2.0 logs the Oracle's working hypothesis, the wallet first: Pilgrim and Citizen read from the wallet, hand ranks in a Worker secret for now, bans off chain, no database yet; on-chain role and zero-knowledge candidates added for the ADR.
- **Added** `MIS-157`: numinia.com's sign-in, sessions, ranks and bans follow published standards (OWASP ASVS, NIST, EIP-4361), selected in an ADR before any code; the site's code keeps `STD-003`, whose four breaches it lists; the automatic rank ladder goes to debt.
- **Changed** `ADR-069`: a 3D world has a card in `objects/`, an order the servers read and keys only on its server; public and private worlds never share a fleet; the first public fleet lives in numinia-assets for its trial. `MIS-156` builds it; `SYS-013` 0.2.0.
- **Changed** The archive's secret scan, workflow lint, dependency audit, night watch and Dependabot auto-merge call the shared workflows in `numengames/.github`, pinned by commit; the register check and the tests hold each caller to it (`STD-015` ARC-011); `STD-022` 2.1.1, `STD-005` 4.1.1.
- **Changed** The rules of `ADR-068`: `STD-037` 1.0.0 (legal texts at one address on numinia.org, no copies), `STD-015` 7.0.0 (common CI called from `.github`, pinned; no hand copy), `STD-017` 3.0.0 (`.github` needs the Oracle), `PRO-027` 0.3.0, `LEG-001`–`004` name their one address (site v0.159.0).
- **Added** `ADR-068` Each thing lives in one place (polyrepo with a single source; legal texts at one address; common CI in the organisation's `.github`; the monorepo question goes to a trial) and `SYS-013` The repositories, as wired; `SYS-001` retired, redirected there (site v0.158.0)

### 2026-10-08
- **Changed** Kairos's card, the playbook and `PRO-035` 0.2.1's summary: the watch keeps only what the house can take alone (site v0.157.0).
- **Changed** The watch brings only what the house can take alone: `PRO-035` 0.2.0 (drop at sight what needs a partner, staff or solvency it lacks, or starts within five weeks), `STD-038` 0.12.0 (a low verdict leaves the feed), `OPS-018` 0.7.0 (event production, advertising, generic software out).
- **Changed** /system/pipeline shows each record's number on its card, list and timeline (site v0.156.0); `DBT-022` 0.4.1 item 49 asks counsel whether calls need a fixed line, `DBT-024` 0.1.1 points to it.
- **Removed** OPP-2026-002, 003, 004 and PRP-2026-002, 003, 004 (lost, no door under `STD-048`); 021, 022, 023 (grants out of time or without a 2026 call), 036 (asks for a game already sold) and 020 (nothing known). `STD-049` 0.2.1 logs the audit.
- **Added** `stakeholders/`, a new series (Administration · Relating): one public card per organisation, public body or event that takes part, nine to start; `STD-027` 0.12.0 and `STD-001` 5.17.0 add the row (site v0.155.0)
- **Added** `DBT-024` The sales process cannot yet reach a named person (private contacts, Lista Robinson, a fixed line, call script, `OPS-007` rewrite); `DBT-022` 0.4.0 §1.8 takes the questions for counsel on prospecting; OPP-2026-037 declined.
- **Changed** Sales and legal review: a `door` on every record (`STD-039` 0.14.0, OPP-018) and in `STD-038`; the kit refuses a cold e-mail and adds the legal footer; twelve records move to calls or meetings; `STD-048`/`STD-049` 0.2.0; `LEG-001` 2.2.0 covers prospecting; `PRO-028` 0.7.0.
- **Added** `STD-048` Reaching someone who did not ask (an e-mail only after a yes, Lista Robinson first, a no is final, the strictest law travels, audit at every change) and its register `STD-049` The doors, by country (Spain/EU, United States); `STD-047` 0.2.0 gates the first-contact e-mail; `OPS-007` 1.1.0.
- **Changed** `STD-039` 0.13.0, OPP-017: an open record whose organisation may be named carries its public mailbox (`contact_email`) and page (`web`), never a person's; the six open calls carry theirs; /system/pipeline and the radar's feed show them.
- **Changed** `STD-047` 0.2.0: the first contact asks yes or no in a week, price shown; a one-page sheet (A4 + mobile) and an expiry e-mail replace the deck; `PRO-028`, `PRO-030`, `OPS-012` (8,000 € pilot), `OPP-2026-025` follow; /playbook shows the rules (site v0.153.0)

### 2026-10-07
- **Added** `MIS-155`: Kairos gets its own GitHub App, installed on the feed only with contents write, and the feed leaves Ursa's App.
- **Changed** `STD-015` 6.2.0: four new practices — code scanning (SEC-016), workflow lint (SEC-017), the dependency audit before merge (SEC-018) and the outside probe of every public site (SRE-008); DEV-006 asks a pull request for the evidence that it works.
- **Added** CI parity: workflows `workflow-lint` (actionlint + zizmor), `audit` (npm audit of web/, production, high+) and `monitor` (numinia.org every 6 h, night-watch issue), seen, not enforced; checkouts drop persisted credentials; the PR template asks for evidence (site v0.152.0)
- **Changed** /system/pipeline opens on what is due (Today, 7 days, open, closed), with search, kind and dates; `STD-039` 0.12.0 adds `operation`, `line`, a deadline on any kind and OPP-016, the chance from the line and the house's wins; `OPS-018` lists the lines (site v0.151.0)

### 2026-10-05
- **Changed** Christian's vocabulary answers: `STD-026` (0.9.0) ranks, guild, branch, house, Prism Cell, Adventure and the three design registers take their business words; `DES-007` (1.2.0) and /system/language follow; `STD-030` (0.6.0) adds Tabularium and Emporium and confirms every discipline (site v0.150.0)
- **Changed** `DES-007` (1.2.0) and /system/language: the narrative dial has three levels, the moon's three stops (Business, Mixed, Numinia), as ruled on 2026-09-29; the five-level scale and its *Functional* and *Narrative* columns are retired (site v0.150.0)
- **Changed** The game takes its section by folder: `STD-030` (0.5.0) gains *Series that take one section*, `lore/` → Products and services, and its ten published texts leave the front door's *Without a section*; `ADR-066` (0.2.0) admits the one case (site v0.149.0)
- **Added** The books open the front door: the legal playbook (`/legal-playbook`) and the role-playing manual (`/manual`) are built, the open books join the shelf, two handbooks are named as pending; the manual's four missing illustrations become a visible line (site v0.148.0).
- **Changed** `STD-040` 0.5.0: what a sent proposal offered never changes; its header may follow the header standard's changes of form (the Oracle's ruling).
- **Added** `OPS-022` *The house's hours* (draft): Madrid time, 37 h a week, two clocks, send windows, the hour a date takes when its source gives none; every header date now carries its hour and HDR-045 checks them all; the sales kit reads date-times. Debt 40 → 39.

### 2026-10-04
- **Fixed** Seven hand-checked rows of rules in force get their machine: header relations resolve (HDR-016), titles in English (HDR-002), a deferral's mission lives (HDR-032), the design kit is a build check, stale since the PRI rename (GIT-027/029); DEF-009 and CLS-004 name theirs. Debt 47 → 40.
- **Changed** `lore/` holds the game only: three company texts that were older copies of `PRI-001`, `PRI-004` and `PRI-006` leave it and redirect there; their reading list and sources wait in `DBT-023`; the lore index drops its World shelf (site v0.146.0)
- **Changed** `STD-022` *Secrets* in force (2.1.0): only what a machine checks — the history scan, no tracked key file, `SECURITY.md` links the private form; KEY-055 retired into `PRO-036` *Handling a security weakness*; `PRO-023` step 7: a hand-checked row keeps a rule in draft (site v0.145.0).
- **Changed** `STD-005` *When a rule bites* is in force (4.1.0): every check now finds the rule it reports under in a document — the register check speaks under ENG-002/031/032 and each practice's own plate, and the regime reads a register's Rule ID column; ENG-066 is a test.
- **Changed** The narrative moon turns by taps, L1 → L2 → L3 → L1, with no dial; a switch's icon shows the state you are in, so night shows the moon and day the sun (`DES-009` 1.3.0, `STD-037` 0.6.0; site v0.144.0)

### 2026-10-03
- **Changed** numinia.org opens on the archive by the ten sections of `STD-030`: `/` lists every record under its section, by series; the map is `/map`; `/about` redirects to `/`; the bar reads Archive · Map; `check-reachable` walks from `/` and `/map` (site v0.143.0)
- **Changed** `machine/guards/` is `machine/checks/` (`ADR-067`, cut 5): `run-guards.mjs` → `run-checks.mjs`, `npm run guards` → `npm run checks`, the CI steps, the registry key and every path that named them; `STD-001` 5.16.0, `STD-026` 0.8.0, `STD-027` 0.11.0; no public address changes (site v0.142.0)
- **Changed** `blueprints/` is `designs/` (`ADR-067`, cut 4): `type: design`, `BLU-NNN` → `DES-NNN` with `former_id`, 12 documents; old addresses redirect; `STD-001` 5.15.0, `STD-004` 4.16.0, `STD-026` 0.7.0, `STD-027` 0.10.0; *blueprint* reads *design*; *Blueprints* stays the Numinia stop's word (site v0.141.0)
- **Changed** `canon/` is `principles/` (`ADR-067`, cut 3): `type: principle`, `CAN-NNN` → `PRI-NNN` with `former_id`, 14 documents; old addresses redirect; `STD-001` 5.14.0, `STD-004` 4.15.0, `STD-026` 0.6.0, `STD-027` 0.9.0; *canon* reads *principle*; *Canon* stays the Numinia stop's word (site v0.140.0)
- **Changed** `protocols/` is `procedures/` (`ADR-067`, cut 2): `type: procedure`, the prefix `PRO-` kept, 28 documents; the 28 old addresses redirect; `STD-001` 5.13.0, `STD-004` 4.14.0, `STD-026` 0.5.0, `STD-027` 0.8.0; *protocol* reads *procedure* in every normative document (ISO 9000) (site v0.139.0)
- **Changed** The archive takes the industry's words (`ADR-067`, cut 1): `provenance` → `digital_source_type` (IPTC), `type_execution: digital · biological · hybrid` → `executor: agent · human · hybrid` (ISO/IEC 22989), `ratified_by` → `approved_by`, `frozen` → `on-hold`; `semaforo` deprecated; `STD-004` 4.13.0
- **Changed** Every document of `standards/` is `type: standard`, strict to its folder; `documentation` stays for guides and references; `STD-001` 5.12.0 names the approval level and the template per series; *fond* is spelt *fonds*; *biological agent* reads *human* in every document
- **Changed** Prose follows the industries: *instrument* → tooling, check and artifact (`STD-027` CLS-002); *mould* → template; *axis* → the normative documents; *plate* → rule ID; *guard* → check in prose (the folder and `npm run guards` wait for cut 5)
- **Changed** *ring* → core and extension fields (`STD-004`); *threshold* → approval level (`STD-001`, `STD-017`, `STD-024`, `STD-027`); *retired* → deprecated for fields, rule IDs and values, *withdrawn* kept for documents
- **Changed** `STD-026` 0.4.0: every word of the vocabulary audit has an entry, a renamed word keeps its former name after *Also*, and each entry names the convention it follows with its source; the Lexicon prints it (site v0.138.0)
- **Changed** `territory` leaves the header; `section` takes its place with the ten sections of `STD-030` as its only values (`ADR-066`: *territory* is a faction's district); `STD-004` 4.12.0, the guard, the moulds, 255 records; the code calls a folder a series (site v0.137.0)
- **Added** `STD-030` 0.4.1: the translator — sections of the front door, disciplines by guild, branch and house, business lines by faction, who decides; `web/src/lib/translator.mjs` reads it and nine tests hold it

- **Added** The brand and culture book at /brand: seven chapters read from `CAN-014`, `CAN-002`, `CAN-013`, `CAN-008`, `CAN-010`, `STD-029`, `PRO-019`, `CAN-015`, `OPS-020`, `OPS-011`; `lore/world/brand-and-culture.md` (the old deck) is removed and its address leads to the book (site v0.136.0)
- **Added** `OPS-021` how to get help from us (Discord, email, data address open; an agent coming); `STD-037` SIT-004 the epitaph behind a skull at the foot of every site; the footer button is now *Back Numinia* and leads to numinia.com/back; Discord joins the social column (site v0.135.0)
- **Added** Culture from the old deck: `CAN-015` how Numinia rewards, six tests; rescued lines in `CAN-002`, `CAN-006`, `CAN-014`, `OPS-011`, `OPS-020` (site v0.134.0)
- **Added** Brand and culture from the old deck: `CAN-013` the brand in three words, `CAN-014` where we come from, `OPS-020` the strategy; `CAN-002` gets the manifesto and epitaph back (site v0.133.0)
- **Added** The Lexicon at /lexicon: the operative vocabulary as a book, A to Z, one page per letter, with a back-to-top button (#627) (site v0.132.0)
- **Changed** The operative vocabulary grows from 25 to 158 terms, A to Z: one definition per word, written once, the source the Lexicon book will read (#626)

### 2026-10-02

- **Changed** One site name per narrative level in every tab — L1 numinia.org, the archive of Numen Games; L2 the archive of Numinia; L3 the Summa Archive — and the dial names its levels L1 L2 L3 (#625) (site v0.131.0)
- **Added** /telemetry is a panel: period, Product/CTO lens, growth and weight by function, maturity, what has no page, largest documents, files by kind (`corpus.files_by_kind`); one action line per panel (#624) (site v0.130.0)
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

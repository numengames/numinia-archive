<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->
# numinia-archive

> The archive of Numen Games S.L., written in the open. It is published at
> [numinia.org](https://numinia.org).

Numen Games is a studio in Spain building a narrative operating system for
the way organisations work, and it runs on that system itself. This
repository holds the rules, the decisions, the work, the agents and the
world of that organisation, as plain files. The site is built from these
files on every push to `main`, so nothing on numinia.org lives anywhere else.

---

## Start here

1. **What binds today:** [numinia.org/binding](https://numinia.org/binding).
   Most documents here are `draft`: on trial during the alpha, followed but
   never blocking. That page lists the few in force and the Oracle's rules
   for the transition between the two.
2. **Changing something, person or agent:** [`AGENTS.md`](AGENTS.md). It
   covers what still holds, the commands to run and a map of the folders. Then
   [`CONTRIBUTING.md`](CONTRIBUTING.md) explains how a change is proposed.
3. **Reading, agent:** [numinia.org/llms.txt](https://numinia.org/llms.txt).
   You can add `.md` to any page address to get the file behind it, and
   [index.json](https://numinia.org/index.json) lists every address. You never
   need to read the HTML.
4. **Reading, person:** [numinia.org](https://numinia.org). The home page is a
   map of the whole archive; press `/` to search.

---

## Where things live

Each folder answers one question.

| Folder | Answers |
|---|---|
| [`principles/`](principles/) | What the system **is** |
| [`standards/`](standards/) | What an artifact must **comply with** |
| [`procedures/`](procedures/) | What an actor **executes**, step by step |
| [`decisions/`](decisions/) | **Why** something was chosen |
| [`designs/`](designs/) | What **could** be: designs not yet executed |
| [`missions/`](missions/) | The **work**, promised and done (suspended during the transition; see `AGENTS.md`) |
| [`reports/`](reports/) | What was **observed**, on a date, by someone |
| [`debt/`](debt/) | What we know is **missing** |
| [`agents/`](agents/) | **Who** acts: one folder per digital agent; the roster is [`agents/INDEX.md`](agents/INDEX.md) |
| [`lore/`](lore/) | The **fiction** and the game |
| [`operations/`](operations/) · [`legal/`](legal/) · [`opportunities/`](opportunities/) | What **sustains** the business |
| [`objects/`](objects/) | Cards for registered things that are not documents; the bytes live in `numinia-assets` |
| [`system/`](system/) | How the machine is **wired** |
| [`machine/`](machine/) | The **tooling**: checks, tools, scripts, templates, telemetry. They are tools, not rules |
| [`web/`](web/) | The site that serves **numinia.org** |

---

## Its place among the repositories

| Repository | What it is |
|---|---|
| **`numinia-archive`** | **This one: the rules and records, and numinia.org** |
| [`numinia-web`](https://github.com/numengames/numinia-web) | numinia.com: the world and what is on sale |
| [`numengames-web`](https://github.com/numengames/numengames-web) | numen.games: the studio |
| [`nwos-deploy`](https://github.com/numengames/nwos-deploy) | nwos.numen.games: the service |
| [`numinia-assets`](https://github.com/numengames/numinia-assets) | The depot of images, models and other files |

The archive is public. Credentials, client data and contracts are not kept
here.

---

## What a machine checks

On every push, [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs the
checks in [`machine/checks/`](machine/checks/) (headers, identifiers,
versions, licences, citations), the test suites and the site build, so a
change that breaks numinia.org fails before it merges. Everything else is
checked by a person reading the pull request.

---

## Licensing

A licence belongs to the file, never to the folder. Every text file declares
its own in an SPDX comment at the top; files that cannot carry one are listed
in [`REUSE.toml`](REUSE.toml). Two files side by side may carry different
licences. See [`LICENSE`](LICENSE).

---

*Numen Games S.L. · licensed per file, see [LICENSE](LICENSE)*

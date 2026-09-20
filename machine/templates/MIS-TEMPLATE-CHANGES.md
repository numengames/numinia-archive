---
id: "MIS-TEMPLATE-CHANGES"
uid: ""
title: "What changed in the mission template, and the figures that decided it"
status: active

type: documentation
version: "1.1.0"
created: "2026-08-25"
updated: "2026-08-25"
author: "ursa"
owner: "oracle"
tags: [missions, template, standards]
license: "CC0-1.0"

subtype: standard
---
# The mission template, v2 — what changed and why

> **Summary:** the template was rebuilt against the 106 missions in the repo.
> **Epistemic:** every change here carries the figure that decided it. Nothing
> was retired on taste.
> **Pragmatic:** what to fill in, what to omit, and what no longer exists.

`ROOT = numengames/numinia-nwos · main` · `HEAD = f7a65f5` · 2026-08-25
Instrument: `salida/sesion-2026-08-25-fase0-websync/medir-template.py`

---

## The finding that ordered the redesign

**The template omitted exactly the four fields the build verifies, while
declaring two that nothing uses.**

| Field | In missions | In the Zod schema | In the old template |
|---|---:|---|---|
| `guild` | **106 / 106** | yes | **no** |
| `effort` | **106 / 106** | yes | **no** |
| `area` | **104 / 106** | yes | **no** |
| `type_execution` | **88 / 106** | yes | **no** |
| `executor` | 1 / 106, **0 useful** | no | yes |
| `divergence_log` | 6 / 106, **0 useful** | no | yes |

This is not a list of fields to adjust. **It is a mould pointing at the wrong
place**: it described a system that does not exist and ignored the one that
does. A mission written strictly to the old template failed the build.

---

## The frontmatter core: the ten fields the build checks

`web/src/content.config.ts` declares a Zod schema for the `missions`
collection: `id`, `title`, `status`, `priority`, `effort`, `guild`, `area`,
`type_execution`, `assigned_to`, `completed`.

They are the core because **they are the only part of this template with a
mechanism**. A missing or mistyped field fails `npm run build`. Everything
else in this document — including all three body sections — is convention.

`type: mission` is added: not in the schema, but every document in the archive
declares its type (`STD-001` §5).

### Retired, with figures

```bash
for c in executor divergence_log mission_id; do
  echo "$c: $(grep -lE "^$c:" missions/MIS-*.md | wc -l) of 106"
done
```

| Field | Figure | Why |
|---|---|---|
| `executor` | **1 appearance, 0 useful** in 106 | Duplicates `assigned_to`. One mission carries it and it is empty. |
| `divergence_log` | **6 appearances, 0 useful** in 106 | Always `null`. What it wanted lives in `## Closure`, as prose. |
| `mission_id` | **58 of 106, identical to `id` in 58/58** | Verified: zero cases where they differ. Two names for one value. |

---

## The body: three sections

**`Scope` · `Acceptance criteria` · `Closure`**

### `Story` → optional, replaced by `Scope`

`Story` is at 80% and `Scope` at 11 organic uses — and the higher number is the
weaker argument. `Story` is at 80% because the template imposed it; `Scope` is
at 11 because people wrote it **without being asked**.

`MIS-109`, the best-executed mission in the repository, **has no `Story`**. For
a small technical mission the ágil form obliges inventing a fictional persona
to say *"take `debt/` out of the glob"*.

`Story` stays available for product missions and anything with a real user.

### `Execution Reality` → `Closure`

**16 uses against 7.** `STD-001` §2.1.1: the practice is the record, the template
is the claim. When they disagree, the practice wins.

What `Execution Reality` asked for is kept **inside** `Closure` — what was done
differently from the plan and why. The heading changes; the content that
produces knowledge does not.

### The five headings, and the instrument that was wrong

The first measurement said **Execution Reality: 20% of closed missions**, which
reads as *"nobody closes their missions"*. **That conclusion was false, and it
would have produced the wrong redesign.**

The control: of the 25 closed missions without `Execution Reality`, **18 record
their closure under a different heading**.

```
16  Closure (2026-08-17)      6  Real execution      5  What shipped
 7  Execution Reality         3  Premisas verificadas
```

**Only 7 of 34 closed missions leave no closure record at all.** The promise was
not being broken — the heading the template proposed was the least used of the
five.

**A reader opening an old mission should know that a different heading does not
mean different content.** The five are historical variants of the same section;
`Closure` is the canonical name from now on.

### `Context` → frontmatter, not a section

Used 12 times as a dated heading (`Context (2026-08-18)`). It is data — when the
premise was last checked — so it becomes an optional field.

---

## `Epistemic value`: optional, and with a method

At **38% in closed missions**. Mandatory in a one-afternoon mission it becomes
filler, and filler trains people to skip sections — the same mechanism as an
allow-list entry that outlives its case.

So: **only when the mission claims it learns something**, and then with a
hypothesis and how it is validated. An epistemic value with no method is an
intention.

## What did not come in

`Mission_Template_v0_2_0.md` and `Definition_of_Done_v0.2.0.md` live in
`numinia-web/docs/`, not in this repo. The DoD has **14 checkboxes**, and they
are the acceptance criteria of a TypeScript codebase: *"`machine/packages/*`: 100%
statement coverage"*, *"`npm run verify` green"*, *"no `any`, no `console.*`,
components ≤ 200 lines"*, *"every interactive element carries `data-metric`"*.

**None of the 14 can be ticked on a documentary mission.** A template whose
boxes nobody can tick trains people to skip boxes, and from there no box means
anything.

What v0.2.0 got right — the hypothesis with a validation method — is kept, as
an optional section rather than a mandatory one.

Note: both files carry a version in the filename, which `STD-001` §9 marks as a
naming violation (`STD-001:1015`). This template does not repeat that pattern: it
stays `missions/TEMPLATE.md`, and git carries its history.

---

## Pending, not debt

### The unfreezing list — what the next template revision must carry

The template is frozen until five missions are written without it changing.
Three items have accumulated against that revision. They are recorded here, in
order of discovery, because a rule found and not written is a rule discovered
again in a month.

**1 · `guild:` is taught in the wrong case.** `TEMPLATE.md:10` reads
`guild: alchemists`, and the canonical form is English capitalised —
`Sentinels`, `Alchemists`, `Exegetes`, `Procurators` (Oracle, 2026-08-25). Five
of the seven variants corrected that day were mine, written from this template
the same afternoon. **Every mission written before the revision reintroduces
it.**

**2 · The vocabulary guard.** A check that a frontmatter field only takes values
from a declared set. It would have caught all seven guild variants **and the
template as their source** — which is why it waits for the same revision rather
than landing first.

**3 · `status` changes in the PR that starts the work.** *(Oracle, 2026-08-25.)*
When the execution branch of a mission opens, its `status` moves to
`in-progress` in that same PR — not after, not in a later tidy-up.

The rule was found by the board contradicting itself: `MIS-115` was being
executed across three PRs while its frontmatter still said `backlog`, so the
board showed one mission in progress when two were. **The board can only tell
the truth if the frontmatter tells it.** A board derived from documents is
exactly as honest as the documents, and no more.

Applied in practice from today; canonised with the other two.

---

**The 106 existing missions are not touched**, not even to normalise them. The
new template governs the ones that come. Normalising 106 documents is a mission
of its own, and it should be weighed against what it would produce: the five
closure headings are already documented above, so a reader is not lost without
it.

### The precondition, written so it can fire

That mission opens **when the template is stable, not before**. Stability is
not a feeling, so it has a falsifiable definition:

```
stable = 5 missions written with this template, with the template
         unchanged across all five
```

`git log --follow --oneline missions/TEMPLATE.md` since the fifth mission was
created must show **no commit**. One edit to the template resets the count to
zero.

**If you are reading this with the condition met and the normalisation mission
still unopened, that is inertia, not a decision** — the same clause that took
`D-032` out of `restricted-oracle` the day its condition was met.

**Counter reset once, on 2026-08-25**, by the v1.1.0 review below. It is the
only reset: from here the template is frozen until the five missions exist.

---

# v1.1.0 — the 2026 state of the art, filtered through what we measured

A report on agent task formats (A2A v1.0, Symphony's skeleton, Atlassian's
agent-ready ticket data, agent boards) was reviewed on 2026-08-25.

**The report is input, not authority.** Our measurement of 106 missions
governs. Two filters applied to everything in it: it must not contradict what
was measured, and its adoption cost must be proportional to small, frequent
missions. The report supplies the reason for that filter itself — Symphony's
500% rested on months of prior repo preparation, and the failure mode it names
is choosing a tool before defining the contract. **The contract is this
document.**

## What came in

**1 · Criteria must be false at the base commit.** A criterion that already
passes before the work starts graduates nothing. Written into the template
beside `Acceptance criteria`, with one good and one bad example. Zero cost.

It is our own rule — *a guard nobody has watched fail is not verified* —
applied to acceptance criteria.

**2 · The brief is not rewritten at closing.** From ClawTrol's separation of
brief and result, adapted to File Over App: no extra table, just the rule that
`Scope` and the criteria are written when the mission opens and are **not
edited afterwards**. The outcome is added in `Closure`.

Editing the brief to match what happened deletes the divergence — and the
divergence is the knowledge. Written in both places it could be broken:
under `Scope`, and in the `Closure` preamble.

**3 · `paths` as an optional field.** Repo paths the executor starts from, so
it does not scan everything. Commented in the optional block, described as a
hint and not a fence.

**4 · Title as verb + object + result.** A one-line guide in the template, not
a rule. *"Retire the /print/ intermediates from the served site"*, not *"Print
pages"* — a noun is not a mission.

**5 · NWOS ↔ A2A state mapping, as a declared table.** **Nothing is renamed.**
`status` is consumed by the Zod schema, the site paints with it, and 106
missions use it. Renaming means touching `content.config.ts` and the whole
corpus, and is forbidden here. The table exists so future interoperability is
an adapter, not a migration.

Source: `a2a-protocol.org/latest/topics/life-of-a-task/`, read 2026-08-25 —
interrupted states `input-required`, `auth-required`; terminal states
`completed`, `canceled`, `rejected`, `failed`.

| NWOS `status` | Missions | A2A `TaskState` | Fit |
|---|---:|---|---|
| `draft` | 4 | *(none)* | **No A2A equivalent.** A2A tasks begin at `submitted`; a task that exists but has not been submitted is outside its model. |
| `backlog` | 40 | `submitted` | Approximate. `submitted` implies an agent has received it; our backlog implies nobody has. |
| `in-progress` | 9 | `working` | Direct. |
| `in-review` | 6 | `input-required` | Direct in mechanism — the task is interrupted pending a human. |
| `done` | 34 | `completed` | Direct, both terminal. |
| `cancelled` | 0 | `canceled` | Direct. Spelling differs (A2A uses one `l`); note it before any adapter is written. |
| `frozen` | 13 | *(none)* | **No A2A equivalent.** Neither terminal nor interrupted: the work is deliberately parked, not waiting on input. A2A's closest, `rejected`, means the agent refused it — not the same thing. |

**Two of our states do not map, and that is a finding, not a gap to fill.**
`draft` and `frozen` cover **17 of 106 missions (16%)**.

> **They do not map because A2A models a task in flight and we model a document
> that exists before and after any execution. That is not a hole — it is the
> difference between an execution protocol and an archive.**

Do not "fix" this mapping by forcing the two states into A2A's vocabulary. A
file-based archive keeps states a message protocol does not need: a document
that has not been submitted to anyone (`draft`) and one deliberately parked
rather than waiting on input (`frozen`). A2A's nearest neighbour for the second,
`rejected`, means *the agent refused it* — a different claim entirely.

### The two details that break an integration at week three

Worth more than the table itself, because both look like nothing until they
cost a day:

**1 · Spelling.** A2A writes `canceled` with one `l`; we write `cancelled`. An
adapter that string-matches will silently drop the state.

**2 · Terminal is not terminal here.** A2A terminal states cannot restart —
*"any subsequent interaction must initiate a new task"*. Our `done` missions
**have** been edited after closing (`STD-001` §2.0: 9 of 33). Under `closed`
thresholds that is form and not substance, but **an adapter must not present a
NWOS `done` as an immutable A2A terminal state**, because it is not one.

## What was rejected, and why

A rejection without a reason gets reopened in a month.

| Rejected | Reason |
|---|---|
| **`exit_criteria` field** | Duplicates `Acceptance criteria`. With the falsifiability rule, the acceptance criteria **are** the exit criteria. One concept, one place. |
| **`max_turns`, `escalate_to`** | Runtime orchestration, not mission document. `requires_oracle_approval` already covers the escalation we have. Revisit when a real orchestrator exists. |
| **`protected` per mission** | Our protection is structural, not per-card: workflows never (`D-017`), thresholds per folder (`STD-001` §2.1), CODEOWNERS when it arrives. A per-mission field invites believing protection is declared on the card — and the card is written by anyone. |
| **An external board as the source of state** (Vibe Kanban, Agent Kanban, Hermes Kanban, Linear) | The board exists: `missions/` is the source of truth and `/missions` is its projection. File Over App. Adopting one now is exactly the error the report opens by naming — tool before contract. **This rejects a board that *holds* state, not a viewer that *reads* it:** a read-only view over `missions/` is another projection of the same source, exactly as `/missions` already is, and is not rejected. The distinction matters because the first replaces the archive and the second cannot. Not work for now — `/missions` is the viewer that exists, and synchrony comes before improving it. |
| **Promotion to standard (`C-00X` / `S-NNN`)** | A standard exists to be adopted by other repos; `STD-003` showed the correct genesis. That day comes **after** the stability criterion is met. A one-day-old standard is not a standard. |

## Known risk, not debt

The report's Symphony data on prompt injection applies here: **missions are
public, and the agent reads them in order to execute them.** That is `F-48` in
our own house.

**No template field fixes this.** A field declaring "this mission is trusted"
is written by whoever writes the mission, which is the same surface. Recorded
as a known risk of this class of system, referencing `F-48`. No debt opened.

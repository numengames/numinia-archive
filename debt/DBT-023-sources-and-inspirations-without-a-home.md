---
id: "DBT-023"
uid: ""
title: "The archive's sources and inspirations have no home since the lore was cleared"
type: documentation
status: active
version: "0.1.1"
created: "2026-10-04T13:00:00+02:00"
updated: "2026-10-05T10:38:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
section: "Knowledge and quality"
tags: [debt, sources, references, culture, lore]
license: "CC-BY-4.0"
severity: low
severity_reason: "nothing the archive states depends on these titles. What is lost while they wait is the trail to where its ideas came from, which a reader can no longer follow"
detected: "2026-10-04T09:00:00+02:00"
visibility: "public"
visibility_reason: "a reading list is meant to be read; whoever wants to know where the house's ideas come from deserves to see it"
opened_by: "ursa"
related: ["PRI-001", "PRI-002", "PRI-004", "PRI-006", "PRI-007"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# DBT-023 — Sources and inspirations without a home

> **Summary:** On 2026-10-04 three company texts left `lore/`, which now holds
> the roleplaying game only. They were older copies of what `PRI-001`,
> `PRI-004` and `PRI-006` say better. One thing in them existed nowhere else:
> the books, papers, videos and authors the house learned from. They are kept
> here until each one has a place.
> **Epistemic:** A principle that does not say where its idea comes from cannot
> be checked against its source, nor read further by whoever wants to.
> **Pragmatic:** Each entry below either becomes a reference in the document it
> grounds or is dropped on purpose. Christian Märtens and María García, who
> compiled the cartography, have the first word.
> **Audience:** Agents · Oracles

---

## 1. The defect

The archive cites no book, paper or talk for most of its own ideas. In
`lore/` there were two lists of them: the *Cultural Cartography of Numen Games*
(version 1.0, 2 June 2025, by Christian Märtens and María García), embedded
as section 9 of the lore's old *Welcome to Numinia*, and the authors named in
the argument of the lore's old *Role structure*. Both files were retired as
duplicates. Of the 23 titles and authors below, only two are cited anywhere
else in the tree: Yu-kai Chou in `STD-023`, and Eleanor Rosch in chapter 3 of
the roleplaying manual.

### 1.1 Inspirational works (cartography §2)

| Title | Kind | Author | Why the cartography lists it |
|---|---|---|---|
| *Reality Is Broken* | essay | Jane McGonigal | games can transform reality: learn, collaborate and build better worlds through play |
| *The Brand Flip* | essay | Marty Neumeier | brands thrive when they empower communities that co-create value |
| *Actionable Gamification* | essay | Yu-kai Chou | a framework for designing motivating experiences |
| *Active Inference* | essay | Karl J. Friston | a cognitive model of how we learn and act; ground for environments that foster adaptation |
| *Who Owns the Future?* | essay | Jaron Lanier | value redistribution in the digital economy |
| *Snow Crash* | novel | Neal Stephenson | the metaverse anticipated, and its risks |
| *Onchain Capital Allocation* | essay | Kevin Owocki | allocating capital through decentralised technologies |

### 1.2 Academic publications (cartography §3)

| Title | Authors | Field | Link |
|---|---|---|---|
| Exploratory preferences explain the human fascination for imaginary worlds in fictional stories | Dubourg, Thouzeau, de Dampierre, Mogoutov & Baumard | evolutionary psychology | <https://www.nature.com/articles/s41598-023-35151-2> |
| Predictors and consequences of intellectual humility | Porter, Elnakouri, Meyers, Shibayama, Jayawickreme & Grossmann | social and cognitive psychology | <https://www.nature.com/articles/s44159-022-00081-9> |
| A distribution-free, Bayesian goodness-of-fit method for assessing similar scientific prediction equations | Chechile & Barch | quantitative cognitive science | <https://www.sciencedirect.com/science/article/pii/S0022249621001000> |
| A step-by-step tutorial on active inference and its application to empirical data | Smith, Friston & Whyte | computational neuroscience | <https://www.sciencedirect.com/science/article/pii/S0022249621000973> |
| A duet for one | Friston & Frith | theoretical neuroscience | <https://www.sciencedirect.com/science/article/pii/S105381001400230X> |

### 1.3 Links and talks (cartography §6)

| Title | Format | Link |
|---|---|---|
| Lean and Agile Adoption with the Laloux Culture Model (Agile for All) | video | <https://www.youtube.com/watch?v=g0Jc5aAJu9g> |
| Computer Scientist Explains One Concept in 5 Levels of Difficulty (zero-knowledge proofs) | video | <https://www.youtube.com/watch?v=fOGdb1CTu5c> |
| Jaron Lanier Fixes the Internet | video | <https://www.youtube.com/watch?v=Np5ri-KktNs> |
| Welcome to the Active Inference Institute | video | <https://www.youtube.com/watch?v=Ei8LHRlmbzI> |
| Olivetti: technology, art and social well-being in one company (thread by J. L. Antúnez) | thread on X | <https://x.com/jlantunez/status/1094189169692295168> |

### 1.4 Authors the role structure was argued from

| Source | What it lent | Where the idea lives now |
|---|---|---|
| The EEM Institute's role system (systems thinking) | role as function; the hammer and the microscope | `PRI-004`, `PRI-007` |
| Eleanor Rosch, basic-level and prototype theory | the three levels of a category; the prototype at the centre | `PRI-004` |
| Umberto Eco, *The Absent Structure* | a unit is defined by what the others are not | `PRI-004` |
| Louis Hjelmslev, *Prolegomena to a Theory of Language* | function as a position in a chain | `PRI-007` |
| Carla Victoria Jara Murillo | "birds do not fly because they grew wings": function before structure | `PRI-007` |
| Charles S. Peirce, the *ground* of a sign | the game as the ground the work points to | `PRI-006` |

The cartography's §4 also named two internal texts, *Organization* (v0.1.0,
2024-05-13) and *Epistemic relationships between Numen Games & Numinia*
(v0.1.0, 2025-01-08), as `.docx` files that were never committed. The second
one's content is `PRI-006` today.

---

## 2. Evidence

```
$ git grep -l -i -E "McGonigal|Neumeier|Friston|Lanier|Stephenson|Owocki|Dubourg|Chechile|Laloux|Olivetti|Rosch|Hjelmslev|Jara Murillo" -- ':!debt' ':!CHANGELOG.md' ':!machine/telemetry'
lore/game/manual/en/03-character-creation.md
lore/game/manual/es/03-creacion-del-personaje.md
$ git grep -l -i "Yu-kai Chou"
standards/STD-023-design-values.md
```

Run on 2026-10-04. The retired texts stay in git history: commit `b538cd2e`
is the last that holds both (*Welcome to Numinia*, section 9, and *Role
structure*, under `lore/world/`).

---

## 3. Closure condition

> **Closes when:** every row of §1 either appears in a References section of
> the archive document it grounds, or is struck from this entry with the reason
> it was dropped.

---

## 4. Cost of leaving it open

Low and slow. The principles stand on their own reasoning, so nothing breaks.
But the house's culture is partly *what it reads*, and a newcomer looking for
it finds a debt instead of a shelf. The longer the list stays here, the more
likely it is read as a dump rather than as a choice.

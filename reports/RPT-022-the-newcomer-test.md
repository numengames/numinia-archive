---
id: "RPT-022"
uid: ""
title: "The canon answers every question it asks itself but one, and half of what a newcomer asks"
type: report
subtype: audit
status: active
version: "1.0.1"
created: "2026-09-28T20:30:00+02:00"
updated: "2026-10-03T19:40:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
section: "Knowledge and quality"
tags: [report, audit, canon, newcomer, uncertainty, baseline]
license: "CC-BY-4.0"
visibility: "public"
scope: "The eleven canons at the commit below, read by two blind readers who had nothing else. Not examined: standards, protocols, the site's navigation, the lore, human readers."
evidence_head: "4975d09"
model: "claude-opus-5-5"
agent: "ursa"
related: ["STD-031", "CAN-009", "CAN-010", "CAN-004"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# RPT-022 — The canon answers every question it asks itself but one, and half of what a newcomer asks

> **Summary:** On 2026-09-28, two readers holding only the eleven canons
> answered ten of the eleven questions the canons set themselves, and five
> of the twelve a newcomer brings; they met nine undefined names and five
> contradictions on the way.
> **Epistemic:** How much uncertainty the canon removes for someone who has
> read nothing else, measured, so a rewrite can be judged by the figure.
> **Pragmatic:** The baseline: run the same test after any change to the
> canon and compare.
> **Audience:** Agents · Oracles

---

## 1. Scope and method

**The instrument.** The eleven files of `canon/` are copied into an empty
folder with the question list in section 4. Two readers — digital agents
with no other file, no web and the instruction not to use prior knowledge —
answer each question independently, in opposite reading orders, citing a
file and a verbatim quote. Each answer carries a verdict: **answered** (the
text says it), **partial** (inferred, scattered or incomplete) or **not
found**. The stricter of the two verdicts counts. Each reader also lists
every place it was surprised or confused.

Two kinds of question. Questions 1–11 are the ones each canon's card
promises to answer: a failure there is **uncertainty**, a promise the canon
does not keep. Questions 12–23 are what a newcomer brings that no card
promises: a failure there is **surprise**, ground the canon leaves open.

**Measured at:** `4975d09`, 2026-09-28.

## 2. Findings

### Measured

| | Answered | Partial | Not found | Score* |
|---|---|---|---|---|
| The canons' own questions (1–11) | 10 | 1 | 0 | 95 % |
| A newcomer's questions (12–23) | 5 | 6 | 1 | 67 % |
| **All 23** | **15** | **7** | **1** | **80 %** |

\* answered = 1, partial = ½, not found = 0.

The two readers agreed on 22 of 23 verdicts; on question 11 one said
answered and one partial.

| # | Question | Verdict | What was missing |
|---|---|---|---|
| 11 | What would you keep if the city closed? | partial | the list of what is yours is given; the promise that it survives a closure only as a design test |
| 12 | Who decides when two people disagree? | partial | the canon settles two *sources*, never two *people*; the council that "decides the week" is never explained |
| 13 | May I sell one of your 3D models? | partial | "given away outright" — selling is never said |
| 14 | Do these documents oblige me now? | partial | every canon says **Binds:** and is `draft`; the canon of the archive says a draft is "quoted against nobody" |
| 15 | What happens if I make a mistake? | **not found** | only harassment has a stated consequence |
| 17 | How do I join? | partial | Nomad and Citizen are defined; the first step is not |
| 18 | Why does an Oracle's word count more? | partial | what an Oracle *is* is said; why its word decides is not, and two canons say it binds the Oracle like anyone |
| 21 | How does the house make money? | partial | four fragments in three canons, no statement |

### Contradictions both readers hit

1. **Document and code.** The archive canon says "the direction decides
   which is wrong" and, further down, "document over code".
   *The direction* is never defined.
2. **The closing sentence.** The ethics canon says every canon ends with
   *leave things better than you found them*; none of the eleven does.
3. **Draft and binding** — question 14 above.
4. **Two eras or three.** The model canon names 1900–1920 and 2000–2020;
   the visual canon names 1920, 2020 and 2120.
5. **Two Architects.** In the roles canon an Architect is a house; in the
   canon of function and structure it is the operator on structure.

### Names used and never defined in canon

NWOS, Token, key (of one's own), the council, guards, the Ouroboros
district, "the old name", the four faction holders (Heirs of Eleusis and
the rest), the rank *Vernacular*. Each appears once or twice; a reader
without the lore stops on it.

### Inferred, not measured

- The canons that answered best — licensing, ownership, money, ethics — are
  the ones rewritten under the canon mould with a case and a test. The two
  of the ground shelf answered their own question but sit in two of the
  five contradictions and carry the one undefined name a newcomer meets
  first in the system's own title, NWOS.
- Questions 12, 14, 15 and 18 are one gap: nothing in canon says how a
  disagreement between people is closed, what a mistake costs, or why the
  last word sits where it sits.
- Two References tables cite neighbours by retired titles (*The house looks
  one way*, *Function and structure*): the rename in one canon did not
  reach the tables of the others.

## 3. What this report did NOT examine

Human readers; the site, where the shelves and the question under each
title may answer some of this before the text does; standards and
protocols, which may hold the missing answers — this test asks whether the
*canon* does. Two readers of one model family are a small sample: the
figures are a baseline to compare against, not a grade.

## 4. The questions

1. Where does work end and play begin?
2. What is all this for — why does Numen Games exist?
3. Who am I here — what is a person made of in Numinia?
4. Why does Numen Games give away what it makes?
5. Why can't the method simply be explained without a story?
6. Does giving everything a new vocabulary make a new company?
7. Why does everything look the way it does?
8. Where does the company actually live — where is its memory?
9. What do we owe whatever we touch?
10. What do you get when you pay Numinia?
11. What would you keep if the city closed tomorrow?
12. Two people here disagree about something. Who decides, and how?
13. Can I take one of your 3D models and sell it in my own shop?
14. Do the documents I am reading actually oblige me right now?
15. What happens to me if I make a mistake?
16. Am I a player or a worker?
17. How do I join and become a citizen — what is the first thing I do?
18. Who are the Oracles, and why does their word count more than mine?
19. Is a digital agent (an AI) my equal here?
20. What happens to my personal data?
21. How does Numen Games make money?
22. What is the difference between Numen Games and Numinia?
23. Can I leave, and what do I take with me?

## References

| Identifier | Title | Why it is cited |
|---|---|---|
| `STD-031` | A canon states | the mould the canons were measured against |
| `CAN-009` | The archive is the organisation | contradictions 1 and 3 |
| `CAN-010` | Leave things better than you found them | contradiction 2 |
| `CAN-004` | You are what you are doing | contradiction 5; questions 17 and 18 |

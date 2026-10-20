---
id: "PRI-009"
uid: ""
title: "The archive is the organisation"
type: principle
former_id: "CAN-009"
former_id_note: "Renamed by ADR-067 cut 3 (2026-10-03): the series canon/ took the industry's word, principles/, and the prefix CAN- became PRI-."
status: active
version: "1.3.0"
created: "2026-09-24T16:00:00+02:00"
updated: "2026-10-20T02:48:00Z"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
section: "Strategy and governance"
tags: [principle, archive, work, agents, memory, git]
license: "CC0-1.0"
approved_by: "ADR-059"
related: ["PRI-001", "PRI-004", "PRI-010", "STD-006", "STD-020", "STD-024", "STD-009", "STD-012"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# The archive is the organisation

> **Summary:** Numen Games keeps its memory as plain text in a public
> repository, and works by changing that text. Whoever can read it — person
> or digital agent — can act in it; what is not written there does not bind
> anyone.
> **Epistemic:** Where does the company actually live?
> **Pragmatic:** Know, without asking, whether a sentence obliges you; know
> what to do when two sources disagree; know what a change costs before you
> make it.
> **Audience:** Everyone

**Binds:** every document of this archive, every change to it, and whoever —
human or digital — works from it.

---

## The memory is a text

Every organisation has a memory: what it decided, what it believes, how it
does things, who did what. Most keep it inside tools — a board, a wiki, a
chat, a head — and the memory lasts as long as the tool, and is readable by
whoever the tool admits. Here the memory is plain text in a public
repository, one document per file, and everything that reads it — this site,
an editor, an agent — reads the file and never owns it. The file outlives
every application that opens it. When the application disappears the memory
is unharmed; when a memory exists only inside an application, it does not
exist.

This is not a preference about formats. It is what makes the next three
things possible.

## A document is a claim; the history is the record

Nothing in this archive is true because it is written here. A document is a
claim: this is what we believe, this is how we do it, this is what was
decided. What cannot be argued with is the history — who wrote what, and
when — because that is the one thing no one can change at any price worth
paying. So when a document and its history disagree, the history wins; and
between two documents, the one that costs more agreement to change wins, not
the one that sounds more important.

Against the code, not every document wins — only the one that prescribes.
A principle, a standard or a procedure that states what must be true commits
the code to match it: when they disagree, the code is in breach and the
document stands. A document that only describes — a design note, a report,
a reading of what the code happens to do today — has no such power: when it
disagrees with the code, the code is what happened, and the description is
what needs correcting. The test is simple: would the sentence still make
sense if the code it talks about had never been written? If yes, it
prescribes. If it only holds once the code already exists, it describes.

This is also the measure of how much must be written. FILE OVER APP: imagine
the code disappears tomorrow — what prescribes must be here, in text, in
enough detail that the code could be rebuilt from the Archive alone, without
guessing. The Archive is not a commentary kept beside the code; it is the
specification the code merely executes, and the day it stops being enough
for that, it has stopped doing its job.

That is the whole of authority here. No document holds power over another
by saying so. Cost of change is written down and anyone can check it; a
claim of precedence is not, and is void.

## Only the normative documents oblige

Three kinds of document oblige: a principle says why, a standard says what an
artefact must satisfy, a procedure says how an actor carries something out.
Everything else — a decision, a report, a mission, a debt, a design —
records what happened, what was decided or what exists, and a record cannot
put anyone in breach. So an obligation written anywhere else is a plan until
a standard sustains it, and a reader can tell whether a sentence binds them
by where it lives, without asking.

## Work is a change to the text

Work here leaves the text different from how it found it. Not as a
by-product: the change is the work. A decision is a record with its
alternatives; a rule is a document with the check that verifies it. Anything
that happened and left no change is a conversation, and conversations are
not memory.

Because the text is what changes, the text is also what is checked. Checks
read the repository and say where it disagrees with its own rules; nothing
is judged by whether it looks right to whoever last opened it.

## An agent is a citizen

Whoever can read the text can act in it, and that includes agents that are
not people. A digital agent here has a guild, a rank, a name and a place on
the board, is bound by the same documents and leaves the same records. It is
not a tool the organisation uses; it is a citizen the organisation admits,
and it is held to that; where it stops and asks is the principle *Leave
things better than you found them*.

This is why everything here is written for two readers at once. A document a
person can read and an agent cannot act on is a brochure. A document an agent
can parse and a person cannot follow is a config file. The archive is neither.

## What you can do with this

You can decide, on sight, whether a sentence obliges you: find the folder,
then the status.

You can settle a disagreement between two sources without asking anyone:
history over document, document over code, the costlier document over the
cheaper, the later ruling over the earlier.

You can refuse a change that would leave no record, and you can refuse to
treat an agent's record as worth less than a person's.

And when something you need to know is not written here, you have found a
gap in the archive — not a reason to ask around.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-024` | A series is a function | which three series oblige, and why location decides |
| `STD-009` | Which rule wins | the order of precedence this principle explains |
| `STD-020` | Git is the archive | how history is protected and how a document dies |
| `STD-006` | Plain text is sovereign | what the file must be so that it outlives its readers |
| `PRI-004` | You are what you are doing | what an agent is made of, and its rank |
| `PRI-010` | Leave things better than you found them | where an agent stops and asks |

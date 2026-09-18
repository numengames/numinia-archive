---
id: "STD-026"
uid: ""
title: "Operative vocabulary"
type: documentation
subtype: register
status: draft
version: "0.1.0"
created: "2026-09-18T12:00:00+02:00"
updated: "2026-09-18T12:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
threshold: governed
license: "CC0-1.0"
tags: [standard, register, vocabulary, glossary, onboarding]
related: ["CAN-002", "CAN-005", "CAN-006", "STD-011"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Operative vocabulary

> **Summary:** The twenty-five terms Numen Games works with, in plain
> words: what each is, what knowing it clears up, what it lets you do here.
> Not the game's words — those live in `lore/codex/glosario.md`, reserved,
> in the manual's language. This register grows only by decision, never
> past the essential.

## Network and ownership

| Term | What it is | What it clears up | What it enables here |
|---|---|---|---|
| **Web3** | The layer of the internet where ownership and identity are verified by cryptography on open networks, instead of by a company that keeps your account. | *Using* a service versus *owning* something inside it — the distinction that structures all of Numinia. | Why a good or a rank can be genuinely yours: portable, verifiable, not confiscable by the provider. Also: the ownership internet. |
| **Blockchain** | A shared, ordered record kept by many machines at once, where what is written cannot be altered unnoticed. | "Who guarantees this without a central authority?" — the guarantee is mathematical and collective, not institutional. | Where proofs of ownership will live (loot, seals); today it names the destination, not the present. Also: distributed ledger. |
| **Wallet** | A person's cryptographic key ring: a key pair used to sign, prove identity and hold what is theirs. It does not "contain" money; it contains the ability to prove. | Identity from account: an account is granted (and revoked) by a service; a wallet is yours even if the service disappears. | The door to the platform: proving you hold an address is all Numinia asks in order to recognise you. |
| **NFT** | An entry on a blockchain that points at a digital object and says "this particular unit belongs to this wallet". | What is scarce is not the file (copyable) but the *title* over it. | The intended mechanism for loot and season rewards to be real possessions of citizens. |
| **Open licence (CC0)** | A legal declaration that gives a work to the world: CC0 waives every right that can be waived and leaves it in the public domain. | "May I use this?" answered with an unconditional yes — legal uncertainty is the biggest invisible brake on creation. | The whole public catalogue is CC0: download it, remix it, sell it. *Remix* is a pillar of the house (`CAN-005`). |
| **Digital sovereignty** | A person's capacity to control their identity, data and digital goods without asking an intermediary. | Names the problem Web3 tries to solve and the test every feature is held to: does this empower, or create dependence? | Concrete platform decisions: exportable character sheet, seals you carry, sessions issued by us and not by a vendor. |
| **Digital divide** | The distance between those who use technology fluently and those left out — by access, skills or hostile design. | Numinia's bridge mission: not a dapp for converts, a staircase from Web2. | Everything must work without a wallet, without JavaScript and without knowing what a blockchain is: the entry level is always human. |
| **Progressive identity** | An access model where each person enters where they can — guest, email, social login, passkey or wallet — and raises their sovereignty level when they choose. | Undoes the false "Web2 or Web3" choice: they are steps on one path. | The design of the platform's login: email or social to start, your own wallet when you are ready. |

## Data and permanence

| Term | What it is | What it clears up | What it enables here |
|---|---|---|---|
| **File over app** | The principle that data must live in readable, portable files, not locked inside an application that can die or change owner. | Inverts the usual question: not "which app do I use?" but "whose is the file when the app is gone?". | Rules the whole architecture: catalogue in JSON, character sheet in Markdown, state in git — everything survives the platform. |
| **Data dignity** | The stance that a person's data deserves the treatment of their property: consent, portability, minimal capture. | Digital *ownership* from digital *rental* — the house's seed phrase: "digital ownership, not digital rental". | Hard rules: analytics without PII, telemetry without identity, nothing personal on a server unless the citizen asks. |
| **Decentralisation** | Spreading a function — storing, deciding, verifying — across many participants so no single point can fail, censor or capture the system. | A spectrum, not a switch: ask *what* is decentralised and *how much*, instead of trusting labels. | The storage roadmap: from the convenient CDN to permanent storage, each step removes a single point. |
| **Permanent storage** | Keeping files on networks built to last decades without anyone paying the server each month — Arweave writes once for good; IPFS addresses by content, not by location. | "What if the company closes?" — permanence stops depending on a monthly invoice. | The last link of the goods' storage chain (Arweave → R2 → IPFS → GitHub): what Numinia publishes must not be able to disappear. |
| **Interoperability** | Things working outside the place they were born: an avatar that serves in many worlds, a file any tool opens. | The hidden cost of the proprietary format: every silo is a border for your goods. | Why Numinia publishes in open formats (VRM, glTF, Markdown, JSON): its goods travel. |
| **Open source** | Software whose code can be read, used, modified and redistributed — trust is audited, not promised. | What Numinia is made of (Astro, Three.js, Geist, Phosphor…) and why it matters: no black boxes in the foundations. | The *Remix* pillar: copy it and make it better. And an obligation: the licence gate watches what comes in (`CAN-005`). |

## Agents and learning

| Term | What it is | What it clears up | What it enables here |
|---|---|---|---|
| **Digital agent** | A software system — today, typically an AI — that perceives, decides and acts to fulfil assignments with real autonomy. | Replaces "which tool do I use?" with "who do I work with?": the agent is a collaborator, not a command. | How Numinia is built: digital agents with missions, gates that verify their work, and rules both obey. |
| **Biological agent** | A person, named with the same noun as their digital colleagues — deliberately: in this system both receive missions, acceptance criteria and responsibility. | Equalises the working frame without equalising nature: same collaboration rules, different authority (decisions are human). | Processes written once — missions, criteria, protocols — valid for any mix of team. Related: hybrid agent (a mixed team). |
| **Gamification** | Using the structures that make games work — clear goals, visible progress, reward, narrative — in activities that are not games. | Understood well it is not "adding points": it is motivation design. Understood badly, it is manipulation with confetti. | The field of Numinia's prototype faction and the product's method: the whole city is a play layer over learning and making. |
| **Playful learning** | The idea that humans learn by playing — not as a pedagogical trick, but because play is the natural way to explore the unknown without fear of error. | Reorders priorities: first the experience that invites exploration, then the content. | The *Learn* pillar and the reason for adventures, riddles and the graphic-adventure heritage in the design. |
| **Systems thinking** | Seeing things as systems: parts that affect each other in loops, where structure explains behaviour better than intentions. | Look for the cause in the relations, not in the culprits — a repeated failure is a structure, not an oversight. | The frame of the archive: each document declares what it observes, what it regulates and what it is coupled to (`CAN-006`). |
| **Active inference** | A theory of the brain (Friston): every organism survives by minimising surprise — it perceives to update its model of the world and acts so the world matches what it expects. | A common language for perception, action and learning — and for why good systems keep their maps current. | Two house rules: documents exist to align the model of the world (epistemic value) with action (pragmatic value); design minimises surprise where the user acts. |

## Worlds and digital bodies

| Term | What it is | What it clears up | What it enables here |
|---|---|---|---|
| **Virtual reality (VR)** | Technology that fully replaces your visual and sound environment with a digital one, usually through a headset. | The immersive end of the spectrum: total presence, a fully built world. | The horizon: Numinia's worlds visitable with a headset, not only a screen. |
| **Extended reality (XR)** | The umbrella term for the whole spectrum mixing the physical and the digital: VR (all digital), AR (digital over physical) and everything between. | Avoids marrying a device: design for the spectrum, not for the gadget of the season. | Why Numinia publishes worlds on web standards (WebXR-ready): the same city must be entered by browser, phone or headset. |
| **Metaverse** | The idea of persistent, shared digital worlds where people have presence, ownership and continuity — past the hype, an architectural goal: your things and your identity go with you between worlds. | Separated from marketing, the useful question remains: what persists, and what is yours, when you leave? | Numinia practises it small: portals to worlds (oncyber, Hyperfy), portable avatars, identity that crosses. |
| **Avatar** | A person's digital body: the form that represents them and with which they act inside a world. | Not decoration: embodied identity — it changes how you are seen and how you take part. | The catalogue's avatars are CC0 and portable: your digital body is yours and travels with you. |
| **VRM** | An open format (a Japanese standard over glTF) for humanoid 3D avatars: one file with the model, its bones and its usage permissions, working in any compatible application. | Interoperability made format: "one avatar for every world" is engineering, not promise. | The format of Numinia's avatars — the platform's viewer renders them and any compatible world accepts them. Related: glTF/GLB. |

Game-world terms (the Veil, the Threshold, guilds, seals…) are the
manual's and live in `lore/codex/glosario.md`; their English names come
from `CAN-003` and `CAN-004`, and code uses those names in lower case.

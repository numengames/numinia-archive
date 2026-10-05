---
id: "OPS-022"
uid: ""
title: "The house's hours"
type: documentation
subtype: register
status: draft
version: "0.1.0"
created: "2026-10-05T10:40:00+02:00"
updated: "2026-10-05T10:40:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Operations"
tags: [operations, hours, time-zone, holidays, send-windows, dates, RFC-3339]
license: "CC-BY-4.0"
related: ["STD-004", "OPS-018", "PRO-028", "PRO-029", "PRO-036"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# The house's hours

> **Summary:** The house keeps Madrid time. People work 37 hours a week;
> digital agents work at any hour inside the house. What goes out to a
> person waits for the send windows. A date whose source gives no hour
> takes the hour written here.
> **Epistemic:** When does the house work, and at what hour does it act?
> **Pragmatic:** Plan a send, count a wait, or write a date with its hour.
> **Audience:** Agents · Oracles

**Binds:** nothing while a draft; `STD-004` sends here for a missing hour.

## The two clocks

| Clock | Who | When | Source |
|---|---|---|---|
| Office hours | Biological agents: the people of the house | The office hours below, outside holidays | ET art. 34 |
| Any hour | Digital agents, on internal work | 24/7 | the house's ruling, 2026-10-04 |

What goes out to a person outside the house follows the send windows,
whoever prepares it. A request that waits on a person, such as an approval,
counts from the next office opening. No agent messages a person of the house
outside office hours except for an incident (`PRO-036`, `PRO-025`): the
right to digital disconnection, LOPDGDD art. 88.

## Office hours

All times are Europe/Madrid: +01:00 in winter, +02:00 from the last Sunday
of March to the last Sunday of October.

| Days | Hours | Per day | Source |
|---|---|---|---|
| Monday to Thursday | 09:00–18:00, lunch 14:00–15:00 | 8 h | the house's ruling, 2026-10-05 |
| Friday | 09:00–14:00, no lunch | 5 h | the house's ruling, 2026-10-05 |
| Week | | 37 h | — |

The legal maximum is 40 h a week on annual average (ET art. 34.1); the
37.5 h bill was returned by Congress on 10 September 2025. Collective
agreements average about 1,750 h a year, which the house reads as about
37.8 h a week (the press divides it to 38.3 h). Every working day is
recorded, start and end (ET art. 34.9, RD-ley 8/2019); 12 hours of rest
separate two days, and an ordinary day is at most 9 hours (ET art. 34.3).
There is no summer schedule.

## Holidays

| Kind | 2026 | Source |
|---|---|---|
| National and Comunidad de Madrid | the annex for Madrid | BOE-A-2025-21667 |
| Local, Las Rozas de Madrid | 4 May, 29 September | BOCM, December 2025 (COAM's list) |

## Send windows

| What | When | Source |
|---|---|---|
| First sales email | Tuesday to Thursday, 10:00 in the recipient's local time | Belkins 2025; Mailchimp |
| Follow-up | three working days later, 10:00 | Belkins 2025 |
| Never | after 18:00 in Spain, on Friday after 14:00, at a weekend or holiday | Mailjet 2024; the office hours |

Belkins read 7.5 million cold emails: 08:00–12:00 had the best reply rate
(0.54 %) and meeting rate (0.4 %, against 0.1 % after noon); Wednesday and
Thursday were the best days (0.48 %). Open rates mean little since Apple
Mail Privacy Protection.

## The hour a date takes when its source gives none

| Date | Hour | Source |
|---|---|---|
| Our own deadline, "until day X" (a proposal's validity) | 23:59 | Ley 39/2015 art. 30: a term in days ends with its last day |
| A call's day, when its notice gives no hour | 23:59, said in the record's notes | the same |
| A scheduled review | 10:00 | the house's ruling |
| A day something happened, whose hour nobody recorded | 09:00, the office opening | declared, not guessed |
| A contract or service start, with no hour in its source | 09:00 | the house's ruling |

Midnight is nobody's hour: only a notice that writes it gives it.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-004` | The header | the rule on dates that sends here |
| `OPS-018` | The house's card | what a call is read against |
| `PRO-028` | Qualifying an opportunity | the first email and its follow-up |
| `PRO-029` | Making a proposal | a proposal's validity, until 23:59 |
| `PRO-036` | Handling a security weakness | an incident wakes a person |
| `PRO-025` | Handling a personal data breach | an incident wakes a person |
| — | [ET art. 34](https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a34) | hours, rest, recording |
| — | [RD-ley 8/2019](https://www.boe.es/buscar/act.php?id=BOE-A-2019-3481) | daily time recording |
| — | [LOPDGDD art. 88](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a88) | digital disconnection |
| — | [Ley 39/2015 art. 30](https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a30) | how days are counted |
| — | [BOE-A-2025-21667](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-21667) | 2026 holidays |
| — | [COAM, 2026 local holidays](https://www.coam.org/wp-content/uploads/2025/12/Calend-F-Locales-2026.v3.pdf) | Las Rozas de Madrid |
| — | [RTVE, 10 September 2025](https://www.rtve.es/noticias/20250910/pp-vox-junts-jornada-laboral/16724242.shtml) | the 37.5 h bill returned |
| — | [Europa Press, November 2025](https://www.europapress.es/economia/laboral-00346/noticia-subida-salarial-convenio-fue-35-octubre-tercer-mes-consecutivo-mas-ipc-20251107173535.html) | agreed hours a year |
| — | [Belkins 2025](https://belkins.io/blog/cold-email-response-rates) | reply rates by hour and day |
| — | [Mailchimp](https://mailchimp.com/es/resources/insights-from-mailchimps-send-time-optimization-system/) | 10:00 recipient time |
| — | [Mailjet 2024](https://www.mailjet.com/es/blog/emailing/mejor-momento-enviar-newsletters/) | no email as dinner nears |

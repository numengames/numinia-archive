---
id: "DBT-022"
uid: ""
title: "Legal debts and questions for counsel"
type: documentation
status: active
version: "0.3.6"
created: "2026-09-29T18:00:00+02:00"
updated: "2026-10-05T10:38:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Procurators"
section: "Legal and compliance"
tags: [debt, legal, gdpr, lssi, consumer-law, cookies, intellectual-property, open-books]
license: "CC-BY-4.0"
severity: high
severity_reason: "the four sites publish legal texts that do not describe what the sites do, and numinia.com is about to sell to consumers without consumer terms"
detected: "2026-09-29T15:20:00+02:00"
visibility: "restricted-oracle"
visibility_reason: "working list for the Oracle and the company's lawyers (ATH21); it names gaps a reader could mistake for commitments"
opened_by: "ursa"
related: ["DES-017", "LEG-001", "LEG-002", "LEG-003", "LEG-004", "PRO-021"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# DBT-022 — Legal debts and questions for counsel

> **Summary:** Every known gap between what the four sites do and what their legal texts say, and every question only a lawyer or the company can answer.
> **Epistemic:** Until these close, the texts are honest drafts, not reviewed law.
> **Pragmatic:** Send section 5 to ATH21; fix section 1 by pull request; strike each line when closed.
> **Audience:** Oracles · Counsel

---

## 1. The defect

Measured on 2026-09-29 from the four repositories and the live pages. Each line
is a debt (something we know is wrong) or a question (something we cannot
decide alone). Items marked **ours** are fixed by pull request; items marked
**counsel** go to ATH21; items marked **company** need a document or a
decision from Numen Games S.L.

### 1.1 Company facts

| # | Item | Who |
|---|---|---|
| ~~1~~ | ~~The Mercantile Registry entry (registry, volume, folio, sheet, entry) is missing from the legal notice. LSSI art. 10 requires it. The Oracle has it and will provide it.~~ — closed by the legal-notice update (LEG-004 0.2.0): volume 46518, folio 130, sheet M-816810, entry 1 | company |
| ~~2~~ | ~~The legal notice gives the address as "Calle Chile 10, Las Rozas, Madrid". Confirm it is the registered address and add the postal code.~~ — closed by LEG-004 0.2.0: Calle Chile 10, 28290 Las Rozas de Madrid | company |
| 3 | There is no signed assignment of rights from the manual's authors (Christian Märtens 80 %, Pablo Fernández-Maquieira 20 %) to Numen Games S.L., yet the company declares itself rights holder and released the lore under CC0. Draft and sign the assignment; file it with the signed contracts. | company · counsel |
| ~~3b~~ | ~~The retired `numinia-lore` repository is still public and its README says the lore is "all rights reserved", while the archive and the Codex publish the same lore as CC0. Archive or delete the old repository, or add a line pointing at the current licence.~~ — closed 2026-10-02: nothing reads it any more (checked across the fifteen repositories of the organisation); the Oracle deletes it, and the pull request that removes every reference to it closes this row. A full copy with its history is kept off-repository. | company |

### 1.2 International transfers (the "nothing leaves the EEA" rule)

The privacy policy said Numen transfers no personal data outside the EEA. The
code says otherwise; the text now says what happens (LEG-001 2.1.0). Whether
to keep these providers or replace them is a decision, not a wording.

| # | Provider | What leaves | Where | Safeguard found | Who |
|---|---|---|---|---|---|
| 4 | Cloudflare (all four sites) | IP address, user agent and path of every request, in the hosting logs | United States, among others | EU-U.S. Data Privacy Framework and standard contractual clauses, per its DPA | counsel |
| 5 | thirdweb, Non-Fungible Labs Inc. (numinia.com sign-in) | email or Google account, wallet address, device key shares | United States — its privacy policy says so and names no safeguard | none found; ask for its DPA | counsel · company |
| 6 | GitHub (nwos.numen.games) | the company name and the responsible email typed in the workspace form are written into a private repository | United States | Data Privacy Framework, active | counsel |
| 7 | Anthropic (nwos.numen.games) | the company name, to research and draft the workspace documents | United States | not verified | counsel |
| 8 | Microsoft (legal@numengames.com mailbox) | every email sent to us | tenant region not verified | EU Data Boundary if the tenant is European | company |

### 1.3 Consumer sales on numinia.com

The Oracle confirmed on 2026-09-29 that numinia.com will sell to consumers.
The published terms (LEG-002) were written for companies buying services on
numen.games and say so. See also DES-017.

| # | Item | Who |
|---|---|---|
| 9 | Consumer terms of sale for numinia.com: who sells, what, price with VAT, delivery, the legal guarantee of conformity for digital content, complaints. None exist. | counsel |
| 10 | Right of withdrawal for digital content: the checkout needs the buyer's express consent and acknowledgement that the right is lost on delivery, and a confirmation on a durable medium. | counsel |
| 11 | LEG-002 §14 submits disputes exclusively to the courts of Madrid. That clause cannot bind a consumer. Decide the clause for consumer terms. | counsel |
| 12 | Language: Spanish consumer law expects contract information in Spanish. The masters are in English. Decide which language is authoritative and whether a Spanish version must be the binding one for Spanish buyers. | counsel |
| 13 | LEG-002 §5.3 forbids any bot or scraper. That contradicts the open licences of numinia.org (CC0, CC-BY, MIT) and legitimate indexing. Narrow it to abuse. | counsel |
| 14 | Terms of use specific to numinia.org (the archive, open by licence) and to the Codex on numinia.com (public reading, CC0 lore): today both show the numen.games B2B terms. | ours · counsel |
| 15 | The sign-in checkbox on numinia.com accepts "the Terms and the Privacy Policy" together. Accepting a privacy policy is not a legal act; confirm the wording of the checkbox. | counsel |
| 16 | Age: services are for people aged 18 or over, as a condition of contract. Nothing asks the buyer to confirm it. Decide whether a declaration at checkout is enough. | counsel |

### 1.4 Privacy policy (LEG-001)

| # | Item | Who |
|---|---|---|
| 17 | Purposes are numbered 1, 2, 7, 8 in the source; 3–6 are missing. Renumbered 1–4 in 2.1.0 without adding content. Confirm nothing was lost. | counsel |
| 18 | Purpose 2 (promotional communications) describes a service that does not exist today. Keep, rewrite or remove. | counsel |
| 19 | Retention: only the hosting logs (days) and the session cookie (one hour) have a measured period. Sign-in data held by thirdweb and emails have none. | counsel · company |
| 20 | No record of processing activities (GDPR art. 30) and no data processing agreement on file with any provider in §1.2. | company · counsel |
| 21 | The Spanish original of the policy (v1.1.0) is in git history only. Confirm the English master against the lawyers' original. | counsel |

### 1.5 Cookies and consent

| # | Item | Who |
|---|---|---|
| ~~22~~ | ~~numinia.com's /legal/cookies page is a draft that says the site stores nothing, while the site sets three cookies and nine local-storage keys. The measured policy (LEG-003) is published on numinia.org only.~~ — closed by numinia-web #64 (the measured LEG-003 on numinia.com) | ours |
| ~~23~~ | ~~numinia.com's banner accepts the Terms and the Cookie Policy with one button and offers no Reject. The AEPD guide asks for Accept and Reject at the same level, and a separate act for each purpose. Replace it with a consent manager (vanilla-cookieconsent, MIT).~~ — closed by numinia-web #64 (vanilla-cookieconsent, Accept and Reject equal) | ours |
| 24 | Today no site stores anything that needs prior consent: preferences set by the visitor, the session and the sign-in challenge are exempt, and numinia.com's click counts never leave the browser. The day counts are sent to a server, consent becomes mandatory. Confirm this reading. | counsel |
| 25 | The thirdweb sign-in widget writes its own keys to local storage (`thirdweb:*`, `walletToken-*`, `thirdwebEwsWalletUserId-*`, `a-*`). Named in LEG-003 2.0.0 as part of the sign-in; confirm they are exempt. | counsel |

### 1.6 The published pages

| # | Item | Who |
|---|---|---|
| ~~26~~ | ~~numinia.com and numen.games publish copies of LEG-001/002 that still show review notes, "see FLAG-2 in the frontmatter" and "Audience: Oracle". Re-copy from the cleaned masters.~~ — closed by numinia-web #64 and numengames-web #54 | ours |
| ~~27~~ | ~~nwos.numen.games links to numen.games' texts; its workspace form collects data the numen.games texts do not describe. It needs its own legal pages.~~ — closed by nwos-deploy #67 | ours |
| ~~28~~ | ~~No site had a legal notice (LSSI art. 10). LEG-004 is written; every footer must link it.~~ — closed by numinia-archive #572, numengames-web #54, nwos-deploy #67, numinia-web #64 | ours |
| ~~29~~ | ~~numinia.com's legal notice page is a draft with "[PENDING: legal name, tax ID…]".~~ — closed by numinia-web #64 | ours |
| ~~30~~ | ~~The Codex (numinia.com/lap/codex) has no legal links: its shell hides the site footer.~~ — closed by numinia-web #64 (legal line at the foot of the Codex) | ours |
| 31 | Digital Services Act: numinia.com will host community content. A contact point, a notice-and-action form and statements of reasons are required (DES-017). | counsel |
| 32 | AI Act art. 50: nwos.numen.games generates documents with an AI model for the visitor's company. Say so where the visitor sees the result. | counsel |
| 33 | numinia.com's cookie notice in Japanese and Korean shows the English text, and the Brazilian Portuguese text has not been read by a native speaker. Machine translation is not a legal text: have both reviewed by people. Listed as pending on numinia.com/updates. | company |
| 34 | The privacy policy (LEG-001 §1) still gives the postal address without the postal code. Align it with LEG-004 0.2.0 in its next revision. | ours |

### 1.7 Open books: publishing what we pay to people

The Oracle wants the real ledger on numinia.org's open books, starting with
the input VAT book for FY2025 (kept out of this repository until these rows
close). A company supplier's name and price may be published. A natural
person's name next to what they invoiced is personal data (GDPR art. 4.1):
freelancers, sole traders and lawyers who invoice in their own name. Until a
row below closes, such a supplier appears by role only, without name or
initials.

| # | Item | Who |
|---|---|---|
| 35 | Consent from every natural person who invoiced Numen Games in 2025, before their name appears: one of them (Christian Märtens) has already agreed. Collect a short signed consent: name, role and amounts invoiced, published on numinia.org. | company |
| 36 | A transparency clause in every new contract with a freelancer, supplier or collaborator: the amounts invoiced are published with the name and the role; whoever objects appears by role only. Draft the clause. | counsel |
| 37 | Legal basis for publishing what a natural person invoiced: consent (art. 6.1.a) or legitimate interest (art. 6.1.f); whether role-only is enough while consent is missing; what happens to published history when consent is withdrawn. | counsel |
| 38 | Payroll and social security are not in the input VAT book and are missing from the ledger. In a team this small an aggregate reveals individual salaries: decide the level at which staff costs are published. Interim, from 2026-10-01: one people block a quarter (payroll, freelancers, director), employer cost only, on the verbal agreement of the people in it (`STD-036` LED-006); written consent to replace it: a one-page consent text (what is published, the right to withdraw) is drafted, outside the repository, for each person to sign. | counsel · company |
| 39 | Signed contracts may make a price confidential (negotiated fees, studio agreements). Check every contract before its amounts are published. | company |

## 2. Evidence

```
$ grep -rhoE "(localStorage|sessionStorage)\.(get|set)Item\('[^']+" numinia-web/apps/store/src | sort -u
numinia-codex-marca numinia-codex-modo numinia-codex-tam numinia-lang
numinia-lap-hidden numinia-lap-nav numinia-modo   (+ numinia-lap-personaje,
numinia-codex-ritmo held in constants)
$ curl -s https://numinia.com/legal/cookies/ | grep -o "uses no cookies and no local storage"
uses no cookies and no local storage
$ curl -s https://numinia.org/legal/privacy | grep -o "see FLAG-2 in the frontmatter"
see FLAG-2 in the frontmatter
$ curl -sL thirdweb.com/privacy-policy | grep -o "transferred to and processed in the United States"
transferred to and processed in the United States
$ grep -n "inAppWallet\|GITHUB_TOKEN\|Anthropic" numinia-web/.../LoginSpike.tsx nwos-deploy/src/pages/api/registro.ts
inAppWallet({ auth: { options: ['google', 'email', 'passkey'] } })
new Anthropic(...) · octokit ... RESPONSIBLE_EMAIL
```

## 3. Closure condition

> **Closes when:** every row above is struck through with the pull request or
> the document that closed it, and ATH21 has signed off sections 1.2 to 1.5.

## 4. Cost of leaving it open

A public text that says something false about personal data is itself a breach
of the duty to inform (GDPR arts. 12–13), whatever the processing. Selling to
consumers without terms leaves every sale open to a refund after use and the
jurisdiction clause void. The rights assignment is the one that cannot be fixed
later without the authors: sign it while everyone agrees.

## 5. The letter to counsel

The questions marked **counsel** above, grouped by subject and written in
plain Spanish for ATH21. The text below is the source; the Word file next to
this record, [`DBT-022-questions-for-counsel.docx`](DBT-022-questions-for-counsel.docx),
is the same text laid out to send from legal@numengames.com. Change the text
here and regenerate the file; never edit the file alone.

**De:** Numen Games S.L. (CIF B70735949) · legal@numengames.com

**Fecha:** 30 de septiembre de 2026

### Para qué es este documento

Numen Games S.L. publica cuatro webs: numen.games (la empresa), numinia.com (el juego, su manual —el Códex— y su tienda), numinia.org (el archivo abierto del sistema) y nwos.numen.games (un servicio que crea el archivo documental de otra organización). Las cuatro comparten cuatro textos legales: aviso legal, política de privacidad, política de cookies y términos y condiciones.

Hemos revisado esos textos contra lo que las webs hacen de verdad y los hemos corregido donde decían algo falso. Lo que queda son decisiones que no podemos tomar solos. Os las enviamos agrupadas por tema. Cada pregunta explica qué hacemos hoy y qué necesitamos que nos digáis. El número entre corchetes, por ejemplo [#4], es el de nuestra lista interna, por si nos contestáis citándolo.

Los textos vigentes están publicados en cualquiera de las cuatro webs, en /legal/notice, /legal/privacy, /legal/cookies y /legal/terms (en numinia.com el aviso legal está en /legal/legal-notice). Están en inglés. Los términos y condiciones (versión 1.0.1) mantienen vuestro texto original; solo hemos corregido el correo de contacto.

### Lo que más nos urge

- Las condiciones de venta a consumidores de numinia.com (bloque 2): vamos a empezar a vender y hoy no existen.
- Las transferencias fuera del Espacio Económico Europeo (bloque 1): la política de privacidad decía que no había ninguna, y sí las hay.
- La cesión de derechos de los autores del manual (bloque 7): es la única que no se puede arreglar después sin ellos.

### 1. Datos que salen del Espacio Económico Europeo

La política de privacidad anterior decía que Numen no transfiere datos personales fuera del EEE. No era cierto. La versión 2.1.0 ya nombra a cada proveedor y lo que se transfiere. Queremos saber si lo que decimos es suficiente, y si con estos proveedores cumplimos o debemos cambiarlos.

| # | Proveedor | Qué sale | Adónde y con qué garantía |
|---|---|---|---|
| [#4] | Cloudflare (aloja las cuatro webs) | Dirección IP, navegador y página visitada en cada visita, en los registros del servidor | EE. UU., entre otros. Marco de Privacidad UE-EE. UU. y cláusulas contractuales tipo, según su DPA |
| [#5] | thirdweb (Non-Fungible Labs Inc.), inicio de sesión en numinia.com | Correo o cuenta de Google, dirección del monedero, fragmentos de la clave del dispositivo | EE. UU. Su política lo dice y no nombra ninguna garantía. No tenemos su DPA |
| [#6] | GitHub, en nwos.numen.games | Nombre de la empresa y correo del responsable que el visitante escribe en el formulario; se guardan en un repositorio privado | EE. UU. Marco de Privacidad, activo |
| [#7] | Anthropic, en nwos.numen.games | Nombre de la empresa, para investigarla y redactar los documentos del archivo | EE. UU. Garantía no verificada |
| [#8] | Microsoft, buzón legal@numengames.com | Todo correo que se nos envía | Región del buzón sin confirmar |

**Preguntas:**

- ¿Basta con nombrar cada transferencia y su garantía en la política de privacidad, o hace falta algo más (por ejemplo, un anexo con las cláusulas)?
- Para thirdweb, sin garantía conocida: ¿podemos seguir usándolo mientras pedimos su DPA, o debemos retirarlo hasta tenerlo?
- Para Anthropic: ¿qué tendríamos que comprobar en sus condiciones para que la transferencia sea válida?
- Si el buzón de Microsoft está en EE. UU., ¿qué cambia?

### 2. Venta a consumidores en numinia.com

numinia.com va a vender contenido digital (objetos del juego) a particulares. Los términos publicados (vuestro texto, versión 1.0.1) están escritos para empresas que contratan servicios en numen.games, y así lo dicen. No hay condiciones de venta para consumidores.

**Preguntas:**

- [#9] ¿Podéis redactar unas condiciones de venta para consumidores? Deben cubrir quién vende, qué se vende, precio con IVA, entrega, garantía legal de conformidad del contenido digital y reclamaciones.
- [#10] Derecho de desistimiento de 14 días: con contenido digital se pierde al entregarlo si el comprador lo consiente expresamente y reconoce que lo pierde. ¿Qué texto exacto debe llevar la casilla del pago, y cómo enviamos la confirmación en soporte duradero (¿basta un correo?)?
- [#11] Los términos actuales (§14) someten las disputas a los juzgados de Madrid. Eso no puede obligar a un consumidor. ¿Qué cláusula ponemos para consumidores? ¿Y la de §14 sigue sirviendo para empresas?
- [#12] Idioma: nuestros textos maestros están en inglés. ¿Tiene que haber una versión en español que sea la vinculante para compradores españoles? ¿Y para compradores de otros países de la UE?
- [#16] Edad: los servicios son para mayores de 18 años. Hoy nada pide al comprador que lo confirme. ¿Basta una declaración en el pago?
- [#15] Al iniciar sesión, una casilla dice que se aceptan «los Términos y la Política de privacidad». Aceptar una política de privacidad no tiene sentido jurídico; en nwos.numen.games ya decimos «acepto los Términos y he leído la Política de privacidad». ¿Os vale esa fórmula para numinia.com?
- [#13] Los términos (§5.3) prohíben cualquier bot o rastreador. Eso choca con las licencias abiertas de numinia.org (CC0, CC BY, MIT) y con los buscadores. ¿Podemos limitarlo al uso abusivo?

### 3. Términos de uso de numinia.org y del Códex

numinia.org publica el archivo con licencias abiertas, fichero a fichero. El Códex de numinia.com publica el manual del juego en dominio público (CC0). Hoy ambos enlazan los términos para empresas de numen.games, que no les corresponden. El nuevo aviso legal (versión 0.2.0) explica qué se puede hacer con lo publicado según su licencia.

- [#14] ¿Basta con el aviso legal para estas dos webs, o necesitan sus propios términos de uso?

### 4. Política de privacidad

- [#17] En vuestro original las finalidades iban numeradas 1, 2, 7 y 8; faltaban la 3 a la 6. Las renumeramos 1 a 4 sin añadir contenido. ¿Se perdió algo?
- [#18] La finalidad 2 (comunicaciones comerciales) describe un servicio que hoy no existe. ¿La mantenemos, la reescribimos o la quitamos?
- [#19] Plazos de conservación: solo tenemos medidos los registros del servidor (días) y la cookie de sesión (una hora). Los datos de inicio de sesión que guarda thirdweb y los correos no tienen plazo. ¿Qué plazos debemos fijar?
- [#20] No tenemos registro de actividades de tratamiento (art. 30 RGPD) ni contratos de encargado de tratamiento con ningún proveedor del bloque 1. ¿Nos ayudáis a prepararlos? ¿Nos aplica la excepción de menos de 250 empleados?
- [#21] El original en español de la política (v1.1.0) solo existe en el historial. ¿Podéis confirmar que la versión en inglés actual respeta vuestro original?

### 5. Cookies

Las cuatro webs muestran ya un aviso de cookies con «Aceptar todo» y «Rechazar todo» del mismo tamaño, uno junto al otro, como pide la guía de la AEPD. La política de cookies (versión 2.1.0) lista, clave por clave, todo lo que cada web guarda en el navegador.

- [#24] Nuestra lectura: hoy ninguna web guarda nada que necesite consentimiento previo. Lo que guardamos son preferencias que elige el visitante (modo día o noche, idioma), la sesión y el reto de inicio de sesión. El contador de clics de numinia.com no sale del navegador, y aun así solo funciona si el visitante acepta. El día que ese contador envíe datos a un servidor, el consentimiento será obligatorio. ¿Es correcta esta lectura?
- [#25] El widget de inicio de sesión de thirdweb escribe sus propias claves en el navegador (thirdweb:*, walletToken-*, thirdwebEwsWalletUserId-*, a-*). Las tratamos como parte del inicio de sesión, que el visitante pide. ¿Están exentas?

### 6. Comunidad (Reglamento de Servicios Digitales) e inteligencia artificial

- [#31] numinia.com alojará contenido que publiquen los propios usuarios. Entendemos que hacen falta un punto de contacto, un formulario para denunciar contenido y una explicación cada vez que retiremos algo. ¿Qué nos exige exactamente el DSA a nuestro tamaño, y qué textos necesitamos?
- [#32] nwos.numen.games redacta con un modelo de IA (Claude, de Anthropic) los documentos del archivo que crea para otra empresa. Junto al resultado hemos puesto este aviso provisional: «Written by an AI model. The documents in this workspace were drafted by an artificial intelligence model (Claude, by Anthropic) from public sources about your organisation. They are drafts: check them before relying on them or sharing them.» ¿Cumple el art. 50 del Reglamento de IA? ¿Hay que decirlo también dentro de los documentos? (Ya lo hacemos en un fichero de procedencia dentro del propio archivo generado.)

### 7. Derechos del manual del juego

El manual de Numinia lo escribieron Christian Märtens (80 %) y Pablo Fernández-Maquieira (20 %). Numen Games S.L. se declara titular y lo ha publicado en dominio público (CC0), pero no hay una cesión de derechos firmada de los autores a la empresa.

- [#3] ¿Podéis redactar esa cesión? ¿Hace falta que sea retroactiva para cubrir la publicación en CC0 ya hecha?

### 8. Cuentas abiertas: publicar lo que pagamos a personas

Queremos publicar en numinia.org las cuentas reales de la empresa, empezando por el libro de facturas recibidas de 2025. El nombre y el importe de una empresa proveedora se pueden publicar. El de una persona física (autónomos, freelancers, abogados que facturan a su nombre) es un dato personal. Mientras no tengamos su permiso, esas personas aparecerán solo por su función (por ejemplo, «Desarrollo»), sin nombre ni iniciales.

- [#35] Vamos a pedir un consentimiento firmado a cada persona que nos facturó en 2025 (una ya ha dicho que sí). ¿Podéis redactar ese consentimiento, corto: nombre, función e importes facturados, publicados en numinia.org?
- [#36] ¿Podéis redactar una cláusula de transparencia para todos los contratos nuevos con freelancers, proveedores y colaboradores? Diría que los importes se publican con nombre y función, y que quien se oponga aparece solo por su función.
- [#37] ¿Cuál es la base legal correcta: el consentimiento o el interés legítimo? ¿Basta con mostrar solo la función mientras falte el consentimiento? Si alguien retira su consentimiento, ¿qué hacemos con lo ya publicado?
- [#38] Las nóminas y la Seguridad Social no están en ese libro. En un equipo tan pequeño, publicar el total deja adivinar el sueldo de cada persona. ¿Cómo lo publicamos, o no lo publicamos?

### Lo que ya está hecho

Para que sepáis de dónde partís: los cuatro textos están publicados en las cuatro webs como copias literales de un único original; ninguno muestra ya notas internas; el único correo legal es legal@numengames.com; el aviso legal da el CIF, el domicilio social (Calle Chile 10, 28290 Las Rozas de Madrid) y la inscripción en el Registro Mercantil de Madrid (tomo 46518, folio 130, hoja M-816810, inscripción 1.ª, de 11 de marzo de 2024); y el aviso de cookies trata igual aceptar y rechazar.

Cualquier respuesta, a legal@numengames.com. Gracias.

---
title: "SKILL reference — Giving an agent a body on a platform (Spanish)"
type: agent
status: active
version: "1.0.0"
created: "2026-10-22T10:30:00+02:00"
updated: "2026-10-22T10:30:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, skill, reference, instantiate, hermes]
license: "CC0-1.0"
registration: exempt
registration_reason: "a reference file of a cross-agent skill is identified by its path inside the skill folder (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Dar un cuerpo a un agente en una plataforma

Para quien instancia un agente, no para el agente. El repositorio define al agente; una plataforma le da un cuerpo (ADR-026). Nada de lo de aquí cambia quién es el agente: eso está en `agents/{id}/`. Los pasos valen para cualquier plataforma; los comandos de la columna derecha son los de Hermes.

## Antes de empezar

- La carpeta `agents/{id}/` está en `main` con su ficha, `SOUL.md`, `OPERATOR.md`, `SOURCES.md` y los dos ficheros de `adapters/hermes/`.
- Un Oráculo ha dicho que el agente puede tener cuerpo y ha añadido la credencial que necesita. Nunca copies una credencial del perfil de otro agente.

## Pasos

| # | Paso | En Hermes |
|---|---|---|
| 1 | Crea un perfil vacío para el agente, con su id por nombre. No clones el de otro: un clon trae sus secretos, su memoria y sus canales. | `hermes profile create {id} --description "<descripción de adapters/hermes/profile.yaml>"` |
| 2 | Pon la identidad del agente en el perfil: el cuerpo de `SOUL.md` del archivo, desde la línea `# NOMBRE` hacia abajo, sin la cabecera ni el comentario de licencia. | cópialo a `~/.hermes/profiles/{id}/SOUL.md` |
| 3 | Aplica el `config.yaml` del adaptador clave por clave. Mézclalo con el propio del perfil; no sobrescribas proveedor, pasarela ni integraciones. Lee los comentarios del fichero: dicen qué es recomendación y qué decisión de plataforma. | `hermes -p {id} config set <clave> <valor>` para escalares; edita `config.yaml` para las listas (`approvals.deny`) y el texto de `smart_policy` |
| 4 | Elige proveedor y modelo por defecto. El comentario de cabecera del adaptador sugiere un modelo; decide el Oráculo y lo fija la plataforma. El modelo no se escribe nunca en `SOUL.md`. | `hermes -p {id} config set model.default <modelo>` (y su proveedor) |
| 5 | Añade la credencial. Un Oráculo la añade al fichero de secretos del propio perfil; no la imprimas, no la pegues en un chat ni la subas. Compruébala por un hash corto, nunca por valor. | `.env` del perfil, añadido por el Oráculo |
| 6 | Instala las skills transversales que el agente necesite: al menos `numinia-bienvenida` y `numinia-que-es`; `numinia-estar-en-un-mundo` y sus hermanas cuando vaya a estar en un mundo. Copia cada carpeta de `agents/skills/` tal cual. | cópialas a `~/.hermes/profiles/{id}/skills/` |
| 7 | Pon una línea en la memoria del agente, para que encuentre el camino de vuelta: «Soy {Nombre}. Al despertar, lee la skill `numinia-bienvenida`; mi ficha es `agents/{id}/`.» | añade la línea a `~/.hermes/profiles/{id}/memories/MEMORY.md` (las entradas se separan con una línea que contiene `§`) |
| 8 | Haz el turno de bienvenida: dile al agente que lea `numinia-bienvenida` y conteste su autocomprobación del primer día. | `hermes -p {id} chat -q "Read the skill numinia-bienvenida and answer its five-line self-check."` |
| 9 | Guarda la respuesta. Debe decir, en cinco líneas, quién es el agente, su gremio, rama y casa, su arquetipo del lore, ante quién responde y dónde viven su ficha y su playbook. Compárala con la ficha. Si está mal o falta, arregla la causa (casi siempre una skill sin instalar) y repite el turno. | guárdala en el registro de la instanciación (la tarjeta o el hilo), no en el archivo |

## Qué dejar en paz

- El `SOUL.md`, el `OPERATOR.md` y la ficha del agente: solo los cambia el operador, mediante una pull request.
- Perfiles, memoria y credenciales de otros agentes.
- Las reglas de aprobación del adaptador. Si una estorba, propón el cambio en una pull request; no la relajes en el perfil.

## Cuando la respuesta sale mal

| El agente dice | Casi siempre |
|---|---|
| un nombre o un papel que no es el suyo | el perfil aún tiene otro `SOUL.md`, o se clonó |
| que no encuentra la skill | la carpeta está en el sitio equivocado, o le falta `SKILL.md` |
| que no conoce su gremio o su casa | no ha leído su ficha: revisa el puntero del paso 7 |
| las respuestas correctas, de la ficha equivocada | la línea de memoria nombra otro id |

## Siguiente

- `references/spanish.md` — la página que lee el agente.
- `agents/INDEX.md` — el plantel, y *How an agent arrives*.

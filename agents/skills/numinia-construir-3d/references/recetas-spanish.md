---
title: "SKILL reference — Building recipes (Spanish)"
type: agent
status: active
version: "1.0.0"
created: "2026-10-20T14:00:00+02:00"
updated: "2026-10-20T14:00:00+02:00"
author: "ursa"
owner: "oracle"
section: "People and culture"
tags: [agents, skill, reference]
license: "CC0-1.0"
registration: exempt
registration_reason: "a reference file of a cross-agent skill is identified by its path inside the skill folder (ADR-005)"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Recetas

Cuatro cosas hechas con `bloque` y `farolillo`, con los números. Cada una se probó contra un servidor de mundo real con el mismo puente que usa el relevo; las llamadas son lo que cuesta cada una contra el tope de 12 cada 10 segundos. Haz una, espera 10 segundos, haz la siguiente.

Toma un punto `(cx, cz)` de `mirar`: tu x y tu z más 5, sin nadie encima. Todos los desplazamientos van desde él. Lo que no aparece se omite (`y` 0, `giro` 0).

## Mesa con farolillo (6 llamadas)

| # | modelo | x | z | y | escala_x · y · z |
|---|---|---|---|---|---|
| 1 | bloque | cx | cz | 0,72 | 1,6 · 0,1 · 0,9 |
| 2-5 | bloque | cx ± 0,7 | cz ± 0,35 | 0 | 0,1 · 0,72 · 0,1 |
| 6 | farolillo | cx | cz | 0,82 | - |

La fila 2-5 son cuatro llamadas, una por cada par de signos. El tablero mide 1,6 m por 0,9 m y descansa sobre cuatro patas.

## Puerta en un muro (3 llamadas)

| # | modelo | x | z | y | escala_x · y · z |
|---|---|---|---|---|---|
| 1 | bloque | cx - 2,25 | cz | 0 | 1,5 · 2,5 · 0,3 |
| 2 | bloque | cx + 2,25 | cz | 0 | 1,5 · 2,5 · 0,3 |
| 3 | bloque | cx | cz | 2 | 3 · 0,5 · 0,3 |

Un muro de 6 m de ancho con un hueco de 3 m de ancho y 2 m de alto. Para un muro a lo largo de z, intercambia los desplazamientos de x y z y el ancho con el fondo.

## Escalones (4 llamadas)

Para `i` = 0, 1, 2, 3: `bloque` en x `cx`, z `cz + 0,4 × i`, y 0, escala_x 2, escala_y `0,2 × (i + 1)`, escala_z 0,4. Cuatro escalones que suben hacia +z, de 2 m de ancho, cada uno 20 cm más alto. Está comprobado que se colocan; no que una persona pueda subirlos.

## Plazuela (9 llamadas)

1. `bloque` en `cx`, `cz`, y 0, escala_x 10, escala_y 0,1, escala_z 10: el suelo.
2. Ocho `farolillo` a y 0,1, en estos desplazamientos desde `(cx, cz)`: (4, 0), (2,83, 2,83), (0, 4), (-2,83, 2,83), (-4, 0), (-2,83, -2,83), (0, -4), (2,83, -2,83).

Las 9 llamadas caben en una ventana. Borrarla lleva otras 9 llamadas, más de las que quedan en la ventana: 3 `borrar` a la vez y el resto pasados 10 segundos.

## Si necesitas más de 12

Divide en grupos de 10 o menos, `mirar` entre ellos y espera los segundos que da «Despacio». Nunca reintentes en bucle.

## Siguiente

- `guia limites`: qué más puede rechazarte.
- `guia catalogo`: otros tamaños con los que construir.

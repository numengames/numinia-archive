#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// skill-catalogo.test.mjs — the catalogue page of the building skill is the
// engine's library, rendered, and nothing else.
//
// The page agents/skills/numinia-construir-3d/references/catalogo.md lists
// what an AI may place. The list belongs to the engine (biblioteca.json); a
// hand-copied table would drift from it, so a script renders it and `--check`
// fails when the committed page is not what the script renders now.
//
// Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { renderCatalogo, MEASURED } from '../skill-catalogo.mjs';

const LIB = {
  schema: 'numinia-engine/biblioteca@1',
  modelos: [
    { id: 'bloque', nombre: 'Bloque', modelo: 'a'.repeat(64), licencia: 'CC0-1.0', autor: 'Numen Games (obra propia)' },
    { id: 'raro', nombre: 'Raro', modelo: 'b'.repeat(64), licencia: 'CC0-1.0', autor: 'Someone' },
  ],
};

test('one row per model, with id, licence, author and the measured size when known', () => {
  const out = renderCatalogo(LIB, 'f'.repeat(64));
  assert.match(out, /\| `bloque` \| Bloque \|/);
  assert.match(out, /1 × 1 × 1 m/);
  assert.match(out, /CC0-1\.0/);
  assert.match(out, /Numen Games \(obra propia\)/);
  assert.match(out, /\| `raro` \| Raro \|/);
  assert.match(out, /not measured/);
});

test('the page names the library it was rendered from, by hash, and carries the licence header', () => {
  const out = renderCatalogo(LIB, '0123456789abcdef'.repeat(4));
  assert.match(out, /0123456789ab/);
  assert.match(out, /SPDX-License-Identifier: CC0-1\.0/);
  assert.match(out, /^---\n/);
});

test('same input, same bytes', () => {
  assert.equal(renderCatalogo(LIB, 'f'.repeat(64)), renderCatalogo(LIB, 'f'.repeat(64)));
});

test('a model that is neither CC0 nor own work is refused (the library rule)', () => {
  const bad = { ...LIB, modelos: [{ ...LIB.modelos[0], licencia: 'CC-BY-4.0', autor: 'Someone' }] };
  assert.throws(() => renderCatalogo(bad, 'f'.repeat(64)), /CC0/);
});

test('every size we measured is for a model id of the house library', () => {
  assert.deepEqual(Object.keys(MEASURED).sort(), ['bloque', 'farolillo', 'loma', 'robot']);
});

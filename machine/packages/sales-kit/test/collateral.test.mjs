#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// collateral.test.mjs — the collateral renderer, proven.
//
// Run: node --test 'machine/packages/sales-kit/test/*.test.mjs'   (or npm test)

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, rmSync, existsSync, writeFileSync, cpSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pitchOf, packagesOf, render, catalogue, PIECES } from '../collateral.mjs';

const KIT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.resolve(KIT, '..', '..', '..');
const TOOL = path.join(KIT, 'collateral.mjs');
const FIX = path.join(KIT, 'fixtures');
const RECORD = path.join(FIX, 'collateral', 'OPP-2099-008.md');
const OFFER = path.join(FIX, 'collateral', 'offer.md');
const CARD = path.join(FIX, 'card.md');
const REG = path.join(FIX, 'collateral', 'register.md');

function run(...args) {
  const r = spawnSync('node', [TOOL, ...args], { encoding: 'utf8' });
  return { code: r.status, out: r.stdout, err: r.stderr };
}
function withDir(fn) {
  const dir = mkdtempSync(path.join(tmpdir(), 'collateral-'));
  try { return fn(dir); } finally { rmSync(dir, { recursive: true, force: true }); }
}

test('the Pitch is read in the language asked, and Where it fits as rows', () => {
  const p = pitchOf(readFileSync(RECORD, 'utf8'), 'es');
  assert.equal(p.headline, 'El primer día antes del primer día.');
  assert.equal(p.subject, 'Ensayar el primer día · propuesta');
  assert.deepEqual(p.fits[0], ['Acogida de tienda', 'Dependientes nuevos', 'El primer turno, caja incluida']);
  assert.equal(pitchOf(readFileSync(RECORD, 'utf8'), 'en').headline, 'The first day before the first day.');
});

test('the offer\'s Packages are read with their price and the client\'s rendering', () => {
  const pk = packagesOf(readFileSync(OFFER, 'utf8'));
  assert.equal(pk.length, 2);
  assert.deepEqual(pk[0], { name: 'Pilot', holds: 'one room', price: '1000', es: 'Piloto: una sala' });
});

test('the catalogue is read from the register: every piece with a template exists in the kit', () => {
  const rows = catalogue(REG);
  assert.ok(rows.length >= 2);
  for (const r of rows.filter((x) => x.template && x.template !== '—' && !x.template.endsWith('.md'))) {
    assert.ok(PIECES[r.template], `register names template ${r.template}, the kit has no piece for it`);
  }
});

test('the real register names only templates the kit can render', { skip: !existsSync(path.join(ROOT, 'standards')) }, () => {
  const real = catalogue();
  assert.ok(real.length > 5, 'the real register has its pieces');
  for (const r of real.filter((x) => x.template && x.template !== '—' && !x.template.endsWith('.md'))) {
    assert.ok(PIECES[r.template], `STD-047 names ${r.template}, the kit has no piece for it`);
    assert.ok(existsSync(path.join(KIT, 'templates', PIECES[r.template].file)), `${PIECES[r.template].file} is missing`);
  }
});

test('a deck renders with every field filled, and the e-mail too', () => {
  const rec = readFileSync(RECORD, 'utf8'), offer = readFileSync(OFFER, 'utf8');
  const opts = { lang: 'es', organisation: 'una tienda de prueba', signature: 'Numen Games', today: '2099-10-15', card: CARD };
  const deck = render('first-contact-deck.html', rec, offer, opts);
  assert.deepEqual(deck.missing, []);
  assert.doesNotMatch(deck.text, /\{\{[a-z_]+\}\}/);
  assert.match(deck.text, /El primer día antes del primer día\./);
  assert.match(deck.text, /1\.000 €/);
  const mail = render('first-contact-email.txt', rec, offer, opts);
  assert.deepEqual(mail.missing, []);
  assert.match(mail.text, /^Asunto: Ensayar el primer día · propuesta/);
});

test('what is missing is named, not invented', () => {
  const rec = readFileSync(RECORD, 'utf8').replace(/^\| Ask \|.*\n/m, '');
  const deck = render('first-contact-deck.html', rec, readFileSync(OFFER, 'utf8'), { lang: 'es', today: '2099-10-15', card: CARD });
  assert.ok(deck.missing.includes('Ask'), deck.missing.join(', '));
  assert.ok(deck.missing.includes('organisation'), 'the organisation is typed at render time, never read from the record');
  assert.match(deck.text, /\[falta: Ask\]/);
});

test('a rendered piece holding a name the card does not list is refused (OPP-006)', () => {
  const rec = readFileSync(RECORD, 'utf8');
  const r = render('first-contact-email.txt', rec, readFileSync(OFFER, 'utf8'),
    { lang: 'es', organisation: 'una tienda', signature: 'Numen Games', greeting: 'Estimada Sra. Ortega:', today: '2099-10-15', card: CARD });
  assert.deepEqual(r.names, ['Sra. Ortega']);
  const ok = render('first-contact-email.txt', rec, readFileSync(OFFER, 'utf8'),
    { lang: 'es', organisation: 'una tienda', signature: 'Ada Lovelace · Numen Games', today: '2099-10-15', card: CARD });
  assert.deepEqual(ok.names, []);
});

test('the command line writes the pieces, exit 1 when something is missing', () => withDir((dir) => {
  const ok = run(RECORD, '--piece', 'first-contact-email.txt', '--lang', 'es', '--offer', OFFER, '--card', CARD,
    '--organisation', 'una tienda', '--signature', 'Numen Games', '--out', dir, '--today', '2099-10-15');
  assert.equal(ok.code, 0, ok.err);
  assert.ok(existsSync(path.join(dir, '2099_10_15-OPP-2099-008-first-contact-email.es.txt')));
  const bad = run(RECORD, '--piece', 'first-contact-email.txt', '--lang', 'es', '--offer', OFFER, '--card', CARD, '--out', dir, '--today', '2099-10-15');
  assert.equal(bad.code, 1);
  assert.match(bad.err, /missing: .*organisation/);
}));

test('the command line refuses to write a piece holding an unlisted name, and never into the archive', () => withDir((dir) => {
  const r = run(RECORD, '--piece', 'first-contact-email.txt', '--lang', 'es', '--offer', OFFER, '--card', CARD,
    '--organisation', 'una tienda', '--signature', 'Numen Games', '--greeting', 'Estimado Sr. Pérez:', '--out', dir, '--today', '2099-10-15');
  assert.equal(r.code, 1);
  assert.match(r.err, /OPP-006.*"Sr\. Pérez"/);
  const inside = run(RECORD, '--piece', 'first-contact-email.txt', '--offer', OFFER, '--card', CARD, '--organisation', 'x', '--signature', 'y', '--out', path.join(ROOT, 'opportunities'));
  assert.equal(inside.code, 2);
  assert.match(inside.err, /outside the archive/);
}));

test('the archive\'s first case renders from its own record and offer', { skip: !existsSync(path.join(ROOT, 'opportunities', 'OPP-2026-025.md')) }, () => {
  const rec = readFileSync(path.join(ROOT, 'opportunities', 'OPP-2026-025.md'), 'utf8');
  const offer = readFileSync(path.join(ROOT, 'operations', 'OPS-012-training-the-offer.md'), 'utf8');
  const r = render('first-contact-deck.html', rec, offer, { lang: 'es', organisation: 'el centro', signature: 'Numen Games', today: '2026-10-02' });
  assert.deepEqual(r.missing, []);
  assert.deepEqual(r.names, []);
  assert.match(r.text, /8\.500 €/);
  assert.match(r.text, /14\.500 €/);
});

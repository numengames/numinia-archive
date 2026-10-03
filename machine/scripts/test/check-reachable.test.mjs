// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// check-reachable: the walk from the two doors, on hand-built pages.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unreachable, bodyLinks, keyOf, DOORS, EXEMPT } from '../check-reachable.mjs';

const page = (links, chrome = []) =>
  `<nav>${chrome.map((h) => `<a href="${h}">x</a>`).join('')}</nav>` +
  `<main>${links.map((h) => `<a href="${h}">x</a>`).join('')}</main>` +
  `<footer>${chrome.map((h) => `<a href="${h}">x</a>`).join('')}</footer>`;

test('the doors are the Map and the Archive', () => {
  assert.deepEqual(DOORS, ['/', '/about']);
});

test('keyOf drops query, hash and trailing slash, and ignores other hosts', () => {
  assert.equal(keyOf('/system/language#gamif-buttons'), '/system/language');
  assert.equal(keyOf('/principles/?x=1'), '/principles');
  assert.equal(keyOf('/'), '/');
  assert.equal(keyOf('https://numinia.com/'), null);
  assert.equal(keyOf('//cdn.example/x'), null);
});

test('links in the bar and the footer do not count', () => {
  assert.deepEqual([...bodyLinks(page(['/a'], ['/hidden']))], ['/a']);
});

test('a page reached through another page passes; a page linked only from the chrome fails', () => {
  const pages = new Map([
    ['/', page(['/configure'], ['/hidden'])],
    ['/about', page([])],
    ['/configure', page(['/system/language'])],
    ['/system/language', page([])],
    ['/hidden', page([])],
  ]);
  assert.deepEqual(unreachable(pages), ['/hidden']);
});

test('every exemption says why', () => {
  for (const [k, why] of EXEMPT) assert.ok(k.startsWith('/') && why.length > 20, `${k} needs a reason`);
});

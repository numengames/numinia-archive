// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// entity-card — reads the header of an entity card, nesting included.
//
// The archive's frontmatter reader (machine/scripts/lib/frontmatter.mjs) stops at
// nested structure on purpose: the guards judge flat headers and a nested
// value is marked NESTED and left alone. An entity card is the first header
// that is nested by design — `forms` is a list of maps, each with a list of
// `copies` — so it needs a reader that follows the indentation. The root
// package has no dependencies (by rule), so this is the subset of YAML a card
// uses and nothing more:
//
//   key: scalar            strings (bare, "quoted", 'quoted'), integers, booleans
//   key:                   a map or a list on the following, deeper lines
//     child: …
//   - item                 a list of scalars
//   - key: …               a list of maps (the first key may sit on the dash line)
//   key: [a, b]            a flow list of scalars
//   # comment              anywhere
//
// Anything else (anchors, multi-line scalars, flow maps) is not a card and
// the reader throws, naming the line.

const FM_RE = /^---\s*\n([\s\S]*?)\n---(?:\s*\n|$)/;

export function parseYamlFrontmatter(text) {
  const m = text.match(FM_RE);
  if (!m) return null;
  return parseYaml(m[1]);
}

export function parseYaml(src) {
  const lines = src.split('\n')
    .map((raw, n) => ({ n: n + 1, raw, text: stripComment(raw) }))
    .filter((l) => l.text.trim() !== '');
  const [value] = parseBlock(lines, 0, -1);
  return value;
}

function stripComment(line) {
  let inS = false, inD = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === "'" && !inD) inS = !inS;
    else if (ch === '"' && !inS) inD = !inD;
    else if (ch === '#' && !inS && !inD && (i === 0 || /\s/.test(line[i - 1]))) return line.slice(0, i).trimEnd();
  }
  return line.trimEnd();
}

const indentOf = (s) => s.match(/^ */)[0].length;

/** Parse the block starting at lines[i] whose indent is > parentIndent.
 *  Returns [value, nextIndex]. */
function parseBlock(lines, i, parentIndent) {
  if (i >= lines.length) return [null, i];
  const ind = indentOf(lines[i].text);
  if (ind <= parentIndent) return [null, i];
  return lines[i].text.trim().startsWith('- ') || lines[i].text.trim() === '-'
    ? parseList(lines, i, ind)
    : parseMap(lines, i, ind);
}

function parseMap(lines, i, ind) {
  const out = {};
  while (i < lines.length) {
    const l = lines[i];
    const li = indentOf(l.text);
    if (li < ind) break;
    if (li > ind) throw new Error(`line ${l.n}: unexpected indentation`);
    const t = l.text.trim();
    const kv = /^([A-Za-z_$][\w.$-]*):(?:\s+(.*))?$/.exec(t);
    if (!kv) throw new Error(`line ${l.n}: expected "key: value", got "${t}"`);
    const [, key, rest] = kv;
    if (rest !== undefined && rest !== '') { out[key] = scalar(rest, l.n); i++; continue; }
    // Empty value: children on deeper lines decide; none → empty string.
    const [child, next] = parseBlock(lines, i + 1, ind);
    out[key] = child === null ? '' : child;
    i = next;
  }
  return [out, i];
}

function parseList(lines, i, ind) {
  const out = [];
  while (i < lines.length) {
    const l = lines[i];
    const li = indentOf(l.text);
    if (li < ind) break;
    if (li > ind) throw new Error(`line ${l.n}: unexpected indentation`);
    const t = l.text.trim();
    if (!t.startsWith('-')) break;
    const rest = t.slice(1).trim();
    if (rest === '') {
      const [child, next] = parseBlock(lines, i + 1, ind);
      out.push(child);
      i = next;
      continue;
    }
    const kv = /^([A-Za-z_$][\w.$-]*):(?:\s+(.*))?$/.exec(rest);
    if (kv) {
      // A map whose first key sits on the dash line. Rewrite that line as a
      // map line at the dash's inner indent and parse the map from there.
      const inner = li + 2;
      const rewritten = { ...l, text: `${' '.repeat(inner)}${rest}` };
      const [map, next] = parseMap([...lines.slice(0, i), rewritten, ...lines.slice(i + 1)], i, inner);
      out.push(map);
      i = next;
      continue;
    }
    out.push(scalar(rest, l.n));
    i++;
  }
  return [out, i];
}

function scalar(s, n) {
  const t = s.trim();
  if (t.startsWith('"')) {
    if (!t.endsWith('"') || t.length < 2) throw new Error(`line ${n}: unterminated string`);
    return t.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
  }
  if (t.startsWith("'")) {
    if (!t.endsWith("'") || t.length < 2) throw new Error(`line ${n}: unterminated string`);
    return t.slice(1, -1).replace(/''/g, "'");
  }
  if (t.startsWith('[')) {
    if (!t.endsWith(']')) throw new Error(`line ${n}: unterminated flow list`);
    const inner = t.slice(1, -1).trim();
    if (inner === '') return [];
    return inner.split(',').map((x) => scalar(x, n));
  }
  if (t === 'true') return true;
  if (t === 'false') return false;
  if (t === 'null' || t === '~') return null;
  if (/^-?\d+$/.test(t)) return Number(t);
  return t;
}

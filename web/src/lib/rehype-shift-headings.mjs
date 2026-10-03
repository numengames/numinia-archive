// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// One page, one h1.
//
// Every document in this repo opens its sections with `# `, because in a
// markdown file the document IS the page and that is correct. Rendered on the
// site it is not: the page already prints the title as an <h1>, so PRI-001
// arrives with ELEVEN of them. A screen reader announces eleven documents in
// one page and a search engine has to guess which title is the title.
//
// This shifts every heading in rendered document bodies down one level, so the
// markdown's `#` sections become the <h2>s they are on a web page. The source
// files are untouched: the defect is in the rendering, so the fix lives here.
//
// h6 is the floor -- HTML has no h7, and a document nested that deep has a
// structure problem no plugin should paper over.

import { visit } from "unist-util-visit";

const LEVELS = new Set(["h1", "h2", "h3", "h4", "h5"]);

export function rehypeShiftHeadings() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (!LEVELS.has(node.tagName)) return;
      const level = Number(node.tagName[1]);
      node.tagName = `h${level + 1}`;
    });
  };
}

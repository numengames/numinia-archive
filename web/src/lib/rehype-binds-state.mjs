// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The Binds line says the state it is in.
//
// Every rule document opens with `**Binds:** every agent, in every session`.
// On a `draft` document that sentence is not true today — draft binds nobody
// (STD-004) — yet it is the first thing a reader meets, in the imperative.
// The band under the title said "draft", /binding said "draft", and the line
// itself kept saying "binds". A reader believed the line.
//
// On a draft, this relabels it "Would bind, once in force:". The scope that
// follows is the document's own words, untouched; only the verb's tense moves
// to match the header. An active document, and every other bold label, is
// left exactly as written. The source file is not edited: the day the rule is
// promoted, the label reads "Binds:" again with nothing to remember.

import { visit } from "unist-util-visit";

export const DRAFT_LABEL = "Would bind, once in force:";

const isBindsLabel = (node) =>
  node?.type === "element" &&
  node.tagName === "strong" &&
  node.children?.length === 1 &&
  node.children[0].type === "text" &&
  /^Binds:\s*$/.test(node.children[0].value);

export default function rehypeBindsState() {
  return (tree, file) => {
    const status = file?.data?.astro?.frontmatter?.status;
    if (status !== "draft") return;
    visit(tree, "element", (node) => {
      if (node.tagName !== "p") return;
      const first = node.children.find((c) => !(c.type === "text" && !c.value.trim()));
      if (!isBindsLabel(first)) return;
      first.children[0].value = DRAFT_LABEL;
    });
  };
}

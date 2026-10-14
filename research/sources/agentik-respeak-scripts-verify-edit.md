---
repo: agentik-dev/agentik-respeak
path: plugin/scripts/respeak-verify-edit.py
commit: 319f060
title: "respeak-verify-edit.py: the prose-only edit verifier"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Usage: `respeak-verify-edit.py <before> <after> [--type md|code|py|html|yaml|json] [--json]`, plus `--allow-strings` for a Python page generator and `--dirs BEFORE AFTER` for two rendered trees. Exit 0 safe (warnings allowed), 1 violation, 2 usage or parse error. File is 29,754 bytes; the docstring (lines 1-70) was read in full.
- Markdown policy: prose may change; invariant are headings (text and order, ATX with or without a space after the hashes, and setext), block structure (per-kind counts of blockquote lines, list items, thematic breaks, table rows, definition lines), link and image targets, reference-link definitions, fenced code blocks (byte), inline code spans (as a multiset), numeric tokens outside fences (as a multiset), YAML front matter (byte, or the `--prose-keys` leaves), and admonition types.
- Code files (.ts .js .go .java .rs and similar): only comments may change; everything outside comments is byte-identical, and numeric tokens inside comments are a multiset. Python: only `#` comments may change; docstrings count as code because they can carry doctests; `--allow-strings` opens string-literal text but the two ASTs must dump identically with strings masked. HTML: text nodes may change; tags, attributes, script, style, pre and code content are invariant. YAML: comments only, parsed data must be deep-equal. JSON: whitespace only.
- `--allow-restructure` (Markdown): heading, block-structure, admonition and front-matter changes downgrade to warnings, while link targets, fenced code, inline code and numbers stay hard. The docstring states a known limit: the code comment walker can false-FAIL on a JavaScript regex literal with quote characters, "a false FAIL, never a false PASS".
- The invariants are structural. They are not a semantic check: see ADV6-4 in `agentik-respeak-design-reviews` (an appended paragraph or a flipped "never" to "always" passes).

## Limits
- Only the docstring and constants were read; the checker bodies were not. Behaviour claims about specific cases come from the tests' names and the review reproductions.

## Used in
- research/synthesis/tools-respeak.md

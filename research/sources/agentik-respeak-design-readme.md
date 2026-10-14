---
repo: agentik-dev/agentik-respeak
path: design/readme/
commit: 319f060
title: "design/readme: the README's source, render contract and stamp"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- `source.md` (18,517 bytes) is the file the README is rendered from. A diff of `source.md` against `README.md` shows differences only in prose wording at five places (for example the "install", "gate hook" and "conventions" paragraphs); headings, code, links and numbers match. This is consistent with the claim that `make readme` re-words prose on each run.
- `contract.txt` (626 bytes) is the instruction handed to the renderer: the render is an editorial pass over a whole document, not a summary; it must keep byte-identical and in order the icon line, every heading, fenced code block, inline code span, link target, number, list item and table row, and change only prose sentences. The output is checked with `respeak-verify-edit.py` and rejected on any structural difference.
- `rendered.sha256` holds two SHA-256 lines, one for the source and one for the README. `scripts/readme-fresh.sh` reads them (see `agentik-respeak-scripts-render`).
- The source has a ceiling of 24,576 bytes, stated in CLAUDE.md and enforced by `scripts/readme-fresh.sh`.

## Limits
- I diffed the two files and read the contract; I did not read the whole source line by line, since the README carries the same text.

## Used in
- research/synthesis/tools-respeak.md

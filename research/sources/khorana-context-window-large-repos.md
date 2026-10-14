---
url: https://gautamkhorana.com/blog/claude-code-context-window-large-repos/
title: "Claude Code Context Window: When to Compact, Clear or Split"
author: Gautam Khorana
published: 2026-09-08
accessed: 2026-10-14
kind: reported
---

## What it says
- Claims the automatic pass can drop nuance that a manual, focused `/compact` would keep: architectural decisions, refactor reasoning and rejected approaches often do not survive. In his words "the automatic pass doesn't know what you care about." He recommends manual `/compact` at natural phase boundaries for anything architectural.
- Recommends writing a structured handoff before the session ends, not after quality drops: completed work (with commit references or file paths), in-progress state, decisions and why, next steps detailed enough for a fresh session, open questions and blockers. Save it to a repo file or CLAUDE.md, then `/clear` or open a new session with it.
- Contrasts the options: `/compact` shrinks history in the same session and can be steered; `/clear` is a hard reset; a new session with a handoff gives a clean slate with continuity, suited to work too big for one session or when quality is already degrading.

## Limits
- Anecdote. He says the guidance was tested on client sites and gives no measurements, token counts or before-and-after comparisons; support comes from the official docs and other writers.

## Used in
- research/synthesis/field-2.md

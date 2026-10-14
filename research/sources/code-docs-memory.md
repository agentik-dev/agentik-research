---
url: https://code.claude.com/docs/en/memory
title: "How Claude remembers your project"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Each session starts with a fresh context window; two mechanisms carry knowledge across sessions: CLAUDE.md files (written by you) and auto memory (written by Claude). Both load at the start of every conversation, and Claude treats them as context, not enforced configuration. "The more specific and concise your instructions, the more consistently Claude follows them."
- Size guidance (section on writing CLAUDE.md files): target under 200 lines per file; longer files consume more context and reduce adherence. Imports organise a long file but do not reduce its context cost, because imported files also load at launch. Path-scoped rules load only when matching files are touched.
- Auto memory (MEMORY.md): the first 200 lines or 25KB, whichever comes first, load at session start; content beyond that is not loaded. Claude Code warns when the file nears the limit and tells Claude to shorten it. A CLAUDE.md of up to 4 MiB is loaded in full; "Shorter files produce better adherence."
- Troubleshooting: the project-root CLAUDE.md survives /compact (re-read from disk and re-injected). Instructions given only in conversation, nested CLAUDE.md files not yet reloaded, and path-scoped rules not yet matched can disappear.

## Limits
- Documentation, not measurement. The 200-line figure is a target, and the page cites no study for "reduce adherence". The one controlled study found (gloaguen-agents-md-context-files) tests whether to add a file, not how long it should be.
- Thresholds (200 lines, 25KB, 4 MiB) are volatile; they are as of October 2026.

## Used in
- research/synthesis/field-1.md

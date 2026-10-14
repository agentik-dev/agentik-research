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

## Also (question 3)
- Section "Import additional files" (as of October 2026): imported files "are expanded and loaded into context at launch alongside the CLAUDE.md that references them"; imports can nest to a maximum depth of four hops. The size-guidance paragraph and the troubleshooting section "My CLAUDE.md is too large" both say imports help organization but do not reduce context cost.
- Section "How CLAUDE.md files load": CLAUDE.md and CLAUDE.local.md load from the working directory and every directory above it, concatenated and ordered from the filesystem root down, so a parent file appears before the project file. Files in subdirectories load only when Claude reads, writes or edits a file there. `claudeMdExcludes` skips files in a large monorepo. These two rules support a parent file loading in every repository launched beneath it.
- Section "Troubleshoot memory issues": CLAUDE.md content "is delivered as a user message after the system prompt, not as part of the system prompt itself", with no guarantee of strict compliance. Instructions that must run at a fixed point belong in a hook.
- Section "When to add to CLAUDE.md": add after Claude repeats a mistake, after a review catches something it should have known, or when you re-type a correction; keep facts needed every session (build commands, conventions, layout, "always do X" rules) and move multi-step procedures or area-specific rules to a skill or a path-scoped rule.
- Block-level HTML comments in CLAUDE.md are stripped before injection, so maintainer notes cost no tokens. `/doctor` proposes trims of content derivable from the codebase (Claude Code v2.1.206 or later); a startup warning appears when a file passes the recommended length or when files add up past a combined limit; each CLAUDE.md, rules file and import counts as one file.
- Auto memory section "How it works": the index `MEMORY.md` is one line per memory, loaded in every session up to its first 200 lines or 25KB; topic files are not loaded at startup and Claude reads them on demand with ordinary file tools. This is the vendor's own index-plus-pointer shape for an always-loaded memory.

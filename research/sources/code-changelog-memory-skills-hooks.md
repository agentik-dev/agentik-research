---
url: https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md
title: "CHANGELOG.md (Claude Code repository)"
author: Anthropic (Claude Code changelog)
published: undated (entries carry versions, not dates; newest seen is 2.1.296)
accessed: 2026-10-14
kind: documented
---

## What it says
- 2.1.295: added `onFailure: "block"` for command and HTTP hooks, so that a hook that cannot start, times out, or exits with an unexpected code blocks the action instead of letting it through (the entry's own words; it confirms the default is to let the action through).
- 2.1.295: a subagent preloads at most 32 skills from its `skills` field, each once; it can still invoke others through the Skill tool.
- 2.1.288, 2.1.292, 2.1.293: fixes so path-scoped rules and nested CLAUDE.md files load when Claude writes, edits, or views a file with a single-file `cat`, `head` or `tail`, and a transcript line when a nested file is not loaded. These show lazy loading of nested and path-scoped files was still being repaired in 2026.
- 2.1.292: a compaction summary that repeated a `/name` could let Claude invoke a skill reserved for the user; fixed.
- No entry in the portion read names AskUserQuestion limits, the 200-line CLAUDE.md warning, the skill listing budget, or the MEMORY.md limits.

## Limits
- Only the newest part was read: the first 100,000 of 986,110 characters, ending part-way through the 2.1.287 entry. Absence of an entry here is not evidence that a change did not happen. No dates appear in the text read.

## Used in
- research/synthesis/field-3.md

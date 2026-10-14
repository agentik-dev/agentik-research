---
url: https://code.claude.com/docs/en/hooks-guide
title: "Automate actions with hooks (section: Re-inject context after compaction)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- Compaction summarizes the conversation to free space, and the guide says plainly "This can lose important details." The remedy it gives is a `SessionStart` hook whose matcher is `compact`, which re-injects critical context after every compaction.
- Plain text a SessionStart command writes to stdout is added to Claude's context. The example echoes project conventions and recent work; the page suggests `git log --oneline -5` as a dynamic source.
- For context wanted on every session start, the page points to CLAUDE.md instead.

## Limits
- Shows the mechanism, not how much a re-injection recovers. Related fact from anthropic-docs-context-window: context that hooks added earlier is itself summarized with the conversation, so re-injection after compaction restores it.

## Used in
- research/synthesis/field-2.md

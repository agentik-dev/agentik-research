---
url: https://code.claude.com/docs/en/costs
title: "Manage costs effectively"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Reduce token usage": token costs scale with context size. Tips: /clear between unrelated tasks ("Stale context wastes tokens on every subsequent message"); custom compaction instructions; keep CLAUDE.md under 200 lines and move workflow-specific instructions into skills, which load only when invoked; prefer command-line tools to MCP servers; use hooks to filter output, for example reducing a 10,000-line log to the matching lines; delegate verbose operations to subagents.
- Section "Why usage climbs in a long session": Claude Code sends the whole conversation with every request, and each tool use sends another request carrying the tool results; with caching that history is read at the cached rate, so a one-line question late in a long session still draws on the whole conversation. The first message after a pause longer than the cache lifetime misses the cache. Lifetime as of October 2026: one hour on a subscription, five minutes by default on an API key or when drawing on usage credits. `/compact` is itself a large request because it reads the whole conversation; `/clear` costs nothing.
- Reported averages as of October 2026: around 13 US dollars per developer per active day, 150 to 250 dollars per developer per month, below 30 dollars per active day for 90 percent of users.
- Agent teams use about 7 times the tokens of a standard session when teammates run in plan mode, because each runs its own window.
- Section "Understanding changes in Claude Code behavior": cost reporting changes across versions (examples cite v2.1.211 and later).

## Limits
- The page is about cost and usage limits; it measures no quality loss. The 7x and enterprise averages are Anthropic's figures with no method given.

## Used in
- research/synthesis/field-1.md

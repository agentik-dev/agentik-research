---
url: https://code.claude.com/docs/en/how-claude-code-works
title: "How Claude Code works"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "When context fills up", as of October 2026: Claude Code clears older tool outputs first, then summarizes the conversation if needed. "Your requests and key code snippets are preserved; detailed instructions from early in the conversation may be lost."
- To steer what is kept, add a "Compact Instructions" section to CLAUDE.md or run `/compact` with a focus such as `/compact focus on the API changes`. (The Agent SDK page says the section header is free-form; see anthropic-docs-agent-sdk-agent-loop.)
- If one file or tool output refills the context right after each summary, Claude Code stops auto-compacting after a few attempts and shows an error instead of looping.
- Section "Work with sessions": each new session starts with a fresh context window without the history of earlier sessions; persistence across sessions comes from auto memory and CLAUDE.md. Resuming with `--continue` or `--resume` reopens the same session ID; forking copies history into a new session ID.
- Auto memory: the first 200 lines or 25KB of MEMORY.md, whichever comes first, load at the start of each session.
- Subagents work in their own context window and return a summary, so their tool calls stay out of the main context.

## Limits
- Gives no threshold, no summarizer prompt and no measure of what compaction loses beyond the two sentences above.

## Used in
- research/synthesis/field-2.md

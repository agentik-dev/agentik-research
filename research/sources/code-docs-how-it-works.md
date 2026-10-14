---
url: https://code.claude.com/docs/en/how-claude-code-works
title: "How Claude Code works"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Work with sessions": sessions are independent; each new session starts with a fresh context window without earlier history. Claude can persist learnings through auto memory and CLAUDE.md. Resume reopens the same session id and appends; fork copies history into a new id.
- Section "The context window": it holds conversation, file contents, command outputs, CLAUDE.md, auto memory, loaded skills and system instructions. The page states "Claude compacts automatically, but instructions from early in the conversation can get lost", and says to put persistent rules in CLAUDE.md.
- Section "When context fills up": Claude Code "clears older tool outputs first, then summarizes the conversation if needed"; requests and key code snippets are preserved while detailed early instructions may be lost. If a single file or tool output refills the window after each summary, auto-compaction stops after a few attempts and shows an error instead of looping.
- MCP tool definitions are deferred by default; only names and server instructions use context until a tool is used. Skills load on demand; subagents work in their own window and return a summary.

## Limits
- Documentation of behaviour, no measurement of how much is lost. Volatile; as of October 2026.

## Used in
- research/synthesis/field-1.md

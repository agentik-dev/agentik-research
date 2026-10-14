---
url: https://code.claude.com/docs/en/agent-sdk/agent-loop
title: "How the agent loop works (section: Automatic compaction)"
author: Anthropic (Claude Agent SDK documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- When the context approaches its limit, the SDK compacts automatically: it summarizes older history and keeps "your most recent exchanges and key decisions intact". It emits a `system` message with subtype `compact_boundary` in the stream.
- Compaction replaces older messages with a summary, so specific instructions from early in the conversation may not be preserved. Persistent rules belong in CLAUDE.md, which is re-injected on every request.
- Ways to customize: a free-form summarization-instructions section in CLAUDE.md (the page says the header is not special), a `PreCompact` hook (with a `trigger` of `manual` or `auto`) for logic such as archiving the full transcript, and `/compact` sent as a prompt string.
- Subagents start with a fresh conversation and return only a final response to the parent. Resuming a session restores the full context of earlier turns.

## Limits
- Disagrees in small ways with the main docs: the how-it-works page says to use a section named "Compact Instructions", this page says any header works.
- Describes what the SDK keeps in one clause; no measure.

## Used in
- research/synthesis/field-2.md

## Also (question 4)
Re-read on 2026-10-14 for turn and budget ceilings. As of October 2026.
- A turn is one round trip: Claude calls tools, the SDK runs them, the results go back. `max_turns` / `maxTurns` counts tool-use turns only, with no limit by default; `max_budget_usd` / `maxBudgetUsd` stops the loop at an estimated spend, also with no default. Hitting either returns a `ResultMessage` with subtype `error_max_turns` or `error_max_budget_usd` and no `result` text; a single-shot `query()` then raises an error after yielding the result.
- The budget covers subagent spend. Section "Budget headroom": the response that reaches the cap still completes, so spend can pass the cap by up to the cost of that one response plus what running subagents spend before they stop. The page says "Setting a budget is a good default for production agents."
- Every result subtype carries `total_cost_usd`, `usage`, `num_turns` and `session_id`; `usage` covers only the main loop, so use `modelUsage` for a whole tree.
- Context accumulates across turns; large tool outputs can use thousands of tokens in one turn; static content (system prompt, tool definitions, CLAUDE.md) is prompt cached.
- Used in (question 4): research/synthesis/field-4.md

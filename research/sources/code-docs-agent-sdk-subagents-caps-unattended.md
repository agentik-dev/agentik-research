---
url: https://code.claude.com/docs/en/agent-sdk/subagents
title: "Subagents in the SDK (section: Cap subagent depth, concurrency, and spend)"
author: Anthropic (Claude Agent SDK documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Cap subagent depth, concurrency, and spend", as of October 2026 (SDK releases bundling Claude Code v2.1.219 or later; earlier releases lack some limits or default differently): Claude decides on its own when to spawn subagents, each makes its own API requests that count toward the query's `total_cost_usd`, and a subagent can spawn subagents, so one prompt can grow into a tree.
- Limits table: depth defaults to 3 layers below the main agent (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`; `1` stops nesting); concurrency defaults to 20 running subagents (`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`; the spawn is refused with `Concurrent subagent limit reached`); spend has no limit by default (`maxBudgetUsd` or `max_budget_usd`) and at the cap Claude Code refuses to spawn more subagents (`Budget limit reached`), stops running background subagents and ends the query with `error_max_budget_usd`.
- The depth and concurrency limits are environment variables set through the `env` option. The TypeScript SDK replaces the subprocess environment with it (spread `process.env` to keep `PATH`); the Python SDK merges it into the inherited one.
- The page says Opus 5 "delegates to subagents more readily than earlier models", so the limits matter most there; a delegation instruction in the prompt only steers Claude, "so set the limits as well".
- `AgentDefinition.maxTurns` stops a subagent at a turn count and marks its output partial (v2.1.246 or later); a resumed subagent keeps its full history.
- Subagent transcripts are stored in separate files and persist independently of the main conversation.

## Limits
- Vendor documentation. It says nothing about how often runaway subagent trees happen.

## Used in
- research/synthesis/field-6.md

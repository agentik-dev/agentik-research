---
url: https://code.claude.com/docs/en/agent-sdk/agent-loop
title: "How the agent loop works (turns, budget, result subtypes, permissions)"
author: Anthropic (Claude Agent SDK documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- A turn is one round trip: Claude calls tools, the SDK runs them, the results feed back. The loop ends when Claude produces a response with no tool calls; a `ResultMessage` follows the final `AssistantMessage`. `max_turns` counts tool-use turns only. The page says that without limits the loop runs until Claude finishes on its own, which "can run long on open-ended prompts", and that a budget is a good default for production agents.
- Section "Handle the result": subtypes are `success`, `error_max_turns`, `error_max_budget_usd`, `error_during_execution` and `error_max_structured_output_retries`. The `result` text exists only on `success`. Every subtype carries `total_cost_usd`, `usage`, `num_turns` and `session_id`.
- After a session crash the final result is `error_during_execution`, its cost fields may be zeroed, its `stop_reason` is `null`, and the process exits after emitting it. A single-shot `query()` yields the error result and then raises; the underlying process exits non-zero. A streaming-input session stays alive after an error result, except after a crash.
- `stop_reason` indicates why the model stopped on its last turn. The page lists `end_turn`, `max_tokens` and `refusal` as common values and shows how to detect `refusal`. It does not list `tool_use` or say what it means on a finished run. On error results the loop produced, it carries the value from the last assistant response.
- Section "Budget headroom": Claude Code compares spend with the cap after model responses arrive. "The response that reaches the cap still completes and counts toward `total_cost_usd`." Spend can pass the cap by up to the cost of that one response plus what still-running subagents spend before they stop. The cap covers subagents; after it is reached spawning fails with `Budget limit reached` (v2.1.217 or later). In streaming-input mode the budget total accumulates across messages and `/clear` restarts it.
- Section "Tool permissions": `allowed_tools` auto-approves, `disallowed_tools` blocks regardless of other settings. When a tool is denied, Claude receives a rejection message as the tool result and typically tries a different approach or reports that it could not proceed. In `default` mode a tool call that needs approval and has no `canUseTool` callback is denied. `dontAsk` never prompts and denies what would prompt. `bypassPermissions` cannot be used as root on Unix and is for isolated environments.
- Parallel tools: read-only tools (Read, Glob, Grep, read-only MCP tools) may run concurrently; state-changing tools (Edit, Write, Bash) run sequentially to avoid conflicts.
- Hooks run in the application process, not the context window. A `PreToolUse` hook that rejects a call prevents execution and Claude receives the rejection message.

## Limits
- The page defines no stall or progress watchdog for the loop; its only bounds are `max_turns`, `max_budget_usd` and the context window. As of October 2026.
- An earlier note on this URL (anthropic-docs-agent-sdk-agent-loop) covers compaction and turn limits for questions 2 and 4.

## Bears on repo claims
- A denied call yields a normal rejection result rather than an error subtype: consistent with a run that ends `success` after denials. The page never states `is_error` for that case.
- `stop_reason = tool_use` as a sign of a finished-but-killed run: not documented here (the values listed are `end_turn`, `max_tokens`, `refusal`).
- A budget cap can overshoot by one response plus subagents: documented ("Budget headroom").

## Used in
- research/synthesis/field-6.md
- docs/summary.md

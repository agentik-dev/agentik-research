---
url: https://code.claude.com/docs/en/env-vars
title: "Environment variables (timeouts, cache TTL, check-ins, scheduler)"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- `BASH_DEFAULT_TIMEOUT_MS`: default timeout for a foreground Bash or PowerShell command, "default: 120000, or 2 minutes". `BASH_MAX_TIMEOUT_MS`: the maximum the model can set, "default: 600000, or 10 minutes"; the effective ceiling is the larger of the two. A ceiling over 2 hours also becomes the maximum time limit for background commands in unattended sessions (v2.1.285 or later).
- `API_TIMEOUT_MS`: API request timeout, default 600000 ms (10 minutes). `API_FORCE_IDLE_TIMEOUT` overrides a 5-minute body idle timeout that aborts a streaming response when no bytes arrive. `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS` is the subagent stall timeout, default 600000 (10 minutes). `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` defaults to 300000 (5 minutes) for network servers and 1800000 (30 minutes) for stdio servers.
- `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS`: ceiling on idle waiting for background work in non-interactive mode, default 600000 (10 minutes); `0` waits without limit.
- `CLAUDE_CODE_PROMPT_CACHE_TTL`: `5m` or `1h`, the only accepted values, for the main conversation (interactive, `-p` and SDK turns plus inline helpers); beats the `promptCacheTtl` setting and `ENABLE_PROMPT_CACHING_1H`; `FORCE_PROMPT_CACHING_5M` beats it. The API bills 1-hour writes at a higher rate. Needs v2.1.242 or later.
- `CLAUDE_CODE_GOAL_CHECKIN_MINUTES`: how long background work can keep an active goal waiting before a check-in; default 30, `0` turns check-ins off, at most 10080 (one week); needs v2.1.234 or later.
- `CLAUDE_CODE_AUTO_COMPACT_WINDOW`: tokens, 100000 to 1000000, plain integer only; once set, the status line's `used_percentage` no longer shows when compaction will run.
- `CLAUDE_CODE_DISABLE_CRON=1` disables scheduled tasks, so `/loop` and the cron tools become unavailable. `CLAUDE_AFK_TIMEOUT_MS` is off by default (it was 60000 before v2.1.200).

## Limits
- I read the first 100,000 of 170,205 characters; the rows for `CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL`, `ENABLE_PROMPT_CACHING_1H`, `FORCE_PROMPT_CACHING_5M` and `CLAUDE_CODE_RETRY_WATCHDOG` were past that point and are cited from other pages (code-docs-prompt-caching, code-docs-errors-usage-limits). As of October 2026.

## Used in
- research/synthesis/field-4.md

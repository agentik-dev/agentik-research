---
url: https://code.claude.com/docs/en/headless
title: "Run Claude Code programmatically (sections: Background tasks at exit, Handle API retries, bare mode)"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Background tasks at exit", as of October 2026: after Claude's turn ends and stdin closes, a `claude -p` run can stay open for background work. It stops what is left after 10 minutes of continuous idle waiting by default and drops the partial result; `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS` changes the cap (`0` waits without one). A background command the main conversation started keeps the run open until it exits or reaches its time limit. A Monitor watch times out five minutes after it starts by default. For a prompt passed as text, the run waits for each pending self-paced `/loop` wakeup "even past the 10-minute cap". Reaching `--max-budget-usd` stops remaining background work.
- `--bare` is "the recommended mode for scripted and SDK calls" and will become the default for `-p` in a future release; it runs no background tasks, so a command that reaches its timeout stops.
- `--output-format json` returns `total_cost_usd` and a per-model breakdown; a continued conversation reports its whole total. Both are client-side estimates.
- Section "Handle API retries": a `system/api_retry` event carries `attempt`, `max_retries`, `retry_delay_ms`, `error_status` and an `error` category (for example `rate_limit`, `overloaded`, `billing_error`).
- `--permission-prompts none` (v2.1.259 or later) denies every request nobody can answer, so an unattended run does not wait on a permission host. SIGTERM exits with code 143 and records no result for the turn in progress.
- `/goal` works with `-p` and runs the loop to completion in one invocation (code-docs-goal).

## Limits
- As of October 2026. The page documents no usage-limit wait for `-p` (the interactive-mode page says the wait is not offered there).

## Used in
- research/synthesis/field-4.md

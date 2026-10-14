---
url: https://code.claude.com/docs/en/errors
title: "Error reference (sections: usage limits, automatic retries, timeouts)"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "You've hit your session limit", as of October 2026: subscription plans include a rolling usage allowance, and four messages exist: session limit, weekly limit, Opus limit and Sonnet limit, each with a reset time. "The session and weekly limits are shared across all models, so switching models doesn't restore access." The Opus and Sonnet limits apply only to that model family, so a model outside it keeps working. Each model has its own prompt cache, so a switch re-reads the whole conversation with no cache hits.
- Usage counts against the session and weekly allowances at the same time, so "A single burst of heavy activity, such as a large workflow fanout, can exhaust the weekly allowance before the session window resets." The page does not say the session window lasts five hours.
- Recommended actions: wait for the reset, run `/usage` for limits and reset times, run `/usage-credits` to buy more on Pro and Max or request it from an admin on Team and Enterprise, upgrade, or (in an interactive claude.ai session, v2.1.234 or later) wait and continue automatically.
- An entitlement error, `Usage credits required for 1M context`, fires even when session and weekly allowances have capacity left.
- Automatic retries: Claude Code retries transient failures up to 10 times with exponential backoff (`CLAUDE_CODE_MAX_RETRIES`, default 10). `CLAUDE_CODE_RETRY_WATCHDOG=1` (for unattended sessions) retries 429 and 529 indefinitely, but since v2.1.239 fails at once on a standard-speed 429 that reports a spend limit or exhausted usage credits; `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` caps the total wait (v2.1.295 or later). A 529 "doesn't count against your quota."
- Request timeout: default 10 minutes (`API_TIMEOUT_MS`, 600000). From v2.1.242 a streaming request with no response headers by the first-byte deadline is re-sent once, then ends the turn with an error.

## Limits
- I read the first 100,000 of 495,069 characters; the spend-limit section was past that point. As of October 2026.

## Used in
- research/synthesis/field-4.md

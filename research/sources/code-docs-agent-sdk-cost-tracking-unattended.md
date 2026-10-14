---
url: https://code.claude.com/docs/en/agent-sdk/cost-tracking
title: "Track cost and usage (Agent SDK)"
author: Anthropic (Claude Agent SDK documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026: `total_cost_usd` and `costUSD` are client-side estimates computed locally from a price table bundled at build time (or a `modelPricing` table). They can drift from the bill when pricing changes, when the installed SDK does not recognise a model, or when billing rules apply that the client cannot model. The page says not to bill end users or trigger financial decisions from them, and points to the Usage and Cost API or the Console for authoritative figures.
- Which fields include subagents: `usage` excludes them (it counts the top-level loop only); `total_cost_usd` and `modelUsage` include them.
- On `error_max_budget_usd`, `usage` leaves out the response that crossed the budget, while `total_cost_usd` and `modelUsage` include it. After a session crash the final `error_during_execution` result may carry zeroed `usage`, `total_cost_usd` and `modelUsage`. Recovery: take the result of the previous turn (streaming-input mode), else sum assistant-message `usage` once per API response; that recovers main-loop input and cache tokens only, not output tokens, USD cost or subagent usage.
- Per-step `output_tokens` on assistant messages is a placeholder; the real count is on the result message.
- Resumed sessions: Claude Code saves the session's totals to its transcript when the process exits normally and restores them on resume or fork, so a result already includes earlier spend and summing results double-counts. Before v2.1.277 a resumed `claude -p` or SDK session started its totals at zero. `maxBudgetUsd` counts only the call's own spend; restored totals do not count against it, and `/clear` restarts the budget.
- In single-message input mode, if background subagents are still running at the end of the final turn, Claude Code waits for them (up to the cap in the headless page's "background tasks at exit") before it emits the result; the result's cost includes that work.
- Cache entries for your own turns use a 5-minute TTL by default with an API key or on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry or Claude Platform on AWS; `ENABLE_PROMPT_CACHING_1H` requests a 1-hour TTL at a higher write price.
- Pointer: the page links "depth, concurrency, and spend limits" for bounding what subagents add.

## Limits
- Estimates, by the page's own warning. It documents no overshoot figure beyond the "Budget headroom" statement on the agent-loop page. Another note on this URL (code-docs-agent-sdk-cost-tracking) was written for question 4.

## Used in
- research/synthesis/field-6.md

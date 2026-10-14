---
url: https://code.claude.com/docs/en/agent-sdk/cost-tracking
title: "Track cost and usage"
author: Anthropic (Claude Agent SDK documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- `total_cost_usd` and `costUSD` are "client-side estimates, not authoritative billing data"; the SDK prices tokens from a table bundled at build time, so they can drift from the bill. For billing use the Usage and Cost API or the Console usage page.
- Subagent accounting: `usage` excludes subagent activity; `total_cost_usd` and `modelUsage` include it. Use `modelUsage` for whole-tree accounting.
- `maxBudgetUsd` counts only the call's own spend (totals restored from a resumed session do not count) and a `/clear` restarts the budget. A resumed session's result carries the earlier spend (from Claude Code v2.1.277; before that a resumed `-p` session started at zero).
- On `error_max_budget_usd`, `usage` leaves out the response that crossed the budget while `total_cost_usd` and `modelUsage` include it. After a session crash the final result may carry zeroed cost fields.
- Section "Extend the prompt cache TTL to one hour": for an API key or a cloud provider, the default is 5 minutes; with gaps over 5 minutes between short sessions each new session pays full input price. `ENABLE_PROMPT_CACHING_1H` requests one hour for every request in both buckets; `CLAUDE_CODE_PROMPT_CACHE_TTL` and `CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL` (or the settings `promptCacheTtl` and `subagentPromptCacheTtl`) choose per bucket. On a claude.ai subscription within plan usage the main conversation gets one hour without any setting, and drops to five minutes on usage credits.
- The usage object reports `cache_creation_input_tokens` (charged above standard input) and `cache_read_input_tokens` (charged below it).

## Limits
- Vendor documentation, as of October 2026. It explains estimation caveats but gives no measured error between the estimate and the bill.

## Used in
- research/synthesis/field-4.md

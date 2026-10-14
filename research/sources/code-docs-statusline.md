---
url: https://code.claude.com/docs/en/statusline
title: "Customize your status line"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- The status line runs a user script that receives JSON session data on standard input. Context fields (as of October 2026): `context_window.context_window_size` (200000 by default, 1000000 for models with extended context), `context_window.used_percentage`, `context_window.remaining_percentage`, `context_window.total_input_tokens` and `total_output_tokens` (counts from the most recent API response; input includes cache reads and writes), and `context_window.current_usage` (token counts from the last API call).
- Section "Context window fields": `used_percentage` is calculated from input tokens only: input tokens plus cache-creation tokens plus cache-read tokens. It does not include output tokens.
- `current_usage` is null before the first API call and again right after `/compact` until the next API call refills it.
- `exceeds_200k_tokens` is true when the combined input, cache and output tokens of the latest response pass 200k, a fixed threshold whatever the actual window size.
- The status line reports the counts from the last API response, while `/context` adds an estimate for messages added since, so `/context` can read higher until the next response.
- Rate-limit fields (`five_hour`, `seven_day`) appear only for claude.ai subscribers after the first API response; prompt-cache statistics need Claude Code v2.1.251 or later.

## Limits
- Describes the meter's inputs; it says nothing about quality at a given fill level. Field names and version gates are as of October 2026.
- The page gives 200000 as the default window size; for a model listed with a 1M window the page says the field shows 1000000 "for models with extended context", so a script must read the field and not assume a size.

## Used in
- research/synthesis/field-1.md

## Also (question 4)
Re-read on 2026-10-14. As of October 2026.
- Rate limits: the JSON has `rate_limits.five_hour.used_percentage`, `rate_limits.seven_day.used_percentage` (0 to 100) and `rate_limits.five_hour.resets_at`, `rate_limits.seven_day.resets_at` (Unix epoch seconds). The field names are `used_percentage` and `resets_at`; the page uses no `percentUsed`. The object appears only for claude.ai Pro and Max subscribers, or behind a Claude apps gateway that sets a spend limit, and only after the first API response; each window may be absent, and Claude Code drops a window once its `resets_at` passes. `rate_limits.spend_limit` (gateway only) adds `used_percentage`, `resets_at`, and optionally `used_usd`, `limit_usd` and `period` (`daily`, `weekly` or `monthly`).
- `prompt_cache` (Claude Code v2.1.251 or later; cause fields v2.1.260): `warm`, `caching_observed`, `ttl` (`"5m"` or `"1h"`), `expires_at`, `requests`, `misses` (a request that re-processed more than 5% and at least 2,000 tokens it could have read from cache, with no compaction or clearing to explain it), `expected_rebuilds`, `hit_ratio` (0 to 1), `cache_write_tokens`, `miss_recache_tokens`, `last_miss_at`, `last_miss_cause`, `miss_causes` and `recache_tokens_if_cold`. Subagent requests are not counted.
- `refreshInterval` (minimum 1 second) re-runs the command on a timer; event-driven updates can go quiet while the main session is idle, and the script also re-runs when a rate-limit window reaches its `resets_at`. `cost.total_cost_usd` is a client-side list-price estimate that resets on `/clear` (v2.1.211).
- Used in (question 4): research/synthesis/field-4.md

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

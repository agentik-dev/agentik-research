---
url: https://code.claude.com/docs/en/agent-sdk/python
title: "Agent SDK reference, Python and TypeScript (RateLimitEvent, SDKRateLimitEvent)"
author: Anthropic (Claude Agent SDK documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Python reference (https://code.claude.com/docs/en/agent-sdk/python), section "Message Types", as of October 2026: `RateLimitEvent` has `rate_limit_info`, `uuid` and `session_id`, and is "Emitted when rate limit status changes (for example, from `"allowed"` to `"allowed_warning"`)". `RateLimitInfo` has `status` (`allowed`, `allowed_warning`, `rejected`), `resets_at` (Unix timestamp), `rate_limit_type`, `utilization` (0.0 to 1.0), `overage_status`, `overage_resets_at`, `overage_disabled_reason` and `raw` (the CLI's full dict).
- Python `rate_limit_type` takes five values: `five_hour`, `seven_day`, `seven_day_opus`, `seven_day_sonnet`, `overage`.
- TypeScript reference (https://code.claude.com/docs/en/agent-sdk/typescript), section `SDKRateLimitEvent`: the message has `type: "rate_limit_event"` and a `rate_limit_info` object with `status` (same three values), optional `resetsAt` (camelCase), `utilization`, `errorCode` (`credits_required`), `canUserPurchaseCredits` and `hasChargeableSavedPaymentMethod`. When `errorCode` is `credits_required`, "the rejection is from a claude.ai subscription whose included usage is exhausted, and the session cannot continue until the user buys usage credits." Requires Claude Code v2.1.181 or later. The TypeScript type as listed has no `rateLimitType` field.
- The changelog (code-docs-changelog-budgets) adds that headless `rate_limit_event` usage-limit warnings say whether extra usage is on (v2.1.295).

## Limits
- The two references name the fields differently (snake_case in Python, `resetsAt` in TypeScript) and list different members; the page does not show the raw stream line from `claude -p --output-format stream-json`, so the wire spelling of `rateLimitType` is not confirmed here. I read the first 100,000 of 158,280 Python-page characters and the TypeScript type from a saved copy of the page.
- The page does not state that the five-hour window lasts five hours; `five_hour` is a type name only.

## Used in
- research/synthesis/field-4.md

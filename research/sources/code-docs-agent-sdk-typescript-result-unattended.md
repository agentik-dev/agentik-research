---
url: https://code.claude.com/docs/en/agent-sdk/typescript
title: "TypeScript SDK reference (SDKResultMessage, terminal_reason, permission_denials)"
author: Anthropic (Claude Agent SDK documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- `SDKResultMessage` is a union of a success arm (`subtype: "success"`) and an error arm (`error_max_turns`, `error_during_execution`, `error_max_budget_usd`, `error_max_structured_output_retries`). Both carry `uuid`, `session_id`, `duration_ms`, `duration_api_ms`, `is_error`, `num_turns`, `stop_reason`, `total_cost_usd`, `usage`, `modelUsage`, `permission_denials` and an optional `terminal_reason`; the success arm adds `result` and optional `structured_output`; the error arm adds `errors: string[]`.
- `is_error` is typed `boolean` on both arms; `stop_reason` is typed `string | null`. The part I read gives no prose definition for either. The only related text is for deferred tools: the result then has `stop_reason: "tool_deferred"` and a `deferred_tool_use` block (the hooks page names the stop reason `tool_deferred`).
- `permission_denials` is a list of `SDKPermissionDenial` entries, each with `tool_name`, `tool_use_id` and `tool_input`. The `SDKPermissionDeniedMessage` section says `permission_denials` on the result message "is the authoritative record"; the `permission_denied` system message (`type: "system"`) is a best-effort stream event and is not emitted when an MCP prompt tool is set with the default `permissionPrompts: 'host'`.
- `terminal_reason` says why the loop ended. Values listed: `completed`, `max_turns`, `tool_deferred`, `aborted_streaming`, `aborted_tools`, `hook_stopped`, `stop_hook_prevented`, `background_requested`, `blocking_limit`, `rapid_refill_breaker`, `prompt_too_long`, `image_error`, `model_error`, `api_error`, `malformed_tool_use_exhausted`, `budget_exhausted`, `structured_output_retry_exhausted`, `tool_deferred_unavailable`, `turn_setup_failed`.

## Limits
- I read characters 0 to 200,000 of about 291,000 and found the result definition in the second hundred thousand; `SDKRateLimitEvent` was not in what I read (another note, code-docs-agent-sdk-rate-limit-event, covers it). Field descriptions are the page's types as extracted; the extract gave no definition of what each `terminal_reason` value means.

## Bears on repo claims
- A run whose result says `subtype=success` and `is_error=false` while permission requests were denied: the `permission_denials` array and the `terminal_reason` field are the documented ways to tell, and the success arm has no field that marks a denial. `stop_reason = tool_use` as the sign of a finished-but-killed run is not a documented value in the part I read; `terminal_reason` lists `completed` and `background_requested`, among others.

## Used in
- research/synthesis/field-6.md

## Also (question 10)
Re-read part of the page on 2026-10-14 (characters 100,000 to 200,000 of 291,739). As of October 2026.
- `SDKResultMessage` has a success arm and an error arm; both carry `permission_denials` (a list of `tool_name`, `tool_use_id`, `tool_input`), `total_cost_usd`, `is_error` and an optional `terminal_reason`. The section on the denied-message event says the stream event is best-effort and `permission_denials` on the result message is "the authoritative record." The page, in that part, does not say whether a success result can coexist with denied tool calls, and does not address subagent denials.
- Used in (question 10): research/synthesis/field-10.md

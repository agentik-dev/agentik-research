---
url: https://code.claude.com/docs/en/llm-gateway-protocol
title: "Claude Code gateway compatibility guide"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Request headers", as of October 2026: a gateway must forward `anthropic-version` and `anthropic-beta` unchanged. When the developer uses a claude.ai login with `ANTHROPIC_BASE_URL` set and no gateway credential variable, `anthropic-beta` carries an OAuth capability the upstream requires; stripping it fails those requests with HTTP 401. The headers `x-claude-code-session-id`, `x-claude-code-agent-id` and `x-claude-code-parent-agent-id` let a gateway attribute cost to a session or a subagent.
- Section "Gateway hint headers" (Claude Code v2.1.273 or later): routing hints such as `x-claude-code-request-class` (values `main`, `subagent`, `workflow`, `compaction`, `auxiliary`) are sent by default on a direct Anthropic connection, off by default on a custom base URL, and enabled there with `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1`. They carry fixed vocabularies, tool names and durations, never prompt text.
- Section "Feature pass-through": Claude Code sends an `ANTHROPIC_BASE_URL` gateway the full set of beta headers and body fields it sends to the Anthropic API. A gateway that strips one half of a header and field pair gets HTTP 400 errors. Prompt caching has no beta pairing: if the gateway drops `cache_control`, "no error" appears and the conversation bills as uncached input on every turn. Token counting is optional; without `/v1/messages/count_tokens` Claude Code falls back to a character-based estimate.
- Section "System prompt attribution block": a gateway that reshapes the system array can break the strip of the attribution block and the cache key; `CLAUDE_CODE_ATTRIBUTION_HEADER=0` omits the block. From Claude Code v2.1.181 the block is stable for a conversation behind a custom base URL.
- Section "Streaming": a gateway that buffers a response stalls Claude Code; a stream with no bytes past the idle timeout is aborted, and SSE `ping` events can be the only bytes during a long thinking pause.
- Section "Model discovery": off by default; when on, Claude Code reads `GET /v1/models?limit=1000` with a 3-second default timeout and keeps entries whose `id` contains `claude` or `anthropic` (case-insensitive).
- Unrecognised model ids: Claude Code assumes a 200K-token window (1M with `[1m]`) and treats unknown names as current models that receive adaptive reasoning, effort and context-management fields, which a non-Anthropic upstream can reject with HTTP 400.

## Limits
- Written for gateway operators; it describes the protocol, not how well any local model serves it. Vendor documentation, as of October 2026.

## Used in
- research/synthesis/field-10.md

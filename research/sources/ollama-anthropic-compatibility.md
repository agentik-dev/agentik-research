---
url: https://docs.ollama.com/api/anthropic-compatibility
title: "Anthropic compatibility"
author: Ollama (documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Setup for Claude Code against a local server, as of October 2026: set `ANTHROPIC_AUTH_TOKEN=ollama` (required but ignored) and `ANTHROPIC_BASE_URL=http://localhost:11434`, then run Claude Code with a model name.
- Section "Endpoints", supported on `/v1/messages`: messages, streaming, system prompts, multi-turn conversations, base64 vision, tools and tool results, thinking, and the request fields `model`, `max_tokens`, `messages`, `system`, `stream`, `temperature`, `top_p`, `top_k`, `stop_sequences`, `tools`, `thinking` and `output_config.effort`.
- Section "Differences from the Anthropic API", not supported: `tool_choice`, `metadata`, `/v1/messages/count_tokens`, prompt caching (`cache_control` blocks), the Batches API, citations, PDF document blocks, and error events during streaming. Partial: URL images (base64 works), extended thinking (`budget_tokens` accepted but not enforced). Token counts are approximations; the local server does not validate API keys.
- Section "Models": tool calling is shown with `qwen3-coder` and `gemma4:31b`, and the page does not call them recommended. A local model can be copied to a Claude-style name with `ollama cp` so a tool that expects such a name finds it.

## Limits
- Vendor documentation; no measured speed or quality. The fetch tool's extract did not carry a required Ollama version; the integration page (ollama-claude-code-integration) also gives none.

## Used in
- research/synthesis/field-10.md

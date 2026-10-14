---
url: https://docs.ollama.com/context-length
title: "Context length (Ollama)"
author: Ollama (documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026 the default context length depends on memory: 4k tokens under 24 GiB of VRAM, 32k between 24 and 48 GiB, 256k at 48 GiB or more. Tasks such as web search, agents and coding tools should use at least 64,000 tokens.
- A larger context uses more memory; `OLLAMA_CONTEXT_LENGTH` (for example `64000`) or the app's slider sets it; `ollama ps` shows the allocated context and the share offloaded to CPU. Cloud models default to their maximum context.

## Limits
- Vendor documentation. It does not say how Claude Code's own window assumptions interact with these numbers; kodam-80b-local-claude-code reports one case where they mismatched.

## Used in
- research/synthesis/field-10.md

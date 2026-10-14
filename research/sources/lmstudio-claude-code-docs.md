---
url: https://www.lmstudio.ai/docs/integrations/claude-code
title: "Claude Code (LM Studio integration)"
author: LM Studio (documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026: start the local server (default port 1234), then set `ANTHROPIC_BASE_URL=http://localhost:1234`, `ANTHROPIC_AUTH_TOKEN=lmstudio` (or an LM Studio API token if authentication is required) and `CLAUDE_CODE_ATTRIBUTION_HEADER=0`, and run Claude Code with a model name; the page's example model is `openai/gpt-oss-20b`.
- Context advice: use a model and server settings with more than about 25k tokens of context length, because Claude Code uses a lot of context.
- The extract showed no required LM Studio version, no statement on tool-use support, and no list of unsupported features.

## Limits
- Vendor documentation, short; no measurement. As of October 2026.

## Used in
- research/synthesis/field-10.md

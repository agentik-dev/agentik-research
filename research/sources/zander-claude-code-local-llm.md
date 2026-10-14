---
url: https://renezander.com/guides/claude-code-local-llm-anthropic-base-url/
title: "Claude Code with Local LLMs and ANTHROPIC_BASE_URL: Ollama, LM Studio, llama.cpp, vLLM"
author: René Zander
published: 2026-04-29 (changelog: first published 2026-04-22, reviewed 2026-07-11)
accessed: 2026-10-14
kind: reported
---

## What it says
- A setup guide for four backends. It names Ollama 0.14.0 or later and LM Studio 0.4.1 or later as providing a native Anthropic-format endpoint; llama.cpp as partial; vLLM as native but needing tool-calling flags (`--enable-auto-tool-choice` and a model-matched `--tool-call-parser`).
- The author's rule: "32K is the floor" for Claude Code and 64K is the sweet spot; the system prompt and tool definitions consume the window, so a smaller one gives "context length exceeded" or silent truncation. LM Studio's own docs say about 25K; the author rejects that for 32K.
- Tool-call failures listed with causes: missing vLLM flags or wrong parser, a model not trained for tool calls, llama.cpp without `--jinja`.

## Limits
- By the page's own record no test method or results are given; the "around 300 tok/sec on M2 Ultra" and "faster per token" statements are claims without measurement, and the context recommendations are the author's judgment. Useful for the failure list only.

## Used in
- Read for question 10 and kept for the site pages on cost lanes; research/synthesis/field-10.md does not cite it (the synthesis has a 9,000-byte cap).

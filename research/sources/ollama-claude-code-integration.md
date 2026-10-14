---
url: https://docs.ollama.com/integrations/claude-code
title: "Claude Code (Ollama integration)"
author: Ollama (documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026 the page launches Claude Code with `ollama launch claude`, connected to local and cloud models through Ollama's Anthropic-compatible API. Manual setup sets `ANTHROPIC_AUTH_TOKEN=ollama`, an empty `ANTHROPIC_API_KEY` and `ANTHROPIC_BASE_URL=http://localhost:11434`.
- For local models it says to pick a model that supports tools and set a context window of at least 64k tokens; it tells readers to choose a model with enough context for the repository. It lists example model names but labels none as recommended.
- Caveats: hosted web search and advanced tool controls are not fully supported on the direct cloud connection; Claude Code prompts for permission on most actions. The page makes no claim about speed or output quality, and gives no minimum Ollama or Claude Code version in the extract.

## Limits
- Vendor documentation; the figure 64k is the vendor's floor for this use, not a measured threshold. As of October 2026.

## Used in
- Read for question 10 and kept for the site pages on cost lanes; research/synthesis/field-10.md does not cite it (the synthesis has a 9,000-byte cap).

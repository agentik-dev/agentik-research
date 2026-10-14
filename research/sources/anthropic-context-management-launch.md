---
url: https://claude.com/blog/context-management
title: "Managing context on the Claude Developer Platform"
author: Anthropic (no individual author named on the page)
published: 2025-09-29 (the anthropic.com/news address redirects to this page)
accessed: 2026-10-14
kind: documented
---

## What it says
- Announces two public-beta features, as of September 2025: context editing, which clears stale tool calls and results from inside the window as the agent nears the token limit, and a file-based memory tool that stores information outside the window in a developer-hosted directory that persists across conversations.
- Reported numbers (section "Performance Results"): on an internal agentic-search evaluation, the memory tool combined with context editing improved performance 39 percent over baseline, and context editing alone 29 percent. In a 100-turn web-search evaluation, context editing let agents finish workflows that otherwise failed from context exhaustion, while cutting token use by 84 percent.
- The post says clearing stale results keeps Claude focused on relevant context.
- Says Claude Sonnet 4.5 has built-in context awareness that tracks available tokens.

## Limits
- The evaluation is internal and its tasks, sample sizes and baseline are not described on the page, so the figures cannot be reproduced. Vendor announcement for a product feature.
- The baseline appears to be an agent without clearing that runs out of context; the 84 percent reduction is therefore partly a cost effect, not proof that long context lowers accuracy.
- The October 2026 docs (anthropic-context-windows-doc) still list tool-result clearing as a context-editing strategy.

## Used in
- research/synthesis/field-1.md

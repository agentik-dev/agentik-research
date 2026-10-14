---
url: https://claude.com/blog/context-management
title: "Managing context on the Claude Developer Platform"
author: Anthropic
published: 2025-09-29
accessed: 2026-10-14
kind: documented
---

## What it says
- Announces context editing, which removes stale tool calls and results as the window nears its limit, and a memory tool, a client-hosted file store the model can read and write outside the window, persisting across conversations.
- Reported figures, with no method shown: on an internal agentic-search evaluation of complex multi-step tasks the memory tool combined with context editing scored 39% above baseline and context editing alone 29% above; in a 100-turn web-search evaluation context editing cut token consumption by 84% and let workflows finish that would otherwise have failed from context exhaustion.
- The page does not mention compaction and does not say what clearing loses.

## Limits
- Vendor announcement. The benchmark and models behind the figures are not named on the page, so they are not measurements a reader can check. It covers clearing and external notes, the two alternatives to summaries, not summaries.

## Used in
- research/synthesis/field-2.md

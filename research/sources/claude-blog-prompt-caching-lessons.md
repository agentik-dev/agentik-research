---
url: https://claude.dev/blog/lessons-from-building-claude-code-prompt-caching-is-everything/
title: "Lessons from building Claude Code: Prompt caching is everything"
author: Thariq Shihipar (Anthropic, Claude Code team)
published: 2026-04-30
accessed: 2026-10-14
kind: documented
---

## What it says
- The team monitors Claude Code's prompt cache hit rate with alerts and declares an incident when it drops too low; the post says a few percentage points of miss rate can change cost and latency a great deal, and gives no threshold. A high hit rate lets the team offer more generous rate limits on subscription plans.
- Caching is prefix matching, so static content goes first (system prompt and tools, then CLAUDE.md, then session context, then messages). Past breakages: a detailed timestamp in the system prompt, non-deterministic tool ordering, and changes to Agent tool parameters. Changing facts (time, edited files) go in the next message inside a `<system-reminder>` tag.
- Caches are per model: at 100k tokens into an Opus session, switching to Haiku costs more than letting Opus answer; switch through subagents with a hand-off message instead.
- Plan mode keeps the full tool set in every request and uses `EnterPlanMode` and `ExitPlanMode` as tools; MCP tools are sent as name-only stubs with deferred loading in a fixed order.
- Compaction reuses the parent's exact system prompt, context and tools and appends the compaction prompt as a user message, so it hits the parent's cache; a separate summarization call with a different prompt misses the cache and pays full input rates. A cache hit on that call costs one tenth of the normal price (figure caption). The summary is about 20k tokens.

## Limits
- An Anthropic engineer's design write-up; no measured hit rates, no cache lifetime, no cost totals. The link on Anthropic's documentation uses the claude.com address, which returned a permanent redirect to the claude.dev address I opened; the page content carried the author and date above.

## Used in
- research/synthesis/field-4.md

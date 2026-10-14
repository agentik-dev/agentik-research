---
url: https://claude.com/blog/lessons-from-building-claude-code-prompt-caching-is-everything
title: "Lessons from building Claude Code: Prompt caching is everything"
author: Thariq Shihipar (Anthropic)
published: 2026-04-30
accessed: 2026-10-14
kind: documented
---

## What it says
- The harness is built around prompt caching because a high cache hit rate lowers cost and latency; the team alerts on the hit rate and treats breaks as incidents. "A few percentage points of cache miss rate can dramatically affect cost and latency."
- Caching is a prefix match, so order matters: static system prompt and tools first, then CLAUDE.md (cached per project), then session context, then conversation messages. Past breakages named in the post: a timestamp in the static prompt, non-deterministic tool ordering, and changed tool parameters.
- Updated information goes into the next user message or tool result as a `<system-reminder>` tag, not into the system prompt, to avoid a cache miss.
- Do not add or remove tools mid-session, and do not switch models mid-session: each model has its own cache, so a switch rebuilds it. Plan mode and tool search (deferred stubs) are designed to keep the tool list stable.
- Compaction forks the parent's exact system prompt, tools and history and appends the compaction prompt, so it reuses the cache at one tenth the price (the post's Figure B), producing a summary of about 20k tokens.

## Limits
- The page redirected from the claude.com host to another Anthropic host and I read it at the redirect target. A vendor engineering account with no overall savings percentage. Volatile; the post is dated 30 April 2026.

## Used in
- research/synthesis/field-3.md

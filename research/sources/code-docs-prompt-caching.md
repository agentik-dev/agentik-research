---
url: https://code.claude.com/docs/en/prompt-caching
title: "How Claude Code uses prompt caching"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; names Claude Code versions up to v2.1.283)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "How the cache is organized": each request re-sends the full context, and the API caches by exact prefix match. Layers, in order: system prompt (core instructions and tool definitions); project context (CLAUDE.md, auto memory, unscoped rules; changes when a session starts or after `/clear` or `/compact`); conversation (changes every turn). A change in an earlier layer invalidates everything after it.
- Section "Editing CLAUDE.md mid-session": project-root and user-level CLAUDE.md are read once at session start and held in memory. Editing them mid-session leaves the cache intact but does not apply; the new content loads on the next `/clear`, `/compact` or restart. Nested CLAUDE.md files and path-scoped rules load later, into the conversation, on demand.
- Section "Invoking skills and commands": skill and command instructions are injected as user messages at the point of invocation, so nothing earlier changes and the cache holds. Plugin skills, commands, agents and hooks added mid-session are appended and never invalidate the cache.
- Section "Compacting the conversation": compaction replaces the history, so the conversation layer is rebuilt. It reloads project context from disk, which hits the cache only if CLAUDE.md and memory are unchanged since the session started. With a warm cache the summarization request reads the prefix from cache; after a break longer than the cache lifetime it reprocesses the whole history as uncached input.
- Section "Cache lifetime": entries expire after inactivity and each hit resets the timer. The API offers a five-minute TTL and a one-hour TTL (higher write price). In Claude Code the main conversation gets one hour on a Claude subscription within plan usage and five minutes on an API key, usage credits or a cloud provider; subagents, workflows, forks and compaction requests default to five minutes. `promptCacheTtl` or `CLAUDE_CODE_PROMPT_CACHE_TTL` chooses the TTL (Claude Code v2.1.242 or later).
- Section "Cache scope": in Claude Code the cache is effectively scoped to one machine and directory, because the system prompt embeds the auto memory paths.
- The page says re-reads are billed at the cached token rate, "below the standard input rate", and does not state multipliers; see anthropic-api-docs-prompt-caching and anthropic-pricing-doc for them.

## Limits
- Vendor documentation; behaviour and defaults (TTL by billing type, which actions invalidate) are volatile and are as of October 2026.

## Used in
- research/synthesis/field-3.md

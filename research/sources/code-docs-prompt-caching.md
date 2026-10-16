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
- Re-opened 2026-10-14 (site sitting): section "Which TTL each request gets" confirms the claim. Unless the user chooses a TTL, Claude Code requests the one-hour TTL for the main conversation only on a Claude subscription within the plan's included usage; on usage credits, an API key or a cloud provider the main conversation gets five minutes, and going over plan usage drops it to five minutes. The same table gives subagents, workflows, forks, compaction and session titles five minutes even on a subscription, except server-controlled helper requests (one hour). Section "Choose the TTL yourself": `promptCacheTtl` set to `1h` gives an API-key user a one-hour main conversation (v2.1.242 or later). The page states no price multipliers; it says only that re-reads bill at the cached token rate and links to the API page (see anthropic-api-docs-prompt-caching for 1.25, 2 and 0.1 times).

## Limits
- Vendor documentation; behaviour and defaults (TTL by billing type, which actions invalidate) are volatile and are as of October 2026.

## Used in
- research/synthesis/field-3.md
- journal-wake

## Also (question 4)
Re-read on 2026-10-14 for cache lifetime, idle cost and subagents. As of October 2026.
- Section "Which TTL each request gets": every request falls in one of two buckets. "Main conversation" is interactive turns, non-interactive `-p` runs and Agent SDK turns, plus helpers run inline with them. "Everything else" is subagents, workflows, in-process teammates, forks, compaction and session titles. Defaults: on a Claude subscription within plan usage, the main conversation gets one hour and everything else five minutes, except a small set of server-controlled helper requests that get one hour; on usage credits, an API key or a cloud provider, both buckets get five minutes. Going over plan usage drops the main conversation to five minutes (the lower write rate).
- Section "Choose the TTL yourself" (v2.1.242 or later): main conversation by `promptCacheTtl` or `CLAUDE_CODE_PROMPT_CACHE_TTL`; everything else by `subagentPromptCacheTtl` or `CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL`; each takes `5m` or `1h`. Precedence: `FORCE_PROMPT_CACHING_5M=1`, the bucket's environment variable, the bucket's setting, a subagent's `experimental.cacheTtl` frontmatter (v2.1.248 or later), `ENABLE_PROMPT_CACHING_1H=1`, then the default. `claude -p "hello" --output-format json` shows which lifetime the writes used under `usage.cache_creation`.
- Section "Subagents and the cache": a subagent's first request does not read the parent's cache, and it gets five minutes even on a subscription until a longer TTL is chosen; a fork inherits the parent's prompt, tools and history and reads the parent's cache; a resumed subagent can read the cache its earlier run warmed; in a workflow fan-out Claude Code holds all but the first agent for up to 5 seconds by default so they can read the prefix the first one cached.
- The page says the longer lifetime helps when you leave a session idle and come back, and "costs more on short bursts of work that never idle past five minutes".
- Actions that invalidate the cache: switching models (each model has its own cache); changing effort on most models (not on Opus 5.5, Sonnet 5.5, Haiku 5.5 or Fable 5.1 with an API key or a subscription, from v2.1.260 for Fable 5.1); turning on fast mode; connecting or removing an MCP server, or denying a whole tool, when tool search is off; compacting; accumulating many images (the oldest are removed in batches); upgrading Claude Code. Actions that keep it: editing files, editing CLAUDE.md mid-session (not applied until `/clear`, `/compact` or restart), changing permission mode or output style, invoking skills, `/recap`, spawning a subagent, and `/rewind` (which returns to an entry already cached).
- Compaction while the cache is warm reads the prefix from cache and so costs "a fraction of what the context size suggests"; after a break past the lifetime it reprocesses the full history as uncached input, which is why `/compact` costs the most when you resume an old session.
- Scope: the cache is effectively per machine and directory; parallel sessions in the same directory share a prefix, sequential sessions only when the startup git-status snapshot matches.
- Used in (question 4): research/synthesis/field-4.md

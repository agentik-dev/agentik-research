---
url: https://theregister.com/2026/04/13/claude_code_cache_confusion
title: "Claude Code cache confusion"
author: Tim Anderson (The Register)
published: 2026-04-13
accessed: 2026-10-14
kind: reported
---

## What it says
- Reports a user's bug report that Claude Code's prompt cache lifetime was one hour from about 1 February 2026 and was switched back to five minutes for many requests around 7 March 2026, with users reporting faster-depleting quotas. Anthropic said the change should not raise costs.
- Jarred Sumner of Anthropic is quoted as saying the five-minute change made Claude Code cheaper, because many requests are one-shot calls that never reuse the cache, that the client picks the lifetime automatically and that there were no plans for a global setting. Boris Cherny is quoted as saying cache misses are expensive with a 1M-token window, especially when a user returns to a stale session after an hour away, and that Anthropic was investigating a 400,000-token default with 1M on request.
- Prices stated: five-minute writes cost 25 percent more than base input, one-hour writes 100 percent more, reads about 10 percent of base.
- The bug reporter revised the analysis to agree that subagent sessions gain from the cheaper five-minute write, since they run quickly and their caches rarely expire.

## Limits
- A news report relaying a bug report and staff comments; the quotes are the reporter's. The later documentation (code-docs-prompt-caching) adds `promptCacheTtl` and `subagentPromptCacheTtl`, so "no plans for a global setting" is superseded as of October 2026.

## Used in
- research/synthesis/field-4.md

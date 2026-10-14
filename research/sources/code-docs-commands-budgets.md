---
url: https://code.claude.com/docs/en/commands
title: "Commands (entries: /loop, /goal, /usage, /usage-credits, /rate-limit-options, /autocompact, /schedule)"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- `/loop [interval] [prompt]` is a bundled skill that runs a prompt repeatedly while the session stays open. Omit the interval and Claude self-paces between iterations; omit the prompt and it runs the built-in maintenance prompt or your `loop.md`. Alias `/proactive`. The entry says nothing about a question asking whether to run a long-interval loop in the cloud or in the session.
- `/schedule [description]` creates, updates, lists or runs routines, which execute in the cloud (alias `/routines`).
- `/goal [condition|clear]` keeps Claude working across turns until the condition is met.
- `/usage` shows session cost, plan usage limits and activity stats; on Pro, Max, Team and Enterprise it adds a breakdown of what counts against plan limits. `/cost` and `/stats` are aliases.
- `/usage-credits` configures usage credits (previously `/extra-usage`); `/rate-limit-options` shows ways to keep working when a claude.ai limit blocks a request: wait and continue automatically, add usage credits, or upgrade. The wait rows need v2.1.234 or later.
- `/autocompact [auto|<tokens>]` sets how full the context gets before auto-compaction (v2.1.221 or later).

## Limits
- WebFetch saved the page's full text to a file because of its size; I read these entries from that file. As of October 2026.

## Used in
- research/synthesis/field-4.md

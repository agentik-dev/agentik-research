---
url: https://code.claude.com/docs/en/network-config
title: "Enterprise network configuration (section: Streaming idle watchdogs)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Streaming idle watchdogs", as of October 2026: Claude Code runs four independent timers that abort a streaming model response when it goes quiet, "so a dead connection fails and retries instead of hanging". Defaults on the direct Anthropic API: first-byte deadline 180 seconds (300 seconds elsewhere, plus one second per 32 KB of request body); event-level watchdog 300 seconds, on every provider; byte-level watchdog 180 seconds (300 seconds through some gateways or when feature flags were not fetched); body idle timeout 5 minutes, on providers other than the direct API.
- Tuning: `CLAUDE_STREAM_IDLE_TIMEOUT_MS` sets both watchdogs; values under 5 minutes are raised to 5 minutes, and the byte-level cap is 30 minutes. `CLAUDE_BYTE_STREAM_IDLE_TIMEOUT_MS` sets only the byte-level one (10 seconds to 30 minutes). `CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS` sets the first-byte deadline directly.
- When a watchdog aborts a stalled stream, Claude Code treats it as a mid-stream failure: it retries the request or ends the turn with an error, keeps completed output and shows an incomplete-response notice, or ends the turn normally, depending on how far the response got. In a non-interactive session, and for a subagent's response in any session, Claude Code may first prompt Claude to continue the cut-off response.

## Limits
- These timers watch one API response stream. They do not detect a session that streams fine but makes no progress on the task (a loop, a hung test run, a wait on a lock).

## Used in
- research/synthesis/field-6.md
- docs/index.md

---
url: https://code.claude.com/docs/en/changelog
title: "Claude Code changelog (October 2026 entries on limits, loops, cache and timeouts)"
author: Anthropic (Claude Code documentation)
published: undated page; newest entry read is v2.1.296, dated 9 October 2026
accessed: 2026-10-14
kind: documented
---

## What it says
- Usage limits: v2.1.295 (8 October 2026) headless `rate_limit_event` usage-limit warnings say whether extra usage is on, and `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` caps how long unattended retry mode waits out 429 and 529 errors. v2.1.292 (6 October 2026) stops the usage-limit alert from repeating once per background agent. v2.1.288 (2 October 2026) makes unattended sessions stop retrying for hours after a very long stream fails and give up after three timeouts.
- Loops: v2.1.295 and v2.1.292 fix background `/loop` runs that stopped silently when a wakeup came due while the process was down or restarted; v2.1.290 restores `/loop` with an interval after compaction; v2.1.293 reverts a 2.1.290 change that told Claude about lost cloud wakeups.
- Prompt cache: v2.1.290 (5 October 2026) resumed subagents and teammates no longer lose their earlier thinking and prompt cache on a mid-run message; v2.1.296 (9 October 2026) `--max-budget-usd` and the status line price Sonnet 5.5 cache reads at 0.10 US dollars per million tokens (it was 0.20 for `--max-budget-usd`).
- Timeouts: v2.1.288 (2 October 2026) the background command time limit applies only in unattended sessions; v2.1.292 one-shot `claude -p` and SDK runs wait for a background command instead of stopping it 5 seconds after the final result; v2.1.295 adds `onFailure: "block"` for command and HTTP hooks.
- Compaction: v2.1.288 `/autocompact` saves the window per model; long conversations auto-compact instead of failing with "Prompt is too long" when the last reply reported zero token usage.
- The part read has no entry that names `autoContinueAtUsageLimit`, `--max-turns` or a default hook timeout.

## Limits
- I read the first 100,000 of 1,052,496 characters, down to part of the v2.1.288 entries; the TTL, autoContinue and idle-compaction introductions are in older releases I did not read. The entries are a paraphrase of what WebFetch extracted.

## Used in
- research/synthesis/field-4.md

---
url: https://code.claude.com/docs/en/settings-reference
title: "Settings reference (autoCompactEnabled, autoCompactWindow, idleCompaction)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- `autoCompactEnabled`: Boolean, default `true`. The manual `/compact` command keeps working when it is off. Turning it off also turns idle compaction off. `DISABLE_AUTO_COMPACT` turns auto-compact off for one session, and whichever of the two turns it off, the other cannot turn it back on.
- `autoCompactWindow`: a token count from 100000 to 1000000, capped at the model's window; default unset, so Claude Code picks a window tuned for the model. `--autocompact` overrides it for one launch and `CLAUDE_CODE_AUTO_COMPACT_WINDOW` overrides both.
- `idleCompaction`: Boolean, default `true`, requires Claude Code v2.1.290 or later (earlier versions ignore the key; turn off `autoCompactEnabled` there). It compacts a long conversation you have stepped away from shortly before its prompt cache expires, so the next message sends a summary instead of the whole conversation. On return the conversation shows "Compacted while idle, before the prompt cache expired".
- Idle compaction applies only when all five hold: an interactive terminal session; the one-hour prompt-cache lifetime; Claude Code can fetch feature flags from Anthropic; the context has reached the token threshold (default 200,000, set with `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS`, values below 100000 raised to 100000); and about 54 minutes have passed since the last request with the computer awake.
- `DISABLE_AUTO_COMPACT` turns idle compaction off along with auto-compaction.

## Limits
- As of October 2026. Claim (a) of the brief is supported on every point except the hook payload: the page says nothing about what `trigger` value a PreCompact hook receives for an idle pass. That `trigger: "auto"` is sent is the repo's observation only.
- Inference, not stated on the page: read together, the five conditions suggest idle compaction does not apply to `claude -p` runs or to sessions on the five-minute cache lifetime. The repo's account of two sittings compacted overnight is consistent with an interactive session on the one-hour lifetime.
- The changelog (anthropic-changelog-compaction) has no entry that names `idleCompaction`.
- The WebFetch tool truncates this very long page; these sections were read at a character offset past the first 100,000 characters.

## Used in
- research/synthesis/field-2.md

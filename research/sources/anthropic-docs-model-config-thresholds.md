---
url: https://code.claude.com/docs/en/model-config
title: "Model configuration (Default auto-compact thresholds; Set the auto-compact window)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026, with no auto-compact window set, Claude Code compacts when the conversation reaches the model's context limit, with these exceptions: cloud sessions compact as the conversation approaches the limit; Sonnet 4.6 and Opus 4.6 without extended context compact at the 200K boundary; with `CLAUDE_CODE_DISABLE_1M_CONTEXT=1`, models with a native 1M window compact at the 200K boundary; models with a native 1M window (Fable models, Sonnet 5 and later, Haiku 5.5, Opus 4.7 and later) compact before the window fills, at about 967K tokens by default; an unrecognized model ID compacts at the window Claude Code assumes for it.
- The window is settable with `/autocompact` (for example `/autocompact 500k`), the `autoCompactWindow` setting, the `--autocompact` flag or `CLAUDE_CODE_AUTO_COMPACT_WINDOW`. The command and flag accept 100K to 1M tokens.
- The page states the boundary as a token count, not as a percentage of the window.

## Limits
- Documentation of the trigger only; nothing on summary quality. Claim (d) of the brief (threshold, dated): the documented threshold is the limit itself, about 967K tokens on the 1M models. Older percentage figures (an "80%" warning) come from the changelog, not this page. Third-party pages give 75% to 95%; they were not opened and are not cited.
- The WebFetch tool read the first 100,000 of about 116,600 characters; the thresholds section sits inside that range.

## Used in
- research/synthesis/field-2.md

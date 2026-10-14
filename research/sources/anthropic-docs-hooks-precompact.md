---
url: https://code.claude.com/docs/en/hooks
title: "Hooks reference (PreCompact and PostCompact sections)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- PreCompact runs before a compact operation. Matcher values: `manual` (fires on `/compact`) and `auto` (fires on "Auto-compact when the conversation reaches the auto-compact window"). The page names no third value, and it does not say whether idle compaction sends `auto`.
- Exit code 2, or JSON with `"decision": "block"`, blocks compaction. For a manual `/compact` the stderr message is shown to the user.
- Blocking automatic compaction depends on when it fires. A proactive compaction before the context limit is skipped and the conversation continues uncompacted. "If compaction was triggered to recover from a context-limit error already returned by the API, the underlying error surfaces and the current request fails."
- Claude Code discards a PreCompact hook's `systemMessage` and `continue` fields.
- PreCompact input carries `trigger` and `custom_instructions`. For `manual`, `custom_instructions` holds what the user passed to `/compact` (null if nothing). For `auto` it is null. These are inputs; the page documents no output channel for compaction instructions.
- General rule on the same page: for most events, stdout goes to the debug log and is not shown in the transcript. The events whose plain-text stdout is added as context are UserPromptSubmit, UserPromptExpansion, SessionStart and PostModelSwitch. PreCompact is not among them.
- PostCompact has no decision control and receives `trigger` and `compact_summary` (the generated summary), so a hook can log or archive the summary.

## Limits
- Claim (b) of the brief, that a passing PreCompact hook's stdout is read as compaction instructions, is not in this page; the page's general stdout rule points the other way. The only support is the agentik-session repo's own observation (see agentik-session-compaction-rule). The docs may lag the binary, or the observation may be a quirk of one version.
- The "blocked auto compaction near the hard limit makes the request fail" half of claim (b) is documented here.
- The WebFetch tool truncates this long page; the PreCompact text was read at a character offset past the first 100,000 characters.

## Used in
- research/synthesis/field-2.md

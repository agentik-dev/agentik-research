---
url: https://code.claude.com/docs/en/errors
title: "Error reference (sections on auto mode: no verdict from the classifier or the server)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

All items are as of October 2026. The fetch returned only the first 100,000 of 495,069 characters; the sections "Command blocked by the worktree isolation checks" and "has a wildcard before the rest of the command" were not in what I read.

## What it says
- Section "Auto mode cannot determine the safety of an action": the classifier could not produce a decision, so auto mode does not approve the action. Causes listed: the classifier model is temporarily unavailable (the message may name `(rate-limited)`, `(overloaded)`, `(server error)`, `(timed out)` or `(connection failed)`), the response did not parse, the conversation outgrew the classifier's context window (the message suggests `/compact`), or on Amazon Bedrock the account cannot invoke the classifier model.
- Same section: a distinct cause is "a safety check separate from auto mode" blocking the request "because of earlier conversation content". Claude Code tells Claude this is not a judgement that the action is unsafe. Retrying does not help, because the same content triggers the filter again. The fix is to switch permission modes and approve by hand, or to start a new conversation without that content. These denials do not count toward auto mode's pause thresholds (they did before v2.1.225). The section does not mention personal data or PII.
- Version notes in that section: v2.1.216 refreshes an expired OAuth token and retries the classifier request once (before, every checked action was denied until the token was refreshed); v2.1.229 added failure categories to the message; v2.1.296 shows the message as a dim "Not run" row instead of a red error.
- Section "The server returned no safety verdict": under server-side review, an action without a verdict is denied; after 10 consecutive responses with no verdict the turn stops. Before v2.1.280 each such action was denied at once and the turn never stopped.

## Limits
- Documentation of causes and fixes; it gives no frequency. Only the first fifth of the page was read.

## Used in
- research/synthesis/field-7.md

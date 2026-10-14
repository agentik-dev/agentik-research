---
url: https://code.claude.com/docs/en/errors
title: "Error reference (sections: Automatic retries, No response from API, The response above may be incomplete)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Automatic retries", as of October 2026: Claude Code retries transient failures up to 10 times (`CLAUDE_CODE_MAX_RETRIES`) with exponential backoff (cap of 15 as of v2.1.186). A stalled stream after headers arrived is aborted and re-streamed at most once; a request with no response headers inside the first-byte deadline is re-sent at most once per model request. `CLAUDE_CODE_RETRY_WATCHDOG=1` retries 429 and 529 without limit (from v2.1.199, 300 retries for other transient errors, about three hours of backoff); a standard-speed 429 that reports a spend limit or exhausted credits still fails at once.
- Not retried: failures after Claude completed a block of text or a tool call. Claude Code keeps the completed output and does not re-run the request, "because that could execute the same tool calls twice".
- Section "The response above may be incomplete": in `-p` with default text output Claude Code prints the last completed text block followed by this message; with `json` or `stream-json` it is reported in the `result` field. For a cut-off response with text but no tool calls, Claude Code prompts Claude to continue up to three times in a row before showing the notice. For a headless run the page's fix is to resume the session and send `continue`.
- Section "No response from API": the deadline for a first attempt is the byte-level watchdog timeout (or `CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS`, clamped to 10 seconds to 30 minutes); the retry waits `API_TIMEOUT_MS` minus 1 second, just under 10 minutes by default. If the retry also gets no answer, the turn ends with the error.
- A progress notice appears after 20 seconds with no data from the API (90 seconds during advisor calls).

## Limits
- I read the first 100,000 of 495,069 characters. The section "Spend limit reached" was in the unread part, so this note says nothing about it beyond what the retries section states. Figures come from the fetch tool's extract of the page.

## Used in
- research/synthesis/field-6.md

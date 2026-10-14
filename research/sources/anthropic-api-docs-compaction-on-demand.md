---
url: https://platform.claude.com/docs/en/build-with-claude/compaction-on-demand
title: "Compaction on demand"
author: Anthropic (Claude API documentation)
published: undated (living documentation; read 2026-10-14)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026 (beta, header `compact-2026-09-04`): one request with the `compaction` parameter returns a single `compaction` block holding a readable summary plus a signature, and no reply. The block replaces the messages it summarizes and must go first in `messages` unchanged. The summary call is billed like any request and reported under `usage.iterations`.
- A non-blank `instructions` string, up to 16,384 characters, replaces the default summarization prompt entirely. The summarizer reads the whole conversation, earlier thinking included.
- Content the summary cannot carry: images, documents, `container_upload` blocks and fetched URLs inside the summarized messages are gone once the block replaces them; restate or re-upload what a later turn needs.
- Mid-conversation `system` messages inside the summarized range are summarized too, so their text instructions stop applying; per-message effort levels they set are not carried over either. State them again after the next user turn.
- Compact again: a new block summarizes the old summary and everything after it, so repeated compaction compounds loss; only the newest block is sent from then on.
- If the last assistant turn ends in a tool call with no result, the request is rejected. A summary is produced only when the call ends normally with text; otherwise the response is a 200 with empty content and the loop must continue without a summary.

## Limits
- Developer Platform documentation, not Claude Code. It lists mechanical losses (media, system messages), not a quality measure.
- The "repeated compaction compounds loss" reading is my inference from "summarizes the old summary"; the page does not say it in those words.

## Used in
- research/synthesis/field-2.md

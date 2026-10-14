---
url: https://code.claude.com/docs/en/sessions
title: "Manage sessions (section: Resume from a summary)"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Resume from a summary", as of October 2026: on a Pro or Max plan, when you resume a session inactive for more than about an hour and over 100,000 tokens, Claude Code restores it and opens a dialog before your first message. The prompt cache has expired by then, so the next request processes the full history once whichever option you pick. Options: resume from a summary (runs `/compact` at once), resume the full session as-is, or stop asking.
- Resuming as-is keeps every detail but costs more on each request in proportion to the conversation's size. Resuming from the summary costs less per request, but whatever the summary omits is no longer in context.
- A resumed session restores history, model, agent, permission mode (terminal routes), an active goal (turn count, timer and token baseline reset) and unexpired scheduled tasks; background Bash and monitor tasks are not restored. A self-paced `/loop` is not restored.
- Sessions whose first prompt was `/loop` do not appear in the picker and `claude --continue` skips them.
- Transcripts are JSONL at `~/.claude/projects/<project>/<session-id>.jsonl` with a 30-day default retention (`cleanupPeriodDays`).

## Limits
- As of October 2026. The thresholds are given as "about an hour" and "over 100,000 tokens". The page does not measure how much a summary resume saves.

## Used in
- research/synthesis/field-4.md

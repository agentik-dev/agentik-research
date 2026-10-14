---
url: https://code.claude.com/docs/en/sub-agents
title: "Create custom subagents (resume, transcripts, API errors, limits)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Resume subagents", as of October 2026: each subagent transcript is stored at `~/.claude/projects/{project}/{sessionId}/subagents/` as `agent-{agentId}.jsonl`. Transcripts persist within their session, are deleted after `cleanupPeriodDays` (30 days by default), and main-conversation compaction does not touch them.
- Section "API errors in subagents": a foreground subagent that already produced text returns that partial output with a note when a rate limit, overload or server error cuts it off; one that produced nothing, or only tool calls, fails with `Agent terminated early due to an API error`. A background subagent in that case is marked failed and the completion message includes its last output so partial work is not lost. A fallback model chain, if configured, switches the subagent to the next model.
- Section "Concurrent subagent limit": default 20 running subagents per session; another spawn fails with `Concurrent subagent limit reached`, and the error tells Claude not to retry. `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` overrides it (v2.1.217 or later). Sessions with ultracode active are exempt.
- `maxTurns` in a subagent's frontmatter ends it at that many agentic turns; Claude Code returns its output marked partial and Claude can resume it (partial marking needs v2.1.246 or later).

## Limits
- I read the first 100,000 of 108,817 characters; the section on what happens to background subagents when the parent session ends was in the unread part or absent, so this note makes no claim on it.

## Bears on repo claims
- "The transcript path includes a `subagents/` directory (undocumented?)": it is documented here, as a path pattern. The sessions page separately says the entry format is internal and unstable.

## Used in
- research/synthesis/field-6.md

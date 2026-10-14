---
url: https://code.claude.com/docs/en/changelog
title: "Claude Code changelog (docs page)"
author: Anthropic (Claude Code documentation)
published: entries dated individually; newest read is 2.1.296, 9 October 2026
accessed: 2026-10-14
kind: documented
---

## What it says
Dated release entries on subagents, hooks, worktrees and workflows (version, date as the page prints it):
- 1.0.41, 3 July 2025: the Stop hook trigger was split into Stop and SubagentStop.
- 1.0.60, 24 July 2025: custom subagents introduced ("Run /agents to get started").
- 2.0.42, 15 November 2025: `agent_id` and `agent_transcript_path` added to SubagentStop hook input. 2.0.43, 18 November 2025: SubagentStart hook added.
- 2.1.0, 7 January 2026: subagents (the Task tool) improved to continue working after a permission denial, so they can try alternative approaches.
- 2.1.32, 5 February 2026: agent teams research preview, described as token-intensive and needing an environment variable.
- 2.1.47, 18 February 2026: `last_assistant_message` added to Stop and SubagentStop input.
- 2.1.49, 19 February 2026: `--worktree` (`-w`) flag; subagents support `isolation: "worktree"`. 2.1.50, 20 February 2026: `isolation: worktree` in agent definitions.
- 2.1.69, 5 March 2026: `agent_id` (for subagents) and `agent_type` (for subagents and `--agent`) added to hook events.
- 2.1.78, 17 March 2026: `effort`, `maxTurns` and `disallowedTools` front matter supported for plugin-shipped agents.
- 2.1.119, 23 April 2026: fixed the Agent tool with `isolation: "worktree"` reusing stale worktrees from earlier sessions.
- 2.1.121, 28 April 2026: `CLAUDE_CODE_FORK_SUBAGENT=1` works in non-interactive sessions (`claude -p`).
- 2.1.139, 11 May 2026: agent view (research preview).
- 2.1.154, 28 May 2026: dynamic workflows introduced ("tens to hundreds of agents"); the same entry fixes subagents in background sessions "bypassing the worktree-isolation guard and writing to the shared checkout".
- 2.1.186, 22 June 2026: background subagents now surface permission prompts in the main session instead of auto-denying.
- 2.1.212, 17 July 2026: subagents inherit the parent session's permission mode by default.
- 2.1.217, 21 July 2026: `--max-budget-usd` now stops background subagents (new spawns are denied, running ones halted).
- 2.1.246, 25 August 2026: a subagent that stops at its `maxTurns` limit returns its output marked as partial, with a hint to continue it via `SendMessage`, "instead of appearing finished".
- 2.1.285, 29 September 2026: under `claude -p --permission-prompt-tool`, a background subagent's permission request goes to the prompt tool instead of being auto-denied; under `claude -p` with fork mode on, a subagent's own Agent call runs in the foreground.
- 2.1.295, 8 October 2026: subagents in their own linked worktree no longer show the parent session's git branch, status or commits.

## Limits
- Release notes say what changed, not by how much, and the dates are release dates. I read the first 100,000 characters through WebFetch and the older entries in a download of the same page's markdown. I did not find a changelog line for the Task tool becoming the Agent tool.

## Used in
- research/synthesis/field-5.md

---
url: https://code.claude.com/docs/en/sessions
title: "Manage sessions (transcript location, resume, -p sessions)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Where transcripts are stored", as of October 2026: transcripts are JSONL at `~/.claude/projects/<project>/<session-id>.jsonl`, where `<project>` is the working directory path with non-alphanumeric characters replaced by `-`; a converted name over 200 characters is truncated to 200 and a hash of the full path is appended. "The entry format is internal to Claude Code and changes between versions, so scripts that parse these files directly can break on any release." The page points to `/export` and the script interfaces (`--output-format json` or `stream-json`, the `transcript_path` field hooks receive, the Agent SDK) instead.
- Settings: `CLAUDE_CONFIG_DIR` moves storage; `CLAUDE_CODE_PROJECT_DIR_NAME` names the `<project>` directory (1 to 64 letters, digits, hyphens or underscores; v2.1.234 or later; ignored unless `CLAUDE_CONFIG_DIR` is set); `cleanupPeriodDays` changes the 30-day retention; `CLAUDE_CODE_TRANSCRIPT_LOCAL_GC` limits how large a `-p` or SDK transcript grows; `--no-session-persistence` suppresses writes for one non-interactive run.
- The page does not mention a `subagents/` directory (see code-docs-sub-agents-unattended, which does).
- Sessions created by `claude -p` or the Agent SDK are left out of the session picker and out of `claude --continue`, but can be resumed by ID with `claude --resume <session-id>`; `claude -p --continue` includes them. The ID search covers the current project and its git worktrees, then every other project on the machine; a hand-copied duplicate makes the lookup report not-found.
- Resume: a tool still running when the previous process ended does not finish or run again; Claude sees the call as cut off and is told to check whether it took effect before repeating it (unless `CLAUDE_CODE_RESUME_INTERRUPTED_TURN` is set). Background Bash and Monitor tasks are not restored. A resumed `claude -p` run starts in the permission mode a new `-p` run would, except a session that ended in plan mode.
- "If you resume the same session in two terminals without forking, messages from both interleave into one transcript."
- `--fork-session` and `/branch` give a copy its own session ID.

## Limits
- Documents a location and a stability warning, not retention behaviour under load or concurrent writers beyond the two-terminal sentence.

## Bears on repo claims
- Claim that the transcript path is `<projects dir>/<cwd slug>/<uuid>.jsonl`: documented, with the caveat that the format is internal and unstable. The `subagents/` directory is documented on the sub-agents page, not here.

## Used in
- research/synthesis/field-6.md

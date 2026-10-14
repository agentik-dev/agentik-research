---
url: https://code.claude.com/docs/en/hooks
title: "Hooks reference"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; version markers on the page run to v2.1.295)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Exit code output", subsection "Timeouts": Claude Code cancels a `command`, `http` or `mcp_tool` hook that reaches its `timeout` and discards its output. On `PreToolUse`, a timed-out hook "does not block the tool call"; the call continues through the normal permission flow, and the page warns "don't count on a stalled hook to act as a gate". On `PreModelSwitch` a timed-out hook does block the switch; an Agent SDK callback hook that exceeds its timeout blocks the tool call. The page does not use the words "fail open".
- `onFailure` field (command and HTTP hook fields; Claude Code v2.1.295 or later): `"continue"` is the default and `"block"` blocks the action when the hook cannot start, exits with a code other than 0 or 2, returns an HTTP error, times out, or returns invalid output. It has no effect on `Stop`, `SubagentStop`, `TaskCompleted`, `TeammateIdle` or background command hooks.
- `timeout` is in seconds. Default 600 seconds for `command`, `http` and `mcp_tool` hooks, 30 for `prompt` hooks and 60 for `agent` hooks; the default for command hooks drops to 30 seconds on `UserPromptSubmit`, `PreModelSwitch` and `PostModelSwitch`, and to 10 on `MessageDisplay`. A command hook marked `async: true` is not timed.
- Exit codes: exit 2 is the blocking error (on events that can block, such as `PreToolUse`). Any other non-zero code, including 1, is a non-blocking error and the action proceeds. The page warns that without valid JSON on stdout, exit 1 is treated as non-blocking, and says to use exit 2 for policy enforcement.
- `InstructionsLoaded` event: fires when a CLAUDE.md or `.claude/rules/*.md` file is loaded, at session start and for lazy loads; matchers `session_start`, `nested_traversal`, `path_glob_match`, `include`, `compact`. It is observational only; exit 2 is ignored.
- `SessionStart` `additionalContext`: a string added to context at the start of the conversation before the first prompt, wrapped in a system reminder. Output over 10,000 characters is saved to a file and Claude receives a path and a 2,000-character preview.

## Limits
- Documentation. The fetch returned the first 100,000 of about 268,900 characters; later sections (for example per-event details) were not read. Volatile; as of October 2026 (v2.1.295 is the newest marker seen).

## Used in
- research/synthesis/field-3.md

## Also (question 5)
Read for the Stop, SubagentStop and common input sections (the later part of the page, characters 180,500 onward, plus a download of the page's markdown to check exact wording).
- Section "Stop": runs when the main Claude Code agent has finished responding. It does not run if the stoppage was a user interrupt; API errors fire `StopFailure` instead. Input adds `stop_hook_active` (true when Claude Code is already continuing because of a stop hook), `last_assistant_message`, `background_tasks` and `session_crons`. After eight consecutive continuations from stop hooks Claude Code overrides the next block and ends the turn (`CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` changes the cap).
- Section "SubagentStop": runs when a Claude Code subagent has finished responding. Input adds `stop_hook_active`, `agent_id`, `agent_type`, `agent_transcript_path` and `last_assistant_message`. It also fires for Claude Code's own internal agents (prompt suggestions, `/btw` side questions), with `agent_type` set to the session's agent name or an empty string.
- Section "Common input fields": `agent_id` identifies the subagent or in-process teammate the hook fires in; `agent_type` is present when the session uses `--agent` or the hook fires inside a subagent. Hooks from settings, plugins and managed policy run inside subagents too, and tool events such as `PreToolUse` and `PostToolUse` carry `agent_id` and `agent_type` there. The page does not state outright that `agent_id` is absent on the main thread.
- A `Stop` hook written in a subagent's front matter is converted to `SubagentStop`.
- Limits: documentation, as of October 2026. Used in: research/synthesis/field-5.md

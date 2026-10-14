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

## Also (question 7)
Read for question 7 (guardrails); as of October 2026. Section names are the page's own. I read the first 200,000 of 268,946 characters in two passes.
- "Exit code output": "Claude never sees stderr from a hook that exits 0"; the stderr is available only in the debug log (enable with `claude --debug` or `/debug`). For most events stdout from an exit-0 hook also goes only to the debug log; the exceptions where plain stdout becomes context are `UserPromptSubmit`, `UserPromptExpansion`, `SessionStart` and `PostModelSwitch`. Per-event exit-2 table: on `PreToolUse` exit 2 blocks the tool call; on `Stop` it prevents Claude from stopping and continues the conversation; `Setup`, `InstructionsLoaded`, `MessageDisplay` and `Notification` cannot be blocked.
- "PreToolUse decision control": decisions go in `hookSpecificOutput` (`permissionDecision` of allow, deny, ask or defer, with `permissionDecisionReason`, shown to Claude for deny). When several hooks disagree the order is deny, defer, ask, allow. Exit 2 acts like deny with stderr as the reason, and JSON printed alongside an exit-2 block does not undo it. Deny and ask rules are evaluated whatever the hook returns. The `if` filter is best-effort; the page says hard allow and deny enforcement should use the permission system.
- "onFailure" (v2.1.295 or later; command and HTTP hooks): with `"block"`, a hook that cannot start, times out, exits with a code other than 0 or 2, or returns invalid output does what exit 2 does on that event (on `PermissionRequest` it denies). It has no effect on `Stop`, `SubagentStop`, `TaskCompleted`, `TeammateIdle`, or background hooks marked `async` or `asyncRewake`, because the page reasons that Claude cannot repair a hook that will not run.
- Events: 33 are listed, including `PermissionRequest`, `PermissionDenied` (fires only when auto mode denies a call, not for manual denials, PreToolUse blocks or deny-rule matches; `retry: true` only tells the model it may try again), `WorktreeCreate`, `WorktreeRemove`, `ConfigChange` and `InstructionsLoaded`.
- "Stop and SubagentStop": `stop_hook_active` is true when Claude is already continuing because of a stop hook; after 8 consecutive continuations the turn ends, the count resetting whenever Claude calls a tool; `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` raises it.
- Security-related statements: hooks run with the parent environment (minus `OTEL_*` exporter variables), and `allowManagedHooksOnly` restricts hooks to managed sources. Hooks in project-level skill and subagent frontmatter follow workspace-trust rules.
- Not read: the last 68,946 characters. The page says nothing, in what I read, about hooks in a nested `claude` process beyond the `-p` statements on the headless page.

Used in: research/synthesis/field-7.md

## Also (question 8)
Re-opened on 2026-10-14 (the page is about 269,000 characters; I read the Stop input and Stop decision sections and the hook-type descriptions, and the first 200,000 characters). As of October 2026.
- A Stop hook can return `"decision": "block"` with a reason, or exit with code 2, to keep Claude working; that makes a script a deterministic sign-off gate.
- Built-in round limit: Claude Code allows 8 consecutive continuations from stop hooks; after eight in a row it overrides the next block and ends the turn. The counter resets when Claude calls a tool. `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` raises the limit.
- The Stop input has `stop_hook_active`, true when Claude is already continuing because a stop hook blocked; the page says to check it "to avoid blocking on a condition that will never resolve."
- Hook types: a prompt hook sends the hook input to a model for a single-turn decision (default timeout 30 seconds); an agent hook spawns a subagent that can read files to verify a condition (default timeout 60 seconds, marked experimental).
- Used in (question 8): research/synthesis/field-8.md

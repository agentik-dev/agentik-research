---
url: https://code.claude.com/docs/en/hooks
title: "Hooks reference (exit codes, PreToolUse, Stop loop cap, headless behaviour)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Exit codes, as of October 2026: exit 0 is success (stdout parsed as JSON if it is one object). Exit 2 is a blocking error on events that can block, such as `PreToolUse`; stderr is the reason, and a JSON `allow` cannot override an exit-2 block. Any other exit code, including 1, is a non-blocking error: the action proceeds. The page says a policy hook should use `exit 2`.
- `PreToolUse` returns `permissionDecision` of `allow`, `deny`, `ask` or `defer` in `hookSpecificOutput`; precedence when hooks disagree is "`deny` > `defer` > `ask` > `allow`".
- Timeouts: command, http and mcp_tool hooks default to 600 seconds. A timed-out `PreToolUse` command, HTTP or MCP hook does not block the tool call; the call continues through the normal permission flow unless the hook sets `"onFailure": "block"` (v2.1.295 or later). An Agent SDK callback hook that times out does block the call. Background (`async: true`) hooks are not timed.
- `defer`: honoured only in non-interactive mode with `-p`. The hook returns `defer`, the process exits with `stop_reason: "tool_deferred"`, and the caller resumes with `claude -p --resume <session-id>`, when the hook fires again and can return `allow` with `updatedInput`. It works only when Claude makes a single tool call in the turn, and "There is no timeout or retry limit". If the tool is unavailable on resume the result has `stop_reason: "tool_deferred_unavailable"` and `is_error: true`.
- `PermissionRequest` runs in non-interactive sessions that cannot show a prompt; if no hook returns a decision, the tool call is denied. With `--permission-prompt-tool` or an SDK `canUseTool` callback, whichever decides first applies.
- `Stop` runs when the main agent has finished responding (not on a user interrupt; API errors fire `StopFailure` instead). `stop_hook_active` is true when Claude is already continuing because of a stop hook, "to avoid blocking on a condition that will never resolve". After stop hooks have continued the turn eight times in a row, Claude Code overrides the next block and ends the turn; the count resets when Claude calls a tool; `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` raises it. `StopFailure` ignores the hook's output and exit code and is for logging and alerts; its `error` values include `rate_limit`, `overloaded`, `authentication_failed`, `billing_error`, `max_output_tokens` and `unknown`.
- `SubagentStop` can block with a `reason` that becomes the subagent's next instruction. `TeammateIdle` and `TaskCompleted` accept exit 2 as feedback.
- `Setup` hooks fire with `--init-only`, or with `--init` or `--maintenance` under `-p`; they do not fire on normal startup.

## Limits
- I read the first 200,000 of 268,801 characters in two passes; the final 68,801 (common input fields, JSON output format) were not read. The extracts were produced by the fetch tool, so exact wording of the quoted fragments should be rechecked before publication.
- The page says nothing, in what I read, about hooks in a nested `claude` process.

## Bears on repo claims
- "`PreToolUse` deny hooks still fire in a `-p` child": consistent with this page and the headless page (hooks from project settings run in `-p` unless `--bare`). A timed-out `PreToolUse` command hook fails open by default, which matters for a gate built from hooks.

## Used in
- research/synthesis/field-6.md

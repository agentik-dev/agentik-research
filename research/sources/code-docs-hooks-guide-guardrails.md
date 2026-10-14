---
url: https://code.claude.com/docs/en/hooks-guide
title: "Automate actions with hooks"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

All items are as of October 2026. Section names are the page's own.

## What it says
- Opening: hooks give "deterministic control" (certain actions always happen) as against relying on the model to choose; judgement calls can use prompt-based or agent-based hooks.
- "Hooks and permission modes": PreToolUse hooks fire before any permission-mode check, in every mode including `dontAsk`. A hook that returns `permissionDecision: "deny"` blocks the tool even in `bypassPermissions` mode or with `--dangerously-skip-permissions`, so policy can be enforced that users cannot bypass by changing mode. The reverse does not hold: a hook returning allow does not bypass deny rules, and hooks in settings files and plugins can tighten restrictions but not loosen them. A "mod" with `tool.check` can approve a call that a non-managed hook blocked.
- "Hook output": exit 0 means no decision (the normal permission flow applies; a PreToolUse hook that exits 0 and says nothing does not approve). Exit 2 blocks, with stderr as the reason fed back to Claude. Any other exit code is a non-blocking error: the action proceeds, and the transcript shows a "hook error" notice with the first line of stderr. A hook should choose either exit 2 or exit 0 with JSON, not both.
- "Combine results from multiple hooks": all matching hooks run in parallel and each runs to completion; one hook's deny does not stop its siblings, so a logging hook still writes its entry. For PreToolUse decisions the most restrictive answer wins in the order deny, defer, ask, allow. When several hooks rewrite input with `updatedInput`, the last to finish takes effect, which is non-deterministic.
- "Block edits to protected files": the page's example is a PreToolUse hook on `Edit|Write` that exits 2 when the path contains `.env`, `package-lock.json` or `.git/`. Its matching is a substring test on the file path.
- "Limitations": hook timeouts default to 10 minutes for `command`, `http` and `mcp_tool` hooks (30 seconds on `UserPromptSubmit`, `PreModelSwitch` and `PostModelSwitch`; 10 seconds on `MessageDisplay`), 30 seconds for `prompt` hooks and 60 seconds for `agent` hooks; `SessionEnd` hooks share a 1.5-second budget. `PostToolUse` cannot undo an action. `PermissionRequest` hooks still run under `-p` outside `dontAsk`, and a call no hook decides and nothing else can answer is denied. `Stop` hooks do not fire on user interrupts; API errors fire `StopFailure` instead. An HTTP hook that returns an error status or fails lets the action continue unless `onFailure: "block"` is set.
- "Stop hook hits the block cap": Claude Code overrides a Stop hook after it blocks eight times in a row with no tool call from Claude in between; the hook should read `stop_hook_active` and exit early when it is true. `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` raises the cap.
- "Check what a hook did": for a blocking error most events show the block message; for full detail (exit codes, stdout, stderr) the page points to the debug log (`claude --debug-file`, or `/debug` mid-session).
- Matcher and `if` filters: matchers are case-sensitive; the `if` field works only on tool events and, per the hooks reference, is best-effort, so hard enforcement should use the permission system.

## Limits
- Documentation. It gives mechanisms and defaults, not how often a hook guard is bypassed. Read from a saved fetch of about 60 KB.

## Used in
- research/synthesis/field-7.md

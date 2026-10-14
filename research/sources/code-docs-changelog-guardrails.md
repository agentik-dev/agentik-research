---
url: https://code.claude.com/docs/en/changelog
title: "Claude Code changelog (entries v2.1.287 to v2.1.296)"
author: Anthropic (Claude Code documentation)
published: undated page; newest entry read is v2.1.296, dated 9 October 2026
accessed: 2026-10-14
kind: documented
---

The fetch tool summarized the first 100,000 of 1,052,496 characters (versions 2.1.287 to 2.1.296). Entries below are the fetch tool's paraphrase of the page; recheck wording before quoting.

## What it says
- v2.1.295 (8 October 2026), added: `onFailure: "block"` for command and HTTP hooks, so a hook that cannot start, times out or exits with an unexpected code blocks the action instead of letting it through.
- Entries that show hook-based guards had gaps, fixed in this window: v2.1.296 managed `PreToolUse` hooks that deny with `"continue": false` refused the call but did not end the turn; v2.1.296 pressing Esc during a `UserPromptSubmit` hook let the unchecked prompt through; v2.1.295 a mod's hook received a deeply nested tool input cut short with no error, so a guard could pass content it never saw; v2.1.292 tool calls made while the plugin hooks worker restarted were answered without the plugins' permission hooks; v2.1.290 some permission rules and safety checks were not applied to a tool call after a `PreToolUse` hook rewrote its input; v2.1.294 `prompt` and `agent` hooks written as instructions allowed what they should have blocked.
- Entries on permission rules missing commands: v2.1.292 (labelled Security) `PreToolUse` hook approvals and auto mode bypassed the permission prompt for reads from UNC network paths; v2.1.290 a deny or ask rule missed a command whose name came from a variable set as a prefix on `declare`, `typeset`, `export` or `readonly`; v2.1.289 Bash deny and ask rules missed a command behind an environment-variable prefix with an expanded value (such as `TZ="$HOME" rm -rf build`) when the sandbox auto-allowed commands; v2.1.296 on Windows in bypass-permissions mode `rm -rf /c/Users/<name>` in Git Bash did not ask for permission; v2.1.292 `rm -rf` on the 8.3 short name of the home folder was not treated as removing it.
- Auto mode: v2.1.288 (2 October 2026) the client-side classifier ignores a pin to Sonnet 5.5 or Opus 5.5 and uses Sonnet 5; v2.1.292 subagent definitions with `permissionMode: auto` entered auto mode even when it was disabled by settings.
- Sandbox and worktree: v2.1.290 sandboxed Monitor commands skipped the permission prompt under sandbox auto-allow; v2.1.290 background subagents lost write and Bash access in their worktree after the main session entered or exited a different worktree.

## Limits
- Secondhand paraphrase of a long page; the entries older than v2.1.288 (where the worktree isolation checks and most earlier fixes sit) were not read. A fixed bug shows a gap existed, not how often it was hit.

## Used in
- research/synthesis/field-7.md

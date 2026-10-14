---
url: https://code.claude.com/docs/en/permission-modes
title: "Choose a permission mode (non-interactive and unattended behaviour)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Which mode a session starts in", as of October 2026: `claude -p` or the Agent SDK starts in `default` in sessions that fetch feature flags. In sessions that do not (a third-party provider, or telemetry off) it starts in `auto` with v2.1.285 or later and `default` before that. An organization policy can withhold the `auto` default. Terminal sessions start in `auto` from v2.1.283.
- Section "Available modes" (usage table): for CI with an exact allowlist the page gives `claude -p "run the test suite" --permission-mode dontAsk --allowedTools "Bash(npm test)" "Read"`. For fully unattended work inside a container it gives `claude -p "<prompt>" --dangerously-skip-permissions`, with a container, VM or sandbox runtime required and a non-root user on Linux and macOS; in that `-p` run the few calls that would still prompt are denied instead.
- Auto mode: a classifier reviews actions. In an interactive session, 3 blocks in a row or 20 in total pause auto mode and resume prompting; the thresholds are not configurable. Section "Repeated-block thresholds": a `-p` run without `--permission-prompt-tool` has no prompt to fall back to. "When repeated blocks reach a threshold, the action doesn't run and Claude keeps working. Claude Code doesn't stop the run." Under server-side classifier review, the turn stops after ten responses in a row with no verdict.
- Auto mode "does not guarantee safety": the page tells readers to use it for tasks where they trust the general direction, not as a replacement for review on sensitive operations.
- `bypassPermissions` disables prompts and safety checks; Claude Code refuses to start in it as root or under `sudo` (outside a recognised sandbox); in non-interactive mode no warning dialog is shown; plan mode keeps its blocks in `-p` and SDK sessions. The page's warning says it offers no protection against prompt injection or unintended actions.
- Critical-path removals: Claude Code never lets an allow rule or a `PreToolUse` hook that returns `"allow"` approve an `rm` or `rmdir` that targets a critical path; a matching deny rule still blocks. In `auto` mode with no terminal to prompt (such as `-p`), the command is denied immediately and Claude is told to report what it wanted to delete.
- The first-read-outside-the-working-directories prompt does not appear in `-p` runs or background sessions; reads there run as before.
- Cloud sessions ignore `defaultMode: "bypassPermissions"` and `"dontAsk"` from settings files.

## Limits
- Read from a saved copy of the page (about 90 KB); sections on `acceptEdits`, plan mode and protected paths were skimmed. Behaviour changes by version; the page cites v2.1.283 and v2.1.285 as boundaries.
- It does not state what `subtype` or `is_error` a finished `-p` result has after denials.

## Bears on repo claims
- "Unanswered prompts deny in print mode": supported. "Auto mode denies every Write and Bash unless `--allowedTools` pre-allows them": not what the page says. A classifier decides most actions in auto mode; denial of every prompting call is the `default`/`dontAsk` behaviour, and a bare `Bash` entry in `--allowedTools` is dropped as a broad allow rule in auto mode (headless page).

## Used in
- research/synthesis/field-6.md

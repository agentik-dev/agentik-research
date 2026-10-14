---
url: https://code.claude.com/docs/en/claude-code-on-the-web
title: "Use Claude Code in the cloud"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026 a cloud session runs on Anthropic-managed infrastructure (or a self-hosted environment) and keeps running after the laptop closes. It counts toward the plan's usage limits with no separate charge for the VM; cloud sessions "share rate limits with all other Claude and Claude Code usage" in the account, so parallel tasks consume limits proportionately.
- Section "Environment expired": cloud sessions stop after a period of inactivity and the VM is reclaimed; a session waiting on an MCP connector approval counts as inactive and can expire during the wait. Reopening gives a fresh VM. Restored: conversation history. Not restored: background work still running (subagents, shell commands) and a self-paced `/loop` wakeup.
- Section "Limitations": commands and `SessionStart` hooks have default timeouts (see the cloud-environments page); a setup script is cached only when it finishes in roughly five minutes.
- `claude -p "msg" --cloud <session-id>` queues one message into an existing cloud session and exits without waiting for a reply. It needs a claude.ai account and is unavailable on third-party providers.
- Permission mode is chosen per session; cloud sessions ignore `bypassPermissions` and `dontAsk` as `defaultMode` from settings files, so a repository's checked-in settings cannot start one in bypass mode (permission-modes page).
- Auto-fix for pull requests: Claude receives CI-failure and review-comment events, pushes a fix when one is clear and asks when a request is ambiguous; GitHub emits no webhook when a base branch advance causes a merge conflict, so auto-fix cannot react to conflicts. Replies are posted under the user's GitHub account.
- Security: each session is an isolated VM; network access is limited by default; git credentials stay outside the VM and a proxy attaches them.

## Limits
- I read the page in full but the "Time limits" figures live on the cloud-environments page, which I did not open.

## Used in
- research/synthesis/field-6.md

---
url: https://code.claude.com/docs/en/headless
title: "Run Claude Code programmatically"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; version markers reach v2.1.295)
accessed: 2026-10-14
kind: documented
---

## What it says
All as of October 2026. Another note on this page covers waits, bare mode and retries (code-docs-headless-budgets); this one covers permissions and subagents under `claude -p` for question 5.
- Starting mode: "A run where nothing sets a permission mode takes the built-in starting permission mode, which can be `auto`, so pass the one you want" (section "Auto-approve tools"). So "default permission mode" under `-p` can mean auto mode, depending on version and plan.
- Section "Turn off permission prompts in unattended runs": with `--permission-prompts none` (v2.1.259 or later) anything that would prompt is denied unless a `PermissionRequest` hook allows it; Claude is told that nobody can approve the request and should not retry it, and the run continues. In a `-p` run with no permission host these requests are denied either way. With `--output-format stream-json` the denials appear as `permission_denied` system messages and the final result lists them in `permission_denials`.
- Subagents in the stream (section "Follow subagent messages"): subagent messages carry a `parent_tool_use_id` naming the Agent call they belong to; main-conversation messages carry `null` there. By default only the subagent's `tool_use` and `tool_result` blocks are forwarded; `--forward-subagent-text` (v2.1.211 or later) adds text and thinking.
- Background work at exit: a `-p` run stays open until background subagents and workflows finish, because their result is part of the final output; reaching `--max-budget-usd` stops the remaining background work.
- The page says nothing on what a subagent returns after one of its own tool calls is denied.

## Limits
- Documentation; volatile. It documents flags and events, not the model's behaviour after a denial.

## Used in
- research/synthesis/field-5.md

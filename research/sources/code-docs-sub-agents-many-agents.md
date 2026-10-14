---
url: https://code.claude.com/docs/en/sub-agents
title: "Create custom subagents"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; version markers on the page reach v2.1.286)
accessed: 2026-10-14
kind: documented
---

## What it says
All as of October 2026. Another note on this page covers usage limits and cache lifetime (code-docs-sub-agents-budgets); this one covers isolation, returns, turns and permissions for question 5.
- Context isolation (opening and "What loads at startup"): "Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions." A non-fork subagent does not see the conversation history, invoked skills or files already read. It starts with its own system prompt, the delegation message Claude writes, the CLAUDE.md hierarchy (unless it is Explore or Plan, or sets `omitClaudeMd`), a git status snapshot, and the skills listed in its `skills` field. Output style, auto memory and the parent's window size are not inherited.
- What returns: the page says a subagent does its work in its own context and returns only a summary to the main conversation. The Agent tool section of the tools reference adds that the parent does not see the subagent's intermediate tool calls, only the final result. A background subagent's report arrives as a completion notification, and Claude receives the subagent's agent ID. The final report is scanned: Claude Code can insert backslashes or a marker line when it imitates system tags or names permission settings, and the report is labelled as the subagent's words with no authority from the user (section "Subagent output scanning").
- Cost of isolation: a subagent sends its own requests, and they count toward the same usage limits as the main conversation.
- Fork: a fork inherits the whole conversation, which drops input isolation; only its final result returns. Fork mode is on by default in interactive sessions (v2.1.232 or later) and off by default in `claude -p` and the Agent SDK unless `CLAUDE_CODE_FORK_SUBAGENT=1`.
- `maxTurns` (front matter table): maximum agentic turns before the subagent stops; at the limit Claude Code returns the output marked as partial and Claude can resume the subagent. The partial marking needs v2.1.246 or later. The page does not say whether a subagent can see its own turn count.
- Foreground and background (section "Run subagents in foreground or background"): foreground subagents block the main conversation and pass permission prompts to the user; background subagents run concurrently and surface each prompt in the main session naming the subagent, where Esc denies that one call without stopping the subagent. The mode is chosen by the first matching case: a teammate's subagent runs foreground; `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` forces foreground; with fork mode on, subagents run in the background and Claude cannot ask for the foreground; with fork mode off (the default under `-p` and the SDK), subagents run in the background by default and in the foreground when Claude needs the result before continuing. Background subagents get a smaller built-in tool set.
- Permission mode: if the main conversation is in `bypassPermissions`, `acceptEdits` or auto mode, the subagent runs in that mode and ignores its own `permissionMode`; otherwise its own value applies. `dontAsk` auto-denies prompts while explicitly allowed tools still run. The page does not describe what a subagent returns after one of its tool calls is denied.
- Limits: nesting up to three layers below the main conversation by default; 20 concurrent subagents by default. `isolation: worktree` runs a subagent in a temporary git worktree, removed if it made no changes.
- Hooks: `SubagentStart` and `SubagentStop` in settings; a `Stop` hook in a subagent's front matter is converted to `SubagentStop`.
- API errors: a foreground subagent cut off after producing text returns the partial output with a note; with nothing produced it fails with "Agent terminated early due to an API error"; a background subagent is marked failed and the message to Claude includes its last output.
- Where to use which: the main conversation for frequent back-and-forth, shared context across phases, quick targeted changes, low latency; subagents for verbose output you will not reuse, enforced tool restrictions, and self-contained work that can return a summary.

## Limits
- Documentation with no measurement of quality or cost. I read the first 100,000 of 108,817 characters through WebFetch and checked exact wording in a download of the same page's markdown. Volatile; features and defaults change between versions.

## Used in
- research/synthesis/field-5.md

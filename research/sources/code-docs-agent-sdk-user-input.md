---
url: https://code.claude.com/docs/en/agent-sdk/user-input
title: "Handle approvals and user input"
author: Anthropic (Claude Code documentation, Agent SDK)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Limitations": "each `AskUserQuestion` call supports 1-4 questions with 2-4 options each". The same section says `AskUserQuestion` is not currently available in subagents spawned via the Agent tool.
- Section "Question format": each question has `question`, `header` (a short label, maximum 12 characters), `options` (2 to 4 choices, each with `label` and `description`) and `multiSelect`. The host application should add its own "Other" choice for free text; the user's text, not the word "Other", is returned as the answer.
- Section "Handle clarifying questions": `AskUserQuestion` triggers the `canUseTool` callback; if the caller restricts `tools`, `AskUserQuestion` must be in the list or Claude cannot ask. The callback can stay pending indefinitely; for slow answers the page suggests a `PreToolUse` hook that returns a `defer` decision.
- The questions and options are written by Claude; the SDK caller cannot add its own questions to the flow.

## Limits
- Documentation for the Agent SDK surface. The page gives no Claude Code version number for the 1-4 and 2-4 limits, so "as of Claude Code 2.1.x" rests on this page being current in October 2026 (other pages read the same day name versions up to v2.1.295). Check the interactive CLI separately; this page is about the SDK callback.

## Used in
- research/synthesis/field-3.md

## Also (question 8)
Re-opened on 2026-10-14 for how clarifying questions reach an owner. As of October 2026.
- A clarifying question is the `AskUserQuestion` tool; each call carries 1 to 4 questions with 2 to 4 options each (section "Limitations"), so the product's own question tool is batch-shaped. `AskUserQuestion` is not available inside subagents started with the Agent tool.
- The handler that answers it can stay pending indefinitely and execution stays paused until it returns. For an owner who may take longer than the process should live, the page advises a `PreToolUse` hook returning the `defer` decision, so the process exits and resumes later from the saved session.
- A `PermissionRequest` hook can send an outside notification (chat, email, push) when Claude is waiting.
- Limits (question 8): the page describes the mechanism and gives no guidance on how many questions to ask, when to ask them, or what a waiting agent should do meanwhile.
- Used in (question 8): research/synthesis/field-8.md

---
url: https://code.claude.com/docs/en/tools-reference
title: "Tools reference"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Table row for `AskUserQuestion`: asks multiple-choice questions to gather requirements or clarify ambiguity; it needs no permission; questions stay open until answered by default.
- Section "AskUserQuestion tool behavior": the user answers by picking an option or by typing text through the `Other` row or the notes field. Section "Question auto-continue timeout": the `askUserQuestionTimeout` setting (values `60s`, `5m`, `10m`) closes an unanswered question and tells Claude the user may be away, so Claude proceeds on its own judgment. The timer never starts in a background session, in screen reader mode, or over Remote Control, and it never applies to permission prompts.
- The page states no limit on the number of questions or options per call; the limits are on the Agent SDK page (code-docs-agent-sdk-user-input).

## Limits
- Documentation; volatile; as of October 2026. Only the AskUserQuestion parts of this long page were used.

## Used in
- research/synthesis/field-3.md

## Also (question 5)
- Section "Agent tool behavior": the Agent tool spawns a subagent in a separate context window; the parent does not see its intermediate tool calls or outputs, only the final result. `maxTurns` in the subagent definition caps its turns, and at the limit the result is marked partial and Claude can resume the subagent. Launching a subagent does not itself prompt for permission (the tools table lists `Agent` as needing no permission); its own tool calls are checked against the permission rules as it runs. Foreground subagents show prompts where the user is; background subagents surface them in the main session.
- Tools table, `Workflow`: runs a dynamic workflow, a script that orchestrates many subagents in the background and returns one consolidated result; permission required: yes.
- Limits: documentation, as of October 2026. Used in: research/synthesis/field-5.md

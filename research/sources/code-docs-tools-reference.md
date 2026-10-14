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

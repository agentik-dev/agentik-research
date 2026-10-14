---
url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5
title: "Prompting Claude Sonnet 5.5"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "User-facing progress updates": between tool calls the model writes notes on what it found and what it is doing next. Notes longer than a sentence or two come back as progress-update `thinking` blocks, empty at the default display setting, so a client that renders only text can look silent during a long turn. The page says to remove prompt lines such as "hold all findings for the final response" and, for predictable updates, to ask for a line before the first tool call and a short recap at the end.
- The same section describes a harness reminder after about five consecutive tool-calling steps with no user-visible text, appended as a turn-scoped system message. At high effort, with a tool for messaging the user available, the page says the reminder led the model to update more often and shortened its longest silent stretches "with no measurable change in task quality". No figures are given.
- Section "Verification on coding tasks": at low effort the model sometimes reports a change as done without running a check that exercises it, for example skipping the project's tests because dependencies are not installed. The suggested instruction requires a real check (tests, type-checker, build or the changed command) before reporting done, and says that if none can run, to state which check was not run and why instead of reporting the change as done. The page says this made skipped or superficial checks rare at low effort at slightly higher cost per task.
- Section "Steer initiative and scope": the suggested closing instruction is to stop and report when the requested work is done and checked, and to mention extra features, tests or refactors at the end instead of doing them.

## Limits
- Vendor guidance as of October 2026. The page confirms the failure (a change reported as done without a check) but gives no rate for it, and its tests are not described.

## Used in
- none yet. Read for question 9 but not cited in research/synthesis/field-9.md (size cap); a lead for the page draft.

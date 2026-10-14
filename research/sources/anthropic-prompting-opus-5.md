---
url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5
title: "Prompting Claude Opus 5"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Response length and verbosity": Opus 5's default user-facing responses run longer than earlier Opus models'. The effort setting changes how much the model thinks, not how much it says, so visible length must be controlled by an explicit instruction.
- Section "User-facing progress updates": Opus 5 narrates readily during agentic work. The suggested instruction is one sentence before the first tool call, a brief update only when something important is found or the plan changes, and at the end: "When you finish, lead with the outcome: your first sentence should answer "what happened" or "what did you find," with supporting detail after it for readers who want it." The page adds that positive examples of the style you want work better than instructions about what not to do.
- Section "Written deliverable length": files Opus 5 writes to disk (reports, Markdown documents, summaries) are often longer than on prior models, and the page recommends telling it to match length to the task and not to pad with filler sections, redundant summaries or boilerplate.
- Section "Self-correction": Opus 5 narrates corrections to its earlier statements more than prior models do; the suggested instruction limits that narration to corrections that would change the user's code, conclusions or decisions.
- Section "Reasoning in the response": requests to write out reasoning verbatim may be declined; ask for a short explanation or a summary of the actions taken instead.

## Limits
- Vendor guidance as of October 2026, with no measurement behind the length, narration or deliverable observations.
- The "lead with the outcome" instruction is a prompt Anthropic recommends, not a test of whether readers act faster.

## Used in
- none yet. Read for question 9 but not cited in research/synthesis/field-9.md (size cap); a lead for the page draft.

---
url: https://claudelab.net/en/articles/claude-code/claude-code-skill-unattended-permission-design
title: "Designing Claude Code Skills That Actually Run Unattended: Three Patterns to Avoid Permission-Dialog Stalls"
author: Claude Lab (independent site; article body unsigned)
published: 2026-05-09
accessed: 2026-10-14
kind: reported
---

## What it says
- The author reports that permission dialogs for Read, Write and Edit and folder-selection prompts quietly wait for a human to approve them in scheduled, unattended skill runs, and that the wait never ends.
- Three patterns offered: route file operations through shell commands instead of the file tools; detect workspace paths dynamically each run and fail loudly if missing; build recovery that never asks the human (fallback steps in the skill, log a failed status and exit).
- Anecdote from the author's content automation across four sites: a single Read call in a skill reportedly froze a schedule for 24 hours, and diagnosis took about two weeks; stalls "dropped to almost zero" after adding a real scheduled validation run.

## Limits
- Anecdotal, one author, no controlled test or reproduction data and no Claude Code version. The article gives its experience window as "a month" in one place and "six months" in another. Its setting looks like scheduled skills in a desktop-style workspace, which is not the `claude -p` surface; in `-p`, Anthropic's documentation says unanswered prompts are denied, not waited on (code-docs-headless-unattended). The stall it describes may belong to a different surface, and I could not tell which.

## Used in
- research/synthesis/field-6.md

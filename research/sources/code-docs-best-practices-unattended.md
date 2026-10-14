---
url: https://code.claude.com/docs/en/best-practices
title: "Best practices for Claude Code (verification, non-interactive mode, fan-out, failure patterns)"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Give Claude a way to verify its work": "Give Claude a check it can run: tests, a build, a screenshot to compare. It's the difference between a session you watch and one you walk away from." Claude stops when the work looks done, and without a check "looks done" is the only signal. The page lists four ways to gate the stop: a check inside one prompt; a `/goal` condition re-checked by a separate evaluator every turn; a Stop hook that blocks the turn from ending until a script passes (with a cap on consecutive blocks); and a second opinion from a verification subagent or workflow.
- Section "Fan out across files": loop `claude -p` over a task list with `--allowedTools` and `--permission-mode dontAsk` (the page says the denial of everything else matters when running unattended); test the prompt on 2 to 3 files before the full set (the example migrates 2,000 files).
- Section "Run autonomously with auto mode": `claude --permission-mode auto -p "fix all lint errors"`; when the classifier repeatedly blocks actions in a `-p` run Claude Code does not stop the run.
- Section "Add an adversarial review step": the longer Claude works unattended, the more an independent check matters; a reviewer prompted to find gaps will usually report some even when the work is sound, so tell it to flag only gaps that affect correctness or stated requirements.
- Section "Avoid common failure patterns": the kitchen-sink session, correcting over and over (after two failed corrections, `/clear` and rewrite the prompt), the over-specified CLAUDE.md, the trust-then-verify gap, and unscoped investigation that fills the context.
- Checkpoints track only changes made through Claude's file editing tools, not Bash commands or external processes; the page says this is no replacement for git.
- A `-p` run still creates a resumable session unless `--no-session-persistence` is passed.

## Limits
- Recommendations from Anthropic's internal teams and users, with no measurements. A note on this URL from question 3 (code-docs-best-practices) covers CLAUDE.md guidance.

## Used in
- research/synthesis/field-6.md

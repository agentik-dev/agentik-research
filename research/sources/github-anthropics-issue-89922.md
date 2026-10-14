---
url: https://github.com/anthropics/claude-code/issues/89922
title: "Auto-mode classifier false-positives on codex exec and cross-tool state files"
author: a Claude Code user (issue reporter; handle not recorded)
published: 2026-08-26
accessed: 2026-10-14
kind: reported
---

## What it says
- In auto mode two Bash commands returned "Blocked by classifier" with no rule or reason: one dispatching work to another vendor's command-line agent in its own workspace-write sandbox, and one `touch` of a marker file in the temp directory whose name contained the word "bypass".
- The reporter says the second was blocked on the filename although the plan review had already converged, that Bash allow rules did not help because flag combinations vary per run, and that both commands had to be run by hand. They ask that block messages be specific enough to act on.
- Labels: `bug`, `area:permissions`, `area:bash`, `stale` (added by a bot on 2026-10-11); open, no assignee, no maintainer comment on the page.

## Limits
- One user's account, not reproduced; the version is not stated. The docs say that on a block "the reason names the rule the classifier matched" in most sessions, so the missing reason the reporter describes may be a version or session difference (code-docs-permission-modes-guardrails).

## Used in
- research/synthesis/field-7.md

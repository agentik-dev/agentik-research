---
url: https://github.com/anthropics/claude-code/issues/77254
title: "[BUG] Auto-mode classifier: false positive on an org-distributed skill's sanctioned command, with no org-level channel to vouch for it"
author: a Claude Code user (issue reporter; handle not recorded)
published: 2026-07-13
accessed: 2026-10-14
kind: reported
---

## What it says
- In auto mode, a merge command mandated by an organization's distributed skill (it ends with `--no-verify`, and sets an environment variable that satisfies the organization's own PreToolUse hook) succeeded twice and was denied the third time under a rule named "Safety Bypass Flag", with the reason that the flag was self-invented and lacked user authorization. The reporter calls it a false positive because the active skill mandates the flag and the classifier cannot see skill context.
- Related blocks the reporter lists: adding an allow-rule instruction to the skill was denied as "Instruction Poisoning", and seeding the same rule through an install script as "Auto-Mode Bypass", described as a hard block that user intent cannot clear.
- When the classifier model was briefly unavailable, all non-read-only Bash was denied; the reporter lost about 10 minutes of a session.
- The reporter notes that permission denials do not fire PreToolUse, so an organization cannot measure false positives through hooks, and asks for a hook event or structured log for denials.
- Labels: `bug`, `area:permissions`, `area:skills`, `stale`; no maintainer reply; a bot closed it as not planned on 2026-09-03.

## Limits
- A single report. The version string is as the reporter gave it (1.20186.1). No false-positive rate. The hooks reference lists a separate `PermissionDenied` hook event for auto-mode denials (code-docs-hooks-reference), which answers the reporter's last request if it was available at that version. It matches the docs' own statement that repeated denials mean missing context, and that an allow rule can override a soft block (code-docs-auto-mode-config-guardrails).

## Used in
- research/synthesis/field-7.md

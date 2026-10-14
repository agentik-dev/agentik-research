---
url: https://threadreaderapp.com/thread/2025007393290272904.html
title: "Thread by Boris Cherny on built-in git worktree support in the Claude Code CLI (Thread Reader mirror)"
author: Boris Cherny (creator of Claude Code)
published: undated year; the mirror prints "Feb 21" and names version 2.1.50, which the Claude Code changelog dates 20 February 2026
accessed: 2026-10-14
kind: reported
---

## What it says
- Announces built-in git worktree support in the CLI (already in the desktop app): start Claude with `--worktree` to run in an isolated worktree, named or auto-named.
- Subagents can use worktree isolation for larger parallel work such as batched changes and code migrations, and a custom agent can set `isolation: worktree` in its front matter. Hooks let users of other version control systems get similar isolation. It names version 2.1.50.
- Stated rationale: several Claude Code sessions in one repository can then run in parallel without their edits overwriting each other.

## Limits
- This is a third-party mirror of a social post, so wording and date are as the mirror shows them; the changelog (code-docs-changelog-agents) is the dated record. A rationale statement, not a measurement.

## Used in
- research/synthesis/field-5.md

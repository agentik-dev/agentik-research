---
url: https://github.com/anthropics/claude-code/issues/52958
title: "Agent `isolation: \"worktree\"` leaks cwd into parent checkout mid-session, destroying untracked files"
author: a Claude Code user (issue reporter; handle not recorded)
published: 2026-04-24
accessed: 2026-10-14
kind: reported
---

## What it says
- Report on Claude Code 2.1.119: a subagent started with `isolation: "worktree"` ran in `.claude/worktrees/agent-<id>/`, but its shell working directory drifted into the parent checkout partway through a long session with no explicit `cd`. The parent session then ran `git stash -u` and `git checkout` in the main checkout, which removed the subagent's untracked files because both paths pointed at one working tree.
- Other commenters described variants: the shell directory defaulting to the parent from the start, subagents running `cd` or `git -C` into the parent because the orchestrator prompt held absolute paths, and a subagent's `git checkout -b` creating a branch on a sibling's work in the parent.
- Effects listed: untracked and staged work lost or stranded, the parent's HEAD and branch switched, agent branches left empty, agents reporting completion without opening pull requests; the reporter estimates 5 to 10 minutes of recovery per incident plus extra tokens.
- The reporter's words: "Right now the contract reads as 'isolation' but the observed behavior is 'shared working tree with a separate branch name.'"
- Status as I read it: labelled `area:agents`, `bug`, `data-loss`, `stale`; closed as not planned on 2026-06-01 and locked on 2026-08-04. A bot marked it a possible duplicate of three earlier issues.

## Limits
- One user's report, not reproduced by me. A close as not planned or stale is not evidence of a fix. It describes behaviour as of version 2.1.119. The changelog names a worktree-isolation guard in an entry dated 2026-05-28, and the worktrees page now documents four isolation checks (code-docs-changelog-agents; code-docs-worktrees).

## Used in
- research/synthesis/field-5.md

## Also (question 7)
I opened the issue for question 7. Opened 2026-04-24 on Claude Code 2.1.119 (macOS); later commenters report 2.1.119 and 2.1.126 on macOS and Linux. A subagent started with `isolation: "worktree"` ran in `.claude/worktrees/agent-<id>/` and, partway through a long session, its shell directory moved to the parent checkout; the parent then ran `git stash -u` and `git checkout`, which deleted the subagent's untracked files. Commenters add four overnight leaks in one session, and orchestrator prompts holding absolute paths that sent subagents into the parent. The subagent recovered by recreating the files from memory. State: labels `bug`, `data-loss`, `area:agents`; no maintainer comment; closed as not planned by a stale-issue bot on 2026-06-01 and locked on 2026-08-04. The worktrees page now lists the four isolation checks (code-docs-worktrees).

Used in: research/synthesis/field-7.md

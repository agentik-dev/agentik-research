---
url: https://github.com/anthropics/claude-code/issues/55708
title: "Agent tool's isolation: \"worktree\" does not isolate git HEAD modifications: subagent's git checkout affects parent repo's branch"
author: a Claude Code user (issue reporter; handle not recorded)
published: 2026-05-03
accessed: 2026-10-14
kind: reported
---

## What it says
- Report from a Linux (WSL2) CLI session using the Agent tool with `isolation: "worktree"`: a subagent ran `git switch -c feat/some-branch` and the parent repository's HEAD changed instead of the worktree's. `git worktree list` then showed the parent on the new branch while the agent's worktree stayed on its own branch.
- Effect: uncommitted changes in the parent became entangled with the subagent's branch, and the user recovered by hand and found the problem only through `git worktree list`. The reporter also notes parallel subagents could race to check out branches in the parent.
- The reporter's summary: isolation is at the filesystem level (a separate working tree directory) but not at the git-state level.
- Status as I read it: closed as a duplicate on 2026-05-06 (pointing to another issue) and locked as resolved on 2026-06-25.

## Limits
- One user's report; the Claude Code version is not stated. Not reproduced by me. The changelog names a worktree-isolation guard in an entry dated 2026-05-28, and the worktrees page now documents four isolation checks (code-docs-changelog-agents; code-docs-worktrees).

## Used in
- research/synthesis/field-5.md

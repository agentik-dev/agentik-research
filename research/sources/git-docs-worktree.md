---
url: https://git-scm.com/docs/git-worktree
title: "git-worktree documentation"
author: Git project
published: undated (living manual page; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- A linked worktree shares everything with the repository except per-worktree files such as `HEAD` and `index`. Refs under `refs/` are shared, except `refs/bisect`, `refs/worktree` and `refs/rewritten`; pseudo refs are per-worktree; the repository `config` file is shared by default.
- By default `git worktree add` refuses to check out a branch that another worktree already has checked out; `--force` overrides the safeguard.
- `git worktree lock` adds a file named `locked` to the entry's directory so its administrative files are not pruned automatically and the worktree is not moved or deleted. `prune` removes entries whose working trees are missing; a worktree deleted without `git worktree remove` has its administrative files removed eventually (`gc.worktreePruneExpire`).
- Section BUGS: "Multiple checkout in general is still experimental, and the support for submodules is incomplete."

## Limits
- The page says nothing about `index.lock` or about concurrent git operations across worktrees. Each worktree has its own index, so the index lock is per worktree; the shared parts (refs, objects, config) are what concurrent worktrees can still contend for. That second point is my inference from the sharing rules, not a statement on the page.

## Used in
- research/synthesis/field-6.md

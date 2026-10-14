---
url: https://git-scm.com/docs/git-worktree
title: "Git - git-worktree Documentation"
author: Git project
published: undated (the page labels git-worktree as last changed in Git 2.56.0)
accessed: 2026-10-14
kind: documented
---

## What it says
- A repository has one main worktree (unless bare) and zero or more linked worktrees; each linked worktree has a private directory under `$GIT_DIR/worktrees/`.
- Section "add": the new worktree "is linked to the current repository, sharing everything except per-worktree files such as `HEAD`, `index`, etc." So the index (the file a commit or `git add` locks) is per worktree.
- Section "REFS": all pseudo refs are per-worktree and all refs starting with `refs/` are shared, with `refs/bisect`, `refs/worktree` and `refs/rewritten` as exceptions. Configuration is shared by default unless `extensions.worktreeConfig` is on.
- `git worktree lock` keeps a worktree's administrative files from being pruned and stops it being moved or deleted; it is meant for worktrees on portable devices or network shares.
- Section "BUGS": the page says multiple checkout is still experimental and submodule support is incomplete.
- The page says nothing on `index.lock`, concurrent git commands, or what happens when two worktrees run commands at the same time.

## Limits
- It documents what is shared, not how often shared state collides. Whether two worktrees can still contend (on shared refs or configuration) has to be read from this page together with git-docs-repository-layout and git-docs-api-lockfile.

## Used in
- research/synthesis/field-5.md

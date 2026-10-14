---
url: https://git-scm.com/docs/api-lockfile
title: "Git - api-lockfile Documentation"
author: Git project
published: undated
accessed: 2026-10-14
kind: documented
---

## What it says
- Git makes writes to a file mutually exclusive and atomic with a lock file: a program creates `<filename>.lock` with `O_CREAT|O_EXCL`, writes the new contents to it, and renames it over the destination. Creation fails if another process already holds the lock.
- Lock files block only other writers; readers never block. A lock file left by a program that exits early is removed by an exit handler or signal handler.
- The page uses `$GIT_DIR/index` as its example destination path, and says nothing more about how the index uses the API.

## Limits
- An internal API description. It supports the mechanism behind git's "index.lock" failures when two git processes write the same index; it does not mention agents or worktrees.

## Used in
- research/synthesis/field-5.md

---
url: https://git-scm.com/docs/api-lockfile
title: "Git lockfile API (technical documentation)"
author: Git project
published: undated (living manual page; read October 2026; the header comment of lockfile.h in the Git source, raw file on GitHub, was also opened)
accessed: 2026-10-14
kind: documented
---

## What it says
- Git creates `<filename>.lock` with `O_CREAT|O_EXCL` so that it notices and fails if somebody else already holds the lock, then renames the lockfile over the target to commit and unlock. Without `LOCK_DIE_ON_ERROR`, trying to lock a file that is already locked returns -1 to the caller; with it, Git calls `die()`. The lockfile.h comments add a timeout mode: with `timeout_ms` of 0 it tries exactly once, with -1 it retries indefinitely, and in between it retries with quadratic backoff for at least that long. The top-of-file comment documents no waiting by default.
- Cleanup: an `atexit` handler and a signal handler remove outstanding lockfiles when the program exits, including through `die()`, or dies on a signal. Readers do not block; they see either the old or the new contents, assuming `rename` is atomic.

## Limits
- Neither page says what happens to a lock left by a process killed in a way the handlers cannot catch (such as SIGKILL), so the stale-lock case is not covered; the common advice to check for a live git process before deleting `index.lock` comes from community posts I did not open and is not cited here.
- Which Git operations take which lock (for example the index lock for `git add` or `git commit`) is not on these pages.

## Used in
- research/synthesis/field-6.md

## Also (question 7)
I opened the page again for question 7. A caller creates `<filename>.lock` with `O_CREAT|O_EXCL`, writes into it and renames it over the destination; if another process holds the lock, the default is that the lock call returns -1, and with `LOCK_DIE_ON_ERROR` it dies with a message. Readers are never blocked. The page's example destination is `$GIT_DIR/index`. Combined with the worktree page (per-worktree index), two git commands in different worktrees do not contend on one index lock; two in the same worktree can.

Used in: research/synthesis/field-7.md

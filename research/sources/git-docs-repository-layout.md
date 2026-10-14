---
url: https://git-scm.com/docs/gitrepository-layout
title: "Git - gitrepository-layout Documentation"
author: Git project
published: undated
accessed: 2026-10-14
kind: documented
---

## What it says
- With several working trees, most files in `$GIT_DIR` are per-worktree, with known exceptions; all files under the `common` entry are shared between all working trees (section "common").
- Shared through `$GIT_COMMON_DIR`: `objects`, `refs` (except `refs/bisect`, `refs/rewritten`, `refs/worktree`), `packed-refs`, `config`, `hooks`, `info`, `remotes`, `shallow`, `branches`, and `logs` (except `logs/HEAD`), plus the `worktrees` administrative data.
- Per worktree by implication: the `index` file, `HEAD`, `config.worktree`, and `logs/HEAD`. The page does not say "per-worktree" for the index in so many words; it follows from the index living in `$GIT_DIR` and not appearing on the shared list.
- `worktrees/<id>/locked`, if present, prevents pruning by `git worktree prune`.
- The page never mentions `.lock` files for the index, refs or `packed-refs`.

## Limits
- It is a layout reference, not a concurrency guide. Combined with git-docs-api-lockfile it supports an inference, not a statement on the page: separate worktrees do not share an index lock, but they do share the refs, object store and configuration whose own lock files remain shared.

## Used in
- research/synthesis/field-5.md

---
url: https://code.claude.com/docs/en/worktrees
title: "Run parallel sessions with worktrees"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; version markers on the page reach v2.1.281)
accessed: 2026-10-14
kind: documented
---

## What it says
All as of October 2026.
- Definition: a git worktree is a separate working directory with its own files and branch, sharing the repository history and remote. Giving each session its own worktree gives it a separate copy of the files to edit. `claude --worktree <name>` creates it under `.claude/worktrees/<name>/` on a new branch `worktree-<name>`; running it again with another name starts a second isolated session.
- What worktrees share (section "What worktrees share with the main checkout"): the repository's `.git` directory ("git commands in a worktree write to the main repository's shared `.git` directory", and the sandbox allows those writes), project-scope plugins, permission approvals saved to the main checkout's local settings file, and untracked skills, agents and commands that the worktree lacks.
- Isolation checks (section "How Claude Code enforces isolation"): while a session is isolated, Claude Code blocks file edits that target the main checkout, commands whose working directory resolves to the main checkout, git redirects into the main checkout (`git -C`, `--git-dir`, `GIT_DIR`, a `cd`), and commands whose git use it cannot verify from the text. The same checks cover every subagent. The page states that none of them tracks which files a shell command writes, so `cp` or a shell redirect into the main checkout is not refused by them.
- Subagents (section "Isolate subagents with worktrees"): ask Claude to use worktrees for its agents, or set `isolation: worktree` in a custom subagent. Each subagent gets a temporary worktree, removed when it finishes without changes. Worktrees branch from the repository's default branch unless `worktree.baseRef` is `"head"`. A subagent in its own worktree takes its starting instruction files from the main conversation, and by default does not load the worktree's own `CLAUDE.md`.
- Locks: while an agent runs, Claude Code holds a `git worktree lock` on its worktree so a concurrent cleanup cannot remove it, and a periodic sweep releases a lock left by a killed session (before v2.1.210 such a lock stayed until `git worktree unlock`). This is a lock against pruning and deletion. The page does not mention the git index lock or contention between parallel git commands.
- Non-interactive runs: `claude -p --worktree` skips the trust check; there is no exit prompt, so the worktree is not cleaned up and its lock stays until a later sweep.
- Cleanup: a clean unnamed worktree is removed on exit; a worktree with work in it prompts to keep or remove. The sweep removes subagent and background worktrees older than `cleanupPeriodDays` unless they hold work.
- The "Run agents in parallel" page adds that agent teams do not isolate teammates in worktrees, so work should be partitioned by file ownership (code-docs-agents-compare).

## Limits
- Documentation; volatile. It documents what the tool enforces, not how often parallel sessions collide. For reports of isolation gaps see the three GitHub issue notes (github-claude-code-issue-52958, -55708, -84685).

## Used in
- research/synthesis/field-5.md

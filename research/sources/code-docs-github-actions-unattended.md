---
url: https://code.claude.com/docs/en/github-actions
title: "Claude Code GitHub Actions"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- As of October 2026 the Claude Code GitHub Action runs the Agent SDK in workflows, in interactive mode (waits for `@claude`) or automation mode (a `prompt` input, run on any GitHub event including a `schedule` cron).
- Section "Who can trigger runs": the action checks write access for the triggering user on issue and pull request events, and rejects a bot actor unless it is listed in `allowed_bots`, which "keeps bots from triggering Claude in a loop". The bot check also applies to scheduled runs, which GitHub attributes to a repository user, usually the last editor of the cron schedule.
- Section "Manage costs": each run uses GitHub Actions minutes (runners are GitHub-hosted) and API tokens. The cost levers the page lists: write specific requests, use issue templates, keep `CLAUDE.md` concise, "Set `--max-turns` in `claude_args` to limit iterations", set workflow-level timeouts "to avoid runaway jobs", and use GitHub's concurrency controls to limit parallel runs.
- For a plain-text prompt Claude has no shell or GitHub API access until `--allowedTools` in `claude_args` (or a `permissions.allow` rule in the `settings` input) grants it.
- GitHub runs scheduled workflows only from the default branch and, in public repositories, disables the schedule after 60 days without repository activity (the page states this as GitHub behaviour).
- CI does not run on commits made with the default `GITHUB_TOKEN`, because GitHub does not trigger workflows on them.

## Limits
- Configuration documentation; it gives no default for `--max-turns` or for run duration and no measurement of cost.

## Used in
- research/synthesis/field-6.md

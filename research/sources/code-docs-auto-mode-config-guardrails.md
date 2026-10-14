---
url: https://code.claude.com/docs/en/auto-mode-config
title: "Configure auto mode"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026; version markers run to v2.1.246 for the permissions tab)
accessed: 2026-10-14
kind: documented
---

All items are as of October 2026.

## What it says
- Opening: auto mode routes tool calls through a classifier that blocks anything irreversible, destructive, or aimed outside the environment; deny and explicit ask rules are evaluated before the classifier and still block or prompt. By default the classifier trusts only the working directory and the current repository's configured remotes, so pushing to a company source-control organization is blocked until it is added to `autoMode.environment`.
- "Common boundaries": a table separates three mechanisms. `permissions.ask` always prompts for a matching content-scoped command even in auto mode. `permissions.deny` "blocks before the classifier is consulted" and neither the classifier nor user intent can override it. A boundary stated in conversation ("don't push until I review") can be lost when compaction removes the message, so for a durable guarantee use an ask or deny rule. The page says an ask rule on `git push` does not match `git -C <dir> push`, and points to a PreToolUse hook for a checkpoint that inspects the full command.
- "Where the classifier reads configuration": it reads the same CLAUDE.md content Claude loads, so "never force push" there steers both. It reads `autoMode` only from user settings, managed settings or the `--settings` flag, not from project settings, because a checked-in repo could otherwise inject its own allow rules.
- "Override the block and allow rules": four tiers in the classifier: `hard_deny` (unconditional), `soft_deny` (user intent can clear), `allow` exceptions, then explicit user intent. General requests such as "clean up the repo" do not count as intent to force-push. A Danger box says that setting any of `environment`, `allow`, `soft_deny` or `hard_deny` without the literal `"$defaults"` replaces the whole default list for that section, discarding built-in rules such as force-push and `curl | bash` blocks.
- "Route all shell commands through the classifier": narrow allow rules such as `Bash(npm test)` are resolved before the classifier, so a narrow rule "can still let a destructive argument through without the classifier seeing it". `autoMode.classifyAllShell: true` suspends every Bash and PowerShell allow rule in auto mode, at the cost of latency, with critical-path removals excepted.
- "Review denials": the notice shows the matched rule name, for example `[Production Deploy]` or `[Data Exfiltration]`; the Recently denied tab in `/permissions` lists denials and `r` retries one; a `PermissionDenied` hook receives the exact `tool_input`. A denial with no classifier verdict is not recorded under Recently denied. For repeated denials of one destination the page says the classifier is probably missing context, and to add the destination to `autoMode.environment`. `claude auto-mode critique` reviews custom rules and flags entries likely to cause false positives.

## Limits
- Documentation. It describes configuration and says false positives occur (repeated denials usually mean missing context), but gives no rate (see anthropic-engineering-auto-mode for the vendor's measured figures).

## Used in
- research/synthesis/field-7.md

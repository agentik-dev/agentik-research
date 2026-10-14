---
url: https://code.claude.com/docs/en/security
title: "Security"
author: Anthropic (Claude Code documentation)
published: undated (living documentation; read October 2026)
accessed: 2026-10-14
kind: documented
---

All items are as of October 2026.

## What it says
- "Permission-based architecture": auto mode is the built-in starting mode for interactive terminal and VS Code sessions; a separate classifier reviews actions and blocks the ones it judges unsafe, while explicit ask and deny rules still apply. Manual mode starts read-only and asks before edits, tests and commands, though a built-in set of read-only commands (`ls`, `cat`, `git status`) runs without asking.
- "Built-in protections": the sandboxed Bash tool, a working-directory boundary, allowlists for frequently used safe commands, and Accept Edits mode. The page says the working-directory boundary is a permission prompt, "so a Bash command you approve can still write anywhere your user account can"; restricting Bash at operating-system level needs sandboxing.
- "Core protections" and "Additional safeguards": network commands such as `curl` and `wget` are not auto-approved by default; most network tools need approval in Manual mode; WebFetch runs a separate model call over a page so Claude sees the answer instead of the raw page; a workspace trust dialog and `.mcp.json` approval exist for interactive sessions only; a Bash command that cannot be fully analyzed prompts in Manual mode ("command injection detection"); unmatched commands require approval ("fail-closed matching"). A `-p` session shows neither the trust dialog nor the MCP approval prompt.
- A deny rule matches the command as written; for network enforcement that does not depend on the command text the page points to sandbox network isolation.
- Warning: "no system is completely immune to all attacks", and the page's best practices for untrusted content include running scripts and tool calls in virtual machines, especially with external web services.
- "Cloud execution security": each cloud session runs in an isolated Anthropic-managed VM with limited network access by default; GitHub credentials never enter the VM; the GitHub proxy rejects branch deletions and pushes of anything other than a branch.
- "Security best practices": for more isolation run the whole local-mode process inside the sandbox runtime or a dev container; audit or block settings changes during a session with `ConfigChange` hooks.

## Limits
- Documentation; a statement of design, with no measured effect. The page lists safeguards but does not give how often they stop an attack.

## Used in
- research/synthesis/field-7.md

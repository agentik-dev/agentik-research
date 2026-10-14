---
url: https://blog.sshh.io/p/how-i-use-every-claude-code-feature
title: "How I Use Every Claude Code Feature"
author: Shrivu Shankar
published: 2025-11-02
accessed: 2026-10-14
kind: reported
---

## What it says
- Author's practice: the root CLAUDE.md of a professional monorepo is about 13KB and strictly maintained, with an estimate that it could grow to about 25KB; only tools used by roughly 30 percent of engineers get documented in the root file (the author calls the threshold arbitrary), and other tools get their own markdown files. Each tool gets a maximum token allocation, which the author likens to selling ad space.
- Author's observation through `/context`, not a formal measurement: a fresh session in that monorepo starts with a baseline of about 20k tokens, roughly 10 percent of a 200k window.
- What goes in: guardrails for what the agent gets wrong, and pointers to deeper docs with a reason and a trigger for reading them. What stays out: full manuals and `@`-embedded doc files; the author says `@`-embedding bloats context on every run while a bare path is often ignored. Negative-only rules should carry an alternative.
- Hooks: a `PreToolUse` hook on `git commit` blocks the commit unless a test-pass marker exists ("block-at-submit"); the author avoids blocking mid-plan on Edit or Write because it confuses the agent. These are observations, not measurements.

## Limits
- One engineer's practice in one large codebase; no controlled measurement, and the author's own team numbers (such as billions of tokens a month) are self-reported. Skills are discussed as a scripting layer, not compared with CLAUDE.md.

## Used in
- research/synthesis/field-3.md

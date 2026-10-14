---
repo: agentik-dev/agentik-research
path: Makefile, .claude/respeak/config.yaml
commit: 66dd372
title: "agentik-research Makefile"
author: agentik-dev
published: 2026-10-14
accessed: 2026-10-14
kind: our-use
---

## What it says
- `check` runs `structure style hygiene site a11y links`; `style` runs respeak's own gate, `.sources/agentik-respeak/plugin/scripts/respeak-check.sh`, over the files the repo's respeak configuration includes (`docs/**/*.md` and `README.md`).
- `site` builds with `mkdocs build --strict`; `a11y`, `links` and `shots` run the Node scripts in `scripts/`.
- `.claude/respeak/config.yaml` at 66dd372 (`git diff 66dd372 14b6bdc` on it is empty), lines 19-29: `gate.enabled: true`, `include: ["docs/**/*.md", "README.md"]`, `fail_on: error`, `block_on: introduced`, `allow: ['synerg', 'delve']`. The comment at :25-28: "Two corpus rules are skipped: cited paper titles carry the words they ban", and "A quoted title is never reworded."

## Limits
- This repo's own build file; it shows what the check runs, not how often it runs.

## Used in
- docs/journal/posts/2026-08-31-two-lanes.md

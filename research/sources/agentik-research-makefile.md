---
repo: agentik-dev/agentik-research
path: Makefile
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

## Limits
- This repo's own build file; it shows what the check runs, not how often it runs.

## Used in
- docs/journal/posts/2026-08-31-two-lanes.md

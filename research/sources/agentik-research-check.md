---
repo: agentik-dev/agentik-research
path: scripts/check, Makefile, .claude/respeak/config.yaml
commit: b33bd13
title: "The site's structural check and its Makefile"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

Read at b33bd13: scripts/check whole, Makefile lines 1-48, config.yaml lines 17-22. Neither scripts/check nor the Makefile changed between 8f77e45 and 2e9e2e8 (`git diff --stat` empty).

## What it says
- Makefile line 22: `check: structure style hygiene site a11y links`. `structure` runs `scripts/check`; `style` runs respeak's gate, `respeak-check.sh`; `hygiene` runs the commons hygiene scan; `site` runs `mkdocs build --strict --quiet`; `a11y` runs axe on every page, light and dark, and fails on a serious or critical violation (lines 36-38); `links` runs linkinator over `site/`, fails on a broken internal link and lists external failures in `.cache/links.txt` (lines 40-43).
- The seed's Makefile, 4703b79 line 16, read `check: structure style hygiene site`; 11ffca6 ("phase 0: npm checks (shots, a11y, links)") made it the six above, and 8f77e45 ("phase 1") added the journal rules to scripts/check (`git show --stat` on each).
- config.yaml line 21: the gate includes `docs/**/*.md` and `README.md`.
- scripts/check, docstring lines 7-19: `nav` (every page under docs/ is in the nav, every nav entry exists, journal posts never in the nav); `journal` (each post opens with front matter holding a date and at least one category from `categories_allowed`); `footnotes` (every reference defined and every definition used; each page but the glossary and the journal index has one; definitions under `## Sources` and carrying a URL); `drafts` (no TODO, TBD, FIXME or XXX); `hygiene` (no home-directory path, private IPv4 address or e-mail address in docs/, research/ or README.md); `notes` (front matter naming url or repo, accessed and kind); `charter` (the newest charter under 4 KB).

## Limits
- This repo's own build file and script; they show what the check runs, not how often it ran.

## How this site uses it
- The method page describes the checks from it.

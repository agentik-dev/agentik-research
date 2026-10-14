---
repo: agentik-dev/agentik-respeak
path: plugin/skills/ (respeak, init, include, off, on, report)
commit: 319f060
title: "respeak skills: respeak, init, include, off, on, report"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Six skills, 23 to 107 lines each. `respeak` is model-invocable (also by asks such as "explain that to my manager"); `init`, `include`, `off`, `on` and `report` set `disable-model-invocation: true` (user-invoked only).
- `respeak/SKILL.md` (read in full) fixes the translation flow: pick the mode (argument, else inferred from the audience the user named, else the configured default); resolve the configuration for the target with `respeak-config.sh resolve`; delegate to the `respeak:respeak` agent with the resolved block ("Do not translate inline yourself"); then verify before relaying by feeding the narrative to `respeak-measure.py - --fail-on error`. Exit 0: relay verbatim with the marker line. Exit 1: send the report back to the agent for a rewrite, at most 2 rounds total. Still failing after 2 rounds: relay anyway with the final report appended under a `respeak gate: still failing after 2 rounds` heading, so the person sees what did not clear; the skill does not attempt a third round.
- `init/SKILL.md` (first 40 of 103 lines read): creates `.claude/respeak/` and its `proposals/` folder; seeds the project config from `project-seed.yaml` (gate off); runs `respeak-include.py propose` and, with consent, seeds `gate.include` and `narrative.profile: peer-engineer`; offers the include file and its import, gitignore lines and a statusline segment. It never overwrites an existing project file.
- `include/SKILL.md` (first 25 of 60 lines read): `write` or `check` the include file; tells the author to commit `.claude/respeak/config.yaml` and the lexicon digest first, since the render reads only what git tracks.
- `off`, `on`, `report` (headers only): `/respeak:off [gate]` and `/respeak:on [gate]` run `respeak-session.sh` and relay its output; `report` files a GitHub issue through `gh` with an environment footer and a privacy pass, and attaches project content only with `--include-content`.

## Limits
- `init`, `include` and `report` were read in part. Skill descriptions are capped at 200 characters by the shared documentation lint (CHANGELOG 0.6.1).

## Used in
- research/synthesis/tools-respeak.md

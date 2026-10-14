---
repo: agentik-dev/agentik-respeak
path: plugin/scripts/respeak-include.py
commit: 319f060
title: "respeak-include.py: render or check a repo's static include file"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Three verbs: `write [--out PATH]`, `check [--out PATH]`, `propose [--root R]` (docstring lines 1-45 read). No model is called. The file holds the repo's default communication rules, at most 1,500 bytes, imported by an `@` line from `CLAUDE.md` or `AGENTS.md`, so a reader without respeak still gets the rules.
- Inputs and nothing else: the plugin defaults, the repo's `.claude/respeak/config.yaml` when git tracks it as a regular file, the template `config/include.md.tmpl`, and whether git tracks `.claude/respeak/lexicon-active.md`. The user, `userConfig`, ancestor, folder and local layers, the session and the environment never reach the file.
- `--out` defaults to `.claude/respeak/include.md`; it must resolve inside the git root, not under `.git`, and never under `~/.claude`. The first line stamps the template version and a short hash of the inputs, so `check` tells stale from hand-edited.
- Exit: `write` 0 written; `check` 0 current, 1 drift (absent, stale or hand-edited); `propose` 0 printed; each 2 on a usage error or a render over the cap (then `write` prints the size and writes nothing).
- `propose` prints the `gate.include` list of human-lane files present at the root (README, CHANGELOG, DECISIONS, DESIGN, NICE_TO_HAVE, OPEN-QUESTIONS, HANDOFF, `docs/`, `plugin/docs/`, `design/readme/`), or `["**/*.md"]` when none is.
- Sizes recorded elsewhere: the design example is 1,306 bytes; the fixture render is 1,220 bytes and this repo's own render 1,409 bytes in memory (sitting 2026-10-11-2).

## Limits
- Docstring only; the 21,674-byte file body was not read. The open defects found in review are in `NICE_TO_HAVE.md` (see `agentik-respeak-nice-to-have`).

## Used in
- research/synthesis/tools-respeak.md

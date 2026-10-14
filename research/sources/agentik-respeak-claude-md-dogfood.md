---
repo: agentik-dev/agentik-respeak
path: CLAUDE.md, .claude/respeak/config.yaml, .claude/respeak/lexicon-active.md
commit: 319f060
title: "How respeak runs on its own repository (CLAUDE.md, project config, lexicon digest)"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- `CLAUDE.md` (2,719 bytes) says the repo "ships the respeak plugin and uses it on itself". The human lane is README, CHANGELOG, the five root files as each lands (DECISIONS, DESIGN, NICE_TO_HAVE, OPEN-QUESTIONS, HANDOFF), top-level `design/*.md`, `design/readme/`, `docs/` and `plugin/docs/`, read by people in technical mode for a peer engineer. Skills, agent prompts, packets and sittings are read by a model and not gated. Of the five root files only `NICE_TO_HAVE.md` exists at this commit.
- Editing a human-lane file: do not hand-edit prose; ask the `respeak:respeak` agent for its technical-mode editorial pass written to a scratch path, then prove the edit changed only prose with `respeak-verify-edit.py <before> <after>` (exit 0 = safe) or `respeak-check.sh --verify HEAD`. Headings, links, fenced code, inline code and numbers must be byte-identical. "Under about ten new lines, the gate is the pass."
- The README is written by `make readme` only, with a 24,576-byte source ceiling. The gate is on through a PostToolUse hook; `/respeak:off gate` silences it for one session and the commit message must say so.
- The ratified-shorthand digest imported by `CLAUDE.md` holds exactly two terms, `cfg` and `R1..R7`, each with its expansion and meaning, under the rule that only these terms may be used as shorthand in agent traffic; error messages, security findings, user quotes and numbers with units are never compressed.
- `.claude/respeak/config.yaml` sets `narrative.profile: peer-engineer`, `hooks.session_start: true`, `gate.enabled: true` with an include list of the human-lane files and `design/readme/`, `exclude: [examples/]` and `fail_on: error`. A comment says the gate is kept on until a human-only check ships.

## Limits
- This is the tool on its own repo: the owner's use, not an independent trial. The repo has no DECISIONS.md or OPEN-QUESTIONS.md, so the ruling behind the include file sits only in a charter and `NICE_TO_HAVE.md`.

## Used in
- research/synthesis/tools-respeak.md

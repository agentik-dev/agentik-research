---
repo: agentik-dev/agentik-respeak
path: plugin/scripts/respeak-gate.sh, plugin/scripts/respeak-check.sh, plugin/hooks/hooks.json
commit: 319f060
title: "The style gate (hook), the CI check and the hook manifest"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- `hooks/hooks.json` registers three hooks: SessionStart (`lexicon-status.sh`, timeout 10 s), Stop (`stop-narrative.sh`, timeout 10 s) and PostToolUse with matcher `Write|Edit` (`respeak-gate.sh`, timeout 20 s). SessionStart and Stop speak only when a config key turns them on (both default off).
- `respeak-gate.sh` (header, lines 1-120 read): runs `respeak-measure.py` against a Markdown file (.md, .markdown, .mdx) and blocks on a failing report. Exit 0 allows (not applicable, gate off, overridden, the file passed, or a setup problem: it fails open; `RESPEAK_GATE_TRACE=1` prints which). Exit 2 blocks and puts the measure report on stderr, which Claude Code feeds back to the model as the error to fix. Exit 3 only in the CLI `--committed` form: no verdict. Bounds so a write never waits past the hook's 20 s: a file over `RESPEAK_GATE_MAX_BYTES` (default 2,097,152) blocks as "too large to gate"; the measure runs under a deadline of `RESPEAK_GATE_DEADLINE` seconds (default 15), and a measure past it is a setup failure.
- The verdict is measured against `gate.block_on`. With `introduced` (default) the scanner gets a baseline: the committed version of the file (`git show HEAD:./<name>`), else for an Edit the pre-edit text rebuilt from `old_string` and `new_string`, else an empty file (a new document is gated whole). Only hits the write added block; a pass over a file that still has older hits prints one line of PostToolUse `additionalContext` naming them. `any` gates the whole file.
- The gate is opt-in per project: nothing happens unless the project layer sets `gate.enabled: true`; a user file or folder `.respeak.yaml` cannot turn it on.
- `respeak-check.sh` (header, lines 1-80 read) is the command-line and CI form: it gates every Markdown file git knows about (tracked plus untracked and not ignored) using `respeak-gate.sh --committed`, so `gate.*` come from plugin defaults and the committed project file only. It unsets `RESPEAK_GATE`, `RESPEAK_HOOKS`, `RESPEAK_CONFIG`, `CLAUDE_CODE_SESSION_ID` and `XDG_STATE_HOME`. With `--verify <ref>` each file that differs from the ref must also pass the meaning-invariance verifier, with leniencies read from that file's resolved `editorial_pass`. Exit 0 all allowed and verified; 1 at least one block, error or verification failure; 2 usage or setup error or a git failure (stops at the first; per-call limit `RESPEAK_GIT_TIMEOUT`, 10 s default).

## Limits
- I read the headers, not the bodies. The ADV6, ADV10 and ADV11 reviews (see `agentik-respeak-design-reviews`) show that earlier forms of the CI check could be turned green by an ignored file, the environment, a nested repository or a git failure; the committed-only form is the answer to those. The last review in the repo (ADV11, from the 2026-09-24 sitting) still ruled the check not ready for another repo's docs until two wrong-green findings were fixed; CHANGELOG 0.7.0 records fixes for them, and no later review is in the repo.
- The hook measures what a tool wrote; it cannot see text a session says in chat or writes in a file the include list does not match.

## Used in
- research/synthesis/tools-respeak.md

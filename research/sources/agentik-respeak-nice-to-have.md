---
repo: agentik-dev/agentik-respeak
path: NICE_TO_HAVE.md
commit: eb7d642
title: "What is left open, none of it blocking (NICE_TO_HAVE.md of the respeak repository)"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
Line numbers are at eb7d642. The file is 24 lines: front matter (`status: current`, `updated: 2026-10-13`), a title, one sentence that nothing in it blocks a review or a merge (line 9: an item leaves when it lands or a decision retires it), and 14 bullets (lines 11-24; I counted with `grep -c '^- '`).
- Lines 11-18 are the include-file work (`/respeak:include`, `/respeak:init`) and its review rounds, unchanged in substance from the earlier survey at 319f060:
  - include-r1's refuter round (line 11; a block on B1 fixed before the merge). The user-level CLAUDE.md import stays a by-hand step (N5). The owner's ruling sits in no DECISIONS.md because this repo keeps no ledger (N8). Unchecked: whether Claude Code hides the include file's HTML-comment stamp line from the model.
  - `/respeak:include`'s two rounds (line 12): a change to the script alone makes `check` say "hand-edited" where the file is only stale; over the cap `check` exits 2 and prints "nothing written"; a backtick in a `gate.include` pattern breaks its code span; a separate git dir under another name inside the root is not refused; `CLAUDE_CONFIG_DIR` is not guarded as `~/.claude` is; a tracked config hard-linked to a user-layer file reaches the render; with the parent directory at mode 000 the tracked config is skipped with no warning and `check` exits 0.
  - `/respeak:init` still copies the plugin's lexicon into every repo (line 13). Whether `init` should seed a lexicon at all is open.
  - Five S4 items from the n1 review (lines 14-18): the uncommitted-input note fires on edits the render never reads; `propose` counts a symlinked `README.md` but skips a symlinked `docs/*.md`; `propose --root ""` silently means the current directory; a bare `yes` or `on` in a config file is a YAML 1.1 boolean that `validate`, the resolver and the hook accept for `hooks.session_start`, while `--set hooks.session_start=yes` is refused (the comment at `plugin/scripts/respeak-config.py:788` says `yes` is refused); unchecked whether init's `Bash(git add .claude/respeak/*)` allowance also matches a command that stages the whole tree.
- Lines 19-24 are new since 319f060, from the rename packet agentik-r1-respeak (2026-10-13):
  - Line 19: the migration is `make venv`, but this repo has no `venv` target; the Makefile runs on the old venv named on `.python-version`'s second line until one lands or the owner builds `agentik-respeak` (3.12, PyYAML) at the switch.
  - Line 20: README.md and its source took the same hand edit and were stamped by `readme-fresh.sh --stamp` after the verifier passed, because `make readme` spawns `claude -p`. The next `make readme` gives the new install paragraph its editorial pass.
  - Lines 21-24, four S4 items from the agentik-r1 review: `respeak-doctor.sh` prints the new plugin ID and no warning when both IDs are listed, which hides the doubled hooks the README warns about; `make install` with only the old ID listed prints no hint to disable it; `make install` on a malformed or empty plugin list exits 2 with a raw Python traceback; the Makefile's `$(wildcard)` venv pick takes a dangling new-venv link over a working old venv.

## Limits
- Every item concerns the tooling around the include file, `init`, install and the rename. None concerns the translator's accuracy, the lexicon's use or whether a person reads the output better; those gaps appear only in the README's "Declared, not yet checked or built" list (`agentik-respeak-readme`).
- My reading, not the file's: its own items use review labels (N5, N8, B1, S4, n1) that a reader must decode from the charters. The file sits in the gate's `gate.include` list (`.claude/respeak/config.yaml`), and the gate checks banned phrases, not unexplained labels.
- The tag `S4` is the only priority mark in the file. It appears in 9 of the 14 bullets (lines 14-18 and 21-24; `grep -c S4`); the other 5 carry no level. The file does not rank them. (Counts are mine.)

## Used in
- research/synthesis/tools-respeak.md
- research/synthesis/journal-two-lanes.md

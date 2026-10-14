---
repo: agentik-dev/agentik-respeak
path: NICE_TO_HAVE.md
commit: 319f060
title: "claude-code-respeak: what is left open, none of it blocking (NICE_TO_HAVE)"
author: agentik-dev
published: 2026-10-12
accessed: 2026-10-14
kind: our-use
---

## What it says
- The file opens: nothing in it blocks a review or a merge, and an item leaves when it lands or when a decision retires it. Front matter says `status: current`, `updated: 2026-10-12`.
- Eight bullet groups remain, all from the include-file work (`/respeak:include`, `/respeak:init`) and its two review rounds:
  - include-r1 refuter round (2026-10-11; a block on B1 fixed before merge): N5, the import from the user-level CLAUDE.md stays a by-hand step; N8, the owner's ruling sits in no DECISIONS.md because this repo keeps no ledger. Unchecked: whether Claude Code hides the include file's HTML-comment stamp line from the model.
  - `/respeak:include` two rounds (2026-10-11): a change to the script alone makes `check` say "hand-edited" where the file is only stale; over the cap `check` exits 2 and prints "nothing written"; a backtick in a `gate.include` pattern breaks its code span; a separate git dir under another name inside the root is not refused; `CLAUDE_CONFIG_DIR` is not guarded as `~/.claude` is; a tracked config hard-linked to a user-layer file reaches the render; with the parent directory at mode 000 the tracked config is skipped with no warning and `check` exits 0.
  - `/respeak:init` still copies the plugin's lexicon into every repo (packet n1, 2026-10-12); whether `init` should seed a lexicon at all is open.
  - S4 items from the n1 review: the uncommitted-input note fires on edits the render never reads and stays silent on deleted or skip-worktree files; `propose` counts a symlinked `README.md` but skips a symlinked `docs/*.md`; `propose --root ""` silently means the current directory; a bare `yes` or `on` in a config file is a YAML 1.1 boolean that `validate`, the resolver and the hook accept for `hooks.session_start`, while `--set hooks.session_start=yes` is refused, and a comment at `plugin/scripts/respeak-config.py:788` says `yes` is refused; unchecked: whether init's `Bash(git add .claude/respeak/*)` allowance also matches a command that stages the whole tree.

## Limits
- Every item is about the tooling around the include file and `init`. None concerns the translator's accuracy or the lexicon's use; those gaps appear in the README's status section (see `agentik-respeak-readme`).
- The title line uses the repository's earlier name; this note does not repeat it.

## Used in
- research/synthesis/tools-respeak.md

---
repo: agentik-dev/agentik-commons
path: bin/agentik
commit: e456f4b
title: "agentik: the front door to the agentik tools (agentik-r1 section 3)"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- The script is 96 lines of POSIX `sh` (`wc -l`, this survey), version 0.1.0, under the 100-line bound the Makefile enforces.
- `agentik <tool> args` validates the tool name as lowercase ASCII letters, digits and single hyphens, finds the first executable `agentik-<tool>` on PATH (an empty PATH entry, the trailing one included, counts as the current directory) and `exec`s it with the arguments unchanged. It reads and writes nothing.
- With no arguments or `help` it lists each `agentik-*` on PATH once, first in PATH order winning. `agentik help <tool>` runs the tool's `--help`. `--version` prints the front door's version.
- Exit codes: 0 for list, help and version, even when no tool is found; 2 for usage, a bad name included; 3 when the tool is not on PATH, with one stderr line saying which repo (`agentik-dev/agentik-<tool>`) it comes from; otherwise the tool's own code.
- This survey ran the script in a scratch copy on 2026-10-14: an unknown tool exited 3 with the repo line, no tools on PATH listed "no agentik-* tool on PATH" and exited 0, and a malformed name exited 2.

## Limits
- Only a dispatcher: it adds no behaviour to the tools. Plugins call the dash name, never the front door (r1 §5.1), so hooks do not depend on it.
- Not shown here: how the front door behaves once tools are installed through each repo's `make install`; that is in the other repos.

## Used in
- research/synthesis/tools-commons.md

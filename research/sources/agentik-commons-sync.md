---
repo: agentik-dev/agentik-commons
path: scripts/sync
commit: e456f4b
title: "sync: refresh the vendored copies in a tool repo (agentik-r1 7.3)"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- `scripts/sync <repo>` copies the front door to `<repo>/scripts/agentik` and the hygiene and bounded scripts to `<repo>/scripts/`, then writes `<repo>/scripts/vendored.sha256` in `shasum -a 256 -c` form. It touches nothing else and never commits; the packet that runs it commits.
- Copies are written to a temporary name and moved into place. It exits 2 on usage, a target that is not a git checkout, a target that resolves to commons itself, or no sha256 tool; it never follows CDPATH.
- Each tool repo's `make check` runs the hash check, so a hand edit to a vendored copy fails the gate.

## Limits
- The self-check compares resolved paths only, so a second clone of commons can be the target (agentik-commons-nice-to-have, N1).
- It pins what was copied; it does not say a tool repo is current. A repo that never re-syncs keeps an old copy that still passes its own check.

## Used in
- research/synthesis/tools-commons.md

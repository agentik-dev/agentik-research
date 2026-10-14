---
repo: agentik-dev/agentik-relay
path: design/pin-pycache-r1.md
commit: a326550
title: "agentik-relay design: python's own bytecode and the pinned tree (r1)"
author: agentik-dev
published: 2026-10-01
accessed: 2026-10-14
kind: our-use
---

Read the header and sections 1 and 2 only.

## What it says
- Problem (2026-10-01): a night's gate was `unrun` with `tool-moved: python3` and its row ended `red: gate-unrun` with five acts unjudged. No tool had moved. The relay pinned its tools at 14:50:57 local; at 14:58:09 another process on the account ran the same python and imported a stdlib module for the first time, so python wrote two `.pyc` files into the stdlib's `__pycache__`. The relay's tree snapshot counted two added entries as a moved tool. The writer's timestamp matched the two files' mtime to the second, and nothing else in python's roots changed.
- The entry could not simply be ignored: Python loads a `.pyc` in place of the source when its header matches the source's mtime and size, so a planted `.pyc` would change what the stdlib does for every python that reads it. That is why the pin counted the whole tree.
- Decision: the gate's python stops reading and writing the shared `__pycache__` (each scratch home sets its own `PYTHONPYCACHEPREFIX`), and the snapshot then leaves python's own cache files out.
- Header states the refuter round blocked on one finding, since taken; AR49 built it on 2026-10-01.

## Limits
- One incident, reasoned from timestamps; the design's proof P1 is in section 4, not read for this note.

## Used in
- research/synthesis/tools-relay.md

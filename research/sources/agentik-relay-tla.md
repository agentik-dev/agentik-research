---
repo: agentik-dev/agentik-relay
path: design/tla/
commit: a326550
title: "design/tla: the TLA+ model of the night and its two fork storms"
author: agentik-dev
published: 2026-09-23
accessed: 2026-10-14
kind: our-use
---

Opened: `check.sh` (first 30 lines), the first 1,500 characters of `storm-run-trace.txt`, and the directory listing. Not read: `Night.tla` (44 KB), the config files, the other traces. The model's design is described in `design/relay-r1.md` section 16, read for this note.

## What it says
- The folder holds `Night.tla`, five configs (`Night.cfg`, `Storm.cfg`, `Storm-run.cfg`, `Storm-detached.cfg`, `Storm-path.cfg`) and four committed TLC counterexample traces for the storms.
- `check.sh` first asserts fifteen named invariants and properties are defined in `Night.tla` (for example `NoNestedMeasure`, `OneMeasurePerRoot`, `NoSpawnWhenOpen`, `NoOrphanAfterExit`, `UnrunNeverPasses`, `NoNestedSpawn`, `OneHolder`, `StalledChildEventuallyKilled`), then runs TLC with 4 workers. `make tla` is not part of `make check`.
- `storm-run-trace.txt` begins "Error: Invariant NoNestedSpawn is violated." with a state listing: the committed traces are the proof that, with the run guard off, a child's `relay run` can spawn its own children.
- The design page records the model's size and a case where the model, not the Go code, was wrong (the first real TLC run, 2026-09-23).

## Limits
- The model abstracts to two rows and five processes; the sandbox, the hooks and several gate inputs are outside it, as the design page lists.
- Only the check script and one trace head were opened.

## Used in
- research/synthesis/tools-relay.md

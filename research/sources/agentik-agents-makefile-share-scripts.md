---
repo: agentik-dev/agentik-agents
path: Makefile
commit: 78ce312
title: "Makefile, scripts/, share/ and the marketplace file of agentik-agents"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

Read: the Makefile, `.claude-plugin/marketplace.json`, `.hygiene-allow` (first lines), and the listing of `scripts/` and `share/`.

## What it says
- `make test` runs the four shell suites then the six Python suites; `make check` runs `check-unlocked` under the shared `bounded` script (a lock file in the tree, 840 s wall, held off above load 4 per core): syntax checks of every tool, then `make test`, then the hygiene scan. `make install` links the eight tools into a bin folder and `make doctor` reports key, proxy and local-lane readiness without gating.
- `scripts/` holds two vendored copies, the `bounded` wrapper and the `hygiene` scan, each byte-identical to the suite's canonical copy (the packet and README say so; this survey did not compare bytes).
- `share/` holds only Qwen's published chat template (8,952 bytes), needed because Ollama's GGUF blobs carry no template and llama-server rejects tool calls without one.
- The marketplace file lists one plugin at version 1.2.0 whose source is `./plugin`; the allow-file records the plugin's earlier name as an exception until the rename.

## Limits
- Build plumbing; it records no incident or measurement.

## Used in
- research/synthesis/tools-agents.md

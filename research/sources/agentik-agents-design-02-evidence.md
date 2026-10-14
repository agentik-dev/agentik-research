---
repo: agentik-dev/agentik-agents
path: design/02-local-rig/
commit: 78ce312
title: "design/02 evidence folder: rig logs and harness scripts"
author: agentik-dev (the suite owner)
published: 2026-09-05
accessed: 2026-10-14
kind: our-use
---

Opened: file list and sizes; a grep of the honest-rerun logs for the MLX cache-hit lines and run walls. The harness scripts, the chat template and the other logs were listed, not read.

## What it says
- The folder holds one log per rig leg dated 2026-09-05 (honest rerun 1 to 3, MLX, llama-server, a mis-routed Unsloth leg, an Ollama MLX runner log), the shell harness for each leg, a launcher script per backend, and a copy of Qwen's chat template (8,952 bytes, also under `share/`).
- The honest-rerun logs contain the MLX runner lines the design quotes: "cache hit ... matched=6123 cached=1633 left=4502" in one log and "matched=6123 cached=1633 left=4507" in another, which supports the claim that a repeat of the same agent restored only to the 1,633-token branch point.
- Run walls in the honest-rerun log are whole-session figures (141 s, 97 s, 112 s, 48 s in the lines opened), not the per-request figures in the design table.
- The mis-routed Unsloth log is kept deliberately; the design flags its rows as not Unsloth numbers.

## Limits
- I spot-checked two numbers against the logs; I did not re-derive the full table in section 3.6d.

## Used in
- research/synthesis/tools-agents.md

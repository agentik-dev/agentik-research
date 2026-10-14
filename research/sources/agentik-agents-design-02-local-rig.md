---
repo: agentik-dev/agentik-agents
path: design/02-local-rig.md
commit: 78ce312
title: "design/02: The local rig: several backends behind one router"
author: agentik-dev (the suite owner)
published: 2026-09-05 (the document's own trial dates, 2026-09-04 and 2026-09-05)
accessed: 2026-10-14
kind: our-use
---

Read: TL;DR, the research sweep table, the rig shape, the flag sets, section 2.2, the measurement tables 3.4 to 3.6d, section 3.7 and the decisions. Sections 3.1 to 3.3 (superseded baselines) were skimmed by heading.

## What it says
- Question: Ollama's llama runner cannot reuse a prompt prefix across agents and serves this model single-slot. The doc looks for a better backend behind the same router, with three candidate ideas: Ollama's MLX runner (a prefix trie across conversations plus a native multi-token-prediction drafter), llama-server tuned for a hybrid model (two slots, host-memory prompt cache, dense checkpoints), and Unsloth's API server (llama-server with packaging).
- Result: "none of them beats Ollama's own GGUF runner on the case that recurs in a delegating session". The original recommendation to make the MLX build the default (section 3.4) was drawn from a late-divergence prompt shape and is withdrawn in section 3.6d; the Ollama GGUF runner stays `local/default`.
- Honest rerun on 2026-09-05: a seat main (Haiku, later Sonnet) really delegates to two local subagents whose prompts differ from the first token. Per-prompt about 5.3k tokens on Ollama runners and about 6.3k on llama-server; shared prefix 1,633 tokens. New agent shape: Ollama GGUF 32.6 s, MLX 28.4 s, tuned llama-server 36.2 s, Unsloth 37.0 s. Same agent, new task: GGUF 6.5 s, MLX about 22 s every time, llama-server 9.0 s, Unsloth 26.6 s. Continue: 0.8 to 15.5 s depending on backend. Decode (prose / tool calls): GGUF 11 / about 25 tok/s; MLX 24 / about 28; llama-server 15.5 / 15.5; Unsloth about 14.
- The doc's conclusion: prefill bandwidth, not caching, governs latency for a new agent shape (about 6.3k tokens at 210 to 235 tok/s, roughly 30 s, on every backend); levers in order are fewer distinct agent shapes per session, smaller agent prompts, output discipline, and only then the backend.
- Rig mechanics: a backends file read once at router start maps `local/<name>` (or `local/<name>/<model>`) to a backend; a rig tool brings backends up and down, sets the default and restarts the router; the router ledger gains `backend`, `model_out`, `n_tools`, `input_tokens`, `cache_read_input_tokens`, `ttfb_s`, `wall_s`, `effort_out`, `stripped_reminders`, `folded_system` columns.
- Two things every non-Ollama backend needs (found 2026-09-04): a chat template (Ollama GGUF blobs carry none), and folding of non-leading `role: system` messages (llama-server with Qwen's template rejects them; Claude Code retries in a loop).
- Not adopted, on the radar: three small-team MLX servers. The sweep cites an llama.cpp issue (dated 2026-05-27) reporting multi-token prediction as a net loss on Metal, and flags a widely indexed caching tutorial as AI-generated with non-existent flags.
- Decisions queued: D1 decided 2026-09-05 (GGUF runner stays); D2 (whether Ollama's MTP GGUF tag beats plain q8 on Metal) never A/B'd; D3 to D5 are owner housekeeping about a shared chat server and declarations.
- Cadence: re-run the honest script after an Ollama release (continuous batching PR is the one to watch), a llama.cpp hybrid-checkpoint change, a Qwen 3.8 MoE or Dynamic-quant drop, or a Claude Code release that changes the subagent prompt shape.

## Limits
- The doc says plainly that earlier sections (3.2 to 3.4) were superseded by 3.6d; one leg of the first honest rerun (tuned llama-server) failed on a shell bug and was re-run later. An accidental run measured the default backend while labelled Unsloth (section 3.5) and is kept as a second sample.
- n is one or a few runs per cell, on one Apple-silicon machine, one model, one orchestrator choice; one tuned-llama-server cell (the 82.7 s turn) was a rambling bare probe prompt.
- Third-party claims in the sweep (benchmarks by community authors, a blog post, issue threads) are cited by the doc, not checked here.

## Used in
- research/synthesis/tools-agents.md

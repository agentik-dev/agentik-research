---
repo: agentik-dev/agentik-agents
path: design/01-local-agent-lane.md
commit: 78ce312
title: "design/01: The local agent lane: Fable orchestrates, Qwen 3.8 27B does the legwork"
author: agentik-dev (the suite owner)
published: 2026-09-04 (the document's own build date)
accessed: 2026-10-14
kind: our-use
---

Read by section, all 14 sections: TL;DR, goal, what was researched, the constraint, options, architecture, tuning, the Unsloth variant, long-session notes, security, acceptance checks, owner steps, build plan, open decisions and the evidence table.

## What it says
- The problem: Claude Code allows one API endpoint per session, so "main thread on the seat, subagents on a local model" cannot be written in agent frontmatter (the doc cites an open Claude Code issue on per-agent provider routing, dated 2026-03-25). The split therefore happens in a loopback proxy that routes by the request body's model name.
- Three facts it says were verified live on 2026-09-04: Ollama speaks the Anthropic Messages API and maps `output_config.effort` onto Qwen's thinking level; a session whose only override is the base URL stays on the claude.ai seat if headers pass through verbatim (run T5b); subagent `model:` frontmatter accepts any string when a base URL is set.
- Claude Code facts it relies on (read from Claude Code docs on 2026-09-04, Claude Code 2.1.261): subagent model precedence (Agent-tool model parameter, then frontmatter, then the subagent-model environment variable, then the session model, from v2.1.251); the Agent tool's per-call model enum is sonnet, opus, haiku, fable; forks use the main model; `effort` frontmatter (v2.1.242 and later) is sent even for unrecognised models; gateway contract (a stream silent for 300 s is aborted; `API_TIMEOUT_MS` default 600000; forward `anthropic-beta` verbatim); a base URL alone does not replace the subscription login; Remote Control and voice dictation are disabled for a non-Anthropic base URL; the Haiku alias also drives background calls; default 20 concurrent subagents, spawn depth 3.
- Options table (section 4): A a third-party gateway app (claude-code-router v3.0.22, 2026-08-24), B the in-repo stdlib router (chosen), C out-of-process local delegates (kept as a complement), D an existing home-network LiteLLM gateway as the session endpoint. B keeps the seat, the in-session Agent tool, native effort passthrough and a tiny failure surface; D would lose the seat and risk tool fidelity in format translation; A is a GUI control plane with sqlite state and prompt-tag subagent routing.
- Router design: bind loopback only; local if the model starts with `local/`, is listed, or carries an Ollama-style colon tag (later amended so Claude ids with colons stay upstream); everything else upstream with headers relayed; per-request ledger of the prompt shape, never content.
- Launcher design: starts the router if needed, preflights, execs `claude` with the base URL set and no credential variable; overrides the built-in Explore agent with a session-scoped 3-tool local definition; deliberately sets the unnamed-subagent model to `sonnet` (decision D5, revised by measurement).
- Five local agents (explore, summarize, review, implement, test), each with `model: local/default` and an explicit effort; implement runs in a worktree.
- The tiering ladder: rung 0 local (mechanical, bounded), rung 1 sonnet (scripted reliability), rung 2 opus (resolution, review that decides), rung 3 fable (main thread, forks, orchestration). Escalation is by the acceptance check, not the model's confidence.
- Tuning table (measured on one Apple an Apple Silicon laptop with 128 GB of unified memory, Metal budget 107.5 GiB): q8_0 build 31.5 GB resident; effort pinned low or medium; prompt under 15k tokens and under about 8 tools; Ollama 0.33.2 or later (0.32.12 returned HTTP 500 on every non-bare Claude Code request); concurrency 1; `max_tokens` clamp 8192; keep-alive 30 minutes.
- Section 8 says the lane exists to spare the 5-hour seat window and that the main thread still pays for each delegation turn, so small asks should be batched. It records no measurement of window consumption.
- Section 10: seven acceptance checks, all pass on 2026-09-04, including the cache check (turn two 0.37, 0.36 and 1.95 s in three runs, 35.6 s with the reminder present); the test suites then read router 87/87, costs 50/50, arg-handling 58/58, run-path 22/22, flag-pinning 14/14, fanout 44/45 (one failure in an untouched file that predates the work).
- Section 14 evidence table (dated 2026-09-04): bench numbers (prose 11.0 tok/s, JSON 25.7, short-think 22.6, prefill 87 tok/s); T0 unpinned effort, a 4,299-token thinking spiral in 4 min 56 s, killed on turn 3; T1 at low effort 45 s; T4 HTTP 500 on 0.32.12; T6 first attempt failed because the harness launched the parent with `--tools Agent`, which also stripped Read from the subagent (it thrashed on denials for 17,954 local input tokens); Cache A and Cache B; Live C1 (the built-in Explore ran on Haiku upstream because the subagent-model variable does not reach built-ins); Live C2 (forcing it: 50 tools, 26,456 input tokens, 146 s first turn, poor answer); Live C3 (general-purpose agent: 54 tools, 31,136 input tokens, 172 s then 180 s); Live C4 (override works: 5,289 input tokens, turn two 1.95 s); E1 to E3 (bare slash commands unknown because plugin commands are namespaced; in a plain session with Bash denied, Haiku skipped the preflight and did the task itself).
- Two figures carry the repo's own correction notes: the Cache A log line was once mis-attributed to the wrong task, and the claim that the reminder was the only difference between runs A and B is contradicted by a 53-character system-prompt difference (3,682 versus 3,629 characters).
- Section 11 is an owner-steps log (an Ollama upgrade, a keep-alive setting, a sleep-policy command, a repo rename and move, a plugin install); it names private machine declarations, which the synthesis describes only generically.

## Limits
- One machine, one owner, one model family, Claude Code 2.1.261 and Ollama 0.32.12 to 0.33.2 on 2026-09-04. Tasks were small (answers such as a one-word file content); there is no quality comparison against a hosted model.
- The doc says its cache numbers are a best case: the 0.38 s figure was measured under flags the launcher does not use, and one production run re-prefilled in full on turn two with the strip active.
- The T0 spiral's 4,299 figure appears in this document and in the router docstring; a text search of the committed logs and the ledger snapshot found no line carrying it (the run predates the router's ledger), so it rests on the document's statement.
- Claims about Claude Code and Ollama behaviour are the doc's reading of docs and source on one date; they are not checked here.

## Used in
- research/synthesis/tools-agents.md

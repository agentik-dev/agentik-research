---
repo: agentik-dev/agentik-respeak
path: docs/architecture.md
commit: eb7d642
title: "respeak architecture (v1, revised against the research synthesis)"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Header claim: a "Synthesis verdict" that the design is "supported and unique": no existing system combines a governed evolving shorthand vocabulary, an always-on multi-register translator and a legibility feedback loop (docs/architecture.md, header paragraph).
- Problem (lines 13-22): long-running sessions optimize their own traffic; a swarm converges on compressed conventions that cut token cost; every token in inter-agent traffic is attention-taxed, so compression pressure is structural. The failure mode is that the human either fights the optimization (forces prose, pays the tax everywhere) or loses the loop.
- Design (lines 23-113): a diagram of two lanes. Swarm traffic runs in the machine lane under `corpus/lexicon.yaml`; the translator subagent observes terms and files proposals; narratives reach the human lane in `eli5 | bluf | technical`. The machine lane is append-mostly (propose, ratify, retire; never silently edit), has a `legibility_floor`, and a `never_compress` list modelled on the Joint Commission do-not-use list. The ratified lexicon reaches the swarm through CLAUDE.md, so conventions are adopted at emission time, not imposed by post-hoc rewriting.
- The translator is a subagent that is "deliberately non-impactful to the swarm": it reads swarm output, transcripts and the lexicon, and its only writes are narratives and lexicon proposals. It has its own context window. Table of eight entry points with cost profile: the skill, natural-language asks, the headless renderer, the Stop hook (off by default), the SessionStart hook (off by default), the PostToolUse gate, setup commands, and lexicon proposals as a side effect.
- The human lane: every narrative opens with a marker line (megaphone symbol, `respeak`, mode) so the reader knows which voice speaks. All modes pass the same gates: replacements first, banned-phrase scan second, tone-axis behaviours throughout. The gates are data in `plugin/corpus/*.yaml`.
- Influence model (lines 114-131): narrative knobs change how the human lane reads and never touch the machine lane; shorthand governance (`shorthand.*`) bounds machine-lane drift; the corpus is the editorial voice. Invariant: "the translator proposes, config disposes, the human ratifies."
- Seven resolved questions (lines 132-195). 1: milestone narrative through hooks, never cron (Stop, SubagentStop, TaskCompleted, and a `MessageDisplay` hook as a zero-context display translator). 2: lexicon injection by a CLAUDE.md `@import` of a generated digest under 200 lines, installed with consent by `/respeak:init` because a plugin cannot ship CLAUDE.md; a skill is "the wrong vehicle" since emission-time adoption needs session-start presence. 3: Vale compilation is the designed CI path (`respeak compile`). 4: ratification fidelity is a three-layer gate (static sign-quality checks with minimum edit distance 2, a fresh-decoder round trip, readback usage evidence for auto fast-track). 5: tech_level 5 shorthand is a feature only as an explicit opt-in (the `author` profile). 6: layered configuration, nearest wins. 7: session overrides above the layers, never a layer.
- "Refinements the research forced" (lines 196-218): ratification alone is not governance (cap about 150, minimum token edit distance, 90-day re-harmonization, 180-day retirement, reserved repair metawords CORRECTION, SAY-AGAIN, UNVERIFIED, in-band register marking, readback, monthly fresh-decoder audits); capture emergent codewords as proposals instead of suppressing them; three registers of access (`forbidden`, `expand-first-use`, `inline`) keyed to audience profiles.
- Re-checked at eb7d642 (`git diff 319f060 eb7d642` shows `docs/` unchanged). The problem statement is `docs/architecture.md:15-21`: long-running sessions optimize their own traffic; a swarm converges on compressed conventions that cut token cost; compression pressure is "structural, not accidental"; the failure mode is a dialect that "becomes alien to the human supervising the work", so the human either fights the optimization or loses the loop. It cites no incident. The v1 refinements (:196-204) give the reason for the governance knobs: drift happens inside governed systems too, and the most fluent agents deviate most, which the file calls ICAO's lesson.

## Limits
- It is a design document written on 2026-08-31 and revised, not a record of use. Several mechanisms it lists as resolved are marked "declared, not yet checked or built" in the README at the same commit (the cap, the edit-distance check, expiry, auto-ratification, fresh-decoder audits, `respeak compile`, the display-only hook).
- The diagram names `plugin/corpus/proposals/` as the proposal path; the translator agent and the README name `.claude/respeak/proposals/`; the plugin config names `corpus/proposals/`. Three locations; the one in code paths is the project one.
- The "supported and unique" verdict is the design agent's own judgement of its research notes, not an external review.
- The statement of the problem is argument from the linguistics and prior-art notes (see `agentik-respeak-research-survey`), not an observation of this owner's own swarm.

## Used in
- research/synthesis/tools-respeak.md
- research/synthesis/journal-two-lanes.md

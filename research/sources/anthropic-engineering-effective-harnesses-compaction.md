---
url: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
title: "Effective harnesses for long-running agents"
author: Justin Young (Anthropic), with thanks to other contributors
published: 2025-11-26
accessed: 2026-10-14
kind: reported
---

## What it says
- Context management (compaction) in the Agent SDK should in theory let an agent keep working for an arbitrarily long time, but the post says "However, compaction isn't sufficient." Even a frontier model (Opus 4.5, the only model named) in a loop across context windows fell short of a production-quality web app when given only a high-level prompt.
- Two failure patterns: the agent tries to one-shot the whole app and runs out of context mid-implementation, leaving the next session a feature half-implemented and undocumented, so the next agent must guess what happened; and it declares victory too early. Compaction does not always pass clear instructions to the next agent.
- The remedy is artifacts each session leaves for the next: an initializer session that writes an init script, a progress file (`claude-progress.txt`), an initial git commit and a JSON feature list (over 200 features in the claude.ai-clone example, all initially failing; coding agents may change only each feature's `passes` field; JSON was chosen because models are less likely to alter it improperly than Markdown).
- Each later session starts by checking the working directory, reading the git log and the progress file, reading the feature list and picking the highest-priority unfinished feature, then running the init script and a basic end-to-end test to catch bugs left by earlier sessions before new work. Coding agents commit after each change with descriptive messages, which also lets them revert bad changes.
- Framing: engineers working in shifts, each new engineer arriving with no memory of the previous shift.
- Re-opened 2026-10-14 (site sitting): confirmed against the page (see anthropic-effective-harnesses for the sections and the wording correction). Sessions are bridged by `claude-progress.txt` and the git log read at the start of each session; the page says "However, compaction isn't sufficient." and does not say the files replace or complement compaction.

## Limits
- Described as "one possible set of solutions". One setup (a web-app build), one model named, no ablation of compaction against the artifacts; open questions listed include single versus multi-agent and generalization beyond web development. The compaction in question is the Agent SDK's, not necessarily the interactive CLI's.

## Used in
- research/synthesis/field-2.md
- journal-restart
- docs/journal/posts/2026-10-05-restart-dont-compact.md

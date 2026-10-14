---
url: https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md
title: "Advanced Context Engineering for Coding Agents (ace-fca.md)"
author: HumanLayer (the body names no author; linked profiles point to Dex Horthy)
published: undated (the text refers to events of August 2025)
accessed: 2026-10-14
kind: reported
---

## What it says
- "Intentional compaction": when context fills, pause and distill the session into a structured file (the page suggests asking the agent to write what it did so far to a progress file), then continue in a fresh context window. It targets what fills context: file searches, code-flow exploration, edits, test and build logs and large tool outputs.
- Workflow: research, plan, implement, with a compacted markdown artifact at each stage. Plans name the files to edit and the verification steps; research documents map the relevant code so a fresh session can start from them. During implementation the status is written back into the plan file after each verified phase, so a new session can pick up where the last stopped.
- Rationale: models are stateless, so output quality is a function of the input context. The author ranks failures from worst: incorrect information, missing information, then noise. The aim is to hold utilization around 40 to 60%, depending on the problem.
- Human review of research and plans matters because errors there multiply downstream.

## Limits
- A practitioner write-up and talk summary, with the author's case studies and no controlled comparison. The 40 to 60% target is a rule of thumb. Compaction here is a hand-written handoff, not the built-in summarizer, so this supports a restart from a written file as a working practice, not as a measured result.

## Used in
- research/synthesis/field-2.md

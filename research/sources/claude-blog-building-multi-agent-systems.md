---
url: https://www.claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them
title: "Building multi-agent systems: When and how to use them"
author: Cara Phillips, with contributions from Paul Chen, Andy Schumeister, Brad Abrams and Theo Chu (Anthropic), as the page prints them
published: 2026-01-23
accessed: 2026-10-14
kind: documented
---

## What it says
- Token cost: the page says multi-agent implementations use "3-10x more tokens than single-agent approaches for equivalent tasks." (sections "A decision framework for multi-agent systems" and "Parallelization"). It gives no method for the range.
- Three scenarios justify the cost. Context protection: a subtask produces more than 1000 tokens of output, most of it irrelevant to the main task, with clear criteria for what to extract, such as lookup or retrieval that needs filtering. Parallelization: search and research across a large information space; the page says the main benefit is thoroughness, not speed, and the trade is more tokens and often longer total run time. Specialization: tool sets (signals are 20 or more tools, confusion across domains, performance falling as tools are added), conflicting system prompts or personas, and tasks that need deep domain context.
- Section "Context-centric decomposition": splitting by problem role (one agent for features, one for tests, one for review) is "often counterproductive" because each handoff loses context. Splitting along context boundaries is "usually effective". Good boundaries: independent research paths, components with clean interfaces, blackbox verification. Poor boundaries: sequential phases of the same work, tightly coupled components, work that needs shared state.
- The orchestrator-subagent pattern is the only pattern covered in depth, and the page recommends it as a starting point.
- Section "The verification subagent pattern": a dedicated verifier fits because checking needs little context transfer. Section "The early victory problem": the page names it the most significant failure of verifiers. The verifier runs one or two tests, sees them pass and declares success. Its mitigations are concrete criteria, comprehensive checks, negative tests, and an instruction to run the whole suite.
- Closing advice: "Start with the simplest approach that works, and add complexity only when evidence supports it." The page adds that some teams spent months on multi-agent designs before finding that better prompting of one agent matched the result.

## Limits
- Vendor guidance, no data shown for the 3-10x range or for the claims about decomposition. As of January 2026.
- One secondary summary dated this post to 22 January; the page I opened prints 23 January 2026, which this note follows.

## Used in
- research/synthesis/field-5.md

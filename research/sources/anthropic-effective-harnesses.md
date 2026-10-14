---
url: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
title: "Effective harnesses for long-running agents"
author: Justin Young (Anthropic), with thanks to other Anthropic contributors
published: 2025-11-26
accessed: 2026-10-14
kind: documented
---

## What it says
- Problem statement: long-running agents work in discrete sessions, and each new session begins with no memory of the last. The post compares this to engineers working shifts without handoff notes.
- Compaction alone fell short: with Opus 4.5 on the Claude Agent SDK in a loop, a high-level prompt did not yield a production-quality web app. The post says "However, compaction isn't sufficient."
- Two failure patterns it observed: trying to do too much at once (the agent ran out of context mid-feature and left an undocumented half-built state) and declaring victory too early (later sessions saw progress and called the project done).
- Design: an initializer session builds an init script, a progress file, a feature list (more than 200 items in the example, JSON because the model was less likely to overwrite it than Markdown) and a first git commit. Every later coding session reads the progress file and git log, picks one unfinished feature, runs the init script and a basic end-to-end test, works on that one feature, then commits and updates the notes.
- Testing note: the agent often marked features done after unit tests or curl checks; browser automation raised accuracy, with limits (it could not see browser-native alert modals).
- Open questions the post lists: whether one general agent beats specialised testing or cleanup agents, and whether the lessons carry beyond web development.

## Limits
- A demonstration on one task type (a claude.ai clone), with no quantified comparison between fresh sessions and continued sessions. It supports "write state to files so a new session can pick up" and does not measure fresh versus long.
- Model names and the SDK are as of November 2025.

## Used in
- research/synthesis/field-1.md

## Also (question 3)
- Handoff documents as pointers, not preloaded context: a new coding session starts with `pwd`, reads the git log and the progress file, reads the feature list and picks the highest-priority unfinished item, then runs the init script and a basic end-to-end test. The post presents these as steps the agent performs at the start of each session.
- The feature list is JSON and only its `passes` field may be changed by coding agents; the authors chose JSON because the model was less likely to change or overwrite it than Markdown. The example list held over 200 features.
- The same pattern appears in the memory tool's multisession section (platform-docs-memory-tool).

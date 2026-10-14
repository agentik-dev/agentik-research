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
- Re-opened 2026-10-14 (site sitting): confirmed, with one wording correction. Byline Justin Young, dated Nov 26, 2025. The intro and the section "Getting up to speed" say a new session starts from the `claude-progress.txt` file and the git log, and the page's key insight is that an agent starting in a fresh context window can quickly understand the state of the work this way; section "Incremental progress" has the agent commit with descriptive messages so it can revert bad changes. The page says "However, compaction isn't sufficient." and that compaction does not always pass clear instructions to the next agent. It does not say the files replace a summary or complement compaction; that relation is an inference. Correction: the progress file is itself written by the agent as summaries of its progress, so "not a summary" is true only of a compaction summary.

## Limits
- A demonstration on one task type (a claude.ai clone), with no quantified comparison between fresh sessions and continued sessions. It supports "write state to files so a new session can pick up" and does not measure fresh versus long.
- Model names and the SDK are as of November 2025.

## Used in
- research/synthesis/field-1.md
- journal-restart

## Also (question 3)
- Handoff documents as pointers, not preloaded context: a new coding session starts with `pwd`, reads the git log and the progress file, reads the feature list and picks the highest-priority unfinished item, then runs the init script and a basic end-to-end test. The post presents these as steps the agent performs at the start of each session.
- The feature list is JSON and only its `passes` field may be changed by coding agents; the authors chose JSON because the model was less likely to change or overwrite it than Markdown. The example list held over 200 features.
- The same pattern appears in the memory tool's multisession section (platform-docs-memory-tool).

## Also (question 4)
Re-read on 2026-10-14 for pacing and budgets.
- Pacing by session boundary: each session starts with no memory, so the harness bridges sessions with files; coding agents work on one feature at a time, which the authors call critical for curbing the urge to do too much in one session. Early runs failed when an agent ran out of context mid-feature and left a half-built, undocumented state.
- Sessions end with a descriptive git commit and a progress update, and start with the git log, the progress notes and a basic end-to-end check; the authors say the init script saves tokens in each session.
- The post specifies no turn limits, token budgets, stop conditions, session counts, hours or costs, so it supports "one bounded unit of work per session" as a practice and gives no budget numbers.
- Used in (question 4): research/synthesis/field-4.md

## Also (question 6)
Re-read on 2026-10-14 for stop and resume in long unattended runs.
- The post names no explicit end condition for the whole run. A session ends when its context window runs out or the agent finishes a feature, commits and updates the progress file. Completion is tracked in the feature list, where every item starts failing and coding agents change only the `passes` field.
- Guardrail by wording: "It is unacceptable to remove or edit tests because this could lead to missing or buggy functionality." The post chose JSON for the feature list because the model was less likely to overwrite it than Markdown.
- Failure modes its table lists: declaring the whole project done too early, leaving undocumented or buggy state, marking a feature done before careful testing, and setup overhead; the fixes are a feature list, one feature at a time, a git repo with progress notes, a startup end-to-end test, and an `init.sh`.
- Not covered by the post: timeouts, cost budgets, loop limits, maximum run duration, and detection of a stalled session.
- Used in (question 6): research/synthesis/field-6.md

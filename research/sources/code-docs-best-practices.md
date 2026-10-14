---
url: https://code.claude.com/docs/en/best-practices
title: "Best practices for Claude Code"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; it names Claude Code v2.1.283 for the auto-mode default)
accessed: 2026-10-14
kind: documented
---

## What it says
- Opening section: "Most best practices are based on one constraint: Claude's context window fills up fast, and performance degrades as it fills." The page adds that Claude may "forget" earlier instructions or make more mistakes when the window is nearly full. It gives no measurement.
- Section "Course-correct early and often": after more than two corrections of the same issue in one session, the context is cluttered with failed approaches; run /clear and restart with a better prompt. The page states "A clean session with a better prompt almost always outperforms a long session with accumulated corrections." This is an assertion with no data on the page.
- Section "Manage context aggressively": /clear between unrelated tasks; auto-compaction preserves code patterns, file states and key decisions; /compact takes focus instructions; a partial "Summarize from here" exists in the rewind menu; /btw asks a side question that never enters history.
- Section "Use subagents for investigation": subagents read many files in their own windows and return summaries, keeping the main conversation clean.
- Section "Write an effective CLAUDE.md": bloated files, the page says, cause Claude to ignore the real instructions. For each line, ask whether removing it would cause mistakes; prune regularly; use skills for knowledge needed only sometimes; hooks are deterministic where CLAUDE.md is advisory.
- Section "Avoid common failure patterns" names the kitchen-sink session, correcting over and over, the over-specified CLAUDE.md (important rules get lost in noise), and the infinite exploration that fills the window.
- Counterweight, section "Develop your intuition": sometimes context should be allowed to accumulate, when you are deep in one complex problem and the history is valuable.
- Section "Run multiple Claude sessions": a fresh context improves code review because Claude is not biased toward code it just wrote.
- Section "Let Claude interview you": after writing a spec, start a fresh session to execute it, with clean context focused on implementation.

## Limits
- Vendor guidance from Anthropic, described as patterns proven across internal teams; no study, sample or effect size is given for any claim.
- Features and version numbers are volatile (as of October 2026).

## Used in
- research/synthesis/field-1.md

## Also (question 3)
- Section "Write an effective CLAUDE.md" (as of October 2026): CLAUDE.md is read at the start of every conversation, so include only what applies broadly; use skills for domain knowledge or workflows needed only sometimes. A table lists what to include (Bash commands Claude cannot guess, style rules that differ from defaults, test runners, repository etiquette, project-specific architecture decisions, environment quirks, non-obvious gotchas) and what to exclude (anything derivable from the code, standard conventions, long API documentation, frequently changing information, file-by-file descriptions).
- The test the page gives for each line: "Would removing this cause Claude to make mistakes?" If not, cut it. If Claude keeps breaking a rule despite having it, the file is probably too long and the rule is getting lost. To make Claude follow one rule, add emphasis to that line alone; emphasising many lines leaves none standing out.
- Hooks versus CLAUDE.md: instructions in CLAUDE.md are advisory, hooks are deterministic. Compaction can be steered with a CLAUDE.md line such as always preserving the list of modified files and test commands.
- The page gives no line count for CLAUDE.md; the 200-line figure is on the memory page. The original April 2025 Anthropic engineering post on best practices (the URL claude-code-best-practices under anthropic.com/engineering) now answers with a permanent redirect to this page, so I could not read the 2025 text separately.

## Also (question 5)
- Section "Run multiple Claude sessions": the page lists worktrees, cross-session messaging, the desktop app, cloud sessions, agent view and agent teams as ways to run in parallel. It says a fresh context improves code review because Claude is not biased toward code it just wrote, and gives a Writer and Reviewer pattern with two sessions (one implements, the other reviews, then the writer addresses the feedback). It also suggests one session writing tests and another writing code to pass them.
- Section "Fan out across files": `/batch` splits a change across 5 to 30 subagents, each in its own worktree; or loop over `claude -p` per file, with `--allowedTools` and `--permission-mode dontAsk` for unattended runs. The page says to test the prompt on 2 to 3 files before the full run.
- Section "Add an adversarial review step": a reviewer in a fresh subagent context sees only the diff and the criteria, not the reasoning that produced the change. A callout warns that a reviewer asked to find gaps will usually report some even when the work is sound, and that chasing every finding leads to over-engineering; tell it to flag only gaps that affect correctness or the stated requirements.
- Section "Give Claude a way to verify its work": a verification subagent or a workflow that checks its own findings has a fresh model try to refute the result, so the agent doing the work is not the one grading it.
- Limits: vendor guidance with no data on how much a fresh-context reviewer helps. Used in: research/synthesis/field-5.md

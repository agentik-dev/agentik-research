---
url: https://anthropic.com/engineering/building-c-compiler
title: "Building a C compiler with a team of parallel Claudes"
author: Nicholas Carlini (Anthropic, Safeguards team)
published: 2026-02-05
accessed: 2026-10-14
kind: reported
---

## What it says
- Setup: 16 parallel agents, nearly 2,000 Claude Code sessions over about two weeks, just under 20,000 US dollars in API fees, roughly 2 billion input tokens and 140 million output tokens. The target was a Rust C compiler able to build the Linux kernel; the post lists what the result still lacks (see the stated limits below).
- Harness: a bash loop reran Claude on a prompt file. Each agent ran in its own container, cloned a shared bare repository, and pushed back. An agent claimed a task by writing a text file into a `current_tasks/` directory; if two agents claimed one task, git sync forced the second to choose another. There was no orchestration agent and no high-level goal management. Merge conflicts were frequent and Claude resolved them.
- Tests carried the project: the author says the verifiers had to be nearly perfect or Claude would solve the wrong problem. A CI pipeline later stopped new commits from breaking old behaviour. Test output was designed for Claude's limited context (few printed lines, details in files, a fast sampled mode).
- Failure case: on the single large kernel-compilation task every agent hit the same bug, fixed it and overwrote the others' changes, so 16 agents did not help. The fix used GCC as a known-good oracle: most kernel files were compiled by GCC and a subset by the new compiler, which let agents work on different bugs in different files; delta debugging then found file pairs that failed together.
- Some agents took specialized roles: removing duplicate code, improving compiler performance, producing efficient output code, critiquing the design as a Rust developer, and documentation.
- Stated limits: no 16-bit x86 code generator (it calls GCC for that phase), no finished assembler or linker, output less efficient than GCC with optimizations off, Rust code of reasonable but not expert quality, and fixes often broke existing features. The author says the compiler "nearly reached the limits of Opus's abilities".

## Limits
- A single project with a strong oracle (tests plus GCC), written up by a researcher at the vendor; not a controlled comparison with one agent. The cost and token figures are the author's.

## Used in
- research/synthesis/field-5.md

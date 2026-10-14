---
url: https://arxiv.org/abs/2605.10039
title: "Instruction Adherence in Coding Agent Configuration Files: A Factorial Study of Four File-Structure Variables"
author: Damon McMillan (HxAI Australia)
published: 2026-05 (arXiv, submitted 11 May 2026)
accessed: 2026-10-14
kind: measured
---

## What it says
- Method (Abstract, Section 3): 1,650 Claude Code CLI sessions (16,050 function-level observations) on two TypeScript codebases, five coding tasks, Sonnet 4.6 as the main model, Opus 4.6 as a cross-check and Opus 4.7 reported descriptively under a CLI-version confound. The test is whether the agent adds a fixed one-line marker comment as the first statement of each function it writes, as one instruction in CLAUDE.md. Four variables: file size 25, 100, 250 or 500 lines; position of the instruction in a 250-line file (lines 2, 63, 128, 187, 250); one file versus added AGENTS.md versus added nested files; a contradicting instruction present or absent.
- Result (Abstract): none of the four variables, nor three two-way interactions, produced a detectable effect after multiple-testing correction. Size and conflict nulls had Bayes factors between 0.05 and 0.10 (support for the null). Compliance by size (Section 4): 60.0 percent at 25 lines, 65.2 at 100, 67.7 at 250, 64.0 at 500 (reference cell, other variables fixed).
- Baseline (Section 4.3): with no configuration file the agent produced the marker in 0 of 524 functions across 50 runs; with a file it was 67.7 percent at the reference cell. So the file works; its length, within 25 to 500 lines, did not matter for this instruction.
- Largest effect (Abstract): within a session, each extra function generated was associated with about 5.6 percent lower odds of compliance (odds ratio 0.944), non-monotonic and found during analysis, not pre-specified. Task identity mattered more than any file variable: function-level compliance ran from 45.1 percent on the lowest task to 84.4 percent on the highest.
- The authors' suggestion (Table 5): re-surface rules through hooks or agent-managed memory, and back them with linters or CI checks, rather than rely on restructuring the file.

## Limits
- One trivial, easily checked instruction; the authors say results may not transfer to harder instructions or to other phrasings of the rule. Two TypeScript codebases, Claude Code CLI 2.1.92 for the matched cells, single-turn runs with no compaction. The 250-line file is about two to three thousand tokens, short of the lengths where lost-in-the-middle effects are usually seen. A preprint; I did not check for peer review.
- Read through the PDF text; the arXiv HTML page returned 404.

## Used in
- research/synthesis/field-3.md

---
url: https://arxiv.org/abs/2303.17651
title: "Self-Refine: Iterative Refinement with Self-Feedback"
author: Aman Madaan and 15 co-authors (Carnegie Mellon University, Allen Institute for AI and others)
published: 2023-03 (v1 30 March 2023; v2 25 May 2023; this note reads the v2 text)
accessed: 2026-10-14
kind: measured
---

## What it says
Section and table names as the paper prints them.
- Method (Sections 2 and 3.1): one model writes an output, critiques it, and rewrites it, up to a maximum of 4 iterations. Three base models (GPT-3.5, ChatGPT, GPT-4) on 7 tasks, compared with the same model's single pass.
- Headline (Table 1, GPT-4): code optimization 27.3 to 36.0 percent (+8.7 points); dialogue response, a GPT-4 preference score, 25.4 to 74.6 percent; sentiment reversal 3.8 to 36.2. The abstract summarises this as about 20 percent absolute improvement on average.
- The exception is math reasoning (Table 1): GPT-3.5 64.1 to 64.1, ChatGPT 74.8 to 75.0, GPT-4 92.9 to 93.1 percent solve rate. The authors say the model cannot reliably tell whether a math answer has an error, and that ChatGPT's feedback was "everything looks good" for 94 percent of instances (Section 3.3).
- With an oracle that says whether the math answer is wrong (Table 9, Appendix), the gains are +4.8 (GPT-3.5), +1.4 (ChatGPT) and +0.7 (GPT-4) points. The main text calls the oracle gains "much bigger (5%+)", which the table's largest cell (+4.8) does not reach.
- Feedback quality (Table 2, Section 4): with ChatGPT, code optimization scored 27.5 with specific feedback, 26.0 with generic feedback and 24.8 with none; sentiment reversal scored 43.2, 31.2 and 0.
- Iterations (Section 4, Figure 4): returns diminish. Code optimization went from 22.0 at the first output to 28.8 after three iterations; constrained generation from 29.0 to 49.7. In a multi-aspect task (acronym generation) quality can rise on one aspect and fall on another, so the method keeps the best-scoring output.
- Failure analysis (Section 4, 70 hand-read samples, 35 successes and 35 failures, on code optimization and math): of the failures, 33 percent came from feedback that named the wrong error location, 61 percent from feedback that suggested an inappropriate fix, and 6 percent from a refiner that mishandled good feedback.

## Limits
- 2023 models from one vendor; English only; the authors name both limits (Section 6). Gains on preference tasks use GPT-4 as a proxy for human preference (the paper reports a correlation with human preference of 82, 68 and 71 percent on three tasks, Section 3.2), and the baseline is one pass, not an equal number of model calls. A later re-analysis (see huang-self-correct, Table 8) found that with a stronger single-pass prompt on constrained generation the self-correct run scored 75.1 against an 81.8 baseline.
- Tasks are mostly writing and optimisation. It does not test code review, test suites as the critic, or a second agent with fresh context.

## Used in
- research/synthesis/field-8.md

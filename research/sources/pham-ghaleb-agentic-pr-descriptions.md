---
url: https://arxiv.org/html/2601.17627v1
title: "Code Change Characteristics and Description Alignment: A Comparative Study of Agentic versus Human Pull Requests"
author: Dung Pham, Taher A. Ghaleb (Trent University)
published: 2026-01-24 (arXiv:2601.17627v1; slated for the Mining Software Repositories conference, April 2026)
accessed: 2026-10-14
kind: measured
---

## What it says
- The study compares 33,596 agent-generated pull requests with 6,618 human ones. Agents write stronger commit-level messages but trail humans at pull-request-level summarization.
- Alignment results (medians, agent against human): commit-level semantic similarity 0.72 against 0.68; a language-model quality score 4 out of 10 against 2 out of 10; pull-request-to-commit similarity 0.86 against 0.88 (all p below 0.001, with small effect sizes).
- The authors' reading: agents describe individual commits better, humans summarize the whole pull request better; both fall short of the benchmark references.
- Predicting a "good" agent description (pull-request-to-commit similarity of 0.9 or more, roughly the top quarter): the best model, a random forest, reached accuracy 86.22 percent but recall 31.9 percent. Average commit message length was the top predictor, then title length and body length; the associated thresholds were commit messages of about 13 or more words, titles of about 7 or more words and bodies of about 80 or more words.

## Limits
- Quality is measured by embedding similarity and a model-assigned score, not by whether a reviewer understood or acted on the description. English-filtered samples of 647 agent and 571 human pull requests were used for the alignment tests.
- The page does not break results out by agent product, so it says nothing specific about Claude Code.

## Used in
- none yet. Read for question 9 but not cited in research/synthesis/field-9.md (size cap); a lead for the page draft.

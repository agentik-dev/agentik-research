---
url: https://arxiv.org/abs/2111.09525
title: "SummaC: Re-Visiting NLI-based Models for Inconsistency Detection in Summarization"
author: Philippe Laban, Tobias Schnabel, Paul N. Bennett, Marti A. Hearst
published: 2021-11-18
accessed: 2026-10-14
kind: measured
---

## What it says
- Earlier work found natural-language-inference models poor at detecting summary inconsistencies; the authors attribute that to a mismatch between sentence-level training and document-level detection.
- Their SummaCConv method splits documents into sentence units and aggregates inference scores across sentence pairs. On the SummaC benchmark (six inconsistency-detection datasets) it reaches a balanced accuracy of 74.4 percent, about 5 percentage points above prior work.

## Limits
- Abstract page only. A detector at 74.4 percent balanced accuracy still misjudges about one summary in four, so it is a triage signal, not a gate. That inference is ours.
- 2021 benchmark; not agent reports.

## Used in
- research/synthesis/field-9.md

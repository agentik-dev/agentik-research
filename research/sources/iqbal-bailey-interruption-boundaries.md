---
url: https://www.interruptions.net/literature/Iqbal-CHI06-p741-iqbal.pdf
title: "Leveraging Characteristics of Task Structure to Predict the Cost of Interruption"
author: Shamsi T. Iqbal and Brian P. Bailey (University of Illinois)
published: 2006-04 (CHI 2006, Montreal, 22-27 April 2006, pages 741-750)
accessed: 2026-10-14
kind: measured
---

## What it says
Section names as the paper prints them; I read the PDF text.
- Re-opened 2026-10-14. The fetch tool returned unreadable binary; I extracted the saved PDF's text locally and checked each line below against it. Two corrections to the earlier note are marked "corrected".
- Related Work, under "Empirical Cost of Interruption" (corrected: this passage is in Related Work, not the Introduction), citing earlier studies: interrupting at random moments can cause users to take up to 30 percent longer to resume, commit up to twice the errors and feel up to twice the negative affect, compared with interrupting at subtask boundaries. The Introduction adds that interrupting at boundaries with lower mental workload costs meaningfully less than at boundaries with higher workload, and that telling such boundaries apart had needed a physiological measure.
- Its own experiment 1: 12 users (7 female, aged 23 to 33) did desktop tasks (video editing, route planning, document editing) and were interrupted at chosen subtask boundaries by a peripheral task; 360 resumption-lag values were collected (337 after removing about 6 percent as outliers or errors). A cluster analysis put them into three cost classes of 75 low, 177 medium and 85 high values, with the paper noting that a system may only be able to separate three classes.
- A model built on task structure (the level of the boundary, mental carry-over, difficulty of the next subtask) classified cost correctly in 63.2 percent of cases in 10-fold cross-validation on the experiment 1 data. In that data the error of calling a high-cost boundary low-cost was 4.7 percent.
- Experiment 2 (corrected: the earlier note put the 4.7 percent beside experiment 2): 12 other users (2 female, aged 21 to 26) with different tasks. The model predicted 53 percent of cost classes correctly, and the high-called-low error rose to 20.8 percent.

## Limits
- The 30 percent and twice-the-errors figures are the authors' summary of prior work, not their own result. Tasks are desktop tasks done by 12 young adults in each experiment, not software work, and the interruptions were small peripheral tasks. The resumption-lag values are log-transformed in the paper, so they give no plain seconds figure. The paper measures when to interrupt, not whether several questions asked together cost less than the same questions asked one at a time.

## Used in
- research/synthesis/field-8.md
- research/synthesis/journal-wake.md (planned)

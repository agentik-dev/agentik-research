---
url: https://arxiv.org/abs/2402.06782
title: "Debating with More Persuasive LLMs Leads to More Truthful Answers"
author: Akbir Khan, John Hughes, Dan Valentine, Laura Ruis, Kshitij Sachan, Ansh Radhakrishnan, Edward Grefenstette, Samuel R. Bowman, Tim Rocktaschel, Ethan Perez
published: 2024-02 (v1 9 February 2024; v4 25 July 2024; ICML 2024)
accessed: 2026-10-14
kind: measured
---

## What it says
Read from the abstract page only.
- Setup: two stronger "expert" models, which can see the source information, each argue for a different answer; a weaker "non-expert" model or a human, who cannot see it, picks the winner.
- Result: the judges reached 76 percent (non-expert models) and 88 percent (humans) accuracy with debate, against 48 and 60 percent for naive baselines (the abstract's wording).
- Training the debaters to be more persuasive, without ground-truth labels, improved the judge's ability to find the truth.

## Limits
- The abstract does not name the task (the search listing names a reading-comprehension set; I did not open the paper). The result is for a judge who lacks information that the debaters have, not for a peer reviewer who can run the code. It is the strongest published case for adversarial setups in this note set, and it does not address whether a debate ends.

## Used in
- Read for question 8 and not cited in research/synthesis/field-8.md, which is at its size limit; available for the page drafts.

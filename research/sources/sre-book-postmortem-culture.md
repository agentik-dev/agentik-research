---
url: https://sre.google/sre-book/postmortem-culture/
title: "Postmortem Culture: Learning from Failure (Site Reliability Engineering, chapter 15)"
author: John Lunney, Sue Lueder (edited by Gary O'Connor), Google
published: 2017 (book copyright 2017, O'Reilly Media)
accessed: 2026-10-14
kind: documented
---

## What it says
- A postmortem records an incident, its impact, the mitigation steps, root causes and follow-up actions; the chapter treats it as a learning tool: "Writing a postmortem is not punishment—it is a learning opportunity for the entire company."
- Postmortems are blameless: they name contributing causes without blaming people or teams, on the assumption that everyone acted in good faith with what they knew.
- Drafts are reviewed first by senior engineers for completeness, then shared as widely as is useful. An unreviewed postmortem is treated as having no value. The chapter lists review criteria: key incident data captured, impact complete, root cause analysed deeply enough, action plan appropriate, stakeholders informed.
- The in-house template was recently extended with metadata fields to support comprehension and automated analysis, and a working group automates parts of postmortem creation from incident-tool data.

## Limits
- A description of one company's practice. The chapter does not discuss separating a human-readable narrative from machine-oriented records as a principle; the metadata fields are the nearest it comes, so it is a weak precedent for two lanes.
- It reports no measurement of whether the practice improves reliability.

## Used in
- none yet. Read for question 9 but not cited in research/synthesis/field-9.md (size cap); a lead for the page draft.

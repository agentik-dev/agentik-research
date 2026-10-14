---
url: https://www.cybedefend.com/en/blog/does-claude-code-follow-claude-md
title: "Your CLAUDE.md Works on the Rules You Did Not Need (also headed: Does Claude Code Follow CLAUDE.md? We Graded 90 Runs)"
author: Julien Zammit (CybeDefend)
published: 2026-09-13 (page modified 2026-09-21; the study is dated 2026-08-24)
accessed: 2026-10-14
kind: reported
---

## What it says
- Method: 30 developer tickets run through three autonomous agents on one Express and SQLite codebase (90 runs), Claude Opus 5 at high effort. Variable: how the agent could learn 49 business and compliance rules. Arms: no rules file; a realistic hand-written CLAUDE.md section of 41 lines covering about half the rules; rules delivered at the moment of each edit. Three model auditors graded the diffs blind.
- Results: rule specifics implemented exactly were 7 of 55 (13 percent) with the CLAUDE.md and 7 of 55 with no file, against 87 percent when delivered at the edit. On 13 rules whose exact value was in the CLAUDE.md the agent got them exactly right 4 times; delivered at the edit, 13 of 13 times. A second phase with a complete 49-rule CLAUDE.md gave 7 of 11 rules exact (64 percent) against 11 of 11 at the edit, at about the same cost.
- The post cites the McMillan study (mcmillan-config-file-adherence) and concludes that length does not decide whether a rule is followed.

## Limits
- The authors sell a product that delivers rules at the edit, which they acknowledge as a bias. One run per arm per task, one codebase, one model, about 25 rule-bearing tasks, no published significance tests, model auditors, no human replication. The rules were business and compliance rules, not style conventions. Figures attributed on the page to a well-known engineer could not be traced to a primary source by the author.

## Used in
- research/synthesis/field-3.md

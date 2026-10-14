---
url: https://www.anthropic.com/engineering/claude-code-auto-mode
title: "How we built Claude Code auto mode: a safer way to skip permissions"
author: Anthropic (Engineering at Anthropic; the acknowledgements name John Hughes)
published: 2026-03-25
accessed: 2026-10-14
kind: measured
---

Opened with WebFetch; the figures below are the fetch tool's extraction of the post's results table and text.

## What it says
- Design: a server-side prompt-injection probe scans tool outputs before they reach the agent and adds a warning if it sees a likely hijack. A transcript classifier, running on Sonnet 4.6 at the time of the post, reviews each action before it runs. Stage 1 is a fast yes/no filter tuned to err toward blocking; stage 2 uses chain-of-thought and runs only on actions stage 1 flags. The classifier sees user messages and tool calls only; assistant text and tool outputs are stripped.
- Denials go back to the agent as tool results so it can try another route. Three consecutive or 20 total denials escalate to the human, or end the process in headless mode.
- Measured results (false positive rate FPR, false negative rate FNR): on 10,000 real internal tool calls, stage 1 FPR 8.5% and the full pipeline FPR 0.4%. On 52 real "overeager" actions, stage 1 FNR 6.6% and the full pipeline FNR 17%. On 1,000 synthetic exfiltration attempts, stage 1 FNR 1.8% and the full pipeline FNR 5.7%.
- The post also reports that Claude Code users approve 93% of manual permission prompts.
- Threat model: overeager behaviour, honest mistakes about blast radius, prompt injection, and a misaligned model (which the authors say they do not currently see in practice). Incidents named: deleting remote git branches after a misread instruction, uploading an engineer's GitHub token to an internal compute cluster, and attempting migrations against a production database.
- Stated limits: the 17% miss rate on overeager actions is the authors' "honest number"; in most misses the classifier found the dangerous operation but treated approval-like evidence as consent for its whole blast radius. Stripping context means it cannot verify where an identifier came from. Auto mode is not a drop-in replacement for careful human review on high-stakes infrastructure; it is meant for people who would otherwise skip permissions. The authors say any list of dangerous permission rules will be incomplete.

## Limits
- Vendor-run measurement on private datasets (the 52 real actions are a small set); the method is described in the post but the data is not public. Model and thresholds have changed since March 2026 (the permission-modes page now names Sonnet 5 as the default classifier model).

## Used in
- research/synthesis/field-7.md

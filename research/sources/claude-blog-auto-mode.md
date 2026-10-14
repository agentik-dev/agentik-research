---
url: https://claude.com/blog/auto-mode
title: "Auto mode for Claude Code"
author: Anthropic (no author named on the page)
published: 2026-03-24 (the page carries an update that auto mode became generally available on 10 July 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Auto mode is a permissions mode in which a classifier reviews each tool call and blocks risky ones such as mass file deletion, sensitive-data exfiltration or malicious code execution; blocked actions push Claude toward another approach, and repeated attempts raise a permission prompt. It sits between the default mode and `--dangerously-skip-permissions`.
- The post gives no numbers. It says auto mode reduces risk but does not eliminate it, that the classifier may allow some risky actions when intent is ambiguous or context is missing, that it may sometimes block benign actions, and that it may add token use, cost and latency. At launch it was a research preview on the Team plan.
- Anthropic says it continues to recommend using it in isolated environments.

## Limits
- A product announcement; no method or measurement (the measured figures are in anthropic-engineering-auto-mode).

## Used in
- research/synthesis/field-7.md

---
url: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
title: "Equipping agents for the real world with Agent Skills"
author: Barry Zhang, Keith Lazuka, Mahesh Murag (Anthropic)
published: 2025-10-16 (the page also records an update on 2025-12-18, when Agent Skills was published as an open standard)
accessed: 2026-10-14
kind: documented
---

## What it says
- Progressive disclosure is named as the core design principle of Agent Skills. Context loads in three levels: level one is each skill's name and description; level two is the full `SKILL.md`, loaded if Claude judges the skill relevant; level three is further bundled files that Claude opens only when needed.
- At startup only the name and description of each installed skill are preloaded into the system prompt. The post calls the context bundled into a skill "effectively unbounded", because the agent loads only what it needs.
- Authoring advice: start from evaluation (run agents on representative tasks, find where they struggle, build skills to close those gaps); split an unwieldy `SKILL.md` into referenced files; say whether a script should be run or read; watch real use and refine the name and description, since Claude relies on them to decide whether to trigger the skill.
- Security: a malicious skill can introduce vulnerabilities or direct Claude to exfiltrate data; install skills only from trusted sources and audit bundled files.
- The post gives no size or token figures.

## Limits
- An engineering post with no measurement. Written in October 2025; Claude Code's current loading rules and limits are in code-docs-skills.

## Used in
- research/synthesis/field-3.md

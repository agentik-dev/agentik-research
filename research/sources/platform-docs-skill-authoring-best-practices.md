---
url: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
title: "Skill authoring best practices"
author: Anthropic (Claude Platform documentation)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Section "Concise is key": the context window is "a public good" shared by the system prompt, conversation history, other skills' metadata and the request. At startup only metadata loads, but once `SKILL.md` loads "every token competes" with the rest. Default assumption: Claude is already very smart, so add only context it lacks.
- Section "Progressive disclosure patterns": "Keep SKILL.md body under 500 lines for optimal performance"; split into separate files when approaching the limit. The same figure repeats in "Token budgets" and in the checklist.
- Keep references one level deep from `SKILL.md`; for reference files over 100 lines, put a table of contents at the top. Reason given: Claude may preview nested files with `head -100` and read them only partly.
- Description: third person, says what the skill does and when to use it, at most 1,024 characters; Claude chooses among "potentially 100+" skills by description.
- Section "Build evaluations first": create evaluations before writing extensive documentation; the checklist asks for at least three evaluations and testing with Haiku, Sonnet and Opus.
- Avoid time-sensitive wording in a skill; put legacy material in an "old patterns" section.

## Limits
- Authoring advice from the vendor; the 500-line figure is stated without a study. Volatile; as of October 2026.

## Used in
- research/synthesis/field-3.md

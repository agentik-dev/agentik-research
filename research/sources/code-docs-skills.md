---
url: https://code.claude.com/docs/en/skills
title: "Extend Claude with skills"
author: Anthropic (Claude Code documentation)
published: undated (read October 2026; the page names Claude Code versions up to v2.1.295)
accessed: 2026-10-14
kind: documented
---

## What it says
- Loading rule (opening sections): "In a regular session, skill descriptions are loaded into context so Claude knows what's available, but full skill content only loads when invoked." The listing always contains every skill name.
- Section "Skill descriptions are cut short": when many skills exist, Claude Code drops some descriptions to fit the listing's character budget. The budget scales at 1 percent of the model's context window. On overflow, descriptions are dropped starting with the skills invoked least. The budget can be raised with the `skillListingBudgetFraction` setting (example in the page: 0.02, which is 2 percent) or the `SLASH_COMMAND_TOOL_CHAR_BUDGET` environment variable (a fixed character count); low-priority skills can be set to "name-only" in `skillOverrides`.
- Per-entry cap: the `description` and `when_to_use` text of one skill are combined and truncated at 1,536 characters in the listing, whatever the budget; the cap is configurable with `skillListingMaxDescChars`. The page advises putting the key use case first.
- Section "Find unused skills": every skill in the listing adds to context on every turn, whether or not Claude uses it. `/skill-doctor` (Claude Code v2.1.252 or later) reports each skill's cost and use. `/doctor` estimates the listing's context cost.
- Section "Control who invokes a skill": `disable-model-invocation: true` removes the skill's description from context, so the skill costs nothing until the user invokes it by name; `user-invocable: false` keeps the description in context but hides the skill from the `/` menu.
- Section "Skill content lifecycle": the rendered `SKILL.md` enters the conversation as one message and stays there for later turns; Claude Code does not re-read the file on later turns. Re-invoking identical content adds a short "already loaded" note.
- Section "Add supporting files": "Keep `SKILL.md` under 500 lines." Move reference material to separate files, reference them from `SKILL.md` so Claude knows what each holds and when to load it; scripts are executed, not loaded.
- After auto-compaction, Claude Code re-attaches the most recent invocation of each skill, keeping the first 5,000 tokens of each, within a combined budget of 25,000 tokens, filled from the most recently invoked skill; older skills can be dropped entirely.
- Troubleshooting "Claude stops following a skill": a rule that must hold every time belongs in a hook; after compaction, invoke the skill again, and put the most important instructions near the top of `SKILL.md` because truncation keeps the start.

## Limits
- Vendor documentation, no measurement. The page gives no figure for how often Claude picks the right skill from the listing; a vendor eval on that is in vercel-agents-md-outperforms-skills.
- Read in two passes (characters 0 to 100,000 and 100,000 to the end of 107,161); the numbers above were checked in both. All settings and thresholds are volatile; they are as of October 2026.

## Used in
- research/synthesis/field-3.md

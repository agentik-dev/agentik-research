---
repo: agentik-dev/agentik-decisions
path: plugin/
commit: 80d59eb
title: "plugin/ (the decisions and ask skills, six commands, the manifest)"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
Opened: `plugin/skills/decisions/SKILL.md`, `plugin/skills/ask/SKILL.md`, all six files in `plugin/commands/`, `plugin/.claude-plugin/plugin.json`. Not opened: `plugin/respeak-include.md` (its text arrives as a system context copy of the same name, and says: two lanes, a machine lane in full and a human lane for a peer engineer, conclusion first).
- Manifest: name `decisions`, version 0.8.0, keywords include "adr", "ledger" and "governance"; the description says a repo owns its ledger and the plugin carries no data.
- The `decisions` skill (SKILL.md sections 1 to 5): states the ledger shape and caps; says the `Every session` entries arrive in the CLAUDE.md block with one line for each other entry; says to read by entry or by area and "never read the ledger whole"; says a packet or sub-agent brief carries a `Decisions:` line and the pasted `agentik decisions show` output, never a paraphrase, since "a paraphrase is new, undecided text" (paraphrase of section 3); says only the owner's answer moves an entry in or out of force and an agent edits an entry in force only by `answer --amends`; says to ask the owner once per session in one batch; says to settle a reversible choice inside the design and log it in one sentence under `## Decided without asking`; says to run `agentik decisions backlog` before S4 work.
- The `ask` skill: ask once per session in one batch, when the sitting blocks on the owner or at close; pass each AskUserQuestion call as it stands, in one turn, never reworded; enter each answer with `answer`; an `afkTimeoutMs` result is no answer and the question is not asked again that session; a sitting without AskUserQuestion (a relay child) runs `ask` for the render alone and the owner answers on the `Your answer:` line.
- Commands `show`, `find`, `new`, `answer`, `render`, `backlog` each run the CLI and relay its output verbatim; `ask` is a skill only.
- The skill's frontmatter limits tools to `Bash(decisions *)` (and AskUserQuestion for `ask`).
- No hook ships: the earlier `rule` hook was dropped in 0.3.0.

## Limits
- Manners are prose; nothing in the plugin enforces "only the owner moves an entry into force". The earlier design's reviews found a verb-level version of that rule bypassable by a direct file edit.
- Behaviour of AskUserQuestion, skill and command names, and plugin installation is the repo's claim.

## Used in
- research/synthesis/tools-decisions.md
- docs/tools/decisions.md

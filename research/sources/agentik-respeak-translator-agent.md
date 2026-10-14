---
repo: agentik-dev/agentik-respeak
path: plugin/agents/respeak.md
commit: 319f060
title: "respeak translator subagent (agent definition)"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Front matter: `name: respeak`, `model: sonnet`, `tools: Read, Grep, Glob, Write`. It is a read-mostly subagent: "non-impactful" to the swarm, it never modifies swarm files, plans or state; its only writes are rendered narratives (where the caller asks for a file) and lexicon proposals.
- Configuration (lines 20-60): if the prompt carries a `Resolved respeak configuration` block, that block is the configuration, used verbatim. Otherwise the agent, which has no Bash tool, approximates the layer stack from files it can read and must end its output with the line `config: approximated from files (no resolved block)`. It never takes `gate.enabled`, `gate.include`, `gate.exclude` or `shorthand.*` from a user or folder file. Corpus files are not layered: project override first, then plugin defaults.
- Input gate (lines 61-86): before extracting claims it scans the source for project-banned terms and other error-severity entries, and never carries one into its output because the source used it, even if the caller asks. It rewrites around the term, using the entry's `fix:` field when present, and reports the count in a `gate:` line. Literal domain uses of a banned metaphor word are not violations (the example is a networking "spine"), handled by per-entry `exceptions:` regexes.
- Before rendering (lines 87-104): reads mode, tone axes, `tech_level`, budgets and the profile fields `narrative.profile`, `lexicon_access`, `address`, `reading_level_grade`; reads the lexicon. `lexicon_access` decides how shorthand appears: `forbidden` (always the expansion), `expand-first-use`, or `inline` (the `author` profile at tech level 5, "the one place the two lanes may converge").
- Rendering procedure (lines 105-124), six steps: extract the claim structure first (outcome, evidence, numbers, open questions, what the reader must decide); lead with the outcome; write to the mode's parameters; apply the gates (replacements, then the banned-phrase scan; an `error` entry appears only inside a verbatim quote); state uncertainty once and precisely; numbers keep units and sources and anything in `never_compress` passes verbatim.
- Rendering data (lines 125-140): at or above `table_over_prose_threshold` (4) homogeneous items render a table, never prose or a long bullet run; the decision column first; summary before detail; a decision-relevant outlier named in one sentence above the table; `eli5` states the one comparison and uses no tables.
- Editorial passes (lines 141-196): twelve rules. 1: run the buried-lede test first. 2-3: under `restructure: advise` append a structure advisory and move nothing; under `apply` reorder or add a lead abstract and list moved headings. 5: never add, delete or "correct" a factual claim; report it. 6: rewrap so no line starts with `#` or `>`. 7: prose-to-list and list-to-prose count as restructure. 8-9: template layout is advisory only; a UI label gets the minimal compliant edit, never a rename. 10: a generator edit changes string-literal content only. 11: third-party text is never reworded. 12: a banned term inside a heading needs `restructure: apply`.
- Mode contracts (lines 197-209): `eli5` one idea per sentence, no headers or bullets, one analogy that is repaid; `bluf` sentence one is the result, decision or ask, then impact, then facts, then the decision needed with options and a recommendation; `technical` conclusion first, then evidence with file:line and commands, then open questions.
- Lexicon duties (lines 210-226): the agent tallies unratified shorthand it saw, writes a proposal file `.claude/respeak/proposals/<term>.yaml` with `status: proposed` and a legibility estimate, never ratifies, never proposes below `legibility_floor`, and prefers "the variant closest to plain English".
- Output contract: begin with a marker line (megaphone symbol, `respeak`, mode, and the profile when one applied), return only the narrative, plus optional `lexicon:` and `gate:` lines. "You are judged on whether the reader understood on the first pass."

## Limits
- It is a prompt. The behaviours above are instructions to a model; the repo enforces them only through the scanner and the verifier that run after (see `agentik-respeak-skills`, `agentik-respeak-scripts-verify-edit`).
- The agent's own text says editorial rules 5 to 12 were added after a field run showed the contract did not forbid those behaviours (CHANGELOG 0.6.0).

## Used in
- research/synthesis/tools-respeak.md

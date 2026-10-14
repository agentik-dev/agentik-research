---
repo: agentik-dev/agentik-respeak
path: README.md
commit: 319f060
title: "respeak (the repository README)"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
- respeak is a Claude Code plugin for two-lane communication in agent swarms. Agents write to each other in shorthand that a lexicon ratifies. Every person reads a narrative written for them (README.md:1-8).
- "Why it exists" (README.md:9-26): the owner runs several Claude Code plugins in unattended runs where one session hands its work to the next. Agents that write to each other spend context on every token, so the pressure to compress is structural. They drift into shorthand and the person supervising becomes the outsider. The section cites a two-person picture-naming result: about forty words in round one, about two ("the skater") six rounds later. It says forcing prose on agents pays an attention cost on every message, and that letting the dialect drift gives up auditing your own automation.
- The machine lane (README.md:27-54): agents may use only shorthand ratified in a lexicon file, and write everything else in full. Nothing intercepts traffic; every session loads a digest of the lexicon through a CLAUDE.md import. A `never_compress` block keeps error messages, security findings, user quotes and numbers with units verbatim.
- The human lane: a translator subagent renders work in one of three modes, `eli5`, `bluf` or `technical`, each with a one-line contract (table at README.md:39). All modes pass the same style gates: 234 banned phrases in 22 categories, each with a severity, and 60 replacement rules (README.md:45).
- The loop: while translating, the agent files proposals for unratified shorthand it had to decode, preferring the variant closest to plain English. A human ratifies.
- "Does it work?" (README.md:55-71): one field test on 2026-08-31, n=1, a technical-mode editorial pass over a 4,000-word internal design document. Error-severity banned phrases 3 to 0; warn-severity 9 to 1 (one documented keep); em-dashes per 1,000 words 19.9 to 3.1; average sentence 32.1 to 24.5 words; headings, links, code and numbers changed: zero, with `respeak-verify-edit.py` passing. The README says to treat the numbers as sizing evidence, not a benchmark.
- Install prerequisites (README.md:72+): Claude Code 2.1.196 or newer, bash 3.2 or newer, python3 3.9 or newer with PyYAML. The translator runs as a Sonnet subagent in its own context window.
- Enforcement (README.md:176-206): the gate is a PostToolUse hook on Write and Edit, blocks with exit code 2, is opt-in per project, and with `gate.block_on: introduced` blocks only on hits the write added. The CI form is `respeak-check.sh`, with `--verify <ref>` to prove each edit meaning-invariant.
- Ten configuration layers, nearest to the target wins (table at README.md:211). Seventeen test files, each pinned to a surface (table at README.md:249). `make check` runs under a bounded runner: one run per tree, an 840 s wall, held off above load 4 x cores.
- "What can go wrong" (README.md:293-302): the risk register ranks translator error high, "a confident wrong BLUF is worse than shorthand". The gate is opt-in, so a project that never enables it gets no enforcement. A proposal is only a proposal until a human ratifies it.
- Status (README.md:303-331): version 0.8.0, rendered 2026-10-13, 272 unittest cases and 10 bash suites. "Declared, not yet checked or built": a 150-term lexicon cap, an edit-distance check between near-neighbour terms (minimum 2), usage-based expiry (180 days unused), an auto-ratification gate (5 clean uses), fresh-decoder legibility audits (30-day cadence), `respeak compile` (the corpus as a Vale style package), and a display-only translation hook.
- License section: MIT; the AI-writing-tell catalog condenses Wikipedia's "Signs of AI writing" (CC BY-SA 4.0); some banned-phrase categories were informed by the antislop-sampler project (Apache-2.0), with no code or text included.

## Limits
- The README is rendered by respeak's own translator from `design/readme/source.md`, so it is the tool describing itself. The owner wrote the claims; the file cites no outside measurement of the tool.
- The field-test numbers are one document, one run. The CHANGELOG (0.5.1) says the field-test source documents were removed from the repo, so the table cannot be re-run from this repo. The sentence-length row predates the 0.6.0 sentence splitter, and CHANGELOG.md:320-322 calls figures from before 0.6.0 stale.
- The install lines still name the plugin marketplace by the tool's earlier name (README.md Install section). The note does not repeat it.
- Counts of banned phrases, replacements and tests were re-counted from the files in this survey and match the README (see `agentik-respeak-corpus`, `agentik-respeak-tests`).

## Used in
- research/synthesis/tools-respeak.md

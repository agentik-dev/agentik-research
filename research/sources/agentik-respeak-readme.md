---
repo: agentik-dev/agentik-respeak
path: README.md
commit: eb7d642
title: "respeak (the repository README)"
author: agentik-dev
published: 2026-10-13
accessed: 2026-10-14
kind: our-use
---

## What it says
Line numbers are at eb7d642. The earlier survey of this file was at 319f060; the README changed between the two commits in the install and status text, and every line number below was re-read at eb7d642.
- respeak is a Claude Code plugin for two-lane communication in agent swarms. Agents write to each other in governed shorthand, and every person gets a narrative written for them (README.md:5-7).
- "Why it exists" (README.md:9-25). The owner runs several Claude Code plugins in unattended relay runs, where one session hands its work to the next. Agents that write to each other spend context on every token, so the pressure to compress is structural (11-14). The drift claim is one sentence: "They drift into shorthand, and the person supervising the run becomes the outsider." (14-15). The README gives no incident, count or transcript for that claim.
- The human example (README.md:17-21). Two people describing the same abstract picture start at about forty words and finish, six rounds later, at two ("the skater"). Outsiders cannot read the evolved signs, because the meaning lives in the pair's shared history. Forcing prose on agents pays the attention cost on every message; letting the dialect drift gives up auditing your own automation. The section cites no source inline; `docs/references.md:7-8` names Clark and Wilkes-Gibbs (see `agentik-respeak-references`).
- The machine lane (README.md:29-35). Agents may use shorthand ratified in a lexicon file and write everything else in full. Nothing intercepts traffic; every session loads a digest of the lexicon through a CLAUDE.md import. Entries are proposed, ratified or retired, never silently edited, "as in aviation phraseology and Q codes" (paraphrase of 32-33). A `never_compress` block keeps error messages, security findings, user quotes and numbers with units verbatim.
- The human lane and the three modes (README.md:36-43). A translator subagent renders work as `eli5` (one idea per sentence, at most one analogy, and the next sentence says the real thing), `bluf` (sentence one is the result, decision or ask, with owner and deadline; a manager can forward it unedited) or `technical` (conclusion first, then evidence as `file:line`, then open questions).
- The style gate's data (README.md:45-49). Every mode passes the same gates: 234 banned phrases across 22 categories, each with a severity, and 60 replacement rules. Sentence and paragraph budgets come from Simplified Technical English and plain-language standards. A config field with no observable behavior is deleted.
- The loop (README.md:51-53). While translating, the agent files proposals for unratified shorthand it had to decode, preferring the variant closest to plain English. A human ratifies.
- "Does it work?" (README.md:55-70). "One field test (2026-08-31, n=1)": a technical-mode editorial pass over a 4,000-word internal design document, with the instruction to treat the numbers "as sizing evidence, not a benchmark" (57-59). The table (61-67): banned phrases at error severity 3 to 0; at warn severity 9 to 1 (a deliberate, documented keep); em-dashes per 1,000 words 19.9 to 3.1; average sentence length 32.1 to 24.5 words; headings, links, code and numbers changed: zero, with `respeak-verify-edit.py` passing. The one kept phrase, "a genuine platform gap", stayed because the corpus bans `genuinely`, not `genuine` (69-70).
- Enforcement (README.md:174-203). The gate is a PostToolUse hook on Write and Edit that blocks with exit code 2 and is opt-in per project; `gate.block_on: introduced` blocks only on hits the write added. CI form: `respeak-check.sh`, with `--verify <ref>` to prove each edit meaning-invariant.
- "What can go wrong" (README.md:291-299). The risk register ranks translator error high: a confident wrong BLUF is worse than shorthand. The gate is opt-in, so a project that never enables it gets no enforcement. A proposal is only a proposal until a human ratifies it.
- Status (README.md:301-328). Status line at :303: version 0.8.0, rendered 2026-10-13, 275 unittest cases and 10 bash suites. I counted 275 `def test_` lines across the eight Python test files and 10 `test_*.sh` files; both match. "Declared, not yet checked or built" (318-326): a 150-term lexicon cap, an edit-distance check between near-neighbor shorthand (minimum distance 2), usage-based expiry (180 days unused), an auto-ratification gate (5 clean uses), fresh-decoder legibility audits (30-day cadence), `respeak compile` (the corpus as a Vale style package), and a display-only translation hook.
- Install prerequisites: Claude Code 2.1.196 or newer, bash 3.2 or newer, python3 3.9 or newer with PyYAML (README.md:74-78). Ten configuration layers, nearest wins (205-228). The tests table lists 17 files (243-275). `make check` runs under a bounded runner: an 840 s wall and no start above load 4 per core (273-275).
- License section (README.md:364-376): MIT; the AI-writing-tell catalog condenses Wikipedia's "Signs of AI writing" (CC BY-SA 4.0); some banned-phrase categories were informed by the antislop-sampler project (Apache-2.0), with no code or text included.

## Limits
- The README is rendered by respeak's own translator from `design/readme/source.md` (README.md:361-362), so it is the tool describing itself. It cites no outside measurement of the tool.
- The field test is one document and one run. The CHANGELOG records, in version 0.5.0 (CHANGELOG.md:484-486), that "the unpublishable field-test source documents are removed" and that the README keeps the numbers as sizing evidence; the table cannot be re-run from this repo. (The earlier survey of this file said 0.5.1; the entry sits under the 0.5.0 heading at CHANGELOG.md:457.)
- The sentence-length row predates the 0.6.0 sentence splitter (CHANGELOG.md:316-322), which that entry says makes every earlier `avg_sentence_words` and `max_sentence_words` figure stale. The README's own average moved from 15.1 to 13.0 under the new splitter with no prose changed. The "after" figure of 24.5 words also sits above the shipped `avg_sentence_words` budget of 20 (`plugin/config/respeak.config.yaml:214`); the two are not comparable across the splitter change.
- My reading, not the README's: every row counts conformance to respeak's own rule list, measured by respeak's own scanner. No row measures whether a person understood the text better. The table has no reader.
- The drift claim in "Why it exists" rests on a human experiment and on structural argument. This repo records no case of a Claude Code agent's shorthand that a person could not read (see `agentik-respeak-history-sittings`, `agentik-respeak-research-survey`).
- The install lines name the plugin marketplace by its new name `agentik`; the note does not repeat older names.

## Used in
- research/synthesis/tools-respeak.md
- research/synthesis/journal-two-lanes.md

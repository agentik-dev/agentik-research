---
repo: agentik-dev/agentik-respeak
path: plugin/corpus/
commit: eb7d642
title: "respeak corpus: banned phrases, replacements, lexicon and tone map"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- Counts below were made in this survey with a short script over the files at this commit, and they match the README's "234 banned phrases across 22 categories ... and 60 replacement rules".
- `banned-phrases.yaml` (587 lines): `version: 1`; 22 categories holding 234 entries; 96 at severity `error` and 138 at `warn`. Largest categories: `ai_cliches` 76 (30 error, 46 warn), `self_grading` 18, `claude_reflexes` 14, `narrative_slop` 14, `pleasantries` 12, `significance_inflation` 12. Eleven entries carry `tier: density` (flagged by density against a per-1,000-words budget, not per hit). Six entries carry `provenance: owner-preference` (`crisp`, `unpack`, `at the end of the day`, `ecosystem`, `synergy`, `holistic`), meaning they stand on the adopting project's authority, not on measurement. Per-entry fields: `phrase` or `pattern`, `severity`, `fix`, `exceptions`, `provenance`, `case_sensitive`, `tier`. Patterns are written to be RE2-safe so the corpus can later compile to Vale. Quotations and code are exempt.
- The header says the file condenses Wikipedia's "Signs of AI writing" (CC BY-SA 4.0) and the antislop-sampler project (Apache-2.0), with no text or code reproduced; entries cite the research notes (`deai §n`, `sac §n`).
- `replacements.yaml` (106 lines): `version: 1`, 60 `from`/`to` rules, applied before the banned-phrase scan (for example `utilize` to `use`, `in order to` to `to`, `serves as` to `is`); some are marked rewrite patterns, not word swaps.
- `lexicon.yaml` (52 lines): `version: 0`, 3 entries: `cfg` (configuration) and `R1..R7` (research dimension 1-7), both `status: ratified`, human, 2026-08-31; `2-lane` (two-lane architecture), `status: proposed`, legibility 0.6, with a comment that it was rewritten from `2L` (0.4) because that sat below the 0.5 floor. Every entry has `uses: 0`. The header says `uses` is "maintained by tooling, not by hand"; no script at this commit writes it.
- `style/tone-mapping.md` (68 lines): maps each tone axis to observable behaviour. Formality 0 to 1 (contractions, sentence openers, vocabulary, address). Directness 0 to 1 (position of the conclusion, bad news stated plainly). The warmth scalar was removed in config v1 and replaced by `style.feedback` switches (Radical Candor): `core_required`, `specific_praise_required`, `behavior_not_person`. Confidence 0 to 1 (qualifier budget; uncertainty stated once). `tech_level` 1 to 5 with a table of what each level assumes; level 5 is "the only level where the machine lane and human lane are allowed to converge".
- Re-checked at eb7d642 for the journal: `git diff 319f060 eb7d642` shows no change under `plugin/corpus/`, and a fresh count with a short script reads the same: 22 categories, 234 entries, 96 at `error` and 138 at `warn` (`banned-phrases.yaml`), and 60 `replacements` (`replacements.yaml`). The README's figures at README.md:45 match.
- The ratified lexicon in full (`plugin/corpus/lexicon.yaml:26-52`). Two entries are `status: ratified`: `cfg` (:29-36, legibility 0.9) and `R1..R7` (:37-44, legibility 0.5, which equals the configured floor at `plugin/config/respeak.config.yaml:285`). One is `status: proposed`: `2-lane` (:45-52, legibility 0.6). Every entry has `uses: 0` (:35, :43, :50). The repo's own CLAUDE.md imports `.claude/respeak/lexicon-active.md`, a table of exactly the two ratified terms (:8-9 of that file).
- The proposal folder the loop writes to, `.claude/respeak/proposals/`, does not exist in this checkout (`ls` at eb7d642), so the repo holds no filed proposal file beyond the `2-lane` entry inside `lexicon.yaml`.

## Limits
- The banned-phrase evidence is secondary: the research notes condense Wikipedia and two papers (Kobak et al.; Juzek and Ward). Six entries are labelled owner preference. The corpus of 234 phrases is a list of tells, not a measured detector; the research notes warn that detector scores are not ground truth.
- The lexicon is a seed: 2 ratified and 1 proposed entries, none with recorded use.
- My reading: the ratified lexicon is two terms, both ratified on the day the design was written (2026-08-31), and neither records a use. The repo shows the machinery for ratification and no case of agents using it.

## Used in
- research/synthesis/tools-respeak.md
- research/synthesis/journal-two-lanes.md

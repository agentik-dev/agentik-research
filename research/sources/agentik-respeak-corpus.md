---
repo: agentik-dev/agentik-respeak
path: plugin/corpus/
commit: 319f060
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

## Limits
- The banned-phrase evidence is secondary: the research notes condense Wikipedia and two papers (Kobak et al.; Juzek and Ward). Six entries are labelled owner preference. The corpus of 234 phrases is a list of tells, not a measured detector; the research notes warn that detector scores are not ground truth.
- The lexicon is a seed: 2 ratified and 1 proposed entries, none with recorded use.

## Used in
- research/synthesis/tools-respeak.md

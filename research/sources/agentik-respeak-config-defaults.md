---
repo: agentik-dev/agentik-respeak
path: plugin/config/respeak.config.yaml, plugin/config/include.md.tmpl, plugin/config/project-seed.yaml
commit: eb7d642
title: "respeak plugin configuration defaults, include template and project seed"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- `respeak.config.yaml` (315 lines, `version: 3`) is the lowest configuration layer. Its governing rule: every parameter maps to observable writing behaviour, otherwise it is deleted.
- Three modes. `eli5`: tech_level 1, reading grade 6, max sentence 15 words, length budget 150 words, one paragraph, no tables, one metaphor which must close, no lexicon terms. `bluf`: tech_level 2, grade 9, max sentence 20 words, 200 words, paragraphs of at most 6 sentences, owner and deadline required for an ask (an explicit "FYI only" satisfies it), zero metaphors, checks `delete-test` and `answer-the-question-asked`. `technical`: tech_level 4, grade 12 (annotated in the file as "UNVERIFIED number"), max sentence 25 words (was 28), 500 words, paragraphs of at most 6 sentences and 150 words, conclusion then file:line evidence then open questions, zero metaphors, check `facts-before-stories`.
- Three profiles: `exec` (tech_level 1, `lexicon_access: forbidden`, grade 9, bluf), `peer-engineer` (tech_level 3, `expand-first-use`, technical), `author` (tech_level 5, `inline`, technical; "the only profile where the two lanes may converge").
- Tone axes: formality 0.4, directness 0.9, confidence 0.8. Style: second person, present tense, no pleasantries, no self-narration, negative contractions never ("cannot", never "can't"), `readability_metrics: [flesch_kincaid, gunning_fog]`, `quoting_exempt: true`. Budgets the scanner reads: `warn_phrases_per_1000_words` 5, `emdash_per_1000_words` 5, `avg_sentence_words` 20, `max_sentence_words` 35. Other budgets (passive per 10 sentences 2, intensifiers per 100 words 1, qualifiers per message 1, exclamations 0) are marked "not yet enforced": they stay judge checks.
- Gate: `enabled: false` by default (project-only), `include: ["**/*.md"]`, `fail_on: error`, `block_on: introduced`, `allow: []`. Hooks: `session_start: false`. Editorial pass: `restructure: advise`, `buried_lede_boundary: first_paragraph`.
- Shorthand governance (project-only): `ratification: human`, auto-gate `uses: 5`, `fidelity_failures_allowed: 0`; `legibility_floor: 0.5`; `max_entries: 150` (comment: returns diminish fast past about 150 briefs); `min_token_edit_distance: 2`; `retire_after_days_unused: 180`; `review_cadence_days: 90`; `legibility_audit` every 30 days by fresh decoder on a sample of 10; `register_marker: required`; reserved metawords CORRECTION, SAY-AGAIN, UNVERIFIED; readback required for irreversible actions, security findings and escalations; eight `never_compress` classes, each with a named failure mode (error messages and stack traces, security findings, user quotes, numbers with units, safety instructions, owner and deadline of an ask, identifiers and novel decisions and negations, reserved metawords).
- `include.md.tmpl` (57 lines) is the template for the include file; sections for version, stamp, body, switches, shorthand (lexicon or none), and per-mode `reader`, `cue`, `contract` lines.
- `project-seed.yaml` (36 lines) is the sparse project file `/respeak:init` seeds: `gate.enabled: false`, `include: ["**/*.md"]`, `fail_on: error`, `block_on: introduced`, commented examples for `narrative`, `hooks` and `scopes`.
- Line anchors at eb7d642 (`git diff 319f060 eb7d642` shows `plugin/config/` unchanged): the three mode blocks start at `modes:` (:116), `eli5` (:117-136), `bluf` (:138-160) and `technical` (:162 on); the scanner budgets are at :211-215 (`warn_phrases_per_1000_words` 5, `emdash_per_1000_words` 5, `avg_sentence_words` 20, `max_sentence_words` 35); the `gate:` block opens at :223 and defaults `enabled: false` at :240; the shorthand governance block runs :280-303 (`ratification: human` :280, `legibility_floor: 0.5` :285, `max_entries: 150` :286, `min_token_edit_distance: 2` :287, `retire_after_days_unused: 180` :288, `review_cadence_days: 90` :289, the 30-day fresh-decoder audit :290, `never_compress` :295).

## Limits
- A search of the scripts at this commit finds no code reading `legibility_floor`, `max_entries`, `min_token_edit_distance`, `retire_after_days_unused`, `review_cadence_days`, `legibility_audit`, `register_marker` or `reserved_metawords`. The README lists the cap, edit-distance check, expiry, auto-ratification and fresh-decoder audit under "Declared, not yet checked or built". The agent reads the values as instructions.
- `readability_metrics` and each mode's `reading_level_grade` are declared, but `respeak-measure.py` computes no Flesch-Kincaid or Gunning Fog score (see `agentik-respeak-scripts-measure`); the config comment says the mode caps are "LLM-judge writing targets, not this lint cap".
- Several numbers are borrowed from standards (ASD-STE100 sentence caps, plain-language paragraph caps) and two are admitted judgement calls (grade 12; the 150-entry cap interpolated from stenography brief counts), per `research/synthesis/config-critique.md`.
- The `never_compress` block carries eight classes. The four the README names (error messages and stack traces, security findings, user quotes, numbers with units) are the first four.

## Used in
- research/synthesis/tools-respeak.md
- research/synthesis/journal-two-lanes.md

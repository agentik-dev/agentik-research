---
repo: agentik-dev/agentik-respeak
path: research/sources/, research/synthesis/
commit: eb7d642
title: "respeak's own research survey: 11 source studies and 4 synthesis passes"
author: agentik-dev
published: 2026-08-31 (most files); one file rewritten 2026-09-15
accessed: 2026-10-14
kind: our-use
---

## What it says
- The folder holds 11 source studies (24 to 38 KB for the larger ones) and 4 synthesis passes (12 to 30 KB), all written on 2026-08-31 by model research agents, per their own headers ("landscape/media research agent", "design-synthesis agent output"). The Claude Code primer was rewritten as an educational primer on 2026-09-15. The README says these are "11 source studies, 4 synthesis passes".
- The studies, by file: three Anthropic engineering posts (context engineering, long-running harnesses, writing tools for agents); the Caveman vendor page; the Claude Code extension surfaces (20 documentation URLs); communication standards and books; the AI-writing-tell landscape (Wikipedia's catalog, excess-vocabulary papers, the antislop corpus); the landscape of products and media; the linguistics of expert shorthand (collaborative reference, Zipf and the brevity law, experimental semiotics, aviation, radio, medicine, stenography); style-as-code tooling (Vale, linters, Hemingway, Grammarly, style guides, Claude Code output styles); and token-compression and agent-communication prior art (LLMLingua family, gist tokens, SynthLang, TOON, GibberLink, DroidSpeak, A2A, FIPA-ACL, the 2017 negotiation agents, Caveman 2).
- The syntheses: `design-principles.md` (verdict, answers to five open questions, 12 principles, 5 risks); `solutions-and-media.md` (12 existing solutions each given a judgement percentage of overlap, plus a 16-item media shortlist); `config-critique.md` (fields to add, change and remove; the v1 modes and profiles); `corpus-expansion.md` (new banned phrases and replacements, each traced to a research section).
- The full inventory of cited sources, with titles, authors, dates and URLs as the files give them, is in `research/synthesis/tools-respeak.md` section 5.
- The drift evidence the README leans on, opened at eb7d642 (the folder is unchanged since 319f060). It is secondary and it is not from Claude Code agents.
  - Human pairs (`research/sources/linguistics-of-expert-shorthand.md:7-17`). In Clark and Wilkes-Gibbs's tangram task, pairs separated by a barrier repeatedly arranged 12 abstract figures over six trials. The file's example runs from a long description in trial 1 to "The next one's the ice skater" in trial 4 to "The ice skater." in trial 6. It puts the word count at "roughly from ~40 words to ~1-2 words per figure" (line 12), reproduced via Wikipedia's article on grounding, not from the paper. The README rounds this to "two".
  - Partner-specific pacts (line 15): when the partner changes, speakers revert to longer descriptions, so the shorthand does not transfer to an outsider. The file also records that the seed URL for "conceptual pact" returns 404.
  - Agents (line 37, the file's own "Respeak mapping"): alignment is implicit among agents with the same model and context, so an unmonitored swarm dialect "will drift by routinization" (paraphrase). This is an inference by the research agent, not an observation.
  - Machine drift, the 2017 negotiation agents (`research/sources/token-compression-prior-art.md:105-114`). In reinforcement-learning self-play the agents were rewarded only for deal outcomes; the file quotes a researcher: "There was no reward to sticking to English language." The transcripts it reproduces are repeated words ("to me to me to me"), and it records that the code was decipherable (a word repeated five times meant five copies). The lead author is quoted that later experiments rewarded correct English, and the file calls the "shut down" story a press myth.
  - Drift despite governance (`research/synthesis/design-principles.md:15` and risk 1 at :72): the synthesis says the draft wrongly implied the lexicon is the drift defense, because drift happens inside governed systems and the most fluent agents deviate most; it cites sections 6.11 and 6.13 of the linguistics file.

## Limits
- The notes call themselves extraction notes, "not verbatim". Many items are Wikipedia pages standing in for papers, or Europe PMC abstracts standing in for full papers. Several page lists say "fetched 2026-08-31"; the notes mark some items "not fetched" or "known context": the Google A2A protocol, Grammarly tone detection, Claude Code compaction and community CLAUDE.md guidance, some FIPA performative details, most humanizer tools other than three, and several press articles on AI-writing tells.
- The overlap percentages in `solutions-and-media.md` are labelled "judgment estimates", with plus or minus 10 percent. The "supported and unique" verdict is the design agent's own reading of these notes.
- The files are respeak's research, not this site's: this note describes them and does not copy them.
- No file in this folder reports a case of Claude Code agents drifting into shorthand that a person then could not read. The two agent cases are a 2017 reinforcement-learning experiment and an argument by analogy from human pairs.

## Used in
- research/synthesis/tools-respeak.md
- research/synthesis/journal-two-lanes.md

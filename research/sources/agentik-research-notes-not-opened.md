---
repo: agentik-dev/agentik-site
path: research/sources/
commit: 2c11bbd
title: "The research sitting's source notes: the records of pages not opened"
author: agentik-dev
published: 2026-10-14
accessed: 2026-10-14
kind: our-use
---

Read with a grep over the notes at 2c11bbd ("refute round 2: practices"), then each matching line in its note. The command:

`git grep -l -i -E "not opened|did not open|could not (be )?(read|open)|returned (HTTP )?4[0-9][0-9]" 2c11bbd -- research/sources/`

It matches 32 notes at 2c11bbd, and the same 32 at 983d5b3, the research sitting's last commit.

## What it says
- One match is not about a page: kodam-80b-local-claude-code.md line 13 says a tool's background calls "returned HTTP 404" because the model does not exist in Ollama.
- Nine notes record a page the helper tried and failed to open:
  - iso-24495-1-plain-language.md line 17: a catalogue entry only; the standard's text is sold and was not read; the ISO page returned HTTP 403 to the fetch tool.
  - kincaid-1975-readability-navy.md line 17: the repository's abstract page only; the PDF returned HTTP 403.
  - infoq-parnin-interruptions.md lines 11 and 16: a secondary news report; the primary paper's publisher page redirected to a login step, and a project poster held no readable text: "whose primary paper I could not read".
  - begeny-greene-readability-formulas.md line 18: the Reading Rockets page for the paper returned HTTP 403; the university news release and the ScienceDaily summary were read instead.
  - ismp-error-prone-abbreviations.md line 16: the Joint Commission's own list returned HTTP 403, so the note relies on the ISMP page.
  - wise-sternadori-inverted-pyramid.md line 18: the record of the first author's dissertation returned HTTP 403, so the note does not rely on it.
  - lewis-2017-deal-or-no-deal.md line 18: a fact-check page that other notes lean on returned HTTP 402 and was not opened, so the media account is "unverified here".
  - mcmillan-config-file-adherence.md line 19: the arXiv HTML page returned 404; the PDF text was read.
  - code-docs-best-practices.md line 32: the April 2025 Anthropic engineering post on best practices now answers with a permanent redirect to the current page, "so I could not read the 2025 text separately".
- Twenty-two notes record a page or file left unopened by choice:
  - Eleven repository notes list the files they did not open: agentik-decisions-history-design, -history-sessions, -history-sittings, -packets (d18's packet), -plugin and -tests; agentik-relay-plugin and -reviews; agentik-session-plugin; and two that name a file in a private repository, agentik-session-design-overhaul line 26 (a usage report) and agentik-session-design-review-r6 line 20 (a defect brief).
  - Eleven web notes name a page they did not open: adr-github-io-intro (linked pages), aiid-incident-1152-replit (four other reports), anthropic-docs-model-config-thresholds (third-party pages, not cited), anthropic-opus-4-6-launch (the benchmark's own write-up), arxiv-beyond-the-leaderboard and arxiv-theagentcompany (the full paper; abstract only), code-docs-changelog-unattended (some versions on the docs page), code-docs-cloud-sessions-unattended (the cloud-environments page), git-docs-api-lockfile (community posts, not cited), khan-debate-persuasive (the paper), and theregister-replit-database-deletion line 17 ("no vendor post-mortem opened by me", and other coverage not opened).
- So 31 notes record a page or file not opened: 9 that failed to open and 22 left unopened.

## Limits
- The grep's phrases miss records worded otherwise. For example, arxiv-red-teaming-coding-agents, arxiv-sok-prompt-injection-coding-assistants and arxiv-your-ai-my-shell say "the full paper was not read". The count is a lower bound.
- The split into "failed" and "by choice" is this reading of each note's words.

## Used in
- docs/method.md

---
repo: agentik-dev/agentik-respeak
path: CHANGELOG.md
commit: 319f060
title: "Changelog (respeak)"
author: agentik-dev
published: "2026-10-12 (newest dated entry; the file spans 2026-09-01 to 2026-10-12)"
accessed: 2026-10-14
kind: our-use
---

## What it says
- Versions: 0.2 (2026-09-01) first release; 0.3.0 (2026-09-02) "Enforcement instead of instruction": the scanner gains `--fail-on`, budgets and exceptions, the PostToolUse gate blocks a failing Markdown write; 0.4.0 to 0.4.3 (2026-09-04) layered configuration and fail-open hardening; 0.5.0 to 0.5.2 (2026-09-15) session overrides, the CI form `respeak-check.sh`, a whole-README editorial pass; 0.6.0 (2026-09-21) the field-run release; 0.6.1 (2026-09-22) conventions pass; 0.7.0 (2026-10-11) the include file; 0.8.0 (2026-10-12) `init` proposes `gate.include` and renders the include file.
- 0.6.0 (CHANGELOG.md:270-415) records a ten-agent editorial pass over nine of the owner's own sites on 2026-09-21, across about 2,000 edited files (the sites are private; this note does not name or describe them further). Findings, each fixed: a banned term inside a heading, which the verifier holds invariant, shut the file to every later edit, so the gate now blocks only on hits a write introduced (`gate.block_on`). Pre-existing hits are reported, not blocked. On one real page density-tier tells ran to 79 hits, mostly dashes. One site measured an average sentence of 68.9 words because bullets were read as one sentence; the splitter now treats a list item or table row as its own unit. This repo's README fell from an 89-word longest sentence to 27 and from 15.1 to 13.0 average with no prose changed. A measuring run without `--config` gave 36 reported errors against 13 real ones on one site's baseline. Thematic breaks and curly quotes moved to a density tier: 539 of one site's 565 break hits were a catalog card rule; 296 of another site's quote hits sat inside publisher blurbs. Eight corpus entries gained exceptions for literal senses (a game title on 21 pages, a fan project, a horticultural sense of "tapestry"). A heading rule that needed a space after the hashes let a wrapped line beginning `#33256` publish as a heading while the verifier passed, so the verifier now counts every line MkDocs would render as a heading. New verifier failure class "block structure changed" and flags `--allow-strings`, `--prose-keys`, `--dirs`. Translator rules 5 to 12 added for behaviours the contract did not forbid (never correct a factual claim, third-party text is never reworded, and others). New `tests/test_corpus.py` with 11 tests.
- 0.6.1 (CHANGELOG.md:205-269): the README had been hand-edited to 40,089 bytes; the rendered version is 21,453. The session id is read from `CLAUDE_CODE_SESSION_ID` only, because the older name is not set by Claude Code, so `/respeak:off` refused in a real session. The marketplace was renamed to follow the repository; the install line changed. The plugin moved into a `plugin/` subtree because an install had copied all 100 tracked files, research and tests included, into the plugin cache.
- 0.5.0: the PostToolUse gate hook had been removed from `hooks.json` "for one person's convenience", which made every documented gate knob a no-op for every installer; a test now pins the manifest's event list.
- 0.5.1: a privacy pass for `/respeak:report`; every translation opens with a marker line; the unpublishable field-test source documents were removed and the README keeps the measured numbers as sizing evidence (CHANGELOG.md:481).
- 0.5.2: the README went through the translator's editorial pass; average sentence length fell from 23 to 15 words with headings, links, code and numbers byte-identical by the verifier. `respeak-check.sh` has 16 checks in `tests/test_check.sh`.
- 0.7.0 and the Unreleased block: the include file (see `agentik-respeak-scripts-include`); a large set of review-driven fixes to the CI check, the renderer's bounds and the sync of shared scripts (reviews ADV10 and ADV11, see `agentik-respeak-design-reviews`).

## Limits
- A change log is the owner's account of what changed and why. The 0.6.0 numbers come from one owner's sites; the sites are not in this repo, so they cannot be re-run.
- The CHANGELOG states that any sentence-length figure from before 0.6.0 is stale.

## Used in
- research/synthesis/tools-respeak.md

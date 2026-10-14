---
repo: agentik-dev/agentik-respeak
path: design/review-adv6.md, design/review-r6.md, design/review-adv10.md, design/review-adv11.md
commit: 319f060
title: "Adversarial reviews ADV6, ADV10, ADV11 and decisions review R6 of this plugin"
author: agentik-dev
published: "2026-09-23 (ADV6 and R6); ADV10 and ADV11 carry no date in the lines read"
accessed: 2026-10-14
kind: our-use
---

## What it says
- ADV6 (review row, 2026-09-23, on the tree at `2a21d76`): 12 findings, 4 high, 5 medium, 3 low (the count is in the sitting 2026-09-23-5-adv6). The high ones are "wrong green" cases where the CI side could be turned green without fixing anything: ADV6-1 a folder sidecar or ignored local file softened `fail_on` or added `gate.allow`; ADV6-2 the environment or the session provider changed the CI verdict; ADV6-3 the README stamp was a sidecar a builder could move (the check compared hashes and never ran the verifier); ADV6-9 owner paths and private names sat in the public tree behind an allowlist. Verdict: not ready to be a gate other repos trust.
- ADV6-4 (medium): "prose-only" admits new claims and flipped claims. The Markdown policy keeps headings, lists, links, code and numbers but not paragraph count or polarity. Reproductions: an appended paragraph asserting safety gave `PASS (md)` and rc 0; replacing the first "never" with "always" also passed. The proposed fix is a paragraph count per section and a multiset of polarity tokens (not, never, no, without, always, only, must). The sittings and packets defer it ("ADV6-4 stays its own packet"); grep over the verifier and tests at this commit finds no polarity or paragraph-count invariant.
- Other ADV6 findings: the renderer had no wall clock, group kill or depth guard (ADV6-5); a failed `make readme` left the failed render in `README.md` (ADV6-6); the hook gate failed open on an 11 MB file (ADV6-7).
- ADV10 (8 findings: 2 high, 4 medium, 2 low): a nested project file softened the check and git could hide it (ADV10-1, ADV6-1 regressed); the bounds moved children out of the caller's process group (ADV10-2); the renderer ignored `is_error`, so a usage-limit message could be written as the narrative (ADV10-3); a failed `make readme` rewrote `design/readme/source.md` (ADV10-6). Verdict: closer, not ready.
- ADV11 (6 findings: 2 high, 3 medium, 1 low): a nested git repository softened the check with the outer status clean (ADV11-1); a git failure read as untracked so the gate skipped (ADV11-2); the account-failure pattern missed phrasings (ADV11-5). Verdict: bounds sound; the CI verdict still moves without a trace in `git status`.
- R6 (decisions review, §1 and §2 read in full): a ledger of 23 decisions (R6-1 to R6-23) from two days, marking which sit in the design record and which only in a charter; reversals and tensions listed. R6-9 and R6-10 record that `README.md` is written by `make readme` only, with a content stamp and not an mtime.

## Limits
- These are the plugin's own relay-row reviews, run by a model reviewer on the owner's repo; they are not independent. Each finding says its reproduction ran in a temp directory. The sections of R6 after §2 were skimmed by heading only.
- The text names private products and a device in several places; this note does not.

## Used in
- research/synthesis/tools-respeak.md

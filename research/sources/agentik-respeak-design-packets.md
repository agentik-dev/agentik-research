---
repo: agentik-dev/agentik-respeak
path: design/packets/
commit: 319f060
title: "design/packets: the build packets (n1, r1 to r15) and relay row files"
author: agentik-dev
published: "undated in the files; the earliest sitting that writes a packet is 2026-09-22"
accessed: 2026-10-14
kind: our-use
---

## What it says
- 16 packets (`n1-init-include.md`, `r1` to `r15`), each about 4,800 to 9,200 bytes, and 14 row files (`rows-<date>*.json`). Titles show the work: R1 conventions, hygiene and the provider layer; R2 the README through respeak; R3 follow-ups; R4 the plugin subtree and a doclint re-sync; R5, R6, R8, R11, R12, R14 re-syncs of shared scripts; R7 the R6 and ADV6 fixes (a hermetic check, bounded spawns); R9 the README for the public; R10 the ADV10 fixes; R13 the ADV11 fixes; R15 the README renderer as a marked helper; n1 init joins the include file.
- Packet R3 records a measurement: in a real Claude Code Bash tool `CLAUDE_CODE_SESSION_ID` is set and `CLAUDE_SESSION_ID` is not, so `/respeak:off` refused in a real session; all eight readers moved to the one name.
- Packet R7 defers ADV6-4 ("its own packet; it changes every repo's verify").
- Most packets concern the repo's own build conventions (shared lint scripts, pinned by hash), not the two-lane mechanism. They are the evidence that the tool is built and reviewed through packets run by unattended builders.

## Limits
- Skimmed by title and the first screen of R3 and R7; the packets' acceptance lines were not read.
- Row files carried absolute paths under the owner's home in an earlier state (ADV6-9); a later packet made them repo-relative. This note names none.

## Used in
- research/synthesis/tools-respeak.md

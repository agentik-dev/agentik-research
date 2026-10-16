---
repo: agentik-dev/agentik-decisions
path: design/d17-four-verbs.md
commit: fabb212
title: "Packet d17: the four-verb redesign"
author: agentik-dev
published: 2026-09-28
accessed: 2026-10-14
kind: our-use
---

## What it says
- This packet built version 0.3.0. Its design of record is an entry in the owner's cross-repo ledger plus a research note in a private repo; where the packet and that note differ, the packet holds because it carries the owner's direction of 2026-09-28 (opening paragraph).
- The ledger format (section "The ledger format"): one `DECISIONS.md` at the repo root; `## In force` holds `### Every session` first, then area subsections; every entry in force sits under a subsection; `## Proposed` and `## Superseded` follow. Numbers are unique across all three sections and never reused. "Caps: at most 25 in force, at most 7 under `Every session`." The packet gives no reason for either number.
- The generated block (section "The verbs", `render`): one line naming its source and the regenerating command; the `Every session` entries verbatim; then one line per other in-force entry, `- N Title (area)`, under a sentence saying `agentik decisions show N` reads one. Proposed and Superseded entries stay out. `render --check` prints a diff and exits 1 when stale. Where the block lives is a parameter: a repo's own `CLAUDE.md` by default, a user-level `CLAUDE.md` for the cross-repo ledger.
- Dropped (section "Dropped"): record files, front matter on entries, the closed tag list, an `INDEX.md`, the `governs` map, per-repo config, the `rule` verb and its hook, `scope`, `against`, `supersede`, `convert`, `stats`, `init`, `check`, `index` and the legacy reader. The packet states the drops and gives no prose reason.
- Acceptance A7: the lint catches a duplicate number, 26 in force, 8 in `Every session`, an entry outside a subsection, and an entry without its dated parenthetical, one test per case. A12: the older designs move to `history/design/` and the older packets to `history/packets/`.
- Out of scope: any push, and the cross-repo ledger's own reshape.
- Line anchors at fabb212 (the file is unchanged since 80d59eb, per `git diff`). The ledger format is d17:13-19; the sentence "Caps: at most 25 in force, at most 7 under `Every session`." is the last half of :19, and the packet gives no reason for either number. The dropped list is :32-34. Acceptance A7 (:46) names the cap cases one by one: a duplicate number, 26 in force, 8 under `Every session`, an entry outside a subsection, and an entry without its dated parenthetical, "one test per case". The lint's messages for the first two caps are pinned in `tests/test_ledger.py:71` ("26 entries in force; the cap is 25") and :77 (8 under `Every session`).
- The packet's design of record is two documents outside this repo (d17:9): an entry in the owner's cross-repo ledger and a research note in another repo. The prose behind "one sectioned ledger with caps" therefore sits outside what can be read here.

## Limits
- Its rationale sits in two documents this repo does not hold (the owner's cross-repo ledger entry and a private research note), so why the per-file design gave way to one sectioned ledger is not recorded here in prose.
- Marked `status: current` with `updated: 2026-09-28`; later changes live in d18, d23 and the packets.

## Used in
- research/synthesis/tools-decisions.md
- research/synthesis/journal-ledger.md
- docs/tools/decisions.md

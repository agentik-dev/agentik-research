---
repo: agentik-dev/agentik-decisions
path: design/packets/
commit: 80d59eb
title: "design/packets (builder packets d19 to d22 and d-n1 to d-n3; d18's packet not opened)"
author: agentik-dev
published: 2026-10-02 to 2026-10-12
accessed: 2026-10-14
kind: our-use
---

## What it says
Opened in full: `d19-amends-keeps-clauses.md`, `d21-amends-shows-what-it-drops.md`, `d22-text-is-the-body.md`. Opened in part (the header table and section 1): `d20-readme-keeps-refused.md`, `d-n1-render-doctor-writes.md`, `d-n2-new-ask-respeak.md`, `d-n3-shape-lint-answer-find.md`. Not opened: `d18-one-flow.md` (the design file d18 was read instead; one grep hit on its quoted rule).
- Each packet is a fixed shape: a header table (from, pin, wall, may touch, acceptance, budget, verify), the quoted source, rulings, interfaces, findings that name the row, forbidden reads, and a capped report.
- Packet d19 (sighting of 2026-10-02): in a consumer's ledger, answering decision 35 with `--amends 9` dropped an earlier `; amended 2026-10-01, ...` clause from entry 9, and the sitting restored it by hand. Ruling: `--amends` keeps the whole tail and appends a new amendment clause, because an earlier amendment names an owner's answer that the paragraph still rests on.
- Packet d21 (sighting of 2026-10-08): a session ran `answer 59 --amends 29` with two new sentences as `--text`. Entry 29's line fell from 2,267 bytes to 801. The body in force was gone, the run printed only "entry 29 amended", and the session found it an hour later and repaired it by hand. The packet says the verb did what it documented and nothing told the caller what it dropped. Rulings: `--text` with `--amends` is the whole paragraph in force after the answer; the run prints `replaced:` with the old paragraph; a paragraph under half the old one's length is refused unless `--shorter`.
- Packet d22 (sighting of 2026-10-10): two real entries given a ledger-shaped line as `--text` came out with the bold title and the dated tail twice, and `render --lint` passed both. Rulings: `--text` is the body only; `answer` refuses a `--text` that opens with a bold span or ends in a dated tail; the lint names a doubled title or tail.
- Packet d20 (sighting of 2026-10-02): `make readme` was refused by the verifier twice before it passed, on a one-sentence source change; run times quoted are 7 min 38 s, 3 min 42 s and 6 min 43 s for the three runs. Ruling: keep the refused render as `.readme-refused.md`; no retry inside the target.
- Packets d-n1, d-n2 and d-n3 (2026-10-12) each close a batch of NICE_TO_HAVE items from review rounds: d-n1 (0.6.0) write behaviour of `render` and `answer`, `doctor` rows; d-n2 (0.7.0) `new`, `ask` and the respeak child; d-n3 (0.8.0) the entry shape, the lint, `answer` and `find`. Each commits red tests first, then the fix.
- Every packet bars `make check` during a live unattended night and names only targeted test lines; the observer runs `make check` before the merge.

## Limits
- Packets are instructions to a builder, written by the owner's tooling; the sightings are quoted from the observer's notes and name a consumer repo, not shown here. The byte counts are the packet's, not re-measured.
- Commit hashes in the packets point into repos that are not in this checkout.

## Used in
- research/synthesis/tools-decisions.md

---
repo: agentik-dev/agentik-relay
path: design/packets/
commit: a326550
title: "design/packets: the packets, one per queue row, and the rows files"
author: agentik-dev
published: 2026-09-22
accessed: 2026-10-14
kind: our-use
---

The folder holds 87 packet files (`*.md`) and 19 rows files (`rows-*.json`). Read in full or nearly: `ar10-bounded-night.md`, `ar61-full-suite-once.md`; grepped: `ar11-tla-night.md`, `ar26-packet-rule.md`; the head of `rows-2026-09-23-r3.json`.

## What it says
- A packet is the whole scope of one sitting: a title, a table (from, pin, wall, may touch, acceptance, budget, verify) and six numbered sections, under 9,216 bytes. AR10's budget row: 120 turns, 130k context, one commit per act (AR10 packet, header table).
- AR10, "the night bounded", was cut after the 2026-09-23 fork storm (rows file, `why` field) and quotes an earlier defect brief: D1 said the baseline "runs EVERY acceptance line of a row on main", with no memo, no cap on total and no load check; D5 said a plan started by a measurement or a test never measures. Its ten acts are the recursion guard, fail early, scope, memo, a per-root bounded measure, the load breaker, the 60 s watchdog with a kill at 2700 s of no HEAD, mtime or CPU change, the invariants, the orphan sweep and a cancelable wait. The defect brief itself is not in this repo.
- AR11 packet: the owner's quote (2026-09-23 12:35) asks for TLA+ for "timing and edge conditions that might cause fork storms (those are incredibly bad and we need to lock that down)". Acceptance lines require TLC to print an invariant violation for each storm config.
- AR26 packet: the owner's 2026-09-24 ~18:36 option A, with the figures "packet writers 58 of 183 sittings, $261 of $653".
- AR61 packet (2026-10-10): quotes a relay-nights analysis that builders ran the verify line "about 2.7 times a row", 46% of night time, and that "182 runs were moved to the background"; a refuter noted the line is the queue's default and no packet row, RULES or CONTEXT named it.

## Limits
- Packets are instructions to builders, plus the owner's quoted words; the analyses they quote are not in this repo. The packet's own numbers (turn budgets) are plans, not outcomes.

## Used in
- research/synthesis/tools-relay.md

---
repo: agentik-dev/agentik-session
path: tests/
commit: e7f0723
title: "tests/: what the suite pins"
author: agentik-dev
published: undated
accessed: 2026-10-14
kind: our-use
---

## What it says
- 36 test files, a fake `claude` binary (tests/fixtures/fake-claude) so no quota is spent, and transcript fixtures. The README states 1116 tests at v2.0.0-alpha.14. A search for test function definitions in the files counts 621 and finds 101 uses of parametrisation, so the README's figure presumably counts parametrised cases (this note's inference). Two TypeScript test files for the mod run under `claude plugin test`.
- Read as test names only (not bodies), by file: test_budget (4 tests: zones escalate, shipped defaults are self-consistent, reserve floor moves with the reserve, incoherent thresholds are rejected); test_meter (11: definitions equal an outside usage report's, three appends equal one parse, partial last line not consumed, inode change or shrunk file reparses from zero, no message content kept); test_hook_meter (27: 79% is silent, the first crossing speaks once, every tenth tool past the crossing, at 100% every tool with the exit rule, output under 400 bytes, a subagent leaves the meter alone, posture off is silent, `--max-turns` cases); test_precompact (13: auto blocked with one line, manual and unknown pass, a pass prints nothing, the shim maps an old CLI's refusal to exit 0); test_charter (31: each refusal names its part, 4096-byte boundary refused by both linters, RESPAWN spellings, WAITING warnings, close names its commit); test_chain (32: refusals, same arguments every start, never compacts or resumes, restart, no marker stops, a crash is never restarted, marker bound to the sitting, waits for the turn, guards hold, cap fails closed, kill after grace, terminal).
- Meter fixtures: tests/fixtures/meter has `under-80.jsonl` (6 lines), `at-80.jsonl` (8) and `at-100.jsonl` (6) plus a builder-subagent directory; the at-80 fixture uses synthetic placeholder content.
- Charter fixtures: at-ceiling, over-ceiling, missing-handover, no-pin-row.
- test_isolation, test_install and test_prune_trees exist for the frozen-tree and live-state guards; test_launch, test_launch_model, test_admission, test_admit, test_measure and test_mod for the launcher, model resolution and the mod.
- Red-first practice: charters report tests red on unchanged code ("59 failed" for the respawn mark; "28 failed, 50 passed" for PreCompact) before the change.

## Limits
- The suite uses a fake `claude`. The design says the proofs against a real Claude Code (P1 to P7 in the respawn record) are "measured on the installed `claude` by an attended sitting or by the owner, never by the suite". So the tests pin the tool's own behaviour, not Claude Code's.
- Test names were read; bodies were not, except those quoted in design records.

## Used in
- research/synthesis/tools-session.md

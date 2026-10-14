---
repo: agentik-dev/agentik-agents
path: tests/
commit: 78ce312
title: "tests/ of agentik-agents: what behaviour the suites pin"
author: agentik-dev (the suite owner)
published: undated
accessed: 2026-10-14
kind: our-use
---

Read: the header of each of the nine suites and the check names printed by a run. This survey also ran eight of them on 2026-10-14 in a scratch copy of the commit (a Linux sandbox, run as root, a fake `claude` that exits 1 first on PATH, a fake home and state folder), so no real model or API was reached.

## What it says
- The router suite starts the real router as a subprocess against two stub backends on loopback. Section names: verbatim upstream pass-through, routing by model name, an undeclared backend is an error and not the default, Claude ids that contain a colon stay upstream, a header allow-list so a new credential header cannot leak, multi-backend rig routing, folding of non-leading system messages, the four local adjustments, `count_tokens`, streaming, pings, a backend dying mid-stream, hostile bodies, a chunked body refused, HEAD and 204 framing, malformed config, `/api/hello`, `--check`, bind policy.
- The fan-out suite drives the real orchestrator against a stub wrapper that fabricates every failure mode: result classification, an API error is not success, the hard aggregate budget, ceiling deflation, timeout, dry run spends nothing, result validation, a shard with no cost figure books its reservation, a NaN cost cannot poison the pool, a caller cannot smuggle a second spend ceiling, a flag-shaped prompt cannot strip the ceiling, an interrupt terminates in-flight delegates.
- The cost suite: the local lane from a ledger, a hostile ledger cannot kill the report, model-name canonicalisation, pricing arithmetic, the price-table self-check, lanes are kept separate, spend that bought nothing, unattributable rows are disclosed, `--since`, drift withholds the cache figure, attribution and efficiency, the 5.x price rows.
- The status suite (118 checks at exit): the JSON schema, rows, lanes, states, nothing leaks and nothing is written, bounded reads of the ledger, exit codes, liveness rules, control characters never reach output, lane `api`, `--watch`.
- The run-path and API-run suites: exit-code fidelity through SIGPIPE, the logging subprocess gets no credentials, envelope detection by position, an age-key deny rule for relative paths, proxy pinning, a usage log that records substance and not content, tags, the run dir, the stream fold, signals reaching the child.
- The argument-handling suite pins four containment bypasses (B1 `--profile` after another argument ran uncontained; B2 a flag-shaped prompt reached the child as a flag; B3 capability-restoring flags passed through; B4 an unlisted value flag dropped the spend ceiling), each said to be confirmed against the real binary before the allow-list rewrite.
- The flag-pinning suite parses the real `claude --help` to keep the allow-list's arity honest across releases; it skips cleanly when `claude` is absent.
- The rig and launcher suite covers the BSD portability idioms that broke a cold start, dead ports reading as alive, JSON injection through a backend-supplied model id, key masking and storage, a missing secrets file leaving the lane working, a decoy router for the "refuse a second router" guard, and a cold start that stops only a router it started. Its header says the earlier version shipped untested and four reproduced defects lived in the paths a test would have walked.
- Counts the repo states: the README gives the router suite as 87 checks; design/01 (2026-09-04) gives the cost suite as 50 and the argument suite as 58; packet a-s3 (2026-10-13) gives the cost suite as 66.
- Re-run on 2026-10-14 (scratch copy, this survey's own run): cost suite 66 passed, 0 failed; router suite 87 and 0; fan-out 46 and 0; status 118 and 0; argument handling 58 and 0; API-run suite 80 passed and 1 failed ("a caller's exported log path is left alone", cause not investigated); run-path suite 23 passed and 3 failed; rig and launcher suite 51 passed and 2 failed; flag-pinning skipped. The run-path and rig failures print BSD `stat` usage output, a check that this platform's `chmod` rejects a bare `--` (GNU accepts it), and an unexpected proxy warning in the proxy-pin checks (the sandbox sets proxy variables). These are consistent with a suite written for macOS, not with a defect in the tools; the hygiene suite was not run.

## Limits
- Corrected 2026-10-14 by a second re-run (agentik-agents-tests-rerun-2026-10-14.md): the proxy-pin warnings came from four other variables the sandbox sets (`ANTHROPIC_BASE_URL`, `NODE_OPTIONS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`), not from proxy variables, which the test clears; the line above keeps the first reading as written.
- Every suite is stub-driven. No test reaches a real model, a real API key or a real inference server, by design; the only contact with the real `claude` binary is the flag-pinning suite.
- My re-run is on a different platform from the one the suites target, so the three failing suites are not evidence of a regression.
- The test names above record what is pinned, not how often a pinned bug occurred in use.

## Used in
- research/synthesis/tools-agents.md

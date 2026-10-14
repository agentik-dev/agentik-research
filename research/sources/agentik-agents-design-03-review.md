---
repo: agentik-dev/agentik-agents
path: design/03-review-2026-09.md
commit: 78ce312
title: "design/03: Adversarial review round, 2026-09-05 (with raw findings and credential-setup notes)"
author: agentik-dev (the suite owner)
published: 2026-09-05
accessed: 2026-10-14
kind: our-use
---

Read: the whole of design/03-review-2026-09.md and design/03-review-2026-09/raw-findings.md; the first lines of the credential-setup note (the same text now lives in the README).

## What it says
- On 2026-09-05 five reviewer sessions (the raw notes say Opus reviewers), each assigned one surface (CLI, flow and docs, the HTTP router, shell tools and cost accounting, the plugin's agent, command and skill files), were told to assume the code was broken, cite file and line and reproduce before reporting. All five surfaces had reproducible defects. Counts stated: 11 findings (CLI), 13 reproduced against stub backends (router).
- Defect kinds: leaked credentials or misrouted requests; silent failures; hangs and crashes; docs claiming what measurement did not back. Examples: the router's local-header policy was a two-entry deny list, so a cookie, custom headers and any future auth header reached the local backend; a chunked request body was dropped, no model remained to route on, and the request went upstream on the seat's credential (HIGH, now HTTP 411); a colon heuristic sent real Bedrock ids and `:beta` Claude ids to the local model; hand-built JSON let a backend-supplied model id redirect prompts off the box; the API key rode in a curl argument list every 10 seconds; the status mask showed an 11-character key in full.
- Silent failures: a skill's `tools:` frontmatter key does not exist and is silently ignored, so both skills granted nothing, including the Bash the fail-closed preflight needs (the key is `allowed-tools`); a liveness probe read dead ports as alive; three reviewers independently found that `down` orphaned a backend.
- The plugin's fail-closed contract was unfalsifiable: the model was told to run a preflight but not to show it, and two sanctioned escapes let it skip going local. The fix is a mandatory verbatim preflight line.
- Four measurements in the design docs did not survive a check against their own logs (a misattributed log line, an "only difference" claim, a headline figure measured under flags the launcher does not use with a contradicting production run omitted, a prefill floor raised from 87 to 120 tok/s with no run behind it). They were corrected, and the n=1 caveat was restored.
- Fixes: router 0.4.0 (header allow-list, 404 for an undeclared backend, 411 for a chunked body, SSE error and ledger row on mid-stream death, config validated); router tests 67 to 87; cost tests 45 to 50; pidfiles with argv checks replace `pkill`.
- Self-inflicted incident: while reproducing the `pkill -f` finding, a reviewer's verification command matched its own shell and killed the production router; three orphaned daemons were cleared as a side effect. The doc argues review tooling is production-adjacent and the next round should reproduce against an instance that cannot be the production one, by port, container or host.
- Flaky test after the round: the router suite passed 87 of 87 in isolation three times but failed under `make test`; a load-sensitive assertion required zero keep-alive pings on a fast response. Fixed to require zero only when the response beat the threshold.
- What held up: twelve simultaneous streams held a peak of exactly 2 requests in flight; the semaphore never leaked; the seat token never reached the ledger.
- One pre-existing fan-out test failed throughout the round in an untouched file.

## Limits
- The reviewers were model sessions, and the doc is the author's summary of them; the review sessions' own transcripts are not in the repo.
- "Reproduced" is the document's word; the stub-based reproductions are not kept as separate artefacts beyond the tests.

## Used in
- research/synthesis/tools-agents.md

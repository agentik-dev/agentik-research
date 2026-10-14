---
url: https://github.com/bentleypark/aiwatch/issues/1298
title: "Review loop keeps adopting agents' suggested rewrites - remove the artifact instead of policing the judgement (issue 1298)"
author: The issue's reporter (the owner of a public GitHub repository, named in the URL)
published: 2026-08-31 (opened; closed as completed 2026-09-01)
accessed: 2026-10-14
kind: reported
---

## What it says
- Incident: a nine-round review loop on one change did not converge. Each round's findings were about prose that the previous round's fix had written; all of round 8's findings were on round 7's fixes and all of round 9's on round 8's.
- Mechanism as the reporter describes it: review agents returned suggested replacement prose, the operator adopted it, and each adopted rewrite added a new claim for the next round to flag. A written stop rule was in context and was still broken at rounds 8 and 9. An earlier attempt to enforce the stop by a hard gate built four designs that either blocked compliant work or could not tell compliance apart, because the check measured phrasing, not content.
- Fix chosen: a project review agent that reports findings only, with no replacement prose; where the fix is a deletion it says so as a finding. In the verification run it returned four findings with no replacement-prose violation, and it surfaced a blocking defect in a pull request that was green and mergeable.
- Follow-on: the agent shipped, then a git pre-push gate was added after a tool-call hook design shipped inert, and a locator fix needed four review rounds. A telemetry gap remained: nothing routed the loop to the new agent.

## Limits
- One repository, one operator, self-reported; the "reports only" fix was verified on the next pull request, not against the old loop on the same input. Reported, not measured.

## Used in
- research/synthesis/field-8.md

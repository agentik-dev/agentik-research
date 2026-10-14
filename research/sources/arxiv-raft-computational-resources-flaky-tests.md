---
url: https://arxiv.org/abs/2310.12132
title: "The Effects of Computational Resources on Flaky Tests"
author: Denini Silva, Martin Gruber, Satyajit Gokhale, Ellen Arteca, Alexi Turcotte, Marcelo d'Amorim, Wing Lam, Stefan Winter, Jonathan Bell
published: 2023-10 (arXiv v1, submitted 18 October 2023)
accessed: 2026-10-14
kind: measured
---

## What it says
- Study design: 52 projects in Java, JavaScript and Python, run in Docker containers under 27 resource configurations (CPU, memory, disk and network, singly and combined; CPU, memory and disk throttled with the Docker CLI, network with Wondershaper). Phase I ran each project's suite 300 times per configuration across 16 configurations; Phase II used configurations matching cloud offerings. A Resource-Affected Flaky Test (RAFT) is a test whose failure rate differs significantly, by the authors' statistical test, between throttled and unthrottled runs.
- Headline: of 608 flaky tests found, 283 (46.5 percent) were RAFTs, so many flaky failures could be avoided by changing the resources available during test runs.
- Which resource: CPU starvation was "the most significant and ubiquitous factor", and memory throttling may also matter. Across 30 Java projects the runs saw 82 test failures under CPU throttling, 10 under memory throttling, 1 under disk and 1 under network; across 10 JavaScript projects 28 under CPU, 0 under memory, 1 under disk, 1 under network. Python differed (2 CPU, 54 memory, 13 disk, 0 network across 12 projects), which the authors attribute largely to one project and to a 512 MB memory setting that was too small to start some projects' tests.
- The authors' mechanism: when CPU is unavailable (a weak machine, or contention in a multi-tenant setting), implicit assumptions about the latency of asynchronous operations can be violated and tests fail; RAFTs relate to the async-wait and concurrency causes of flakiness.
- Of the 283 RAFTs, 24 manifested in only one of the 15 throttled configurations, so most can be found without trying every configuration. The authors report that running tests with fewer resources is a cost-effective way to surface more flaky failures. Developers they contacted showed interest in fixing the tests or restricting runs to safer configurations.

## Limits
- Open-source projects with their own suites, not agent-driven runs; the throttles are container limits, not the contention of several agents sharing a machine. Failure counts come from 300 runs per configuration. The arXiv page says the work was submitted to IEEE for possible publication; I did not check a published version.
- I read the paper from the PDF text; the section on threats to validity was located but not read.

## Used in
- research/synthesis/field-6.md

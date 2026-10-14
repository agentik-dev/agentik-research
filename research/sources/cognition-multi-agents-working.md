---
url: https://cognition.com/blog/multi-agents-working
title: "Multi-Agents: What's Actually Working"
author: Walden Yan (Cognition)
published: 2026-04-22 (printed 04.22.26 on the blog index)
accessed: 2026-10-14
kind: reported
---

## What it says
- A follow-up written ten months after "Don't Build Multi-Agents" (see cognition-dont-build-multi-agents). The author says swarms of parallel writers still see little real adoption, and that a narrower class works: several agents contribute intelligence while writes stay with one agent. In his words: "multi-agent systems work best today when writes stay single-threaded."
- Coder and reviewer loop: Devin and a review agent iterate until most bugs are fixed before a person opens the pull request. The reviewer works best with no shared context beforehand: it reasons from the diff without the coder's accumulated context, which the author ties to avoiding context rot. A communication bridge lets the coder filter review findings against the user's instructions, to stop looping and out-of-scope work.
- Figure from the post: the review agent "catches an average of 2 bugs per PR" on pull requests Devin wrote, and about 58 percent of those bugs are severe (logic errors, missing edge cases, security holes). The post gives no method for these figures.
- Smart friend: a small fast primary model calls a stronger model as a tool. It underperformed with a weaker primary model and worked across frontier models. Open problems: when to escalate and how much context to share (forking the full context is the suggested compromise).
- Manager and children: a manager splits a large task, spawns child agents and coordinates them through an internal MCP server. Early problems: managers too prescriptive, agents assuming shared state that did not exist, children not reporting upward by default.
- Still failing: parallel writers that make conflicting implicit choices about style, patterns and edge cases, and unstructured swarms of negotiating agents.

## Limits
- A vendor describing its own product. The bug figures have no stated method and no single-agent comparison. April 2026.

## Used in
- research/synthesis/field-5.md

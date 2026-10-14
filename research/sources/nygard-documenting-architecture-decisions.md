---
url: https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions
title: "Documenting Architecture Decisions"
author: Michael Nygard (Cognitect)
published: 2011-11-15
accessed: 2026-10-14
kind: reported
---

## What it says
- Size: each record should be short and modular so that people will read and update it; the essay suggests about one or two pages, because large specification documents go stale and are rarely read.
- Numbering: records are numbered in sequence and a number is never reused, so one number names one decision for the life of the project.
- Format of five parts: a title (a short noun phrase), context (the technical, political, social and project forces, stated neutrally), decision (full sentences in the active voice, starting "We will"), status, and consequences (all results, good and bad).
- Status and superseding: a record is proposed while people are still deciding and accepted once they agree. If a later decision changes or reverses it, the old record is kept and marked deprecated or superseded with a pointer to its replacement; reversed decisions are not deleted, so the history stays.
- Storage and style: records live in the project repository as plain-text or Markdown files in a documentation directory, one file per decision. The essay prefers full sentences to bullet points and wants each record written as a conversation with a future developer.
- Experience report: the author says the format was used on several projects after August 2011, that developers who joined later valued the context, and that records kept in private repositories were easy for non-developers to read.

## Limits
- A 2011 blog post by one practitioner, written for human readers. It says nothing about a model reading the records at the start of each session, or about a cap on how many records are active.
- I read it through a summarising fetch of the page, so the wording here is paraphrase.

## Used in
- research/synthesis/field-8.md

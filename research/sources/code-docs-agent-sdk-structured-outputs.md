---
url: https://code.claude.com/docs/en/agent-sdk/structured-outputs
title: "Get structured output from agents"
author: Anthropic (Claude Code documentation, Agent SDK)
published: undated (read October 2026)
accessed: 2026-10-14
kind: documented
---

## What it says
- Agents return free-form text by default, which suits chat but not programmatic use. With structured outputs the caller supplies a JSON Schema (or a Zod or Pydantic model), the agent may use any tools, and the final result message carries a `structured_output` field that matches the schema.
- The SDK validates the output against the schema and re-prompts on a mismatch. If validation does not succeed within the retry limit, the result is an error with subtype `error_max_structured_output_retries`, not structured data.
- A result can have subtype `success` and still lack `structured_output`; the page says to treat that as a failure. A model fallback can also retract an already-completed output.
- The SDK validates against JSON Schema draft-07. The `format` keyword is accepted as an annotation and not enforced. Before v2.1.205 an invalid schema was silently ignored and the agent returned unstructured text.
- Tips: keep schemas focused, make fields optional when the information might not exist, and use clear prompts.

## Limits
- The page documents shape validation. It does not say anything about whether the claims inside a valid object are true; that is our reading, not a statement on the page.
- As of October 2026.

## Used in
- none yet. Read for question 9 but not cited in research/synthesis/field-9.md (size cap); a lead for the page draft.

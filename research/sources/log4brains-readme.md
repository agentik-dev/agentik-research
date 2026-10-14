---
url: https://github.com/thomvaill/log4brains
title: "Log4brains (README)"
author: The repository owner named in the URL (thomvaill) and contributors (public GitHub repository)
published: undated
accessed: 2026-10-14
kind: documented
---

## What it says
- A docs-as-code tool for architecture decision records: write records in Markdown in the repository, create them from the command line or an editor, and publish them as a static website with search and a timeline.
- The default template is MADR; the README says no Markdown structure is enforced, and no file numbering is required, which the README says avoids merge conflicts. Its examples use date-prefixed file names.
- Record metadata is inferred from the text and from the git log. The README lists the commands `init`, `preview`, `adr new` and `build`, and mentions no validation step and no limit on size or on active records.

## Limits
- I did not check status values or the date-prefix convention beyond the examples.

## Used in
- research/synthesis/field-8.md

# Brief for a tool-page rewrite in the story shape (phase 3)

Machine lane. Read it whole before you start. You rewrite ONE page, named in your prompt, in this repo (work from its root). Write only that page; read anything.

## The shape (respeak's README is the model: read `.sources/agentik-respeak/README.md` lines 1-70 first)

```
# agentik-<tool>

<lede: one short paragraph, the answer first: what the tool does, for whom, and how far its evidence goes (our use, one owner).>

## The problem
<In the reader's terms, one short paragraph. Then the repo's own record of the failure, from the current page's "The problem, as the repo records it": keep every claim and footnote.>

## A human example: <three to six words>
<The example from outside software your prompt names, from its source note in research/sources/, with exact figures and a footnote. Two or three short paragraphs. The last sentence ties it to the tool's mechanism in one line, plainly, with no claim the source does not make.>

## What the research teaches
<From the current page's "What part 1 says": what part 1 supports and contradicts, linked to the field chapter(s). Keep every claim and footnote.>

## The approach
<The design (from "The design"; keep the Mermaid diagram if there is one) and why this design over the alternatives (from "Alternatives the repo rejected"). Keep every claim and footnote. Sub-headings (###) are fine.>

## Does it work?
<div class="ak-verdict" markdown>

<span class="ev ev-our-use">our use</span> <one or two sentences: the evidence's level and its size, as plainly as respeak's "One field test (n=1)".>

</div>
<Then the evidence: tests, field runs, counts, from the current page. Say what is NOT measured.>

## What has not worked, and what is open
<From "What is open" and any failure the page records. Keep every claim and footnote.>

## From the journal
<keep the existing section exactly as it is>

## Sources
<every footnote definition the page uses, and no other>
```

## Rules

- **Keep every claim.** Move sentences between sections; tighten wording; do not drop a claim, a number or a footnote unless the same claim stays elsewhere on the page. Do not add a claim that has no source. The only new sources are the human example's notes your prompt names (opened this session; their front matter gives url, title, author, published).
- **Footnotes:** `[^key]` in the text; definitions under `## Sources` as `[^key]: <author or repo>, "<title>", <date>, <URL>.` Every definition is used and every reference is defined (`python3 scripts/check` checks this). Keep existing keys.
- **Evidence levels** where a claim could be contested: measured, documented (dated as of October 2026), reported, our use, conjecture. In running text a pill is `<span class="ev ev-measured">measured</span>` (classes: `ev-measured`, `ev-documented`, `ev-reported`, `ev-our-use`, `ev-conjecture`). Use pills in the verdict box and where a section turns on its level; do not pill every sentence.
- **Voice (respeak, technical mode, peer engineer):** the conclusion first, short sentences, active voice, concrete words, second person for advice and present tense; the owner's work in the first person plural ("we built") only where it reads naturally. No filler openers, no hype, no closing summary. Never say a tool is proven. Avoid em-dashes; use colons, commas or full stops.
- **Never name anything private:** no private repo, product, host, domain, path, device, household or person other than a published author. Repo sources may name the owner's private products: describe them generically ("a Go infrastructure product driven by nightly unattended runs").
- **Tool names:** write `agentik <tool> <verb>` in code spans; never the bare tool name followed by a verb inside a code span, and never a hyphenated old name (the hygiene scan's `renamed` group fails on them).
- **Links:** relative Markdown links to `.md` files (`../field/review.md`, `../journal/posts/<file>.md`).

## When done

Run, from the repo root, and fix until all pass:

```sh
python3 scripts/check
RESPEAK_PYTHON="$(command -v python3)" bash .sources/agentik-respeak/plugin/scripts/respeak-check.sh <page>
python3 .sources/agentik-commons/scripts/hygiene --repo . | tail -2
python3 -m mkdocs build --strict --quiet
```

Report in at most 150 words: the sections and their order, the human example used, any claim you dropped or could not place (there should be none), and the four checks' last lines.

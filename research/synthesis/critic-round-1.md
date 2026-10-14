# Critic round 1 (phase 6), the reports

Machine lane. The critics' reports, verbatim, read from the shots of commit a22116f in `.cache/wt2/.cache/shots/`. The polish fixer works from this file.

## Home and summary (index, summary, 404): FAIL

1. Stray comma before footnote marks (index, summary; every width, both schemes). It shows as ",6", ",7", ",10" and so on in nearly every finding. The rule at docs/assets/stylesheets/agentik-site.css:164, `sup[id^="fnref"] + sup[id^="fnref"]::before`, fires on any two footnote marks with only text between them, because `+` skips text nodes.
2. Category pills are all grey (index, journal cards, all widths, both schemes). Worked, Did not work and Open look the same. `.md-typeset .ak-cat` at line 478 outranks `.ak-cat-worked`, `.ak-cat-did-not-work` and `.ak-cat-open` at lines 491-493.
3. Card date line splits (index, all widths). "· 8 min read" sits alone on its own line. The cause is `.md-typeset .ak-post time { display:block }` at line 449.
4. Footnotes are numbered in definition order. On the summary, the first marks read 30, then 48, then 1, and line 23 of docs/summary.md shows "28,27". On the home page they read 1, 4,5 … 2,3. Fix at mkdocs.yml:101, `footnotes`.
5. 768 light/dark, index. The Part 2 label wraps to two lines, so "The tools" sits lower than the other two door titles (`.ak-door .ak-door-kicker`, docs/index.md:33). The journal cards fall into two columns plus one alone (`.ak-posts` minmax(15rem)).
6. 1280/1680, index. Three different right edges: the hero and doors run full width, the findings cards stop at measure+8rem (line 274), and the prose stops at the measure.
7. Copy. Two sentences read badly on first pass: "No independent study found measures" (docs/index.md:56) and "first review found numbers two repositories stated wrongly" (docs/index.md:81). The tool count disagrees: the home page says "five tools and a front door" (docs/index.md:33), the summary says "six agentik tools" (docs/summary.md:3). The Part 3 counts at docs/summary.md:37 are hard to follow.
8. 390. Bad line breaks in "2026-10-/14", "4/KB" and `stream-/json`.
9. Links and axe. No broken internal links. The repository link https://github.com/agentik-dev/agentik-research returns 404 on all three pages (the repo is private until the owner publishes it), and so does the summary's blob/25e72df link. Axe finds nothing on index, summary or 404 in light or dark.

## Journal (index, six entries, archive, categories): FAIL

Site CSS means docs/assets/stylesheets/agentik-site.css.

1. All six entries, at 390 and 768 in both schemes: no date, categories, reading time or "Back to index" is shown. They sit only in `.md-sidebar--post`, which Material hides below 1220 px.
2. Every entry, and the Restart card on the list pages, at all widths: a stray comma appears before footnote marks ("ruling.,7", "facts.,10,1"). The cause is site CSS:164, `sup[id^="fnref"] + sup[id^="fnref"]`, which also matches two marks with text between them.
3. Every entry, at all widths: the related-page pills stack in an indented column instead of a row. `.md-typeset .ak-related` (site CSS:517-518) loses to Material's `.md-typeset ul:not([hidden])` (flow-root) and to `[dir=ltr] .md-typeset ul li` (margin-left).
4. living-inside-a-usage-window: the status-line example (posts/2026-10-14-living-inside-a-usage-window.md:37) is cut at "(1h12" at 390. At 1280 the copy button covers "· 7d". Nothing shows that it scrolls.
5. Archive and all three category pages, at all widths: the first screen is a bare H1 ("2026", "Worked") over cards. Nothing says what the page lists. Their meta description is the site default.
6. Sources lists in the probe entry (after note 6) and the wake entry (after note 7), at 1280: there is an empty line where hidden `a.footnote-backref` icons wrap.
7. Restart entry, posts/2026-10-05-restart-dont-compact.md:12: notes are numbered in definition order, so the opening paragraph and its card read ¹ then ⁷.
8. Minor: entry sidebars show categories as plain text, not chips (site CSS:496). Cards at 390 leave a "·" dangling at a line end.
9. Axe and links: no serious or critical violations. All 11 pages have a moderate landmark-unique violation (`.md-post > .md-nav--primary.md-nav` and `nav[aria-labelledby="__nav_5_label"]`). No broken internal links. The external GitHub links to agentik-dev/agentik-research return 404 on every page (private repo).

All six entries have the six story parts.

## Field (index and seven chapters): FAIL

1. All 8 pages, all widths, both schemes: a stray comma appears before about 92 footnote marks ("rule.,⁶", "summary.,¹⁷"). Cause: `sup[id^="fnref"] + sup[id^="fnref"]::before` (agentik-site.css:164). The `+` selector skips the text between two marks.
2. Length, memory and unattended at 390, both schemes: four-column tables shrink to columns about 90 px wide. The screen edge cuts the Evidence pills ("doc", "mea"). The tables scroll, but nothing tells the reader. `.md-typeset table:not([class])` needs a min-width.
3. Index, all widths and schemes: the evidence legend shows as an indented column, not one row. `.ev-legend` (agentik-site.css:262-263) loses on specificity to Material's `ul:not([hidden]){display:flow-root}` and `[dir=ltr] .md-typeset ul li{margin-left}`.
4. Unattended at 1280 and 390, both schemes: inline code breaks at hyphens ("-"/"p", "--"/"bare", "--max-"/"turns"). `.md-typeset code` (agentik-site.css:166) needs `white-space: nowrap`.
5. Review at 1280, both schemes: ". ¹,³" wraps onto its own line after a pill (review.md:50-51). The same happens at unattended-and-guardrails.md:99.
6. Light scheme: the "our use" pill measures 4.0-4.25:1 on the lower part of the background gradient, and "reported" 4.4:1. Both are under 4.5:1. The colour is `--ak-ev-our-use` (skin agentik.css:85). Axe cannot check text on a gradient, so it misses this.
7. Memory h1 at 1280; length h1 and the "Question 4" and "Practices" h2s at 390: the hidden ¶ link wraps onto a blank second line, which leaves an uneven gap. Footnote back-links do the same in Sources.
8. Chapter shape varies: many-agents has no limits card and no "From the journal"; memory has no limits card. many-agents.md:37-42 writes "Measured." in plain text instead of pills. telling-people.md:5 repeats line 14.

Axe finds no violations and there are no broken internal links. The header link to the GitHub repo returns 404 on all 8 pages (private repo).

## Practices, method, glossary, sources: FAIL

1. Practices and method, every width, both schemes. A stray comma appears before every footnote mark after the first one in a paragraph: "work,,2", "progress.,4", "length;,14". The cause is assets/stylesheets/agentik-site.css:164 `sup[id^="fnref"] + sup[id^="fnref"]::before`. The `+` combinator ignores the text between the two marks.
2. Sources at 390, both schemes. The browse shows only the Source and Author columns. Year, Evidence, Kind and Cited on are off-screen inside a scroll box 78vh tall, nested in the page's own scroll. agentik.js registers only the table view, so the vendored glass-cards.js goes unused. Kit defect: `.gb-scroll{max-height:78vh}`.
3. Sources, every width. The "as of 2026-10-14" stamp is about 9 px tall and has 2.8:1 contrast in light, 3.9:1 in dark. `.gb-asof` uses `--glass-faint` (assets/glass/skins/agentik.css:67,168). axe did not flag it.
4. Practices, every width, both schemes. The evidence legend is stacked and indented instead of one row. `.ev-legend` (agentik-site.css:262-263) loses to Material's `.md-typeset ul:not([hidden])` and `[dir=ltr] .md-typeset ul li`.
5. Method, every width. The page reads as a status log: "still in progress", "Not yet run", "Still to come" (method.md:3,45-46,52). The first screen uses "sitting", "refute round" and "RESPAWN" without explaining them.
6. Sources text. The page speaks in the agent's first person: "I did not open", "I extracted", "the page I read" (sources.md:37,49,99,220). Without JavaScript, "Loading the browse…" never clears (sources.md:13).
7. Sources at 1280 and 1680, light. `hide: [toc]` lets prose lines run 130 to 170 characters.
8. Practices at 390. The tables scroll but squeeze columns to about 100 px. The Tool column is off-screen with nothing to show the table scrolls. Inline code breaks mid-word, as in "onFailur e" (practices.md:37,44). At 390 and 1280, ";20,21,22" wraps to a new line after a pill (practices.md:45,53,60).
9. Glossary. The 46 terms have no anchors, so no single term can be linked. "Pin" and "wall" are used but never defined.
10. Reports. axe shows no violations on these four pages, and there are no broken internal links. The header repository link (all four pages) and 16 links on method and sources go to the site's own GitHub repository and return 404 (private repo).

## Tools (index and six pages): FAIL

1. Four Mermaid diagrams are unreadable, at every width, in both schemes. The diagrams in relay (relay.md:52), decisions (decisions.md:45), respeak (respeak.md:48) and agents (agents.md:63) shrink to fit the column. Node text is about 2-3 px at 390 and 4-7 px at 768, 1280 and 1680. The `.md-typeset .mermaid` rule (agentik-site.css:193) has no overflow or minimum width. Fix: draw them top-down with fewer nodes, or let them scroll. The session diagram is legible.
2. A stray comma sits before about 69 footnote marks on all six pages, at all widths, in both schemes (agentik-site.css:164).
3. Tables clip at 390, both schemes. The tools index problem table (index.md:9) is 452 px wide and 2,039 px tall, with one or two words per line. Its version column is cut off and nothing shows that it scrolls. In agents, the "Three lanes" table is 445 px wide and its entry-point code is clipped.
4. agents has no "From the journal" section, so its story shape is incomplete.
5. Two ledes run long and open with commit bookkeeping. agents.md:3 is 147 words and session.md:3 is 123 words, against the brief's "one short paragraph". At 390 most of the first screen is commit hashes.
6. decisions.md:19 reuses relay's surgical-checklist example (relay.md:20) as a second human example.
7. Minor: footnote marks appear out of order, for example "12,14,13" and "1,11,12,10". respeak.md:34 has an empty header cell, which axe flags as `empty-table-header` (minor).

Clean: verdict boxes and evidence pills use the glass tokens and read well in both schemes; diagram colours follow the skin in dark; no heading skips a level; no serious or critical axe violation; no broken internal link (the header repo link 404s: private repo).

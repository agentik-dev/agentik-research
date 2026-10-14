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

# Critic round 2 (phase 6, the last), the reports

Machine lane. Read from the shots of commit 744382e in `.cache/wt2/.cache/shots/`. The last polish fixer works from this file; no third critic round follows.

## Home and summary: PASS

All nine round-1 findings fixed (the Part 2 kicker still wraps at 768). New, all polish:
1. summary, all widths: docs/summary.md:47 promises "each with what failed". The bullets at :50, :53 and :54 say what was built, not what failed.
2. index, 768-1680, both schemes: the subgrid fix (agentik-site.css:519-524) leaves an empty band under the one-line title "A wake that cost a turn". It also leaves one under the Field and Journal kickers, because the Part 2 kicker (docs/index.md:33) wraps.
3. index and summary: dates come in three formats. Cards show "October 14, 2026", prose uses ISO dates, and summary.md:3 says "October 2026". Spelling is mixed too: "summarizes" at index.md:61, "summarises" at summary.md:16.
4. index cards: the Open chip comes first only on living-inside-a-usage-window.md:5-6.
5. summary, 1280 and 1680: the left sidebar holds a single item, and the page has no description of its own.
6. Copy: "in ten lines" (summary.md:13), but the items run two to five lines each. "A key replaces the login" (:24) and "window hit" (:32) are unclear.

## Journal: PASS

All nine round-1 findings fixed. New, all polish (CSS is docs/assets/stylesheets/agentik-site.css):
1. All six entries, 768, light and dark: the separator before the chips is a low ".", not "·" ("7 min read . Worked"). The dot rule (CSS:603, `.ak-entry-meta > * + *::before`) lands on `.ak-entry-cats`, which is `inline-flex` (CSS:605).
2. Five entries, all widths: 13 note clusters are out of order ("14,11", "12,1"). Two misread as numbers: "Mythos 5.1.⁵,²" (wake.md:30) and "as 10.²" (two-lanes.md:24). overrides/hooks/footnote_order.py renumbers notes but does not sort adjacent marks. agentik.js:162 adds the comma, so without JS the marks run together ("1411").
3. Usage-window and wake entries: internal codes are unexplained: "level S3" (living.md:66), "(S27a)" (:40), "packet S30" (:68; wake.md:57, 65), "since S21" (wake.md:63). Only the ledger entry defines the S levels.
4. List pages, 390 and 1280 light: the usage-window card lists Open before Did not work (living.md:5-6). The other two cards list Did not work first.
5. Journal index: the meta description is the site default. docs/journal/index.md has no `description`.
6. Entries, 1280, both schemes: a flat band sits behind "Back to index" and "Table of contents". It is Material's `.md-nav__title` background; CSS:89 sets only its colour.

## Tools: FAIL

Round 1: diagrams mostly fixed (text 11 px or more, wide ones scroll with an edge fade; relay still overflows); commas fixed; index and agents tables fixed; agents From the journal fixed; ledes fixed (session 71 words, agents 80); 6 skipped (NICE_TO_HAVE); 7 still open: 42 groups of footnote marks out of order, for example decisions.md:40 "14,16,7", session.md:40 "22,23,2,24", index.md:76 "12,1". The empty header is fixed.

New, worst first:
1. relay at 768 and 1280, both schemes: the diagram scrolls 22 to 35 px. The fade (agentik-site.css:194) erases the card's right border and the "Red: gate unrun" box at desktop width. relay.md:52 still draws about 1,010 px wide, and agentik.js:306 (MIN_SCALE) floors it at 728 px in a 706 px column. agents does the same at 390 (19 px).
2. 390, both schemes: three-column tables wrap one to three words a line. The respeak.md:90 table is 1,824 px tall and the relay.md:86 table 1,128 px. agentik-site.css:214 sets a minimum width only for tables of four or more columns.
3. 390: the decisions and relay diagrams open on a side branch, with the start node off-screen right ("A fork the design" shows as "A fo").
4. respeak, all widths: the hook's arrow runs through the cluster title "Machine lane: agent to agent" (respeak.md:48).
5. respeak.md:3: the lede is now the longest at 115 words and ends on commit bookkeeping.
6. agents, 768 to 1680: the diagram sits at the left of its card; the others are centred.

## Field: FAIL

Round 1: 1, 2, 3, 5, 6 (light pills 4.59 to 5.0:1) and 7 fixed; 4 fixed except code over 40 characters still breaks at a hyphen (unattended-and-guardrails.md:28, at 390); 8 partly open: many-agents has no "From the journal" (no entry links it: leave), and telling-people.md:5 repeats line 25 word for word.

New, worst first:
1. Every page, light, all widths: inline-code chips are invisible. `--md-code-bg-color` #f1eee6 (docs/assets/glass/skins/agentik.css:123) is 1.04:1 against the canvas. The 0.3em padding (agentik-site.css:180) then reads as stray spaces: "with /resume .", "(commit ba78699 )", "check /status .".
2. Budgets, 768 light: the five-column lanes table scrolls 72 px, and the fade hides its Evidence pills. The table fits without the 8rem cell minimum, but that rule applies up to 959 px (agentik-site.css:213-214).
3. Length, memory and unattended, 390, both schemes: the same rule makes every column 160 px wide, so Result is no wider than Study. Length's first table runs 2196 px tall, and the Evidence pills sit off-screen. A min-width on the whole table would read better.
4. Many-agents, Sources, all widths: footnote 14 shows literal backslashes, `isolation: \"worktree\"` (many-agents.md:89).
5. Many-agents limits card: its first bullet is notes, not a sentence (many-agents.md:55).

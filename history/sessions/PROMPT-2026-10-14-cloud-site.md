# The site sitting: a polished public site of what the owner is learning about long-running Claude Code work

The brief for a Claude Code cloud session that turns this repo's research into a polished GitHub Pages site. Read it whole once at the start of each session; after that, read it by section.

## Start

1. `cd` into this repo's checkout (the one holding this file). Work from its root.
2. Run `make setup`. It links the agentik-dev repos under `.sources/`, installs the Python packages and, once phase 0 has added them, the npm packages. The environment's setup script has already installed Chromium for Playwright 1.64.1 under `$PLAYWRIGHT_BROWSERS_PATH`, the system libraries for social cards, and the Python packages `mkdocs-material[imaging]` and `mkdocs-rss-plugin` (phase 0 adds them to `requirements.txt`). If a step fails, write the failure in the charter, then go on with what works.
3. Read the newest `history/sittings/*-research.md`, the charter. Do its **Next act**. Keep going act by act until the charter says **Done** or a **RESPAWN** point comes (see "Budget and handoff").

## Your job

The first sitting (`PROMPT-2026-10-13-cloud-research.md`, merged as pull request #1) researched the field and wrote twenty cited pages. They are accurate and dense, and they read like a report. This sitting makes them a site an engineer wants to read and come back to:

1. **The look.** Rebuild the site on the owner's glass design system, vendored in `docs/assets/glass/`, with a new skin of its own. It must look as finished as a good product's documentation, in light and dark, from a phone to a wide screen.
2. **The stories.** Add a journal of dated narratives: what the owner tried, what worked, what did not, and what changed because of it. The site is an evolving exploration. The journal is where it evolves, and each new lesson becomes a new entry.
3. **The shape.** Rewrite the home page, the summary and each tool page in the shape of respeak's README (see "The story shape"), so a reader meets the problem and a human example before the mechanism.
4. **The publish.** Build and deploy to GitHub Pages at `https://agentik-dev.github.io/agentik-research/` from a workflow on `main`.

The reader is the same: an engineer who uses Claude Code and has not seen these tools. The citations, the evidence levels and the honesty about limits stay. Polish never buys a claim its source does not make.

## Never

Everything under "Never" in `PROMPT-2026-10-13-cloud-research.md` still holds: write only in this repo; name nothing private; never invent a source, a quote or a number; quote at most two sentences from one source; never force-push, rewrite history or push to `main`; never overstate the tools. Also:

- **Never edit the vendored files** `docs/assets/glass/glass.css`, `glass-browse.js` and `glass-cards.js`. Re-theme through tokens in `docs/assets/glass/skins/agentik.css`; site-specific components go in `docs/assets/stylesheets/agentik-site.css`. If the kit itself has a defect, write it in `NICE_TO_HAVE.md`.
- **Never load a third-party font or script at run time.** The Inter fonts are self-hosted in `docs/assets/glass/fonts/`; set `theme.font: false`. Mermaid is the one exception Material already bundles.
- **Never name the owner's private projects in a story.** "The owner's record" below gives each fact with a generic name to use.
- **Never turn a story into an ad.** Each one says what failed, and what is still open, as plainly as what worked.

## Sources

Everything in the first brief's "Sources" section, plus:

| source | what it holds |
|---|---|
| `docs/assets/glass/` | the vendored kit: `glass.css` (tokens and components), `glass-browse.js` (faceted browse over a JSON list), `glass-cards.js` (card renderer for it), and the Inter fonts. Each file's header comment documents its use |
| `design/glass/style.md` | the design system's look, in the words of its React reference: tokens, density, the filter bar, the table |
| `design/glass/browse.md` | the faceted-browse design: the URL contract, accessibility, performance |
| `design/glass/example-skin.css` | one consuming site's token-only skin, as a worked example |
| `.sources/.github` | the agentik-dev organization profile and its pixel-art agent icon, for the favicon, the logo and the social card |
| `.sources/agentik-respeak/README.md` | the model for the story shape |
| "The owner's record", below | the facts from the owner's private repos; cite them as `agentik-dev/agentik-research`, this file's path and section, at the commit you read |

## The site

Build on MkDocs Material as now. Decide anything not stated here yourself, and log it in one line in the charter.

- **Layers,** in this order in `mkdocs.yml`: `assets/glass/glass.css`, `assets/glass/skins/agentik.css`, `assets/stylesheets/agentik-site.css`; scripts `assets/glass/glass-browse.js`, `assets/glass/glass-cards.js`, then the site's own config script. `theme.palette` primary and accent `custom`; `theme.custom_dir: overrides` for the home page template and the social card layout.
- **The skin** has its own identity, distinct from the example skin but on the same glass bones: one interactive accent, a quiet layered canvas, and a small semantic palette for the five evidence levels (measured, documented, reported, our use, conjecture) used the same way on every page.
- **The home page** opens with a hero that says in two sentences what this is and who it is for, then three doors: the field, the tools, the journal. Below them: the five findings, and the three newest journal entries.
- **The journal** uses Material's built-in `blog` plugin under `docs/journal/`, with dates, categories (worked, did not work, open), reading time and an RSS feed (`mkdocs-rss-plugin`). Each entry links to the field pages and tool pages it draws on, and they link back.
- **The sources page** becomes a faceted browse with `glass-browse.js`: a JSON list written by `scripts/sources-page` with each source's kind, evidence level, question and year, filterable and searchable. Keep the generated Markdown list for search engines and for readers without JavaScript.
- **Diagrams** are Mermaid, themed from the skin's tokens, and drawn only where they show a mechanism.
- **Social cards** come from Material's `social` plugin, with the agentik icon and the skin's colours.
- **Polish:** `navigation.instant`, `navigation.tabs`, `navigation.path`, `content.tooltips`, abbreviations from one `includes/abbreviations.md`, a 404 page in the site's voice, and a favicon from the agentik icon.
- **Deploy:** `.github/workflows/pages.yml` builds with `mkdocs build --strict` and deploys with `actions/deploy-pages` on push to `main`. Set `site_url`. The repo is private now; the owner turns Pages on and makes the repo public after the private-term scan.

## The story shape

respeak's README is the model. Read it before writing any story or rewriting any tool page. Its order:

1. **The problem,** in the reader's terms, in one short paragraph.
2. **A human example** that teaches the mechanism from outside software, with a cited study or source. respeak's is the reference-game experiment: two people describing an abstract picture start at about forty words and finish, six rounds later, at two ("the skater"), and outsiders can no longer follow.
3. **What the research teaches,** linked to the field page that holds the evidence.
4. **The approach:** what the owner built or changed, and why this design over the alternatives.
5. **Does it work?** The evidence with its level and its size, stated as plainly as respeak's "One field test (n=1)".
6. **What has not worked,** and what is still open.

Every journal entry and every tool page follows it. The home page and the summary stay bluf: the answer first.

## The journal entries

Write at least six. The first is required as described; for the rest, draw on the internal survey in `research/synthesis/tools-*.md`, the repos' `NICE_TO_HAVE.md`, `design/` and packets, and the owner's record. Suggested:

1. **The ledger that ran away** (required): a decision ledger grew past four hundred entries because nothing in it said which entries mattered. Severity levels, a sign-off bar and a cap were the fix. Facts in the owner's record. The human example could be hospital triage or a bug tracker's severity field; pick one you can cite.
2. **Restart, don't compact:** a sitting that writes a 4 KB charter and starts fresh, instead of compacting.
3. **A wake that cost a turn:** 581 of 614 self-paced wakeups took a turn of their own, and 77 fired (`agentik-session`, `design/packets/s21-priority-default.md`, section 1).
4. **The probe that stopped a night:** a reviewer's hand-built binary replaced a running night's lock file, and the night stopped (`agentik-relay` `NICE_TO_HAVE.md` and `design/`, under `lock-moved`). What it taught about guardrails.
5. **Two lanes:** agents drift into shorthand; respeak's answer and its one field test.
6. **Living inside a usage window:** pacing work to a five-hour usage band and a weekly reset (`agentik-session` band target; `agentik-relay` band pacing design).

## The owner's record

Facts from the owner's private repos, read on 2026-10-14. Cite this section; the evidence level is **our use**. Use the generic names given here.

- **Too many questions (2026-09-22).** One unattended run's builders each left three to six "decide, owner" items in their handovers. Across twenty sittings that became one brief of 50 questions of implementation detail: field names, exit-code mappings, environment variables, JSON key case. The owner ruled all 50 "as recommended" and said: "these decisions are way too granular for where we are at. I'd rather you build something that we can iterate on within a well done design." The rule since: decide inside the design of record, log the choice, and escalate only a fork the design cannot settle.
- **The ledger (2026-09-25 to 2026-10-14).** On 2026-09-25 one commit wrote 322 review rulings into the owner's home-infrastructure ledger, sorted by domain. By 2026-10-14 the old part of that ledger held 401 entries in about 15,700 words. 385 of them carry a review-round tag, and 346 come from a single review series. The entries carried no level, so a reader could not tell which of them mattered. On 2026-09-29 the ledger took one entry shape with at most 25 entries in force, and the old text went below a legacy marker (`agentik-decisions` README, "At most 25 entries are in force"; `design/d17-four-verbs.md`).
- **The review spin (to 2026-10-05).** In a Go infrastructure product driven by nightly unattended runs, about 40 percent of 72 queued rows added no capability: fixes, repairs and retries. Five of the six rows queued for the next night were fixes. For about four weeks, reviews created findings and findings created rows. The owner's ruling: each component gets a sign-off bar; once it is met, a finding becomes work only as a reproduced correctness or safety bug; a review blocks only on an unmet acceptance criterion, a bug or a failing test, or a conflict with the ledger; at most two review rounds; and every finding is placed against the build order, never first by default.
- **The levels (2026-10-10).** The owner asked for priority levels, and `agentik-session` shipped them: S1 harm, S2 blocks the goal, S3 the build order, S4 the rest; the next act takes the highest ready, and at most one S4 item a sitting (`design/packets/s21-priority-default.md`).
- **What is still open.** The levels are rules in the prompt, and no hook enforces them (the same packet, ruling 4). The 401 legacy entries still bind and still cost a reader's time; they move into the new shape only when each repo's ledger is folded.

## Method (phases)

Each phase ends with a commit, a push of this session's branch and the charter brought current.

0. **Setup.** `make setup`; `make check` on `main` passes. Add `package.json` with exact pins `playwright@1.64.1`, `@axe-core/playwright@4.13.0` and `linkinator@8.1.0`, and its lock. Add Make targets: `shots` (a Playwright script: every page at 390, 768, 1280 and 1680 px wide, light and dark, into `.cache/shots/`), `a11y` (axe on every page into `.cache/a11y.json`; fail on a serious or critical violation), `links` (linkinator over `site/`; fail on a broken internal link, list external failures in `.cache/links.txt`). `make check` gains `a11y` and `links`. Add `docs/assets/glass/fonts/OFL.txt`, Inter's licence, fetched from the rsms/inter repository.
1. **The skin and the frame.** The layers, the skin, the overrides, the home page template, the nav, the favicon and the social cards. Take shots; read them yourself; fix until the frame holds at every width in both schemes.
2. **The journal.** The blog plugin, the RSS feed and the six entries, each drafted in `research/synthesis/journal-<slug>.md` first, then written in `docs/journal/`.
3. **The shape.** Rewrite the home page, the summary and the six tool pages in the story shape. Restyle the field pages and the practices page with the skin's components (evidence pills, cards, admonitions) without changing their claims.
4. **The sources browse.** The JSON from `scripts/sources-page`, the browse page and its config script.
5. **Refute.** A `refuter` on every new or rewritten page; two rounds at most. Fix every unsupported or leaking line.
6. **Polish.** `make shots`, then a `critic` on each group of pages (home and summary; journal; field; tools; practices, method, glossary and sources). At most two rounds. Then the `editor` on every new or rewritten page; `make style` passes.
7. **Publish.** The Pages workflow; `make check` passes; rewrite `README.md` (what the site is, its address, how to build it, the licences); mark the pull request ready with a bluf summary and three screenshots.

## Voice (respeak)

As in the first brief's "Voice" section. The journal is technical mode in the first person plural for the owner's work ("we tried"), and plain about failure. Add `docs/journal/**` to the respeak gate's include if it is not already covered by `docs/**/*.md`.

## Helpers

`researcher`, `refuter` and `editor` as before, and `critic` (`.claude/agents/critic.md`): a read-only visual and reading review of the screenshots. If an agent type does not appear, start a general-purpose agent with the agent file's body as the first part of its prompt. Run at most four helpers at once. Read their reports, not their transcripts. Look at the screenshots of the home page and one page per section yourself after every polish round.

## Checks

`make check` runs `structure`, `style`, `hygiene`, `site`, `a11y` and `links`, and all must pass before a push. Update `scripts/check` for the journal: blog posts are not in the nav, and each post needs front matter with a date and at least one category.

## Git

As in the first brief: commit each act with a message that says what landed; push this session's branch after `make check` passes; never amend a pushed commit or force-push. Open a draft pull request titled "The site: the glass look, the journal and the story shape" when phase 1 lands. The owner merges it.

## Budget and handoff

As in the first brief: the charter under 4 KB and current at every commit; at about 60 percent of the context window, finish the act in flight, write a Next act that starts `RESPAWN:`, commit, push and stop, and tell the owner: "Start a new cloud session on this branch with the same start line." Never re-read a screenshot set you have already reviewed; read the newest.

## Done

The site is done when the frame holds in the shots at every width in both schemes; the journal has at least six entries in the story shape; the home page, the summary and the tool pages are rewritten; the sources page browses; every new or rewritten page has had a refuter round, a critic round and an editor pass; `make check` passes; the Pages workflow builds; the draft pull request is marked ready; and the charter's Next act reads `Done: the owner reviews the pull request, turns Pages on and makes the repo public.`

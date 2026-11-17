# agentik-site

A public research site on long-running and multi-agent Claude Code work, and on why the agentik tools exist. Once the owner turns on GitHub Pages it lives at <https://agentik-dev.github.io/agentik-site/>.

The site answers three questions. What goes wrong when a Claude Code session runs for hours or days, or when many run unattended, and what the evidence says helps. Why each agentik tool exists: the problem, a human example, the design, the evidence, and what is still unproven. And which practices follow, each tied to its evidence and to the tool that automates it, if one does. A journal of dated entries tells what the owner tried, what worked, what did not, and what changed because of it.

Every claim carries a footnote to a source opened when its page was written. Every contested claim carries an evidence level: measured, documented, reported, our use or conjecture. Vendor facts are dated. The tools are young and used by one owner, and the site says so.

## Build

```sh
make venv    # once, with pyenv: the virtualenv .python-version names, with requirements.txt
make setup   # .sources/: the agentik-dev repos, read-only; the Python and npm packages
make check   # structure, respeak's style gate, the hygiene scan, mkdocs --strict, a11y, links
make serve   # http://127.0.0.1:8000
make shots   # every page at 390, 768, 1280 and 1680 px, light and dark, into .cache/shots/
```

`make setup` links an attached checkout of each agentik-dev repository under `.sources/`, or clones it shallow from GitHub, and installs the packages `requirements.txt` and `package.json` pin. Where pyenv is installed, `make venv` creates the virtualenv `agentik-research` on Python 3.12.7 and installs the Python packages into it, `make setup` runs it, and every target uses its python; elsewhere they use `python3`, and `PY=<path>` overrides either. The a11y, links and shots checks need Chromium for Playwright: `npx playwright install chromium` fetches it, and on a machine that has one already, `CHROMIUM=<path>` points at it. `make check` must pass before a push, and the pull request workflow runs it.

`.github/workflows/pages.yml` builds the site with `mkdocs build --strict` and deploys it with `actions/deploy-pages` on every push to `main`.

## Layout

| Path | What it holds |
|---|---|
| `docs/` | The site: `index.md`, `summary.md`, `field/` (part 1), `tools/` (part 2), `practices.md` (part 3), `journal/` (the dated entries), `method.md`, `glossary.md`, `sources.md` |
| `docs/assets/glass/` | The vendored glass kit (`glass.css`, `glass-browse.js`, `glass-cards.js`, the Inter fonts) and the agentik skin in `skins/agentik.css` |
| `docs/assets/stylesheets/`, `docs/assets/javascripts/` | The site's own components and its config script, which registers the sources browse |
| `overrides/` | The home page, 404 and blog templates, the newest-entries partial, the social card layout, and two MkDocs hooks: one numbers footnotes in reading order, one gives glossary terms their links |
| `research/sources/` | One note per source: what was opened, when, and what it says |
| `research/synthesis/` | The internal survey per tool, the external survey per question, the journal outlines, and the site sitting's briefs for fixers and the critics' reports |
| `research/OUTLINE.md` | Each page's claims in order, with sources and evidence levels, from the first sitting |
| `research/prompts/` | One prompt per agentik repository, listing the numbers and claims the survey found wrong or unsourced |
| `research/screenshots/` | The screenshots each sitting's pull request shows |
| `history/` | The briefs and the sitting charters |
| `scripts/` | `sources` (links the source repos), `check` (the structural checks), `sources-page` (writes `docs/sources.md` and `docs/assets/data/sources.json` from the notes; regenerate them, never edit them by hand), and the shots, a11y and links checks |
| `.claude/` | The four helper agents and respeak's project configuration |

## Licences

The site's text and code are MIT, as for the other agentik-dev repositories; see `LICENSE`. The Inter typeface in `docs/assets/glass/fonts/` is under the SIL Open Font License 1.1; see `docs/assets/glass/fonts/OFL.txt`. The glass kit is vendored from the owner's glass design system, version 2.1.0. The agentik icon comes from the organization profile, [agentik-dev/.github](https://github.com/agentik-dev/.github).

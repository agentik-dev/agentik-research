# agentik-research

The public research site on long-running and multi-agent Claude Code sessions, and the reasons behind the agentik tools. It answers three questions: what goes wrong when a Claude Code session runs for hours or days, or when many run unattended, and what the evidence says helps; why each agentik tool exists, with the problem, the design, the alternatives and what is still unproven; and which practices follow, each tied to its evidence and to the tool that automates it.

Every claim on the site carries a footnote to a source that was opened when the page was written. Every contested claim carries an evidence level: measured, documented, reported, our use, or conjecture. Vendor facts are dated. The tools are young and used by one owner, and the site says so.

The site's source is in `docs/` and builds with MkDocs Material. The research behind it is in `research/`: one note per source in `research/sources/`, the working syntheses in `research/synthesis/`, and the outline in `research/OUTLINE.md`. The brief that wrote it is `history/sessions/PROMPT-2026-10-13-cloud-research.md`, and the method page on the site gives the phases and the limits.

## Build

```sh
make setup   # .sources/: the agentik-dev repos, read-only; the Python packages
make check   # structure, respeak's style gate, the hygiene scan, mkdocs --strict
make serve   # http://127.0.0.1:8000
```

`make setup` links an attached checkout of each agentik-dev repository under `.sources/` or clones it shallow from GitHub. `make check` must pass before a push; the pull request workflow runs the same four checks.

## Layout

| Path | What it holds |
|---|---|
| `docs/` | The site: `index.md`, `summary.md`, `field/` (part 1), `tools/` (part 2), `practices.md` (part 3), `method.md`, `glossary.md`, `sources.md` |
| `research/sources/` | One note per source: what was opened, when, and what it says |
| `research/synthesis/` | The internal survey per tool and the external survey per question |
| `research/OUTLINE.md` | Each page's claims in order, with sources and evidence levels |
| `history/` | The brief and the sitting charters |
| `scripts/` | `sources` (links the source repos) and `check` (the structural checks) |
| `.claude/` | The three helper agents and respeak's project configuration |

## License

MIT, as for the other agentik-dev repositories. See `LICENSE`.

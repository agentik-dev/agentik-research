# Brief for a refuter's fixer (phase 5)

Machine lane. You fix ONE page, named in your prompt, from the refuter's report your prompt quotes. Work from this repo's root. Write only that page and notes under `research/sources/`; read anything. Also read `research/synthesis/story-shape-brief.md` (its Rules hold here) and `research/sources/README.md` (the note format).

## The pin

The source checkouts under `.sources/` moved on 2026-10-14, after this site's first refute round: several repos merged fixes for findings this research raised (merges titled `rf1-research-fixes` and similar). From this round on, the site describes each repo at its head on 2026-10-14:

| repo | head |
|---|---|
| agentik-commons | 588530f |
| agentik-relay | 405d1e0 |
| agentik-session | e8477a7 |
| agentik-decisions | 569a120 |
| agentik-respeak | c83e9b8 |
| agentik-agents | f986500 |
| .github | 8a0a188 |

## What to do with each verdict

- **unsupported:** cite a source that says it (an existing note, or open the source and write a new note), or cut the claim. Never keep an uncited claim.
- **overstated:** restate the claim at the strength the source gives, in its terms.
- **stale:** restate the claim as the head has it, and cite a note read at the head. When the head fixed something the page called open, say both plainly where the page lists what is open: what was wrong, and the commit that changed it ("On 2026-10-14, commit `b967e59` ..."). A fix in the repo is not proof the tool works; keep the evidence level.
- **mislabelled:** make the footnote's commit and the note's `commit:` agree. Check the claim at the commit you keep.
- A private name: replace it with the generic name in the brief's owner's record, or cut it.

## Notes

- A new note for a repo's head is `research/sources/<repo>-head-2026-10-14.md`, with `commit:` the head above and `path:` the files you read. Write it once; add to it if it exists. Name in it only the commits and paths you opened.
- You may add your page to an existing note's `## Used in`. Change nothing else in a note another page also uses.
- Keep every footnote key the page still uses; drop a definition only when no reference to it remains.

## When done

Run from the repo root and fix until all pass (never build into `site/`):

```sh
python3 scripts/check
RESPEAK_PYTHON="$(command -v python3)" bash .sources/agentik-respeak/plugin/scripts/respeak-check.sh <page>
python3 .sources/agentik-commons/scripts/hygiene --repo . | tail -2
python3 -m mkdocs build --strict --quiet -d .cache/build-<page-slug>
```

Report in at most 150 words: each finding by number and what you did, any you could not fix and why, the notes you wrote, and the four checks' last lines.

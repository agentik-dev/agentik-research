# agentik-research

Research on long-running and multi-agent Claude Code sessions, and the reasons behind the agentik tools. The site's source is in `docs/` and builds with MkDocs Material.

This repo is in its first draft. The brief that writes it is `history/sessions/PROMPT-2026-10-13-cloud-research.md`.

## Build

```sh
make setup   # .sources/: the agentik-dev repos, read-only; the Python packages
make check   # structure, respeak's style gate, the hygiene scan, mkdocs --strict
make serve   # http://127.0.0.1:8000
```

## License

MIT, as for the other agentik-dev repos. See `LICENSE`.

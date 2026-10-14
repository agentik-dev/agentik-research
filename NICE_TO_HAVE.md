# NICE_TO_HAVE

A review's non-blocking notes go here: a refuter's overstated or stale lines that the page kept, and ideas for later pages. Use one line each, with the page and the date.
- 2026-10-14, the glass kit: the vendored files and `design/glass/` still carry two consuming sites' project names (`docs/assets/glass/glass.css` lines 104 and 654, `glass-browse.js` line 366, `design/glass/example-skin.css` lines 53, 76 and 85-86, `design/glass/style.md` lines 49 and 67). The vendored files are not edited here; the owner's private-term scan should rule on them, and the kit's own copy is where to fix them.
- 2026-10-14, the cloud image: `/opt/pw-browsers` holds Chromium build 1194, not the build Playwright 1.64.1 expects (1248). `scripts/lib/site.mjs` falls back to `/opt/pw-browsers/chromium`; the environment's setup script should install the pinned build.

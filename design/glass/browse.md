# Multi-filter browse UX — design notes

Why the browse surfaces moved from inline toggle-chip walls to the
dropdown-selector filter bar, and the decisions behind the shared engine
(`mkdocs/glass-browse.js`). Reference implementation of the target look:
`glass-ui-starter/src/components/filters/FilterBar.tsx`.

## The problem with the chip wall

records-filter.js / library-filter.js rendered every option of every facet as
an always-visible toggle chip. That works to ~4 facets × ~8 options, then:

- **Vertical cost scales with cardinality, not use.** Cases has 8 facets;
  officer/location alone are dozens of options. The filter area pushes the
  actual data below the fold — on the page whose whole point is the data.
- **No signal about where a click lands.** Options don't show match counts, so
  refining is guess-and-check against the "N / M" readout.
- **All facets look equally important.** Year and Status matter on every
  visit; "has-pdf" is occasional. The wall gives both the same real estate.
- **Selected state is scattered.** With five selections across four facet rows,
  there is no single place to read (or clear) "what am I looking at?"

## The adopted pattern

Two rows, roles separated — compact idle state, explicit active state:

```
Row 1 (fixed):  [+ Year] [+ Type] [+ Result] [+ Status] [+ More (2)]  [search…]   142 / 161
Row 2 (active): [year: 2025 ×] [result: citation ×] [officer: J. Smith ×]  Clear all
```

- **Adder pills** (row 1): one pill per *primary* facet. Click opens a dropdown
  panel — checkbox multi-select, OR within facet, AND across facets. A count
  bubble on the pill shows how many values are applied. This is the "dynamic
  dropdown adder": the bar's width is fixed by facet *count*, never by option
  cardinality or selections.
- **Dropdown panels**: Select all / Clear header for multi facets; an in-panel
  option search appears past 10 options (officer, location, person). Each
  option row shows a **live match count** computed against the *other* active
  facets + search, so the cost of a refinement is visible before clicking;
  zero-match options dim but stay clickable (OR semantics can still want them).
- **"More" overflow**: secondary facets collapse into one pill with an
  accordion panel (facet name → its options). Facets with applied values
  auto-expand and are counted on the pill ("More (2)"), so hidden ≠ lost.
  Primary/secondary is declared in the site config — an editorial decision
  about each page, not a layout accident.
- **Active chips** (row 2): every applied value — including free-text search —
  is a removable chip in one place, with "Clear all". The row disappears
  entirely when nothing is applied; the idle browse page is just pills +
  table.

## State & URL contract

- Facet params keep their existing names (`?location=charlestown-park`,
  `?system=snes`): generated tiles and cross-page links depend on them.
  Values comma-join within a facet. `q` carries search.
- **New**: `sort=<key>.<asc|desc>` persists column sort when it differs from
  the page default — a shared link now reproduces sort order too, and default
  views keep clean URLs.
- `history.replaceState` (no history spam while refining); search debounced
  150 ms; `popstate` re-reads state so back/forward can't desync the view.

## Table

Glass DataTable conventions from the starter, in plain CSS: `.glass-card`
frame, sticky `glass-2` header, uppercase-tracked `text-xs` header labels,
sort arrows on every column with `aria-sort`, hairline row dividers,
hover-wash rows, `tabular-nums`, and a real empty state ("No matching records
— adjust or clear the filters above") instead of a bare shrunken table.

## Accessibility

Adder pills: `aria-haspopup`/`aria-expanded`. Options: real `<button>`s with
`aria-pressed` + drawn checkboxes. Sort: buttons inside `th[aria-sort]`.
Chips: labeled remove buttons. Escape closes panels; outside-click closes;
`:focus-visible` accent rings; `prefers-reduced-motion` respected.

## Performance

Counts are O(rows × facets) per panel render — trivial at the current
hundreds of rows. tbody rebuilds go through a DocumentFragment; the filter bar
is built once and patched in place. Past ~5k rows, add row virtualization or
pagination to the engine before anything else.

## Considered and deferred

- **Facet promotion** (a used "More" facet temporarily joins row 1): rejected
  for now — moving controls under the user costs more than the extra click;
  the count-on-pill covers discoverability.
- **Dependent option hiding** (drop zero-count options entirely): rejected —
  hidden options break OR-refinement and make panels feel unstable. Dimming
  keeps the information without the instability.
- **Date/numeric range facets**: worth adding when a real page needs one
  (photos by date range is the likely first). Design: a range facet type in
  the same panel chrome, `param=from..to` in the URL.
- **Saved views**: URL state already makes any view shareable/bookmarkable;
  a "copy link" affordance on the browse page may be all this ever needs.
- **NOT semantics** (exclude a value): real use case ("everything except
  no-answer") but doubles the interaction vocabulary; revisit only on demand.

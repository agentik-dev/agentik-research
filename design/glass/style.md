Stack & foundation

- React 18 + Vite + TypeScript, Tailwind CSS 3 (class-based dark mode), TanStack Table v8 for grids, TanStack Query for data, lucide-react for icons, framer-motion for micro-animations, react-router-dom v6. Font is Inter Variable with font-variant-numeric: tabular-nums (numbers align in tables).
- The whole look is a "Soft-Elevated / glass" design system driven entirely by CSS variables in index.css, with .dark and .light blocks defining the same token names. Tailwind (tailwind.config.ts) maps those vars to utility classes, so components never hardcode hex — they use semantic classes like bg-glass-1, border-glass, text-gray-300, bg-accent-blue/15.

Core tokens to replicate:
- Surfaces: --glass-1 (panel fill, e.g. #16171b dark / #ffffff light) and --glass-2 (raised elements: table headers, dropdown menus, hover rows).
- Borders: hairline --glass-border (rgba(255,255,255,0.12) dark) with a -hover brighter variant.
- Canvas background: a fixed multi-layer radial+linear gradient (--canvas-gradient) behind everything — subtle, not flat.
- Accent: a single teal/green accent (accent-blue = #34d399) used for all active/selected/interactive states. Plus a functional severity scale (sev-bad/warn/watch/good/new) — colors are only ever semantic, never decorative.
- .glass-card component class = var(--glass-1) fill + 1px --glass-border + border-radius: 12px + a layered inset/drop --shadow-card. This is the universal panel/card/table frame. An optional .glass-card-interactive adds a hover lift (translateY(-1px) + stronger shadow, gated by prefers-reduced-motion).

1. Tabular view (components/tables/DataTable.tsx)

A generic, reusable DataTable<TData> wrapping TanStack Table. Visual conve
                                                                                                                                                                           - Frame: the whole table lives inside a .glass-card overflow-hidden, with Table is w-full text-sm.
- Header: sticky top-0 z-10, bg-glass-2 fill, border-b border-glass. Header text is text-xs font-medium text-gray-500 uppercase tracking-wide select-none. Sortable headerscursor-pointer hover:text-gray-300 and a trailing sort chevron (ChevronUp/e={14}, dimmed to text-gray-600 when inactive).
- Rows: border-b border-glass last:border-0 transition-colors, hover = hover:bg-hover-wash (a ~4% white/ink wash). Cells are px-4 py-3 text-gray-300. Clickable rows add   cursor-pointer.
- Expandable rows: an optional renderExpandedRow renders an inline detail <tr> below the selected row; the selected row switches to bg-glass-2 and the detail animates openwith framer-motion (height: 0 → auto, 0.2s, respecting reduced-motion).
- Empty state: centered px-4 py-12, muted "No data available" + a hint line.                                                                                               - Pagination footer: border-t border-glass px-4 py-3 flex items-center jusrt}–{end} of {total}" in text-xs text-gray-500; right = prev/next chevronbuttons (text-gray-400 hover:text-gray-200, disabled:opacity-30) around a "{page} / {pages}" label. Supports both server-side and client-side sort/pagination via the same component (server mode forwards header clicks to an onSort callback instea

Density is the signature: text-sm body, text-xs uppercase headers, px-4 pys, sticky header — reads as a dense, calm data grid rather than a chunkyone.                                                                                                                                                                           
2. Table filtering with dropdown multi-selectors (components/filters/FilterBar.tsx)                                                                                            
This is the most distinctive piece. The filter bar is pill-based, split into two rows, and lives in the page header.                                                           
- Trigger buttons (one per facet): small rounded-full "add" pills — inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-glass-1 text-gray-400 borderborder-glass, hover brightens fill/border/text. Dropdown facets show a Plufacets show a Search icon + label (both size={10}).
- Multi-select dropdown (DropdownSelector): opens an absolutely-positioned panel — bg-glass-2 border border-glass rounded-xl shadow-card py-1 min-w-[180px], z-50. Each option is a full-width left-aligned button with a custom checkbox: a w-3.5 h-3.5 lls with bg-accent-blue border-accent-blue and shows a white ✓ whenselected; selected label text turns text-accent-blue. Multi-value facets get a header row with "Select all" (accent) and "Clear all" (red) actions. Selecting toggles values into a comma-joined string (OR-within-facet). Closes on outside-click (mou
- Text-input facets (TextInput): same pill trigger; dropdown holds an input (bg-surface-0 border border-glass, focus ring = focus:border-accent-blue) + an "Apply" button, Enter to submit.
- "More" overflow (MoreFiltersDropdown): primary facets (category, NOS, environment, topology, search) render as inline pills; the rest collapse into a single "More (N)" pill
that opens a stacked draft-editing panel with per-field labels and a batchand accent styling activate when filters are set. This keeps the bar fromgrowing rightward as facets are added.
- Active filter pills (FilterPill, row 2): each applied value shows as a s-full text-xs bg-accent-blue/20 text-accent-blue borderborder-accent-blue/30 — with the facet label, the value (truncated at 160px), and an inline X remove button. A trailing "Clear all" text button (text-gray-500
hover:text-accent-red) appears when any filter is active. Multi-value faceer value.

Filter state is URL-backed (via a useFilters hook over search params), andky" filter keys across navigation so a filtered view survives page changes.

3. Panel design & left nav bar (components/layout/Sidebar.tsx, Shell.tsx,

- Shell layout: flex h-screen overflow-hidden — fixed-width sidebar + a fler, a scrollable <main>, and a thin footer. Page transitions fade/slide invia framer-motion (opacity 0→1, y 4→0, 0.15s).
- Sidebar panel: bg-glass-1 border-r border-glass flex flex-col, animates th] duration-200. Expanded = w-56, collapsed = w-14.
- Brand block at top: logo image + a small text-accent-blue font-semibold text-[11px] tracking-wide product label. The logo uses a CSS filter trick — filter: brightness(0)
invert(1) to render white in dark mode, unfiltered in light mode.
- Grouped nav: items are organized into labeled groups (Catalog / Authoring / Reference / Tools). Group labels are text-[10px] uppercase tracking-wider text-gray-600
font-semibold. This grouping-with-tiny-caps-headers is a key part of the f
- Header bar: border-b border-glass, holds right-aligned circular icon buttons (p-1.5 rounded-full bg-glass-1 border border-glass, hover brightens) for
Share/GitHub/theme-toggle, and — on filterable pages — the FilterBar on a waps Sun/Moon icons via a useTheme hook.
- Footer: thin (py-1.5), muted, faint logo + last-deployed commit link.

4. Collapsible menu & icon style

- Collapse mechanism: a boolean persisted to localStorage (mint-portal-sidebar-collapsed). Toggle button lives in the brand row — a ChevronLeft (collapse) when open, a Menu
hamburger (expand) when collapsed, with proper aria-expanded/aria-label/ti
- Nav item styling: flex items-center text-sm font-medium rounded-lg mx-2 transition-colors.
  - Expanded: gap-3 px-3 py-2, icon + truncating label.
  - Collapsed: justify-center px-0 py-2, icon only, with the label moved to a native title tooltip.
  - Active state: bg-accent-blue/15 text-accent-blue (soft tinted fill, ac-gray-400 hover:text-gray-200 hover:bg-hover-wash.
- Icons: lucide-react, uniformly size={16} in nav (size={10} in filter pills, size={14} in table sort headers), always className="shrink-0" so they never squish. Each nav
entry maps to a semantic icon (LayoutDashboard, Boxes, BookOpen, PenSquaressageCircle).
- When collapsed, group labels hide and are replaced by a thin border-t border-glass mx-3 my-1 divider between groups — so grouping still reads as icon clusters.

Reproducing it elsewhere — the essentials

1. Adopt the CSS-variable token layer (.dark/.light blocks) and map them through Tailwind's theme.extend.colors. Everything downstream keys off glass-1/2, border-glass,
hover-wash, and a single accent.
2. Ship the three component classes: .glass-card (panels/tables), .glass-chip, and .pill. They carry the whole aesthetic.
3. Standardize on lucide-react at fixed sizes, rounded-full icon buttons, over menus, and rounded-lg nav items.
4. Density rules: text-sm bodies, text-xs uppercase tracking-wide text-gray-500 labels/headers, px-4 py-3 cell/row padding, hairline border-glass dividers everywhere.
5. Interaction rules: hover = bg-hover-wash or border/text brighten; activ5–20 tinted fill + accent text; all transitions are transition-colors (orshort framer-motion) and gated by prefers-reduced-motion.                                                                                                             
If it'd help, I can extract these into a single portable theme.css + tailwind.config starter plus copy-paste DataTable, FilterBar, and Sidebar components stripped of Mint-specific data wiring — just say the word and where the target project

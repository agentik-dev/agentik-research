/* glass-browse.js — shared faceted-browse engine for MkDocs sites.
 *
 * Vendored from the owner's glass design system v2.1.0, 2026-10-14.
 * Consuming sites vendor this file into docs/assets/glass/ and list it under
 * extra_javascript BEFORE their per-site config file. Do not edit vendored
 * copies. Styling lives in glass.css (+ per-site skin).
 *
 * A browse page provides a mount div (generated or hand-authored):
 *
 *   <div class="gb-browse" data-page="cases" data-src="…/cases.json">Loading…</div>
 *
 * (legacy class "cs-browse" is honored too) and the site registers page
 * configs from its own small config script:
 *
 *   GlassBrowse.register({
 *     cases: {
 *       filters: [{ param: "year", key: "y", label: "Year", primary: true }, …],
 *       cols:    [{ key: "n", label: "Case #", link: "u" }, …],
 *       sortKey: "d", sortDir: -1
 *     }, …
 *   }, { order: { size: ["small", "medium", "large"] } })
 *
 * Facet def: { param   URL query-string name (load-bearing for deep links),
 *              key     JSON row key (value may be a scalar or an array),
 *              label,
 *              slugKey optional row key whose slug value also matches `param`
 *                      (slug-valued deep links are normalized to display values).
 *                      When key AND slugKey both name array-valued row fields
 *                      (index-paired arrays, e.g. beds + bedslugs), option
 *                      identity flips to the SLUG (deep links stay slug-shaped)
 *                      and the paired display value becomes the option label,
 *              primary true → inline adder pill; false/absent → "More" panel,
 *              control "segmented" → an always-visible radio-style segmented
 *                      control BEFORE the adder pills (single-valued; no row-2
 *                      chip; "Clear all" resets it). Needs:
 *                        options  [[value, label], …] (editorial order)
 *                        allValue the no-filter value, suppressed from the URL,
 *                        default  OPTIONAL (v2.1.0) — the value selected when
 *                                 the URL carries NO param (e.g. a page that
 *                                 opens on "In season"). The default value is
 *                                 URL-suppressed like allValue; choosing the
 *                                 allValue then writes ?param=<allValue>
 *                                 EXPLICITLY so reloads/links keep "show
 *                                 everything". Explicit URL params always win.
 *              displayKey/titleKey  row keys giving each option's display label
 *                      and tooltip (e.g. system code → badge + full name) }
 * Column def: { key, label, link?, linkPrefix?, list?, file?, thumb?, wrap?,
 *              badge?  class-group string: value renders as pill .gb-b-<badge>-<slug>,
 *              flags?  [{ key, value, label }] — pill per matching row field,
 *              filterParam?  render the value as a button toggling that facet
 *                      (cellClass overrides its class; displayKey/titleKey as above),
 *              format? (value, row) => display text,
 *              numeric? sort as number, nulls always last,
 *              ordinal? [values…] — sort by list position }
 * Page cfg:   { filters, cols, sortKey?, sortDir?, tieBreak?,
 *               view?  "table" (default) | "timeline" | any registered
 *                      renderer name ("cards" — vendor glass-cards.js). The
 *                      legacy `timeline: true` flag is honored as an alias.
 *                      A missing renderer falls back to the table with a
 *                      console warning — fail-visible, never blank,
 *               viewerDefault? { param } — glass-identity hook: apply
 *                      <param>=<viewer principal> as the default selection
 *                      when the URL carries no explicit value for that param
 *                      (explicit URLs always win; personalization, NOT privacy),
 *               timeline?,
 *               searchKeys? (row keys to search instead of the packed q blob),
 *               searchPlaceholder?, emptyText?, emptyHint? }
 *
 * Renderer plugins (glass-cards.js): GlassBrowse.renderers[name] = fn(ctx)
 * with ctx = { host, cfg, rows, state, out, opts,
 *              helpers: { el, sr, glyph, slug, toggleValue } } — the renderer
 * owns host's content; state machinery (facets, search, URL, popstate) stays
 * here. Built-ins "table"/"timeline" are dispatched internally.
 *
 * A mount may carry data-generated="YYYY-MM-DD"; it renders as a quiet
 * "as of <date>" stamp beside the N / M count readout (freshness, D10).
 *
 * Filter semantics: multi-select OR within a facet, AND across facets, plus a
 * debounced free-text search over the row's packed `q` blob. State round-trips
 * through the URL query string — one repeated param per value (?year=2024&
 * year=2023), which is comma-safe for values like street addresses; legacy
 * comma-joined links are still read (split only when the joined string isn't
 * itself a known value). `q` carries search; `sort=<key>.<asc|desc>` appears
 * only when it differs from the page default. Foreign params (e.g. Material's
 * ?h= highlight) and the #hash are preserved. Dropdown option rows show live
 * match counts computed against the OTHER active facets, so the cost of a
 * refinement is visible before clicking.
 */
(function () {
  "use strict";

  var PAGES = {};
  var OPTS = { order: {}, searchPlaceholder: "Search…", emptyText: "No matching records", emptyHint: "Adjust or clear the filters above." };

  /* Renderer registry (plugin surface). Built-ins "table" and "timeline" are
   * dispatched internally (their renderers are per-build closures); sibling
   * files register alternates here: GlassBrowse.renderers.cards = fn(ctx). */
  var RENDERERS = {};

  /* --- tiny DOM + util helpers -------------------------------------- */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* Visually-hidden text for screen readers (class in glass.css). */
  function sr(text) { return el("span", "gb-sr", text); }

  /* Decorative glyph, hidden from the accessibility tree. */
  function glyph(cls, text) {
    var n = el("span", cls, text);
    n.setAttribute("aria-hidden", "true");
    return n;
  }

  function slug(v) {
    return String(v).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function debounce(fn, ms) {
    var t;
    function wrapped() {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms);
    }
    wrapped.cancel = function () { clearTimeout(t); };
    return wrapped;
  }

  /* One open dropdown at a time; a single persistent document listener
   * closes it on outside pointerdown or Escape (this script loads once,
   * surviving Material's instant navigation, so these are module-level). */
  var openPanel = null; /* { wrap, close, refresh } */

  function closeOpenPanel() {
    if (openPanel) { var p = openPanel; openPanel = null; p.close(); }
  }

  document.addEventListener("mousedown", function (e) {
    if (openPanel && openPanel.wrap.isConnected && !openPanel.wrap.contains(e.target)) closeOpenPanel();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeOpenPanel();
  });

  /* popstate handling: one module-level listener dispatching to the views
   * built for the CURRENT page — init() clears the list on every navigation,
   * so stale builds (and their captured rows) are released. */
  var viewRefreshers = [];
  window.addEventListener("popstate", function () {
    viewRefreshers.forEach(function (fn) { fn(); });
  });

  /* --- state <-> URL -------------------------------------------------- */

  /* knownValues: per-param Set of display values + slugs, used to keep legacy
   * comma-joined deep links working without corrupting comma-containing
   * values ("8011 Fauntleroy Wy SW, Seattle, 98136"). */
  function readState(cfg, knownValues, slugMaps) {
    var params = new URLSearchParams(window.location.search);
    var state = {
      sel: {},
      q: params.get("q") || "",
      sortKey: cfg.sortKey || null,
      sortDir: cfg.sortDir || 1
    };
    cfg.filters.forEach(function (f) {
      var raw = params.getAll(f.param);
      if (!raw.length) return;
      var vals = [];
      raw.forEach(function (entry) {
        if (!entry) return;
        var known = knownValues[f.param];
        if (entry.indexOf(",") >= 0 && known && !known.has(entry)) {
          entry.split(",").forEach(function (v) { if (v) vals.push(v); });
        } else {
          vals.push(entry);
        }
      });
      /* Normalize slug-valued entries (generated deep links) to display
       * values so checkboxes, chips, and toggle-off all agree. */
      var map = slugMaps[f.param];
      if (map) vals = vals.map(function (v) { return map[v] != null ? map[v] : v; });
      /* de-dup while preserving order */
      var seen = {};
      vals = vals.filter(function (v) { return seen[v] ? false : (seen[v] = true); });
      /* Segmented facets are single-valued; their allValue is the default and
       * never persists as a selection (?scope=all == no scope param). */
      if (f.control === "segmented") {
        if (f.allValue != null) {
          vals = vals.filter(function (v) { return v !== String(f.allValue); });
        }
        if (vals.length > 1) vals = [vals[0]];
      }
      if (vals.length) state.sel[f.param] = vals;
    });
    /* Segmented defaults (v2.1.0): a facet may open pre-selected. Applied
     * only when the URL carries NO param at all — an explicit param,
     * including ?param=<allValue>, always wins. */
    cfg.filters.forEach(function (f) {
      if (f.control !== "segmented" || f.default == null) return;
      if (params.has(f.param)) return;
      if (f.allValue != null && String(f.default) === String(f.allValue)) return;
      state.sel[f.param] = [String(f.default)];
    });
    var sort = params.get("sort");
    if (sort) {
      var m = sort.match(/^(.+)\.(asc|desc)$/);
      if (m) { state.sortKey = m[1]; state.sortDir = m[2] === "desc" ? -1 : 1; }
    }
    return state;
  }

  function writeUrl(cfg, state) {
    /* Start from the live query string so foreign params survive. */
    var q = new URLSearchParams(window.location.search);
    cfg.filters.forEach(function (f) { q.delete(f.param); });
    q.delete("q");
    q.delete("sort");
    cfg.filters.forEach(function (f) {
      var sel = state.sel[f.param] || [];
      /* Default-carrying segmented facets (v2.1.0): the default state keeps a
       * clean URL; the no-filter state must be EXPLICIT or a reload would
       * silently re-apply the default. */
      if (f.control === "segmented" && f.default != null &&
          String(f.default) !== String(f.allValue)) {
        if (!sel.length) { q.append(f.param, String(f.allValue)); return; }
        if (sel.length === 1 && String(sel[0]) === String(f.default)) return;
      }
      sel.forEach(function (v) { q.append(f.param, v); });
    });
    if (state.q) q.set("q", state.q);
    if (state.sortKey && (state.sortKey !== (cfg.sortKey || null) || state.sortDir !== (cfg.sortDir || 1))) {
      q.set("sort", state.sortKey + "." + (state.sortDir === -1 ? "desc" : "asc"));
    }
    var qs = q.toString();
    history.replaceState(null, "",
      window.location.pathname + (qs ? "?" + qs : "") + window.location.hash);
  }

  /* --- filtering ------------------------------------------------------ */

  function rowVals(r, f) {
    var v = r[f.key];
    return Array.isArray(v) ? v : [v];
  }

  /* Index-paired array facet (D5): key AND slugKey both name array-valued row
   * fields — option identity is the slug, display label the paired value. */
  function isArrayPair(f, rows) {
    return !!(f.slugKey && rows.some(function (r) {
      return Array.isArray(r[f.key]) && Array.isArray(r[f.slugKey]);
    }));
  }

  function rowMatchesFacet(r, f, sel) {
    var vals = rowVals(r, f).map(String);
    if (f.slugKey && r[f.slugKey] != null) {
      var sv = r[f.slugKey];
      if (Array.isArray(sv)) sv.forEach(function (x) { vals.push(String(x)); });
      else vals.push(String(sv));
    }
    return sel.some(function (s) { return vals.indexOf(s) >= 0; });
  }

  /* Search blob: the server-packed lowercase `q` field by default, or the
   * cfg.searchKeys row fields joined (e.g. title-only search). */
  function searchBlob(cfg, r) {
    if (!cfg.searchKeys) return r.q || "";
    return cfg.searchKeys.map(function (k) {
      var v = r[k];
      return Array.isArray(v) ? v.join(" ") : (v == null ? "" : String(v));
    }).join(" ").toLowerCase();
  }

  /* Rows matching search + every facet except `skipParam` (used both for the
   * result set — skipParam null — and for per-option counts in dropdowns). */
  function matchingRows(cfg, state, rows, skipParam) {
    var q = state.q ? state.q.toLowerCase() : null;
    return rows.filter(function (r) {
      if (q && searchBlob(cfg, r).indexOf(q) < 0) return false;
      for (var i = 0; i < cfg.filters.length; i++) {
        var f = cfg.filters[i];
        if (f.param === skipParam) continue;
        var sel = state.sel[f.param];
        if (!sel || !sel.length) continue;
        if (!rowMatchesFacet(r, f, sel)) return false;
      }
      return true;
    });
  }

  function optionsFor(f, rows) {
    var present = {};
    if (isArrayPair(f, rows)) {
      rows.forEach(function (r) {
        var ss = r[f.slugKey];
        if (Array.isArray(ss)) ss.forEach(function (x) { if (x || x === 0) present[x] = 1; });
      });
    } else {
      rows.forEach(function (r) {
        rowVals(r, f).forEach(function (x) { if (x || x === 0) present[x] = 1; });
      });
    }
    var opts = Object.keys(present);
    var order = OPTS.order[f.param];
    if (order) return order.filter(function (x) { return present[x]; });
    opts.sort();
    if (f.param === "year") opts.reverse();
    return opts;
  }

  function sortVal(r, key) {
    var v = r[key];
    if (v == null) return "";
    if (typeof v === "number") return v;
    if (Array.isArray(v)) return v.join(",").toLowerCase();
    return String(v).toLowerCase();
  }

  /* --- build ---------------------------------------------------------- */

  function build(container, cfg, rows) {
    /* Per-facet lookup tables: known values (for legacy comma links) and
     * slug → display maps (for generated slug deep links). */
    var knownValues = {}, slugMaps = {};
    cfg.filters.forEach(function (f) {
      var pair = isArrayPair(f, rows);
      var known = new Set();
      rows.forEach(function (r) {
        rowVals(r, f).forEach(function (x) { if (x || x === 0) known.add(String(x)); });
        var sv = f.slugKey ? r[f.slugKey] : null;
        if (Array.isArray(sv)) sv.forEach(function (x) { if (x || x === 0) known.add(String(x)); });
        else if (sv) known.add(String(sv));
      });
      knownValues[f.param] = known;
      if (f.slugKey) {
        var map = {};
        rows.forEach(function (r) {
          if (pair) {
            /* array-pair: normalize DISPLAY-valued entries to the slug
             * identity (deep links are slug-shaped and stay that way) */
            var ks = r[f.key], ss = r[f.slugKey];
            if (Array.isArray(ks) && Array.isArray(ss)) {
              for (var i = 0; i < ss.length && i < ks.length; i++) {
                map[String(ks[i])] = String(ss[i]);
              }
            }
          } else if (r[f.slugKey] && r[f.key] != null) {
            map[String(r[f.slugKey])] = String(r[f.key]);
          }
        });
        slugMaps[f.param] = map;
      }
    });

    /* Option display labels/tooltips (e.g. system code → badge + full name). */
    var displayMaps = {}; /* param -> { value: { label, title } } */
    cfg.filters.forEach(function (f) {
      if (isArrayPair(f, rows)) {
        /* array-pair (D5): options are slugs; label each with its paired
         * display value (yard's ?bed=<slug> keeps deep links, shows names) */
        var pmap = {};
        rows.forEach(function (r) {
          var ks = r[f.key], ss = r[f.slugKey];
          if (!Array.isArray(ks) || !Array.isArray(ss)) return;
          for (var i = 0; i < ss.length && i < ks.length; i++) {
            pmap[String(ss[i])] = { label: String(ks[i]), title: null };
          }
        });
        displayMaps[f.param] = pmap;
        return;
      }
      if (!f.displayKey && !f.titleKey) return;
      var map = {};
      rows.forEach(function (r) {
        var v = r[f.key];
        if (v == null || Array.isArray(v)) return;
        map[String(v)] = {
          label: f.displayKey && r[f.displayKey] != null ? String(r[f.displayKey]) : String(v),
          title: f.titleKey && r[f.titleKey] != null ? String(r[f.titleKey]) : null
        };
      });
      displayMaps[f.param] = map;
    });

    function optLabel(param, v) {
      var m = displayMaps[param];
      return m && m[v] ? m[v].label : v;
    }
    function optTitle(param, v) {
      var m = displayMaps[param];
      return m && m[v] ? m[v].title : null;
    }

    var state = readState(cfg, knownValues, slugMaps);

    container.textContent = "";
    var toolbar = el("div", "gb-toolbar");
    var activeRow = el("div", "gb-active");
    var body = el("div", "gb-body");
    container.appendChild(toolbar);
    container.appendChild(activeRow);
    container.appendChild(body);

    var segFacets = cfg.filters.filter(function (f) { return f.control === "segmented"; });
    var rest = cfg.filters.filter(function (f) { return f.control !== "segmented"; });
    var primaries = rest.filter(function (f) { return f.primary; });
    var overflow = rest.filter(function (f) { return !f.primary; });
    if (!primaries.length) { primaries = rest; overflow = []; }

    var facetButtons = {}; /* param -> adder pill button */

    function selCount(param) {
      return (state.sel[param] || []).length;
    }

    function toggleValue(param, value) {
      var sel = state.sel[param] || (state.sel[param] = []);
      var i = sel.indexOf(value);
      if (i >= 0) sel.splice(i, 1); else sel.push(value);
      if (!sel.length) delete state.sel[param];
      applyState();
    }

    /* ---- segmented facets (always visible, before the adder pills) ---- */

    var segRefreshers = [];
    segFacets.forEach(function (f) {
      var wrap = el("div", "gb-seg");
      wrap.setAttribute("role", "group");
      wrap.setAttribute("aria-label", f.label || f.param);
      var btns = [];
      (f.options || []).forEach(function (pairOpt) {
        var val = String(pairOpt[0]);
        var b = el("button", "gb-seg-btn", pairOpt[1] != null ? String(pairOpt[1]) : val);
        b.type = "button";
        b.addEventListener("click", function () {
          if (f.allValue != null && val === String(f.allValue)) delete state.sel[f.param];
          else state.sel[f.param] = [val];
          applyState();
        });
        btns.push({ b: b, val: val });
        wrap.appendChild(b);
      });
      segRefreshers.push(function () {
        var sel = state.sel[f.param];
        var cur = sel && sel.length ? sel[0] : String(f.allValue);
        btns.forEach(function (x) {
          var on = x.val === cur;
          x.b.setAttribute("aria-pressed", on ? "true" : "false");
          x.b.classList.toggle("gb-on", on);
        });
      });
      toolbar.appendChild(wrap);
    });

    /* ---- option list: built once per panel open, refreshed in place ----
     * (rebuilding on every toggle would wipe the option-search text, drop
     * keyboard focus, and reset the list's scroll position) */

    function makeOptList(f, host) {
      var opts = optionsFor(f, rows).map(String);
      var pairFacet = isArrayPair(f, rows);
      var root = el("div", "gb-optwrap");
      var needle = "";

      if (f.search || opts.length > 10) {
        var input = el("input", "gb-pop-search");
        input.type = "search";
        input.placeholder = "Filter options…";
        input.setAttribute("aria-label", "Filter " + f.label + " options");
        input.addEventListener("input", function () {
          needle = this.value.toLowerCase();
          applyNeedle();
        });
        root.appendChild(input);
      }

      var list = el("div", "gb-opts");
      var buttons = {};
      opts.forEach(function (v) {
        var label = optLabel(f.param, v);
        var btn = el("button", "gb-opt");
        btn.type = "button";
        btn.dataset.v = v;
        btn.dataset.label = label;
        var title = optTitle(f.param, v);
        if (title) btn.title = title;
        btn.appendChild(glyph("gb-check", "✓"));
        btn.appendChild(el("span", "gb-opt-label", label));
        var cnt = el("span", "gb-opt-count", "");
        btn.appendChild(cnt);
        btn.addEventListener("click", function () { toggleValue(f.param, v); });
        buttons[v] = { btn: btn, cnt: cnt, label: label };
        list.appendChild(btn);
      });
      root.appendChild(list);
      host.appendChild(root);

      function applyNeedle() {
        opts.forEach(function (v) {
          var hit = v.toLowerCase().indexOf(needle) >= 0 ||
            buttons[v].label.toLowerCase().indexOf(needle) >= 0;
          buttons[v].btn.style.display = hit ? "" : "none";
        });
      }

      function refresh() {
        var counts = {};
        matchingRows(cfg, state, rows, f.param).forEach(function (r) {
          var vs = pairFacet && Array.isArray(r[f.slugKey]) ? r[f.slugKey] : rowVals(r, f);
          vs.forEach(function (x) {
            if (x || x === 0) counts[x] = (counts[x] || 0) + 1;
          });
        });
        var sel = state.sel[f.param] || [];
        opts.forEach(function (v) {
          var on = sel.indexOf(v) >= 0;
          var n = counts[v] || 0;
          var b = buttons[v];
          b.btn.setAttribute("aria-pressed", on ? "true" : "false");
          b.btn.classList.toggle("gb-zero", !on && !n);
          b.cnt.textContent = String(n);
          b.btn.setAttribute("aria-label", b.label + ", " + n + " matching");
        });
      }
      refresh();
      return { refresh: refresh, optCount: opts.length };
    }

    function makePopHead(f, host, allOptCount) {
      var head = el("div", "gb-pop-head");
      var all = el("button", null, "Select all");
      all.type = "button";
      var clear = el("button", "gb-danger", "Clear");
      clear.type = "button";
      all.addEventListener("click", function () {
        state.sel[f.param] = optionsFor(f, rows).map(String);
        applyState();
      });
      clear.addEventListener("click", function () {
        delete state.sel[f.param];
        applyState();
      });
      head.appendChild(all);
      head.appendChild(clear);
      host.appendChild(head);
      function refresh() {
        all.disabled = selCount(f.param) === allOptCount;
        clear.disabled = selCount(f.param) === 0;
      }
      refresh();
      return { refresh: refresh };
    }

    /* ---- primary facet adder pills ---- */

    primaries.forEach(function (f) {
      var wrap = el("div", "gb-facet");
      var btn = el("button", "gb-pill-btn");
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      facetButtons[f.param] = btn;
      wrap.appendChild(btn);
      toolbar.appendChild(wrap);
      refreshPill(f);

      btn.addEventListener("click", function () {
        if (openPanel && openPanel.wrap === wrap) { closeOpenPanel(); return; }
        closeOpenPanel();
        var pop = el("div", "gb-pop");
        var optCount = optionsFor(f, rows).length;
        var head = makePopHead(f, pop, optCount);
        var optList = makeOptList(f, pop);
        wrap.appendChild(pop);
        var r = pop.getBoundingClientRect();
        if (r.right > document.documentElement.clientWidth - 8) pop.classList.add("gb-pop-right");
        btn.setAttribute("aria-expanded", "true");
        openPanel = {
          wrap: wrap,
          refresh: function () { head.refresh(); optList.refresh(); },
          close: function () {
            btn.setAttribute("aria-expanded", "false");
            var hadFocus = pop.contains(document.activeElement);
            if (pop.parentNode) pop.parentNode.removeChild(pop);
            if (hadFocus) btn.focus();
          }
        };
      });
    });

    function refreshPill(f) {
      var btn = facetButtons[f.param];
      if (!btn) return;
      var n = selCount(f.param);
      btn.textContent = "";
      btn.classList.toggle("gb-on", n > 0);
      btn.appendChild(glyph("gb-plus", "+"));
      btn.appendChild(el("span", null, f.label));
      if (n > 0) btn.appendChild(glyph("gb-n", String(n)));
      btn.setAttribute("aria-label",
        f.label + " filter" + (n > 0 ? ", " + n + " selected" : ""));
    }

    /* ---- "More" overflow: accordion of secondary facets ---- */

    var moreBtn = null;
    if (overflow.length) {
      var moreWrap = el("div", "gb-facet");
      moreBtn = el("button", "gb-pill-btn");
      moreBtn.type = "button";
      moreBtn.setAttribute("aria-expanded", "false");
      moreWrap.appendChild(moreBtn);
      toolbar.appendChild(moreWrap);
      refreshMore();

      moreBtn.addEventListener("click", function () {
        if (openPanel && openPanel.wrap === moreWrap) { closeOpenPanel(); return; }
        closeOpenPanel();
        var pop = el("div", "gb-pop gb-more-pop");
        var sections = []; /* { f, headBtn, headBadge, parts: null | {head, optList} } */

        overflow.forEach(function (f) {
          var sec = el("div", "gb-sec");
          var head = el("button", "gb-sec-head");
          head.type = "button";
          head.appendChild(el("span", null, f.label));
          var badge = glyph("gb-n", "");
          head.appendChild(badge);
          head.appendChild(glyph("gb-caret", "▶"));
          var secBody = el("div", "gb-sec-body");
          var section = { f: f, headBtn: head, headBadge: badge, parts: null };

          function expand() {
            sec.dataset.open = "1";
            head.setAttribute("aria-expanded", "true");
            if (!section.parts) {
              var optCount = optionsFor(f, rows).length;
              var h = makePopHead(f, secBody, optCount);
              var o = makeOptList(f, secBody);
              section.parts = { head: h, optList: o };
            }
          }
          head.setAttribute("aria-expanded", "false");
          head.addEventListener("click", function () {
            if (sec.dataset.open === "1") {
              delete sec.dataset.open;
              head.setAttribute("aria-expanded", "false");
            } else expand();
          });
          if (selCount(f.param)) expand();

          sec.appendChild(head);
          sec.appendChild(secBody);
          pop.appendChild(sec);
          sections.push(section);
        });

        function refreshSections() {
          sections.forEach(function (s) {
            var n = selCount(s.f.param);
            s.headBadge.textContent = n ? String(n) : "";
            s.headBadge.style.display = n ? "" : "none";
            s.headBtn.setAttribute("aria-label",
              s.f.label + (n ? ", " + n + " selected" : ""));
            if (s.parts) { s.parts.head.refresh(); s.parts.optList.refresh(); }
          });
        }
        refreshSections();

        moreWrap.appendChild(pop);
        var r = pop.getBoundingClientRect();
        if (r.right > document.documentElement.clientWidth - 8) pop.classList.add("gb-pop-right");
        moreBtn.setAttribute("aria-expanded", "true");
        openPanel = {
          wrap: moreWrap,
          refresh: refreshSections,
          close: function () {
            moreBtn.setAttribute("aria-expanded", "false");
            var hadFocus = pop.contains(document.activeElement);
            if (pop.parentNode) pop.parentNode.removeChild(pop);
            if (hadFocus) moreBtn.focus();
          }
        };
      });
    }

    function refreshMore() {
      if (!moreBtn) return;
      var n = overflow.reduce(function (acc, f) { return acc + (selCount(f.param) ? 1 : 0); }, 0);
      moreBtn.textContent = "";
      moreBtn.classList.toggle("gb-on", n > 0);
      moreBtn.appendChild(glyph("gb-plus", "+"));
      moreBtn.appendChild(el("span", null, n > 0 ? "More (" + n + ")" : "More"));
      moreBtn.setAttribute("aria-label",
        "More filters" + (n > 0 ? ", " + n + " active" : ""));
    }

    /* ---- search + count ---- */

    var search = el("input", "gb-q");
    search.type = "search";
    search.placeholder = cfg.searchPlaceholder || OPTS.searchPlaceholder;
    search.value = state.q;
    search.setAttribute("aria-label", "Search");
    var applySearch = debounce(function (value) {
      state.q = value;
      applyState();
    }, 150);
    search.addEventListener("input", function () { applySearch(this.value); });
    toolbar.appendChild(search);

    /* Live region: count changes are announced politely to screen readers. */
    var count = el("span", "gb-count");
    count.setAttribute("role", "status");
    var countText = el("span", null, "");
    count.appendChild(countText);
    count.appendChild(sr(" records shown"));
    toolbar.appendChild(count);

    /* Freshness stamp (D10): mount's data-generated renders beside the count. */
    if (container.dataset.generated) {
      toolbar.appendChild(el("span", "gb-asof", "as of " + container.dataset.generated));
    }

    /* ---- active filter chips (row 2) ---- */

    function renderActive() {
      activeRow.textContent = "";
      var chips = [];
      cfg.filters.forEach(function (f) {
        if (f.control === "segmented") return; /* control is always visible — a chip would be redundant */
        (state.sel[f.param] || []).forEach(function (v) {
          chips.push({ f: f, v: v });
        });
      });
      if (state.q) chips.push({ q: true, v: state.q });
      if (!chips.length) { activeRow.style.display = "none"; return; }
      activeRow.style.display = "";
      chips.forEach(function (c) {
        var chip = el("span", "gb-chip");
        chip.appendChild(el("span", "gb-chip-k", (c.q ? "search" : c.f.label) + ":"));
        chip.appendChild(el("span", "gb-chip-v", c.q ? c.v : optLabel(c.f.param, c.v)));
        var x = el("button", "gb-chip-x", "×");
        x.type = "button";
        x.setAttribute("aria-label", "Remove " + (c.q ? "search" : c.f.label) + " filter " + c.v);
        x.addEventListener("click", function () {
          if (c.q) { applySearch.cancel(); state.q = ""; search.value = ""; }
          else {
            var sel = state.sel[c.f.param] || [];
            var i = sel.indexOf(c.v);
            if (i >= 0) sel.splice(i, 1);
            if (!sel.length) delete state.sel[c.f.param];
          }
          applyState();
        });
        chip.appendChild(x);
        activeRow.appendChild(chip);
      });
      var clearAll = el("button", "gb-clear-all", "Clear all");
      clearAll.type = "button";
      clearAll.addEventListener("click", function () {
        applySearch.cancel();
        state.sel = {};
        state.q = "";
        search.value = "";
        applyState();
      });
      activeRow.appendChild(clearAll);
    }

    /* ---- table / timeline rendering ---- */

    function cellFor(r, c) {
      var td = el("td", "gb-c-" + c.key + (c.wrap ? " gb-wrap" : ""));
      var v = r[c.key];
      if (c.flags) {
        c.flags.forEach(function (fl) {
          if (r[fl.key] === fl.value) td.appendChild(el("span", "gb-pill gb-flag", fl.label));
        });
        return td;
      }
      if (c.thumb) {
        var ph = el(r[c.link] ? "a" : "span", "gb-thumb");
        ph.appendChild(glyph(null, "▣"));
        ph.setAttribute("aria-label", "Open record" + (r.d ? " " + r.d : ""));
        if (r[c.link]) ph.href = r[c.link];
        td.appendChild(ph);
        return td;
      }
      if (c.filterParam) {
        if (v != null && v !== "") {
          var label = c.displayKey && r[c.displayKey] != null ? String(r[c.displayKey]) : String(v);
          var fb = el("button", c.cellClass || "gb-cell-pill", label);
          fb.type = "button";
          if (c.titleKey && r[c.titleKey]) fb.title = r[c.titleKey] + " — filter";
          fb.setAttribute("aria-label", "Filter by " + label);
          var fval = String(v);
          fb.addEventListener("click", function () { toggleValue(c.filterParam, fval); });
          td.appendChild(fb);
        }
        return td;
      }
      if (c.badge) {
        if (v) td.appendChild(el("span", "gb-pill gb-b-" + c.badge + "-" + slug(v), String(v)));
        return td;
      }
      if (c.file) {
        if (v) {
          var fa = el("a", "gb-pdf", "PDF");
          fa.href = v;
          td.appendChild(fa);
        } else td.textContent = "—";
        return td;
      }
      var text = c.format ? c.format(v, r)
        : Array.isArray(v) ? v.join(", ") : (v == null ? "" : String(v));
      if (c.link && r[c.link]) {
        var a = el("a", null, text || "view");
        a.href = (c.linkPrefix || "") + r[c.link];
        td.appendChild(a);
      } else {
        td.textContent = text;
      }
      return td;
    }

    var tableEl = null, tbodyEl = null, thByKey = {};

    function ensureTable() {
      if (tableEl) return;
      body.textContent = "";
      var card = el("div", "glass-card gb-card");
      var scroll = el("div", "gb-scroll");
      tableEl = el("table", "gb-table");
      var thead = el("thead");
      var htr = el("tr");
      cfg.cols.forEach(function (c) {
        var th = el("th");
        var btn = el("button", "gb-th-btn");
        btn.type = "button";
        btn.appendChild(el("span", null, c.label));
        btn.appendChild(glyph("gb-arrow", "↕"));
        btn.addEventListener("click", function () {
          if (state.sortKey === c.key) state.sortDir *= -1;
          else { state.sortKey = c.key; state.sortDir = 1; }
          applyState();
        });
        th.appendChild(btn);
        thByKey[c.key] = th;
        htr.appendChild(th);
      });
      thead.appendChild(htr);
      tableEl.appendChild(thead);
      tbodyEl = el("tbody");
      tableEl.appendChild(tbodyEl);
      scroll.appendChild(tableEl);
      card.appendChild(scroll);
      body.appendChild(card);
    }

    function renderTable(out) {
      ensureTable();
      cfg.cols.forEach(function (c) {
        var th = thByKey[c.key];
        var arrow = th.querySelector(".gb-arrow");
        if (state.sortKey === c.key) {
          th.setAttribute("aria-sort", state.sortDir === 1 ? "ascending" : "descending");
          arrow.textContent = state.sortDir === 1 ? "▲" : "▼";
        } else {
          th.removeAttribute("aria-sort");
          arrow.textContent = "↕";
        }
      });
      var frag = document.createDocumentFragment();
      if (!out.length) {
        var tr = el("tr");
        var td = el("td", "gb-empty");
        td.colSpan = cfg.cols.length;
        td.appendChild(el("div", null, cfg.emptyText || OPTS.emptyText));
        td.appendChild(el("div", "gb-empty-hint", cfg.emptyHint || OPTS.emptyHint));
        tr.appendChild(td);
        frag.appendChild(tr);
      } else {
        out.forEach(function (r) {
          var tr = el("tr");
          cfg.cols.forEach(function (c) { tr.appendChild(cellFor(r, c)); });
          frag.appendChild(tr);
        });
      }
      tbodyEl.textContent = "";
      tbodyEl.appendChild(frag);
    }

    function renderTimeline(out) {
      body.textContent = "";
      tableEl = null;
      var byYear = {};
      out.forEach(function (r) {
        (byYear[r.y] = byYear[r.y] || []).push(r);
      });
      Object.keys(byYear).sort().reverse().forEach(function (y) {
        body.appendChild(el("h2", "gb-tl-year", y));
        var ul = el("ul", "gb-tl-list");
        byYear[y].sort(function (a, b) { return a.d < b.d ? 1 : -1; });
        byYear[y].forEach(function (r) {
          var li = el("li", "gb-tl-item");
          li.appendChild(el("span", "gb-tl-date", r.d));
          li.appendChild(el("span", "gb-pill gb-b-kind-" + slug(r.k), r.k));
          var a = el("a", "gb-tl-title", r.t);
          a.href = r.u;
          li.appendChild(a);
          ul.appendChild(li);
        });
        body.appendChild(ul);
      });
      if (!out.length) {
        var empty = el("div", "glass-card gb-card gb-empty");
        empty.appendChild(el("div", null, cfg.emptyText || OPTS.emptyText));
        empty.appendChild(el("div", "gb-empty-hint", cfg.emptyHint || OPTS.emptyHint));
        body.appendChild(empty);
      }
    }

    /* ---- state application ---- */

    /* Context handed to plugin renderers (glass-cards.js). The renderer owns
     * host's content; everything else (facets, search, URL, popstate) is ours. */
    function makeCtx(out) {
      return {
        host: body, cfg: cfg, rows: rows, state: state, out: out, opts: OPTS,
        helpers: { el: el, sr: sr, glyph: glyph, slug: slug, toggleValue: toggleValue }
      };
    }

    var warnedView = false;

    function renderView(out) {
      var view = cfg.view || (cfg.timeline ? "timeline" : "table");
      if (view === "timeline") { renderTimeline(out); return; }
      if (view !== "table" && RENDERERS[view]) {
        tableEl = null;
        RENDERERS[view](makeCtx(out));
        return;
      }
      if (view !== "table" && !warnedView) {
        warnedView = true;
        console.warn('glass-browse: no renderer "' + view +
          '" registered — falling back to the table. Is glass-cards.js vendored and wired?');
      }
      renderTable(out);
    }

    function applyState() {
      var out = matchingRows(cfg, state, rows, null);
      if (!cfg.timeline && cfg.view !== "timeline" && state.sortKey) {
        var sc = (cfg.cols || []).filter(function (c) { return c.key === state.sortKey; })[0];
        var tieCmp = function (a, b) {
          if (!cfg.tieBreak) return 0;
          var x = sortVal(a, cfg.tieBreak), y = sortVal(b, cfg.tieBreak);
          return x < y ? -1 : x > y ? 1 : 0;
        };
        out = out.slice().sort(function (a, b) {
          var x, y;
          if (sc && sc.ordinal) {
            x = sc.ordinal.indexOf(String(a[state.sortKey]));
            y = sc.ordinal.indexOf(String(b[state.sortKey]));
            if (x < 0) x = sc.ordinal.length;
            if (y < 0) y = sc.ordinal.length;
          } else if (sc && sc.numeric) {
            x = a[state.sortKey] == null ? null : Number(a[state.sortKey]);
            y = b[state.sortKey] == null ? null : Number(b[state.sortKey]);
            if (x == null || y == null) {   /* unknowns sink in either direction */
              if (x == null && y == null) return tieCmp(a, b);
              return x == null ? 1 : -1;
            }
          } else {
            x = sortVal(a, state.sortKey);
            y = sortVal(b, state.sortKey);
          }
          if (x < y) return -state.sortDir;
          if (x > y) return state.sortDir;
          return tieCmp(a, b);
        });
      }
      renderView(out);
      countText.textContent = out.length + " / " + rows.length;
      cfg.filters.forEach(refreshPill);
      segRefreshers.forEach(function (fn) { fn(); });
      refreshMore();
      renderActive();
      if (openPanel && container.contains(openPanel.wrap)) openPanel.refresh();
      writeUrl(cfg, state);
    }

    /* Back/forward: re-read URL state and re-render (dispatched from the
     * module-level popstate listener; init() prunes stale views). */
    viewRefreshers.push(function () {
      if (!container.isConnected) return;
      applySearch.cancel();
      state = readState(cfg, knownValues, slugMaps);
      search.value = state.q;
      applyState();
    });

    applyState();

    /* ---- viewerDefault (site-kit D4): default a facet to the signed-in
     * principal. Explicit URL params always win; identity may resolve after
     * first paint, so listen once for the glass-identity event too.
     * Personalization only — never privacy (D6). ---- */
    var vdParam = cfg.viewerDefault && cfg.viewerDefault.param;
    if (vdParam && !new URLSearchParams(window.location.search).has(vdParam)) {
      var applyViewerDefault = function () {
        if (!container.isConnected) return;
        var p = document.documentElement.dataset.principal;
        if (!p || state.sel[vdParam]) return;
        if (!knownValues[vdParam] || !knownValues[vdParam].has(p)) return;
        state.sel[vdParam] = [p];
        applyState();
      };
      applyViewerDefault();
      window.addEventListener("glass-identity", applyViewerDefault, { once: true });
    }
  }

  /* --- boot ----------------------------------------------------------- */

  function init() {
    closeOpenPanel();
    viewRefreshers.length = 0;
    var mounts = document.querySelectorAll(".gb-browse, .cs-browse");
    if (!mounts.length) {
      document.body.classList.remove("gb-wide", "cs-browse-page");
      return;
    }
    document.body.classList.add("gb-wide", "cs-browse-page");
    mounts.forEach(function (container) {
      if (container.dataset.gbReady === "1") return;
      var cfg = PAGES[container.dataset.page];
      if (!cfg) { container.textContent = "Unknown browse page."; return; }
      container.dataset.gbReady = "1";
      fetch(new URL(container.dataset.src, document.baseURI))
        .then(function (r) { return r.json(); })
        .then(function (rows) { build(container, cfg, rows); })
        .catch(function () { container.textContent = "Could not load records."; });
    });
  }

  /* Defer one tick so per-site config scripts (loaded after this file) have
   * registered before the first init — Material's document$ replays
   * immediately on subscribe. */
  function scheduleInit() { setTimeout(init, 0); }

  window.GlassBrowse = {
    renderers: RENDERERS,
    register: function (pages, opts) {
      for (var k in pages) PAGES[k] = pages[k];
      if (opts) {
        for (var o in opts) {
          if (o === "order") {
            for (var p in opts.order) OPTS.order[p] = opts.order[p];
          } else OPTS[o] = opts[o];
        }
      }
      scheduleInit();
    },
    init: init
  };

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(scheduleInit);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleInit);
  } else {
    scheduleInit();
  }
})();

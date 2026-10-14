/* glass-cards.js — card renderer for glass-browse (glass-cards design D1/D3).
 *
 * Vendored from the owner's glass design system v2.1.0, 2026-10-14.
 * A RENDERER, not a second engine: this file registers itself into
 * GlassBrowse.renderers and reuses all of glass-browse's state machinery
 * (facets, search, chips, URL round-trip, popstate). Vendor it alongside
 * glass-browse.js and list it under extra_javascript BETWEEN glass-browse.js
 * and the site config file. Do not edit vendored copies. Structural CSS lives
 * in glass.css §cards; glyph/pill palettes live in each site's <site>-site.css.
 *
 * Page config (site-owned; see glass-cards.md §4 for the full schema):
 *
 *   GlassBrowse.register({
 *     catalog: {
 *       view: "cards",
 *       filters: [ { param: "scope", key: "scope", control: "segmented",
 *                    allValue: "all", options: [["all","All"], …] }, … ],
 *       card: {
 *         href: "u",            // whole card is the <a>
 *         img: "img",           // resolved URL or null — publisher's job (D4)
 *         imgAlt: "n", placeholder: "🌿",
 *         title: "n", subtitle: "bot", pitch: "sub",
 *         glyphs: [             // top-right; order = priority; max 3 render
 *           { any: [ { when: { scope: "own" }, use: "own" },
 *                    { when: { fav: true },    use: "fav" } ] },
 *           { when: { nat: "native" }, use: "nat", label: function (r) {…} }
 *         ],
 *         badges: { key: "people", use: "person" },  // top-left, per array value
 *         pills: [ { key: "scope", map: { own: { text: "in the ground", cls: "own" } } },
 *                  { key: "w", suffix: " water" }, { key: "nat", text: "native" } ],
 *         sort: "photo-first"   // the default; photo rows first, then page sort
 *       }
 *     }
 *   }, {
 *     glyphs: {                 // the site's declared glyph vocabulary
 *       own: { svg: "<svg …>…</svg>", label: "In the ground — we grow this" },
 *       gf:  { text: "GF", label: "Gluten-free as written" },
 *       person: { text: { ana: "A", ben: "B" }, label: "On this shelf" }
 *     }
 *   });
 *
 * Behavior notes (glass-cards.md §4):
 *   glyph `when:` is equality (value `true` = truthy test); `any:` groups are
 *   first-match-wins (mutual exclusion). Glyphs/badges are informative:
 *   role="img" + aria-label + title. When ZERO rows in the filtered set have
 *   a photo — or `card.img` is absent from config — cards render text-forward
 *   with no hero block at all, not a wall of placeholders.
 */
(function () {
  "use strict";

  function renderCards(ctx) {
    var el = ctx.helpers.el;
    var sr = ctx.helpers.sr;
    var cfg = ctx.cfg;
    var card = cfg.card || {};
    var vocab = (ctx.opts && ctx.opts.glyphs) || {};
    var host = ctx.host;
    var out = ctx.out;

    host.textContent = "";

    if (!out.length) {
      var empty = el("div", "glass-card gb-card gb-empty");
      empty.appendChild(el("div", null, cfg.emptyText || ctx.opts.emptyText));
      empty.appendChild(el("div", "gb-empty-hint", cfg.emptyHint || ctx.opts.emptyHint));
      host.appendChild(empty);
      return;
    }

    /* Hero mode: only when the config declares an img key AND at least one
     * row in the FILTERED set resolves a photo. */
    var heroMode = !!card.img && out.some(function (r) { return !!r[card.img]; });

    /* Photo-first is the card default: photo rows first, the page's sort
     * order (already applied to `out`) preserved within each partition. */
    if (heroMode && card.sort !== "none") {
      var withImg = [], without = [];
      out.forEach(function (r) { (r[card.img] ? withImg : without).push(r); });
      out = withImg.concat(without);
    }

    function vocEntry(name) { return vocab[name] || null; }

    function glyphContent(node, voc, value) {
      if (voc.svg) { node.innerHTML = voc.svg; return true; }
      var t = voc.text;
      if (t != null && typeof t === "object") t = t[value];
      if (t == null) return false;
      node.textContent = String(t);
      return true;
    }

    function fires(when, r) {
      for (var k in when) {
        if (!Object.prototype.hasOwnProperty.call(when, k)) continue;
        if (when[k] === true) { if (!r[k]) return false; }
        else if (String(r[k]) !== String(when[k])) return false;
      }
      return true;
    }

    function firingGlyphs(r) {
      var hits = [];
      (card.glyphs || []).forEach(function (entry) {
        var e = entry;
        if (entry.any) {
          e = null;
          for (var i = 0; i < entry.any.length; i++) {
            if (fires(entry.any[i].when || {}, r)) { e = entry.any[i]; break; }
          }
        } else if (!fires(entry.when || {}, r)) {
          e = null;
        }
        if (!e) return;
        var voc = vocEntry(e.use);
        if (!voc) return;
        var label = typeof e.label === "function" ? e.label(r)
          : (e.label != null ? e.label : voc.label || e.use);
        hits.push({ use: e.use, voc: voc, label: label });
      });
      return hits.slice(0, 3); /* hard cap — config order is priority (Q5) */
    }

    function glyphRow(r) {
      var hits = firingGlyphs(r);
      if (!hits.length) return null;
      var row = el("span", "gb-glyphs");
      hits.forEach(function (h) {
        var g = el("span", "gb-glyph gb-glyph-" + h.use);
        g.setAttribute("role", "img");
        g.setAttribute("aria-label", h.label);
        g.title = h.label;
        if (!glyphContent(g, h.voc, null)) return;
        row.appendChild(g);
      });
      return row.childNodes.length ? row : null;
    }

    function badgeRow(r) {
      if (!card.badges || !card.badges.key) return null;
      var vals = r[card.badges.key];
      if (!Array.isArray(vals) || !vals.length) return null;
      var voc = vocEntry(card.badges.use);
      if (!voc) return null;
      var row = el("span", "gb-badges");
      vals.slice(0, 3).forEach(function (v) {
        var b = el("span", "gb-badge gb-badge-" + String(v).toLowerCase());
        b.setAttribute("role", "img");
        b.setAttribute("aria-label", (voc.label ? voc.label + ": " : "") + v);
        b.title = String(v);
        if (!glyphContent(b, voc, v)) b.textContent = String(v).charAt(0).toUpperCase();
        row.appendChild(b);
      });
      if (vals.length > 3) {
        var more = el("span", "gb-badge gb-badge-more", "+" + (vals.length - 3));
        more.setAttribute("aria-label", (vals.length - 3) + " more");
        row.appendChild(more);
      }
      return row;
    }

    function pillRow(r) {
      var row = el("div", "gb-card-pills");
      (card.pills || []).forEach(function (spec) {
        var v = r[spec.key];
        if (v == null || v === "" || (Array.isArray(v) && !v.length)) return;
        (Array.isArray(v) ? v : [v]).forEach(function (one) {
          var text, cls = spec.cls || null;
          if (spec.map) {
            var m = spec.map[one];
            if (!m) return;
            text = m.text != null ? m.text : String(one);
            if (m.cls) cls = m.cls;
          } else if (spec.text != null) {
            text = spec.text;
          } else {
            text = String(one) + (spec.suffix || "");
          }
          row.appendChild(el("span",
            "gb-card-pill" + (cls ? " gb-card-pill-" + cls : ""), text));
        });
      });
      return row.childNodes.length ? row : null;
    }

    var grid = el("div", "gb-cards");
    var frag = document.createDocumentFragment();

    out.forEach(function (r) {
      var a = el("a", "gb-card glass-card");
      if (card.href && r[card.href]) a.href = r[card.href];
      var title = card.title != null ? r[card.title] : null;
      /* Whole-card link: the title leads the accessible name. */
      if (title != null) a.appendChild(sr(String(title)));

      var glyphs = glyphRow(r);
      var badges = badgeRow(r);

      if (heroMode) {
        var hero = el("div", "gb-card-hero");
        var url = r[card.img];
        if (url) {
          var img = el("img", "gb-card-ph");
          img.loading = "lazy";
          img.src = url;
          img.alt = card.imgAlt && r[card.imgAlt] != null ? String(r[card.imgAlt]) : "";
          hero.appendChild(img);
        } else {
          var ph = el("div", "gb-card-ph-empty", card.placeholder || "▣");
          ph.setAttribute("aria-hidden", "true");
          hero.appendChild(ph);
        }
        if (badges) hero.appendChild(badges);
        if (glyphs) hero.appendChild(glyphs);
        a.appendChild(hero);
      }

      var bodyEl = el("div", "gb-card-body");
      if (!heroMode && (glyphs || badges)) {
        var inline = el("div", "gb-card-glyphrow");
        if (badges) inline.appendChild(badges);
        if (glyphs) inline.appendChild(glyphs);
        bodyEl.appendChild(inline);
      }
      if (title != null) {
        var t = el("div", "gb-card-title", String(title));
        t.setAttribute("aria-hidden", "true"); /* sr title above carries the name */
        bodyEl.appendChild(t);
      }
      if (card.subtitle && r[card.subtitle] != null && r[card.subtitle] !== "") {
        bodyEl.appendChild(el("div", "gb-card-sub", String(r[card.subtitle])));
      }
      if (card.pitch && r[card.pitch] != null && r[card.pitch] !== "") {
        bodyEl.appendChild(el("div", "gb-card-pitch", String(r[card.pitch])));
      }
      var pills = pillRow(r);
      if (pills) bodyEl.appendChild(pills);
      a.appendChild(bodyEl);
      frag.appendChild(a);
    });

    grid.appendChild(frag);
    host.appendChild(grid);
  }

  if (window.GlassBrowse && window.GlassBrowse.renderers) {
    window.GlassBrowse.renderers.cards = renderCards;
  } else {
    console.warn("glass-cards: GlassBrowse not loaded — list glass-browse.js " +
      "before glass-cards.js in extra_javascript.");
  }
})();

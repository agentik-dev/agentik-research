"""footnote_order.py: an MkDocs hook that numbers a page's notes in reading order.

mkdocs.yml sets the footnotes extension's USE_DEFINITION_ORDER to false, so a
note's number comes from where the text first cites it, not from where it is
defined under "## Sources". Python-Markdown still numbers the citations inside
a `<div markdown>` block (a verdict box, a limits card, the home page's
findings) after every citation outside one, so a page could read 1, 4, 5, 2.
This hook renumbers each page's rendered notes by first citation in the page,
reorders the list under "Sources" to match, and fixes each back-link's title.

A run of adjacent marks (nothing but white space between them, as `[^a][^b]`
writes) is then sorted by number, so a cluster reads 7,14,16 and not
14,16,7, and a separator goes between each two marks:
`<span class="ak-fn-sep">,</span>`, which agentik-site.css sets as a raised
comma. Both live in the HTML, so the order and the comma hold without
JavaScript. The runs are sorted on the finished page (on_post_page), which
also reaches the excerpts on the journal's list pages, whose marks link to
the entry (`href="2026/10/05/<slug>/#fn:key"`).

It touches only the footnotes extension's own markup.
"""
import re

REF = re.compile(r'(<sup id="fnref\d*:([^"]+)"><a class="footnote-ref" href="#fn:[^"]+">)(\d+)(</a></sup>)')
ITEM = re.compile(r'<li id="fn:([^"]+)">')
TITLE = re.compile(r'(title="Jump back to footnote )\d+( in the text")')

SEP = '<span class="ak-fn-sep">,</span>'
MARK = r'<sup id="fnref\d*:[^"]+"><a class="footnote-ref" href="[^"]*#fn:[^"]+">\d+</a></sup>'
GAP = r'(?:\s*|' + re.escape(SEP) + r')'
RUN = re.compile('(?:' + MARK + ')(?:' + GAP + '(?:' + MARK + '))+')
ONE = re.compile(r'<sup id="fnref\d*:[^"]+"><a class="footnote-ref" href="[^"]*#fn:[^"]+">(\d+)</a></sup>')


def on_page_content(html, page, config, files):
    start = html.find('<div class="footnote">')
    if start < 0:
        return html
    body, notes = html[:start], html[start:]

    order = {}
    for m in REF.finditer(body):
        order.setdefault(m.group(2), len(order) + 1)
    if not order:
        return html

    body = REF.sub(lambda m: m.group(1) + str(order.get(m.group(2), m.group(3))) + m.group(4), body)

    ol_open = notes.find("<ol>")
    ol_close = notes.rfind("</ol>")
    if ol_open < 0 or ol_close < ol_open:
        return body + notes
    inner = notes[ol_open + len("<ol>"):ol_close]
    lead, *items = re.split(r'(?=<li id="fn:)', inner)
    keyed = []
    for i, item in enumerate(items):
        m = ITEM.match(item)
        key = m.group(1) if m else None
        rank = order.get(key, len(order) + 1 + i)
        if not item.endswith("\n"):
            item += "\n"
        keyed.append((rank, i, TITLE.sub(lambda t: t.group(1) + str(rank) + t.group(2), item) if key in order else item))
    keyed.sort()
    inner = lead + "".join(item for _, _, item in keyed)
    return body + notes[:ol_open + len("<ol>")] + inner + notes[ol_close:]


def _sort_run(m):
    marks = [(int(one.group(1)), i, one.group(0)) for i, one in enumerate(ONE.finditer(m.group(0)))]
    marks.sort()
    return SEP.join(mark for _, _, mark in marks)


def on_post_page(output, page, config):
    if 'class="footnote-ref"' not in output:
        return output
    return RUN.sub(_sort_run, output)

"""term_links.py: an MkDocs hook that gives each defined term a permalink.

The glossary defines each term in a paragraph that opens with the term in
bold and carries an id from attr_list (`{ #context-window }`), so a page can
link to one term. Headings get Material's permalink from the toc extension;
these paragraphs get the same `<a class="headerlink">` after the bold term,
so a reader can find and copy the anchor. Material shows it on hover, on
focus and when the term is the link target; agentik-site.css sets it in the
margin to the left of the term, where it takes no room in the line.
"""
import re

TERM = re.compile(r'<p id="([^"]+)"><strong>(.*?)</strong>')


def on_page_content(html, page, config, files):
    if '<p id="' not in html:
        return html

    def link(m):
        return (m.group(0) + f'<a class="headerlink ak-termlink" href="#{m.group(1)}" '
                f'title="Permanent link to this term">&para;</a>')

    return TERM.sub(link, html)

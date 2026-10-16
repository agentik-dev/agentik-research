// a11y.mjs: run axe on every built page in light and dark at 1280 px, write
// .cache/a11y.json, and exit 1 on any serious or critical violation.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { AxeBuilder } from '@axe-core/playwright';
import { CACHE, browser, pages, serve } from './lib/site.mjs';

mkdirSync(CACHE, { recursive: true });
const site = await serve();
const chrome = await browser();
const report = [];
let bad = 0;
for (const scheme of ['light', 'dark']) {
  const ctx = await chrome.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  for (const p of pages()) {
    await page.goto(site.url + p, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => [...document.querySelectorAll('.mermaid')].every((m) => m.querySelector('svg') || m.shadowRoot), null, { timeout: 10000 }).catch(() => {});
    const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
    const violations = res.violations.map((v) => ({
      id: v.id, impact: v.impact, help: v.help,
      nodes: v.nodes.slice(0, 5).map((nd) => ({ target: nd.target.join(' '), summary: nd.failureSummary })),
      count: v.nodes.length,
    }));
    report.push({ page: p || 'index', scheme, violations });
    for (const v of violations) {
      if (v.impact === 'serious' || v.impact === 'critical') {
        bad++;
        console.log(`${p || 'index'} [${scheme}]: ${v.impact} ${v.id} (${v.count}): ${v.help}; first: ${v.nodes[0]?.target}`);
      }
    }
  }
  await ctx.close();
}
await chrome.close();
await site.close();
writeFileSync(join(CACHE, 'a11y.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`a11y: ${report.length} page views, ${bad} serious or critical violations; report in .cache/a11y.json`);
process.exit(bad ? 1 : 0);
